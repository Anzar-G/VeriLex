import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST — issue ban/warning ──────────────────────────────────────────────
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: {
    ban_type: 'warning' | 'temporary' | 'permanent';
    reason: string;
    issued_by?: string;
    issued_by_name?: string;
    duration_days?: number;
  };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!body.reason?.trim()) {
    return NextResponse.json({ error: 'Alasan ban wajib diisi' }, { status: 400 });
  }

  let expires_at: string | null = null;
  if (body.ban_type === 'temporary' && body.duration_days) {
    const exp = new Date();
    exp.setDate(exp.getDate() + body.duration_days);
    expires_at = exp.toISOString();
  }

  // Deactivate existing active bans
  await supabase.from('user_bans')
    .update({ is_active: false })
    .eq('user_id', id)
    .eq('is_active', true);

  const { data, error } = await supabase.from('user_bans').insert({
    user_id:        id,
    ban_type:       body.ban_type,
    reason:         body.reason,
    issued_by:      body.issued_by ?? null,
    issued_by_name: body.issued_by_name ?? 'Administrator',
    expires_at,
    is_active:      true,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log activity
  await supabase.from('activity_logs').insert({
    user_id:     body.issued_by ?? null,
    user_name:   body.issued_by_name ?? 'Administrator',
    action:      `ban_${body.ban_type}`,
    target_type: 'user',
    target_id:   id,
    details:     { reason: body.reason, expires_at },
  });

  return NextResponse.json(data, { status: 201 });
}

// ── DELETE — lift ban ─────────────────────────────────────────────────────
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabase.from('user_bans')
    .update({ is_active: false })
    .eq('user_id', id)
    .eq('is_active', true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
