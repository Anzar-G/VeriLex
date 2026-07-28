import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomepageClient from './HomepageClient';

export const metadata: Metadata = {
  title: 'VeriLex — Platform Referensi Maksim Hukum Latin Indonesia',
  description: 'Platform digital terintegrasi pertama di Indonesia untuk referensi maksim hukum Latin dengan penjelasan mendalam, contoh putusan, dan fitur pembelajaran interaktif.',
  keywords: 'maksim hukum latin, hukum indonesia, lex posterior, nullum crimen, pacta sunt servanda',
  openGraph: {
    title: 'VeriLex — Platform Referensi Maksim Hukum Latin Indonesia',
    description: 'Referensi komprehensif maksim hukum Latin untuk mahasiswa dan praktisi hukum Indonesia.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <HomepageClient />
      <Footer />
    </>
  );
}
