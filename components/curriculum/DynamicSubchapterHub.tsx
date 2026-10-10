'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCurriculum } from '@/components/providers/CurriculumContext';
import { getCurriculumIcon } from '@/registry/curriculum';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface DynamicSubchapterHubProps {
  chapterId: string;
  onBack?: () => void;
}

export const DynamicSubchapterHub: React.FC<DynamicSubchapterHubProps> = ({ chapterId, onBack }) => {
  const router = useRouter();
  const { getChapter } = useCurriculum();
  const chapter = getChapter(chapterId);

  if (!chapter || !chapter.subchapters || chapter.subchapters.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Kapitola nenalezena</h2>
        <p className="text-sm text-slate-500 mb-4">Kapitola &quot;{chapterId}&quot; s podkapitolami není v konfiguraci definována.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Zpět
        </button>
      </div>
    );
  }

  const ChapterIcon = getCurriculumIcon(chapter.icon);

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-500 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Tlačítko Zpět */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={onBack || (() => router.back())}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na přehled kapitol</span>
          </button>
        </div>

        {/* Hlavní ikona */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 bg-gradient-to-tr ${chapter.gradient} rounded-[2rem] flex items-center justify-center shadow-xl`}>
            <ChapterIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Nadpis */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tighter leading-none uppercase">
          {chapter.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl font-medium leading-relaxed">
          {chapter.description}
        </p>

        {/* Grid podkapitol */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {chapter.subchapters.map((sub) => {
            const SubIcon = getCurriculumIcon(sub.icon);
            return (
              <TechnicalCard
                key={sub.id}
                tag={sub.tag}
                title={sub.title}
                description={sub.description}
                icon={SubIcon}
                gradient={sub.gradient}
                actionLabel={sub.actionLabel || 'Otevřít lekci'}
                onClick={() => router.push(sub.route)}
                accentCorner={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicSubchapterHub;
