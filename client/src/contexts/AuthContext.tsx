import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { api, ApiError } from '@/lib/api';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  user_type: 'STUDENT' | 'HOSTEL_MANAGER' | 'ADMIN';
  profile_complete: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Fetch the current BetterAuth session from the server. */
  const refreshUser = useCallback(async () => {
    try {
      // BetterAuth exposes GET /api/auth/get-session via its wildcard handler
      const res = await fetch('/api/auth/get-session', {
        credentials: 'include',
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      // BetterAuth response shape: { session: {...}, user: {...} }
      if (data?.user) {
        setUser(data.user as AuthUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  // Hydrate session on first mount
  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  /** Sign in with email + password via BetterAuth. */
  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthUser> => {
      setError(null);
      try {
        const data = await api.post<{ user: AuthUser; session: unknown }>(
          '/auth/sign-in/email',
          { email, password }
        );
        if (data?.user) {
          setUser(data.user);
          return data.user;
        }
        throw new Error('No user in sign-in response');
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : 'Sign in failed. Please check your credentials.';
        setError(message);
        throw err;
      }
    },
    []
  );

  /** Sign out via BetterAuth and clear local state. */
  const signOut = useCallback(async () => {
    try {
      await api.post('/auth/sign-out');
    } catch {
      // Even if the request fails, clear client state
    } finally {
      setUser(null);
      // Clear any lingering cosmetic localStorage keys
      localStorage.removeItem('userAvatar');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
