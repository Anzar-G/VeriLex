import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FlashcardClient from './FlashcardClient';

export const metadata: Metadata = {
  title: 'Flashcard Maksim Hukum — VeriLex',
  description: 'Hafalkan maksim hukum Latin dengan sistem spaced repetition.',
};

export default function FlashcardPage() {
  return (
    <>
      <Header />
      <FlashcardClient />
      <Footer />
    </>
  );
}
