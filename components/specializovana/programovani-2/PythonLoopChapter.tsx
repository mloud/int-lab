'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Repeat, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopChapterProps {
  onBack: () => void;
}

// Deterministický generátor náhodných čísel se stabilním seedem pro zabránění hydration mismatch mezi SSR a klientem
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 my-3 font-mono text-sm sm:text-base text-rose-300 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-rose-500 mr-2 select-none">{">>>"}</span>
            <span className="text-rose-200">{line.substring(3).trim()}</span>
          </>
        ) : (
          <span className="text-slate-200 whitespace-pre">{line}</span>
        )}
      </div>
    ))}
  </div>
);

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-rose-600" />
      <span className="font-bold text-rose-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-xs sm:text-sm text-rose-900 leading-relaxed space-y-2">
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
    className={`relative border-2 border-slate-300 shadow-md mx-auto my-4 overflow-hidden rounded-lg ${className}`} 
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
  noBorder = false 
}: { 
  x1: number;
  y1: number;
  width: number;
  height: number;
  fill?: string;
  noBorder?: boolean;
}) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'}`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

const Text = ({ 
  x, 
  y, 
  text, 
  fontSize = 12 
}: { 
  x: number;
  y: number;
  text: string;
  fontSize?: number;
}) => (
  <div 
    className="absolute flex items-center justify-center font-mono select-none"
    style={{ 
      left: x, 
      top: y, 
      transform: 'translate(-50%, -50%)',
      fontSize: `${fontSize}px`
    }}
  >
    {text}
  </div>
);

