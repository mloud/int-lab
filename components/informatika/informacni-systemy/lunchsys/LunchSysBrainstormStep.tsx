'use client';
import React from 'react';
import { Utensils, Sparkles, ArrowRight, Lightbulb, CreditCard } from 'lucide-react';

interface LunchSysBrainstormStepProps {
  onNextStep: () => void;
}

export const LunchSysBrainstormStep: React.FC<LunchSysBrainstormStepProps> = ({ onNextStep }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] border-2 border-slate-200 shadow-xl space-y-7">
        {/* Horní hlavička kroku */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 block">
                Krok 1 ze 3 · Brainstorming
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Školní jídelna a čip na obědy
              </h2>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Společná úvaha / zápis do sešitu</span>
          </span>
        </div>

        {/* Reálná situace z učebnice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-3">
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            Když si jdete do jídelny pro oběd, musíte pro výdej <strong>přiložit kartu nebo čip ke čtečce</strong>.
            Ta pípnutím zaznamená, že jste oběd dostali, případně kuchařce ukáže který, když máte na výběr ze dvou jídel.
          </p>
        </div>

        {/* Hlavní badatelská otázka */}
        <div className="text-center py-4 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Otázka k zamyšlení
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight max-w-2xl mx-auto leading-snug">
            „Jaké údaje o uživateli podle vás obědový systém asi sbírá a potřebuje?“
          </h3>
          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Zkuste si na chvíli představit, co všechno musí systém o strávníkovi vědět, aby oběd v pořádku vydal.
          </p>
        </div>

        {/* Vizuální prázdná karta z učebnice: LUNCHSYS: KARTA UŽIVATELE */}
        <div className="max-w-xl mx-auto bg-slate-50 rounded-3xl border-2 border-blue-300 shadow-md overflow-hidden">
          <div className="bg-[#2B78C5] text-white py-3 px-5 text-center font-black tracking-wider text-sm sm:text-base flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>LUNCHSYS: KARTA UŽIVATELE</span>
          </div>
          <div className="p-8 sm:p-12 text-center text-slate-400 font-bold border-2 border-dashed border-blue-200/80 m-4 rounded-2xl bg-white flex flex-col items-center justify-center min-h-[160px]">
            <Sparkles className="w-8 h-8 text-blue-300 mb-2" />
            <span className="text-sm text-slate-500 font-semibold">
              Zatím prázdná karta... Co všechno by na ní mělo být?
            </span>
          </div>
        </div>

        {/* Tlačítko pro přechod na Krok 2 */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNextStep}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Pokračovat k výběru údajů</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

