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
  User,
  Shield,
  Eye,
  EyeOff,
  Lock,
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

      {/* 2. UŽIVATELSKÝ ÚČET VS. ÚČET SYSTEM */}
      <TheoryCard
        letter="2"
        title="Pod jakým účtem program běží? (Uživatel vs. SYSTEM)"
        icon={Shield}
        tone="purple"
      >
        <p className="text-sm text-slate-600 leading-relaxed -mt-1 mb-2">
          Operační systém Windows striktně rozlišuje, <strong>kdo</strong> aplikaci nebo proces vlastní a jaká práva jim udělí.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* RÁMEC 1: ÚČET UŽIVATELE */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/70 to-white border-2 border-blue-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">Účet Uživatele (User)</h3>
                    <p className="text-xs font-semibold text-blue-700">Např. Jan Novák / Běžný profil</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                  Omezená práva
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wide text-blue-900 mb-0.5">Kdy a jak běží:</strong>
                  Spouští se až <strong>po vašem přihlášení</strong>. Aplikace má obvykle grafické okno na obrazovce (prohlížeč, hry, Office).
                </div>

                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wide text-blue-900 mb-0.5">Co to znamená pro práva programu:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs pl-1">
                    <li>Vidí a může měnit pouze <strong>vaše soubory</strong> (Dokumenty, Plocha, Stažené soubory).</li>
                    <li><strong>Nemůže</strong> měnit systémové soubory Windows ani data ostatních uživatelů v PC.</li>
                    <li>Při pokusu o systémový zásah Windows zobrazí okno <strong>UAC</strong> (žádost o heslo správce).</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center gap-2 text-xs font-semibold text-slate-600 bg-blue-50/50 -mx-2 -mb-2 p-2.5 rounded-xl">
              <Eye className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Příklady: <code>msedge.exe</code>, <code>word.exe</code>, malware ve složce Po spuštění.</span>
            </div>
          </div>

          {/* RÁMEC 2: ÚČET SYSTEM */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white border-2 border-rose-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">Účet SYSTEM (LocalSystem)</h3>
                    <p className="text-xs font-semibold text-rose-700">Interní systémový účet jádra Windows</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                  Neomezená moc
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wide text-rose-900 mb-0.5">Kdy a jak běží:</strong>
                  Běží <strong>ihned po zapnutí PC</strong> na pozadí, ještě předtím, než se kdokoliv přihlásí. Typicky nemá žádné grafické okno.
                </div>

                <div>
                  <strong className="text-slate-900 block text-xs uppercase tracking-wide text-rose-900 mb-0.5">Co to znamená pro práva programu:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs pl-1">
                    <li>Má <strong>plnou kontrolu</strong> nad celým počítačem, jádrem, diskem i všemi uživateli.</li>
                    <li>Může číst i mazat cokoliv v systému, měnit ovladače a žádné okno UAC ho <strong>nezastaví</strong>.</li>
                    <li>Pokud se malware dostane pod účet SYSTEM, má útočník nad stanicí absolutní nadvládu.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center gap-2 text-xs font-semibold text-slate-600 bg-rose-50/50 -mx-2 -mb-2 p-2.5 rounded-xl">
              <EyeOff className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Příklady: <code>services.exe</code>, antivirové jádro, systémové služby na pozadí.</span>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* 3. ČTYŘI ZPŮSOBY AUTOMATICKÉHO SPOUŠTĚNÍ */}
      <TheoryCard
        letter="3"
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

      {/* 4. OBRANA A ČIŠTĚNÍ */}
      <TheoryCard
        letter="4"
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
