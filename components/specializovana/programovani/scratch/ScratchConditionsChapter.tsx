"use client";

import React, { useState } from 'react';
import { Blocks, Lock, Unlock, CheckCircle, Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput, ScratchCBlock, ScratchHexagon, ScratchCElseBlock, ScratchSpeechBubble } from './ScratchBlocks';

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
      title="Podmíněný příkaz (Lekce 6)"
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
                <ScratchCBlock category="control">
                  když
                  <span className="mx-1">
                    <ScratchHexagon category="operators">
                      <ScratchBlock category="variables">penez</ScratchBlock> {">"} <ScratchInput>1000000</ScratchInput>
                    </ScratchHexagon>
                  </span>
                  tak
                  <div className="mt-2 ml-4">
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
            teacherNote={<p>Úvod do neúplného podmíněného příkazu. Žáci používají senzor <code>odpověď</code> a porovnávají ho pomocí bloku ze zelené kategorie Operátory.</p>}
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
            teacherNote={<p>Zde je nutné využít operátor "zbytek po dělení". Číslo je sudé, pokud je zbytek po dělení 2 roven 0.</p>}
          >
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Napište scénář, který se zeptá na číslo a vypíše "Číslo je sudé", pokud je číslo dělitelné 2.
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 w-fit">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nápověda k matematice</h4>
              <ScratchHexagon category="operators">
                <ScratchBlock category="operators">
                  zbytek <ScratchBlock category="sensing">odpověď</ScratchBlock> děleno <ScratchInput>2</ScratchInput>
                </ScratchBlock>
                {" = "}
                <ScratchInput>0</ScratchInput>
              </ScratchHexagon>
            </div>
          </TaskCard>

          <TaskCard
            number="3"
            title="První je větší"
            taskId="cond-3"
            showTeacher={teacherMode}
            teacherNote={<p>Protože chceme porovnat dvě čísla od uživatele zadaná postupně, je nutné si první číslo po první otázce uložit do proměnné. Jinak nová odpověď přepíše tu starou.</p>}
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
            teacherNote={<p>Žáci si nejprve vytvoří jednoduché chození na klávesy. Poté ve stejném cyklu kontrolují pozici okrajů – <code>když x {">"} 210</code>, <code>když x {"<"} -210</code> atd.</p>}
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
            teacherNote={<p>Místo na střed se kočka při překročení x {">"} 210 přesune na opačnou stranu, tedy na x = -210 (a zachová si své y). Podobně pro ostatní okraje.</p>}
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
                  elseChildren={
                    <div className="ml-4 mt-2 mb-2">
                      <ScratchBlock category="looks">bublina <ScratchInput type="text">chudý</ScratchInput></ScratchBlock>
                    </div>
                  }
                >
                  <span className="mx-1">
                    <ScratchHexagon category="operators">
                      <ScratchBlock category="variables">penez</ScratchBlock> {">"} <ScratchInput>1000000</ScratchInput>
                    </ScratchHexagon>
                  </span>
                  <div className="ml-4 mt-2 mb-2">
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
            teacherNote={<p>Úprava úkolu č. 2. Žáci nahradí jednoduché "když" za úplné "když - jinak". Odpadá tak nutnost tvořit dvě nezávislé podmínky pro sudé a liché číslo.</p>}
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
            teacherNote={<p>Zde se projeví, zda žáci pochopili, že se na dvě čísla musí zeptat postupně a to první si musí uložit do proměnné. Jinak nová "odpověď" přepíše tu starou. Pro třetí bod (Jsou stejná) je nutné vnořit další "když-jinak" do větve "jinak".</p>}
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
            teacherNote={<p>Žáci využijí cyklus k náhodnému rozmístění teček. Pro Polsko (horizontální) testujeme osu Y (y {">"} 0 = bílá, jinak červená). Pro Francii (vertikální) testujeme osu X s více podmínkami. Německo má 3 horizontální pruhy. Japonsko vyžaduje složitější matematiku nebo vzdálenost od středu.</p>}
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
            teacherNote={<p>Žáci rozšiřují předchozí program. Francie vyžaduje složitější testování osy X s vnořenými podmínkami. Japonsko je bonus vyžadující výpočet vzdálenosti od středu (kruh).</p>}
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

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
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
            number="10"
            title="Zkoušení malé násobilky"
            taskId="cond-10"
            showTeacher={teacherMode}
            teacherNote={<p>Žáci si musí vygenerovaná čísla uložit do dvou proměnných, aby mohli spočítat správný výsledek pro kontrolu. Dále potřebují třetí proměnnou na počítání správných odpovědí. Známkování na konci vyžaduje složené větvení (když-jinak s dalším vloženým když-jinak).</p>}
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

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center gap-4">
                  <h4 className="font-bold text-slate-800 mb-2">Nápověda k vytvoření otázky:</h4>
                  <div className="flex flex-col gap-4 items-start">
                    <ScratchBlock category="operators">
                      spoj <ScratchInput type="text">jablko </ScratchInput> <ScratchInput type="text">banán</ScratchInput>
                    </ScratchBlock>
                    <ScratchBlock category="sensing">
                      otázka <ScratchInput type="text"></ScratchInput> a čekej
                    </ScratchBlock>
                  </div>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard
            number="11"
            title="Hádání čísla"
            taskId="cond-11"
            showTeacher={teacherMode}
            teacherNote={<p>Klasická hra vyšší/nižší by k tomuto zadání seděla lépe, ale zadání zmiňuje jen "správná / nesprávná odpověď". Aplikujte zadání 1:1, žáci si vyzkouší porovnávání vygenerované proměnné s odpovědí.</p>}
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
            number="12"
            title="Hádání čísla (vylepšené)"
            taskId="cond-12"
            showTeacher={teacherMode}
            teacherNote={<p>Zde žáci přidají cyklus "opakuj dokud nenastane". Podmínka v cyklu bude (odpověď = hádané číslo). Nápověda vyšší/nižší vyžaduje navíc vložit podmínku když-jinak.</p>}
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
        </div>
      </div>
    </FsChapterShell>
  );
};

export default ScratchConditionsChapter;
