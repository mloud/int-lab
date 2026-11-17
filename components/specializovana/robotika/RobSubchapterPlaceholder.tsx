'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Bot, 
  Code2, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Terminal,
  Clock
} from 'lucide-react';

interface RobSubchapterPlaceholderProps {
  title: string;
  categoryTag: string;
  description: string;
  backRoute: string;
  backLabel?: string;
  gradient?: string;
  keySkills: string[];
  hardwareUsed: string[];
  pythonChallenge: string;
}

export default function RobSubchapterPlaceholder({
  title,
  categoryTag,
  description,
  backRoute,
  backLabel = 'Zpět na přehled kapitoly',
  gradient = 'from-emerald-600 to-teal-700',
  keySkills,
  hardwareUsed,
  pythonChallenge,
}: RobSubchapterPlaceholderProps) {
  const router = useRouter();

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl p-6 sm:p-12 relative overflow-hidden">
        
        {/* Horní lišta s tlačítkem Zpět */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          <button
            onClick={() => router.push(backRoute)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Příprava interaktivní lekce</span>
          </span>
        </div>

        {/* Hlavní hlavička */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-slate-200">
            #{categoryTag}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid informací o lekci */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Karta 1: Co se naučíme */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                  Klíčové dovednosti
                </h2>
              </div>
              <ul className="space-y-2.5">
                {keySkills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Karta 2: Použitý hardware */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                  Hardware & Vybavení
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {hardwareUsed.map((hw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    {hw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Každý student pracuje samostatně nebo ve dvojici u fyzického zařízení s přímým nahráváním kódu v Pythonu.
              </p>
            </div>
          </div>

        </div>

        {/* Karta 3: Praktická výzva v Pythonu */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl text-left shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black uppercase tracking-wider text-indigo-300">
              Praktická výzva v Pythonu
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {pythonChallenge}
          </p>
        </div>

        {/* Spodní tlačítko návratu */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push(backRoute)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
