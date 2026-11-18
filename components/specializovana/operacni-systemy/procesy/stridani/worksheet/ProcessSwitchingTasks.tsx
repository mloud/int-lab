'use client';

import React from 'react';
import {
  Activity, MousePointer
} from 'lucide-react';
import { ProcessSwitchingWorksheetAnswers, ProcessSwitchingCheckedItems } from '../ProcessSwitchingTypes';

export interface ProcessSwitchingSectionProps {
  answers: ProcessSwitchingWorksheetAnswers;
  checkedItems: ProcessSwitchingCheckedItems;
  handleAnswerChange: (key: string, value: string) => void;
  handleCheckChange: (key: string) => void;
}

export const ProcessSwitchingTasks: React.FC<ProcessSwitchingSectionProps> = ({
  answers,
  handleAnswerChange,
}) => {
  return (
    <div className="space-y-6">
      {/* =========================================================================
          ÚKOL 1: Váš procesor a jádra (Správce úloh)
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
            1
          </span>
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Úkol 1: Parametry vašeho CPU (Správce úloh)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Stiskněte <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 border rounded text-slate-800">Ctrl + Shift + Esc</kbd> ➔ vlevo <strong>Výkon</strong> ➔ <strong>Procesor</strong>.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-2.5 w-1/2">Parametr</th>
                <th className="p-2.5 w-1/2">Hodnota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Typ a model CPU</td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t1_cpu_model'] || ''}
                    onChange={(e) => handleAnswerChange('t1_cpu_model', e.target.value)}
                    placeholder="např. AMD Ryzen 5 5600X / Intel Core i5-12400"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-blue-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">
                  Počet logických procesorů CPU (hardwarových vláken)
                  <span className="block text-[10px] font-normal text-slate-400">kolik úloh zvládne procesor počítat skutečně současně</span>
                </td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t1_cpu_threads'] || ''}
                    onChange={(e) => handleAnswerChange('t1_cpu_threads', e.target.value)}
                    placeholder="např. 12 nebo 16"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-blue-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">
                  Celkový počet běžících vláken v systému (Threads)
                  <span className="block text-[10px] font-normal text-slate-400">odečtěte ze stavového řádku Správce úloh dole (údaj Vlákna)</span>
                </td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t1_system_threads'] || ''}
                    onChange={(e) => handleAnswerChange('t1_system_threads', e.target.value)}
                    placeholder="např. 3 450"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-blue-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-blue-50/60">
                <td className="p-2.5 font-bold text-blue-900">
                  Výpočet: Průměrný počet vláken na 1 logické jádro CPU
                  <span className="block text-[10px] font-normal text-blue-700">Vzorec: (Celkový počet vláken v systému) ÷ (Počet logických procesorů CPU)</span>
                </td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t1_threads_per_core'] || ''}
                    onChange={(e) => handleAnswerChange('t1_threads_per_core', e.target.value)}
                    placeholder="např. 3 450 ÷ 12 = cca 288 vláken na jádro"
                    className="w-full px-3 py-1.5 rounded-lg border-2 border-blue-300 bg-white text-xs font-mono font-bold text-blue-900 focus:border-blue-600 focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          ÚKOL 2: Sledování výkonu (perfmon.exe) – Měření přepnutí kontextu
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
            2
          </span>
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Úkol 2: Měření přepnutí kontextu (perfmon.exe)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Změřte, kolikrát za sekundu operační systém přepne běžící úlohu na procesoru
            </p>
          </div>
        </div>

        {/* Stručný a přímý postup */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Přímý postup nastavení:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] sm:text-xs leading-relaxed">
            <li>Stiskněte <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">Win + R</kbd> ➔ napište <code className="font-bold text-indigo-700">perfmon</code> ➔ Enter.</li>
            <li>Vlevo rozklikněte <strong>Sledování výkonu</strong>.</li>
            <li>Klikněte na červený křížek ❌ (smaže se výchozí čítač).</li>
            <li>Klikněte na zelené plus ➕ ➔ najděte <strong>Systém</strong> ➔ vyberte <strong>Přepnutí kontextu/s</strong> ➔ <em>Přidat &gt;&gt;</em> ➔ <em>OK</em>.</li>
            <li><strong>Změna měřítka:</strong> Pravým tlačítkem na řádek čítače dole ➔ <em>Vlastnosti</em> ➔ záložka <em>Data</em> ➔ <strong>Měřítko: 0,001</strong> ➔ <em>OK</em>.</li>
          </ol>
        </div>

        {/* Tabulka měření */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-2.5 w-1/3">Měřený stav</th>
                <th className="p-2.5 w-1/3">Co dělat</th>
                <th className="p-2.5 w-1/3">Zjištěná hodnota (přepnutí/s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">1. Klid (Idle) – Průměr</td>
                <td className="p-2.5 text-slate-500">Nechte PC 10 s bez dotyku myši</td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t2_idle_avg'] || ''}
                    onChange={(e) => handleAnswerChange('t2_idle_avg', e.target.value)}
                    placeholder="odečtěte hodnotu Průměr"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-indigo-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">2. Klid (Idle) – Nejméně</td>
                <td className="p-2.5 text-slate-500">Stále v klidu</td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t2_idle_min'] || ''}
                    onChange={(e) => handleAnswerChange('t2_idle_min', e.target.value)}
                    placeholder="odečtěte hodnotu Nejméně"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-indigo-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr className="bg-amber-50/60">
                <td className="p-2.5 font-bold text-amber-950">3. Pohyb myší – Nejvíce</td>
                <td className="p-2.5 text-amber-900 font-medium">Kružte 10 s rychle myší po ploše</td>
                <td className="p-2.5">
                  <input
                    type="text"
                    value={answers['t2_mouse_max'] || ''}
                    onChange={(e) => handleAnswerChange('t2_mouse_max', e.target.value)}
                    placeholder="odečtěte hodnotu Nejvíce (špička)"
                    className="w-full px-3 py-1.5 rounded-lg border-2 border-amber-400 bg-white text-xs font-mono font-bold text-amber-950 focus:border-indigo-600 focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jednoduché didaktické vysvětlení místo složitého úkolu 3 */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
          <MousePointer className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Proč počet přepnutí při pohybu myši tak prudce stoupne?</strong>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Pohyb myši posílá do procesoru hardwarová přerušení. Operační systém musí okamžitě přepnout kontext na obslužný program ovladače, který spočítá novou pozici kurzoru a překreslí obrazovku.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
