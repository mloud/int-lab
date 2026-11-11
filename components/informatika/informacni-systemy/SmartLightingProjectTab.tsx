'use client';
import React from 'react';
import { Lightbulb, Users, FileEdit, Cpu, ListChecks } from 'lucide-react';

export const SmartLightingProjectTab: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto font-sans">
      {/* HLAVNÍ KARTA ZADÁNÍ */}
      <section className="bg-white p-6 sm:p-9 rounded-[2.5rem] border-2 border-slate-200 shadow-xl space-y-6">
        {/* Horní pruh */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">
                Týmová výzva
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Chytré osvětlení pro obec
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Práce ve trojicích</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
              <FileEdit className="w-4 h-4 text-purple-600" />
              <span>Zápis na papír</span>
            </span>
          </div>
        </div>

        {/* Přesné znění zadání */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 sm:p-8 rounded-2xl shadow-xs">
          <p className="text-lg sm:text-xl text-slate-900 font-bold leading-relaxed">
            „Vytvořte ve trojicích vývojářskou firmu. Vaše obec by chtěla chytré osvětlení ulic,
            které by se rozsvěcelo jen tehdy, kdyby pod ním šel člověk nebo jel nějaký dopravní prostředek.
            Zkuste navrhnout, jaké technické prvky tento systém musí mít a jaká pravidla musí v systému fungovat.
            Zkuste tedy popsat, jak by celý systém fungoval a co by k tomu bylo potřeba.“
          </p>
        </div>

        {/* 2 orámované sekce pro práci na papír */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Technické prvky */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-blue-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Technické prvky:
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zapište na papír všechna fyzická zařízení, ze kterých se systém skládá.
            </p>
          </div>

          {/* Pravidla */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Pravidla:
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zapište na papír pravidla a podmínky chování systému.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartLightingProjectTab;
