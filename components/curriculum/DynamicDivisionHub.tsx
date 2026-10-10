'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCurriculum } from '@/components/providers/CurriculumContext';
import { getCurriculumIcon } from '@/registry/curriculum';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface DynamicDivisionHubProps {
  divisionId: string;
  onBack?: () => void;
}

export const DynamicDivisionHub: React.FC<DynamicDivisionHubProps> = ({ divisionId, onBack }) => {
  const router = useRouter();
  const { getDivision } = useCurriculum();
  const division = getDivision(divisionId);

  if (!division) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-2">Divize nenalezena</h2>
        <p className="text-sm text-slate-500 mb-4">Vzdělávací větev &quot;{divisionId}&quot; není v konfiguraci definována.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Zpět na úvod
        </button>
      </div>
    );
  }

  const DivisionIcon = getCurriculumIcon(division.icon);

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-1000 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Tlačítko Zpět */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={onBack || (() => router.push('/'))}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět do výběru školy</span>
          </button>
        </div>

        {/* Hlavní ikona */}
        <div className="relative mb-8">
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-200">
            <DivisionIcon className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Hlavní nadpis */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          {division.title}
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          {division.subtitle || division.description}
        </p>

        {/* Sekce ročníků */}
        <div className="w-full space-y-10">
          {division.grades.map((grade) => (
            <div key={grade.grade} className="w-full max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
                <span className={`w-3 h-7 rounded-full ${grade.pillColor}`}></span> {grade.gradeLabel}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
                {grade.subjects.map((subject) => {
                  const SubjectIcon = getCurriculumIcon(subject.icon);
                  return (
                    <TechnicalCard
                      key={subject.id}
                      tag={subject.tag}
                      title={subject.title}
                      description={subject.description}
                      icon={SubjectIcon}
                      gradient={subject.gradient}
                      actionLabel={subject.actionLabel || 'Otevřít předmět'}
                      onClick={() => router.push(subject.route)}
                      accentCorner={false}
                      variant="filled"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicDivisionHub;
