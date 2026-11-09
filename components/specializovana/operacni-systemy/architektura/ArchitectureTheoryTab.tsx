"use client";

import React, { useState } from 'react';
import { Cpu, ShieldCheck, HardDrive, Monitor, AlertTriangle, Layers, CheckCircle2, Server, Wifi, Gamepad2, LayoutDashboard, ArrowDown, ArrowUp, ArrowRight, Shield, Smartphone } from 'lucide-react';

export const ArchitectureTheoryTab = ({ onGoToPractice }: { onGoToPractice: () => void }) => {
  const [showHybrid, setShowHybrid] = useState(false);

  return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* 1. Hlavní nadpis a definice (Varianta B) */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Architektura OS</h1>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                <strong>Architektura operačního systému</strong> je jeho stavební plán. Stejně jako architektura budovy určuje, kde jsou nosné zdi a kudy vedou chodby, architektura OS rozhoduje o tom, jak je systém rozdělen na chráněné velitelství (jádro) a bezpečný prostor pro programy (aplikace), aby chyba v jedné části neohrozila celý počítač.
              </p>
            </div>

            {/* 2. Spojovací schéma z minulé lekce (Kontextový můstek) */}
            <div className="mb-12 bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-2xl mx-auto shadow-xs">
              <div className="text-center mb-6">
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-200">
                  Základní model z minulé lekce
                </span>
                <h2 className="text-lg font-black text-slate-800 mt-2">Dvě základní patra: User Space a Kernel Space</h2>
              </div>

              {/* Vizuální schéma */}
              <div className="flex flex-col items-center gap-1 max-w-md mx-auto">
                {/* Společný rámec: Operační systém */}
                <div className="w-full border-2 border-dashed border-emerald-500 bg-emerald-50/20 rounded-3xl p-4 sm:p-5 flex flex-col items-center relative pt-7">
                  <div className="absolute -top-3.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" /> Operační systém
                  </div>

                  {/* Vrstva 1: User Space */}
                  <div className="w-full bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-colors rounded-2xl p-4 flex flex-col items-center shadow-sm relative z-10 text-center">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Monitor className="w-4 h-4" /></div>
                      <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Smartphone className="w-4 h-4" /></div>
                    </div>
                    <span className="font-black text-blue-900 uppercase tracking-wider text-sm">Aplikace a Uživatel (User Space)</span>
                    <span className="text-xs text-blue-600/80 font-medium mt-0.5">Hry, Prohlížeč, Kancelářský balík</span>
                  </div>

                  {/* Spojka */}
                  <div className="w-1.5 h-5 bg-slate-200 my-1"></div>

                  {/* Vrstva 2: Kernel Space */}
                  <div className="w-full bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-300 transition-colors rounded-2xl p-4 flex flex-col items-center shadow-sm relative z-10 text-center">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Shield className="w-4 h-4" /></div>
                    </div>
                    <span className="font-black text-emerald-900 uppercase tracking-wider text-sm">Jádro (Kernel Space)</span>
                    <div className="flex gap-2 mt-2 w-full justify-center text-xs text-emerald-800 font-bold">
                      <div className="bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 shadow-sm">Jádro (Kernel)</div>
                    </div>
                  </div>

                  {/* Spojka přes ovladače k HW */}
                  <div className="flex flex-col items-center -my-1">
                    <div className="w-1.5 h-3 bg-slate-200"></div>
                    <div className="bg-emerald-50 px-3 py-1 rounded-xl border-2 border-emerald-300 shadow-sm text-center relative z-20">
                      <div className="text-xs text-emerald-900 font-bold">Ovladače (Drivers)</div>
                      <div className="text-[9px] text-emerald-600 font-medium uppercase tracking-wider">Komunikace s HW</div>
                    </div>
                    <div className="w-1.5 h-3 bg-slate-200"></div>
                  </div>
                </div>

                {/* Spojka k HW */}
                <div className="w-1.5 h-5 bg-slate-200 my-1"></div>

                {/* Vrstva 3: Hardware */}
                <div className="w-full bg-slate-100 border-2 border-slate-300 hover:border-slate-400 transition-colors rounded-2xl p-4 flex flex-col items-center shadow-sm relative z-10 text-center">
                  <div className="flex gap-2 mb-2">
                    <div className="w-8 h-8 bg-slate-600 rounded-xl flex items-center justify-center text-white shadow-sm"><Cpu className="w-4 h-4" /></div>
                    <div className="w-8 h-8 bg-slate-600 rounded-xl flex items-center justify-center text-white shadow-sm"><HardDrive className="w-4 h-4" /></div>
                  </div>
                  <span className="font-black text-slate-800 uppercase tracking-wider text-sm">Hardware</span>
                  <span className="text-xs text-slate-600/80 font-medium mt-0.5">Procesor (CPU), Paměť (RAM), Disky, Grafika</span>
                </div>
              </div>
            </div>

            {/* 3. Detailní popis obou pater (Karty) */}

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Kernel Space Info */}
              <div className="bg-slate-100 p-6 rounded-3xl border-2 border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><Cpu className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><ShieldCheck className="text-slate-600" /> Kernel Space (Jádro)</h3>
                <ul className="text-sm text-slate-700 space-y-3 relative z-10">
                  <li><strong className="text-slate-900 block mb-1">Co to je:</strong> Chráněná část paměti, kde běží jádro OS a ovladače.</li>
                  <li><strong className="text-slate-900 block mb-1">Oprávnění:</strong> Má plný a neomezený přístup k hardwaru a všem paměťovým adresám.</li>
                  <li><strong className="text-red-600 block mb-1">Riziko:</strong> Chyba nebo pád v tomto prostoru obvykle znamená zkolabování celého systému (Modrá smrt / Kernel panic).</li>
                </ul>
              </div>

              {/* User Space Info */}
              <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><LayoutDashboard className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-blue-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><LayoutDashboard className="text-blue-600" /> User Space (Uživatel)</h3>
                <ul className="text-sm text-blue-800 space-y-3 relative z-10">
                  <li><strong className="text-blue-900 block mb-1">Co to je:</strong> Prostor, kde běží běžné uživatelské aplikace, hry nebo prohlížeče.</li>
                  <li><strong className="text-blue-900 block mb-1">Oprávnění (Klec):</strong> Omezená práva. Aplikace nemůže přistupovat přímo k hardwaru ani do paměti jiných aplikací.</li>
                  <li><strong className="text-blue-900 block mb-1">Komunikace (System Call):</strong> Když program potřebuje hardware (např. uložit soubor), musí požádat jádro pomocí tzv. Systémového volání.</li>
                  <li><strong className="text-green-600 block mb-1">Bezpečnost:</strong> Pokud spadne aplikace v User space, systém to ustojí a program lze jednoduše zavřít.</li>
                </ul>
              </div>
            </div>

            {/* 4. Architektonická otázka pro stavitele OS */}
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-2 border-indigo-200 p-6 sm:p-7 rounded-3xl text-center max-w-4xl mx-auto mb-10 shadow-xs">
              <h3 className="text-base sm:text-lg font-black text-indigo-950 uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
                🔍 Otázka pro architekty: Kam umístit moduly?
              </h3>
              <p className="text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
                Už víme, že existuje <strong>User Space</strong> (pro aplikace) a <strong>Kernel Space</strong> (pro jádro).
                Kam ale máme uvnitř umístit <em>ovladače grafiky, síťovou kartu a souborový systém</em>?
                Podle toho, do kterého patra tyto služby zařadíme, rozlišujeme dva základní typy architektur:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              {/* 1. MONOLITICKÉ JÁDRO */}
              <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border-2 border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
                      <Layers className="w-7 h-7 text-slate-600" /> Monolitické Jádro
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                      Vše v jádře
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-6">Příklad: Linux, Windows, macOS</p>

                  {/* Schéma OS: Monolit */}
                  <div className="flex flex-col items-center">
                    {/* Společný rámec OS */}
                    <div className="w-full border-2 border-dashed border-emerald-500 bg-emerald-50/20 rounded-3xl p-4 flex flex-col items-center relative pt-6 shadow-2xs">
                      <div className="absolute -top-3 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs flex items-center gap-1.5">
                        <Shield className="w-3 h-3" /> Operační systém (Monolit)
                      </div>

                      {/* User Space: Jen aplikace */}
                      <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex flex-col items-center shadow-xs text-center">
                        <span className="font-black text-blue-900 uppercase tracking-wider text-xs mb-1.5">User Space (Uživatelský prostor)</span>
                        <div className="flex flex-wrap gap-2 justify-center w-full">
                          <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs border border-blue-100 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                            <Monitor className="w-3.5 h-3.5 text-blue-500" /> Běžné programy (Chrome, Word)
                          </div>
                          <div className="px-3 py-1.5 bg-white rounded-xl shadow-2xs border border-blue-100 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                            <Gamepad2 className="w-3.5 h-3.5 text-blue-500" /> Hry
                          </div>
                        </div>
                      </div>

                      {/* Spojka: Systémová volání */}
                      <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 border border-slate-300">
                        ↕ Zasílání zpráv
                      </span>
                      <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>

                      {/* Kernel Space: Všechno uvnitř jádra */}
                      <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 flex flex-col items-center shadow-xs text-center">
                        <span className="font-black text-emerald-950 uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Kernel Space (Plný modulů!)
                        </span>
                        <div className="grid grid-cols-2 gap-2 w-full mt-1">
                          <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-200 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-950">
                            <Cpu className="w-3.5 h-3.5 text-emerald-600" /> Plánovač &amp; RAM
                          </div>
                          <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-200 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-950">
                            <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> Souborový systém
                          </div>
                          <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-200 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-950">
                            <Monitor className="w-3.5 h-3.5 text-emerald-600" /> Ovladač Grafiky
                          </div>
                          <div className="p-2 bg-white rounded-xl shadow-2xs border border-emerald-200 flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-950">
                            <Wifi className="w-3.5 h-3.5 text-emerald-600" /> Ovladač Sítě
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spojka k HW */}
                    <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>

                    {/* Hardware */}
                    <div className="w-full bg-slate-100 border-2 border-slate-300 rounded-2xl p-2.5 flex items-center justify-center gap-3 shadow-2xs text-center">
                      <div className="flex gap-1.5">
                        <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center text-white"><Cpu className="w-3 h-3" /></div>
                        <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center text-white"><HardDrive className="w-3 h-3" /></div>
                      </div>
                      <span className="font-black text-slate-800 uppercase tracking-wider text-xs">Hardware (CPU, RAM, Disky...)</span>
                    </div>
                  </div>
                </div>

                {/* Shrnutí výhod a nevýhod */}
                <div className="mt-6 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div><strong className="text-emerald-700">🚀 Výhoda (Výkon):</strong> Maximální rychlost, moduly komunikují přímo v paměti RAM bez přepínání kontextu.</div>
                  <div><strong className="text-red-600">💥 Riziko (Stabilita):</strong> Pokud spadne kterýkoliv ovladač (např. grafika), zkolabuje celý operační systém (Modrá smrt).</div>
                </div>
              </div>

              {/* 2. MIKROJÁDRO */}
              <div className="bg-blue-50/60 p-6 sm:p-7 rounded-3xl border-2 border-blue-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-black text-blue-900 flex items-center gap-2.5">
                      <ShieldCheck className="w-7 h-7 text-blue-600" /> Mikrojádro
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-200 text-blue-800">
                      Izolované služby
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mb-6">Příklad: QNX (Auta, nemocnice), MINIX, seL4</p>

                  {/* Schéma OS: Mikrojádro */}
                  <div className="flex flex-col items-center">
                    {/* Společný rámec OS */}
                    <div className="w-full border-2 border-dashed border-emerald-500 bg-emerald-50/20 rounded-3xl p-4 flex flex-col items-center relative pt-6 shadow-2xs">
                      <div className="absolute -top-3 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs flex items-center gap-1.5">
                        <Shield className="w-3 h-3" /> Operační systém (Mikrojádro)
                      </div>

                      {/* User Space: Aplikace + Vystěhované servery */}
                      <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex flex-col items-center shadow-xs text-center">
                        <span className="font-black text-blue-900 uppercase tracking-wider text-xs mb-1.5">User Space (Aplikace + Služby)</span>
                        <div className="flex flex-wrap gap-1.5 justify-center w-full">
                          <div className="px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-blue-200 text-[11px] font-bold text-blue-900 flex items-center gap-1">
                            <Monitor className="w-3 h-3 text-blue-500" /> Programy
                          </div>
                          <div className="px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-amber-300 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                            <HardDrive className="w-3 h-3 text-amber-600" /> Soubory
                          </div>
                          <div className="px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-amber-300 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                            <Monitor className="w-3 h-3 text-amber-600" /> Grafika
                          </div>
                          <div className="px-2.5 py-1 bg-white rounded-lg shadow-2xs border border-amber-300 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                            <Wifi className="w-3 h-3 text-amber-600" /> Síť
                          </div>
                        </div>
                      </div>

                      {/* Spojka: IPC Zprávy */}
                      <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        ↕ Zasílání zpráv
                      </span>
                      <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>

                      {/* Kernel Space: Téměř prázdný, jen miniaturní mikrojádro */}
                      <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 flex flex-col items-center shadow-xs text-center">
                        <span className="font-black text-emerald-950 uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Kernel Space (Pouze holé minimum)
                        </span>
                        <div className="w-full flex justify-center mt-1">
                          <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs font-black tracking-wide">
                            <Cpu className="w-4 h-4 text-emerald-200" /> Mikrojádro (Základní plánovač &amp; IPC)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spojka k HW */}
                    <div className="w-1.5 h-3.5 bg-slate-200 my-0.5"></div>

                    {/* Hardware */}
                    <div className="w-full bg-slate-100 border-2 border-slate-300 rounded-2xl p-2.5 flex items-center justify-center gap-3 shadow-2xs text-center">
                      <div className="flex gap-1.5">
                        <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center text-white"><Cpu className="w-3 h-3" /></div>
                        <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center text-white"><HardDrive className="w-3 h-3" /></div>
                      </div>
                      <span className="font-black text-slate-800 uppercase tracking-wider text-xs">Hardware (CPU, RAM, Disky...)</span>
                    </div>
                  </div>
                </div>

                {/* Shrnutí výhod a nevýhod */}
                <div className="mt-6 text-xs text-blue-900 bg-white p-4 rounded-2xl border border-blue-200 space-y-1.5">
                  <div><strong className="text-emerald-700">🛡️ Výhoda (Spolehlivost):</strong> Pád síťového ovladače nebo grafiky systém neohrozí – modul se v User Space tiše restartuje.</div>
                  <div><strong className="text-amber-700">🐢 Nevýhoda (Režie):</strong> Každá komunikace mezi ovladači a hardwarem musí posílat zprávy přes mikrojádro, což snižuje výkon.</div>
                </div>
              </div>
            </div>

            {/* Hybridní jádro – rozbalovací sekce */}
            <div className="max-w-4xl mx-auto mb-12">
              <button
                onClick={() => setShowHybrid(prev => !prev)}
                className="w-full flex items-center justify-between px-6 py-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Layers className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-purple-800 text-sm uppercase tracking-widest">Rozšíření: Hybridní jádro</div>
                    <div className="text-xs text-purple-500 font-medium">Windows NT, macOS XNU, Android — kde to skutečně běží</div>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center transition-transform duration-300 ${showHybrid ? 'rotate-180' : ''}`}>
                  <ArrowDown className="w-4 h-4 text-purple-700" />
                </div>
              </button>

              {showHybrid && (
                <div className="mt-2 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border-2 border-purple-200 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-purple-800 leading-relaxed mb-6">
                    Hybridní jádro bere <strong>rychlost monolitu</strong> a kombinuje ji s <strong>bezpečností mikrojádra</strong>.
                    Nejpoužívanější ovladače (grafika, sítě) běží přímo v Kernel Space pro maximální výkon, zatímco méně kritické
                    služby mohou být izolovány v User Space. Na rozdíl od čistého monolitu (jako je klasický Linux kernel)
                    přidává hybridní jádro vrstvu abstrakce a selektivní izolaci.
                    <strong> Windows NT, macOS i Android jsou hybridní jádra</strong> — operační systémy, ve kterých
                    žijete každý den, a přesto nejsou ani čistý monolit, ani čisté mikrojádro.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-800 font-medium">
                    💡 <strong>Proč Linux v monolitu a Android v hybridu?</strong> Android používá Linuxové jádro jako základ,
                    ale přidává nad něj vlastní HAL (Hardware Abstraction Layer) vrstvu a Google Play Services v User Space —
                    to z něj dělá de facto hybridní architekturu, i když základní jádro je stále monolit.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Monitor className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">Windows NT</div>
                      <div className="text-[11px] text-slate-500 mt-1">Hybridní od verze 3.1 (1993)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Mach + vlastní Executive vrstva</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Cpu className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">macOS (XNU)</div>
                      <div className="text-[11px] text-slate-500 mt-1">Mach mikrojádro + BSD monolit</div>
                      <div className="text-[10px] text-slate-400 mt-1">Nejčistší hybridní architektura</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Wifi className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">Android (Linux)</div>
                      <div className="text-[11px] text-slate-500 mt-1">Linux kernel + HAL + Binder IPC</div>
                      <div className="text-[10px] text-slate-400 mt-1">Hybridní systémem HAL vrstvy</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ochranné kruhy (Protection Rings) */}
            <div className="bg-white p-8 rounded-3xl border-2 border-indigo-100 shadow-sm mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-indigo-900 mb-3 uppercase flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-indigo-500" /> Hardwarové kruhy (Protection Rings)
                </h2>

                <div className="bg-indigo-50/80 border-l-4 border-indigo-500 p-4 rounded-r-2xl mb-5 shadow-2xs">
                  <p className="text-sm text-indigo-950 font-bold leading-relaxed">
                    <strong>Ochranné kruhy (Protection Rings)</strong> jsou <em>hardwarové stavy (režimy) procesoru</em>, mezi kterými se CPU při běhu neustále přepíná podle toho, kdo má zrovna slovo.
                  </p>
                  <p className="text-xs text-indigo-800 font-medium mt-1 leading-relaxed">
                    Hranici mezi User Space a Kernel Space nehlídá žádný software, ale přímo fyzický křemík procesoru.
                  </p>
                </div>

                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 font-black rounded-full flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <strong className="text-blue-800">Ring 3 (Aplikace)</strong><br />
                      Procesor dovolí programu použít pouze bezpečné instrukce (sčítání, násobení) a sáhnout jen do vlastní vyhrazené paměti. Pokus o formátování disku procesor zablokuje.
                    </div>
                  </li>
                  <li className="flex gap-3 opacity-60">
                    <div className="w-8 h-8 bg-slate-200 text-slate-500 font-black rounded-full flex items-center justify-center flex-shrink-0">1, 2</div>
                    <div>
                      <strong className="text-slate-600">Ring 1 a 2</strong><br />
                      Historicky určeno pro ovladače. Dnes se v běžných OS (Windows/Linux) většinou nepoužívají.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-700 font-black rounded-full flex items-center justify-center flex-shrink-0">0</div>
                    <div>
                      <strong className="text-red-800">Ring 0 (Jádro OS)</strong><br />
                      "Božský režim". Procesor odemkne naprosto všechny instrukce a dovolí Jádru přistupovat ke kterémukoliv hardwaru a celé paměti RAM.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="w-64 h-64 relative flex-shrink-0">
                {/* Ring 3 */}
                <div className="absolute inset-0 bg-blue-50 border-4 border-blue-200 rounded-full flex items-start justify-center pt-2 shadow-inner">
                  <span className="font-black text-blue-800 text-sm">Ring 3</span>
                </div>
                {/* Ring 1 & 2 */}
                <div className="absolute inset-8 bg-slate-50 border-4 border-slate-200 rounded-full flex items-start justify-center pt-3 shadow-inner">
                  <span className="font-black text-slate-400 text-[10px] uppercase">Ring 1, 2 (Prázdné)</span>
                </div>
                {/* Ring 0 */}
                <div className="absolute inset-16 bg-red-50 border-4 border-red-300 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <ShieldCheck className="w-8 h-8 text-red-500 mx-auto mb-1" />
                    <span className="font-black text-red-800 text-lg leading-none">Ring 0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={onGoToPractice}
                className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Jdeme si to postavit!
              </button>
            </div>
          </div>
  );
};
