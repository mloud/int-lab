import React from 'react';
import { BookOpen, Monitor, Server, Smartphone, Watch, Shield, Cpu, HardDrive } from 'lucide-react';

export const OsIntroTheoryTab: React.FC = () => (
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
      <div className="mt-10 flex flex-col items-center gap-1 max-w-lg mx-auto">
        <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-6">Vrstvený model počítače</h3>

        {/* Společný rámec: Operační systém */}
        <div className="w-full border-2 border-dashed border-emerald-500 bg-emerald-50/20 rounded-3xl p-4 sm:p-5 flex flex-col items-center relative pt-7">
          <div className="absolute -top-3.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Operační systém
          </div>

          {/* Vrstva 1: Aplikace a Uživatel (User Space) */}
          <div className="w-full bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-colors rounded-2xl p-5 flex flex-col items-center shadow-sm relative z-10">
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Monitor className="w-5 h-5" /></div>
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Smartphone className="w-5 h-5" /></div>
            </div>
            <span className="font-black text-blue-900 uppercase tracking-wider">Aplikace a Uživatel (User Space)</span>
            <span className="text-sm text-blue-600/80 font-medium mt-1">Hry, Prohlížeč, Kancelářský balík</span>
          </div>

          <div className="w-1.5 h-6 bg-slate-200 my-1"></div>

          {/* Vrstva 2: Jádro (Kernel Space) */}
          <div className="w-full bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-300 transition-colors rounded-2xl p-5 flex flex-col items-center shadow-sm relative z-10">
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm"><Shield className="w-5 h-5" /></div>
            </div>
            <span className="font-black text-emerald-900 uppercase tracking-wider">Jádro (Kernel Space)</span>
            <div className="flex gap-3 mt-3 w-full justify-center text-sm text-emerald-800 font-bold">
              <div className="bg-emerald-100 px-4 py-1.5 rounded-lg border border-emerald-200 shadow-sm">Jádro (Kernel)</div>
            </div>
          </div>

          {/* Spojka přes ovladače k HW */}
          <div className="flex flex-col items-center -my-1">
            <div className="w-1.5 h-4 bg-slate-200"></div>
            <div className="bg-emerald-50 px-4 py-1.5 rounded-xl border-2 border-emerald-300 shadow-sm text-center relative z-20">
              <div className="text-sm text-emerald-900 font-bold">Ovladače (Drivers)</div>
              <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider mt-0.5">Komunikace s HW</div>
            </div>
            <div className="w-1.5 h-4 bg-slate-200"></div>
          </div>
        </div>

        <div className="w-1.5 h-6 bg-slate-200 my-1"></div>

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
        <Cpu className="w-8 h-8 text-purple-500" /> Hlavní funkce operačního systému
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

