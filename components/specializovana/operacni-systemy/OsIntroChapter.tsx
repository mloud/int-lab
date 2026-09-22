import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Brain, CheckCircle2, AlertTriangle, Monitor, Server, Smartphone, Watch, Shield, Cpu, HardDrive } from 'lucide-react';

interface OsIntroChapterProps {
  onBack: () => void;
}

const THEORY_CONTENT = (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase flex items-center gap-3">
        <Monitor className="w-8 h-8 text-sky-500" /> Co je operační systém
      </h2>
      <p className="text-slate-600 font-medium leading-relaxed mb-4">
        Operační systém je základní software, který umožňuje komunikaci mezi uživatelem, aplikacemi a hardwarem počítače nebo zařízení. Bez operačního systému by zařízení nebylo schopno spustit žádný program, zobrazit obrazovku ani reagovat na vstup z klávesnice či dotyku.
      </p>
      <div className="bg-sky-50 text-sky-900 p-4 rounded-xl font-bold italic border-l-4 border-sky-400">
        Je to první software, který se načítá po zapnutí zařízení, a zůstává aktivní až do jeho vypnutí.
      </div>

      {/* Vrstvený model počítače */}
      <div className="mt-10 flex flex-col items-center gap-1 max-w-2xl mx-auto">
        <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-4">Vrstvený model počítače</h3>
        
        {/* Vrstva 1: Uživatel a Aplikace */}
        <div className="w-full bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-colors rounded-2xl p-5 flex flex-col items-center shadow-sm relative z-10">
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Monitor className="w-5 h-5" /></div>
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Smartphone className="w-5 h-5" /></div>
          </div>
          <span className="font-black text-blue-900 uppercase tracking-wider">Uživatel a Aplikace (User Space)</span>
          <span className="text-sm text-blue-700/80 font-medium mt-1">Webový prohlížeč, Hry, Textový editor, Uživatel</span>
        </div>

        {/* Spojka */}
        <div className="w-1.5 h-8 bg-slate-200"></div>

        {/* Vrstva 2: OS a Jádro */}
        <div className="w-full bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-300 transition-colors rounded-2xl p-5 flex flex-col items-center shadow-sm relative z-10">
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Shield className="w-5 h-5" /></div>
          </div>
          <span className="font-black text-emerald-900 uppercase tracking-wider">Operační systém (Kernel Space)</span>
          <div className="flex gap-3 mt-3 w-full justify-center text-sm text-emerald-800 font-bold">
            <div className="bg-emerald-100 px-4 py-1.5 rounded-lg border border-emerald-200 shadow-sm">Jádro (Kernel)</div>
          </div>
        </div>

        {/* Spojka přes ovladače k HW */}
        <div className="flex flex-col items-center -my-1">
          <div className="w-1.5 h-6 bg-slate-200"></div>
          <div className="bg-emerald-50 px-4 py-1.5 rounded-xl border-2 border-emerald-300 shadow-sm text-center relative z-20">
            <div className="text-sm text-emerald-900 font-bold">Ovladače (Drivers)</div>
            <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider mt-0.5">Komunikace s HW</div>
          </div>
          <div className="w-1.5 h-6 bg-slate-200"></div>
        </div>

        {/* Vrstva 3: Hardware */}
        <div className="w-full bg-slate-100 border-2 border-slate-300 hover:border-slate-400 transition-colors rounded-2xl p-5 flex flex-col items-center shadow-sm relative z-10">
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center text-white shadow-sm"><Cpu className="w-5 h-5" /></div>
            <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center text-white shadow-sm"><HardDrive className="w-5 h-5" /></div>
          </div>
          <span className="font-black text-slate-800 uppercase tracking-wider">Hardware</span>
          <span className="text-sm text-slate-600/80 font-medium mt-1">Procesor (CPU), Paměť (RAM), Disky, Grafická karta</span>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
        <Cpu className="w-8 h-8 text-purple-500" /> Hlavní funkce
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Cpu className="w-5 h-5 text-purple-400" /> Správa procesů</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>OS umožňuje spouštění více programů najednou (<strong>multitasking</strong>)</li>
            <li>Zajišťuje vytváření, plánování, ukončování procesů</li>
            <li>Řídí přidělování procesorového času (scheduler)</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><HardDrive className="w-5 h-5 text-indigo-400" /> Správa paměti</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>Přiděluje paměť běžícím procesům</li>
            <li>Chrání paměť mezi aplikacemi (aby se nerušily)</li>
            <li>Podporuje virtuální paměť</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Monitor className="w-5 h-5 text-green-400" /> Zařízení a Vstup/Výstup</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li>Ovládá připojená zařízení (myš, klávesnice, disky)</li>
            <li>Komunikuje s hardwarem pomocí <strong>ovladačů (driverů)</strong></li>
          </ul>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-red-400" /> Další důležité funkce</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            <li><strong>Souborový systém:</strong> ukládání, práva k datům</li>
            <li><strong>Uživatelské rozhraní:</strong> GUI (grafické) nebo CLI (textové)</li>
            <li><strong>Zabezpečení:</strong> hesla, práva, ochrana před malwarem</li>
            <li><strong>Správa aplikací:</strong> decentralizovaná (ruční stahování - zastaralé) vs. centralizovaná (App Store, automatické aktualizace)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
        <Server className="w-8 h-8 text-orange-500" /> Typy operačních systémů
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 flex flex-col items-center text-center">
          <Monitor className="w-10 h-10 text-orange-400 mb-3" />
          <h3 className="font-bold text-orange-900 mb-2">Desktopové</h3>
          <p className="text-xs text-orange-800/70 mb-3">Osobní počítače a notebooky (kancelář, hry).</p>
          <div className="text-[10px] font-mono text-orange-700 bg-orange-100 px-2 py-1 rounded w-full">Windows, macOS, Linux (Ubuntu)</div>
        </div>
        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
          <Server className="w-10 h-10 text-blue-400 mb-3" />
          <h3 className="font-bold text-blue-900 mb-2">Serverové</h3>
          <p className="text-xs text-blue-800/70 mb-3">Poskytování webů, databází, bezpečnost.</p>
          <div className="text-[10px] font-mono text-blue-700 bg-blue-100 px-2 py-1 rounded w-full">Windows Server, Ubuntu Server</div>
        </div>
        <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex flex-col items-center text-center">
          <Smartphone className="w-10 h-10 text-green-400 mb-3" />
          <h3 className="font-bold text-green-900 mb-2">Mobilní</h3>
          <p className="text-xs text-green-800/70 mb-3">Telefony a tablety, dotykové ovládání.</p>
          <div className="text-[10px] font-mono text-green-700 bg-green-100 px-2 py-1 rounded w-full">Android, iOS</div>
        </div>
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
          <Watch className="w-10 h-10 text-slate-400 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">Vestavěné (Embedded)</h3>
          <p className="text-xs text-slate-600 mb-3">Chytré pračky, auta, hodinky, často bez GUI.</p>
          <div className="text-[10px] font-mono text-slate-700 bg-slate-200 px-2 py-1 rounded w-full">FreeRTOS, QNX, WebOS</div>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm min-w-max">
          <thead className="bg-slate-200 text-slate-700">
            <tr>
              <th className="p-3">Kritérium</th>
              <th className="p-3 text-sky-700">Windows</th>
              <th className="p-3 text-orange-600">Linux</th>
              <th className="p-3 text-green-700">Android</th>
              <th className="p-3 text-slate-800">iOS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-3 font-bold">Výrobce</td>
              <td className="p-3">Microsoft (proprietární)</td>
              <td className="p-3">Komunita / Různé firmy</td>
              <td className="p-3">Google (open-source)</td>
              <td className="p-3">Apple (pouze iPhony)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Otevřenost</td>
              <td className="p-3">Uzavřený, nelze měnit kód</td>
              <td className="p-3">Plně otevřený (open-source)</td>
              <td className="p-3">Velmi otevřený, úpravy, root</td>
              <td className="p-3">Uzavřený, omezené úpravy</td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Zařízení</td>
              <td className="p-3">Většina PC a notebooků na trhu</td>
              <td className="p-3">PC, servery, superpočítače</td>
              <td className="p-3">Od levných po prémiové mobily</td>
              <td className="p-3">Pouze Apple zařízení</td>
            </tr>
            <tr>
              <td className="p-3 font-bold">Aktualizace</td>
              <td className="p-3">Centrální (Windows Update)</td>
              <td className="p-3">Přes správce balíčků distribuce</td>
              <td className="p-3">Závislé na výrobci (Samsung aj.)</td>
              <td className="p-3">Přímé od Apple</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-rose-500" /> Licencování OS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
          <h4 className="font-bold text-rose-900 mb-1">Proprietární (Uzavřená)</h4>
          <p className="text-sm text-rose-800/70">Kód není dostupný, nelze upravovat ani volně šířit (Windows, macOS).</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-1">Open-source (Otevřená)</h4>
          <p className="text-sm text-emerald-800/70">Kód je volně dostupný k úpravám a šíření komunitou (Linux, Android).</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
          <h4 className="font-bold text-sky-900 mb-1">Freeware</h4>
          <p className="text-sm text-sky-800/70">Program je zdarma k použití, ale <strong>nemáš přístup k jeho kódu</strong>.</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <h4 className="font-bold text-yellow-900 mb-1">Shareware / Trial</h4>
          <p className="text-sm text-yellow-800/70">Zdarma jen na zkoušku nebo s omezenými funkcemi.</p>
        </div>
      </div>

      <h3 className="font-bold text-slate-700 uppercase mb-4 text-sm tracking-wider">Typy licencí v praxi</h3>
      <ul className="space-y-3 text-sm text-slate-700">
        <li className="flex gap-3"><div className="font-bold bg-slate-200 px-2 py-1 rounded">OEM</div> <span>Dodává se s novým PC, levnější, ale vázaná na konkrétní zařízení (nelze přenést na jiný notebook).</span></li>
        <li className="flex gap-3"><div className="font-bold bg-slate-200 px-2 py-1 rounded">Krabicová (Retail)</div> <span>Zakoupená samostatně, lze ji legálně přenést na nový počítač.</span></li>
        <li className="flex gap-3"><div className="font-bold bg-slate-200 px-2 py-1 rounded">Volume</div> <span>Pro školy a firmy. Jeden klíč aktivuje stovky počítačů.</span></li>
      </ul>
    </div>
  </div>
);

