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
  Info 
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

            {/* Úvodní kontext praktické práce */}
            <div className="p-5 bg-blue-50/70 rounded-3xl border border-blue-200 text-xs text-blue-950 space-y-2 leading-relaxed">
              <div className="font-bold text-sm text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" /> Forenzní vyšetřování ve Windows 11 Pro / VirtualBoxu
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-200/70 text-blue-900">
                  Splněno úloh: {Object.values(checkedTasks).filter(Boolean).length} / 8
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Představte si situaci: Uživatel hlásí zamrznutí počítače a Správce úloh (Task Manager) nelze otevřít, protože ho malware zablokoval nebo systém nereaguje na klávesové zkratky. 
                  Správce se musí připojit přes vzdálenou textovou konzoli nebo spustit <strong>Příkazový řádek (cmd.exe)</strong> a bleskově zjistit stav klíčových součástí Windows – v tomto případě procesu <strong>explorer.exe</strong>, který řídí plochu, hlavní panel a okna.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Stiskněte klávesovou zkratku <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono">Win + R</kbd>, napište <code>cmd</code> a stiskněte Enter.</li>
                  <li>Využijte známý příkaz <code>tasklist</code> k nalezení běžícího procesu <strong>explorer.exe</strong>.</li>
                  <li>Pokud je seznam příliš dlouhý, prozkoumejte možnosti filtrování výstupu přímo podle názvu obrazu bez nutnosti ručního procházení stovek řádků.</li>
                  <li>Opište zjištěné PID, využití paměti a použitý příkaz do formuláře níže.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak najít přepínače příkazu tasklist v CMD?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>V Příkazovém řádku zadejte <code>tasklist /?</code>. V nápovědě vyhledejte parametr pro filtrování (<code>/FI</code>).</p>
                  <p>Všimněte si, jak se zadává podmínka pro název procesu (ImageName eq ...) – porovnání probíhá s uvozovkami.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 1 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěné údaje o procesu explorer.exe:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Identifikátor PID:</label>
                    <input
                      type="text"
                      value={protocol.task1Pid}
                      onChange={(e) => setProtocol({ ...protocol, task1Pid: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Využití paměti (K):</label>
                    <input
                      type="text"
                      value={protocol.task1Memory}
                      onChange={(e) => setProtocol({ ...protocol, task1Memory: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Přesný příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task1Cmd}
                      onChange={(e) => setProtocol({ ...protocol, task1Cmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Když je počítač napaden těžebním malwarem (cryptominerem), ransomwarem připravujícím šifrovací klíče nebo programem s paměťovým únikem (memory leak), 
                  tento proces začne spotřebovávat obrovské množství operační paměti RAM. Běžný seznam stovek procesů je nepřehledný, ale správce dokáže pomocí filtru 
                  <code>tasklist /fi</code> okamžitě vypsat pouze ty procesy, které překračují stanovenou hranici (např. 100 MB).
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) využijte příkaz <code>tasklist</code> s filtrem na využití paměti (<code>MEMUSAGE</code>).</li>
                  <li>Nastavte podmínku na hodnotu větší než 100 MB (pozor: systém očekává hodnotu v kilobajtech, tedy <strong>100 000 KB</strong>).</li>
                  <li>Zkontrolujte vypsané procesy a najděte ten, který ve vašem systému alokuje nejvíce paměti.</li>
                  <li>Vyplňte použitý příkaz a zjištěné hodnoty do formuláře níže.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak zapsat podmínku pro paměť větší než 100 MB?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Operátor <strong>větší než</strong> se v příkazu tasklist zapisuje zkratkou <code>gt</code> (greater than).</p>
                  <p>Příkaz zadejte takto: <code>tasklist /fi "MEMUSAGE gt 100000"</code></p>
                  <p>Pokud chcete obráceně vypsat menší procesy, použije se <code>lt</code> (less than) nebo pro přesnou shodu <code>eq</code>.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 2 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěná data o procesech nad 100 MB RAM:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Použitý příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task2MemCmd}
                      onChange={(e) => setProtocol({ ...protocol, task2MemCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Největší proces nad 100 MB:</label>
                    <input
                      type="text"
                      value={protocol.task2TopProcess}
                      onChange={(e) => setProtocol({ ...protocol, task2TopProcess: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Využití paměti tohoto procesu:</label>
                    <input
                      type="text"
                      value={protocol.task2TopMemValue}
                      onChange={(e) => setProtocol({ ...protocol, task2TopMemValue: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 3: ODHALENÍ SYSTÉMOVÝCH SLUŽEB POD PROCESY (tasklist /svc)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task3'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task3'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 3: Odhalení skrytých systémových služeb pod procesy (tasklist /svc)
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
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task3'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-2 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Přirovnání: Autobus a cestující):
                </div>
                <p>
                  Představte si <strong>svchost.exe</strong> jako <strong>autobus</strong>. Sám o sobě nic nedělá – je to jen schránka, která veze skutečné pracovníky: systémové služby Windows (např. Windows Update, správce sítě, zvuk).
                </p>
                <p>
                  Když v CMD napíšete obyčejný <code>tasklist</code>, vidíte jen desítky stejných bílých autobusů se zatmavenými skly. Nevíte, co kdo veze, a útočníci se za název <code>svchost.exe</code> rádi maskují. 
                  Přepínač <code>/svc</code> funguje jako <strong>policejní rentgen</strong>: nahlédne dovnitř autobusu a ke každému číslu PID vypíše přesný seznam běžících služeb!
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) spusťte příkaz <code>tasklist /svc</code>.</li>
                  <li>
                    Všimněte si sloupce <strong>Služby (Services)</strong>: u běžných aplikací (např. <code>chrome.exe</code>) je napsáno <code>N/A</code> (Not Applicable – jsou to samostatné programy, nevezou žádnou službu).
                  </li>
                  <li>
                    Filtrem si nechte vypsat pouze autobusy: <code>tasklist /svc /fi "IMAGENAME eq svchost.exe"</code>.
                  </li>
                  <li>Vyberte libovolný řádek <code>svchost.exe</code>, zapište jeho PID a zkratku služby, kterou veze (např. <code>gpsvc</code>, <code>ClipSVC</code>, <code>Dnscache</code>).</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda &amp; Tahák: Co znamenají zkratky služeb a hodnota N/A?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-2 pt-2 border-t border-amber-200/60">
                  <p><strong>Příkaz pro vyfiltrování pouze svchostů:</strong> <code>tasklist /svc /fi "IMAGENAME eq svchost.exe"</code></p>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-300/60 space-y-1 font-mono text-[11px]">
                    <div>• <strong>N/A</strong> = Not Applicable (běžný program jako Chrome nebo Kalkulačka, neběží jako služba)</div>
                    <div>• <strong>gpsvc</strong> = Group Policy Client (Zásady skupiny – školní/firemní pravidla a omezení PC)</div>
                    <div>• <strong>ClipSVC</strong> = Client License Service (licence aplikací a Microsoft Store)</div>
                    <div>• <strong>Dnscache</strong> = DNS klient (překlad webových domén jako seznam.cz na IP adresy)</div>
                    <div>• <strong>wuauserv</strong> = Windows Update (stahování a instalace oprav systému)</div>
                    <div>• <strong>LanmanWorkstation</strong> = síťová služba pro připojování ke sdíleným složkám</div>
                    <div>• <strong>NcdAutoSetup</strong> = automatické hledání a připojení zařízení v síti (tiskárny, TV)</div>
                  </div>
                  <p className="text-rose-900 font-semibold">
                    ⚠️ <strong>Kdy zpozornět:</strong> Kdyby proces <code>svchost.exe</code> měl ve sloupci Služby napsáno <code>N/A</code> (tedy prázdný autobus bez služby), nebo měl neznámou službu z podivné složky, jedná se o maskovaný virus!
                  </p>
                </div>
              </details>

              {/* Formulářová pole úlohy 3 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění z mapování služeb na procesy:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Použitý příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task3SvcCmd}
                      onChange={(e) => setProtocol({ ...protocol, task3SvcCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Zvolené PID procesu svchost:</label>
                    <input
                      type="text"
                      value={protocol.task3SvchostPid}
                      onChange={(e) => setProtocol({ ...protocol, task3SvchostPid: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Běžící systémové služby v tomto PID:</label>
                    <input
                      type="text"
                      value={protocol.task3SvcNames}
                      onChange={(e) => setProtocol({ ...protocol, task3SvcNames: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 4: FORENZNÍ EXPORT DO CSV A TABULKOVÁ ANALÝZA ANOMÁLIÍ
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task4'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task4'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 4: Forenzní export do CSV a tabulková analýza anomálií
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Ve Windows běží současně 200 až 300 procesů. Číst je očima v černém okně terminálu je nepřehledné a zdlouhavé. 
                  Pokud se ale data vyexportují do Excelu, můžete procesy okamžitě seřadit podle spotřeby paměti, spočítat výskyty a odhalit anomálie. 
                  Útočník se rád maskuje za <code>svchost.exe</code>, protože doufá, že mezi desítkami instancí zanikne. 
                  V tabulce ale ihned spatříte, zda některý <code>svchost.exe</code> nemá neobvykle vysokou spotřebu paměti nebo nevybočuje z normálu.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) vyexportujte seznam všech běžících procesů do formátu CSV (např. do souboru <code>procesy.csv</code> na plochu).</li>
                  <li>Otevřete vygenerovaný CSV soubor v <strong>Microsoft Excelu</strong> (nebo LibreOffice Calc).</li>
                  <li>Seřaďte data podle sloupce <strong>Využití paměti</strong> od největšího po nejmenší a identifikujte nejnáročnější proces v PC.</li>
                  <li>Pomocí filtru nebo vyhledávání zjistěte, kolikrát přesně se v seznamu vyskytuje proces <code>svchost.exe</code>.</li>
                  <li>Zkontrolujte, zda žádná instance <code>svchost.exe</code> nevykazuje abnormálně vysokou paměť RAM (např. stovky MB), což by značilo únik paměti nebo maskovaný virus.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak vyexportovat výstup do CSV a přesměrovat do souboru?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Bude třeba použít parametr <code>/FO CSV</code> a přesměrovat výstup do souboru.</p>
                  <p>K dohledání konkrétního postupu a operátoru pro přesměrování můžete použít jakýkoliv zdroj informací (nápovědu <code>tasklist /?</code>, internet či dokumentaci).</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 4 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Výsledky forenzní tabulkové analýzy:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Příkaz pro export do CSV:</label>
                    <input
                      type="text"
                      value={protocol.task4ExportCmd}
                      onChange={(e) => setProtocol({ ...protocol, task4ExportCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Proces s největší RAM:</label>
                    <input
                      type="text"
                      value={protocol.task4TopRamProcess}
                      onChange={(e) => setProtocol({ ...protocol, task4TopRamProcess: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Počet instancí svchost.exe:</label>
                    <input
                      type="text"
                      value={protocol.task4SvchostCount}
                      onChange={(e) => setProtocol({ ...protocol, task4SvchostCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Audit anomálií procesů:</label>
                    <input
                      type="text"
                      value={protocol.task4SvchostAnomaly}
                      onChange={(e) => setProtocol({ ...protocol, task4SvchostAnomaly: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 5: ODPOSLECH A AUDIT SÍŤOVÝCH SPOJENÍ V RESMON.EXE
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task5'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task5'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 5: Odposlech a audit síťových spojení v Sledování prostředků (resmon.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověření odchozích IP adres, hromadná analýza v tabulce a rozpoznání podezřelých serverů
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Spyware, trojské koně a keyloggery mají po infikování stroje společný cíl: odeslat ukradená data útočníkovi na řídicí server (C2 – Command and Control server). 
                  Podobně i pochybné či zavirované webové stránky otevírají na pozadí desítky skrytých spojení na cizí servery a reklamní trackery po celém světě. 
                  Nástroj <strong>resmon.exe</strong> umožňuje v reálném čase sledovat, které procesy otevírají odchozí spojení a s jakými konkrétními IP adresami komunikují.
                </p>
              </div>

              {/* Postup práce rozdělený na 3 kroky */}
              <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce (3 vyšetřovací kroky):</div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">1</span>
                    Krok 1: Prověření jednoho odchozího spojení (Google Chrome)
                  </div>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                    <li>Spusťte nástroj <strong>Sledování prostředků</strong> (stiskněte <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Win + R</kbd> a zadejte <code>resmon.exe</code>).</li>
                    <li>Přejděte na záložku <strong>Síť (Network)</strong> a rozbalte sekci <strong>Připojení TCP (TCP Connections)</strong>.</li>
                    <li>Najděte proces prohlížeče (např. <code>chrome.exe</code>) s aktivním spojením a opište jednu z jeho cílových IP adres ze sloupce <strong>Vzdálená adresa (Remote Address)</strong>.</li>
                    <li>Tuto IP adresu prověřte na webové službě pro IP reputaci a Whois (např. <a href="https://ipinfo.io" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">IPinfo.io</a>, <a href="https://whois.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">Whois.com</a> nebo <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">VirusTotal.com</a>) a zjistěte, zda patří legitimní společnosti (např. Google LLC, Cloudflare, Akamai).</li>
                  </ol>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">2</span>
                    Krok 2: Hromadný export spojení (Edge + Seznam.cz) do tabulky v Excelu
                  </div>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                    <li>Spusťte prohlížeč <strong>Microsoft Edge</strong> a otevřete stránku <code>seznam.cz</code>.</li>
                    <li>V <code>resmon.exe</code> v sekci Připojení TCP vyhledejte procesy <code>msedge.exe</code>.</li>
                    <li>Označte všechny řádky spojení procesu Edge (klikněte na první, podržte Shift a klikněte na poslední) a zkopírujte je zkratkou <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + C</kbd>.</li>
                    <li>Otevřete tabulkový editor (Excel nebo LibreOffice Calc) a vložte data zkratkou <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + V</kbd> – data se přehledně vloží do jednotlivých sloupců tabulky.</li>
                    <li>V tabulce vyberte sloupec se vzdálenými IP adresami a zjistěte/navrhněte způsob, jak tyto IP adresy hromadně prověřit (např. hromadný online Whois nástroj nebo kontrola příslušnosti k doménám Seznamu a CDN).</li>
                  </ol>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">3</span>
                    Krok 3: Zamyslení – jak odhalit podezřelé stránky v síťové telemetrii
                  </div>
                  <p className="text-slate-600 pl-1">
                    Zamyslete se: jaká webová stránka (např. neoficiální stahovací portál, warez, pirátský streaming s agresivními skripty nebo phishing) by po otevření vyvolala podezřelá spojení? 
                    Jak by se taková podezřelá telemetrie v resmonu a v tabulce projevila oproti návštěvě běžného Seznamu?
                  </p>
                </div>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Webové služby pro prověření IP adres a doplňující informace o síťových portech</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-2 pt-2 border-t border-amber-200/60">
                  <p>• <strong>Kde prověřit jednu IP adresu:</strong> Služby <a href="https://ipinfo.io" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">ipinfo.io</a> nebo <a href="https://whois.com" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">whois.com</a> po zadání IP adresy vypíšou název organizace (ASN), zemi registrace a poskytovatele hostingu.</p>
                  <p>• <strong>Hromadné ověření (Bulk Lookup):</strong> Pro prověření desítek IP adres najednou lze v prohlížeči vyhledat online nástroje typu <em>„Bulk IP lookup“</em> (např. WhatIsMyIPAddress Bulk IP Lookup, IPVoid nebo AbuseIPDB), do kterých lze vložit celý sloupec adres najednou.</p>
                  <p>• <strong>Doplňující informace o síťových portech:</strong> Běžný webový provoz využívá porty <strong>80</strong> (nešifrovaný HTTP) a <strong>443</strong> (šifrovaný HTTPS). Pokud proces otevírá nestandardní vysoké porty (např. 4444, 1337) na neznámé zahraniční IP adresy, je to typický varovný signál škodlivé komunikace či reverzního shellu.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 5 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěná síťová telemetrie a záznam zjištění:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">1. Odchozí IP adresa procesu Chrome (z resmon.exe):</label>
                    <input
                      type="text"
                      value={protocol.task5ChromeIp || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5ChromeIp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">1. Legitimní organizace / vlastník této IP (z IPinfo / Whois):</label>
                    <input
                      type="text"
                      value={protocol.task5IpOwner || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5IpOwner: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">2. Jak lze sloupce IP adres ze Seznam.cz v tabulce hromadně prověřit?:</label>
                    <input
                      type="text"
                      value={protocol.task5BulkMethod || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5BulkMethod: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">3. Zamyslení: Který web by otevřel podezřelá spojení a jak je poznat?:</label>
                    <textarea
                      rows={2}
                      value={protocol.task5SuspiciousReflection || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5SuspiciousReflection: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 6: INSPEKCE STROMU V PROCESS EXPLORERU
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task6'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task6'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 6: Inspekce procesního stromu v Sysinternals Process Explorer
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Sysinternals Process Explorer je zlatý standard každého vyšetřovatele kybernetických incidentů. 
                  Umožňuje okamžitě ověřit, zda je proces kryptograficky podepsán vydavatelem (Authenticode podpis od Microsoftu) 
                  a jediným kliknutím zkontrolovat hash běžícího binárního souboru v databázi více než 70 antivirových enginů VirusTotal. 
                  Barevné kódování navíc vizuálně odděluje systémové služby od běžných programů.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Otevřete <strong>Process Explorer</strong> jako Správce (Run as Administrator) na školním PC nebo v simulátoru na záložce 2.</li>
                  <li>Zapněte volbu <strong>Options ➔ Verify Image Signatures</strong> a <strong>Check VirusTotal.com</strong>.</li>
                  <li>Ověřte sloupec <strong>Verified Signer</strong> u procesu <code>explorer.exe</code>.</li>
                  <li>Zkontrolujte VirusTotal skóre u libovolné instance <code>svchost.exe</code>.</li>
                  <li>V menu <strong>Options ➔ Configure Colors</strong> zjistěte, co značí růžové a fialové zvýraznění řádků.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Proč Process Explorer zobrazuje některé řádky fialově?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Fialová barva (Packed Images) indikuje, že spustitelný soubor byl zkomprimován nebo zašifrován packerem (např. UPX). Autoři malwaru packery běžně používají k tomu, aby skryli svůj kód před antivirovými skenery.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 6 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění z Process Exploreru:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Ověřený podpis explorer.exe:</label>
                    <input
                      type="text"
                      value={protocol.task6ExplorerSigner}
                      onChange={(e) => setProtocol({ ...protocol, task6ExplorerSigner: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">VirusTotal skóre svchost:</label>
                    <input
                      type="text"
                      value={protocol.task6SvchostScore}
                      onChange={(e) => setProtocol({ ...protocol, task6SvchostScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Význam růžové barvy:</label>
                    <input
                      type="text"
                      value={protocol.task6PinkMeaning}
                      onChange={(e) => setProtocol({ ...protocol, task6PinkMeaning: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Význam fialové barvy:</label>
                    <input
                      type="text"
                      value={protocol.task6PurpleMeaning}
                      onChange={(e) => setProtocol({ ...protocol, task6PurpleMeaning: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Další prověřená aplikace:</label>
                    <input
                      type="text"
                      value={protocol.task6BonusApp}
                      onChange={(e) => setProtocol({ ...protocol, task6BonusApp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 7: VÝPOČET KRYPTOGRAFICKÉHO HASHU V CMD (certutil)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task7'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    7
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task7'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 7: Výpočet kryptografického hashe v CMD (certutil) a lustrace na VirusTotal.com
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Když bezpečnostní analytik zkoumá podezřelý soubor, nesmí ho bezmyšlenkovitě nahrávat na veřejný internet, protože by mohl vyzradit citlivá firemní data. 
                  Místo toho z něj přímo v Příkazovém řádku spočítá <strong>kryptografický otisk (SHA-256 hash)</strong>. 
                  Tento 64znakový kód pak vyhledá v globální databázi VirusTotal. Pokud stejný soubor už někdo ve světě viděl, VirusTotal okamžitě vrátí jeho historii, jméno autora a bezpečnostní hodnocení.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) spočítejte SHA-256 hash systémového souboru <code>C:\Windows\System32\notepad.exe</code> pomocí vestavěného nástroje <code>certutil</code>.</li>
                  <li>Zkopírujte vypsaný 64znakový hexadecimální řetězec.</li>
                  <li>Přejděte na web <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">VirusTotal.com</a>, přepněte na záložku <strong>Search</strong> a hash vložte.</li>
                  <li>Zkontrolujte výsledek reputační analýzy (kolik bezpečnostních enginů hlásí čistý soubor).</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak funguje vestavěný příkaz certutil v CMD?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Nástroj <code>certutil</code> je přímo součástí všech instalací Windows (není třeba nic stahovat ani otevírat PowerShell).</p>
                  <p>Příkaz <code>certutil -hashfile &lt;cesta_k_souboru&gt; SHA256</code> vypíše přesný 64znakový kontrolní součet na druhém řádku výstupu.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 7 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Výsledky hashovací analýzy:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vypočtený SHA-256 hash (notepad.exe):</label>
                    <input
                      type="text"
                      value={protocol.task7Hash}
                      onChange={(e) => setProtocol({ ...protocol, task7Hash: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Výsledek reputace na VirusTotal.com:</label>
                    <input
                      type="text"
                      value={protocol.task7VtScore}
                      onChange={(e) => setProtocol({ ...protocol, task7VtScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 8: SMART APP CONTROL (SAC) V ZABEZPEČENÍ WINDOWS
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task8'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    8
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task8'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 8: Aktivní obranný val Windows 11 – Smart App Control (SAC)
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

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Klasické antiviry reagovaly až se zpožděním na známé signatury. Moderní Windows 11 obsahuje vrstvu Smart App Control, která funguje jako přísný vyhazovač u dveří do paměti RAM: nepodepsané nebo zcela neznámé programy bez reputace zablokuje <strong>ještě dříve, než jejich instrukce procesor vůbec začne vykonávat</strong>.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Otevřete <strong>Zabezpečení Windows</strong> (vyhledejte ve Startu nebo klikněte na ikonu štítu u hodin).</li>
                  <li>Přejděte do sekce <strong>Řízení aplikací a prohlížečů</strong>.</li>
                  <li>Otevřete <strong>Nastavení funkce Smart App Control</strong> a zjistěte její aktuální stav.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jaké 3 stavy může funkce Smart App Control mít?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>• <strong>Zapnuto:</strong> Blokuje nedůvěryhodné aplikace v reálném čase.</p>
                  <p>• <strong>Hodnocení (Evaluation):</strong> Windows tiše monitoruje aplikace v pozadí, aniž by je blokoval, a zjišťuje, zda jste vhodný kandidát pro zapnutí bez falešných poplachů.</p>
                  <p>• <strong>Vypnuto:</strong> Funkce je neaktivní (pokud byla jednou vypnuta, lze ji znovu zapnout pouze čistou reinstalací Windows z důvodu bezpečnosti integrity).</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 8 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění o funkci Smart App Control:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Stav funkce Smart App Control na vašem PC:</label>
                    <input
                      type="text"
                      value={protocol.task8SacStatus}
                      onChange={(e) => setProtocol({ ...protocol, task8SacStatus: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Proč je tato ochrana účinnější než pouhé čekání na virus?:</label>
                    <input
                      type="text"
                      value={protocol.task8SacReason}
                      onChange={(e) => setProtocol({ ...protocol, task8SacReason: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ZÁVĚREČNÝ ZÁZNAM ZJIŠTĚNÍ A EXPORT
                ========================================================================= */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-600" />
                    Závěrečný záznam zjištění a kontrolní otázky
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Shrňte výsledky svého vyšetřování a odpovězte na teoretické otázky před odevzdáním.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyProtocolToClipboard}
                  className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-indigo-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copiedSuccess ? 'Zkopírováno!' : 'Kopírovat pro Teams'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1 leading-relaxed">
                    1. Proč se malware nejčastěji maskuje právě pod název svchost.exe a podle jakých indicií (překlep ve jménu, cesta na disku, chybějící služba v /svc) ho spolehlivě odhalíte?
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.qVirusWorm}
                    onChange={(e) => setProtocol({ ...protocol, qVirusWorm: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1 leading-relaxed">
                    2. Proč je nutné spouštět diagnostické nástroje (Process Explorer, Příkazový řádek) jako Správce (Run as Administrator)?
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.qRunAsAdmin}
                    onChange={(e) => setProtocol({ ...protocol, qRunAsAdmin: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

          </div>
        </WorksheetLayout>
  );
}
