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
  ChevronDown, 
  ShieldAlert, 
  Key, 
  Lock, 
  Server, 
  Fingerprint, 
  Terminal,
  Search,
  ShieldCheck,
  FileCheck,
  Network
} from 'lucide-react';

export default function ProcessTheoryTab() {
  return (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Úvodní navázání na 1. ročník */}
          <div className="p-6 bg-blue-50/80 rounded-3xl border-2 border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2.5 text-blue-900 font-black text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Navázání na 1. ročník (Co už známe z OSS 1):
            </div>
            <p className="text-sm text-blue-950 leading-relaxed">
              V 1. ročníku jsme zjistili, že <strong>program na disku</strong> je pouhý pasivní soubor bajtů. 
              Teprve když ho operační systém zavede do <strong>paměti RAM</strong> a přidělí mu číselný identifikátor <strong>PID</strong>, 
              vznikne živý <strong>proces</strong>, jehož instrukce vykonává procesor přes čítač PC.
            </p>
          </div>

          {/* =========================================================================
              KLÍČOVÝ BOD 1: CO DĚLÁ OPERAČNÍ SYSTÉM PŘI SPUŠTĚNÍ SOUBORU .EXE?
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-white rounded-[2.5rem] border-2 border-indigo-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Co dělá operační systém při spuštění souboru .exe?
                </h3>
                <p className="text-xs text-indigo-700 font-semibold">
                  Jaké analýzy a prověrky Windows provede předtím, než pustí cizí kód do procesoru
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Když uživatel dvakrát klikne na program nebo ho spustí z terminálu, Windows ho <strong>nepustí okamžitě do procesoru</strong>! 
              V moderním operačním systému proběhne během zlomku sekundy bezpečnostní řetězec prověrek:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Fingerprint className="w-4 h-4 text-blue-600" /> Integrita & Podpis
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Systém spočítá hash souboru a zkontroluje digitální podpis (Authenticode). Zjistí: <em>Kdo je vydavatel a nezměnil někdo po cestě ani jediný bajt?</em>
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-indigo-600" /> Cloudová reputace
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Ochrana SmartScreen a Smart App Control kontaktuje cloud Microsoftu: <em>Známe tento program? Běží na milionech PC, nebo byl vytvořen před minutou?</em>
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Shield className="w-4 h-4 text-purple-600" /> Antivirová kontrola
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Windows Defender v reálném čase proskenuje kód a hlavičky PE (Portable Executable) na přítomnost známých signatur malwaru a škodlivých skriptů.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-xs">
                  4
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Lock className="w-4 h-4 text-emerald-600" /> Přidělení práv (UAC)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  OS přiřadí procesu bezpečnostní token. Bude mít běžná práva uživatele, nebo žádá správcovský zásah a vyvolá UAC potvrzovací okno?
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-100/70 rounded-2xl border border-indigo-200 text-xs text-indigo-950 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
              <span><strong>Výsledek:</strong> Teprve když soubor projde těmito filtry, zavaděč OS (Loader) alokuje virtuální paměť v RAM, přidělí mu číselné <strong>PID</strong> a CPU začne vykonávat instrukce.</span>
            </div>
          </div>

          {/* =========================================================================
              KLÍČOVÝ BOD 2: JAK UDĚLAT RYCHLOU ANALÝZU SYSTÉMU NA SPUŠTĚNÉ PROCESY?
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 font-black text-base flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Jak udělat rychlou analýzu systému na spuštěné procesy?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Forenzní rychlokontrola běžícího počítače: na jaké 4 indicie se správce okamžitě zaměří
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Máte podezření, že je počítač infikován nebo se chová divně? Když otevřete seznam procesů, nehledejte naslepo. 
              Sledujte tyto <strong>4 klíčové znaky nebezpečí</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <FileText className="w-4 h-4 text-blue-600" /> 1. Překlep ve jménu
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Útočníci spoléhají na lidskou nepozornost (tzv. typosquatting): napodobují systémové názvy, např. <code className="font-mono bg-slate-200/80 px-1 rounded">scvhost.exe</code>, <code className="font-mono bg-slate-200/80 px-1 rounded">svch0st.exe</code> (s nulou) nebo <code className="font-mono bg-slate-200/80 px-1 rounded">explorerr.exe</code>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Layers className="w-4 h-4 text-indigo-600" /> 2. Kde program bydlí
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Pravé systémové procesy Windows sídlí výhradně v <code className="font-mono bg-slate-200/80 px-1 rounded">C:\Windows\System32</code>. Pokud proces běží ze složky <em>Stažené soubory</em> nebo <em>C:\Temp</em>, je to vetřelec!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Cpu className="w-4 h-4 text-purple-600" /> 3. Extrémní RAM a CPU
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Těžební malware (miner) nebo ransomware vytíží procesor na 100 % nebo alokuje stovky megabajtů RAM. Příkaz <code className="font-mono bg-slate-200/80 px-1 rounded">tasklist /fi "MEMUSAGE gt 100000"</code> je ihned odhalí.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4. Chybějící podpis
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Běžící proces bez platného digitálního podpisu od Microsoftu či známého výrobce (Verified Signer) je v moderním systému vždy vysoce podezřelý.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              BLOK 1: SEZNAM PROCESŮ V SYSTÉMU A PROČ JE JMÉNO PROCESU TAK DŮLEŽITÉ
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Seznam procesů v systému: Proč je jméno procesu tak důležité a zrádné?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  V systému běží stovky procesů najednou – jak se v nich vyznat a proč pouhé jméno nestačí
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              V každém okamžiku běží v operačním systému Windows 200 až 300 procesů najednou. 
              Všechny jsou zapsány v jednom globálním <strong>seznamu procesů</strong>. 
              Každý řádek obsahuje <strong>Jméno programu</strong> (Image Name), unikátní <strong>PID</strong> a <strong>Využití paměti</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Legitimní systémový proces (Příklad)
                </div>
                <div className="font-mono text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <div><strong>Název:</strong> svchost.exe</div>
                  <div><strong>Cesta na disku:</strong> C:\Windows\System32\svchost.exe</div>
                  <div><strong>Digitální podpis:</strong> Microsoft Windows Publisher (Platný)</div>
                  <div><strong>Běžící služba:</strong> Dnscache (překlad doménových jmen)</div>
                </div>
                <p className="text-xs text-emerald-900 font-medium">
                  Poctivý systémový proces: Správný název, sídlo v System32, platná pečeť a reálná služba.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" /> Maskovaný virus (Příklad podvrhu)
                </div>
                <div className="font-mono text-xs text-slate-700 bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div><strong>Název:</strong> svchost.exe <span className="text-rose-600 font-bold">(vypadá stejně!)</span></div>
                  <div><strong>Cesta na disku:</strong> C:\Users\Student\AppData\svchost.exe</div>
                  <div><strong>Digitální podpis:</strong> Žádný (Nepodepsáno)</div>
                  <div><strong>Běžící služba:</strong> N/A (žádná služba)</div>
                </div>
                <p className="text-xs text-rose-900 font-medium">
                  Hrozba: Jméno je identické, ale sídlí v uživatelském profilu, chybí podpis a neveze žádnou službu!
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                💡 Zlaté pravidlo správce: Jméno procesu je jen textový štítek!
              </div>
              <p>
                Kdyby útočník pojmenoval svůj program <code>trojan.exe</code>, každý správce ho hned ukončí. 
                Proto ho útočník pojmenuje <code>svchost.exe</code>, aby splynul s davem dalších 70 stejných procesů. 
                Proto se nikdy nespokojíme jen se jménem, ale vždy prověřujeme <strong>kde na disku soubor leží</strong>, <strong>jaké služby veze</strong> a <strong>zda má platný digitální podpis</strong>.
              </p>
            </div>
          </div>

          {/* BLOK 2: DIGITÁLNÍ PODPISY (AUTHENTICODE) A CERTIFIKÁTY */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Digitální podpisy (Authenticode): Otisk prstu a úřední pečeť
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Jak Windows pozná, že program skutečně vyrobil Microsoft a cestou ho nikdo neupravil?
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Představte si <strong>dopis s královskou voskovou pečetí ověřený státním notářem</strong>. 
              Dokud je pečeť neporušená, víte, že dopis napsal král a po cestě z něj nikdo nevytrhl ani písmeno. 
              V počítačovém světě se tato pečeť jmenuje <strong>Digitální podpis (Microsoft Authenticode)</strong>.
            </p>

            {/* 3 kroky bez kryptografických rovnic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-blue-950">1. Otisk prstu (Hash)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Každý soubor má jedinečný 64znakový kód (SHA-256). Když v programu změníte jedinou tečku, otisk se totálně změní (lavinový efekt).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-indigo-950">2. Úřední pečeť (Podpis)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Autor (např. Microsoft nebo Google) vezme tento otisk a připevní k souboru svou nerozbitnou digitální pečeť.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-emerald-950">3. Notář (Certifikát)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nezávislá autorita (notář) v přiloženém certifikátu potvrdí: <em>„Ano, zaručuji, že tato pečeť skutečně patří Microsoftu.“</em>
                </p>
              </div>
            </div>

            {/* Co se stane při nákaze virem */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Co se stane, když do podepsaného programu vleze virus?
              </div>
              <p>
                Virus přidá do programu svůj škodlivý kód ➔ tím se <strong>změní otisk souboru</strong> ➔ původní pečeť k novému otisku nepasuje a rozbije se ➔ 
                Windows okamžitě zobrazí varování <strong>„Neznámý vydavatel / Integrita souboru byla porušena“</strong> a chytrá ochrana Smart App Control spuštění zablokuje!
              </p>
            </div>
          </div>

          {/* BLOK 3: DIAGNOSTICKÉ NÁSTROJE VE WINDOWS */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-base flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Forenzní arzenál správce: Nástroje pro odhalení anomálií
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Přehled nástrojů, které použijeme v dnešní praktické laboratoři
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-blue-600" /> tasklist v CMD
                </div>
                <p className="text-slate-600">
                  Základní terminálový příkaz pro okamžitý výpis procesů, PID a paměti. Lze filtrovat (<code className="font-mono">/FI</code>) nebo exportovat do CSV (<code className="font-mono">/FO CSV</code>).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-emerald-600" /> resmon.exe
                </div>
                <p className="text-slate-600">
                  Sledování prostředků: Odhalí, jaký proces posílá data po síti, na jaké cizí IP adresy a na které porty (detekce spywaru a C2 serverů).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" /> Process Explorer
                </div>
                <p className="text-slate-600">
                  Pokročilý nástroj od Microsoft Sysinternals: Zobrazuje strom procesů, ověřuje podpisy Authenticode a integruje reputaci z VirusTotal.com.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> Smart App Control
                </div>
                <p className="text-slate-600">
                  Aktivní cloudový filtr ve Windows 11: Zabrání spuštění nepodepsaných nebo neznámých programů ještě dříve, než se dostanou do RAM.
                </p>
              </div>
            </div>
          </div>

        </div>
  );
}
