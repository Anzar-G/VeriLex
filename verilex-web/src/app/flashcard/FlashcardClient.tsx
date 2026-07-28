'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, ThumbsUp, ThumbsDown, BookMarked, Settings2, Play } from 'lucide-react';
import { mockMaxims } from '@/data/mockData';
import type { Maxim } from '@/types';

export default function FlashcardClient() {
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<Maxim[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, learning: 0 });
  
  // Settings
  const [mode, setMode] = useState<'latin-to-id' | 'id-to-latin'>('latin-to-id');

  const startSession = () => {
    setCards([...mockMaxims].sort(() => 0.5 - Math.random()));
    setStarted(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ known: 0, learning: 0 });
  };

  const handleNext = (known: boolean) => {
    if (known) {
      setSessionStats(prev => ({ ...prev, known: prev.known + 1 }));
    } else {
      setSessionStats(prev => ({ ...prev, learning: prev.learning + 1 }));
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      // Small timeout to allow flip animation to reset before changing content
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      // End of session
      setCurrentIndex(cards.length); // Trigger end screen
    }
  };

  const currentCard = cards[currentIndex];
  const isFinished = currentIndex >= cards.length && started;

  if (!started) {
    return (
      <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', border: '1px solid var(--divider)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <BookMarked size={48} style={{ color: 'var(--bronze)', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Flashcard Pembelajaran
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--steel)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Hafalkan maksim hukum Latin dengan sistem Spaced Repetition. Sistem akan memprioritaskan maksim yang masih sulit Anda ingat.
          </p>

          <div style={{ backgroundColor: 'rgba(15,27,60,0.03)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings2 size={18} /> Pengaturan Sesi
              </h3>
            </div>
            
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--steel)', marginBottom: '0.75rem' }}>Mode Tebak:</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" checked={mode === 'latin-to-id'} onChange={() => setMode('latin-to-id')} style={{ accentColor: 'var(--bronze)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--navy)' }}>Latin ➔ Indonesia</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" checked={mode === 'id-to-latin'} onChange={() => setMode('id-to-latin')} style={{ accentColor: 'var(--bronze)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--navy)' }}>Indonesia ➔ Latin</span>
                </label>
              </div>
            </div>
          </div>

          <button onClick={startSession} className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={18} fill="currentColor" /> Mulai Sesi (20 Maksim)
          </button>
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', border: '1px solid var(--divider)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>
            Sesi Selesai!
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', color: '#15803d', marginBottom: '0.25rem' }}>
                {sessionStats.known}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel)' }}>Sudah Ingat</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--divider)' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', color: '#b91c1c', marginBottom: '0.25rem' }}>
                {sessionStats.learning}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel)' }}>Perlu Diulang</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={startSession} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCcw size={18} /> Sesi Baru
            </button>
            <Link href="/dashboard" className="btn-secondary">
              Lihat Progres
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const frontContent = mode === 'latin-to-id' ? currentCard.latinPhrase : currentCard.indonesianMeaning;
  const backContent = mode === 'latin-to-id' ? currentCard.indonesianMeaning : currentCard.latinPhrase;

  return (
    <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '2rem 1rem', backgroundColor: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div className="container-page" style={{ maxWidth: '800px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => setStarted(false)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-meta)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Keluar
          </button>
          
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)' }}>
            Kartu {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* Card Container (Perspective) */}
        <div 
          style={{ 
            flex: 1, 
            perspective: '1000px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}
        >
          <div 
            onClick={() => !isFlipped && setIsFlipped(true)}
            style={{
              width: '100%',
              maxWidth: '600px',
              aspectRatio: '3/2',
              position: 'relative',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
              cursor: isFlipped ? 'default' : 'pointer',
            }}
          >
            {/* Front */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'white',
              border: '2px solid var(--divider)',
              borderRadius: '1rem',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            }}>
              <span style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-meta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Depan
              </span>
              <p style={{ 
                fontFamily: mode === 'latin-to-id' ? 'var(--font-display)' : 'var(--font-body)', 
                fontWeight: 700, 
                fontSize: mode === 'latin-to-id' ? '2.25rem' : '1.75rem', 
                color: 'var(--navy)',
                lineHeight: 1.3
              }}>
                {frontContent}
              </p>
              <p style={{ position: 'absolute', bottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-meta)' }}>
                Klik untuk membalik kartu
              </p>
            </div>

            {/* Back */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'var(--cream)',
              border: '2px solid var(--bronze)',
              borderRadius: '1rem',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(166,124,82,0.15)',
              transform: 'rotateX(180deg)',
            }}>
              <span style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--bronze)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Belakang
              </span>
              
              <p style={{ 
                fontFamily: mode === 'id-to-latin' ? 'var(--font-display)' : 'var(--font-body)', 
                fontWeight: 700, 
                fontSize: mode === 'id-to-latin' ? '2.25rem' : '1.75rem', 
                color: 'var(--navy)',
                lineHeight: 1.3,
                marginBottom: '1rem'
              }}>
                {backContent}
              </p>

              {mode === 'id-to-latin' && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--steel)' }}>
                  {currentCard.pronunciationGuide}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons (Only show when flipped) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem',
          opacity: isFlipped ? 1 : 0,
          pointerEvents: isFlipped ? 'auto' : 'none',
          transition: 'opacity 300ms',
          height: '60px' // Reserve space to prevent layout jump
        }}>
          <button 
            onClick={() => handleNext(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              backgroundColor: 'white',
              border: '2px solid #ef4444',
              color: '#ef4444',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 200ms'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <ThumbsDown size={18} /> Belum Ingat
          </button>
          
          <button 
            onClick={() => handleNext(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#22c55e',
              border: '2px solid #22c55e',
              color: 'white',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 200ms'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#22c55e')}
          >
            <ThumbsUp size={18} /> Sudah Ingat
          </button>
        </div>

      </div>
    </main>
  );
}
