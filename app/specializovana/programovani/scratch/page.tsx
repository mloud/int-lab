'use client';

import React, { useState } from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import ScratchSequenceChapter from '@/components/specializovana/programovani/scratch/ScratchSequenceChapter';
import ScratchVariablesChapter from '@/components/specializovana/programovani/scratch/ScratchVariablesChapter';
import ScratchVariablesLoopsChapter from '@/components/specializovana/programovani/scratch/ScratchVariablesLoopsChapter';
import ScratchSubprogramsChapter from '@/components/specializovana/programovani/scratch/ScratchSubprogramsChapter';
import ScratchConditionsChapter from '@/components/specializovana/programovani/scratch/ScratchConditionsChapter';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';

const ScratchMenu = ({ onSelectChapter }: { onSelectChapter: (ch: number) => void }) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500 mx-auto">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-black text-amber-600 mb-4 tracking-tighter uppercase">
          Scratch - Úvod do programování
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-2xl font-medium">
          Nauč se základy programování vizuální formou skládáním bloků.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="relative group p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between shadow-lg">
            <div className="flex flex-col items-center mt-2">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-2">Lekce 1</h3>
              <p className="text-xs text-slate-600">Algoritmus a sekvence příkazů</p>
            </div>
            <button
              onClick={() => onSelectChapter(1)}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider w-full transition-all active:scale-95"
            >
              Otevřít lekci
            </button>
          </div>
          
          <div className="relative group p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between shadow-lg">
            <div className="flex flex-col items-center mt-2">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-2">Lekce 2</h3>
              <p className="text-xs text-slate-600">Základy – Proměnné a operátory</p>
            </div>
            <button
              onClick={() => onSelectChapter(2)}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider w-full transition-all active:scale-95"
            >
              Otevřít lekci
            </button>
          </div>

          <div className="relative group p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between shadow-lg">
            <div className="flex flex-col items-center mt-2">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-2">Lekce 3</h3>
              <p className="text-xs text-slate-600">Proměnná v cyklu</p>
            </div>
            <button
              onClick={() => onSelectChapter(3)}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider w-full transition-all active:scale-95"
            >
              Otevřít lekci
            </button>
          </div>

          <div className="relative group p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between shadow-lg">
            <div className="flex flex-col items-center mt-2">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-2">Lekce 4</h3>
              <p className="text-xs text-slate-600">Podprogramy (Vlastní bloky)</p>
            </div>
            <button
              onClick={() => onSelectChapter(4)}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider w-full transition-all active:scale-95"
            >
              Otevřít lekci
            </button>
          </div>

          <div className="relative group p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between shadow-lg">
            <div className="flex flex-col items-center mt-2">
              <BookOpen className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm mb-2">Lekce 6</h3>
              <p className="text-xs text-slate-600">Podmíněný příkaz</p>
            </div>
            <button
              onClick={() => onSelectChapter(6)}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider w-full transition-all active:scale-95"
            >
              Otevřít lekci
            </button>
          </div>
        </div>

        <button 
          onClick={() => router.push('/specializovana/programovani')}
          className="mt-12 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm"
        >
          Zpět do menu Programování
        </button>
      </div>
    </div>
  );
};

export default function ScratchPage() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const router = useRouter();

  if (activeChapter === 1) {
    return <ScratchSequenceChapter onBack={() => setActiveChapter(null)} />;
  }
  if (activeChapter === 2) {
    return <ScratchVariablesChapter onBack={() => setActiveChapter(null)} />;
  }
  if (activeChapter === 3) {
    return <ScratchVariablesLoopsChapter onBack={() => setActiveChapter(null)} />;
  }
  if (activeChapter === 4) {
    return <ScratchSubprogramsChapter onBack={() => setActiveChapter(null)} />;
  }
  if (activeChapter === 6) {
    return <ScratchConditionsChapter onBack={() => setActiveChapter(null)} />;
  }

  return (
    <CategoryLayout 
      title="Scratch" 
      category="specializovana"
      parent={{ title: 'Programování', path: '/specializovana/programovani' }}
    >
      <ScratchMenu onSelectChapter={setActiveChapter} />
    </CategoryLayout>
  );
}
