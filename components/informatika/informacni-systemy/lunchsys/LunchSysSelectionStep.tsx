'use client';
import React, { useState } from 'react';
import { LunchSysCardItem } from './LunchSysTypes';
import { LUNCHSYS_CARDS } from './lunchSysData';
import { LunchSysFlipCard } from './LunchSysFlipCard';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldCheck,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface LunchSysSelectionStepProps {
  onBackToBrainstorm: () => void;
}

export const LunchSysSelectionStep: React.FC<LunchSysSelectionStepProps> = ({
  onBackToBrainstorm,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);

  // Rozdělení kartiček na vybrané a v nabídce
  const selectedCards = LUNCHSYS_CARDS.filter((c) => selectedIds.includes(c.id));
  const poolCards = LUNCHSYS_CARDS.filter((c) => !selectedIds.includes(c.id));

  // Kontrola správnosti
  const necessaryCards = LUNCHSYS_CARDS.filter((c) => c.isNecessary);
  const unnecessaryCards = LUNCHSYS_CARDS.filter((c) => !c.isNecessary);

  const selectedUnnecessary = selectedCards.filter((c) => !c.isNecessary);
  const selectedNecessary = selectedCards.filter((c) => c.isNecessary);
  const missingNecessary = poolCards.filter((c) => c.isNecessary);

  const isPerfect =
    isEvaluated &&
    selectedUnnecessary.length === 0 &&
    selectedNecessary.length === necessaryCards.length;

  const toggleSelect = (id: string) => {
    if (isEvaluated) return; // Během vyhodnocení se vybírá/vrací přes tlačítka
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFlip = (id: string) => {
    setFlippedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const returnCard = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setFlippedCardIds((prev) => prev.filter((item) => item !== id));
  };

  const handleEvaluate = () => {
    setIsEvaluated(true);
  };

  const handleReset = () => {
    setSelectedIds([]);
    setIsEvaluated(false);
    setFlippedCardIds([]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* HLAVIČKA KROKU */}
      <div className="bg-white p-6 sm:p-7 rounded-[2.5rem] border-2 border-slate-200 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2B78C5] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#2B78C5] block">
                {!isEvaluated ? 'Krok 2 ze 3 · Výběr údajů' : 'Krok 3 ze 3 · Vyhodnocení a rozbor'}
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {!isEvaluated ? 'Sestavte kartu strávníka LunchSys' : 'Rozbor karty a ochrana soukromí'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEvaluated && (
              <button
                onClick={onBackToBrainstorm}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zpět na otázku</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Instrukce */}
        <div className="pt-3">
          {!isEvaluated ? (
            <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-base text-blue-950 font-bold leading-relaxed">
                👉 <strong>Úkol pro vás:</strong> Kliknutím níže vyberte údaje, které systém jídelny nutně potřebuje znát pro výdej oběda. Pozor – v nabídce jsou i zbytečné chytáky!
                <span className="block text-sm text-blue-800 font-semibold mt-1">
                  Až budete mít vybráno, vyčkejte na pokyn učitele a klikněte na Vyhodnotit výběr.
                </span>
              </div>

              <button
                onClick={handleEvaluate}
                disabled={selectedIds.length === 0}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm sm:text-base uppercase tracking-wider font-black rounded-2xl shadow-lg transition-all shrink-0 cursor-pointer"
              >
                Vyhodnotit výběr
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-3xl text-base text-amber-950 font-bold flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Výsledky vyhodnocení:</strong> Oranžově jsou zvýrazněny údaje, které systém k výdeji oběda <strong>vůbec nepotřebuje</strong>.
                <span className="block text-amber-900 text-sm mt-1 font-semibold">
                  Klikněte na oranžovou kartičku – otočí se a vysvětlí důvod. Poté ji tlačítkem „Vrátit zpět“ odeberte z karty strávníka.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HLAVNÍ RÁMEC: ELEKTRONICKÁ KARTA STRÁVNÍKA (VKLÁDACÍ PLOCHA) */}
      <div className="relative pt-2">
        {/* Výřez na šňůrku karty (Lanyard slot) */}
        <div className="w-20 h-2.5 mx-auto bg-slate-300 rounded-full border border-slate-400 mb-2 shadow-inner" />

        <section className="bg-slate-50/90 rounded-[2.3rem] border-3 border-blue-400 shadow-xl overflow-hidden">
          {/* Horní hlavička čipové karty */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                  LUNCHSYS · ŠKOLNÍ JÍDELNA
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-none mt-0.5">
                  Elektronická karta strávníka
                </h3>
              </div>
            </div>

            {/* Počet vložených údajů */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-white bg-white/15 px-3 py-1 rounded-xl border border-white/20">
                {selectedCards.length} údajů na kartě
              </span>
            </div>
          </div>

          {/* Vnitřek karty: Čipová paměť pro vkládání údajů */}
          <div className="p-5 sm:p-7 space-y-4">
            {isEvaluated && (
              <div className="flex items-center gap-2 text-sm font-black pb-2 border-b border-slate-200">
                {selectedUnnecessary.length > 0 ? (
                  <span className="text-amber-900 bg-amber-100 border-2 border-amber-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{selectedUnnecessary.length} zbytečných údajů k odstranění (kliknutím na kartičku zjistíte důvod)</span>
                  </span>
                ) : (
                  <span className="text-emerald-900 bg-emerald-100 border-2 border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Výborně: Žádné zbytečné osobní údaje na kartě!</span>
                  </span>
                )}
              </div>
            )}

            {/* Mřížka kartiček na čipu */}
            {selectedCards.length === 0 ? (
              <div className="p-8 sm:p-10 text-center border-2 border-dashed border-blue-300 rounded-2xl bg-white/80 text-slate-500 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-700">
                  Paměť karty je zatím prázdná
                </p>
                <p className="text-xs text-slate-500 max-w-md">
                  Klikněte na kartičky v zásobníku níže a nahrajte na kartu údaje, které systém nutně potřebuje k výdeji oběda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                {selectedCards.map((card) => (
                  <LunchSysFlipCard
                    key={card.id}
                    card={card}
                    isSelected={true}
                    isEvaluated={isEvaluated}
                    isFlipped={flippedCardIds.includes(card.id)}
                    onToggleSelect={() => toggleSelect(card.id)}
                    onToggleFlip={() => toggleFlip(card.id)}
                    onReturnCard={() => returnCard(card.id)}
                  />
                ))}
              </div>
            )}

            {/* Závěrečný úspěšný stav (všechny oranžové odstraněny a nutné přítomny) */}
            {isPerfect && (
              <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3.5">
                  <ShieldCheck className="w-9 h-9 text-amber-300 shrink-0" />
                  <div>
                    <h4 className="text-base font-black">Výborně! Karta uživatele je optimální!</h4>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
                      Systém má přesně to, co kuchařka k výdeji oběda potřebuje, a neuchovává zbytečné osobní
                      údaje žáků (Zásada minimalizace údajů / ochrana soukromí).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* NABÍDKA KARTIČEK: ZÁSOBNÍK VŠECH DOSTUPNÝCH ÚDAJŮ */}
      <section className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {!isEvaluated
                ? 'Zásobník kartiček (kliknutím vložte na kartu)'
                : 'Zbývající kartičky mimo kartu'}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            V zásobníku: {poolCards.length}
          </span>
        </div>

        {poolCards.length === 0 ? (
          <div className="p-6 text-center text-xs font-bold text-slate-400">
            Všechny nabízené kartičky jsou nyní vloženy na kartě.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
            {poolCards.map((card) => {
              return (
                <div key={card.id} className="relative">
                  <LunchSysFlipCard
                    card={card}
                    isSelected={false}
                    isEvaluated={isEvaluated}
                    isFlipped={flippedCardIds.includes(card.id)}
                    onToggleSelect={() => {
                      if (!isEvaluated) {
                        toggleSelect(card.id);
                      } else if (card.isNecessary) {
                        toggleSelect(card.id);
                      }
                    }}
                    onToggleFlip={() => toggleFlip(card.id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

