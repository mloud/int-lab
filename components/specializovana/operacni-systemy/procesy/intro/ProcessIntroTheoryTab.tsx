'use client';

import React from 'react';
import { 
  FileCode, 
  Database, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Lightbulb, 
  FileText, 
  GitFork,
  Binary,
  MemoryStick,
  HardDrive
} from 'lucide-react';
import { 
  TheoryCard, 
  Callout 
} from '../../souborove-systemy/FsShared';

export default function ProcessIntroTheoryTab() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* ========================================================================= */}
      {/* BLOK A: Co je program a jak z něj vznikne proces                          */}
      {/* ========================================================================= */}
      <TheoryCard icon={FileCode} title="Co je program a jak vzniká proces" letter="A" tone="indigo">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Každý program začíná svůj život jako pasivní soubor uložený v souborovém systému disku (např.{' '}
          <code className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-bold">notepad.exe</code> nebo{' '}
          <code className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-bold">kalkulacka.exe</code>).
          Dokud na něj neklikneme, leží v sektorech disku, neodebírá žádný výkon procesoru a nic nepočítá.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">Pasivní stav na disku</div>
            <h4 className="text-lg font-black text-slate-800 mb-2">Program (Soubor .exe)</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Soubor složený z bajtů strojového kódu uložený na SSD nebo HDD. Může ležet na disku roky. 
              Je to jako <strong>recept v kuchařce</strong> ležící zavřený na poličce v kuchyni.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200">
            <div className="text-xs font-mono font-bold uppercase text-indigo-600 mb-1">Aktivní stav v RAM</div>
            <h4 className="text-lg font-black text-indigo-950 mb-2">Proces (Instance v paměti)</h4>
            <p className="text-sm text-indigo-900 leading-relaxed">
              Běžící instance programu zavedená operačním systémem do operační paměti RAM. Má přidělené systémové 
              prostředky a čas procesoru. Je to jako <strong>kuchař, který podle receptu právě vaří</strong>.
            </p>
          </div>
        </div>

        {/* Schéma: Zrození procesu z disku do paměti RAM */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
          <div className="text-center font-mono text-xs font-black uppercase text-indigo-700 bg-indigo-100 py-1 px-3 rounded-full mb-6 inline-block">
            Schéma: Zrození procesu z disku do paměti RAM
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            {/* 1. DISK VLEVO */}
            <div className="w-full md:w-52 bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 flex flex-col items-center shadow-xs">
              <div className="flex items-center gap-2 mb-3 bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-slate-200">
                <HardDrive className="w-4 h-4 text-slate-600" />
                <span className="font-black text-slate-700 uppercase tracking-wider text-xs">Disk (SSD / HDD)</span>
              </div>

              <div className="w-full bg-white rounded-2xl border-2 border-purple-200 border-dashed p-3.5 flex flex-col items-center text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 font-mono font-black text-xs">
                  .exe
                </div>
                <span className="font-bold text-purple-900 text-xs">program.exe</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Pasivní soubor na disku</span>
              </div>
            </div>

            {/* 2. ŠIPKA / ZAVADĚČ UPROSTŘED */}
            <div className="flex flex-col items-center justify-center gap-1.5 py-2 px-2 text-center">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-xs">
                Dvojklik myší
              </span>
              <div className="flex items-center text-indigo-500 font-bold text-lg my-0.5">
                <span className="hidden md:inline">──────▶</span>
                <span className="md:hidden">▼</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700">Zavaděč (OS Loader)</span>
                <span className="text-[10px] text-slate-400">Načte kód a přidělí PID</span>
              </div>
            </div>

            {/* 3. OPERAČNÍ PAMĚŤ (RAM) — S BĚŽÍCÍM PROCESEM S PID */}
            <div className="w-full md:w-56 bg-blue-50 border-4 border-blue-200 rounded-3xl p-4 flex flex-col items-center shadow-md">
              <div className="flex items-center gap-2 mb-3 bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-blue-100">
                <MemoryStick className="w-4 h-4 text-blue-600" />
                <span className="font-black text-blue-800 uppercase tracking-wider text-xs">Paměť (RAM)</span>
              </div>

              <div className="w-full bg-white rounded-2xl border-2 border-indigo-200 p-3.5 flex flex-col items-center text-center shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>PID: 1042</span>
                </div>
                <span className="font-bold text-slate-800 text-xs">program.exe</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Běžící proces v paměti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodič a potomek: PID vs PPID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
              <Binary className="w-4 h-4" />
              <span>PID (Process Identifier)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unikátní celé číslo, které jádro operačního systému přidělí procesu v okamžiku jeho vzniku. 
              Díky PID systém bezpečně rozliší i 5 současně otevřených oken téhož Poznámkového bloku.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-1">
              <GitFork className="w-4 h-4" />
              <span>PPID (Parent Process Identifier)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Každý proces má svého „rodiče“ – proces, který ho spustil. Když dvakrát kliknete na ikonu na ploše, 
              rodičem nového procesu je <strong>Průzkumník Windows (explorer.exe)</strong>.
            </p>
          </div>
        </div>

        <Callout kind="key" title="Definice procesu pro technika">
          <strong>Proces</strong> je <em>běžící instance programu zavedená v operační paměti RAM</em>, 
          která má přiděleny systémové prostředky, má vlastní identifikátor <strong>PID</strong> a je spravována jádrem operačního systému.
        </Callout>
      </TheoryCard>

      {/* ========================================================================= */}
      {/* BLOK B: Paměť procesu: Instrukce vs. Data                                 */}
      {/* ========================================================================= */}
      <TheoryCard icon={Database} title="Paměť procesu: Instrukce a Data (Von Neumann)" letter="B" tone="emerald">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Když operační systém vyhradí procesu prostor v paměti RAM, uspořádá ho podle základního principu{' '}
          <strong>Von Neumannovy architektury</strong>, kterou známe z hardwaru. Paměť procesu se dělí na dvě hlavní části:
        </p>

        {/* Schéma paměti RAM z Von Neumannovy architektury */}
        <div className="w-full max-w-2xl mx-auto bg-blue-50 border-4 border-blue-200 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-4 bg-white px-5 py-2 rounded-full shadow-sm border border-blue-100">
            <MemoryStick className="w-5 h-5 text-blue-600" />
            <span className="font-black text-blue-800 uppercase tracking-widest text-sm">Paměť (RAM)</span>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 text-xs">
            {/* Sekce Program (Instrukce) */}
            <div className="flex-1 bg-white rounded-2xl border-2 border-blue-100 p-4 flex flex-col justify-between shadow-inner">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-1 block">
                  Sekce: Program (Instrukce)
                </span>
                <div className="flex flex-col gap-2 font-mono">
                  <div className="bg-emerald-600 text-white font-mono font-bold py-2 px-3 rounded-xl shadow-xs text-xs flex items-center justify-between">
                    <span>1: VÝSLEDEK = 5 + 7</span>
                  </div>
                  <div className="bg-emerald-600 text-white font-mono font-bold py-2 px-3 rounded-xl shadow-xs text-xs flex items-center justify-between">
                    <span>2: ULOŽ VÝSLEDEK</span>
                  </div>
                  <div className="bg-emerald-600 text-white font-mono font-bold py-2 px-3 rounded-xl shadow-xs text-xs flex items-center justify-between">
                    <span>3: PRINT VÝSLEDEK</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-blue-600 font-bold uppercase tracking-wider text-center">
                🛡️ Pouze pro čtení (Read-Only)
              </div>
            </div>

            {/* Sekce Data */}
            <div className="flex-1 bg-white rounded-2xl border-2 border-blue-100 p-4 flex flex-col justify-between shadow-inner">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-1 block">
                  Sekce: Data (Proměnné)
                </span>
                <div className="flex flex-col gap-2 font-mono">
                  <div className="bg-amber-100/90 border border-amber-300 text-amber-950 font-mono font-bold py-2.5 px-3 rounded-xl shadow-xs text-xs flex items-center justify-between">
                    <span>VÝSLEDEK = 12</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-amber-700 font-bold uppercase tracking-wider text-center">
                ✏️ Čtení i zápis (Read & Write)
              </div>
            </div>
          </div>
        </div>

        {/* Návaznost na hardware Von Neumann */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 mb-6 flex items-start gap-2.5 text-xs text-emerald-950">
          <span className="text-base">💡</span>
          <div className="leading-relaxed">
            <strong className="text-emerald-900">Proč má smysl mít data v paměti:</strong>{' '}
            Instrukce <code className="font-mono text-emerald-800 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">1: VÝSLEDEK = 5 + 7</code> provede součet uvnitř procesoru (v ALU).{' '}
            Instrukce <code className="font-mono text-emerald-800 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">2: ULOŽ VÝSLEDEK</code> odešle vypočítané číslo 12 z procesoru do paměti RAM a zapíše ho do sekce <strong>Data</strong> jako proměnnou <code className="font-mono text-amber-900 font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">VÝSLEDEK = 12</code>.{' '}
            Až následující instrukce <code className="font-mono text-emerald-800 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">3: PRINT VÝSLEDEK</code> si hodnotu z paměti RAM znovu přečte a pošle ji na monitor (výstup).
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <h4 className="font-bold text-blue-900 text-sm mb-1">1. Instrukce (Kód programu)</h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              Strojové instrukce, které procesor postupně čte a vykonává. Tento úsek je operačním systémem 
              chráněn <strong>pouze pro čtení (Read-Only)</strong>, aby si program omylem nepřepsal své vlastní příkazy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-900 text-sm mb-1">2. Data (Proměnné a hodnoty)</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Čísla, texty, obrázky a proměnné. Zde procesor čte vstupní hodnoty a ukládá sem vypočítané mezivýsledky. 
              Tato část paměti se za běhu programu <strong>může dynamicky zvětšovat</strong> (např. když v Poznámkovém bloku napíšete velký text).
            </p>
          </div>
        </div>
      </TheoryCard>

      {/* ========================================================================= */}
      {/* BLOK C: Občanský průkaz procesu: PCB (Process Control Block)               */}
      {/* ========================================================================= */}
      <TheoryCard icon={FileText} title="Občanský průkaz procesu: PCB (Process Control Block)" letter="C" tone="purple">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          V počítači běží stovky procesů najednou. Jak o nich jádro operačního systému (kernel) udržuje přehled? 
          Pro každý existující proces si jádro v paměti vede speciální strukturu zvanou{' '}
          <strong>PCB (Process Control Block)</strong> – pomyslný „občanský průkaz procesu“.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 mb-6">
          <h4 className="font-black text-slate-800 text-sm uppercase mb-4 text-center">
            Co všechno si jádro operačního systému v PCB pamatuje:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">1. Číslo a rodič (PID & PPID)</div>
              <p className="text-slate-600 leading-relaxed">Kdo proces je a který program ho spustil (např. PID 1420, rodič Průzkumník 108).</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">2. Co právě dělá (Stav)</div>
              <p className="text-slate-600 leading-relaxed">Zda proces zrovna počítá, nebo čeká, až uživatel stiskne klávesu či myš.</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">3. Záložka v běhu programu</div>
              <p className="text-slate-600 leading-relaxed">Místo, kde byl program naposledy přerušen, aby mohl po chvilce přesně tam pokračovat.</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">4. Přidělený prostor v RAM</div>
              <p className="text-slate-600 leading-relaxed">Kde v paměti začíná a končí jeho parcela, aby omylem nesáhl cizím programům do dat.</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">5. Otevřené soubory na disku</div>
              <p className="text-slate-600 leading-relaxed">Seznam souborů, se kterými právě pracuje (např. otevřený textový dokument).</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="font-bold text-purple-700 mb-1">6. Kterému uživateli patří</div>
              <p className="text-slate-600 leading-relaxed">Který přihlášený člověk ho spustil (např. žák u počítače vs. samotný operační systém).</p>
            </div>
          </div>
        </div>

        <Callout kind="info" title="Proč je PCB klíčový pro multitasking?">
          Když operační systém odebere procesu procesor a přepne na jiný, <strong>stav přerušeného procesu se neztratí</strong>. 
          Jádro bleskově uloží všechny hodnoty z procesoru do tabulky PCB. Jakmile proces dostane procesor znovu, jádro stav z PCB 
          načte a proces pokračuje přesně v tom zlomku mikrosekundy, kde minule skončil.
        </Callout>
      </TheoryCard>

      {/* ========================================================================= */}
      {/* BLOK D: Izolace procesů a ochrana paměti                                  */}
      {/* ========================================================================= */}
      <TheoryCard icon={ShieldCheck} title="Izolace procesů a ochrana paměti" letter="D" tone="rose">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          V operačním systému běží desítky programů současně. Zásadním úkolem moderního OS je zajistit, 
          aby byl každý proces <strong>dokonale izolován ve své vlastní bublině</strong>.
        </p>

        {/* Schéma: Ochranná zeď mezi procesy ve společné paměti RAM */}
        <div className="w-full max-w-3xl mx-auto bg-blue-50 border-4 border-blue-200 rounded-3xl p-5 sm:p-7 shadow-md flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-5 bg-white px-5 py-2 rounded-full shadow-sm border border-blue-100">
            <MemoryStick className="w-5 h-5 text-blue-600" />
            <span className="font-black text-blue-800 uppercase tracking-widest text-sm">Paměť (RAM) se dvěma procesy</span>
          </div>

          {/* Dva procesy oddělené zdí */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {/* PROCES 1 (Word) */}
            <div className="bg-white/80 rounded-2xl border-2 border-blue-200 p-4 flex flex-col shadow-xs">
              <div className="flex items-center justify-between mb-3 bg-blue-600 text-white px-3 py-1.5 rounded-xl shadow-xs">
                <span className="font-bold text-xs">Word (PID 101)</span>
                <span className="text-[10px] bg-blue-700/80 px-2 py-0.5 rounded-full font-mono">Adresy 1000–2999</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Sekce Program */}
                <div className="bg-white rounded-xl border-2 border-blue-100 p-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 pb-1 block">
                    Sekce: Program
                  </span>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-700">
                    <span className="text-blue-700 font-bold">1000–1999:</span>
                    <span className="font-semibold">Kód Wordu</span>
                  </div>
                  <div className="mt-1 text-[9px] text-blue-600 font-bold uppercase tracking-wider text-right">
                    🛡️ Read-Only
                  </div>
                </div>

                {/* Sekce Data */}
                <div className="bg-white rounded-xl border-2 border-blue-100 p-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 pb-1 block">
                    Sekce: Data
                  </span>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-700">
                    <span className="text-amber-800 font-bold">2000–2999:</span>
                    <span className="font-semibold">Psaný text</span>
                  </div>
                  <div className="mt-1 text-[9px] text-amber-700 font-bold uppercase tracking-wider text-right">
                    ✏️ Read & Write
                  </div>
                </div>
              </div>
            </div>

            {/* OCHRANNÁ ZEĎ (IZOLACE PAMĚTI) */}
            <div className="flex md:flex-col items-center justify-center gap-2 py-2 px-1 text-center">
              <div className="hidden md:block w-0.5 flex-1 border-r-2 border-dashed border-rose-400"></div>
              <div className="flex flex-col items-center gap-1 bg-rose-50 border-2 border-rose-300 rounded-2xl p-2.5 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-rose-600" />
                <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider whitespace-nowrap">
                  Izolace paměti
                </span>
                <span className="text-[9px] text-rose-600 font-bold leading-tight">
                  Hardwarová zeď
                </span>
              </div>
              <div className="hidden md:block w-0.5 flex-1 border-r-2 border-dashed border-rose-400"></div>
            </div>

            {/* PROCES 2 (Kalkulačka) */}
            <div className="bg-white/80 rounded-2xl border-2 border-emerald-200 p-4 flex flex-col shadow-xs">
              <div className="flex items-center justify-between mb-3 bg-emerald-600 text-white px-3 py-1.5 rounded-xl shadow-xs">
                <span className="font-bold text-xs">Kalkulačka (PID 205)</span>
                <span className="text-[10px] bg-emerald-700/80 px-2 py-0.5 rounded-full font-mono">Adresy 5000–6999</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* Sekce Program */}
                <div className="bg-white rounded-xl border-2 border-emerald-100 p-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 pb-1 block">
                    Sekce: Program
                  </span>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-700">
                    <span className="text-emerald-700 font-bold">5000–5999:</span>
                    <span className="font-semibold">Kód kalkulačky</span>
                  </div>
                  <div className="mt-1 text-[9px] text-emerald-600 font-bold uppercase tracking-wider text-right">
                    🛡️ Read-Only
                  </div>
                </div>

                {/* Sekce Data */}
                <div className="bg-white rounded-xl border-2 border-emerald-100 p-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-b border-slate-100 pb-1 block">
                    Sekce: Data
                  </span>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-700">
                    <span className="text-amber-800 font-bold">6000–6999:</span>
                    <span className="font-semibold">Čísla a výsledky</span>
                  </div>
                  <div className="mt-1 text-[9px] text-amber-700 font-bold uppercase tracking-wider text-right">
                    ✏️ Read & Write
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spodní informační lišta */}
          <div className="mt-4 w-full bg-white rounded-xl border border-blue-100 px-4 py-2 text-center text-xs text-slate-600 shadow-xs flex items-center justify-center gap-2">
            <span className="text-rose-600 font-black">⛔ ZÁKAZ PŘÍSTUPU:</span>
            <span>Kalkulačka nemá přístup na adresy Wordu (1000–2999) a naopak.</span>
          </div>
        </div>

        <Callout kind="warning" title="Klíčové bezpečnostní pravidlo: Ochrana paměti">
          Každý proces má v paměti RAM striktně vymezený svůj prostor. 
          <strong>Proces 1 nesmí číst ani přepisovat paměť Procesu 2!</strong> Pokud by se Kalkulačka pokusila sáhnout do paměti Wordu (např. kvůli chybě programátora), 
          hardwarový řadič paměti procesoru vyvolá přerušení (Segmentation Fault / Přístup odepřen) a jádro operačního systému 
          <strong>okamžitě ukončí pouze vadný proces</strong>. Celý zbytek systému i ostatní aplikace běží dál bez poškození.
        </Callout>

        {/* Věděli jste? Virtuální adresní prostor */}
        <div className="mt-6 p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase tracking-wider mb-2">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <span>Věděli jste, že proces žije v iluzi? (Virtuální paměť)</span>
          </div>
          <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed mb-3">
            Programátor při psaní programu vůbec neví, kde v RAM bude zrovna volné místo. 
            Operační systém proto každému procesu vytváří iluzi, že <strong>celá paměť patří jen jemu a začíná od adresy 0</strong>. 
            Skutečné fyzické umístění v čipech RAM řídí hardware procesoru. Díky tomu můžete otevřít 5 oken téhož programu najednou, 
            a žádné okno nepřepíše data jiného okna.
          </p>
        </div>
      </TheoryCard>

    </div>
  );
}
