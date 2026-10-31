'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Calculator, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopVarChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-violet-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-violet-500 mr-2 select-none">{">>>"}</span>
            <span className="text-violet-300">{line.substring(3).trim()}</span>
          </>
        ) : line.startsWith('SyntaxError') || line.startsWith('Traceback') || line.startsWith('File') || line.startsWith('NameError') ? (
          <span className="text-rose-400">{line}</span>
        ) : (
          <span className="text-slate-300 whitespace-pre">{line}</span>
        )}
      </div>
    ))}
  </div>
);

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-violet-600" />
      <span className="font-bold text-violet-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-violet-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ 
  children, 
  width = 300, 
  height = 200, 
  className = "", 
  bgColor = "white" 
}: { 
  children: React.ReactNode; 
  width?: number; 
  height?: number; 
  className?: string; 
  bgColor?: string; 
}) => (
  <div 
    className={`relative border-2 border-slate-400 shadow-sm mx-auto my-4 overflow-hidden rounded-xs ${className}`} 
    style={{ width, height, backgroundColor: bgColor }}
  >
    {children}
  </div>
);

const Rect = ({ 
  x1, 
  y1, 
  width, 
  height, 
  fill = "transparent", 
  stroke = "black",
  strokeWidth = 1,
  className = ""
}: { 
  x1: number; 
  y1: number; 
  width: number; 
  height: number; 
  fill?: string; 
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) => (
  <div 
    className={`absolute ${className}`} 
    style={{ 
      left: x1, 
      top: y1, 
      width, 
      height, 
      backgroundColor: fill,
      border: strokeWidth > 0 ? `${strokeWidth}px solid ${stroke}` : 'none'
    }} 
  />
);

const Text = ({ 
  x, 
  y, 
  text, 
  fontSize = 14, 
  fontFamily = "Arial, sans-serif",
  fontWeight = "normal",
  color = "black" 
}: { 
  x: number; 
  y: number; 
  text: string | number; 
  fontSize?: number; 
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string; 
}) => (
  <div 
    className="absolute flex items-center justify-center select-none"
    style={{ 
      left: x, 
      top: y, 
      transform: 'translate(-50%, -50%)',
      fontSize: `${fontSize}px`,
      fontFamily,
      fontWeight,
      color
    }}
  >
    {text}
  </div>
);

const TaskCard = ({ 
  number, 
  children, 
  teacherNote, 
  showTeacher,
  taskId
}: { 
  number: string; 
  children: React.ReactNode; 
  teacherNote?: React.ReactNode; 
  showTeacher: boolean;
  taskId: string;
}) => {
  const [done, setDone] = useLocalStorage(`py12-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4 items-start">
        <div className="shrink-0 w-12 h-12 bg-violet-100 text-violet-700 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
            {children}
          </div>

          {showTeacher && teacherNote && (
            <TeacherNote>{teacherNote}</TeacherNote>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setDone(!done)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wide uppercase active:scale-95 cursor-pointer ${
                done 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
              {done ? 'Splněno' : 'Označit jako splněné'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PythonLoopVarChapter: React.FC<PythonLoopVarChapterProps> = ({ onBack }) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState('');

  const handleToggleTeacher = () => {
    if (teacherMode) {
      setTeacherMode(false);
    } else {
      setPinMode(true);
      setPin('');
    }
  };

  const submitPin = () => {
    if (pin === '1234') {
      setTeacherMode(true);
      setPinMode(false);
    } else {
      alert('Nesprávný PIN');
      setPinMode(false);
    }
  };

  return (
    <FsChapterShell
      title="Proměnná cyklu"
      subtitle="Programování v jazyce Python pro střední školy (Lekce 12)"
      icon={<Calculator className="w-8 h-8 text-violet-600" />}
      onBack={onBack}
      accentColor="violet"
      tabs={[{ id: 'lekce', label: '12. lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-violet-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-violet-600 text-white px-3 py-1 rounded-lg font-bold text-sm cursor-pointer">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 cursor-pointer ${
              teacherMode ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">

        {/* Úloha 1 */}
        <TaskCard 
          number="1" 
          taskId="1" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Úloha slouží k zopakování tvorby cyklu for. Žáci by měli použít dva samostatné cykly for:</p>
              <PythonSnippet code={`print('kočka leze dírou')\nfor i in range(2):\n    print('pes oknem')\nfor i in range(2):\n    print('nebude-li pršet')\n    print('nezmoknem')`} />
            </div>
          }
        >
          <p>Tvůj mladší sourozenec našel následující říkanku:</p>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-relaxed">
            kočka leze dírou<br/>
            pes oknem<br/>
            pes oknem<br/>
            nebude-li pršet<br/>
            nezmoknem<br/>
            nebude-li pršet<br/>
            nezmoknem
          </div>
          <p>
            Vytvoř program <code>rikanka.py</code>, který ji vypíše pomocí příkazů <code>print</code>. Použij <code>for</code> cykly, aby bylo v programu co nejméně příkazů <code>print</code>.
          </p>
        </TaskCard>

        {/* Úloha 2 */}
        <TaskCard 
          number="2" 
          taskId="2" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">V této úloze žáci poprvé využívají proměnnou cyklu. Zásadní je uvědomit si, že čísla generovaná funkcí <code>range(10)</code> začínají od 0 a končí u 9 (tedy celkem 10 čísel z polootevřeného intervalu &lt;0, 10)).</p>
            </div>
          }
        >
          <p>
            Vytvoř program <code>rada_cisel.py</code> a pomocí následujícího kódu vypiš celá čísla od 0 do 9:
          </p>
          
          <PythonSnippet code={`for i in range(10):\n    print('číslo', i)`} />

          <p>Jestli jsi kód zapsal(a) správně, program po spuštění vypíše:</p>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-snug">
            číslo 0<br/>
            číslo 1<br/>
            číslo 2<br/>
            číslo 3<br/>
            číslo 4<br/>
            číslo 5<br/>
            číslo 6<br/>
            číslo 7<br/>
            číslo 8<br/>
            číslo 9
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 text-base mb-3">Jak to funguje?</h4>
            
            <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-slate-200 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-violet-400 font-bold">for</span>
                <span className="text-sky-300 font-bold bg-sky-950/60 px-1 rounded">i</span>
                <span>in range(</span>
                <span className="text-amber-300 font-bold bg-amber-950/60 px-1 rounded">10</span>
                <span>):</span>
              </div>
              <div className="pl-6 border-l-4 border-violet-500 ml-2 py-1 flex items-center gap-1">
                <span>print('číslo',</span>
                <span className="text-sky-300 font-bold bg-sky-950/60 px-1 rounded">i</span>
                <span>)</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0 mt-1"></span>
                <span><strong>i je proměnná</strong>, do které příkaz <code>for</code> postupně přiřazuje celá čísla od 0 do 9</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1"></span>
                <span><strong>rozsah čísel</strong> je z intervalu &lt;0, 10)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0 mt-1"></span>
                <span><strong>pro každé číslo</strong> se vykoná tělo cyklu, a tak se vypíše hodnota proměnné <code>i</code></span>
              </li>
            </ul>

            <div className="mt-5 p-3.5 bg-slate-100 rounded-xl border border-slate-300 text-center text-xs sm:text-sm text-slate-800 font-medium">
              Příkaz <code>for</code> čteme: <em>„pro i v rozsahu(...) vykonej tělo cyklu“</em>
            </div>
          </div>
        </TaskCard>

        {/* Úloha 3 */}
        <TaskCard 
          number="3" 
          taskId="3" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Možná řešení:</p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
                <li>a) <code>for i in range(11): print('číslo', i)</code></li>
                <li>b) <code>for i in range(10): print('číslo', i + 1)</code> (nebo <code>range(1, 11)</code>)</li>
                <li>c) <code>for i in range(10): print('číslo', (i + 1) * 2)</code> (nebo <code>range(2, 21, 2)</code>)</li>
                <li>d) <code>for i in range(10): print('číslo', (i + 1) * 10)</code> (nebo <code>range(10, 101, 10)</code>)</li>
              </ul>
            </div>
          }
        >
          <p>Urči, co je potřeba v předchozím programu změnit, aby se vypsala čísla:</p>
          <div className="pl-2 space-y-1.5 font-mono text-sm sm:text-base text-slate-800">
            <div>a) 0, 1, ... 10 – tedy i číslo 10</div>
            <div>b) 1, 2, ... 10</div>
            <div>c) 2, 4, ... 20</div>
            <div>d) 10, 20, ... 100</div>
          </div>
          <p className="text-slate-600 text-sm">
            Program pokaždé vyzkoušej, abys ověřil, zda byla tvá domněnka správná.
          </p>
        </TaskCard>

        {/* Úloha 4 */}
        <TaskCard 
          number="4" 
          taskId="4" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení:</p>
              <PythonSnippet code={`for i in range(7):\n    print(i, 'na druhou je', i * i)`} />
            </div>
          }
        >
          <p>
            Vytvoř program <code>druhe_mocniny.py</code>, který pomocí <code>for</code> cyklu vypíše čísla a jejich druhé mocniny:
          </p>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-snug">
            0 na druhou je 0<br/>
            1 na druhou je 1<br/>
            2 na druhou je 4<br/>
            3 na druhou je 9<br/>
            4 na druhou je 16<br/>
            5 na druhou je 25<br/>
            6 na druhou je 36
          </div>
        </TaskCard>

        {/* Úloha 5 */}
        <TaskCard 
          number="5" 
          taskId="5" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení:</p>
              <PythonSnippet code={`for i in range(10):\n    print('Na stromě bylo', i, 'vrabců, jeden přiletěl a už je tam', i + 1, 'vrabců')`} />
            </div>
          }
        >
          <p>Máme takovouto povídku:</p>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-nowrap">
            Na stromě bylo 0 vrabců, jeden přiletěl a už je tam 1 vrabců<br/>
            Na stromě bylo 1 vrabců, jeden přiletěl a už je tam 2 vrabců<br/>
            Na stromě bylo 2 vrabců, jeden přiletěl a už je tam 3 vrabců<br/>
            Na stromě bylo 3 vrabců, jeden přiletěl a už je tam 4 vrabců<br/>
            Na stromě bylo 4 vrabců, jeden přiletěl a už je tam 5 vrabců<br/>
            Na stromě bylo 5 vrabců, jeden přiletěl a už je tam 6 vrabců<br/>
            Na stromě bylo 6 vrabců, jeden přiletěl a už je tam 7 vrabců<br/>
            Na stromě bylo 7 vrabců, jeden přiletěl a už je tam 8 vrabců<br/>
            Na stromě bylo 8 vrabců, jeden přiletěl a už je tam 9 vrabců<br/>
            Na stromě bylo 9 vrabců, jeden přiletěl a už je tam 10 vrabců
          </div>
          <p>
            Zapiš ji pomocí <code>for</code> cyklu do nového programu <code>povidka.py</code>.
          </p>
        </TaskCard>

        {/* Úloha 6 */}
        <TaskCard 
          number="6" 
          taskId="6" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení:</p>
              <PythonSnippet code={`for i in range(10):\n    print('Na stromě bylo', 10 - i, 'vrabců, jeden odletěl a zůstalo tam', 9 - i, 'vrabců')`} />
            </div>
          }
        >
          <p>
            Vrabci z předchozí povídky odlétají – vymysli v programu <code>povidka.py</code> kód, který to bude pomocí <code>for</code> cyklu vyprávět:
          </p>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-nowrap">
            Na stromě bylo 10 vrabců, jeden odletěl a zůstalo tam 9 vrabců<br/>
            Na stromě bylo 9 vrabců, jeden odletěl a zůstalo tam 8 vrabců<br/>
            Na stromě bylo 8 vrabců, jeden odletěl a zůstalo tam 7 vrabců<br/>
            Na stromě bylo 7 vrabců, jeden odletěl a zůstalo tam 6 vrabců<br/>
            Na stromě bylo 6 vrabců, jeden odletěl a zůstalo tam 5 vrabců<br/>
            Na stromě bylo 5 vrabců, jeden odletěl a zůstalo tam 4 vrabců<br/>
            Na stromě bylo 4 vrabců, jeden odletěl a zůstalo tam 3 vrabců<br/>
            Na stromě bylo 3 vrabců, jeden odletěl a zůstalo tam 2 vrabců<br/>
            Na stromě bylo 2 vrabců, jeden odletěl a zůstalo tam 1 vrabců<br/>
            Na stromě bylo 1 vrabců, jeden odletěl a zůstalo tam 0 vrabců
          </div>
        </TaskCard>

        {/* Úloha 7 */}
        <TaskCard 
          number="7" 
          taskId="7" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení úlohy s kartičkami:</p>
              <PythonSnippet code={`import tkinter\nimport random\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(10):\n    x = random.randint(30, 300)\n    y = random.randint(30, 200)\n    canvas.create_rectangle(x - 15, y - 20, x + 15, y + 20, fill='deep sky blue')\n    canvas.create_text(x, y, text=i, font='arial 30')`} />
            </div>
          }
        >
          <p>
            Máme kartičky s čísly od 0 do 9, které chceme náhodně rozložit po ploše. Vytvoř program <code>deset_karticek.py</code>, který pomocí cyklu postupně nakreslí deset takových kartiček na náhodných pozicích:
          </p>

          <CanvasPreview width={300} height={200} bgColor="#f8fafc">
            <Rect x1={200} y1={25} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={215} y={46} text="2" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={155} y1={55} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={170} y={76} text="1" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={185} y1={60} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={200} y={81} text="8" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={105} y1={65} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={120} y={86} text="4" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={125} y1={68} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={140} y={89} text="5" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={95} y1={105} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={110} y={126} text="6" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={120} y1={115} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={135} y={136} text="3" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={175} y1={125} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={190} y={146} text="9" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={220} y1={95} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={235} y={116} text="7" fontSize={24} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={200} y1={140} width={30} height={42} fill="#00bfff" stroke="black" />
            <Text x={215} y={161} text="0" fontSize={24} fontFamily="Arial" fontWeight="bold" />
          </CanvasPreview>

          <p>
            Když budeš chtít na kartičkách nakreslit velká čísla jako na obrázku výše, přidej do příkazu <code>create_text</code> žlutě zvýrazněný kód:{' '}
            <code className="bg-slate-100 text-slate-800 p-1 rounded font-mono text-xs sm:text-sm">
              canvas.create_text(x, y, <mark className="bg-yellow-300 text-black px-1 rounded">text=i, font=&apos;arial 30&apos;</mark>)
            </code>
          </p>
        </TaskCard>

        {/* Úloha 8 */}
        <TaskCard 
          number="8" 
          taskId="8" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení úlohy s bankovkami:</p>
              <PythonSnippet code={`import tkinter\nimport random\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(5):\n    x = random.randint(50, 250)\n    y = random.randint(40, 160)\n    hodnota = (i + 1) * 10\n    canvas.create_rectangle(x - 30, y - 20, x + 30, y + 20, fill='yellow green')\n    canvas.create_text(x, y, text=hodnota, font='arial 25')`} />
            </div>
          }
        >
          <p>
            Na chodníku je rozhozených pět cizokrajných bankovek s hodnotami 10, 20, 30, 40 a 50. Napiš program <code>bankovky.py</code>, který takové bankovky nakreslí pomocí <code>for</code> cyklu:
          </p>

          <CanvasPreview width={300} height={200} bgColor="#f8fafc">
            <Rect x1={140} y1={30} width={50} height={32} fill="#8cb04e" stroke="black" />
            <Text x={165} y={46} text="40" fontSize={20} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={120} y1={60} width={50} height={32} fill="#8cb04e" stroke="black" />
            <Text x={145} y={76} text="10" fontSize={20} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={130} y1={80} width={50} height={32} fill="#8cb04e" stroke="black" />
            <Text x={155} y={96} text="30" fontSize={20} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={95} y1={95} width={50} height={32} fill="#8cb04e" stroke="black" />
            <Text x={120} y={111} text="50" fontSize={20} fontFamily="Arial" fontWeight="bold" />

            <Rect x1={185} y1={115} width={50} height={32} fill="#8cb04e" stroke="black" />
            <Text x={210} y={131} text="20" fontSize={20} fontFamily="Arial" fontWeight="bold" />
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 9 */}
        <TaskCard 
          number="9" 
          taskId="9" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Vyplněná tabulka:</p>
              <div className="font-mono text-xs bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-700">
                když se zobrazí 0: i = 0, x = 0<br/>
                když se zobrazí 1: i = 1, x = 50<br/>
                když se zobrazí 2: i = 2, x = 100<br/>
                když se zobrazí 3: i = 3, x = 150<br/>
                když se zobrazí 4: i = 4, x = 200<br/>
                když se zobrazí 5: i = 5, x = 250<br/>
                když se zobrazí 6: i = 6, x = 300<br/>
                když se zobrazí 7: i = 7, x = 350
              </div>
            </div>
          }
        >
          <p>
            Vytvoř nový program <code>kresleni_cisel.py</code> a přepiš do něj následující kód, který kreslí čísla na grafickou plochu:
          </p>

          <PythonSnippet code={`import tkinter\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(8):\n    x = i * 50\n    canvas.create_text(x, 100, text=i, font='arial 30')`} />

          <p>
            Vytvořený program spusť, abys viděl(a), co udělá, a vyplň tabulku na následující straně:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full max-w-md mx-auto text-xs sm:text-sm border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="border border-slate-300 px-3 py-2 text-left font-bold"></th>
                  <th className="border border-slate-300 px-3 py-2 text-center font-bold">hodnota v proměnné i</th>
                  <th className="border border-slate-300 px-3 py-2 text-center font-bold">hodnota v proměnné x</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <tr key={val} className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-3 py-1.5 font-medium">když se zobrazí {val}</td>
                    <td className="border border-slate-300 px-3 py-1.5 text-center font-mono text-slate-400">&nbsp;</td>
                    <td className="border border-slate-300 px-3 py-1.5 text-center font-mono text-slate-400">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TaskCard>

        {/* Úloha 10 */}
        <TaskCard 
          number="10" 
          taskId="10" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Vzorec pro y-ovou souřadnici:</p>
              <p className="mb-2">Jelikož se <code>x</code> posouvá o <code>i * 50</code>, pro úhlopříčku stačí nastavit <code>y = i * 30</code> (nebo obdobné násobení <code>i</code>).</p>
              <PythonSnippet code={`import tkinter\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(8):\n    x = i * 40\n    y = i * 25\n    canvas.create_text(x, y, text=i, font='arial 30')`} />
            </div>
          }
        >
          <p>
            Uprav předchozí program tak, aby se čísla kreslila přibližně na úhlopříčce grafické plochy podobně jako na následujícím obrázku:
          </p>

          <CanvasPreview width={260} height={200} bgColor="#f1f5f9">
            {/* Číslo 0 je v levém horním rohu oříznuté, začíná jen pravá spodní část nuly */}
            <Text x={0} y={0} text="0" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={35} y={26} text="1" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={70} y={52} text="2" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={105} y={78} text="3" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={140} y={104} text="4" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={175} y={130} text="5" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={210} y={156} text="6" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={245} y={182} text="7" fontSize={26} fontFamily="Arial, sans-serif" />
          </CanvasPreview>

          <p className="font-bold text-slate-800">
            Jaký jsi vymyslel vzorec pro výpočet y-ové souřadnice?
          </p>
        </TaskCard>

        {/* Úloha 11 */}
        <TaskCard 
          number="11" 
          taskId="11" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení: k souřadnicím přičteme odsazení (např. + 30):</p>
              <PythonSnippet code={`import tkinter\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(8):\n    x = i * 35 + 20\n    y = i * 25 + 20\n    canvas.create_text(x, y, text=i, font='arial 30')`} />
            </div>
          }
        >
          <p>
            V předchozím programu se číslo 0 kreslilo za roh grafické plochy, takže nebylo skoro vidět. Uprav výpočet souřadnic tak, aby byla vidět všechna čísla. Výsledek může vypadat jako na obrázku níže:
          </p>

          <CanvasPreview width={260} height={200} bgColor="#f1f5f9">
            {/* Zde je již číslo 0 plně viditelné celé u levého horního okraje */}
            <Text x={15} y={16} text="0" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={48} y={40} text="1" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={81} y={64} text="2" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={114} y={88} text="3" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={147} y={112} text="4" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={180} y={136} text="5" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={213} y={160} text="6" fontSize={26} fontFamily="Arial, sans-serif" />
            <Text x={246} y={184} text="7" fontSize={26} fontFamily="Arial, sans-serif" />
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 12 */}
        <TaskCard 
          number="12" 
          taskId="12" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení úlohy s dominem:</p>
              <PythonSnippet code={`import tkinter\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(6):\n    x = 40 + i * 40\n    canvas.create_rectangle(x, 70, x + 15, 140, fill='red', outline='red')`} />
            </div>
          }
        >
          <p>
            Víš, jak vypadá padající had z domina? Vytvoř program <code>domino.py</code>, který pomocí cyklu a obdélníku nakreslí zatím ještě stojící kostky domina:
          </p>

          <CanvasPreview width={300} height={200} bgColor="#eeeeee">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Rect 
                key={i} 
                x1={35 + i * 40} 
                y1={65} 
                width={16} 
                height={75} 
                fill="#ff0000" 
                stroke="#ff0000" 
                strokeWidth={0} 
              />
            ))}
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 13* */}
        <TaskCard 
          number="13*" 
          taskId="13" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Řešení pyramidy (obdélníky od největšího po nejmenší nebo naopak):</p>
              <PythonSnippet code={`import tkinter\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(10):\n    x = 100 - i * 8\n    y = 50 + i * 14\n    w = 16 * i\n    canvas.create_rectangle(x, y, x + 100 + w, y + 14, fill='orange', outline='black')`} />
            </div>
          }
        >
          <p>
            Napiš program <code>velka_pyramida.py</code>, který pomocí cyklu a obdélníku nakreslí takovouto pyramidu:
          </p>

          <CanvasPreview width={260} height={200} bgColor="#eeeeee">
            {[
              { w: 14, h: 14, y: 22 },  // nejvrchnější je čtverec 14x14
              { w: 28, h: 14, y: 36 },
              { w: 42, h: 14, y: 50 },
              { w: 56, h: 14, y: 64 },
              { w: 70, h: 14, y: 78 },
              { w: 84, h: 14, y: 92 },
              { w: 98, h: 14, y: 106 },
              { w: 112, h: 14, y: 120 },
              { w: 126, h: 14, y: 134 },
              { w: 144, h: 15, y: 148 },
            ].map((step, idx) => (
              <Rect 
                key={idx} 
                x1={130 - step.w / 2} 
                y1={step.y} 
                width={step.w} 
                height={step.h} 
                fill="#f59e0b" 
                stroke="#1f2937" 
                strokeWidth={1} 
              />
            ))}
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopVarChapter;