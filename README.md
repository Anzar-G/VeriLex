# VeriLex

<div align="center">

![VeriLex Logo](public/verilex-logo.png)

**Platform Referensi Maksim Hukum Latin Indonesia**

[![Live Demo](https://img.shields.io/badge/Live-VeriLex-blue?style=for-the-badge&logo=vercel)](https://verilex.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## Tentang VeriLex

VeriLex adalah platform referensi digital terintegrasi pertama di Indonesia untuk ensiklopedia maksim hukum Latin. Platform ini dirancang untuk memberikan akses yang akurat dan otoritatif kepada prinsip-prinsip hukum Latin fundamental, memfasilitasi penelitian hukum, pemahaman, dan aplikasi maksim-maksim dasar di berbagai bidang hukum.

VeriLex ditujukan untuk mahasiswa hukum, praktisi hukum, dan akademisi yang membutuhkan referensi komprehensif tentang maksim hukum Latin yang sering digunakan dalam sistem hukum Indonesia.

## Fitur Utama

### Database Maksim Hukum
- **Koleksi Kurasi**: Kumpulan maksim hukum Latin yang dikurasi dan dikategorikan berdasarkan bidang hukum (Hukum Pidana, Hukum Perdata, Hukum Tata Negara, Hukum Internasional, dan Hukum Administrasi)
- **Analisis Mendalam**: Penjelasan detail untuk setiap maksim, termasuk terjemahan literal, makna hukum, konteks historis, dan yurisprudensi
- **Integrasi Putusan Pengadilan**: Contoh nyata bagaimana maksim tertentu diterapkan dalam putusan pengadilan

### Modul Pembelajaran Interaktif
- **Flashcard**: Kartu flash dengan algoritma Spaced Repetition untuk menghafal maksim secara efektif
- **Kuis Interaktif**: Kuis untuk menguji pemahaman dan retensi materi
- **Text-to-Speech**: Fitur aksesibilitas untuk pengucapan Latin

### Pencarian & Indeks
- **Pencarian Canggih**: Pencarian berbasis kata kunci dengan filtering spesifik bidang hukum
- **Indeks Alfabet**: Indeks alfabetis untuk retrieval informasi yang efisien
- **Filter Kategori**: Filter berdasarkan kategori hukum untuk mempersempit hasil pencarian

### Fitur Pengguna
- **Sistem Autentikasi**: Pendaftaran dan login pengguna
- **Favorit**: Simpan maksim ke daftar favorit untuk akses cepat
- **Dashboard Personal**: Dashboard untuk melihat progres belajar dan aktivitas
- **Mode Reviewer**: Mode kontribusi untuk reviewer yang memverifikasi konten

## Teknologi yang Digunakan

### Frontend
- **Framework**: Next.js 16.2 (App Router)
- **Bahasa**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0
- **State Management**: Zustand 5.0
- **Data Fetching**: TanStack React Query 5.101
- **Animation**: Framer Motion 12.42
- **Icons**: Lucide React 1.27
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)

### Backend & Database
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Type Checking**: TypeScript Compiler

## Instalasi & Pengaturan Lokal

### Prasyarat
- Node.js 20.x atau lebih tinggi
- npm atau yarn
- Akun Supabase (untuk environment variables)

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/Anzar-G/VeriLex.git
   cd VeriLex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env.local` di root directory dan tambahkan:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Akses aplikasi**
   
   Buka browser dan kunjungi `http://localhost:3000`

## 📁 Struktur Project

```
VeriLex/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Halaman admin
│   │   ├── api/          # API routes
│   │   ├── cari/         # Halaman pencarian
│   │   ├── dashboard/    # Dashboard pengguna
│   │   ├── flashcard/    # Halaman flashcard
│   │   ├── maksim/       # Halaman detail maksim
│   │   ├── quiz/         # Halaman kuis
│   │   └── ...
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # UI components
│   │   └── ...
│   ├── data/             # Static data
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions & configurations
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── supabase/             # Supabase migrations & functions
├── design-system/        # Design tokens & guidelines
└── package.json
```

## Deployment

Aplikasi ini di-deploy ke Vercel. Untuk deployment:

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "commit message"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Import repository dari GitHub ke Vercel
   - Setup environment variables di Vercel dashboard
   - Deploy otomatis akan terjadi

**Live Demo**: [https://verilex.vercel.app](https://verilex.vercel.app)

## Kontribusi

Kontribusi sangat diapresiasi! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buka Pull Request

## Lisensi

Proyek ini bersifat proprietary dan ditujukan untuk penggunaan internal dan referensi.

## Tim VeriLex

- **Development**: VeriLex Development Team
- **Editorial**: VeriLex Editorial Team
- **Review**: Legal Reviewers

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi tim VeriLex melalui:
- Email: support@verilex.id
- Website: [https://verilex.vercel.app](https://verilex.vercel.app)

---

<div align="center">

**Dibuat untuk komunitas hukum Indonesia**

© 2025 VeriLex. All rights reserved.

</div>
