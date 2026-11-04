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
              Ověřte stav bezpečnostního filtru blokujícího nedůvěryhodné či nepodepsané aplikace na vašem počítači:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Otevřete <strong>Zabezpečení Windows ➔ Řízení aplikací a prohlížečů ➔ Nastavení Smart App Control</strong> (ve Windows 11) nebo <strong>Ochrana na základě reputace</strong> (SmartScreen).</li>
              <li>Zjistěte, v jakém stavu se tato ochrana na vašem PC nachází.</li>
            </ul>
            <div className="pt-1 text-[11px] text-slate-500">
              💡 <strong>Možné stavy:</strong> <em>Zapnuto</em> (striktně blokuje nepodepsané soubory bez dobré reputace), <em>Hodnocení / Evaluation</em> (učí se), <em>Vypnuto</em>, nebo <em>Spravováno správcem / doménou</em>.
            </div>
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
              Ověřte stav antivirové ochrany v reálném čase (Microsoft Defender nebo školní/vlastní antivirus):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Otevřete <strong>Zabezpečení Windows ➔ Ochrana před viry a hrozbami</strong>.</li>
              <li>Klikněte na <strong>Spravovat nastavení</strong> a ověřte, zda je zapnutá <strong>Ochrana v reálném čase</strong>.</li>
              <li>Vraťte se a dole v sekci <em>Aktualizace ochrany před viry a hrozbami</em> zjistěte aktuální verzi definic/signatur (Security Intelligence).</li>
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
              Ověřte nastavení ochrany před vyděračským softwarem (ransomwarem) v OS Windows:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Otevřete <strong>Zabezpečení Windows ➔ Ochrana před viry a hrozbami</strong>.</li>
              <li>Dole klikněte na odkaz <strong>Spravovat ochranu před ransomwarem</strong>.</li>
              <li>Zjistěte stav přepínače <strong>Řízený přístup ke složkám (Controlled Folder Access)</strong> a prohlédněte si odkaz <em>Chráněné složky</em>.</li>
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3 leading-relaxed">
            <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 text-blue-950">
              📜 <strong>Proč kontrolovat certifikát v GUI?</strong> Než spustíte stažený instalační balíček nebo program,
              operační systém vám umožňuje zkontrolovat jeho digitální pečeť (Authenticode). Podpis garantuje, že soubor pochází
              od skutečného vydavatele a od okamžiku podpisu v něm nikdo nezměnil ani jediný bajt kódu.
            </div>
            <p className="font-semibold text-slate-900">
              Postup inspekce (např. instalační balíček VLC Media Player z videolan.org nebo libovolný program v Program Files):
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1">
              <li>
                Stáhněte instalátor programu (doporučeno: <strong>VLC Media Player</strong> z <code>https://www.videolan.org</code>, případně 7-Zip či Notepad++), nebo v Průzkumníku najděte existující <code>.exe</code> soubor.
              </li>
              <li>
                Klikněte na soubor pravým tlačítkem myši &rarr; <strong>Vlastnosti</strong> (Alt + Enter).
              </li>
              <li>
                Přejděte na záložku <strong>Digitální podpisy</strong>, v seznamu podpisů označte položku a klikněte na <strong>Podrobnosti</strong>.
              </li>
              <li>
                V okně Podrobnosti digitálního podpisu klikněte na tlačítko <strong>Zobrazit certifikát</strong>.
              </li>
              <li>
                Prozkoumejte záložku <strong>Obecné</strong> (komu a kým byl certifikát vystaven) a záložku <strong>Certifikační cesta</strong> (strom autorit).
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
            ÚLOHA 5: KONTROLA INTEGRITY STAŽENÉHO SOUBORU (SHA-256 HASH)
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
                  Úloha 5: Kontrola integrity staženého souboru (SHA-256 hash)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fáze 2: Ověření, že program nebyl po stažení pozměněn ani poškozen
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
              Po stažení programu z internetu můžeme jednoduše zkontrolovat, že soubor nebyl pozměněn:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1">
              <li>
                Každý soubor má jedinečný matematický otisk – <strong>kryptografický hash (SHA-256)</strong>. Pokud se v souboru změní jediný bajt, hash bude úplně jiný.
              </li>
              <li>
                V Příkazovém řádku (cmd.exe) spočítejte hash libovolného souboru (např. staženého programu nebo <code>notepad.exe</code>):
                <div className="mt-1 p-2 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px]">
                  certutil -hashfile C:\Windows\notepad.exe SHA256
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t-2 border-slate-100 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpovědi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.1 Název prověřovaného souboru:
                </label>
                <input
                  type="text"
                  value={protocol.task5FileName || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5FileName: e.target.value })}
                  placeholder="např. notepad.exe / vlc-setup.exe"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.2 Použitý příkaz (certutil):
                </label>
                <input
                  type="text"
                  value={protocol.task5HashCmd || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5HashCmd: e.target.value })}
                  placeholder="např. certutil -hashfile C:\Windows\notepad.exe SHA256"
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide min-h-[1.75rem] flex items-end">
                  5.3 Vypočítaná hodnota SHA-256 hashe:
                </label>
                <input
                  type="text"
                  value={protocol.task5FileHash || ''}
                  onChange={(e) => setProtocol({ ...protocol, task5FileHash: e.target.value })}
                  placeholder="Zadejte vypočítaný hash..."
                  className="w-full p-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none text-sm font-mono font-bold text-slate-800 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
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
              Vypište všechny procesy, které v paměti RAM zabírají více než 100 MB (tj. více než 100 000 KB):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Sestavte příkaz <code>tasklist</code> s filtrem <code>/FI</code>, který vybere procesy s využitím paměti větším než 100 000 KB (využijte operátor <code>gt</code> = greater than).</li>
              <li>Najděte proces s největší spotřebou paměti ve výpisu a zapište jeho název a velikost paměti.</li>
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
              Spusťte nástroj <strong>resmon.exe</strong> (Sledování prostředků):
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Přejděte na záložku <strong>Síť</strong> a rozbalte panel <strong>Síťová aktivita</strong> nebo <strong>Připojení TCP</strong>.</li>
              <li>Najděte libovolné aktivní spojení (např. pro váš webový prohlížeč – <code>chrome.exe</code>, <code>msedge.exe</code>, <code>firefox.exe</code>).</li>
              <li>Zapište vzdálenou IP adresu a port (např. port 443).</li>
              <li>Otevřete v prohlížeči <code>https://ipinfo.io/&lt;IP_ADRESA&gt;</code> (nebo whois) a zjistěte organizaci / vlastníka autonomního systému (ASN).</li>
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

          {/* Představení služby VirusTotal a zadání */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 text-blue-950">
              💡 <strong>Co je VirusTotal.com?</strong> Bezplatná cloudová služba (provozovaná dceřinou společností Google / Chronicle),
              která analyzuje podezřelé soubory a URL adresy. Místo jednoho antiviru prověří vzorek současně více než <strong>70 předními bezpečnostními a antivirovými systémy</strong>
              (Microsoft, ESET, Avast, Kaspersky, Bitdefender, Sophos atd.) a zobrazí celkové detekční skóre (např. <em>0/72</em> = čistý soubor, <em>56/72</em> = známý malware).
            </div>
            <p className="font-semibold text-slate-900 pt-1">
              Postup prověření:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Otevřete v prohlížeči <code>https://www.virustotal.com</code> (záložka <strong>FILE</strong>, případně záložka <strong>SEARCH</strong>, kam můžete přímo vložit SHA-256 hash z Úlohy 5!).</li>
              <li>Vyberte libovolný spustitelný soubor ze svého počítače (např. stažený instalátor, utilitu, portable program nebo systémový soubor), nebo vyhledejte jeho hash.</li>
              <li>Počkejte na vyhodnocení a zapište název souboru, zjištěné skóre detekce a celkový verdikt.</li>
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

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3 leading-relaxed">
            <div className="p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-200 text-indigo-950">
              🛠️ <strong>Nástroj Microsoft Sysinternals Process Explorer:</strong> Pokročilá náhrada Správce úloh vytvořená Markem Russinovichem.
              Umožňuje naživo kontrolovat digitální podpisy procesů (Authenticode) a jediným kliknutím odesílat hashe všech běžících procesů na VirusTotal.com.
            </div>
            <p className="font-semibold text-slate-900">
              Postup zprovoznění a analýzy:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1">
              <li>
                Stáhněte a spusťte <strong>Process Explorer</strong> z oficiálního webu Microsoft Sysinternals (případně přímo z odkazu <code>https://live.sysinternals.com/procexp.exe</code>). Není potřeba žádná instalace, jedná se o portable utilitu.
              </li>
              <li>
                V horním menu Process Exploreru zapněte: <strong>Options &rarr; VirusTotal.com &rarr; Check VirusTotal.com</strong> (při prvním spuštění odsouhlaste podmínky služby).
              </li>
              <li>
                Zapněte také ověřování podpisů: <strong>Options &rarr; Verify Image Signatures</strong>.
              </li>
              <li>
                Spusťte aplikaci <strong>Malování</strong> (<code>mspaint.exe</code>) a najděte ji ve stromu procesů Process Exploreru.
              </li>
              <li>
                Vyberte <strong>druhý libovolný proces</strong> (např. webový prohlížeč <code>chrome.exe</code> / <code>msedge.exe</code>, textový editor nebo přehrávač).
              </li>
              <li>
                U obou procesů zapište jejich PID, stav digitálního podpisu (sloupec <em>Verified Signer</em>) a skóre VirusTotal (sloupec <em>VirusTotal</em>).
              </li>
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
              Ve Windows běží desítky instancí <code>svchost.exe</code> (Service Host). Každá hostuje jednu nebo více systémových služeb (např. DNS klient, Windows Update, Zvuk).
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
              <li>Spusťte Příkazový řádek (nebo jako Správce) a pomocí vhodného parametru nástroje <code>tasklist</code> vypište procesy včetně přiřazených systémových služeb (nápovědu získáte přes <code>tasklist /?</code>).</li>
              <li>Vyberte si jeden konkrétní řádek s <strong>svchost.exe</strong>, opište jeho PID a seznam služeb, které pod ním běží.</li>
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
              Vytvořte vlastní spustitelný soubor (.exe) bez komerčního certifikátu:
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
              <li>Vytvořte jednoduchý Python skript <code>test.py</code> (např. <code>import time; print(&apos;Bezim&apos;); time.sleep(60)</code>) a zkompilujte jej: <code>pyinstaller --onefile test.py</code> (nebo použijte jakoukoliv vlastní nepodepsanou utilitu).</li>
              <li>Spusťte vytvořený program a podívejte se na něj v <strong>Process Exploreru</strong> ve sloupci <strong>Verified Signer</strong>.</li>
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
