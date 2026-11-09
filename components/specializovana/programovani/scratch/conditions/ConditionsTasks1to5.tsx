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

export const ConditionsTasks1to5 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
          <TaskCard
            number="1"
            title="Je větší?"
            taskId="cond-1"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodický cíl:</strong> Úvod do neúplného podmíněného příkazu (<code>když ... tak</code>). Žáci použijí blok otázky z kategorie <em>Vnímání</em>, senzor <code>odpověď</code> a porovnávací operátor <code>&gt;</code> z kategorie <em>Operátory</em>. Pokud podmínka neplatí, program neudělá nic.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="sensing">odpověď</ScratchReporter> {">"} <ScratchInput>100</ScratchInput>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Číslo je větší než 100</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="PodminkaNeuplna.sb3"
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Napište scénář, který se zeptá na číslo a vypíše "Číslo je větší než 100", <strong>pokud je číslo větší než 100</strong>. Pokud je menší nebo rovno, program neudělá nic.
            </p>
          </TaskCard>

          <TaskCard
            number="2"
            title="Je sudé?"
            taskId="cond-2"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodický cíl:</strong> Využití operátoru modulo (<em>zbytek po dělení</em>). Číslo je sudé, pokud je zbytek po dělení dvěma přesně roven nule. Jde o typický vzor, se kterým se žáci budou setkávat v každém programovacím jazyce.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej číslo k ověření sudosti:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="operators">
                              zbytek <ScratchReporter category="sensing">odpověď</ScratchReporter> děleno <ScratchInput>2</ScratchInput>
                            </ScratchReporter>
                            {" = "}
                            <ScratchInput>0</ScratchInput>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">Číslo je sudé</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Napište scénář, který se zeptá na číslo a vypíše "Číslo je sudé", pokud je číslo dělitelné 2.
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 w-fit">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nápověda k matematice (potřebné bloky):</h4>
              <div className="flex flex-wrap items-center gap-3">
                <ScratchBlock category="operators">
                  zbytek <ScratchBlock category="sensing">odpověď</ScratchBlock> děleno <ScratchInput>2</ScratchInput>
                </ScratchBlock>
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {"="} <ScratchInput>0</ScratchInput>
                </ScratchHexagon>
              </div>
            </div>
          </TaskCard>

          <TaskCard
            number="3"
            title="První je větší"
            taskId="cond-3"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Klíčový didaktický moment:</strong> Scratch má pouze jednu globální proměnnou <code>odpověď</code>. Pokud se zeptáme na druhé číslo, hodnota první odpovědi se nenávratně přepíše. Žák si proto <em>musí</em> první odpověď okamžitě uložit do vlastní proměnné (např. <code>prvni_cislo</code>).
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej první číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">prvni_cislo</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadej druhé číslo:</ScratchInput> a čekej</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          když
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="variables">prvni_cislo</ScratchReporter> {">"} <ScratchReporter category="sensing">odpověď</ScratchReporter>
                          </ScratchHexagon>
                          tak
                        </>
                      }
                    >
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina <ScratchInput type="text">První je větší</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Napište scénář, který se zeptá na dvě čísla a vypíše "První je větší", pokud je první číslo větší než druhé.
            </p>
            <div className="mt-4 text-sm font-bold text-amber-600">
              ⚠️ Pozor: Nezapomeňte si první odpověď uložit do proměnné!
            </div>
          </TaskCard>

          <TaskCard
            number="4"
            title="Vracení do středu"
            taskId="cond-4"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Herní smyčka běží v bloku <code>opakuj stále</code>. Kočka reaguje na směrové šipky změnou x a y. Scéna má šířku 480 (-240 až 240) a výšku 360 (-180 až 180). Hranice 30 kroků od okraje znamená: <code>x &gt; 210</code>, <code>x &lt; -210</code>, <code>y &gt; 150</code>, <code>y &lt; -150</code>. Při detekci libovolného okraje skočí kočka zpět do středu <code>(0, 0)</code>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel="opakuj stále">
                      <div className="pl-2 space-y-1">
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="sensing">klávesa <ScratchInput type="dropdown">šipka vpravo</ScratchInput> stisknuta?</ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">změň x o <ScratchInput>10</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="sensing">klávesa <ScratchInput type="dropdown">šipka vlevo</ScratchInput> stisknuta?</ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">změň x o <ScratchInput>-10</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="sensing">klávesa <ScratchInput type="dropdown">šipka nahoru</ScratchInput> stisknuta?</ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="sensing">klávesa <ScratchInput type="dropdown">šipka dolů</ScratchInput> stisknuta?</ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">změň y o <ScratchInput>-10</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div className="pt-1">
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">x pozice</ScratchReporter> {">"} <ScratchInput>210</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">x pozice</ScratchReporter> {"<"} <ScratchInput>-210</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">y pozice</ScratchReporter> {">"} <ScratchInput>150</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">y pozice</ScratchReporter> {"<"} <ScratchInput>-150</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="PostavaNaStred.sb3"
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Vytvořte scénář, ve kterém se postava pohybuje pomocí směrových kláves (nahoru, dolů, doleva, doprava). Pokud se postava dostane blíže než na 30 kroků k okraji obrazovky, vraťte ji zpět na střed (souřadnice 0, 0).
            </p>

            <div className="grid md:grid-cols-12 gap-8 mt-8">
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[320px] aspect-[4/3] bg-white border-[12px] border-red-500 flex items-center justify-center shadow-sm">
                  {/* Jednoduchá ikona kočky */}
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.76 1.4.08 1.38 3.32 1.14 5.37a9.3 9.3 0 0 1 1.44 4.88c0 5.14-4.27 9.25-9.5 9.25S4 17.89 4 12.75a9.3 9.3 0 0 1 1.44-4.88c-.24-2.05-.26-5.29 1.14-5.37 1.39-.08 4.64.76 6.42 2.76C10.65 5.09 11.33 5 12 5Z" />
                    <path d="M9 13a2.5 2.5 0 0 0 5 0" />
                    <path d="M15 10h.01" />
                    <path d="M9 10h.01" />
                  </svg>
                </div>
                <div className="mt-6 w-full max-w-[320px] flex flex-col text-slate-600 font-bold text-lg space-y-1">
                  <div>Šířka 480</div>
                  <div>Výška 360</div>
                  <div>Střed 0,0</div>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-10 pl-0 md:pl-6">
                <div>
                  <h4 className="text-slate-600 font-medium mb-6">Nejprve je třeba naučit kočku chodit:</h4>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col">
                        <ScratchBlock category="events">po kliknutí na ⚑</ScratchBlock>
                        <ScratchCBlock category="control">
                          opakuj stále
                          <div className="h-10"></div>
                        </ScratchCBlock>
                      </div>

                      <ScratchCBlock category="control">
                        když <ScratchHexagon isSlot /> tak
                        <div className="h-8"></div>
                      </ScratchCBlock>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <ScratchHexagon category="sensing">
                        klávesa <ScratchInput type="dropdown">šipka vpravo</ScratchInput> stisknuta?
                      </ScratchHexagon>
                    </div>

                    <div className="flex gap-4">
                      <ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock>
                      <ScratchBlock category="motion">změň x o <ScratchInput>10</ScratchInput></ScratchBlock>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-600 font-medium mb-6">A pak vracet:</h4>
                  <div className="flex gap-4 items-center">
                    <ScratchBlock category="motion">
                      skoč na x: <ScratchInput>-30</ScratchInput> y: <ScratchInput>0</ScratchInput>
                    </ScratchBlock>
                    <ScratchBlock category="motion">x</ScratchBlock>
                    <ScratchBlock category="motion">y</ScratchBlock>
                  </div>
                </div>
              </div>
            </div>

          </TaskCard>
          <TaskCard
            number="5"
            title="Pac-Man efekt (přechod přes okraj)"
            taskId="cond-5"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Místo skoku do středu postavu přeneseme na protější okraj scény. Důležité je měnit pouze příslušnou osu (<code>nastav x na ...</code> nebo <code>nastav y na ...</code>), aby si postava zachovala druhou souřadnici a pohyb byl plynulý.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel="opakuj stále">
                      <div className="pl-2 space-y-1">
                        <div className="text-slate-400 italic font-sans text-[11px]">// Pohyb na šipky stejný jako v úloze 4...</div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">x pozice</ScratchReporter> {">"} <ScratchInput>210</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">nastav x na <ScratchInput>-210</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">x pozice</ScratchReporter> {"<"} <ScratchInput>-210</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">nastav x na <ScratchInput>210</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">y pozice</ScratchReporter> {">"} <ScratchInput>150</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">nastav y na <ScratchInput>-150</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                        <div>
                          <ScratchCBlock category="control" topLabel={<>když <ScratchHexagon category="operators"><ScratchReporter category="motion">y pozice</ScratchReporter> {"<"} <ScratchInput>-150</ScratchInput></ScratchHexagon> tak</>}>
                            <div className="pl-2"><ScratchBlock category="motion">nastav y na <ScratchInput>150</ScratchInput></ScratchBlock></div>
                          </ScratchCBlock>
                        </div>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="PostavaNaOkraj.sb3"
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Upravte předchozí scénář. Vytvořte scénář, ve kterém se postava pohybuje pomocí směrových kláves (nahoru, dolů, doleva, doprava). Pokud se postava dostane blíže než na 30 kroků k okraji obrazovky, objeví se na druhé straně obrazovky (jako ve hře Pac-Man).
            </p>
            <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">Rozměry scény ve Scratchi:</h4>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li><strong>Šířka:</strong> 480 (od -240 do 240)</li>
                <li><strong>Výška:</strong> 360 (od -180 do 180)</li>
                <li><strong>Střed:</strong> x = 0, y = 0</li>
              </ul>
            </div>
          </TaskCard>
    </div>
  );
};
