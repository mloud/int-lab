'use client';
import React from 'react';
import { createTaskKit, CanvasPreview, Rect, Text } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'violet',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py12', id),
});

export const PythonLoopVarTasks7to13: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
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
          { w: 14, h: 14, y: 22 },
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
  </>
);

