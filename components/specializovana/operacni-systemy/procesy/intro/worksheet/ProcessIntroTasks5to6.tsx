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

export const ProcessIntroTasks5to6: React.FC<ProcessIntroSectionProps> = ({
  answers, checkedItems, handleAnswerChange, handleCheckChange
}) => (
  <>
      {/* ÚKOL 5: Filtrování podle názvu v CLI (tasklist /FI) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-black text-xs">
            5
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 5: Filtrování procesů podle názvu v CLI (tasklist /FI)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Použití parametru filtru /FI a operátoru eq pro okamžité zacílení procesu bez ručního procházení
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          V předchozím úkolu jste museli procesy v dlouhém výpisu <code>tasklist</code> pracně dohledávat ručně.
          Na produkčním serveru mohou běžet tisíce procesů. Příkaz <code>tasklist</code> proto nabízí přepínač <strong><code>/FI</code> (Filter)</strong>,
          který dokáže výpis okamžitě omezit jen na požadované procesy.
        </p>

        {/* Podrobná nápověda pro studenty */}
        <div className="p-5 rounded-2xl bg-teal-50/80 border-2 border-teal-200 text-xs text-teal-950 space-y-3">
          <div className="flex items-center gap-2 font-black uppercase text-[11px] tracking-wider text-teal-900">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Podrobná nápověda: Jak funguje filtrační přepínač /FI?</span>
          </div>

          <div className="space-y-2 text-slate-700 leading-relaxed">
            <p>
              Syntaxe filtru se zapisuje za přepínač <code>/FI</code> a celá filtrační podmínka musí být uzavřena v <strong>anglických uvozovkách</strong>:
            </p>
            <div className="p-3 bg-white rounded-xl border border-teal-200 font-mono text-xs text-teal-900 font-bold select-all">
              tasklist /FI &quot;IMAGENAME eq mspaint.exe&quot;
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-600">
              <li><strong><code>IMAGENAME</code></strong> = název spustitelného souboru procesu (např. <code>mspaint.exe</code>, <code>cmd.exe</code>).</li>
              <li><strong><code>eq</code></strong> = relační operátor <em>equal</em> (rovná se).</li>
              <li><strong>Zástupný znak <code>*</code> (wildcard)</strong> = umožňuje vyhledávat podle vzoru. Například podmínka <code>&quot;IMAGENAME eq m*&quot;</code> vypíše všechny běžící procesy, jejichž název začíná na písmeno &quot;m&quot;.</li>
            </ul>
          </div>
        </div>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_filter_name_a']}
              onChange={() => handleCheckChange('task_5_filter_name_a')}
              className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500"
            />
            <span className="font-bold">
              Krok 5a: V Příkazovém řádku zadejte a spusťte filtrační příkaz pro zobrazení pouze procesu Malování: <code>tasklist /FI &quot;IMAGENAME eq mspaint.exe&quot;</code>.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_filter_name_b']}
              onChange={() => handleCheckChange('task_5_filter_name_b')}
              className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500"
            />
            <span className="font-bold">
              Krok 5b: Ověřte, že se v terminálu vypsal pouze jediný čistý řádek s procesem Malování namísto stovek procesů.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_filter_name_c']}
              onChange={() => handleCheckChange('task_5_filter_name_c')}
              className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500"
            />
            <span className="font-bold">
              Krok 5c: Vyzkoušejte zástupný znak <code>*</code> a zadejte příkaz: <code>tasklist /FI &quot;IMAGENAME eq m*&quot;</code>.
            </span>
          </label>
        </div>

        {/* Otázka k úkolu 5 */}
        <div className="pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              5.1 Kolik procesů celkem začínajících na písmeno „m“ se vám po zadání příkazu <code>tasklist /FI &quot;IMAGENAME eq m*&quot;</code> ve výpisu zobrazilo? (Zapište počet nalezených procesů / řádků):
            </label>
            <input
              type="text"
              placeholder="Zapište zjištěný počet procesů (např. 6)"
              value={answers['t5_filter_wildcard_count'] || answers['t5_filter_wildcard_result'] || ''}
              onChange={(e) => handleAnswerChange('t5_filter_wildcard_count', e.target.value)}
              className="w-full max-w-xs p-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
            />
          </div>
        </div>
      </div>

      {/* ÚKOL 6: Samostatné filtrování procesů podle spotřeby RAM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
            6
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 6: Samostatné filtrování procesů podle spotřeby paměti RAM
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Samostatná práce s nápovědou příkazu tasklist /?, vyhledání filtru MEMUSAGE a operátoru gt pro procesy nad 300 MB
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Nyní už víte, jak pracovat s přepínačem <code>/FI</code>. Vaším dalším samostatným úkolem je přijít na to,
          jak odfiltrovat procesy nikoliv podle názvu, ale podle <strong>spotřeby operační paměti RAM</strong> — konkrétně vypsat ty,
          které zabírají <strong>více než 300 MB</strong>.
        </p>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6_filter_mem_a'] || !!checkedItems['task_4_filter_a']}
              onChange={() => handleCheckChange('task_6_filter_mem_a')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 6a: Otevřete Příkazový řádek (CMD) a zadejte nápovědu <code>tasklist /?</code>.
              V sekci přepínačů vyhledejte parametr <code>/FI</code> (Filtry), povolené operátory (např. <code>gt</code> = greater than / větší než)
              a název filtru paměti (<code>MEMUSAGE</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6_filter_mem_b'] || !!checkedItems['task_4_filter_b']}
              onChange={() => handleCheckChange('task_6_filter_mem_b')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 6b: Všimněte si, že filtr <code>MEMUSAGE</code> očekává hodnotu v <strong>kB</strong> (kilobajtech).
              Přepočítejte 300 MB na kB (pro filtr zadejte <code>300000</code>) a spusťte filtrační příkaz v CMD.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6_filter_mem_c'] || !!checkedItems['task_4_filter_c']}
              onChange={() => handleCheckChange('task_6_filter_mem_c')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 6c: Zapište přesný příkaz, který jste použili, a zaznamenejte 3 nalezené procesy s nejvyšší spotřebou RAM do tabulky.
            </span>
          </label>
        </div>

        {/* Zadaný příkaz */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Zapište přesné znění příkazu, který jste v CMD spustili:
          </label>
          <input
            type="text"
            placeholder=""
            value={answers['t6_filter_cmd'] || answers['t4_filter_cmd'] || ''}
            onChange={(e) => handleAnswerChange('t6_filter_cmd', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          />
        </div>

        {/* Tabulka procesů nad 300 MB */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Pořadí</th>
                <th className="p-3 border-b border-slate-200">Název procesu (.exe)</th>
                <th className="p-3 border-b border-slate-200">PID</th>
                <th className="p-3 border-b border-slate-200">Spotřeba paměti RAM (v kB nebo MB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-500">1. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. msedge.exe"
                    value={answers['t6_p1_name'] || answers['t4_p1_name'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p1_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="PID"
                    value={answers['t6_p1_pid'] || answers['t4_p1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 420 500 K"
                    value={answers['t6_p1_mem'] || answers['t4_p1_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p1_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">2. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. code.exe"
                    value={answers['t6_p2_name'] || answers['t4_p2_name'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p2_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="PID"
                    value={answers['t6_p2_pid'] || answers['t4_p2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 380 120 K"
                    value={answers['t6_p2_mem'] || answers['t4_p2_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p2_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">3. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. chrome.exe"
                    value={answers['t6_p3_name'] || answers['t4_p3_name'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p3_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="PID"
                    value={answers['t6_p3_pid'] || answers['t4_p3_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p3_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Např. 312 900 K"
                    value={answers['t6_p3_mem'] || answers['t4_p3_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t6_p3_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 6 */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              6.1 Jak by vypadal příkaz, kdybyste naopak chtěli vyhledat procesy s pamětí MENŠÍ než 10 MB, tj. 10000 kB?
            </label>
            <textarea
              rows={2}
              placeholder=""
              value={answers['t6_filter_lt_example'] || answers['t4_filter_lt_example'] || ''}
              onChange={(e) => handleAnswerChange('t6_filter_lt_example', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROZŠIŘUJÍCÍ ČÁST PRO POKROČILÉ (S HVĚZDIČKOU *)                            */}
      {/* ========================================================================= */}
      <div className="pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Rozšiřující část pro pokročilé studenty (s hvězdičkou *)
          </h2>
        </div>
      </div>
  </>
);
