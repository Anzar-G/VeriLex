'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Save, X, Loader } from 'lucide-react';
import type { Maxim, LegalField } from '@/types';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';
import {
  TextField, TextAreaField, SelectField, MultiSelectField,
  StringListEditor, WordByWordEditor, NestedObjectEditor,
  KeyValueListEditor, CaseExampleEditor, BooleanField,
} from './FieldEditors';

// ── Legal field options ───────────────────────────────────────────────────
const LEGAL_FIELD_OPTIONS: { value: LegalField; label: string }[] = [
  { value: 'umum',        label: 'Asas Umum & Penafsiran' },
  { value: 'pidana',      label: 'Hukum Pidana & Acara Pidana' },
  { value: 'perdata',     label: 'Hukum Perdata & Kontrak' },
  { value: 'properti',    label: 'Hak Milik & Benda' },
  { value: 'keluarga',    label: 'Waris & Keluarga' },
  { value: 'bisnis',      label: 'Hukum Dagang & Korporasi' },
  { value: 'internasional', label: 'Hukum Internasional & HAM' },
  { value: 'tata-negara', label: 'Administrasi & Tata Negara' },
  { value: 'acara',       label: 'Acara Perdata & Pembuktian' },
  { value: 'lain-lain',   label: 'Lain-lain & Filosofis' },
  { value: 'administrasi', label: 'Administrasi' },
];