const TaskCard = ({ 
  number, 
  title, 
  children, 
  teacherNote, 
  showTeacher,
  taskId
}: { 
  number: string;
  title?: string;
  children: React.ReactNode;
  teacherNote?: React.ReactNode;
  showTeacher: boolean;
  taskId: string;
}) => {
  const [done, setDone] = useLocalStorage(`py11-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4 items-start">
        <div className="shrink-0 w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          {title && <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-3">{title}</h3>}
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            {children}
          </div>

          {showTeacher && teacherNote && (
            <TeacherNote>{teacherNote}</TeacherNote>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setDone(!done)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wide uppercase active:scale-95 ${
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

const PythonLoopChapter: React.FC<PythonLoopChapterProps> = ({ onBack }) => {
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
      title="Program s opakováním"
      subtitle="Lekce 11 – Programování v jazyce Python pro střední školy"
      icon={<Repeat className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce 11', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-rose-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono text-sm"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-bold text-xs uppercase">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border-2 uppercase tracking-wider ${
              teacherMode ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
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
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

def gps():
    x = random.randint(20, 360)
    y = random.randint(20, 240)
    canvas.create_text(x, y, text='+')
    canvas.create_text(x - 10, y + 10, text=x)
    canvas.create_text(x + 10, y + 10, text=y)

gps()
gps()
gps()
... (10 volání)`}
              </pre>
            </div>
          }
        >
          <p>
            Běháme po louce a zaznamenáváme si naši GPS pozici. Vytvoř nový program <code>gps.py</code> a v něm podprogram <code>gps</code>, který vygeneruje náhodné souřadnice <code>x</code>, <code>y</code> představující GPS pozici. Na tomto místě nakreslí značku <code>'+'</code> a pod ni vypíše danou pozici – čísla <code>x</code>, <code>y</code>. Po deseti zavoláních podprogramu <code>gps</code> můžeš dostat například takovýto výsledek:
          </p>
          <CanvasPreview width={380} height={230}>
            {/* 10 GPS bodů přesně podle obrázku v PDF */}
            <Text x={60} y={35} text="+" fontSize={14} />
            <Text x={60} y={50} text="38 27" fontSize={10} />

            <Text x={110} y={75} text="+" fontSize={14} />
            <Text x={110} y={90} text="83 82" fontSize={10} />

            <Text x={85} y={85} text="+" fontSize={14} />
            <Text x={85} y={100} text="57 92" fontSize={10} />

            <Text x={185} y={80} text="+" fontSize={14} />
            <Text x={185} y={95} text="177 90" fontSize={10} />

            <Text x={160} y={135} text="+" fontSize={14} />
            <Text x={160} y={150} text="154 149" fontSize={10} />

            <Text x={275} y={110} text="+" fontSize={14} />
            <Text x={275} y={125} text="268 124" fontSize={10} />

            <Text x={270} y={135} text="+" fontSize={14} />
            <Text x={270} y={150} text="266 152" fontSize={10} />

            <Text x={240} y={160} text="+" fontSize={14} />
            <Text x={240} y={175} text="231 178" fontSize={10} />

            <Text x={335} y={145} text="+" fontSize={14} />
            <Text x={335} y={160} text="331 158" fontSize={10} />

            <Text x={290} y={185} text="+" fontSize={14} />
            <Text x={290} y={200} text="283 202" fontSize={10} />
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 2 */}
        <TaskCard 
          number="2" 
          taskId="2" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`print('Těším se na prázdniny')
print('Těším se na prázdniny')
print('Těším se na prázdniny')
print('Těším se na prázdniny')
print('Těším se na prázdniny')`}
              </pre>
            </div>
          }
        >
          <p>
            Vytvoř program <code>tesim_se.py</code> bez grafické plochy, který pomocí příkazu <code>print</code> vypíše text <code>'Těším se na prázdniny'</code> pětkrát pod sebe.
          </p>
        </TaskCard>

        {/* Úloha 3 */}
        <TaskCard 
          number="3" 
          taskId="3" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Žáky necháme upravit a vyzkoušet následující řešení – minimalizujeme výklad, nepočítáme s tím, že budeme něco vysvětlovat.</p>
              <p className="font-bold mb-1">Program vypíše:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny`}
              </pre>
            </div>
          }
        >
          <p>
            V obou předchozích programech jsi měl vícekrát nakopírované příkazy <code>gps()</code> nebo <code>print(...)</code>. Abys je nemusel opakovaně kopírovat, můžeš to zapsat jednodušeji. Kód programu <code>tesim_se.py</code> uprav stejně, jako je uvedeno níže:
          </p>

          <div className="bg-slate-900 rounded-2xl p-5 my-3 font-mono text-sm sm:text-base text-slate-200 border border-slate-700 shadow-inner">
            <div className="flex items-center flex-wrap gap-2">
              <span>for i in range(</span>
              <span className="bg-yellow-300 text-slate-950 px-1.5 py-0.5 rounded font-black">5</span>
              <span>):</span>
              <span className="text-xs font-sans text-yellow-300 font-bold ml-2">
                ← Dvojtečka je velmi důležitá
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <span className="w-8 border-b-2 border-dashed border-rose-400 inline-block mr-1"></span>
              <span>print('Těším se na prázdniny')</span>
            </div>
            <div className="mt-2 text-xs font-sans text-slate-400 pl-2">
              ↑ Příkaz nech odsazený od kraje (Python tam automaticky vložil 4 mezery)
            </div>
          </div>

          <p>Tento program spusť a urči, co program vykonal.</p>
        </TaskCard>

        {/* Úloha 4 */}
        <TaskCard 
          number="4" 
          taskId="4" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Žáky necháme experimentovat. Předpokládáme, že žáci velmi rychle odhalí, že číslo v závorkách u příkazu <code>range</code> označuje počet opakování od okraje odsazeného příkazu.</p>
              <p>V Pythonu se doporučuje odsazovat vnořené příkazy od kraje přesně o 4 mezery, ačkoliv by program fungoval i s odsazením o libovolný počet mezer větší než 0. Pokud je vnořených příkazů více, musí být všechny tyto příkazy odsazeny od kraje o stejný počet mezer.</p>
            </div>
          }
        >
          <p>
            Zkus místo čísla 5 dát číslo 10 a program znovu spusť. Experimentuj i s jinými čísly, například 1, 100 a podobně. Urči, co je tímto číslem ovlivňováno.
          </p>
        </TaskCard>

        {/* Úloha 5 */}
        <TaskCard 
          number="5" 
          taskId="5" 
          showTeacher={teacherMode} 
          teacherNote={
            <p>V další úloze je demonstrováno, že tělo cyklu může obsahovat více příkazů.</p>
          }
        >
          <p>Uprav program stejně, jako je uvedeno níže, a spusť jej:</p>
          
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\n    print('=====================')`} />

          <p>Jestli jsi postupoval správně, po spuštění uvidíš:</p>

          <div className="font-mono bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 text-xs sm:text-sm whitespace-pre">
{`Těším se na prázdniny
=====================
Těším se na prázdniny
=====================
Těším se na prázdniny
=====================
Těším se na prázdniny
=====================
Těším se na prázdniny
=====================
>>>`}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 text-base mb-3">Jak program funguje?</h4>
            
            <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-slate-200 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">for</span>
                <span>i in range(</span>
                <span className="bg-yellow-300 text-slate-950 px-1 rounded font-bold">5</span>
                <span>):</span>
              </div>
              <div className="pl-6 border-l-4 border-rose-500 ml-2 py-1 space-y-1">
                <div>print('Těším se na prázdniny')</div>
                <div>print('=====================')</div>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span><strong>slovem for začíná příkaz cyklu</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span><strong>toto číslo znamená počet opakovaní</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span><strong>tělo cyklu – tyto příkazy se vykonají 5-krát</strong></span>
              </li>
            </ul>
          </div>
        </TaskCard>

        {/* Úloha 6 */}
        <TaskCard 
          number="6" 
          taskId="6" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Je žádoucí, aby si žáci na základě experimentování uvědomili, jak se program vykoná a jak se bude chovat, když některý příkaz nebude odsazený od kraje.</p>
              <p className="font-bold mb-1">Program vypíše:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200 mb-2">
{`Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny
Těším se na prázdniny
=====================`}
              </pre>
              <p>Tělo cyklu (posloupnost od kraje odsazených řádků) končí na prvním neodsazeném řádku. Všechny řádky těla cyklu musí být odsazené o stejný počet mezer. Do těla cyklu můžeme vložit i prázdné řádky – ty se budou ignorovat. Tělo cyklu musí obsahovat aspoň jeden neprázdný řádek, nesmí tedy být prázdné.</p>
            </div>
          }
        >
          <p>
            Je důležité odsadit od kraje příkazy, které tvoří tělo cyklu. Vyzkoušej, co vypíše takto upravený program:
          </p>

          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\nprint('=====================')`} />

          <p>
            Diskutuj se svým spolužákem, jaký je rozdíl v zápisu kódu programu z úlohy 6 oproti úloze 5. Potom určete, jak se tento rozdíl projevil po spuštění programu.
          </p>
        </TaskCard>

        {/* Úloha 7 */}
        <TaskCard 
          number="7" 
          taskId="7" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Doposud jsme cyklus používali jen při vypisování textu, nyní začneme používat cyklus v kombinaci s grafikou.</p>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

def gps():
    x = random.randint(20, 360)
    y = random.randint(20, 240)
    canvas.create_text(x, y, text='+')
    canvas.create_text(x - 10, y + 10, text=x)
    canvas.create_text(x + 10, y + 10, text=y)

for i in range(10):
    gps()`}
              </pre>
            </div>
          }
        >
          <p>
            Otevři program <code>gps.py</code>, vytvořený v 1. úloze, a opakované volání podprogramu <code>gps()</code> zapiš pomocí <code>for</code> cyklu. Jestli jsi postupoval(a) správně, mělo by se po spuštění programu na obrazovce zobrazit opět deset GPS pozic.
          </p>
        </TaskCard>

        {/* Úloha 8 */}
        <TaskCard 
          number="8" 
          taskId="8" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

