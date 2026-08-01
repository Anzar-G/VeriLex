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
  const { setAuthUser, clearAuthUser, hydrateBookmarks } = useVeriLexStore();

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (user) {
        const userEmail = user.email || '';
        const fallbackName = userEmail ? userEmail.split('@')[0] : 'user';
        try {
          const { profile, role } = await getUserProfile(user.id);
          setAuthUser({
            id: user.id,
            email: userEmail,
            username: profile?.username || fallbackName,
            displayName: profile?.display_name || fallbackName,
            role: (role as UserRole) || 'contributor',
            avatarUrl: profile?.avatar_url,
          });
          const { data: bookmarks } = await supabase.from('user_bookmarks').select('maxim_id, note').eq('user_id', user.id);
          hydrateBookmarks(bookmarks ?? []);
        } catch (err) {
          console.error('[AuthProvider] session restore failed:', err);
          setAuthUser({
            id: user.id,
            email: userEmail,
            username: fallbackName,
            displayName: fallbackName,
            role: 'contributor',
          });
        }
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          const userEmail = session.user.email || '';
          const fallbackName = userEmail ? userEmail.split('@')[0] : 'user';

          try {
            const { profile, role } = await getUserProfile(session.user.id);
            setAuthUser({
              id: session.user.id,
              email: userEmail,
              username: profile?.username || fallbackName,
              displayName: profile?.display_name || fallbackName,
              role: (role as UserRole) || 'contributor',
              avatarUrl: profile?.avatar_url,
            });
            const { data: bookmarks } = await supabase.from('user_bookmarks').select('maxim_id, note').eq('user_id', session.user.id);
            hydrateBookmarks(bookmarks ?? []);
          } catch (err) {
            console.error('[AuthProvider] getUserProfile failed:', err);
            setAuthUser({
              id: session.user.id,
              email: userEmail,
              username: fallbackName,
              displayName: fallbackName,
              role: 'contributor',
            });
          }
        } else if (event === 'SIGNED_OUT') {
          clearAuthUser();
        }
      } catch (globalErr) {
        console.error('[AuthProvider] auth state change handling failed:', globalErr);
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuthUser, clearAuthUser, hydrateBookmarks]);

  return <>{children}</>;
}
