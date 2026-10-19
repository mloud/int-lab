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

export default function ProcessSwitchingTheoryTab() {
  const selfCheckQuestions = [
    {
      q: 'Proč vnímáme běh desítek oken a hudby na pozadí jako plynulý, i když máme pouze 1 nebo 2 procesorová jádra?',
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
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* BLOK A: Iluze multitaskingu a časová kvanta */}
      <TheoryCard icon={RefreshCw} title="Iluze současného běhu: Časová kvanta" letter="A" tone="indigo">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Ve Správci úloh běžného počítače najdete <strong>150 až 300 běžících procesů</strong>. Procesor 
          však má typicky jen 4, 8 nebo 16 fyzických jader. Jak je možné, že můžete poslouchat hudbu, stahovat 
          soubor a zároveň psát text bez jakéhokoliv sekání?
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase">
                Metoda dělení času (Time-Sharing / Preemptivní multitasking)
              </h4>
              <p className="text-xs text-slate-500">
                Jedno jádro procesoru v daný okamžik vykonává instrukce pouze jednoho jediného procesu.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Operační systém přiděluje každému připravenému procesu malý časový úsek zvaný <strong>časové kvantum</strong> 
            (obvykle <strong>10 až 30 milisekund</strong>). Během jediné vteřiny procesor stihne vystřídat desítky různých programů.
          </p>

          {/* Přirovnání: Filmový pás */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-3">
            <span className="text-2xl">🎬</span>
            <div className="text-xs text-indigo-950 space-y-1">
              <strong className="block font-bold">Přirovnání k filmovému plátnu (60 FPS):</strong>
              <p className="leading-relaxed">
                Film v kině také není plynulý pohyb, ale 24 nebo 60 statických fotografií promítnutých za vteřinu. 
                Lidské oko a mozek nedokáží rychlé střídání rozlišit. Stejně tak bleskové střídání procesů 
                vytváří dokonalou iluzi, že všechny aplikace běží <strong>současně</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Schéma časové osy */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">
            Časová osa: Jak CPU střídá procesy v čase (1 jádro procesoru)
          </h4>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full p-3 rounded-xl bg-blue-100 border-2 border-blue-300 text-center">
              <span className="text-xs font-black text-blue-900 block">Proces 1: Word</span>
              <span className="text-[10px] font-mono text-blue-700">15 ms (Kvantum vypršelo)</span>
            </div>
            <div className="px-2 py-1 bg-amber-100 rounded text-[10px] font-bold text-amber-800 border border-amber-300">
              ⚡ OS přepnutí
            </div>
            <div className="flex-1 w-full p-3 rounded-xl bg-emerald-100 border-2 border-emerald-300 text-center">
              <span className="text-xs font-black text-emerald-900 block">Proces 2: Hudba (Spotify)</span>
              <span className="text-[10px] font-mono text-emerald-700">15 ms (Kvantum vypršelo)</span>
            </div>
            <div className="px-2 py-1 bg-amber-100 rounded text-[10px] font-bold text-amber-800 border border-amber-300">
              ⚡ OS přepnutí
            </div>
            <div className="flex-1 w-full p-3 rounded-xl bg-purple-100 border-2 border-purple-300 text-center">
              <span className="text-xs font-black text-purple-900 block">Proces 3: Prohlížeč</span>
              <span className="text-[10px] font-mono text-purple-700">15 ms (Kvantum vypršelo)</span>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* BLOK B: Přepnutí kontextu (Context Switch) */}
      <TheoryCard icon={Cpu} title="Přepnutí kontextu (Context Switch) krok za krokem" letter="B" tone="emerald">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Když časové kvantum vyprší, procesor nemůže na druhý program jen tak přeskočit. Pokud by to udělal, 
          ztratil by všechny rozpracované mezivýsledky prvního programu! Tento proces záchrany a obnovy se nazývá 
          <strong>přepnutí kontextu (Context Switch)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Přerušení běhu</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hardwarový časovač procesoru odešle signál (přerušení). Řízení okamžitě přebírá jádro operačního systému (Kernel).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Uložení stavu do PCB</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Všechny hodnoty z registrů CPU (hlavně <strong>registr PC</strong> – adresa poslední instrukce) se uloží do tabulky <strong>PCB 1</strong> v jádře.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Načtení nového stavu</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Z tabulky <strong>PCB 2</strong> druhého procesu se do CPU nahrají jeho dříve uložené registry a procesor pokračuje tam, kde minule skončil.
            </p>
          </div>
        </div>

        <Callout kind="info" title="Co je to registr PC (Program Counter)?">
          Registr <strong>PC (Čítač instrukcí)</strong> je nejdůležitější ukazatel v procesoru. Obsahuje paměťovou adresu 
          té instrukce v RAM, kterou má procesor v příštím taktu vykonat. Při přepnutí z Wordu na Kalkulačku 
          se do registru PC jednoduše zapíše adresa instrukcí Kalkulačky!
        </Callout>
      </TheoryCard>

      {/* BLOK C: Režie přepínání (Overhead) */}
      <TheoryCard icon={Sliders} title="Režie přepínání: Proč nemůže být kvantum nekonečně malé?" letter="C" tone="amber">
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
