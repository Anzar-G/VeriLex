import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';
import { BookOpen, ArrowUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indeks A–Z Maksim Hukum Latin — VeriLex',
  description: 'Indeks alfabetis lengkap seluruh maksim hukum Latin di VeriLex. Temukan asas hukum berdasarkan huruf awal frase Latin.',
  alternates: { canonical: `${siteUrl}/indeks` },
};

export default async function IndexPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('maxims')
    .select('id, latin_phrase, indonesian_meaning, legal_fields')
    .eq('is_active', true)
    .order('latin_phrase');

  const maxims = data ?? [];
  const groups = maxims.reduce<Record<string, typeof maxims>>((out, maxim) => {
    const letter = maxim.latin_phrase.charAt(0).toUpperCase();
    (out[letter] ??= []).push(maxim);
    return out;
  }, {});

  const letters = Object.keys(groups).sort();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

            {/* Page Header */}
            <div className="page-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={20} color="#2563EB" />
                </div>
                <h1 style={{ margin: 0 }}>Indeks A–Z Maksim Hukum Latin</h1>
              </div>
              <p style={{ marginTop: '0.25rem' }}>
                {maxims.length} maksim tersedia — telusuri berdasarkan huruf awal frase Latin.{' '}
                Lihat juga <Link href="/kategori" style={{ color: '#2563EB', fontWeight: 600 }}>Kategori Hukum</Link>.
              </p>
            </div>

            {/* Alphabet Navigation Bar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.375rem',
              boxShadow: '0 4px 15px -2px rgba(15, 23, 42, 0.03)',
            }}>
              {alphabet.map(letter => {
                const hasEntries = groups[letter];
                return hasEntries ? (
                  <a key={letter} href={`#letter-${letter}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '34px', height: '34px', borderRadius: '8px',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem',
                      color: '#2563EB', textDecoration: 'none', backgroundColor: '#EFF6FF',
                      border: '1px solid #DBEAFE', transition: 'all 150ms ease',
                    }}>
                    {letter}
                  </a>
                ) : (
                  <span key={letter}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '34px', height: '34px', borderRadius: '8px',
                      fontFamily: 'var(--font-display)', fontSize: '0.9375rem', color: '#94A3B8',
                      backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9',
                    }}>
                    {letter}
                  </span>
                );
              })}
            </div>

            {/* Letter Groups */}
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '2rem' }}>
                {/* Letter Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '42px', height: '42px', backgroundColor: '#0F172A', borderRadius: '10px',
                    color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', flexShrink: 0,
                    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.1)',
                  }}>
                    {letter}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                    {groups[letter].length} entri maksim
                  </span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
                </div>

                {/* Maxim Cards List */}
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {groups[letter].map(maxim => (
                    <Link key={maxim.id} href={`/maksim/${maxim.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem',
                        padding: '1.125rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0',
                        borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 8px -1px rgba(15, 23, 42, 0.02)',
                        transition: 'all 150ms ease',
                      }}
                      className="wiki-card-hover"
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0F172A', margin: '0 0 0.25rem' }}>
                          {maxim.latin_phrase}
                        </p>
                        <p style={{ fontSize: '0.84375rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                          {maxim.indonesian_meaning}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
                        {((maxim.legal_fields ?? []) as string[]).slice(0, 2).map((f: string) => (
                          <span key={f} className="badge badge-neutral">
                            {f}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Back to top button */}
            <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.84375rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
                <ArrowUp size={15} /> Kembali ke atas
              </a>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
