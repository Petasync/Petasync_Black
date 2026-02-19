/**
 * Admin Protected Route Wrapper
 *
 * Schützt Admin-Routen vor unautorisiertem Zugriff.
 * Wartet auf vollständige Auth-Initialisierung bevor Content angezeigt wird.
 */

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const {
    isLoading,
    isInitialized,
    isAuthenticated,
    isAdmin,
    requires2FA,
    error,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Lokaler State um Flash-of-Content zu verhindern
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Warte bis Auth vollständig initialisiert ist
    if (!isInitialized) {
      return;
    }

    // Auth ist initialisiert - jetzt prüfen
    setHasChecked(true);

    // Nicht eingeloggt -> Login
    if (!isAuthenticated) {
      navigate('/admin/login', {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    // 2FA erforderlich -> 2FA Seite
    if (requires2FA) {
      navigate('/admin/verify-2fa', {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    // Kein Admin -> Login
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Alles OK - Zugriff erlauben
    setIsAuthorized(true);
  }, [isInitialized, isAuthenticated, isAdmin, requires2FA, navigate, location.pathname]);

  // Loading State - Auth noch nicht initialisiert
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Wird geladen...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && hasChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive font-medium">
            Authentifizierungsfehler
          </p>
          <p className="text-muted-foreground text-sm max-w-md">
            {error}
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="text-primary hover:underline text-sm"
          >
            Zum Login
          </button>
        </div>
      </div>
    );
  }

  // Auth geprüft aber nicht autorisiert -> nichts rendern (redirect läuft)
  if (hasChecked && !isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Noch nicht geprüft -> warten
  if (!hasChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Autorisiert -> Content rendern
  return <div>{children}</div>;
}
