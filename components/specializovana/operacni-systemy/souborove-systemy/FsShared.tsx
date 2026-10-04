'use client';
import React from 'react';
import { ArrowLeft, Info, AlertTriangle, Lightbulb, CheckCircle2, ExternalLink } from 'lucide-react';

/* ------------------------------------------------------------------
 * Sdílené stavební bloky pro kapitolu „Souborový systém a disky“.
 * Vychází ze stejného vizuálního jazyka jako ostatní kapitoly OS
 * (bílé karty rounded-3xl, sticky přepínač záložek, tlačítko Zpět),
 * ale s větším písmem, aby se stránky daly promítat na projektoru.
 * ------------------------------------------------------------------ */

export type Tone = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple' | 'slate' | 'teal';

export const toneClasses: Record<Tone, { bg: string; border: string; text: string; strong: string; icon: string; solid: string }> = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', strong: 'text-indigo-700', icon: 'text-indigo-500', solid: 'bg-indigo-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', strong: 'text-emerald-700', icon: 'text-emerald-500', solid: 'bg-emerald-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', strong: 'text-amber-700', icon: 'text-amber-500', solid: 'bg-amber-500' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900', strong: 'text-rose-700', icon: 'text-rose-500', solid: 'bg-rose-600' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-900', strong: 'text-sky-700', icon: 'text-sky-500', solid: 'bg-sky-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', strong: 'text-purple-700', icon: 'text-purple-500', solid: 'bg-purple-600' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800', strong: 'text-slate-700', icon: 'text-slate-500', solid: 'bg-slate-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-900', strong: 'text-teal-700', icon: 'text-teal-500', solid: 'bg-teal-600' },
};

export interface FsTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface FsChapterShellProps {
  chapterNumber: number;
  title: string;
  highlight: string;
  subtitle: string;
  tabs: FsTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onBack: () => void;
  children: React.ReactNode;
}

/** Obal podkapitoly: tlačítko zpět, režim projektoru, hlavička a přepínač záložek. */
export const FsChapterShell: React.FC<FsChapterShellProps> = ({
  chapterNumber, title, highlight, subtitle, tabs, activeTab, onTabChange, onBack, children,
}) => {
  return (
    <div className="max-w-6xl w-full min-h-screen p-4 flex flex-col items-center animate-in fade-in duration-500 mx-auto">
      <div className="w-full flex flex-col gap-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-slate-100 uppercase tracking-wider text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Zpět na rozcestník
          </button>
        </div>

        <header className="text-center py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-black uppercase tracking-[0.2em] text-xs mb-4">
            Kapitola {chapterNumber} / 4
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-[1.05]">
            {title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">{highlight}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </header>

        <nav className="bg-white/90 backdrop-blur p-2 rounded-2xl flex shadow-sm border border-slate-200 sticky top-20 z-30 overflow-x-auto gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`fs-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${active ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Icon className="w-6 h-6" /> {tab.label}
              </button>
            );
          })}
        </nav>

        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
          <div className="bg-white/80 backdrop-blur-xl w-full rounded-[3rem] shadow-2xl border-4 border-white p-8 sm:p-12 overflow-hidden relative min-h-[600px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TheoryCardProps {
  letter?: string;
  icon: React.ElementType;
  title: string;
  tone?: Tone;
  children: React.ReactNode;
  id?: string;
}

/** Velká teoretická karta – základní blok výkladu. */
export const TheoryCard: React.FC<TheoryCardProps> = ({ letter, icon: Icon, title, tone = 'indigo', children, id }) => (
  <section id={id} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 scroll-mt-40">
    <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-3 leading-tight">
      <span className={`w-12 h-12 rounded-xl ${toneClasses[tone].bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-6 h-6 ${toneClasses[tone].icon}`} />
      </span>
      <span>{letter && <span className="text-slate-300 mr-2">{letter}.</span>}{title}</span>
    </h2>
    <div className="text-sm text-slate-600 leading-relaxed space-y-4">{children}</div>
  </section>
);

