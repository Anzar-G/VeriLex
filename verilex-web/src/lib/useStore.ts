'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VeriLexState {
  favorites: string[]; // array of maxim IDs
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Custom user notes / bookmarks
  notes: Record<string, string>;
  setNote: (id: string, note: string) => void;

  // Quiz stats persistence
  completedQuizzesCount: number;
  incrementQuizCount: () => void;
}

export const useVeriLexStore = create<VeriLexState>()(
  persist(
    (set, get) => ({
      favorites: ['lex-posterior', 'nullum-crimen'], // default initial favorites
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

      completedQuizzesCount: 0,
      incrementQuizCount: () =>
        set((state) => ({ completedQuizzesCount: state.completedQuizzesCount + 1 })),
    }),
    {
      name: 'verilex-user-storage',
    }
  )
);
