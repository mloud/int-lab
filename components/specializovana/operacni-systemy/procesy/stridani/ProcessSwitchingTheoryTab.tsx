'use client';

import React from 'react';
import { 
  RefreshCw, 
  Cpu, 
  Clock, 
  Layers, 
  AlertTriangle, 
  Zap, 
  Timer, 
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { TheoryCard, Callout, RevealQuestions } from '../../souborove-systemy/FsShared';
import { DefinitionCard } from '@/components/ui/DefinitionCard';

export default function ProcessSwitchingTheoryTab() {
  const selfCheckQuestions = [
    {
      q: 'Proč vnímáme běh desítek oken a hudby na pozadí jako plynulý, i když procesor vykonává vždy jen jeden proces?',
      a: 'Operační systém využívá tzv. časová kvanta (obvykle 10 až 20 milisekund). Během jedné vteřiny procesor stihne přepnout mezi procesy 50× až 100×. Lidské smysly nedokáží takto rychlé střídání zaznamenat a vnímají ho jako současný běh (podobně jako se sled jednotlivých snímků filmu slije do plynulého pohybu).'
    },
    {
      q: 'Co přesně tvoří tzv. „kontext procesu“, který musí jádro OS při přepnutí uložit?',
      a: 'Kontext procesu tvoří kompletní okamžitý stav procesoru: především hodnota registru PC (čítač instrukcí – adresa, kde proces právě skončil), hodnoty pracovních registrů (mezivýsledky výpočtů), stavové příznaky (např. zda byl výsledek nula) a ukazatel zásobníku (SP).'
    },
    {
      q: 'Kam operační systém uloží stav procesoru, než přepne na jiný program?',
      a: 'Stav se uloží do vyhrazené datové struktury v chráněném jádře OS, která se nazývá PCB (Process Control Block). Každý existující proces má v paměti jádra svůj vlastní záznam PCB.'
    },
    {
      q: 'Proč nemůže být časové kvantum nastaveno na extrémně malou hodnotu, například 0,0001 ms?',
      a: 'Samotné přepnutí kontextu (uložení registrů, změna tabulky paměti a nahrání nových registrů) trvá procesoru určitý čas (režie / overhead, cca mikrosekundy). Kdyby bylo kvantum příliš malé, procesor by 90 % času strávil pouhým ukládáním a načítáním registrů namísto užitečného počítání kódu programů.'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HLAVNÍ DEFINICE */}
      <DefinitionCard
        icon={RefreshCw}
        term="Multitasking"
        definition={<>je schopnost operačního systému <strong>spouštět a obsluhovat více procesů současně</strong> tím, že jim procesor bleskově střídá čas.</>}
        note={<>Procesor v každém okamžiku vykonává vždy jen jediný proces. Rychlým přidělováním <strong>časových kvant</strong> (10–30 ms) však vzniká dokonalá iluze souběžného běhu.</>}
      />

      {/* BLOK A: Iluze multitaskingu a časová kvanta */}
      <TheoryCard icon={RefreshCw} title="Iluze současného běhu: Časová kvanta" letter="A" tone="indigo">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Ve Správci úloh běžného počítače najdete <strong>150 až 300 běžících procesů</strong>. Procesor 
          však v daný zlomek sekundy počítá vždy jen jeden jediný program. Jak je možné, že můžete poslouchat hudbu, stahovat 
          soubor a zároveň psát text bez jakéhokoliv sekání?
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase">
                Metoda dělení času (Time-Sharing)
              </h4>
              <p className="text-xs text-slate-500">
                Procesor v daný okamžik vykonává instrukce pouze jednoho jediného procesu.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Operační systém přiděluje každému připravenému procesu malý časový úsek zvaný <strong>časové kvantum</strong> 
            (obvykle <strong>10 až 30 milisekund</strong>). Během jediné vteřiny procesor stihne vystřídat desítky různých programů.
          </p>

        </div>

        {/* Schéma střídání úloh v čase (100% responzivní bez horizontálního skrolování) */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs sm:text-sm font-black uppercase text-slate-700 tracking-wider">
              Střídání úloh na procesoru v čase
            </h4>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Střídání v čase
            </span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 select-none">
            {/* SVG diagram: 100% přesná geometrie osy a bloků bez jakéhokoliv přetékání */}
            <div className="w-full">
              <svg 
                viewBox="0 0 760 170" 
                className="w-full h-auto overflow-visible font-sans"
              >
                <defs>
                  <marker
                    id="axis-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a" />
                  </marker>
                </defs>

                {/* Popisky úloh vlevo */}
                <text x="75" y="32" textAnchor="end" className="text-[13px] font-bold fill-slate-800">Úloha A</text>
                <text x="75" y="77" textAnchor="end" className="text-[13px] font-bold fill-slate-800">Úloha B</text>
                <text x="75" y="122" textAnchor="end" className="text-[13px] font-bold fill-slate-800">Úloha C</text>

                {/* Svislá osa (přesně na x = 90) */}
                <line x1="90" y1="10" x2="90" y2="142" stroke="#0f172a" strokeWidth="2.5" />

                {/* Vodorovná osa X (začíná přesně v bodě x = 90 a y = 142) */}
                <line 
                  x1="90" 
                  y1="142" 
                  x2="745" 
                  y2="142" 
                  stroke="#0f172a" 
                  strokeWidth="2.5" 
                  markerEnd="url(#axis-arrow)" 
                />

                {/* Popisek t = 0 a Osa X */}
                <text x="90" y="162" textAnchor="start" className="text-[12px] font-mono font-bold fill-slate-900">t = 0</text>
                <text x="450" y="162" textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                  Osa X: čas na procesoru (CPU)
                </text>

                {/* ŘÁDEK 1: Úloha A (Word) - začíná PŘESNĚ na x = 90, nepřesahuje doleva! */}
                <g>
                  {/* Blok 1 */}
                  <rect x="91" y="14" width="75" height="28" fill="#141c6d" rx="1" />
                  <text x="128.5" y="32" textAnchor="middle" className="text-[11px] font-bold fill-white">Word</text>

                  {/* Blok 2 */}
                  <rect x="295" y="14" width="75" height="28" fill="#141c6d" rx="1" />
                  <text x="332.5" y="32" textAnchor="middle" className="text-[11px] font-bold fill-white">Word</text>

                  {/* Blok 3 - delší běh jako v předloze */}
                  <rect x="500" y="14" width="130" height="28" fill="#141c6d" rx="1" />
                  <text x="565" y="32" textAnchor="middle" className="text-[11px] font-bold fill-white">Word</text>
                </g>

                {/* ŘÁDEK 2: Úloha B (Spotify) */}
                <g>
                  {/* Blok 1 */}
                  <rect x="166" y="59" width="75" height="28" fill="#141c6d" rx="1" />
                  <text x="203.5" y="77" textAnchor="middle" className="text-[11px] font-bold fill-white">Spotify</text>

                  {/* Blok 2 */}
                  <rect x="370" y="59" width="75" height="28" fill="#141c6d" rx="1" />
                  <text x="407.5" y="77" textAnchor="middle" className="text-[11px] font-bold fill-white">Spotify</text>
                </g>

                {/* ŘÁDEK 3: Úloha C (Prohlížeč) - text se 100% vejde do obdélníku */}
                <g>
                  {/* Blok 1 */}
                  <rect x="241" y="104" width="75" height="28" fill="#141c6d" rx="1" />
                  <text x="278.5" y="122" textAnchor="middle" className="text-[10px] font-bold fill-white">Chrome</text>

                  {/* Blok 2 */}
                  <rect x="445" y="104" width="55" height="28" fill="#141c6d" rx="1" />
                  <text x="472.5" y="122" textAnchor="middle" className="text-[10px] font-bold fill-white">Chrome</text>

                  {/* Blok 3 na konci */}
                  <rect x="630" y="104" width="80" height="28" fill="#141c6d" rx="1" />
                  <text x="670" y="122" textAnchor="middle" className="text-[10px] font-bold fill-white">Chrome</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-3.5 p-3.5 bg-slate-50 text-xs text-slate-600 rounded-xl border border-slate-200 leading-relaxed flex items-start gap-2.5">
            <span className="text-base shrink-0">💡</span>
            <div>
              <strong>Co z diagramu vidíme?</strong>
              <p className="mt-0.5">
                V každém okamžiku (ve svislém řezu) počítá na procesoru <strong>vždy jen jeden jediný modrý obdélník</strong>. 
                Pokud má úloha delší obdélník, vyčerpala celé své přidělené časové kvantum; kratší obdélník znamená, že se úloha vzdala procesoru dříve (např. čeká na načtení dat z disku či stisk klávesy).
              </p>
            </div>
          </div>
        </div>
      </TheoryCard>

            {/* BLOK B: Kooperativní vs. Preemptivní multitasking */}
      <TheoryCard icon={Layers} title="Dva světy: Kooperativní vs. Preemptivní multitasking" letter="B" tone="sky">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          V historii operačních systémů existovaly dva zásadně odlišné přístupy k tomu, kdo vlastně rozhoduje o tom, kdy procesor přepne na jiný program.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Kooperativní */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border-2 border-rose-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  Minulost (Windows 3.1, 95, 98, Mac OS)
                </span>
              </div>
              <h4 className="text-base font-black text-rose-950 mb-2">
                1. Kooperativní (nepreemptivní) multitasking
              </h4>
              <p className="text-xs text-rose-900 leading-relaxed space-y-2">
                Systém spoléhá na <strong>dobrovolnou spolupráci</strong> aplikací. Každý program musí po chvilce sám dobrovolně vrátit řízení operačnímu systému, aby mohl běžet další program.
              </p>
              <div className="mt-3 p-3 bg-white rounded-xl border border-rose-300 text-xs text-rose-950 font-medium">
                ⚠️ <strong>Zásadní slabina:</strong> Stačilo, aby jeden jediný program udělal chybu, zacyklil se nebo zamrzl – a <strong>okamžitě zatuhl celý počítač</strong>! Uživatel musel stisknout tlačítko Reset.
              </div>
            </div>
          </div>

          {/* Preemptivní */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Dnešek (Windows 11, Linux, macOS)
                </span>
              </div>
              <h4 className="text-base font-black text-emerald-950 mb-2">
                2. Preemptivní multitasking (Preempce = nucené odebrání)
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed space-y-2">
                <strong>Jediným a neomezeným pánem je operační systém.</strong> Pomocí hardwarového časovače procesoru (timer) systém běžící program po uplynutí kvanta <strong>násilně přeruší a odebere mu CPU</strong>.
              </p>
              <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-950 font-medium">
                🛡️ <strong>Konec pádů systému:</strong> I když program totálně zamrzne nebo se zacyklí, systém mu procesor bleskově sebere a přidělí ho myši, klávesnici a Task Manageru, kterým můžete zamrzlý program bezpečně ukončit.
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* BLOK C: Přepnutí kontextu (Context Switch) */}
      <TheoryCard icon={Cpu} title="Přepnutí kontextu (Context Switch) krok za krokem" letter="C" tone="emerald">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Když časové kvantum vyprší, procesor nemůže na druhý program jen tak přeskočit. Pokud by to udělal, 
          ztratil by všechny rozpracované mezivýsledky prvního programu! Tento proces záchrany a obnovy se nazývá 
          <strong>přepnutí kontextu (Context Switch)</strong>.
        </p>

        {/* Schéma přepnutí kontextu – identický styl časové osy jako v bodu A */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs sm:text-sm font-black uppercase text-slate-700 tracking-wider">
              Co se děje na časové ose mezi dvěma procesy
            </h4>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Přepnutí kontextu
            </span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 select-none">
            <div className="w-full">
              <svg 
                viewBox="0 0 760 175" 
                className="w-full h-auto overflow-visible font-sans"
              >
                <defs>
                  <marker
                    id="cs-axis-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a" />
                  </marker>
                </defs>

                {/* Popisky úloh vlevo */}
                <text x="75" y="38" textAnchor="end" className="text-[13px] font-bold fill-slate-800">Úloha A</text>
                <text x="75" y="103" textAnchor="end" className="text-[13px] font-bold fill-slate-800">Úloha B</text>

                {/* Svislá osa (přesně na x = 90) */}
                <line x1="90" y1="10" x2="90" y2="142" stroke="#0f172a" strokeWidth="2.5" />

                {/* Vodorovná osa X */}
                <line 
                  x1="90" 
                  y1="142" 
                  x2="745" 
                  y2="142" 
                  stroke="#0f172a" 
                  strokeWidth="2.5" 
                  markerEnd="url(#cs-axis-arrow)" 
                />

                {/* Popisek t = 0 a Osa X */}
                <text x="90" y="162" textAnchor="start" className="text-[12px] font-mono font-bold fill-slate-900">t = 0</text>
                <text x="450" y="162" textAnchor="middle" className="text-[12px] font-bold fill-slate-900">
                  Osa X: čas na procesoru (CPU)
                </text>

                {/* 1. ÚLOHA A: Word běží */}
                <g>
                  <rect x="91" y="18" width="130" height="32" fill="#141c6d" rx="2" />
                  <text x="156" y="38" textAnchor="middle" className="text-[11px] font-bold fill-white">Word (běží)</text>
                </g>

                {/* 2. PŘEPNUTÍ KONTEXTU: Z Wordu na Spotify */}
                <g>
                  {/* Vodicí čáry časového úseku přepnutí */}
                  <line x1="221" y1="18" x2="221" y2="142" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="335" y1="18" x2="335" y2="142" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Rámeček přepnutí kontextu spojující oba řádky */}
                  <rect x="223" y="38" width="110" height="52" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="278" y="53" textAnchor="middle" className="text-[9px] font-black fill-amber-900 uppercase">
                    ⚙️ Kontext Switch
                  </text>
                  <text x="278" y="67" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-800">
                    1. Uložit do PCB 1
                  </text>
                  <text x="278" y="80" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-800">
                    2. Načíst z PCB 2
                  </text>
                </g>

                {/* 3. ÚLOHA B: Spotify běží */}
                <g>
                  <rect x="337" y="83" width="130" height="32" fill="#141c6d" rx="2" />
                  <text x="402" y="103" textAnchor="middle" className="text-[11px] font-bold fill-white">Spotify (běží)</text>
                </g>

                {/* 4. PŘEPNUTÍ KONTEXTU: Ze Spotify zpět na Word */}
                <g>
                  <line x1="467" y1="18" x2="467" y2="142" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="581" y1="18" x2="581" y2="142" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

                  <rect x="469" y="38" width="110" height="52" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="524" y="53" textAnchor="middle" className="text-[9px] font-black fill-amber-900 uppercase">
                    ⚙️ Kontext Switch
                  </text>
                  <text x="524" y="67" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-800">
                    1. Uložit do PCB 2
                  </text>
                  <text x="524" y="80" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-800">
                    2. Načíst z PCB 1
                  </text>
                </g>

                {/* 5. ÚLOHA A: Word pokračuje */}
                <g>
                  <rect x="583" y="18" width="130" height="32" fill="#141c6d" rx="2" />
                  <text x="648" y="38" textAnchor="middle" className="text-[11px] font-bold fill-white">Word (pokračuje)</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-3.5 p-3.5 bg-slate-50 text-xs text-slate-600 rounded-xl border border-slate-200 leading-relaxed flex items-start gap-2.5">
            <span className="text-base shrink-0">💡</span>
            <div>
              <strong>Co žluté bloky na časové ose znamenají?</strong>
              <p className="mt-0.5">
                Při přechodu z Wordu na Spotify procesor na zlomek milisekundy <strong>přeruší počítání aplikací</strong>. 
                Jádro OS v tu chvíli bleskově uloží rozdělanou práci Wordu do <strong>PCB 1</strong> a z <strong>PCB 2</strong> načte 
                stav Spotify. Teprve pak může Spotify začít hrát.
              </p>
            </div>
          </div>
        </div>

        {/* Sloučená karta procesu PCB a registr PC – krátké odrážky */}
        <div className="p-4 sm:p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h4 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
              Co je PCB (Process Control Block)?
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            Digitální „karta procesu“, kterou si systém vede pro každý běžící program. Obsahuje:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span><strong>Číslo PID:</strong> identifikátor procesu.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span><strong>Přidělená paměť RAM:</strong> vymezený prostor programu.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span><strong>Záloha registrů CPU:</strong> rozpracovaný stav výpočtu při přerušení.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span><strong>Registr PC (čítač instrukcí):</strong> paměťová adresa v RAM, kde má procesor navázat.</span>
            </li>
          </ul>
        </div>
      </TheoryCard>

      {/* BLOK D: Režie přepínání (Overhead) */}
      <TheoryCard icon={Sliders} title="Režie přepínání: Proč nemůže být kvantum nekonečně malé?" letter="D" tone="amber">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Mohlo by nás napadnout: Proč nenastavit časové kvantum na mikrosekundy, aby byl systém ještě plynulejší?
          Důvodem je tzv. <strong>režie přepnutí (Overhead)</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-black uppercase text-rose-700 block">Kvantum je příliš krátké (např. 0,1 ms)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Přepnutí kontextu trvá procesoru pár mikrosekund. Pokud přepíná příliš často, procesor stráví 
                <strong>více času ukládáním a načítáním registrů než samotným výpočtem</strong>. Počítač ztratí výkon.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-black uppercase text-amber-700 block">Kvantum je příliš dlouhé (např. 500 ms)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procesor sice počítá efektivně bez zdržování, ale uživatel začne vnímat zpoždění. 
                Pohyb myši začne drhnout a psaní na klávesnici má viditelné prodlevy.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
          ✅ <strong>Zlatý střed moderních OS:</strong> Windows a Linux používají dynamická kvanta obvykle mezi 
          <strong>10 až 30 milisekundami</strong>. Procesor tak stihne udělat obrovské množství práce a režie přepínání 
          tvoří méně než 1 % celkového výkonu CPU.
        </div>
      </TheoryCard>

      {/* Interaktivní ověření znalostí */}
      <RevealQuestions questions={selfCheckQuestions} />

    </div>
  );
}
