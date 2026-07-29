import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Tentang VeriLex — Ensiklopedia Hukum',
  description: 'Informasi latar belakang dan misi pengembangan platform VeriLex.',
};

export default function TentangPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '2rem', maxWidth: '840px' }}>
            <h1 style={{ margin: '0 0 1rem', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.5rem' }}>
              Tentang VeriLex
            </h1>
            
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--steel)' }}>
              <strong>VeriLex</strong> (berasal dari kata Latin <em>Veritas</em> yang berarti Kebenaran dan <em>Lex</em> yang berarti Hukum) adalah ensiklopedia digital terpadu pertama di Indonesia yang khusus didedikasikan untuk memetakan, menjelaskan, dan menyediakan referensi putusan pengadilan terkait maksim hukum Latin.
            </p>

            <h2>Misi &amp; Visi</h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8 }}>
              <li><strong>Presisi Akademis:</strong> Menyediakan penjelasan bedah etimologi kata per kata dan konstruksi makna hukum yang sahih.</li>
              <li><strong>Integrasi Yurisprudensi:</strong> Menghubungkan maksim hukum kuno dengan penerapannya dalam putusan Mahkamah Agung &amp; Mahkamah Konstitusi Republik Indonesia.</li>
              <li><strong>Aksesibilitas Pembelajaran:</strong> Menyediakan alat kognitif modern seperti *Spaced Repetition Flashcard* dan *Quiz* untuk mempermudah ingatan bagi mahasiswa dan praktisi hukum.</li>
            </ul>

            <h2>Standar Referensi</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
              Setiap maksim yang dimuat dalam VeriLex dikurasi melalui literatur klasik (seperti <em>Corpus Juris Civilis</em>, Black&apos;s Law Dictionary) serta komparasi dengan yurisprudensi Indonesia dari KUHP, KUHPerdata, UU Pembentukan Peraturan Perundang-undangan, dan putusan landmark pengadilan.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
