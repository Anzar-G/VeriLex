import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiActor(req, 'administrator');
  if (auth.response) return auth.response;
  const body = await req.json().catch(() => null) as { status?: 'approved' | 'rejected' | 'under_review'; reviewer_note?: string } | null;
  if (!body || !['approved', 'rejected', 'under_review'].includes(body.status ?? '')) return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
  const { id } = await params;
  const supabase = createServerClient();
  const { data: request, error: requestError } = await supabase.from('role_requests').select('*').eq('id', id).single();
  if (requestError || !request) return NextResponse.json({ error: 'Pengajuan tidak ditemukan' }, { status: 404 });
  if (body.status === 'approved') {
    const { error } = await supabase.from('user_roles').upsert({ user_id: request.user_id, role: request.requested_role, legal_fields: request.legal_fields ?? [], granted_by: auth.actor!.id }, { onConflict: 'user_id,role' });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { data, error } = await supabase.from('role_requests').update({ status: body.status, reviewer_id: auth.actor!.id, reviewer_note: body.reviewer_note ?? null, reviewed_at: body.status === 'under_review' ? null : new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
