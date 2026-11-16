"use client";

import React from 'react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchCElseBlock,
  ScratchHexagon,
  ScratchReporter
} from '../ScratchBlocks';

export const MessagesTask7 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 7 */}
      <TaskCard
        number="7"
        title="Grafická kalkulačka se seznamem (Tokenizace výrazu)"
        taskId="msg-7"
        saveAs="Kalkulacka.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              <strong>Princip (Tokenizace a vyhodnocení výrazu):</strong> Tlačítka číslic postupně skládají znaky do bufferu <code>aktualni_vstup</code>. Tlačítka operátorů vloží číslo i operátor do seznamu <code>vyraz</code>. Tlačítko <code>=</code> pošle zprávu <code>vyhodnot</code> kocourovi, který se podívá na operátor na 2. pozici a provede výpočet mezi 1. a 3. položkou.
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
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Kocoura (Vyhodnocení výrazu):</div>
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
          Při tvorbě reálných aplikací a kalkulaček se jednotlivé stisknuté klávesy skládají do textové vyrovnávací paměti (bufferu).
          Teprve po stisku operátoru se hodnota „uzavře“ a uloží do seznamu jako samostatný prvek (tzv. <em>token</em>).
          Vytvoř grafickou kalkulačku řízenou zprávami a seznamem:
        </p>

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
