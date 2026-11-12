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

export const ListsTasks10to11 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
        {/* ÚKOL 10 */}
        <TaskCard
          number="10"
          title="Počet výskytů čísla s parametrem"
          taskId="lists-10"
          saveAs="PocetVyskytu.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Vlastní blok s parametrem (Procedura s argumentem):</strong> Blok přijímá hledanou hodnotu jako formální parametr <ScratchParam>hledané číslo</ScratchParam>.
                Při procházení seznamu porovnáváme <ScratchHexagon category="operators"><ScratchReporter category="lists">položka (i) z [čísla]</ScratchReporter> = <ScratchParam>hledané číslo</ScratchParam></ScratchHexagon>.
                Tento přístup je mnohem čistší než globální proměnné a umožňuje blok volat opakovaně pro libovolná čísla!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-2">
                <div>
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    1. Definice vlastního bloku s parametrem
                  </div>
                  <div>
                    <ScratchDefBlock>
                      tiskni počet výskytů <ScratchParam>hledané číslo</ScratchParam>
                    </ScratchDefBlock>
                  </div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pocet_vyskytu</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [čísla]</ScratchReporter> krát</span>}>
                      <div className="pl-2 space-y-1">
                        <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> = <ScratchParam>hledané číslo</ScratchParam></ScratchHexagon> tak</span>}>
                          <div className="pl-2">
                            <ScratchBlock category="variables">změň <ScratchInput type="dropdown">pocet_vyskytu</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                          </div>
                        </ScratchCBlock>
                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                      </div>
                    </ScratchCBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchBlock category="looks">
                      bublina (spoj [Pocet vyskytu cisla ] (spoj <ScratchParam>hledané číslo</ScratchParam> (spoj [ je ] <ScratchReporter category="variables">pocet_vyskytu</ScratchReporter>))) na <ScratchInput>3</ScratchInput> sekund
                    </ScratchBlock>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100">
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    2. Hlavní řídicí scénář
                  </div>
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="custom">Naplň seznam</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="custom">tiskni počet výskytů <ScratchInput>3</ScratchInput></ScratchBlock></div>
                </div>
              </div>
            </div>
          }
        >
          <p className="leading-relaxed">
            Vytvoř vlastní blok s parametrem, který najde a vypíše, kolikrát se v seznamu vyskytuje zadaná hodnota:
          </p>

          <ol className="list-decimal pl-5 space-y-3 my-4 text-sm text-slate-800">
            <li>
              Pro vygenerování 10 náhodných čísel do seznamu využij vlastní blok <strong className="text-pink-600">Naplň seznam</strong> z předchozí úlohy.
            </li>
            <li>
              Vytvoř nový vlastní blok <strong className="text-pink-600">tiskni počet výskytů (hledané číslo)</strong>, kde hledaná hodnota je <strong>vstupní parametr</strong> (číslo / text):
              <div className="mt-2">
                <ScratchDefBlock>
                  tiskni počet výskytů <ScratchParam>hledané číslo</ScratchParam>
                </ScratchDefBlock>
              </div>
            </li>
            <li>
              Uvnitř bloku projdi seznam cyklem, spočítej počet shod s parametrem <strong className="text-pink-600">hledané číslo</strong> a na závěr výsledek vypiš bublinou:
              <div className="mt-2">
                <ScratchSpeechBubble>Pocet vyskytu cisla 3 je 2</ScratchSpeechBubble>
              </div>
            </li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Vyzkoušení v hlavním scénáři:</strong> Pod zelenou vlajku zavolej nejprve <ScratchBlock category="custom">Naplň seznam</ScratchBlock> a poté svůj nový blok s libovolným číslem v závorce, např. <ScratchBlock category="custom">tiskni počet výskytů <ScratchInput>3</ScratchInput></ScratchBlock>.
          </div>
        </TaskCard>

        {/* ÚKOL 11 */}
        <TaskCard
          number="11"
          title="Vytvoření unikátního seznamu (Deduplikace)"
          taskId="lists-11"
          saveAs="UnikatniSeznam.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-4">
              <p>
                <strong>Algoritmus deduplikace (Odstranění duplicit):</strong> Procházíme výchozí seznam od začátku do konce.
                Před vložením každé hodnoty do <span className="font-bold text-orange-600">unikatni_seznam</span> otestujeme pomocí predikátu
                <ScratchHexagon category="lists">[unikatni_seznam] obsahuje (položka (i) z [seznam])?</ScratchHexagon> a negace <ScratchHexagon category="operators">ne &lt; &gt;</ScratchHexagon>,
                zda tam dané číslo již není. Pokud tam není, přidáme jej.
              </p>

              {/* 1. Rozšířený blok Naplň seznam se 2 parametry */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  1. Blok: Naplň seznam (2 parametry: počet prvků a maximum)
                </div>
                <div>
                  <ScratchDefBlock>
                    Naplň seznam <ScratchParam>počet</ScratchParam> <ScratchParam>max</ScratchParam>
                  </ScratchDefBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchParam>počet</ScratchParam> krát</span>}>
                    <div className="pl-2">
                      <ScratchBlock category="lists">
                        přidej <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchParam>max</ScratchParam></ScratchReporter> k <ScratchInput type="dropdown">seznam</ScratchInput>
                      </ScratchBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 2. Blok Vytvoř unikátní seznam */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  2. Blok: Vytvoř unikátní seznam (Deduplikace)
                </div>
                <div><ScratchDefBlock>Vytvoř unikátní seznam</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">unikatni_seznam</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [seznam]</ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <span>
                            když <ScratchHexagon category="operators">ne &lt;<ScratchHexagon category="lists"><ScratchInput type="dropdown">unikatni_seznam</ScratchInput> obsahuje <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [seznam]</ScratchReporter>?</ScratchHexagon>&gt;</ScratchHexagon> tak
                          </span>
                        }
                      >
                        <div className="pl-2">
                          <ScratchBlock category="lists">
                            přidej <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [seznam]</ScratchReporter> k <ScratchInput type="dropdown">unikatni_seznam</ScratchInput>
                          </ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 3. Hlavní scénář */}
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300 font-mono text-xs text-slate-900 space-y-1">
                <div className="text-amber-900 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  Hlavní řídicí scénář
                </div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchBlock category="custom">
                    Naplň seznam <ScratchInput>15</ScratchInput> <ScratchInput>5</ScratchInput>
                  </ScratchBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Vytvoř unikátní seznam</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p className="leading-relaxed">
            Vytvoř program, který z libovolného seznamu čísel vyfiltruje všechny duplicity a vytvoří nový seznam obsahující každou hodnotu pouze jednou:
          </p>

          <ol className="list-decimal pl-5 space-y-3 my-4 text-sm text-slate-800">
            <li>
              Vytvoř dva seznamy: <strong className="text-orange-600">seznam</strong> a <strong className="text-orange-600">unikatni_seznam</strong>.
            </li>
            <li>
              Uprav vlastní blok <strong className="text-pink-600">Naplň seznam</strong> tak, aby přijímal dva vstupní parametry: <strong>počet prvků</strong> a <strong>maximální hodnotu</strong>:
              <div className="mt-2">
                <ScratchDefBlock>
                  Naplň seznam <ScratchParam>počet</ScratchParam> <ScratchParam>max</ScratchParam>
                </ScratchDefBlock>
              </div>
            </li>
            <li>
              Vytvoř vlastní blok <strong className="text-pink-600">Vytvoř unikátní seznam</strong>, který projde původní seznam a do nového seznamu vloží každou hodnotu bez opakování:
              <div className="mt-2">
                <ScratchDefBlock>Vytvoř unikátní seznam</ScratchDefBlock>
              </div>
            </li>
          </ol>

          {/* Vizuální schéma deduplikace (podle předlohy) */}
          <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 text-center sm:text-left">
              Schéma převodu do unikátního seznamu (odstranění duplicit):
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Původní seznam */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-700 mb-1">seznam</span>
                <div className="w-24 bg-white border-2 border-slate-300 rounded-lg overflow-hidden shadow-sm text-center text-xs font-mono">
                  <div className="p-1.5 border-b border-slate-200">1</div>
                  <div className="p-1.5 border-b border-slate-200 bg-amber-50">2</div>
                  <div className="p-1.5 border-b border-slate-200 text-slate-400">1</div>
                  <div className="p-1.5 border-b border-slate-200 text-slate-400 bg-amber-50">2</div>
                  <div className="p-1.5">5</div>
                </div>
              </div>

              {/* Šipka */}
              <div className="flex flex-col items-center text-amber-600">
                <span className="text-xl font-black">➔</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">bez opakování</span>
              </div>

              {/* Unikátní seznam */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-emerald-700 mb-1">unikatni_seznam</span>
                <div className="w-24 bg-emerald-50/50 border-2 border-emerald-400 rounded-lg overflow-hidden shadow-sm text-center text-xs font-mono font-bold text-emerald-900">
                  <div className="p-1.5 border-b border-emerald-200">1</div>
                  <div className="p-1.5 border-b border-emerald-200">2</div>
                  <div className="p-1.5">5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Doporučení pro testování:</strong> Zavolej např. <ScratchBlock category="custom">Naplň seznam <ScratchInput>15</ScratchInput> <ScratchInput>5</ScratchInput></ScratchBlock>. Z 15 vygenerovaných čísel vznikne seznam s maximálně 5 unikátními čísly (1 až 5), kde je výsledek okamžitě krásně vidět!
          </div>
        </TaskCard>

        {/* ÚKOL 12: Anglický slovník */}
        <TaskCard
          number="12"
          title="Anglický slovník"
          taskId="lists-12"
          saveAs="AnglickySlovnik.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-4">
              <p>
                <strong>Kompletní řešení úlohy:</strong> Program využívá dva paralelní seznamy <span className="font-bold text-orange-600">cesky</span> a <span className="font-bold text-orange-600">anglicky</span>, kde si slova na stejném indexu odpovídají.
              </p>

              {/* 1. Vlastní bloky Naplň český / anglický slovník */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    1. Blok: Naplň český slovník
                  </div>
                  <div><ScratchDefBlock>Naplň český slovník</ScratchDefBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">cesky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [modrý] k <ScratchInput type="dropdown">cesky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [žlutý] k <ScratchInput type="dropdown">cesky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [zelený] k <ScratchInput type="dropdown">cesky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [hnědý] k <ScratchInput type="dropdown">cesky</ScratchInput></ScratchBlock></div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    2. Blok: Naplň anglický slovník
                  </div>
                  <div><ScratchDefBlock>Naplň anglický slovník</ScratchDefBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">anglicky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [blue] k <ScratchInput type="dropdown">anglicky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [yellow] k <ScratchInput type="dropdown">anglicky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [green] k <ScratchInput type="dropdown">anglicky</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="lists">přidej [brown] k <ScratchInput type="dropdown">anglicky</ScratchInput></ScratchBlock></div>
                </div>
              </div>

              {/* 2. Scénář překladu po kliknutí */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  3. Scénář pro překlad
                </div>
                <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchBlock category="sensing">otázka [Jaké slovo chceš přeložit do angličtiny?] a čekej</ScratchBlock>
                </div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    topLabel={
                      <span>
                        když <ScratchHexagon category="lists"><ScratchInput type="dropdown">cesky</ScratchInput> obsahuje <ScratchReporter category="sensing">odpověď</ScratchReporter>?</ScratchHexagon> tak
                      </span>
                    }
                    elseChildren={
                      <div>
                        <ScratchBlock category="looks">bublina [Takové slovo neznám] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    }
                  >
                    <div>
                      <ScratchBlock category="looks">
                        bublina (spoj [Anglicky se ] (spoj <ScratchReporter category="sensing">odpověď</ScratchReporter> (spoj [ řekne ] (položka (pořadí <ScratchReporter category="sensing">odpověď</ScratchReporter> ve <ScratchInput type="dropdown">cesky</ScratchInput>) z <ScratchInput type="dropdown">anglicky</ScratchInput>)))) na <ScratchInput>3</ScratchInput> sekund
                      </ScratchBlock>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p className="leading-relaxed">
            Vytvoř překladač ze dvou seznamů (<span className="font-bold text-orange-600">česky</span> a <span className="font-bold text-orange-600">anglicky</span>), kde slova na stejných pozicích tvoří dvojice (např. <em>modrý</em> ↔ <em>blue</em>, <em>žlutý</em> ↔ <em>yellow</em>).
          </p>

          <ol className="list-decimal pl-5 space-y-2.5 my-4 text-sm text-slate-800">
            <li>
              Vytvoř vlastní bloky <strong className="text-pink-600">Naplň český slovník</strong> a <strong className="text-pink-600">Naplň anglický slovník</strong> pro naplnění obou seznamů alespoň 4 slovy.
            </li>
            <li>
              Po kliknutí na kocoura se program zeptá na české slovo: <em>„Jaké slovo chceš přeložit do angličtiny?“</em>.
            </li>
            <li>
              Pokud slovo v seznamu existuje, kocour odpoví celou větou, např.: <em>„Anglicky se žlutý řekne yellow“</em>.
            </li>
            <li>
              Pokud slovo v seznamu není, kocour řekne: <em>„Takové slovo neznám“</em>.
            </li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Nápověda pro vyhledání:</strong> Pozici slova zjistíš blokem <ScratchReporter category="lists">pořadí (odpověď) ve [cesky]</ScratchReporter> a vložíš ji do <ScratchReporter category="lists">položka (...) z [anglicky]</ScratchReporter>. Pro spojení slov do celé věty použij bloky <ScratchReporter category="operators">spoj (...) (...)</ScratchReporter>.
          </div>
        </TaskCard>
    </div>
  );
};
