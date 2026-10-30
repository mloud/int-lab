'use client';
import React, { useState } from 'react';
import {
  Thermometer,
  FileSpreadsheet,
  HelpCircle,
  CheckSquare,
  Copy,
  Check,
} from 'lucide-react';

const TEMPERATURE_DATA = [
  { time: '0:00', outdoor: 2, livingRoom: 20, garage: 8 },
  { time: '2:00', outdoor: 1, livingRoom: 19, garage: 7 },
  { time: '4:00', outdoor: 0, livingRoom: 19, garage: 6 },
  { time: '6:00', outdoor: -1, livingRoom: 21, garage: 6 },
  { time: '8:00', outdoor: 1, livingRoom: 22, garage: 7 },
  { time: '10:00', outdoor: 4, livingRoom: 22, garage: 9 },
  { time: '12:00', outdoor: 7, livingRoom: 21, garage: 11 },
  { time: '14:00', outdoor: 9, livingRoom: 17, garage: 12 },
  { time: '16:00', outdoor: 8, livingRoom: 21, garage: 11 },
  { time: '18:00', outdoor: 5, livingRoom: 22, garage: 10 },
  { time: '20:00', outdoor: 3, livingRoom: 22, garage: 9 },
  { time: '22:00', outdoor: 2, livingRoom: 21, garage: 8 },
];

export const LineChartsWorksheetTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyTable = () => {
    const header = 'Čas\tVenkovní teplota (°C)\tObývací pokoj (°C)\tGaráž (°C)';
    const rows = TEMPERATURE_DATA.map(
      (r) => `${r.time}\t${r.outdoor}\t${r.livingRoom}\t${r.garage}`
    ).join('\n');
    const tsv = `${header}\n${rows}`;

    navigator.clipboard.writeText(tsv).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Hlavička pracovního listu */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/80 shadow-sm text-center">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600">
          Samostatná práce v MS Excel • 9. ročník
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-1 mb-3 uppercase tracking-tight">
          Měření teploty v chytrém domě (24 hodin)
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Zkopírujte naměřená data ze tří teplotních čidel do MS Excelu, vytvořte přehledný
          spojnicový graf se značkami a odhalte podle průběhu křivek, co se v domě během dne dělo.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1. Zdrojová tabulka ke zkopírování do Excelu */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                <Thermometer className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Zdrojová data pro MS Excel
                </span>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Tabulka naměřených teplot (0:00 – 22:00)
                </h3>
              </div>
            </div>

            <button
              onClick={handleCopyTable}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Zkopírováno! Vložte do Excelu (Ctrl+V)
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Zkopírovat tabulku pro Excel
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-500 mb-4 font-medium">
            Tabulku můžete buď označit myší a zkopírovat (<code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">Ctrl + C</code>), nebo kliknout na modré tlačítko vpravo nahoře a v MS Excelu stisknout <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">Ctrl + V</code>.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-black text-xs uppercase tracking-wider">
                  <th className="border border-slate-200 px-4 py-3 text-center">Čas</th>
                  <th className="border border-slate-200 px-4 py-3 text-center text-blue-700 bg-blue-50/50">
                    Venkovní teplota (°C)
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-center text-rose-700 bg-rose-50/50">
                    Obývací pokoj (°C)
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-center text-slate-600 bg-slate-100/80">
                    Garáž (°C)
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {TEMPERATURE_DATA.map((row, idx) => (
                  <tr
                    key={row.time}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                  >
                    <td className="border border-slate-200 px-4 py-2 text-center font-bold text-slate-700">
                      {row.time}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-center font-bold text-blue-700">
                      {row.outdoor}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-center font-bold text-rose-700">
                      {row.livingRoom}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-center font-bold text-slate-600">
                      {row.garage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Požadavky na zpracování v Excelu */}
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                Úkol v tabulkovém procesoru
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Požadavky na tabulku a spojnicový graf
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 leading-relaxed">
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  1. Formátování tabulky a typ grafu
                </strong>
                Zformátujte vloženou tabulku a z celé tabulky vytvořte{' '}
                <strong>Spojnicový graf se značkami</strong>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  2. Název grafu, popis os a legenda
                </strong>
                Doplňte výstižný <strong>název grafu</strong>, přidejte <strong>popis os X a Y</strong> a
                umístěte <strong>legendu na spodní okraj</strong> grafu.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 md:col-span-2">
              <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  3. Vizuální odlišení barev křivek
                </strong>
                Nastavte barvy jednotlivých spojnic tak, aby odpovídaly významu dat:{' '}
                <span className="text-blue-600 font-bold">venkovní teplotu na modrou čáru</span>,{' '}
                <span className="text-rose-600 font-bold">
                  obývací pokoj na červenou nebo oranžovou
                </span>{' '}
                a <span className="text-slate-600 font-bold">garáž na šedou</span>.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Kontrolní otázky na porozumění */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-sm">
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Čtení a analýza grafu
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Kontrolní otázky na porozumění
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Prohlédněte si průběh všech tří křivek ve vašem hotovém grafu a pod graf v MS Excelu
            odpovězte na tyto 3 otázky:
          </p>

          <ol className="space-y-3 text-sm text-slate-700">
            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong>Spínání topení:</strong> V kolik hodin ráno začalo v obývacím pokoji spínat
                vytápění, přestože venku byla v tu chvíli největší zima z celého dne?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong>Detekce anomálie:</strong> Ve <strong>14:00</strong> došlo v obývacím pokoji
                k prudkému poklesu teploty na <strong>17 °C</strong>, zatímco venku bylo nejtepleji
                z celého dne (<strong>9 °C</strong>). Co se v obývacím pokoji s největší
                pravděpodobností stalo?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong>Chování garáže:</strong> Podle šedé křivky garáže vysvětlete, zda je garáž
                zateplená a jak v průběhu dne reaguje na venkovní počasí.
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
