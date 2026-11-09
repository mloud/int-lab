"use client";

import React from 'react';
import {
  Database,
  ListPlus,
  Trash2,
  Search,
  Dices,
  Trophy,
  Sparkles,
  ShoppingBag,
  Backpack,
  ShieldCheck,
  Calculator,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchReporter,
  ScratchDefBlock,
  ScratchParam,
  ScratchSpeechBubble
} from '../ScratchBlocks';

export const ListsTasks1to6 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
        {/* ÚKOL 1 */}
        <TaskCard
          number="1"
          title="Nákupní seznam a inicializace dat"
          taskId="lists-1"
          saveAs="NakupniSeznam.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Zlaté pravidlo seznamů:</strong> Seznamy v prostředí Scratch zůstávají uloženy i po zastavení programu (uchovávají svůj stav).
                Pokud na začátek scénáře nedáme blok <ScratchBlock category="lists">smaž všechno z [seznam]</ScratchBlock>,
                při každém novém stisku zelené vlajky se seznam nafoukne o další 4 položky.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Chléb</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Mléko</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Máslo</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Jablka</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Seznam je připraven!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř program, který po startu připraví nákupní lístek do obchodu.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>V kategorii <strong>Proměnné</strong> klikni na tlačítko <em>„Vytvoř seznam“</em> a pojmenuj jej <span className="font-bold text-orange-600">nákup</span>. Na scéně se objeví tabulka.</li>
            <li>Po kliknutí na zelenou vlajku zajisti, aby se seznam nejprve úplně vyprázdnil blokem <ScratchBlock category="lists">smaž všechno z [nákup]</ScratchBlock>.</li>
            <li>Následně pomocí bloků <ScratchBlock category="lists">přidej [text] k [nákup]</ScratchBlock> vlož do seznamu 4 položky: <strong>Chléb</strong>, <strong>Mléko</strong>, <strong>Máslo</strong> a <strong>Jablka</strong>.</li>
            <li>Kocour na závěr oznámí: <em>„Máme nákupní seznam se 4 položkami!“</em>.</li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3 text-xs text-amber-900">
            💡 <strong>Otázka k zamyšlení:</strong> Co by se stalo, kdybys blok <code>smaž všechno z nákup</code> vynechal a kliknul na zelenou vlajku třikrát za sebou? Vyzkoušej to!
          </div>
        </TaskCard>

        {/* ÚKOL 2 */}
        <TaskCard
          number="2"
          title="Interaktivní sběr položek do batohu"
          taskId="lists-2"
          saveAs="BatohHrace.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Zde propojujeme dotazování <ScratchBlock category="sensing">zeptej se [] a čekej</ScratchBlock> s blokem <ScratchReporter category="sensing">odpověď</ScratchReporter> a vkládáním do seznamu.
                Využití cyklu učí žáka opakovanému volání téže sekvence.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">batoh</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>3</ScratchInput> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Co chceš sbalit do batohu?</ScratchInput> a čekej</ScratchBlock></div>
                      <div><ScratchBlock category="lists">přidej <ScratchReporter category="sensing">odpověď</ScratchReporter> k <ScratchInput type="dropdown">batoh</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (spoj [V batohu máš ] a (spoj <ScratchReporter category="lists">délka [batoh]</ScratchReporter> [ věci!])) na <ScratchInput>3</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř herní inventář, do kterého hráč sám zadává předměty, které si chce vzít na výpravu.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">batoh</span> a při startu jej vymaž.</li>
            <li>Pomocí cyklu <ScratchBlock category="control">opakuj (3) krát</ScratchBlock> se třikrát zeptej uživatele: <em>„Co chceš sbalit do batohu?“</em>.</li>
            <li>Každou zadanou hodnotu z <ScratchReporter category="sensing">odpověď</ScratchReporter> přidej do seznamu batohu.</li>
            <li>Po skončení cyklu kocour řekne celkový počet věcí v batohu pomocí bloku <ScratchReporter category="lists">délka [batoh]</ScratchReporter>.</li>
          </ol>
        </TaskCard>

        {/* ÚKOL 3 */}
        <TaskCard
          number="3"
          title="Použití předmětu a automatické posouvání indexů"
          taskId="lists-3"
          saveAs="InventarLektvaru.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Zásadní vlastnost Scratch seznamů:</strong> Když smažeme položku na pozici 1,
                druhá položka v pořadí se automaticky posune na pozici 1, třetí na pozici 2 atd.
                V seznamu nevznikají žádné „díry“.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po stisku klávesy [mezerník]</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    condition={<ScratchHexagon category="operators"><ScratchReporter category="lists">délka [lektvary]</ScratchReporter> &gt; <ScratchInput>0</ScratchInput></ScratchHexagon>}
                    elseChildren={
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina [Už nemáš žádné lektvary!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    }
                  >
                    <div className="pl-2 space-y-1">
                      <div>
                        <ScratchBlock category="looks">
                          bublina (spoj [Vypil jsi: ] <ScratchReporter category="lists">položka [1] z [lektvary]</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                        </ScratchBlock>
                      </div>
                      <div>
                        <ScratchBlock category="lists">smaž <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">lektvary</ScratchInput></ScratchBlock>
                      </div>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            V dobrodružných hrách hrdina spotřebovává zásoby. Vyzkoušej si, jak funguje mazání položek a jak na něj seznam reaguje.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">lektvary</span> a při startu do něj vlož 4 položky: <em>Léčivý lektvar</em>, <em>Lektvar síly</em>, <em>Lektvar neviditelnosti</em> a <em>Mana lektvar</em>.</li>
            <li>Vytvoř scénář <ScratchBlock category="events">po stisku klávesy [mezerník]</ScratchBlock>:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Pokud je v seznamu alespoň 1 lektvar (<ScratchReporter category="lists">délka [lektvary]</ScratchReporter> &gt; 0), kocour řekne: <em>„Vypil jsi: [položka 1 z lektvary]“</em>.</li>
              <li>Následně smaž první položku blokem <ScratchBlock category="lists">smaž (1) z [lektvary]</ScratchBlock>.</li>
              <li>Pokud je seznam už prázdný, kocour oznámí: <em>„Nemáš žádné lektvary!“</em>.</li>
            </ul>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3 text-xs text-amber-900">
            🔍 <strong>Sleduj tabulku na obrazovce:</strong> Stiskni mezerník. Který lektvar se stal novou položkou č. 1?
          </div>
        </TaskCard>

        {/* ÚKOL 4 */}
        <TaskCard
          number="4"
          title="VIP Vstupní brána – Test přítomnosti v seznamu"
          taskId="lists-4"
          saveAs="VipBrana.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Blok <ScratchHexagon category="lists">[seznam] obsahuje [věc]?</ScratchHexagon> vrací pravdu (true) nebo nepravdu (false).
                Nahrazuje složité procházení cyklem a je ideální pro rychlou kontrolu oprávnění, přihlášení či hesla.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Jak se jmenuješ?</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    condition={<ScratchHexagon category="lists"><ScratchInput type="dropdown">VIP_hosté</ScratchInput> obsahuje <ScratchReporter category="sensing">odpověď</ScratchReporter>?</ScratchHexagon>}
                    elseChildren={
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="looks">bublina [Bohužel, tvé jméno na seznamu hostů není!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        <div><ScratchBlock category="looks">změň efekt [duch] o <ScratchInput>25</ScratchInput></ScratchBlock></div>
                      </div>
                    }
                  >
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="looks">bublina [Vítej v klubu, jsi na VIP seznamu!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                      <div><ScratchBlock category="looks">převlek na <ScratchInput type="dropdown">kostým2</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř vyhazovače před klubem, který zkontroluje, zda má návštěvník VIP pozvánku.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">VIP_hosté</span> a vlož do něj 4 jména (např. <em>Petr</em>, <em>Jana</em>, <em>Adam</em>, <em>Tereza</em>).</li>
            <li>Postava ochranky se zeptá: <em>„Jak se jmenuješ?“</em> a počká na vstup.</li>
            <li>Pomocí podmínky <ScratchBlock category="control">když - tak - jinak</ScratchBlock> a bloku <ScratchHexagon category="lists">[VIP_hosté] obsahuje (odpověď)?</ScratchHexagon> ověř:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li><strong>Pokud jméno v seznamu je:</strong> postava tě vřele přivítá: <em>„Vítej, jsi na seznamu hostů!“</em>.</li>
              <li><strong>Pokud jméno v seznamu není:</strong> postava tě odmítne: <em>„Vstup zakázán, nemáš rezervaci!“</em>.</li>
            </ul>
          </ol>
        </TaskCard>

        {/* ÚKOL 5 */}
        <TaskCard
          number="5"
          title="Náhodný výběr čísla ze seznamu"
          taskId="lists-5"
          saveAs="NahodnyVyber.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Místo pevného čísla pozice vložíme do oválu položky blok náhody:
                <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do (<ScratchReporter category="lists">délka [čísla]</ScratchReporter>)</ScratchReporter>.
                Tento kód je plně dynamický – když do seznamu přidáme další čísla, nemusíme v kódu změnit ani jeden blok!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na postavu</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Vylosované číslo je...] na <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (položka (náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchReporter category="lists">délka [čísla]</ScratchReporter>) z <ScratchInput type="dropdown">čísla</ScratchInput>) na <ScratchInput>3</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř losovací program, který po kliknutí na postavu náhodně vybere a vysloví jedno číslo ze seznamu.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">čísla</span> a vlož do něj alespoň 6 různých čísel (např. <em>12, 25, 38, 44, 71, 99</em>).</li>
            <li>Nastav událost <ScratchBlock category="events">po kliknutí na tuto postavu</ScratchBlock>.</li>
            <li>Postava nejprve řekne: <em>„Vylosované číslo je...“</em>.</li>
            <li>Následně postava vysloví náhodně vybrané číslo ze seznamu.</li>
          </ol>
        </TaskCard>

        {/* ÚKOL 6 */}
        <TaskCard
          number="6"
          title="Procházení seznamu cyklem – Čtečka zpráv"
          taskId="lists-6"
          saveAs="CtenarSeznamu.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Základní programátorský vzor (Traverzování pole):</strong> Nastavíme index <ScratchReporter category="variables">i = 1</ScratchReporter>,
                v cyklu přečteme <ScratchReporter category="lists">položka (i) z [seznam]</ScratchReporter> a zvýšíme <ScratchBlock category="variables">změň [i] o 1</ScratchBlock>.
                Přesně tento princip se používá v každém programovacím jazyce na světě!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [zprávy]</ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div>
                        <ScratchBlock category="looks">
                          bublina (položka <ScratchReporter category="variables">i</ScratchReporter> z <ScratchInput type="dropdown">zprávy</ScratchInput>) na <ScratchInput>1.5</ScratchInput> sekund
                        </ScratchBlock>
                      </div>
                      <div>
                        <ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                      </div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [To byly všechny zprávy!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p>
            Jak zařídit, aby kocour postupně přečetl všechny položky ze seznamu, ať už jich je 5, nebo 100?
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">zprávy</span> a vlož do něj 4 různé věty.</li>
            <li>Vytvoř pomocnou proměnnou <span className="font-bold text-amber-600">i</span> (bude sloužit jako ukazatel / index).</li>
            <li>Před začátkem cyklu nastav <ScratchBlock category="variables">nastav [i] na 1</ScratchBlock>.</li>
            <li>Použij cyklus <ScratchBlock category="control">opakuj (délka [zprávy]) krát</ScratchBlock>:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Kocour řekne položku na aktuální pozici: <ScratchBlock category="looks">bublina (položka (i) z [zprávy]) na 1.5 s</ScratchBlock>.</li>
              <li>Následně posune ukazatel na další položku: <ScratchBlock category="variables">změň [i] o 1</ScratchBlock>.</li>
            </ul>
          </ol>
        </TaskCard>
    </div>
  );
};
