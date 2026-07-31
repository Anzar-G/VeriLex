'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Volume2, Share2, RotateCcw, Edit2, MessageSquare } from 'lucide-react';
import type { Maxim } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import { useVeriLexStore } from '@/lib/useStore';

const fieldLabels: Record<string, string> = {
  'umum': 'Asas Umum & Penafsiran',
  'pidana': 'Pidana & Acara Pidana',
  'perdata': 'Perdata & Kontrak',
  'properti': 'Hak Milik & Benda',
  'keluarga': 'Waris & Keluarga',
  'bisnis': 'Dagang & Korporasi',
  'internasional': 'Internasional & HAM',
  'tata-negara': 'Administrasi & Tata Negara',
  'acara': 'Acara Perdata & Pembuktian',
  'lain-lain': 'Lain-lain & Filosofis',
  'administrasi': 'Administrasi',
};

const relationTypeLabels: Record<string, string> = {
  'sinonim': 'Sejenis',
  'antonim': 'Berlawanan',
  'hierarkis': 'Hierarki',
  'turunan': 'Turunan',
  'berlawanan': 'Berlawanan',
};

const relationColors: Record<string, { bg: string; border: string; text: string }> = {
  sinonim: { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  antonim: { bg: '#FAF8F3', border: '#D4A574', text: '#AC6600' },
  hierarkis: { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  turunan: { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  berlawanan: { bg: '#FAF8F3', border: '#D4A574', text: '#AC6600' },
};

const NA_TEXT = 'Belum tersedia untuk asas ini.';

interface Props { maxim: Maxim; }

function WikiHR() {
  return <hr style={{ border: 'none', borderTop: '1px solid #A2A9B1', margin: '0.5rem 0 0.75rem' }} />;
}

function SectionPlaceholder() {
  return (
    <p style={{ fontSize: '0.875rem', color: '#72777D', fontStyle: 'italic', margin: '0.5rem 0 1.25rem', lineHeight: 1.6 }}>
      {NA_TEXT}
    </p>
  );
}

export default function MaximDetailClient({ maxim: initialMaxim }: Props) {
  const { favorites, toggleFavorite, notes, setNote, editedMaxims, updateMaxim, resetMaxim } = useVeriLexStore();
  const isFav = favorites.includes(initialMaxim.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'baca' | 'diskusi' | 'sunting'>('baca');

  const localOverride = editedMaxims[initialMaxim.id] || {};
  const maxim: Maxim = {
    ...initialMaxim,
    ...localOverride,
    latinPhrase: localOverride.latinPhrase || initialMaxim.latinPhrase,
    pronunciationGuide: localOverride.pronunciationGuide || initialMaxim.pronunciationGuide,
    literalTranslation: localOverride.literalTranslation || initialMaxim.literalTranslation,
    indonesianMeaning: localOverride.indonesianMeaning || initialMaxim.indonesianMeaning,
    legalMeaning: localOverride.legalMeaning || initialMaxim.legalMeaning,
  };

  const localNote = notes[maxim.id] || '';
  const [noteText, setNoteText] = useState(localNote);
  const [noteSaved, setNoteSaved] = useState(false);
  const [editLatin, setEditLatin] = useState(maxim.latinPhrase);
  const [editFonetis, setEditFonetis] = useState(maxim.pronunciationGuide);
  const [editLiteral, setEditLiteral] = useState(maxim.literalTranslation);
  const [editIndo, setEditIndo] = useState(maxim.indonesianMeaning);
  const [editLegal, setEditLegal] = useState(maxim.legalMeaning);
  const [editSaved, setEditSaved] = useState(false);

  const handleAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(maxim.latinPhrase);
      u.lang = 'it-IT'; u.rate = 0.85;
      u.onstart = () => setIsPlaying(true);
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault(); setNote(maxim.id, noteText);
    setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMaxim(maxim.id, { latinPhrase: editLatin, pronunciationGuide: editFonetis, literalTranslation: editLiteral, indonesianMeaning: editIndo, legalMeaning: editLegal });
    setEditSaved(true); setActiveTab('baca'); setTimeout(() => setEditSaved(false), 2500);
  };

  const handleResetEdit = () => {
    if (confirm('Kembalikan artikel ke versi rujukan asli?')) {
      resetMaxim(maxim.id);
      setEditLatin(initialMaxim.latinPhrase); setEditFonetis(initialMaxim.pronunciationGuide);
      setEditLiteral(initialMaxim.literalTranslation); setEditIndo(initialMaxim.indonesianMeaning);
      setEditLegal(initialMaxim.legalMeaning); setActiveTab('baca');
    }
  };

  const paragraphs = (text: string) =>
    text.split('\n\n').filter(Boolean).map((p, i) => (
      <p key={i} style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', marginBottom: '0.75rem' }} className="text-wrap-safe">
        {p.trim()}
      </p>
    ));

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TechArticle',
    'headline': `${maxim.latinPhrase} — Arti & Penjelasan Hukum`,
    'description': maxim.indonesianMeaning, 'inLanguage': 'id',
    'author': { '@type': 'Organization', 'name': 'VeriLex Editorial' },
  };

  // Build TOC sections dynamically
  const tocSections = [
    { id: 'infobox-klasifikasi', label: '1 Informasi Ringkas & Klasifikasi' },
    { id: 'status', label: '2 Status Keberlakuan' },
    { id: 'pendahuluan', label: '3 Pendahuluan' },
    { id: 'etimologi', label: '4 Makna Harfiah & Etimologi' },
    { id: 'filosofis', label: '5 Makna Filosofis' },
    { id: 'sejarah', label: '6 Perkembangan Sejarah' },
    { id: 'doktrin', label: '7 Perkembangan Doktrin' },
    { id: 'unsur', label: '8 Unsur-unsur Asas' },
    { id: 'syarat', label: '9 Syarat Penerapan' },
    { id: 'pengecualian', label: '10 Pengecualian' },
    { id: 'lingkup', label: '11 Ruang Lingkup' },
    { id: 'dasar-hukum', label: '12 Dasar Hukum Indonesia' },
    { id: 'sistem-hukum', label: '13 Hubungan dengan Sistem Hukum Indonesia' },
    { id: 'contoh-normatif', label: '14 Contoh Normatif' },
    { id: 'contoh-praktik', label: '15 Contoh Praktik' },
    { id: 'yurisprudensi', label: '16 Yurisprudensi' },
    { id: 'internasional', label: '17 Perbandingan Internasional' },
    { id: 'perbandingan-maksim', label: '18 Perbandingan dengan Maksim Lain' },
    { id: 'analisis', label: '19 Analisis Akademik' },
    { id: 'ahli', label: '20 Pandangan Para Ahli' },
    { id: 'kontroversi', label: '21 Kontroversi' },
    { id: 'kesalahan', label: '22 Kesalahan Umum' },
    { id: 'faq', label: '23 FAQ' },
    { id: 'catatan', label: '24 Catatan' },
    { id: 'istilah', label: '25 Istilah Berkaitan' },
    { id: 'lihat-juga', label: '26 Lihat Juga' },
    { id: 'referensi', label: '27 Referensi' },
    { id: 'bacaan', label: '28 Bacaan Lanjutan' },
  ];

  const h2Style = { fontSize: '1rem', fontWeight: 700, color: '#202122', borderBottom: 'none', margin: '1.5rem 0 0' };
  const h3Style = { fontSize: '0.875rem', fontWeight: 700, color: '#202122', margin: '0.875rem 0 0.375rem' };
  const listStyle: React.CSSProperties = { listStyleType: 'disc', paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: '0.5rem 0 1rem' };
  const tableCell: React.CSSProperties = { border: '1px solid #EAECF0', padding: '0.375rem 0.625rem', fontSize: '0.8125rem', verticalAlign: 'top' };
  const tableHeader: React.CSSProperties = { ...tableCell, backgroundColor: '#F8F9FA', fontWeight: 700 };

  return (
    <div className="container-page" style={{ display: 'flex', gap: '1rem' }} suppressHydrationWarning>
      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="vector-sidebar"><Sidebar /></div>

      <div className="wiki-main-content lg:border-l lg:border-[#A2A9B1] lg:pl-6">

        {/* ── Action Tabs ── */}
        <div className="vector-tabs-container" suppressHydrationWarning>
          <div className="vector-tabs-group" suppressHydrationWarning>
            <button suppressHydrationWarning onClick={() => setActiveTab('baca')} className={`vector-tab-item vector-tab-btn ${activeTab === 'baca' || activeTab === 'sunting' ? 'active' : ''}`}>Halaman</button>
            <button suppressHydrationWarning onClick={() => setActiveTab('diskusi')} className={`vector-tab-item vector-tab-btn ${activeTab === 'diskusi' ? 'active' : ''}`}>Diskusi & Catatan</button>
          </div>
          <div className="vector-tabs-group" suppressHydrationWarning>
            <button suppressHydrationWarning onClick={() => setActiveTab('baca')} className={`vector-tab-item vector-tab-btn ${activeTab === 'baca' ? 'active' : ''}`}>Baca</button>
            <button suppressHydrationWarning onClick={() => setActiveTab('sunting')} className={`vector-tab-item vector-tab-btn ${activeTab === 'sunting' ? 'active' : ''}`}>Sunting</button>
            <span className="vector-tab-item disabled">Lihat riwayat</span>
            <button onClick={() => toggleFavorite(maxim.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 0.5rem', color: isFav ? 'var(--bronze)' : '#72777D' }} aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}>
              <Star size={14} fill={isFav ? 'var(--bronze)' : 'none'} />
            </button>
          </div>
        </div>

        {editSaved && (
          <div style={{ backgroundColor: 'rgba(46, 125, 50, 0.08)', border: '1px solid var(--success)', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', marginBottom: '1rem', color: 'var(--success)' }}>
            Perubahan lokal berhasil disimpan.
          </div>
        )}

        {/* ══ TAB: BACA ══ */}
        {activeTab === 'baca' && (
          <>
            {/* ── INFOBOX ── */}
            <div className="wiki-infobox">
              <div className="wiki-infobox-header">
                Asas Hukum Latin {Object.keys(localOverride).length > 0 && '(Tersunting)'}
              </div>
              {[
                { label: 'Frase Latin', value: maxim.latinPhrase, mono: true },
                { label: 'Pelafalan', value: maxim.pronunciationGuide, mono: true },
                { label: 'Arti Harfiah', value: maxim.literalTranslation },
                { label: 'Bidang Hukum', value: maxim.legalFields.map(f => fieldLabels[f]).join(', ') },
                { label: 'Asal Tradisi', value: maxim.classification?.traditionSource || 'Hukum Romawi' },
                { label: 'Status', value: maxim.classification?.nature || '—' },
                { label: 'Tingkat', value: maxim.classification?.applicationLevel || '—' },
                ...(maxim.usedIn && maxim.usedIn.length > 0 ? [{ label: 'Digunakan di', value: maxim.usedIn.join(', ') }] : []),
                ...(maxim.synonyms && maxim.synonyms.length > 0 ? [{ label: 'Sinonim', value: maxim.synonyms.join(', '), mono: true }] : []),
              ].map((row, i) => (
                <div key={i} className="wiki-infobox-row">
                  <div className="wiki-infobox-label">{row.label}</div>
                  <div className="wiki-infobox-value" style={{ fontFamily: row.mono ? 'var(--font-mono)' : 'inherit', fontStyle: row.mono ? 'italic' : 'normal' }}>
                    {row.value}
                  </div>
                </div>
              ))}
              <div className="wiki-infobox-actions">
                <button onClick={handleAudio} className="wiki-infobox-btn"><Volume2 size={11} /> {isPlaying ? 'Suara...' : 'Pelafalan'}</button>
                <button onClick={handleShare} className="wiki-infobox-btn">{copied ? 'Disalin!' : <><Share2 size={11} /> Bagikan</>}</button>
              </div>
              {Object.keys(localOverride).length > 0 && (
                <button onClick={handleResetEdit} className="wiki-infobox-btn" style={{ width: '100%', borderColor: '#C85A54', background: '#FFF5F5', color: '#C85A54', marginTop: '0.375rem' }}>
                  <RotateCcw size={10} /> Kembalikan Asli
                </button>
              )}
            </div>

            {/* ── Article Title ── */}
            <h1 className="text-wrap-safe">{maxim.latinPhrase}</h1>
            <span className="wiki-tagline">Dari VeriLex, ensiklopedia maksim hukum bebas</span>

            {/* ── Lead Paragraph (flows left of float-right infobox) ── */}
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: '0.5rem 0 0.5rem' }}>
              <b>{maxim.latinPhrase}</b>{' '}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#72777D' }}>({maxim.pronunciationGuide})</span>
              {' '}adalah maksim hukum Latin yang berarti{' '}
              &ldquo;<i>{maxim.indonesianMeaning}</i>&rdquo;.
              {' '}Asas ini digunakan untuk menyelesaikan konflik antara dua peraturan yang memiliki hierarki yang sama dan mengatur materi yang sama.
            </p>
            {paragraphs(maxim.legalMeaning)}

            {/* ── Table of Contents (clear: both so it falls below infobox) ── */}
            <div style={{ clear: 'both' }} />
            <div className={`wiki-toc${tocExpanded ? '' : ' toc-collapsed'}`}>
              <div className="wiki-toc-title" onClick={() => setTocExpanded(p => !p)}>
                <span>Daftar isi</span>
                <span style={{ fontSize: '0.7rem', color: '#0645AD', marginLeft: '0.5rem' }}>[{tocExpanded ? 'sembunyikan' : 'tampilkan'}]</span>
              </div>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', lineHeight: 1.9, columns: 2 }}>
                {tocSections.map((s, i) => (
                  <li key={i}><a href={`#${s.id}`} className="wiki-link">{s.label}</a></li>
                ))}
              </ol>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 2: Status Keberlakuan */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="status" style={h2Style}>Status Keberlakuan</h2>
            <WikiHR />
            {maxim.applicabilityStatus ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.5rem 0 1.25rem' }}>
                {[
                  { label: 'Berlaku di Indonesia', value: maxim.applicabilityStatus.validInIndonesia },
                  { label: 'Berlaku Internasional', value: maxim.applicabilityStatus.validInternationally },
                  { label: 'Diakui Doktrin', value: maxim.applicabilityStatus.recognizedByDoctrine },
                  { label: 'Telah Dikodifikasi', value: maxim.applicabilityStatus.codified },
                ].map((s, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', padding: '0.25rem 0.625rem', border: `1px solid ${s.value ? '#72B01D' : '#C85A54'}`, backgroundColor: s.value ? '#F6FFF0' : '#FFF5F5', color: s.value ? '#3D6B0A' : '#C85A54', borderRadius: '2px' }}>
                    {s.value ? '✔' : '✘'} {s.label}
                  </span>
                ))}
                {maxim.applicabilityStatus.notes && (
                  <p style={{ fontSize: '0.8125rem', color: '#54595D', fontStyle: 'italic', width: '100%', margin: '0.5rem 0 0' }}>{maxim.applicabilityStatus.notes}</p>
                )}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 4: Makna Harfiah & Etimologi */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="etimologi" style={h2Style}>Makna Harfiah & Etimologi</h2>
            <WikiHR />
            <div style={{ margin: '0.5rem 0 1rem', overflowX: 'auto' }}>
              {maxim.wordByWordExtended && maxim.wordByWordExtended.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem', minWidth: '300px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1' }}>
                      <th style={tableHeader}>Kata</th>
                      <th style={tableHeader}>Bentuk Latin</th>
                      <th style={tableHeader}>Jenis</th>
                      <th style={tableHeader}>Arti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.wordByWordExtended.map((w, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                        <td style={{ ...tableCell, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{w.word}</td>
                        <td style={{ ...tableCell, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#54595D' }}>{w.latinForm}</td>
                        <td style={{ ...tableCell, color: '#54595D' }}>{w.partOfSpeech}</td>
                        <td style={tableCell}>{w.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem', minWidth: '220px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1' }}>
                      <th style={tableHeader}>Kosakata Latin</th>
                      <th style={tableHeader}>Arti Tekstual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.wordByWord.map((w, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                        <td style={{ ...tableCell, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{w.word}</td>
                        <td style={tableCell}>{w.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {maxim.etymologyNotes && (
              <p style={{ fontSize: '0.8125rem', color: '#54595D', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 1rem', padding: '0.5rem 0.75rem', borderLeft: '3px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <strong>Catatan Etimologi:</strong> {maxim.etymologyNotes}
              </p>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 5: Makna Filosofis */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="filosofis" style={h2Style}>Makna Filosofis</h2>
            <WikiHR />
            {maxim.philosophicalMeaning ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {[
                  { label: 'Mengapa asas ini muncul?', value: maxim.philosophicalMeaning.origin },
                  { label: 'Nilai keadilan yang ingin dicapai', value: maxim.philosophicalMeaning.justiceValue },
                  { label: 'Dasar pemikiran ahli hukum Romawi', value: maxim.philosophicalMeaning.romanThought },
                  { label: 'Relevansinya sekarang', value: maxim.philosophicalMeaning.modernRelevance },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: '0.875rem' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>{item.label}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 6: Perkembangan Sejarah */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="sejarah" style={h2Style}>Perkembangan Sejarah</h2>
            <WikiHR />
            {maxim.historyTimeline && maxim.historyTimeline.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem', position: 'relative' }}>
                {maxim.historyTimeline.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', marginBottom: '0.875rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--navy)', border: '2px solid var(--navy)', marginTop: '0.25rem' }} />
                      {i < maxim.historyTimeline!.length - 1 && (
                        <div style={{ width: '2px', flex: 1, backgroundColor: '#EAECF0', marginTop: '2px' }} />
                      )}
                    </div>
                    <div style={{ flex: 1, paddingBottom: '0.875rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--navy)' }}>{item.era}</span>
                        <span style={{ fontSize: '0.75rem', color: '#72777D', fontStyle: 'italic' }}>({item.period})</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', margin: '0.25rem 0 0' }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : paragraphs(maxim.history)}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 7: Perkembangan Doktrin */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="doktrin" style={h2Style}>Perkembangan Doktrin</h2>
            <WikiHR />
            {maxim.doctrineDevelopment && maxim.doctrineDevelopment.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.doctrineDevelopment.map((d, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem', paddingLeft: '0.75rem', borderLeft: '3px solid #EAECF0' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{d.era}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', margin: 0 }}>{d.description}</p>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 8: Unsur-unsur Asas */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="unsur" style={h2Style}>Unsur-unsur Asas</h2>
            <WikiHR />
            {maxim.elements && maxim.elements.length > 0 ? (
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: '0.5rem 0 1.25rem' }}>
                {maxim.elements.map((el, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{el}</li>
                ))}
              </ol>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 9: Syarat Penerapan */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="syarat" style={h2Style}>Syarat Penerapan</h2>
            <WikiHR />
            {maxim.conditions && maxim.conditions.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#202122', marginBottom: '0.5rem' }}>
                  Asas ini hanya dapat diterapkan apabila memenuhi seluruh syarat berikut secara kumulatif:
                </p>
                <ul style={listStyle}>
                  {maxim.conditions.map((c, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      <span style={{ color: '#3D6B0A', fontWeight: 700, marginRight: '0.25rem' }}>✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 10: Pengecualian */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="pengecualian" style={h2Style}>Pengecualian</h2>
            <WikiHR />
            {maxim.exceptions && maxim.exceptions.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#202122', marginBottom: '0.5rem' }}>
                  Asas ini <strong>tidak berlaku</strong> apabila terpenuhi salah satu kondisi berikut:
                </p>
                <ul style={listStyle}>
                  {maxim.exceptions.map((ex, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      <span style={{ color: '#C85A54', fontWeight: 700, marginRight: '0.25rem' }}>✘</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 11: Ruang Lingkup */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="lingkup" style={h2Style}>Ruang Lingkup</h2>
            <WikiHR />
            {maxim.scope ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '0.5rem 0 1.25rem' }} className="scope-grid">
                <div>
                  <h3 style={h3Style}>Berlaku pada</h3>
                  <ul style={listStyle}>
                    {maxim.scope.applies.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 style={h3Style}>Tidak berlaku pada</h3>
                  <ul style={listStyle}>
                    {maxim.scope.doesNotApply.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 12: Dasar Hukum Indonesia */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="dasar-hukum" style={h2Style}>Dasar Hukum Indonesia</h2>
            <WikiHR />
            {maxim.legalBasisTable && maxim.legalBasisTable.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem', overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA' }}>
                      <th style={tableHeader}>Peraturan</th>
                      <th style={tableHeader}>Pasal</th>
                      <th style={tableHeader}>Relevansi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.legalBasisTable.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                        <td style={{ ...tableCell, fontWeight: 600, whiteSpace: 'nowrap' }}>{row.statute}</td>
                        <td style={{ ...tableCell, whiteSpace: 'nowrap' }}>{row.article}</td>
                        <td style={tableCell}>{row.relevance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : maxim.indonesianLegalBasis ? (
              paragraphs(maxim.indonesianLegalBasis)
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 13: Hubungan dengan Sistem Hukum Indonesia */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="sistem-hukum" style={h2Style}>Hubungan dengan Sistem Hukum Indonesia</h2>
            <WikiHR />
            {maxim.indonesianSystemRelation ? paragraphs(maxim.indonesianSystemRelation) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 14: Contoh Normatif */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="contoh-normatif" style={h2Style}>Contoh Normatif</h2>
            <WikiHR />
            {maxim.normativeExamples && maxim.normativeExamples.length > 0 ? (
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: '0.5rem 0 1.25rem' }}>
                {maxim.normativeExamples.map((ex, i) => (
                  <li key={i} style={{ marginBottom: '0.625rem' }}>{ex}</li>
                ))}
              </ol>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 15: Contoh Praktik */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="contoh-praktik" style={h2Style}>Contoh Praktik</h2>
            <WikiHR />
            {maxim.practicalExamples && maxim.practicalExamples.length > 0 ? (
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: 1.7, color: '#202122', margin: '0.5rem 0 1.25rem' }}>
                {maxim.practicalExamples.map((ex, i) => (
                  <li key={i} style={{ marginBottom: '0.625rem' }}>{ex}</li>
                ))}
              </ol>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 16: Yurisprudensi */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="yurisprudensi" style={h2Style}>Yurisprudensi</h2>
            <WikiHR />
            {maxim.jurisprudence && maxim.jurisprudence.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.jurisprudence.map((j) => (
                  <div key={j.id} style={{ marginBottom: '1.25rem', border: '1px solid #A2A9B1', padding: '0.75rem 1rem', backgroundColor: '#FFFFFF' }}>
                    <div style={{ fontSize: '0.75rem', color: '#54595D', fontWeight: 700, display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span>{j.courtName}</span>
                      <span>{j.caseNumber} ({j.date || j.year})</span>
                    </div>
                    <blockquote style={{ margin: '0 0 0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid var(--navy)', fontStyle: 'italic', color: '#202122', fontSize: '0.875rem' }}>
                      &ldquo;{j.excerpt}&rdquo;
                    </blockquote>
                    <p style={{ fontSize: '0.75rem', color: '#54595D', margin: '0.25rem 0 0' }}><strong>Konteks:</strong> {j.context || j.summary}</p>
                    {j.analysis && <p style={{ fontSize: '0.75rem', color: '#54595D', margin: '0.25rem 0 0' }}><strong>Analisis:</strong> {j.analysis}</p>}
                    {j.sourceUrl && <a href={j.sourceUrl} target="_blank" rel="noopener noreferrer" className="wiki-link" style={{ fontSize: '0.75rem' }}>Lihat putusan lengkap →</a>}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#54595D', fontStyle: 'italic', margin: '0.5rem 0 1.25rem', lineHeight: 1.6 }}>
                Hingga saat ini belum dicantumkan contoh putusan pengadilan yang secara eksplisit mengutip maksim ini dalam pertimbangan hukumnya. Bagian ini akan diperbarui apabila tersedia putusan yang telah diverifikasi.
              </p>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 17: Perbandingan Internasional */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="internasional" style={h2Style}>Perbandingan Internasional</h2>
            <WikiHR />
            {maxim.internationalComparisons && maxim.internationalComparisons.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem', overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA' }}>
                      <th style={tableHeader}>Negara/Tradisi</th>
                      <th style={tableHeader}>Status</th>
                      <th style={tableHeader}>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.internationalComparisons.map((c, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                        <td style={{ ...tableCell, fontWeight: 600, whiteSpace: 'nowrap' }}>{c.country}</td>
                        <td style={{ ...tableCell, whiteSpace: 'nowrap', color: c.status === 'Dikenal' ? '#3D6B0A' : c.status === 'Tidak Dikenal' ? '#C85A54' : '#AC6600' }}>
                          {c.status === 'Dikenal' ? '✔ ' : c.status === 'Tidak Dikenal' ? '✘ ' : '◑ '}{c.status}
                        </td>
                        <td style={tableCell}>{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 18: Perbandingan dengan Maksim Lain */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="perbandingan-maksim" style={h2Style}>Perbandingan dengan Maksim Lain</h2>
            <WikiHR />
            {maxim.maximComparisons && maxim.maximComparisons.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem', overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA' }}>
                      <th style={tableHeader}>Maksim</th>
                      <th style={tableHeader}>Kapan Digunakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.maximComparisons.map((mc, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0', backgroundColor: mc.maximId === maxim.id ? '#F0F4FF' : 'transparent' }}>
                        <td style={{ ...tableCell, whiteSpace: 'nowrap' }}>
                          {mc.maximId !== maxim.id ? (
                            <Link href={`/maksim/${mc.maximId}`} className="wiki-link" style={{ fontStyle: 'italic' }}>{mc.latinPhrase}</Link>
                          ) : (
                            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'var(--navy)' }}>{mc.latinPhrase} ← (halaman ini)</span>
                          )}
                        </td>
                        <td style={tableCell}>{mc.whenUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 19: Analisis Akademik */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="analisis" style={h2Style}>Analisis Akademik</h2>
            <WikiHR />
            {maxim.analysis ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {[
                  { label: 'Tujuan Asas', value: maxim.analysis.purpose },
                  { label: 'Nilai yang Dilindungi', value: maxim.analysis.protectedValues },
                  { label: 'Kelebihan', value: maxim.analysis.advantages },
                  { label: 'Kritik', value: maxim.analysis.critique },
                  { label: 'Keterbatasan', value: maxim.analysis.limitations },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flexShrink: 0, width: '130px', fontSize: '0.8125rem', fontWeight: 700, color: '#54595D', paddingTop: '0.125rem' }}>{item.label}</div>
                    <div style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.6, color: '#202122' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 20: Pandangan Para Ahli */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="ahli" style={h2Style}>Pandangan Para Ahli</h2>
            <WikiHR />
            {maxim.scholarViews && maxim.scholarViews.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.scholarViews.map((sv, i) => (
                  <div key={i} style={{ marginBottom: '1rem', paddingLeft: '0.75rem', borderLeft: '3px solid var(--navy)' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{sv.name}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', fontStyle: 'italic', margin: '0' }}>&ldquo;{sv.view}&rdquo;</p>
                    {sv.source && <p style={{ fontSize: '0.75rem', color: '#72777D', margin: '0.25rem 0 0' }}>— {sv.source}</p>}
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 21: Kontroversi */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="kontroversi" style={h2Style}>Kontroversi</h2>
            <WikiHR />
            {maxim.controversies && maxim.controversies.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.controversies.map((c, i) => (
                  <div key={i} style={{ marginBottom: '0.875rem', padding: '0.625rem 0.875rem', border: '1px solid #D4A574', backgroundColor: '#FAF8F3' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#AC6600', marginBottom: '0.375rem' }}>{c.title}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', margin: 0 }}>{c.description}</p>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 22: Kesalahan Umum */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="kesalahan" style={h2Style}>Kesalahan Umum</h2>
            <WikiHR />
            {maxim.commonMistakes && maxim.commonMistakes.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.commonMistakes.map((m, i) => (
                  <div key={i} style={{ marginBottom: '0.875rem', border: '1px solid #EAECF0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#FFF5F5', borderBottom: '1px solid #EAECF0' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C85A54', marginRight: '0.375rem' }}>✘ Kesalahan Umum:</span>
                      <span style={{ fontSize: '0.875rem', color: '#202122' }}>{m.misconception}</span>
                    </div>
                    <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#F6FFF0' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3D6B0A', marginRight: '0.375rem' }}>✔ Fakta:</span>
                      <span style={{ fontSize: '0.875rem', color: '#202122' }}>{m.fact}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 23: FAQ */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="faq" style={h2Style}>FAQ Singkat</h2>
            <WikiHR />
            {maxim.faq && maxim.faq.length > 0 ? (
              <div style={{ margin: '0.5rem 0 1.25rem' }}>
                {maxim.faq.map((f, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>T: {f.question}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#54595D', margin: 0, paddingLeft: '1rem' }}>J: {f.answer}</p>
                  </div>
                ))}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 24: Catatan */}
            {/* ═══════════════════════════════════════ */}
            {maxim.maximNotes && (
              <>
                <h2 id="catatan" style={h2Style}>Catatan</h2>
                <WikiHR />
                <div style={{ margin: '0.5rem 0 1.25rem', padding: '0.625rem 0.875rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0', borderLeft: '4px solid #A2A9B1' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', margin: 0 }}>{maxim.maximNotes}</p>
                </div>
              </>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 25: Istilah Berkaitan */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="istilah" style={h2Style}>Istilah Berkaitan</h2>
            <WikiHR />
            {maxim.relatedTerms && maxim.relatedTerms.length > 0 ? (
              <dl style={{ margin: '0.5rem 0 1.25rem', fontSize: '0.875rem' }}>
                {maxim.relatedTerms.map((t, i) => (
                  <div key={i} style={{ marginBottom: '0.625rem' }}>
                    <dt style={{ fontWeight: 700, color: 'var(--navy)', fontStyle: 'italic' }}>{t.term}</dt>
                    <dd style={{ marginLeft: '1rem', color: '#202122', lineHeight: 1.6 }}>{t.definition}</dd>
                  </div>
                ))}
              </dl>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 26: Lihat Juga */}
            {/* ═══════════════════════════════════════ */}
            {maxim.relations.length > 0 && (
              <>
                <h2 id="lihat-juga" style={h2Style}>Lihat Juga</h2>
                <WikiHR />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem', margin: '0.5rem 0 1.25rem' }}>
                  {maxim.relations.map(rel => {
                    const color = relationColors[rel.relationType] || { bg: '#F8F9FA', border: '#A2A9B1', text: '#202122' };
                    return (
                      <Link key={rel.id} href={`/maksim/${rel.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ border: `1px solid ${color.border}`, padding: '0.5rem 0.75rem', backgroundColor: color.bg }} className="interactive-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)', fontStyle: 'italic' }}>{rel.latinPhrase}</span>
                            <span style={{ fontSize: '0.625rem', color: color.text, fontWeight: 700 }}>{relationTypeLabels[rel.relationType] || rel.relationType}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#54595D', lineHeight: 1.3 }}>{rel.indonesianMeaning}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 27: Referensi */}
            {/* ═══════════════════════════════════════ */}
            <h2 id="referensi" style={h2Style}>Referensi</h2>
            <WikiHR />
            {maxim.references ? (
              <div style={{ margin: '0.5rem 0 1.25rem', fontSize: '0.8125rem' }}>
                {maxim.references.primary && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={h3Style}>Sumber Primer</h3>
                    {maxim.references.primary.constitutions && maxim.references.primary.constitutions.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Konstitusi</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.primary.constitutions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </>
                    )}
                    {maxim.references.primary.statutes && maxim.references.primary.statutes.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Peraturan Perundang-undangan</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.primary.statutes.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </>
                    )}
                    {maxim.references.primary.rulings && maxim.references.primary.rulings.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Putusan Pengadilan</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.primary.rulings.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </>
                    )}
                    {maxim.references.primary.regulations && maxim.references.primary.regulations.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Peraturan Pelaksana</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.primary.regulations.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                {maxim.references.secondary && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={h3Style}>Sumber Sekunder</h3>
                    {maxim.references.secondary.books && maxim.references.secondary.books.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Buku</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.secondary.books.map((b, i) => (
                            <li key={i}><span dangerouslySetInnerHTML={{ __html: b }} /></li>
                          ))}
                        </ul>
                      </>
                    )}
                    {maxim.references.secondary.journals && maxim.references.secondary.journals.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Jurnal</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.secondary.journals.map((j, i) => <li key={i}>{j}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
                {maxim.references.tertiary && (
                  <div>
                    <h3 style={h3Style}>Sumber Tersier</h3>
                    {maxim.references.tertiary.encyclopedias && maxim.references.tertiary.encyclopedias.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Ensiklopedia</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.tertiary.encyclopedias.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                      </>
                    )}
                    {maxim.references.tertiary.legalDictionaries && maxim.references.tertiary.legalDictionaries.length > 0 && (
                      <>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72777D', margin: '0.375rem 0 0.25rem' }}>Kamus Hukum</p>
                        <ul style={{ ...listStyle, fontSize: '0.8125rem' }}>
                          {maxim.references.tertiary.legalDictionaries.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : <SectionPlaceholder />}

            {/* ═══════════════════════════════════════ */}
            {/* SEKSI 28: Bacaan Lanjutan */}
            {/* ═══════════════════════════════════════ */}
            {maxim.furtherReading && maxim.furtherReading.length > 0 && (
              <>
                <h2 id="bacaan" style={h2Style}>Bacaan Lanjutan</h2>
                <WikiHR />
                <ul style={{ ...listStyle, margin: '0.5rem 0 1.25rem' }}>
                  {maxim.furtherReading.map((fr, i) => (
                    <li key={i}>
                      {fr.author}. <em>{fr.title}</em>
                      {fr.year ? ` (${fr.year})` : ''}.{' '}
                      <span style={{ fontSize: '0.75rem', color: '#72777D', backgroundColor: '#F8F9FA', padding: '0.0625rem 0.25rem', border: '1px solid #EAECF0' }}>
                        {fr.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ── Category Footer ── */}
            <div className="wiki-catlinks">
              <strong>Kategori</strong>:{' '}
              {maxim.meta?.categories.map((cat, i) => (
                <span key={i}>
                  <Link href={`/cari?bidang=${maxim.legalFields[0]}`} className="wiki-link">{cat}</Link>
                  {i < (maxim.meta?.categories.length ?? 0) - 1 ? ' | ' : ''}
                </span>
              )) || (
                  <>
                    <Link href={`/cari?bidang=${maxim.legalFields[0]}`} className="wiki-link">
                      Asas {fieldLabels[maxim.legalFields[0]] || maxim.legalFields[0]}
                    </Link>
                    {' '}|{' '}
                    <span style={{ color: '#72777D' }}>Asas Hukum Romawi</span>
                  </>
                )}
              {maxim.meta?.tags && maxim.meta.tags.length > 0 && (
                <>
                  {' '}|{' '}
                  {maxim.meta.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: '#72777D', backgroundColor: '#F8F9FA', padding: '0.0625rem 0.25rem', border: '1px solid #EAECF0', marginRight: '0.25rem' }}>
                      #{tag}
                    </span>
                  ))}
                </>
              )}
            </div>
          </>
        )}

        {/* ══ TAB: DISKUSI & CATATAN ══ */}
        {activeTab === 'diskusi' && (
          <div style={{ padding: '0.5rem 0' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', margin: '0 0 1rem', padding: 0 }}>
              <MessageSquare size={20} color="var(--navy)" /> Catatan Pembelajaran Mandiri
            </h2>
            <p style={{ color: '#54595D', fontSize: '0.8125rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Tambahkan hasil analisis hukum kasus nyata, rangkuman pribadi, atau cheat sheet untuk ujian hukum Anda terkait asas <strong>{maxim.latinPhrase}</strong>. Catatan ini disimpan aman secara offline di browser Anda.
            </p>
            <form onSubmit={handleSaveNote}>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Tulis catatan hukum Anda di sini..."
                style={{ width: '100%', height: '180px', padding: '0.75rem', border: '1px solid #A2A9B1', borderRadius: '2px', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button type="submit" className="btn-primary">Simpan Catatan</button>
                {noteSaved && <span style={{ color: 'var(--success)', fontSize: '0.8125rem', fontWeight: 600 }}>✓ Catatan disimpan!</span>}
              </div>
            </form>
          </div>
        )}

        {/* ══ TAB: SUNTING ══ */}
        {activeTab === 'sunting' && (
          <div style={{ padding: '0.5rem 0' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', margin: '0 0 1rem', padding: 0 }}>
              <Edit2 size={20} color="var(--navy)" /> Sunting Ensiklopedia (Suntingan Lokal)
            </h2>
            <p style={{ color: '#54595D', fontSize: '0.8125rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Anda dapat langsung menyunting penjelasan literal, fonetis, atau ulasan asas ini untuk menyesuaikan referensi belajar Anda.
            </p>
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="edit-latin" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Frase Latin Asli:</label>
                <input type="text" id="edit-latin" value={editLatin} onChange={e => setEditLatin(e.target.value)} className="input-text" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="edit-fonetis" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Panduan Fonetis:</label>
                  <input type="text" id="edit-fonetis" value={editFonetis} onChange={e => setEditFonetis(e.target.value)} className="input-text" />
                </div>
                <div>
                  <label htmlFor="edit-literal" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Arti Literal:</label>
                  <input type="text" id="edit-literal" value={editLiteral} onChange={e => setEditLiteral(e.target.value)} className="input-text" />
                </div>
              </div>
              <div>
                <label htmlFor="edit-indo" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Arti Resmi Bahasa Indonesia:</label>
                <input type="text" id="edit-indo" value={editIndo} onChange={e => setEditIndo(e.target.value)} className="input-text" />
              </div>
              <div>
                <label htmlFor="edit-legal" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Penjelasan & Analisis Hukum:</label>
                <textarea id="edit-legal" value={editLegal} onChange={e => setEditLegal(e.target.value)}
                  style={{ width: '100%', height: '180px', padding: '0.5rem 0.75rem', border: '1px solid #A2A9B1', borderRadius: '2px', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-primary">Simpan Suntingan</button>
                <button type="button" onClick={handleResetEdit} className="btn-secondary" style={{ borderColor: '#C85A54', color: '#C85A54' }}>Kembalikan ke Asli</button>
                <button type="button" onClick={() => setActiveTab('baca')} className="btn-secondary">Batal</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
