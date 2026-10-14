'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  Check, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TEST_REVIEW_QUESTIONS, QuizQuestion } from './testReviewData';

interface TestReviewQuizProps {
  onBack: () => void;
}

export default function TestReviewQuiz({ onBack }: TestReviewQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useLocalStorage<Record<number, number>>(
    'intlab_oss1_test01_review_answers', 
    {}
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stepper' | 'all'>('stepper');

  const currentQ = TEST_REVIEW_QUESTIONS[currentIndex];
  const totalQuestions = TEST_REVIEW_QUESTIONS.length;
  
  // Počítadlo správných odpovědí
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = TEST_REVIEW_QUESTIONS.filter(
    q => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete vyresetovat své odpovědi a projít kvíz znovu od začátku?')) {
      setSelectedAnswers({});
      setCurrentIndex(0);
    }
  };

  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hlavní skleněný rámec dle pravidel IntLab */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl p-6 sm:p-10">
        
        {/* Horní hlavička s tlačítkem Zpět */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all self-start cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na přehled OSS 1
          </button>

          {/* Přepínač režimu zobrazení */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('stepper')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'stepper' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Krokování (po jedné)
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'all' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Všech 11 otázek najednou
            </button>
          </div>
        </div>

        {/* Titulní blok dle pravidel typografie */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Příprava na hodnocenou práci
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-slate-900">
            Procvičování na test 1
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Vyzkoušejte si cvičné otázky z Hardwaru a Architektury OS před hodnocenou prací. 
            U každé otázky se po vaší volbě okamžitě dozvíte správné řešení a podrobné zdůvodnění.
          </p>
        </div>

        {/* Lišta skoku na otázky a skóre */}
        <div className="bg-slate-50/90 p-4 sm:p-5 rounded-3xl border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-black uppercase tracking-wider text-slate-700">Skok na otázku:</span>
              <span className="text-slate-400 font-medium">
                (Zodpovězeno {answeredCount} z {totalQuestions})
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700">
                Správně: <span className="text-emerald-600 font-black">{correctCount}</span> / {totalQuestions}
              </span>
              {answeredCount > 0 && (
                <button
                  onClick={handleReset}
                  className="text-slate-400 hover:text-rose-600 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  title="Vymazat odpovědi"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Resetovat
                </button>
              )}
            </div>
          </div>

          {/* Rychlé pilulky 1..11 */}
          <div className="flex flex-wrap gap-2">
            {TEST_REVIEW_QUESTIONS.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = isAnswered && selectedAnswers[q.id] === q.correctIndex;
              const isCurrent = viewMode === 'stepper' && idx === currentIndex;

              let pillStyle = 'bg-white text-slate-600 border-slate-200 hover:border-slate-300';
              if (isAnswered) {
                pillStyle = isCorrect 
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
                  : 'bg-rose-500 text-white border-rose-600 shadow-sm';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (viewMode === 'all') {
                      const el = document.getElementById(`question-card-${q.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-black border-2 transition-all cursor-pointer flex items-center justify-center relative ${pillStyle} ${
                    isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 scale-110' : ''
                  }`}
                  title={`${q.title} (${q.testRef})`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Závěrečný banner při kompletním dokončení */}
        {isAllAnswered && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-black">
                  Kvíz je kompletně hotový! Úspěšnost: {Math.round((correctCount / totalQuestions) * 100)} %
                </h3>
                <p className="text-sm text-emerald-100 mt-0.5">
                  Máte správně {correctCount} z {totalQuestions} otázek. Projděte si zdůvodnění u otázek, kde jste chybovali.
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-2xl bg-white text-emerald-800 font-black text-xs uppercase tracking-wider hover:bg-emerald-50 transition-all shadow-md shrink-0 cursor-pointer active:scale-95"
            >
              Zkusit znovu od začátku
            </button>
          </div>
        )}

        {/* =========================================================================
            REŽIM 1: KROKOVÁNÍ PO JEDNÉ OTÁZCE (STEPPER)
            ========================================================================= */}
        {viewMode === 'stepper' && (
          <div className="space-y-6">
            <QuestionCard 
              question={currentQ}
              selectedAnswerIndex={selectedAnswers[currentQ.id]}
              onSelectAnswer={(optIdx) => handleSelectAnswer(currentQ.id, optIdx)}
            />

            {/* Navigace Mezi Otázkami */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Předchozí otázka
              </button>

              <span className="text-xs font-mono font-bold text-slate-400">
                {currentIndex + 1} / {totalQuestions}
              </span>

              <button
                onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                disabled={currentIndex === totalQuestions - 1}
                className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                Další otázka
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            REŽIM 2: ZOBRAZENÍ VŠECH 11 OTÁZEK NAJEDNOU
            ========================================================================= */}
        {viewMode === 'all' && (
          <div className="space-y-8">
            {TEST_REVIEW_QUESTIONS.map((q) => (
              <div key={q.id} id={`question-card-${q.id}`}>
                <QuestionCard 
                  question={q}
                  selectedAnswerIndex={selectedAnswers[q.id]}
                  onSelectAnswer={(optIdx) => handleSelectAnswer(q.id, optIdx)}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PODKOMPONENTA: KARTA JEDNÉ OTÁZKY S INTERAKTIVNÍMI VOLBAMI A ZDŮVODNĚNÍM
// -------------------------------------------------------------
interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswerIndex?: number;
  onSelectAnswer: (index: number) => void;
}

function QuestionCard({ question, selectedAnswerIndex, onSelectAnswer }: QuestionCardProps) {
  const isAnswered = selectedAnswerIndex !== undefined;
  const isCorrect = isAnswered && selectedAnswerIndex === question.correctIndex;

  return (
    <div className={`p-6 sm:p-8 rounded-[2rem] border-2 transition-all space-y-6 ${
      isAnswered 
        ? isCorrect 
          ? 'bg-emerald-50/20 border-emerald-300' 
          : 'bg-rose-50/20 border-rose-300'
        : 'bg-white border-slate-200/90 shadow-sm'
    }`}>
      
      {/* Záhlaví otázky s referencí na test */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
            #{question.id}
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
              {question.part} • {question.testRef}
            </span>
            <h3 className="text-base font-black text-slate-800">
              {question.title}
            </h3>
          </div>
        </div>

        {isAnswered && (
          <div className="self-start sm:self-auto">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Správná odpověď
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
                <XCircle className="w-4 h-4 text-rose-600" /> Chybná odpověď
              </span>
            )}
          </div>
        )}
      </div>

      {/* Znění otázky */}
      <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
        {question.question}
      </h2>

      {/* Možnosti A, B, C, D */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const isThisSelected = selectedAnswerIndex === idx;
          const isThisCorrect = question.correctIndex === idx;

          let btnStyle = 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300';
          let letterStyle = 'bg-slate-100 text-slate-600 border-slate-200';

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-50 text-emerald-950 border-emerald-400 font-semibold ring-2 ring-emerald-400/30';
              letterStyle = 'bg-emerald-500 text-white border-emerald-600';
            } else if (isThisSelected) {
              btnStyle = 'bg-rose-50 text-rose-950 border-rose-400 font-semibold line-through opacity-80';
              letterStyle = 'bg-rose-500 text-white border-rose-600';
            } else {
              btnStyle = 'bg-white text-slate-400 border-slate-100 opacity-60';
              letterStyle = 'bg-slate-100 text-slate-400 border-slate-200';
            }
          }

          return (
            <button
              key={opt.letter}
              type="button"
              onClick={() => onSelectAnswer(idx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer group ${btnStyle}`}
            >
              {/* Písmeno A/B/C/D */}
              <span className={`w-7 h-7 rounded-xl font-mono text-xs font-black border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${letterStyle}`}>
                {opt.letter}
              </span>

              {/* Text možnosti */}
              <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                {opt.text}
              </div>

              {/* Ikona stavu po vyhodnocení */}
              {isAnswered && isThisCorrect && (
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Didaktické zdůvodnění a vysvětlení (rozbalí se po zvolení odpovědi) */}
      {isAnswered && (
        <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 ${
          isCorrect 
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
            : 'bg-blue-50/70 border-blue-200 text-blue-950'
        }`}>
          <div className="font-bold flex items-center gap-2 mb-1.5 text-xs uppercase tracking-wider text-blue-900">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            Vzorové řešení & Proč je to tak:
          </div>
          <p className="text-slate-700">
            {question.explanation}
          </p>
        </div>
      )}

    </div>
  );
}
