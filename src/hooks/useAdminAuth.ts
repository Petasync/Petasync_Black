import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminStore } from '@/lib/admin-store';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  
  const adminStore = useAdminStore();
  const navigate = useNavigate();

  // Check if user has admin role
  const checkAdminRole = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    return !error && data !== null;
  }, []);

  // Check if user has 2FA enabled
  const check2FAStatus = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('admin_profiles')
      .select('totp_enabled')
      .eq('user_id', userId)
      .maybeSingle();
    
    return data?.totp_enabled ?? false;
  }, []);

  // Check account lockout
  const checkLockout = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('admin_profiles')
      .select('failed_login_attempts, locked_until')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (!data) return { locked: false, remainingAttempts: MAX_LOGIN_ATTEMPTS };
    
    if (data.locked_until && new Date(data.locked_until) > new Date()) {
      return { locked: true, remainingAttempts: 0 };
    }
    
    return { 
      locked: false, 
      remainingAttempts: MAX_LOGIN_ATTEMPTS - (data.failed_login_attempts || 0) 
    };
  }, []);

  // Record failed login attempt
  const recordFailedAttempt = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('admin_profiles')
      .select('failed_login_attempts')
      .eq('user_id', userId)
      .maybeSingle();
    
    const attempts = (data?.failed_login_attempts || 0) + 1;
    const updates: Record<string, unknown> = { failed_login_attempts: attempts };
    
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      updates.locked_until = new Date(Date.now() + LOCKOUT_DURATION).toISOString();
    }
    
    await supabase
      .from('admin_profiles')
      .update(updates)
      .eq('user_id', userId);
    
    return MAX_LOGIN_ATTEMPTS - attempts;
  }, []);

  // Reset failed attempts on successful login
  const resetFailedAttempts = useCallback(async (userId: string) => {
    await supabase
      .from('admin_profiles')
      .update({ 
        failed_login_attempts: 0, 
        locked_until: null,
        last_login: new Date().toISOString()
      })
      .eq('user_id', userId);
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string, rememberMe: boolean = false) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: "Benutzer nicht gefunden" };
      }

      // Check if user is admin
      const hasAdminRole = await checkAdminRole(data.user.id);
      if (!hasAdminRole) {
        await supabase.auth.signOut();
        toast({
          title: "Zugriff verweigert",
          description: "Sie haben keine Admin-Berechtigung.",
          variant: "destructive",
        });
        return { success: false, error: "Keine Admin-Berechtigung" };
      }

      // Check lockout status
      const lockoutStatus = await checkLockout(data.user.id);
      if (lockoutStatus.locked) {
        await supabase.auth.signOut();
        toast({
          title: "Account gesperrt",
          description: "Zu viele fehlgeschlagene Versuche. Bitte warten Sie 15 Minuten.",
          variant: "destructive",
        });
        return { success: false, error: "Account gesperrt" };
      }

      // Check 2FA status
      const has2FA = await check2FAStatus(data.user.id);
      setTwoFAEnabled(has2FA);

      if (has2FA) {
        setRequires2FA(true);
        adminStore.setSession({
          userId: data.user.id,
          email: data.user.email || '',
          twoFactorVerified: false,
          trustedDevice: rememberMe,
          lastActivity: Date.now(),
        });
        return { success: true, requires2FA: true };
      }

      // No 2FA required, complete login
      await resetFailedAttempts(data.user.id);
      adminStore.setSession({
        userId: data.user.id,
        email: data.user.email || '',
        twoFactorVerified: true,
        trustedDevice: rememberMe,
        lastActivity: Date.now(),
      });
      setIsAdmin(true);
      
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen im Admin-Bereich!",
      });
      
      return { success: true, requires2FA: false };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" };
    } finally {
      setLoading(false);
    }
  }, [adminStore, checkAdminRole, checkLockout, check2FAStatus, resetFailedAttempts]);

  // Verify 2FA code
  const verify2FA = useCallback(async (code: string) => {
    const storeSession = adminStore.session;
    if (!storeSession) return { success: false, error: "Keine Session" };

    try {
      // Dynamically import otplib for client-side use
      const { authenticator } = await import('otplib');
      
      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('totp_secret, backup_codes')
        .eq('user_id', storeSession.userId)
        .single();

      if (!profile?.totp_secret) {
        return { success: false, error: "2FA nicht konfiguriert" };
      }

      // Try TOTP first
      const isValidTOTP = authenticator.verify({ 
        token: code, 
        secret: profile.totp_secret 
      });

      if (isValidTOTP) {
        await resetFailedAttempts(storeSession.userId);
        adminStore.setSession({
          ...storeSession,
          twoFactorVerified: true,
          lastActivity: Date.now(),
        });
        setRequires2FA(false);
        setIsAdmin(true);
        return { success: true };
      }

      // Try backup codes
      if (profile.backup_codes?.includes(code)) {
        const newBackupCodes = profile.backup_codes.filter((c: string) => c !== code);
        await supabase
          .from('admin_profiles')
          .update({ backup_codes: newBackupCodes })
          .eq('user_id', storeSession.userId);
        
        await resetFailedAttempts(storeSession.userId);
        adminStore.setSession({
          ...storeSession,
          twoFactorVerified: true,
          lastActivity: Date.now(),
        });
        setRequires2FA(false);
        setIsAdmin(true);
        
        toast({
          title: "Backup-Code verwendet",
          description: `Noch ${newBackupCodes.length} Backup-Codes übrig.`,
        });
        
        return { success: true };
      }

      // Invalid code
      const remaining = await recordFailedAttempt(storeSession.userId);
      if (remaining <= 0) {
        await supabase.auth.signOut();
        adminStore.logout();
        return { success: false, error: "Account gesperrt. Bitte warten Sie 15 Minuten." };
      }

      return { success: false, error: `Ungültiger Code. Noch ${remaining} Versuche.` };
    } catch (err) {
      console.error('2FA verification error:', err);
      return { success: false, error: "Verifizierung fehlgeschlagen" };
    }
  }, [adminStore, recordFailedAttempt, resetFailedAttempts]);

  // Logout
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    adminStore.logout();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setRequires2FA(false);
    navigate('/admin/login');
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
  }, [adminStore, navigate]);

  // Password reset
  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    
    if (error) {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
    
    toast({
      title: "E-Mail gesendet",
      description: "Prüfen Sie Ihr Postfach für den Passwort-Reset Link.",
    });
    
    return { success: true };
  }, []);

  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlock
          setTimeout(async () => {
            const hasAdmin = await checkAdminRole(currentSession.user.id);
            setIsAdmin(hasAdmin);
          }, 0);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        checkAdminRole(currentSession.user.id).then(setIsAdmin);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  // Check session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      if (adminStore.isSessionExpired() && isAdmin) {
        toast({
          title: "Session abgelaufen",
          description: "Bitte melden Sie sich erneut an.",
          variant: "destructive",
        });
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [adminStore, isAdmin, logout]);

  // Update activity on user interaction
  useEffect(() => {
    const updateActivity = () => {
      if (isAdmin) {
        adminStore.updateLastActivity();
      }
    };

    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [adminStore, isAdmin]);

  return {
    user,
    session,
    loading,
    isAdmin,
    requires2FA,
    twoFAEnabled,
    login,
    verify2FA,
    logout,
    resetPassword,
  };
}
