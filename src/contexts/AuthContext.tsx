/**
 * Robust Auth Context Provider
 *
 * Zentrale Auth-Verwaltung mit:
 * - Einmalige State-Instanz (keine Race Conditions)
 * - Proper Loading States
 * - Auto-Retry bei Netzwerkfehlern
 * - Token Refresh im Hintergrund
 * - Session Persistenz
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Token Storage Keys
const TOKEN_KEY = 'petasync_access_token';
const REFRESH_TOKEN_KEY = 'petasync_refresh_token';
const AUTH_STATE_KEY = 'petasync_auth_state';

// Timeouts
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 Minuten vor Ablauf refreshen
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 Minuten Inaktivität

// Global initialization flag to prevent multiple initializations across re-renders
let globalInitialized = false;

interface User {
  id: string;
  email: string;
  display_name: string | null;
  role: string;
  totp_enabled?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  requires2FA: boolean;
  tempToken: string | null;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; requires2FA?: boolean; error?: string }>;
  verify2FA: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  isInitialized: false,
  requires2FA: false,
  tempToken: null,
  error: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

// Token Management
function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_STATE_KEY);
}

// API Helper with retry logic
async function authFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  retries = 3
): Promise<{ success: boolean; data?: T; error?: string }> {
  const token = getAccessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token && !endpoint.includes('/login') && !endpoint.includes('/forgot-password')) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Bei 401 nicht retry - Token ist ungültig
        if (response.status === 401) {
          return { success: false, error: data.error || 'Unauthorized' };
        }

        // Bei Server-Fehlern retry
        if (response.status >= 500 && attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }

        return { success: false, error: data.error || 'Request failed' };
      }

      return data;
    } catch (error) {
      // Netzwerkfehler - retry
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    // Try to restore state from localStorage on initial render
    try {
      const savedState = localStorage.getItem(AUTH_STATE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Only restore if we have tokens
        if (getAccessToken()) {
          return {
            ...initialState,
            user: parsed.user || null,
            isAuthenticated: !!parsed.user,
            isAdmin: parsed.user?.role === 'admin',
            isLoading: true, // Still need to verify
            isInitialized: false,
          };
        }
      }
    } catch {
      // Ignore parse errors
    }
    return initialState;
  });

  const navigate = useNavigate();

  const lastActivityRef = useRef<number>(Date.now());
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initializingRef = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(true);

  // Update last activity
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Check session timeout
  const checkSessionTimeout = useCallback(() => {
    if (!state.isAuthenticated) return;

    const timeSinceActivity = Date.now() - lastActivityRef.current;
    if (timeSinceActivity > SESSION_TIMEOUT) {
      toast({
        title: "Session abgelaufen",
        description: "Sie wurden aus Sicherheitsgründen abgemeldet.",
        variant: "destructive",
      });
      clearTokens();
      setState({
        ...initialState,
        isLoading: false,
        isInitialized: true,
      });
      navigate('/admin/login');
    }
  }, [state.isAuthenticated, navigate]);


  // Setup refresh timer - stable function
  const setupRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }

    refreshTimerRef.current = setInterval(async () => {
      const token = getAccessToken();
      const refreshToken = getRefreshToken();

      if (token && refreshToken) {
        const result = await authFetch<{ access_token: string }>('/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (result.success && result.data?.access_token) {
          localStorage.setItem(TOKEN_KEY, result.data.access_token);
        }
      }
    }, TOKEN_REFRESH_INTERVAL);
  }, []); // No dependencies - stable function

  // Initialize auth state - stable function that doesn't change
  const initializeAuth = useCallback(async () => {
    // Prevent multiple simultaneous initializations
    if (initializingRef.current || globalInitialized) return;
    initializingRef.current = true;

    const token = getAccessToken();

    if (!token) {
      if (mountedRef.current) {
        setState({
          ...initialState,
          isLoading: false,
          isInitialized: true,
        });
        globalInitialized = true;
      }
      initializingRef.current = false;
      return;
    }

    try {
      // Validate token with /auth/me
      const result = await authFetch<User>('/auth/me');

      if (!mountedRef.current) {
        initializingRef.current = false;
        return;
      }

      if (result.success && result.data) {
        const user = result.data;
        // Save to localStorage for faster initial render
        localStorage.setItem(AUTH_STATE_KEY, JSON.stringify({ user }));

        setState({
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin',
          isLoading: false,
          isInitialized: true,
          requires2FA: false,
          tempToken: null,
          error: null,
        });
        globalInitialized = true;
      } else {
        // Token ungültig - versuche refresh
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const refreshResult = await authFetch<{ access_token: string }>('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (refreshResult.success && refreshResult.data?.access_token) {
            localStorage.setItem(TOKEN_KEY, refreshResult.data.access_token);

            // Nochmal versuchen mit neuem Token
            const retryResult = await authFetch<User>('/auth/me');

            if (mountedRef.current && retryResult.success && retryResult.data) {
              const user = retryResult.data;
              localStorage.setItem(AUTH_STATE_KEY, JSON.stringify({ user }));

              setState({
                user,
                isAuthenticated: true,
                isAdmin: user.role === 'admin',
                isLoading: false,
                isInitialized: true,
                requires2FA: false,
                tempToken: null,
                error: null,
              });
              globalInitialized = true;
              initializingRef.current = false;
              return;
            }
          }
        }

        // Komplett fehlgeschlagen
        if (mountedRef.current) {
          clearTokens();
          setState({
            ...initialState,
            isLoading: false,
            isInitialized: true,
          });
          globalInitialized = true;
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      if (mountedRef.current) {
        setState({
          ...initialState,
          isLoading: false,
          isInitialized: true,
          error: 'Authentifizierung fehlgeschlagen',
        });
        globalInitialized = true;
      }
    }

    initializingRef.current = false;
  }, []); // No dependencies - stable function

  // Login
  const login = useCallback(async (
    email: string,
    password: string,
    _rememberMe = false
  ): Promise<{ success: boolean; requires2FA?: boolean; error?: string }> => {
    setState(s => ({ ...s, isLoading: true, error: null }));

    const result = await authFetch<{
      requires_2fa?: boolean;
      temp_token?: string;
      access_token?: string;
      refresh_token?: string;
      user?: User;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!result.success) {
      setState(s => ({ ...s, isLoading: false, error: result.error }));
      return { success: false, error: result.error };
    }

    const data = result.data!;

    // 2FA erforderlich
    if (data.requires_2fa && data.temp_token) {
      setState(s => ({
        ...s,
        isLoading: false,
        requires2FA: true,
        tempToken: data.temp_token!,
      }));
      return { success: true, requires2FA: true };
    }

    // Login erfolgreich
    if (data.access_token && data.refresh_token && data.user) {
      setTokens(data.access_token, data.refresh_token);
      localStorage.setItem(AUTH_STATE_KEY, JSON.stringify({ user: data.user }));
      globalInitialized = true;

      setState({
        user: data.user,
        isAuthenticated: true,
        isAdmin: data.user.role === 'admin',
        isLoading: false,
        isInitialized: true,
        requires2FA: false,
        tempToken: null,
        error: null,
      });
      return { success: true };
    }

    setState(s => ({ ...s, isLoading: false, error: 'Unknown error' }));
    return { success: false, error: 'Unknown error' };
  }, []);

  // Verify 2FA
  const verify2FA = useCallback(async (
    code: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!state.tempToken) {
      return { success: false, error: 'No pending 2FA session' };
    }

    setState(s => ({ ...s, isLoading: true }));

    const result = await authFetch<{
      access_token: string;
      refresh_token: string;
      user: User;
    }>('/auth/verify-2fa', {
      method: 'POST',
      body: JSON.stringify({ temp_token: state.tempToken, code }),
    });

    if (!result.success) {
      setState(s => ({ ...s, isLoading: false, error: result.error }));
      return { success: false, error: result.error };
    }

    const data = result.data!;
    setTokens(data.access_token, data.refresh_token);
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify({ user: data.user }));
    globalInitialized = true;

    setState({
      user: data.user,
      isAuthenticated: true,
      isAdmin: data.user.role === 'admin',
      isLoading: false,
      isInitialized: true,
      requires2FA: false,
      tempToken: null,
      error: null,
    });

    return { success: true };
  }, [state.tempToken]);

  // Logout
  const logout = useCallback(async () => {
    // API Logout aufrufen (ignoriere Fehler)
    try {
      await authFetch('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    }

    // Timer stoppen
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }

    // State und Tokens clearen
    clearTokens();
    globalInitialized = false;

    setState({
      ...initialState,
      isLoading: false,
      isInitialized: true,
    });

    navigate('/admin/login');

    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
  }, [navigate]);

  // Reset Password
  const resetPassword = useCallback(async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    const result = await authFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    return result.success
      ? { success: true }
      : { success: false, error: result.error };
  }, []);

  // Refresh auth manually
  const refreshAuth = useCallback(async () => {
    globalInitialized = false;
    initializingRef.current = false;
    await initializeAuth();
  }, [initializeAuth]);

  // Clear error
  const clearError = useCallback(() => {
    setState(s => ({ ...s, error: null }));
  }, []);

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;

    // Reset global flag if we're re-mounting fresh (e.g., after HMR)
    if (!getAccessToken()) {
      globalInitialized = false;
    }

    initializeAuth();
    setupRefreshTimer();

    return () => {
      mountedRef.current = false;
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [initializeAuth, setupRefreshTimer]);

  // Activity tracking
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const handleActivity = () => updateActivity();

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Check timeout every minute
    const timeoutChecker = setInterval(checkSessionTimeout, 60000);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(timeoutChecker);
    };
  }, [state.isAuthenticated, updateActivity, checkSessionTimeout]);

  // Context value
  const value: AuthContextType = {
    ...state,
    login,
    verify2FA,
    logout,
    resetPassword,
    refreshAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Für Abwärtskompatibilität mit bestehendem Code
export function useAdminAuth() {
  const auth = useAuth();
  return {
    user: auth.user,
    session: auth.user ? { user: auth.user } : null,
    loading: auth.isLoading,
    isAdmin: auth.isAdmin,
    requires2FA: auth.requires2FA,
    twoFAEnabled: auth.user?.totp_enabled || false,
    login: auth.login,
    verify2FA: auth.verify2FA,
    logout: auth.logout,
    resetPassword: auth.resetPassword,
  };
}

// Export token functions for api-client
export { getAccessToken, getRefreshToken, setTokens, clearTokens };
