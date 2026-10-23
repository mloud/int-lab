"use client";

import React, { useState } from 'react';
import { Blocks, Lock, Unlock, CheckCircle, Save, KeyRound, Landmark, ShieldCheck } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput, ScratchCBlock, ScratchHexagon, ScratchCElseBlock, ScratchSpeechBubble, ScratchDistanceBlock, ScratchReporter } from './ScratchBlocks';

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
      <Unlock className="w-4 h-4" />
      Metodická poznámka
    </div>
    <div className="text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  </div>
);

const TaskCard = ({
  number,
  title,
  children,
  teacherNote,
  showTeacher,
  taskId,
  saveAs
}: {
  number: string,
  title: string,
  children: React.ReactNode,
  teacherNote?: React.ReactNode,
  showTeacher?: boolean,
  taskId: string,
  saveAs?: string
}) => {
  const [completed, setCompleted] = useLocalStorage(`scratch-task-${taskId}-completed`, false);

  return (
    <div className={`
      bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 transition-all duration-300
      ${completed ? 'border-amber-200 bg-amber-50/10' : 'border-white'}
    `}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 font-black text-xl shrink-0">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">{title}</h3>
            {saveAs && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mt-1 uppercase tracking-wider">
                <Save className="w-3.5 h-3.5" />
                Uložit jako: {saveAs}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setCompleted(!completed)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors
            ${completed
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            }
          `}
        >
          <CheckCircle className={`w-5 h-5 ${completed ? 'opacity-100' : 'opacity-50'}`} />
          {completed ? 'Hotovo' : 'Označit za hotové'}
        </button>
      </div>

      <div className="text-slate-700">
        {children}
      </div>

      {showTeacher && teacherNote && (
        <TeacherNote>{teacherNote}</TeacherNote>
      )}
    </div>
  );
};

export const ScratchConditionsChapter = ({ onBack }: { onBack?: () => void }) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState("");

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setTeacherMode(true);
      setPinMode(false);
      setPin("");
    }
  };

  return (
    <FsChapterShell
      title="Podmíněný příkaz (Lekce 5)"
      icon={<Blocks className="w-8 h-8 text-white" />}
      accentColor="border-amber-500"
      onBack={onBack}
    >
      <div className="flex justify-end mb-4">
        {teacherMode ? (
          <button
            onClick={() => setTeacherMode(false)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Unlock className="w-4 h-4" />
            Metodický režim aktivní
          </button>
        ) : (
          pinMode ? (
            <form onSubmit={handlePinSubmit} className="flex gap-2">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                className="w-20 px-2 py-1 text-sm border-2 border-slate-200 rounded-lg outline-none focus:border-amber-400"
                autoFocus
              />
              <button type="submit" className="px-3 py-1 text-sm bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700">
                OK
              </button>
            </form>
          ) : (
            <button
              onClick={() => setPinMode(true)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Učitel
            </button>
          )
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-12 pb-24">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Podmíněný příkaz</h2>
          <p className="text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Podmínky umožňují našim programům rozhodovat se. Kód už nepoběží jen jednoduše shora dolů, ale rozvětví se podle toho, zda je nějaká podmínka pravdivá (platí) nebo nepravdivá (neplatí).
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Nové bloky</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Abychom mohli podmínky využívat, musíme se seznámit se speciálními bloky ve tvaru <strong>šestiúhelníku</strong>. Ty reprezentují pravdu/nepravdu a pasují do bloku "když – tak".
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Relační operátory (Porovnávání)</h4>
              <div className="flex flex-col gap-2 items-start">
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {">"} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {"<"} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {"="} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Logické operátory (Kombinování)</h4>
              <div className="flex flex-col gap-2 items-start">
                <ScratchHexagon category="operators">
                  <ScratchHexagon isSlot /> a <ScratchHexagon isSlot />
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchHexagon isSlot /> nebo <ScratchHexagon isSlot />
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  ne <ScratchHexagon isSlot />
                </ScratchHexagon>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full">
              <h4 className="font-bold text-slate-800 mb-4 text-center">Ukázka:</h4>
              <div className="flex justify-center">
                <ScratchCBlock
                  category="control"
                  topLabel={
                    <>
                      když
                      <span className="mx-1">
                        <ScratchHexagon category="operators">
                          <ScratchBlock category="variables">penez</ScratchBlock> {">"} <ScratchInput>1000000</ScratchInput>
                        </ScratchHexagon>
                      </span>
                      tak
                    </>
                  }
                >
                  <div className="py-1">
                    <ScratchBlock category="looks">bublina <ScratchInput type="text">Jsem bohatý</ScratchInput></ScratchBlock>
                  </div>
                </ScratchCBlock>
              </div>
            </div>
          </div>
        </div>

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

          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl p-8 my-8 shadow-sm">
            <h3 className="text-2xl font-black text-amber-900 mb-6 uppercase tracking-tight">Cyklus s podmínkou</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex flex-col items-start bg-white p-4 rounded-xl shadow-sm border border-amber-100 relative">
                  <ScratchBlock category="variables">
                    nastav <ScratchInput type="dropdown">cislo</ScratchInput> na <ScratchInput>0</ScratchInput>
                  </ScratchBlock>
                  <ScratchCBlock
                    category="control"
                    topLabel={
                      <>
                        opakuj dokud nenastane
                        <span className="mx-1">
                          <ScratchHexagon category="operators">
                            <ScratchBlock category="variables">cislo</ScratchBlock> {"="} <ScratchInput>3</ScratchInput>
                          </ScratchHexagon>
                        </span>
                      </>
                    }
                  >
                    <div className="flex flex-col gap-1 w-fit">
                      <ScratchBlock category="looks">bublina <ScratchBlock category="variables">cislo</ScratchBlock> <ScratchInput>1</ScratchInput> sekund</ScratchBlock>
                      <ScratchBlock category="variables">změň <ScratchInput type="dropdown">cislo</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                    </div>
                  </ScratchCBlock>

                  {/* Šipka ukazující na podmínku */}
                  <div className="hidden md:block absolute -top-4 -right-16 w-32 h-24 border-t-2 border-r-2 border-slate-400 rounded-tr-[3rem] opacity-60 z-0">
                    <div className="absolute -bottom-1 -left-2 text-slate-400">▼</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Nejdříve se vyhodnotí podmínka a pak se opakují příkazy v těle cyklu dokud není podmínka splněna.
                </p>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Co vypíše tento scénář?</p>
                </div>
              </div>
            </div>
          </div>

          <TaskCard
            number="13"
            title="Hádání čísla (vylepšené)"
            taskId="cond-13"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Přechod na cyklus s podmínkou <code>opakuj dokud nenastane (odpověď = tajne_cislo)</code>. V každém průchodu cyklem zvýšíme počítadlo pokusů o 1 a pomocí vnitřního <code>když – jinak</code> napovíme hráči <em>Přidej!</em> nebo <em>Uber!</em>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">tajne_cislo</ScratchInput> na <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>100</ScratchInput></ScratchReporter></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokusy</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          opakuj dokud nenastane
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="sensing">odpověď</ScratchReporter>
                            {" = "}
                            <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                          </ScratchHexagon>
                        </>
                      }
                    >
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Hádej číslo (1-100):</ScratchInput> a čekej</ScratchBlock></div>
                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">pokusy</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                        <div>
                          <ScratchCBlock
                            category="control"
                            topLabel={
                              <>
                                když
                                <ScratchHexagon category="operators">
                                  ne
                                  <ScratchHexagon isSlot>
                                    <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                                  </ScratchHexagon>
                                </ScratchHexagon>
                                tak
                              </>
                            }
                          >
                            <div className="pl-2">
                              <ScratchCElseBlock
                                category="control"
                                condition={
                                  <ScratchHexagon category="operators">
                                    <ScratchReporter category="sensing">odpověď</ScratchReporter> {"<"} <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                                  </ScratchHexagon>
                                }
                                elseChildren={
                                  <div className="pl-2">
                                    <ScratchBlock category="looks">bublina <ScratchInput type="text">Uber! (Moje číslo je menší)</ScratchInput> na <ScratchInput>1.5</ScratchInput> sekund</ScratchBlock>
                                  </div>
                                }
                              >
                                <div className="pl-2">
                                  <ScratchBlock category="looks">bublina <ScratchInput type="text">Přidej! (Moje číslo je větší)</ScratchInput> na <ScratchInput>1.5</ScratchInput> sekund</ScratchBlock>
                                </div>
                              </ScratchCElseBlock>
                            </div>
                          </ScratchCBlock>
                        </div>
                      </div>
                    </ScratchCBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchBlock category="looks">
                      bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Gratuluji! Uhodl jsi na </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">pokusy</ScratchReporter> <ScratchInput type="text"> pokusů!</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund
                    </ScratchBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="HadaniCisla2.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600">
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  <p>Upravte program na hádání čísla tak, aby uživatel hádal tak dlouho, dokud číslo neuhádne.</p>
                  <div className="mt-2 inline-block">
                    <ScratchCBlock category="control" topLabel={<>opakuj dokud nenastane <ScratchHexagon isSlot category="control" /></>}>
                      <div className="h-4"></div>
                    </ScratchCBlock>
                  </div>
                </li>
                <li>Upravte program tak, aby počítal počet pokusů.</li>
                <li>Přidejte do programu nápovědu při špatné odpovědi, zda je hádané číslo větší nebo menší.</li>
                <li className="italic font-bold text-amber-600">
                  Extra Bonus - Přidejte ještě opakování celého hádání - do doby než uživatel nepotvrdí, že chce skončit.
                </li>
              </ul>
            </div>
          </TaskCard>

          <TaskCard
            number="14"
            title="Bankomat (ATM) a bezpečnostní trezor"
            taskId="cond-14"
            showTeacher={teacherMode}
            teacherNote={
              <div className="space-y-3">
                <p>
                  <strong>Metodické vysvětlení:</strong> Syntetický projekt. Program je rozdělen na dvě klíčové fáze:
                  (1) Přihlášení chráněné cyklem na max. 3 chybné pokusy, (2) Samotný výběr rozložený do tří samostatných podmínek pro přesnou diagnostiku chyb (nedostatek financí, limit transakce, bankovky po 100 Kč) a možností opakování transakce.
                </p>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    Fáze 1: Ověření PINu (max. 3 pokusy):
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                    <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">PIN</ScratchInput> na <ScratchInput>1234</ScratchInput></ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">zustatek</ScratchInput> na <ScratchInput>5000</ScratchInput></ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokusy</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                    <div className="pl-4">
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <>
                            opakuj dokud nenastane
                            <ScratchHexagon category="operators">
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">PIN</ScratchReporter>
                              </ScratchHexagon>
                              nebo
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">pokusy</ScratchReporter> {" = "} <ScratchInput>3</ScratchInput>
                              </ScratchHexagon>
                            </ScratchHexagon>
                          </>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadejte 4místný PIN:</ScratchInput> a čekej</ScratchBlock></div>
                          <div>
                            <ScratchCBlock
                              category="control"
                              topLabel={
                                <>
                                  když
                                  <ScratchHexagon category="operators">
                                    ne
                                    <ScratchHexagon isSlot>
                                      <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">PIN</ScratchReporter>
                                    </ScratchHexagon>
                                  </ScratchHexagon>
                                  tak
                                </>
                              }
                            >
                              <div className="pl-2 space-y-1">
                                <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">pokusy</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                                <div><ScratchBlock category="looks">bublina <ScratchInput type="text">Špatný PIN!</ScratchInput> na <ScratchInput>1.5</ScratchInput> sekund</ScratchBlock></div>
                              </div>
                            </ScratchCBlock>
                          </div>
                        </div>
                      </ScratchCBlock>
                    </div>
                    <div className="pl-4">
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <>
                            když
                            <ScratchHexagon category="operators">
                              <ScratchReporter category="variables">pokusy</ScratchReporter> {" = "} <ScratchInput>3</ScratchInput>
                            </ScratchHexagon>
                            tak
                          </>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="looks">bublina <ScratchInput type="text">Karta zablokována! 🚨</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                          <div><ScratchBlock category="control">zastav <ScratchInput type="dropdown">všechno</ScratchInput></ScratchBlock></div>
                        </div>
                      </ScratchCBlock>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                    Fáze 2: Výběr peněz, 3 samostatné kontroly chyb a opakování:
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                    <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokracovat</ScratchInput> na <ScratchInput type="text">ano</ScratchInput></ScratchBlock></div>
                    <div>
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <>
                            opakuj dokud nenastane
                            <ScratchHexagon category="operators">
                              ne
                              <ScratchHexagon isSlot>
                                <ScratchReporter category="variables">pokracovat</ScratchReporter> {" = "} <ScratchInput type="text">ano</ScratchInput>
                              </ScratchHexagon>
                            </ScratchHexagon>
                          </>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Kolik chcete vybrat Kč?</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vyber</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>

                          {/* 3 rozložené podmínky pro přesnou diagnostiku chyb */}
                          <div>
                            <ScratchCElseBlock
                              category="control"
                              condition={
                                <ScratchHexagon category="operators">
                                  <ScratchReporter category="variables">vyber</ScratchReporter> {">"} <ScratchReporter category="variables">zustatek</ScratchReporter>
                                </ScratchHexagon>
                              }
                              elseChildren={
                                <div className="pl-2">
                                  <ScratchCElseBlock
                                    category="control"
                                    condition={
                                      <ScratchHexagon category="operators">
                                        <ScratchReporter category="variables">vyber</ScratchReporter> {">"} <ScratchInput>3000</ScratchInput>
                                      </ScratchHexagon>
                                    }
                                    elseChildren={
                                      <div className="pl-2">
                                        <ScratchCElseBlock
                                          category="control"
                                          condition={
                                            <ScratchHexagon category="operators">
                                              ne
                                              <ScratchHexagon isSlot>
                                                <ScratchReporter category="operators">
                                                  zbytek <ScratchReporter category="variables">vyber</ScratchReporter> děleno <ScratchInput>100</ScratchInput>
                                                </ScratchReporter>
                                                {" = "}
                                                <ScratchInput>0</ScratchInput>
                                              </ScratchHexagon>
                                            </ScratchHexagon>
                                          }
                                          elseChildren={
                                            <div className="pl-2 space-y-1">
                                              <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">zustatek</ScratchInput> o <ScratchReporter category="operators"><ScratchInput>0</ScratchInput> - <ScratchReporter category="variables">vyber</ScratchReporter></ScratchReporter></ScratchBlock></div>
                                              <div><ScratchBlock category="looks">bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Výběr schválen! Zůstatek: </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">zustatek</ScratchReporter> <ScratchInput type="text"> Kč</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                                            </div>
                                          }
                                        >
                                          <div className="pl-2">
                                            <ScratchBlock category="looks">bublina <ScratchInput type="text">Chyba: Bankomat vydává pouze celé stokoruny! 💵</ScratchInput> na <ScratchInput>2.5</ScratchInput> sekund</ScratchBlock>
                                          </div>
                                        </ScratchCElseBlock>
                                      </div>
                                    }
                                  >
                                    <div className="pl-2">
                                      <ScratchBlock category="looks">bublina <ScratchInput type="text">Chyba: Částka překračuje jednorázový limit (max 3 000 Kč)! ⚠️</ScratchInput> na <ScratchInput>2.5</ScratchInput> sekund</ScratchBlock>
                                    </div>
                                  </ScratchCElseBlock>
                                </div>
                              }
                            >
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Chyba: Nedostatek financí! Zůstatek je jen </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">zustatek</ScratchReporter> <ScratchInput type="text"> Kč 💳</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>2.5</ScratchInput> sekund</ScratchBlock>
                              </div>
                            </ScratchCElseBlock>
                          </div>

                          <div className="pt-1"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Přejete si pokračovat? (ano / ne)</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokracovat</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                        </div>
                      </ScratchCBlock>
                    </div>
                    <div><ScratchBlock category="looks">bublina <ScratchInput type="text">Děkujeme za návštěvu, nezapomeňte si kartu! 👋</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                  </div>
                </div>
              </div>
            }
            saveAs="Bankomat.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-800">
                Závěrečný komplexní projekt: Vytvořte inteligentní bankomat, který spravuje uživatelský účet, brání neoprávněnému vniknutí a dohlíží na pravidla výdeje hotovosti.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    1. Fáze: Bezpečnostní přihlášení
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Správný PIN je uložen v proměnné (např. <code>1234</code>).</li>
                    <li>Uživatel má maximálně <strong>3 pokusy</strong> na zadání správného PINu (použijte cyklus <code>opakuj dokud nenastane</code>).</li>
                    <li>Pokud zadá 3× špatný PIN, bankomat ohlásí <em>„Karta zablokována! 🚨“</em> a program se zastaví.</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    2. Fáze: Pravidla výběru hotovosti
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Počáteční <code>zustatek</code> je 5 000 Kč a jednorázový <code>limit</code> je 3 000 Kč.</li>
                    <li><strong>Pravidlo 1 (Dostatek peněz):</strong> Částka nesmí být vyšší než zůstatek.</li>
                    <li><strong>Pravidlo 2 (Bankovky):</strong> Bankomat vydává pouze stovky (zbytek po dělení 100 musí být 0).</li>
                    <li><strong>Pravidlo 3 (Limit):</strong> Částka nesmí překročit limit 3 000 Kč.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">3. Fáze: Provedení transakce</h4>
                <p>
                  Pokud jsou všechna pravidla splněna, odečtěte požadovanou částku ze zůstatku a vypište:
                  <strong className="text-slate-800 block mt-1">„Výběr schválen! Zůstatek na vašem účtu je: [zustatek] Kč.“</strong>
                  Pokud některé pravidlo splněno není, bankomat musí uživateli jasně říct, v čem nastala chyba.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col gap-3">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Klíčové bloky k sestavení:
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <ScratchCBlock
                    category="control"
                    topLabel={
                      <>
                        opakuj dokud nenastane <ScratchHexagon isSlot category="control" />
                      </>
                    }
                  >
                    <div className="h-4"></div>
                  </ScratchCBlock>

                  <ScratchHexagon category="operators">
                    ne <ScratchHexagon isSlot />
                  </ScratchHexagon>

                  <ScratchBlock category="operators">
                    zbytek <ScratchInput> </ScratchInput> děleno <ScratchInput> </ScratchInput>
                  </ScratchBlock>
                </div>
              </div>

              <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-300 text-xs text-slate-700 space-y-2.5">
                <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                  <span className="text-base">💡</span>
                  <span>Bonusová výzva: Pokračování v transakcích (opakování výběru)</span>
                </div>
                <p className="leading-relaxed">
                  Na konci výběru – <strong>ať už byl úspěšný, nebo neúspěšný</strong> (např. z důvodu nedostatku financí, špatných bankovek či překročení limitu) – se bankomat vždy zeptá:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li>
                    Otázka pro uživatele: <strong>„Přejete si pokračovat? (ano / ne)“</strong>.
                  </li>
                  <li>
                    Pokud uživatel odpoví <strong>„ano“</strong>, celý proces zadání částky a ověření pravidel se <strong>zopakuje</strong> (využijte cyklus <code>opakuj dokud nenastane (odpověď = ne)</code>). Pokud byl předchozí výběr úspěšný, počítá se samozřejmě s novým, sníženým zůstatkem!
                  </li>
                  <li>
                    Pokud uživatel odpoví <strong>„ne“</strong> (nebo cokoliv jiného), bankomat vypíše: <em>„Děkujeme za návštěvu, nezapomeňte si vzít svou platební kartu.“</em> a program se korektně ukončí.
                  </li>
                </ul>
              </div>
            </div>
          </TaskCard>
        </div>
      </div>
    </FsChapterShell>
  );
};

export default ScratchConditionsChapter;
