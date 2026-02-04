import { useState, useEffect, useCallback } from 'react';
import { auth, getAccessToken, clearTokens } from '@/lib/api-client';
import { useAdminStore } from '@/lib/admin-store';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  display_name: string | null;
  role: string;
  totp_enabled?: boolean;
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const adminStore = useAdminStore();
  const navigate = useNavigate();

  // Login function
  const login = useCallback(async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      const response = await auth.login(email, password);

      if (!response.success) {
        toast({
          title: "Login fehlgeschlagen",
          description: response.error || "Ungültige Anmeldedaten",
          variant: "destructive",
        });
        setLoading(false);
        return { success: false, error: response.error };
      }

      const data = response.data;

      // 2FA required?
      if (data?.requires_2fa && data?.temp_token) {
        setTempToken(data.temp_token);
        setRequires2FA(true);
        setTwoFAEnabled(true);
        setLoading(false);
        return { success: true, requires2FA: true };
      }

      // Login successful
      if (data?.user) {
        setUser(data.user);
        setIsAdmin(data.user.role === 'admin');
        setTwoFAEnabled(data.user.totp_enabled || false);
        setRequires2FA(false);

        adminStore.setSession({
          userId: data.user.id,
          email: data.user.email,
          twoFactorVerified: true,
          trustedDevice: rememberMe,
          lastActivity: Date.now(),
        });

        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen im Admin-Bereich!",
        });

        setLoading(false);
        return { success: true, requires2FA: false };
      }

      setLoading(false);
      return { success: false, error: "Unbekannter Fehler" };

    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" };
    }
  }, [adminStore]);

  // Verify 2FA code
  const verify2FA = useCallback(async (code: string) => {
    if (!tempToken) {
      return { success: false, error: "Keine Session" };
    }

    try {
      const response = await auth.verify2FA(tempToken, code);

      if (!response.success) {
        // Check if account is locked
        if (response.error?.includes('gesperrt')) {
          adminStore.logout();
          setTempToken(null);
          setRequires2FA(false);
        }
        return { success: false, error: response.error };
      }

      const data = response.data;

      if (data?.user) {
        setUser(data.user);
        setIsAdmin(data.user.role === 'admin');
        setRequires2FA(false);
        setTempToken(null);

        adminStore.setSession({
          userId: data.user.id,
          email: data.user.email,
          twoFactorVerified: true,
          trustedDevice: false,
          lastActivity: Date.now(),
        });

        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen im Admin-Bereich!",
        });

        return { success: true };
      }

      return { success: false, error: "Verifizierung fehlgeschlagen" };

    } catch (err) {
      console.error('2FA verification error:', err);
      return { success: false, error: "Verifizierung fehlgeschlagen" };
    }
  }, [tempToken, adminStore]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }

    adminStore.logout();
    setUser(null);
    setIsAdmin(false);
    setRequires2FA(false);
    setTempToken(null);
    clearTokens();
    navigate('/admin/login');

    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
  }, [adminStore, navigate]);

  // Password reset
  const resetPassword = useCallback(async (email: string) => {
    const response = await auth.forgotPassword(email);

    if (!response.success) {
      toast({
        title: "Fehler",
        description: response.error || "Fehler beim Senden",
        variant: "destructive",
      });
      return { success: false, error: response.error };
    }

    toast({
      title: "E-Mail gesendet",
      description: "Prüfen Sie Ihr Postfach für den Passwort-Reset Link.",
    });

    return { success: true };
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      // Check if we have a token
      const token = getAccessToken();

      if (!token) {
        if (mounted) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      // Verify token and get user
      const response = await auth.getMe();

      if (!mounted) return;

      if (response.success && response.data) {
        setUser(response.data);
        setIsAdmin(response.data.role === 'admin');
        setTwoFAEnabled(response.data.totp_enabled || false);
      } else {
        // Token invalid
        clearTokens();
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

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
    session: user ? { user } : null, // Backwards compatibility
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
