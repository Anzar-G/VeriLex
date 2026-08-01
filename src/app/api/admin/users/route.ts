import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET /api/admin/users ──────────────────────────────────────────────────
export async function GET(req: Request) {
  const auth = await requireApiActor(req, 'administrator');
  if (auth.response) return auth.response;
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('q') ?? '';
  const page   = parseInt(searchParams.get('page') ?? '1');
  const limit  = 20;
  const from   = (page - 1) * limit;

  // Fetch profiles
  let query = supabase.from('profiles')
    .select('id, username, display_name, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (search) {
    query = query.or(`username.ilike.%${search}%,display_name.ilike.%${search}%`);
  }

  const { data: profiles, count, error } = await query;
  if (error) return NextResponse.json({ users: [], total: 0 }, { status: 500 });

  // Fetch roles for these users
  const userIds = (profiles ?? []).map(p => p.id);
  const { data: roles } = await supabase.from('user_roles')
    .select('user_id, role')
    .in('user_id', userIds);

  // Fetch active bans
  const { data: bans } = await supabase.from('user_bans')
    .select('user_id, ban_type, expires_at')
    .in('user_id', userIds)
    .eq('is_active', true);

  const roleMap: Record<string, string[]> = {};
  const banMap:  Record<string, { ban_type: string; expires_at: string | null }> = {};

  for (const r of roles ?? []) {
    if (!roleMap[r.user_id]) roleMap[r.user_id] = [];
    roleMap[r.user_id].push(r.role);
  }
  for (const b of bans ?? []) {
    banMap[b.user_id] = { ban_type: b.ban_type, expires_at: b.expires_at };
  }

  const users = (profiles ?? []).map(p => ({
    ...p,
    roles:      roleMap[p.id] ?? ['reader'],
    activeBan:  banMap[p.id] ?? null,
  }));

  return NextResponse.json({ users, total: count ?? 0, page, limit });
}
