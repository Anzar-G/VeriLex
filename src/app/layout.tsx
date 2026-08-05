import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { siteName, siteUrl } from '@/lib/site';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VeriLex — Ensiklopedia Maksim Hukum Latin Indonesia",
    template: "%s | VeriLex",
  },
  description:
    "Platform referensi digital terintegrasi pertama di Indonesia untuk ensiklopedia maksim hukum Latin. Lengkap dengan penjelasan mendalam, etimologi, contoh putusan pengadilan, dan fitur pembelajaran interaktif.",
  keywords: [
    "maksim hukum latin",
    "hukum indonesia",
    "lex posterior",
    "nullum crimen",
    "pacta sunt servanda",
    "ensiklopedia hukum",
    "asas hukum",
  ],
  authors: [{ name: "VeriLex Editorial" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "VeriLex — Ensiklopedia Maksim Hukum Latin Indonesia",
    description:
      "Referensi komprehensif maksim hukum Latin untuk mahasiswa dan praktisi hukum Indonesia.",
    type: "website",
    locale: "id_ID",
    siteName: "VeriLex",
    images: [{ url: '/verilex-logo.png', width: 1200, height: 1200, alt: 'Logo VeriLex' }],
  },
  twitter: { card: 'summary_large_image', images: ['/verilex-logo.png'] },
  icons: {
    icon: "/verilex-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', name: siteName, url: siteUrl, logo: `${siteUrl}/verilex-logo.png` },
      { '@type': 'WebSite', name: siteName, url: siteUrl, potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/cari?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    ],
  };
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
