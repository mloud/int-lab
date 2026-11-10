'use client';

import React, { useState } from 'react';
import {
  FolderOpen,
  Clock,
  Server,
  Database,
  Search,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface ExplorerStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  shortcutLabel: string;
  runCommand: string;
  secondaryCommand?: string;
  whereToLook: string[];
  windowTitle: string;
  windowPath: string;
  windowRows: { col1: string; col2: string; col3: string; highlight?: boolean; badge?: string }[];
  windowNote: string;
}

const EXPLORER_STEPS: ExplorerStep[] = [
  {
    id: 'step-startup',
    stepNumber: 1,
    title: 'Složka „Po spuštění“ (Startup Folder)',
    subtitle: 'Obyčejná složka na disku pro přihlášeného uživatele',
    icon: FolderOpen,
    shortcutLabel: 'Stiskni Win + R a napiš:',
    runCommand: 'shell:startup',
    whereToLook: [
      'shell:startup otevře složku Po spuštění pro tvůj účet (v %AppData%).',
      'Cokoliv sem vložíš (program nebo zástupce), Windows po přihlášení automaticky spustí.',
    ],
    windowTitle: 'Průzkumník souborů – Po spuštění (Startup)',
    windowPath: 'C:\\Users\\Student\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup',
    windowRows: [
      { col1: 'OneDrive.lnk', col2: 'Zástupce', col3: 'Microsoft OneDrive', highlight: false },
      { col1: 'TestKalkulacka.lnk', col2: 'Zástupce', col3: 'C:\\Windows\\System32\\calc.exe', highlight: true, badge: 'Spustí se po přihlášení' },
    ],
    windowNote: '💡 Tip: Podívej se nahoru do adresního řádku Průzkumníku – uvidíš tam skutečnou cestu na disku.',
  },
  {
    id: 'step-scheduler',
    stepNumber: 2,
    title: 'Plánovač úloh (Task Scheduler)',
    subtitle: 'Místo, kde se programy spouštějí podle času nebo události',
    icon: Clock,
    shortcutLabel: 'Stiskni Win + R a napiš:',
    runCommand: 'taskschd.msc',
    whereToLook: [
      'V levém sloupci klikni na „Knihovna plánovače úloh“ (Task Scheduler Library).',
      'Po kliknutí na úlohu dole přepni na záložku „Aktivační události“ (kdy běží) a „Akce“ (jaký soubor spouští).',
    ],
    windowTitle: 'Plánovač úloh (taskschd.msc) ➔ Knihovna plánovače úloh',
    windowPath: 'Plánovač úloh ( místní ) \\ Knihovna plánovače úloh',
    windowRows: [
      { col1: 'MicrosoftEdgeUpdate', col2: 'Při přihlášení / denně', col3: 'C:\\Program Files (x86)\\Microsoft\\EdgeUpdate\\... ', highlight: false },
      { col1: 'OneDrive Standalone Update', col2: 'Každých 24 hodin', col3: '%localappdata%\\Microsoft\\OneDrive\\OneDriveStandaloneUpdater.exe', highlight: false },
      { col1: 'SystemHealthCheck', col2: 'Každých 10 minut', col3: 'powershell.exe -File C:\\ProgramData\\loader.ps1', highlight: true, badge: 'Ve Správci úloh NEVIDITELNÉ!' },
    ],
    windowNote: '💡 Tip: Úlohy v Plánovači vůbec nejsou vidět v běžném Správci úloh v záložce „Aplikace po spuštění“.',
  },
  {
    id: 'step-services',
    stepNumber: 3,
    title: 'Systémové služby (Services)',
    subtitle: 'Programy spouštěné na pozadí ještě před přihlášením uživatele',
    icon: Server,
    shortcutLabel: 'Stiskni Win + R a napiš:',
    runCommand: 'services.msc',
    whereToLook: [
      'Klikni na záhlaví sloupce „Typ spouštění“ – sleduj služby nastavené na „Automaticky“.',
      'Dvojklikem na službu otevři její Vlastnosti – uvidíš „Cestu k spouštěnému souboru“ a účet (často LocalSystem / SYSTEM).',
    ],
    windowTitle: 'Služby (services.msc)',
    windowPath: 'Služby (Místní) ➔ Seřazeno dle: Typ spouštění (Automaticky)',
    windowRows: [
      { col1: 'Klient DHCP (Dhcp)', col2: 'Automaticky (Běží)', col3: 'C:\\Windows\\system32\\svchost.exe -k LocalServiceNetworkRestricted', highlight: false },
      { col1: 'Zařazování tisku (Spooler)', col2: 'Automaticky (Běží)', col3: 'C:\\Windows\\System32\\spoolsv.exe (Účet: LocalSystem)', highlight: false },
      { col1: 'WinDefend', col2: 'Automaticky (Běží)', col3: 'C:\\ProgramData\\Microsoft\\Windows Defender\\...\\MsMpEng.exe', highlight: true, badge: 'Startuje před přihlášením!' },
    ],
    windowNote: '💡 Tip: Zaregistrovat novou službu může jen proces s právy správce (UAC).',
  },
  {
    id: 'step-registry',
    stepNumber: 4,
    title: 'Editor systémového registru (regedit)',
    subtitle: 'Konfigurační databáze OS – klíče Run a RunOnce',
    icon: Database,
    shortcutLabel: 'Stiskni Win + R a napiš:',
    runCommand: 'regedit',
    whereToLook: [
      'Vlevo rozbal HKEY_CURRENT_USER (pro tebe – bez UAC) nebo HKEY_LOCAL_MACHINE (pro celý PC – vyžaduje UAC).',
      'Pokračuj do podsložek: Software ➔ Microsoft ➔ Windows ➔ CurrentVersion ➔ Run.',
      'V pravém panelu uvidíš názvy položek, typ REG_SZ a cestu ke spouštěnému programu.',
    ],
    windowTitle: 'Editor registru (regedit.exe)',
    windowPath: 'Počítač\\HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
    windowRows: [
      { col1: '(Výchozí)', col2: 'REG_SZ', col3: '(hodnota nezadána)', highlight: false },
      { col1: 'OneDrive', col2: 'REG_SZ', col3: '"C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe" /background', highlight: true, badge: 'Klíč Run v HKCU' },
    ],
    windowNote: '💡 Tip: Kliknutím pravým tlačítkem na složku „Run“ vlevo můžeš celý klíč vyexportovat do textového souboru .reg.',
  },
  {
    id: 'step-autoruns',
    stepNumber: 5,
    title: 'Správce úloh vs. Sysinternals Autoruns',
    subtitle: 'Kde zkontrolovat všechna 4 předchozí místa na jedné obrazovce',
    icon: Search,
    shortcutLabel: 'Porovnej běžný nástroj a forenzní utilitu:',
    runCommand: 'Ctrl + Shift + Esc (Aplikace po spuštění)',
    secondaryCommand: 'autoruns64.exe',
    whereToLook: [
      'Ve Správci úloh (Aplikace po spuštění) vidíš jen Krok 1 (Startup) a Krok 4 (základní Run).',
      'V nástroji Sysinternals Autoruns zapni Options ➔ Hide Microsoft Entries a projdi záložky Logon, Scheduled Tasks a Services.',
    ],
    windowTitle: 'Sysinternals Autoruns (autoruns64.exe) – Pohled na všechna místa',
    windowPath: 'Záložky: Everything | Logon (Krok 1 & 4) | Scheduled Tasks (Krok 2) | Services (Krok 3)',
    windowRows: [
      { col1: '[Logon] Startup & Run', col2: 'Správce úloh: VIDÍ', col3: 'Autoruns: VIDÍ (+ kontroluje digitální podpis)', highlight: false },
      { col1: '[Scheduled Tasks] Plánovač', col2: 'Správce úloh: NEVIDÍ ❌', col3: 'Autoruns: VIDÍ VŠECHNY ÚLOHY ✓', highlight: true, badge: 'Odhalí skrytý Plánovač' },
      { col1: '[Services] Systémové služby', col2: 'Správce úloh: NEVIDÍ ❌', col3: 'Autoruns: VIDÍ VŠECHNY SLUŽBY ✓', highlight: true, badge: 'Odhalí podezřelé služby' },
    ],
    windowNote: '💡 Tip: Růžově podbarvené řádky v Autoruns znamenají, že soubor nemá platný digitální podpis!',
  },
];

