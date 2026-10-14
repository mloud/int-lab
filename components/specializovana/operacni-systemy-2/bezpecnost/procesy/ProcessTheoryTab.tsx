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
  Network,
  FileCode
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
              ANATOMIE .EXE SOUBORU A DIGITÁLNÍ PODPIS (AUTHENTICODE)
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Anatomie .EXE souboru a digitální podpis (Authenticode)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Jak je spustitelný program poskládán na disku a jak Windows pozná nedovolenou úpravu
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Když se podíváme na soubor <code>.exe</code> pod rentgenem, neobsahuje jen samotný kód programu. 
              Na samém konci souboru je speciální bezpečnostní přihrádka, kam autor přibalil digitální podpis a svůj certifikát:
            </p>

            {/* JEDNODUCHÉ GRAFICKÉ SCHÉMA .EXE SOUBORU NA DISKU */}
            <div className="max-w-2xl mx-auto rounded-3xl border-2 border-slate-300 bg-slate-900 text-white p-5 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-mono text-cyan-400 font-black flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" /> Soubor programu na disku: kalkulacka.exe
                </span>
                <span className="text-[10px] text-slate-400 font-mono">PE formát (Portable Executable)</span>
              </div>

              {/* Sekce 1: Instrukce */}
              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-100 flex items-center gap-1.5 font-black">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" /> 1. Instrukce programu (Kód)
                  </strong>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">Kód pro CPU</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Výkonný strojový kód, který procesor čte a vykonává (výpočty, otevření okna, komunikace po síti).
                </p>
              </div>

              {/* Sekce 2: Data a zdroje */}
              <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-100 flex items-center gap-1.5 font-black">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> 2. Data a zdroje (Resources)
                  </strong>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">Data</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Obrázky, ikony, texty v nabídkách, grafické dialogy a konfigurace aplikace.
                </p>
              </div>

              {/* Sekce 3: Bezpečnostní přihrádka na konci souboru */}
              <div className="p-4 bg-gradient-to-br from-blue-950/90 to-indigo-950/90 rounded-2xl border-2 border-blue-500/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-blue-200 flex items-center gap-2 font-black text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-400" /> 3. Část na konci souboru: Bezpečnostní blok (Authenticode)
                  </strong>
                  <span className="text-[10px] bg-blue-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Připojeno k souboru
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Zašifrovaný hash (Podpis) */}
                  <div className="p-3 bg-black/40 rounded-xl border border-blue-400/40 space-y-1">
                    <div className="text-cyan-300 font-bold flex items-center gap-1.5 text-[11px]">
                      <Key className="w-3.5 h-3.5 text-cyan-400" /> Podpis = Zašifrovaný hash
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Autor vzal hash instrukcí a dat a <strong>zašifroval ho svým tajným klíčem</strong>. Nikdo jiný na světě tento podpis neumí vyrobit.
                    </p>
                  </div>

                  {/* Certifikát (Notář) */}
                  <div className="p-3 bg-black/40 rounded-xl border border-emerald-400/40 space-y-1">
                    <div className="text-emerald-300 font-bold flex items-center gap-1.5 text-[11px]">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Digitální certifikát
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Úřední doklad od certifikační autority (např. DigiCert): <em>„Ověřili jsme totožnost, klíč skutečně patří Microsoftu.“</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* JAK WINDOWS KONTROLUJE SOUBOR PŘI SPUŠTĚNÍ */}
            <div className="p-5 bg-blue-50/70 rounded-3xl border border-blue-200 space-y-3 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-black text-sm text-blue-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Jak Windows soubor zkontroluje, když na něj kliknete?
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                <li><strong>Spočte aktuální hash:</strong> Windows vezme instrukce a data programu a spočte z nich kontrolní hash (např. <code>a7f3...</code>).</li>
                <li><strong>Dešifruje podpis z konce souboru:</strong> Pomocí veřejného klíče dešifruje zašifrovaný hash ukrytý v podpisu (vyjde <code>a7f3...</code>).</li>
                <li><strong>Porovná obě čísla:</strong> Pokud se obě hodnoty přesně shodují, Windows má 100% jistotu, že kód nikdo nezměnil a program je pravý!</li>
              </ol>
            </div>

            {/* CO SE STANE, KDYŽ DO PROGRAMU VLEZE VIRUS */}
            <div className="p-5 bg-rose-50/80 rounded-3xl border border-rose-200 text-xs text-rose-950 space-y-2 leading-relaxed">
              <div className="font-bold flex items-center gap-2 text-rose-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Co přesně znamená, že se „pečeť rozbije“, když do programu vleze virus?
              </div>
              <p>
                Virus se připíše do sekce instrukcí ➔ tím se <strong>změní aktuální hash souboru</strong> (např. na <code>9e4a...</code>). 
                Na konci souboru je ale stále starý zašifrovaný hash (<code>a7f3...</code>).
              </p>
              <div className="p-3 bg-white/90 rounded-2xl border border-rose-300 font-mono text-[11px] text-rose-900 font-bold flex items-center justify-between">
                <span>Nový hash instrukcí: 9e4a...</span>
                <span className="text-rose-600 text-base">≠</span>
                <span>Původní hash v podpisu: a7f3...</span>
              </div>
              <p className="font-semibold text-rose-900">
                💥 Čísla nesouhlasí! A protože virus nemá tajný klíč Microsoftu z Redmondu, nemůže podpis přepočítat. Windows ihned ohlásí neplatný podpis a Smart App Control soubor zablokuje!
              </p>
            </div>
          </div>

          {/* =========================================================================
              JAK UDĚLAT RYCHLOU ANALÝZU SYSTÉMU NA SPUŠTĚNÉ PROCESY?
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
              SEZNAM PROCESŮ V SYSTÉMU A PROČ JE JMÉNO PROCESU TAK DŮLEŽITÉ
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-base flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
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

          {/* DIAGNOSTICKÉ NÁSTROJE VE WINDOWS */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-base flex items-center justify-center shrink-0">
                <Terminal className="w-5 h-5" />
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
