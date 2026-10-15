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
import TechnicalCard from '@/components/ui/TechnicalCard';

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="scr1"
            title="Lekce 1: Sekvence"
            description="Algoritmus a sekvence příkazů pro postavu kocoura ve Scratchi."
            icon={BookOpen}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít lekci"
            onClick={() => onSelectChapter(1)}
            accentCorner={false}
          />
          
          <TechnicalCard
            tag="scr2"
            title="Lekce 2: Proměnné"
            description="Základy práce s proměnnými a operátory. Ukládání a změna hodnot."
            icon={BookOpen}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít lekci"
            onClick={() => onSelectChapter(2)}
            accentCorner={false}
          />

          <TechnicalCard
            tag="scr3"
            title="Lekce 3: Cykly"
            description="Proměnná v cyklu, postupné počítání kroků a kreslení spirál."
            icon={BookOpen}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít lekci"
            onClick={() => onSelectChapter(3)}
            accentCorner={false}
          />

          <TechnicalCard
            tag="scr4"
            title="Lekce 4: Podprogramy"
            description="Vlastní bloky a podprogramy pro přehlednější a znovupoužitelný kód."
            icon={BookOpen}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít lekci"
            onClick={() => onSelectChapter(4)}
            accentCorner={false}
          />

          <TechnicalCard
            tag="scr5"
            title="Lekce 5: Podmínky"
            description="Podmíněný příkaz (když - tak) a interaktivní chování programu na podněty."
            icon={BookOpen}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít lekci"
            onClick={() => onSelectChapter(5)}
            accentCorner={false}
          />
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
  if (activeChapter === 5 || activeChapter === 6) {
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
