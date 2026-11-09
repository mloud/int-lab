"use client";

import React from 'react';
import { KeyRound, Landmark, ShieldCheck } from 'lucide-react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchSpeechBubble,
  ScratchDistanceBlock,
  ScratchReporter
} from '../ScratchBlocks';

export const ConditionsTasks6to8 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <>
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl p-6 sm:p-8 my-12">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Podmíněný příkaz (úplný) - když / jinak</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Používá se v případě, že je třeba program rozvětvit a vykonat určité příkazy, <strong>pokud je podmínka splněna</strong>, a zcela jiné příkazy, <strong>pokud splněna není</strong>.
          </p>
          <div className="flex justify-center mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
              <h4 className="font-bold text-slate-800 mb-4 text-center">Ukázka úplné podmínky:</h4>
              <div className="flex justify-center">
                <ScratchCElseBlock
                  category="control"
                  topLabel="když"
                  midLabel="jinak"
                  bottomLabel="tak"
                  condition={
                    <span className="mx-1">
                      <ScratchHexagon category="operators">
                        <ScratchBlock category="variables">penez</ScratchBlock> {">"} <ScratchInput>1000000</ScratchInput>
                      </ScratchHexagon>
                    </span>
                  }
                  elseChildren={
                    <div className="py-1">
                      <ScratchBlock category="looks">bublina <ScratchInput type="text">chudý</ScratchInput></ScratchBlock>
                    </div>
                  }
                >
                  <div className="py-1">
                    <ScratchBlock category="looks">bublina <ScratchInput type="text">Jsem bohatý</ScratchInput></ScratchBlock>
                  </div>
                </ScratchCElseBlock>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <TaskCard
            number="6"
            title="Je sudé nebo liché?"
            taskId="cond-6"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Úplný podmíněný příkaz (<code>když – jinak</code>). Odpadá nutnost dvou samostatných testů pro sudost a lichost. Pokud podmínka dělitelnosti dvěma neplatí, řízení automaticky přechází do větve <code>jinak</code>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej celé číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCElseBlock
                      category="control"
                      condition={
                        <ScratchHexagon category="operators">
                          <ScratchReporter category="operators">
                            zbytek <ScratchReporter category="sensing">odpověď</ScratchReporter> děleno <ScratchInput>2</ScratchInput>
                          </ScratchReporter>
                          {" = "}
                          <ScratchInput>0</ScratchInput>
                        </ScratchHexagon>
                      }
                      elseChildren={
                        <div className="pl-2">
                          <ScratchBlock category="looks">bublina <ScratchInput type="text">Číslo je liché</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                        </div>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Číslo je sudé</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCElseBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="PodminkaUplna.sb3"
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Napište scénář, který se zeptá na číslo a vypíše "Číslo je sudé", pokud je číslo dělitelné 2. <strong>Jinak vypíše "Číslo je liché".</strong>
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 w-fit">
              <ScratchCElseBlock
                category="control"
                topLabel="když"
                midLabel="jinak"
                bottomLabel="tak"
                elseChildren={<div className="h-4"></div>}
              >
                <div className="h-4"></div>
              </ScratchCElseBlock>
            </div>
          </TaskCard>

          <TaskCard
            number="7"
            title="Porovnání dvou čísel (Úplné)"
            taskId="cond-7"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Didaktický přechod k vnořenému větvení (konstrukce <em>if – else if – else</em>). Žáci načtou obě čísla do proměnných <code>prvni</code> a <code>druhe</code>. Větev <code>jinak</code> obsahuje další podmínku pro testování, zda je větší druhé číslo, nebo zda jsou obě čísla totožná.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej první číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">prvni</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej druhé číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">druhe</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCElseBlock
                      category="control"
                      condition={
                        <ScratchHexagon category="operators">
                          <ScratchReporter category="variables">prvni</ScratchReporter> {">"} <ScratchReporter category="variables">druhe</ScratchReporter>
                        </ScratchHexagon>
                      }
                      elseChildren={
                        <div className="pl-2">
                          <ScratchCElseBlock
                            category="control"
                            condition={
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">druhe</ScratchReporter> {">"} <ScratchReporter category="variables">prvni</ScratchReporter>
                              </ScratchHexagon>
                            }
                            elseChildren={
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchInput type="text">Čísla jsou stejná</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                              </div>
                            }
                          >
                            <div className="pl-2">
                              <ScratchBlock category="looks">bublina <ScratchInput type="text">Druhé je větší</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                            </div>
                          </ScratchCElseBlock>
                        </div>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">První je větší</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCElseBlock>
                  </div>
                </div>
              </div>
            }
          >
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-800 mb-2">1. Větší nebo menší?</h4>
                <p>Napište scénář, který se zeptá na dvě čísla: Pokud je první číslo větší než druhé, vypíše <strong>"První je větší"</strong>. Jinak vypíše <strong>"Druhé je větší"</strong>.</p>
                <p className="mt-2 italic text-amber-600 font-bold">(Nápověda k zamyšlení: nebudou třeba proměnné? 🤔)</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">2. Co když jsou stejná?</h4>
                <p>Až bude fungovat bod číslo 1, zkuste scénář vylepšit: Pokud jsou čísla stejná, vypíše <strong>"Jsou stejná"</strong>.</p>
              </div>
            </div>
          </TaskCard>
          <TaskCard
            number="8"
            title="Generování vlajek"
            taskId="cond-8"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Grafické generování pomocí metody Monte Carlo. Cyklus provede náhodný skok po plátně a otestuje vertikální pozici: osa X dělí scénu napůl (<code>y &gt; 0</code> odpovídá horní bílé polovině, <code>jinak</code> červené spodní polovině). Tloušťka pera nastavená např. na 10 zajistí rychlé zaplnění plátna.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="pen">smaž všechno</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="pen">nastav tloušťku pera na <ScratchInput>10</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>1000</ScratchInput> krát</span>}>
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="motion">skoč na <ScratchInput type="dropdown">náhodná pozice</ScratchInput></ScratchBlock></div>
                        <div>
                          <ScratchCElseBlock
                            category="control"
                            condition={
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="motion">y pozice</ScratchReporter> {">"} <ScratchInput>0</ScratchInput>
                              </ScratchHexagon>
                            }
                            elseChildren={
                              <div className="pl-2">
                                <ScratchBlock category="pen">nastav barvu pera na <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-600 border border-white ml-1"></span></ScratchBlock>
                              </div>
                            }
                          >
                            <div className="pl-2">
                              <ScratchBlock category="pen">nastav barvu pera na <span className="inline-block w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-300 ml-1"></span></ScratchBlock>
                            </div>
                          </ScratchCElseBlock>
                        </div>
                        <div><ScratchBlock category="pen">pero zapni</ScratchBlock></div>
                        <div><ScratchBlock category="pen">pero vypni</ScratchBlock></div>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="Vlajky.sb3"
          >
            <div className="space-y-6">
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>Vytvořte scénáře, které nakreslí příslušné vlajky (Polsko, Francie, Německo, Japonsko).</li>
                <li>
                  <strong>Postup:</strong>
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>Skoč na náhodnou pozici</li>
                    <li>Nastav barvu dle pozice</li>
                    <li>Vykresli tečku</li>
                  </ul>
                </li>
              </ul>

              <div className="flex flex-col items-center gap-2 max-w-[240px] mt-4">
                <div className="w-full aspect-[3/2] border border-slate-300 rounded shadow-sm overflow-hidden flex flex-col">
                  <div className="flex-1 bg-slate-50"></div>
                  <div className="flex-1 bg-red-600"></div>
                </div>
                <span className="text-sm font-bold text-slate-800">Polsko</span>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6">
                <h4 className="font-bold text-slate-800 mb-6">Nápověda (použijte tyto příkazy):</h4>

                <div className="flex flex-col md:flex-row gap-x-12 gap-y-8 items-start">

                  {/* První sloupec: Pero a proměnné s operátorem */}
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <ScratchBlock category="pen">pero zapni</ScratchBlock>
                      <div className="flex items-center gap-2">
                        <ScratchBlock category="pen">pero vypni</ScratchBlock>
                        <span className="text-sm font-bold text-slate-500">← Vytiskne tečku</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex gap-2">
                        <ScratchBlock category="motion">x</ScratchBlock>
                        <ScratchBlock category="motion">y</ScratchBlock>
                      </div>
                      <ScratchHexagon category="operators">
                        <ScratchInput> </ScratchInput> {">"} <ScratchInput>0</ScratchInput>
                      </ScratchHexagon>
                    </div>
                  </div>

                  {/* Druhý sloupec: Cyklus */}
                  <div className="flex flex-col gap-4">
                    <ScratchCBlock category="control">
                      opakuj <ScratchInput>100</ScratchInput> krát
                      <div className="h-8"></div>
                    </ScratchCBlock>
                  </div>

                  {/* Třetí sloupec: Ostatní bloky */}
                  <div className="flex flex-col gap-4">
                    <ScratchBlock category="motion">skoč na <ScratchInput type="dropdown">náhodná pozice</ScratchInput></ScratchBlock>

                    <ScratchCElseBlock
                      category="control"
                      topLabel="když"
                      midLabel="jinak"
                      bottomLabel="tak"
                      elseChildren={<div className="h-6"></div>}
                    >
                      <div className="h-6"></div>
                    </ScratchCElseBlock>

                    <ScratchBlock category="pen">
                      nastav barvu pera na
                      <span className="inline-block w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-sm ml-2"></span>
                    </ScratchBlock>
                  </div>

                </div>
              </div>
            </div>
          </TaskCard>
          </div>
    </>
  );
};
