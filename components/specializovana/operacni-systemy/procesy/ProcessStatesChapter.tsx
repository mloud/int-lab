'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Layers,
  PauseCircle,
  AlertCircle
} from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions 
} from '../souborove-systemy/FsShared';

interface ProcessStatesChapterProps {
  onBack: () => void;
}

type ProcessState = 'NEW' | 'READY' | 'RUNNING' | 'BLOCKED' | 'TERMINATED';

export default function ProcessStatesChapter({ onBack }: ProcessStatesChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'sim'>('theory');

  // Interaktivní stav pro simulátor životního cyklu
  const [currentState, setCurrentState] = useState<ProcessState>('READY');
  const [stateLog, setStateLog] = useState<string[]>([
    'Proces "editor.exe" (PID: 105) byl zaveden do RAM a zařazen do fronty Připraven (Ready).'
  ]);

  const changeState = (next: ProcessState, reason: string) => {
    setCurrentState(next);
    setStateLog((prev) => [reason, ...prev.slice(0, 4)]);
  };

  const tabs = [
    { id: 'theory', label: 'Teorie & Stavový diagram', icon: Activity },
    { id: 'sim', label: 'Interaktivní simulátor stavů', icon: Play },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      totalChapters={5}
      title="Životní cyklus a stavy:"
      highlight="Stavový diagram procesu"
      subtitle="Proč proces většinu času nepočítá na CPU, co dělá při čekání na disk a jak funguje 5 základních stavů."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
    >
      {/* ========================================================================= */}
      {/* ZÁLOŽKA 1: VÝKLADOVÁ TEORIE                                               */}
      {/* ========================================================================= */}
      {activeTab === 'theory' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          
          {/* BLOK A: Rychlostní propast a proč má proces stavy */}
          <TheoryCard icon={Clock} title="Proč proces nepočítá celou dobu? Rychlostní propast" letter="A" tone="indigo">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Když se podíváte na procesor v počítači, zdá se, že jede naplno. Skutečnost je ale jiná: 
              <strong>proces tráví většinu svého života čekáním</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6">
              <h4 className="font-black text-slate-900 text-sm uppercase mb-3">
                Porovnání rychlostí: CPU vs. Pomalý disk z minulé kapitoly
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <span>Rychlost CPU (Nanosekundy)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                    Procesor provede <strong>miliardy operací za vteřinu</strong> (jedna instrukce trvá zlomek nanosekundy).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                    <HardDrive className="w-5 h-5 text-amber-600" />
                    <span>Čtení z disku / I/O (Milisekundy)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    Čtení sektoru z disku trvá <strong>okolo 10 milisekund</strong>. Pro procesor je to jako čekat celý měsíc!
                  </p>
                </div>
              </div>
            </div>

            <Callout kind="key" title="Základní pravidlo operačního systému">
              Když proces požádá o čtení z disku (nebo čeká, až uživatel stiskne klávesu), <strong>CPU nesmí zahálet</strong>! 
              Operační systém tento proces okamžitě uspí do stavu <em>Čekající (Blocked)</em> a na procesor pustí jiný proces, který je připraven počítat.
            </Callout>
          </TheoryCard>

          {/* BLOK B: 5 základních stavů procesu */}
          <TheoryCard icon={Activity} title="Pět základních stavů procesu" letter="B" tone="purple">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              V každém okamžiku své existence se proces nachází právě v jednom z následujících stavů:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              
              {/* 1. NEW */}
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-xs font-mono font-bold uppercase text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full">
                  1. Stav
                </span>
                <h4 className="font-black text-slate-900 text-base mt-2 mb-1">Nový (New)</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Proces se právě vytváří. OS alokuje struktury v paměti RAM a načítá kód z disku.
                </p>
              </div>

              {/* 2. READY */}
              <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200">
                <span className="text-xs font-mono font-bold uppercase text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  2. Stav
                </span>
                <h4 className="font-black text-blue-950 text-base mt-2 mb-1">Připraven (Ready)</h4>
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                  Proces má všechna data v RAM a <strong>čeká ve frontě</strong>, až mu plánovač OS přidělí procesor.
                </p>
              </div>

              {/* 3. RUNNING */}
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  3. Stav
                </span>
                <h4 className="font-black text-emerald-950 text-base mt-2 mb-1">Běžící (Running)</h4>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  Proces <strong>fyzicky běží na CPU</strong>. Čítač instrukcí (PC) vykonává jeho instrukce.
                </p>
              </div>

              {/* 4. BLOCKED */}
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <span className="text-xs font-mono font-bold uppercase text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  4. Stav
                </span>
                <h4 className="font-black text-amber-950 text-base mt-2 mb-1">Blokovaný (Blocked)</h4>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Čeká na pomalou I/O operaci (čtení z disku, síť, klávesnici). <strong>Nemůže počítat</strong>, i kdyby bylo CPU volné!
                </p>
              </div>

              {/* 5. TERMINATED */}
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200">
                <span className="text-xs font-mono font-bold uppercase text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  5. Stav
                </span>
                <h4 className="font-black text-rose-950 text-base mt-2 mb-1">Ukončený (Terminated)</h4>
                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                  Program skončil. OS uvolňuje jeho paměť RAM a maže jeho PID ze systému.
                </p>
              </div>

            </div>

            {/* VEKTOROVÉ SCHÉMA: STAVOVÝ DIAGRAM PROCESU */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-purple-700 bg-purple-100 py-1 px-3 rounded-full mb-4 inline-block">
                Schéma: Stavový diagram přechodů procesu
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
                <svg viewBox="0 0 680 320" className="w-full max-w-[640px] h-auto">
                  
                  {/* UZEL 1: NEW */}
                  <rect x="30" y="130" width="100" height="50" rx="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.5" />
                  <text x="80" y="160" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">NEW</text>
                  
                  {/* Přechod NEW -> READY */}
                  <path d="M 130 155 L 200 155" fill="none" stroke="#64748b" strokeWidth="3" />
                  <polygon points="195,150 205,155 195,160" fill="#64748b" />
                  <text x="165" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Zavedení</text>

                  {/* UZEL 2: READY */}
                  <rect x="210" y="125" width="120" height="60" rx="16" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
                  <text x="270" y="152" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">PŘIPRAVEN</text>
                  <text x="270" y="170" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">(READY)</text>

                  {/* Přechod READY -> RUNNING (Nahoru vpravo) */}
                  <path d="M 330 140 L 410 140" fill="none" stroke="#2563eb" strokeWidth="3" />
                  <polygon points="405,135 415,140 405,145" fill="#2563eb" />
                  <text x="370" y="130" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold">Přidělení CPU</text>

                  {/* Přechod RUNNING -> READY (Zpět dolů - vypršel čas) */}
                  <path d="M 420 170 L 330 170" fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="335,165 325,170 335,175" fill="#64748b" />
                  <text x="375" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Vypršel čas (Timer)</text>

                  {/* UZEL 3: RUNNING */}
                  <rect x="420" y="125" width="120" height="60" rx="16" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" />
                  <text x="480" y="152" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">BĚŽÍCÍ</text>
                  <text x="480" y="170" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="bold">(RUNNING)</text>

                  {/* Přechod RUNNING -> TERMINATED */}
                  <path d="M 540 155 L 590 155" fill="none" stroke="#ef4444" strokeWidth="3" />
                  <polygon points="585,150 595,155 585,160" fill="#ef4444" />
                  <text x="565" y="145" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Konec</text>

                  {/* UZEL 5: TERMINATED */}
                  <rect x="595" y="130" width="70" height="50" rx="14" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="630" y="160" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">EXIT</text>

                  {/* UZEL 4: BLOCKED (Dole uprostřed) */}
                  <rect x="315" y="240" width="140" height="55" rx="16" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
                  <text x="385" y="265" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">BLOKOVANÝ</text>
                  <text x="385" y="282" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">(BLOCKED / ČEKÁ)</text>

                  {/* Šipka RUNNING -> BLOCKED (Požadavek na disk) */}
                  <path d="M 480 185 L 480 265 L 455 265" fill="none" stroke="#d97706" strokeWidth="3" />
                  <polygon points="460,260 450,265 460,270" fill="#d97706" />
                  <text x="515" y="225" textAnchor="start" fill="#b45309" fontSize="10" fontWeight="bold">I/O požadavek</text>
                  <text x="515" y="238" textAnchor="start" fill="#b45309" fontSize="9">(Čtení z disku)</text>

                  {/* Šipka BLOCKED -> READY (Disk dokončil práci) */}
                  <path d="M 315 265 L 260 265 L 260 185" fill="none" stroke="#0284c7" strokeWidth="3" />
                  <polygon points="255,190 260,180 265,190" fill="#0284c7" />
                  <text x="235" y="225" textAnchor="end" fill="#0284c7" fontSize="10" fontWeight="bold">I/O hotovo!</text>
                  <text x="235" y="238" textAnchor="end" fill="#0284c7" fontSize="9">(Disk dočetl data)</text>
                </svg>
              </div>
            </div>

            <Callout kind="warning" title="Důležitý chyták: Kam jde proces po dočtení z disku?">
              Všimněte si šipky ze stavu <strong>BLOCKED</strong>! Když pevný disk konečně načte soubor, proces <strong>NEJDE rovnou na CPU (Running)</strong>! 
              Jde do fronty <strong>READY (Připraven)</strong>, protože na procesoru v tu chvíli už může počítat někdo jiný.
            </Callout>
          </TheoryCard>

          {/* OPAKOVACÍ OTÁZKY */}
          <RevealQuestions
            questions={[
              {
                q: 'Proč proces tráví většinu času čekáním a ne na CPU?',
                a: 'Protože CPU je miliardkrát rychlejší než vstupně-výstupní zařízení (disk, síť, klávesnice). Během doby, kdy disk čte jeden sektor, by procesor stihl provést miliony instrukcí. Proto proces při čekání uvolní CPU jiným programům.'
              },
              {
                q: 'Jaký je rozdíl mezi stavem Připraven (Ready) a Blokovaný (Blocked)?',
                a: 'Připravený proces má všechna data v RAM a MŮŽE ihned počítat, jen čeká ve frontě na CPU. Blokovaný proces NEMŮŽE počítat vůbec, i kdyby byl procesor prázdný, protože čeká na data z disku nebo od uživatele.'
              },
              {
                q: 'Kam se přesune proces v okamžiku, kdy disk dokončí čtení jeho souboru?',
                a: 'Přesune se do stavu Připraven (Ready). Musí se zařadit do fronty a počkat, až na něj plánovač CPU znovu uvolní řadu.'
              }
            ]}
          />

        </div>
      )}

      {/* ========================================================================= */}
      {/* ZÁLOŽKA 2: INTERAKTIVNÍ SIMULÁTOR STAVŮ                                   */}
      {/* ========================================================================= */}
      {activeTab === 'sim' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Simulátor chování procesu
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-2">
              Vyzkoušejte si přechody stavů procesu
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Vy jste operační systém. Rozhodujte o událostech a sledujte, v jakém stavu se proces právě nachází.
            </p>
          </div>

          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-2 border-slate-200">
            
            {/* Vizuální vizitka aktuálního stavu */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white rounded-2xl border-2 border-slate-200 mb-8 gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-md ${
                  currentState === 'NEW' ? 'bg-slate-500' :
                  currentState === 'READY' ? 'bg-blue-600' :
                  currentState === 'RUNNING' ? 'bg-emerald-600 animate-pulse' :
                  currentState === 'BLOCKED' ? 'bg-amber-500' : 'bg-rose-600'
                }`}>
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-slate-400">Aktuální stav procesu editor.exe (PID 105)</div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {currentState === 'NEW' && 'Nový (New) – Načítání z disku'}
                    {currentState === 'READY' && 'Připraven (Ready) – Čeká ve frontě na CPU'}
                    {currentState === 'RUNNING' && 'Běžící (Running) – Počítá na procesoru!'}
                    {currentState === 'BLOCKED' && 'Blokovaný (Blocked) – Čeká na disk!'}
                    {currentState === 'TERMINATED' && 'Ukončený (Terminated) – Paměť uvolněna'}
                  </h3>
                </div>
              </div>

              <div className="font-mono text-xs font-black uppercase px-4 py-2 rounded-xl bg-slate-100 text-slate-700">
                STAV: {currentState}
              </div>
            </div>

            {/* OVLÁDACÍ TLAČÍTKA UDÁLOSTÍ */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Dostupné akce a systémové události:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentState === 'READY' && (
                  <button
                    onClick={() => changeState('RUNNING', 'Plánovač přidělil procesoru proces PID 105 ➔ Běží na CPU (Running).')}
                    className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                  >
                    <span>1. Přidělit CPU (Dispatch)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {currentState === 'RUNNING' && (
                  <>
                    <button
                      onClick={() => changeState('READY', 'Vypršel časový kvant časovače ➔ Návrat do fronty Připraven (Ready).')}
                      className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                    >
                      <span>1. Vypršel čas CPU (Timer)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => changeState('BLOCKED', 'Proces požádal o přečtení souboru z disku ➔ Uspán do stavu Blokován (Blocked).')}
                      className="p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                    >
                      <span>2. Požadavek na disk (I/O)</span>
                      <HardDrive className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => changeState('TERMINATED', 'Program dokončil práci nebo uživatel klikl na křížek ➔ Ukončen (Terminated).')}
                      className="p-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                    >
                      <span>3. Ukončit program (Exit)</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </>
                )}

                {currentState === 'BLOCKED' && (
                  <button
                    onClick={() => changeState('READY', 'Pevný disk dočetl soubor do RAM ➔ Proces zařazen do fronty Připraven (Ready).')}
                    className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                  >
                    <span>Disk dokončil čtení! ➔ Do fronty Ready</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {currentState === 'TERMINATED' && (
                  <button
                    onClick={() => {
                      setCurrentState('READY');
                      setStateLog(['Proces byl znovu spuštěn a čeká v paměti RAM jako Ready.']);
                    }}
                    className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all text-left flex items-center justify-between"
                  >
                    <span>Spustit proces znovu od začátku</span>
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Záznam událostí */}
            <div className="mt-8 bg-white p-5 rounded-2xl border border-slate-200">
              <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">Historie přechodů procesu:</div>
              <ul className="space-y-2 text-xs font-mono text-slate-700">
                {stateLog.map((log, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-purple-600 font-bold">›</span>
                    <span>{log}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </FsChapterShell>
  );
}
