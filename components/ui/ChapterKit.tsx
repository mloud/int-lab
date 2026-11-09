'use client';
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Tone, toneClasses, TermCard } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

/* ------------------------------------------------------------------
 * ChapterKit – globální stavebnice pro výklad a teorii.
 * Základní bloky (shell, TheoryCard, Callout, TermCard, PracticeLink,
 * RevealQuestions) žijí ve FsShared.tsx a jsou zde pouze re-exportovány
 * pod jedním vstupním bodem, aby nevznikaly duplikáty.
 * ------------------------------------------------------------------ */

export {
  FsChapterShell as ChapterShell,
  TheoryCard,
  Callout,
  TermCard,
  PracticeLink,
  RevealQuestions,
  formatBytes,
  toneClasses,
} from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
export type { Tone, FsTab as ChapterTab, RevealQuestion } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

/** Inline formátování: `kód` ➔ <code>, **text** ➔ <strong>. */
export const renderInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[0.85em]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

/* ---------------------------- TermGrid ---------------------------- */

export interface TermItem {
  term: string;
  description: React.ReactNode;
  tone?: Tone;
  icon?: React.ElementType;
}

/** Mřížka klíčových pojmů generovaná z dat. */
export const TermGrid: React.FC<{ terms: TermItem[]; columns?: 2 | 3 }> = ({ terms, columns = 2 }) => (
  <div className={`grid grid-cols-1 ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
    {terms.map(t => (
      <TermCard key={t.term} term={t.term} tone={t.tone} icon={t.icon}>{t.description}</TermCard>
    ))}
  </div>
);

/* ------------------------- ComparisonGrid ------------------------- */

export interface ComparisonItem {
  title: string;
  subtitle?: string;
  tone?: Tone;
  icon?: React.ElementType;
  description?: React.ReactNode;
  pros?: string[];
  cons?: string[];
}

/** Srovnání 2–3 pojmů vedle sebe (HDD vs. SSD, Monolit vs. Mikrojádro…). */
export const ComparisonGrid: React.FC<{ items: ComparisonItem[] }> = ({ items }) => (
  <div className={`grid grid-cols-1 ${items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
    {items.map(item => {
      const tone = toneClasses[item.tone ?? 'slate'];
      const Icon = item.icon;
      return (
        <div key={item.title} className={`${tone.bg} border-2 ${tone.border} rounded-2xl p-5 flex flex-col gap-3 h-full`}>
          <div>
            <h3 className={`text-xl font-black ${tone.strong} flex items-center gap-2 tracking-tight`}>
              {Icon && <Icon className="w-5 h-5" />} {item.title}
            </h3>
            {item.subtitle && <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{item.subtitle}</p>}
          </div>
          {item.description && <div className={`${tone.text} text-sm leading-relaxed`}>{item.description}</div>}
          {item.pros && item.pros.length > 0 && (
            <ul className="space-y-1.5 text-sm text-slate-700">
              {item.pros.map(p => (
                <li key={p} className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> {p}</li>
              ))}
            </ul>
          )}
          {item.cons && item.cons.length > 0 && (
            <ul className="space-y-1.5 text-sm text-slate-700">
              {item.cons.map(c => (
                <li key={c} className="flex gap-2 items-start"><XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> {c}</li>
              ))}
            </ul>
          )}
        </div>
      );
    })}
  </div>
);

/* ---------------------------- StepFlow ---------------------------- */

export interface FlowStep {
  title: string;
  description?: React.ReactNode;
  icon?: React.ElementType;
}

/** Očíslovaný procesní diagram (bootování, překlad kódu, fáze kontroly…). */
export const StepFlow: React.FC<{ steps: FlowStep[]; tone?: Tone }> = ({ steps, tone = 'indigo' }) => {
  const t = toneClasses[tone];
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="flex gap-4 items-start">
            <span className={`w-10 h-10 rounded-full ${t.solid} text-white font-black flex items-center justify-center shrink-0 shadow-sm`}>
              {Icon ? <Icon className="w-5 h-5" /> : i + 1}
            </span>
            <div className={`flex-1 ${t.bg} border ${t.border} rounded-2xl px-4 py-3`}>
              <div className={`font-black ${t.strong}`}>{step.title}</div>
              {step.description && <div className={`${t.text} text-sm leading-relaxed mt-1`}>{step.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

