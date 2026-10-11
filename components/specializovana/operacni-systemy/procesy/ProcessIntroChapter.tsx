'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  FileCode, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions 
} from '../souborove-systemy/FsShared';

interface ProcessIntroChapterProps {
  onBack: () => void;
}

export default function ProcessIntroChapter({ onBack }: ProcessIntroChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'switch-demo'>('theory');

  // Interaktivní stav pro krokování přepínání procesů
  const [switchStep, setSwitchStep] = useState<1 | 2 | 3>(1);

  const tabs = [
    { id: 'theory', label: 'Teorie & Schémata', icon: Layers },
    { id: 'switch-demo', label: 'Simulace střídání CPU', icon: RefreshCw },
  ];

  return (
    <FsChapterShell
      chapterNumber={1}
      totalChapters={1}
      title="Úvod do procesů:"
      highlight="Vznik a střídání na CPU"
      subtitle="Od pasivního souboru na disku k živému procesu v RAM, identifikace PID a princip střídání přes registr PC."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
    >
      {/* ========================================================================= */}
      {/* ZÁLOŽKA 1: VÝKLADOVÁ TEORIE SE SCHÉMATY                                   */}
      {/* ========================================================================= */}
      {activeTab === 'theory' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          
          {/* BLOK A: Co je program a jak z něj vznikne proces */}
          <TheoryCard icon={FileCode} title="Co je program a jak vzniká proces" letter="A" tone="indigo">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Každý program začíná svůj život jako pasivní soubor na disku (např. <code className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-sm">kalkulacka.exe</code>).
              Dokud na něj neklikneme, leží v sektorech disku, neodebírá žádný výkon procesoru a nic nepočítá.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">Pasivní stav</div>
                <h4 className="text-lg font-black text-slate-800 mb-2">Program (na disku)</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Soubor složený z bajtů uložený v souborovém systému. Může ležet na disku roky. Je to jako <strong>recept v kuchařce</strong> ležící na poličce.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200">
                <div className="text-xs font-mono font-bold uppercase text-indigo-600 mb-1">Aktivní stav</div>
                <h4 className="text-lg font-black text-indigo-950 mb-2">Proces (v paměti RAM)</h4>
                <p className="text-sm text-indigo-900 leading-relaxed">
                  Běžící instance programu zavedená do RAM. Má přidělené systémové prostředky a čas procesoru. Je to jako <strong>kuchař, který podle receptu právě vaří</strong>.
                </p>
              </div>
            </div>

            {/* Vektorové schéma: Zrození procesu */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-indigo-700 bg-indigo-100 py-1 px-3 rounded-full mb-4 inline-block">
                Schéma: Zrození procesu z disku do RAM
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
                <svg viewBox="0 0 680 220" className="w-full max-w-[620px] h-auto">
                  {/* DISK VLEVO */}
                  <rect x="20" y="30" width="160" height="150" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                  <rect x="35" y="45" width="130" height="30" rx="8" fill="#e2e8f0" />
                  <text x="100" y="65" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">DISK (HDD / SSD)</text>
                  
                  {/* Soubor na disku */}
                  <rect x="35" y="90" width="130" height="70" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="100" y="118" textAnchor="middle" fill="#6d28d9" fontSize="13" fontWeight="bold">program.exe</text>
                  <text x="100" y="138" textAnchor="middle" fill="#7c3aed" fontSize="10">Pasivní kód na disku</text>

                  {/* ŠIPKA SPUŠTĚNÍ */}
                  <path d="M 195 105 L 295 105" fill="none" stroke="#6366f1" strokeWidth="4" />
                  <polygon points="295,97 315,105 295,113" fill="#6366f1" />
                  <text x="250" y="85" textAnchor="middle" fill="#4f46e5" fontSize="11" fontWeight="bold">Dvojklik myší</text>
                  <text x="250" y="130" textAnchor="middle" fill="#64748b" fontSize="10">OS Loader načte data</text>

                  {/* PAMĚŤ RAM VPRAVO */}
                  <rect x="330" y="20" width="330" height="180" rx="20" fill="#f0fdf4" stroke="#86efac" strokeWidth="3" />
                  <text x="495" y="45" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">OPERAČNÍ PAMĚŤ (RAM)</text>

                  {/* Blok běžícího procesu */}
                  <rect x="350" y="60" width="290" height="120" rx="14" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
                  
                  {/* Hlavička s PID */}
                  <rect x="350" y="60" width="290" height="36" rx="12" fill="#4f46e5" />
                  <text x="495" y="84" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">PROCES (PID: 1042)</text>
                  
                  {/* Obsah procesu */}
                  <text x="495" y="118" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Aktivní běh programu v paměti</text>
                  <text x="495" y="140" textAnchor="middle" fill="#64748b" fontSize="11">Přidělené systémové prostředky</text>
                  <text x="495" y="160" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">● Stav: Připraven k vykonávání</text>
                </svg>
              </div>
            </div>

            <Callout kind="key" title="Definice procesu & identifikátor PID">
              <strong>Definice procesu:</strong> Proces je <em>běžící instance programu zavedená do operační paměti RAM</em>, která je přidělena operačnímu systému k vykonávání a má vlastní paměťový prostor.<br />
              <strong>Co je PID?</strong> Každý proces dostane od jádra OS své unikátní číslo – <strong>PID (Process Identifier)</strong>. Díky němu systém přesně ví, který proces právě požaduje data a který proces má ukončit při zavření okna.
            </Callout>
          </TheoryCard>

          {/* BLOK B: Paměť procesu (Instrukce vs. Data) */}
          <TheoryCard icon={Database} title="Jak vypadá paměť procesu (podle Von Neumanna)" letter="B" tone="emerald">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Když operační systém vyhradí procesu blok v paměti RAM, uspořádá ho přesně podle 
              principů <strong>Von Neumannovy architektury</strong>, které už známe z hardwaru. 
              Paměť procesu je rozdělena na dvě klíčové části:
            </p>

            {/* Schéma paměťového bloku procesu */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-emerald-800 bg-emerald-100 py-1 px-3 rounded-full mb-4 inline-block">
                Schéma: Vnitřní rozdělení paměti běžícího procesu
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
                <svg viewBox="0 0 640 260" className="w-full max-w-[580px] h-auto">
                  {/* Rámec vyhrazené paměti */}
                  <rect x="40" y="20" width="560" height="220" rx="20" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
                  <text x="320" y="48" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="black" letterSpacing="1">
                    PAMĚŤOVÝ PROSTOR PROCESU (PID: 1042)
                  </text>

                  {/* 1. Instrukční / Kódový segment */}
                  <rect x="70" y="70" width="240" height="145" rx="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
                  <rect x="70" y="70" width="240" height="34" rx="12" fill="#2563eb" />
                  <text x="190" y="93" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">1. KÓD / INSTRUKCE</text>
                  
                  {/* Instrukce uvnitř */}
                  <text x="90" y="130" fill="#1e3a8a" fontSize="11" fontFamily="monospace">0x1000: LOAD R1, [X]</text>
                  <text x="90" y="152" fill="#1e3a8a" fontSize="11" fontFamily="monospace">0x1004: ADD  R1, [Y]</text>
                  <text x="90" y="174" fill="#1e3a8a" fontSize="11" fontFamily="monospace">0x1008: STORE [VYSLEDEK]</text>
                  <text x="90" y="196" fill="#64748b" fontSize="10">Povely pro CPU (CO se má dít)</text>

                  {/* 2. Datový segment */}
                  <rect x="330" y="70" width="240" height="145" rx="14" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2.5" />
                  <rect x="330" y="70" width="240" height="34" rx="12" fill="#d97706" />
                  <text x="450" y="93" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">2. DATA / PROMĚNNÉ</text>
                  
                  {/* Data uvnitř */}
                  <text x="350" y="130" fill="#78350f" fontSize="11" fontFamily="monospace">0x2000: proměnná X = 15</text>
                  <text x="350" y="152" fill="#78350f" fontSize="11" fontFamily="monospace">0x2004: proměnná Y = 25</text>
                  <text x="350" y="174" fill="#78350f" fontSize="11" fontFamily="monospace">0x2008: výsledek = 40</text>
                  <text x="350" y="196" fill="#b45309" fontSize="10">Hodnoty k výpočtu (S ČÍM se pracuje)</text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">Instrukce (Kód)</h4>
                <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                  Strojové instrukce, které procesor postupně čte a vykonává. Tento úsek je chráněn pouze pro čtení, aby si program omylem nepřepsal své vlastní příkazy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-900 text-sm mb-1">Data (Proměnné)</h4>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  Čísla, texty a stavové proměnné. Zde procesor čte vstupní hodnoty a ukládá sem vypočítané mezivýsledky i finální data.
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* BLOK C: Dva procesy v paměti RAM vedle sebe */}
          <TheoryCard icon={Layers} title="Dva procesy v paměti RAM a jejich izolace" letter="C" tone="purple">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              V moderním operačním systému neběží jen jeden program. V operační paměti RAM 
              leží **více procesů současně vedle sebe** (např. Textový editor a Kalkulačka).
            </p>

            {/* Schéma: Dva procesy v RAM vedle sebe */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-purple-700 bg-purple-100 py-1 px-3 rounded-full mb-4 inline-block">
                Schéma: Dva nezávislé procesy v paměti RAM
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
                <svg viewBox="0 0 660 250" className="w-full max-w-[620px] h-auto">
                  {/* Celá RAM */}
                  <rect x="20" y="20" width="620" height="210" rx="20" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
                  <text x="330" y="45" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">
                    OPERAČNÍ PAMĚŤ (RAM) SE DVĚMA BĚŽÍCÍMI PROCESY
                  </text>

                  {/* PROCES 1 (Vlevo) */}
                  <rect x="40" y="65" width="260" height="145" rx="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
                  <rect x="40" y="65" width="260" height="32" rx="12" fill="#2563eb" />
                  <text x="170" y="86" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">PROCES 1: Word (PID 101)</text>
                  
                  <rect x="55" y="105" width="230" height="42" rx="8" fill="#ffffff" stroke="#93c5fd" />
                  <text x="170" y="125" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Instrukce Wordu (Kód)</text>
                  <text x="170" y="140" textAnchor="middle" fill="#64748b" fontSize="10">0x1000 – 0x1FFF</text>

                  <rect x="55" y="153" width="230" height="42" rx="8" fill="#ffffff" stroke="#93c5fd" />
                  <text x="170" y="173" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Data: Psaný dokument</text>
                  <text x="170" y="188" textAnchor="middle" fill="#64748b" fontSize="10">0x2000 – 0x2FFF</text>

                  {/* OCHRANNÁ ZEĎ MEZI PROCESY */}
                  <line x1="330" y1="65" x2="330" y2="210" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 4" />
                  <text x="330" y="140" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold" transform="rotate(-90 330 140)">
                    IZOLACE PAMĚTI
                  </text>

                  {/* PROCES 2 (Vpravo) */}
                  <rect x="360" y="65" width="260" height="145" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
                  <rect x="360" y="65" width="260" height="32" rx="12" fill="#16a34a" />
                  <text x="490" y="86" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">PROCES 2: Kalkulačka (PID 205)</text>
                  
                  <rect x="375" y="105" width="230" height="42" rx="8" fill="#ffffff" stroke="#86efac" />
                  <text x="490" y="125" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Instrukce Kalkulačky (Kód)</text>
                  <text x="490" y="140" textAnchor="middle" fill="#64748b" fontSize="10">0x5000 – 0x5FFF</text>

                  <rect x="375" y="153" width="230" height="42" rx="8" fill="#ffffff" stroke="#86efac" />
                  <text x="490" y="173" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Data: Čísla a mezivýsledky</text>
                  <text x="490" y="188" textAnchor="middle" fill="#64748b" fontSize="10">0x6000 – 0x6FFF</text>
                </svg>
              </div>
            </div>

            <Callout kind="warning" title="Klíčové bezpečnostní pravidlo: Izolace procesů">
              Každý proces má přísně vymezený svůj vlastní paměťový prostor. 
              <strong>Proces 1 nesmí číst ani přepisovat data Procesu 2!</strong> Pokud by se Kalkulačka pokusila sáhnout do paměti Wordu, procesor vyvolá chybu (Segmentation Fault) a operační systém vadný proces okamžitě ukončí.
            </Callout>
          </TheoryCard>

          {/* BLOK D: Jak procesor střídá procesy (Přepnutí přes Program Counter) */}
          <TheoryCard icon={Cpu} title="Jak procesor střídá procesy: Registr PC a střídání na CPU" letter="D" tone="rose">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Máme v paměti dva procesy, ale procesor má <strong>pouze jeden Program Counter (PC)</strong>. 
              Čítač instrukcí může v daném zlomku vteřiny mířit pouze na jedno místo. Jak tedy může počítač vykonávat oba programy?
            </p>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-rose-700 bg-rose-100 py-1 px-3 rounded-full mb-4 inline-block">
                Princip střídání procesů (Přepnutí kontextu / Context Switch)
              </div>

              {/* Tříkrokový diagram střídání */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Krok 1 */}
                <div className="p-4 bg-white rounded-2xl border-2 border-blue-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      Krok 1
                    </span>
                    <h5 className="font-black text-slate-900 text-sm mt-2 mb-1">Běží Proces 1 (Word)</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Čítač procesoru <strong className="font-mono text-blue-700">PC = 0x1004</strong> ukazuje do instrukcí Procesu 1. Procesor čte jeho kód a počítá.
                    </p>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center font-mono text-xs font-bold text-blue-800">
                    CPU vykonává Proces 1
                  </div>
                </div>

                {/* Krok 2 */}
                <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Krok 2
                    </span>
                    <h5 className="font-black text-slate-900 text-sm mt-2 mb-1">Uložení PC & Přepnutí</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Čas vypršel! OS uloží aktuální stav <strong className="font-mono text-amber-700">PC = 0x1004</strong> do záznamu Procesu 1. Do PC se načte uložená hodnota Procesu 2 (<strong className="font-mono text-green-700">PC = 0x5020</strong>).
                    </p>
                  </div>
                  <div className="mt-3 p-2 bg-amber-50 rounded-lg text-center font-mono text-xs font-bold text-amber-800">
                    Uložení PC1 ➔ Načtení PC2
                  </div>
                </div>

                {/* Krok 3 */}
                <div className="p-4 bg-white rounded-2xl border-2 border-green-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                      Krok 3
                    </span>
                    <h5 className="font-black text-slate-900 text-sm mt-2 mb-1">Běží Proces 2 (Kalkulačka)</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Čítač procesoru nyní ukazuje na <strong className="font-mono text-green-700">0x5020</strong>. CPU pokračuje v Procesu 2 přesně tam, kde minule skončil.
                    </p>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 rounded-lg text-center font-mono text-xs font-bold text-green-800">
                    CPU vykonává Proces 2
                  </div>
                </div>

              </div>
            </div>

            <Callout kind="tip" title="Proč máme pocit, že počítač dělá vše naráz?">
              Tento proces přepnutí Program Counteru (uložení PC jednoho procesu a skok na instrukce druhého) probíhá 
              <strong>stovky až tisíce krát za sekundu</strong>. Lidské oko ani mozek tak rychlé střídání nedokáže postřehnout, a proto máme dokonalou iluzi, že hrajeme hru, stahujeme soubor a posloucháme hudbu v naprosto stejný okamžik!
            </Callout>
          </TheoryCard>

          {/* OPAKOVACÍ OTÁZKY */}
          <RevealQuestions
            questions={[
              {
                q: 'Jaký je přesný rozdíl mezi programem a procesem?',
                a: 'Program je pasivní soubor uložený na disku (recept). Proces je aktivní běžící instance tohoto programu v paměti RAM, která má přidělený výpočetní čas CPU a unikátní identifikační číslo PID (kuchař u sporáku).'
              },
              {
                q: 'Z jakých dvou základních částí se skládá paměťový blok procesu podle Von Neumanna?',
                a: 'Z Instrukčního (Kódového) segmentu, kde leží samotné příkazy pro procesor (CO se má dělat), a Datového segmentu, kde leží proměnné a číselné hodnoty (S ČÍM se pracuje).'
              },
              {
                q: 'Co je to PID a proč ho každý proces potřebuje?',
                a: 'PID (Process Identifier) je unikátní číselný identifikátor procesu. Operační systém díky němu jednoznačně rozpoznává, kterému procesu patří které okno, která paměť a který proces má ukončit při zavření.'
              },
              {
                q: 'Jak procesor s jediným čítačem instrukcí (PC) dokáže zpracovávat dva procesy?',
                a: 'Během přepnutí kontextu OS uloží aktuální hodnotu PC prvního procesu do paměti a do registru PC v procesoru načte uloženou adresu druhého procesu. Tento cyklus se opakuje stovkykrát za sekundu.'
              }
            ]}
          />

        </div>
      )}

      {/* ========================================================================= */}
      {/* ZÁLOŽKA 2: INTERAKTIVNÍ DEMO STŘÍDÁNÍ CPU                                 */}
      {/* ========================================================================= */}
      {activeTab === 'switch-demo' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Interaktivní krokování
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-2">
              Sledujte, jak se mění Program Counter (PC)
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Klikáním na tlačítka krokujte střídání procesoru mezi Procesem 1 (Word) a Procesem 2 (Kalkulačka).
            </p>
          </div>

          {/* OVLÁDACÍ LIŠTA KROKŮ */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSwitchStep(1)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                switchStep === 1 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>1. Krok: Běží Proces 1 (Word)</span>
            </button>

            <button
              onClick={() => setSwitchStep(2)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                switchStep === 2 
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>2. Krok: Uložení PC & Přepnutí</span>
            </button>

            <button
              onClick={() => setSwitchStep(3)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                switchStep === 3 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>3. Krok: Běží Proces 2 (Kalkulačka)</span>
            </button>
          </div>

          {/* VELKÉ VIZUÁLNÍ PLÁTNO SIMULACE */}
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-2 border-slate-200 relative overflow-hidden">
            
            {/* Popis aktuálního stavu */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${
                  switchStep === 1 ? 'bg-blue-600' : switchStep === 2 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}>
                  {switchStep}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm uppercase">
                    {switchStep === 1 && 'Procesor vykonává instrukce Wordu'}
                    {switchStep === 2 && 'OS ukládá stav PC1 a načítá uloženou hodnotu PC2'}
                    {switchStep === 3 && 'Procesor plynule pokračuje v instrukcích Kalkulačky'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {switchStep === 1 && 'Registr PC v procesoru obsahuje 0x1004 (ukazuje do paměti Wordu).'}
                    {switchStep === 2 && 'Záznam v jádře OS přebírá PC = 0x1004. Z druhého záznamu se načítá PC = 0x5020.'}
                    {switchStep === 3 && 'Registr PC v procesoru obsahuje 0x5020 (ukazuje do paměti Kalkulačky).'}
                  </p>
                </div>
              </div>

              <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-slate-100 font-bold text-slate-700">
                CPU Registr PC: {switchStep === 1 ? '0x1004' : switchStep === 2 ? '0x1004 ➔ 0x5020' : '0x5020'}
              </div>
            </div>

            {/* Grafické schéma propojení CPU a RAM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-center">
              <svg viewBox="0 0 700 320" className="w-full max-w-[650px] h-auto">
                
                {/* PROCESOR NAHOŘE UPROSTŘED */}
                <rect x="250" y="20" width="200" height="100" rx="16" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                <text x="350" y="48" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">PROCESOR (CPU)</text>
                
                {/* Registr PC v procesoru */}
                <rect x="270" y="60" width="160" height="42" rx="8" fill={switchStep === 1 ? '#1d4ed8' : switchStep === 2 ? '#b45309' : '#15803d'} />
                <text x="350" y="78" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">ČÍTAČ INSTRUKCÍ (PC)</text>
                <text x="350" y="94" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  {switchStep === 1 ? 'PC = 0x1004' : switchStep === 2 ? 'PC = 0x5020' : 'PC = 0x5020'}
                </text>

                {/* VODIČE / ŠIPKY Z CPU DO PAMĚTI */}
                {/* Větev pro Proces 1 */}
                <path 
                  d="M 270 90 L 150 90 L 150 170" 
                  fill="none" 
                  stroke={switchStep === 1 ? '#2563eb' : '#cbd5e1'} 
                  strokeWidth={switchStep === 1 ? '4' : '2'} 
                  strokeDasharray={switchStep === 1 ? 'none' : '4 4'}
                />
                {switchStep === 1 && (
                  <polygon points="144,165 150,175 156,165" fill="#2563eb" />
                )}

                {/* Větev pro Proces 2 */}
                <path 
                  d="M 430 90 L 550 90 L 550 170" 
                  fill="none" 
                  stroke={switchStep === 3 ? '#16a34a' : '#cbd5e1'} 
                  strokeWidth={switchStep === 3 ? '4' : '2'} 
                  strokeDasharray={switchStep === 3 ? 'none' : '4 4'}
                />
                {switchStep === 3 && (
                  <polygon points="544,165 550,175 556,165" fill="#16a34a" />
                )}

                {/* PAMĚŤOVÝ BLOK PROCESU 1 (DOLE VLEVO) */}
                <rect 
                  x="50" 
                  y="180" 
                  width="200" 
                  height="120" 
                  rx="14" 
                  fill={switchStep === 1 ? '#eff6ff' : '#f8fafc'} 
                  stroke={switchStep === 1 ? '#2563eb' : '#94a3b8'} 
                  strokeWidth={switchStep === 1 ? '3' : '2'} 
                />
                <rect x="50" y="180" width="200" height="28" rx="12" fill={switchStep === 1 ? '#2563eb' : '#64748b'} />
                <text x="150" y="198" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">PROCES 1 (PID 101: Word)</text>
                
                {/* Instrukce */}
                <text x="65" y="225" fill="#1e3a8a" fontSize="10" fontFamily="monospace">0x1000: LOAD text</text>
                <text 
                  x="65" 
                  y="245" 
                  fill={switchStep === 1 ? '#2563eb' : '#64748b'} 
                  fontSize="11" 
                  fontFamily="monospace" 
                  fontWeight={switchStep === 1 ? 'bold' : 'normal'}
                >
                  {switchStep === 1 ? '➔ 0x1004: FORMAT text' : '  0x1004: FORMAT text'}
                </text>
                <text x="65" y="265" fill="#1e3a8a" fontSize="10" fontFamily="monospace">0x1008: DISPLAY</text>

                {/* Uložená hodnota v OS */}
                <rect x="65" y="278" width="170" height="18" rx="4" fill="#e0e7ff" />
                <text x="150" y="291" textAnchor="middle" fill="#3730a3" fontSize="9" fontWeight="bold">
                  {switchStep === 2 ? '💾 Uloženo v OS: PC = 0x1004' : 'Záznam v OS: PID 101'}
                </text>

                {/* PAMĚŤOVÝ BLOK PROCESU 2 (DOLE VPRAVO) */}
                <rect 
                  x="450" 
                  y="180" 
                  width="200" 
                  height="120" 
                  rx="14" 
                  fill={switchStep === 3 ? '#f0fdf4' : '#f8fafc'} 
                  stroke={switchStep === 3 ? '#16a34a' : '#94a3b8'} 
                  strokeWidth={switchStep === 3 ? '3' : '2'} 
                />
                <rect x="450" y="180" width="200" height="28" rx="12" fill={switchStep === 3 ? '#16a34a' : '#64748b'} />
                <text x="550" y="198" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">PROCES 2 (PID 205: Calc)</text>
                
                {/* Instrukce */}
                <text x="465" y="225" fill="#14532d" fontSize="10" fontFamily="monospace">0x501C: LOAD R1, 5</text>
                <text 
                  x="465" 
                  y="245" 
                  fill={switchStep === 3 ? '#16a34a' : '#64748b'} 
                  fontSize="11" 
                  fontFamily="monospace" 
                  fontWeight={switchStep === 3 ? 'bold' : 'normal'}
                >
                  {switchStep === 3 ? '➔ 0x5020: ADD R1, 10' : '  0x5020: ADD R1, 10'}
                </text>
                <text x="465" y="265" fill="#14532d" fontSize="10" fontFamily="monospace">0x5024: STORE sum</text>

                {/* Uložená hodnota v OS */}
                <rect x="465" y="278" width="170" height="18" rx="4" fill="#dcfce7" />
                <text x="550" y="291" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="bold">
                  {switchStep === 2 ? '⚡ Načítá se do PC: 0x5020' : 'Záznam v OS: PID 205'}
                </text>

              </svg>
            </div>

            {/* Tlačítko dalšího kroku */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setSwitchStep((prev) => (prev === 3 ? 1 : ((prev + 1) as any)))}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Další krok střídání ➔</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </FsChapterShell>
  );
}
