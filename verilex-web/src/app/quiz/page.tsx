import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
  title: 'Quiz Maksim Hukum — VeriLex',
  description: 'Uji pemahaman Anda tentang maksim hukum Latin dengan quiz interaktif.',
};

export default function QuizPage() {
  return (
    <>
      <Header />
      <QuizClient />
      <Footer />
    </>
  );
}
