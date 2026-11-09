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

export const ProcessIntroTasks7to9: React.FC<ProcessIntroSectionProps> = ({
  answers, checkedItems, handleAnswerChange, handleCheckChange
}) => (
  <>
      {/* ÚKOL 7*: Dvě instance stejného programu (Malování) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
            7*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 7*: Spuštění dvou stejných programů současně (Dvě instance v RAM — Malování)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ověření nezávislosti procesů, unikátnosti PID a principu paměťové izolace na programu Malování
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Co se stane v operační paměti, když tentýž program spustíme dvakrát? Vznikne jeden společný proces, nebo dva samostatné?
          Ověřte toto chování přímo v praxi na programu Malování (<code>mspaint.exe</code>).
        </p>

        {/* Checklist kroků */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7_instance_a'] || !!checkedItems['task_5_instance_a']}
              onChange={() => handleCheckChange('task_7_instance_a')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 7a: Spusťte program <strong>Malování</strong> (<code>mspaint.exe</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7_instance_b'] || !!checkedItems['task_5_instance_b']}
              onChange={() => handleCheckChange('task_7_instance_b')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 7b: Bez zavření prvního okna spusťte Malování podruhé (máte dvě samostatná okna Malování otevřená vedle sebe).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7_instance_c'] || !!checkedItems['task_5_instance_c']}
              onChange={() => handleCheckChange('task_7_instance_c')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 7c: Pomocí příkazu <code>tasklist /FI &quot;IMAGENAME eq mspaint.exe&quot;</code> v Příkazovém řádku (CMD) vyhledejte obě běžící instance a zapište jejich PID do tabulky.
            </span>
          </label>
        </div>

        {/* Tabulka instancí */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Běžící instance</th>
                <th className="p-3 border-b border-slate-200">Zjištěné PID (v tasklistu)</th>
                <th className="p-3 border-b border-slate-200">Kolik procesů celkem vzniklo v RAM?</th>
                <th className="p-3 border-b border-slate-200">Mají obě okna stejné, nebo odlišné PID?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">1. okno Malování (mspaint.exe)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 8420"
                    value={answers['t7_instance1_pid'] || answers['t5_instance1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t7_instance1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td rowSpan={2} className="p-3 align-middle bg-slate-50/50">
                  <input
                    type="text"
                    placeholder="Např. 2 procesy"
                    value={answers['t7_process_count'] || answers['t5_process_count'] || ''}
                    onChange={(e) => handleAnswerChange('t7_process_count', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </td>
                <td rowSpan={2} className="p-3 align-middle bg-slate-50/50">
                  <input
                    type="text"
                    placeholder="Odlišné PID"
                    value={answers['t7_pid_same_or_diff'] || answers['t5_pid_same_or_diff'] || ''}
                    onChange={(e) => handleAnswerChange('t7_pid_same_or_diff', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">2. okno Malování (mspaint.exe)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 11240"
                    value={answers['t7_instance2_pid'] || answers['t5_instance2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t7_instance2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázky k úkolu 7* */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              7.1 Proč má každé otevřené okno téhož programu své vlastní unikátní PID a nemůže ho sdílet? Co by se stalo, kdyby dvě okna měla stejné číslo procesu?
            </label>
            <textarea
              rows={3}
              placeholder="Vysvětlete, jak operační systém pomocí PID adresuje paměťový prostor, otevřené soubory a přiděluje procesorový čas..."
              value={answers['t7_why_unique_pid'] || answers['t5_why_unique_pid'] || ''}
              onChange={(e) => handleAnswerChange('t7_why_unique_pid', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              7.2 Představte si, že v 1. okně Malování kreslíte výkres a 2. okno náhle zamrzne a spadne. Jaká je výhoda toho, že jde o dva nezávislé procesy s izolovanou pamětí?
            </label>
            <textarea
              rows={2}
              placeholder="Popište princip izolace procesů v chráněném režimu paměti (pád jednoho procesu neovlivní druhý proces)..."
              value={answers['t7_isolation_benefit'] || answers['t5_isolation_benefit'] || ''}
              onChange={(e) => handleAnswerChange('t7_isolation_benefit', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ÚKOL 8*: Program na disku vs. Proces v RAM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
          <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs">
            8*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 8*: Program na disku vs. Proces v paměti RAM (Instrukce vs. Data)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Porovnání neměnnosti instrukcí kódu vůči dynamickému růstu datového segmentu na haldě
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_8_ram_disk_a'] || !!checkedItems['task_9_ram_disk_a'] || !!checkedItems['task_7a']}
              onChange={() => handleCheckChange('task_8_ram_disk_a')}
              className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <span className="font-bold">
              Krok 8a: Vyhledejte soubor <code>notepad.exe</code> na disku C: (v <code>C:\Windows\System32\notepad.exe</code>) a odečtěte jeho velikost na disku.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_8_ram_disk_b'] || !!checkedItems['task_9_ram_disk_b'] || !!checkedItems['task_7b']}
              onChange={() => handleCheckChange('task_8_ram_disk_b')}
              className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 8b: Ve Správci úloh nebo v příkazu <code>tasklist</code> odečtěte spotřebu paměti RAM po spuštění prázdného Poznámkového bloku.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                ⚠️ Všechna měření RAM v tomto úkolu provádějte <strong>stále stejným nástrojem</strong>. Správce úloh a <code>tasklist</code> počítají paměť jinak (Správce úloh ukazuje jen privátní paměť procesu, <code>tasklist</code> včetně sdílených knihoven), proto se jejich čísla liší.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka hodnot */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Stav / Místo</th>
                <th className="p-3 border-b border-slate-200">Naměřená hodnota</th>
                <th className="p-3 border-b border-slate-200">Jednotka / Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">Velikost souboru na disku (SSD)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 450 kB"
                    value={answers['t8_disk_size'] || answers['t9_disk_size'] || answers['t7_disk_size'] || answers['t4_disk_size'] || ''}
                    onChange={(e) => handleAnswerChange('t8_disk_size', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">C:\Windows\System32\notepad.exe</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Využití RAM po čistém spuštění</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 12 400 kB"
                    value={answers['t8_ram_initial'] || answers['t9_ram_initial'] || answers['t7_ram_initial'] || ''}
                    onChange={(e) => handleAnswerChange('t8_ram_initial', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">Prázdný dokument bez textu</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 8* */}
        <div className="pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              8.1 Proč čistě spuštěný proces v RAM zabírá podstatně více místa než samotný soubor .exe na disku?
            </label>
            <textarea
              rows={3}
              placeholder=""
              value={answers['t8_ram_growth_reason'] || answers['t9_ram_growth_reason'] || answers['t7_ram_growth_reason'] || ''}
              onChange={(e) => handleAnswerChange('t8_ram_growth_reason', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ÚKOL 9*: Rodičovský proces v Process Exploreru */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
            9*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 9*: Rodičovský proces (PPID) a stromová hierarchie v Process Exploreru
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Vizualizace stromu procesů (Process Tree) a dohledání rodiče (Parent ➔ Child)
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_9_procexp_a'] || !!checkedItems['task_8_procexp_a'] || !!checkedItems['task_6a']}
              onChange={() => handleCheckChange('task_9_procexp_a')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 9a: Stáhněte a spusťte nástroj Process Explorer (Microsoft Sysinternals).
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                Oficiální diagnostický nástroj Microsoftu stáhněte ze stránky{' '}
                <a
                  href="https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Process Explorer (Microsoft Learn)
                  <ExternalLink className="w-3 h-3" />
                </a>
                . Aplikaci není nutné instalovat — stačí rozbalit stažený ZIP archiv a spustit <code>procexp.exe</code> (nebo <code>procexp64.exe</code>).
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_9_procexp_b'] || !!checkedItems['task_8_procexp_b'] || !!checkedItems['task_6b']}
              onChange={() => handleCheckChange('task_9_procexp_b')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 9b: Spusťte dvě nezávislá okna Poznámkového bloku ze dvou různých míst.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                1. První instanci spusťte běžným způsobem (např. z plochy nebo z nabídky Start).<br />
                2. Druhou instanci spusťte z Příkazového řádku (CMD) příkazem: <code>start notepad.exe</code>.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_9_procexp_c'] || !!checkedItems['task_8_procexp_c'] || !!checkedItems['task_6c']}
              onChange={() => handleCheckChange('task_9_procexp_c')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 9c: Vyhledejte obě okna Notepadu ve stromové hierarchii (Process Tree) Process Exploreru.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                V Process Exploreru se podívejte na odsazení procesů ve sloupci <strong>Process</strong>. Najděte proces <code>explorer.exe</code> a proces <code>cmd.exe</code> a sledujte, pod kým je který <code>notepad.exe</code> zanořen. Poklepáním na proces otevřete vlastnosti (Properties ➔ záložka Image), kde vidíte položku <strong>Parent</strong> (název rodiče a v závorce PPID).
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka rodičů a potomků */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Instance Notepadu</th>
                <th className="p-3 border-b border-slate-200">PID Notepadu</th>
                <th className="p-3 border-b border-slate-200">Rodičovský proces (Parent Name)</th>
                <th className="p-3 border-b border-slate-200">PPID rodiče</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">1. Spuštěný z plochy / Startu</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 9120"
                    value={answers['t9_inst1_pid'] || answers['t8_inst1_pid'] || answers['t6_inst1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="explorer.exe"
                    value={answers['t9_inst1_parent'] || answers['t8_inst1_parent'] || answers['t6_inst1_parent'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst1_parent', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="PPID např. 4100"
                    value={answers['t9_inst1_ppid'] || answers['t8_inst1_ppid'] || answers['t6_inst1_ppid'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst1_ppid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">2. Spuštěný z CMD (start notepad.exe)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 10450"
                    value={answers['t9_inst2_pid'] || answers['t8_inst2_pid'] || answers['t6_inst2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="cmd.exe"
                    value={answers['t9_inst2_parent'] || answers['t8_inst2_parent'] || answers['t6_inst2_parent'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst2_parent', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="PPID např. 7820"
                    value={answers['t9_inst2_ppid'] || answers['t8_inst2_ppid'] || answers['t6_inst2_ppid'] || ''}
                    onChange={(e) => handleAnswerChange('t9_inst2_ppid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jednoduché shrnutí: Co rodič procesu ovlivňuje */}
        <div className="p-5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 text-xs text-slate-700 space-y-2.5">
          <div className="flex items-center gap-2 text-purple-900 font-black uppercase text-[11px] tracking-wider">
            <Info className="w-4 h-4 text-purple-600" />
            <span>K čemu v systému slouží rodičovský proces a co ovlivňuje?</span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Každý program ve Windows (kromě samotného jádra systému) je spuštěn nějakým jiným procesem — svým <strong>rodičem</strong>. Tato hierarchie má 3 jednoduché a důležité funkce:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">🛡️ 1. Dědění práv</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Potomek přebírá práva svého rodiče. Program spuštěný ze správcovského okna poběží automaticky také jako Správce.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">🌲 2. Kdo koho spustil</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Strom ukazuje původ každého procesu. Správce tak snadno odhalí podezřelý program (např. když Word nečekaně spustí CMD). Pozor: zavřením rodiče se potomek ve Windows sám neukončí – program poběží dál i po zavření CMD.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">💬 3. Návratový kód</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Potomek po svém skončení vrátí rodiči zprávu, zda úloha dopadla v pořádku (kód 0), nebo s chybou.
              </p>
            </div>
          </div>
        </div>
      </div>
  </>
);
