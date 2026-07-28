'use client';

import { BookOpen, Brain, Trophy, Flame, TrendingUp, BarChart3 } from 'lucide-react';
import { mockUserProgress, legalFields } from '@/data/mockData';

export default function DashboardClient() {
  const { totalStudied, quizzesTaken, averageScore, streakDays, progressByField, flashcardLevels } = mockUserProgress;

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Dashboard Progres
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--steel)' }}>
          Pantau aktivitas belajar dan perkembangan pemahaman maksim hukum Anda.
        </p>
      </div>

      {/* Top Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Maksim Dipelajari', value: totalStudied, icon: BookOpen, color: 'var(--navy)', bgColor: 'rgba(15,27,60,0.05)' },
          { label: 'Rata-rata Nilai Quiz', value: `${averageScore}%`, icon: Trophy, color: 'var(--bronze)', bgColor: 'rgba(166,124,82,0.1)' },
          { label: 'Quiz Selesai', value: quizzesTaken, icon: Brain, color: '#0ea5e9', bgColor: 'rgba(14,165,233,0.1)' },
          { label: 'Streak Belajar', value: `${streakDays} Hari`, icon: Flame, color: '#ef4444', bgColor: 'rgba(239,68,68,0.1)' },
        ].map((stat, i) => (
          <div key={i} style={{ 
            backgroundColor: 'white', 
            border: '1px solid var(--divider)', 
            borderRadius: '0.5rem', 
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '0.5rem', 
              backgroundColor: stat.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-meta)', marginBottom: '0.25rem', fontWeight: 600 }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--navy)' }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* Progress By Field Chart */}
        <section style={{ backgroundColor: 'white', border: '1px solid var(--divider)', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={20} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)' }}>
              Penguasaan per Bidang
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {legalFields.map(field => {
              const progress = progressByField[field.id] || 0;
              return (
                <div key={field.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--steel)' }}>
                      {field.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 600 }}>
                      {progress}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--divider)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: progress >= 80 ? '#22c55e' : progress >= 50 ? 'var(--bronze)' : '#eab308',
                      width: `${progress}%`,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Spaced Repetition Stats */}
        <section style={{ backgroundColor: 'white', border: '1px solid var(--divider)', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={20} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)' }}>
              Status Flashcard (Spaced Repetition)
            </h2>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-meta)', marginBottom: '1.5rem' }}>
            Tingkat 5 berarti Anda sudah sangat hafal maksim tersebut dan jarang perlu diulang. Tingkat 1 perlu sering diulang.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[5, 4, 3, 2, 1].map(level => {
              const count = flashcardLevels[level as keyof typeof flashcardLevels] || 0;
              const total = Object.values(flashcardLevels).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              let color = 'var(--steel)';
              if (level === 5) color = '#15803d';
              else if (level === 4) color = '#22c55e';
              else if (level === 3) color = 'var(--bronze)';
              else if (level === 2) color = '#f97316';
              else if (level === 1) color = '#ef4444';

              return (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '60px', 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    Level {level}
                  </div>
                  <div style={{ flex: 1, height: '12px', backgroundColor: 'var(--divider)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      backgroundColor: color,
                      width: `${percentage}%`,
                    }} />
                  </div>
                  <div style={{ width: '40px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-meta)' }}>
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
