import React from 'react';
import { LucideIcon, BookOpen } from 'lucide-react';

export interface DefinitionCardProps {
  title?: string;
  term: string;
  definition: React.ReactNode;
  note?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Jednotná komponenta pro klíčové definice v kapitolách portálu IntLab.
 * Čistý bílý reprezentativní rámeček se střídmou typografií a ikonou.
 */
export const DefinitionCard: React.FC<DefinitionCardProps> = ({
  title = 'Základní definice',
  term,
  definition,
  note,
  icon: Icon = BookOpen,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-3xl p-5 sm:p-6 shadow-md border-4 border-slate-200 relative ${className}`}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
            {title}
          </span>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed">
            <strong className="font-black text-slate-950">{term}</strong> {definition}
          </p>
          {note && (
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed pt-2 border-t border-slate-100">
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefinitionCard;
