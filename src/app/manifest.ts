import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VeriLex — Ensiklopedia Maksim Hukum Latin',
    short_name: 'VeriLex',
    description: 'Ensiklopedia maksim hukum Latin Indonesia.',
    start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0F1B3C',
    icons: [{ src: '/verilex-logo.png', sizes: '2000x2000', type: 'image/png' }],
  };
}

