'use client';

import React from 'react';
import { 
  HardDrive, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Database, 
  ArrowRight,
  FileCode,
  Zap
} from 'lucide-react';
import { TheoryCard, Callout, RevealQuestions } from '../../souborove-systemy/FsShared';

export default function VirtualMemoryTheoryTab() {
  const selfCheckQuestions = [
    {
      q: 'Proč moderní operační systémy nedovolují programům pracovat přímo se skutečnými fyzickými adresami RAM?',
      a: 'Z bezpečnostních a stabilizačních důvodů: 1. Izolace – zabrání tomu, aby škodlivý nebo chybující program mohl číst či přepsat paměť jiného programu nebo samotného jádra OS. 2. Zjednodušení – programátor nemusí zjišťovat, kde je v paměti volno, program se vždy kompiluje tak, jako by měl k dispozici čistou souvislou paměť od adresy 0.'
    },
    {
      q: 'Co je to jednotka MMU a jakou roli hraje při každém čtení z paměti?',
      a: 'MMU (Memory Management Unit) je hardwarová součást procesoru. Při každé instrukci, která čte nebo zapisuje do paměti, MMU bleskově přeloží virtuální adresu procesu na skutečnou fyzickou adresu v čipech RAM pomocí Tabulky stránek (Page Table).'
    },
    {
      q: 'Co je to stránkování (Paging) a jak velká je typická stránka paměti?',
      a: 'Stránkování je rozdělení paměti na bloky pevné velikosti. Virtuální paměť se dělí na tzv. stránky (Pages) a fyzická RAM na stejně velké rámce (Frames). Ve většině architektur (x86/x64) má základní stránka velikost přesně 4 kB (4 096 bajtů).'
    },
    {
      q: 'Co znamená pojem Page Fault (výpadek stránky) a proč počítač při nedostatku RAM znatelně zpomalí?',
      a: 'Page Fault nastane, když se proces pokusí přistoupit ke stránce, která byla kvůli nedostatku místa v RAM dočasně odložena na disk do souboru pagefile.sys. Hardware procesoru operaci pozastaví, operační systém musí data načíst z disku zpět do RAM a až poté proces pokračuje. Protože disky (i rychlá SSD) jsou mnohonásobně pomalejší než paměť RAM, časté výpadky stránek (tzv. thrashing) způsobí dramatické zpomalení systému.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* BLOK A: Problém fyzické paměti a potřeba iluze */}
      <TheoryCard icon={ShieldCheck} title="Proč proces nesmí sahat přímo do fyzické RAM?" letter="A" tone="amber">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          V počátcích osobních počítačů (např. v systému MS-DOS) programy pracovaly přímo se skutečnými adresami 
          čipů paměti RAM. To však v moderním víceúlohovém systému přinášelo <strong>dva kritické problémy</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>1. Žádná ochrana a pády systému</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              Když měl program chybu (např. nekonečný zápis), mohl bez varování přepsat data cizího programu 
              nebo dokonce samotného operačního systému. Následoval okamžitý pád celého počítače (Modrá smrt).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase mb-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>2. Roztříštěnost paměti (Fragmentace)</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Při neustálém spouštění a zavírání programů vznikala v RAM mozaika malých volných děr. 
              Nový program se do paměti nevešel, ačkoliv celkový součet volného místa byl dostatečný.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 leading-relaxed">
          💡 <strong>Geniální řešení: Virtuální paměť.</strong> Moderní operační systém vytvoří pro každý program 
          dokonalou iluzi: <em>„Máš celý počítač a celou paměť od adresy 0 jen pro sebe.“</em> Program vůbec netuší, 
          ve kterém fyzickém čipu RAM jeho data skutečně leží!
        </div>
      </TheoryCard>

      {/* BLOK B: Jednotka MMU a překlad adres */}
      <TheoryCard icon={Cpu} title="Jednotka MMU: Překlad virtuální adresy na fyzickou" letter="B" tone="indigo">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Když procesor vykonává instrukci např. <code>LOAD adresa 100</code>, adresa 100 je <strong>virtuální</strong>. 
          Přímo v procesoru se nachází specializovaný čip zvaný <strong>MMU (Memory Management Unit)</strong>, 
          který provádí bleskový překlad.
        </p>

        {/* Schéma překladu */}
        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6 space-y-4">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Princip překladu pomocí Tabulky stránek (Page Table)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="p-4 rounded-xl bg-blue-100 border-2 border-blue-300 text-center">
              <span className="text-[10px] font-black uppercase text-blue-800 block">1. Aplikace (Word)</span>
              <span className="text-xs font-mono font-bold text-blue-900">Virtuální adresa: Stránka #2</span>
              <p className="text-[10px] text-blue-700 mt-1">Aplikace si myslí, že je na adrese 8192</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-600 text-white text-center shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200 block">2. Hardware CPU (MMU)</span>
              <span className="text-xs font-bold block mt-0.5">Pohled do Tabulky stránek:</span>
              <span className="text-[11px] font-mono bg-indigo-700 px-2 py-0.5 rounded mt-1 inline-block">
                Stránka #2 ➔ Rámec #7 v RAM
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-100 border-2 border-emerald-300 text-center">
              <span className="text-[10px] font-black uppercase text-emerald-800 block">3. Fyzické čipy RAM</span>
              <span className="text-xs font-mono font-bold text-emerald-900">Fyzická adresa: Rámec #7</span>
              <p className="text-[10px] text-emerald-700 mt-1">Zde data skutečně leží na desce</p>
            </div>
          </div>
        </div>

        <Callout kind="info" title="Ochrana na hardwarové úrovni">
          Pokud se proces pokusí sáhnout na adresu, kterou nemá v tabulce stránek přiřazenou, MMU okamžitě vyvolá 
          hardwarovou výjimku. Systém Windows aplikaci okamžitě ukončí s hlášením <em>Access Violation</em> 
          (nebo v Linuxu <em>Segmentation Fault</em>). Ostatní programy běží nerušeně dál!
        </Callout>
      </TheoryCard>

      {/* BLOK C: Stránkování a odkládací soubor na disku */}
      <TheoryCard icon={HardDrive} title="Stránkování (Paging) a odkládací soubor na disku" letter="C" tone="emerald">
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Virtuální paměť má ještě jednu obrovskou výhodu: <strong>není omezena velikostí fyzické RAM</strong>. 
          Když v paměti dojde místo, operační systém si vypomůže pevným diskem (SSD).
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>Odkládací soubor ve Windows</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ve Windows se tento skrytý systémový soubor v kořeni disku C: jmenuje <code>pagefile.sys</code> 
                (v Linuxu se používá samostatný oddíl <em>Swap</em>). Sem OS odkládá paměťové stránky aplikací, 
                které zrovna nepoužíváte.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Výpadek stránky (Page Fault)</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Když kliknete na minimalizované okno, jehož data jsou v <code>pagefile.sys</code>, MMU zjistí, 
                že stránka není v RAM. Nastane <strong>Page Fault</strong>: OS pozastaví proces, přečte data z disku 
                zpět do RAM a až pak okno zareaguje.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
          ⚠️ <strong>Proč se počítač při nedostatku RAM seká?</strong> Když je RAM přeplněná, systém musí neustále 
          něco ukládat na disk a z disku načítat (tzv. <em>Thrashing</em>). Protože i nejrychlejší NVMe SSD je 
          stále zhruba 10× až 50× pomalejší než RAM, celý počítač začne drhnout.
        </div>
      </TheoryCard>

      {/* Interaktivní kvízové otázky */}
      <RevealQuestions questions={selfCheckQuestions} />

    </div>
  );
}