type AnswerType = string | string[] | Record<string, string>;

interface QuizQuestion {
  id: string;
  type: 'single' | 'multi' | 'text' | 'match';
  question: string;
  options?: { id: string; text: string }[];
  matchItems?: { left: string[]; right: string[] };
  correct: AnswerType;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'single',
    question: 'Kamarád si koupil nový notebook s předinstalovanými Windows. Za rok se mu notebook nenávratně rozbije a koupí si nový, tentokrát bez systému. Může na něj použít licenci ze starého rozbitého notebooku?',
    options: [
      { id: 'a', text: 'Ano, je to jeho zaplacená licence.' },
      { id: 'b', text: 'Ne, protože předinstalovaný systém je vázaný na hardware (OEM) a nelze ho přenést.' },
      { id: 'c', text: 'Ano, ale musí si doplatit Volume poplatek.' }
    ],
    correct: 'b'
  },
  {
    id: 'q2',
    type: 'multi',
    question: 'Které z následujících činností zajišťuje samotný operační systém? (Vyber přesně 2 možnosti)',
    options: [
      { id: 'a', text: 'Komunikace s tiskárnou' },
      { id: 'b', text: 'Tvorba webových stránek' },
      { id: 'c', text: 'Chlazení procesoru termopastou' },
      { id: 'd', text: 'Zabraňování aplikacím přepisovat si data v paměti RAM' }
    ],
    correct: ['a', 'd']
  },
  {
    id: 'q3',
    type: 'text',
    question: 'Jak se anglickým termínem označuje typ softwarové licence, kde je zdrojový kód volně dostupný každému k úpravám a distribuci?',
    correct: 'open-source'
  },
  {
    id: 'q4',
    type: 'single',
    question: 'Co by se stalo s běžným počítačem, kdybys úplně vymazal z disku operační systém a zapnul ho?',
    options: [
      { id: 'a', text: 'Fungoval by normálně, ale mnohem pomaleji.' },
      { id: 'b', text: 'Nedokázal by spustit žádný program ani reagovat na klávesnici.' },
      { id: 'c', text: 'Automaticky by se připojil k záchrannému cloudu a stáhl si nový OS.' }
    ],
    correct: 'b'
  },
  {
    id: 'q5',
    type: 'text',
    question: 'Operační systém umožňuje spouštět více programů najednou (např. zároveň hraje hudba a píšeš v textovém editoru). Jak se tato vlastnost jedním slovem nazývá?',
    correct: 'multitasking'
  },
  {
    id: 'q6',
    type: 'match',
    question: 'Přiřaď k následujícím zařízením logicky ten správný typ operačního systému:',
    matchItems: {
      left: ['Běžný školní notebook', 'Chytrá pračka', 'Databázový stroj pro velkou firmu', 'iPhone'],
      right: ['Mobilní', 'Desktopový', 'Serverový', 'Vestavěný (Embedded)']
    },
    correct: {
      'Běžný školní notebook': 'Desktopový',
      'Chytrá pračka': 'Vestavěný (Embedded)',
      'Databázový stroj pro velkou firmu': 'Serverový',
      'iPhone': 'Mobilní'
    }
  },
  {
    id: 'q7',
    type: 'multi',
    question: 'Firma potřebuje nasadit operační systém pro své webové servery. Které z následujících systémů bys doporučil, protože jsou k tomu přímo určeny? (Vyber 2 možnosti)',
    options: [
      { id: 'a', text: 'Ubuntu Server' },
      { id: 'b', text: 'Windows Server' },
      { id: 'c', text: 'Android' },
      { id: 'd', text: 'QNX' }
    ],
    correct: ['a', 'b']
  },
  {
    id: 'q8',
    type: 'single',
    question: 'Stáhnul sis z internetu program úplně zdarma a je to freeware. Znamená to automaticky, že smíš otevřít jeho kód, upravit ho a vydávat za svůj?',
    options: [
      { id: 'a', text: 'Ne, freeware znamená jen, že je zdarma k použití, ale nedává ti právo ke kódu a úpravám.' },
      { id: 'b', text: 'Ano, pokud je něco freeware, znamená to automaticky i open-source.' }
    ],
    correct: 'a'
  },
  {
    id: 'q9',
    type: 'match',
    question: 'Přiřaď vlastnosti k licencím:',
    matchItems: {
      left: ['Mohu volně upravovat zdrojový kód', 'Uzavřený systém pro mobily pouze od Apple', 'Zdarma k vyzkoušení, po 30 dnech musím zaplatit', 'Aktivuje stovky počítačů ve škole jedním klíčem'],
      right: ['Volume licence', 'iOS', 'Shareware', 'Open-source']
    },
    correct: {
      'Mohu volně upravovat zdrojový kód': 'Open-source',
      'Uzavřený systém pro mobily pouze od Apple': 'iOS',
      'Zdarma k vyzkoušení, po 30 dnech musím zaplatit': 'Shareware',
      'Aktivuje stovky počítačů ve škole jedním klíčem': 'Volume licence'
    }
  },
  {
    id: 'q10',
    type: 'single',
    question: 'Z jakého důvodu je dnes běžnější instalovat aplikace centrálně (např. přes App Store, Google Play) oproti dřívějšímu ručnímu stahování z webu instalátorů (decentralizovaně)?',
    options: [
      { id: 'a', text: 'Je to bezpečnější pro uživatele a aktualizace se hlídají automaticky.' },
      { id: 'b', text: 'Centrální distribuce funguje i bez připojení k internetu.' },
      { id: 'c', text: 'Aplikace z centrálních obchodů nezabírají žádné místo na disku.' }
    ],
    correct: 'a'
  },
  {
    id: 'q11',
    type: 'single',
    question: 'Společnost vydala aktualizaci ovladače (driveru) pro novou grafickou kartu. Co by se stalo, kdyby operační systém žádné ovladače nepoužíval?',
    options: [
      { id: 'a', text: 'Hry by měly lepší grafiku, protože by ovladač systém nebrzdil.' },
      { id: 'b', text: 'Počítač by nevěděl, jak správně komunikovat s grafickou kartou, a ta by nefungovala optimálně nebo vůbec.' },
      { id: 'c', text: 'Operační systém by se z bezpečnostních důvodů odinstaloval.' }
    ],
    correct: 'b'
  },
  {
    id: 'q12',
    type: 'multi',
    question: 'Představ si, že bys z mobilního telefonu smazal jeho operační systém (např. Android) a telefon jen zapnul. Které z následujících věcí by se staly? (Vyber 2 možnosti)',
    options: [
      { id: 'a', text: 'Fotoaparát by už nevyfotil jedinou fotku.' },
      { id: 'b', text: 'Baterie by se sama okamžitě vybila.' },
      { id: 'c', text: 'Nešlo by zapnout displej ani odeslat SMS zprávu.' },
      { id: 'd', text: 'Signál od operátora by se zdvojnásobil.' }
    ],
    correct: ['a', 'c']
  },
  {
    id: 'q13',
    type: 'single',
    question: 'Uživatel má doma velmi pomalý, starý notebook s Windows a chce ho zrychlit alespoň pro jednoduché prohlížení webu a psaní e-mailů. Jaký systém by dávalo smysl nainstalovat místo něj?',
    options: [
      { id: 'a', text: 'Odlehčenou distribuci Linuxu (např. Lubuntu nebo Mint).' },
      { id: 'b', text: 'Windows Server, protože servery jsou dělané na rychlost a stabilitu.' },
      { id: 'c', text: 'Android 14, protože je optimalizovaný pro velké notebooky.' }
    ],
    correct: 'a'
  },
  {
    id: 'q14',
    type: 'text',
    question: 'Navrhuješ chytrou pračku, která má jen jedno dotykové tlačítko, malý displej a obvod s mikročipem. Jaký typ operačního systému (jedním slovem česky nebo anglicky) v ní pravděpodobně poběží?',
    correct: 'vestavěný'
  },
  {
    id: 'q15',
    type: 'match',
    question: 'Přiřaď životní situace k ideálnímu typu operačního systému:',
    matchItems: {
      left: ['Hraju nejnovější PC hry a potřebuji maximální výkon grafiky', 'Potřebuji, aby na mé webové stránky mohlo přijít 100 000 lidí denně', 'Řídím automatické dávkování krmiva v chytré zoo podle času'],
      right: ['Serverový', 'Vestavěný (Embedded)', 'Desktopový']
    },
    correct: {
      'Hraju nejnovější PC hry a potřebuji maximální výkon grafiky': 'Desktopový',
      'Potřebuji, aby na mé webové stránky mohlo přijít 100 000 lidí denně': 'Serverový',
      'Řídím automatické dávkování krmiva v chytré zoo podle času': 'Vestavěný (Embedded)'
    }
  },
  {
    id: 'q16',
    type: 'single',
    question: 'Proč si nemůžeš běžně nainstalovat iOS (systém z iPhonu) na svůj starší mobil značky Samsung?',
    options: [
      { id: 'a', text: 'Protože telefony Samsung mají pomalejší procesory a nezvládly by to.' },
      { id: 'b', text: 'Protože iOS je proprietární (uzavřený) a Apple ho navrhuje striktně jen pro svůj vlastní hardware.' },
      { id: 'c', text: 'Protože iOS zabírá moc místa a na Android by se nevešel.' }
    ],
    correct: 'b'
  },
  {
    id: 'q17',
    type: 'multi',
    question: 'Student IT by rád vyvinul vlastní úpravu operačního systému (svou vlastní distribuci) a potřebuje přístup k jeho zdrojovým kódům. U kterých systémů (open-source) je to legálně a technicky možné? (Vyber 2 možnosti)',
    options: [
      { id: 'a', text: 'Linux (např. Ubuntu)' },
      { id: 'b', text: 'Android (AOSP)' },
      { id: 'c', text: 'Microsoft Windows 11' },
      { id: 'd', text: 'Apple macOS' }
    ],
    correct: ['a', 'b']
  },
  {
    id: 'q18',
    type: 'single',
    question: 'Uživatel si stáhl populární program "WinRAR". Při každém spuštění se mu na obrazovce ukáže okno s žádostí o zakoupení plné verze, ale program ho nechá dál zadarmo pracovat s určitým omezením. O jaký model licencování se pravděpodobně jedná?',
    options: [
      { id: 'a', text: 'Shareware / Trialware' },
      { id: 'b', text: 'Open-source' },
      { id: 'c', text: 'OEM' }
    ],
    correct: 'a'
  },
  {
    id: 'q19',
    type: 'text',
    question: 'Která logická struktura a funkce v rámci operačního systému se stará o to, abychom mohli data bezpečně uložit na pevný disk a roztřídit je do složek? (odpověď na 2 slova)',
    correct: 'souborový systém'
  },
  {
    id: 'q20',
    type: 'match',
    question: 'Rozhodni, která důležitá vnitřní součást OS řeší jaký problém v praxi:',
    matchItems: {
      left: ['Dva programy se najednou perou o procesor, kdo dostane přednost?', 'Hra běžela normálně, ale najednou spolkla veškerou volnou operační paměť', 'Mladší bratr nezná heslo, takže se nedostane k mým fotkám'],
      right: ['Správa paměti', 'Zabezpečení a správa uživatelů', 'Správa procesů (Plánovač)']
    },
    correct: {
      'Dva programy se najednou perou o procesor, kdo dostane přednost?': 'Správa procesů (Plánovač)',
      'Hra běžela normálně, ale najednou spolkla veškerou volnou operační paměť': 'Správa paměti',
      'Mladší bratr nezná heslo, takže se nedostane k mým fotkám': 'Zabezpečení a správa uživatelů'
    }
  }
];

