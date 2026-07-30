import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MaximDetailWrapper from './MaximDetailWrapper';
import { getMaximById, mockMaxims } from '@/data/mockData';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const maxim = getMaximById(id);
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

export async function generateStaticParams() {
  return mockMaxims.map((m) => ({ id: m.id }));
}

export default async function MaximDetailPage({ params }: Props) {
  const { id } = await params;
  const maxim = getMaximById(id);

  if (!maxim) notFound();

  return (
    <>
      <Header />
      <MaximDetailWrapper maxim={maxim!} />
      <Footer />
    </>
  );
}
