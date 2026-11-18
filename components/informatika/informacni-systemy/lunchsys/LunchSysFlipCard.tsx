'use client';
import React from 'react';
import { LunchSysCardItem } from './LunchSysTypes';
import {
  RotateCw,
  AlertTriangle,
  Check,
  Undo2,
  X,
  CreditCard,
  User,
  Utensils,
  Wallet,
  Phone,
  ShieldAlert,
  CheckCircle2,
  GraduationCap,
  Home,
  Award,
  Users,
} from 'lucide-react';

interface LunchSysFlipCardProps {
  card: LunchSysCardItem;
  isSelected: boolean;
  isEvaluated: boolean;
  isFlipped: boolean;
  onToggleSelect?: () => void;
  onToggleFlip?: () => void;
  onReturnCard?: () => void;
}

export const LunchSysFlipCard: React.FC<LunchSysFlipCardProps> = ({
  card,
  isSelected,
  isEvaluated,
  isFlipped,
  onToggleSelect,
  onToggleFlip,
  onReturnCard,
}) => {
  const getIcon = () => {
    switch (card.iconName) {
      case 'User':
        return <User className="w-4.5 h-4.5 text-indigo-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4.5 h-4.5 text-blue-600" />;
      case 'CreditCard':
        return <CreditCard className="w-4.5 h-4.5 text-sky-600" />;
      case 'Utensils':
        return <Utensils className="w-4.5 h-4.5 text-amber-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />;
      case 'Wallet':
        return <Wallet className="w-4.5 h-4.5 text-teal-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4.5 h-4.5 text-rose-600" />;
      case 'Home':
        return <Home className="w-4.5 h-4.5 text-purple-600" />;
      case 'Award':
        return <Award className="w-4.5 h-4.5 text-orange-600" />;
      case 'Phone':
        return <Phone className="w-4.5 h-4.5 text-pink-600" />;
      case 'Users':
        return <Users className="w-4.5 h-4.5 text-cyan-600" />;
      default:
        return <CreditCard className="w-4.5 h-4.5 text-slate-600" />;
    }
  };

  const isWarning = isEvaluated && isSelected && !card.isNecessary;
  const isCorrect = isEvaluated && isSelected && card.isNecessary;

  return (
    <div className="relative h-36 sm:h-38 w-full select-none" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full transition-transform duration-500 rounded-2xl shadow-xs ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* PŘEDNÍ STRANA KARTIČKY */}
        <div
          onClick={() => {
            if (isEvaluated) {
              if (onToggleFlip) onToggleFlip();
            } else {
              if (onToggleSelect) onToggleSelect();
            }
          }}
          className={`absolute inset-0 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border-2 transition-all cursor-pointer [backface-visibility:hidden] hover:-translate-y-0.5 hover:shadow-md ${
            isWarning
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-sm'
              : isCorrect
              ? 'bg-emerald-50/90 border-emerald-400 ring-1 ring-emerald-200'
              : isSelected
              ? 'bg-indigo-50/90 border-indigo-400 shadow-xs ring-1 ring-indigo-200'
              : 'bg-white border-slate-200 hover:border-indigo-400'
          }`}
        >
          {/* Horní řádek: Ikona + vyhodnocení stavu */}
          <div className="flex items-center justify-between gap-1.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs ${
                isWarning
                  ? 'bg-amber-200 text-amber-950'
                  : isCorrect
                  ? 'bg-emerald-200 text-emerald-950'
                  : isSelected
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {getIcon()}
            </div>

            {isEvaluated && (
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  isWarning
                    ? 'bg-amber-200 text-amber-950 animate-pulse'
                    : isCorrect
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isWarning ? (
                  <>
                    <AlertTriangle className="w-3 h-3 text-amber-900" />
                    <span>Zbytečné!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-900" />
                    <span>Nutné</span>
                  </>
                )}
              </span>
            )}
          </div>

          {/* Název údaje na kartičce */}
          <div className="my-auto py-1">
            <h4
              className={`text-xs sm:text-sm font-black leading-snug ${
                isWarning
                  ? 'text-amber-950'
                  : isCorrect
                  ? 'text-emerald-950'
                  : isSelected
                  ? 'text-indigo-950'
                  : 'text-slate-900'
              }`}
            >
              {card.title}
            </h4>
          </div>

          {/* Spodní řádek: Akce kartičky */}
          <div className="pt-1.5 flex items-center justify-between text-xs font-bold border-t border-slate-200/60">
            {isEvaluated ? (
              <span
                className={`flex items-center gap-1 text-[11px] font-black ${
                  isWarning ? 'text-amber-900' : 'text-emerald-800'
                }`}
              >
                <RotateCw className="w-3 h-3" />
                <span>Otočit pro důvod</span>
              </span>
            ) : isSelected ? (
              <span className="text-indigo-700 flex items-center gap-1 text-[11px] font-black">
                <Check className="w-3 h-3" /> Na kartě
              </span>
            ) : (
              <span className="text-slate-600 text-[11px] font-bold hover:text-indigo-700">
                + Přidat na kartu
              </span>
            )}
          </div>
        </div>

        {/* ZADNÍ STRANA KARTIČKY (3D FLIP REFLEXE) */}
        <div
          className={`absolute inset-0 rounded-2xl p-3.5 flex flex-col justify-between border-2 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
            !card.isNecessary
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 text-amber-950 shadow-md'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-1 pb-1 mb-1 border-b border-black/10">
              <span className="text-[10px] font-black uppercase tracking-wider truncate">
                {!card.isNecessary ? '❌ Zbytečný údaj' : '✓ Nutný údaj'}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleFlip) onToggleFlip();
                }}
                className="p-1 rounded-lg hover:bg-black/10 text-slate-700 transition-colors cursor-pointer"
                title="Otočit zpět"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] sm:text-xs leading-snug font-semibold text-slate-800 line-clamp-4">
              {!card.isNecessary ? card.whyNo : card.whyYes}
            </p>
          </div>

          <div className="pt-1.5 flex items-center justify-between gap-1.5 border-t border-black/10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleFlip) onToggleFlip();
              }}
              className="text-[11px] font-black text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>Otočit</span>
            </button>

            {/* Tlačítko pro vrácení oranžové kartičky */}
            {isWarning && onReturnCard && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReturnCard();
                }}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <Undo2 className="w-3 h-3" />
                <span>Vrátit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunchSysFlipCard;
