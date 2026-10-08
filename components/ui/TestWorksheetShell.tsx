'use client';
import React, { useState } from 'react';
import { Lock, Unlock, ArrowLeft, Printer, Eye, EyeOff } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TestWorksheetShellProps {
  id: string; // Unique ID for local storage keys
  title: string;
  subtitle: string;
  studentPin: string;
  teacherPin: string;
  onBack: () => void;
  children: (showSolutions: boolean) => React.ReactNode;
}

export function TestWorksheetShell({ id, title, subtitle, studentPin, teacherPin, onBack, children }: TestWorksheetShellProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useLocalStorage(`test-${id}-unlocked`, false);
  const [isTeacher, setIsTeacher] = useLocalStorage(`test-${id}-teacher`, false);
  const [showSolutions, setShowSolutions] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pin.trim().toUpperCase();
    if (entered === studentPin.toUpperCase()) {
      setIsUnlocked(true);
      setIsTeacher(false);
      setError(false);
    } else if (entered === teacherPin.toUpperCase()) {
      setIsUnlocked(true);
      setIsTeacher(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleLock = () => {
     setIsUnlocked(false);
     setIsTeacher(false);
     setShowSolutions(false);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-rose-100 max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter">{title}</h1>
          <p className="text-slate-500 font-medium mb-8">Zadejte heslo pro přístup k zadání.</p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="****"
              className={`w-full text-center text-3xl font-bold tracking-[0.5em] p-4 rounded-2xl border-2 transition-colors ${
                error ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
              }`}
              autoFocus
            />
            {error && <p className="text-red-500 font-bold text-sm animate-bounce">Nesprávné heslo!</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" /> Odemknout test
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8">
      {/* Tiskové styly */}
      <style>{`
        @page { size: A4; margin: 14mm 15mm; }
        @media print {
          html, body { background-color: white !important; height: auto !important; }
          body * { visibility: hidden !important; }
          .bg-slate-50, .bg-slate-100 { background-color: transparent !important; }
          .min-h-screen { min-height: 0 !important; }
          #print-sheet, #print-sheet * { visibility: visible !important; }
          #print-sheet {
            position: absolute; left: 0; top: 0;
            width: 100% !important; max-width: none !important;
            margin: 0 !important; padding: 0 !important;
            box-shadow: none !important; border: none !important;
            background-color: white !important;
          }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .print-page-break { break-before: page; page-break-before: always; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Ovládací lišta (netiskne se) */}
      <div className="max-w-[210mm] mx-auto flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
        <div className="flex flex-wrap gap-3">
          {isTeacher && (
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className={`flex items-center gap-2 px-6 py-3 font-bold rounded-2xl shadow-sm transition-all uppercase tracking-wider text-xs ${showSolutions ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'}`}
            >
              {showSolutions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showSolutions ? 'Skrýt řešení' : 'Zobrazit řešení'}
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-xs"
          >
            <Printer className="w-4 h-4" /> Tisk
          </button>
        </div>
      </div>

      {/* ARCH A4 */}
      <article
        id="print-sheet"
        className="max-w-[210mm] mx-auto bg-white shadow-xl border border-slate-200 font-serif"
        style={{ padding: '14mm 15mm' }}
      >
        <header className="mb-6">
          <div className="flex items-end justify-between border-b-4 border-slate-900 pb-2 mb-4">
            <div>
              <h1 className="text-[20pt] font-bold uppercase tracking-tight leading-none">
                {title}{showSolutions ? ' — ŘEŠENÍ' : ''}
              </h1>
              <p className="text-[11pt] mt-1">{subtitle}</p>
            </div>
          </div>
          {!showSolutions && (
            <div className="grid grid-cols-12 gap-4 text-[11pt]">
              <div className="col-span-6 flex items-end gap-2">
                <span className="font-semibold whitespace-nowrap">Jméno a příjmení:</span>
                <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
              </div>
              <div className="col-span-3 flex items-end gap-2">
                <span className="font-semibold">Třída:</span>
                <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
              </div>
              <div className="col-span-3 flex items-end gap-2">
                <span className="font-semibold">Datum:</span>
                <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
              </div>
            </div>
          )}
          {!showSolutions && (
            <p className="text-[10pt] italic text-slate-700 mt-4">
              Odpovídejte vlastními slovy a čitelně. U otázek se schématem nakreslete přehledné blokové schéma a popište jej.
            </p>
          )}
        </header>

        {children(showSolutions)}

      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pomocné komponenty pro testy                                        */
/* ------------------------------------------------------------------ */

export const Lines: React.FC<{ count: number }> = ({ count }) => (
  <div className="mt-1">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="border-b border-dotted border-slate-500" style={{ height: '9mm' }} />
    ))}
  </div>
);

export const DrawBox: React.FC<{ height: string; label?: string }> = ({ height, label }) => (
  <div className="mt-2">
    {label && <div className="text-[10pt] font-semibold text-slate-700 mb-1">{label}</div>}
    <div className="border-2 border-slate-700 rounded-md w-full" style={{ height }} />
  </div>
);

export const Question: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section className="print-avoid-break mb-7">
    <div className="border-b-2 border-slate-800 pb-1 mb-2">
      <h3 className="text-[12.5pt] font-bold text-slate-900">
        {id} — {title}
      </h3>
    </div>
    <div className="text-[11pt] text-slate-900 leading-snug">{children}</div>
  </section>
);

export const Sub: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mt-3">
    <p>
      <strong>{label}</strong> {children}
    </p>
  </div>
);

export const Answer: React.FC<{ show: boolean; lines?: number; solution: React.ReactNode }> = ({ show, lines = 1, solution }) => {
  if (show) {
    return (
      <div className="mt-2 mb-2 text-rose-600 font-medium text-[11pt] italic leading-snug">
        {solution}
      </div>
    );
  }
  return <Lines count={lines} />;
};
