'use client';

import React from 'react';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Cpu, 
  Layers, 
  Activity, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Key, 
  Fingerprint, 
  Terminal,
  Search,
  ShieldCheck,
  FileCheck,
  Network,
  FileCode,
  Bug,
  ShieldAlert,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export default function ProcessTheoryTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. NAVÁZÁNÍ NA 1. ROČNÍK (Mentální most z OSS 1) */}
      <div className="p-5 sm:p-6 bg-blue-50/90 rounded-3xl border-2 border-blue-200/80 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Navázání na 1. ročník (Co už známe z OSS 1)
        </div>
        <p className="text-sm text-blue-950 leading-relaxed font-medium">
          V 1. ročníku jsme zjistili, že <strong>program na disku</strong> je pasivní soubor bajtů. 
          Teprve po zavedení do <strong>paměti RAM</strong> a přidělení číselného identifikátoru <strong>PID</strong> 
          vznikne živý <strong>proces</strong>, jehož instrukce vykonává CPU. V bezpečnosti ale řešíme novou otázku: 
          <em> Jak systém pozná, zda je program bezpečný, ještě než ho vůbec pustí do procesoru?</em>
        </p>
      </div>

      {/* =========================================================================
          PILÍŘ 1: CO SE STANE PŘI DVOJKLIKU NA .EXE? (3 ÚROVNĚ KONTROLY)
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-slate-800">
              1. Třífázový filtr: Co dělá Windows při spuštění .exe souboru?
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Operační systém nepustí cizí kód do procesoru okamžitě – provede bleskový řetězec prověrek
            </p>
          </div>
        </div>

        {/* Sekvenční proud 3 fází se spojovacími šipkami */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 relative">
          
          {/* Fáze 1 */}
          <div className="flex-1 p-5 bg-gradient-to-br from-blue-50/80 to-white rounded-3xl border-2 border-blue-400 shadow-md space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                1
              </span>
              <span className="text-[10px] font-black text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-blue-200">
                100% offline (CPU)
              </span>
            </div>
            <div>
              <div className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <Fingerprint className="w-4 h-4 text-blue-600" /> Integrita & Podpis
              </div>
              <p className="text-slate-600 leading-relaxed text-xs mt-1.5">
                Váš procesor spočítá kontrolní součet instrukcí a ověří podpis na konci souboru. 
                Pokud byl kód změněn (např. virem), systém jej <strong>okamžitě zablokuje</strong>.
              </p>
            </div>
            <div className="text-[10px] text-blue-700 font-bold bg-blue-100/60 p-2 rounded-xl border border-blue-200/60">
              ✓ Podpis platí ➔ postup do Fáze 2
            </div>
          </div>

          {/* Šipka 1 -> 2 */}
          <div className="flex items-center justify-center text-slate-400 shrink-0 self-center">
            <ArrowRight className="hidden lg:block w-6 h-6 text-indigo-400 animate-pulse stroke-[2.5]" />
            <ArrowDown className="block lg:hidden w-5 h-5 text-indigo-400 animate-pulse stroke-[2.5]" />
          </div>

          {/* Fáze 2 */}
          <div className="flex-1 p-5 bg-gradient-to-br from-indigo-50/80 to-white rounded-3xl border-2 border-indigo-400 shadow-md space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                2
              </span>
              <span className="text-[10px] font-black text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-indigo-200">
                Online (Cloud)
              </span>
            </div>
            <div>
              <div className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <ShieldAlert className="w-4 h-4 text-indigo-600" /> Prověrka reputace
              </div>
              <p className="text-slate-600 leading-relaxed text-xs mt-1.5">
                Systém se zeptá cloudové databáze (SmartScreen / Smart App Control): 
                <em> Známe tento program? Běží na milionech PC, nebo vznikl před minutou?</em>
              </p>
            </div>
            <div className="text-[10px] text-indigo-700 font-bold bg-indigo-100/60 p-2 rounded-xl border border-indigo-200/60">
              ✓ Reputace v pořádku ➔ postup do Fáze 3
            </div>
          </div>

          {/* Šipka 2 -> 3 */}
          <div className="flex items-center justify-center text-slate-400 shrink-0 self-center">
            <ArrowRight className="hidden lg:block w-6 h-6 text-emerald-400 animate-pulse stroke-[2.5]" />
            <ArrowDown className="block lg:hidden w-5 h-5 text-emerald-400 animate-pulse stroke-[2.5]" />
          </div>

          {/* Fáze 3 */}
          <div className="flex-1 p-5 bg-gradient-to-br from-emerald-50/80 to-white rounded-3xl border-2 border-emerald-400 shadow-md space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                3
              </span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200">
                Před spuštěním
              </span>
            </div>
            <div>
              <div className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Antivirový štít
              </div>
              <p className="text-slate-600 leading-relaxed text-xs mt-1.5">
                Antivirus zkontroluje, zda soubor neobsahuje známý vir. Pokud je čistý, systém nahraje program do paměti RAM, přidělí mu identifikační číslo <strong>PID</strong> a procesor začne vykonávat jeho instrukce.
              </p>
            </div>
            <div className="text-[10px] text-emerald-700 font-bold bg-emerald-100/60 p-2 rounded-xl border border-emerald-200/60">
              🚀 V paměti RAM vzniká běžící proces
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          PILÍŘ 2: ANATOMIE .EXE A DIGITÁLNÍ PODPIS AUTHENTICODE
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-slate-800">
              2. Digitální podpis programu (Analogie voskové pečeti)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Každý bezpečný program je jako zapečetěný dopis od ověřeného autora
            </p>
          </div>
        </div>

        {/* 2 části programu: Kód + Pečeť */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-black text-xs">
              <FileCode className="w-4 h-4 text-blue-600" /> 1. Kód programu (Obsah dopisu)
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Instrukce, které procesor vykonává (výpočty, tlačítka, okna). Pokud se v nich změní byť jediné písmenko nebo instrukce, celá pečeť se nenávratně poškodí.
            </p>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-2xl border-2 border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-black text-xs">
              <Key className="w-4 h-4 text-blue-600" /> 2. Digitální pečeť (Podpis na konci)
            </div>
            <p className="text-blue-950 leading-relaxed text-[11px]">
              Certifikát autora (např. Microsoft). Potvrzuje: <em>„Tento soubor jsme vytvořili my a od chvíle zapečetění do něj nikdo nezasáhl.“</em>
            </p>
          </div>
        </div>

        {/* Srovnání: Originál vs Napadený program */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Co se stane, když se do programu pokusí proniknout virus?
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {/* Originál */}
            <div className="p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Originální kalkulačka
                </span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  Pečeť neporušena ✓
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Kód programu přesně odpovídá tomu, co Microsoft zapečetil. Windows vidí platný podpis známého vydavatele ➔ <strong>program se okamžitě spustí</strong>.
              </p>
            </div>

            {/* Napadený program */}
            <div className="p-4 rounded-2xl border-2 border-rose-400 bg-rose-50/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" /> Program napadený virem
                </span>
                <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300">
                  Rozbitá pečeť ✗
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Virus připsal do souboru svůj škodlivý kód. Původní pečeť se rozbila a novou útočník bez tajného klíče Microsoftu nevyrobí ➔ <strong>Windows program zablokuje</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PILÍŘ 3: 4 FORENZNÍ PRAVIDLA SPRÁVCE (JAK ODHALIT VETŘELCE)
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-black flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-slate-800">
              3. Zlatá pravidla správce: Jak odhalit maskovaný malware v procesech?
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              V systému běží 200–300 procesů najednou – pouhé jméno programu nestačí!
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium">
          💡 <strong>Zásada:</strong> Jméno procesu je pouhý textový řetězec. Útočník svůj virus nepojmenuje <code>virus.exe</code>, 
          ale <code>svchost.exe</code>, aby splynul s desítkami legitimních procesů. Proto správce kontroluje tyto 4 indicie:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Pravidlo 1 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <FileText className="w-4 h-4 text-blue-600" /> 1. Překlep ve jménu
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Záměna písmenek (typosquatting): např. <code className="font-mono bg-slate-200 px-1 rounded">scvhost.exe</code>, <code className="font-mono bg-slate-200 px-1 rounded">svch0st.exe</code> (s nulou) nebo <code className="font-mono bg-slate-200 px-1 rounded">explorerr.exe</code>.
            </p>
          </div>

          {/* Pravidlo 2 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Layers className="w-4 h-4 text-indigo-600" /> 2. Cesta na disku
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Pravý <code>svchost.exe</code> sídlí výhradně v <code className="font-mono bg-slate-200 px-1 rounded">C:\Windows\System32</code>. Pokud běží ze složky <em>Stažené soubory</em> nebo <em>AppData</em>, jde o malware!
            </p>
          </div>

          {/* Pravidlo 3 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Cpu className="w-4 h-4 text-purple-600" /> 3. Extrémní RAM a CPU
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Těžební malware (miner) nebo ransomware vytíží procesor na 100 % nebo zabere stovky MB paměti RAM. Rychle ho odhalí filtr v příkazovém řádku.
            </p>
          </div>

          {/* Pravidlo 4 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4. Chybějící podpis
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Systémový proces bez ověřeného digitálního podpisu Microsoftu (Verified Signer) je v moderním systému vždy kritickým varovným signálem.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PILÍŘ 4: FORENZNÍ ARZENÁL (NÁSTROJE V PRAXI)
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-black text-slate-800">
              4. Forenzní arzenál správce v laboratoři
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Nástroje, které použijeme v dnešní praktické laboratorní práci
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600" /> tasklist v CMD
            </strong>
            <p className="text-[11px] text-slate-600">
              Okamžitý výpis procesů, PID a paměti přímo z terminálu. Podporuje filtry (<code>/FI</code>) a export do CSV.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-emerald-600" /> resmon.exe
            </strong>
            <p className="text-[11px] text-slate-600">
              Sledování prostředků: Odhalí odchozí síťová spojení, cizí IP adresy a porty (detekce C2 serverů).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-600" /> Process Explorer
            </strong>
            <p className="text-[11px] text-slate-600">
              Diagnostický nástroj Sysinternals: Zobrazuje strom procesů, ověřuje podpisy a kontroluje reputaci na VirusTotal.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Smart App Control
            </strong>
            <p className="text-[11px] text-slate-600">
              Aktivní ochrana ve Windows 11: Zabrání spuštění neznámého nebo nepodepsaného programu ještě před vstupem do RAM.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
