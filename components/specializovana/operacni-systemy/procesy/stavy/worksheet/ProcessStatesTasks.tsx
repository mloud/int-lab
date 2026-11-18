'use client';

import React from 'react';
import { 
  Play, 
  Square, 
  PauseCircle, 
  Clock, 
  Cpu, 
  AlertTriangle, 
  Info, 
  Terminal, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProcessStatesWorksheetAnswers, ProcessStatesCheckedItems } from '../ProcessStatesTypes';

export interface ProcessStatesSectionProps {
  answers: ProcessStatesWorksheetAnswers;
  checkedItems: ProcessStatesCheckedItems;
  handleAnswerChange: (key: string, value: string) => void;
  handleCheckChange: (key: string) => void;
}

export const ProcessStatesTasks: React.FC<ProcessStatesSectionProps> = ({
  answers,
  handleAnswerChange,
}) => {
  return (
    <div className="space-y-8">
      
      {/* =========================================================================
          ÚKOL 1: Běžné ukončení (Korektní EXIT)
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
            1
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Úloha 1: Regulérní vypnutí procesu (Korektní EXIT)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Ověření, jak aplikace reaguje, když má dostatek času na bezpečné ukončení.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Postup experimentu:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-700">
            <li>Otevřete <strong>Poznámkový blok (Notepad)</strong>.</li>
            <li>Napište do něj větu: <em>„Tento neuložený text chci zachovat.“</em> (soubor neukládejte!).</li>
            <li>Klikněte na červený <strong>křížek v pravém horním rohu okna [X]</strong>.</li>
          </ol>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              a) Co se stalo po kliknutí na křížek? Zavřelo se okno okamžitě, nebo se zobrazil dotaz?
            </label>
            <input
              type="text"
              value={answers['t1_behavior'] || ''}
              onChange={(e) => handleAnswerChange('t1_behavior', e.target.value)}
              placeholder="např. Zobrazilo se dialogové okno s dotazem na uložení změn..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              b) Didaktické vysvětlení: Proč proces stihl zareagovat a do jakého stavu přejde po potvrzení?
            </label>
            <textarea
              rows={2}
              value={answers['t1_explanation'] || ''}
              onChange={(e) => handleAnswerChange('t1_explanation', e.target.value)}
              placeholder="Vysvětlete: Křížek pošle procesu žádost (zprávu). Proces ještě běží na CPU, zachytí ji, zobrazí dialog a teprve po uložení přejde do stavu TERMINATED / EXIT..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-indigo-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          ÚKOL 2: Násilné ukončení procesu (Tvrdý EXIT / Kill)
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-sm">
            2
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Úloha 2: Násilné ukončení procesu (Tvrdý EXIT bez varování)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Porovnání ukončení přes Správce úloh a příkazový řádek (taskkill).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs text-rose-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Postup experimentu:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-700">
            <li>Znovu spusťte <strong>Notepad</strong> a napište do něj náhodný text (neukládejte!).</li>
            <li>Vyzkoušejte <strong>jednu</strong> ze dvou možností tvrdého ukončení:
              <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-slate-600">
                <li><strong>Možnost A (Správce úloh):</strong> Otevřete Správce úloh (<kbd className="font-mono bg-white px-1 border rounded">Ctrl+Shift+Esc</kbd>), najděte Notepad a klikněte na <strong>Ukončit úlohu</strong>.</li>
                <li><strong>Možnost B (Příkazový řádek / PowerShell):</strong> Spusťte příkaz <code className="bg-white px-1.5 py-0.5 border rounded font-mono text-rose-700">taskkill /F /IM notepad.exe</code>.</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kterou metodu jste použili?
            </label>
            <select
              value={answers['t2_method'] || ''}
              onChange={(e) => handleAnswerChange('t2_method', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-rose-600 focus:outline-none"
            >
              <option value="">-- Vyberte metodu --</option>
              <option value="Správce úloh (Ukončit úlohu)">Správce úloh (Ukončit úlohu)</option>
              <option value="Příkazová řádka (taskkill /F /IM notepad.exe)">Příkazová řádka (taskkill /F /IM notepad.exe)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Co se stalo s rozepsaným textem? Zobrazil se dotaz na uložení?
            </label>
            <input
              type="text"
              value={answers['t2_data_loss'] || ''}
              onChange={(e) => handleAnswerChange('t2_data_loss', e.target.value)}
              placeholder="např. Okno okamžitě zmizelo, žádný dotaz, text je ztracen..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-rose-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Didaktické zhodnocení: Kdy je násilné ukončení nutné a jaké s sebou nese riziko?
          </label>
          <textarea
            rows={2}
            value={answers['t2_risk'] || ''}
            onChange={(e) => handleAnswerChange('t2_risk', e.target.value)}
            placeholder="Používá se při zamrznutí programu (Deadlock) nebo u virů. Riziko: Neuložená data v paměti RAM proces nestihne zapsat na disk a jsou nenávratně ztracena..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-rose-600 focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          ÚKOL 3: Zmrazení procesu do stavu BLOCKED (Suspend & Resume)
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-sm">
            3
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Úloha 3: Umělé zmrazení procesu do stavu BLOCKED (Process Explorer)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Vyzkoušení funkce Suspend a Resume v profesionálním systémovém nástroji.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <PauseCircle className="w-4 h-4 text-amber-600" />
            <span>Postup experimentu:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-700">
            <li>Spusťte <strong>Notepad</strong> a mějte jeho okno viditelné na obrazovce.</li>
            <li>Spusťte nástroj <strong>Process Explorer</strong> (nebo Resource Monitor).</li>
            <li>V seznamu najděte proces <code className="bg-white px-1.5 py-0.5 border rounded font-mono">notepad.exe</code>, klikněte na něj pravým tlačítkem a zvolte <strong>Suspend</strong>.</li>
            <li>Zkuste kliknout do okna Notepadu a začít psát nebo okno přesunout myší.</li>
            <li>Podívejte se v Process Exploreru na vytížení CPU procesu <code className="font-mono">notepad.exe</code>.</li>
            <li>V Process Exploreru klikněte na <code className="font-mono">notepad.exe</code> pravým tlačítkem a zvolte <strong>Resume</strong>.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Co se stalo s oknem po volbě Suspend? Šlo do něj psát?
            </label>
            <input
              type="text"
              value={answers['t3_suspend_behavior'] || ''}
              onChange={(e) => handleAnswerChange('t3_suspend_behavior', e.target.value)}
              placeholder="např. Okno úplně zamrzlo, nešlo psát, kurzor nebliká..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jaké bylo vytížení CPU ve stavu Suspend (zamrazeno)?
            </label>
            <input
              type="text"
              value={answers['t3_suspend_cpu'] || ''}
              onChange={(e) => handleAnswerChange('t3_suspend_cpu', e.target.value)}
              placeholder="např. 0.0 % CPU"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-amber-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Co se stalo po volbě Resume? Ztratil proces svá data?
          </label>
          <input
            type="text"
            value={answers['t3_resume_behavior'] || ''}
            onChange={(e) => handleAnswerChange('t3_resume_behavior', e.target.value)}
            placeholder="např. Okno ihned ožilo, rozepsaná písmena naskočila, data v RAM zůstala neporušená..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-amber-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Didaktické vysvětlení stavu: Do jakého stavu byl proces přesunut a proč mu OS nedává CPU?
          </label>
          <textarea
            rows={2}
            value={answers['t3_explanation'] || ''}
            onChange={(e) => handleAnswerChange('t3_explanation', e.target.value)}
            placeholder="Vysvětlete: Funkce Suspend přesune vlákna do stavu BLOCKED (pozastavena). Plánovač OS takovému procesu nepřidělí ani milisekundu na CPU. Teprve Resume ho vrátí do READY a RUNNING..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-amber-600 focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          ÚKOL 4: Důkaz I/O-Bound chování (Klidový Notepad vs. psaní)
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
            4
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Úloha 4: Důkaz I/O-bound procesu (Kde tráví textový editor 99 % času?)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Měření reálného vytížení CPU běžného textového editoru v klidu a při psaní.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Postup experimentu:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-700">
            <li>Mějte spuštěný <strong>Notepad</strong> a otevřete <strong>Správce úloh</strong> (<kbd className="font-mono bg-white px-1 border rounded">Ctrl+Shift+Esc</kbd>).</li>
            <li>V záložce <strong>Procesy</strong> nebo <strong>Podrobnosti</strong> najděte <code className="font-mono">notepad.exe</code>.</li>
            <li><strong>Měření 1 (Klid):</strong> Nic v Notepadu nedělejte, na nic neklikejte a odečtěte hodnotu CPU.</li>
            <li><strong>Měření 2 (Psaní):</strong> Klikněte do Notepadu a nepřetržitě držte stisknutou libovolnou klávesu (např. písmeno „A“) po dobu 5 sekund. Sledujte, jak se změní hodnota CPU.</li>
          </ol>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-800 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3 w-1/2">Stav aplikace</th>
                <th className="p-3 w-1/2">Naměřené vytížení CPU (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3 font-semibold text-slate-800">1. Notepad v klidu (žádné psaní)</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t4_idle_cpu'] || ''}
                    onChange={(e) => handleAnswerChange('t4_idle_cpu', e.target.value)}
                    placeholder="např. 0.0 %"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-emerald-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">2. Notepad při držení klávesy</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t4_typing_cpu'] || ''}
                    onChange={(e) => handleAnswerChange('t4_typing_cpu', e.target.value)}
                    placeholder="např. 0.2 % – 0.8 %"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-emerald-600 focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Závěr a vysvětlení: Proč má editor v klidu 0 % CPU a ve kterém stavu tráví 99 % času?
          </label>
          <textarea
            rows={2}
            value={answers['t4_conclusion'] || ''}
            onChange={(e) => handleAnswerChange('t4_conclusion', e.target.value)}
            placeholder="Editor je typická I/O-bound aplikace. V klidu spí ve stavu BLOCKED a čeká na přerušení od klávesnice. Na CPU (RUNNING) skočí jen na mikrosekundu, aby písmeno vykreslil..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      {/* =========================================================================
          ÚKOL 5: Souboj o jádro CPU – Afinita a Priority
      ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-sm">
            5
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Úloha 5: Souboj o jádro procesoru – Afinita (spřažení) a Priority
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Vysvětlení pojmu afinita, stropu jednoho jádra (~8 %) a praktický test chování plánovače.
            </p>
          </div>
        </div>

        {/* EDUKATIVNÍ BOX: CO JE TO AFINITA A STROP JEDNOHO JÁDRA */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border-2 border-purple-200 text-xs text-purple-950 space-y-3">
          <div className="font-black text-sm text-purple-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Klíčová teorie pro tento úkol: Co je to Afinita a proč Správce úloh ukazuje jen ~8 %?</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
            <div className="p-3 rounded-xl bg-white/90 border border-purple-200 space-y-1">
              <strong className="text-purple-900 font-bold block">1. Afinita procesoru (Spřažení / Affinity):</strong>
              <p className="text-[11px] leading-relaxed">
                Standardně proces smí běžet na libovolném jádře. Nastavením <strong>afinity</strong> nařídíme OS: 
                <em> „Tento proces smí běžet POUZE na jádře CPU 0.“</em> Když dva procesy zamkneme na stejné jádro, donutíme je prát se o jeho čas!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/90 border border-purple-200 space-y-1">
              <strong className="text-purple-900 font-bold block">2. Proč je 1 jádro naplno jen ~8 % celku?</strong>
              <p className="text-[11px] leading-relaxed">
                Správce úloh počítá procenta z <strong>celého procesoru</strong>. Pokud máte např. 12 logických jader (vláken), 
                pak 100 % / 12 = <strong>8,33 %</strong>. Jedno jádro jedoucí na 100 % se proto v celkovém přehledu projeví jako pouhých 8 %!
              </p>
            </div>
          </div>
        </div>

        {/* POSTUP ÚKOLU */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
          <div className="font-bold flex items-center gap-2 text-slate-900">
            <Terminal className="w-4 h-4 text-indigo-600" />
            <span>Kroky experimentu:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-700">
            <li>
              Otevřete <strong>dvě samostatná okna PowerShellu</strong> a do každého vložte nekonečnou výpočetní smyčku:
              <code className="block mt-1 p-2 bg-slate-900 text-emerald-400 font-mono rounded-lg text-[11px]">
                while ($true) {'{'} $x = 1 + 1 {'}'}
              </code>
            </li>
            <li>
              Otevřete <strong>Správce úloh</strong> ➔ záložka <strong>Podrobnosti</strong>. Najděte oba procesy <code className="font-mono">powershell.exe</code>.
            </li>
            <li>
              U <strong>OBOU</strong> procesů klikněte pravým tlačítkem ➔ <strong>Nastavit spřažení (Set affinity)</strong> ➔ odškrtněte všechna jádra a zaškrtněte <strong>POUZE CPU 0</strong>.
            </li>
            <li>
              Přejděte do záložky <strong>Výkon ➔ Procesor</strong> ➔ klikněte pravým tlačítkem do grafu ➔ <strong>Změnit graf na ➔ Logické procesory</strong>. Uvidíte, jak jádro CPU 0 jede na 100 %.
            </li>
            <li>
              V záložce <strong>Podrobnosti</strong> změňte prioritu:
              <ul className="list-disc list-inside pl-4 mt-0.5 space-y-0.5 text-slate-600">
                <li>U prvního PowerShellu: pravý klik ➔ <strong>Nastavit prioritu ➔ Vysoká (High)</strong>.</li>
                <li>U druhého PowerShellu: pravý klik ➔ <strong>Nastavit prioritu ➔ Nízká (Idle / Below Normal)</strong>.</li>
              </ul>
            </li>
            <li>
              Sledujte rozdělení výkonu ve sloupci CPU a po ukončení experimentu smyčky zastavte stiskem <kbd className="font-mono bg-white px-1 border rounded">Ctrl + C</kbd> v obou oknech PowerShellu.
            </li>
          </ol>
        </div>

        {/* TABULKA VÝSLEDKŮ */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-800 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3 w-3/5">Zkoumaná metrika / Krok</th>
                <th className="p-3 w-2/5">Zjištěná hodnota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3 font-semibold text-slate-800">Počet logických procesorů (vláken) vašeho CPU</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t5_cpu_threads'] || ''}
                    onChange={(e) => handleAnswerChange('t5_cpu_threads', e.target.value)}
                    placeholder="např. 8, 12 nebo 16 vláken"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-purple-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Vypočtený strop 1 plného jádra (100 % / počet vláken)</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t5_core_cap'] || ''}
                    onChange={(e) => handleAnswerChange('t5_core_cap', e.target.value)}
                    placeholder="např. 8.3 % (při 12 vláknech) nebo 6.25 % (při 16 vláknech)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-purple-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Rozdělení CPU při stejné prioritě (oba Normální)</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t5_balanced_split'] || ''}
                    onChange={(e) => handleAnswerChange('t5_balanced_split', e.target.value)}
                    placeholder="např. cca 4.1 % / 4.1 % (dělí se napůl)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-purple-600 focus:outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Rozdělení CPU po změně priority (Vysoká vs. Nízká)</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={answers['t5_priority_split'] || ''}
                    onChange={(e) => handleAnswerChange('t5_priority_split', e.target.value)}
                    placeholder="např. Vysoká ~7.5 % vs. Nízká ~0.8 %"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:border-purple-600 focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Závěrečné zhodnocení: Jak se projevila priorita, když oba procesy soutěžily o TOTÉŽ jádro?
          </label>
          <textarea
            rows={2}
            value={answers['t5_conclusion'] || ''}
            onChange={(e) => handleAnswerChange('t5_conclusion', e.target.value)}
            placeholder="Když procesy běžely na stejném jádře CPU 0, plánovač Windows přidělil procesu s vysokou prioritou většinu času jádra (~80-90 %), zatímco proces s nízkou prioritou dostal jen zbytek..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:border-purple-600 focus:outline-none"
          />
        </div>
      </div>

    </div>
  );
};
