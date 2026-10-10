import React from 'react';
import { Folder } from 'lucide-react';

export interface TechnicalCardProps {
  id?: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  actionLabel?: string;
  onClick: () => void;
  accentCorner?: boolean;
  variant?: 'default' | 'filled';
  className?: string;
}

export const TechnicalCard: React.FC<TechnicalCardProps> = ({
  id,
  tag,
  title,
  description,
  icon: Icon,
  gradient,
  actionLabel = 'Otevřít kapitolu',
  onClick,
  accentCorner = false,
  variant = 'default',
  className = ''
}) => {
  const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
  const isFilled = variant === 'filled';

  return (
    <div
      id={id}
      className={`relative group ${
        isFilled
          ? `p-6 bg-gradient-to-br ${gradient} text-white rounded-3xl border-2 border-white/20 min-h-[240px] max-w-[320px] w-full shadow-xl hover:shadow-2xl hover:scale-[1.02]`
          : 'p-6 bg-white rounded-3xl border-2 border-slate-100 text-slate-800 min-h-[260px] shadow-md hover:shadow-xl'
      } flex flex-col items-center text-center justify-between transition-all overflow-hidden ${className}`}
    >
      {/* Horní pravý roh: Technický #tag */}
      <div
        className={`absolute font-mono font-bold uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm transition-colors ${
          isFilled
            ? 'top-3 right-3.5 text-[10px] text-white/90 bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-md group-hover:bg-white/30'
            : 'top-3.5 right-4 text-[10px] text-slate-400 bg-slate-50/90 border border-slate-100 px-2 py-0.5 rounded-md group-hover:bg-slate-100 group-hover:text-slate-600'
        }`}
      >
        #{cleanTag}
      </div>

      {/* Jednoduchá ikona složky v rohu pro kapitoly s podkapitolami */}
      {accentCorner && !isFilled && (
        <div
          title="Tato kapitola obsahuje podkapitoly"
          className="absolute top-3.5 left-4 p-1 rounded-md text-slate-400 bg-slate-50/90 border border-slate-100 shadow-sm z-10 backdrop-blur-sm group-hover:bg-slate-100 group-hover:text-slate-700 transition-colors flex items-center justify-center"
        >
          <Folder className="w-3.5 h-3.5" />
        </div>
      )}

      {/* Střední obsah: Ikona, nadpis a popisek */}
      <div className="flex flex-col items-center mt-2 z-10 relative flex-1 w-full">
        <div
          className={`${
            isFilled
              ? 'w-14 h-14 bg-white/20 border border-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'
              : `w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`
          }`}
        >
          <Icon className={`${isFilled ? 'w-7 h-7 text-white drop-shadow' : 'w-7 h-7 text-white'}`} />
        </div>
        
        <h3
          className={`font-black uppercase tracking-wide leading-snug px-2 ${
            isFilled ? 'text-white text-base mb-1.5 drop-shadow-sm' : 'text-slate-800 text-sm mb-2'
          }`}
        >
          {title}
        </h3>
        
        <p
          className={`font-medium max-w-[95%] ${
            isFilled ? 'text-white/90 text-xs leading-relaxed drop-shadow-sm' : 'text-slate-500 text-xs leading-relaxed'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Spodní akční tlačítko */}
      <button
        onClick={onClick}
        type="button"
        className={`font-bold uppercase tracking-wider transition-all relative z-20 w-full ${
          isFilled
            ? 'mt-4 px-4 py-2.5 text-xs rounded-xl bg-white text-slate-900 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 shadow-lg font-black'
            : `mt-5 px-4 py-2.5 text-xs rounded-xl bg-gradient-to-r ${gradient} text-white hover:scale-[1.02] active:scale-95 opacity-90 group-hover:opacity-100 hover:shadow-lg`
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default TechnicalCard;
