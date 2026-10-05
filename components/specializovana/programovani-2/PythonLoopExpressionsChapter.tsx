'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Calculator, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopExpressionsChapterProps {
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

const CanvasPreview = ({ children, width = 380, height = 266, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
  <div className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height, backgroundColor: bgColor }}>
    {children}
  </div>
);

const Rect = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'}`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

const Text = ({ x, y, text, color = "black", align = "center", baseline = "middle", fontSize = 14 }: { x: number, y: number, text: string, color?: string, align?: "start"|"end"|"center", baseline?: "top"|"middle"|"bottom", fontSize?: number }) => {
  let transform = 'translate(-50%, -50%)';
  if (align === "start") {
    if (baseline === "top") transform = 'translate(0, 0)';
    if (baseline === "middle") transform = 'translate(0, -50%)';
    if (baseline === "bottom") transform = 'translate(0, -100%)';
  } else if (align === "end") {
    if (baseline === "top") transform = 'translate(-100%, 0)';
    if (baseline === "middle") transform = 'translate(-100%, -50%)';
    if (baseline === "bottom") transform = 'translate(-100%, -100%)';
  } else {
    if (baseline === "top") transform = 'translate(-50%, 0)';
    if (baseline === "bottom") transform = 'translate(-50%, -100%)';
  }

  return (
    <div 
      className="absolute font-sans" 
      style={{ left: x, top: y, color, transform, fontSize: `${fontSize}px` }}
    >
      {text}
    </div>
  );
};

const TaskCard = ({ 
  number, 
  title, 
  children, 
  teacherNote, 
  showTeacher,
  taskId
}: { 
  number: string, 
  title: string, 
  children: React.ReactNode, 
  teacherNote?: React.ReactNode,
  showTeacher: boolean,
  taskId: string
}) => {
  const [done, setLocalStorageDone] = useLocalStorage(`py13-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-violet-100 text-violet-700 rounded-2xl flex items-center justify-center font-black text-xl">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          {title && <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">{title}</h3>}
          <div className="text-slate-600 leading-relaxed text-sm sm:text-base space-y-4">
            {children}
          </div>

          {showTeacher && teacherNote && (
            <TeacherNote>{teacherNote}</TeacherNote>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setLocalStorageDone(!doneBool)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                doneBool 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${doneBool ? 'text-emerald-600' : 'text-slate-400'}`} />
              {doneBool ? 'Splněno' : 'Označit jako splněné'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PythonLoopExpressionsChapter: React.FC<PythonLoopExpressionsChapterProps> = ({ onBack }) => {
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
      title="Výrazy v cyklu"
      subtitle="Lekce 13"
      icon={<Calculator className="w-8 h-8 text-violet-600" />}
      onBack={onBack}
      accentColor="violet"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
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
            <button onClick={submitPin} className="bg-violet-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(11):</code><br/><code>    canvas.create_text(10, i * 20 + 10, text=i)</code><br/><code>    canvas.create_text(40, i * 20 + 10, text=i * i)</code></p>}>
          <p>1. Minule jsme vytvářeli program, který v textovém režimu pomocí příkazů <code>for</code> a <code>print</code> vypisoval čísla a jejich druhé mocniny. Vytvoř podobný program <code>druhe_mocniny_platno.py</code>, v němž budou čísla a jejich druhé mocniny zobrazeny v grafické ploše pomocí příkazu <code>canvas.create_text</code>.</p>
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
          <p>2. Je dán následující program:</p>
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
          <p>3. Vytvoř nový program <code>rada_ctvercu.py</code> a v něm pomocí cyklu nakresli devět čtverců s délkou strany 30. Mezi čtverci bude mezera o velikosti 10. Použij proměnnou <code>x</code>, ve které bude uložena x-ová souřadnice levého horního rohu kresleného čtverce. Hodnota této proměnné bude v cyklu zvýšena pokaždé o 40.</p>
          <CanvasPreview width={380} height={100} bgColor="#f0f0f0">
            {Array.from({ length: 9 }).map((_, i) => (
              <Rect key={i} x1={i * 40 + 10} y1={35} width={30} height={30} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 10</code><br/><code>for i in range(10):</code><br/><code>    a = random.randint(10, 40)</code><br/><code>    canvas.create_rectangle(x, 100 - a, x + a, 100, fill='gold')</code><br/><code>    x = x + a</code></p>}>
          <p>4. Zlatokop našel poklad – 10 zlatých krychliček různých velikostí. Ty postupně ukládal na stůl těsně vedle sebe. Vytvoř program <code>zlaty_poklad.py</code>, který takový poklad nakreslí. Každá zlatá krychlička má náhodně zvolenou velikost z rozsahu od 10 do 40. Použij proměnnou, do které budeš ukládat náhodné číslo pro velikost krychličky. Kromě ní použij další proměnnou, pomocí níž budeš evidovat x-ovou pozici krychličky.</p>
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
          <p>5. Vylepši předchozí program tak, aby byly mezi zlatými krychličkami mezery o velikosti 5.</p>
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
          <p>6. Hrajeme počítačovou hru, která má 10 úrovní. Po úspěšném průchodu i-tou úrovní získáme <code>i</code> bodů. Po průchodu první úrovní tedy získáme 1 bod. Po průchodu druhou úrovní se nám ke skóre připočtou 2 body, takže celkem už máme 3 body. Po průchodu třetí úrovní se nám připočtou 3 body, takže naše skóre bude 6 bodů atd. Vytvoř nový program <code>skore_hry.py</code>, který pomocí příkazu <code>print</code> a cyklu vypíše, jak se zvyšuje skóre po průchodu každou úrovní. Začátek výpisu je naznačený níže:</p>
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
          <p>7. Znáš pověst o králi, který slíbil mudrcovi za odměnu tolik zrnek pšenice, kolik jich bude na všech políčkách šachovnice? Král mudrcovi dovolil, aby na první políčko dal 10 zrnek, na druhé 20, na třetí 30 atd. Pomoz králi v rozhodování, zda je taková odměna přiměřená a vytvoř pro něj program <code>zrnka_sachovnice.py</code>, který vypíše celkový počet zrnek na šachovnici. Políček na šachovnici je 64.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>pocet = 0</code><br/><code>pridavek = 1</code><br/><code>for i in range(64):</code><br/><code>    pocet = pocet + pridavek</code><br/><code>    pridavek = pridavek * 2</code><br/><code>print('Celkový počet zrnek je', pocet)</code></p>}>
          <p>8. Jiná verze pověsti praví, že král měl mudrcovi dovolit dát na první políčko jen 1 zrnko, ale na každé další políčko mu dovolil dát dvakrát více zrnek než na předchozí (tj. 2, 4, 8, 16, ...). Uprav svůj program tak, aby zjistil celkový počet zrnek na šachovnici podle této verze pověsti.</p>
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
