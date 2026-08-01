import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const supabase = createServerClient();
  const userId = auth.actor!.id;
  const [bookmarks, flashcards, attempts] = await Promise.all([
    supabase.from('user_bookmarks').select('maxim_id').eq('user_id', userId),
    supabase.from('flashcard_progress').select('maxim_id, level, last_reviewed_at').eq('user_id', userId),
    supabase.from('quiz_attempts').select('score_percentage, completed_at').eq('user_id', userId).order('completed_at', { ascending: false }),
  ]);
  if (bookmarks.error || flashcards.error || attempts.error) return NextResponse.json({ error: 'Gagal memuat progres' }, { status: 500 });
  const flashcardRows = flashcards.data ?? [];
  const quizRows = attempts.data ?? [];
  const levels = [1, 2, 3, 4, 5].reduce((out, level) => ({ ...out, [level]: flashcardRows.filter(row => row.level === level).length }), {} as Record<number, number>);
  const averageScore = quizRows.length ? Math.round(quizRows.reduce((sum, row) => sum + Number(row.score_percentage), 0) / quizRows.length) : 0;
  return NextResponse.json({
    bookmarks: bookmarks.data ?? [],
    flashcards: flashcardRows,
    quizAttempts: quizRows,
    quizzesTaken: quizRows.length,
    averageScore,
    levels,
  });
}
