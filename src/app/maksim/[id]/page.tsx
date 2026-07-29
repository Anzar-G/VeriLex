import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MaximDetailClient from './MaximDetailClient';
import { getMaximById, mockMaxims } from '@/data/mockData';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const maxim = getMaximById(id);
  if (!maxim) return { title: 'Maksim tidak ditemukan — VeriLex' };
  return {
    title: `${maxim.latinPhrase} — VeriLex`,
    description: maxim.indonesianMeaning,
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
      <MaximDetailClient maxim={maxim} />
      <Footer />
    </>
  );
}
