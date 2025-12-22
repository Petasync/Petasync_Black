import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { loading, isAdmin, requires2FA, session } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        navigate('/admin/login', { state: { from: location.pathname } });
      } else if (requires2FA) {
        navigate('/admin/verify-2fa', { state: { from: location.pathname } });
      } else if (!isAdmin) {
        navigate('/admin/login');
      }
    }
  }, [loading, session, isAdmin, requires2FA, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || !isAdmin || requires2FA) {
    return null;
  }

  return <>{children}</>;
}
