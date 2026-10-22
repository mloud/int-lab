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
  const { getChapterDetails, getChapter } = useCurriculum();
  const details = getChapterDetails(chapterId);
  const chapter = details?.chapter || getChapter(chapterId);
  const parentSubject = details?.subject;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (parentSubject?.route) {
      router.push(parentSubject.route);
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/specializovana');
    }
  };

  if (!chapter || !chapter.subchapters || chapter.subchapters.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Kapitola nenalezena</h2>
        <p className="text-sm text-slate-500 mb-4">Kapitola &quot;{chapterId}&quot; s podkapitolami není v konfiguraci definována.</p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Zpět
        </button>
      </div>
    );
  }

  const ChapterIcon = getCurriculumIcon(chapter.icon);

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-14 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Tlačítko Zpět */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na {parentSubject ? parentSubject.title : 'přehled kapitol'}</span>
          </button>
        </div>

        {/* Hlavní ikona */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 bg-gradient-to-tr ${chapter.gradient} rounded-[2rem] flex items-center justify-center shadow-xl`}>
            <ChapterIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Nadpis */}
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-none">
          {chapter.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-3xl font-medium leading-relaxed">
          {chapter.description}
        </p>

        {/* Podkapitoly */}
        <h2 className="text-left w-full text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">
          Podkapitoly
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-4">
          {chapter.subchapters.map((sub, idx) => {
            const SubIcon = getCurriculumIcon(sub.icon);
            return (
              <TechnicalCard
                key={sub.id}
                tag={sub.tag}
                title={sub.title}
                description={sub.description}
                icon={SubIcon}
                gradient={sub.gradient}
                actionLabel={sub.actionLabel || 'Otevřít kapitolu'}
                onClick={() => router.push(sub.route)}
                accentCorner={false}
                isTest={sub.isTest}
                orderNumber={sub.orderNumber !== undefined ? sub.orderNumber : (idx + 1)}
              />
            );
          })}
        </div>

        {/* Procvičovací hry */}
        {chapter.practiceGames && chapter.practiceGames.length > 0 && (
          <div className="w-full mt-10 text-left border-t border-slate-200/80 pt-8">
            <h2 className="text-left text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
              Procvičovací hry
            </h2>
            <p className="text-left text-base text-slate-500 mb-6 font-medium">
              Samostatné úlohy na procvičení – vhodné po probrání kapitol 3 a 4.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapter.practiceGames.map((g) => {
                const GameIcon = getCurriculumIcon(g.icon);
                return (
                  <button
                    key={g.tag}
                    onClick={() => router.push(g.route)}
                    className="group relative p-5 bg-white hover:bg-slate-50 border-4 border-gray-50 hover:border-purple-100 rounded-[2rem] shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-left flex flex-col justify-between min-h-[190px]"
                  >
                    <div>
                      <div className={`w-12 h-12 ${g.bg || 'bg-purple-50'} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
                        <GameIcon className={`w-6 h-6 ${g.color || 'text-purple-600'}`} />
                      </div>
                      <h3 className="text-base font-black text-gray-900 mb-1 uppercase tracking-wide leading-tight">
                        {g.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold leading-snug">
                        {g.description}
                      </p>
                    </div>
                    <span className="mt-3 text-xs font-black text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Spustit ➔
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicSubchapterHub;
