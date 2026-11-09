'use client';

import React, { useState } from 'react';
import { Monitor, Layers, MousePointer2 } from 'lucide-react';

export const VirtualizationTheoryTab: React.FC = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const getLayerStyle = (layerName: string) => {
    const isHovered = hoveredLayer === layerName;
    const isDimmed = hoveredLayer !== null && hoveredLayer !== layerName;
    return `transition-all duration-300 ${isDimmed ? 'opacity-50 scale-95' : 'opacity-100'} ${isHovered ? 'scale-105 shadow-xl ring-4 ring-indigo-200 z-50' : 'shadow-md z-10'}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-500" /> Úvod do virtualizace
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed mb-4">
          Z minulých lekcí víme, že operační systém má plnou kontrolu nad hardwarem. Často je však žádoucí spustit více izolovaných operačních systémů (například Windows a Linux) na jednom fyzickém počítači současně. K tomu slouží technologie zvaná <strong>virtualizace</strong>.
        </p>
        
        <div className="bg-indigo-50 text-indigo-900 p-6 rounded-2xl font-bold italic border-l-4 border-indigo-400 mb-6 flex gap-4 items-start">
          <Monitor className="w-8 h-8 text-indigo-500 flex-shrink-0" />
          <p>
            Základním principem virtualizace je abstrakce hardwarových prostředků. Speciální vrstva softwaru (Hypervizor) předkládá hostovanému systému standardizovaný virtuální hardware.
          </p>
        </div>

        <p className="text-slate-600 font-medium leading-relaxed mb-6">
          Hostovaný operační systém nemá přímý přístup k fyzickému hardwaru. Využívá virtuální procesor, virtuální operační paměť a místo fyzického pevného disku zapisuje data do předpřipraveného souboru (např. VDI nebo VMDK) uloženého na hostitelském disku.
        </p>

        <div className="my-10 p-8 bg-slate-50 rounded-3xl relative overflow-hidden shadow-inner border-2 border-slate-200">
          <h3 className="text-center text-slate-500 font-bold tracking-widest uppercase mb-8 text-sm relative z-10">Architektura virtuálního prostředí (Typ 2)</h3>
          
          <div className="flex flex-col items-center gap-3 relative z-10 font-medium">
            <div 
              className={`flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center relative ${getLayerStyle('vms')}`}
              onMouseEnter={() => setHoveredLayer('vms')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <div className="w-full max-w-xs bg-emerald-50 border-2 border-emerald-400 p-4 rounded-xl text-center shadow-sm">
                <div className="text-4xl mb-2 drop-shadow-sm">🐧</div>
                <h4 className="font-black text-emerald-700">Linux Mint</h4>
                <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest mt-1">Hostovaný OS</p>
              </div>
            </div>

            <div 
              className={`w-full max-w-2xl bg-indigo-600 border-2 border-indigo-400 p-5 rounded-xl text-center relative ${getLayerStyle('hypervisor')}`}
              onMouseEnter={() => setHoveredLayer('hypervisor')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <h4 className="font-black text-white text-xl tracking-wider">HYPERVIZOR</h4>
              <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mt-1">Nástroj pro virtualizace (VirtualBox)</p>
            </div>

            <div 
              className={`w-full max-w-2xl bg-blue-100 border-2 border-blue-400 p-4 rounded-xl text-center relative ${getLayerStyle('hostos')}`}
              onMouseEnter={() => setHoveredLayer('hostos')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <h4 className="font-bold text-blue-900">Hostitelský OS (Windows)</h4>
            </div>

            <div 
              className={`w-full max-w-2xl bg-slate-200 border-2 border-slate-300 p-4 rounded-xl text-center flex flex-wrap justify-center gap-4 sm:gap-8 relative ${getLayerStyle('hardware')}`}
              onMouseEnter={() => setHoveredLayer('hardware')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">CPU: Intel Core i7</span>
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">RAM: 16 GB</span>
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">DISK: 1 TB SSD</span>
            </div>
          </div>
          
          <div className="mt-8 h-32 bg-white rounded-2xl border-2 border-indigo-100 p-6 flex items-center justify-center text-center transition-all duration-300 shadow-sm">
            {!hoveredLayer && (
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 text-indigo-400" /> Najeďte myší na jednotlivé vrstvy pro zobrazení detailů
              </p>
            )}
            {hoveredLayer === 'vms' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-emerald-700 mb-2">Hostované systémy (Guests)</h4>
                <p className="text-slate-600 text-sm">Zcela izolovaná virtuální prostředí. Myslí si, že běží na skutečném hardwaru, ale ve skutečnosti komunikují s hypervizorem.</p>
              </div>
            )}
            {hoveredLayer === 'hypervisor' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-indigo-700 mb-2">Hypervizor</h4>
                <p className="text-slate-600 text-sm">Klíčová mezivrstva. Překládá požadavky hostovaných systémů a přiděluje jim potřebný výkon (procesor, paměť) z hostitelského počítače.</p>
              </div>
            )}
            {hoveredLayer === 'hostos' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-blue-800 mb-2">Hostitelský OS (Host)</h4>
                <p className="text-slate-600 text-sm">Váš hlavní operační systém (např. Windows na školním PC). Řídí fyzický hardware a hypervizor v něm běží jako běžná aplikace.</p>
              </div>
            )}
            {hoveredLayer === 'hardware' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 mb-2">Fyzický Hardware</h4>
                <p className="text-slate-600 text-sm">Skutečné součástky vašeho počítače. Jejich výkon je sdílen mezi hlavní operační systém a všechny spuštěné virtuální stroje.</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-2 border-b pb-2">Hostitelský OS (Host)</h3>
            <p className="text-sm text-slate-600">Primární operační systém, který je přímo nainstalován na hardwaru počítače (například instalace Windows na školním PC).</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 flex flex-col">
            <h3 className="font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-2">Hypervizor</h3>
            <p className="text-sm text-indigo-700">Nástroj zajišťující virtualizaci (např. VirtualBox nebo VMware). Přerozděluje výkon fyzického procesoru a paměti virtuálním strojům.</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col">
            <h3 className="font-bold text-emerald-800 mb-2 border-b border-emerald-200 pb-2">Hostovaný OS (Guest)</h3>
            <p className="text-sm text-emerald-700">Operační systém běžící ve virtuálním prostředí. K hardwaru nepřistupuje přímo, ale prostřednictvím hypervizoru.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

