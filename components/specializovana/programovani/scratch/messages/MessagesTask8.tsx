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

export const MessagesTask8 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 8 */}
      <TaskCard
        number="8"
        title="Architektura Klient – Server (API a databáze na pozadí)"
        taskId="msg-8"
        saveAs="KlientServer.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Klient sbírá vstupy od uživatele, předává je v proměnné <code>parametr</code> a volá příslušnou zprávu. Server zpracuje požadavek a výsledek vrátí do jednotné proměnné <code>odpoved_serveru</code>. Pokud klient příkaz nezná, větev <em>jinak</em> vypíše chybu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Klienta (Terminál / Uživatelské rozhraní):</div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj stále</span>}>
                    <div className="pl-2 space-y-2">
                      <div><ScratchBlock category="sensing">otázka [Zadej příkaz: vrat cas / obsah kruhu / uloz] a čekej</ScratchBlock></div>
                      
                      {/* Větvící se strom když - jinak s ošetřením neznámého příkazu */}
                      <ScratchCElseBlock
                        category="control"
                        topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [vrat cas]</ScratchHexagon> tak</span>}
                        elseChildren={
                          <div className="pl-2">
                            <ScratchCElseBlock
                              category="control"
                              topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [obsah kruhu]</ScratchHexagon> tak</span>}
                              elseChildren={
                                <div className="pl-2">
                                  <ScratchCElseBlock
                                    category="control"
                                    topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [uloz]</ScratchHexagon> tak</span>}
                                    elseChildren={
                                      <div className="pl-2">
                                        <ScratchBlock category="looks">bublina [Neznámý příkaz!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                                      </div>
                                    }
                                  >
                                    <div className="pl-2 space-y-1">
                                      <div><ScratchBlock category="sensing">otázka [Zadej data pro uložení:] a čekej</ScratchBlock></div>
                                      <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                                      <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">uloz</ScratchInput> a čekej</ScratchBlock></div>
                                      <div><ScratchBlock category="looks">bublina <ScratchReporter category="variables">odpoved_serveru</ScratchReporter> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                                    </div>
                                  </ScratchCElseBlock>
                                </div>
                              }
                            >
                              <div className="pl-2 space-y-1">
                                <div><ScratchBlock category="sensing">otázka [Zadej poloměr r:] a čekej</ScratchBlock></div>
                                <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                                <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">obsah kruhu</ScratchInput> a čekej</ScratchBlock></div>
                                <div><ScratchBlock category="looks">bublina (spoj [Obsah kruhu je: ] <ScratchReporter category="variables">odpoved_serveru</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                              </div>
                            </ScratchCElseBlock>
                          </div>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">vrat cas</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="looks">bublina (spoj [Aktuální čas: ] <ScratchReporter category="variables">odpoved_serveru</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        </div>
                      </ScratchCElseBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 1 (Vrať čas)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">vrat cas</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na <ScratchReporter category="sensing">aktuální sekunda</ScratchReporter></ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 2 (Výpočet obsahu kruhu)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">obsah kruhu</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na <ScratchReporter category="operators">3.14 * <ScratchReporter category="variables">parametr</ScratchReporter> * <ScratchReporter category="variables">parametr</ScratchReporter></ScratchReporter></ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 3 (Zápis do databáze)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">uloz</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchReporter category="variables">parametr</ScratchReporter> k <ScratchInput type="dropdown">databaze</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na [OK - uloženo do databáze]</ScratchBlock></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 mb-4 text-xs text-slate-700 leading-relaxed">
          <strong className="text-amber-900 block mb-1">💡 Proč model Klient – Server?</strong>
          V reálném IT světě aplikace na vašem mobilu (klient) neprovádí složité výpočty ani v sobě nemá uložena všechna data. Místo toho odešle požadavek na vzdálený počítač (server), který požadavek zpracuje, uloží do databáze a vrátí odpověď. Tento princip si nyní nasimulujeme pomocí dvou postav a zpráv!
        </div>

        <p className="leading-relaxed">
          Vytvoř dvě postavy: <strong>Klienta</strong> (uživatelské rozhraní) a <strong>Server</strong> (výpočetní backend na pozadí). Úlohu řeš postupně ve třech fázích:
        </p>

        <div className="space-y-4 my-4 text-sm text-slate-800">
          {/* FÁZE 1 */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Fáze 1 (Základ – dotaz na čas a ošetření chyb):
            </span>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Klient si nejprve připraví proměnnou <span className="font-bold text-emerald-600">odpoved_serveru</span> pro příjem odpovědí od serveru.</li>
              <li>Klient se pomocí bloku otázka zeptá na příkaz: <em>„Zadej příkaz: vrat cas / obsah kruhu / uloz“</em>.</li>
              <li>Pokud je zadaný příkaz <span className="font-bold text-amber-600">vrat cas</span>, pošle zprávu <span className="font-bold text-amber-600">vrat cas a čekej</span>.</li>
              <li>Postava Server po obdržení zprávy nastaví proměnnou <span className="font-bold text-emerald-600">odpoved_serveru</span> na aktuální čas (např. na blok <em>aktuální sekunda</em>).</li>
              <li>Klient po návratu řízení vypíše obsah proměnné <span className="font-bold text-emerald-600">odpoved_serveru</span> v bublině.</li>
              <li>Pokud klient příkaz nerozpoznal (větev <em>jinak</em>), vypíše: <em>„Neznámý příkaz!“</em>.</li>
            </ol>
          </div>

          {/* FÁZE 2 */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Fáze 2 (Výpočetní služba s parametrem – obsah kruhu):
            </span>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Klient si musí vytvořit novou proměnnou <span className="font-bold text-amber-600">parametr</span>, aby mohl serveru předat vstupní hodnotu pro výpočet.</li>
              <li>Pokud je zadán příkaz <span className="font-bold text-amber-600">obsah kruhu</span>, Klient se zeptá na poloměr: <em>„Zadej poloměr r:“</em> a odpověď uloží do proměnné <span className="font-bold text-amber-600">parametr</span>.</li>
              <li>Klient vyšle zprávu <span className="font-bold text-amber-600">obsah kruhu a čekej</span>.</li>
              <li>Server provede výpočet (3.14 * parametr * parametr), výsledek uloží do proměnné <span className="font-bold text-emerald-600">odpoved_serveru</span> a Klient jej po dokončení vypíše.</li>
            </ol>
          </div>

          {/* FÁZE 3 */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Fáze 3 (Rozšíření serveru o databázi a zápis dat):
            </span>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Na straně Serveru vytvoř lokální seznam <span className="font-bold text-orange-600">databaze</span>.</li>
              <li>Pokud je zadán příkaz <span className="font-bold text-amber-600">uloz</span>, Klient se zeptá na data k uložení, vstup uloží do proměnné <span className="font-bold text-amber-600">parametr</span> a vyšle zprávu <span className="font-bold text-amber-600">uloz a čekej</span>.</li>
              <li>Server po obdržení zprávy přidá hodnotu proměnné <span className="font-bold text-amber-600">parametr</span> do seznamu <span className="font-bold text-orange-600">databaze</span> a do proměnné <span className="font-bold text-emerald-600">odpoved_serveru</span> nastaví potvrzení <em>„OK - uloženo do databáze“</em>.</li>
              <li>Klient po dokončení volání vypíše odpověď z proměnné <span className="font-bold text-emerald-600">odpoved_serveru</span> v bublině.</li>
            </ol>
          </div>
        </div>
      </TaskCard>
    </div>
  );
};