def cerveny_ctverec():
    x = random.randint(10, 360)
    y = random.randint(10, 250)
    canvas.create_rectangle(x, y, x + 10, y + 10, fill='red')

for i in range(2000):
    cerveny_ctverec()`}
              </pre>
            </div>
          }
        >
          <p>
            Vytvoř nový program <code>opakovany_ctverec.py</code> a v něm podprogram <code>cerveny_ctverec()</code>. Ten nakreslí na grafickou plochu na náhodné souřadnice červený čtverec se stranou délky 10. Použij <code>for</code> cyklus na to, abys nakreslil 2000 červených čtverců. Výsledek může vypadat například jako na následujícím obrázku:
          </p>

          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 400 }).map((_, i) => {
              const x = Math.floor(seededRandom(i * 2 + 1) * 280) + 10;
              const y = Math.floor(seededRandom(i * 2 + 2) * 180) + 10;
              return (
                <Rect 
                  key={i} 
                  x1={x} 
                  y1={y} 
                  width={10} 
                  height={10} 
                  fill="red" 
                />
              );
            })}
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 9 */}
        <TaskCard 
          number="9" 
          taskId="9" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

def cerveny_ctverec():
    x = random.randint(10, 360)
    y = random.randint(10, 250)
    canvas.create_rectangle(x, y, x + 10, y + 10, fill='red')

def modry_ctverec():
    x = random.randint(10, 360)
    y = random.randint(10, 250)
    canvas.create_rectangle(x, y, x + 10, y + 10, fill='blue')

for i in range(2000):
    cerveny_ctverec()
    modry_ctverec()`}
              </pre>
            </div>
          }
        >
          <p>
            Doplň do programu <code>opakovany_ctverec.py</code> podprogram <code>modry_ctverec()</code>. Tento podprogram bude kreslit na náhodné souřadnice modrý čtverec se stranou délky 10. Zajisti, aby tělo cyklu obsahovalo volání podprogramu <code>cerveny_ctverec()</code> i podprogramu <code>modry_ctverec()</code>. Výsledek může vypadat například jako na následujícím obrázku:
          </p>

          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 400 }).map((_, i) => {
              const x1 = Math.floor(seededRandom(i * 4 + 101) * 280) + 10;
              const y1 = Math.floor(seededRandom(i * 4 + 102) * 180) + 10;
              const x2 = Math.floor(seededRandom(i * 4 + 103) * 280) + 10;
              const y2 = Math.floor(seededRandom(i * 4 + 104) * 180) + 10;
              return (
                <React.Fragment key={i}>
                  <Rect 
                    x1={x1} 
                    y1={y1} 
                    width={10} 
                    height={10} 
                    fill="red" 
                  />
                  <Rect 
                    x1={x2} 
                    y1={y2} 
                    width={10} 
                    height={10} 
                    fill="blue" 
                  />
                </React.Fragment>
              );
            })}
          </CanvasPreview>
        </TaskCard>

        {/* Úloha 10 */}
        <TaskCard 
          number="10" 
          taskId="10" 
          showTeacher={teacherMode} 
          teacherNote={
            <p>Program nejdříve nakreslí červené čtverce. Potom nakreslí modré. Proto uvidíme jen málo červených ploch, a mnoho modrých.</p>
          }
        >
          <p>
            Uprav kód programu podle následujícího vzoru tak, aby v něm byly dva cykly za sebou.
          </p>

          <PythonSnippet code={`for i in range(2000):\n    cerveny_ctverec()\nfor i in range(2000):\n    modry_ctverec()`} />

          <p>
            Zobrazil se stejný obrázek jako předtím? Pokud ne, diskutuj se svým spolužákem, proč je obrázek jiný.
          </p>
        </TaskCard>

        {/* Úloha 11 */}
        <TaskCard 
          number="11" 
          taskId="11" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200 mb-2">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

