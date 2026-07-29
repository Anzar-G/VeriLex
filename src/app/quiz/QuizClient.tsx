'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, HelpCircle, GraduationCap } from 'lucide-react';
import { mockQuizQuestions } from '@/data/mockData';
import type { QuizQuestion } from '@/types';
import { useVeriLexStore } from '@/lib/useStore';

export default function QuizClient() {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { addQuizScore } = useVeriLexStore();

  const startQuiz = () => {
    setQuestions([...mockQuizQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
    setStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === questions[currentQuestionIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = score + (selectedOption === questions[currentQuestionIndex].correctIndex ? 1 : 0);
      const percentage = Math.round((finalScore / questions.length) * 100);
      addQuizScore(percentage);
      setShowResults(true);
    }
  };

  if (!started) {
    return (
      <main style={{ minHeight: 'calc(100vh - 60px)', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' }}>
        <div 
          style={{ 
            maxWidth: '600px', 
            width: '100%', 
            backgroundColor: '#FFFFFF', 
            padding: '2.5rem 2rem', 
            borderRadius: '4px', 
            border: '1px solid #A2A9B1', 
            textAlign: 'center', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle top decoration bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--navy)' }} />

          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(15, 27, 60, 0.05)', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <GraduationCap size={44} color="var(--navy)" />
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.875rem', color: 'var(--navy)', marginBottom: '0.75rem', border: 'none', padding: 0 }}>
            Uji Kompetensi Maksim Hukum
          </h1>
          
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--steel-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Uji pemahaman akademis Anda mengenai asas-asas hukum Latin paling krusial yang berlaku di Indonesia. 
            Setiap sesi berisi <strong>5 pertanyaan acak</strong> dengan pembahasan mendalam.
          </p>

          {/* Interactive Info Box */}
          <div style={{ backgroundColor: '#FAF8F3', border: '1px solid #D4A574', padding: '1rem', borderRadius: '2px', textAlign: 'left', marginBottom: '2rem', fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: '0.25rem' }}>Aturan Kuis:</strong>
            - Pilihan ganda dengan 4 opsi jawaban.<br />
            - Pembahasan artikel lengkap muncul langsung setelah Anda menjawab setiap soal.<br />
            - Tidak ada batasan waktu, bacalah soal dengan teliti.
          </div>

          <button onClick={startQuiz} className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.9375rem', width: '100%', justifyContent: 'center' }}>
            Mulai Kuis Sekarang
          </button>
        </div>
      </main>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    if (percentage === 100) message = 'Luar biasa! Pemahaman akademis Anda tentang maksim hukum sangat sempurna.';
    else if (percentage >= 80) message = 'Sangat baik! Anda menguasai sebagian besar asas hukum dengan tepat.';
    else if (percentage >= 60) message = 'Cukup baik, tetapi masih perlu menelaah ulang beberapa yurisprudensi.';
    else message = 'Pemahaman Anda masih perlu ditingkatkan. Kami menyarankan untuk mempelajari kembali menggunakan modul Flashcard SRA.';

    return (
      <main style={{ minHeight: 'calc(100vh - 60px)', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: '#FFFFFF', padding: '2.5rem 2rem', borderRadius: '4px', border: '1px solid #A2A9B1', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: percentage >= 60 ? 'var(--success)' : 'var(--error)' }} />
          
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            backgroundColor: percentage >= 80 ? 'rgba(107,142,113,0.1)' : percentage >= 60 ? 'rgba(212,165,116,0.1)' : 'rgba(200,90,84,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Trophy size={38} color={percentage >= 80 ? 'var(--success)' : percentage >= 60 ? 'var(--warning)' : 'var(--error)'} />
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.625rem', color: 'var(--navy)', marginBottom: '0.5rem', border: 'none', padding: 0 }}>
            Hasil Evaluasi Kuis
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--steel)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Skor Anda: {score} / {questions.length} Benar ({percentage}%)
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel-muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            {message}
          </p>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={startQuiz} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <RefreshCw size={15} /> Kuis Baru
            </button>
            <Link href="/" className="btn-secondary" style={{ fontSize: '0.875rem' }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <main style={{ minHeight: 'calc(100vh - 60px)', padding: '2rem 1rem', backgroundColor: '#F8F9FA' }}>
      <div className="container-page" style={{ maxWidth: '720px' }}>
        
        {/* Header / Progress */}
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
            aria-label="Kembali ke layar mulai kuis"
          >
            <ArrowLeft size={14} /> Keluar Kuis
          </button>
          
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
            SOAL {currentQuestionIndex + 1} DARI {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--divider)', borderRadius: '2px', marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            backgroundColor: 'var(--navy)', 
            width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
            transition: 'width 300ms ease'
          }} />
        </div>

        {/* Question Area */}
        <div style={{ backgroundColor: 'white', padding: '2rem 1.5rem', borderRadius: '2px', border: '1px solid #A2A9B1', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', marginBottom: '1.5rem' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '0.125rem 0.5rem', 
            backgroundColor: '#EAECF0', 
            color: 'var(--steel-muted)', 
            borderRadius: '2px', 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.6875rem', 
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.875rem',
            border: '1px solid #D1D5DB'
          }}>
            {currentQ.legalField.toUpperCase()}
          </span>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#000', lineHeight: 1.4, marginBottom: '1.5rem', border: 'none', padding: 0 }} className="text-wrap-safe">
            {currentQ.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              
              let bgColor = '#FFFFFF';
              let borderColor = '#A2A9B1';
              let icon = null;
              
              if (isAnswered) {
                if (isCorrect) {
                  bgColor = 'rgba(107, 142, 113, 0.08)';
                  borderColor = 'var(--success)';
                  icon = <CheckCircle2 size={18} color="var(--success)" />;
                } else if (isSelected && !isCorrect) {
                  bgColor = 'rgba(200, 90, 84, 0.08)';
                  borderColor = 'var(--error)';
                  icon = <XCircle size={18} color="var(--error)" />;
                }
              } else if (isSelected) {
                bgColor = 'rgba(15, 27, 60, 0.03)';
                borderColor = 'var(--navy)';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1rem 1.25rem',
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#202122',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 150ms'
                  }}
                  aria-label={`Opsi ${String.fromCharCode(65 + idx)}: ${option}`}
                >
                  <span style={{ paddingRight: '1rem', lineHeight: 1.4 }} className="text-wrap-safe">
                    <strong style={{ display: 'inline-block', width: '20px', color: 'var(--navy)' }}>
                      {String.fromCharCode(65 + idx)}
                    </strong>
                    {option}
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.25rem', 
              backgroundColor: '#FAF8F3', 
              borderRadius: '2px',
              borderLeft: '3px solid var(--bronze)',
              border: '1px solid #E2E8F0',
              borderLeftColor: 'var(--bronze)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--navy)', margin: '0 0 0.375rem', border: 'none', padding: 0 }}>
                Pembahasan Analisis:
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.6 }} className="text-wrap-safe">
                {currentQ.explanation}
              </p>
              <Link 
                href={`/maksim/${currentQ.maximId}`} 
                target="_blank"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.25rem', 
                  marginTop: '0.75rem', 
                  fontFamily: 'var(--font-body)', 
                  fontWeight: 600, 
                  fontSize: '0.8125rem', 
                  color: 'var(--wiki-blue)', 
                  textDecoration: 'none' 
                }}
              >
                Pelajari rujukan maksim asli <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!isAnswered ? (
            <button 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={selectedOption === null ? "btn-secondary" : "btn-primary"}
              style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer', padding: '0.5rem 1.75rem', fontSize: '0.875rem' }}
            >
              Kirim Jawaban
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              className="btn-primary"
              style={{ padding: '0.5rem 1.75rem', fontSize: '0.875rem' }}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Soal Selanjutnya' : 'Lihat Hasil Akhir'}
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
