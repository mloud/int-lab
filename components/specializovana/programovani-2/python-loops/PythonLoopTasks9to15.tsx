'use client';
import React from 'react';
import { seededRandom, PythonSnippet, CanvasPreview, Rect, Text, TaskCard } from './PythonLoopShared';

export const PythonLoopTasks9to15: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
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
              <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">font='arial 50'</span>
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
  </>
);