def hvezdicka():
    x = random.randint(10, 360)
    y = random.randint(10, 250)
    a = random.randint(2, 4)
    canvas.create_rectangle(x, y, x + a, y + a, fill='yellow')

canvas.create_rectangle(0, 0, 380, 270, fill='navy')
for i in range(1000):
    hvezdicka()`}
              </pre>
              <p>O vykonávání příkazů a jejich pořadí je potřeba se žáky diskutovat. Lze je například navést, aby vyměnili pořadí cyklu a kreslení modrého obdélníku, a ptát se, proč uvidí jen modrou plochu.</p>
            </div>
          }
        >
          <p>
            Vytvoř nový program <code>obloha.py</code>, který pomocí grafických příkazů nakreslí hvězdnou oblohu:
          </p>

          <CanvasPreview width={300} height={200} bgColor="navy">
            {Array.from({ length: 250 }).map((_, i) => {
              const x = Math.floor(seededRandom(i * 3 + 201) * 290);
              const y = Math.floor(seededRandom(i * 3 + 202) * 190);
              const size = Math.floor(seededRandom(i * 3 + 203) * 3) + 2;
              return (
                <Rect 
                  key={i} 
                  x1={x} 
                  y1={y} 
                  width={size} 
                  height={size} 
                  fill="yellow" 
                  noBorder
                />
              );
            })}
          </CanvasPreview>

          <h4 className="font-bold text-slate-800 text-sm mt-4 mb-2">Návod:</h4>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li>Napiš podprogram <code>hvezdicka</code>, který nakreslí na náhodnou pozici malý žlutý čtvereček. Velikost jeho strany bude náhodné číslo z rozsahu od 2 do 4.</li>
            <li>Tmavomodrou oblohu nakresli jako velký obdélník s barvou <code>'navy'</code>.</li>
            <li>Potom zavolej tisíckrát podprogram <code>hvezdicka</code>.</li>
          </ul>
        </TaskCard>

        {/* Úloha 12 */}
        <TaskCard 
          number="12" 
          taskId="12" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="mb-2">Program vypíše (pravděpodobně s jinými čísly) následující:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200 mb-2">
{`bylo vylosováno číslo 52
bylo vylosováno číslo 26
bylo vylosováno číslo 72
bylo vylosováno číslo 80
bylo vylosováno číslo 48`}
              </pre>
              <p>Žáků se následně můžeme zeptat, co program vykonává. Nechceme však, aby žáci program jen přečetli: „for i in range(5), do n přiřaď ...“.</p>
            </div>
          }
        >
          <p>Je dán následující program:</p>

          <PythonSnippet code={`import random\n\nfor i in range(5):\n    n = random.randint(1, 100)\n    print('bylo vylosováno číslo', n)`} />

          <p>
            Diskutuj se svým spolužákem, co program vykoná. Potom na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.
          </p>
        </TaskCard>

        {/* Úloha 13 */}
        <TaskCard 
          number="13" 
          taskId="13" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import random

for i in range(5):
    a = random.randint(1, 6)
    b = random.randint(1, 6)
    print('Na první kostce padlo číslo', a)
    print('Na druhé kostce padlo číslo', b)
    print('Součet obou čísel je', a + b)
    print()`}
              </pre>
            </div>
          }
        >
          <p>
            Napiš program <code>dve_kostky.py</code>, který simuluje hody dvěma kostkami. Zapiš pomocí <code>for</code> cyklu pět hodů, kdy se v těle cyklu do dvou proměnných přiřadí dvě náhodná čísla, ta se vypíšou a vypíše se i jejich součet. Výpis může vypadat například takto:
          </p>

          <div className="font-mono bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 text-xs sm:text-sm whitespace-pre">
{`Na první kostce padlo číslo 4
Na druhé kostce padlo číslo 3
Součet obou čísel je 7

Na první kostce padlo číslo 2
Na druhé kostce padlo číslo 4
Součet obou čísel je 6

Na první kostce padlo číslo 5
Na druhé kostce padlo číslo 2
Součet obou čísel je 7

Na první kostce padlo číslo 3
Na druhé kostce padlo číslo 1
Součet obou čísel je 4

Na první kostce padlo číslo 1
Na druhé kostce padlo číslo 4
Součet obou čísel je 5`}
          </div>
        </TaskCard>

        {/* Úloha 14 */}
        <TaskCard 
          number="14" 
          taskId="14" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

