import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Daftar — VeriLex',
  description: 'Buat akun VeriLex dan mulai berkontribusi pada ensiklopedia maksim hukum Latin Indonesia.',
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <RegisterClient />
      <Footer />
    </>
  );
}
