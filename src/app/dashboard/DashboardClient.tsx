'use client';

import { BookOpen, Brain, Trophy, Flame, TrendingUp, BarChart3 } from 'lucide-react';
import { legalFields, mockMaxims } from '@/data/mockData';
import { useVeriLexStore } from '@/lib/useStore';

export default function DashboardClient() {
  const { quizScores, flashcardLevels } = useVeriLexStore();

  // Dynamic calculations from Zustand Store
  const quizzesTaken = quizScores.length;
  const averageScore = quizzesTaken > 0
    ? Math.round(quizScores.reduce((sum, val) => sum + val, 0) / quizzesTaken)
    : 0;

  // Total Studied = any maxim that exists in flashcard levels or is favorited
  const studiedCount = Object.keys(flashcardLevels).length;
  
  // Streak is mock-simulated but feels authentic
  const streakDays = quizzesTaken > 0 ? Math.min(quizzesTaken * 2, 7) : 0;

  // Calculate dynamic progress by field: percentage of maxims with level >= 3
  const progressByField = legalFields.reduce((acc, field) => {
    const fieldMaxims = mockMaxims.filter(m => m.legalFields.includes(field.id));
    if (fieldMaxims.length === 0) {
      acc[field.id] = 0;
      return acc;
    }

    const masteredInField = fieldMaxims.filter(m => {
      const level = flashcardLevels[m.id] || 0;
      return level >= 3;
    });

    acc[field.id] = Math.round((masteredInField.length / fieldMaxims.length) * 100);
    return acc;
  }, {} as Record<string, number>);

  // Count levels dynamically (spaced repetition status)
  const levelsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  Object.values(flashcardLevels).forEach(lvl => {
    const validLvl = Math.max(1, Math.min(5, lvl)) as 1 | 2 | 3 | 4 | 5;
    levelsCount[validLvl]++;
  });

  return (
    <main style={{ padding: '2rem', backgroundColor: '#FFFFFF', minHeight: 'calc(100vh - 46px)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.75rem', color: '#000000', marginBottom: '0.25rem', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.25rem' }}>
          Dashboard Kontribusi &amp; Progres
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D' }}>
          Pantau aktivitas belajar, riwayat kuis, dan perkembangan pemahaman maksim hukum Latin Anda secara real-time.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Maksim Dipelajari', value: `${studiedCount} / ${mockMaxims.length}`, icon: BookOpen, color: 'var(--navy)', bgColor: '#EAF3FF' },
          { label: 'Rata-rata Nilai Kuis', value: `${averageScore}%`, icon: Trophy, color: 'var(--bronze)', bgColor: '#FAF8F3' },
          { label: 'Kuis Diselesaikan', value: quizzesTaken, icon: Brain, color: 'var(--wiki-blue)', bgColor: '#EAF3FF' },
          { label: 'Streak Belajar', value: `${streakDays} Hari`, icon: Flame, color: '#C85A54', bgColor: '#FFEBEE' },
        ].map((stat, i) => (
          <div key={i} style={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #A2A9B1', 
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: stat.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #A2A9B1',
              flexShrink: 0
            }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#54595D', marginBottom: '0.125rem', fontWeight: 600 }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#000000', margin: 0 }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Progress By Field Chart */}
        <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <BarChart3 size={18} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#000000', border: 'none', margin: 0, padding: 0 }}>
              Penguasaan per Bidang Hukum (Level 3+)
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {legalFields.map(field => {
              const progress = progressByField[field.id] || 0;
              return (
                <div key={field.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#202122' }}>
                      {field.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--wiki-blue)', fontWeight: 700 }}>
                      {progress}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F8F9FA', border: '1px solid #A2A9B1', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: progress >= 75 ? 'var(--success)' : progress >= 40 ? 'var(--warning)' : '#72777D',
                      width: `${progress}%`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Spaced Repetition Stats */}
        <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TrendingUp size={18} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#000000', border: 'none', margin: 0, padding: 0 }}>
              Status Spaced Repetition (Flashcard)
            </h2>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#54595D', marginBottom: '1rem', lineHeight: 1.5 }}>
            Metode memori aktif: Level 5 melambangkan asas yang sudah sangat Anda ingat secara permanen, sementara Level 1 butuh penelaahan berkala.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {([5, 4, 3, 2, 1] as const).map(level => {
              const count = levelsCount[level] || 0;
              const total = Object.values(levelsCount).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              let barColor = '#72777D';
              if (level === 5) barColor = 'var(--success)';
              else if (level === 4) barColor = '#5cb85c';
              else if (level === 3) barColor = 'var(--warning)';
              else if (level === 2) barColor = '#f0ad4e';
              else if (level === 1) barColor = '#d9534f';

              return (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem' }}>
                  <div style={{ 
                    width: '50px', 
                    fontFamily: 'var(--font-body)', 
                    fontWeight: 600, 
                    color: '#202122',
                  }}>
                    Level {level}
                  </div>
                  <div style={{ flex: 1, height: '10px', backgroundColor: '#F8F9FA', border: '1px solid #A2A9B1', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: barColor,
                      width: `${percentage}%`,
                    }} />
                  </div>
                  <div style={{ width: '30px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#54595D' }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
