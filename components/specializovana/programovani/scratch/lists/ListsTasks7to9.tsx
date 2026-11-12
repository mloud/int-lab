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

export const ListsTasks7to9 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 7 */}
      <TaskCard
        number="7"
        title="Procházení seznamu pozpátku"
        taskId="lists-7"
        saveAs="CtenarSlovOdzadu.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div>
            <p className="mb-2">
              <strong>Zpětné traverzování (Reverse Traversal):</strong> Na rozdíl od předchozí úlohy 6, kde čteme od 1 do konce,
              tady začínáme na konci seznamu na indexu <ScratchReporter category="lists">délka [zprávy]</ScratchReporter>.
              V každém kroku cyklu hodnotu indexu nezvětšujeme, ale zmenšujeme o 1 blokem <ScratchBlock category="variables">změň [i] o <ScratchInput>-1</ScratchInput></ScratchBlock>.
              Počet opakování cyklu zůstává stejný (<ScratchReporter category="lists">délka [zprávy]</ScratchReporter>).
            </p>
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
              <div className="pl-4">
                <ScratchBlock category="variables">
                  nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchReporter category="lists">délka [zprávy]</ScratchReporter>
                </ScratchBlock>
              </div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [zprávy]</ScratchReporter> krát</span>}>
                  <div className="pl-2 space-y-1">
                    <div>
                      <ScratchBlock category="looks">
                        bublina (položka <ScratchReporter category="variables">i</ScratchReporter> z <ScratchInput type="dropdown">zprávy</ScratchInput>) na <ScratchInput>1.5</ScratchInput> sekund
                      </ScratchBlock>
                    </div>
                    <div>
                      <ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>-1</ScratchInput></ScratchBlock>
                    </div>
                  </div>
                </ScratchCBlock>
              </div>
              <div className="pl-4"><ScratchBlock category="looks">bublina [To byla všechna slova pozpátku!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
            </div>
          </div>
        }
      >
        <p>
          Uprav program z předchozího úkolu tak, aby kocour přečetl všechna slova ze seznamu <span className="font-bold text-orange-600">zprávy</span> v opačném pořadí – tedy pozpátku od posledního slova až k prvnímu.
        </p>
        <p className="mt-2">
          Po přečtení všech slov kocour řekne: <em>„To byla všechna slova pozpátku!“</em>.
        </p>
      </TaskCard>

      {/* ÚKOL 8 */}
      <TaskCard
        number="8"
        title="Žebříček TOP 3 nejvyšších skóre"
        taskId="lists-8"
        saveAs="TopSkore.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div>
            <p className="mb-2">
              <strong>Algoritmus vkládání do seřazeného seznamu:</strong> Porovnáme nový výsledek s 1., 2. a 3. místem.
              Jakmile vložíme nové skóre blokem <ScratchBlock category="lists">vlož [skóre] na pozici (1) v [top_skore]</ScratchBlock>,
              seznam má najednou 4 položky. Proto na konci vždy zavoláme <ScratchBlock category="lists">smaž (4) z [top_skore]</ScratchBlock>,
              abychom zachovali přesně TOP 3.
            </p>
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div><ScratchBlock category="events">po obdržení zprávy [konec_hry]</ScratchBlock></div>
              <div className="pl-4">
                <ScratchCElseBlock
                  category="control"
                  condition={<ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [1] z [top_skore]</ScratchReporter></ScratchHexagon>}
                  elseChildren={
                    <div className="pl-2 space-y-1">
                      <ScratchCElseBlock
                        category="control"
                        condition={<ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [2] z [top_skore]</ScratchReporter></ScratchHexagon>}
                        elseChildren={
                          <div className="pl-2 space-y-1">
                            <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [3] z [top_skore]</ScratchReporter></ScratchHexagon> tak</span>}>
                              <div className="pl-2 space-y-1">
                                <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>3</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                                <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                                <div><ScratchBlock category="looks">bublina [Nové 3. místo v žebříčku!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                              </div>
                            </ScratchCBlock>
                          </div>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>2</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                          <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                          <div><ScratchBlock category="looks">bublina [Stříbrná příčka! Nové 2. místo!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        </div>
                      </ScratchCElseBlock>
                    </div>
                  }
                >
                  <div className="pl-2 space-y-1">
                    <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>1</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                    <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                    <div><ScratchBlock category="looks">bublina [NOVÝ REKORD! Jsi na 1. místě!] na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                  </div>
                </ScratchCElseBlock>
              </div>
            </div>
          </div>
        }
      >
        <p>
          Vytvoř skutečnou tabulku 3 nejlepších výsledků, jakou mají arkádové hry v hernách.
        </p>

        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Vytvoř seznam <span className="font-bold text-orange-600">top_skore</span> a proměnnou <span className="font-bold text-amber-600">skore</span>.</li>
          <li>Výchozí hodnoty v seznamu nastav na: <code>100</code> (1. místo), <code>70</code> (2. místo), <code>40</code> (3. místo).</li>
          <li>Hráč zadá své dosažené skóre (nebo jej nasimuluj dotazem: <em>„Kolik bodů jsi nahrál?“</em>).</li>
          <li><strong>Porovnání a zařazení do žebříčku:</strong></li>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Pokud je skóre větší než 1. místo ➔ vlož jej na pozici 1 a oslav nový rekord!</li>
            <li>Jinak pokud je větší než 2. místo ➔ vlož jej na pozici 2.</li>
            <li>Jinak pokud je větší než 3. místo ➔ vlož jej na pozici 3.</li>
            <li>Jinak kocour smutně oznámí: <em>„Bohužel, do TOP 3 jsi se neprobojoval.“</em>.</li>
          </ul>
        </ol>
      </TaskCard>

      {/* ÚKOL 9 */}
      <TaskCard
        number="9"
        title="Seznamy vlastními bloky"
        taskId="lists-9"
        saveAs="SeznamyStatistika.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-4">
            <p>
              <strong>Kompletní řešení úlohy:</strong> Program je rozdělen do 4 vlastních bloků (funkcí) z kategorie <em>Moje bloky</em>.
              Tím je kód čistý, přehledný a snadno testovatelný po částech.
            </p>

            {/* 1. Naplň seznam */}
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                1. Blok: Naplň seznam
              </div>
              <div><ScratchDefBlock>Naplň seznam</ScratchDefBlock></div>
              <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">čísla</ScratchInput></ScratchBlock></div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>10</ScratchInput> krát</span>}>
                  <div className="pl-2">
                    <ScratchBlock category="lists">
                      přidej <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchReporter> k <ScratchInput type="dropdown">čísla</ScratchInput>
                    </ScratchBlock>
                  </div>
                </ScratchCBlock>
              </div>
            </div>

            {/* 2. Najdi největší číslo */}
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                2. Blok: Najdi největší číslo (Hledání maxima)
              </div>
              <div><ScratchDefBlock>Najdi největší číslo</ScratchDefBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejvetsi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z [čísla]</ScratchReporter></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>2</ScratchInput></ScratchBlock></div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="operators"><ScratchReporter category="lists">délka [čísla]</ScratchReporter> - <ScratchInput>1</ScratchInput></ScratchReporter> krát</span>}>
                  <div className="pl-2 space-y-1">
                    <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> &gt; <ScratchReporter category="variables">nejvetsi</ScratchReporter></ScratchHexagon> tak</span>}>
                      <div className="pl-2">
                        <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejvetsi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock>
                      </div>
                    </ScratchCBlock>
                    <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  </div>
                </ScratchCBlock>
              </div>
              <div className="pl-4">
                <ScratchBlock category="looks">
                  bublina (spoj [Největší číslo je: ] a <ScratchReporter category="variables">nejvetsi</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                </ScratchBlock>
              </div>
            </div>

            {/* 3. Najdi nejmenší číslo */}
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                3. Blok: Najdi nejmenší číslo (Hledání minima)
              </div>
              <div><ScratchDefBlock>Najdi nejmenší číslo</ScratchDefBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejmensi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z [čísla]</ScratchReporter></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>2</ScratchInput></ScratchBlock></div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="operators"><ScratchReporter category="lists">délka [čísla]</ScratchReporter> - <ScratchInput>1</ScratchInput></ScratchReporter> krát</span>}>
                  <div className="pl-2 space-y-1">
                    <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> &lt; <ScratchReporter category="variables">nejmensi</ScratchReporter></ScratchHexagon> tak</span>}>
                      <div className="pl-2">
                        <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejmensi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock>
                      </div>
                    </ScratchCBlock>
                    <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  </div>
                </ScratchCBlock>
              </div>
              <div className="pl-4">
                <ScratchBlock category="looks">
                  bublina (spoj [Nejmenší číslo je: ] a <ScratchReporter category="variables">nejmensi</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                </ScratchBlock>
              </div>
            </div>

            {/* 4. Spočítej průměr */}
            <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
              <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                4. Blok: Spočítej průměr (Suma a aritmetický průměr)
              </div>
              <div><ScratchDefBlock>Spocitej prumer</ScratchDefBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">suma</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
              <div className="pl-4">
                <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [čísla]</ScratchReporter> krát</span>}>
                  <div className="pl-2 space-y-1">
                    <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">suma</ScratchInput> o <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock></div>
                    <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  </div>
                </ScratchCBlock>
              </div>
              <div className="pl-4">
                <ScratchBlock category="variables">
                  nastav <ScratchInput type="dropdown">prumer</ScratchInput> na <ScratchReporter category="operators">zaokrouhli (<ScratchReporter category="variables">suma</ScratchReporter> / <ScratchReporter category="lists">délka [čísla]</ScratchReporter>)</ScratchReporter>
                </ScratchBlock>
              </div>
              <div className="pl-4">
                <ScratchBlock category="looks">
                  bublina (spoj [Průměr je: ] a <ScratchReporter category="variables">prumer</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                </ScratchBlock>
              </div>
            </div>

            {/* 5. Hlavní řídicí scénář */}
            <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300 font-mono text-xs text-slate-900 space-y-1">
              <div className="text-amber-900 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                Hlavní řídicí scénář (Po kliknutí na zelenou vlajku)
              </div>
              <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="custom">Naplň seznam</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="custom">Najdi největší číslo</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="custom">Najdi nejmenší číslo</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
              <div className="pl-4"><ScratchBlock category="custom">Spocitej prumer</ScratchBlock></div>
            </div>
          </div>
        }
      >
        <p>
          Vytvoř přehledný modulární program, ve kterém pomocí vlastních bloků (z kategorie <em>Moje bloky</em>) naplníš seznam a provedeš jeho analýzu:
        </p>

        <ol className="list-decimal pl-5 space-y-4 my-4">
          <li className="text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-medium">
                Vytvoř vlastní blok, který naplní seznam 10 náhodnými čísly.
              </span>
              <ScratchDefBlock>Naplň seznam</ScratchDefBlock>
            </div>
          </li>

          <li className="text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <span className="font-medium block">
                  Sestav vlastní blok, který seznam projde a vypíše největší číslo.
                </span>
                <span className="text-xs text-slate-500 block">
                  💡 <strong>Nápověda:</strong> Bude potřeba procházet seznam prvek po prvku cyklem a porovnávat aktuální prvek s dosud největším nalezeným číslem. K uložení tohoto čísla budeš potřebovat proměnnou (např. <code>max</code>).
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <ScratchDefBlock>Najdi největší číslo</ScratchDefBlock>
                <ScratchSpeechBubble>Nejvetsi cislo je:9</ScratchSpeechBubble>
              </div>
            </div>
          </li>

          <li className="text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-medium">
                Sestav vlastní blok, který seznam projde a vypíše nejmenší číslo.
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <ScratchDefBlock>Najdi nejmenší číslo</ScratchDefBlock>
                <ScratchSpeechBubble>Nejmensi cislo je:3</ScratchSpeechBubble>
              </div>
            </div>
          </li>

          <li className="text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-medium">
                Sestav vlastní blok, který spočítá a vypíše průměr všech čísel.
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <ScratchDefBlock>Spocitej prumer</ScratchDefBlock>
                <ScratchSpeechBubble>Průměr je:6</ScratchSpeechBubble>
              </div>
            </div>
          </li>
        </ol>

        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
          💡 <strong>Spuštění programu:</strong> Všechny vytvořené bloky následně spusť v hlavním scénáři po kliknutí na zelenou vlajku.
        </div>
      </TaskCard>
    </div>
  );
};
