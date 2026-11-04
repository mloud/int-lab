'use client';

import React from 'react';
import {
  Terminal,
  CheckSquare,
  Square,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Network,
  Search,
  Sparkles,
  CheckCircle2,
  PencilLine,
  Lock
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
  const completedCount = Object.values(checkedTasks).filter(Boolean).length;

  return (
    <WorksheetLayout
      title="Praktický list: Správa procesů a digitální certifikáty v OS"
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
              Splněno: {completedCount} / 12
            </span>
          </div>
        </div>

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
            ÚLOHA 9: LUSTRACE SOUBORU NA VIRUSTOTAL.COM
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
                  Představení globálního multiskeneru a ověření souboru či hashe vůči 70+ antivirovým enginům
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
              Ověřte soubor nebo jeho SHA-256 hash na multiskeneru <strong>VirusTotal.com</strong> (testuje soubor vůči 70+ antivirům):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Na <code>https://www.virustotal.com</code> nahrajte soubor (záložka <strong>FILE</strong>), nebo vyhledejte hash z Úlohy 5 (záložka <strong>SEARCH</strong>).</li>
              <li>Zapište název souboru, výsledné skóre detekcí (např. 0/72) a bezpečnostní verdikt.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  9.1 Název prověřovaného souboru:
                </label>
                <input
                  type="text"
                  value={protocol.task9FileName || ''}
                  onChange={(e) => setProtocol({ ...protocol, task9FileName: e.target.value })}
                  placeholder="např. vlc-3.0.20-win64.exe / notepad.exe"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  9.2 Výsledné VirusTotal skóre detekce:
                </label>
                <input
                  type="text"
                  value={protocol.task9VtScore || ''}
                  onChange={(e) => setProtocol({ ...protocol, task9VtScore: e.target.value })}
                  placeholder="např. 0/72 (žádný ze 72 antivirů nenalezl hrozbu)"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                9.3 Zhodnocení: Považuje VirusTotal a komunita soubor za bezpečný?:
              </label>
              <textarea
                rows={2}
                value={protocol.task9VtVerdict || ''}
                onChange={(e) => setProtocol({ ...protocol, task9VtVerdict: e.target.value })}
                placeholder="Zhodnoťte, zda je soubor zcela čistý, nebo byl některým antivirem označen za podezřelý či nežádoucí..."
                className="w-full min-h-[60px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
              />
            </div>
          </div>
        </div>

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
            ÚLOHA 11*: SYSTÉMOVÉ SLUŽBY POD PROCESY (tasklist /svc)
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
                    Úloha 11*: Co se skrývá pod svchost.exe? Mapování systémových služeb
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
                  11.1 Použitý příkaz:
                </label>
                <input
                  type="text"
                  value={protocol.task11SvcCmd || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11SvcCmd: e.target.value })}
                  placeholder="Zadejte použitý příkaz..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.2 Vybrané PID procesu svchost.exe:
                </label>
                <input
                  type="text"
                  value={protocol.task11SvchostPid || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11SvchostPid: e.target.value })}
                  placeholder="např. 1432"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-mono font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  11.3 Služby běžící pod tímto PID:
                </label>
                <input
                  type="text"
                  value={protocol.task11SvcNames || ''}
                  onChange={(e) => setProtocol({ ...protocol, task11SvcNames: e.target.value })}
                  placeholder="např. AudioSrv, AudioEndpointBuilder"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-white transition-all shadow-inner"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                11.4 Proč útočníci tak rádi maskují malware pod název &quot;svchost.exe&quot; nebo &quot;scvhost.exe&quot;?:
              </label>
              <textarea
                rows={2}
                value={protocol.task11SvcWhyAbused || ''}
                onChange={(e) => setProtocol({ ...protocol, task11SvcWhyAbused: e.target.value })}
                placeholder="Vysvětlete, proč v záplavě legitimních svchost.exe běžný uživatel podvržený proces snadno přehlédne..."
                className="w-full min-h-[60px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-medium text-slate-800 bg-white transition-all resize-y shadow-inner leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            ÚLOHA 12**: EXPERTNÍ VÝZVA - VLASTNÍ NEPODEPANÝ PROGRAM
            ========================================================================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${checkedTasks['task12'] ? 'bg-amber-50/40 border-amber-400' : 'bg-white border-amber-200/80 hover:border-amber-300 shadow-xs'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                12**
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-base font-black ${checkedTasks['task12'] ? 'text-amber-950' : 'text-slate-800'}`}>
                    Úloha 12**: Expertní výzva – Vytvoření a analýza vlastního nepodepsaného programu
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-200 text-rose-900">
                    Pro experty (**)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Kompilace vlastního skriptu / utility do .exe, detekce chybějícího podpisu a reakce bezpečnostních mechanismů
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
              Spusťte libovolný vlastní nebo nepodepsaný program (např. zkompilovaný skript přes PyInstaller či vlastní utilitu):
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
              <li>Zkontrolujte jeho sloupec <strong>Verified Signer</strong> v Process Exploreru.</li>
              <li>Zdůvodněte, proč SmartScreen takový soubor zablokuje modrým varovným oknem.</li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Záznam expertního šetření:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  12.1 Co Process Explorer ukáže ve sloupci Verified Signer?:
                </label>
                <input
                  type="text"
                  value={protocol.task12ExpertSignerResult || ''}
                  onChange={(e) => setProtocol({ ...protocol, task12ExpertSignerResult: e.target.value })}
                  placeholder="např. (No signature found in file) / Neověřeno"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  12.2 Proč Windows SmartScreen takový program zablokuje modrým oknem?:
                </label>
                <textarea
                  rows={2}
                  value={protocol.task12ExpertSmartScreenReason || ''}
                  onChange={(e) => setProtocol({ ...protocol, task12ExpertSmartScreenReason: e.target.value })}
                  placeholder="Vysvětlete význam reputace a chybějícího digitálního podpisu pro SmartScreen..."
                  className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white transition-all resize-y shadow-inner leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </WorksheetLayout>
  );
}
