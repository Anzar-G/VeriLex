import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnon)) {
  console.warn('⚠️ [VeriLex] Supabase credentials are missing from environment variables!');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnon || 'placeholder-anon-key'
);

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

export interface DiscussionRow {
  id: string;
  maxim_id: string;
  parent_id: string | null;
  author_id: string | null;
  author_name: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface EditorReputationRow {
  id: string;
  user_id: string;
  score: number;
  edits_accepted: number;
  edits_rejected: number;
  references_added: number;
  reports_valid: number;
  updated_at: string;
}
