import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Pertanyaan Umum (FAQ) — VeriLex',
  description: 'Jawaban atas pertanyaan umum tentang platform dan penyangkalan hukum.',
  alternates: {
    canonical: 'https://verilex.vercel.app/faq',
  },
};

const faqItems = [
  {
    question: 'Apa itu VeriLex?',
    answer: 'VeriLex adalah ensiklopedia rujukan maksim hukum Latin independen yang menyajikan etimologi, makna filosofis-hukum, serta contoh perbandingan penerapannya dalam putusan pengadilan di Indonesia.',
  },
  {
    question: 'Apakah penjelasan dalam VeriLex merupakan Nasihat Hukum Resmi?',
    answer: 'Tidak. Konten di VeriLex ditujukan murni untuk kepentingan akademis, edukasi, dan penelitian hukum. Konten ini bukan merupakan konsultasi atau nasihat hukum formal bagi kasus konkret di pengadilan.',
  },
  {
    question: 'Bagaimana pelafalan suara Latin bekerja?',
    answer: 'VeriLex memanfaatkan Web Speech Synthesis bawaan peramban (browser) dengan fonetis fonemik Latin klasik untuk menghasilkan pengucapan audio secara otomatis saat tombol "Pelafalan" diklik.',
  },
  {
    question: 'Apakah data Favorit saya aman?',
    answer: 'Ya, seluruh daftar maksim yang Anda simpan disimpan di penyimpanan lokal (LocalStorage) perangkat Anda secara privat dan tidak diunggah ke server pihak ketiga.',
  },
];

export default function FAQPage() {
  // JSON-LD FAQPage structured data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '2rem', maxWidth: '840px' }}>
            <h1 style={{ margin: '0 0 1rem', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.5rem' }}>
              Pertanyaan Umum (FAQ) &amp; Penyangkalan
            </h1>

            {faqItems.map((item, idx) => (
              <div key={idx}>
                <h2>{item.question}</h2>
                <p>
                  {item.question.includes('Nasihat Hukum') ? (
                    <><strong>Tidak.</strong> {item.answer.replace('Tidak. ', '')}</>
                  ) : (
                    item.answer
                  )}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
