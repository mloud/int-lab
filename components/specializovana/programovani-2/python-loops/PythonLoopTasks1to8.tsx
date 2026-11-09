'use client';
import React from 'react';
import { seededRandom, PythonSnippet, CanvasPreview, Rect, Text, TaskCard } from './PythonLoopShared';

export const PythonLoopTasks1to8: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
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
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">5</span>
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
                <span className="bg-amber-400 text-slate-950 px-1 rounded font-bold">5</span>
                <span>):</span>
              </div>
              <div className="pl-6 border-l-4 border-indigo-500 ml-2 py-1 space-y-1">
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
  </>
);
