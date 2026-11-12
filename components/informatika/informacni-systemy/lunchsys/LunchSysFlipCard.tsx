'use client';
import React from 'react';
import { LunchSysCardItem } from './LunchSysTypes';
import {
  User,
  GraduationCap,
  CreditCard,
  Utensils,
  CheckCircle2,
  Wallet,
  ShieldAlert,
  Home,
  Award,
  Phone,
  Users,
  RotateCw,
  X,
  AlertTriangle,
  Check,
  Undo2,
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
        return <User className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Phone':
        return <Phone className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const isWarning = isEvaluated && isSelected && !card.isNecessary;
  const isCorrect = isEvaluated && isSelected && card.isNecessary;

  return (
    <div className="relative h-44 w-full select-none" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full transition-transform duration-500 rounded-2xl shadow-sm ${
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
          className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border-2 transition-all cursor-pointer [backface-visibility:hidden] ${
            isWarning
              ? 'bg-amber-50/90 border-amber-400 ring-4 ring-amber-200/80 shadow-md'
              : isCorrect
              ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-200 shadow-xs'
              : isSelected
              ? 'bg-indigo-50 border-indigo-400 shadow-sm'
              : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
          }`}
        >
          {/* Horní řádek ikona + štítek */}
          <div className="flex items-start justify-between gap-2">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                isWarning
                  ? 'bg-amber-200 text-amber-900'
                  : isCorrect
                  ? 'bg-emerald-200 text-emerald-900'
                  : isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {getIcon()}
            </div>

            {isEvaluated && (
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  isWarning
                    ? 'bg-amber-200 text-amber-950 animate-pulse'
                    : isCorrect
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isWarning ? (
                  <>
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    <span>Zbytečný údaj!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3 text-emerald-700" />
                    <span>Nutné pro výdej</span>
                  </>
                )}
              </span>
            )}
          </div>

          {/* Název údaje */}
          <div>
            <h4
              className={`text-sm font-black leading-snug ${
                isWarning
                  ? 'text-amber-950'
                  : isCorrect
                  ? 'text-emerald-950'
                  : isSelected
                  ? 'text-indigo-950'
                  : 'text-slate-800'
              }`}
            >
              {card.title}
            </h4>
          </div>

          {/* Spodní řádek akce / nápovědy */}
          <div className="pt-1 flex items-center justify-between text-xs font-bold border-t border-slate-200/60">
            {isEvaluated ? (
              <span
                className={`flex items-center gap-1 text-[11px] font-black ${
                  isWarning ? 'text-amber-800' : 'text-emerald-700'
                }`}
              >
                <RotateCw className="w-3 h-3" />
                <span>Klikni pro vysvětlení</span>
              </span>
            ) : isSelected ? (
              <span className="text-indigo-700 flex items-center gap-1 text-xs">
                <Check className="w-3.5 h-3.5" /> Na kartě
              </span>
            ) : (
              <span className="text-slate-500 text-xs">+ Přidat na kartu</span>
            )}
          </div>
        </div>

        {/* ZADNÍ STRANA KARTIČKY (3D FLIP REFLEXE) */}
        <div
          className={`absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border-2 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
            !card.isNecessary
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 text-amber-950 shadow-lg'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 shadow-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-1 pb-1 mb-1 border-b border-black/10">
              <span className="text-[10px] font-black uppercase tracking-wider">
                {!card.isNecessary ? '❌ Proč tento údaj nepatří do karty?' : '✓ Proč je tento údaj nutný?'}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleFlip) onToggleFlip();
                }}
                className="p-1 rounded-lg hover:bg-black/5 text-slate-600 transition-colors cursor-pointer"
                title="Otočit zpět"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] leading-relaxed font-semibold">
              {!card.isNecessary ? card.whyNo : card.whyYes}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-black/10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleFlip) onToggleFlip();
              }}
              className="text-[10px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
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
                <span>Vrátit zpět</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

