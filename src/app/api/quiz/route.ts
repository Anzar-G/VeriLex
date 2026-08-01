import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

type QuizRow = { id: string; maxim_id: string | null; prompt: string; options: string[]; correct_option_index: number; explanation: string | null; difficulty: string };

// Correct answers deliberately never leave the server.
export async function GET(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const { searchParams } = new URL(req.url);
  const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit') ?? 5)));
  const difficulty = searchParams.get('difficulty');
  const supabase = createServerClient();
  let query = supabase.from('quiz_questions').select('id, maxim_id, prompt, options, correct_option_index, explanation, difficulty').eq('is_active', true).limit(100);
  if (difficulty && ['dasar', 'menengah', 'lanjutan'].includes(difficulty)) query = query.eq('difficulty', difficulty);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const questions = (data ?? []).sort(() => Math.random() - 0.5).slice(0, limit);
  return NextResponse.json({ data: questions });
}

export async function POST(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const body = await req.json().catch(() => null) as { answers?: { questionId: string; optionIndex: number }[] } | null;
  if (!body?.answers?.length) return NextResponse.json({ error: 'Jawaban kuis diperlukan' }, { status: 400 });
  if (body.answers.length > 20 || body.answers.some(answer => !answer.questionId || !Number.isInteger(answer.optionIndex))) {
    return NextResponse.json({ error: 'Format jawaban tidak valid' }, { status: 400 });
  }
  const ids = body.answers.map(answer => answer.questionId);
  const supabase = createServerClient();
  const { data, error } = await supabase.from('quiz_questions').select('id, maxim_id, prompt, options, correct_option_index, explanation, difficulty').in('id', ids).eq('is_active', true);
  if (error || !data || data.length !== ids.length) return NextResponse.json({ error: 'Soal tidak ditemukan atau tidak aktif' }, { status: 400 });
  const byId = new Map((data as QuizRow[]).map(question => [question.id, question]));
  const result = body.answers.map(answer => {
    const question = byId.get(answer.questionId)!;
    return { questionId: question.id, maximId: question.maxim_id, correct: answer.optionIndex === question.correct_option_index, correctIndex: question.correct_option_index, explanation: question.explanation };
  });
  const correctAnswers = result.filter(row => row.correct).length;
  const score = Number(((correctAnswers / result.length) * 100).toFixed(2));
  const { error: saveError } = await supabase.from('quiz_attempts').insert({
    user_id: auth.actor!.id, score_percentage: score, total_questions: result.length,
    correct_answers: correctAnswers, answers: body.answers,
  });
  if (saveError) return NextResponse.json({ error: saveError.message }, { status: 500 });
  return NextResponse.json({ score, correctAnswers, totalQuestions: result.length, results: result });
}
