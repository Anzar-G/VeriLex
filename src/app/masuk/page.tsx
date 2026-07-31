import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Masuk — VeriLex',
  description: 'Masuk ke akun VeriLex Anda untuk berkontribusi pada ensiklopedia maksim hukum Latin.',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginClient />
      <Footer />
    </>
  );
}
