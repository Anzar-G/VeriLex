import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MaximDetailWrapper from './MaximDetailWrapper';
import { getMaximByIdFromDB } from '@/lib/maxims-server';
import { createServerClient } from '@/lib/supabase-server';

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

  const canonicalUrl = `https://verilex.vercel.app/maksim/${id}`;

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
    }
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

  return (
    <>
      <Header />
      <MaximDetailWrapper maxim={maxim!} />
      <Footer />
    </>
  );
}
