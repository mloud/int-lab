'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle,
  Trophy,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type ReviewQuestionType = 'single' | 'multiple' | 'fill' | 'calc';

export interface ReviewQuestion {
  id: number;
  type: ReviewQuestionType;
  category?: string;
  question: string;
  options?: string[];
  correctIndices?: number[]; // pro single a multiple
  correctAnswers?: string[]; // pro fill a calc (alternativní platné tvary)
  expectedFormat?: string;
  explanation: string;
}

export interface TopicReviewQuizProps {
  storageKey: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  questions: ReviewQuestion[];
  categoryIcons?: Record<string, React.ReactNode>;
}

interface UserAnswersState {
  single: Record<number, number>; // questionId -> originalOptionIndex
  multiple: Record<number, number[]>; // questionId -> originalOptionIndices
  text: Record<number, string>; // questionId -> entered text
  checked: Record<number, boolean>; // questionId -> has user checked answer
  shuffledOptions?: Record<number, number[]>; // questionId -> shuffled original indices
}

// Pomocná funkce pro zamíchání možností (Fisher-Yates shuffle)
function generateShuffledOptions(questions: ReviewQuestion[]): Record<number, number[]> {
  const result: Record<number, number[]> = {};
  for (const q of questions) {
    if (q.options && q.options.length > 0) {
      const indices = q.options.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      result[q.id] = indices;
    }
  }
  return result;
}

/**
 * Standardizovaná komponenta pro opakovací otázky k jakémukoliv tématu v IntLab.
 * Dodržuje pravidlo čistého krokování, náhodného míchání možností, dvoutaktního vyhodnocení
 * a vysokého kontrastu v závěrečném přehledu chyb.
 */
