import { NextResponse } from 'next/server';
import { createServerClient, getUserRole, hasMinRole, type UserRole } from '@/lib/supabase-server';

export type ApiActor = { id: string; email: string; role: UserRole };

/**
 * Server-side identity boundary for all privileged route handlers. The client
 * must pass the Supabase access token as `Authorization: Bearer <token>`.
 * Never trust user_id, role, or display-name fields supplied in JSON bodies.
 */
export async function getApiActor(req: Request): Promise<ApiActor | null> {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return {
    id: data.user.id,
    email: data.user.email ?? '',
    role: await getUserRole(data.user.id),
  };
}

export async function requireApiActor(req: Request, minimumRole: UserRole = 'reader') {
  const actor = await getApiActor(req);
  if (!actor) return { actor: null, response: NextResponse.json({ error: 'Autentikasi diperlukan' }, { status: 401 }) };
  if (!hasMinRole(actor.role, minimumRole)) {
    return { actor: null, response: NextResponse.json({ error: 'Anda tidak memiliki kewenangan untuk tindakan ini' }, { status: 403 }) };
  }
  return { actor, response: null };
}

export function actorDisplayName(actor: ApiActor, supplied?: unknown) {
  // A supplied display name is only cosmetic; the authenticated identity stays
  // authoritative. Keep the familiar name if a component has already loaded it.
  return typeof supplied === 'string' && supplied.trim() ? supplied.trim().slice(0, 120) : actor.email.split('@')[0] || 'Pengguna VeriLex';
}
