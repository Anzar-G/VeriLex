import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Pertanyaan Umum (FAQ) — VeriLex',
  description: 'Jawaban atas pertanyaan umum tentang platform dan penyangkalan hukum.',
};

export default function FAQPage() {
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
              Pertanyaan Umum (FAQ) &amp; Penyangkalan
            </h1>

            <h2>Apa itu VeriLex?</h2>
            <p>
              VeriLex adalah ensiklopedia rujukan maksim hukum Latin independen yang menyajikan etimologi, makna filosofis-hukum, serta contoh perbandingan penerapannya dalam putusan pengadilan di Indonesia.
            </p>

            <h2>Apakah penjelasan dalam VeriLex merupakan Nasihat Hukum Resmi?</h2>
            <p>
              <strong>Tidak.</strong> Konten di VeriLex ditujukan murni untuk kepentingan akademis, edukasi, dan penelitian hukum. Konten ini bukan merupakan konsultasi atau nasihat hukum formal bagi kasus konkret di pengadilan.
            </p>

            <h2>Bagaimana pelafalan suara Latin bekerja?</h2>
            <p>
              VeriLex memanfaatkan Web Speech Synthesis bawaan peramban (*browser*) dengan fonetis fonemik Latin klasik untuk menghasilkan pengucapan audio secara otomatis saat tombol &ldquo;Pelafalan&rdquo; diklik.
            </p>

            <h2>Apakah data Favorit saya aman?</h2>
            <p>
              Ya, seluruh daftar maksim yang Anda simpan di simpan di penyimpanan lokal (*LocalStorage*) perangkat Anda secara privat dan tidak diunggah ke server pihak ketiga.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
