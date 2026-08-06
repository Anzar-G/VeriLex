import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

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
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '900px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <h1 style={{ margin: '0 0 0.375rem', border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F1B3C' }}>
                Indeks A–Z Maksim Hukum Latin
              </h1>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#54595D' }}>
                {maxims.length} maksim tersedia — telusuri berdasarkan huruf awal frase Latin.
                Lihat juga <Link href="/kategori" style={{ color: '#0645AD' }}>Kategori Hukum</Link>.
              </p>
            </div>

            {/* Alphabet nav */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {alphabet.map(letter => {
                const hasEntries = groups[letter];
                return hasEntries ? (
                  <a key={letter} href={`#letter-${letter}`}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#0645AD', textDecoration: 'none', backgroundColor: '#EAF3FF', border: '1px solid #BFDBFE' }}>
                    {letter}
                  </a>
                ) : (
                  <span key={letter}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: '#A2A9B1' }}>
                    {letter}
                  </span>
                );
              })}
            </div>

            {/* Letter groups */}
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '1.5rem' }}>
                {/* Letter heading */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px', backgroundColor: '#0F1B3C',
                    color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', flexShrink: 0,
                  }}>
                    {letter}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#72777D', fontFamily: 'var(--font-body)' }}>
                    {groups[letter].length} maksim
                  </span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #EAECF0' }} />
                </div>

                {/* Maxim cards */}
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {groups[letter].map(maxim => (
                    <Link key={maxim.id} href={`/maksim/${maxim.id}`}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #EAECF0', textDecoration: 'none', transition: 'border-color 100ms' }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F1B3C', margin: '0 0 0.25rem' }}>
                          {maxim.latin_phrase}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0, lineHeight: 1.5 }}>
                          {maxim.indonesian_meaning}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
                        {((maxim.legal_fields ?? []) as string[]).slice(0, 2).map((f: string) => (
                          <span key={f} style={{ fontSize: '0.7rem', padding: '0.125rem 0.375rem', backgroundColor: '#F8F9FA', color: '#54595D', border: '1px solid #EAECF0', whiteSpace: 'nowrap' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Back to top */}
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #EAECF0' }}>
              <a href="#" style={{ fontSize: '0.8125rem', color: '#0645AD' }}>↑ Kembali ke atas</a>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
