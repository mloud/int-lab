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

export const ConditionsTasks9to10 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
          <TaskCard
            number="9"
            title="Generování dalších vlajek"
            taskId="cond-9"
            showTeacher={teacherMode}
            teacherNote={
              <div className="space-y-3">
                <p>
                  <strong>Metodické vysvětlení:</strong> Rozšíření o testování osy X (svislé pruhy u Francie) a geometrickou podmínku kruhu (vlajka Japonska).
                </p>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    1. Vlajka Francie (svislé pruhy podle osy X):
                  </div>
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
                                  <ScratchReporter category="motion">x pozice</ScratchReporter> {"<"} <ScratchInput>-80</ScratchInput>
                                </ScratchHexagon>
                              }
                              elseChildren={
                                <div className="pl-2">
                                  <ScratchCElseBlock
                                    category="control"
                                    condition={
                                      <ScratchHexagon category="operators">
                                        <ScratchReporter category="motion">x pozice</ScratchReporter> {"<"} <ScratchInput>80</ScratchInput>
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
                              }
                            >
                              <div className="pl-2">
                                <ScratchBlock category="pen">nastav barvu pera na <span className="inline-block w-3.5 h-3.5 rounded-full bg-blue-600 border border-white ml-1"></span></ScratchBlock>
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

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    2. Vlajka Japonska (vzdálenost k pomocné postavě Střed):
                  </div>
                  <p className="text-xs text-slate-600">
                    Na pozici <code>(0, 0)</code> umístíme postavu <code>Střed</code>. Blok <code>vzdálenost k Střed</code> ověří, zda tečka leží v poloměru kruhu:
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
                                  <ScratchDistanceBlock target="Střed" /> {"<"} <ScratchInput>70</ScratchInput>
                                </ScratchHexagon>
                              }
                              elseChildren={
                                <div className="pl-2">
                                  <ScratchBlock category="pen">nastav barvu pera na <span className="inline-block w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-300 ml-1"></span></ScratchBlock>
                                </div>
                              }
                            >
                              <div className="pl-2">
                                <ScratchBlock category="pen">nastav barvu pera na <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-600 border border-white ml-1"></span></ScratchBlock>
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
              </div>
            }
            saveAs="Vlajky.sb3"
          >
            <div className="space-y-6">
              <p className="text-sm text-slate-600">
                Kromě polské vlajky zkuste nakreslit i vlajku <strong>Francie, Německa a Japonska</strong>. Můžete k tomu využít stejný princip kreslení teček na náhodné pozice.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-[3/2] border border-slate-300 rounded shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 bg-slate-50"></div>
                    <div className="flex-1 bg-red-600"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Polsko</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-[3/2] border border-slate-300 rounded shadow-sm overflow-hidden flex">
                    <div className="flex-1 bg-blue-700"></div>
                    <div className="flex-1 bg-slate-50"></div>
                    <div className="flex-1 bg-red-600"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Francie</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-[3/2] border border-slate-300 rounded shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 bg-slate-900"></div>
                    <div className="flex-1 bg-red-600"></div>
                    <div className="flex-1 bg-yellow-400"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Německo</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-[3/2] border border-slate-300 rounded shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center">
                    <div className="w-[45%] aspect-square rounded-full bg-red-600"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Japonsko</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-300 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                  <span className="text-base">💡</span>
                  <span>Tip pro vlajku Japonska:</span>
                </div>
                <p className="leading-relaxed">
                  Jak v programu poznat, zda náhodně vygenerovaná tečka leží uvnitř červeného kruhu?
                </p>
                <p className="leading-relaxed">
                  Zkuste využít <strong>další postavu na plátně</strong> a blok vnímání <ScratchDistanceBlock target="ukazateli myši" /> (který umí měřit vzdálenost nejen k myši, ale i k jiné zvolené postavě). Zbytek geometrie a podmínek už jistě zvládnete domyslet sami!
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-6">Nápověda (použijte tyto příkazy):</h4>

                <div className="flex flex-col md:flex-row gap-x-12 gap-y-8 items-start">

                  {/* První sloupec: Pero a proměnné s operátorem */}
                  <div className="flex flex-col gap-8 items-start">
                    <div className="flex flex-col gap-2 items-start">
                      <ScratchBlock category="pen">pero zapni</ScratchBlock>
                      <div className="flex items-center gap-2">
                        <ScratchBlock category="pen">pero vypni</ScratchBlock>
                        <span className="text-sm font-bold text-slate-500">← Vytiskne tečku</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto items-start">
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
                  <div className="flex flex-col gap-4 items-start">
                    <ScratchCBlock category="control">
                      opakuj <ScratchInput>100</ScratchInput> krát
                      <div className="h-8"></div>
                    </ScratchCBlock>
                  </div>

                  {/* Třetí sloupec: Ostatní bloky */}
                  <div className="flex flex-col gap-4 items-start">
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

                    <ScratchDistanceBlock target="ukazateli myši" />
                  </div>

                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard
            number="10"
            title="Zkoušení malé násobilky"
            taskId="cond-10"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Žáci pracují s proměnnými <code>a</code> a <code>b</code> pro generování čísel, proměnnou <code>body</code> pro počítadlo úspěchů a vnořeným blokem <code>spoj</code> pro sestavení zadání otázky. Na závěr aplikují třístupňové známkování pomocí vnořeného <code>když – jinak</code>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">body</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>10</ScratchInput> krát</span>}>
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">a</ScratchInput> na <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchReporter></ScratchBlock></div>
                        <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">b</ScratchInput> na <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchReporter></ScratchBlock></div>
                        <div>
                          <ScratchBlock category="sensing">
                            zeptej se <ScratchReporter category="operators">spoj <ScratchReporter category="variables">a</ScratchReporter> <ScratchReporter category="operators">spoj <ScratchInput type="text"> × </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">b</ScratchReporter> <ScratchInput type="text"> = ?</ScratchInput></ScratchReporter></ScratchReporter></ScratchReporter> a čekej
                          </ScratchBlock>
                        </div>
                        <div>
                          <ScratchCElseBlock
                            category="control"
                            condition={
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="sensing">odpověď</ScratchReporter>
                                {" = "}
                                <ScratchReporter category="operators">
                                  <ScratchReporter category="variables">a</ScratchReporter> * <ScratchReporter category="variables">b</ScratchReporter>
                                </ScratchReporter>
                              </ScratchHexagon>
                            }
                            elseChildren={
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchInput type="text">Chyba!</ScratchInput> na <ScratchInput>1</ScratchInput> sekund</ScratchBlock>
                              </div>
                            }
                          >
                            <div className="pl-2 space-y-1">
                              <div><ScratchBlock category="looks">bublina <ScratchInput type="text">Správně! 👍</ScratchInput> na <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                              <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">body</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                            </div>
                          </ScratchCElseBlock>
                        </div>
                      </div>
                    </ScratchCBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchBlock category="looks">
                      bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Správně: </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">body</ScratchReporter> <ScratchInput type="text"> / 10</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund
                    </ScratchBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchCElseBlock
                      category="control"
                      condition={
                        <ScratchHexagon category="operators">
                          <ScratchReporter category="variables">body</ScratchReporter> {">"} <ScratchInput>8</ScratchInput>
                        </ScratchHexagon>
                      }
                      elseChildren={
                        <div className="pl-2">
                          <ScratchCElseBlock
                            category="control"
                            condition={
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">body</ScratchReporter> {">"} <ScratchInput>5</ScratchInput>
                              </ScratchHexagon>
                            }
                            elseChildren={
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchInput type="text">Známka: 3</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                              </div>
                            }
                          >
                            <div className="pl-2">
                              <ScratchBlock category="looks">bublina <ScratchInput type="text">Známka: 2</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                            </div>
                          </ScratchCElseBlock>
                        </div>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Výborně! Známka: 1</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCElseBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="ZkouseniMaleNasobilky.sb3"
          >
            <div className="space-y-6">
              <p className="text-sm text-slate-600 font-bold">Vytvořte program pro zkoušení malé násobilky.</p>

              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>Program vygeneruje dvě náhodná čísla v rozmezí 1 až 10.</li>
                <li>Zobrazí je ve formě otázky, např. <strong>„2 × 3 = ?“</strong>.</li>
                <li>Uživatelova odpověď se zkontroluje a program vypíše, zda byla správná nebo špatná.</li>
                <li>Rozšiř tak, aby se celkem se zobrazilo 10 otázek.</li>
              </ul>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-800 mb-2">Poté na konci:</p>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                  <li>Na konci program vypíše, kolik otázek uživatel zodpověděl správně: <strong>„Správně 6/10“</strong></li>
                  <li>
                    Přidělí a vypíše známku takto:
                    <ul className="list-none pl-5 mt-1 space-y-1">
                      <li><strong className="text-emerald-600">{">"} 8:</strong> Známka 1</li>
                      <li><strong className="text-amber-500">{">"} 5:</strong> Známka 2</li>
                      <li><strong className="text-red-500">Zbytek:</strong> Známka 3</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mt-6">
                <div className="w-full aspect-[4/3] bg-white border border-slate-300 rounded-sm shadow-sm relative flex flex-col items-center justify-center p-4">
                  <div className="flex gap-2 mb-2 ml-16">
                    <div className="bg-white border border-slate-300 rounded-[2rem] px-4 py-2 shadow-sm text-sm font-bold text-slate-600">
                      2x10=
                    </div>
                  </div>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.76 1.4.08 1.38 3.32 1.14 5.37a9.3 9.3 0 0 1 1.44 4.88c0 5.14-4.27 9.25-9.5 9.25S4 17.89 4 12.75a9.3 9.3 0 0 1 1.44-4.88c-.24-2.05-.26-5.29 1.14-5.37 1.39-.08 4.64.76 6.42 2.76C10.65 5.09 11.33 5 12 5Z" />
                    <path d="M9 13a2.5 2.5 0 0 0 5 0" />
                    <path d="M15 10h.01" />
                    <path d="M9 10h.01" />
                  </svg>

                  <div className="absolute bottom-4 left-4 right-4 h-8 border-2 border-amber-300 rounded-full flex items-center justify-end px-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center gap-4 text-xs text-slate-600 leading-relaxed">
                  <h4 className="font-bold text-slate-800 text-sm">💡 Nápověda k vytvoření otázky:</h4>
                  <p>
                    Zelený blok <code>spoj</code> má pouze 2 vstupní pole. Pokud potřebujete spojit více hodnot (např. text a proměnné), můžete do sebe <strong>vložit dva bloky spoj</strong>:
                  </p>
                  <div className="flex flex-col gap-3 items-start overflow-x-auto py-1">
                    <ScratchReporter category="operators">
                      spoj <ScratchInput>jablko</ScratchInput>{" "}
                      <ScratchReporter category="operators" className="border border-black/20">
                        spoj <ScratchInput>hruška</ScratchInput> <ScratchInput>banán</ScratchInput>
                      </ScratchReporter>
                    </ScratchReporter>

                    <ScratchBlock category="sensing">
                      otázka <ScratchInput> </ScratchInput> a čekej
                    </ScratchBlock>
                  </div>
                  <p>
                    Spojením bloků a vložením do modrého příkazu <code>otázka a čekej</code> pak sestavíte libovolně dlouhý dotaz. Konkrétní poskládání s proměnnými už jistě zvládnete sami!
                  </p>
                </div>
              </div>
            </div>
          </TaskCard>
    </div>
  );
};
