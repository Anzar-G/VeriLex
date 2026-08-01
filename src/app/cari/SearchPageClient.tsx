'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { legalFields } from '@/data/mockData';
import type { LegalField } from '@/types';
import { useVeriLexStore } from '@/lib/useStore';

type SortOption = 'relevansi' | 'abjad' | 'terbaru';
type SearchMaxim = {
  id: string;
  latinPhrase: string;
  indonesianMeaning: string;
  literalTranslation: string;
  pronunciationGuide: string;
  legalFields: LegalField[];
  legalMeaning: string;
  updatedAt: string;
};

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

// ── MaximCard inline (compact for grid view) ──────────────────────────────
function MaximGridCard({ maxim, isFav, onToggleFav }: {
  maxim: SearchMaxim;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const primaryField = maxim.legalFields[0];
  const c = fieldColors[primaryField] || fieldColors['umum'];

  return (
    <article style={{
      border: `1px solid ${c.border}`,
      borderTop: `3px solid ${c.icon}`,
      backgroundColor: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      transition: 'box-shadow 150ms, transform 150ms',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'none';
      }}
    >
      <Link href={`/maksim/${maxim.id}`} style={{ textDecoration: 'none', padding: '0.875rem', flex: 1 }}>
        {/* Field badge */}
        <span style={{
          fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.375rem',
          backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text,
          borderRadius: '2px', display: 'inline-block', marginBottom: '0.5rem',
        }}>
          {fieldShortLabels[primaryField] || primaryField}
        </span>

        {/* Latin phrase */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '0.9375rem', color: '#0F1B3C',
          margin: '0 0 0.25rem', lineHeight: 1.3,
        }}>
          {maxim.latinPhrase}
        </h3>

        {/* Indonesian meaning */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.75rem',
          color: '#54595D', fontStyle: 'italic',
          margin: '0 0 0.5rem', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          &ldquo;{maxim.indonesianMeaning}&rdquo;
        </p>
      </Link>

      {/* Footer: read + fav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 0.875rem', borderTop: '1px solid #EAECF0',
        backgroundColor: '#FAFAFA',
      }}>
        <Link href={`/maksim/${maxim.id}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
          color: '#0645AD', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none',
        }}>
          Baca <ArrowRight size={11} />
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); onToggleFav(); }}
          aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: isFav ? '#A67C52' : '#C8CCD1', padding: '0.125rem',
            display: 'flex', alignItems: 'center',
            transition: 'color 150ms',
          }}
        >
          <Star size={14} fill={isFav ? '#A67C52' : 'none'} />
        </button>
      </div>
    </article>
  );
}

// ── MaximCard for list view ────────────────────────────────────────────────
function MaximListCard({ maxim, isFav, onToggleFav }: {
  maxim: SearchMaxim;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const primaryField = maxim.legalFields[0];
  const c = fieldColors[primaryField] || fieldColors['umum'];

  return (
    <article style={{
      display: 'grid', gridTemplateColumns: '1fr auto',
      gap: '0 0.75rem', backgroundColor: '#FFFFFF',
      border: '1px solid #A2A9B1',
      borderLeft: `3px solid ${c.icon}`,
      padding: '0.875rem 1rem',
      transition: 'background-color 100ms',
    }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
    >
      <Link href={`/maksim/${maxim.id}`} style={{ textDecoration: 'none', gridColumn: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', lineHeight: 1.3 }}>
            {maxim.latinPhrase}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#72777D', whiteSpace: 'nowrap' }}>
            {maxim.pronunciationGuide}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', lineHeight: 1.55, margin: '0 0 0.375rem', fontStyle: 'italic' }}>
          &ldquo;{maxim.indonesianMeaning}&rdquo;
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#72777D',
          lineHeight: 1.5, margin: '0 0 0.5rem',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {maxim.legalMeaning.split('\n\n')[0]?.substring(0, 180)}...
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
          {maxim.legalFields.map(field => (
            <span key={field} style={{
              fontSize: '0.6875rem', fontWeight: 600, color: fieldColors[field]?.text || 'var(--navy)',
              backgroundColor: fieldColors[field]?.bg || '#F8F9FA',
              border: `1px solid ${fieldColors[field]?.border || '#EAECF0'}`,
              padding: '0.125rem 0.5rem', borderRadius: '2px',
            }}>
              {fieldLabels[field] || field}
            </span>
          ))}
          <span style={{ marginLeft: 'auto', color: '#0645AD', fontSize: '0.8125rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            Baca <ArrowRight size={12} />
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); onToggleFav(); }}
        aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: isFav ? '#A67C52' : '#C8CCD1',
          padding: '0.125rem', display: 'flex', alignItems: 'flex-start',
          paddingTop: '0.25rem', alignSelf: 'start', transition: 'color 150ms',
        }}
      >
        <Star size={16} fill={isFav ? '#A67C52' : 'none'} />
      </button>
    </article>
  );
}

// ── Alphabetical index bar ─────────────────────────────────────────────────
function AlphaBar({ onSelect, active }: { onSelect: (l: string) => void; active: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', padding: '0.625rem 0.875rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#FAFAFA' }}>
      {['Semua', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map(letter => (
        <button
          key={letter}
          onClick={() => onSelect(letter === 'Semua' ? '' : letter)}
          style={{
            minWidth: letter === 'Semua' ? '48px' : '24px',
            height: '24px', padding: '0 4px',
            border: '1px solid',
            borderColor: active === (letter === 'Semua' ? '' : letter) ? '#0F1B3C' : '#A2A9B1',
            backgroundColor: active === (letter === 'Semua' ? '' : letter) ? '#0F1B3C' : 'transparent',
            color: active === (letter === 'Semua' ? '' : letter) ? '#FFFFFF' : '#0645AD',
            fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 150ms',
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const { favorites, toggleFavorite } = useVeriLexStore();

  const urlQuery  = searchParams.get('q')      || '';
  const urlBidang = searchParams.get('bidang') || '';

  const paramKey = useMemo(() => `${urlQuery}|${urlBidang}`, [urlQuery, urlBidang]);

  const [inputValue,      setInputValue]      = useState(urlQuery);
  const [query,           setQuery]           = useState(urlQuery);
  const [selectedFields,  setSelectedFields]  = useState<LegalField[]>(urlBidang ? [urlBidang as LegalField] : []);
  const [sortBy,          setSortBy]          = useState<SortOption>('relevansi');
  const [showMobileFilter,setShowMobileFilter]= useState(false);
  const [currentPage,     setCurrentPage]     = useState(1);
  const [viewMode,        setViewMode]        = useState<'grid' | 'list'>('list');
  const [alphaFilter,     setAlphaFilter]     = useState('');
  const [remoteMaxims,    setRemoteMaxims]    = useState<SearchMaxim[]>([]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ limit: '100' });
    if (query) params.set('q', query);
    if (selectedFields.length) params.set('fields', selectedFields.join(','));
    if (sortBy === 'abjad') params.set('sort', 'alpha');
    void fetch(`/api/maxims?${params}`).then(response => response.json()).then(payload => {
      if (cancelled) return;
      setRemoteMaxims((payload.data ?? []).map((row: Record<string, unknown>) => ({
        id: row.id, latinPhrase: row.latin_phrase, indonesianMeaning: row.indonesian_meaning,
        literalTranslation: row.literal_translation, pronunciationGuide: row.pronunciation_guide,
        legalFields: row.legal_fields, legalMeaning: row.legal_meaning, updatedAt: row.updated_at,
      })));
    });
    return () => { cancelled = true; };
  }, [query, selectedFields, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const [prevParamKey, setPrevParamKey] = useState(paramKey);
  if (paramKey !== prevParamKey) {
    setPrevParamKey(paramKey);
    setInputValue(urlQuery);
    setQuery(urlQuery);
    setSelectedFields(urlBidang ? [urlBidang as LegalField] : []);
    setCurrentPage(1);
    setAlphaFilter('');
  }

  // Derive results
  let results = remoteMaxims;

  // Apply alpha filter on top
  if (alphaFilter) {
    results = results.filter(m => m.latinPhrase.toUpperCase().startsWith(alphaFilter));
  }

  if (sortBy === 'abjad') {
    results = [...results].sort((a, b) => a.latinPhrase.localeCompare(b.latinPhrase));
  } else if (sortBy === 'terbaru') {
    results = [...results].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  // Reset pagination on filter change
  const [prevQuery,  setPrevQuery]  = useState(query);
  const [prevFields, setPrevFields] = useState(selectedFields);
  const [prevSort,   setPrevSort]   = useState(sortBy);
  const [prevAlpha,  setPrevAlpha]  = useState(alphaFilter);

  if (query !== prevQuery || selectedFields !== prevFields || sortBy !== prevSort || alphaFilter !== prevAlpha) {
    setPrevQuery(query); setPrevFields(selectedFields); setPrevSort(sortBy); setPrevAlpha(alphaFilter);
    setCurrentPage(1);
  }

  const ITEMS_PER_PAGE = viewMode === 'grid' ? 12 : 10;
  const totalPages       = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
    setAlphaFilter('');
  };

  const handleAlphaSelect = (letter: string) => {
    setAlphaFilter(letter);
    setQuery('');
    setInputValue('');
    setCurrentPage(1);
  };

  const toggleField = (field: LegalField) => {
    setSelectedFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const isSingleLetter = /^[a-zA-Z]$/.test(query.trim());
  const hasActiveFilters = selectedFields.length > 0 || sortBy !== 'relevansi' || alphaFilter !== '';

  return (
    <div style={{ display: 'flex', gap: 0, height: '100%' }}>

      {/* ── Desktop Filter Sidebar ── */}
      <aside
        className="hidden lg:block"
        style={{
          width: '220px', flexShrink: 0,
          borderRight: '1px solid #EAECF0',
          padding: '1.25rem 1rem',
          position: 'sticky', top: '60px',
          alignSelf: 'flex-start',
          height: 'calc(100vh - 60px)', overflowY: 'auto',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Filter heading */}
        <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Bidang Hukum
        </p>
        {legalFields.map(field => {
          const c = fieldColors[field.id] || fieldColors['umum'];
          const isActive = selectedFields.includes(field.id);
          return (
            <label key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleField(field.id)}
                style={{ accentColor: c.icon, width: '14px', height: '14px', cursor: 'pointer' }}
                aria-label={`Filter ${fieldLabels[field.id]}`}
              />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                color: isActive ? c.text : '#202122', flex: 1,
                fontWeight: isActive ? 600 : 400,
              }}>
                {fieldShortLabels[field.id]}
              </span>
              <span style={{
                fontSize: '0.6875rem', color: isActive ? c.icon : '#72777D',
                fontFamily: 'var(--font-mono)', fontWeight: isActive ? 700 : 400,
              }}>
                {field.count}
              </span>
            </label>
          );
        })}

        <hr style={{ border: 'none', borderTop: '1px solid #EAECF0', margin: '1rem 0' }} />

        <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Urutkan
        </p>
        {(['relevansi', 'abjad', 'terbaru'] as SortOption[]).map(option => (
          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="radio" name="sortBy"
              checked={sortBy === option}
              onChange={() => setSortBy(option)}
              style={{ accentColor: 'var(--navy)', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#202122' }}>
              {option === 'relevansi' ? 'Relevansi' : option === 'abjad' ? 'Alfabetis (A–Z)' : 'Terbaru'}
            </span>
          </label>
        ))}

        {hasActiveFilters && (
          <button
            onClick={() => { setSelectedFields([]); setSortBy('relevansi'); setAlphaFilter(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', color: '#C85A54', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', padding: 0 }}
          >
            <X size={12} /> Hapus semua filter
          </button>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA' }}>

        {/* ── Page header with search ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAECF0', padding: '1rem 1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <div className="vector-tabs-group" style={{ marginBottom: 0 }}>
              <span className="vector-tab-item active">Semua Maksim</span>
              <span className="vector-tab-item disabled">Indeks A–Z</span>
            </div>
          </div>

          {/* Search bar row */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <form onSubmit={handleSearch} role="search" style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ position: 'relative', maxWidth: '560px' }}>
                <label htmlFor="search-input-field" className="sr-only">Cari frase Latin atau arti Indonesia</label>
                <Search size={15} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
                <input
                  type="search"
                  id="search-input-field"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Cari frase Latin atau arti Indonesia..."
                  className="input-text"
                  style={{ paddingLeft: '2.25rem', paddingRight: inputValue ? '2rem' : '0.625rem', backgroundColor: '#FFFFFF' }}
                />
                {inputValue && (
                  <button type="button" onClick={() => { setInputValue(''); setQuery(''); }}
                    style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}
                    aria-label="Bersihkan pencarian"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </form>

            {/* View toggle */}
            <div style={{ display: 'flex', border: '1px solid #A2A9B1', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
              {(['list', 'grid'] as const).map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  title={mode === 'list' ? 'Tampilan daftar' : 'Tampilan grid'}
                  style={{
                    padding: '0.375rem 0.625rem', border: 'none', cursor: 'pointer',
                    backgroundColor: viewMode === mode ? '#0F1B3C' : '#FFFFFF',
                    color: viewMode === mode ? '#FFFFFF' : '#54595D',
                    fontSize: '0.75rem', fontFamily: 'var(--font-body)', transition: 'all 150ms',
                  }}
                >
                  {mode === 'list' ? '≡ Daftar' : '⊞ Grid'}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabetical index bar */}
          <AlphaBar onSelect={handleAlphaSelect} active={alphaFilter} />
        </div>

        {/* ── Mobile Filter ── */}
        <div className="lg:hidden" style={{ padding: '0.75rem 1rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #EAECF0' }}>
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '0.375rem 0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#202122', cursor: 'pointer', borderRadius: '2px' }}
            aria-expanded={showMobileFilter}
          >
            <SlidersHorizontal size={13} />
            Filter &amp; Urutkan
            {selectedFields.length > 0 && (
              <span style={{ backgroundColor: 'var(--navy)', color: 'white', borderRadius: '999px', padding: '0 0.375rem', fontSize: '0.625rem', fontWeight: 700 }}>
                {selectedFields.length}
              </span>
            )}
            <ChevronDown size={12} style={{ transform: showMobileFilter ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
          </button>

          {showMobileFilter && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '0.75rem 1rem', marginTop: '0.375rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.625rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Bidang Hukum</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {legalFields.map(field => (
                  <button key={field.id} onClick={() => toggleField(field.id)} style={{
                    padding: '0.25rem 0.625rem',
                    border: `1px solid ${selectedFields.includes(field.id) ? 'var(--navy)' : '#A2A9B1'}`,
                    backgroundColor: selectedFields.includes(field.id) ? 'var(--navy)' : '#F8F9FA',
                    color: selectedFields.includes(field.id) ? '#FFFFFF' : '#202122',
                    fontSize: '0.75rem', cursor: 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)',
                  }}>
                    {fieldShortLabels[field.id]} ({field.count})
                  </button>
                ))}
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.625rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>Urutkan</p>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {(['relevansi', 'abjad', 'terbaru'] as SortOption[]).map(opt => (
                  <button key={opt} onClick={() => setSortBy(opt)} style={{
                    padding: '0.25rem 0.625rem',
                    border: `1px solid ${sortBy === opt ? '#3366CC' : '#A2A9B1'}`,
                    backgroundColor: sortBy === opt ? '#3366CC' : '#F8F9FA',
                    color: sortBy === opt ? '#FFFFFF' : '#202122',
                    fontSize: '0.75rem', cursor: 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)',
                  }}>
                    {opt === 'relevansi' ? 'Relevansi' : opt === 'abjad' ? 'A–Z' : 'Terbaru'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '1rem' }}>

          {/* Results status bar */}
          <div style={{ marginBottom: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', margin: 0 }}>
              {alphaFilter ? (
                <>
                  Maksim diawali huruf{' '}
                  <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1rem' }}>{alphaFilter}</strong>
                  {' '}—{' '}
                  <strong style={{ color: 'var(--navy)' }}>{results.length}</strong> entri
                </>
              ) : isSingleLetter && query ? (
                <>
                  Huruf <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>{query.toUpperCase()}</strong>
                  {' '}— <strong style={{ color: 'var(--navy)' }}>{results.length}</strong> entri
                </>
              ) : (
                <>
                  <strong style={{ color: 'var(--navy)' }}>{results.length}</strong> hasil
                  {query && <> untuk &ldquo;<strong style={{ color: 'var(--navy)' }}>{query}</strong>&rdquo;</>}
                  {selectedFields.length > 0 && <> · filter aktif</>}
                </>
              )}
            </p>

            {/* Active field chips */}
            {selectedFields.length > 0 && (
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {selectedFields.map(f => (
                  <button key={f} onClick={() => toggleField(f)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#EAECF0', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '0.125rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer', color: '#202122' }}
                    aria-label={`Hapus filter ${fieldLabels[f]}`}
                  >
                    {fieldShortLabels[f]} <X size={11} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '0.625rem',
                  marginBottom: '1.25rem',
                }}>
                  {paginatedResults.map(maxim => (
                    <MaximGridCard
                      key={maxim.id}
                      maxim={maxim}
                      isFav={favorites.includes(maxim.id)}
                      onToggleFav={() => toggleFavorite(maxim.id)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {paginatedResults.map(maxim => (
                    <MaximListCard
                      key={maxim.id}
                      maxim={maxim}
                      isFav={favorites.includes(maxim.id)}
                      onToggleFav={() => toggleFavorite(maxim.id)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem', padding: '1rem 0' }}>
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    style={{ padding: '0.375rem 0.625rem', border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF', color: currentPage === 1 ? '#A2A9B1' : '#202122', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}
                  >
                    «
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ padding: '0.375rem 0.75rem', border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF', color: currentPage === 1 ? '#A2A9B1' : '#202122', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
                  >
                    ← Sebelumnya
                  </button>

                  {/* Page number chips */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                    return (
                      <button key={page} onClick={() => setCurrentPage(page)}
                        style={{
                          padding: '0.375rem 0.625rem', border: '1px solid',
                          borderColor: page === currentPage ? '#0F1B3C' : '#A2A9B1',
                          backgroundColor: page === currentPage ? '#0F1B3C' : '#FFFFFF',
                          color: page === currentPage ? '#FFFFFF' : '#202122',
                          cursor: 'pointer', borderRadius: '2px',
                          fontFamily: 'var(--font-body)', fontSize: '0.8125rem', minWidth: '32px',
                        }}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{ padding: '0.375rem 0.75rem', border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF', color: currentPage === totalPages ? '#A2A9B1' : '#202122', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
                  >
                    Selanjutnya →
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{ padding: '0.375rem 0.625rem', border: '1px solid #A2A9B1', backgroundColor: '#FFFFFF', color: currentPage === totalPages ? '#A2A9B1' : '#202122', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}
                  >
                    »
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '3rem 2rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                {alphaFilter
                  ? `Belum ada entri diawali huruf "${alphaFilter}"`
                  : isSingleLetter && query
                    ? `Belum ada maksim diawali huruf "${query.toUpperCase()}"`
                    : 'Tidak ada hasil ditemukan'}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#72777D' }}>
                Coba kata kunci lain atau pilih huruf dari indeks di atas.
              </p>
              <Link href="/cari" style={{ display: 'inline-block', marginTop: '0.75rem', padding: '0.375rem 1rem', backgroundColor: '#0F1B3C', color: '#FFFFFF', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', borderRadius: '2px' }}
                onClick={() => { setQuery(''); setInputValue(''); setSelectedFields([]); setAlphaFilter(''); }}
              >
                Lihat semua maksim
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPageClient() {
  return (
    <Suspense fallback={
      <div style={{ padding: '2rem', textAlign: 'center', color: '#54595D', fontFamily: 'var(--font-body)' }}>
        Memuat hasil pencarian...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
