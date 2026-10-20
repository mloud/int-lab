'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  BookOpen, 
  Target, 
  CheckCircle2, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Terminal 
} from 'lucide-react';
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
  const [showAnalysis, setShowAnalysis] = useState(false);

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
  const hasThematicPlan = ['ops1', 'ops2', 'ops3'].includes(subject.id);

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

        <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl font-medium leading-relaxed">
          {subject.description}
        </p>

        {/* Tlačítko Tematický plán (jednoduché, decentní) */}
        {hasThematicPlan && (
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => router.push(`${subject.route}/tematicky-plan`)}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Tematický plán předmětu</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                66 h
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        )}

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

        {/* Volitelný didaktický rozbor učiva (pokud je v datech definován) */}
        {subject.analysis && (
          <div className="w-full mt-12 text-left border-t border-slate-200/80 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  Didaktický rozbor předmětu
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Koncepce výuky & Výstupy vzdělávání
                </h2>
              </div>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>{showAnalysis ? 'Skrýt podrobný rozbor' : 'Zobrazit podrobný rozbor'}</span>
                {showAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Vždy viditelné shrnutí cíle a profilu */}
            <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Cíl předmětu & Profil absolventa
              </h3>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {subject.analysis.targetProfile}
              </p>
            </div>

            {/* Rozbalený detailní rozbor */}
            {showAnalysis && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* 1. Co je výstupem (konkrétní kompetence) */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Konkrétní výstupy a znalosti žáka
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {subject.analysis.expectedOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                          ✓
                        </span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Didaktická gradace: Jaké kroky a proč */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-600" />
                    Didaktická posloupnost: Jaké kroky a proč
                  </h3>
                  <div className="space-y-4">
                    {subject.analysis.steps.map((st, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-black text-slate-900">{st.step}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-8">
                          {st.description}
                        </p>
                        <div className="mt-1 ml-8 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                          <strong className="font-bold text-amber-800">Proč právě tento krok: </strong>
                          {st.why}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Hardware & Software zázemí */}
                {(subject.analysis.hardwareRequirements || subject.analysis.softwareStack) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subject.analysis.hardwareRequirements && (
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-purple-600" />
                          Hardwarové zázemí
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {subject.analysis.hardwareRequirements.map((hw, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
                              {hw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {subject.analysis.softwareStack && (
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-600" />
                          Softwarový stack & jazyky
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {subject.analysis.softwareStack.map((sw, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                              {sw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicSubjectHub;
