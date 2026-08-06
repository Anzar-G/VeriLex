import type { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();
  const { data } = await supabase.from('maxims').select('id, updated_at').eq('is_active', true);
  const staticPages = ['', '/cari', '/indeks', '/kategori', '/tentang', '/faq', '/panduan', '/penyangkalan'].map(path => ({
    url: `${siteUrl}${path || '/'}`, lastModified: new Date(), changeFrequency: path ? 'weekly' as const : 'daily' as const, priority: path ? 0.7 : 1,
  }));
  const articles = (data ?? []).map(maxim => ({
    url: `${siteUrl}/maksim/${maxim.id}`,
    lastModified: new Date(maxim.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  return [...staticPages, ...articles];
}

