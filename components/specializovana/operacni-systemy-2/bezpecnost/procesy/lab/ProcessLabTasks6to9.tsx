'use client';

import React from 'react';
import {
  Terminal, CheckSquare, Square, ShieldCheck, ShieldAlert,
  Activity, Network, Search, Sparkles, CheckCircle2, PencilLine, Lock
} from 'lucide-react';
import { ProcessProtocolState } from '../processTypes';

export interface ProcessLabSectionProps {
  checkedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  protocol: ProcessProtocolState;
  setProtocol: (protocol: ProcessProtocolState) => void;
}

export const ProcessLabTasks6to9: React.FC<ProcessLabSectionProps> = ({
  checkedTasks, toggleTask, protocol, setProtocol
}) => (
  <>
        {/* =========================================================================
            ÚLOHA 6: STOPOVÁNÍ KLÍČOVÉHO PROCESU V CLI (cmd.exe)
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task6'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                6
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task6'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 6: Stopování klíčového procesu v CLI (cmd.exe)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fáze 3: Proces v RAM paměti – zjištění PID a spotřeby paměti pro explorer.exe
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task6')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task6']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              V Příkazovém řádku (cmd.exe) vyhledejte běžící proces <strong>explorer.exe</strong> (grafické prostředí plochy) pomocí nástroje <code>tasklist</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Použijte parametr filtru <code>/FI</code> pro filtrování podle názvu obrazu.</li>
              <li>Opište zjištěné PID, velikost využité paměti RAM a přesné znění vámi sestaveného příkazu.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  6.1 Identifikátor PID:
                </label>
                <input
                  type="text"
                  value={protocol.task6ExplorerPid || ''}
                  onChange={(e) => setProtocol({ ...protocol, task6ExplorerPid: e.target.value })}
                  placeholder="např. 4820"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  6.2 Využití paměti RAM:
                </label>
                <input
                  type="text"
                  value={protocol.task6ExplorerMemory || ''}
                  onChange={(e) => setProtocol({ ...protocol, task6ExplorerMemory: e.target.value })}
                  placeholder="např. 125 400 K"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  6.3 Použitý příkaz:
                </label>
                <input
                  type="text"
                  value={protocol.task6ExplorerCmd || ''}
                  onChange={(e) => setProtocol({ ...protocol, task6ExplorerCmd: e.target.value })}
                  placeholder="Zadejte použitý příkaz..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 7: VÝPIS PROCESŮ S PAMĚTÍ NAD 100 MB V CLI
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task7'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                7
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task7'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 7: Výpis procesů s pamětí nad 100 MB v CLI (cmd.exe)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Filtrování procesů podle využití fyzické paměti RAM v příkazovém řádku
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task7')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task7']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              V Příkazovém řádku (cmd.exe) vyfiltrujte procesy s pamětí nad 100 MB (100 000 KB):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Sestavte příkaz <code>tasklist</code> s filtrem <code>/FI</code> (využijte vlastnost <code>MEMUSAGE</code> a operátor <code>gt</code> pro hodnotu nad 100 000 KB).</li>
              <li>Zapište použitý příkaz a proces s největší pamětí ve výsledku.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  7.1 Použitý příkaz:
                </label>
                <input
                  type="text"
                  value={protocol.task7MemCmd || ''}
                  onChange={(e) => setProtocol({ ...protocol, task7MemCmd: e.target.value })}
                  placeholder="Zadejte použitý příkaz..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  7.2 Proces s největší RAM nad 100 MB:
                </label>
                <input
                  type="text"
                  value={protocol.task7TopProcess || ''}
                  onChange={(e) => setProtocol({ ...protocol, task7TopProcess: e.target.value })}
                  placeholder="např. msedge.exe / chrome.exe / code.exe"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  7.3 Zjištěná hodnota paměti:
                </label>
                <input
                  type="text"
                  value={protocol.task7TopMemValue || ''}
                  onChange={(e) => setProtocol({ ...protocol, task7TopMemValue: e.target.value })}
                  placeholder="např. 485 200 K"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 8: ODPOSLECH SÍŤOVÝCH SPOJENÍ V RESMON.EXE
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task8'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                8
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task8'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 8: Odposlech síťových spojení procesu naživo (resmon.exe)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Identifikace cizí IP adresy a lustrace vlastníka přes Whois / IPinfo
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task8')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task8']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Spusťte <strong>resmon.exe</strong> (Sledování prostředků) a přejděte na záložku <strong>Síť ➔ Připojení TCP</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Vyberte aktivní spojení libovolného procesu (např. prohlížeč <code>chrome.exe</code> či <code>msedge.exe</code>).</li>
              <li>Zapište vzdálenou IP adresu, port a přes <code>https://ipinfo.io/&lt;IP&gt;</code> ověřte vlastníka sítě.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  8.1 Sledovaný proces:
                </label>
                <input
                  type="text"
                  value={protocol.task8NetworkProcess || ''}
                  onChange={(e) => setProtocol({ ...protocol, task8NetworkProcess: e.target.value })}
                  placeholder="např. chrome.exe / msedge.exe"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  8.2 Vzdálená IP adresa a port:
                </label>
                <input
                  type="text"
                  value={protocol.task8RemoteIp || ''}
                  onChange={(e) => setProtocol({ ...protocol, task8RemoteIp: e.target.value })}
                  placeholder="např. 142.250.185.206 : 443"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  8.3 Vlastník IP adresy (IPinfo / Whois):
                </label>
                <input
                  type="text"
                  value={protocol.task8IpOwner || ''}
                  onChange={(e) => setProtocol({ ...protocol, task8IpOwner: e.target.value })}
                  placeholder="např. Google LLC / Cloudflare / Microsoft"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                8.4 Zhodnocení: Jedná se o očekávanou legitimní infrastrukturu, nebo podezřelé spojení?:
              </label>
              <textarea
                rows={2}
                value={protocol.task8IsLegitimate || ''}
                onChange={(e) => setProtocol({ ...protocol, task8IsLegitimate: e.target.value })}
                placeholder="Zhodnoťte, zda spojení odpovídá načtenému webu, CDN síti či aktualizačnímu serveru..."
                className="w-full min-h-[60px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 9: LUSTRACE SOUBORŮ NA VIRUSTOTAL.COM (WinSCP & notepad.exe)
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task9'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                9
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task9'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 9: Cloudová reputace a lustrace na VirusTotal.com
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Prověření staženého WinSCP a systémového notepad.exe vůči 70+ antivirovým enginům
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task9')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task9']
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
            >
              {checkedTasks['task9'] ? (
                <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
              ) : (
                <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Na multiskeneru <strong>VirusTotal.com</strong> (záložka <strong>FILE</strong> nebo <strong>SEARCH</strong> pro hash) prověřte dva soubory:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>
                <strong>Stažený instalační balíček WinSCP:</strong> nahrajte soubor nebo vložte jeho SHA-256 hash z Úlohy 5.
              </li>
              <li>
                <strong>Systémový program notepad.exe:</strong> nahrajte soubor z <code>C:\Windows\notepad.exe</code>, nebo spočítejte a vyhledejte jeho hash.
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>

            {/* Soubor 1: WinSCP */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                1. Prověření staženého WinSCP (instalátor / hash)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    9.1 Skóre detekce na VirusTotalu:
                  </label>
                  <input
                    type="text"
                    value={protocol.task9WinscpVtScore || ''}
                    onChange={(e) => setProtocol({ ...protocol, task9WinscpVtScore: e.target.value })}
                    placeholder="např. 0/72"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    9.2 Zhodnocení bezpečnosti:
                  </label>
                  <input
                    type="text"
                    value={protocol.task9WinscpVerdict || ''}
                    onChange={(e) => setProtocol({ ...protocol, task9WinscpVerdict: e.target.value })}
                    placeholder="např. Čistý soubor, žádný antivirus nenašel hrozbu"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Soubor 2: notepad.exe */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                2. Prověření systémového programu notepad.exe
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    9.3 Skóre detekce na VirusTotalu:
                  </label>
                  <input
                    type="text"
                    value={protocol.task9NotepadVtScore || ''}
                    onChange={(e) => setProtocol({ ...protocol, task9NotepadVtScore: e.target.value })}
                    placeholder="např. 0/75"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    9.4 Zhodnocení bezpečnosti:
                  </label>
                  <input
                    type="text"
                    value={protocol.task9NotepadVerdict || ''}
                    onChange={(e) => setProtocol({ ...protocol, task9NotepadVerdict: e.target.value })}
                    placeholder="např. Oficiální systémová komponenta Microsoft Windows"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  </>
);
