'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Brain, BookMarked, Star, ArrowRight, Scale, Scroll, Globe, BookOpen, Shield, Gavel } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { useVeriLexStore } from '@/lib/useStore';
import { useFeatured, usePopular, useRecent, rowToMaxim, type MaximSummary } from '@/hooks/useHomepageData';
import { useLegalFields } from '@/hooks/useLegalFields';

// ── Field icon mapping ──────────────────────────────────────────
const fieldIcons: Record<string, React.ElementType> = {
  'umum': Scale,
  'pidana': Gavel,
  'perdata': Scroll,
  'properti': BookOpen,
  'keluarga': Star,
  'bisnis': BookOpen,
  'internasional': Globe,
  'tata-negara': Shield,
  'acara': Scroll,
  'lain-lain': BookOpen,
  'administrasi': Shield,
};

const fieldColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  'umum':         { bg: '#EEF2FF', border: '#C7D2FE', text: '#3730A3', icon: '#4F46E5' },
  'pidana':       { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B', icon: '#DC2626' },
  'perdata':      { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF', icon: '#2563EB' },
  'properti':     { bg: '#FDF4FF', border: '#E9D5FF', text: '#6B21A8', icon: '#9333EA' },
  'keluarga':     { bg: '#FFF0F9', border: '#FBCFE8', text: '#9D174D', icon: '#EC4899' },
  'bisnis':       { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', icon: '#F59E0B' },
  'internasional':{ bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '#10B981' },
  'tata-negara':  { bg: '#F0FDF4', border: '#BBF7D0', text: '#14532D', icon: '#16A34A' },
  'acara':        { bg: '#F0FDFA', border: '#99F6E4', text: '#134E4A', icon: '#14B8A6' },
  'lain-lain':    { bg: '#FFF7ED', border: '#FED7AA', text: '#7C2D12', icon: '#EA580C' },
  'administrasi': { bg: '#F5F3FF', border: '#DDD6FE', text: '#4C1D95', icon: '#7C3AED' },
};

// Shortened labels for portal grid
const fieldShortLabels: Record<string, string> = {
  'umum': 'Asas Umum',
  'pidana': 'Hukum Pidana',
  'perdata': 'Hukum Perdata',
  'properti': 'Hak Milik',
  'keluarga': 'Waris & Keluarga',
  'bisnis': 'Hukum Dagang',
  'internasional': 'Internasional',
  'tata-negara': 'Tata Negara',
  'acara': 'Hukum Acara',
  'lain-lain': 'Filosofis',
  'administrasi': 'Administrasi',
};

// Latin quotes for the hero banner rotation
const heroQuotes = [
  { latin: 'Fiat iustitia ruat caelum', id: 'fiat-iustitia', translation: 'Tegakkanlah keadilan meski langit runtuh' },
  { latin: 'Ignorantia iuris neminem excusat', id: 'ignorantia-iuris', translation: 'Ketidaktahuan hukum tidak membebaskan siapapun' },
  { latin: 'Audi alteram partem', id: 'audi-alteram', translation: 'Dengarkanlah pihak yang lain' },
];

export default function HomepageClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuote, setActiveQuote] = useState(0);
  const [totalMaxims, setTotalMaxims] = useState<number | null>(null);
  const { favorites } = useVeriLexStore();

  // ── Dynamic data from Supabase ──────────────────────────────────────────
  const { data: featuredRow, loading: featuredLoading } = useFeatured();
  const { data: popularList, loading: popularLoading }  = usePopular(2);
  const { data: recentList,  loading: recentLoading  }  = useRecent(6);
  const { fields: legalFields } = useLegalFields();

  // Fetch total maxim count from DB
  useEffect(() => {
    fetch('/api/maxims?limit=1')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.total != null) setTotalMaxims(d.total); });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Featured article — only render when data is available from DB
  const featuredMaxim = featuredRow ? rowToMaxim(featuredRow) : null;

  // "Banyak dibaca" — second entry from popular list
  const secondPopular = popularList[1];
  const secondMaxim = secondPopular
    ? { id: secondPopular.id, latinPhrase: secondPopular.latin_phrase, indonesianMeaning: secondPopular.indonesian_meaning, literalTranslation: secondPopular.literal_translation, legalFields: secondPopular.legal_fields, legalMeaning: secondPopular.indonesian_meaning }
    : null;

  // Card grid — recent edits from DB
  const recentCardData: Array<{ id: string; latinPhrase: string; indonesianMeaning: string; legalFields: string[]; updatedAt?: string }> =
    recentList.map(r => ({ id: r.id, latinPhrase: r.latin_phrase, indonesianMeaning: r.indonesian_meaning, legalFields: r.legal_fields, updatedAt: r.updated_at }));

  const quote = heroQuotes[activeQuote];

  return (
    <div className="container-page" style={{ display: 'flex', gap: '1rem' }}>

      {/* ── Left Sidebar ── */}
      <div className="vector-sidebar">
        <Sidebar />
      </div>

      {/* ── Main Content ── */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: '#FFFFFF',
          padding: '1rem 1rem 3rem',
          minHeight: 'calc(100vh - 46px)',
        }}
        className="lg:border-l lg:border-[#A2A9B1] lg:pl-6"
      >
        {/* ── Vector Tabs ── */}
        <div className="vector-tabs-container">
          <div className="vector-tabs-group">
            <span className="vector-tab-item active">Halaman Utama</span>
            <span className="vector-tab-item disabled">Pembicaraan</span>
          </div>
          <div className="vector-tabs-group">
            <span className="vector-tab-item active">Baca</span>
            <span className="vector-tab-item disabled">Lihat sumber</span>
            <span className="vector-tab-item disabled">Lihat riwayat</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            HERO BANNER — Quote + Search
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(135deg, #0F1B3C 0%, #1E3A5F 60%, #2D5986 100%)',
          border: '1px solid #A2A9B1',
          padding: '2rem 1.75rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative latin text watermark */}
          <div style={{
            position: 'absolute', top: '-10px', right: '-10px',
            fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.04)', lineHeight: 1, pointerEvents: 'none',
            userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            LEX
          </div>

          {/* Quote selector dots */}
          <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem' }}>
            {heroQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                style={{
                  width: i === activeQuote ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === activeQuote ? '#A67C52' : 'rgba(255,255,255,0.35)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 300ms ease', padding: 0,
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>

          {/* Latin quote */}
          <blockquote style={{ margin: '0 0 0.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              fontStyle: 'italic',
              margin: '0 0 0.375rem',
              lineHeight: 1.4,
            }}>
              &ldquo;{quote.latin}&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: '#A67C52',
              margin: 0,
            }}>
              — {quote.translation}
            </p>
          </blockquote>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', margin: '1.25rem 0' }} />

          {/* Welcome text */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.875rem' }}>
            Selamat datang di <strong style={{ color: '#FFFFFF' }}>VeriLex</strong> — ensiklopedia bebas maksim hukum Latin terintegrasi dengan{' '}
            <strong style={{ color: '#A67C52' }}>{totalMaxims !== null ? totalMaxims.toLocaleString('id-ID') : '—'}</strong> entri aktif.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.375rem', maxWidth: '560px' }} role="search">
            <div style={{ position: 'relative', flex: 1 }}>
              <label htmlFor="homepage-search-bar" className="sr-only">Cari VeriLex</label>
              <Search size={14} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
              <input
                type="search"
                id="homepage-search-bar"
                placeholder="Cari frase Latin atau arti Indonesia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-text"
                style={{ height: '36px', fontSize: '0.875rem', borderRadius: '2px', paddingLeft: '2rem', backgroundColor: '#FFFFFF' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ height: '36px', padding: '0 1.25rem', whiteSpace: 'nowrap' }}>
              Cari
            </button>
          </form>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FEATURED ARTICLE — Full width with asymmetric layout
        ═══════════════════════════════════════════════════════ */}
        {(featuredLoading || featuredMaxim) && (
        <section style={{ border: '1px solid #A2A9B1', marginBottom: '1.25rem', backgroundColor: '#FFFFFF' }}>
          {/* Section header */}
          <div style={{
            backgroundColor: '#EAF3FF', borderBottom: '1px solid #A2A9B1',
            padding: '0.5rem 0.875rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
              ★ Artikel pilihan
            </h2>
            {featuredMaxim && (
              <Link href={`/maksim/${featuredMaxim.id}`} style={{ fontSize: '0.75rem', color: '#0645AD', textDecoration: 'none' }}>
                Baca selengkapnya →
              </Link>
            )}
          </div>

          {featuredLoading && !featuredMaxim ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#72777D', fontSize: '0.875rem' }}>Memuat artikel pilihan...</div>
          ) : featuredMaxim && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }} className="md:grid-cols-[2fr_1fr]">
            {/* Main text */}
            <div style={{ padding: '1.25rem', borderRight: '0', }} className="md:border-r md:border-[#EAECF0]">
              {/* Field badge */}
              <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {featuredMaxim.legalFields.slice(0, 2).map(f => {
                  const c = fieldColors[f] || fieldColors['umum'];
                  return (
                    <span key={f} style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                      backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: '2px',
                    }}>
                      {fieldShortLabels[f] || f}
                    </span>
                  );
                })}
              </div>

              <Link href={`/maksim/${featuredMaxim.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                  color: '#000', margin: '0 0 0.25rem', lineHeight: 1.3,
                }}>
                  {featuredMaxim.latinPhrase}
                </h3>
              </Link>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', fontStyle: 'italic', margin: '0 0 0.875rem' }}>
                &ldquo;{featuredMaxim.literalTranslation}&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#202122', lineHeight: 1.65, margin: '0 0 1rem' }}>
                {featuredMaxim.legalMeaning.split('\n\n')[0]?.substring(0, 300)}...
              </p>

              {/* Etymology snippet */}
              {featuredMaxim.wordByWord.length > 0 && (
                <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #EAECF0', padding: '0.625rem 0.75rem', marginBottom: '1rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 700, color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.375rem' }}>
                    Etimologi
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {featuredMaxim.wordByWord.slice(0, 4).map((w, i) => (
                      <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}>
                        <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>{w.word}</strong>
                        <span style={{ color: '#54595D' }}> = {w.meaning}</span>
                        {i < Math.min(featuredMaxim.wordByWord.length, 4) - 1 && <span style={{ color: '#A2A9B1', marginLeft: '0.5rem' }}>·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Baca artikel lengkap <ArrowRight size={12} />
              </Link>
            </div>

            {/* Infobox panel */}
            <div style={{ padding: '1rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #EAECF0' }} className="md:border-t-0">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 700, color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.625rem' }}>
                Informasi Singkat
              </p>
              {[
                { label: 'Bidang', value: featuredMaxim.legalFields.map(f => fieldShortLabels[f]).join(', ') },
                { label: 'Sifat', value: featuredMaxim.classification?.nature || '—' },
                { label: 'Tingkat', value: featuredMaxim.classification?.applicationLevel || '—' },
                { label: 'Valid di Indonesia', value: featuredMaxim.applicabilityStatus?.validInIndonesia ? '✓ Ya' : '✗ Tidak' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', gap: '0.5rem', padding: '0.3rem 0', borderBottom: '1px solid #EAECF0', fontSize: '0.75rem' }}>
                  <span style={{ fontWeight: 700, color: '#54595D', width: '80px', flexShrink: 0 }}>{row.label}</span>
                  <span style={{ color: '#202122' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </section>
        )}

        {/* ═══════════════════════════════════════════════════════
            TWO-COLUMN: Portal Bidang + Modul Pembelajaran
        ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="lg:grid-cols-[3fr_2fr]">

          {/* ── Portal Bidang Hukum — Icon Grid ── */}
          <section style={{ border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF' }}>
            <div style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
                Portal bidang hukum
              </h2>
              <Link href="/cari" style={{ fontSize: '0.75rem', color: '#0645AD', textDecoration: 'none' }}>
                Semua maksim →
              </Link>
            </div>
            <div style={{ padding: '0.875rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {legalFields.slice(0, 9).map(field => {
                const c = fieldColors[field.id] || fieldColors['umum'];
                const IconComp = fieldIcons[field.id] || BookOpen;
                return (
                  <Link
                    key={field.id}
                    href={`/cari?bidang=${field.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      padding: '0.75rem 0.5rem', gap: '0.375rem',
                      backgroundColor: c.bg, border: `1px solid ${c.border}`,
                      transition: 'transform 150ms, box-shadow 150ms',
                      cursor: 'pointer',
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'none';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ color: c.icon, flexShrink: 0 }}>
                        <IconComp size={18} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 700, color: c.text, lineHeight: 1.3 }}>
                        {fieldShortLabels[field.id]}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: c.icon, opacity: 0.8 }}>
                        {field.count}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Right: Modul + Second Article ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Modul Pembelajaran */}
            <section style={{ border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF' }}>
              <div style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
                  Modul Pembelajaran
                </h2>
              </div>
              <div style={{ padding: '0.25rem 0' }}>
                {[
                  { href: '/quiz', icon: Brain, label: 'Quiz Interaktif', desc: 'Uji wawasan 5 soal acak', color: '#1E40AF' },
                  { href: '/flashcard', icon: BookMarked, label: 'Flashcard SRA', desc: 'Kartu latihan flip 3D', color: '#065F46' },
                  { href: '/favorit', icon: Star, label: `Favorit Saya (${favorites.length})`, desc: 'Koleksi tersimpan', color: '#92400E' },
                  { href: '/dashboard', icon: BookOpen, label: 'Dashboard Progres', desc: 'Statistik belajarmu', color: '#4C1D95' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.5rem 0.875rem', textDecoration: 'none',
                      borderBottom: idx < 3 ? '1px solid #EAECF0' : 'none',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                  >
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '4px', flexShrink: 0,
                      backgroundColor: `${item.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0645AD' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#54595D' }}>{item.desc}</div>
                    </div>
                    <ArrowRight size={12} style={{ marginLeft: 'auto', color: '#A2A9B1' }} />
                  </Link>
                ))}
              </div>
            </section>

            {/* Second Featured Maxim */}
            <section style={{ border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF' }}>
              <div style={{ backgroundColor: '#FFF8F0', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
                  Juga banyak dibaca
                </h2>
              </div>
              {popularLoading ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#72777D', fontSize: '0.8125rem' }}>Memuat...</div>
              ) : secondMaxim ? (
              <div style={{ padding: '1rem' }}>
                <Link href={`/maksim/${secondMaxim.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0645AD', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                    {secondMaxim.latinPhrase}
                  </h3>
                </Link>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#54595D', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
                  &ldquo;{secondMaxim.literalTranslation}&rdquo;
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#202122', lineHeight: 1.55, margin: '0 0 0.625rem',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {secondMaxim.legalMeaning?.split('\n\n')[0]?.substring(0, 200)}...
                </p>
                <Link href={`/maksim/${secondMaxim.id}`} className="wiki-link" style={{ fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                  Baca selengkapnya <ArrowRight size={11} />
                </Link>
              </div>
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#72777D', fontSize: '0.8125rem' }}>Belum ada data</div>
              )}
            </section>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MAXIM GRID — 3-column card grid
        ═══════════════════════════════════════════════════════ */}
        <section style={{ border: '1px solid #A2A9B1', marginBottom: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
              Jelajahi entri terbaru
            </h2>
            <Link href="/cari" style={{ fontSize: '0.75rem', color: '#0645AD', textDecoration: 'none' }}>
              Lihat semua →
            </Link>
          </div>
          <div style={{ padding: '0.875rem', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0.625rem' }} className="sm:grid-cols-2 lg:grid-cols-3">
            {recentLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ border: '1px solid #EAECF0', borderTop: '3px solid #EAECF0', padding: '0.875rem', height: '120px', backgroundColor: '#F8F9FA', borderRadius: '2px' }} />
                ))
              : recentCardData.map(maxim => {
              const primaryField = maxim.legalFields[0];
              const c = fieldColors[primaryField] || fieldColors['umum'];
              return (
                <Link
                  key={maxim.id}
                  href={`/maksim/${maxim.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article style={{
                    border: `1px solid ${c.border}`,
                    borderLeft: `3px solid ${c.icon}`,
                    padding: '0.875rem',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    transition: 'background-color 120ms, box-shadow 120ms',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = c.bg;
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.1rem 0.375rem',
                      backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text,
                      borderRadius: '2px', display: 'inline-block', marginBottom: '0.5rem',
                    }}>
                      {fieldShortLabels[primaryField] || primaryField}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F1B3C', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                      {maxim.latinPhrase}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#54595D', fontStyle: 'italic', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                      &ldquo;{maxim.indonesianMeaning.substring(0, 80)}{maxim.indonesianMeaning.length > 80 ? '...' : ''}&rdquo;
                    </p>
                    {maxim.updatedAt && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#A2A9B1', margin: '0 0 0.375rem' }}>
                        Diperbarui: {new Date(maxim.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#0645AD', fontSize: '0.75rem', fontWeight: 600, marginTop: 'auto' }}>
                      Baca <ArrowRight size={10} />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DID YOU KNOW — Two columns
        ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="md:grid-cols-2">

          {/* Indeks Abjad */}
          <section style={{ border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF' }}>
            <div style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
                Indeks alfabetis
              </h2>
            </div>
            <div style={{ padding: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                <Link
                  key={letter}
                  href={`/cari?q=${letter}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '28px', height: '28px',
                    border: '1px solid #A2A9B1',
                    fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700,
                    color: '#0645AD', textDecoration: 'none',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#0F1B3C';
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                    (e.currentTarget as HTMLElement).style.borderColor = '#0F1B3C';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#0645AD';
                    (e.currentTarget as HTMLElement).style.borderColor = '#A2A9B1';
                  }}
                >
                  {letter}
                </Link>
              ))}
            </div>
          </section>

          {/* Statistik Platform */}
          <section style={{ border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF' }}>
            <div style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1', padding: '0.5rem 0.875rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', margin: 0, color: '#000' }}>
                Tentang VeriLex
              </h2>
            </div>
            <div style={{ padding: '0.875rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
              {[
                { value: totalMaxims !== null ? totalMaxims.toLocaleString('id-ID') : '—', label: 'Total Entri' },
                { value: legalFields.length > 0 ? legalFields.length.toString() : '—', label: 'Bidang Hukum' },
                { value: legalFields.filter(f => f.count > 0).length.toString() || '—', label: 'Bidang Aktif' },
                { value: '∞', label: 'Terus Berkembang' },
              ].map(stat => (
                <div key={stat.label} style={{
                  textAlign: 'center', padding: '0.75rem',
                  backgroundColor: '#F8F9FA', border: '1px solid #EAECF0',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: '#54595D', marginTop: '0.25rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 0.875rem 0.875rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', margin: '0 0 0.625rem', lineHeight: 1.55 }}>
                VeriLex adalah platform referensi pertama di Indonesia yang menghadirkan maksim hukum Latin dengan penjelasan mendalam dalam Bahasa Indonesia.
              </p>
              <Link href="/tentang" className="wiki-link" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                Pelajari lebih lanjut tentang VeriLex →
              </Link>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
