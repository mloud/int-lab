'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Palette, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonColorsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-rose-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-rose-500 mr-2 select-none">{">>>"}</span>
            <span className="text-rose-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-rose-600" />
      <span className="font-bold text-rose-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-rose-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 380, height = 266, className = "" }: { children: React.ReactNode, width?: number, height?: number, className?: string }) => (
  <div className={`relative border-2 border-slate-300 bg-white shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height }}>
    {children}
  </div>
);

const Rect = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'}`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

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
  const [done, setLocalStorageDone] = useLocalStorage(`py6-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonColorsChapter: React.FC<PythonColorsChapterProps> = ({ onBack }) => {
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
      title="Barvy"
      subtitle="Lekce 6"
      icon={<Palette className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-rose-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(2, 2, 379, 265)</code><br/><br/>Žáci mohou k řešení úlohy přistoupit s různou pečlivostí. Je na našem uvážení, která řešení akceptujeme jako dostatečně kvalitní a u kterých budeme po žácích požadovat jejich úpravu. V každém případě bychom však měli trvat na tom, aby byly všechny strany obdélníku viditelné. V opačném případě by nebylo zřejmé, jak velký obdélník vlastně žák nakreslil.</p>}>
          <p>1. Vytvoř program <code>nejvetsi_obdelnik.py</code>, který nakreslí co největší obdélník tak, aby byly vidět jeho strany (souřadnice zvol metodou pokus-omyl):</p>
          <CanvasPreview>
            <Rect x1={2} y1={2} width={375} height={261} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>V dalším úloze žákům prozradíme ideu barvení a necháme žáky, aby program vyzkoušeli. V jazyce Python zápis <code>fill='...'</code> nazýváme pojmenovaným parametrem. Tuto terminologii není nutné žákům prozrazovat.</p>}>
          <p>2. Zatím jsi kreslil jednoduché prázdné obdélníky. Vytvoř nový program <code>vybarveny.py</code> a pomocí následujícího kódu nakresli vybarvený obdélník:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-rose-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">import tkinter</span></div>
            <div><span className="text-slate-300">canvas = tkinter.Canvas()</span></div>
            <div><span className="text-slate-300">canvas.pack()</span></div>
            <div><span className="text-slate-300">canvas.create_rectangle(30, 30, 130, 130, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">fill='red'</span><span className="text-slate-300">)</span></div>
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(30, 30, 130, 130, fill='red')</code><br/><code>canvas.create_rectangle(150, 30, 250, 130, fill='green')</code><br/><code>canvas.create_rectangle(30, 150, 130, 250, fill='blue')</code><br/><code>canvas.create_rectangle(150, 150, 250, 250, fill='yellow')</code></p>}>
          <p>3. Přidej do programu <code>vybarveny.py</code> další 3 příkazy na kreslení obdélníků, abys dostal následující obrázek:</p>
          <CanvasPreview width={280} height={280}>
            <Rect x1={30} y1={30} width={100} height={100} fill="red" />
            <Rect x1={150} y1={30} width={100} height={100} fill="green" />
            <Rect x1={30} y1={150} width={100} height={100} fill="blue" />
            <Rect x1={150} y1={150} width={100} height={100} fill="yellow" />
          </CanvasPreview>
          <p>Další barvy získáš, když místo slova <code>'red'</code> napíšeš <code>'green'</code>, <code>'blue'</code> nebo <code>'yellow'</code>.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 300, 100, fill='red')</code><br/><code>canvas.create_rectangle(50, 100, 300, 150, fill='white')</code><br/><code>canvas.create_rectangle(50, 150, 300, 200, fill='blue')</code></p>}>
          <p>4. Vytvoř nový program <code>nizozemi.py</code>, který nakreslí nizozemskou vlajku:</p>
          <CanvasPreview width={350} height={250}>
            <Rect x1={50} y1={50} width={250} height={50} fill="red" />
            <Rect x1={50} y1={100} width={250} height={50} fill="white" />
            <Rect x1={50} y1={150} width={250} height={50} fill="blue" />
          </CanvasPreview>
          <p>Jaký název má bílá barva?</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 150, 200, fill='green')</code><br/><code>canvas.create_rectangle(150, 50, 250, 200, fill='white')</code><br/><code>canvas.create_rectangle(250, 50, 350, 200, fill='orange')</code></p>}>
          <p>5. Vytvoř program <code>irsko.py</code>, který nakreslí irskou vlajku s barvou <code>'orange'</code>:</p>
          <CanvasPreview width={400} height={250}>
            <Rect x1={50} y1={50} width={100} height={150} fill="green" />
            <Rect x1={150} y1={50} width={100} height={150} fill="white" />
            <Rect x1={250} y1={50} width={100} height={150} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Obrázek se podobá finské vlajce.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 300, 200, fill='white')</code><br/><code>canvas.create_rectangle(50, 105, 300, 145, fill='blue')</code><br/><code>canvas.create_rectangle(120, 50, 160, 200, fill='blue')</code><br/><br/>Někteří žáci mohou přijít i na řešení, ve kterém se v modré části vlajky nebudou vyskytovat černé čáry. Toto řešení je však náročnější, neboť spočívá v nakreslení modrého podkladového obdélníku a čtyř oddělených bílých obdélníků.</p>}>
          <p>6. Vytvoř nový program <code>vlajka.py</code> a nakresli takovýto obrázek:</p>
          <CanvasPreview width={350} height={250}>
            <Rect x1={50} y1={50} width={250} height={150} fill="white" />
            <Rect x1={50} y1={105} width={250} height={40} fill="blue" />
            <Rect x1={120} y1={50} width={40} height={150} fill="blue" />
          </CanvasPreview>
          <p>Vlajce kterého státu se obrázek podobá?</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(10, 10, 360, 20, fill='red')</code><br/><code>canvas.create_rectangle(10, 20, 20, 260, fill='blue')</code><br/><code>canvas.create_rectangle(20, 250, 370, 260, fill='red')</code><br/><code>canvas.create_rectangle(360, 10, 370, 250, fill='blue')</code></p>}>
          <p>7. Vytvoř nový program <code>ramecek.py</code>, ve kterém ze čtyř úzkých obdélníků nakresli takovýto rámeček:</p>
          <CanvasPreview width={380} height={270}>
            <Rect x1={10} y1={10} width={350} height={10} fill="red" />
            <Rect x1={10} y1={20} width={10} height={240} fill="blue" />
            <Rect x1={20} y1={250} width={350} height={10} fill="red" />
            <Rect x1={360} y1={10} width={10} height={240} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 150, 150, fill='magenta')</code><br/><code>canvas.create_rectangle(70, 70, 170, 170, fill='violet')</code><br/><code>canvas.create_rectangle(90, 90, 190, 190, fill='plum')</code><br/><code>canvas.create_rectangle(110, 110, 210, 210, fill='pink')</code></p>}>
          <p>8. Následující obrázek vznikl ze čtyř čtverců. První z nich má souřadnice levého horního vrcholu [50, 50]. Napiš program <code>pres_sebe.py</code>, který obrázek nakreslí – zvol si libovolné čtyři různé barvy (mohou být jiné než na vzorovém obrázku):</p>
          <CanvasPreview width={300} height={300}>
            <Rect x1={50} y1={50} width={100} height={100} fill="magenta" />
            <Rect x1={70} y1={70} width={100} height={100} fill="violet" />
            <Rect x1={90} y1={90} width={100} height={100} fill="plum" />
            <Rect x1={110} y1={110} width={100} height={100} fill="pink" />
          </CanvasPreview>
          <p>Při kreslení v Pythonu můžeš využít mnoha barev, zde je výběr některých z nich:</p>
          <div className="grid grid-cols-5 gap-1 text-[10px] sm:text-xs text-center font-mono">
            <div className="bg-blue-600 text-white py-2">Blue</div>
            <div className="bg-blue-300 py-2">LightBlue</div>
            <div className="bg-cyan-400 py-2">Cyan</div>
            <div className="bg-sky-400 py-2">SkyBlue</div>
            <div className="bg-blue-500 text-white py-2">CornflowerBlue</div>
            <div className="bg-sky-500 text-white py-2">DeepSkyBlue</div>
            <div className="bg-blue-500 text-white py-2">DodgerBlue</div>
            <div className="bg-blue-700 text-white py-2">RoyalBlue</div>
            <div className="bg-slate-500 text-white py-2">SlateBlue</div>
            <div className="bg-sky-600 text-white py-2">SteelBlue</div>
            <div className="bg-blue-800 text-white py-2">MediumBlue</div>
            <div className="bg-navy text-white py-2">Navy</div>
            <div className="bg-red-600 text-white py-2">Red</div>
            <div className="bg-orange-300 py-2">SandyBrown</div>
            <div className="bg-red-400 py-2">Salmon</div>
            <div className="bg-orange-400 py-2">Coral</div>
            <div className="bg-red-500 text-white py-2">Tomato</div>
            <div className="bg-orange-500 py-2">Orange</div>
            <div className="bg-orange-600 text-white py-2">DarkOrange</div>
            <div className="bg-red-500 text-white py-2">OrangeRed</div>
            <div className="bg-red-700 text-white py-2">IndianRed</div>
            <div className="bg-orange-800 text-white py-2">Chocolate</div>
            <div className="bg-orange-200 py-2">Tan</div>
            <div className="bg-red-900 text-white py-2">Maroon</div>
            <div className="bg-amber-800 text-white py-2">Sienna</div>
            <div className="bg-amber-900 text-white py-2">Brown</div>
            <div className="bg-amber-900 text-white py-2">SaddleBrown</div>
            <div className="bg-pink-300 py-2">Pink</div>
            <div className="bg-fuchsia-300 py-2">Plum</div>
            <div className="bg-violet-400 py-2">Violet</div>
            <div className="bg-fuchsia-400 py-2">Orchid</div>
            <div className="bg-fuchsia-500 text-white py-2">Magenta</div>
            <div className="bg-purple-600 text-white py-2">Purple</div>
            <div className="bg-fuchsia-900 text-white py-2">DarkMagenta</div>
            <div className="bg-green-600 text-white py-2">Green</div>
            <div className="bg-green-300 py-2">PaleGreen</div>
            <div className="bg-lime-400 py-2">YellowGreen</div>
            <div className="bg-emerald-500 text-white py-2">MediumSeaGreen</div>
            <div className="bg-lime-500 text-white py-2">LawnGreen</div>
            <div className="bg-lime-600 text-white py-2">LimeGreen</div>
            <div className="bg-green-700 text-white py-2">ForestGreen</div>
            <div className="bg-green-900 text-white py-2">DarkGreen</div>
            <div className="bg-yellow-300 py-2">Yellow</div>
            <div className="bg-yellow-200 py-2">Khaki</div>
            <div className="bg-yellow-400 py-2">Gold</div>
            <div className="bg-gray-400 py-2">Gray</div>
            <div className="bg-gray-300 py-2">LightGray</div>
            <div className="bg-black text-white py-2">Black</div>
            <div className="bg-white border border-slate-200 py-2">White</div>
          </div>
        </TaskCard>

        <TaskCard number="9*" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení s křížícími se čárami spočívá v postupném nakreslení červeného podkladového obdélníku, bílého širšího kříže (tvořeného dvěma obdélníky) a poté modrého užšího kříže (tvořeného opět dvěma obdélníky):<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 300, 210, fill='red')</code><br/><code>canvas.create_rectangle(50, 110, 300, 150, fill='white')</code><br/><code>canvas.create_rectangle(110, 50, 150, 210, fill='white')</code><br/><code>canvas.create_rectangle(50, 120, 300, 140, fill='navy')</code><br/><code>canvas.create_rectangle(120, 50, 140, 210, fill='navy')</code><br/><br/>Někteří žáci mohou přijít i na řešení, ve kterém se černé čáry nebudou křížit v bílých ani v modrých částech vlajky.</p>}>
          <p>9* Vytvoř nový program <code>norsko.py</code>, ve kterém nakresli norskou vlajku jako na levém vzorovém obrázku. Udělej to tak, aby se (na rozdíl od pravého vzorového obrázku) v bílých částech nekřížily černé čáry:</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-6">
            <CanvasPreview width={250} height={160} className="!m-0">
              <Rect x1={0} y1={0} width={250} height={160} fill="white" />
              <Rect x1={0} y1={0} width={60} height={60} fill="red" />
              <Rect x1={100} y1={0} width={150} height={60} fill="red" />
              <Rect x1={0} y1={100} width={60} height={60} fill="red" />
              <Rect x1={100} y1={100} width={150} height={60} fill="red" />
              <Rect x1={0} y1={70} width={250} height={20} fill="navy" />
              <Rect x1={70} y1={0} width={20} height={160} fill="navy" />
            </CanvasPreview>
            
            <CanvasPreview width={250} height={160} className="!m-0">
              <Rect x1={0} y1={0} width={250} height={160} fill="red" />
              <Rect x1={0} y1={60} width={250} height={40} fill="white" />
              <Rect x1={60} y1={0} width={40} height={160} fill="white" />
              <Rect x1={0} y1={70} width={250} height={20} fill="navy" />
              <Rect x1={70} y1={0} width={20} height={160} fill="navy" />
            </CanvasPreview>
          </div>
        </TaskCard>

        <TaskCard number="10*" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>V této úloze předpokládáme, že žáci si nejdříve daný program spustí a výsledný obrázek analyzují. Měli by objevit, že dva oddělené červené čtverce (podobně jako dva zelené čtverce) lze nakreslit jako jeden obdélník, který je na závěr překryt žlutým čtvercem.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(30, 90, 210, 150, fill='red')</code><br/><code>canvas.create_rectangle(90, 30, 150, 210, fill='green')</code><br/><code>canvas.create_rectangle(90, 90, 150, 150, fill='yellow')</code></p>}>
          <p>10* Vytvoř nový program <code>5_misto_3.py</code>, ve kterém uprav následující kód tak, aby nakreslil stejný obrázek, ale aby program obsahoval jen 3 příkazy pro kreslení obdélníků:</p>
          <PythonSnippet code={`canvas.create_rectangle(90, 90, 150, 150, fill='yellow')\ncanvas.create_rectangle(150, 90, 210, 150, fill='red')\ncanvas.create_rectangle(90, 150, 150, 210, fill='green')\ncanvas.create_rectangle(30, 90, 90, 150, fill='red')\ncanvas.create_rectangle(90, 30, 150, 90, fill='green')`} />
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonColorsChapter;