export default function TopicReviewQuiz({
  storageKey,
  title,
  subtitle,
  badgeText = 'Procvičování znalostí',
  questions,
  categoryIcons = {}
}: TopicReviewQuizProps) {
  const [answers, setAnswers] = useLocalStorage<UserAnswersState>(
    storageKey,
    { single: {}, multiple: {}, text: {}, checked: {}, shuffledOptions: {} }
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const total = questions.length;
  const currentQ = questions[currentIndex] || questions[0];

  // Při prvním načtení na klientu zajistíme náhodné pořadí možností, pokud ještě není uloženo
  useEffect(() => {
    if (!answers.shuffledOptions || Object.keys(answers.shuffledOptions).length === 0) {
      setAnswers(prev => ({
        ...prev,
        shuffledOptions: generateShuffledOptions(questions)
      }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Kontrola, zda uživatel na otázku už zvolil/vyplnil nějakou odpověď
  const hasUserAnswered = (q: ReviewQuestion): boolean => {
    if (q.type === 'single') {
      return answers.single[q.id] !== undefined;
    }
    if (q.type === 'multiple') {
      const selected = answers.multiple[q.id] || [];
      const needed = q.correctIndices?.length || 2;
      return selected.length === needed;
    }
    if (q.type === 'fill' || q.type === 'calc') {
      return !!(answers.text[q.id] || '').trim();
    }
    return false;
  };

  // Vyhodnocení správnosti konkrétní otázky
  const isQuestionCorrect = (q: ReviewQuestion): boolean => {
    if (!answers.checked[q.id]) return false;

    if (q.type === 'single') {
      const selected = answers.single[q.id];
      return selected !== undefined && q.correctIndices?.includes(selected) === true;
    }

    if (q.type === 'multiple') {
      const selected = answers.multiple[q.id] || [];
      const correct = q.correctIndices || [];
      if (selected.length !== correct.length) return false;
      return correct.every(idx => selected.includes(idx));
    }

    if (q.type === 'fill' || q.type === 'calc') {
      const val = (answers.text[q.id] || '').trim().toLowerCase();
      if (!val) return false;

      // Přímá textová shoda
      const isStringMatch = (q.correctAnswers || []).some(ans => ans.toLowerCase().trim() === val);
      if (isStringMatch) return true;

      // Pro početní úlohy: číselná kontrola s tolerancí pro zaokrouhlení
      if (q.type === 'calc') {
        const cleanedInput = val.replace(',', '.').replace(/[^0-9.-]/g, '');
        const numInput = parseFloat(cleanedInput);
        if (!isNaN(numInput)) {
          for (const ans of (q.correctAnswers || [])) {
            const cleanedExpected = ans.replace(',', '.').replace(/[^0-9.-]/g, '');
            const numExpected = parseFloat(cleanedExpected);
            if (!isNaN(numExpected) && Math.abs(numInput - numExpected) < 0.06) {
              return true;
            }
          }
        }
      }

      return false;
    }

    return false;
  };

  const isQuestionAnswered = (q: ReviewQuestion): boolean => {
    return !!answers.checked[q.id];
  };

  const correctCount = questions.filter(q => isQuestionCorrect(q)).length;
  const answeredCount = questions.filter(q => isQuestionAnswered(q)).length;
  const failedQuestions = questions.filter(q => isQuestionAnswered(q) && !isQuestionCorrect(q));

  // Handlery odpovědí
  const handleSingleSelect = (questionId: number, optionIndex: number) => {
    if (answers.checked[questionId]) return;
    setAnswers(prev => ({
      ...prev,
      single: { ...prev.single, [questionId]: optionIndex }
    }));
  };

  const handleMultipleToggle = (questionId: number, optionIndex: number, maxAllowed: number) => {
    if (answers.checked[questionId]) return;
    const currentSelected = answers.multiple[questionId] || [];
    let updated: number[];
    if (currentSelected.includes(optionIndex)) {
      updated = currentSelected.filter(i => i !== optionIndex);
    } else {
      if (currentSelected.length >= maxAllowed) return;
      updated = [...currentSelected, optionIndex];
    }

    setAnswers(prev => ({
      ...prev,
      multiple: { ...prev.multiple, [questionId]: updated }
    }));
  };

  // Hlavní akce tlačítka:
  // 1. Pokud otázka ještě není ověřena -> vyhodnotí ji a vypíše výsledek + vysvětlení
  // 2. Pokud už je ověřena -> přejde na další otázku, případně zobrazí celkové vyhodnocení
  const handleNextOrVerify = () => {
    if (!currentQ) return;
    const isCurrentChecked = !!answers.checked[currentQ.id];

    if (!isCurrentChecked) {
      if (!hasUserAnswered(currentQ)) return;
      setAnswers(prev => ({
        ...prev,
        checked: { ...prev.checked, [currentQ.id]: true }
      }));
    } else {
      if (currentIndex < total - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Po dokončení poslední otázky otevřeme závěrečné vyhodnocení
        setShowResults(true);
      }
    }
  };

  // Reset všech odpovědí a nové zamíchání možností
  const handleRepeatAll = () => {
    setAnswers({
      single: {},
      multiple: {},
      text: {},
      checked: {},
      shuffledOptions: generateShuffledOptions(questions)
    });
    setCurrentIndex(0);
    setShowResults(false);
  };

  const renderQuestionCard = (q: ReviewQuestion, index: number) => {
    const isChecked = !!answers.checked[q.id];
    const isCorrect = isQuestionCorrect(q);

    // Pořadí možností (z náhodného generátoru nebo výchozí [0..n-1])
    const optionOrder = answers.shuffledOptions?.[q.id] || (q.options ? q.options.map((_, i) => i) : []);
    const icon = q.category && categoryIcons[q.category] ? categoryIcons[q.category] : <HelpCircle className="w-4 h-4 text-indigo-600" />;
    const neededCount = q.correctIndices?.length || 2;

    return (
      <div 
        key={q.id}
        className={`bg-white rounded-3xl border-2 p-5 sm:p-7 shadow-sm transition-all ${
          isChecked 
            ? isCorrect 
              ? 'border-emerald-200 bg-emerald-50/20' 
              : 'border-rose-200 bg-rose-50/20'
            : 'border-slate-200'
        }`}
      >
        {/* Kategorie & Typ otázky */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center">
              {icon}
            </span>
            {q.category && (
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {q.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {q.type === 'single' && 'Výběr z možností (1 správná)'}
              {q.type === 'multiple' && `Výběr z možností (${neededCount} správné)`}
              {q.type === 'fill' && 'Doplňovací otázka'}
              {q.type === 'calc' && 'Početní úloha'}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">
              #{q.id} z {total}
            </span>
          </div>
        </div>

        {/* Zadání otázky */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-5 whitespace-pre-line">
          <span className="font-mono text-indigo-600 font-black mr-2">#{index + 1}.</span>
          {q.question}
        </h3>

        {/* 1. SINGLE CHOICE (s náhodným pořadím odpovědí) */}
        {q.type === 'single' && q.options && (
          <div className="space-y-2.5 mb-5">
            {optionOrder.map((optIdx, displayIdx) => {
              const opt = q.options![optIdx];
              const isSelected = answers.single[q.id] === optIdx;
              const isRightOption = q.correctIndices?.includes(optIdx);

              let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';
              if (isChecked) {
                if (isRightOption) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !isRightOption) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50/60 text-slate-400 border-slate-200 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-bold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSingleSelect(q.id, optIdx)}
                  disabled={isChecked}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm transition-all border-2 flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                    isSelected 
                      ? isChecked && !isRightOption 
                        ? 'bg-rose-600 text-white border-rose-600' 
                        : isChecked && isRightOption
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-indigo-600 border-white' 
                      : 'border-slate-300 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + displayIdx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. MULTIPLE CHOICE (s náhodným pořadím odpovědí) */}
        {q.type === 'multiple' && q.options && (
          <div className="space-y-2.5 mb-5">
            <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
              <span>Vyberte přesně {neededCount} možnosti:</span>
              <span className="font-mono text-indigo-600 font-bold">
                {(answers.multiple[q.id] || []).length} / {neededCount} vybráno
              </span>
            </div>

            {optionOrder.map((optIdx, displayIdx) => {
              const opt = q.options![optIdx];
              const selectedArr = answers.multiple[q.id] || [];
              const isSelected = selectedArr.includes(optIdx);
              const isRightOption = q.correctIndices?.includes(optIdx);

              let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';
              if (isChecked) {
                if (isRightOption) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !isRightOption) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50/60 text-slate-400 border-slate-200 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-xs';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleMultipleToggle(q.id, optIdx, neededCount)}
                  disabled={isChecked}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm transition-all border-2 flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                    isSelected 
                      ? isChecked && isRightOption
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isChecked && !isRightOption
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-indigo-600 text-white border-indigo-600' 
                      : 'border-slate-300 text-slate-400'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="leading-relaxed">
                    <strong className="text-slate-400 font-mono mr-2">{String.fromCharCode(65 + displayIdx)})</strong>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. FILL-IN & CALC */}
        {(q.type === 'fill' || q.type === 'calc') && (
          <div className="space-y-3 mb-5">
            {q.expectedFormat && (
              <p className="text-xs text-slate-500 font-medium">
                💡 Nápověda k formátu: {q.expectedFormat}
              </p>
            )}

            <input
              type="text"
              disabled={isChecked}
              value={answers.text[q.id] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setAnswers(prev => ({
                  ...prev,
                  text: { ...prev.text, [q.id]: val }
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNextOrVerify();
                }
              }}
              placeholder="Zde napište svou odpověď..."
              className="w-full p-3.5 rounded-2xl border-2 border-slate-300 focus:border-indigo-600 focus:outline-hidden text-sm font-semibold bg-white disabled:bg-slate-100 disabled:text-slate-700 transition-all"
            />
          </div>
        )}

        {/* VYSVĚTLENÍ PO VYHODNOCENÍ */}
        {isChecked && (
          <div className={`p-4 rounded-2xl border-2 animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed ${
            isCorrect 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800 uppercase tracking-wide">Výborně, správná odpověď!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-800 uppercase tracking-wide">Nesprávná odpověď</span>
                </>
              )}
            </div>

            <p className="font-normal text-slate-700 mb-1">
              <strong>Vysvětlení:</strong> {q.explanation}
            </p>

            {!isCorrect && (q.type === 'fill' || q.type === 'calc') && (
              <p className="mt-1 font-semibold text-rose-900">
                Správná odpověď byla: <span className="font-mono underline">{q.correctAnswers?.[0]}</span>
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const isCurrentChecked = currentQ ? !!answers.checked[currentQ.id] : false;
  const isCurrentAnswered = currentQ ? hasUserAnswered(currentQ) : false;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* HORNÍ SOUHRNNÝ PANEL */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-indigo-100 text-indigo-700 font-bold text-xs uppercase px-2">
                {badgeText}
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {total} kontrolních otázek</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{title}</h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {answeredCount === total && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                Zobrazit vyhodnocení
              </button>
            )}
            <button
              onClick={() => {
                if (window.confirm('Opravdu chcete vyresetovat všechny odpovědi a začít znovu?')) {
                  handleRepeatAll();
                }
              }}
              title="Vyresetovat odpovědi a náhodně promíchat možnosti"
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Resetovat vše
            </button>
          </div>
        </div>

        {/* UKAZATEL SKÓRE & LIŠTA ČÍSEL OTÁZEK */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Zodpovězeno:</span>
              <span className="font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                {answeredCount} z {total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Průběžná úspěšnost:</span>
              <span className="font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {correctCount} z {total} ({percentage} %)
              </span>
            </div>
          </div>

          {/* Rychlá navigační lišta 1..N */}
          <div className={`grid grid-cols-10 ${total > 15 ? 'sm:grid-cols-20' : 'sm:grid-cols-10'} gap-1.5`}>
            {questions.map((q, idx) => {
              const checked = answers.checked[q.id];
              const correct = isQuestionCorrect(q);
              const isCurrent = !showResults && currentIndex === idx;

              let chipStyle = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
              if (checked) {
                chipStyle = correct 
                  ? 'bg-emerald-500 text-white border-emerald-600' 
                  : 'bg-rose-500 text-white border-rose-600';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowResults(false);
                  }}
                  className={`h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${chipStyle} ${
                    isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* HLAVNÍ PLOCHA: BUĎ ZÁVĚREČNÉ VYHODNOCENÍ NEBO KROKOVÁNÍ OTÁZEK */}
      {showResults ? (
        /* ZÁVĚREČNÁ VÝSLEDKOVÁ LISTINA S VYSOKÝM KONTRASTEM */
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          
          {/* HLAVNÍ KARTA SKÓRE (SVĚTLÁ, VYSOKÝ KONTRAST, ČERNÝ/TMAVÝ TEXT) */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 p-7 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <Trophy className="w-4 h-4 text-indigo-600" />
                  Závěrečné vyhodnocení
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {percentage === 100 
                    ? 'Excelentní výsledek! 🎯' 
                    : percentage >= 80 
                    ? 'Výborná práce! 👏' 
                    : percentage >= 60 
                    ? 'Dobrý výsledek! 👍' 
                    : 'Chce to ještě procvičit! 💡'}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-medium">
                  {percentage === 100 
                    ? 'Perfektní! Bezchybně ovládáte všechny klíčové principy a pojmy tohoto tématu.' 
                    : percentage >= 80 
                    ? `Získali jste ${correctCount} z ${total} bodů. Většinu látky bezpečně ovládáte. Níže naleznete vysvětlení k otázkám, kde došlo k zaváhání.` 
                    : percentage >= 60 
                    ? `Získali jste ${correctCount} z ${total} bodů. Níže naleznete podrobný přehled otázek, ve kterých byla chybná odpověď, spolu se správným řešením.` 
                    : `Získali jste ${correctCount} z ${total} bodů. Projděte si níže správná řešení nepovedených otázek a zkuste procvičování znovu.`}
                </p>
              </div>

              {/* Boxík s číselným skóre */}
              <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 text-center shrink-0 min-w-44 shadow-2xs">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 block mb-1">
                  Konečné skóre
                </span>
                <div className="text-5xl font-black font-mono tracking-tight text-slate-900 mb-1">
                  {correctCount}<span className="text-2xl text-slate-400 font-normal">/{total}</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${
                  percentage >= 80 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                    : percentage >= 60 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  {percentage} % úspěšnost
                </div>
              </div>

            </div>

            {/* AKČNÍ TLAČÍTKA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={handleRepeatAll}
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Opakovat celé znovu (nové pořadí)
              </button>

              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setShowResults(false);
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                Prohlédnout otázky v testu
              </button>
            </div>
          </div>

          {/* SEZNAM OTÁZEK ZODPOVĚZENÝCH ŠPATNĚ S ROZBOREM ŘEŠENÍ */}
          {failedQuestions.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700">
                  <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    Otázky zodpovězené špatně ({failedQuestions.length})
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Zde je podrobný přehled úloh, kde jste chybovali, spolu s vaší volbou a správným vysvětlením.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {failedQuestions.map(q => {
                  return (
                    <div 
                      key={q.id}
                      className="p-5 sm:p-6 rounded-3xl border-2 border-rose-200 bg-rose-50/20 space-y-4"
                    >
                      {/* Hlavička otázky */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                          Otázka #{q.id}
                        </span>
                        {q.category && (
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {q.category}
                          </span>
                        )}
                      </div>

                      {/* Znění otázky */}
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </p>

                      {/* 1. Vaše chybná odpověď */}
                      <div className="p-3.5 rounded-2xl bg-rose-100/70 border border-rose-300 text-xs sm:text-sm">
                        <span className="font-bold text-rose-900 block mb-1">
                          ❌ Vaše odpověď:
                        </span>
                        <p className="text-rose-950 font-medium">
                          {q.type === 'single' && (
                            answers.single[q.id] !== undefined 
                              ? q.options?.[answers.single[q.id]] 
                              : 'Žádná možnost nebyla zvolena'
                          )}
                          {q.type === 'multiple' && (
                            (answers.multiple[q.id] || []).length > 0
                              ? answers.multiple[q.id].map(idx => q.options?.[idx]).join(' + ')
                              : 'Žádné možnosti nebyly vybrány'
                          )}
                          {(q.type === 'fill' || q.type === 'calc') && (
                            answers.text[q.id]?.trim() ? `"${answers.text[q.id]}"` : 'Nevyplněno'
                          )}
                        </p>
                      </div>

                      {/* 2. Správné řešení a vysvětlení */}
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs sm:text-sm space-y-2">
                        <span className="font-bold text-emerald-900 block">
                          ✓ Správná odpověď:
                        </span>
                        <div className="text-emerald-950 font-bold text-sm sm:text-base">
                          {q.type === 'single' && (
                            q.correctIndices?.[0] !== undefined ? q.options?.[q.correctIndices[0]] : ''
                          )}
                          {q.type === 'multiple' && (
                            q.correctIndices?.map(idx => q.options?.[idx]).join(' + ')
                          )}
                          {(q.type === 'fill' || q.type === 'calc') && (
                            <span className="font-mono">{q.correctAnswers?.[0]}</span>
                          )}
                        </div>

                        <div className="pt-2.5 border-t border-emerald-200 text-slate-800 font-normal leading-relaxed">
                          <strong className="text-slate-950">Vysvětlení:</strong> {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* VŠECHNO SPRÁVNĚ */
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[2.5rem] p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-xl font-black text-emerald-950">
                Žádné chyby! Zodpověděli jste všech {total} otázek správně.
              </h4>
              <p className="text-sm text-emerald-800 font-medium">
                Probírané téma máte perfektně osvojené.
              </p>
            </div>
          )}

        </div>
      ) : (
        /* KROKOVÁNÍ AKTUÁLNÍ OTÁZKY */
        <div className="space-y-6">
          {renderQuestionCard(currentQ, currentIndex)}

          {/* Navigační lišta: Předchozí, Číslo, Vyhodnotit / Další otázka */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
              disabled={currentIndex === 0}
              className="px-5 py-3 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-wider text-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Předchozí
            </button>

            <span className="text-xs font-bold text-slate-400">
              Otázka {currentIndex + 1} z {total}
            </span>

            {/* Hlavní akční tlačítko: nejprve Vyhodnotit -> po zobrazení vysvětlení Další otázka */}
            <button
              onClick={handleNextOrVerify}
              disabled={!isCurrentChecked && !isCurrentAnswered}
              className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                isCurrentChecked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-35 disabled:cursor-not-allowed text-white'
              }`}
            >
              {isCurrentChecked ? (
                <>
                  <span>{currentIndex < total - 1 ? 'Další otázka' : 'Zobrazit celkový výsledek'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Vyhodnotit</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
