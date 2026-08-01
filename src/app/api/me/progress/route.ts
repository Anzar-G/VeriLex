import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const supabase = createServerClient();
  const userId = auth.actor!.id;
  const [bookmarks, flashcards, attempts, maxims] = await Promise.all([
    supabase.from('user_bookmarks').select('maxim_id').eq('user_id', userId),
    supabase.from('flashcard_progress').select('maxim_id, level, last_reviewed_at').eq('user_id', userId),
    supabase.from('quiz_attempts').select('score_percentage, completed_at').eq('user_id', userId).order('completed_at', { ascending: false }),
    supabase.from('maxims').select('id, legal_fields').eq('is_active', true),
  ]);
  if (bookmarks.error || flashcards.error || attempts.error || maxims.error) return NextResponse.json({ error: 'Gagal memuat progres' }, { status: 500 });
  const flashcardRows = flashcards.data ?? [];
  const quizRows = attempts.data ?? [];
  const levels = [1, 2, 3, 4, 5].reduce((out, level) => ({ ...out, [level]: flashcardRows.filter(row => row.level === level).length }), {} as Record<number, number>);
  const averageScore = quizRows.length ? Math.round(quizRows.reduce((sum, row) => sum + Number(row.score_percentage), 0) / quizRows.length) : 0;
  const masteredIds = new Set(flashcardRows.filter(row => row.level >= 3).map(row => row.maxim_id));
  const fieldTotals = new Map<string, { total: number; mastered: number }>();
  for (const maxim of maxims.data ?? []) {
    for (const field of maxim.legal_fields ?? []) {
      const current = fieldTotals.get(field) ?? { total: 0, mastered: 0 };
      current.total += 1;
      if (masteredIds.has(maxim.id)) current.mastered += 1;
      fieldTotals.set(field, current);
    }
  }
  const progressByField = Object.fromEntries([...fieldTotals].map(([field, value]) => [field, value.total ? Math.round((value.mastered / value.total) * 100) : 0]));
  return NextResponse.json({
    bookmarks: bookmarks.data ?? [],
    flashcards: flashcardRows,
    quizAttempts: quizRows,
    quizzesTaken: quizRows.length,
    averageScore,
    levels,
    progressByField,
  });
}
