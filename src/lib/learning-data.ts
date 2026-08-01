'use client';

import { supabase } from '@/lib/supabase';

export async function setBookmark(userId: string, maximId: string, note?: string) {
  return supabase.from('user_bookmarks').upsert({ user_id: userId, maxim_id: maximId, note: note ?? null, updated_at: new Date().toISOString() });
}

export async function removeBookmark(userId: string, maximId: string) {
  return supabase.from('user_bookmarks').delete().eq('user_id', userId).eq('maxim_id', maximId);
}

export async function saveFlashcardReview(userId: string, maximId: string, oldLevel: number, known: boolean) {
  const level = Math.max(1, Math.min(5, oldLevel + (known ? 1 : -1)));
  const days = [0, 1, 3, 7, 14, 30][level];
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + (known ? days : 1));
  return supabase.from('flashcard_progress').upsert({
    user_id: userId, maxim_id: maximId, level, repetitions: known ? level : 0,
    last_reviewed_at: new Date().toISOString(), next_review_at: nextReview.toISOString(), updated_at: new Date().toISOString(),
  });
}
