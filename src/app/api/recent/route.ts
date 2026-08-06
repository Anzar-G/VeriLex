import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export const revalidate = 300; // 5 minutes — recent edits refresh often

export async function GET(request: Request) {
  const supabase = createServerClient();
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '6'), 20);

  const { data, error } = await supabase
    .from('maxims')
    .select('id, latin_phrase, indonesian_meaning, literal_translation, legal_fields, updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}
