'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Crown, CheckCircle, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Stats = { total_maxims?: number; pending_proposals?: number; active_editors?: number };

export default function SeniorEditorWorkspacePage() {
  const { authUser } = useVeriLexStore();
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;
    apiFetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authUser]);

  if (!authUser || !hasMinRole(authUser.role, 'senior_editor')) {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Halaman ini hanya untuk <strong>Senior Editor</strong> dan di atasnya.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '860px' }}>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#FFFBEB', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={18} color="#92400E" />
                </div>
                <div>
                  <h1 style={{ margin: 0, border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0F1B3C' }}>
                    Workspace Senior Editor
                  </h1>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#54595D' }}>Pantau kualitas konten, eskalasi, dan performa tim editorial.</p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {loading ? (
                <p style={{ color: '#72777D', fontSize: '0.875rem', gridColumn: '1/-1' }}>Memuat statistik…</p>
              ) : [
                { label: 'Total Maksim Aktif', count: stats.total_maxims ?? '—', icon: <TrendingUp size={18} color="#1E40AF" />, bg: '#EFF6FF', color: '#1E40AF' },
                { label: 'Usulan Pending', count: stats.pending_proposals ?? '—', icon: <AlertTriangle size={18} color="#92400E" />, bg: '#FFFBEB', color: '#92400E' },
                { label: 'Editor Aktif', count: stats.active_editors ?? '—', icon: <Users size={18} color="#065F46" />, bg: '#ECFDF5', color: '#065F46' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: stat.bg, border: `1px solid ${stat.color}30`, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {stat.icon}
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: stat.color, margin: 0 }}>{stat.count}</p>
                    <p style={{ fontSize: '0.75rem', color: stat.color, margin: 0 }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 1rem', border: 'none', padding: 0 }}>
                Akses Cepat
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {[
                  { label: 'Antrian Review Editor', href: '/workspace/editor', color: '#065F46' },
                  { label: 'Panel Admin', href: '/admin', color: '#991B1B' },
                  { label: 'Dashboard Reviewer', href: '/reviewer', color: '#92400E' },
                  { label: 'Semua Maksim', href: '/cari', color: '#0645AD' },
                ].map(action => (
                  <Link key={action.href} href={action.href}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: `1px solid ${action.color}40`, color: action.color, fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'none', backgroundColor: `${action.color}08` }}>
                    {action.label} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Konten Prioritas */}
            <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '1.25rem 1.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400E' }}>
                <strong>Catatan:</strong> Sebagai Senior Editor, Anda memiliki akses ke semua fitur Editor ditambah kemampuan
                mengelola tim dan menetapkan prioritas konten. Gunakan <Link href="/admin" style={{ color: '#92400E', fontWeight: 700 }}>Admin Panel</Link> untuk manajemen pengguna yang lebih lanjut.
              </p>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
