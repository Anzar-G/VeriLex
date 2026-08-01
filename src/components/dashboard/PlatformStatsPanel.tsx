'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Eye, Users, MessageSquare, Edit3, BarChart3 } from 'lucide-react';

interface PlatformStats {
  totalArticles: number;
  totalViews: number;
  totalUsers: number;
  totalDiscussions: number;
  totalEdits: number;
  byField: Record<string, number>;
  generatedAt: string;
}

const FIELD_LABELS: Record<string, string> = {
  umum: 'Asas Umum',
  pidana: 'Pidana',
  perdata: 'Perdata',
  properti: 'Hak Milik',
  keluarga: 'Waris & Keluarga',
  bisnis: 'Dagang & Korporasi',
  internasional: 'Internasional',
  'tata-negara': 'Tata Negara',
  acara: 'Acara Perdata',
  'lain-lain': 'Lain-lain',
  administrasi: 'Administrasi',
};

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display.toLocaleString('id-ID')}</>;
}

interface PlatformStatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  bgColor: string;
}

function StatCard({ label, value, icon: Icon, color, bgColor }: PlatformStatCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #A2A9B1',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          backgroundColor: bgColor,
          border: '1px solid #EAECF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={color} />
      </div>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: '#54595D',
            margin: 0,
            fontWeight: 600,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.375rem',
            color: '#000000',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          <AnimatedNumber value={value} />
        </p>
      </div>
    </div>
  );
}

export default function PlatformStatsPanel() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setStats(data);
      })
      .catch(() => setError('Gagal memuat statistik platform.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: '#72777D',
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
        }}
      >
        Memuat statistik platform...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#F8F9FA',
          border: '1px solid #EAECF0',
          fontSize: '0.875rem',
          color: '#72777D',
          fontStyle: 'italic',
          fontFamily: 'var(--font-body)',
        }}
      >
        Data statistik tidak tersedia saat ini.
      </div>
    );
  }

  const statCards = [
    { label: 'Total Artikel', value: stats.totalArticles, icon: BookOpen, color: 'var(--navy)', bgColor: '#EAF3FF' },
    { label: 'Total Tayangan', value: stats.totalViews, icon: Eye, color: '#065F46', bgColor: '#ECFDF5' },
    { label: 'Pengguna Terdaftar', value: stats.totalUsers, icon: Users, color: '#92400E', bgColor: '#FFFBEB' },
    { label: 'Total Diskusi', value: stats.totalDiscussions, icon: MessageSquare, color: '#1E40AF', bgColor: '#EFF6FF' },
    { label: 'Total Suntingan', value: stats.totalEdits, icon: Edit3, color: '#6B21A8', bgColor: '#FDF4FF' },
  ];

  // Top fields by article count
  const fieldEntries = Object.entries(stats.byField)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);
  const maxFieldCount = Math.max(...fieldEntries.map(([, v]) => v), 1);

  return (
    <div>
      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.875rem',
          marginBottom: '2rem',
        }}
      >
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* By Field chart */}
      {fieldEntries.length > 0 && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #A2A9B1',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <BarChart3 size={16} color="var(--navy)" />
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#202122',
                margin: 0,
              }}
            >
              Distribusi Artikel per Bidang Hukum
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {fieldEntries.map(([field, count]) => (
              <div key={field}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      color: '#202122',
                    }}
                  >
                    {FIELD_LABELS[field] || field}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--wiki-blue)',
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #EAECF0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(count / maxFieldCount) * 100}%`,
                      backgroundColor: 'var(--navy)',
                      transition: 'width 600ms ease-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.6875rem',
              color: '#72777D',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
            }}
          >
            Diperbarui: {new Date(stats.generatedAt).toLocaleString('id-ID')}
          </p>
        </div>
      )}
    </div>
  );
}
