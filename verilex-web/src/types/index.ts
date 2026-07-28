// VeriLex TypeScript Type Definitions

export type LegalField = 'pidana' | 'perdata' | 'tata-negara' | 'internasional' | 'administrasi';

export interface CaseExample {
  id: string;
  courtName: string;
  caseNumber: string;
  year: number;
  excerpt: string;
  summary: string;
  sourceUrl?: string;
}

export interface MaximRelation {
  id: string;
  latinPhrase: string;
  indonesianMeaning: string;
  relationType: 'sinonim' | 'antonim' | 'hierarkis' | 'turunan' | 'berlawanan';
}

export interface Maxim {
  id: string;
  latinPhrase: string;
  indonesianMeaning: string;
  literalTranslation: string;
  legalMeaning: string;
  history: string;
  pronunciationGuide: string;
  audioUrl?: string;
  legalFields: LegalField[];
  caseExamples: CaseExample[];
  relations: MaximRelation[];
  wordByWord: { word: string; meaning: string }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  legalFields: LegalField[];
  sortBy: 'relevansi' | 'abjad' | 'terbaru';
}

export interface QuizQuestion {
  id: string;
  maximId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalField: LegalField;
  difficulty: 'mudah' | 'sedang' | 'sulit';
}

export interface FlashcardSession {
  maximId: string;
  level: 1 | 2 | 3 | 4 | 5;
  lastReviewed: string;
  knownCount: number;
  unknownCount: number;
}

export interface UserProgress {
  userId: string;
  totalStudied: number;
  quizzesTaken: number;
  averageScore: number;
  streakDays: number;
  progressByField: Record<LegalField, number>;
  flashcardLevels: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface LegalFieldMeta {
  id: LegalField;
  label: string;
  count: number;
  description: string;
}
