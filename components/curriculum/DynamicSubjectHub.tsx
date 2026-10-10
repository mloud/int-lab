'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCurriculum } from '@/components/providers/CurriculumContext';
import { getCurriculumIcon } from '@/registry/curriculum';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface DynamicSubjectHubProps {
  subjectId: string;
  onBack?: () => void;
}

export const DynamicSubjectHub: React.FC<DynamicSubjectHubProps> = ({ subjectId, onBack }) => {
  const router = useRouter();
  const { getSubject } = useCurriculum();
  const result = getSubject(subjectId);

  if (!result) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Předmět nenalezen</h2>
        <p className="text-sm text-slate-500 mb-4">Předmět s ID &quot;{subjectId}&quot; není v konfiguraci definován.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Zpět na úvod
        </button>
      </div>
    );
  }

  const { subject, division, grade } = result;
  const SubjectIcon = getCurriculumIcon(subject.icon);

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Tlačítko Zpět */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={onBack || (() => router.push(division.route))}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na {division.title}</span>
          </button>
        </div>

        {/* Hlavní ikona */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 bg-gradient-to-tr ${subject.gradient} rounded-[2rem] flex items-center justify-center shadow-xl`}>
            <SubjectIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Nadpis */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tighter leading-none uppercase">
          {subject.title}
        </h1>

        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          {grade.gradeLabel}
        </div>

        <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl font-medium leading-relaxed">
          {subject.description}
        </p>

        {/* Grid kapitol */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {subject.chapters.map((chapter) => {
            const ChapterIcon = getCurriculumIcon(chapter.icon);
            const hasSub = chapter.hasSubchapters ?? Boolean(chapter.subchapters && chapter.subchapters.length > 0);

            return (
              <TechnicalCard
                key={chapter.id}
                tag={chapter.tag}
                title={chapter.title}
                description={chapter.description}
                icon={ChapterIcon}
                gradient={chapter.gradient}
                actionLabel={chapter.actionLabel || 'Otevřít kapitolu'}
                onClick={() => router.push(chapter.route)}
                accentCorner={hasSub}
                variant={chapter.variant}
                isTest={chapter.isTest}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicSubjectHub;
