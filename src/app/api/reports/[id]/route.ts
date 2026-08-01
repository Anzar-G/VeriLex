import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'reviewer');
  if (auth.response) return auth.response;
  const { id } = await params;
  let body: { status: string; handler_note?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { data, error } = await supabase.from('reports').update({
    status:       body.status,
    handler_id:   auth.actor!.id,
    handler_note: body.handler_note ?? null,
    handled_at:   new Date().toISOString(),
  }).eq('id', id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
