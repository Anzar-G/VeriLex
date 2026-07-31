import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// service_role to bypass RLS for writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET /api/maxims/[id] ─────────────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(data);
}

// ── PUT /api/maxims/[id] — global edit ──────────────────────────────────
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Separate top-level columns from jsonb data fields
  const TOP_LEVEL_COLS = new Set([
    'latin_phrase', 'indonesian_meaning', 'literal_translation',
    'pronunciation_guide', 'legal_fields', 'legal_meaning',
    'history', 'is_active',
  ]);

  const colUpdates: Record<string, unknown> = {};
  const dataUpdates: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    if (TOP_LEVEL_COLS.has(key)) {
      colUpdates[key] = value;
    } else {
      dataUpdates[key] = value;
    }
  }

  // If there are data-level updates, merge them into the existing jsonb
  if (Object.keys(dataUpdates).length > 0) {
    const { data: existing } = await supabase
      .from('maxims')
      .select('data')
      .eq('id', id)
      .single();

    colUpdates['data'] = {
      ...(existing?.data as object ?? {}),
      ...dataUpdates,
    };
  }

  if (Object.keys(colUpdates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('maxims')
    .update(colUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[PUT /api/maxims]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
