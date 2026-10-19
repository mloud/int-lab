'use client';

import React, { useState } from 'react';
import { HardDrive, Cpu, Layers, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Zap, Info } from 'lucide-react';
import { PageTableEntry, PhysicalFrame } from './VirtualMemoryTypes';

export default function VirtualMemorySimulatorTab() {
  // Výchozí stav tabulky stránek pro Word (4 virtuální stránky)
  const initialPages: PageTableEntry[] = [
    { pageId: 0, processName: 'Word', data: 'Kód programu (instrukce)', location: 'RAM', frameId: 0, lastAccessed: 1 },
    { pageId: 1, processName: 'Word', data: 'Rozepsaný dokument (text)', location: 'RAM', frameId: 1, lastAccessed: 2 },
    { pageId: 2, processName: 'Word', data: 'Vložený obrázek (foto)', location: 'DISK', frameId: -1, lastAccessed: 0 },
    { pageId: 3, processName: 'Word', data: 'Kontrola pravopisu (slovník)', location: 'DISK', frameId: -1, lastAccessed: 0 },
  ];

  const [pages, setPages] = useState<PageTableEntry[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [lastActionStatus, setLastActionStatus] = useState<{
    type: 'HIT' | 'FAULT' | null;
    message: string;
    details: string;
  }>({
    type: null,
    message: 'Klikněte na libovolnou virtuální stránku níže a sledujte reakci jednotky MMU a paměti.',
    details: ''
  });

  const [stats, setStats] = useState({ hits: 0, faults: 0 });

  // Simulace přístupu ke stránce
  const handleAccessPage = (pageId: number) => {
    setSelectedPage(pageId);
    const target = pages.find((p) => p.pageId === pageId);
    if (!target) return;

    if (target.location === 'RAM') {
      // PAGE HIT!
      setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
      setLastActionStatus({
        type: 'HIT',
        message: `⚡ Bleskový zásah v RAM (Page Hit) na virtuální stránce #${pageId}`,
        details: `Data "${target.data}" jsou již v RAM v Rámci #${target.frameId}. Čtení proběhlo za zlomek nanosekundy bez účasti disku.`
      });
      // Aktualizace času přístupu
      setPages((prev) =>
        prev.map((p) => (p.pageId === pageId ? { ...p, lastAccessed: Date.now() } : p))
      );
    } else {
      // PAGE FAULT! (Nutná výměna s diskem)
      setStats((prev) => ({ ...prev, faults: prev.faults + 1 }));

      // Najdeme stránku v RAM, která má nejstarší přístup (FIFO / LRU algoritmus)
      const pagesInRam = pages.filter((p) => p.location === 'RAM');
      const victim = pagesInRam.reduce((oldest, current) =>
        current.lastAccessed < oldest.lastAccessed ? current : oldest
      );

      const targetFrame = victim.frameId;

      setLastActionStatus({
        type: 'FAULT',
        message: `⚠️ VÝPADEK STRÁNKY (Page Fault) na virtuální stránce #${pageId}!`,
        details: `Data "${target.data}" nebyla v RAM, ale v pagefile.sys na disku! Jádro OS odložilo stránku #${victim.pageId} (${victim.data}) na disk a do uvolněného Rámce #${targetFrame} nahrálo stránku #${pageId}. Přístup byl 100 000× pomalejší!`
      });

      // Aktualizace tabulky stránek (výměna obou stránek)
      setPages((prev) =>
        prev.map((p) => {
          if (p.pageId === victim.pageId) {
            return { ...p, location: 'DISK', frameId: -1 };
          }
          if (p.pageId === pageId) {
            return { ...p, location: 'RAM', frameId: targetFrame, lastAccessed: Date.now() };
          }
          return p;
        })
      );
    }
  };

  const handleReset = () => {
    setPages(initialPages);
    setSelectedPage(null);
    setStats({ hits: 0, faults: 0 });
    setLastActionStatus({
      type: null,
      message: 'Simulace byla resetována do výchozího stavu.',
      details: ''
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hlavní simulátor */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-sm space-y-6">
        
        {/* Horní hlavička */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-amber-600" />
              <span>Interaktivní simulátor: Stránkování a odkládání na disk</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fyzická paměť RAM má kapacitu pouze 2 rámce. Ostatní stránky musí ležet v souboru <code>pagefile.sys</code>.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs font-mono font-bold">
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                ⚡ Hity v RAM: {stats.hits}
              </span>
              <span className="text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-300">
                ⚠️ Page Faults: {stats.faults}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              title="Resetovat simulátor"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stavový box poslední akce */}
        <div className={`p-4 rounded-2xl border transition-all ${
          lastActionStatus.type === 'HIT' 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : lastActionStatus.type === 'FAULT'
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
            {lastActionStatus.type === 'HIT' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {lastActionStatus.type === 'FAULT' && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />}
            {lastActionStatus.type === null && <Info className="w-5 h-5 text-slate-400 shrink-0" />}
            <span>{lastActionStatus.message}</span>
          </div>
          {lastActionStatus.details && (
            <p className="text-xs mt-1.5 leading-relaxed opacity-90 pl-7">
              {lastActionStatus.details}
            </p>
          )}
        </div>

        {/* 3 Sloupce: Virtuální prostor -> Tabulka stránek -> Fyzické úložiště */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. SLOUPEC: Virtuální paměť procesu */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>1. Virtuální paměť</span>
              </span>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                Word (PID 101)
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Aplikace vidí 4 souvislé stránky paměti. Klikněte na stránku, kterou chcete použít:
            </p>

            <div className="space-y-2 pt-1">
              {pages.map((p) => (
                <button
                  key={p.pageId}
                  onClick={() => handleAccessPage(p.pageId)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedPage === p.pageId
                      ? 'border-indigo-600 bg-indigo-50 shadow-sm scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black font-mono text-slate-800 block">
                      Virtuální stránka #{p.pageId}
                    </span>
                    <span className="text-[11px] text-slate-600 block">{p.data}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase font-mono ${
                    p.location === 'RAM' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {p.location === 'RAM' ? 'V RAM' : 'Na disku'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. SLOUPEC: Tabulka stránek v MMU */}
          <div className="bg-white p-5 rounded-2xl border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>2. Tabulka stránek (MMU)</span>
              </span>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                Překlad adres
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Hardware procesoru mapuje virtuální stránky na fyzické umístění:
            </p>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-[11px] text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border-b">Stránka</th>
                    <th className="p-2 border-b">Umístění</th>
                    <th className="p-2 border-b">Fyzický rámec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {pages.map((p) => (
                    <tr 
                      key={p.pageId} 
                      className={selectedPage === p.pageId ? 'bg-indigo-50/80 font-bold' : ''}
                    >
                      <td className="p-2">#{p.pageId}</td>
                      <td className="p-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.location === 'RAM' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {p.location}
                        </span>
                      </td>
                      <td className="p-2 text-slate-700">
                        {p.location === 'RAM' ? `Rámec #${p.frameId}` : '💾 pagefile.sys'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. SLOUPEC: Fyzická úložiště (RAM vs. DISK) */}
          <div className="space-y-4">
            
            {/* Fyzická paměť RAM (2 rámce) */}
            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-xs space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center justify-between pb-1 border-b border-emerald-100">
                <span>Fyzická RAM (Omezená kapacita)</span>
                <span className="text-[10px] font-mono text-emerald-700">Max 2 rámce</span>
              </span>

              <div className="space-y-2">
                {[0, 1].map((fId) => {
                  const occupying = pages.find((p) => p.location === 'RAM' && p.frameId === fId);
                  return (
                    <div 
                      key={fId}
                      className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-300 font-mono text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-emerald-950 block">Rámec #{fId}</span>
                        <span className="text-[10px] text-emerald-800">
                          {occupying ? `Stránka #${occupying.pageId} (${occupying.data})` : 'Volno'}
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                        10 ns
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Odkládací soubor na disku */}
            <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center justify-between pb-1 border-b border-amber-100">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                  <span>SSD: pagefile.sys (Swap)</span>
                </span>
                <span className="text-[10px] font-mono text-amber-700">Pomalé úložiště</span>
              </span>

              <div className="space-y-1.5">
                {pages.filter((p) => p.location === 'DISK').map((dp) => (
                  <div 
                    key={dp.pageId}
                    className="p-2 rounded-xl bg-amber-50/70 border border-amber-200 font-mono text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-amber-950 block">Odložená stránka #{dp.pageId}</span>
                      <span className="text-[10px] text-amber-800">{dp.data}</span>
                    </div>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                      5 ms (100 000× pomalejší)
                    </span>
                  </div>
                ))}
                {pages.filter((p) => p.location === 'DISK').length === 0 && (
                  <span className="text-[11px] text-slate-400 italic block text-center py-2">
                    Všechna data se vešla do RAM. Disk je prázdný.
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Didaktické ponaučení */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600" />
          <span>Co si z tohoto simulátoru odnést do praxe:</span>
        </h4>
        <ul className="space-y-1.5 list-disc pl-5 leading-relaxed">
          <li>Aplikace Word má pocit, že má k dispozici 4 stránky paměti naráz, ačkoliv do skutečné RAM se vejdou <strong>pouze 2 rámce</strong>.</li>
          <li>Když kliknete na stránku, která je v <code>pagefile.sys</code>, nastane <strong>Page Fault</strong>: operační systém musí na disku vyměnit data.</li>
          <li>Pokud máte v počítači málo fyzické RAM a otevřete příliš mnoho náročných aplikací, počítač neustále „swapuje“ data mezi RAM a SSD, což způsobuje známé zamrzání a drhnutí systému.</li>
        </ul>
      </div>

    </div>
  );
}
