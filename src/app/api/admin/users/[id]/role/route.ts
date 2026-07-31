import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST — assign role ────────────────────────────────────────────────────
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: { role: string; legal_fields?: string[] };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { error } = await supabase.from('user_roles').upsert({
    user_id:      id,
    role:         body.role,
    legal_fields: body.legal_fields ?? [],
  }, { onConflict: 'user_id,role', ignoreDuplicates: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// ── DELETE — revoke role ─────────────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');

  if (!role) return NextResponse.json({ error: 'role param required' }, { status: 400 });

  const { error } = await supabase.from('user_roles')
    .delete()
    .eq('user_id', id)
    .eq('role', role);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
