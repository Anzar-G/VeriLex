// Vercel menetapkan www sebagai host kanonis dan mengalihkan domain apex ke sini.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.verilex.my.id').replace(/\/$/, '');
export const siteName = 'VeriLex';
