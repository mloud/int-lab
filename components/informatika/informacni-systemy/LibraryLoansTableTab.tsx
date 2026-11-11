'use client';
import React from 'react';
import { Table, Users, FileEdit } from 'lucide-react';

export const LibraryLoansTableTab: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto font-sans">
      {/* HLAVNÍ KARTA ZADÁNÍ */}
      <section className="bg-white p-6 sm:p-9 rounded-[2.5rem] border-2 border-slate-200 shadow-xl space-y-6">
        {/* Horní pruh */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">
                Tvorba databáze
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Navrhni tabulku: [ VÝPŮJČKY ]
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Samostatně nebo ve dvojicích</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
              <FileEdit className="w-4 h-4 text-purple-600" />
              <span>Zápis na papír / do sešitu</span>
            </span>
          </div>
        </div>

        {/* Úvodní příběh a zadání */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-2">
          <p className="text-base sm:text-lg text-slate-900 font-bold leading-relaxed">
            „Představte si, že městská nebo školní knihovna ruší staré papírové kartičky v šuplících
            a zavádí moderní počítačový systém. Knihovnice potřebuje databázovou tabulku{' '}
            <strong className="text-indigo-900 font-black">[ VÝPŮJČKY ]</strong>, kam se při každém
            zapůjčení knihy zaznamená jeden nový řádek.“
          </p>
          <p className="text-xs sm:text-sm text-indigo-950/80 font-medium pt-1">
            Zkuste na papír navrhnout, jaké sloupce tato tabulka musí obsahovat.
          </p>
        </div>

        {/* Náčrt struktury tabulky pro překreslení na papír */}
        <div className="pt-2 space-y-3">
          <div className="overflow-x-auto rounded-2xl border-2 border-dashed border-slate-300 p-4 bg-slate-50/60">
            <table className="w-full text-center border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 font-black text-slate-700 bg-white">
                  <th className="p-3 border-r border-slate-200 text-indigo-900">[ Sloupec 1 ]</th>
                  <th className="p-3 border-r border-slate-200 text-indigo-900">[ Sloupec 2 ]</th>
                  <th className="p-3 border-r border-slate-200 text-indigo-900">[ Sloupec 3 ]</th>
                  <th className="p-3 text-slate-400 font-bold tracking-widest">...</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-400 font-mono text-xs">
                <tr className="bg-white/70">
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 font-bold tracking-widest">...</td>
                </tr>
                <tr className="bg-white/40">
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 border-r border-slate-200">...</td>
                  <td className="p-4 font-bold tracking-widest">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibraryLoansTableTab;
