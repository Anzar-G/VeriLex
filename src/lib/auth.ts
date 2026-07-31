'use client';

import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// ── Sign up ────────────────────────────────────────────────────────────────
export async function signUp(email: string, password: string, username: string, displayName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, display_name: displayName },
    },
  });
  return { data, error };
}

// ── Sign in ────────────────────────────────────────────────────────────────
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// ── Sign out ───────────────────────────────────────────────────────────────
export async function signOut() {
  return supabase.auth.signOut();
}

// ── Get current session user ───────────────────────────────────────────────
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

// ── Fetch user profile + role ──────────────────────────────────────────────
export async function getUserProfile(userId: string) {
  const [profileRes, roleRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('user_roles').select('role').eq('user_id', userId),
  ]);

  const roles = (roleRes.data ?? []).map(r => r.role as string);
  const roleLevels: Record<string, number> = {
    reader: 0, contributor: 1, reviewer: 2,
    subject_expert: 2, editor: 3, senior_editor: 4, administrator: 5,
  };
  const highestRole = roles.sort((a, b) => (roleLevels[b] ?? 0) - (roleLevels[a] ?? 0))[0] ?? 'reader';

  return {
    profile: profileRes.data,
    role: highestRole as string,
    roles,
  };
}