for i in range(5):
    x = random.randint(60, 330)
    y = random.randint(60, 210)
    canvas.create_rectangle(x - 50, y - 50, x + 50, y + 50, fill='white')
    canvas.create_text(x, y, text=random.randint(1, 6), font='arial 50')`}
              </pre>
            </div>
          }
        >
          <p>
            Napiš program <code>kostky_s_cisly.py</code>, který pomocí grafických příkazů nakreslí na náhodných místech pět hracích kostek. Kostku nakresli jako čtverec, do kterého je vepsané náhodně vygenerované číslo. Použij <code>for</code> cyklus, ve kterém budou všechna přiřazení i kreslení.
          </p>

          <CanvasPreview width={320} height={190} bgColor="#f8fafc">
            <Rect x1={155} y1={40} width={55} height={55} fill="white" />
            <Text x={182} y={67} text="5" fontSize={26} />

            <Rect x1={120} y1={25} width={55} height={55} fill="white" />
            <Text x={147} y={52} text="6" fontSize={26} />

            <Rect x1={80} y1={20} width={55} height={55} fill="white" />
            <Text x={107} y={47} text="3" fontSize={26} />

            <Rect x1={105} y1={75} width={55} height={55} fill="white" />
            <Text x={132} y={102} text="2" fontSize={26} />

            <Rect x1={35} y1={80} width={55} height={55} fill="white" />
            <Text x={62} y={107} text="6" fontSize={26} />
          </CanvasPreview>

          <p className="mt-4">
            Kdybys chtěl nakreslit kostku s velkými čísly jako na obrázku výše, přidej do příkazu <code>create_text</code> žlutě zvýrazněný kód:
          </p>

          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto border border-slate-700">
            <div>
              <span>canvas.create_text(x, y, text=random.randint(1, 6), </span>
              <span className="bg-yellow-300 text-slate-950 font-bold px-1.5 py-0.5 rounded">font='arial 50'</span>
              <span>)</span>
            </div>
          </div>
        </TaskCard>

        {/* Úloha 15* */}
        <TaskCard 
          number="15*" 
          taskId="15" 
          showTeacher={teacherMode} 
          teacherNote={
            <div>
              <p className="font-bold mb-1">Řešení:</p>
              <pre className="font-mono text-xs bg-white/70 p-3 rounded-lg border border-rose-200 mb-2">
{`import tkinter
import random

