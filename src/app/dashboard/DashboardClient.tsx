'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Brain, Trophy, Flame, TrendingUp, BarChart3, Target } from 'lucide-react';
import { useLegalFields } from '@/hooks/useLegalFields';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';
import PlatformStatsPanel from '@/components/dashboard/PlatformStatsPanel';
import { EditorLeaderboard } from '@/components/editor/EditorReputation';

export default function DashboardClient() {
  const { authUser } = useVeriLexStore();
  const { fields: legalFields } = useLegalFields();
  const [progress, setProgress] = useState<{ quizzesTaken:number; averageScore:number; flashcards:{ maxim_id:string; level:number; last_reviewed_at:string | null }[]; levels:Record<number,number>; progressByField:Record<string, number> } | null>(null);
  const [totalMaxims, setTotalMaxims] = useState(0);
  useEffect(() => { if (authUser) void apiFetch('/api/me/progress').then(r => r.ok ? r.json() : null).then(setProgress); void fetch('/api/maxims?limit=1').then(r => r.json()).then(r => setTotalMaxims(r.total ?? 0)); }, [authUser]);

  const quizzesTaken = progress?.quizzesTaken ?? 0;
  const averageScore = progress?.averageScore ?? 0;
  const studiedCount = progress?.flashcards.length ?? 0;

  const studyDates = [...new Set((progress?.flashcards ?? []).map(row => row.last_reviewed_at?.slice(0, 10)).filter(Boolean))].sort().reverse();
  const streakDays = studyDates.length ? studyDates.reduce((streak, date, index) => index === 0 || new Date(studyDates[index - 1]!).getTime() - new Date(date!).getTime() <= 86400000 ? streak + 1 : streak, 0) : 0;

  const progressByField = legalFields.reduce((acc, field) => {
    acc[field.id] = progress?.progressByField[field.id] ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const levelsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  Object.entries(progress?.levels ?? {}).forEach(([level, count]) => {
    const lvl = Number(level);
    const validLvl = Math.max(1, Math.min(5, lvl)) as 1 | 2 | 3 | 4 | 5;
    levelsCount[validLvl] += count;
  });

  const studyPercent = totalMaxims > 0 ? Math.round((studiedCount / totalMaxims) * 100) : 0;

  return (
    <main style={{ padding: '2rem', backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 46px)' }}>

      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: '#EFF6FF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BarChart3 size={22} color="#2563EB" />
          </div>
          <div>
            <h1 style={{ margin: 0 }}>Dashboard Progres</h1>
            <p style={{ margin: 0 }}>Pantau perkembangan belajar dan kontribusi Anda secara real-time.</p>
          </div>
        </div>
      </div>

      {/* ── Stats Cards Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Maksim Dipelajari', value: `${studiedCount}`, sub: `dari ${totalMaxims} total`, icon: BookOpen, color: '#2563EB', bgColor: '#EFF6FF', pct: studyPercent },
          { label: 'Rata-rata Kuis', value: `${averageScore}%`, sub: `${quizzesTaken} sesi diselesaikan`, icon: Trophy, color: '#D97706', bgColor: '#FFFBEB', pct: averageScore },
          { label: 'Kuis Selesai', value: String(quizzesTaken), sub: 'sesi belajar', icon: Brain, color: '#7C3AED', bgColor: '#FAF5FF', pct: null },
          { label: 'Streak Belajar', value: `${streakDays}`, sub: 'hari berturut-turut', icon: Flame, color: '#DC2626', bgColor: '#FEF2F2', pct: null },
        ].map((stat, i) => (
          <div key={i} className="wiki-card" style={{ padding: '1.375rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: stat.bgColor, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              {stat.pct !== null && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color, backgroundColor: stat.bgColor, padding: '0.2rem 0.5rem', borderRadius: '999px' }}>
                  {stat.pct}%
                </span>
              )}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', margin: '0 0 0.125rem', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#64748B', margin: 0, fontWeight: 500 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '0.125rem 0 0' }}>
                {stat.sub}
              </p>
            </div>
            {stat.pct !== null && (
              <div style={{ height: '4px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: stat.color, width: `${stat.pct}%`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Detail Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>

        {/* Progress By Field */}
        <div className="wiki-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Target size={18} color="#2563EB" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0F172A', border: 'none', margin: 0, padding: 0 }}>
              Penguasaan per Bidang Hukum
            </h2>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '1rem', margin: '0 0 1rem' }}>
            Persentase maksim yang mencapai Level 3+ (hafal dengan baik)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {legalFields.slice(0, 8).map(field => {
              const pct = progressByField[field.id] || 0;
              const barColor = pct >= 75 ? '#16A34A' : pct >= 40 ? '#D97706' : '#94A3B8';
              return (
                <div key={field.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#334155' }}>{field.label.replace('Hukum ', '')}</span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: barColor, fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: barColor, width: `${pct}%`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spaced Repetition Levels */}
        <div className="wiki-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <TrendingUp size={18} color="#7C3AED" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0F172A', border: 'none', margin: 0, padding: 0 }}>
              Status Spaced Repetition
            </h2>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Level 5 = hafal permanen · Level 1 = perlu review
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {([5, 4, 3, 2, 1] as const).map(level => {
              const count = levelsCount[level] || 0;
              const total = Object.values(levelsCount).reduce((a, b) => a + b, 0);
              const pct = total > 0 ? (count / total) * 100 : 0;
              const colors: Record<number, { bar: string; bg: string; text: string; label: string }> = {
                5: { bar: '#16A34A', bg: '#F0FDF4', text: '#15803D', label: 'Hafal Permanen' },
                4: { bar: '#22C55E', bg: '#F0FDF4', text: '#15803D', label: 'Sangat Baik' },
                3: { bar: '#F59E0B', bg: '#FFFBEB', text: '#B45309', label: 'Sedang Diperkuat' },
                2: { bar: '#F97316', bg: '#FFF7ED', text: '#C2410C', label: 'Perlu Latihan' },
                1: { bar: '#EF4444', bg: '#FEF2F2', text: '#DC2626', label: 'Baru Dipelajari' },
              };
              const c = colors[level];
              return (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '68px', flexShrink: 0 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', backgroundColor: c.bg, color: c.text, fontSize: '0.6875rem', fontWeight: 700, borderRadius: '999px', whiteSpace: 'nowrap' }}>
                      Lv {level}
                    </span>
                  </div>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: c.bar, width: `${pct}%`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ width: '30px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Platform Stats ── */}
      <div className="wiki-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <BarChart3 size={18} color="#0F172A" />
          <h2 className="wiki-card-header" style={{ margin: 0 }}>Statistik Platform VeriLex</h2>
        </div>
        <PlatformStatsPanel />
      </div>

      {/* ── Editor Leaderboard ── */}
      <div className="wiki-card" style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <TrendingUp size={18} color="#0F172A" />
          <h2 className="wiki-card-header" style={{ margin: 0 }}>Reputasi Editor</h2>
        </div>
        <EditorLeaderboard />
      </div>

    </main>
  );
}
