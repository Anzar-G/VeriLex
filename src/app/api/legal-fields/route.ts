import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export const revalidate = 3600; // revalidate every hour

const FIELD_LABELS: Record<string, { label: string; description: string }> = {
  umum:          { label: 'Asas Umum & Penafsiran',          description: 'Asas Umum & Penafsiran Hukum' },
  pidana:        { label: 'Hukum Pidana & Acara Pidana',     description: 'Hukum Pidana & Acara Pidana' },
  perdata:       { label: 'Hukum Perdata & Kontrak',         description: 'Hukum Perdata & Kontrak' },
  properti:      { label: 'Hak Milik & Benda',               description: 'Hak Milik & Benda (Property Law)' },
  keluarga:      { label: 'Waris & Keluarga',                description: 'Waris & Keluarga (Succession & Family Law)' },
  bisnis:        { label: 'Hukum Dagang & Korporasi',        description: 'Hukum Dagang & Korporasi' },
  internasional: { label: 'Hukum Internasional & HAM',       description: 'Hukum Internasional & HAM' },
  'tata-negara': { label: 'Hukum Administrasi & Tata Negara',description: 'Hukum Administrasi & Tata Negara' },
  acara:         { label: 'Hukum Acara Perdata & Pembuktian',description: 'Hukum Acara Perdata & Pembuktian' },
  'lain-lain':   { label: 'Maksim Lain-Lain & Filosofis',    description: 'Maksim Lain-Lain & Filosofis' },
  administrasi:  { label: 'Hukum Administrasi',              description: 'Maksim yang berkaitan dengan hukum administrasi negara' },
};

const FIELD_ORDER = [
  'umum', 'pidana', 'perdata', 'properti', 'keluarga',
  'bisnis', 'internasional', 'tata-negara', 'acara', 'lain-lain', 'administrasi',
];

export async function GET() {
  const supabase = createServerClient();

  // Pull every active maxim's legal_fields array and count occurrences per field
  const { data, error } = await supabase
    .from('maxims')
    .select('legal_fields')
    .eq('is_active', true);

  if (error) return NextResponse.json([], { status: 500 });

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    for (const field of row.legal_fields ?? []) {
      counts[field] = (counts[field] ?? 0) + 1;
    }
  }

  const fields = FIELD_ORDER.map(id => ({
    id,
    label: FIELD_LABELS[id]?.label ?? id,
    description: FIELD_LABELS[id]?.description ?? id,
    count: counts[id] ?? 0,
  })).filter(f => f.count > 0 || FIELD_LABELS[f.id]);

  return NextResponse.json(fields);
}
