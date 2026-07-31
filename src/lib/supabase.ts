import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ── Database row types ─────────────────────────────────────────────────────

export interface MaximRow {
  id: string;
  latin_phrase: string;
  indonesian_meaning: string;
  literal_translation: string;
  pronunciation_guide: string;
  legal_fields: string[];
  legal_meaning: string;
  history: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;  // all extra fields (wordByWord, caseExamples, etc.)
}

export interface MaximViewRow {
  maxim_id: string;
  view_date: string;
  view_count: number;
}

export interface FeaturedMaximRow {
  feature_date: string;
  maxim_id: string | null;
  notes: string | null;
}
