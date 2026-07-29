'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, ThumbsUp, ThumbsDown, BookMarked, Settings2, Play, Info } from 'lucide-react';
import { mockMaxims } from '@/data/mockData';
import type { Maxim } from '@/types';
import { useVeriLexStore } from '@/lib/useStore';

export default function FlashcardClient() {
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<Maxim[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, learning: 0 });
  const { flashcardLevels, setFlashcardLevel } = useVeriLexStore();
  
  // Settings
  const [mode, setMode] = useState<'latin-to-id' | 'id-to-latin'>('latin-to-id');

  const startSession = () => {
    // Randomize 20 cards
    setCards([...mockMaxims].sort(() => 0.5 - Math.random()).slice(0, 20));
    setStarted(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ known: 0, learning: 0 });
  };

  const handleNext = (known: boolean) => {
    const currentCard = cards[currentIndex];
    const currentLevel = flashcardLevels[currentCard.id] || 1;
    
    if (known) {
      setSessionStats(prev => ({ ...prev, known: prev.known + 1 }));
      setFlashcardLevel(currentCard.id, Math.min(currentLevel + 1, 5));
    } else {
      setSessionStats(prev => ({ ...prev, learning: prev.learning + 1 }));
      setFlashcardLevel(currentCard.id, Math.max(currentLevel - 1, 1));
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      // Wait for flip transition to reset content
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    } else {
      setCurrentIndex(cards.length); // Trigger finish screen
    }
  };

  const currentCard = cards[currentIndex];
  const isFinished = currentIndex >= cards.length && started;

  if (!started) {
    return (
      <main style={{ minHeight: 'calc(100vh - 60px)', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: '#FFFFFF', padding: '2.5rem 2rem', borderRadius: '4px', border: '1px solid #A2A9B1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--navy)' }} />
          
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(15, 27, 60, 0.05)', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <BookMarked size={44} color="var(--navy)" />
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.875rem', color: 'var(--navy)', marginBottom: '0.75rem', border: 'none', padding: 0 }}>
            Flashcard Asas Hukum
          </h1>
          
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--steel-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Hafalkan maksim hukum Latin dengan sistem kartu memori. Tinjau frase secara aktif untuk memindahkan informasi dari memori jangka pendek ke jangka panjang.
          </p>

          <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #EAECF0', padding: '1.25rem', borderRadius: '2px', marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem', border: 'none', padding: 0 }}>
              <Settings2 size={16} /> Pengaturan Sesi
            </h3>
            
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#54595D', marginBottom: '0.5rem' }}>Arah Pembelajaran:</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#202122' }}>
                  <input type="radio" checked={mode === 'latin-to-id'} onChange={() => setMode('latin-to-id')} style={{ accentColor: 'var(--navy)' }} aria-label="Mode Latin ke Indonesia" />
                  <span>Bahasa Latin ke Indonesia</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#202122' }}>
                  <input type="radio" checked={mode === 'id-to-latin'} onChange={() => setMode('id-to-latin')} style={{ accentColor: 'var(--navy)' }} aria-label="Mode Indonesia ke Latin" />
                  <span>Bahasa Indonesia ke Latin</span>
                </label>
              </div>
            </div>
          </div>

          <button onClick={startSession} className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.9375rem', width: '100%', justifyContent: 'center' }}>
            <Play size={16} fill="currentColor" style={{ marginRight: '0.25rem' }} /> Mulai Belajar (20 Kartu)
          </button>
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main style={{ minHeight: 'calc(100vh - 60px)', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: '#FFFFFF', padding: '2.5rem 2rem', borderRadius: '4px', border: '1px solid #A2A9B1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--navy)' }} />
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.625rem', color: 'var(--navy)', marginBottom: '1.5rem', border: 'none', padding: 0 }}>
            Sesi Belajar Selesai!
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.25rem', color: 'var(--success)', marginBottom: '0.25rem' }}>
                {sessionStats.known}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', fontWeight: 600 }}>Sudah Ingat</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--divider)' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.25rem', color: 'var(--error)', marginBottom: '0.25rem' }}>
                {sessionStats.learning}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', fontWeight: 600 }}>Perlu Diulang</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={startSession} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <RefreshCcw size={15} /> Sesi Baru
            </button>
            <Link href="/" className="btn-secondary" style={{ fontSize: '0.875rem' }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const frontContent = mode === 'latin-to-id' ? currentCard.latinPhrase : currentCard.indonesianMeaning;
  const backContent = mode === 'latin-to-id' ? currentCard.indonesianMeaning : currentCard.latinPhrase;

  return (
    <main style={{ minHeight: 'calc(100vh - 60px)', padding: '2rem 1rem', backgroundColor: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
      <div className="container-page" style={{ maxWidth: '640px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
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
              fontSize: '0.8125rem',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Keluar sesi belajar"
          >
            <ArrowLeft size={14} /> Keluar Sesi
          </button>
          
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
            KARTU {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* 3D Flip Card Container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0' }}>
          <div className="flashcard-perspective">
            <div 
              className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
              role="button"
              aria-label="Balik kartu"
            >
              {/* Front Face */}
              <div className="flashcard-face">
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: '#72777D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  SISI PERTANYAAN
                </span>
                
                <h2 style={{ 
                  fontFamily: mode === 'latin-to-id' ? 'var(--font-display)' : 'var(--font-body)', 
                  fontWeight: 700, 
                  fontSize: '1.5rem', 
                  color: 'var(--navy)',
                  lineHeight: 1.3,
                  margin: 0,
                  border: 'none',
                  padding: 0
                }} className="text-wrap-safe">
                  {frontContent}
                </h2>
                
                <p style={{ position: 'absolute', bottom: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#72777D', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Info size={12} /> Klik kartu untuk membalik &amp; melihat arti
                </p>
              </div>

              {/* Back Face */}
              <div className="flashcard-face flashcard-back">
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'var(--bronze)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  SISI JAWABAN
                </span>
                
                <h2 style={{ 
                  fontFamily: mode === 'id-to-latin' ? 'var(--font-display)' : 'var(--font-body)', 
                  fontWeight: 700, 
                  fontSize: '1.5rem', 
                  color: 'var(--navy)',
                  lineHeight: 1.3,
                  margin: '0 0 0.5rem',
                  border: 'none',
                  padding: 0
                }} className="text-wrap-safe">
                  {backContent}
                </h2>

                {mode === 'id-to-latin' && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--steel-muted)', margin: 0 }}>
                    {currentCard.pronunciationGuide}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Only clickable when card is flipped) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem',
          opacity: isFlipped ? 1 : 0.3,
          pointerEvents: isFlipped ? 'auto' : 'none',
          transition: 'all 200ms',
          marginBottom: '2rem'
        }}>
          <button 
            onClick={() => handleNext(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.5rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--error)',
              color: 'var(--error)',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              flex: 1,
              maxWidth: '180px',
            }}
            aria-label="Tandai sebagai belum ingat"
          >
            <ThumbsDown size={15} /> Belum Ingat
          </button>
          
          <button 
            onClick={() => handleNext(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.5rem',
              backgroundColor: 'var(--success)',
              border: '1px solid var(--success)',
              color: 'white',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              flex: 1,
              maxWidth: '180px',
            }}
            aria-label="Tandai sebagai sudah ingat"
          >
            <ThumbsUp size={15} /> Sudah Ingat
          </button>
        </div>

      </div>
    </main>
  );
}
