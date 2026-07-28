'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Volume2, BookMarked, Share2, Check, HelpCircle } from 'lucide-react';
import type { Maxim } from '@/types';
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
  sinonim:    { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' },
  antonim:    { bg: '#FFEBEE', border: '#EF9A9A', text: '#B71C1C' },
  hierarkis:  { bg: '#E3F2FD', border: '#90CAF9', text: '#0D47A1' },
  turunan:    { bg: '#FFF8E1', border: '#FFE082', text: '#F57F17' },
  berlawanan: { bg: '#FFEBEE', border: '#EF9A9A', text: '#B71C1C' },
};

interface Props { maxim: Maxim; }

// Thin horizontal rule matching Wikipedia article sections
function WikiHR() {
  return <hr style={{ border: 'none', borderTop: '1px solid #A2A9B1', margin: '0 0 1rem' }} />;
}

// Section heading styled exactly like Wikipedia h2
function SectionH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.375rem',
      color: '#000',
      margin: '1.75rem 0 0.25rem',
      paddingBottom: '0.25rem',
      borderBottom: '1px solid #A2A9B1',
    }}>
      {children}
    </h2>
  );
}

export default function MaximDetailClient({ maxim }: Props) {
  const { favorites, toggleFavorite } = useVeriLexStore();
  const isFav = favorites.includes(maxim.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied]       = useState(false);

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

  const paragraphs = (text: string) =>
    text.split('\n\n').filter(Boolean).map((p, i) => (
      <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '0.875rem' }}>
        {p.trim()}
      </p>
    ));

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: 'calc(100vh - 60px)' }}>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAECF0', padding: '0.5rem 0' }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <nav style={{ fontSize: '0.8125rem', color: '#54595D' }}>
            <Link href="/" className="wiki-link">VeriLex</Link>
            {' '}&rsaquo;{' '}
            <Link href="/cari" className="wiki-link">Indeks Maksim</Link>
            {' '}&rsaquo;{' '}
            <span style={{ color: '#202122', fontStyle: 'italic' }}>{maxim.latinPhrase}</span>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            <button
              onClick={handleAudio}
              title="Dengarkan pelafalan Latin"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                backgroundColor: isPlaying ? '#F0F7FF' : '#FFFFFF',
                border: '1px solid #A2A9B1',
                padding: '0.3125rem 0.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                color: isPlaying ? '#3366CC' : '#202122',
                cursor: 'pointer', borderRadius: '2px',
              }}
            >
              <Volume2 size={14} color={isPlaying ? '#3366CC' : undefined} />
              {isPlaying ? 'Memutar...' : 'Pelafalan'}
            </button>
            <button
              onClick={() => toggleFavorite(maxim.id)}
              title={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                backgroundColor: isFav ? '#FFFBF5' : '#FFFFFF',
                border: `1px solid ${isFav ? 'var(--bronze)' : '#A2A9B1'}`,
                padding: '0.3125rem 0.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                color: isFav ? 'var(--bronze)' : '#202122',
                cursor: 'pointer', borderRadius: '2px',
              }}
            >
              <Star size={14} fill={isFav ? 'var(--bronze)' : 'none'} />
              {isFav ? 'Tersimpan' : 'Simpan'}
            </button>
            <button
              onClick={handleShare}
              title="Salin tautan artikel ini"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                backgroundColor: copied ? '#F0FFF4' : '#FFFFFF',
                border: `1px solid ${copied ? '#6B8E71' : '#A2A9B1'}`,
                padding: '0.3125rem 0.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                color: copied ? '#6B8E71' : '#202122',
                cursor: 'pointer', borderRadius: '2px',
              }}
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? 'Disalin!' : 'Bagikan'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Article Container ────────────────────────────────── */}
      <div className="container-page" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem 2.5rem', maxWidth: '960px', margin: '0 auto' }}>

          {/* ── Wikipedia Infobox (floating right) ───────────── */}
          <div style={{
            float: 'right',
            clear: 'right',
            margin: '0 0 1.5rem 2rem',
            width: '280px',
            border: '1px solid #A2A9B1',
            backgroundColor: '#F8F9FA',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
          }}>
            {/* Infobox header */}
            <div style={{
              backgroundColor: 'var(--navy)',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '0.5rem 0.75rem',
              fontWeight: 700,
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.4,
            }}>
              Asas Hukum Latin
            </div>

            {/* Infobox rows */}
            {[
              { label: 'Frase Latin', value: maxim.latinPhrase, mono: true },
              { label: 'Fonetis', value: maxim.pronunciationGuide, mono: true },
              { label: 'Bidang Hukum', value: maxim.legalFields.map(f => fieldLabels[f]).join(', ') },
              { label: 'Asal Tradisi', value: 'Hukum Romawi (Civil Law)' },
              { label: 'Status Yuridis', value: 'Berlaku & Mengikat', highlight: true },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  borderTop: '1px solid #EAECF0',
                  padding: '0.375rem 0.625rem',
                  gap: '0.5rem',
                }}
              >
                <div style={{ width: '38%', flexShrink: 0, fontWeight: 700, color: '#54595D', lineHeight: 1.4 }}>
                  {row.label}
                </div>
                <div style={{
                  flex: 1,
                  color: row.highlight ? '#2E7D32' : '#202122',
                  fontFamily: row.mono ? 'var(--font-mono)' : 'var(--font-body)',
                  fontWeight: row.highlight ? 700 : 400,
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Article Title ─────────────────────────────────── */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2rem',
            color: '#000',
            margin: '0 0 0.25rem',
            lineHeight: 1.2,
            borderBottom: '1px solid #A2A9B1',
            paddingBottom: '0.375rem',
          }}>
            {maxim.latinPhrase}
          </h1>

          {/* Italic lead sentence */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#54595D', fontStyle: 'italic', marginBottom: '1rem' }}>
            {maxim.literalTranslation}
          </p>

          {/* Opening paragraph */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
            <strong style={{ fontFamily: 'var(--font-display)' }}>{maxim.latinPhrase}</strong>{' '}
            (fonetis:{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0', padding: '0.0625rem 0.375rem', borderRadius: '2px' }}>
              {maxim.pronunciationGuide}
            </span>
            ) adalah salah satu asas hukum Latin yang bermakna{' '}
            <em style={{ color: '#202122' }}>&ldquo;{maxim.indonesianMeaning}&rdquo;</em>.
            Asas ini merupakan prinsip fundamental dalam sistem hukum yang berasal dari tradisi Hukum Romawi dan diadopsi dalam tata hukum Indonesia melalui jalur <em>civil law</em>.
          </p>

          {/* ── Table of Contents ─────────────────────────────── */}
          <div style={{ clear: 'both' }} />
          <div style={{
            display: 'inline-block',
            backgroundColor: '#F8F9FA',
            border: '1px solid #A2A9B1',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.5rem',
            minWidth: '240px',
            maxWidth: '360px',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', fontFamily: 'var(--font-body)', textAlign: 'center', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.375rem', marginBottom: '0.5rem' }}>
              Daftar Isi
            </div>
            <ol style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.8125rem', lineHeight: 2, fontFamily: 'var(--font-body)' }}>
              <li><a href="#etimologi" className="wiki-link">Makna Harfiah &amp; Etimologi</a></li>
              <li><a href="#makna-hukum" className="wiki-link">Makna Hukum &amp; Penerapan</a></li>
              <li><a href="#sejarah" className="wiki-link">Sejarah &amp; Yurisprudensi</a></li>
              <li><a href="#putusan" className="wiki-link">Penerapan dalam Putusan Pengadilan</a></li>
              {maxim.relations.length > 0 && (
                <li><a href="#relasi" className="wiki-link">Asas Hukum Terkait</a></li>
              )}
            </ol>
          </div>

          {/* ══════════════════════════════════════════════════════
              SECTION 1: Etimologi
          ══════════════════════════════════════════════════════ */}
          <SectionH2 id="etimologi">1. Makna Harfiah &amp; Etimologi</SectionH2>
          <WikiHR />

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
            Secara harfiah, <strong>{maxim.latinPhrase}</strong> dapat diartikan sebagai:{' '}
            <em style={{ backgroundColor: '#FFFDE7', padding: '0.125rem 0.25rem' }}>&ldquo;{maxim.literalTranslation}&rdquo;</em>.
            Berikut adalah penjabaran kata per kata dari frase Latin tersebut:
          </p>

          {/* Word-by-word table (Wikipedia style) */}
          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#EAECF0' }}>
                  <th style={{ border: '1px solid #A2A9B1', padding: '0.5rem 0.875rem', textAlign: 'left', fontWeight: 700, color: '#202122' }}>Kata Latin</th>
                  <th style={{ border: '1px solid #A2A9B1', padding: '0.5rem 0.875rem', textAlign: 'left', fontWeight: 700, color: '#202122' }}>Arti dalam Bahasa Indonesia</th>
                </tr>
              </thead>
              <tbody>
                {maxim.wordByWord.map((w, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8F9FA' }}>
                    <td style={{ border: '1px solid #EAECF0', padding: '0.4375rem 0.875rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', fontStyle: 'italic' }}>
                      {w.word}
                    </td>
                    <td style={{ border: '1px solid #EAECF0', padding: '0.4375rem 0.875rem', color: '#202122' }}>
                      {w.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ══════════════════════════════════════════════════════
              SECTION 2: Makna Hukum
          ══════════════════════════════════════════════════════ */}
          <SectionH2 id="makna-hukum">2. Makna Hukum &amp; Penerapan</SectionH2>
          <WikiHR />
          {paragraphs(maxim.legalMeaning)}

          {/* ══════════════════════════════════════════════════════
              SECTION 3: Sejarah
          ══════════════════════════════════════════════════════ */}
          <SectionH2 id="sejarah">3. Sejarah &amp; Yurisprudensi</SectionH2>
          <WikiHR />
          {paragraphs(maxim.history)}

          {/* ══════════════════════════════════════════════════════
              SECTION 4: Contoh Putusan
          ══════════════════════════════════════════════════════ */}
          <SectionH2 id="putusan">4. Penerapan dalam Putusan Pengadilan</SectionH2>
          <WikiHR />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
            Berikut adalah beberapa putusan pengadilan yang secara nyata menerapkan asas <strong>{maxim.latinPhrase}</strong> sebagai dasar pertimbangan hukum:
          </p>

          {maxim.caseExamples.map((ex, idx) => (
            <div key={ex.id} style={{ marginBottom: '1.5rem' }}>
              {/* Case header */}
              <div style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #A2A9B1',
                borderBottom: 'none',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
                  [{idx + 1}] {ex.courtName}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#54595D', backgroundColor: '#EAECF0', padding: '0.0625rem 0.5rem', borderRadius: '2px' }}>
                  {ex.caseNumber} / {ex.year}
                </span>
              </div>

              {/* Case body */}
              <div style={{ border: '1px solid #A2A9B1', padding: '1rem 1.25rem', backgroundColor: '#FFFFFF' }}>
                <blockquote style={{
                  margin: '0 0 0.75rem',
                  padding: '0.75rem 1rem',
                  borderLeft: '4px solid var(--navy)',
                  backgroundColor: '#F8F9FA',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: '#202122',
                  fontStyle: 'italic',
                }}>
                  &ldquo;{ex.excerpt}&rdquo;
                </blockquote>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.5 }}>
                  <strong>Ringkasan:</strong> {ex.summary}
                </p>
              </div>
            </div>
          ))}

          {/* ══════════════════════════════════════════════════════
              SECTION 5: Asas Terkait
          ══════════════════════════════════════════════════════ */}
          {maxim.relations.length > 0 && (
            <>
              <SectionH2 id="relasi">5. Asas Hukum Terkait</SectionH2>
              <WikiHR />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
                Berikut adalah asas-asas hukum Latin lain yang memiliki hubungan langsung dengan <strong>{maxim.latinPhrase}</strong>:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {maxim.relations.map(rel => {
                  const color = relationColors[rel.relationType] || { bg: '#F8F9FA', border: '#EAECF0', text: '#202122' };
                  return (
                    <Link key={rel.id} href={`/maksim/${rel.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        border: `1px solid ${color.border}`,
                        backgroundColor: color.bg,
                        padding: '0.875rem 1rem',
                        transition: 'opacity 150ms',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', lineHeight: 1.3 }}>
                            {rel.latinPhrase}
                          </span>
                          <span style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            color: color.text,
                            backgroundColor: '#FFFFFF',
                            border: `1px solid ${color.border}`,
                            padding: '0.0625rem 0.4375rem',
                            borderRadius: '2px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}>
                            {relationTypeLabels[rel.relationType] || rel.relationType}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.4 }}>
                          {rel.indonesianMeaning}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Article Footer ────────────────────────────────── */}
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #A2A9B1', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D' }}>
              Lanjutkan belajar:
            </span>
            <Link href={`/quiz`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              backgroundColor: 'var(--navy)', color: '#FFF',
              padding: '0.4375rem 0.875rem', borderRadius: '2px',
              fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600,
              textDecoration: 'none',
            }}>
              <HelpCircle size={14} /> Quiz Interaktif
            </Link>
            <Link href="/flashcard" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              backgroundColor: '#FFFFFF', color: 'var(--navy)',
              border: '1px solid #A2A9B1',
              padding: '0.4375rem 0.875rem', borderRadius: '2px',
              fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600,
              textDecoration: 'none',
            }}>
              <BookMarked size={14} /> Flashcard SRA
            </Link>
            <Link href="/cari" style={{
              marginLeft: 'auto',
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              color: 'var(--wiki-blue)',
              fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
              textDecoration: 'none',
            }}>
              <ArrowLeft size={13} /> Kembali ke Indeks
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
