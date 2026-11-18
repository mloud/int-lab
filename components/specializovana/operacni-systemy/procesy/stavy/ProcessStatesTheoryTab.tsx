'use client';

import React from 'react';
import { 
  Activity, Cpu, HardDrive, Clock, Sliders, AlertCircle, Sparkles, Database 
} from 'lucide-react';
import { TheoryCard, Callout, RevealQuestions } from '../../souborove-systemy/FsShared';

export default function ProcessStatesTheoryTab() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* BLOK A: Rychlostní propast a proč má proces stavy */}
      <TheoryCard icon={Clock} title="Proč proces nepočítá celou dobu? Rychlostní propast" letter="A" tone="indigo">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          Když se podíváte na procesor v počítači, zdá se, že jede naplno. Skutečnost je ale jiná: 
          <strong> proces tráví většinu svého života čekáním</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 mb-6">
          <h4 className="font-black text-slate-900 text-sm uppercase mb-3">
            Porovnání rychlostí: CPU vs. Pomalý disk z předchozího bloku
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span>Rychlost CPU (Nanosekundy)</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                Procesor provede <strong>miliardy operací za vteřinu</strong> (jedna instrukce trvá zlomek nanosekundy).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                <HardDrive className="w-5 h-5 text-amber-600" />
                <span>Čtení z disku / I/O (Milisekundy)</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Čtení sektoru z disku trvá <strong>okolo 10 milisekund</strong>. Pro procesor je to jako čekat celý měsíc!
              </p>
            </div>
          </div>
        </div>

        <Callout kind="key" title="Základní pravidlo operačního systému">
          Když proces požádá o čtení z disku (nebo čeká, až uživatel stiskne klávesu), <strong>CPU nesmí zahálet</strong>! 
          Operační systém tento proces okamžitě uspí do stavu <em>Čekající (Blocked)</em> a na procesor pustí jiný proces, který je připraven počítat.
        </Callout>
      </TheoryCard>

      {/* BLOK B: 5 základních stavů procesu */}
      <TheoryCard icon={Activity} title="Pět základních stavů procesu" letter="B" tone="purple">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          V každém okamžiku své existence se proces nachází právě v jednom z následujících stavů:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          {/* 1. NEW */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full">
              1. Stav
            </span>
            <h4 className="font-black text-slate-900 text-base mt-2 mb-1">Nový (New)</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Proces se právě vytváří. OS alokuje struktury v paměti RAM a zavaděč (Loader) načítá kód z disku.
            </p>
          </div>

          {/* 2. READY */}
          <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200">
            <span className="text-xs font-mono font-bold uppercase text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
              2. Stav
            </span>
            <h4 className="font-black text-blue-950 text-base mt-2 mb-1">Připraven (Ready)</h4>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              Proces má všechna data v RAM a <strong>čeká ve frontě</strong>, až mu plánovač OS přidělí procesor.
            </p>
          </div>

          {/* 3. RUNNING */}
          <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              3. Stav
            </span>
            <h4 className="font-black text-emerald-950 text-base mt-2 mb-1">Běžící (Running)</h4>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              Proces <strong>fyzicky běží na CPU</strong>. Čítač instrukcí (PC) vykonává jeho instrukce.
            </p>
          </div>

          {/* 4. BLOCKED */}
          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <span className="text-xs font-mono font-bold uppercase text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              4. Stav
            </span>
            <h4 className="font-black text-amber-950 text-base mt-2 mb-1">Blokovaný (Blocked)</h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Čeká na pomalou I/O operaci (čtení z disku, síť, klávesnici). <strong>Nemůže počítat</strong>, i kdyby bylo CPU volné!
            </p>
          </div>

          {/* 5. TERMINATED */}
          <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200">
            <span className="text-xs font-mono font-bold uppercase text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
              5. Stav
            </span>
            <h4 className="font-black text-rose-950 text-base mt-2 mb-1">Ukončený (Terminated)</h4>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              Program skončil. OS uvolňuje jeho paměť RAM a maže jeho PID ze systému.
            </p>
          </div>

        </div>

        {/* VEKTOROVÉ SCHÉMA: STAVOVÝ DIAGRAM PROCESU */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
          <div className="text-center font-mono text-xs font-black uppercase text-purple-700 bg-purple-100 py-1 px-3 rounded-full mb-4 inline-block">
            Schéma: Stavový diagram přechodů procesu
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
            <svg viewBox="0 0 680 320" className="w-full max-w-[640px] h-auto">
              
              {/* UZEL 1: NEW */}
              <rect x="30" y="130" width="100" height="50" rx="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.5" />
              <text x="80" y="160" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">NEW</text>
              
              {/* Přechod NEW -> READY */}
              <path d="M 130 155 L 200 155" fill="none" stroke="#64748b" strokeWidth="3" />
              <polygon points="195,150 205,155 195,160" fill="#64748b" />
              <text x="165" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Zavedení</text>

              {/* UZEL 2: READY */}
              <rect x="210" y="125" width="120" height="60" rx="16" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
              <text x="270" y="152" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">PŘIPRAVEN</text>
              <text x="270" y="170" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">(READY)</text>

              {/* Přechod READY -> RUNNING (Nahoru vpravo) */}
              <path d="M 330 140 L 410 140" fill="none" stroke="#2563eb" strokeWidth="3" />
              <polygon points="405,135 415,140 405,145" fill="#2563eb" />
              <text x="370" y="130" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold">Přidělení CPU</text>

              {/* Přechod RUNNING -> READY (Zpět dolů - vypršel čas) */}
              <path d="M 420 170 L 330 170" fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 2" />
              <polygon points="335,165 325,170 335,175" fill="#64748b" />
              <text x="375" y="185" textAnchor="middle" fill="#64748b" fontSize="10">Vypršel čas (Timer)</text>

              {/* UZEL 3: RUNNING */}
              <rect x="420" y="125" width="120" height="60" rx="16" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" />
              <text x="480" y="152" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">BĚŽÍCÍ</text>
              <text x="480" y="170" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="bold">(RUNNING)</text>

              {/* Přechod RUNNING -> TERMINATED */}
              <path d="M 540 155 L 590 155" fill="none" stroke="#ef4444" strokeWidth="3" />
              <polygon points="585,150 595,155 585,160" fill="#ef4444" />
              <text x="565" y="145" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Konec</text>

              {/* UZEL 5: TERMINATED */}
              <rect x="595" y="130" width="70" height="50" rx="14" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="630" y="160" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">EXIT</text>

              {/* UZEL 4: BLOCKED (Dole uprostřed) */}
              <rect x="315" y="240" width="140" height="55" rx="16" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
              <text x="385" y="265" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">BLOKOVANÝ</text>
              <text x="385" y="282" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">(BLOCKED / ČEKÁ)</text>

              {/* Šipka RUNNING -> BLOCKED (Požadavek na disk) */}
              <path d="M 480 185 L 480 265 L 455 265" fill="none" stroke="#d97706" strokeWidth="3" />
              <polygon points="460,260 450,265 460,270" fill="#d97706" />
              <text x="515" y="225" textAnchor="start" fill="#b45309" fontSize="10" fontWeight="bold">I/O požadavek</text>
              <text x="515" y="238" textAnchor="start" fill="#b45309" fontSize="9">(Čtení z disku)</text>

              {/* Šipka BLOCKED -> READY (Disk dokončil práci) */}
              <path d="M 315 265 L 260 265 L 260 185" fill="none" stroke="#0284c7" strokeWidth="3" />
              <polygon points="255,190 260,180 265,190" fill="#0284c7" />
              <text x="235" y="225" textAnchor="end" fill="#0284c7" fontSize="10" fontWeight="bold">I/O hotovo!</text>
              <text x="235" y="238" textAnchor="end" fill="#0284c7" fontSize="9">(Disk dočetl data)</text>
            </svg>
          </div>
        </div>

        <Callout kind="warning" title="Důležitý chyták: Kam jde proces po dočtení z disku?">
          Všimněte si šipky ze stavu <strong>BLOCKED</strong>! Když pevný disk konečně načte soubor, proces <strong>NEJDE rovnou na CPU (Running)</strong>! 
          Jde do fronty <strong>READY (Připraven)</strong>, protože na procesoru v tu chvíli už může počítat někdo jiný.
        </Callout>
      </TheoryCard>

      {/* BLOK C: Detailní pohled na stav NEW */}
      <TheoryCard icon={Sparkles} title="Co se děje ve stavu NEW? Porodní proces" letter="C" tone="sky">
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          Stav <strong>NEW</strong> nastává ve zlomku sekundy po dvojkliku na ikonu. V této chvíli je program stále ještě pasivním souborem na disku. Zavaděč (Loader) a jádro OS musí stihnout klíčové kroky:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-blue-900 font-bold block">1. Identita (PID) a PCB</strong>
            <span className="text-slate-600">OS přidělí unikátní PID a vyhradí v jádře tabulku PCB pro správu registrů a práv.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-blue-900 font-bold block">2. Alokace RAM & DLL</strong>
            <span className="text-slate-600">Vytvoří virtuální paměťový prostor, načte kód programu z disku a propojí systémové knihovny.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-blue-900 font-bold block">3. Vstupní bod (PC)</strong>
            <span className="text-slate-600">Nastaví čítač PC na první instrukci programu (Entry Point). V té chvíli přechází do stavu <strong>READY</strong>.</span>
          </div>
        </div>
      </TheoryCard>

      {/* BLOK D: Priority procesů ve Windows */}
      <TheoryCard icon={Sliders} title="Priority procesů: Kdo předbíhá ve frontě READY?" letter="D" tone="amber">
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          Ve frontě <strong>READY</strong> může současně čekat několik desítek až stovek vláken. Plánovač CPU (Scheduler) si mezi nimi nevybírá náhodně, ale podle jejich **priority**:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-800 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-2.5">Třída priority (Windows)</th>
                <th className="p-2.5">Číselná úroveň</th>
                <th className="p-2.5">Typické využití v praxi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="bg-rose-50/50">
                <td className="p-2.5 font-bold text-rose-900">Reálný čas (Realtime)</td>
                <td className="p-2.5 font-mono">24</td>
                <td className="p-2.5 text-slate-600">Kritické úlohy (hardware, audio ovladače). Může způsobit zamrznutí myši a klávesnice!</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Vysoká (High)</td>
                <td className="p-2.5 font-mono">13</td>
                <td className="p-2.5 text-slate-600">Důležité systémové nástroje (např. Správce úloh, aby reagoval i při přetížení PC).</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Nadnormální (Above Normal)</td>
                <td className="p-2.5 font-mono">10</td>
                <td className="p-2.5 text-slate-600">Hry a aplikace vyžadující hladkou odezvu.</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="p-2.5 font-bold text-blue-900">Normální (Normal)</td>
                <td className="p-2.5 font-mono">8</td>
                <td className="p-2.5 text-slate-600">Výchozí priorita pro běžné programy (Word, prohlížeč, kalkulačka).</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Podnormální (Below Normal)</td>
                <td className="p-2.5 font-mono">6</td>
                <td className="p-2.5 text-slate-600">Nenáročné aplikace na pozadí.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-900">Nízká (Idle / Nečinnost)</td>
                <td className="p-2.5 font-mono">4</td>
                <td className="p-2.5 text-slate-600">Indexování souborů, úsporné úlohy – CPU dostanou, jen když nikdo jiný nepočítá.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryCard>

      {/* BLOK E: Objevná hádanka – Dva různé světy: CPU-Bound vs. I/O-Bound */}
      <TheoryCard icon={Activity} title="Objevná otázka: Proč se různé programy chovají úplně jinak?" letter="E" tone="emerald">
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          Zamyslete se nad dvěma programy, které běžně používáte: <strong>Poznámkový blok (Notepad)</strong> a <strong>střihové video studio (nebo 7-Zip komprese)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <HardDrive className="w-5 h-5 text-amber-600" />
              <span>Případ 1: Textový editor (Notepad)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Uživatel píše do editoru. Mezi dvěma stisky kláves uběhne 200 ms. Pro procesor je to celá věčnost!
            </p>
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200 text-xs text-amber-950 font-bold">
              💡 Kde tráví 99 % svého života? Ve stavu <strong>BLOCKED</strong> (čeká na klávesu). Na CPU skočí jen na mikrosekundu, aby písmeno vykreslil.
            </div>
            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
              Označení: I/O-Bound proces (Závislý na vstupu)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
              <Cpu className="w-5 h-5 text-blue-600" />
              <span>Případ 2: Export 4K videa (nebo 7-Zip)</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              Program přepočítává pixely nebo komprimuje data. Nepotřebuje uživatele ani disk, jen brutální výkon jader.
            </p>
            <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200 text-xs text-blue-950 font-bold">
              💡 Kde tráví 99 % svého života? Ve stavu <strong>RUNNING</strong> a neustále ho časovač vrací do <strong>READY</strong>, aby pustil ostatní.
            </div>
            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-200/60 px-2 py-0.5 rounded">
              Označení: CPU-Bound proces (Závislý na procesoru)
            </span>
          </div>
        </div>

        <Callout kind="key" title="Geniální trik operačního systému (Priority Boost)">
          Kdyby dal OS všem stejná práva, textový editor by při psaní zadrhával. Proto má operační systém pravidlo: 
          <strong> Proces, který se probudí z čekání na I/O (stisk klávesy, myš), dostane okamžité krátké zvýhodnění v prioritě (Priority Boost)</strong>. 
          Díky tomu uživatel cítí okamžitou bleskovou odezvu, i když na pozadí běží těžký export videa!
        </Callout>
      </TheoryCard>

      {/* OPAKOVACÍ OTÁZKY */}
      <RevealQuestions
        questions={[
          {
            q: 'Proč proces tráví většinu času čekáním a ne na CPU?',
            a: 'Protože CPU je miliardkrát rychlejší než vstupně-výstupní zařízení (disk, síť, klávesnice). Během doby, kdy disk čte jeden sektor, by procesor stihl provést miliony instrukcí. Proto proces při čekání uvolní CPU jiným programům.'
          },
          {
            q: 'Jaký je rozdíl mezi stavem Připraven (Ready) a Blokovaný (Blocked)?',
            a: 'Připravený proces má všechna data v RAM a MŮŽE ihned počítat, jen čeká ve frontě na CPU. Blokovaný proces NEMŮŽE počítat vůbec, i kdyby byl procesor prázdný, protože čeká na data z disku nebo od uživatele.'
          },
          {
            q: 'Kam se přesune proces v okamžiku, kdy disk dokončí čtení jeho souboru?',
            a: 'Přesune se do stavu Připraven (Ready). Musí se zařadit do fronty a počkat, až na něj plánovač CPU znovu uvolní řadu.'
          }
        ]}
      />

    </div>
  );
}
