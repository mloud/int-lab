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

export const ProcessLabTasks10to13: React.FC<ProcessLabSectionProps> = ({
  checkedTasks, toggleTask, protocol, setProtocol
}) => (
  <>
        {/* =========================================================================
            ÚLOHA 10: ŽIVÁ ANALÝZA PROCESŮ V SYSINTERNALS PROCESS EXPLORER & VIRUSTOTAL
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task10'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                10
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task10'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 10: Živá analýza procesů v Sysinternals Process Explorer &amp; VirusTotal
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Spuštění profesionálního diagnostického nástroje od Microsoft Sysinternals a kontrola běžících procesů
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task10')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task10']
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
            >
              {checkedTasks['task10'] ? (
                <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
              ) : (
                <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Spusťte <strong>Process Explorer</strong> (ze Sysinternals / <code>https://live.sysinternals.com/procexp.exe</code>):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>V menu zapněte: <strong>Options ➔ Verify Image Signatures</strong> a <strong>Options ➔ VirusTotal.com ➔ Check VirusTotal.com</strong>.</li>
              <li>Najděte proces <strong>mspaint.exe</strong> a jeden libovolný další proces.</li>
              <li>Opište jejich PID, digitální podpis (sloupec <em>Verified Signer</em>) a skóre VirusTotal.</li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>

            {/* Část 1: Malování */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Analýza 1: Aplikace Malování (mspaint.exe)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.1 PID procesu mspaint.exe:
                  </label>
                  <input
                    type="text"
                    value={protocol.task10MspaintPid || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10MspaintPid: e.target.value })}
                    placeholder="např. 14820"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.2 Verified Signer (Digitální podpis):
                  </label>
                  <input
                    type="text"
                    value={protocol.task10MspaintSigner || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10MspaintSigner: e.target.value })}
                    placeholder="např. Microsoft Windows Publisher"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.3 VirusTotal skóre (např. 0/76):
                  </label>
                  <input
                    type="text"
                    value={protocol.task10MspaintVtScore || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10MspaintVtScore: e.target.value })}
                    placeholder="např. 0/76"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Část 2: Druhý vybraný proces */}
            <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Analýza 2: Druhý běžící proces dle vašeho výběru
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.4 Název vybraného procesu:
                  </label>
                  <input
                    type="text"
                    value={protocol.task10SecondProcessName || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10SecondProcessName: e.target.value })}
                    placeholder="např. msedge.exe / chrome.exe / notepad.exe"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.5 Verified Signer (Vydavatel certifikátu):
                  </label>
                  <input
                    type="text"
                    value={protocol.task10SecondProcessSigner || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10SecondProcessSigner: e.target.value })}
                    placeholder="např. Microsoft Windows / Google LLC"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                    10.6 VirusTotal skóre vybraného procesu:
                  </label>
                  <input
                    type="text"
                    value={protocol.task10SecondProcessVtScore || ''}
                    onChange={(e) => setProtocol({ ...protocol, task10SecondProcessVtScore: e.target.value })}
                    placeholder="např. 0/75"
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SEKCE: POKROČILÉ ÚLOHY A EXPERTNÍ VÝZVY
            ========================================================================= */}
        <div className="pt-6 pb-2">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-200">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Pokročilé úlohy & Expertní výzvy
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Úlohy pro hlubší pochopení systémových služeb a vlastního nepodepsaného kódu
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 11*: EXPERIMENT V HxD - MODIFIKACE KÓDU A SELHÁNÍ CERTIFIKÁTU
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task11'] ? 'bg-amber-50/40 border-amber-400' : 'bg-white border-amber-200/80 hover:border-amber-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                11*
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-black ${checkedTasks['task11'] ? 'text-amber-950' : 'text-slate-800'}`}>
                    Úloha 11*: Narušení integrity binárního souboru v hexeditoru HxD
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900">
                    Pokročilé (*)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Praktický důkaz fungování Authenticode: co se stane s digitálním podpisem po neautorizované změně kódu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task11')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task11']
                ? 'bg-amber-200 text-amber-950 border-amber-400'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
            >
              {checkedTasks['task11'] ? (
                <><CheckSquare className="w-4 h-4 text-amber-700" /> Splněno</>
              ) : (
                <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
              )}
            </button>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2.5 leading-relaxed">
            <div className="p-2.5 bg-amber-100/70 rounded-xl border border-amber-300 text-amber-950 font-medium">
              🔬 <strong>Co tato úloha simuluje?</strong> Zásah útočníka (nebo infekci virem), který se pokusí do podepsaného programu propašovat škodlivý kód či upravit jeho instrukce. Vyzkoušíte si, jak operační systém okamžitě odhalí i změnu jediného písmena.
            </div>
            <p className="font-semibold text-amber-900 pt-1">
              Postup experimentu:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-amber-900/90 pl-1">
              <li>
                Zkontrolujte digitální podpis originálního <code>vlc.exe</code> (ve složce <code>C:\Program Files\VideoLAN\VLC\vlc.exe</code> &rarr; <em>Vlastnosti &rarr; Digitální podpisy</em> &rarr; podpis je platný).
              </li>
              <li>
                Vytvořte si <strong>pracovní kopii</strong> souboru (např. zkopírujte <code>vlc.exe</code> na Plochu nebo do složky Stažené soubory pod názvem <code>vlc_mod.exe</code>).
              </li>
              <li>
                Stáhněte a nainstalujte bezplatný hexeditor <strong>HxD</strong> (<code>https://mh-nexus.de/en/hxd/</code>) a spusťte jej <strong>jako Správce</strong> (pravým tlačítkem &rarr; <em>Spustit jako správce</em>).
              </li>
              <li>
                V HxD otevřete soubor <code>vlc_mod.exe</code>. Stiskněte <kbd className="px-1 py-0.5 bg-amber-200 rounded text-[10px] font-mono">Ctrl + F</kbd>, přepněte na text a vyhledejte řetězec <code>This program cannot be run in DOS mode</code> (nebo jiný nalezený text).
              </li>
              <li>
                V textové části <strong>přepište libovolný jeden znak</strong> (např. z <em>This</em> na <em>Xhis</em>) a soubor uložte (<kbd className="px-1 py-0.5 bg-amber-200 rounded text-[10px] font-mono">Ctrl + S</kbd>).
              </li>
              <li>
                Klikněte na upravený <code>vlc_mod.exe</code> pravým tlačítkem &rarr; <strong>Vlastnosti ➔ Digitální podpisy ➔ Podrobnosti</strong>.
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-amber-600" /> Záznam experimentálního šetření:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.1 Původní stav podpisu vlc.exe před změnou:
                </label>
                <input
                  type="text"
                  value={protocol.task11OriginalCertStatus || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11OriginalCertStatus: e.target.value })}
                  placeholder="např. Tento digitální podpis je v pořádku."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.2 Změněný textový řetězec v HxD:
                </label>
                <input
                  type="text"
                  value={protocol.task11ModifiedString || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11ModifiedString: e.target.value })}
                  placeholder="např. Změněno This program -> Xhis program"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.3 Stav digitálního podpisu po uložení změny v HxD:
                </label>
                <input
                  type="text"
                  value={protocol.task11ModifiedCertStatus || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11ModifiedCertStatus: e.target.value })}
                  placeholder="např. Tento digitální podpis není platný / Neplatný podpis"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.4 Proč operační systém podpis okamžitě odmítl?:
                </label>
                <textarea
                  rows={2}
                  value={protocol.task11WhyInvalid || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11WhyInvalid: e.target.value })}
                  placeholder="Vysvětlete vztah mezi změnou dat v souboru a kontrolním kryptografickým hashem..."
                  className="w-full min-h-[60px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 12*: SYSTÉMOVÉ SLUŽBY POD PROCESY (tasklist /svc)
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task12'] ? 'bg-amber-50/40 border-amber-400' : 'bg-white border-amber-200/80 hover:border-amber-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                12*
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-black ${checkedTasks['task12'] ? 'text-amber-950' : 'text-slate-800'}`}>
                    Úloha 12*: Co se skrývá pod svchost.exe? Mapování systémových služeb
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900">
                    Pokročilé (*)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Zjištění, které systémové služby Windows běží v rámci konkrétního procesu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task12')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task12']
                ? 'bg-amber-200 text-amber-950 border-amber-400'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
            >
              {checkedTasks['task12'] ? (
                <><CheckSquare className="w-4 h-4 text-amber-700" /> Splněno</>
              ) : (
                <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
              )}
            </button>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2 leading-relaxed">
            <p className="font-semibold text-amber-900">
              V Příkazovém řádku vypište přiřazené systémové služby pomocí <code>tasklist /svc</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
              <li>Vyberte jednu instanci <strong>svchost.exe</strong>, zapište její PID a seznam služeb, které hostuje.</li>
              <li>Zdůvodněte, proč se útočníci za název <code>svchost.exe</code> rádi maskují.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-amber-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  12.1 Použitý příkaz:
                </label>
                <input
                  type="text"
                  value={protocol.task12SvcCmd || ''}
                  onChange={(e) => setProtocol({ ...protocol, task12SvcCmd: e.target.value })}
                  placeholder="Zadejte použitý příkaz..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  12.2 Vybrané PID procesu svchost.exe:
                </label>
                <input
                  type="text"
                  value={protocol.task12SvchostPid || ''}
                  onChange={(e) => setProtocol({ ...protocol, task12SvchostPid: e.target.value })}
                  placeholder="např. 1432"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  12.3 Služby běžící pod tímto PID:
                </label>
                <input
                  type="text"
                  value={protocol.task12SvcNames || ''}
                  onChange={(e) => setProtocol({ ...protocol, task12SvcNames: e.target.value })}
                  placeholder="např. AudioSrv, AudioEndpointBuilder"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                12.4 Proč útočníci tak rádi maskují malware pod název &quot;svchost.exe&quot; nebo &quot;scvhost.exe&quot;?:
              </label>
              <textarea
                rows={2}
                value={protocol.task12SvcWhyAbused || ''}
                onChange={(e) => setProtocol({ ...protocol, task12SvcWhyAbused: e.target.value })}
                placeholder="Vysvětlete, proč v záplavě legitimních svchost.exe běžný uživatel podvržený proces snadno přehlédne..."
                className="w-full min-h-[60px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-medium text-slate-800 bg-white transition-all resize-y shadow-inner leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 13**: EXPERTNÍ VÝZVA - VLASTNÍ NEPODEPANÝ PROGRAM
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task13'] ? 'bg-amber-50/40 border-amber-400' : 'bg-white border-amber-200/80 hover:border-amber-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                13**
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-black ${checkedTasks['task13'] ? 'text-amber-950' : 'text-slate-800'}`}>
                    Úloha 13**: Expertní výzva – Vytvoření a analýza vlastního nepodepsaného programu
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-200 text-rose-900">
                    Pro experty (**)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Kompilace Python skriptu do samostatného .exe souboru a reakce bezpečnostních mechanismů
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task13')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task13']
                ? 'bg-amber-200 text-amber-950 border-amber-400'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
            >
              {checkedTasks['task13'] ? (
                <><CheckSquare className="w-4 h-4 text-amber-700" /> Splněno</>
              ) : (
                <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
              )}
            </button>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-3 leading-relaxed">
            <p className="font-semibold text-amber-900">
              Vytvořte vlastní spustitelný soubor (.exe) z Python skriptu a sledujte reakci systému:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-amber-950/90 pl-1">
              <li>
                <strong>Instalace kompilátoru PyInstaller</strong> (v Příkazovém řádku nebo Terminálu):
                <div className="mt-1 p-2 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px]">
                  python -m pip install pyinstaller
                </div>
              </li>
              <li>
                Vytvořte jednoduchý skript <code>test.py</code> s čekáním na stisk klávesy (aby se program hned neukončil a zůstal běžet v Process Exploreru):
                <div className="mt-1 p-2 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px]">
                  input("Program bezi... Stiskni Enter pro ukonceni.")
                </div>
              </li>
              <li>
                <strong>Příkaz pro vytvoření samostatného .exe souboru:</strong>
                <div className="mt-1 p-2 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px]">
                  python -m PyInstaller --onefile test.py
                </div>
                
              </li>
              <li>
                Spusťte vytvořený <code>test.exe</code> a v <strong>Process Exploreru</strong> zkontrolujte sloupec <strong>Verified Signer</strong>.
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Záznam expertního šetření:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  13.1 Co Process Explorer ukáže ve sloupci Verified Signer?:
                </label>
                <input
                  type="text"
                  value={protocol.task13ExpertSignerResult || ''}
                  onChange={(e) => setProtocol({ ...protocol, task13ExpertSignerResult: e.target.value })}
                  placeholder="např. (No signature found in file) / Neověřeno"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  13.2 Proč Windows SmartScreen takový program zablokuje modrým oknem?:
                </label>
                <textarea
                  rows={2}
                  value={protocol.task13ExpertSmartScreenReason || ''}
                  onChange={(e) => setProtocol({ ...protocol, task13ExpertSmartScreenReason: e.target.value })}
                  placeholder="Vysvětlete význam reputace a chybějícího digitálního podpisu pro SmartScreen..."
                  className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
  </>
);
