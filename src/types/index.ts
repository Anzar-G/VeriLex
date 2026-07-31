// VeriLex TypeScript Type Definitions — Standar Halaman v2.0

export type LegalField = 'umum' | 'pidana' | 'perdata' | 'properti' | 'keluarga' | 'bisnis' | 'internasional' | 'tata-negara' | 'acara' | 'lain-lain' | 'administrasi';

// ─────────────────────────────────────────
// Section 2: Classification
// ─────────────────────────────────────────
export interface MaximClassification {
  legalBranch: string;
  nature: 'Prosedural' | 'Substantif' | 'Interpretatif' | 'Imperatif';
  applicationLevel: 'Universal' | 'Nasional' | 'Khusus';
  traditionSource: string;
}

// ─────────────────────────────────────────
// Section 3: Applicability Status
// ─────────────────────────────────────────
export interface ApplicabilityStatus {
  validInIndonesia: boolean;
  validInternationally: boolean;
  recognizedByDoctrine: boolean;
  codified: boolean;
  notes?: string;
}

// ─────────────────────────────────────────
// Section 5: Etymology (Extended)
// ─────────────────────────────────────────
export interface WordByWordExtended {
  word: string;
  latinForm: string;
  partOfSpeech: string;
  meaning: string;
}

// ─────────────────────────────────────────
// Section 6: Philosophical Meaning
// ─────────────────────────────────────────
export interface PhilosophicalMeaning {
  origin: string;
  justiceValue: string;
  romanThought: string;
  modernRelevance: string;
}

// ─────────────────────────────────────────
// Section 7: History Timeline
// ─────────────────────────────────────────
export interface HistoryTimeline {
  era: string;
  period: string;
  description: string;
}

// ─────────────────────────────────────────
// Section 8: Doctrine Development
// ─────────────────────────────────────────
export interface DoctrineDevelopment {
  era: string;
  description: string;
}

// ─────────────────────────────────────────
// Section 12: Scope
// ─────────────────────────────────────────
export interface MaximScope {
  applies: string[];
  doesNotApply: string[];
}

// ─────────────────────────────────────────
// Section 13: Legal Basis Table (Indonesia)
// ─────────────────────────────────────────
export interface LegalBasisEntry {
  statute: string;
  article: string;
  relevance: string;
}

// ─────────────────────────────────────────
// Section 17: Jurisprudence / Case Examples
// ─────────────────────────────────────────
export interface CaseExample {
  id: string;
  courtName: string;
  caseNumber: string;
  year: number;
  date?: string;
  excerpt: string;
  context: string;
  analysis?: string;
  summary: string;
  sourceUrl?: string;
}

// ─────────────────────────────────────────
// Section 18: International Comparison
// ─────────────────────────────────────────
export interface InternationalComparison {
  country: string;
  status: 'Dikenal' | 'Tidak Dikenal' | 'Dikenal Sebagian';
  description: string;
}

// ─────────────────────────────────────────
// Section 19: Maxim-to-Maxim Comparison
// ─────────────────────────────────────────
export interface MaximComparison {
  maximId: string;
  latinPhrase: string;
  whenUsed: string;
}

// ─────────────────────────────────────────
// Section 20: Academic Analysis (Extended)
// ─────────────────────────────────────────
export interface MaximAnalysis {
  purpose: string;
  protectedValues: string;
  advantages: string;
  critique: string;
  limitations: string;
}

// ─────────────────────────────────────────
// Section 21: Scholar Views
// ─────────────────────────────────────────
export interface ScholarView {
  name: string;
  view: string;
  source?: string;
}

// ─────────────────────────────────────────
// Section 22: Controversies
// ─────────────────────────────────────────
export interface Controversy {
  title: string;
  description: string;
}

// ─────────────────────────────────────────
// Section 23: Common Mistakes
// ─────────────────────────────────────────
export interface CommonMistake {
  misconception: string;
  fact: string;
}

// ─────────────────────────────────────────
// Section 24: FAQ
// ─────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────
// Section 26: Related Terms
// ─────────────────────────────────────────
export interface RelatedTerm {
  term: string;
  definition: string;
}

// ─────────────────────────────────────────
// Section 27: Relations (Lihat Juga)
// ─────────────────────────────────────────
export interface MaximRelation {
  id: string;
  latinPhrase: string;
  indonesianMeaning: string;
  relationType: 'sinonim' | 'antonim' | 'hierarkis' | 'turunan' | 'berlawanan';
}

