'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import { useVeriLexStore } from '@/lib/useStore';
import type { UserRole } from '@/lib/useStore';

/**
 * Listens to Supabase auth state changes and syncs to Zustand store.
 * Mount this once in the root layout.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuthUser, clearAuthUser } = useVeriLexStore();

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (user) {
        const { profile, role } = await getUserProfile(user.id);
        setAuthUser({
          id: user.id,
          email: user.email!,
          username: profile?.username || user.email!.split('@')[0],
          displayName: profile?.display_name || user.email!.split('@')[0],
          role: role as UserRole,
          avatarUrl: profile?.avatar_url,
        });
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { profile, role } = await getUserProfile(session.user.id);
        setAuthUser({
          id: session.user.id,
          email: session.user.email!,
          username: profile?.username || session.user.email!.split('@')[0],
          displayName: profile?.display_name || session.user.email!.split('@')[0],
          role: role as UserRole,
          avatarUrl: profile?.avatar_url,
        });
      } else if (event === 'SIGNED_OUT') {
        clearAuthUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuthUser, clearAuthUser]);

  return <>{children}</>;
}
