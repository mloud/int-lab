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
  UtensilsCrossed,
  DollarSign,
  Phone,
  Cake,
  Footprints,
  ShieldAlert,
  Calendar,
  Layers,
  CheckCircle2,
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
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'User':
        return <User className="w-6 h-6 text-indigo-600" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-amber-600" />;
      case 'DollarSign':
        return <DollarSign className="w-6 h-6 text-emerald-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-purple-600" />;
      case 'Phone':
        return <Phone className="w-6 h-6 text-rose-600" />;
      case 'Cake':
        return <Cake className="w-6 h-6 text-pink-600" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6 text-orange-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-teal-600" />;
      default:
        return <CreditCard className="w-6 h-6 text-slate-600" />;
    }
  };

  const isWarning = isEvaluated && isSelected && !card.isNecessary;
  const isCorrect = isEvaluated && isSelected && card.isNecessary;

  return (
    <div className="relative h-48 sm:h-52 w-full select-none" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full transition-transform duration-500 rounded-3xl shadow-sm ${
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
          className={`absolute inset-0 rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 transition-all cursor-pointer [backface-visibility:hidden] ${
            isWarning
              ? 'bg-amber-50 border-amber-400 ring-4 ring-amber-200 shadow-md'
              : isCorrect
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 shadow-sm'
              : isSelected
              ? 'bg-indigo-50 border-indigo-400 shadow-md ring-2 ring-indigo-200'
              : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md'
          }`}
        >
          {/* Horní řádek ikona + štítek */}
          <div className="flex items-start justify-between gap-2">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-xs ${
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
                className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl flex items-center gap-1.5 ${
                  isWarning
                    ? 'bg-amber-200 text-amber-950 animate-pulse'
                    : isCorrect
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isWarning ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-800" />
                    <span>Zbytečný údaj!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>Nutné pro výdej</span>
                  </>
                )}
              </span>
            )}
          </div>

          {/* Název údaje */}
          <div>
            <h4
              className={`text-base sm:text-lg font-black leading-snug ${
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

          {/* Spodní řádek akce / nápovědy */}
          <div className="pt-2 flex items-center justify-between text-sm font-bold border-t border-slate-200/70">
            {isEvaluated ? (
              <span
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-black ${
                  isWarning ? 'text-amber-900' : 'text-emerald-800'
                }`}
              >
                <RotateCw className="w-4 h-4" />
                <span>Klikni pro vysvětlení</span>
              </span>
            ) : isSelected ? (
              <span className="text-indigo-700 flex items-center gap-1.5 text-sm font-black">
                <Check className="w-4 h-4" /> Na kartě
              </span>
            ) : (
              <span className="text-slate-600 text-sm font-black">+ Přidat na kartu</span>
            )}
          </div>
        </div>

        {/* ZADNÍ STRANA KARTIČKY (3D FLIP REFLEXE) */}
        <div
          className={`absolute inset-0 rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
            !card.isNecessary
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 text-amber-950 shadow-xl'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 shadow-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-1 pb-2 mb-2 border-b border-black/10">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                {!card.isNecessary ? '❌ Proč tento údaj nepatří do karty?' : '✓ Proč je tento údaj nutný?'}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleFlip) onToggleFlip();
                }}
                className="p-1.5 rounded-xl hover:bg-black/10 text-slate-700 transition-colors cursor-pointer"
                title="Otočit zpět"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-bold text-slate-800">
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
              className="text-xs sm:text-sm font-black text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
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
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Undo2 className="w-4 h-4" />
                <span>Vrátit zpět</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunchSysFlipCard;
