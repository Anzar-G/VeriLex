'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import { useVeriLexStore } from '@/lib/useStore';
import type { UserRole } from '@/lib/useStore';
import type { User } from '@supabase/supabase-js';

/**
 * Listens to Supabase auth state changes and syncs to Zustand store.
 * Mount this once in the root layout.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuthUser, clearAuthUser, hydrateBookmarks } = useVeriLexStore();

  useEffect(() => {
    const syncUser = (user: User) => {
      const userEmail = user.email || '';
      const fallbackName = userEmail ? userEmail.split('@')[0] : 'user';
      // Make the app usable immediately; privileged UI stays hidden until the
      // role query has completed successfully.
      setAuthUser({ id: user.id, email: userEmail, username: fallbackName, displayName: fallbackName, role: 'reader' });
      void Promise.all([
        getUserProfile(user.id),
        supabase.from('user_bookmarks').select('maxim_id, note').eq('user_id', user.id),
      ]).then(([identity, bookmarks]) => {
        setAuthUser({
          id: user.id, email: userEmail,
          username: identity.profile?.username || fallbackName,
          displayName: identity.profile?.display_name || fallbackName,
          role: (identity.role as UserRole) || 'reader',
          avatarUrl: identity.profile?.avatar_url,
        });
        hydrateBookmarks(bookmarks.data ?? []);
      }).catch(err => console.error('[AuthProvider] profile sync failed:', err));
    };

    void supabase.auth.getSession().then(({ data }) => { if (data.session?.user) syncUser(data.session.user); });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Never await Supabase work inside this callback; it is called while the
      // auth client may hold its internal lock.
      if (event === 'SIGNED_IN' && session?.user) queueMicrotask(() => syncUser(session.user));
      if (event === 'SIGNED_OUT') clearAuthUser();
    });

    return () => subscription.unsubscribe();
  }, [setAuthUser, clearAuthUser, hydrateBookmarks]);

  return <>{children}</>;
}
