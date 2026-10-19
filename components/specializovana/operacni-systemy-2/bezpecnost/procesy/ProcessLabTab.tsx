'use client';

import React from 'react';
import { 
  FileText, 
  Terminal, 
  CheckSquare, 
  Square, 
  Copy, 
  ShieldAlert, 
  ChevronDown, 
  Info,
  CheckCircle2,
  PencilLine
} from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { ProcessProtocolState } from './processTypes';

interface ProcessLabTabProps {
  studentName: string;
  setStudentName: (name: string) => void;
  checkedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  protocol: ProcessProtocolState;
  setProtocol: (protocol: ProcessProtocolState) => void;
  copyProtocolToClipboard: () => void;
  copiedSuccess: boolean;
  handleDownloadWord: () => void;
}

export default function ProcessLabTab({
  studentName,
  setStudentName,
  checkedTasks,
  toggleTask,
  protocol,
  setProtocol,
  copyProtocolToClipboard,
  copiedSuccess,
  handleDownloadWord
}: ProcessLabTabProps) {
  return (
        <WorksheetLayout
          title="Laboratorní protokol: Správa procesů a digitální certifikáty v OS"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownloadWord}
        >
          <div className="space-y-8">

            {/* Auto-save & Status Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Automatické ukládání aktivní – všechny odpovědi a zaškrtnutí se ukládají do paměti prohlížeče</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
                  Splněno: {Object.values(checkedTasks).filter(Boolean).length} / 10
                </span>
              </div>
            </div>

            {/* Úvodní kontext praktické práce */}
            <div className="p-5 bg-blue-50/70 rounded-3xl border border-blue-200 text-xs text-blue-950 space-y-2 leading-relaxed">
              <div className="font-bold text-sm text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" /> Forenzní vyšetřování ve Windows 11 Pro / VirtualBoxu
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-200/70 text-blue-900">
                  10 samostatných úloh
                </span>
              </div>
              <p>
                Každá úloha představuje <strong>reálný bezpečnostní incident nebo vyšetřovací postup</strong>, který správci a bezpečnostní analytici provádějí při podezření na infekci. 
                Všechny úlohy řešte v <strong>Příkazovém řádku (cmd.exe)</strong>, vestavěných systémových diagnostických nástrojích nebo v Excelu. 
                Odpovědi vyplňujte přímo do formulářových polí u konkrétní úlohy. Po dokončení si dole stáhněte vyplněný protokol ve Wordu (.doc).
              </p>
            </div>

            {/* =========================================================================
                ÚLOHA 1: STOPOVÁNÍ KLÍČOVÉHO PROCESU V CLI (cmd.exe)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task1'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task1'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 1: Stopování klíčového procesu v CLI (cmd.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Opakování příkazu tasklist a rychlé filtrování specifických procesů v terminálu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task1')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task1'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task1'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  V Příkazovém řádku (cmd.exe) vyhledejte běžící proces <strong>explorer.exe</strong> (grafické prostředí plochy) pomocí nástroje <code>tasklist</code>.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Použijte parametr filtru <code>/FI</code> pro filtrování podle názvu obrazu (<code>IMAGENAME</code>).</li>
                  <li>Opište zjištěné PID, velikost využité paměti RAM a přesné znění příkazu.</li>
                </ul>
              </div>

              {/* Formulářová pole úlohy 1 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      1.1 Identifikátor PID:
                    </label>
                    <input
                      type="text"
                      value={protocol.task1Pid || ''}
                      onChange={(e) => setProtocol({ ...protocol, task1Pid: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      1.2 Využití paměti RAM:
                    </label>
                    <input
                      type="text"
                      value={protocol.task1Memory || ''}
                      onChange={(e) => setProtocol({ ...protocol, task1Memory: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      1.3 Přesný příkaz v CMD:
                    </label>
                    <input
                      type="text"
                      value={protocol.task1Cmd || ''}
                      onChange={(e) => setProtocol({ ...protocol, task1Cmd: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 2: VÝPIS PROCESŮ S PAMĚTÍ NAD 100 MB V CLI (cmd.exe)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task2'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task2'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 2: Výpis procesů spotřebovávajících více než 100 MB RAM (cmd.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Filtrování procesů podle alokované operační paměti a odhalení podezřelých konzumentů RAM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task2')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task2'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task2'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Pomocí filtru paměti v nástroji <code>tasklist</code> vyhledejte všechny procesy spotřebovávající více než 100 MB RAM (odhalení náročných aplikací či memory leaků).
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Použijte parametr filtru <code>/FI</code> pro filtrování podle paměti (<code>MEMUSAGE</code>) a operátor větší než (systém očekává hodnotu v kB).</li>
                  <li>Vyhledejte proces s největší alokovanou pamětí RAM a zapište jeho název a spotřebu.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Operátory filtru:</strong> <code>gt</code> (větší než), <code>lt</code> (menší než), <code>eq</code> (rovno).
                </div>
              </div>

              {/* Formulářová pole úlohy 2 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      2.1 Použitý příkaz v CMD:
                    </label>
                    <input
                      type="text"
                      value={protocol.task2MemCmd || ''}
                      onChange={(e) => setProtocol({ ...protocol, task2MemCmd: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      2.2 Největší proces nad 100 MB:
                    </label>
                    <input
                      type="text"
                      value={protocol.task2TopProcess || ''}
                      onChange={(e) => setProtocol({ ...protocol, task2TopProcess: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      2.3 Využití paměti RAM:
                    </label>
                    <input
                      type="text"
                      value={protocol.task2TopMemValue || ''}
                      onChange={(e) => setProtocol({ ...protocol, task2TopMemValue: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 3: FORENZNÍ EXPORT DO CSV A TABULKOVÁ ANALÝZA ANOMÁLIÍ
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task4'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task4'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 3: Forenzní export do CSV a tabulková analýza anomálií
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Přesměrování výstupu do souboru a hloubková prověrka instancí svchost.exe v Excelu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task4')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task4'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task4'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Vyexportujte kompletní seznam běžících procesů do formátu CSV a proveďte tabulkovou analýzu v Excelu nebo LibreOffice Calc.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Použijte nástroj <code>tasklist</code> s parametrem formátu výstupu (<code>/FO</code>) a operátorem přesměrování do souboru <code>procesy.csv</code>.</li>
                  <li>V tabulce seřaďte procesy podle sloupce využití paměti a spočítejte celkový počet instancí <code>svchost.exe</code>.</li>
                  <li>Zkontrolujte, zda některý <code>svchost.exe</code> nevykazuje anomální hodnoty RAM (stovky MB), což značí malware nebo chybu.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Formátování výstupu:</strong> parametr <code>/FO CSV</code> formátuje výstup do čárkami oddělených hodnot vhodných pro tabulkový procesor.
                </div>
              </div>

              {/* Formulářová pole úlohy 3 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      3.1 Příkaz pro export do CSV:
                    </label>
                    <input
                      type="text"
                      value={protocol.task4ExportCmd || ''}
                      onChange={(e) => setProtocol({ ...protocol, task4ExportCmd: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      3.2 Proces s největší RAM v tabulce:
                    </label>
                    <input
                      type="text"
                      value={protocol.task4TopRamProcess || ''}
                      onChange={(e) => setProtocol({ ...protocol, task4TopRamProcess: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      3.3 Počet nalezených instancí svchost.exe:
                    </label>
                    <input
                      type="text"
                      value={protocol.task4SvchostCount || ''}
                      onChange={(e) => setProtocol({ ...protocol, task4SvchostCount: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    3.4 Audit anomálií: Vykazuje některý svchost.exe podezřele vysokou paměť RAM nebo cizí název?
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.task4SvchostAnomaly || ''}
                    onChange={(e) => setProtocol({ ...protocol, task4SvchostAnomaly: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 4: ODPOSLECH A AUDIT SÍŤOVÝCH SPOJENÍ V RESMON.EXE
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task5'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task5'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 4: Odposlech síťových spojení prohlížeče v Sledování prostředků (resmon.exe – Chrome)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Vyhledání odchozí IP adresy prohlížeče a ověření organizace vlastníka (Google)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task5')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task5'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task5'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  V nástroji <strong>Sledování prostředků</strong> (<code>resmon.exe</code> ➔ záložka <strong>Síť</strong>) prověřte aktivní síťovou telemetrii procesů.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>V sekci <em>Připojení TCP</em> vyhledejte proces prohlížeče (Chrome/Edge) a opište jednu cílovou IP adresu.</li>
                  <li>Tuto IP adresu prověřte na službě pro reputaci a Whois (<a href="https://ipinfo.io" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">ipinfo.io</a> nebo <a href="https://whois.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">whois.com</a>) a zjistěte organizaci vlastníka.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Bezpečnostní pravidlo:</strong> Běžný web komunikuje na portech 80/443. Nestandardní porty (např. 4444, 1337) na neznámé zahraniční IP značí podezřelou aktivitu.
                </div>
              </div>

              {/* Formulářová pole úlohy 4 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      4.1 Odchozí IP adresa procesu Chrome (z resmon.exe):
                    </label>
                    <input
                      type="text"
                      value={protocol.task5ChromeIp || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5ChromeIp: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      4.2 Legitimní organizace / vlastník této IP (z IPinfo / Whois):
                    </label>
                    <input
                      type="text"
                      value={protocol.task5IpOwner || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5IpOwner: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 5: HROMADNÝ EXPORT SPOJENÍ DO TABULKY A IDENTIFIKACE WEBŮ POMOCÍ AI
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['taskSeznam'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['taskSeznam'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 5: Hromadný export spojení do tabulky a identifikace webů pomocí AI
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Kopírování telemetrie TCP z resmon.exe do tabulkového editoru a hromadná identifikace vlastníků IP přes AI
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('taskSeznam')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['taskSeznam'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['taskSeznam'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  V prohlížeči otevřete web <strong>www.seznam.cz</strong> a v nástroji <strong>resmon.exe</strong> (záložka <strong>Síť</strong> ➔ <em>Připojení TCP</em>) zkopírujte celou telemetrii do tabulky:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>V tabulce <em>Připojení TCP</em> označte všechny řádky vašeho prohlížeče (např. <code>chrome.exe</code>) a zkopírujte je do schránky (<strong>Ctrl+C</strong>).</li>
                  <li>Data vložte do tabulkového editoru (Excel, Google Tabulky nebo Calc) a vyfiltrujte sloupec <em>Vzdálená adresa</em>.</li>
                  <li>S pomocí <strong>AI asistenta</strong> (ChatGPT, Copilot apod.) najděte způsob, jak hromadně identifikovat, kterým webům a organizacím tyto IP adresy náleží.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Forenzní analýza s AI:</strong> AI dokáže z tabulky bleskově vyčíst unikátní adresy a rozřadit je podle provozovatelů (servery Seznamu, CDN sítě jako Akamai/Cloudflare, analytické a reklamní servery).
                </div>
              </div>

              {/* Formulářová pole úlohy 5 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    5.1 Použitý prompt pro AI a způsob hromadné identifikace IP z tabulky:
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.taskSeznamAiPrompt || ''}
                    onChange={(e) => setProtocol({ ...protocol, taskSeznamAiPrompt: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    5.2 Identifikované weby, organizace a infrastruktura (výsledek šetření přes AI):
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.taskSeznamIdentifiedWebs || ''}
                    onChange={(e) => setProtocol({ ...protocol, taskSeznamIdentifiedWebs: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    5.3 Závěr šetření: Proč jediná stránka Seznam.cz komunikuje s tolika různými servery a IP adresami?:
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.taskSeznamReflection || ''}
                    onChange={(e) => setProtocol({ ...protocol, taskSeznamReflection: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 6: INSPEKCE DIGITÁLNÍHO PODPISU A CERTIFIKÁTU APLIKACE (VLC)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['taskCert'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['taskCert'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 6: Inspekce digitálního podpisu a certifikátu aplikace v Průzkumníku Windows (např. vlc.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Zkoumání kryptografické pečeti v Průzkumníku Windows, řetězce důvěry (CA) a detailů certifikátu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('taskCert')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['taskCert'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['taskCert'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Ověřte kryptografický rodný list spustitelného souboru v Průzkumníku Windows (např. <code>vlc.exe</code>, <code>notepad++.exe</code> či <code>chrome.exe</code>).
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Otevřete <strong>Vlastnosti</strong> programu ➔ záložka <strong>Digitální podpisy</strong> ➔ <strong>Podrobnosti</strong> ➔ <strong>Zobrazit certifikát</strong>.</li>
                  <li>Zkontrolujte hlášení o platnosti podpisu a z jednotlivých záložek certifikátu vyčtěte níže uvedené parametry.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Certifikační cesta:</strong> Zobrazuje řetězec důvěry (Root CA ➔ Intermediate CA ➔ Vlastní certifikát). Chybějící záložka značí nepodepsaný soubor.
                </div>
              </div>

              {/* Formulářová pole úlohy 6 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      6.1 Prověřovaný program a cesta k souboru:
                    </label>
                    <input
                      type="text"
                      value={protocol.taskCertProgram || ''}
                      onChange={(e) => setProtocol({ ...protocol, taskCertProgram: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      6.2 Vystaveno pro (Subjekt / Vlastník podpisu):
                    </label>
                    <input
                      type="text"
                      value={protocol.taskCertSubject || ''}
                      onChange={(e) => setProtocol({ ...protocol, taskCertSubject: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      6.3 Vystavitel certifikátu (Certifikační autorita CA):
                    </label>
                    <input
                      type="text"
                      value={protocol.taskCertIssuer || ''}
                      onChange={(e) => setProtocol({ ...protocol, taskCertIssuer: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    6.4 Celkový stav podpisu a řetězec důvěry (Certifikační cesta):
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.taskCertChainStatus || ''}
                    onChange={(e) => setProtocol({ ...protocol, taskCertChainStatus: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 7: INSPEKCE STROMU V PROCESS EXPLORERU
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task6'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    7
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task6'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 7: Inspekce procesního stromu v Sysinternals Process Explorer
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověřování digitálních podpisů Authenticode a cloudová detekce VirusTotal
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task6')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task6'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task6'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  V nástroji <strong>Sysinternals Process Explorer</strong> ověřte běžící procesy a cloudovou reputaci VirusTotal.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>V horním menu aktivujte volby <strong>Options ➔ Verify Image Signatures</strong> a <strong>Check VirusTotal.com</strong>.</li>
                  <li>Zkontrolujte sloupec <em>Verified Signer</em> u <code>explorer.exe</code> a skóre VirusTotal u vybraného <code>svchost.exe</code>.</li>
                  <li>V <em>Options ➔ Configure Colors</em> zjistěte význam růžové (systémové služby) a fialové barvy.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Fialová barva (Packed Images):</strong> Označuje kompresi/šifrování packerem (např. UPX) – typická technika autorů malwaru pro zakrytí kódu.
                </div>
              </div>

              {/* Formulářová pole úlohy 7 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      7.1 Ověřený podpis explorer.exe (Verified Signer):
                    </label>
                    <input
                      type="text"
                      value={protocol.task6ExplorerSigner || ''}
                      onChange={(e) => setProtocol({ ...protocol, task6ExplorerSigner: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      7.2 VirusTotal skóre svchost.exe:
                    </label>
                    <input
                      type="text"
                      value={protocol.task6SvchostScore || ''}
                      onChange={(e) => setProtocol({ ...protocol, task6SvchostScore: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      7.3 Další prověřená aplikace ze systému:
                    </label>
                    <input
                      type="text"
                      value={protocol.task6BonusApp || ''}
                      onChange={(e) => setProtocol({ ...protocol, task6BonusApp: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      7.4 Co v Process Exploreru značí RŮŽOVÁ barva řádku?:
                    </label>
                    <textarea
                      rows={2}
                      value={protocol.task6PinkMeaning || ''}
                      onChange={(e) => setProtocol({ ...protocol, task6PinkMeaning: e.target.value })}
                      placeholder=""
                      className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      7.5 Co značí FIALOVÁ barva řádku (Packed Images) a proč je podezřelá?:
                    </label>
                    <textarea
                      rows={2}
                      value={protocol.task6PurpleMeaning || ''}
                      onChange={(e) => setProtocol({ ...protocol, task6PurpleMeaning: e.target.value })}
                      placeholder=""
                      className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 8: VÝPOČET KRYPTOGRAFICKÉHO HASHU V CMD (certutil)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task7'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    8
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task7'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 8: Výpočet kryptografického hashe v CMD (certutil) a lustrace na VirusTotal.com
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověření integrity souboru notepad.exe přes 64znakový SHA-256 otisk
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task7')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task7'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task7'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Vypočtěte kontrolní součet systémového souboru a ověřte jeho reputaci v globální databázi VirusTotal.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>V Příkazovém řádku zadejte: <code>certutil -hashfile C:\Windows\System32\notepad.exe SHA256</code>.</li>
                  <li>Zkopírujte vypsaný 64znakový hash a vyhledejte jej na webu <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">VirusTotal.com</a> v záložce <strong>Search</strong>.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Výhoda hashe:</strong> Výpočet hashe umožňuje prověřit integritu souboru online bez rizika odeslání citlivých dat na internet.
                </div>
              </div>

              {/* Formulářová pole úlohy 8 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      8.1 Vypočtený 64znakový SHA-256 hash (notepad.exe):
                    </label>
                    <input
                      type="text"
                      value={protocol.task7Hash || ''}
                      onChange={(e) => setProtocol({ ...protocol, task7Hash: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      8.2 Výsledek reputace na VirusTotal.com:
                    </label>
                    <input
                      type="text"
                      value={protocol.task7VtScore || ''}
                      onChange={(e) => setProtocol({ ...protocol, task7VtScore: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 9: SMART APP CONTROL (SAC) V ZABEZPEČENÍ WINDOWS
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task8'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    9
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task8'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 9: Aktivní obranný val Windows 11 – Smart App Control (SAC)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ochrana před spuštěním neznámých programů v paměti RAM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task8')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task8'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task8'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Zkontrolujte stav bezpečnostní vrstvy Windows 11 blokující spuštění nedůvěryhodných aplikací.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Otevřete <strong>Zabezpečení Windows ➔ Řízení aplikací a prohlížečů ➔ Nastavení Smart App Control</strong>.</li>
                  <li>Zapište aktuální stav (Zapnuto / Hodnocení / Vypnuto) a zdůvodněte výhodu blokování před načtením do RAM oproti běžnému antiviru.</li>
                </ul>
                <div className="pt-1 text-[11px] text-slate-500">
                  💡 <strong>Stavy SAC:</strong> <em>Zapnuto</em> (blokuje), <em>Hodnocení / Evaluation</em> (učí se chování uživatele bez blokování), <em>Vypnuto</em>.
                </div>
              </div>

              {/* Formulářová pole úlohy 9 */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      9.1 Stav funkce Smart App Control na vašem PC (Zapnuto / Hodnocení / Vypnuto):
                    </label>
                    <input
                      type="text"
                      value={protocol.task8SacStatus || ''}
                      onChange={(e) => setProtocol({ ...protocol, task8SacStatus: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      9.2 Proč je blokování před spuštěním v RAM účinnější než pouhé čekání na virus?:
                    </label>
                    <textarea
                      rows={2}
                      value={protocol.task8SacReason || ''}
                      onChange={(e) => setProtocol({ ...protocol, task8SacReason: e.target.value })}
                      placeholder=""
                      className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 10**: ODHALENÍ SYSTÉMOVÝCH SLUŽEB POD PROCESY (tasklist /svc)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task3'] ? 'bg-indigo-50/40 border-indigo-400' : 'bg-white border-indigo-200 hover:border-indigo-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-10 h-8 rounded-xl bg-indigo-950 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    10**
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task3'] ? 'text-indigo-950' : 'text-slate-800'}`}>
                      Úloha 10**: Odhalení skrytých systémových služeb pod procesy (tasklist /svc)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Mapování konkrétních služeb Windows na PID procesů svchost.exe přímo v příkazovém řádku
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task3')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task3'] 
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task3'] ? (
                    <><CheckSquare className="w-4 h-4 text-indigo-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Zadání a postup práce */}
              <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-indigo-950">
                  Prozkoumejte, které systémové služby Windows běží uvnitř instancí <code>svchost.exe</code> (přepínač <code>/svc</code>).
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>V Příkazovém řádku spusťte: <code>tasklist /svc /fi "IMAGENAME eq svchost.exe"</code>.</li>
                  <li>Vyberte jedno PID, zapište zkratky běžících služeb (např. <code>Dnscache</code>, <code>gpsvc</code>, <code>wuauserv</code>) a stručně vysvětlete jejich význam.</li>
                </ul>
                <div className="pt-1 text-[11px] text-indigo-900">
                  💡 <strong>Bezpečnostní pravidlo:</strong> Běžné aplikace mají ve sloupci Služby <code>N/A</code>. Pokud by <code>svchost.exe</code> měl <code>N/A</code> nebo neznámou službu, jde o maskovaný virus.
                </div>
              </div>

              {/* Formulářová pole úlohy 10** */}
              <div className="pt-4 border-t-2 border-slate-100 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <PencilLine className="w-3.5 h-3.5 text-indigo-600" /> Vstupní pole pro odpovědi a záznam zjištění:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      10.1 Použitý příkaz v CMD:
                    </label>
                    <input
                      type="text"
                      value={protocol.task3SvcCmd || ''}
                      onChange={(e) => setProtocol({ ...protocol, task3SvcCmd: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-mono text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      10.2 Zvolené PID procesu svchost.exe:
                    </label>
                    <input
                      type="text"
                      value={protocol.task3SvchostPid || ''}
                      onChange={(e) => setProtocol({ ...protocol, task3SvchostPid: e.target.value })}
                      placeholder=""
                      className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    10.3 Běžící systémové služby v tomto PID a vysvětlení jejich účelu:
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.task3SvcNames || ''}
                    onChange={(e) => setProtocol({ ...protocol, task3SvcNames: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                ZÁVĚREČNÝ ZÁZNAM ZJIŠTĚNÍ A EXPORT
                ========================================================================= */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-600" />
                    Závěrečný záznam zjištění a kontrolní otázky
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Shrňte výsledky svého vyšetřování a odpovězte na teoretické otázky před odevzdáním protokolu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyProtocolToClipboard}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-indigo-200 shadow-xs"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedSuccess ? 'Zkopírováno do schránky! ✅' : 'Kopírovat pro Teams'}</span>
                </button>
              </div>

              <div className="space-y-5 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide leading-relaxed">
                    1. Proč se malware nejčastěji maskuje právě pod název svchost.exe a podle jakých indicií (překlep ve jménu, cesta na disku, chybějící služba v /svc) ho spolehlivě odhalíte?
                  </label>
                  <textarea
                    rows={3}
                    value={protocol.qVirusWorm || ''}
                    onChange={(e) => setProtocol({ ...protocol, qVirusWorm: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[85px] p-4 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none leading-relaxed transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide leading-relaxed">
                    2. Proč je nutné spouštět diagnostické nástroje (Process Explorer, Příkazový řádek) jako Správce (Run as Administrator)?
                  </label>
                  <textarea
                    rows={3}
                    value={protocol.qRunAsAdmin || ''}
                    onChange={(e) => setProtocol({ ...protocol, qRunAsAdmin: e.target.value })}
                    placeholder=""
                    className="w-full min-h-[85px] p-4 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none leading-relaxed transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

          </div>
        </WorksheetLayout>
  );
}
