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
        title="Synchronní volání – Bezpečné vypnutí OS (Graceful Shutdown)"
        taskId="msg-4"
        saveAs="VypnutiOS.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Řídicí modul postupně volá blokem <code>vyšli zprávu [...] a čekej</code> jednotlivé subsystémy. Každý další krok může nastat až ve chvíli, kdy předchozí modul potvrdí dokončení své činnosti.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">1. Správce napájení (Power Manager):</div>
                <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Zahajuji bezpečné vypínání OS...] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">ukonci_aplikace</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">zapis_cache</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">odpoj_napajeni</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Systém je bezpečně vypnut.] na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
              </div>

              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">2. Modul Aplikace:</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">ukonci_aplikace</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="looks">bublina [Ukládám data a ukončuji procesy...] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">3. Modul Disk:</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zapis_cache</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="looks">bublina [Zapisuji cache z RAM na disk a odpojuji svazek...] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">4. Modul Napájení (ACPI):</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">odpoj_napajeni</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="looks">bublina [ACPI: Odpojuji napájení základní desky...] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Při vypínání operačního systému nelze počítač okamžitě odpojit od elektřiny, aby nedošlo ke ztrátě dat nebo poškození disku.
          Vytvoř program simulující <strong>třífázové bezpečné vypnutí OS</strong> pomocí synchronních zpráv:
        </p>

        <ol className="list-decimal pl-5 space-y-2.5 my-4 text-sm text-slate-800">
          <li>
            Vytvoř hlavní řídicí postavu (např. <strong>Správce napájení</strong>) a tři subsystémy: <strong>Modul aplikací</strong>, <strong>Modul disku</strong> a <strong>Modul ACPI</strong>.
          </li>
          <li>
            Po kliknutí na Správce napájení postava oznámí: <em>„Zahajuji bezpečné vypínání OS...“</em> (na 2 s).
          </li>
          <li>
            Následně postupně pomocí zpráv s čekáním (<strong>vyšli zprávu ... a čekej</strong>) vyvolá tyto 3 kroky v přesném pořadí:
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-700">
              <li>1. Zpráva <span className="font-bold text-amber-600">ukonci_aplikace</span> ➔ Modul aplikací ohlásí uložení dat a ukončení běžících procesů (na 2 s).</li>
              <li>2. Zpráva <span className="font-bold text-amber-600">zapis_cache</span> ➔ Modul disku zapíše data z vyrovnávací paměti RAM na disk a odpojí svazek (na 2 s).</li>
              <li>3. Zpráva <span className="font-bold text-amber-600">odpoj_napajeni</span> ➔ Modul ACPI pošle signál k vypnutí napájení desky (na 2 s).</li>
            </ul>
          </li>
          <li>
            Teprve po řádném dokončení všech tří fází Správce napájení proces uzavře větou: <em>„Systém je bezpečně vypnut.“</em> (na 3 s).
          </li>
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
              <strong>Princip:</strong> Klient pouze sbírá vstupy od uživatele, ukládá argumenty do sdílené proměnné <code>parametr</code> a volá příslušné zprávy. Server je samostatná postava, která má pro každou službu vlastní obslužný klobouček <code>po obdržení zprávy [...]</code> a výsledek vrací v proměnné.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář Klienta (Terminál / Uživatelské rozhraní):</div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj stále</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="sensing">otázka [Zadej příkaz: vrat cas / obsah kruhu / uloz] a čekej</ScratchBlock></div>
                      
                      {/* 1. vrat cas */}
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [vrat cas]</ScratchHexagon> tak</span>}>
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">vrat cas</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="looks">bublina (spoj [Aktuální čas: ] <ScratchReporter category="variables">cas</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        </div>
                      </ScratchCBlock>

                      {/* 2. obsah kruhu */}
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [obsah kruhu]</ScratchHexagon> tak</span>}>
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="sensing">otázka [Zadej poloměr r:] a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                          <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">obsah kruhu</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="looks">bublina (spoj [Obsah kruhu je: ] <ScratchReporter category="variables">vysledek</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        </div>
                      </ScratchCBlock>

                      {/* 3. uloz */}
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="sensing">odpověď</ScratchReporter> = [uloz]</ScratchHexagon> tak</span>}>
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="sensing">otázka [Zadej data pro uložení:] a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">parametr</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                          <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">uloz</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="looks">bublina <ScratchReporter category="variables">vysledek</ScratchReporter> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        </div>
                      </ScratchCBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 1 (Vrať čas)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">vrat cas</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">cas</ScratchInput> na <ScratchReporter category="sensing">aktuální sekunda</ScratchReporter></ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 2 (Výpočet obsahu kruhu)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">obsah kruhu</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vysledek</ScratchInput> na <ScratchReporter category="operators">3.14 * <ScratchReporter category="variables">parametr</ScratchReporter> * <ScratchReporter category="variables">parametr</ScratchReporter></ScratchReporter></ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Server: Služba 3 (Zápis do databáze)</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">uloz</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchReporter category="variables">parametr</ScratchReporter> k <ScratchInput type="dropdown">databaze</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vysledek</ScratchInput> na [OK - uloženo do databáze]</ScratchBlock></div>
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
              Fáze 1 (Základ – dotaz na čas):
            </span>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Klient se zeptá na příkaz: <em>„Zadej příkaz: vrat cas / obsah kruhu / uloz“</em>.</li>
              <li>Pokud uživatel zadá <span className="font-bold text-amber-600">vrat cas</span>, Klient vyšle zprávu <span className="font-bold text-amber-600">vrat cas a čekej</span>.</li>
              <li>Server po obdržení této zprávy nastaví proměnnou <span className="font-bold text-emerald-600">cas</span> (např. na blok <em>aktuální sekunda</em>).</li>
              <li>Klient po návratu řízení vypíše obsah proměnné <span className="font-bold text-emerald-600">cas</span> v bublině.</li>
            </ol>
          </div>

          {/* FÁZE 2 */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-amber-800 block mb-1.5 text-xs uppercase tracking-wide">
              Fáze 2 (Výpočetní úloha s parametrem – obsah kruhu):
            </span>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Vytvoř novou proměnnou <span className="font-bold text-amber-600">parametr</span> a proměnnou <span className="font-bold text-emerald-600">vysledek</span>.</li>
              <li>Pokud je zadán příkaz <span className="font-bold text-amber-600">obsah kruhu</span>, Klient se zeptá na poloměr: <em>„Zadej poloměr r:“</em> a odpověď uloží do proměnné <span className="font-bold text-amber-600">parametr</span>.</li>
              <li>Klient vyšle zprávu <span className="font-bold text-amber-600">obsah kruhu a čekej</span>.</li>
              <li>Server provede výpočet (3.14 * parametr * parametr), výsledek uloží do proměnné <span className="font-bold text-emerald-600">vysledek</span> a Klient jej po dokončení vypíše.</li>
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
              <li>Server po obdržení zprávy přidá hodnotu proměnné <span className="font-bold text-amber-600">parametr</span> do seznamu <span className="font-bold text-orange-600">databaze</span> a do proměnné <span className="font-bold text-emerald-600">vysledek</span> nastaví potvrzení <em>„OK - uloženo do databáze“</em>.</li>
              <li>Klient po dokončení volání vypíše odpověď z proměnné <span className="font-bold text-emerald-600">vysledek</span> v bublině.</li>
            </ol>
          </div>
        </div>
      </TaskCard>
    </div>
  );
};
