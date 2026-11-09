"use client";

import React from 'react';
import {
  ClipboardList, CheckCircle2, Terminal, Monitor, HelpCircle,
  AlertCircle, Layers, GitBranch, ExternalLink, Info, Activity,
  Star, Cpu, Video, ChevronDown, Palette, Search, Filter
} from 'lucide-react';
import { ProcessIntroWorksheetAnswers, ProcessIntroCheckedItems } from '../ProcessIntroTypes';

export interface ProcessIntroSectionProps {
  answers: ProcessIntroWorksheetAnswers;
  checkedItems: ProcessIntroCheckedItems;
  handleAnswerChange: (key: string, value: string) => void;
  handleCheckChange: (key: string) => void;
}

export const ProcessIntroTasks1to4: React.FC<ProcessIntroSectionProps> = ({
  answers, checkedItems, handleAnswerChange, handleCheckChange
}) => (
  <>
      {/* ÚKOL 1: Základní orientace ve Správci úloh */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
            1
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 1: Základní orientace ve Správci úloh
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Globální odečet zatížení systému (CPU a RAM) a vyhledání nejnáročnějšího procesu
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_1_orient_a']}
              onChange={() => handleCheckChange('task_1_orient_a')}
              className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-bold">
              Krok 1a: Otevřete Správce úloh (<kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Ctrl + Shift + Esc</kbd>) a na kartě <em>Procesy</em> odečtěte v záhlaví celkové využití procesoru (CPU) a operační paměti (RAM).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_1_orient_b']}
              onChange={() => handleCheckChange('task_1_orient_b')}
              className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 1b: Klikněte na záhlaví sloupce <strong>CPU</strong>, čímž se procesy seřadí sestupně podle aktuální zátěže, a vyhledejte aplikaci, která procesor vytěžuje nejvíce.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                💡 Pokud procesy v seznamu poskakují, <strong>podržte klávesu Ctrl</strong> – Správce úloh dočasně pozastaví aktualizaci výpisu.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka pro záznam Úkolu 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Měřený parametr</th>
                <th className="p-3 border-b border-slate-200">Zjištěná hodnota</th>
                <th className="p-3 border-b border-slate-200">Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">Celkové využití CPU (%)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 14%"
                    value={answers['t1_total_cpu'] || ''}
                    onChange={(e) => handleAnswerChange('t1_total_cpu', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">V záhlaví sloupce CPU</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Celkové využití paměti RAM (%)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 58%"
                    value={answers['t1_total_ram'] || ''}
                    onChange={(e) => handleAnswerChange('t1_total_ram', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">V záhlaví sloupce Paměť</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Jméno aplikace používající nejvíce CPU</td>
                <td className="p-3" colSpan={2}>
                  <input
                    type="text"
                    placeholder="Např. System, Google Chrome, Windows Defender..."
                    value={answers['t1_top_cpu_app'] || ''}
                    onChange={(e) => handleAnswerChange('t1_top_cpu_app', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ÚKOL 2: Podrobnosti o konkrétním procesu (Edge + YouTube) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs">
            2
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 2: Prohlížeč Edge před spuštěním videa a při jeho přehrávání
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Měření změny počtu procesů, paměti a zátěže CPU při spuštění multimediálního obsahu
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_2_video_a']}
              onChange={() => handleCheckChange('task_2_video_a')}
              className="w-4 h-4 mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 2a: Spusťte Microsoft Edge a nechte otevřenou jen jednu prázdnou novou kartu. Ve Správci úloh na kartě <em>Procesy</em> najděte řádek <strong>Microsoft Edge</strong> a zapište do tabulky počet procesů (číslo v závorce za názvem), využití paměti a CPU.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_2_video_b']}
              onChange={() => handleCheckChange('task_2_video_b')}
              className="w-4 h-4 mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 2b: Ve stejné kartě pusťte toto{' '}
                <a
                  href="https://www.youtube.com/watch?v=zFiqZMTmolY&list=RDzFiqZMTmolY&start_radio=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  YouTube video
                  <ExternalLink className="w-3 h-3" />
                </a>
                , počkejte, až skončí případná reklama, a měření zopakujte.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                💡 Hodnoty se neustále mění – <strong>podržte klávesu Ctrl</strong>, Správce úloh tak dočasně pozastaví aktualizaci výpisu a hodnoty si v klidu opíšete.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka měření Edge před a při videu */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Stav prohlížeče</th>
                <th className="p-3 border-b border-slate-200">Počet procesů (číslo v závorce)</th>
                <th className="p-3 border-b border-slate-200">Využití paměti RAM</th>
                <th className="p-3 border-b border-slate-200">Využití CPU (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: 'Před spuštěním videa (prázdná karta)', prefix: 't2_before' },
                { label: 'Při přehrávání videa', prefix: 't2_video' }
              ].map((row) => (
                <tr key={row.prefix}>
                  <td className="p-3 font-bold text-slate-800">{row.label}</td>
                  {['count', 'mem', 'cpu'].map((field) => (
                    <td key={field} className="p-3">
                      <input
                        type="text"
                        placeholder=""
                        value={answers[`${row.prefix}_${field}`] || ''}
                        onChange={(e) => handleAnswerChange(`${row.prefix}_${field}`, e.target.value)}
                        className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-sky-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 2 */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            2.1 Porovnejte obě měření. Co se po spuštění videa změnilo a čím si to vysvětlujete?
          </label>
          <textarea
            rows={2}
            placeholder="Popište nárůst procesů (GPU proces pro dekódování, audio proces, načtení videa do paměti)..."
            value={answers['t2_compare'] || ''}
            onChange={(e) => handleAnswerChange('t2_compare', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        {/* Pro pokročilé: víceprocesová architektura Edge (sbalovací) */}
        <details className="group rounded-2xl border-2 border-sky-200 bg-sky-50/60 overflow-hidden">
          <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden hover:bg-sky-100/60 transition-colors">
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-sky-900">
              <Info className="w-4 h-4 text-sky-600" />
              Pro pokročilé: Z čeho se aplikace Edge skládá?
            </span>
            <ChevronDown className="w-4 h-4 text-sky-600 transition-transform group-open:rotate-180" />
          </summary>

          <div className="px-5 pb-5 space-y-3 text-xs text-slate-700">
            <p className="text-sm text-slate-600 leading-relaxed">
              Prohlížeč Edge není jeden proces. Po spuštění vytvoří <strong>celou skupinu procesů <code>msedge.exe</code></strong>,
              které mají každý svou práci a navzájem spolupracují. Řádek <strong>Microsoft Edge (číslo)</strong> ve Správci úloh
              není proces – je to jen <strong>skupina</strong>, proto nemá PID a její hodnoty jsou součtem všech procesů uvnitř.
              Po rozbalení skupiny uvidíte jednotlivé procesy:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { name: 'Prohlížeč', desc: 'Hlavní proces. Kreslí okno a lištu a spouští a řídí všechny ostatní procesy (je jejich rodičem).' },
                { name: 'Karta: …', desc: 'Každá karta (web) má vlastní proces, který zpracovává stránku a spouští její JavaScript.' },
                { name: 'Proces GPU', desc: 'Posílá vykreslování a dekódování videa na grafickou kartu.' },
                { name: 'Nástroj: Network / Audio / Storage', desc: 'Pomocné služby – stahování dat ze sítě, přehrávání zvuku, práce s mezipamětí.' }
              ].map((p) => (
                <div key={p.name} className="p-3 bg-white rounded-xl border border-sky-100">
                  <span className="font-bold text-sky-900 block mb-0.5">{p.name}</span>
                  <p className="text-[11px] text-slate-600 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Proč tolik procesů?</strong> Když jedna karta spadne, ukončí se jen její proces a zbytek prohlížeče běží dál.
              Karty jsou od sebe navzájem odděleny, takže škodlivá stránka nemůže číst data z jiné karty. Procesy navíc mohou
              běžet současně na různých jádrech procesoru. Cenou za to je vyšší spotřeba paměti RAM.
            </p>
          </div>
        </details>
      </div>

      {/* ÚKOL 3: Identifikace PID v GUI (Správce úloh — Podrobnosti) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
            3
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 3: Zjištění PID v grafickém rozhraní (Správce úloh)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Vyhledání číselného identifikátoru procesu PID na kartě Podrobnosti ve Správci úloh
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Každý spuštěný proces v operačním systému má svůj unikátní číselný identifikátor — <strong>PID (Process Identifier)</strong>.
          Zatímco na základní kartě <em>Procesy</em> vidíte uživatelsky přívětivé názvy aplikací, na kartě <strong>Podrobnosti</strong>
          zobrazuje Správce úloh přesný seznam systémových procesů s jejich PID.
        </p>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_3_paint_calc_a'] || !!checkedItems['task_3a']}
              onChange={() => handleCheckChange('task_3_paint_calc_a')}
              className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-bold">
              Krok 3a: Spusťte aplikaci <strong>Malování</strong> (<code>mspaint.exe</code>) a <strong>Kalkulačku</strong> (<code>calc.exe</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_3_paint_calc_b'] || !!checkedItems['task_3b']}
              onChange={() => handleCheckChange('task_3_paint_calc_b')}
              className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-bold">
              Krok 3b: Otevřete Správce úloh (<kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Ctrl + Shift + Esc</kbd>),
              přepněte na záložku <strong>Podrobnosti</strong> (Details) a v seznamu najděte řádky s oběma procesy a opište jejich PID.
            </span>
          </label>
        </div>

        {/* Tabulka pro záznam PID */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Spuštěná aplikace</th>
                <th className="p-3 border-b border-slate-200">Název spustitelného souboru</th>
                <th className="p-3 border-b border-slate-200">Zjištěné PID (Správce úloh — Podrobnosti)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-500" />
                  Malování
                </td>
                <td className="p-3 font-mono font-bold text-slate-700">mspaint.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 8420"
                    value={answers['t3_mspaint_pid_gui'] || answers['t3_notepad_pid_gui'] || ''}
                    onChange={(e) => handleAnswerChange('t3_mspaint_pid_gui', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Kalkulačka
                </td>
                <td className="p-3 font-mono font-bold text-slate-700">CalculatorApp.exe / calc.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 14328"
                    value={answers['t3_calc_pid_gui'] || ''}
                    onChange={(e) => handleAnswerChange('t3_calc_pid_gui', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 3 */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            3.1 Co se stane, když Malování zavřete a spustíte znovu? Získá stejné PID, nebo jiné? Proč operační systém přiděluje PID dynamicky?
          </label>
          <textarea
            rows={2}
            placeholder="Vysvětlete, jak operační systém při startu nového procesu alokuje nové volné PID z tabulky procesů..."
            value={answers['t3_pid_dynamic'] || answers['t1_pid_dynamic'] || ''}
            onChange={(e) => handleAnswerChange('t3_pid_dynamic', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ÚKOL 4: První seznámení s CLI — příkaz tasklist a ruční vyhledání */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center font-black text-xs">
            4
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 4: První seznámení s CLI — příkaz tasklist a ruční vyhledání PID
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Spuštění Příkazového řádku, výpis všech procesů příkazem tasklist a ověření shody s Task Managerem
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          V reálné IT praxi administrátoři často spravují vzdálené servery bez grafického rozhraní (GUI).
          Základním textovým nástrojem ve Windows pro zobrazení všech běžících úloh a procesů přímo v příkazovém řádku je příkaz <code>tasklist</code>.
        </p>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_cli_intro_a']}
              onChange={() => handleCheckChange('task_4_cli_intro_a')}
              className="w-4 h-4 mt-0.5 rounded text-violet-600 focus:ring-violet-500"
            />
            <span className="font-bold">
              Krok 4a: Otevřete Příkazový řádek: stiskněte klávesovou zkratku <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Win + R</kbd>,
              do okénka zadejte <code>cmd</code> a stiskněte <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Enter</kbd>.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_cli_intro_b']}
              onChange={() => handleCheckChange('task_4_cli_intro_b')}
              className="w-4 h-4 mt-0.5 rounded text-violet-600 focus:ring-violet-500"
            />
            <span className="font-bold">
              Krok 4b: Do černého okna Příkazového řádku napište příkaz <code>tasklist</code> a stiskněte <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Enter</kbd>.
              Na obrazovce se vypíše velká tabulka všech procesů se sloupci <em>Název bitové kopie</em>, <em>PID</em>, <em>Název relace</em>, <em>Číslo relace</em> a <em>Využití paměti</em>.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_cli_intro_c']}
              onChange={() => handleCheckChange('task_4_cli_intro_c')}
              className="w-4 h-4 mt-0.5 rounded text-violet-600 focus:ring-violet-500"
            />
            <span className="font-bold">
              Krok 4c: V dlouhém výpisu ručně scrollujte (posouvejte nahoru a dolů kolečkem myši) a vyhledejte procesy <code>mspaint.exe</code> a Kalkulačku.
              Opište jejich PID do tabulky a porovnejte je s PID, které jste před chvílí zapsali v Úkolu 3 ve Správci úloh.
            </span>
          </label>
        </div>

        {/* Tabulka porovnání PID z CLI a GUI */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Proces v CLI</th>
                <th className="p-3 border-b border-slate-200">PID zjištěné v příkazu tasklist</th>
                <th className="p-3 border-b border-slate-200">PID z Úkolu 3 (Správce úloh)</th>
                <th className="p-3 border-b border-slate-200">Shodují se obě čísla?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-800">mspaint.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 8420"
                    value={answers['t4_mspaint_pid_cli'] || answers['t3_notepad_pid_cli'] || ''}
                    onChange={(e) => handleAnswerChange('t4_mspaint_pid_cli', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </td>
                <td className="p-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">
                  {answers['t3_mspaint_pid_gui'] || answers['t3_notepad_pid_gui'] || <span className="text-slate-400 italic font-normal">Vyplňte v úkolu 3</span>}
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Ano / Ne"
                    value={answers['t4_mspaint_match'] || answers['t3_notepad_match'] || ''}
                    onChange={(e) => handleAnswerChange('t4_mspaint_match', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-800">CalculatorApp.exe / calc.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 14328"
                    value={answers['t4_calc_pid_cli'] || answers['t3_calc_pid_cli'] || ''}
                    onChange={(e) => handleAnswerChange('t4_calc_pid_cli', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </td>
                <td className="p-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">
                  {answers['t3_calc_pid_gui'] || <span className="text-slate-400 italic font-normal">Vyplňte v úkolu 3</span>}
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Ano / Ne"
                    value={answers['t4_calc_match'] || answers['t3_calc_match'] || ''}
                    onChange={(e) => handleAnswerChange('t4_calc_match', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-violet-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </>
);