// ── Section accordion wrapper ─────────────────────────────────────────────
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid #EAECF0', marginBottom: '0.5rem' }}>
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.625rem 0.875rem', background: open ? '#EAF3FF' : '#F8F9FA',
          border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: open ? '1px solid #A2A9B1' : 'none',
        }}
      >
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#202122' }}>{title}</span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {open && (
        <div style={{ padding: '0.875rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main Editor ───────────────────────────────────────────────────────────
interface Props {
  maxim: Maxim;
  isDirectSave?: boolean;   // Editor/Senior Editor/Admin: save langsung ke DB
  onSaved: (updated: Maxim) => void;
  onCancel: () => void;
}

export default function MaximEditor({ maxim: initial, isDirectSave = true, onSaved, onCancel }: Props) {
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState<string | null>(null);

  // ── Revision tracking fields (wajib) ────────────────────────────────────
  const [editReason,        setEditReason]        = useState('');
  const [changeBasis,       setChangeBasis]       = useState('');
  const [changeBasisDetail, setChangeBasisDetail] = useState('');
  const { authUser } = useVeriLexStore();

  // ── Top-level fields ────────────────────────────────────────────────────
  const [latinPhrase,        setLatinPhrase]        = useState(initial.latinPhrase);
  const [pronunciationGuide, setPronunciationGuide] = useState(initial.pronunciationGuide);
  const [literalTranslation, setLiteralTranslation] = useState(initial.literalTranslation);
  const [indonesianMeaning,  setIndonesianMeaning]  = useState(initial.indonesianMeaning);
  const [legalMeaning,       setLegalMeaning]       = useState(initial.legalMeaning);
  const [history,            setHistory]            = useState(initial.history);
  const [legalFields,        setLegalFields]        = useState<LegalField[]>(initial.legalFields);
  const [synonyms,           setSynonyms]           = useState<string[]>(initial.synonyms || []);
  const [usedIn,             setUsedIn]             = useState<string[]>(initial.usedIn || []);

  // ── Classification ──────────────────────────────────────────────────────
  const [classif, setClassif] = useState(initial.classification || {
    legalBranch: '', nature: 'Substantif' as const, applicationLevel: 'Universal' as const, traditionSource: '',
  });

  // ── Applicability ───────────────────────────────────────────────────────
  const [applic, setApplic] = useState(initial.applicabilityStatus || {
    validInIndonesia: false, validInternationally: false, recognizedByDoctrine: false, codified: false, notes: '',
  });

  // ── Etymology ───────────────────────────────────────────────────────────
  const [wordByWord,         setWordByWord]         = useState(initial.wordByWord || []);
  const [etymologyNotes,     setEtymologyNotes]     = useState(initial.etymologyNotes || '');

  // ── Philosophical meaning ───────────────────────────────────────────────
  const [philos, setPhilos] = useState(initial.philosophicalMeaning || {
    origin: '', justiceValue: '', romanThought: '', modernRelevance: '',
  });

  // ── History timeline ────────────────────────────────────────────────────
  const [historyTimeline, setHistoryTimeline] = useState(initial.historyTimeline || []);

  // ── Doctrine development ────────────────────────────────────────────────
  const [doctrineDevelopment, setDoctrineDevelopment] = useState(initial.doctrineDevelopment || []);

  // ── Elements, conditions, exceptions ────────────────────────────────────
  const [elements,   setElements]   = useState<string[]>(initial.elements   || []);
  const [conditions, setConditions] = useState<string[]>(initial.conditions || []);
  const [exceptions, setExceptions] = useState<string[]>(initial.exceptions || []);

  // ── Scope ───────────────────────────────────────────────────────────────
  const [scopeApplies,      setScopeApplies]      = useState<string[]>(initial.scope?.applies      || []);
  const [scopeDoesNotApply, setScopeDoesNotApply] = useState<string[]>(initial.scope?.doesNotApply || []);

  // ── Legal basis ─────────────────────────────────────────────────────────
  const [legalBasisTable,         setLegalBasisTable]         = useState(initial.legalBasisTable         || []);
  const [indonesianSystemRelation, setIndonesianSystemRelation] = useState(initial.indonesianSystemRelation || '');

  // ── Examples ────────────────────────────────────────────────────────────
  const [normativeExamples, setNormativeExamples] = useState<string[]>(initial.normativeExamples || []);
  const [practicalExamples, setPracticalExamples] = useState<string[]>(initial.practicalExamples || []);

  // ── Jurisprudence ───────────────────────────────────────────────────────
  const [jurisprudence, setJurisprudence] = useState(initial.jurisprudence || initial.caseExamples || []);

  // ── Analysis ────────────────────────────────────────────────────────────
  const [analysis, setAnalysis] = useState(initial.analysis || {
    purpose: '', protectedValues: '', advantages: '', critique: '', limitations: '',
  });

  // ── Scholar views ────────────────────────────────────────────────────────
  const [scholarViews, setScholarViews] = useState(initial.scholarViews || []);

  // ── Controversies ────────────────────────────────────────────────────────
  const [controversies, setControversies] = useState(initial.controversies || []);

  // ── Common mistakes ──────────────────────────────────────────────────────
  const [commonMistakes, setCommonMistakes] = useState(initial.commonMistakes || []);

  // ── FAQ ──────────────────────────────────────────────────────────────────
  const [faq, setFaq] = useState(initial.faq || []);

  // ── Notes ────────────────────────────────────────────────────────────────
  const [maximNotes, setMaximNotes] = useState(initial.maximNotes || '');

  // ── Related terms ─────────────────────────────────────────────────────────
  const [relatedTerms, setRelatedTerms] = useState(initial.relatedTerms || []);

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Validate required revision fields
    if (!editReason.trim()) {
      setError('Alasan sunting wajib diisi.');
      setSaving(false);
      return;
    }

    const payload = {
      // top-level columns
      latin_phrase:         latinPhrase,
      pronunciation_guide:  pronunciationGuide,
      literal_translation:  literalTranslation,
      indonesian_meaning:   indonesianMeaning,
      legal_meaning:        legalMeaning,
      history,
      legal_fields:         legalFields,
      // jsonb data fields
      synonyms,
      usedIn,
      classification:       classif,
      applicabilityStatus:  applic,
      wordByWord,
      etymologyNotes,
      philosophicalMeaning: philos,
      historyTimeline,
      doctrineDevelopment,
      elements,
      conditions,
      exceptions,
      scope: { applies: scopeApplies, doesNotApply: scopeDoesNotApply },
      legalBasisTable,
      indonesianSystemRelation,
      normativeExamples,
      practicalExamples,
      jurisprudence,
      caseExamples: jurisprudence,
      analysis,
      scholarViews,
      controversies,
      commonMistakes,
      faq,
      maximNotes,
      relatedTerms,
      // revision tracking
      edit_reason:          editReason,
      change_basis:         changeBasis || null,
      change_basis_detail:  changeBasisDetail || null,
      editor_id:            authUser?.id ?? null,
      editor_name:          authUser?.displayName ?? 'Anonim',
    };

    try {
      if (isDirectSave) {
        // ── Editor/Senior Editor/Admin: simpan langsung ke DB ────────────
        const res = await apiFetch(`/api/maxims/${initial.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Gagal menyimpan');
        }
      } else {
        // ── Contributor: kirim ke edit_proposals (review queue) ──────────
        const res = await apiFetch(`/api/proposals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            maxim_id: initial.id,
            change_summary: `Revisi oleh kontributor pada ${new Date().toLocaleDateString('id-ID')}`,
            proposed_data: payload,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Gagal mengirim proposal');
        }
        // For contributor, we still update local display optimistically
        // but the DB isn't changed until approved
      }

      // Build updated Maxim for local state
      const updated: Maxim = {
        ...initial,
        latinPhrase, pronunciationGuide, literalTranslation,
        indonesianMeaning, legalMeaning, history, legalFields,
        synonyms, usedIn,
        classification: classif,
        applicabilityStatus: applic,
        wordByWord, etymologyNotes,
        philosophicalMeaning: philos,
        historyTimeline, doctrineDevelopment,
        elements, conditions, exceptions,
        scope: { applies: scopeApplies, doesNotApply: scopeDoesNotApply },
        legalBasisTable, indonesianSystemRelation,
        normativeExamples, practicalExamples,
        jurisprudence, caseExamples: jurisprudence,
        analysis, scholarViews, controversies, commonMistakes,
        faq, maximNotes, relatedTerms,
        updatedAt: new Date().toISOString(),
      };

      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0.5rem 0' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', margin: 0, padding: 0, fontSize: '1rem' }}>
          Sunting: <em style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>{initial.latinPhrase}</em>
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={onCancel} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <X size={13} /> Batal
          </button>
          <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            {saving ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> Menyimpan...</> : <><Save size={13} /> {isDirectSave ? 'Simpan ke Wiki' : 'Kirim untuk Ditinjau'}</>}
          </button>
        </div>
      </div>

      {/* ── Notice ── */}
      <div style={{ padding: '0.625rem 0.875rem', backgroundColor: '#EAF3FF', border: '1px solid #A2A9B1', marginBottom: '1.25rem', fontSize: '0.8125rem', color: '#0F1B3C', lineHeight: 1.5 }}>
        <strong>Perhatian:</strong> {isDirectSave
          ? 'Suntingan ini akan langsung terlihat oleh semua pengguna VeriLex. Pastikan informasi akurat dan dapat dipertanggungjawabkan.'
          : 'Suntingan Anda akan masuk ke antrian tinjauan dan baru dipublikasikan setelah disetujui Editor.'}
      </div>

      {error && (
        <div style={{ padding: '0.625rem 0.875rem', backgroundColor: '#FFF5F5', border: '1px solid #C85A54', marginBottom: '1rem', fontSize: '0.8125rem', color: '#C85A54' }}>
          ⚠ {error}
        </div>
      )}

      {/* ══ WAJIB: Alasan Sunting + Dasar Perubahan ══ */}
      <div style={{ border: '2px solid #0F1B3C', padding: '1rem', marginBottom: '1.25rem', backgroundColor: '#F8FAFC' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 700, color: '#0F1B3C', margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          ✏ Informasi Sunting <span style={{ color: '#C85A54' }}>*</span>
        </p>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>
            Alasan Sunting <span style={{ color: '#C85A54' }}>*</span>
          </label>
          <input
            type="text"
            value={editReason}
            onChange={e => setEditReason(e.target.value)}
            placeholder='Contoh: Menambah Putusan MK No. 55/PUU-VIII/2010 pada seksi Yurisprudensi'
            required
            style={{ width: '100%', border: `1px solid ${editReason.trim() ? '#A2A9B1' : '#C85A54'}`, borderRadius: '2px', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none' }}
          />
          <p style={{ fontSize: '0.6875rem', color: '#72777D', margin: '0.25rem 0 0' }}>
            Jelaskan secara spesifik apa yang diubah. Hindari alasan umum seperti &ldquo;update&rdquo; atau &ldquo;perbaikan&rdquo;.
          </p>
        </div>

        <div className="editor-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>
              Dasar Perubahan
            </label>
            <select
              value={changeBasis}
              onChange={e => setChangeBasis(e.target.value)}
              style={{ width: '100%', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer', backgroundColor: '#FFFFFF' }}
            >
              <option value="">— Pilih dasar (opsional) —</option>
              <option value="undang_undang">Undang-Undang / Peraturan</option>
              <option value="putusan">Putusan Pengadilan (MK/MA)</option>
              <option value="buku">Buku / Literatur</option>
              <option value="jurnal">Jurnal Ilmiah</option>
              <option value="doktrin">Doktrin Hukum</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>
              Detail Sumber
            </label>
            <input
              type="text"
              value={changeBasisDetail}
              onChange={e => setChangeBasisDetail(e.target.value)}
              placeholder='Contoh: UU No. 12/2011 Pasal 63'
              style={{ width: '100%', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* ══ SEKSI 1: Identitas Utama ══ */}
      <Section title="§1 Identitas Utama" defaultOpen>
        <TextField label="Frase Latin Asli" value={latinPhrase} onChange={setLatinPhrase} mono placeholder="Contoh: Lex Posterior Derogat Legi Priori" />
        <div className="editor-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <TextField label="Panduan Fonetis (IPA)" value={pronunciationGuide} onChange={setPronunciationGuide} mono placeholder="/lɛks .../" />
          <TextField label="Arti Literal / Terjemahan Harfiah" value={literalTranslation} onChange={setLiteralTranslation} />
        </div>
        <TextAreaField label="Arti Resmi Bahasa Indonesia" value={indonesianMeaning} onChange={setIndonesianMeaning} rows={2}
          hint="Kalimat ringkas yang menjelaskan makna utama asas ini." />
        <MultiSelectField label="Bidang Hukum" value={legalFields} onChange={v => setLegalFields(v as LegalField[])} options={LEGAL_FIELD_OPTIONS} />
        <StringListEditor label="Sinonim / Nama Lain" value={synonyms} onChange={setSynonyms} placeholder="Nama sinonim asas" />
        <StringListEditor label="Digunakan di" value={usedIn} onChange={setUsedIn} placeholder="Contoh: Indonesia" />
      </Section>

      {/* ══ SEKSI 2: Klasifikasi ══ */}
      <Section title="§2 Klasifikasi">
        <TextField label="Cabang Hukum" value={classif.legalBranch} onChange={v => setClassif(p => ({ ...p, legalBranch: v }))} placeholder="Contoh: Hukum Tata Negara" />
        <div className="editor-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <SelectField label="Sifat Asas" value={classif.nature}
            onChange={v => setClassif(p => ({ ...p, nature: v as typeof classif.nature }))}
            options={[
              { value: 'Prosedural',    label: 'Prosedural' },
              { value: 'Substantif',    label: 'Substantif' },
              { value: 'Interpretatif', label: 'Interpretatif' },
              { value: 'Imperatif',     label: 'Imperatif' },
            ]}
          />
          <SelectField label="Tingkat Penerapan" value={classif.applicationLevel}
            onChange={v => setClassif(p => ({ ...p, applicationLevel: v as typeof classif.applicationLevel }))}
            options={[
              { value: 'Universal', label: 'Universal' },
              { value: 'Nasional',  label: 'Nasional' },
              { value: 'Khusus',    label: 'Khusus' },
            ]}
          />
        </div>
        <TextField label="Sumber Tradisi" value={classif.traditionSource} onChange={v => setClassif(p => ({ ...p, traditionSource: v }))} placeholder="Contoh: Hukum Romawi Kuno" />
      </Section>

      {/* ══ SEKSI 3: Status Keberlakuan ══ */}
      <Section title="§3 Status Keberlakuan">
        <BooleanField label="Berlaku di Indonesia" value={applic.validInIndonesia} onChange={v => setApplic(p => ({ ...p, validInIndonesia: v }))} />
        <BooleanField label="Berlaku Secara Internasional" value={applic.validInternationally} onChange={v => setApplic(p => ({ ...p, validInternationally: v }))} />
        <BooleanField label="Diakui oleh Doktrin Hukum" value={applic.recognizedByDoctrine} onChange={v => setApplic(p => ({ ...p, recognizedByDoctrine: v }))} />
        <BooleanField label="Telah Dikodifikasi dalam Peraturan" value={applic.codified} onChange={v => setApplic(p => ({ ...p, codified: v }))} />
        <TextField label="Catatan Status" value={applic.notes || ''} onChange={v => setApplic(p => ({ ...p, notes: v }))} placeholder="Keterangan tambahan tentang status berlaku..." />
      </Section>

      {/* ══ SEKSI 4: Pendahuluan / Legal Meaning ══ */}
      <Section title="§4 Pendahuluan & Penjelasan Hukum">
        <TextAreaField label="Penjelasan & Analisis Hukum" value={legalMeaning} onChange={setLegalMeaning} rows={10}
          hint="Pisahkan paragraf dengan baris kosong (Enter 2x). Ini adalah bagian utama artikel." />
      </Section>

      {/* ══ SEKSI 5: Etimologi ══ */}
      <Section title="§5 Etimologi">
        <WordByWordEditor label="Tabel Kata per Kata" value={wordByWord} onChange={setWordByWord} />
        <TextAreaField label="Catatan Etimologi" value={etymologyNotes} onChange={setEtymologyNotes} rows={3}
          placeholder="Penjelasan struktur gramatikal Latin..." />
      </Section>

      {/* ══ SEKSI 6: Makna Filosofis ══ */}
      <Section title="§6 Makna Filosofis">
        <NestedObjectEditor label="" value={philos as unknown as Record<string, string>}
          onChange={v => setPhilos(v as unknown as typeof philos)}
          fields={[
            { key: 'origin',          label: 'Mengapa asas ini muncul?',              rows: 3 },
            { key: 'justiceValue',    label: 'Nilai keadilan yang ingin dicapai',      rows: 3 },
            { key: 'romanThought',    label: 'Dasar pemikiran ahli hukum Romawi',      rows: 3 },
            { key: 'modernRelevance', label: 'Relevansinya di era modern',              rows: 3 },
          ]}
        />
      </Section>

      {/* ══ SEKSI 7: Sejarah ══ */}
      <Section title="§7 Perkembangan Sejarah">
        <TextAreaField label="Paragraf Sejarah Umum" value={history} onChange={setHistory} rows={4} />
        <KeyValueListEditor label="Timeline Sejarah" value={historyTimeline as unknown as Record<string, string>[]}
          onChange={v => setHistoryTimeline(v as unknown as typeof historyTimeline)}
          keys={[
            { key: 'era',         label: 'Era',    placeholder: 'Contoh: Romawi Kuno' },
            { key: 'period',      label: 'Periode', placeholder: 'Contoh: Abad ke-6 M' },
            { key: 'description', label: 'Deskripsi', placeholder: 'Apa yang terjadi...' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 8: Perkembangan Doktrin ══ */}
      <Section title="§8 Perkembangan Doktrin">
        <KeyValueListEditor label="Tahap Perkembangan Doktrin" value={doctrineDevelopment as unknown as Record<string, string>[]}
          onChange={v => setDoctrineDevelopment(v as unknown as typeof doctrineDevelopment)}
          keys={[
            { key: 'era',         label: 'Era / Nama Doktrin', placeholder: 'Doktrin Klasik' },
            { key: 'description', label: 'Penjelasan',         placeholder: 'Bagaimana doktrin ini berkembang...' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 9-11: Unsur, Syarat, Pengecualian ══ */}
      <Section title="§9–11 Unsur, Syarat & Pengecualian">
        <StringListEditor label="Unsur-unsur Asas (§9)" value={elements} onChange={setElements} placeholder="Masukkan unsur..." />
        <StringListEditor label="Syarat Penerapan (§10)" value={conditions} onChange={setConditions} placeholder="Masukkan syarat..." />
        <StringListEditor label="Pengecualian (§11)" value={exceptions} onChange={setExceptions} placeholder="Masukkan pengecualian..." />
      </Section>

      {/* ══ SEKSI 12: Ruang Lingkup ══ */}
      <Section title="§12 Ruang Lingkup">
        <StringListEditor label="Berlaku pada" value={scopeApplies} onChange={setScopeApplies} placeholder="Situasi di mana asas ini berlaku..." />
        <StringListEditor label="Tidak berlaku pada" value={scopeDoesNotApply} onChange={setScopeDoesNotApply} placeholder="Situasi di mana asas ini tidak berlaku..." />
      </Section>

      {/* ══ SEKSI 13: Dasar Hukum Indonesia ══ */}
      <Section title="§13 Dasar Hukum Indonesia">
        <KeyValueListEditor label="Tabel Dasar Hukum" value={legalBasisTable as unknown as Record<string, string>[]}
          onChange={v => setLegalBasisTable(v as unknown as typeof legalBasisTable)}
          keys={[
            { key: 'statute',   label: 'Peraturan',  placeholder: 'UU No. 12 Tahun 2011' },
            { key: 'article',   label: 'Pasal',      placeholder: 'Pasal 63 ayat (2)' },
            { key: 'relevance', label: 'Relevansi',  placeholder: 'Penjelasan relevansi...' },
          ]}
        />
        <TextAreaField label="Hubungan dengan Sistem Hukum Indonesia" value={indonesianSystemRelation} onChange={setIndonesianSystemRelation} rows={4} />
      </Section>

      {/* ══ SEKSI 14-15: Contoh ══ */}
      <Section title="§14–15 Contoh Normatif & Praktik">
        <StringListEditor label="Contoh Normatif (§14)" value={normativeExamples} onChange={setNormativeExamples} placeholder="Contoh penerapan normatif..." />
        <StringListEditor label="Contoh Praktik (§15)" value={practicalExamples} onChange={setPracticalExamples} placeholder="Contoh penerapan dalam praktik..." />
      </Section>

      {/* ══ SEKSI 16: Yurisprudensi ══ */}
      <Section title="§16 Yurisprudensi & Putusan Pengadilan">
        <CaseExampleEditor label="Putusan Pengadilan" value={jurisprudence as Parameters<typeof CaseExampleEditor>[0]['value']} onChange={setJurisprudence as Parameters<typeof CaseExampleEditor>[0]['onChange']} />
      </Section>

      {/* ══ SEKSI 19: Analisis Akademik ══ */}
      <Section title="§19 Analisis Akademik">
        <NestedObjectEditor label="" value={analysis as unknown as Record<string, string>}
          onChange={v => setAnalysis(v as unknown as typeof analysis)}
          fields={[
            { key: 'purpose',         label: 'Tujuan Asas',           rows: 2 },
            { key: 'protectedValues', label: 'Nilai yang Dilindungi',  rows: 2 },
            { key: 'advantages',      label: 'Kelebihan',              rows: 2 },
            { key: 'critique',        label: 'Kritik',                 rows: 2 },
            { key: 'limitations',     label: 'Keterbatasan',           rows: 2 },
          ]}
        />
      </Section>

      {/* ══ SEKSI 20: Pandangan Para Ahli ══ */}
      <Section title="§20 Pandangan Para Ahli">
        <KeyValueListEditor label="Pandangan Pakar" value={scholarViews as unknown as Record<string, string>[]}
          onChange={v => setScholarViews(v as unknown as typeof scholarViews)}
          keys={[
            { key: 'name',   label: 'Nama Pakar',   placeholder: 'Prof. Dr. ...' },
            { key: 'view',   label: 'Pandangan',    placeholder: 'Kutipan pandangan...' },
            { key: 'source', label: 'Sumber Buku',  placeholder: 'Judul buku/jurnal (opsional)' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 21: Kontroversi ══ */}
      <Section title="§21 Kontroversi">
        <KeyValueListEditor label="Kontroversi" value={controversies as unknown as Record<string, string>[]}
          onChange={v => setControversies(v as unknown as typeof controversies)}
          keys={[
            { key: 'title',       label: 'Judul Kontroversi', placeholder: 'Nama isu yang diperdebatkan' },
            { key: 'description', label: 'Penjelasan',        placeholder: 'Penjelasan kontroversi...' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 22: Kesalahan Umum ══ */}
      <Section title="§22 Kesalahan Umum">
        <KeyValueListEditor label="Miskonsepsi & Fakta" value={commonMistakes as unknown as Record<string, string>[]}
          onChange={v => setCommonMistakes(v as unknown as typeof commonMistakes)}
          keys={[
            { key: 'misconception', label: 'Kesalahan Umum', placeholder: 'Miskonsepsi yang sering terjadi...' },
            { key: 'fact',          label: 'Fakta yang Benar', placeholder: 'Klarifikasi fakta...' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 23: FAQ ══ */}
      <Section title="§23 FAQ">
        <KeyValueListEditor label="Pertanyaan & Jawaban" value={faq as unknown as Record<string, string>[]}
          onChange={v => setFaq(v as unknown as typeof faq)}
          keys={[
            { key: 'question', label: 'Pertanyaan', placeholder: 'Pertanyaan yang sering diajukan...' },
            { key: 'answer',   label: 'Jawaban',    placeholder: 'Jawaban ringkas dan akurat...' },
          ]}
        />
      </Section>

      {/* ══ SEKSI 24: Catatan ══ */}
      <Section title="§24 Catatan Editor">
        <TextAreaField label="Catatan Praktis" value={maximNotes} onChange={setMaximNotes} rows={3}
          placeholder="Catatan penting untuk pembaca atau catatan editor..." />
      </Section>

      {/* ══ SEKSI 25: Istilah Berkaitan ══ */}
      <Section title="§25 Istilah Berkaitan">
        <KeyValueListEditor label="Glosarium Istilah" value={relatedTerms as unknown as Record<string, string>[]}
          onChange={v => setRelatedTerms(v as unknown as typeof relatedTerms)}
          keys={[
            { key: 'term',       label: 'Istilah Latin/Hukum', placeholder: 'Abrogasi' },
            { key: 'definition', label: 'Definisi',            placeholder: 'Pencabutan total...' },
          ]}
        />
      </Section>

      {/* ── Bottom save bar ── */}
      <div className="editor-action-bar" style={{ position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', borderTop: '1px solid #A2A9B1', padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '1rem' }}>
        <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          {saving ? <><Loader size={13} /> Menyimpan...</> : <><Save size={13} /> Simpan ke Wiki</>}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Batal</button>
        {error && <span style={{ color: '#C85A54', fontSize: '0.8125rem' }}>⚠ {error}</span>}
      </div>

    </form>
  );
}
