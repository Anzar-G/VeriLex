'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { mockQuizQuestions } from '@/data/mockData';
import type { QuizQuestion } from '@/types';

export default function QuizClient() {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const startQuiz = () => {
    // In a real app, this might fetch from an API or randomize
    // For now, take first 5 questions
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
      setShowResults(true);
    }
  };

  if (!started) {
    return (
      <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', border: '1px solid var(--divider)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Trophy size={48} style={{ color: 'var(--bronze)', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Quiz Maksim Hukum
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--steel)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Uji pemahaman Anda tentang maksim hukum Latin. Quiz ini terdiri dari 5 pertanyaan acak untuk mengukur tingkat pengetahuan Anda.
          </p>
          <button onClick={startQuiz} className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Mulai Quiz Sekarang
          </button>
        </div>
      </main>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    if (percentage === 100) message = 'Luar biasa! Penguasaan Anda sempurna.';
    else if (percentage >= 80) message = 'Sangat baik! Anda memahami sebagian besar maksim.';
    else if (percentage >= 60) message = 'Cukup baik, tetapi masih perlu sedikit latihan.';
    else message = 'Jangan menyerah, mari belajar lebih giat lagi melalui fitur Flashcard.';

    return (
      <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', border: '1px solid var(--divider)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: percentage >= 80 ? 'rgba(34,197,94,0.1)' : percentage >= 60 ? 'rgba(166,124,82,0.1)' : 'rgba(239,68,68,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700, 
              fontSize: '2.5rem', 
              color: percentage >= 80 ? '#15803d' : percentage >= 60 ? 'var(--bronze)' : '#b91c1c'
            }}>
              {percentage}%
            </span>
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
            Hasil Quiz Anda
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--steel)', marginBottom: '1rem' }}>
            Anda menjawab {score} dari {questions.length} pertanyaan dengan benar.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--text-meta)', marginBottom: '2.5rem' }}>
            {message}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={startQuiz} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={18} /> Coba Lagi
            </button>
            <Link href="/dashboard" className="btn-secondary">
              Lihat Dashboard Progres
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <main style={{ minHeight: 'calc(100vh - 64px - 300px)', padding: '2rem 1rem', backgroundColor: 'var(--cream)' }}>
      <div className="container-page" style={{ maxWidth: '720px' }}>
        
        {/* Header / Progress */}
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
            <ArrowLeft size={16} /> Keluar Quiz
          </button>
          
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)' }}>
            Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--divider)', borderRadius: '3px', marginBottom: '2.5rem', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            backgroundColor: 'var(--bronze)', 
            width: `${((currentQuestionIndex) / questions.length) * 100}%`,
            transition: 'width 300ms ease'
          }} />
        </div>

        {/* Question Area */}
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '0.5rem', border: '1px solid var(--divider)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '1.5rem' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '0.25rem 0.75rem', 
            backgroundColor: 'rgba(15,27,60,0.05)', 
            color: 'var(--navy)', 
            borderRadius: '999px', 
            fontFamily: 'var(--font-body)', 
            fontSize: '0.75rem', 
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            {currentQ.legalField}
          </span>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--navy)', lineHeight: 1.4, marginBottom: '2rem' }}>
            {currentQ.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              
              let bgColor = 'white';
              let borderColor = 'var(--divider)';
              let icon = null;
              
              if (isAnswered) {
                if (isCorrect) {
                  bgColor = 'rgba(34,197,94,0.05)';
                  borderColor = '#22c55e';
                  icon = <CheckCircle2 size={18} color="#22c55e" />;
                } else if (isSelected && !isCorrect) {
                  bgColor = 'rgba(239,68,68,0.05)';
                  borderColor = '#ef4444';
                  icon = <XCircle size={18} color="#ef4444" />;
                }
              } else if (isSelected) {
                bgColor = 'rgba(166,124,82,0.05)';
                borderColor = 'var(--bronze)';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1.25rem',
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--navy)',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 200ms'
                  }}
                >
                  <span>
                    <span style={{ display: 'inline-block', width: '24px', fontWeight: 600, color: isAnswered ? 'inherit' : 'var(--steel)' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
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
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: 'rgba(15,27,60,0.03)', 
              borderRadius: '0.5rem',
              borderLeft: '4px solid var(--bronze)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                Penjelasan
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--steel)', lineHeight: 1.6 }}>
                {currentQ.explanation}
              </p>
              <Link 
                href={`/maksim/${currentQ.maximId}`} 
                target="_blank"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.375rem', 
                  marginTop: '1rem', 
                  fontFamily: 'var(--font-body)', 
                  fontWeight: 600, 
                  fontSize: '0.875rem', 
                  color: 'var(--bronze)', 
                  textDecoration: 'none' 
                }}
              >
                Pelajari maksim ini lebih lanjut <ArrowRight size={14} />
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
              style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer', padding: '0.75rem 2rem' }}
            >
              Jawab
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil'}
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
