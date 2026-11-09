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

export const ConditionsTasks11to12 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
          <TaskCard
            number="11"
            title="Validátor síly hesla"
            taskId="cond-11"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Kombinace práce s řetězci (<code>délka</code> a <code>obsahuje</code>), kumulace bodů v proměnné <code>skore</code> a závěrečného třístupňového vyhodnocení.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">skore</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej testované heslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">heslo</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>

                  {/* Test 1: Délka */}
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="operators">délka <ScratchReporter category="variables">heslo</ScratchReporter></ScratchReporter> {">"} <ScratchInput>7</ScratchInput>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2"><ScratchBlock category="variables">změň <ScratchInput type="dropdown">skore</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </ScratchCBlock>
                  </div>

                  {/* Test 2: Není triviální */}
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            ne
                            <ScratchHexagon isSlot>
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">heslo</ScratchReporter> {" = "} <ScratchInput type="text">123456</ScratchInput>
                              </ScratchHexagon>
                              nebo
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">heslo</ScratchReporter> {" = "} <ScratchInput type="text">heslo</ScratchInput>
                              </ScratchHexagon>
                            </ScratchHexagon>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2"><ScratchBlock category="variables">změň <ScratchInput type="dropdown">skore</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </ScratchCBlock>
                  </div>

                  {/* Test 3: Speciální znak nebo číslice */}
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            <ScratchHexagon category="operators">
                              <ScratchReporter category="variables">heslo</ScratchReporter> obsahuje <ScratchInput type="text">@</ScratchInput> ?
                            </ScratchHexagon>
                            nebo
                            <ScratchHexagon category="operators">
                              <ScratchReporter category="variables">heslo</ScratchReporter> obsahuje <ScratchInput type="text">!</ScratchInput> ?
                            </ScratchHexagon>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2"><ScratchBlock category="variables">změň <ScratchInput type="dropdown">skore</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </ScratchCBlock>
                  </div>

                  {/* Vyhodnocení */}
                  <div className="pl-4">
                    <ScratchCElseBlock
                      category="control"
                      condition={
                        <ScratchHexagon category="operators">
                          <ScratchReporter category="variables">skore</ScratchReporter> {" = "} <ScratchInput>3</ScratchInput>
                        </ScratchHexagon>
                      }
                      elseChildren={
                        <div className="pl-2">
                          <ScratchCElseBlock
                            category="control"
                            condition={
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">skore</ScratchReporter> {" = "} <ScratchInput>2</ScratchInput>
                              </ScratchHexagon>
                            }
                            elseChildren={
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchInput type="text">Slabé a nebezpečné heslo! ❌</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                              </div>
                            }
                          >
                            <div className="pl-2">
                              <ScratchBlock category="looks">bublina <ScratchInput type="text">Průměrné heslo, zvaž vylepšení! ⚠️</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                            </div>
                          </ScratchCElseBlock>
                        </div>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Vynikající bezpečné heslo! 🔒</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCElseBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="ValidatorHesla.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <p>
                Vytvořte program, který otestuje bezpečnost hesla zadaného uživatelem a na základě splněných bezpečnostních kritérií ohodnotí jeho sílu.
              </p>

              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  Kritéria pro hodnocení hesla (přičtěte 1 bod za každé splněné):
                </h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Délka hesla:</strong> Heslo musí mít alespoň 8 znaků (operátor <code>délka &gt; 7</code>).
                  </li>
                  <li>
                    <strong>Zákaz triviálních hesel:</strong> Heslo nesmí být rovno <code>"123456"</code> ani <code>"heslo"</code> ani <code>"admin"</code>.
                  </li>
                  <li>
                    <strong>Speciální znak:</strong> Heslo musí obsahovat alespoň jeden speciální znak z <code>@</code>, <code>!</code>, <code>#</code>).
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Závěrečné vyhodnocení kocourem:</h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-emerald-700">Skóre 3 body:</strong> Kocour řekne <em>„Vynikající bezpečné heslo! 🔒“</em></li>
                  <li><strong className="text-amber-700">Skóre 2 body:</strong> Kocour řekne <em>„Průměrné heslo, zvaž vylepšení! ⚠️“</em></li>
                  <li><strong className="text-rose-700">Skóre 0 nebo 1 bod:</strong> Kocour řekne <em>„Slabé a nebezpečné heslo! ❌“</em></li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4">Nápověda pro kontrolní podmínky:</h4>
                <div className="flex flex-col gap-3 items-start">
                  <ScratchHexagon category="operators">
                    <ScratchBlock category="operators">délka <ScratchBlock category="variables">heslo</ScratchBlock></ScratchBlock>
                    {" > "}
                    <ScratchInput>7</ScratchInput>
                  </ScratchHexagon>

                  <ScratchHexagon category="operators">
                    ne
                    <span className="mx-1">
                      <ScratchHexagon isSlot>
                        <ScratchBlock category="variables">heslo</ScratchBlock> {" = "} <ScratchInput type="text">123456</ScratchInput>
                      </ScratchHexagon>
                    </span>
                  </ScratchHexagon>

                  <ScratchHexagon category="operators">
                    <ScratchBlock category="variables">heslo</ScratchBlock> obsahuje <ScratchInput type="text">@</ScratchInput> ?
                  </ScratchHexagon>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard
            number="12"
            title="Hádání čísla"
            taskId="cond-12"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Základní verze hry na jeden pokus. Počítač si vygeneruje náhodné číslo do proměnné <code>tajne_cislo</code> a pomocí bloku <code>když – jinak</code> okamžitě porovná uživatelskou odpověď.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">tajne_cislo</ScratchInput> na <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchReporter></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Jaké číslo si myslím? (1-10):</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCElseBlock
                      category="control"
                      condition={
                        <ScratchHexagon category="operators">
                          <ScratchReporter category="sensing">odpověď</ScratchReporter>
                          {" = "}
                          <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                        </ScratchHexagon>
                      }
                      elseChildren={
                        <div className="pl-2">
                          <ScratchBlock category="looks">bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Bohužel špatně! Bylo to: </ScratchInput> <ScratchReporter category="variables">tajne_cislo</ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock>
                        </div>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Výborně! Uhodl jsi! 🎉</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCElseBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="HadaniCisla.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600">
              <p className="font-bold">Vytvořte program ve kterém se snažíte uhodnout číslo, které si počítač myslí.</p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Počítač vygeneruje náhodné číslo od 1 do 10.</li>
                <li>Zobrazí se otázka <strong>„Hádej číslo“</strong> (nebo <strong>„Jaké číslo si myslím?“</strong>).</li>
                <li>Uživatelova odpověď se porovná s náhodně vygenerovaným číslem a zobrazí se, zda byla odpověď správná, nebo nesprávná.</li>
              </ul>

              <div className="mt-6 w-full max-w-[320px] aspect-[4/3] bg-white border border-slate-300 rounded-sm shadow-sm relative flex flex-col items-center justify-center p-4">
                <div className="flex gap-2 mb-2 ml-24">
                  <div className="bg-white border border-slate-300 rounded-[2rem] px-4 py-2 shadow-sm text-xs font-bold text-slate-600 whitespace-nowrap">
                    Jake cislo si myslim?
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
            </div>
          </TaskCard>
    </div>
  );
};