const OsIntroChapter: React.FC<OsIntroChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz'>('theory');
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});
  const [evaluated, setEvaluated] = useState(false);
  const [score, setScore] = useState(0);

  const handleSingleSelect = (qId: string, optionId: string) => {
    if (evaluated) return;
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleMultiSelect = (qId: string, optionId: string) => {
    if (evaluated) return;
    const current = (answers[qId] as string[]) || [];
    if (current.includes(optionId)) {
      setAnswers(prev => ({ ...prev, [qId]: current.filter(id => id !== optionId) }));
    } else {
      setAnswers(prev => ({ ...prev, [qId]: [...current, optionId] }));
    }
  };

  const handleTextChange = (qId: string, value: string) => {
    if (evaluated) return;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleMatchChange = (qId: string, leftItem: string, rightItem: string) => {
    if (evaluated) return;
    const current = (answers[qId] as Record<string, string>) || {};
    setAnswers(prev => ({ ...prev, [qId]: { ...current, [leftItem]: rightItem } }));
  };

  const checkAnswer = (q: QuizQuestion, userAns: AnswerType): boolean => {
    if (!userAns) return false;
    
    if (q.type === 'single') {
      return q.correct === userAns;
    }
    if (q.type === 'text') {
      const uText = (userAns as string).toLowerCase().trim();
      const cText = (q.correct as string).toLowerCase().trim();
      // Ošetření specifik
      if (cText === 'vestavěný' && uText === 'embedded') return true;
      if (cText === 'souborový systém' && (uText === 'filesystem' || uText === 'file system')) return true;
      
      return uText === cText || uText.replace('-', '') === cText.replace('-', '');
    }
    if (q.type === 'multi') {
      const uArr = [...(userAns as string[])].sort();
      const cArr = [...(q.correct as string[])].sort();
      if (uArr.length !== cArr.length) return false;
      return uArr.every((val, index) => val === cArr[index]);
    }
    if (q.type === 'match') {
      const uDict = userAns as Record<string, string>;
      const cDict = q.correct as Record<string, string>;
      for (const key in cDict) {
        if (uDict[key] !== cDict[key]) return false;
      }
      return Object.keys(uDict).length === Object.keys(cDict).length;
    }
    return false;
  };

  const handleEvaluate = () => {
    let currentScore = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (checkAnswer(q, answers[q.id])) currentScore++;
    });
    setScore(currentScore);
    setEvaluated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr kapitol
        </button>

        <div className="bg-white p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-2 sticky top-4 z-50">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BookOpen className="w-5 h-5" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'quiz' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Brain className="w-5 h-5" /> Ověření znalostí
          </button>
        </div>

        {activeTab === 'theory' ? THEORY_CONTENT : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {evaluated && (
              <div className={`p-6 rounded-2xl border-4 flex items-center gap-4 ${score === QUIZ_QUESTIONS.length ? 'bg-green-50 border-green-400 text-green-900' : 'bg-red-50 border-red-400 text-red-900'}`}>
                {score === QUIZ_QUESTIONS.length ? <CheckCircle2 className="w-12 h-12 flex-shrink-0 text-green-500" /> : <AlertTriangle className="w-12 h-12 flex-shrink-0 text-red-500" />}
                <div>
                  <h3 className="font-black text-xl uppercase mb-1">
                    {score === QUIZ_QUESTIONS.length ? 'Gratulujeme! Všechno správně.' : 'Něco se nepovedlo!'}
                  </h3>
                  <p className="font-medium text-sm">
                    Tvoje skóre: {score} / {QUIZ_QUESTIONS.length}. 
                    {score !== QUIZ_QUESTIONS.length && ' Doporučujeme se vrátit na záložku Teorie a zopakovat si probírané učivo. Níže najdeš rozbor svých chyb.'}
                  </p>
                </div>
              </div>
            )}

            {QUIZ_QUESTIONS.map((q, index) => {
              const isCorrect = evaluated ? checkAnswer(q, answers[q.id]) : null;
              return (
                <div key={q.id} className={`bg-white p-6 sm:p-8 rounded-3xl shadow-sm border-2 ${evaluated ? (isCorrect ? 'border-green-300' : 'border-red-300') : 'border-slate-200'}`}>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 flex gap-3">
                    <span className="bg-slate-100 text-slate-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    {q.question}
                  </h3>

                  {/* Single Choice */}
                  {q.type === 'single' && (
                    <div className="space-y-3 pl-11">
                      {q.options?.map(opt => (
                        <button
                          key={opt.id}
                          disabled={evaluated}
                          onClick={() => handleSingleSelect(q.id, opt.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm
                            ${answers[q.id] === opt.id ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}
                            ${evaluated && opt.id === q.correct ? '!border-green-500 !bg-green-50 !text-green-900 ring-2 ring-green-500/50' : ''}
                            ${evaluated && answers[q.id] === opt.id && opt.id !== q.correct ? '!border-red-500 !bg-red-50 !text-red-900 line-through opacity-70' : ''}
                          `}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Multi Choice */}
                  {q.type === 'multi' && (
                    <div className="space-y-3 pl-11">
                      {q.options?.map(opt => {
                        const isSelected = (answers[q.id] as string[] || []).includes(opt.id);
                        const isRightAns = (q.correct as string[]).includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            disabled={evaluated}
                            onClick={() => handleMultiSelect(q.id, opt.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm flex items-center gap-3
                              ${isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}
                              ${evaluated && isRightAns ? '!border-green-500 !bg-green-50 !text-green-900 ring-2 ring-green-500/50' : ''}
                              ${evaluated && isSelected && !isRightAns ? '!border-red-500 !bg-red-50 !text-red-900 line-through opacity-70' : ''}
                            `}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                            </div>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Input */}
                  {q.type === 'text' && (
                    <div className="pl-11">
                      <input
                        type="text"
                        disabled={evaluated}
                        value={(answers[q.id] as string) || ''}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                        placeholder="Napiš odpověď..."
                        className={`w-full p-4 rounded-xl border-2 outline-none font-bold text-slate-700
                          ${evaluated ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-slate-300 focus:border-indigo-500'}
                        `}
                      />
                      {evaluated && !isCorrect && (
                        <div className="mt-3 text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                          Správná odpověď: {q.correct as string}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Matching */}
                  {q.type === 'match' && (
                    <div className="pl-11 space-y-4">
                      {q.matchItems?.left.map((leftItem, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="flex-1 bg-slate-100 p-3 rounded-xl border border-slate-200 text-sm font-medium w-full text-center sm:text-right">
                            {leftItem}
                          </div>
                          <select
                            disabled={evaluated}
                            value={((answers[q.id] as Record<string, string>) || {})[leftItem] || ''}
                            onChange={(e) => handleMatchChange(q.id, leftItem, e.target.value)}
                            className={`flex-1 p-3 rounded-xl border-2 outline-none font-bold text-sm w-full
                              ${evaluated ? (((answers[q.id] as Record<string, string>) || {})[leftItem] === (q.correct as Record<string, string>)[leftItem] ? 'border-green-500 bg-green-50 text-green-900' : 'border-red-500 bg-red-50 text-red-900') : 'border-slate-300'}
                            `}
                          >
                            <option value="">-- Vyber --</option>
                            {q.matchItems?.right.map((rItem, j) => (
                              <option key={j} value={rItem}>{rItem}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                      {evaluated && !isCorrect && (
                        <div className="mt-3 text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                          Některá přiřazení jsou špatně, prostuduj si znovu typy a licence.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {!evaluated ? (
              <button
                onClick={handleEvaluate}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all border-b-4 border-indigo-800"
              >
                Vyhodnotit kvíz
              </button>
            ) : (
              <button
                onClick={() => {
                  setAnswers({});
                  setEvaluated(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-lg uppercase tracking-widest rounded-2xl shadow-sm transition-all border-b-4 border-slate-300"
              >
                Zkusit to znovu
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OsIntroChapter;
