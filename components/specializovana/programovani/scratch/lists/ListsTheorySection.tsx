"use client";

import React from 'react';
import {
  Database,
  ListPlus,
  Trash2,
  Search,
  Dices,
  Trophy,
  Sparkles,
  ShoppingBag,
  Backpack,
  ShieldCheck,
  Calculator,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchReporter,
  ScratchDefBlock,
  ScratchParam,
  ScratchSpeechBubble
} from '../ScratchBlocks';

export const ListsTheorySection = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <>
      {/* Úvodní výkladový blok – Teorie */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-white mb-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <Database className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Co je to seznam a proč už nám proměnná nestačí?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Doposud jsme používali <strong>proměnné</strong>. Proměnná je jako <em>jedna krabička</em> s popiskem – pojme v danou chvíli pouze
          jednu jedinou hodnotu (např. jedno číslo pro skóre nebo jedno slovo pro jméno hráče). Když do ní uložíme novou hodnotu, původní se přepíše a ztratí.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-4">
            <h4 className="font-black text-amber-900 text-sm uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Proměnná (Běžná krabička)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pojme <strong>pouze 1 položku</strong>. Hodí se na skóre, životy, rychlost nebo aktuální čas.
            </p>
          </div>

          <div className="bg-orange-50/60 border-2 border-orange-200 rounded-2xl p-4">
            <h4 className="font-black text-orange-900 text-sm uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
              Seznam / Pole (Pořadač s přihrádkami)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Může obsahovat <strong>neomezeně mnoho položek</strong> pod jedním jménem. Každá položka má své pevné číslo – <strong>index</strong> (1, 2, 3...).
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-2">
            Kde se seznamy používají v praxi a hrách?
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
            <li><strong>Inventář hráče v RPG:</strong> seznam sebraných předmětů (meč, štít, lektvar, zlaťáky).</li>
            <li><strong>Tabulka nejvyšších skóre (High Scores):</strong> TOP 10 nejlepších výsledků na herním automatu.</li>
            <li><strong>Hrací balíček karet:</strong> tahání karet z balíčku a jejich vyřazování ze seznamu.</li>
            <li><strong>Slovník pro slovní fotbal / Šibenici:</strong> seznam slov, ze kterého počítač náhodně vybírá tajenku.</li>
          </ul>
        </div>

        <div className="pt-2">
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-3">
            Klíčové bloky pro práci se seznamy (Kategorie Proměnné – Seznamy):
          </h4>
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <ScratchBlock category="lists">přidej <ScratchInput type="text">věc</ScratchInput> k <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">smaž <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">vlož <ScratchInput type="text">věc</ScratchInput> na pozici <ScratchInput>1</ScratchInput> v <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchReporter>
            <ScratchReporter category="lists">délka <ScratchInput type="dropdown">seznam</ScratchInput></ScratchReporter>
            <ScratchHexagon category="lists"><ScratchInput type="dropdown">seznam</ScratchInput> obsahuje <ScratchInput type="text">věc</ScratchInput>?</ScratchHexagon>
          </div>
        </div>
      </div>
    </>
  );
};
