import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import MaximDetailWrapper from './MaximDetailWrapper';
import { getMaximByIdFromDB } from '@/lib/maxims-server';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

interface Props {
  params: Promise<{ id: string }>;
}

// Render dynamically so edits saved to the database are reflected on reload
// instead of serving a stale build-time snapshot.
export const dynamic = 'force-dynamic';

// Resolve a maxim by id exclusively from the database.
async function resolveMaxim(id: string) {
  return (await getMaximByIdFromDB(id)) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const maxim = await resolveMaxim(id);
  if (!maxim) return { title: 'Maksim tidak ditemukan — VeriLex' };

  const canonicalUrl = `${siteUrl}/maksim/${id}`;

  return {
    title: `${maxim.latinPhrase} — Arti & Penjelasan Hukum | VeriLex`,
    description: `Pelajari makna hukum, etimologi, sejarah, dan putusan pengadilan terkait maksim Latin: ${maxim.latinPhrase} (${maxim.indonesianMeaning}).`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${maxim.latinPhrase} — VeriLex`,
      description: maxim.indonesianMeaning,
      url: canonicalUrl,
      type: 'article',
      images: [{ url: '/verilex-logo.png', width: 1200, height: 1200, alt: `VeriLex: ${maxim.latinPhrase}` }],
    },
    twitter: { card: 'summary_large_image', images: ['/verilex-logo.png'] },
  };
}

// Generate static params from the live database.
// With `dynamic = 'force-dynamic'` this is effectively skipped at runtime,
// but keeping it allows incremental static generation for known IDs.
export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('maxims')
    .select('id')
    .eq('is_active', true);
  return (data ?? []).map(m => ({ id: m.id }));
}

export default async function MaximDetailPage({ params }: Props) {
  const { id } = await params;
  const maxim = await resolveMaxim(id);

  if (!maxim) notFound();
  const canonicalUrl = `${siteUrl}/maksim/${id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: maxim.latinPhrase, description: maxim.indonesianMeaning, mainEntityOfPage: canonicalUrl, dateModified: maxim.updatedAt, author: { '@type': 'Organization', name: 'VeriLex Editorial' }, publisher: { '@type': 'Organization', name: 'VeriLex', logo: { '@type': 'ImageObject', url: `${siteUrl}/verilex-logo.png` } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Maksim Hukum', item: `${siteUrl}/cari` }, { '@type': 'ListItem', position: 3, name: maxim.latinPhrase, item: canonicalUrl }] },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="container-page" style={{ padding: '0.75rem 1rem 0', fontSize: '0.8125rem', color: '#54595D' }}>
        <Link href="/" className="wiki-link">Beranda</Link> <span aria-hidden="true">/</span> <Link href="/cari" className="wiki-link">Maksim Hukum</Link> <span aria-hidden="true">/</span> <span>{maxim.latinPhrase}</span>
      </nav>
      <MaximDetailWrapper maxim={maxim!} />
      <Footer />
    </>
  );
}
