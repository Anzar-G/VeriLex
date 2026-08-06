import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Search, BookMarked, HelpCircle, Star, BookOpen, Shield, ChevronRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panduan Penggunaan VeriLex',
  description: 'Cara menggunakan fitur pencarian, flashcard, quiz, kontribusi, dan diskusi di VeriLex.',
};

const steps = [
  {
    icon: <Search size={22} color="#0F1B3C" />,
    num: '1',
    title: 'Menggunakan Indeks & Pencarian',
    desc: (
      <>
        <p>
          Gunakan kolom pencarian di bagian atas untuk memasukkan frase Latin (mis: <em>Nullum Crimen</em>)
          atau kata kunci Indonesia (mis: <em>hukum pidana</em>). Anda juga dapat:
        </p>
        <ul>
          <li>Memfilter berdasarkan <strong>bidang hukum</strong> melalui sidebar kiri (11 kategori tersedia)</li>
          <li>Menelusuri secara alfabetis via <Link href="/indeks">Indeks A–Z</Link></li>
          <li>Menjelajahi per kategori via <Link href="/kategori">Kategori Hukum</Link></li>
        </ul>
        <p>
          Setiap hasil pencarian menampilkan frase Latin, terjemahan singkat, dan bidang hukum terkait.
          Klik untuk membuka halaman detail lengkap.
        </p>
      </>
    ),
  },
  {
    icon: <BookMarked size={22} color="#0F1B3C" />,
    num: '2',
    title: 'Memanfaatkan Spaced Repetition Flashcard',
    desc: (
      <>
        <p>
          Modul <Link href="/flashcard">Flashcard</Link> menggunakan simulasi algoritma <em>Spaced Repetition (SRA)</em> —
          metode belajar berbasis neurosains yang membantu memindahkan informasi dari memori jangka pendek ke jangka panjang.
        </p>
        <ul>
          <li>Pilih arah belajar: <strong>Latin → Indonesia</strong> atau <strong>Indonesia → Latin</strong></li>
          <li>Klik kartu untuk membalik dan melihat jawaban</li>
          <li>Pilih <strong>"Sudah Ingat"</strong> atau <strong>"Belum Ingat"</strong> — level kartu otomatis menyesuaikan</li>
          <li>Login untuk menyimpan progres ke cloud dan melanjutkan antar perangkat</li>
        </ul>
      </>
    ),
  },
  {
    icon: <HelpCircle size={22} color="#0F1B3C" />,
    num: '3',
    title: 'Quiz Interaktif',
    desc: (
      <>
        <p>
          <Link href="/quiz">Quiz</Link> menyajikan 5 soal pilihan ganda berbasis kasus konkret dan asas hukum.
          Setiap sesi menggunakan soal acak dari bank soal yang terus bertambah.
        </p>
        <ul>
          <li>Setiap jawaban menampilkan analisis penjelasan yuridis</li>
          <li>Pasal rujukan dan contoh putusan pengadilan disertakan</li>
          <li>Skor disimpan ke Dashboard Progres Anda (jika login)</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Star size={22} color="#0F1B3C" />,
    num: '4',
    title: 'Menyimpan Maksim Favorit',
    desc: (
      <>
        <p>
          Klik ikon <strong>Bintang ★</strong> pada kartu hasil pencarian atau tombol di halaman detail untuk
          menyimpan maksim ke pustaka pribadi Anda.
        </p>
        <ul>
          <li>Semua favorit dapat diakses di halaman <Link href="/favorit">Favorit Saya</Link></li>
          <li>Pengguna login: favorit tersinkronisasi ke cloud</li>
          <li>Pengguna tamu: favorit disimpan lokal di browser</li>
          <li>Tambahkan <strong>catatan pribadi</strong> pada setiap maksim yang difavoritkan</li>
        </ul>
      </>
    ),
  },
  {
    icon: <BookOpen size={22} color="#0F1B3C" />,
    num: '5',
    title: 'Membaca Artikel Maksim Lengkap',
    desc: (
      <>
        <p>
          Setiap halaman maksim menyajikan informasi komprehensif:
        </p>
        <ul>
          <li><strong>Etimologi</strong>: bedah kata-per-kata konstruksi Latin</li>
          <li><strong>Makna Yuridis</strong>: penjelasan hukum mendalam</li>
          <li><strong>Sejarah</strong>: asal-usul dan perkembangan maksim</li>
          <li><strong>Contoh Kasus</strong>: putusan pengadilan Indonesia yang relevan</li>
          <li><strong>Peta Relasi</strong>: hubungan dengan maksim serumpun</li>
          <li><strong>Pelafalan Audio</strong>: rekonstruksi fonetis Latin klasik</li>
        </ul>
        <p>
          Gunakan <strong>Daftar Isi</strong> di awal halaman untuk navigasi cepat antar bagian.
        </p>
      </>
    ),
  },
  {
    icon: <Users size={22} color="#0F1B3C" />,
    num: '6',
    title: 'Diskusi & Catatan Pribadi',
    desc: (
      <>
        <p>
          Pada halaman detail maksim, terdapat dua area terpisah (tab):
        </p>
        <ul>
          <li><strong>Tab Diskusi</strong>: ruang komentar publik bagi komunitas pengguna VeriLex</li>
          <li><strong>Tab Catatan</strong>: area catatan pribadi yang hanya terlihat oleh Anda</li>
        </ul>
        <p>Login diperlukan untuk menggunakan kedua fitur ini.</p>
      </>
    ),
  },
  {
    icon: <Shield size={22} color="#0F1B3C" />,
    num: '7',
    title: 'Hak & Kewenangan per Role',
    desc: (
      <>
        <p>VeriLex menggunakan sistem <em>role-based access</em>. Setiap akun memiliki role yang menentukan apa yang dapat dilakukan:</p>
        <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F9FA' }}>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', border: '1px solid #EAECF0', fontWeight: 700 }}>Role</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', border: '1px solid #EAECF0', fontWeight: 700 }}>Kewenangan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pembaca', 'Membaca semua konten, favorit lokal'],
                ['Kontributor', 'Mengusulkan perubahan, diskusi, favorit cloud'],
                ['Editor', 'Menyetujui/menolak usulan Kontributor'],
                ['Senior Editor', 'Semua wewenang Editor + manajemen konten'],
                ['Pakar Bidang', 'Review substantif di bidang keahlian'],
                ['Administrator', 'Akses penuh termasuk manajemen pengguna'],
              ].map(([role, kw]) => (
                <tr key={role}>
                  <td style={{ padding: '0.5rem 0.75rem', border: '1px solid #EAECF0', fontWeight: 600, color: '#0F1B3C' }}>{role}</td>
                  <td style={{ padding: '0.5rem 0.75rem', border: '1px solid #EAECF0', color: '#54595D' }}>{kw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          Untuk mengajukan peningkatan role, buka halaman <Link href="/profil">Profil</Link> setelah login.
        </p>
      </>
    ),
  },
];

export default function PanduanPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '800px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <h1 style={{ margin: '0 0 0.375rem', border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F1B3C' }}>
                Panduan Penggunaan Platform
              </h1>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#54595D' }}>
                Panduan lengkap menggunakan semua fitur VeriLex — dari pencarian hingga kontribusi editorial.
                Lihat juga <Link href="/faq" style={{ color: '#0645AD' }}>FAQ</Link> untuk pertanyaan umum.
              </p>
            </div>

            {/* Quick nav */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#72777D', fontWeight: 600, alignSelf: 'center', marginRight: '0.25rem' }}>Langsung ke:</span>
              {steps.map(s => (
                <a key={s.num} href={`#step-${s.num}`} style={{ fontSize: '0.75rem', color: '#0645AD', padding: '0.25rem 0.5rem', border: '1px solid #EAECF0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontWeight: 700 }}>{s.num}.</span> {s.title.split(' ').slice(0, 2).join(' ')}…
                </a>
              ))}
            </div>

            {/* Steps */}
            {steps.map(step => (
              <div key={step.num} id={`step-${step.num}`} style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: '#EAF3FF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {step.icon}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                      <span style={{ color: '#A2A9B1', marginRight: '0.5rem' }}>{step.num}.</span>
                      {step.title}
                    </h2>
                    <div style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#54595D' }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #A2A9B1', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#54595D' }}>
                Masih ada pertanyaan? Cek halaman FAQ atau hubungi komunitas.
              </p>
              <Link href="/faq" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#0645AD', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                Lihat FAQ <ChevronRight size={14} />
              </Link>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
