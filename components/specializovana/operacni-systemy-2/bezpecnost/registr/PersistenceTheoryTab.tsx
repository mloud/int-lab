'use client';

import React from 'react';
import {
  Cpu,
  HardDrive,
  ShieldAlert,
  ShieldCheck,
  PauseCircle,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { TheoryCard, Callout } from '@/components/ui/ChapterKit';

const SIMPLE_METHODS = [
  {
    level: 1,
    title: 'Složka „Po spuštění“ (Startup Folder)',
    when: 'Při přihlášení uživatele',
    admin: 'NE',
    adminTone: 'emerald',
    taskMgr: 'Vidí',
    taskMgrVisible: true,
    desc: 'Obyčejná složka na disku – jakýkoliv soubor nebo zástupce do ní vložíš, ten Windows po přihlášení automaticky spustí.',
  },
  {
    level: 2,
    title: 'Plánovač úloh (Task Scheduler)',
    when: 'Podle času nebo události',
    admin: 'NE',
    adminTone: 'emerald',
    taskMgr: 'NEVIDÍ',
    taskMgrVisible: false,
    desc: 'Spouští programy v nastavený čas (např. každých 10 minut) – i když proces ukončíš ve Správci úloh, Plánovač ho za chvíli znovu oživí.',
  },
  {
    level: 3,
    title: 'Systémové služby (Windows Services)',
    when: 'Při startu OS (před přihlášením)',
    admin: 'ANO (UAC)',
    adminTone: 'rose',
    taskMgr: 'NEVIDÍ',
    taskMgrVisible: false,
    desc: 'Programy běžící na pozadí bez oken s nejvyššími právy SYSTEM ještě předtím, než se k počítači vůbec někdo přihlásí.',
  },
  {
    level: 4,
    title: 'Systémový registr (Windows Registry)',
    when: 'Při přihlášení / startu',
    admin: 'NE (HKCU) / ANO (HKLM)',
    adminTone: 'amber',
    taskMgr: 'Částečně',
    taskMgrVisible: true,
    desc: 'Konfigurační databáze Windows (klíče Run), kam se zapisují cesty k programům spouštěným pro aktuálního uživatele (HKCU) nebo celý počítač (HKLM).',
  },
];

export default function PersistenceTheoryTab() {
  return (
    <div className="space-y-8">
      {/* 1. PROČ MALWARE POTŘEBUJE PERSISTENCI */}
      <TheoryCard
        letter="1"
        title="Proč se malware snaží být persistentní?"
        icon={Cpu}
        tone="sky"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-rose-900 text-sm uppercase">
              <Cpu className="w-4 h-4 text-rose-600" /> Restart vymaže paměť RAM
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Běžící malware žije v <strong>operační paměti (RAM)</strong>. Jakmile počítač vypneš nebo restartuješ, RAM se vymaže a škodlivý proces zanikne.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-emerald-900 text-sm uppercase">
              <HardDrive className="w-4 h-4 text-emerald-600" /> Řešení = Persistence (Trvalost)
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Aby přežil restart, zapíše se do míst, která Windows <strong>spouštějí automaticky</strong> (stejně jako se po startu spouští antivir nebo OneDrive).
            </p>
          </div>
        </div>
      </TheoryCard>

      {/* 2. ČTYŘI ZPŮSOBY AUTOMATICKÉHO SPOUŠTĚNÍ */}
      <TheoryCard
        letter="2"
        title="4 místa, kam se malware schová (od nejjednodušších po registr)"
        icon={ShieldAlert}
        tone="amber"
      >
        <div className="space-y-3">
          {SIMPLE_METHODS.map((m) => (
            <div
              key={m.level}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {m.level}
                  </span>
                  <h3 className="text-base font-black text-slate-900">{m.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    ⏱️ {m.when}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg border ${
                      m.adminTone === 'emerald'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : m.adminTone === 'amber'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    Admin: {m.admin}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg border ${
                      m.taskMgrVisible
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    Správce úloh: {m.taskMgr}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pl-9">{m.desc}</p>
            </div>
          ))}
        </div>
      </TheoryCard>

      {/* 3. OBRANA A ČIŠTĚNÍ */}
      <TheoryCard
        letter="3"
        title="Jak ho najít a správně smazat"
        icon={ShieldCheck}
        tone="emerald"
      >
        <Callout kind="warning" title="Proč běžný Správce úloh nestačí?">
          Záložka <strong>Aplikace po spuštění</strong> ve Správci úloh vidí jen <strong>2 ze 4 míst</strong> (Složku Po spuštění a základní Registr). Všechna místa najednou (včetně Plánovače, Služeb a hlubokého registru) odhalí až nástroj <strong>Sysinternals Autoruns</strong>.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-1">
            <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
              <PauseCircle className="w-5 h-5 text-amber-600" /> 1. Zmrazit (Suspend)
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Proces nejprve pozastavíme, aby si nemohl smazaný záznam okamžitě zapsat zpět.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-1">
            <div className="flex items-center gap-2 font-black text-blue-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-600" /> 2. Smazat spouštění
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              V <strong>Autoruns</strong> odstraníme záznam ze složky Po spuštění, Plánovače, Služeb nebo Registru.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-1">
            <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
              <Trash2 className="w-5 h-5 text-emerald-600" /> 3. Ukončit (Kill)
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zmrazený proces ukončíme a smažeme jeho soubor z disku. Po restartu už nenaběhne.
            </p>
          </div>
        </div>
      </TheoryCard>
    </div>
  );
}
