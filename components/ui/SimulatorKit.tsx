'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

/* ------------------------------------------------------------------
 * SimulatorKit – sdílené ovládací prvky a rámce pro simulátory.
 * ------------------------------------------------------------------ */

/** Lišta pro krokovací simulátory: titul kroku, vysvětlení a ovládání. */
export const SimStepperBar: React.FC<{
  current: number;          // index kroku (0-based)
  total: number;
  title: string;
  message?: React.ReactNode;
  onPrev?: () => void;
  onNext: () => void;
  onReset: () => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  nextDisabled?: boolean;
}> = ({ current, total, title, message, onPrev, onNext, onReset, isPlaying, onTogglePlay, nextDisabled }) => (
  <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 mb-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex-1 min-w-[240px]">
        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Krok {current + 1} z {total}</div>
        <h3 className="font-black text-indigo-800 uppercase text-sm tracking-widest">{title}</h3>
        {message && <p className="text-indigo-900 font-medium text-sm mt-1 leading-relaxed">{message}</p>}
      </div>
      <div className="flex items-center gap-2">
        {onPrev && (
          <button
            onClick={onPrev}
            disabled={current === 0}
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-all"
            aria-label="Předchozí krok"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {onTogglePlay && (
          <button onClick={onTogglePlay} className="p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all" aria-label="Přehrát / pozastavit">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider text-xs disabled:opacity-40 transition-all"
        >
          Další krok <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 uppercase tracking-wider text-xs transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  </div>
);

type WindowVariant = 'win11' | 'cmd' | 'powershell' | 'explorer';

const WINDOW_STYLES: Record<WindowVariant, { header: string; body: string; text: string }> = {
  win11: { header: 'bg-[#0078D7] text-white', body: 'bg-white', text: 'text-gray-800' },
  explorer: { header: 'bg-slate-100 text-slate-700 border-b border-slate-200', body: 'bg-white', text: 'text-gray-800' },
  cmd: { header: 'bg-slate-800 text-slate-200', body: 'bg-black', text: 'text-slate-200 font-mono' },
  powershell: { header: 'bg-blue-900 text-blue-100', body: 'bg-[#012456]', text: 'text-slate-100 font-mono' },
};

/** Rámec okna operačního systému (titulková lišta + tělo). */
export const OsWindowFrame: React.FC<{
  title: string;
  variant?: WindowVariant;
  className?: string;
  children: React.ReactNode;
}> = ({ title, variant = 'win11', className = '', children }) => {
  const s = WINDOW_STYLES[variant];
  return (
    <div className={`w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col ${className}`}>
      <div className={`${s.header} px-4 py-2 flex justify-between items-center text-sm`}>
        <span>{title}</span>
        <div className="flex gap-4 opacity-70 select-none">
          <span>_</span><span>□</span><span>✕</span>
        </div>
      </div>
      <div className={`${s.body} ${s.text} flex-1 p-6`}>{children}</div>
    </div>
  );
};

/** Grafický ukazatel (CPU/RAM, podíl na trhu, zaplnění disku…). */
export const StatProgressBar: React.FC<{
  label: string;
  value: number;
  max?: number;
  /** Plná Tailwind třída barvy výplně, např. 'bg-emerald-500'. */
  color?: string;
  suffix?: string;
}> = ({ label, value, max = 100, color = 'bg-indigo-500', suffix = '%' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span>{value}{suffix}</span>
      </div>
      <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

