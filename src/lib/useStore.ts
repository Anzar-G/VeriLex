'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Maxim } from '@/types';
import { supabase } from './supabase';

export type UserRole =
  | 'reader' | 'contributor' | 'editor'
  | 'reviewer' | 'senior_editor' | 'subject_expert' | 'administrator';

const ROLE_LEVEL: Record<UserRole, number> = {
  reader: 0, contributor: 1, reviewer: 2,
  subject_expert: 2, editor: 3, senior_editor: 4, administrator: 5,
};

export function hasMinRole(role: UserRole, required: UserRole): boolean {
  return (ROLE_LEVEL[role] ?? 0) >= (ROLE_LEVEL[required] ?? 0);
}

export const ROLE_LABELS: Record<UserRole, string> = {
  reader:         'Pembaca',
  contributor:    'Kontributor',
  reviewer:       'Pengulas',
  subject_expert: 'Pakar Bidang',
  editor:         'Editor',
  senior_editor:  'Editor Senior',
  administrator:  'Administrator',
};

export const ROLE_COLORS: Record<UserRole, { bg: string; text: string; border: string }> = {
  reader:         { bg: '#F8F9FA', text: '#54595D', border: '#A2A9B1' },
  contributor:    { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
  reviewer:       { bg: '#F0FDFA', text: '#134E4A', border: '#99F6E4' },
  subject_expert: { bg: '#FDF4FF', text: '#6B21A8', border: '#E9D5FF' },
  editor:         { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  senior_editor:  { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
  administrator:  { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
};

interface VeriLexState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Custom user notes / bookmarks
  notes: Record<string, string>;
  setNote: (id: string, note: string) => void;

  // ── Supabase Auth ──────────────────────────────────────────────────────
  authUser: {
    id: string;
    email: string;
    username: string;
    displayName: string;
    role: UserRole;
    avatarUrl?: string;
  } | null;
  setAuthUser: (user: VeriLexState['authUser']) => void;
  clearAuthUser: () => void;

  // Legacy local auth (kept for backwards compat, use authUser instead)
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

      // ── Supabase Auth ────────────────────────────────────────────────
      authUser: null,
      setAuthUser: (user) => set(() => ({ authUser: user, user: { isLoggedIn: !!user, name: user?.displayName || 'Tamu Akademisi' } })),
      clearAuthUser: () => {
        supabase.auth.signOut();
        set(() => ({ authUser: null, user: { isLoggedIn: false, name: 'Tamu Akademisi' } }));
      },

      // Auth (legacy)
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
