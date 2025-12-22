import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminSession {
  userId: string;
  email: string;
  twoFactorVerified: boolean;
  trustedDevice: boolean;
  lastActivity: number;
}

interface AdminStore {
  session: AdminSession | null;
  setSession: (session: AdminSession | null) => void;
  updateLastActivity: () => void;
  logout: () => void;
  isSessionExpired: () => boolean;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session) => set({ session }),
      updateLastActivity: () => {
        const current = get().session;
        if (current) {
          set({ session: { ...current, lastActivity: Date.now() } });
        }
      },
      logout: () => set({ session: null }),
      isSessionExpired: () => {
        const session = get().session;
        if (!session) return true;
        return Date.now() - session.lastActivity > SESSION_TIMEOUT;
      },
    }),
    {
      name: 'admin-session',
    }
  )
);
