"use client";

import React from 'react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchCElseBlock,
  ScratchHexagon,
  ScratchReporter,
  ScratchSpeechBubble
} from '../ScratchBlocks';

export const MessagesTask7 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 7 */}
      <TaskCard
        number="7"
        title="Grafická kalkulačka se seznamem"
        taskId="msg-7"
        saveAs="Kalkulacka.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Tlačítka číslic postupně skládají číslo do proměnné <code>aktualni_vstup</code>. Tlačítka <code>+</code> a <code>-</code> vloží zadané číslo i znaménko do seznamu <code>vyraz</code>. Tlačítko <code>=</code> pošle zprávu kocourovi, který spočítá výsledek a řekne ho v bublině.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              {/* Tlačítko číslice a tlačítko + */}
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Tlačítka číslic (např. Tlačítko 1):</div>
                  <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchBlock category="variables">
                      nastav <ScratchInput type="dropdown">aktualni_vstup</ScratchInput> na (spoj <ScratchReporter category="variables">aktualni_vstup</ScratchReporter> [1])
                    </ScratchBlock>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Tlačítko operátoru (+ nebo -):</div>
                  <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchReporter category="variables">aktualni_vstup</ScratchReporter> k <ScratchInput type="dropdown">vyraz</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [+] k <ScratchInput type="dropdown">vyraz</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">aktualni_vstup</ScratchInput> na []</ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Tlačítko rovná se (=):</div>
                  <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchReporter category="variables">aktualni_vstup</ScratchReporter> k <ScratchInput type="dropdown">vyraz</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">vyhodnot</ScratchInput> a čekej</ScratchBlock></div>
                </div>
              </div>

              {/* Scénář Kocoura (Mozek kalkulačky) */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Kocoura (Vyhodnocení příkladu):</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">vyhodnot</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    topLabel={<span>když <ScratchHexagon category="operators">(položka <ScratchInput>2</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>) = [+]</ScratchHexagon> tak</span>}
                    elseChildren={
                      <div className="pl-2">
                        <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators">(položka <ScratchInput>2</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>) = [-]</ScratchHexagon> tak</span>}>
                          <div className="pl-2">
                            <ScratchBlock category="variables">
                              nastav <ScratchInput type="dropdown">vysledek</ScratchInput> na ((položka <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>) - (položka <ScratchInput>3</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>))
                            </ScratchBlock>
                          </div>
                        </ScratchCBlock>
                      </div>
                    }
                  >
                    <div className="pl-2">
                      <ScratchBlock category="variables">
                        nastav <ScratchInput type="dropdown">vysledek</ScratchInput> na ((položka <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>) + (položka <ScratchInput>3</ScratchInput> z <ScratchInput type="dropdown">vyraz</ScratchInput>))
                      </ScratchBlock>
                    </div>
                  </ScratchCElseBlock>
                </div>
                <div className="pl-4 pt-1">
                  <ScratchBlock category="looks">
                    bublina (spoj [Výsledek je: ] <ScratchReporter category="variables">vysledek</ScratchReporter>) na <ScratchInput>3</ScratchInput> sekund
                  </ScratchBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">vyraz</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">aktualni_vstup</ScratchInput> na []</ScratchBlock></div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř jednoduchou kalkulačku s klikacími tlačítky na obrazovce. Zadaná čísla a znaménko se budou postupně ukládat do seznamu a po stisku tlačítka rovná se kocour příklad spočítá:
        </p>

        {/* Vizuální náhled scény kalkulačky */}
        <div className="my-5 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Ukázka scény kalkulačky ve Scratchi:</span>
            <span className="text-[11px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">12 + 5 = 17</span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
            {/* Levá část: Monitory proměnné a seznamu */}
            <div className="flex flex-col gap-3">
              {/* Monitor proměnné */}
              <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-400 rounded-md px-2.5 py-1 text-xs font-mono font-bold text-orange-950 shadow-xs">
                <span>aktualni_vstup</span>
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[11px]">5</span>
              </div>

              {/* Monitor seznamu vyraz */}
              <div className="w-36 bg-white border-2 border-orange-400 rounded-lg overflow-hidden shadow-sm text-xs font-mono">
                <div className="bg-orange-500 text-white font-bold px-2 py-1 text-[11px] flex justify-between items-center">
                  <span>vyraz</span>
                  <span className="text-[10px] opacity-80 font-normal">seznam</span>
                </div>
                <div className="divide-y divide-orange-100">
                  <div className="px-2 py-1 flex items-center gap-2 bg-orange-50/40">
                    <span className="text-slate-400 text-[10px]">1</span>
                    <span className="font-bold text-slate-800">12</span>
                  </div>
                  <div className="px-2 py-1 flex items-center gap-2 bg-amber-50/60">
                    <span className="text-slate-400 text-[10px]">2</span>
                    <span className="font-bold text-amber-700">+</span>
                  </div>
                  <div className="px-2 py-1 flex items-center gap-2 bg-orange-50/40">
                    <span className="text-slate-400 text-[10px]">3</span>
                    <span className="font-bold text-slate-800">5</span>
                  </div>
                </div>
                <div className="bg-slate-50 border-t border-orange-200 px-2 py-0.5 text-[10px] text-slate-500 text-right">
                  délka: 3
                </div>
              </div>
            </div>

            {/* Střed: Tlačítka kalkulačky (Postavy) */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tlačítka (Postavy)</span>
              <div className="grid grid-cols-4 gap-2 bg-slate-100 p-3 rounded-2xl border border-slate-200 shadow-inner">
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '='].map((btn) => {
                  const isOp = btn === '+' || btn === '-';
                  const isEq = btn === '=';
                  return (
                    <div
                      key={btn}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm select-none border-b-2 ${
                        isEq
                          ? 'bg-emerald-500 text-white border-emerald-700'
                          : isOp
                          ? 'bg-amber-500 text-white border-amber-700'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      {btn}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pravá část: Kocour s bublinou */}
            <div className="flex flex-col items-center relative pt-2">
              <div className="mb-2">
                <ScratchSpeechBubble>Výsledek je: 17</ScratchSpeechBubble>
              </div>
              
              {/* Kocour SVG */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  {/* Uši */}
                  <polygon points="20,40 10,15 38,25" fill="#f59e0b" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="18,34 14,20 32,26" fill="#fde68a" />
                  <polygon points="80,40 90,15 62,25" fill="#f59e0b" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="82,34 86,20 68,26" fill="#fde68a" />
                  {/* Tělo */}
                  <ellipse cx="50" cy="72" rx="24" ry="22" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  <ellipse cx="50" cy="74" rx="14" ry="14" fill="#ffffff" />
                  {/* Hlava */}
                  <ellipse cx="50" cy="46" rx="28" ry="22" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  {/* Čumáček bílý */}
                  <ellipse cx="50" cy="52" rx="16" ry="11" fill="#ffffff" />
                  {/* Oči */}
                  <ellipse cx="38" cy="40" rx="6" ry="8" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  <circle cx="39" cy="40" r="3.5" fill="#1e293b" />
                  <circle cx="41" cy="38" r="1.2" fill="#ffffff" />
                  <ellipse cx="62" cy="40" rx="6" ry="8" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  <circle cx="61" cy="40" r="3.5" fill="#1e293b" />
                  <circle cx="63" cy="38" r="1.2" fill="#ffffff" />
                  {/* Nos a pusa */}
                  <polygon points="50,49 47,46 53,46" fill="#0f172a" />
                  <path d="M47 51 Q50 54 53 51" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Vousky */}
                  <line x1="22" y1="48" x2="33" y2="49" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="53" x2="32" y2="52" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="78" y1="48" x2="67" y2="49" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="80" y1="53" x2="68" y2="52" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 my-4 text-sm text-slate-800">
          {/* ČÁST A */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Část A (Základ – číslice a sčítání +):
            </span>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li>
                Připrav proměnnou <span className="font-bold text-amber-600">aktualni_vstup</span> (text) a seznam <span className="font-bold text-orange-600">vyraz</span>.
              </li>
              <li>
                Vytvoř tlačítka pro číslice (např. 1, 2, 3 nebo 0 až 9). Po kliknutí na číslici se její hodnota napojí na konec proměnné <span className="font-bold text-amber-600">aktualni_vstup</span> pomocí bloku <em>spoj</em>.
              </li>
              <li>
                Vytvoř tlačítko <strong>+</strong>: po kliknutí přidá <span className="font-bold text-amber-600">aktualni_vstup</span> do seznamu <span className="font-bold text-orange-600">vyraz</span>, poté přidá položku <code>+</code> a proměnnou <span className="font-bold text-amber-600">aktualni_vstup</span> vyprázdní (nastaví na prázdný text).
              </li>
              <li>
                Vytvoř tlačítko <strong>=</strong>: po kliknutí přidá druhé zadané číslo (<span className="font-bold text-amber-600">aktualni_vstup</span>) do seznamu <span className="font-bold text-orange-600">vyraz</span> a vyšle zprávu <span className="font-bold text-amber-600">vyhodnot a čekej</span>.
              </li>
              <li>
                Postava Kocoura po obdržení zprávy <code>vyhodnot</code> sečte 1. a 3. položku ze seznamu a výsledek oznámí v bublině: <em>„Výsledek je: [vysledek]“</em> (na 3 s).
              </li>
            </ol>
          </div>

          {/* ČÁST B */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Část B (Rozšíření – tlačítko - a vyhodnocení operátoru):
            </span>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li>
                Přidej tlačítko <strong>-</strong>: po kliknutí uloží <span className="font-bold text-amber-600">aktualni_vstup</span> do seznamu, přidá položku <code>-</code> a proměnnou vyprázdní.
              </li>
              <li>
                Uprav scénář Kocoura: před výpočtem zkontroluje 2. položku v seznamu <span className="font-bold text-orange-600">vyraz</span>.
                Pokud je na 2. pozici <code>+</code>, čísla sečte; pokud je tam <code>-</code>, provede odčítání.
              </li>
              <li>
                Po zobrazení výsledku kocour seznam <span className="font-bold text-orange-600">vyraz</span> i proměnnou <span className="font-bold text-amber-600">aktualni_vstup</span> promaže pro další výpočet.
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
          💡 <strong>Tip pro rychlou tvorbu tlačítek:</strong> Nemusíte kreslit každou číslici zvlášť! Vytvořte jedno tlačítko, klikněte na něj v seznamu postav pravým tlačítkem a zvolte <em>Duplikovat</em>. V duplikátu pak stačí jen přepsat číslo v kostýmu i ve skriptu.
        </div>
      </TaskCard>
    </div>
  );
};
