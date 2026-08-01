import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

const REQUESTABLE = new Set(['contributor', 'editor', 'reviewer', 'senior_editor', 'subject_expert']);

export async function GET(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const supabase = createServerClient();
  if (auth.actor!.role === 'administrator') {
    const { data, error } = await supabase.from('role_requests').select('*, profiles(username, display_name)').order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data ?? [] });
  }
  const { data, error } = await supabase.from('role_requests').select('*').eq('user_id', auth.actor!.id).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: Request) {
  const auth = await requireApiActor(req, 'reader');
  if (auth.response) return auth.response;
  const body = await req.json().catch(() => null) as { requested_role?: string; motivation?: string; qualifications?: string; legal_fields?: string[] } | null;
  if (!body || !REQUESTABLE.has(body.requested_role ?? '') || !body.motivation?.trim() || body.motivation.trim().length < 30) {
    return NextResponse.json({ error: 'Role dan motivasi minimal 30 karakter wajib diisi.' }, { status: 400 });
  }
  const supabase = createServerClient();
  const { data, error } = await supabase.from('role_requests').insert({
    user_id: auth.actor!.id, requested_role: body.requested_role, motivation: body.motivation.trim(),
    qualifications: body.qualifications?.trim() || null, legal_fields: body.legal_fields ?? [],
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 409 });
  return NextResponse.json(data, { status: 201 });
}
