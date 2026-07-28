import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Panduan Penggunaan — VeriLex',
  description: 'Cara menggunakan fitur pencarian, flashcard, dan quiz di VeriLex.',
};

export default function PanduanPage() {
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
              Panduan Penggunaan Platform
            </h1>

            <h2>1. Menggunakan Indeks &amp; Pencarian</h2>
            <p>
              Gunakan kolom pencarian di bagian atas untuk memasukkan frase Latin (misal: <em>Nullum Crimen</em>) atau kata kunci Indonesia (misal: <em>hukum pidana</em>). Anda juga dapat memfilter berdasarkan 5 kategori bidang hukum utama di sidebar.
            </p>

            <h2>2. Memanfaatkan Spaced Repetition Flashcard</h2>
            <p>
              Modul Flashcard menggunakan simulasi algoritma *Spaced Repetition Algorithm* (SRA). Klik kartu untuk membalik antara tampilan frase Latin dan arti Indonesia. Pilih <strong>&ldquo;Sudah Ingat&rdquo;</strong> atau <strong>&ldquo;Belum Ingat&rdquo;</strong> untuk memperbarui progres level hafalan Anda di Dashboard.
            </p>

            <h2>3. Quiz Interaktif</h2>
            <p>
              Quiz menyajikan 5 pertanyaan acak berbasis kasus konkret dan asas hukum. Setiap jawaban akan langsung menampilkan analisis penjelasan yuridis dan pasal rujukan yang relevan.
            </p>

            <h2>4. Menyimpan Maksim Favorit</h2>
            <p>
              Klik ikon Bintang pada kartu atau halaman detail untuk menyimpan maksim ke dalam pustaka pribadi Anda. Data disembunyikan secara aman di browser Anda melalui penyimpanan lokal.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