canvas = tkinter.Canvas()
canvas.pack()

for i in range(250):
    x = random.randint(1, 21) * 10
    y = random.randint(1, 21) * 10
    canvas.create_rectangle(x, y, x + 10, y + 10, fill='black')`}
              </pre>
              <p>V poslední úloze může být náročné vymyslet vzorec pro generování souřadnic, aby čtverečky ležely v mřížce.</p>
            </div>
          }
        >
          <p>
            Vytvoř nový program <code>qr_kod.py</code>, který bude představovat generátor náhodného QR kódu a který bude schopen generovat podobný QR kód jako na obrázku níže:
          </p>

          <CanvasPreview width={250} height={250} className="bg-white">
            <div className="absolute inset-0 p-[20px]">
              {Array.from({ length: 180 }).map((_, i) => {
                const col = Math.floor(seededRandom(i * 2 + 501) * 21);
                const row = Math.floor(seededRandom(i * 2 + 502) * 21);
                return (
                  <div
                    key={i}
                    className="absolute bg-black"
                    style={{
                      left: col * 10,
                      top: row * 10,
                      width: 10,
                      height: 10
                    }}
                  />
                );
              })}
            </div>
          </CanvasPreview>

          <p>
            Obrázek se skládá z velkého počtu černých čtverečků. Každý má délku strany 10 a je nakreslený v jednom náhodně vybraném políčku mřížky, která obsahuje 21 x 21 políček.
          </p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopChapter;
