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

export const MessagesTasks4to6 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 4 */}
      <TaskCard
        number="4"
        title="Synchronní volání – Odpočet (Rozešli a čekej)"
        taskId="msg-4"
        saveAs="Odpocet.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Blok <code>rozešli zprávu [odpocet] a čekej</code> zastaví provádění skriptu v Tazateli až do okamžiku, kdy Počítadlo dokončí svůj cyklus 3, 2, 1.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Tazatele (Kocour):</div>
                <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="sensing">otázka [Mám zahájit odpočet?] a čekej</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">rozešli zprávu <ScratchInput type="dropdown">odpocet</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Odpočet skončil, můžeme začít!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Počítadla (druhá postava):</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">odpocet</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>3</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>3</ScratchInput> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="looks">bublina <ScratchReporter category="variables">i</ScratchReporter> na <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>-1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř program se dvěma postavami, který demonstruje synchronní čekání na dokončení jiné úlohy.
        </p>

        <ol className="list-decimal pl-5 space-y-2 my-4 text-sm text-slate-800">
          <li>Po kliknutí na hlavní postavu se postava zeptá: <em>„Mám zahájit odpočet?“</em> a odešle zprávu <span className="font-bold text-amber-600">odpocet a čekej</span>.</li>
          <li>Druhá postava po obdržení zprávy provede odpočet a postupně řekne: <em>3</em>, <em>2</em>, <em>1</em> (každé číslo na 1 s).</li>
          <li>Teprve až druhá postava celý odpočet dokončí, hlavní postava naváže a oznámí: <em>„Odpočet skončil, můžeme začít!“</em>.</li>
        </ol>
      </TaskCard>

      {/* ÚKOL 5 */}
      <TaskCard
        number="5"
        title="Stopky s řízením stavů (Start, Stop, Reset)"
        taskId="msg-5"
        saveAs="Stopky.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Tlačítka mění stav stopek odesláním zpráv. Kocour na ně reaguje spuštěním čítače, zastavením skriptu nebo vynulováním.
            </p>
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Kocoura (Část B – minuty a sekundy):</div>
              <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">start</ScratchInput></ScratchBlock></div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj stále</span>}>
                  <div className="pl-2 space-y-1">
                    <div><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                    <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">sekundy</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">sekundy</ScratchReporter> = <ScratchInput>60</ScratchInput></ScratchHexagon> tak</span>}>
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">sekundy</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">minuty</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                      </div>
                    </ScratchCBlock>
                  </div>
                </ScratchCBlock>
              </div>
              <div className="pt-2"><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">stop</ScratchInput></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="control">zastav [jiné scénáře postavy]</ScratchBlock></div>
              <div className="pt-2"><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">reset</ScratchInput></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="control">zastav [jiné scénáře postavy]</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">sekundy</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">minuty</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř stopky řízené třemi tlačítky (<strong>Start</strong>, <strong>Stop</strong>, <strong>Reset</strong>). Čas bude na obrazovce počítat kocour.
        </p>

        <div className="space-y-4 my-4 text-sm text-slate-800">
          <div>
            <span className="font-bold text-amber-800 block mb-1">Část A (Základ – počítání sekund):</span>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Tlačítko <strong>Start</strong> po kliknutí pošle zprávu <span className="font-bold text-amber-600">start</span> ➔ kocour v cyklu každou sekundu zvýší proměnnou <span className="font-bold text-orange-600">sekundy</span> o 1.</li>
              <li>Tlačítko <strong>Stop</strong> pošle zprávu <span className="font-bold text-amber-600">stop</span> ➔ kocour zastaví probíhající počítání (blok <em>zastav jiné scénáře postavy</em>).</li>
              <li>Tlačítko <strong>Reset</strong> pošle zprávu <span className="font-bold text-amber-600">reset</span> ➔ zastaví počítání a vynuluje proměnnou <span className="font-bold text-orange-600">sekundy</span> na 0.</li>
            </ol>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-amber-800 block mb-1">Část B (Rozšíření – minuty a sekundy):</span>
            <p className="text-slate-600 text-xs leading-relaxed">
              Přidej proměnnou <span className="font-bold text-orange-600">minuty</span>. Uprav kód tak, aby při dosažení 60 sekund skript vynuloval sekundy na 0 a přičetl 1 k minutám. Tlačítko Reset vynuluje obě proměnné.
            </p>
          </div>
        </div>
      </TaskCard>

      {/* ÚKOL 6 */}
      <TaskCard
        number="6"
        title="Architektura Klient – Server (API a databáze na pozadí)"
        taskId="msg-6"
        saveAs="KlientServer.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Klient pouze sbírá vstupy a posílá je přes sdílené proměnné. Server je samostatná postava, která vykoná výpočet nebo zápis do seznamu a výsledek vrátí v proměnné <code>odpoved_serveru</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Klienta (Terminál):</div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj stále</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="sensing">otázka [Zadej příkaz: cas / obsah_kruhu / uloz / konec] a čekej</ScratchBlock></div>
                      <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">prikaz</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">prikaz</ScratchReporter> = [obsah_kruhu]</ScratchHexagon> tak</span>}>
                        <div className="pl-2">
                          <ScratchBlock category="sensing">otázka [Zadej poloměr r:] a čekej</ScratchBlock>
                          <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr_vstup</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">prikaz</ScratchReporter> = [uloz]</ScratchHexagon> tak</span>}>
                        <div className="pl-2">
                          <ScratchBlock category="sensing">otázka [Zadej data pro uložení:] a čekej</ScratchBlock>
                          <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr_vstup</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <div><ScratchBlock category="events">rozešli zprávu <ScratchInput type="dropdown">zavolej_api</ScratchInput> a čekej</ScratchBlock></div>
                      <div><ScratchBlock category="looks">bublina <ScratchReporter category="variables">odpoved_serveru</ScratchReporter> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Serveru (Backend postava):</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zavolej_api</ScratchInput></ScratchBlock></div>
                <div className="pl-4 space-y-1">
                  <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">prikaz</ScratchReporter> = [cas]</ScratchHexagon> tak</span>}>
                    <div className="pl-2"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na <ScratchReporter category="sensing">aktuální sekunda</ScratchReporter></ScratchBlock></div>
                  </ScratchCBlock>
                  <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">prikaz</ScratchReporter> = [obsah_kruhu]</ScratchHexagon> tak</span>}>
                    <div className="pl-2"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na <ScratchReporter category="operators">3.14 * <ScratchReporter category="variables">parametr_vstup</ScratchReporter> * <ScratchReporter category="variables">parametr_vstup</ScratchReporter></ScratchReporter></ScratchBlock></div>
                  </ScratchCBlock>
                  <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">prikaz</ScratchReporter> = [uloz]</ScratchHexagon> tak</span>}>
                    <div className="pl-2">
                      <div><ScratchBlock category="lists">přidej <ScratchReporter category="variables">parametr_vstup</ScratchReporter> k <ScratchInput type="dropdown">databaze</ScratchInput></ScratchBlock></div>
                      <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">odpoved_serveru</ScratchInput> na [OK - záznam byl uložen do databáze]</ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
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
          Vytvoř dvě postavy: <strong>Klienta</strong> (uživatelské rozhraní) a <strong>Server</strong> (výpočetní backend na pozadí).
        </p>

        <ol className="list-decimal pl-5 space-y-2.5 my-4 text-sm text-slate-800">
          <li>
            Vytvoř proměnné pro komunikaci: <span className="font-bold text-amber-600">prikaz</span>, <span className="font-bold text-amber-600">parametr_vstup</span> a <span className="font-bold text-emerald-600">odpoved_serveru</span>. Na serveru vytvoř seznam <span className="font-bold text-orange-600">databaze</span>.
          </li>
          <li>
            <strong>Klient</strong> se v cyklu zeptá na příkaz (<em>cas</em>, <em>obsah_kruhu</em> nebo <em>uloz</em>), podle volby případně dovyžádá doplňující data do <span className="font-bold text-amber-600">parametr_vstup</span> a rozešle zprávu <span className="font-bold text-amber-600">zavolej_api a čekej</span>.
          </li>
          <li>
            <strong>Server</strong> po obdržení zprávy provede požadovanou službu:
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-700">
              <li>Příkaz <code>cas</code> ➔ do <span className="font-bold text-emerald-600">odpoved_serveru</span> vloží aktuální čas.</li>
              <li>Příkaz <code>obsah_kruhu</code> ➔ spočítá obsah ($3.14 \times r \times r$) a výsledek uloží do <span className="font-bold text-emerald-600">odpoved_serveru</span>.</li>
              <li>Příkaz <code>uloz</code> ➔ přidá hodnotu z <span className="font-bold text-amber-600">parametr_vstup</span> do seznamu <span className="font-bold text-orange-600">databaze</span> a do odpovědi zapíše potvrzení.</li>
            </ul>
          </li>
          <li>
            Klient po dokončení požadavku zobrazí obsah proměnné <span className="font-bold text-emerald-600">odpoved_serveru</span> v bublině.
          </li>
        </ol>
      </TaskCard>
    </div>
  );
};
