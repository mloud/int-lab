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
            <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-blue-950 font-semibold leading-relaxed">
                👉 <strong>Úkol:</strong> Kliknutím níže vyberte údaje, o kterých si myslíte, že je
                systém jídelny potřebuje znát. Pozor – v nabídce jsou i zbytečné chytáky!
                <span className="block text-[11px] text-blue-800 font-bold mt-0.5">
                  Až budete mít vybráno, vyčkejte na pokyn učitele a klikněte na Vyhodnotit.
                </span>
              </div>

              <button
                onClick={handleEvaluate}
                disabled={selectedIds.length === 0}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs uppercase tracking-wider font-black rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
              >
                Vyhodnotit výběr
              </button>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs sm:text-sm text-amber-950 font-semibold flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Výsledky výběru:</strong> Oranžově jsou označeny údaje, které systém k výdeji
                obědů <strong>vůbec nepotřebuje</strong>.
                <span className="block text-amber-900 text-xs mt-0.5 font-normal">
                  Klikněte na jakoukoliv oranžovou kartičku – otočí se a vysvětlí, proč tam nepatří.
                  Následně ji tlačítkem „Vrátit zpět“ odeberte z karty.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VELKÁ KARTA: LUNCHSYS KARTA UŽIVATELE */}
      <section className="bg-slate-50 p-6 sm:p-7 rounded-[2.5rem] border-2 border-blue-300 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-blue-200/80">
          <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wide">
            <span className="w-3 h-3 rounded-full bg-[#2B78C5]"></span>
            <span>LUNCHSYS: KARTA UŽIVATELE</span>
            <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              {selectedCards.length} údajů na kartě
            </span>
          </div>

          {isEvaluated && (
            <div className="flex items-center gap-2 text-xs font-bold">
              {selectedUnnecessary.length > 0 ? (
                <span className="text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{selectedUnnecessary.length} zbytečných údajů k odstranění</span>
                </span>
              ) : (
                <span className="text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Žádné zbytečné údaje na kartě!</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mřížka kartiček v kartě */}
        {selectedCards.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-blue-200 rounded-2xl bg-white text-slate-400 text-xs font-medium">
            Karta je zatím prázdná. Kliknutím na kartičky v nabídce níže je sem přidáte.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
          <div className="p-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-9 h-9 text-amber-300 shrink-0" />
              <div>
                <h4 className="text-base font-black">Výborně! Karta uživatele je optimální!</h4>
                <p className="text-xs text-emerald-100 font-medium">
                  Systém má přesně to, co kuchařka k výdeji oběda potřebuje, a neuchovává zbytečné osobní
                  údaje žáků (Zásada minimalizace údajů / ochrana soukromí).
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* NABÍDKA KARTIČEK (ZATÍM NEVYBRANÉ) */}
      <section className="bg-white p-6 sm:p-7 rounded-[2.5rem] border-2 border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              {!isEvaluated
                ? 'Banka nabízených údajů (kliknutím přidejte na kartu)'
                : 'Zbývající údaje mimo kartu'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
            Zbývá: {poolCards.length}
          </span>
        </div>

        {poolCards.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 font-medium">
            Všechny nabízené údaje jsou nyní na kartě.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                        // Během vyhodnocení umožníme žákovi doplnit zapomenutý nutný údaj
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

