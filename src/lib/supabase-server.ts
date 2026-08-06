import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using service_role key.
 * ONLY use in API routes and Server Components — never in client components.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-service-key';
  return createClient(
    url,
    key,
    { auth: { persistSession: false } }
  );
}

// ── Role hierarchy ────────────────────────────────────────────────────────
export type UserRole =
  | 'reader'
  | 'contributor'
  | 'editor'
  | 'reviewer'
  | 'senior_editor'
  | 'subject_expert'
  | 'administrator';

const ROLE_LEVEL: Record<UserRole, number> = {
  reader:        0,
  contributor:   1,
  reviewer:      2,
  subject_expert:2,
  editor:        3,
  senior_editor: 4,
  administrator: 5,
};

export function roleLevel(role: UserRole): number {
  return ROLE_LEVEL[role] ?? 0;
}

export function hasMinRole(userRole: UserRole, required: UserRole): boolean {
  return roleLevel(userRole) >= roleLevel(required);
}

// ── Fetch the highest role for a user ─────────────────────────────────────
export async function getUserRole(userId: string): Promise<UserRole> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (!data || data.length === 0) return 'reader';

  // Return highest role
  const sorted = data
    .map(r => r.role as UserRole)
    .sort((a, b) => roleLevel(b) - roleLevel(a));
  return sorted[0];
}
