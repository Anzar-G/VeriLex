'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Maxim } from '@/types';

interface VeriLexState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Custom user notes / bookmarks
  notes: Record<string, string>;
  setNote: (id: string, note: string) => void;

  // Authentication State
  user: {
    isLoggedIn: boolean;
    name: string;
  };
  loginUser: (name: string) => void;
  logoutUser: () => void;

  // Quiz Stats
  quizScores: number[]; // array of percentages (e.g. 80, 100)
  addQuizScore: (scorePercentage: number) => void;

  // Flashcard Progress (levels 1-5 for spaced repetition)
  flashcardLevels: Record<string, number>;
  setFlashcardLevel: (id: string, level: number) => void;

  // Wikipedia Edits (local overrides for wiki pages)
  editedMaxims: Record<string, Partial<Maxim>>;
  updateMaxim: (id: string, data: Partial<Maxim>) => void;
  resetMaxim: (id: string) => void;
}

export const useVeriLexStore = create<VeriLexState>()(
  persist(
    (set, get) => ({
      favorites: ['lex-posterior', 'nullum-crimen'],
      toggleFavorite: (id: string) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),
      isFavorite: (id: string) => get().favorites.includes(id),

      notes: {},
      setNote: (id: string, note: string) =>
        set((state) => ({
          notes: { ...state.notes, [id]: note },
        })),

      // Auth
      user: {
        isLoggedIn: false,
        name: 'Tamu Akademisi',
      },
      loginUser: (name: string) =>
        set(() => ({
          user: { isLoggedIn: true, name: name || 'Tamu Akademisi' },
        })),
      logoutUser: () =>
        set(() => ({
          user: { isLoggedIn: false, name: 'Tamu Akademisi' },
        })),

      // Quiz
      quizScores: [80], // Initial mock score
      addQuizScore: (scorePercentage: number) =>
        set((state) => ({
          quizScores: [...state.quizScores, scorePercentage],
        })),

      // Flashcards
      flashcardLevels: {
        'lex-posterior': 5,
        'lex-specialis': 4,
        'nullum-crimen': 5,
        'pacta-sunt-servanda': 3,
      },
      setFlashcardLevel: (id: string, level: number) =>
        set((state) => ({
          flashcardLevels: { ...state.flashcardLevels, [id]: level },
        })),

      // Edited Wiki Pages
      editedMaxims: {},
      updateMaxim: (id: string, data: Partial<Maxim>) =>
        set((state) => ({
          editedMaxims: {
            ...state.editedMaxims,
            [id]: { ...state.editedMaxims[id], ...data },
          },
        })),
      resetMaxim: (id: string) =>
        set((state) => {
          const updated = { ...state.editedMaxims };
          delete updated[id];
          return { editedMaxims: updated };
        }),
    }),
    {
      name: 'verilex-user-storage-v2',
    }
  )
);
