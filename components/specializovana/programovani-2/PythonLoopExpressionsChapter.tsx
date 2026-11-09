'use client';
import React from 'react';
import { Calculator, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect, Text } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'violet',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py13', id),
});


interface PythonLoopExpressionsChapterProps {
  onBack: () => void;
}

const PythonLoopExpressionsChapter: React.FC<PythonLoopExpressionsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Výrazy v cyklu"
      subtitle="Lekce 13"
      icon={<Calculator className="w-8 h-8 text-violet-600" />}
      onBack={onBack}
      accentColor="violet"
      tabs={[{ id: 'lekce', label: 'Lekce 13', icon: Code }]}
    >
      <TeacherPinBar tone="violet" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(11):</code><br/><code>    canvas.create_text(10, i * 20 + 10, text=i)</code><br/><code>    canvas.create_text(40, i * 20 + 10, text=i * i)</code></p>}>
          <p>Minule jsme vytvářeli program, který v textovém režimu pomocí příkazů <code>for</code> a <code>print</code> vypisoval čísla a jejich druhé mocniny. Vytvoř podobný program <code>druhe_mocniny_platno.py</code>, v němž budou čísla a jejich druhé mocniny zobrazeny v grafické ploše pomocí příkazu <code>canvas.create_text</code>.</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 11 }).map((_, i) => (
              <React.Fragment key={i}>
                <Text x={30} y={i * 20 + 20} text={i.toString()} fontSize={12} align="end" />
                <Text x={60} y={i * 20 + 20} text={(i * i).toString()} fontSize={12} align="end" />
              </React.Fragment>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Jakou hodnotu bude mít proměnná y po skončení cyklu?<br/>Odpověď: 230</p>}>
          <p>Je dán následující program:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ny = 10\nfor i in range(11):\n    canvas.create_text(10, y, text=i)\n    y = y + 20`} />
          <p>Program vyzkoušej a doplň do následující tabulky, jak se mění proměnné <code>i</code> a <code>y</code> během vykonávání cyklu:</p>
          <table className="w-full mt-4 border-collapse border border-slate-300 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 font-bold text-center w-1/4">i</th>
                <th className="border border-slate-300 p-2 font-bold text-center w-1/2">y v příkazu create_text</th>
                <th className="border border-slate-300 p-2 font-bold text-center w-1/4">y po vykonání y = y + 20</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 p-2 text-center">0</td><td className="border border-slate-300 p-2 text-center">10</td><td className="border border-slate-300 p-2 text-center">30</td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">1</td><td className="border border-slate-300 p-2 text-center">30</td><td className="border border-slate-300 p-2 text-center"></td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">2</td><td className="border border-slate-300 p-2 text-center"></td><td className="border border-slate-300 p-2 text-center"></td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">&nbsp;</td><td className="border border-slate-300 p-2 text-center"></td><td className="border border-slate-300 p-2 text-center"></td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">&nbsp;</td><td className="border border-slate-300 p-2 text-center"></td><td className="border border-slate-300 p-2 text-center"></td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">&nbsp;</td><td className="border border-slate-300 p-2 text-center"></td><td className="border border-slate-300 p-2 text-center"></td></tr>
              <tr><td className="border border-slate-300 p-2 text-center">&nbsp;</td><td className="border border-slate-300 p-2 text-center"></td><td className="border border-slate-300 p-2 text-center"></td></tr>
            </tbody>
          </table>
          <p className="mt-4 font-bold">Jakou hodnotu bude mít proměnná y po skončení cyklu?</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 10</code><br/><code>for i in range(9):</code><br/><code>    canvas.create_rectangle(x, 10, x + 30, 40, fill='red')</code><br/><code>    x = x + 40</code></p>}>
          <p>Vytvoř nový program <code>rada_ctvercu.py</code> a v něm pomocí cyklu nakresli devět čtverců s délkou strany 30. Mezi čtverci bude mezera o velikosti 10. Použij proměnnou <code>x</code>, ve které bude uložena x-ová souřadnice levého horního rohu kresleného čtverce. Hodnota této proměnné bude v cyklu zvýšena pokaždé o 40.</p>
          <CanvasPreview width={380} height={100} bgColor="#f0f0f0">
            {Array.from({ length: 9 }).map((_, i) => (
              <Rect key={i} x1={i * 40 + 10} y1={35} width={30} height={30} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 10</code><br/><code>for i in range(10):</code><br/><code>    a = random.randint(10, 40)</code><br/><code>    canvas.create_rectangle(x, 100 - a, x + a, 100, fill='gold')</code><br/><code>    x = x + a</code></p>}>
          <p>Zlatokop našel poklad – 10 zlatých krychliček různých velikostí. Ty postupně ukládal na stůl těsně vedle sebe. Vytvoř program <code>zlaty_poklad.py</code>, který takový poklad nakreslí. Každá zlatá krychlička má náhodně zvolenou velikost z rozsahu od 10 do 40. Použij proměnnou, do které budeš ukládat náhodné číslo pro velikost krychličky. Kromě ní použij další proměnnou, pomocí níž budeš evidovat x-ovou pozici krychličky.</p>
          <CanvasPreview width={300} height={150} bgColor="#f0f0f0">
            {(() => {
              let currentX = 20;
              const elements = [];
              for (let i = 0; i < 10; i++) {
                const a = Math.floor(Math.random() * 31) + 10; // 10 to 40
                elements.push(<Rect key={i} x1={currentX} y1={100 - a} width={a} height={a} fill="gold" />);
                currentX += a;
              }
              return elements;
            })()}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 10</code><br/><code>for i in range(10):</code><br/><code>    a = random.randint(10, 40)</code><br/><code>    canvas.create_rectangle(x, 100 - a, x + a, 100, fill='gold')</code><br/><code>    x = x + a + 5</code></p>}>
          <p>Vylepši předchozí program tak, aby byly mezi zlatými krychličkami mezery o velikosti 5.</p>
          <CanvasPreview width={300} height={150} bgColor="#f0f0f0">
            {(() => {
              let currentX = 10;
              const elements = [];
              for (let i = 0; i < 10; i++) {
                const a = Math.floor(Math.random() * 31) + 10; // 10 to 40
                elements.push(<Rect key={i} x1={currentX} y1={100 - a} width={a} height={a} fill="gold" />);
                currentX += a + 5;
              }
              return elements;
            })()}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>skore = 0</code><br/><code>for i in range(10):</code><br/><code>    skore = skore + i + 1</code><br/><code>    print('Po levelu', i + 1, 'bude tvé skóre', skore, 'bodů.')</code><br/><br/>Jaké bude skóre po průchodu desátou úrovní?<br/>Odpověď: 55</p>}>
          <p>Hrajeme počítačovou hru, která má 10 úrovní. Po úspěšném průchodu i-tou úrovní získáme <code>i</code> bodů. Po průchodu první úrovní tedy získáme 1 bod. Po průchodu druhou úrovní se nám ke skóre připočtou 2 body, takže celkem už máme 3 body. Po průchodu třetí úrovní se nám připočtou 3 body, takže naše skóre bude 6 bodů atd. Vytvoř nový program <code>skore_hry.py</code>, který pomocí příkazu <code>print</code> a cyklu vypíše, jak se zvyšuje skóre po průchodu každou úrovní. Začátek výpisu je naznačený níže:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Po levelu 1 bude tvé skóre 1 bodů.<br/>
Po levelu 2 bude tvé skóre 3 bodů.<br/>
Po levelu 3 bude tvé skóre 6 bodů.<br/>
Po levelu 4 bude tvé skóre 10 bodů.<br/>
Po levelu 5 bude tvé skóre 15 bodů.<br/>
...
          </div>
          <p className="mt-4 font-bold">Jaké bude skóre po průchodu desátou úrovní?</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>pocet = 0</code><br/><code>for i in range(64):</code><br/><code>    pocet = pocet + (i + 1) * 10</code><br/><code>print('Celkový počet zrnek je', pocet)</code></p>}>
          <p>Znáš pověst o králi, který slíbil mudrcovi za odměnu tolik zrnek pšenice, kolik jich bude na všech políčkách šachovnice? Král mudrcovi dovolil, aby na první políčko dal 10 zrnek, na druhé 20, na třetí 30 atd. Pomoz králi v rozhodování, zda je taková odměna přiměřená a vytvoř pro něj program <code>zrnka_sachovnice.py</code>, který vypíše celkový počet zrnek na šachovnici. Políček na šachovnici je 64.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>pocet = 0</code><br/><code>pridavek = 1</code><br/><code>for i in range(64):</code><br/><code>    pocet = pocet + pridavek</code><br/><code>    pridavek = pridavek * 2</code><br/><code>print('Celkový počet zrnek je', pocet)</code></p>}>
          <p>Jiná verze pověsti praví, že král měl mudrcovi dovolit dát na první políčko jen 1 zrnko, ale na každé další políčko mu dovolil dát dvakrát více zrnek než na předchozí (tj. 2, 4, 8, 16, ...). Uprav svůj program tak, aby zjistil celkový počet zrnek na šachovnici podle této verze pověsti.</p>
        </TaskCard>

        <TaskCard number="9*" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 100</code><br/><code>y = 200</code><br/><code>sirka = 210</code><br/><code>vyska = 10</code><br/><code>for i in range(5):</code><br/><code>    canvas.create_rectangle(x, y, x + sirka, y + vyska, fill='lightgray')</code><br/><code>    x = x + 20</code><br/><code>    y = y - 20</code><br/><code>    sirka = sirka - 40</code><br/><code>    vyska = vyska + 10</code><br/><br/>Nebo s použitím závislosti na proměnné <code>i</code>:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(5):</code><br/><code>    x = 100 + i * 20</code><br/><code>    y = 200 - i * 20</code><br/><code>    sirka = 210 - i * 40</code><br/><code>    vyska = 10 + i * 10</code><br/><code>    canvas.create_rectangle(x, y, x + sirka, y + vyska, fill='lightgray')</code></p>}>
          <p>9* Vytvoř program <code>jested.py</code>, který pomocí cyklu nakreslí vysílač na Ještědu:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Rect 
                key={i} 
                x1={45 + i * 20} 
                y1={160 - i * 20} 
                width={210 - i * 40} 
                height={10 + i * 10} 
                fill="lightgray" 
              />
            ))}
          </CanvasPreview>
          <p className="mt-4">Kreslení můžeš začít od spodního obdélníku. Ten má šířku 210 a výšku 10. Každý další obdélník leží na předchozím, je užší o 40 a vyšší o 10.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopExpressionsChapter;