interface CalloutProps {
  kind?: 'info' | 'warning' | 'tip' | 'key';
  title: string;
  children: React.ReactNode;
}

/** Zvýrazněný rámeček (definice, pozor, tip). */
export const Callout: React.FC<CalloutProps> = ({ kind = 'info', title, children }) => {
  const map = {
    info: { tone: toneClasses.sky, Icon: Info },
    warning: { tone: toneClasses.amber, Icon: AlertTriangle },
    tip: { tone: toneClasses.emerald, Icon: Lightbulb },
    key: { tone: toneClasses.purple, Icon: CheckCircle2 },
  }[kind];
  const { Icon } = map;
  return (
    <div className={`${map.tone.bg} border-l-8 ${map.tone.border} p-6 rounded-r-2xl`}>
      <h4 className={`font-bold ${map.tone.strong} text-sm uppercase tracking-wider mb-2 flex items-center gap-2`}>
        <Icon className="w-5 h-5" /> {title}
      </h4>
      <div className={`${map.tone.text} text-sm leading-relaxed`}>{children}</div>
    </div>
  );
};

/** Pojem + vysvětlení v mřížce. */
export const TermCard: React.FC<{ term: string; tone?: Tone; children: React.ReactNode; icon?: React.ElementType }> = ({ term, tone = 'slate', children, icon: Icon }) => (
  <div className={`${toneClasses[tone].bg} border-2 ${toneClasses[tone].border} p-5 rounded-2xl h-full`}>
    <h3 className={`font-bold ${toneClasses[tone].strong} text-lg mb-2 flex items-center gap-2`}>
      {Icon && <Icon className="w-5 h-5" />} {term}
    </h3>
    <div className={`${toneClasses[tone].text} text-sm leading-relaxed`}>{children}</div>
  </div>
);

const hoverBorder: Record<Tone, string> = {
  indigo: 'hover:border-indigo-200', emerald: 'hover:border-emerald-200', amber: 'hover:border-amber-200', rose: 'hover:border-rose-200',
  sky: 'hover:border-sky-200', purple: 'hover:border-purple-200', slate: 'hover:border-slate-200', teal: 'hover:border-teal-200',
};

/** Odkaz na samostatnou procvičovací hru (už existující simulátory portálu). */
export const PracticeLink: React.FC<{ tag: string; title: string; desc: string; icon: React.ElementType; tone: Tone; onClick: () => void }> = ({ tag, title, desc, icon: Icon, tone, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative text-left p-6 bg-white border-4 border-slate-50 ${hoverBorder[tone]} rounded-[2rem] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex gap-5 items-start w-full`}
  >
    <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest">#{tag}</div>
    <div className={`w-14 h-14 ${toneClasses[tone].bg} rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform`}>
      <Icon className={`w-7 h-7 ${toneClasses[tone].icon}`} />
    </div>
    <div className="flex-1 pr-10">
      <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-1">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
        Spustit hru <ExternalLink className="w-4 h-4" />
      </span>
    </div>
  </button>
);

/** Formátování velikosti v bajtech do čitelné podoby (binární násobky). */
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toLocaleString('cs-CZ', { maximumFractionDigits: v < 10 ? 2 : 1 })} ${units[i]}`;
};

export interface RevealQuestion {
  q: string;
  a: React.ReactNode;
}

export const RevealQuestions: React.FC<{ questions: RevealQuestion[] }> = ({ questions }) => {
  const [revealed, setRevealed] = React.useState<Record<number, boolean>>({});

  const toggle = (i: number) => setRevealed(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 mt-8 mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
        <Info className="w-6 h-6 text-slate-400" />
        Opakovací otázky
      </h2>
      <div className="space-y-3">
        {questions.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-bold text-slate-700 text-sm md:text-base pr-4">{item.q}</span>
              <span className={`text-slate-400 font-bold text-xl transition-transform duration-300 flex-shrink-0 ${revealed[i] ? 'rotate-180 text-indigo-500' : ''}`}>
                {revealed[i] ? '−' : '+'}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${revealed[i] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
