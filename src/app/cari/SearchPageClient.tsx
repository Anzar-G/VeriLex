'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { searchMaxims, legalFields } from '@/data/mockData';
import type { LegalField } from '@/types';
import MaximCard from '@/components/maxim/MaximCard';

type SortOption = 'relevansi' | 'abjad' | 'terbaru';

const fieldLabels: Record<string, string> = {
  'pidana': 'Pidana',
  'perdata': 'Perdata',
  'tata-negara': 'Tata Negara',
  'internasional': 'Internasional',
  'administrasi': 'Administrasi',
};

function SearchContent() {
  const searchParams = useSearchParams();

  // Keep local state synced with URL params
  const urlQuery  = searchParams.get('q')      || '';
  const urlBidang = searchParams.get('bidang') || '';

  const [inputValue,     setInputValue]     = useState(urlQuery);
  const [query,          setQuery]          = useState(urlQuery);
  const [selectedFields, setSelectedFields] = useState<LegalField[]>(
    urlBidang ? [urlBidang as LegalField] : []
  );
  const [sortBy,           setSortBy]           = useState<SortOption>('relevansi');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync state when URL params change (e.g., clicking sidebar or A-Z index)
  useEffect(() => {
    const q      = searchParams.get('q')      || '';
    const bidang = searchParams.get('bidang') || '';
    setInputValue(q);
    setQuery(q);
    setSelectedFields(bidang ? [bidang as LegalField] : []);
  }, [searchParams]);

  // Derive results during render (no useEffect needed)
  let results = searchMaxims(query, selectedFields);
  if (sortBy === 'abjad') {
    results = [...results].sort((a, b) => a.latinPhrase.localeCompare(b.latinPhrase));
  } else if (sortBy === 'terbaru') {
    results = [...results].sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const toggleField = (field: LegalField) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  // Single letter = index mode
  const isSingleLetter = /^[a-zA-Z]$/.test(query.trim());

  return (
    <div style={{ display: 'flex', gap: 0, height: '100%' }}>

      {/* ── Desktop Filter Sidebar ──────────────────────────── */}
      <aside
        className="hidden lg:block"
        style={{
          width: '220px',
          flexShrink: 0,
          borderRight: '1px solid #EAECF0',
          padding: '1.5rem 1rem',
          position: 'sticky',
          top: '60px',
          alignSelf: 'flex-start',
          height: 'calc(100vh - 60px)',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Bidang Hukum
        </p>
        {legalFields.map((field) => (
          <label key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={selectedFields.includes(field.id)}
              onChange={() => toggleField(field.id)}
              style={{ accentColor: 'var(--navy)', width: '14px', height: '14px', cursor: 'pointer' }}
              aria-label={`Filter Hukum ${fieldLabels[field.id]}`}
            />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#202122', flex: 1 }}>
              {fieldLabels[field.id]}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#72777D', fontFamily: 'var(--font-mono)' }}>
              {field.count}
            </span>
          </label>
        ))}

        <hr style={{ border: 'none', borderTop: '1px solid #EAECF0', margin: '1rem 0' }} />

        <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Urutkan
        </p>
        {(['relevansi', 'abjad', 'terbaru'] as SortOption[]).map((option) => (
          <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="radio"
              name="sortBy"
              checked={sortBy === option}
              onChange={() => setSortBy(option)}
              style={{ accentColor: 'var(--navy)', cursor: 'pointer' }}
              aria-label={`Urutkan berdasarkan ${option}`}
            />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#202122' }}>
              {option === 'relevansi' ? 'Relevansi' : option === 'abjad' ? 'Alfabetis (A–Z)' : 'Terbaru'}
            </span>
          </label>
        ))}

        {(selectedFields.length > 0 || sortBy !== 'relevansi') && (
          <button
            onClick={() => { setSelectedFields([]); setSortBy('relevansi'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', color: '#C85A54', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', padding: 0 }}
          >
            <X size={12} /> Hapus semua filter
          </button>
        )}
      </aside>

      {/* ── Main Content ───────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, padding: '1.5rem 1.75rem', backgroundColor: '#F8F9FA' }}>

        {/* Search Bar */}
        <form onSubmit={handleSearch} role="search" style={{ marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <label htmlFor="search-input-field" className="sr-only">Cari frase Latin atau arti Indonesia</label>
            <input
              type="search"
              id="search-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cari frase Latin (Lex, Nullum...) atau arti Indonesia..."
              aria-label="Cari maksim hukum"
              className="input-text"
              style={{ paddingLeft: '2.5rem', backgroundColor: '#FFFFFF' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
            {inputValue && (
              <button
                type="button"
                onClick={() => { setInputValue(''); setQuery(''); }}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}
                aria-label="Bersihkan pencarian"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden" style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '0.4375rem 0.875rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#202122', cursor: 'pointer', borderRadius: '2px' }}
            aria-expanded={showMobileFilter}
            aria-label="Tampilkan opsi filter dan urutkan"
          >
            <SlidersHorizontal size={14} />
            Filter &amp; Urutkan
            {selectedFields.length > 0 && (
              <span style={{ backgroundColor: 'var(--navy)', color: 'white', borderRadius: '999px', padding: '0.0625rem 0.4375rem', fontSize: '0.6875rem', fontWeight: 700 }}>
                {selectedFields.length}
              </span>
            )}
            <ChevronDown size={13} style={{ transform: showMobileFilter ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
          </button>

          {showMobileFilter && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1rem 1.25rem', marginTop: '0.375rem', borderRadius: '2px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>Bidang Hukum</p>
              {legalFields.map(field => (
                <label key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4375rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedFields.includes(field.id)} 
                    onChange={() => toggleField(field.id)} 
                    style={{ accentColor: 'var(--navy)' }} 
                    aria-label={`Filter Hukum ${fieldLabels[field.id]} mobile`}
                  />
                  <span style={{ fontSize: '0.875rem' }}>{fieldLabels[field.id]}</span>
                  <span style={{ fontSize: '0.75rem', color: '#72777D', marginLeft: 'auto' }}>{field.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Results header */}
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', margin: 0 }}>
            {isSingleLetter && query ? (
              <>
                Menampilkan maksim yang diawali huruf{' '}
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>{query.toUpperCase()}</span>
                {' '}—{' '}
                <strong style={{ color: 'var(--navy)' }}>{results.length}</strong> entri
              </>
            ) : (
              <>
                Menampilkan <strong style={{ color: 'var(--navy)' }}>{results.length}</strong> hasil
                {query && <> untuk &ldquo;<strong style={{ color: 'var(--navy)' }}>{query}</strong>&rdquo;</>}
                {selectedFields.length > 0 && (
                  <> — filter: {selectedFields.map(f => fieldLabels[f]).join(', ')}</>
                )}
              </>
            )}
          </p>

          {/* Active field chips */}
          {selectedFields.length > 0 && (
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {selectedFields.map(f => (
                <button
                  key={f}
                  onClick={() => toggleField(f)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#EAECF0', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '0.125rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer', color: '#202122' }}
                  aria-label={`Hapus filter ${fieldLabels[f]}`}
                >
                  {fieldLabels[f]} <X size={11} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {results.map((maxim) => (
              <MaximCard key={maxim.id} maxim={maxim} />
            ))}
          </div>
        ) : (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '3rem 2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
              {isSingleLetter && query
                ? `Belum ada maksim yang diawali huruf "${query.toUpperCase()}" dalam database`
                : 'Tidak ada hasil ditemukan'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#72777D' }}>
              Coba kata kunci lain atau gunakan indeks abjad di halaman beranda.
            </p>
          </div>
        )}
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
