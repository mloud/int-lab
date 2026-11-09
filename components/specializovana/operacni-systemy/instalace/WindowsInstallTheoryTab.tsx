"use client";

import React from 'react';
import {
  Monitor, Key, HardDrive, ShieldAlert, WifiOff, Terminal,
  CheckCircle2, XCircle, ChevronRight, User, AlertTriangle, ArrowRight, RefreshCcw,
  BookOpen, ShieldCheck, Box, Globe, Settings, Cpu, Layers, Fingerprint, Server, PlayCircle, Activity
} from 'lucide-react';

export const WindowsInstallTheoryTab = ({ onStartSimulator }: { onStartSimulator: () => void }) => (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto space-y-8 pb-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Teorie: Instalace Windows 11</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Vše, co potřebuješ vědět před samotným spuštěním instalátoru.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Cpu className="w-8 h-8 text-blue-500" /> 1. Systémové požadavky Windows 11
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <Cpu className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Procesor (CPU)</strong>
                  <span className="text-slate-600">1 GHz nebo rychlejší se 2 nebo více jádry (64-bit). Více jader = paralelní zpracování a vyšší výkon.</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <Server className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Paměť RAM a Úložiště</strong>
                  <span className="text-slate-600">RAM: 4 GB nebo více.<br/>Úložiště: 64 GB nebo větší.</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">UEFI a Secure Boot</strong>
                  <span className="text-slate-600">Zabraňuje spuštění škodlivého softwaru při startu (vyžaduje digitálně podepsané součásti).</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <Fingerprint className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">TPM 2.0 (Trusted Platform Module)</strong>
                  <span className="text-slate-600">Bezpečnostní čip ("digitální trezor") pro ukládání šifrovacích klíčů a hesel.</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <Monitor className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Grafika a Zobrazení</strong>
                  <span className="text-slate-600">DirectX 12 (API pro komunikaci s HW). Rozlišení min. 720p a úhlopříčka &gt; 9".</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                <Globe className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800">Internet a Účet</strong>
                  <span className="text-slate-600">Vyžadováno pro prvotní nastavení edic Home a Pro (včetně účtu Microsoft).</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Key className="w-8 h-8 text-emerald-500" /> 2. Typy licencí
            </h2>
            <p className="text-slate-600 mb-6">Před instalací ověř přítomnost licence. Jinak si ji budeš muset dokoupit.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-emerald-100 bg-emerald-50/50 p-6 rounded-2xl">
                <h3 className="font-bold text-emerald-800 mb-2 uppercase tracking-wide">OEM Licence</h3>
                <ul className="text-sm text-emerald-900 space-y-2">
                  <li><strong>Charakteristika:</strong> Pevně svázaná s hardwarem (základní deskou).</li>
                  <li><strong>Klíč:</strong> Uložen přímo v BIOS/UEFI. Starší PC mají štítek COA.</li>
                  <li><strong>Médium:</strong> Většinou obraz výrobce nebo stažené ISO.</li>
                  <li className="text-red-700 mt-2"><strong>Nepřenositelná!</strong> Po výměně desky licence zaniká.</li>
                </ul>
              </div>
              <div className="border-2 border-indigo-100 bg-indigo-50/50 p-6 rounded-2xl">
                <h3 className="font-bold text-indigo-800 mb-2 uppercase tracking-wide">Retail (Krabicová)</h3>
                <ul className="text-sm text-indigo-900 space-y-2">
                  <li><strong>Charakteristika:</strong> Plnohodnotná, pro koncové uživatele.</li>
                  <li><strong>Klíč:</strong> Dodáván na kartičce nebo e-mailem.</li>
                  <li><strong>Médium:</strong> USB disk v balení, nebo ISO z webu.</li>
                  <li className="text-emerald-700 mt-2"><strong>Přenositelná!</strong> Lze ji odinstalovat a aktivovat na jiném PC.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-rose-500" /> 3. Průběh instalace (OOBE)
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="border-l-4 border-rose-400 pl-4 py-1">
                <strong>1. Bootování z USB/ISO:</strong> PC musí spustit instalační prostředí ještě před startem stávajícího OS na disku.
              </div>
              <div className="border-l-4 border-rose-400 pl-4 py-1">
                <strong>2. Jazyk, region, edice a klíč:</strong> Určuje se, jak na nás PC mluví a jaké funkce si platíme.
              </div>
              <div className="border-l-4 border-rose-400 pl-4 py-1">
                <strong>3. Upgrade vs Vlastní instalace:</strong> Chceme čistý stůl (Vlastní), nebo jen aktualizovat a zachovat data (Upgrade)?
              </div>
              <div className="border-l-4 border-rose-400 pl-4 py-1">
                <strong>4. Rozdělení disku:</strong> Formátování a definice fyzického úložiště pro soubory OS.
              </div>
              <div className="border-l-4 border-rose-400 pl-4 py-1">
                <strong>5. OOBE (Out-of-Box Experience):</strong> Prvotní nastavení účtu, licenční smlouvy a <strong>Zásadní rozhodnutí o soukromí (Telemetrie).</strong>
              </div>
              <div className="mt-8 bg-rose-50 p-6 rounded-2xl border-2 border-rose-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-widest">Důležité téma k diskuzi</div>
                <h4 className="font-black text-rose-900 text-lg mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-600" /> Diagnostická data (Telemetrie)
                </h4>
                <p className="mb-4 text-rose-800 leading-relaxed font-medium">Během instalace uživatel rozhoduje, jaký objem dat bude operační systém automaticky a neustále odesílat na servery společnosti Microsoft za účelem analýzy.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                    <strong className="block text-rose-900 mb-2 border-b border-rose-100 pb-2">Povinná data (Základní)</strong>
                    <ul className="list-disc ml-4 space-y-1 text-rose-700 text-xs">
                      <li>Verze a sestavení Windows</li>
                      <li>Klíčové HW komponenty (procesor, paměť)</li>
                      <li>Zprávy o tom, proč selhala aktualizace</li>
                      <li>Základní údaje o spolehlivosti a chybách</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                    <strong className="block text-rose-900 mb-2 border-b border-rose-100 pb-2">Volitelná data (Úplná)</strong>
                    <ul className="list-disc ml-4 space-y-1 text-rose-700 text-xs">
                      <li><strong>Používání aplikací</strong> (co a jak dlouho je spuštěné)</li>
                      <li><strong>Historie prohlížení</strong> v prohlížečích (Edge)</li>
                      <li>Ukázky psaní na klávesnici (k vylepšení našeptávače)</li>
                      <li>Rozšířené chybové výpisy z paměti (Crash Dumps)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/60 rounded-xl text-rose-900 text-xs border border-rose-100/50 italic leading-relaxed">
                  <strong>Závěr:</strong> Na jedné straně stojí obrovská výhoda pro vývojáře, kteří mohou hromadně a rychle detekovat problémy tisíců uživatelů a opravovat systém. Na straně druhé stojí soukromí uživatele a obavy z plošného sledování. V rámci EU (GDPR) je proto kladen silný důraz na to, aby sdílení volitelných dat bylo vždy vědomé a nepovinné.
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button 
                onClick={onStartSimulator}
                className="px-8 py-4 bg-[#0078D7] hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
              >
                Spustit instalátor <PlayCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
);
