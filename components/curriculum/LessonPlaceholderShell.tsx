'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Sparkles, Terminal, Cpu } from 'lucide-react';
import CategoryLayout from '@/components/layout/CategoryLayout';

interface LessonPlaceholderShellProps {
  title: string;
  subtitle: string;
  hardware: string;
  subjectTitle: string;
  subjectPath: string;
  chapterTitle: string;
  chapterPath: string;
}

export const LessonPlaceholderShell: React.FC<LessonPlaceholderShellProps> = ({
  title,
  subtitle,
  hardware,
  subjectTitle,
  subjectPath,
  chapterTitle,
  chapterPath,
}) => {
  const router = useRouter();

  return (
    <CategoryLayout
      title={title}
      category="specializovana"
      parent={{ title: chapterTitle, path: chapterPath }}
    >
      <div className="max-w-4xl w-full animate-in fade-in duration-500 px-4">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-14 rounded-[3.5rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
          {/* Tlačítko Zpět */}
          <div className="w-full flex justify-start mb-6">
            <button
              onClick={() => router.push(chapterPath)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zpět na kapitolu</span>
            </button>
          </div>

          {/* Odznak HW a stavu */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              {hardware}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              Python
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Lekce připravena
            </span>
          </div>

          {/* Ikona robota */}
          <div className="w-20 h-20 bg-gradient-to-tr from-slate-900 to-indigo-900 rounded-3xl flex items-center justify-center shadow-xl mb-6">
            <Bot className="w-10 h-10 text-white" />
          </div>

          {/* Nadpisy */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Informační karta pro studenty a učitele */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 w-full max-w-xl text-left">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              Stav přípravy obsahu
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Struktura této lekce a její zařazení do kurikula předmětu <strong>{subjectTitle}</strong> je kompletně připravena. Výukový simulátor, laboratorní úlohy a kódové šablony v Pythonu budou brzy k dispozici.
            </p>
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
};

export default LessonPlaceholderShell;
