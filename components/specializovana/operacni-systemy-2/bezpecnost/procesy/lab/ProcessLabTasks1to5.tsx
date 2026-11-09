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

export const ProcessLabTasks1to5: React.FC<ProcessLabSectionProps> = ({
  checkedTasks, toggleTask, protocol, setProtocol
}) => (
  <>
        {/* =========================================================================
            ÚLOHA 1: KONTROLA SMART APP CONTROL / SMARTSCREEN
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task1'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task1'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 1: Aktivní obranný val OS – Smart App Control & SmartScreen
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fáze 1: Prověření reputace a digitálního podpisu před spuštěním kódu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task1')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task1']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Ověřte stav reputačního filtru blokujícího nedůvěryhodné či nepodepsané aplikace:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>V <strong>Zabezpečení Windows ➔ Řízení aplikací a prohlížečů</strong> zkontrolujte <strong>Smart App Control</strong> nebo <strong>SmartScreen</strong>.</li>
              <li>Zapište zjištěný stav (např. <em>Zapnuto</em>, <em>Hodnocení</em>, <em>Vypnuto</em> či <em>Spravováno správcem</em>).</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpověď:
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                1.1 Stav Smart App Control / SmartScreen na vašem PC:
              </label>
              <input
                type="text"
                value={protocol.task1SacStatus || ''}
                onChange={(e) => setProtocol({ ...protocol, task1SacStatus: e.target.value })}
                placeholder="např. Zapnuto / Hodnocení / Vypnuto / SmartScreen aktivní"
                className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 2: KONTROLA ANTIVIROVÉHO ŠTÍTU
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task2'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task2'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 2: Kontrola antivirového štítu v reálném čase a signatur
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fáze 2: Inspekce kódu na známé signatury a chování před předáním řízení procesoru
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task2')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task2']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              V <strong>Zabezpečení Windows ➔ Ochrana před viry a hrozbami</strong> ověřte:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Zda je aktivní <strong>Ochrana v reálném čase</strong> (v <em>Spravovat nastavení</em>).</li>
              <li>Aktuální <strong>verzi signatur / definic</strong> (dole v sekci aktualizací).</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  2.1 Stav ochrany v reálném čase:
                </label>
                <input
                  type="text"
                  value={protocol.task2AntivirusStatus || ''}
                  onChange={(e) => setProtocol({ ...protocol, task2AntivirusStatus: e.target.value })}
                  placeholder="např. Zapnuto (Microsoft Defender) / Aktivní"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  2.2 Verze virových signatur / definic:
                </label>
                <input
                  type="text"
                  value={protocol.task2SignatureVersion || ''}
                  onChange={(e) => setProtocol({ ...protocol, task2SignatureVersion: e.target.value })}
                  placeholder="např. 1.403.250.0 (ze dne 3.11.2026)"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 3: OCHRANA PŘED RANSOMWAREM
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task3'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task3'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 3: Kontrola ochrany před ransomwarem (Řízený přístup ke složkám)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Zabezpečení uživatelských dat proti neoprávněnému šifrování nedůvěryhodnými aplikacemi
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task3')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task3']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              V <strong>Zabezpečení Windows ➔ Ochrana před viry a hrozbami ➔ Spravovat ochranu před ransomwarem</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Zjistěte stav funkce <strong>Řízený přístup ke složkám</strong>.</li>
              <li>V odkazu <em>Chráněné složky</em> zjistěte, které složky systém před neoprávněným zašifrováním chrání.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  3.1 Stav funkce Řízený přístup ke složkám:
                </label>
                <input
                  type="text"
                  value={protocol.task3RansomwareStatus || ''}
                  onChange={(e) => setProtocol({ ...protocol, task3RansomwareStatus: e.target.value })}
                  placeholder="např. Zapnuto / Vypnuto / Spravováno správcem"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  3.2 Které klíčové složky Windows standardně chrání?:
                </label>
                <input
                  type="text"
                  value={protocol.task3ProtectedFolders || ''}
                  onChange={(e) => setProtocol({ ...protocol, task3ProtectedFolders: e.target.value })}
                  placeholder="např. Dokumenty, Obrázky, Videa, Hudba, Plocha"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 4: INSPEKCE DIGITÁLNÍHO PODPISU A CERTIFIKÁTU V PRŮZKUMNÍKU WINDOWS (GUI)
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task4'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task4'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 4: Inspekce digitálního podpisu a certifikátu aplikace v GUI
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task4')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task4']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Ověřte digitální podpis (Authenticode) libovolného programu (např. instalátor VLC, 7-Zip či program v <code>Program Files</code>):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Pravým tlačítkem na soubor &rarr; <strong>Vlastnosti</strong> &rarr; záložka <strong>Digitální podpisy</strong> &rarr; <strong>Podrobnosti</strong>.</li>
              <li>Klikněte na <strong>Zobrazit certifikát</strong> a opište vystavitele, předmět a stav v záložce <em>Certifikační cesta</em>.</li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  4.1 Název prověřovaného programu / instalátoru:
                </label>
                <input
                  type="text"
                  value={protocol.task4AppName || ''}
                  onChange={(e) => setProtocol({ ...protocol, task4AppName: e.target.value })}
                  placeholder=""
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  4.2 Komu byl certifikát vystaven (Vystaveno pro / Předmět):
                </label>
                <input
                  type="text"
                  value={protocol.task4SignerSubject || ''}
                  onChange={(e) => setProtocol({ ...protocol, task4SignerSubject: e.target.value })}
                  placeholder=""
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  4.3 Vystavitel certifikátu (Certifikační autorita CA):
                </label>
                <input
                  type="text"
                  value={protocol.task4CertificateCA || ''}
                  onChange={(e) => setProtocol({ ...protocol, task4CertificateCA: e.target.value })}
                  placeholder=""
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  4.4 Stav v záložce Certifikační cesta:
                </label>
                <input
                  type="text"
                  value={protocol.task4CertPathStatus || ''}
                  onChange={(e) => setProtocol({ ...protocol, task4CertPathStatus: e.target.value })}
                  placeholder="např. Tento certifikát je v pořádku."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 5: KONTROLA INTEGRITY STAŽENÉHO SOUBORU
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task5'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                5
              </span>
              <div>
                <h3 className={`text-base font-black ${checkedTasks['task5'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                  Úloha 5: Kontrola integrity staženého souboru
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fáze 2: Stažení programu, výpočet SHA-256 a porovnání s kontrolním součtem na webu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTask('task5')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${checkedTasks['task5']
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2.5 leading-relaxed">
            <p className="font-semibold text-slate-900">
              Ověřte integritu staženého instalačního balíčku porovnáním s oficiálním kontrolním součtem (checksum):
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1">
              <li>
                Stáhněte instalační balíček WinSCP: <a href="https://winscp.net/download/WinSCP-6.7-Setup.exe/download" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-mono">WinSCP-6.7-Setup.exe</a>
              </li>
              <li>
                Na stránce stahování najděte oficiálně uvedený kontrolní součet <strong>SHA-256</strong>.
              </li>
              <li>
                V Příkazovém řádku (cmd.exe) spočítejte hash staženého souboru (např. ve složce Stažené soubory):
                <div className="mt-1 p-2 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px]">
                  certutil -hashfile "cesta k WinSCP-6.7-Setup.exe" SHA256
                </div>
              </li>
              <li>
                Porovnejte obě hodnoty – shodují se všechny znaky hashe?
              </li>
            </ol>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.1 Název prověřovaného souboru:
                </label>
                <input
                  type="text"
                  value={protocol.task5FileName || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5FileName: e.target.value })}
                  placeholder="WinSCP-6.7-Setup.exe"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.2 Kontrolní SHA-256 hash uvedený na webu:
                </label>
                <input
                  type="text"
                  value={protocol.task5WebHash || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5WebHash: e.target.value })}
                  placeholder="Zadejte hash z webu winscp.net..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.3 Vypočítaný SHA-256 hash v příkazovém řádku:
                </label>
                <input
                  type="text"
                  value={protocol.task5LocalHash || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5LocalHash: e.target.value })}
                  placeholder="Zadejte vypočítaný hash z certutil..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.4 Shodují se oba hashe? (Je soubor v pořádku?):
                </label>
                <input
                  type="text"
                  value={protocol.task5HashesMatch || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5HashesMatch: e.target.value })}
                  placeholder="např. Ano, hashe jsou identické – soubor nebyl změněn."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
  </>
);
