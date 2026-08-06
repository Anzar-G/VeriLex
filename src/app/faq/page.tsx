'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronDown, AlertTriangle, HelpCircle } from 'lucide-react';

const faqGroups = [
  {
    heading: 'Tentang Platform',
    items: [
      {
        question: 'Apa itu VeriLex?',
        answer: 'VeriLex adalah ensiklopedia digital rujukan maksim hukum Latin independen yang menyajikan etimologi, makna filosofis-hukum, serta contoh perbandingan penerapannya dalam putusan pengadilan di Indonesia. Platform ini ditujukan untuk mahasiswa hukum, akademisi, dan praktisi hukum.',
      },
      {
        question: 'Siapa yang membuat dan mengelola VeriLex?',
        answer: 'VeriLex dikelola oleh komunitas terbuka yang terdiri dari mahasiswa hukum, praktisi, dan akademisi. Setiap entri melalui proses kurasi berlapis: Kontributor mengusulkan konten, Editor meninjau, Senior Editor memvalidasi, dan Pakar Bidang memberikan verifikasi substantif.',
      },
      {
        question: 'Apakah VeriLex gratis?',
        answer: 'Ya. Seluruh konten VeriLex dapat diakses secara gratis tanpa perlu mendaftar. Akun diperlukan hanya jika Anda ingin menyimpan favorit ke cloud, berpartisipasi dalam diskusi artikel, atau berkontribusi sebagai editor.',
      },
    ],
  },
  {
    heading: 'Nasihat Hukum & Penyangkalan',
    items: [
      {
        question: 'Apakah penjelasan dalam VeriLex merupakan Nasihat Hukum Resmi?',
        answer: 'Tidak. Konten di VeriLex ditujukan murni untuk kepentingan akademis, edukasi, dan penelitian hukum. Konten ini bukan merupakan konsultasi atau nasihat hukum formal bagi kasus konkret di pengadilan. Untuk masalah hukum nyata, konsultasikan dengan advokat terdaftar atau lembaga bantuan hukum resmi.',
        warning: true,
      },
      {
        question: 'Seberapa akurat konten VeriLex?',
        answer: 'Setiap entri melalui proses verifikasi editorial yang ketat: merujuk sumber primer Latin (Corpus Juris Civilis, Digestum), kamus hukum otoritatif (Black\'s Law Dictionary, Bouvier\'s), dan putusan pengadilan Indonesia. Namun, VeriLex tidak menjamin akurasi absolut. Pengguna dianjurkan memverifikasi ke sumber primer sebelum menggunakan dalam dokumen hukum resmi.',
      },
    ],
  },
  {
    heading: 'Fitur Platform',
    items: [
      {
        question: 'Bagaimana pelafalan suara Latin bekerja?',
        answer: 'VeriLex memanfaatkan Web Speech Synthesis bawaan peramban (browser) dengan fonetis fonemik Latin klasik. Klik tombol "Pelafalan" pada halaman detail maksim untuk mendengarkan pengucapan. Kualitas audio bergantung pada mesin TTS yang tersedia di browser Anda.',
      },
      {
        question: 'Apa itu Spaced Repetition Flashcard?',
        answer: 'Modul Flashcard menggunakan simulasi algoritma Spaced Repetition (SRA) — metode belajar berbasis neurosains yang mengoptimalkan waktu pengulangan materi berdasarkan tingkat hafalan Anda. Kartu yang sering lupa akan muncul lebih sering, sementara kartu yang sudah hafal dijadwalkan lebih jarang.',
      },
      {
        question: 'Bagaimana sistem Quiz bekerja?',
        answer: 'Quiz menyajikan pertanyaan pilihan ganda berbasis kasus konkret dan asas hukum. Setiap sesi menampilkan 5 soal acak dari bank soal. Setelah menjawab, Anda mendapat analisis penjelasan yuridis dan pasal rujukan yang relevan.',
      },
      {
        question: 'Apakah data Favorit saya aman?',
        answer: 'Untuk pengguna yang login, favorit disimpan di database VeriLex (Supabase) yang terenkripsi. Untuk pengguna tamu, favorit disimpan di LocalStorage perangkat Anda secara lokal. Data lokal tidak diunggah ke server manapun.',
      },
    ],
  },
  {
    heading: 'Kontribusi',
    items: [
      {
        question: 'Bagaimana cara berkontribusi ke VeriLex?',
        answer: 'Daftarkan akun, lalu ajukan permohonan role "Kontributor" di halaman Profil. Setelah disetujui administrator, Anda dapat mengusulkan tambahan atau perbaikan pada halaman maksim manapun. Usulan akan ditinjau editor sebelum dipublikasikan.',
      },
      {
        question: 'Apa perbedaan role Contributor, Editor, Senior Editor, dan Pakar Bidang?',
        answer: 'Contributor dapat mengusulkan perubahan. Editor dapat menyetujui/menolak usulan. Senior Editor memiliki wewenang lebih luas termasuk mengelola editor. Pakar Bidang (Subject Expert) adalah reviewer dengan keahlian substantif di bidang hukum tertentu.',
      },
    ],
  },
];

function FAQItem({ question, answer, warning }: { question: string; answer: string; warning?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #EAECF0' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: '0.75rem', padding: '0.875rem 0', background: 'none',
          border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}
        aria-expanded={open}
      >
        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#202122', lineHeight: 1.5 }}>
          {warning && <AlertTriangle size={14} style={{ color: '#AC6600', marginRight: '0.375rem', verticalAlign: 'middle', display: 'inline' }} />}
          {question}
        </span>
        <ChevronDown size={16} style={{ flexShrink: 0, color: '#72777D', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms', marginTop: '3px' }} />
      </button>
      {open && (
        <div style={{ paddingBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#54595D', margin: 0 }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqGroups.flatMap(g => g.items).map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '800px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                <HelpCircle size={20} color="#0F1B3C" />
                <h1 style={{ margin: 0, border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F1B3C' }}>
                  Pertanyaan Umum (FAQ)
                </h1>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#54595D' }}>
                Jawaban atas pertanyaan paling sering diajukan tentang VeriLex. Lihat juga halaman{' '}
                <Link href="/penyangkalan" style={{ color: '#0645AD' }}>Penyangkalan</Link> dan{' '}
                <Link href="/panduan" style={{ color: '#0645AD' }}>Panduan Penggunaan</Link>.
              </p>
            </div>

            {/* FAQ Groups */}
            {faqGroups.map(group => (
              <div key={group.heading} style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 0.75rem', borderBottom: '1px solid #EAECF0', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {group.heading}
                </h2>
                {group.items.map(item => (
                  <FAQItem key={item.question} {...item} />
                ))}
              </div>
            ))}

            {/* Link to Penyangkalan */}
            <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '1rem 1.25rem' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400E', lineHeight: 1.6 }}>
                <strong>Penyangkalan resmi platform</strong> — termasuk batas tanggung jawab editorial dan penggunaan konten —
                tersedia di halaman terpisah.{' '}
                <Link href="/penyangkalan" style={{ color: '#92400E', fontWeight: 700 }}>
                  Baca Penyangkalan VeriLex →
                </Link>
              </p>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
