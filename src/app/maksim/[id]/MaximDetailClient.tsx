'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Volume2, Share2, Check, Edit2, MessageSquare, BookOpen, RotateCcw } from 'lucide-react';
import type { Maxim } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import { useVeriLexStore } from '@/lib/useStore';

const fieldLabels: Record<string, string> = {
  'pidana':       'Hukum Pidana',
  'perdata':      'Hukum Perdata',
  'tata-negara':  'Hukum Tata Negara',
  'internasional':'Hukum Internasional',
  'administrasi': 'Hukum Administrasi',
};

const relationTypeLabels: Record<string, string> = {
  'sinonim':   'Sejenis',
  'antonim':   'Berlawanan',
  'hierarkis': 'Hierarki',
  'turunan':   'Turunan',
  'berlawanan':'Berlawanan',
};

const relationColors: Record<string, { bg: string; border: string; text: string }> = {
  sinonim:    { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  antonim:    { bg: '#FAF8F3', border: '#D4A574', text: '#AC6600' },
  hierarkis:  { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  turunan:    { bg: '#F8F9FA', border: '#A2A9B1', text: '#0645AD' },
  berlawanan: { bg: '#FAF8F3', border: '#D4A574', text: '#AC6600' },
};

interface Props { maxim: Maxim; }

function WikiHR() {
  return <hr style={{ border: 'none', borderTop: '1px solid #A2A9B1', margin: '0.75rem 0' }} />;
}

export default function MaximDetailClient({ maxim: initialMaxim }: Props) {
  const { favorites, toggleFavorite, notes, setNote, editedMaxims, updateMaxim, resetMaxim } = useVeriLexStore();
  const isFav = favorites.includes(initialMaxim.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied]       = useState(false);
  const [tocExpanded, setTocExpanded] = useState(true);

  // Tab State: 'baca' | 'diskusi' | 'sunting'
  const [activeTab, setActiveTab] = useState<'baca' | 'diskusi' | 'sunting'>('baca');

  // Load local overrides if they exist
  const localOverride = editedMaxims[initialMaxim.id] || {};
  const maxim: Maxim = {
    ...initialMaxim,
    ...localOverride,
    // Deep merge wordByWord/relations if edited (not supported by simple override yet, so we keep simple fields)
    latinPhrase: localOverride.latinPhrase || initialMaxim.latinPhrase,
    pronunciationGuide: localOverride.pronunciationGuide || initialMaxim.pronunciationGuide,
    literalTranslation: localOverride.literalTranslation || initialMaxim.literalTranslation,
    indonesianMeaning: localOverride.indonesianMeaning || initialMaxim.indonesianMeaning,
    legalMeaning: localOverride.legalMeaning || initialMaxim.legalMeaning,
  };

  // Notes state
  const localNote = notes[maxim.id] || '';
  const [noteText, setNoteText] = useState(localNote);
  const [noteSaved, setNoteSaved] = useState(false);

  // Edit fields state
  const [editLatin, setEditLatin] = useState(maxim.latinPhrase);
  const [editFonetis, setEditFonetis] = useState(maxim.pronunciationGuide);
  const [editLiteral, setEditLiteral] = useState(maxim.literalTranslation);
  const [editIndo, setEditIndo] = useState(maxim.indonesianMeaning);
  const [editLegal, setEditLegal] = useState(maxim.legalMeaning);
  const [editSaved, setEditSaved] = useState(false);

  const handleAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance     = new SpeechSynthesisUtterance(maxim.latinPhrase);
      utterance.lang      = 'it-IT';
      utterance.rate      = 0.85;
      utterance.onstart   = () => setIsPlaying(true);
      utterance.onend     = () => setIsPlaying(false);
      utterance.onerror   = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    setNote(maxim.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMaxim(maxim.id, {
      latinPhrase: editLatin,
      pronunciationGuide: editFonetis,
      literalTranslation: editLiteral,
      indonesianMeaning: editIndo,
      legalMeaning: editLegal,
    });
    setEditSaved(true);
    setActiveTab('baca');
    setTimeout(() => setEditSaved(false), 2500);
  };

  const handleResetEdit = () => {
    if (confirm('Kembalikan artikel ke versi rujukan asli?')) {
      resetMaxim(maxim.id);
      setEditLatin(initialMaxim.latinPhrase);
      setEditFonetis(initialMaxim.pronunciationGuide);
      setEditLiteral(initialMaxim.literalTranslation);
      setEditIndo(initialMaxim.indonesianMeaning);
      setEditLegal(initialMaxim.legalMeaning);
      setActiveTab('baca');
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://verilex.vercel.app/maksim/${maxim.id}`
    },
    'headline': `${maxim.latinPhrase} — Arti & Penjelasan Hukum`,
    'description': maxim.indonesianMeaning,
    'inLanguage': 'id',
    'articleBody': maxim.legalMeaning,
    'author': {
      '@type': 'Organization',
      'name': 'VeriLex Editorial'
    }
  };

  const paragraphs = (text: string) =>
    text.split('\n\n').filter(Boolean).map((p, i) => (
      <p key={i} style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#202122', marginBottom: '0.75rem' }} className="text-wrap-safe">
        {p.trim()}
      </p>
    ));

  return (
    <div className="container-page" style={{ display: 'flex', gap: '1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Left Sidebar (Wikipedia Style) ── */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* ── Main Content Panel ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid #A2A9B1',
          padding: '1.25rem 1.5rem 3rem',
          minHeight: 'calc(100vh - 46px)',
        }}
      >
        {/* ── Vector Navigation & Action Tabs ── */}
        <div className="vector-tabs-container">
          <div className="vector-tabs-group">
            <button 
              onClick={() => setActiveTab('baca')}
              className={`vector-tab-item ${activeTab === 'baca' || activeTab === 'sunting' ? 'active' : ''}`}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Halaman
            </button>
            <button 
              onClick={() => setActiveTab('diskusi')}
              className={`vector-tab-item ${activeTab === 'diskusi' ? 'active' : ''}`}
              style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Diskusi &amp; Catatan
            </button>
          </div>
          <div className="vector-tabs-group">
            <button 
              onClick={() => setActiveTab('baca')}
              className={`vector-tab-item ${activeTab === 'baca' ? 'active' : ''}`}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Baca
            </button>
            <button 
              onClick={() => setActiveTab('sunting')}
              className={`vector-tab-item ${activeTab === 'sunting' ? 'active' : ''}`}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Sunting
            </button>
            <span className="vector-tab-item disabled">Lihat riwayat</span>
            <button
              onClick={() => toggleFavorite(maxim.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0.5rem',
                color: isFav ? 'var(--bronze)' : '#72777D',
              }}
              aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            >
              <Star size={14} fill={isFav ? 'var(--bronze)' : 'none'} />
            </button>
          </div>
        </div>

        {/* Status Notification Alerts */}
        {editSaved && (
          <div style={{ backgroundColor: 'rgba(46, 125, 50, 0.08)', border: '1px solid var(--success)', padding: '0.5rem 0.75rem', fontSize: '0.8125rem', marginBottom: '1rem', color: 'var(--success)' }}>
            Perubahan lokal berhasil disimpan. Versi suntingan Anda sekarang aktif di browser ini.
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 1: BACA (Wikipedia Article Detail)
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'baca' && (
          <>
            {/* ── Wikipedia Infobox (floating right) ── */}
            <div className="wiki-infobox">
              <div className="wiki-infobox-header">
                Asas Hukum Latin {Object.keys(localOverride).length > 0 && '(Tersunting)'}
              </div>
              {[
                { label: 'Frase Latin', value: maxim.latinPhrase, mono: true },
                { label: 'Pelafalan', value: maxim.pronunciationGuide, mono: true },
                { label: 'Bidang Hukum', value: maxim.legalFields.map(f => fieldLabels[f]).join(', ') },
                { label: 'Asal Tradisi', value: 'Hukum Romawi' },
              ].map((row, i) => (
                <div key={i} className="wiki-infobox-row">
                  <div className="wiki-infobox-label">{row.label}</div>
                  <div className="wiki-infobox-value" style={{ fontFamily: row.mono ? 'var(--font-mono)' : 'inherit', fontStyle: row.mono ? 'italic' : 'normal' }}>
                    {row.value}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem', justifyContent: 'center' }}>
                <button
                  onClick={handleAudio}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #A2A9B1', background: '#F8F9FA', cursor: 'pointer' }}
                >
                  <Volume2 size={11} /> {isPlaying ? 'Suara...' : 'Pelafalan'}
                </button>
                <button
                  onClick={handleShare}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #A2A9B1', background: '#F8F9FA', cursor: 'pointer' }}
                >
                  {copied ? 'Disalin!' : <><Share2 size={11} /> Bagikan</>}
                </button>
              </div>
              {Object.keys(localOverride).length > 0 && (
                <button
                  onClick={handleResetEdit}
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.7125rem', border: '1px solid #C85A54', background: '#FFF5F5', color: '#C85A54', cursor: 'pointer', marginTop: '0.375rem' }}
                >
                  <RotateCcw size={10} /> Kembalikan Asli
                </button>
              )}
            </div>

            {/* ── Article Title ── */}
            <h1 className="text-wrap-safe">{maxim.latinPhrase}</h1>
            <span className="wiki-tagline">Dari VeriLex, ensiklopedia maksim hukum bebas</span>

            <p style={{ fontStyle: 'italic', color: '#54595D', margin: '0.5rem 0 1rem' }}>
              Arti harfiah: &ldquo;{maxim.literalTranslation}&rdquo;
            </p>

            <p className="text-wrap-safe">
              <strong>{maxim.latinPhrase}</strong> (pelafalan:{' '}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', backgroundColor: '#F8F9FA', padding: '0.0625rem 0.25rem', border: '1px solid #EAECF0' }}>
                {maxim.pronunciationGuide}
              </span>
              ) adalah sebuah maksim hukum Latin yang secara resmi diartikan sebagai <em>&ldquo;{maxim.indonesianMeaning}&rdquo;</em>.
              Prinsip ini memiliki peranan penting dalam perumusan logika hukum yudisial di Indonesia.
            </p>

            {/* Table of Contents */}
            <div className="wiki-toc">
              <div style={{ fontWeight: 700, fontSize: '0.8125rem', textAlign: 'center', marginBottom: '0.375rem' }}>
                Daftar isi
              </div>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <li><a href="#definisi" className="wiki-link">1 Makna Harfiah &amp; Etimologi</a></li>
                <li><a href="#penerapan" className="wiki-link">2 Penerapan &amp; Logika Hukum</a></li>
                <li><a href="#sejarah" className="wiki-link">3 Perkembangan Sejarah</a></li>
                <li><a href="#kasus" className="wiki-link">4 Yurisprudensi &amp; Putusan</a></li>
                {maxim.relations.length > 0 && (
                  <li><a href="#relasi" className="wiki-link">5 Hubungan Asas Terkait</a></li>
                )}
              </ol>
            </div>

            <h2 id="definisi">Makna Harfiah &amp; Etimologi</h2>
            <WikiHR />
            <div style={{ margin: '0.75rem 0 1.25rem' }}>
              <div className="hidden sm:block">
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1' }}>
                      <th style={{ border: '1px solid #EAECF0', padding: '0.375rem 0.75rem', textAlign: 'left', fontWeight: 700 }}>Kosakata Latin</th>
                      <th style={{ border: '1px solid #EAECF0', padding: '0.375rem 0.75rem', textAlign: 'left', fontWeight: 700 }}>Arti Tekstual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maxim.wordByWord.map((w, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                        <td style={{ padding: '0.375rem 0.75rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, color: 'var(--navy)' }}>
                          {w.word}
                        </td>
                        <td style={{ padding: '0.375rem 0.75rem', color: '#202122' }}>
                          {w.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {maxim.wordByWord.map((w, i) => (
                  <div key={i} style={{ padding: '0.5rem 0.75rem', border: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, color: 'var(--navy)' }}>{w.word}</span>
                    {' '}&ndash;{' '}
                    <span style={{ fontSize: '0.75rem', color: '#202122' }}>{w.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 id="penerapan">Penerapan &amp; Logika Hukum</h2>
            <WikiHR />
            {paragraphs(maxim.legalMeaning)}

            <h2 id="sejarah">Perkembangan Sejarah</h2>
            <WikiHR />
            {paragraphs(maxim.history)}

            <h2 id="kasus">Yurisprudensi &amp; Putusan</h2>
            <WikiHR />
            {maxim.caseExamples.map((ex, idx) => (
              <div key={ex.id} style={{ marginBottom: '1.25rem', border: '1px solid #A2A9B1', padding: '0.75rem 1rem', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '0.75rem', color: '#54595D', fontWeight: 700, display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{ex.courtName}</span>
                  <span>{ex.caseNumber} ({ex.year})</span>
                </div>
                <blockquote style={{ margin: '0 0 0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid var(--navy)', fontStyle: 'italic', color: '#202122' }}>
                  &ldquo;{ex.excerpt}&rdquo;
                </blockquote>
                <p style={{ fontSize: '0.75rem', color: '#54595D', margin: 0 }}>
                  <strong>Konteks:</strong> {ex.summary}
                </p>
              </div>
            ))}

            {maxim.relations.length > 0 && (
              <>
                <h2 id="relasi">Hubungan Asas Terkait</h2>
                <WikiHR />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {maxim.relations.map(rel => {
                    const color = relationColors[rel.relationType] || { bg: '#F8F9FA', border: '#A2A9B1', text: '#202122' };
                    return (
                      <Link key={rel.id} href={`/maksim/${rel.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ border: `1px solid ${color.border}`, padding: '0.5rem 0.75rem', backgroundColor: color.bg }} className="interactive-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)', fontStyle: 'italic' }}>
                              {rel.latinPhrase}
                            </span>
                            <span style={{ fontSize: '0.625rem', color: color.text, fontWeight: 700 }}>
                              {relationTypeLabels[rel.relationType] || rel.relationType}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#54595D', lineHeight: 1.3 }}>
                            {rel.indonesianMeaning}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            <div className="wiki-catlinks">
              <strong>Kategori</strong>:{' '}
              <Link href={`/cari?bidang=${maxim.legalFields[0]}`} className="wiki-link">
                Asas {fieldLabels[maxim.legalFields[0]] || maxim.legalFields[0]}
              </Link>
              {' '}|{' '}
              <span style={{ color: '#72777D' }}>Asas Hukum Romawi</span>
              {' '}|{' '}
              <span style={{ color: '#72777D' }}>Yurisprudensi Indonesia</span>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 2: DISKUSI & CATATAN
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'diskusi' && (
          <div style={{ padding: '0.5rem 0' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', margin: '0 0 1rem', padding: 0 }}>
              <MessageSquare size={20} color="var(--navy)" /> Catatan Pembelajaran Mandiri
            </h2>
            <p style={{ color: '#54595D', fontSize: '0.8125rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Tambahkan hasil analisis hukum kasus nyata, rangkuman pribadi, atau cheat sheet untuk ujian hukum Anda terkait asas <strong>{maxim.latinPhrase}</strong>. Catatan ini disimpan aman secara offline di browser Anda.
            </p>

            <form onSubmit={handleSaveNote}>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Tulis catatan hukum Anda di sini..."
                style={{
                  width: '100%',
                  height: '180px',
                  padding: '0.75rem',
                  border: '1px solid #A2A9B1',
                  borderRadius: '2px',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  marginBottom: '1rem',
                }}
              />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button type="submit" className="btn-primary">
                  Simpan Catatan
                </button>
                {noteSaved && (
                  <span style={{ color: 'var(--success)', fontSize: '0.8125rem', fontWeight: 600 }}>
                    ✓ Catatan disimpan di LocalStorage!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 3: SUNTING (Edit Wikipedia Mode)
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'sunting' && (
          <div style={{ padding: '0.5rem 0' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', margin: '0 0 1rem', padding: 0 }}>
              <Edit2 size={20} color="var(--navy)" /> Sunting Ensiklopedia (Suntingan Lokal)
            </h2>
            <p style={{ color: '#54595D', fontSize: '0.8125rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Sebagai ensiklopedia hukum bebas, Anda dapat langsung menyunting penjelasan literal, fonetis, atau ulasan asas ini untuk menyesuaikan referensi belajar Anda.
            </p>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="edit-latin" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Frase Latin Asli:</label>
                <input 
                  type="text" 
                  id="edit-latin"
                  value={editLatin}
                  onChange={e => setEditLatin(e.target.value)}
                  className="input-text"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="edit-fonetis" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Panduan Fonetis:</label>
                  <input 
                    type="text" 
                    id="edit-fonetis"
                    value={editFonetis}
                    onChange={e => setEditFonetis(e.target.value)}
                    className="input-text"
                  />
                </div>
                <div>
                  <label htmlFor="edit-literal" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Arti Literal / Harfiah:</label>
                  <input 
                    type="text" 
                    id="edit-literal"
                    value={editLiteral}
                    onChange={e => setEditLiteral(e.target.value)}
                    className="input-text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-indo" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Arti Resmi Bahasa Indonesia:</label>
                <input 
                  type="text" 
                  id="edit-indo"
                  value={editIndo}
                  onChange={e => setEditIndo(e.target.value)}
                  className="input-text"
                />
              </div>

              <div>
                <label htmlFor="edit-legal" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Penjelasan &amp; Analisis Hukum:</label>
                <textarea
                  id="edit-legal"
                  value={editLegal}
                  onChange={e => setEditLegal(e.target.value)}
                  style={{
                    width: '100%',
                    height: '180px',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #A2A9B1',
                    borderRadius: '2px',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-primary">
                  Simpan Suntingan
                </button>
                <button type="button" onClick={handleResetEdit} className="btn-secondary" style={{ borderColor: '#C85A54', color: '#C85A54' }}>
                  Kembalikan ke Asli
                </button>
                <button type="button" onClick={() => setActiveTab('baca')} className="btn-secondary">
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