// ─────────────────────────────────────────
// Section 28: Tiered References
// ─────────────────────────────────────────
export interface MaximReferences {
  primary?: {
    constitutions?: string[];
    statutes?: string[];
    rulings?: string[];
    regulations?: string[];
  };
  secondary?: {
    books?: string[];
    journals?: string[];
  };
  tertiary?: {
    encyclopedias?: string[];
    legalDictionaries?: string[];
  };
}

// ─────────────────────────────────────────
// Section 29: Further Reading
// ─────────────────────────────────────────
export interface FurtherReading {
  title: string;
  author: string;
  type: 'artikel' | 'buku' | 'jurnal' | 'disertasi';
  year?: number;
}

// ─────────────────────────────────────────
// Section 30: Metadata
// ─────────────────────────────────────────
export interface MaximMeta {
  categories: string[];
  portals: string[];
  tags: string[];
}

// ─────────────────────────────────────────
// Main Maxim Interface — v2.0
// ─────────────────────────────────────────
export interface Maxim {
  id: string;

  // Core fields (Infobox — Seksi 1)
  latinPhrase: string;
  indonesianMeaning: string;
  literalTranslation: string;
  pronunciationGuide: string;
  audioUrl?: string;
  legalFields: LegalField[];
  synonyms?: string[];
  usedIn?: string[];

  // Seksi 2: Classification
  classification?: MaximClassification;

  // Seksi 3: Status Keberlakuan
  applicabilityStatus?: ApplicabilityStatus;

  // Seksi 4: Pendahuluan
  legalMeaning: string;

  // Seksi 5: Etimologi (basic + extended)
  wordByWord: { word: string; meaning: string }[];
  wordByWordExtended?: WordByWordExtended[];
  etymologyNotes?: string;

  // Seksi 6: Makna Filosofis
  philosophicalMeaning?: PhilosophicalMeaning;

  // Seksi 7: Perkembangan Sejarah
  history: string;
  historyTimeline?: HistoryTimeline[];

  // Seksi 8: Perkembangan Doktrin
  doctrineDevelopment?: DoctrineDevelopment[];

  // Seksi 9: Unsur-unsur Asas
  elements?: string[];

  // Seksi 10: Syarat Penerapan
  conditions?: string[];

  // Seksi 11: Pengecualian
  exceptions?: string[];

  // Seksi 12: Ruang Lingkup
  scope?: MaximScope;

  // Seksi 13: Dasar Hukum Indonesia (tabel)
  legalBasisTable?: LegalBasisEntry[];
  indonesianLegalBasis?: string;

  // Seksi 14: Hubungan dengan Sistem Hukum Indonesia
  indonesianSystemRelation?: string;

  // Seksi 15: Contoh Normatif
  normativeExamples?: string[];

  // Seksi 16: Contoh Praktik
  practicalExamples?: string[];

  // Seksi 17: Yurisprudensi
  jurisprudence?: CaseExample[];
  caseExamples: CaseExample[];

  // Seksi 18: Perbandingan Internasional
  internationalComparisons?: InternationalComparison[];

  // Seksi 19: Perbandingan dengan Maksim Lain
  maximComparisons?: MaximComparison[];

  // Seksi 20: Analisis Akademik
  analysis?: MaximAnalysis;

  // Seksi 21: Pandangan Para Ahli
  scholarViews?: ScholarView[];

  // Seksi 22: Kontroversi
  controversies?: Controversy[];

  // Seksi 23: Kesalahan Umum
  commonMistakes?: CommonMistake[];

  // Seksi 24: FAQ
  faq?: FAQItem[];

  // Seksi 25: Catatan
  maximNotes?: string;

  // Seksi 26: Istilah Berkaitan
  relatedTerms?: RelatedTerm[];

  // Seksi 27: Lihat Juga / Hubungan Asas
  relations: MaximRelation[];

  // Seksi 28: Referensi (bertingkat)
  references?: MaximReferences;

  // Seksi 29: Bacaan Lanjutan
  furtherReading?: FurtherReading[];

  // Seksi 30: Metadata
  meta?: MaximMeta;

  // System fields
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────
// Supporting Interfaces
// ─────────────────────────────────────────

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