export default function PersistenceExplorerSim() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const current = EXPLORER_STEPS[activeIdx];
  const Icon = current.icon;

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
      {/* HLAVIČKA PRŮVODCE */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
            Interaktivní průvodce systémem Windows • Krok za krokem
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Kde v OS najít a otevřít všechna místa automatického spouštění
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Projdi si postupně všech 5 kroků a podívej se, jak tato okna vypadají a jaké příkazy je otevírají.
          </p>
        </div>
      </div>

      {/* HORNÍ PŘEPÍNAČ KROKŮ 1..5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {EXPLORER_STEPS.map((step, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveIdx(idx)}
              className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-1.5 ${
                isCurrent
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </span>
              </div>
              <div className="text-xs font-black text-slate-800 line-clamp-2 leading-snug">
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* DETAIL AKTIVNÍHO MÍSTA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEVÝ SLOUPEC: KDE A JAK TO SPUSTIT */}
        <div className="xl:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-indigo-300">
                  Místo {current.stepNumber} z {EXPLORER_STEPS.length}
                </div>
                <h4 className="text-base font-black">{current.title}</h4>
              </div>
            </div>

            {/* PŘÍKAZ K OTEVŘENÍ */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" /> {current.shortcutLabel}
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <code className="font-mono text-sm font-black text-emerald-400 break-all">
                  {current.runCommand}
                </code>
                <button
                  onClick={() => copyCommand(current.runCommand)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 shrink-0"
                  title="Zkopírovat do schránky"
                >
                  {copiedCmd === current.runCommand ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Zkopírováno
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Kopírovat
                    </>
                  )}
                </button>
              </div>

              {current.secondaryCommand && (
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Druhá varianta:
                    </span>
                    <code className="font-mono font-bold text-amber-300 break-all">
                      {current.secondaryCommand}
                    </code>
                  </div>
                  <button
                    onClick={() => copyCommand(current.secondaryCommand!)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 shrink-0"
                  >
                    {copiedCmd === current.secondaryCommand ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* KAM SE V OKNĚ DÍVAT */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Kam přesně se v okně dívat:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                {current.whereToLook.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-black">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* PRAVÝ SLOUPEC: VIZUÁLNÍ UKÁZKA OKNA VE WINDOWS */}
        <div className="xl:col-span-8 rounded-2xl border-2 border-slate-300 bg-slate-50 overflow-hidden shadow-sm">
          {/* Záhlaví simulovaného okna Windows */}
          <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Icon className="w-4 h-4 text-sky-400" />
              <span>{current.windowTitle}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            </div>
          </div>

          {/* Adresní řádek okna */}
          <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-slate-400 shrink-0">Cesta v okně:</span>
            <code className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 w-full break-all">
              {current.windowPath}
            </code>
          </div>

          {/* Obsah okna */}
          <div className="p-4 space-y-3">
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs min-w-[560px]">
                <thead className="bg-slate-100 text-slate-600 uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 w-[28%]">Položka / Název</th>
                    <th className="p-2.5 w-[22%]">Typ / Spouštěč</th>
                    <th className="p-2.5 w-[50%]">Cesta / Hodnota (Co se spustí)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {current.windowRows.map((row, i) => (
                    <tr
                      key={i}
                      className={row.highlight ? 'bg-amber-50/90 font-bold' : 'bg-white'}
                    >
                      <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap align-top">
                        <div>{row.col1}</div>
                        {row.badge && (
                          <span className="mt-1 inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950">
                            {row.badge}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-slate-600 whitespace-nowrap align-top">{row.col2}</td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-800 break-words align-top">
                        {row.col3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-medium text-blue-950">
              {current.windowNote}
            </div>
          </div>
        </div>
      </div>

      {/* SPODNÍ NAVIGACE MEZI KROKY */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-black text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Předchozí místo
        </button>
        <span className="text-xs font-bold text-slate-400">
          Krok {activeIdx + 1} z {EXPLORER_STEPS.length}
        </span>
        <button
          onClick={() => setActiveIdx((i) => Math.min(EXPLORER_STEPS.length - 1, i + 1))}
          disabled={activeIdx === EXPLORER_STEPS.length - 1}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-xs font-black text-white flex items-center gap-1.5"
        >
          Další místo <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

