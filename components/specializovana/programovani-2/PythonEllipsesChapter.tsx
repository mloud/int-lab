'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Circle, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonEllipsesChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-fuchsia-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-fuchsia-500 mr-2 select-none">{">>>"}</span>
            <span className="text-fuchsia-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-fuchsia-50 border-l-4 border-fuchsia-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-fuchsia-600" />
      <span className="font-bold text-fuchsia-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-fuchsia-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 380, height = 266, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
  <div className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height, backgroundColor: bgColor }}>
    {children}
  </div>
);

const Rect = ({ x1, y1, width, height, fill = "transparent", stroke = "black", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, stroke?: string, noBorder?: boolean }) => (
  <div 
    className="absolute" 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill, border: noBorder ? 'none' : `1px solid ${stroke}` }} 
  />
);

const Oval = ({ x1, y1, width, height, fill = "transparent", stroke = "black" }: { x1: number, y1: number, width: number, height: number, fill?: string, stroke?: string }) => (
  <div 
    className="absolute rounded-[50%]" 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill, border: `1px solid ${stroke}` }} 
  />
);

const Text = ({ x, y, text, color = "black", align = "center", baseline = "middle", fontSize = 14, fontFamily = "monospace" }: { x: number, y: number, text: string, color?: string, align?: "start"|"end"|"center", baseline?: "top"|"middle"|"bottom", fontSize?: number, fontFamily?: string }) => {
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
      className="absolute whitespace-pre" 
      style={{ left: x, top: y, color, transform, fontSize: `${fontSize}px`, fontFamily }}
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
  const [done, setLocalStorageDone] = useLocalStorage(`py14-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-fuchsia-100 text-fuchsia-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonEllipsesChapter: React.FC<PythonEllipsesChapterProps> = ({ onBack }) => {
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
      title="Elipsy a kruhy"
      subtitle="Lekce 14"
      icon={<Circle className="w-8 h-8 text-fuchsia-600" />}
      onBack={onBack}
      accentColor="fuchsia"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-fuchsia-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-fuchsia-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>soucet = 0</code><br/><code>for i in range(100):</code><br/><code>    soucet = soucet + i</code><br/><code>print('Součet je:', soucet)</code></p>}>
          <p>1. Napiš program <code>soucet_99.py</code>, který pomocí cyklu zjistí, jaký je součet čísel <code>0 + 1 + 2 + ... + 99</code>. Výsledek program vypíše pomocí příkazu <code>print</code>.</p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Nakreslí se elipsa, která má středový bod [105, 80], šířku 190 a výšku 140.</p>}>
          <p>2. V jazyce Python kreslíme elipsy a kruhy příkazem <code>create_oval</code>. Vytvoř nový program <code>elipsa.py</code> a zapiš do něj následující kód:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ncanvas.create_oval(10, 10, 200, 150)`} />
          <p>Vyzkoušej, co program nakreslí.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={10} y1={10} width={190} height={140} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Obdélník obkreslí (ohraničí) elipsu z vnějšku. Tvoří vlastně její "bounding box".</p>}>
          <p>3. Přidej na konec programu příkaz pro kreslení obdélníku se stejnými čísly, jako jsou v příkazu <code>create_oval</code>. Jaká bude vzájemná pozice elipsy a obdélníku?</p>
          <div className="font-mono bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm mt-4">
            <p className="mb-4 font-sans text-slate-600">Čísla, která píšeme do závorek v příkazech <code>canvas.create_oval</code> a <code>canvas.create_rectangle</code>, nazýváme <span className="text-blue-600 font-bold">parametry</span>:</p>
            <p><code>canvas.create_rectangle(x1, y1, x2, y2)</code></p>
            <p><code>canvas.create_oval(x1, y1, x2, y2)</code></p>
          </div>
          <p className="mt-4">V příkazu <code>create_rectangle</code> určovaly dvojice <code>[x1, y1]</code>, <code>[x2, y2]</code> souřadnice protilehlých vrcholů kresleného obdélníku. V příkazu <code>create_oval</code> určují dvojice <code>[x1, y1]</code>, <code>[x2, y2]</code> souřadnice protilehlých vrcholů obdélníku, do kterého se vepíše elipsa. Obdélník se však nenakreslí.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_rectangle(170, 50, 190, 70)</code><br/><code>canvas.create_rectangle(160, 70, 200, 110)</code><br/><code>canvas.create_rectangle(150, 110, 210, 170)</code><br/><code>canvas.create_rectangle(140, 170, 220, 250)</code></p>}>
          <p>4. Pomocí čtverců je možné nakreslit věž z kostek. Vytvoř nový program <code>vez.py</code> a napiš do něj kód, který ji nakreslí. Při kreslení využij souřadnice z následujícího obrázku:</p>
          <CanvasPreview width={300} height={300} bgColor="#f0f0f0">
            <Rect x1={170} y1={50} width={20} height={20} />
            <Text x={170} y={60} text="[170, 50]" align="end" />
            
            <Rect x1={160} y1={70} width={40} height={40} />
            <Text x={160} y={90} text="[160, 90]" align="end" />
            
            <Rect x1={150} y1={110} width={60} height={60} />
            <Text x={150} y={140} text="[150, 150]" align="end" />
            
            <Rect x1={140} y1={170} width={80} height={80} />
            <Text x={220} y={260} text="[230, 230]" align="start" />
            
            <div className="absolute left-[170px] top-[50px] w-4 border-t border-slate-400"></div>
            <div className="absolute left-[160px] top-[90px] w-4 border-t border-slate-400"></div>
            <div className="absolute left-[150px] top-[150px] w-4 border-t border-slate-400"></div>
            <div className="absolute left-[220px] top-[250px] w-4 border-t border-slate-400"></div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_oval(170, 50, 190, 70)</code><br/><code>canvas.create_oval(160, 70, 200, 110)</code><br/><code>canvas.create_oval(150, 110, 210, 170)</code><br/><code>canvas.create_oval(140, 170, 220, 250)</code></p>}>
          <p>5. Diskutuj se sousedem, jak nakreslit kruh. Potom změň předchozí program tak, aby se místo věže kreslil sněhulák.</p>
          <CanvasPreview width={300} height={300} bgColor="#f0f0f0">
            <Oval x1={170} y1={50} width={20} height={20} />
            <Oval x1={160} y1={70} width={40} height={40} />
            <Oval x1={150} y1={110} width={60} height={60} />
            <Oval x1={140} y1={170} width={80} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_oval(120, 40, 240, 100, fill='gray')</code><br/><code>canvas.create_oval(70, 70, 290, 130, fill='darkgray')</code><br/><code>canvas.create_oval(90, 90, 110, 110, fill='lightblue')</code><br/><code>canvas.create_oval(170, 90, 190, 110, fill='yellow')</code><br/><code>canvas.create_oval(250, 90, 270, 110, fill='lightgreen')</code></p>}>
          <p>6. Napiš program <code>ufo.py</code>, který pomocí alespoň pěti elips nakreslí UFO. Rozměry i barvy zvol dle svého uvážení. Inspirovat se můžeš (ale nemusíš) na následujícím obrázku:</p>
          <CanvasPreview width={360} height={200} bgColor="#f0f0f0">
            <Oval x1={120} y1={40} width={120} height={60} fill="gray" />
            <Oval x1={70} y1={70} width={220} height={60} fill="darkgray" />
            <Oval x1={90} y1={90} width={20} height={20} fill="lightblue" />
            <Oval x1={170} y1={90} width={20} height={20} fill="yellow" />
            <Oval x1={250} y1={90} width={20} height={20} fill="lightgreen" />
          </CanvasPreview>
          <p className="mt-4">Barevné elipsy se kreslí podobně jako barevné obdélníky pomocí parametru <code>fill</code>:</p>
          <PythonSnippet code={`canvas.create_oval(x1, y1, x2, y2, fill='barva')`} />
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def strom():</code><br/><code>    x = 200</code><br/><code>    y = 150</code><br/><code>    canvas.create_rectangle(x - 5, y, x + 5, y + 50, fill='brown')</code><br/><code>    canvas.create_oval(x - 30, y - 100, x + 30, y, fill='green')</code><br/><br/><code>strom()</code></p>}>
          <p>7. Vytvoř nový program <code>strom.py</code> a v něm podprogram <code>strom</code>, který do proměnných <code>x</code>, <code>y</code> přiřadí čísla <code>200</code>, <code>150</code> a pomocí elipsy a obdélníku nakreslí strom. Proměnné <code>x</code>, <code>y</code> představují souřadnice středu horní strany obdélníku (viz následující obrázek).</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={145} y1={100} width={10} height={50} fill="white" />
            <Oval x1={120} y1={0} width={60} height={100} fill="white" />
            <div className="absolute left-[150px] top-[100px] text-blue-600 font-bold text-xl leading-none" style={{ transform: 'translate(-50%, -50%)' }}>×</div>
            <div className="absolute left-[160px] top-[100px] w-20 border-t border-blue-600"></div>
            <Text x={190} y={100} text="x, y" color="#2563eb" fontFamily="sans-serif" fontSize={18} />
          </CanvasPreview>
          <p className="mt-4">Při kreslení stromu použij proměnné <code>x</code>, <code>y</code> tak, aby bylo možné změnou jejich hodnot strom přemístit. Korunu stromu nakresli jako zelenou elipsu se šířkou 60 a výškou 100. Kmen bude představován hnědým obdélníkem, který bude široký 10 a vysoký 50. Pozor, mezi kmenem a korunou by neměla být mezera (viz obrázek níže).</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={145} y1={100} width={10} height={50} fill="brown" />
            <Oval x1={120} y1={0} width={60} height={100} fill="green" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def strom():</code><br/><code>    x = random.randint(30, 350)</code><br/><code>    y = random.randint(100, 200)</code><br/><code>    canvas.create_rectangle(x - 5, y, x + 5, y + 50, fill='brown')</code><br/><code>    canvas.create_oval(x - 30, y - 100, x + 30, y, fill='green')</code><br/><br/><code>for i in range(10):</code><br/><code>    strom()</code></p>}>
          <p>8. Uprav předchozí program tak, aby se kreslil les. V podprogramu <code>strom</code> přiřaď do proměnných <code>x</code>, <code>y</code> náhodné souřadnice a zavolej tento podprogram desetkrát.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={85} y1={120} width={10} height={50} fill="brown" />
            <Oval x1={60} y1={20} width={60} height={100} fill="green" />
            
            <Rect x1={145} y1={100} width={10} height={50} fill="brown" />
            <Oval x1={120} y1={0} width={60} height={100} fill="green" />
            
            <Rect x1={185} y1={130} width={10} height={50} fill="brown" />
            <Oval x1={160} y1={30} width={60} height={100} fill="green" />
            
            <Rect x1={235} y1={110} width={10} height={50} fill="brown" />
            <Oval x1={210} y1={10} width={60} height={100} fill="green" />
            
            <Rect x1={115} y1={140} width={10} height={50} fill="brown" />
            <Oval x1={90} y1={40} width={60} height={100} fill="green" />
            
            <Rect x1={205} y1={150} width={10} height={50} fill="brown" />
            <Oval x1={180} y1={50} width={60} height={100} fill="green" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_oval(200 - 45, 100 - 45, 200 + 45, 100 + 45, fill='red')</code><br/><code>canvas.create_oval(200 - 35, 100 - 35, 200 + 35, 100 + 35, fill='white')</code></p>}>
          <p>9. Diskutuj se sousedem, jak nakreslit kruh, jestliže znáš jeho střed a poloměr. Potom vytvoř nový program <code>znacka.py</code>, který pomocí příkazu <code>canvas.create_oval</code> nakreslí dopravní značku <em>Zákaz vjezdu</em> (viz obrázek níže). Značka bude tvořena dvěma soustřednými kruhy, jejichž společný střed bude mít souřadnice <code>[200, 100]</code>. Velký červený kruh bude mít poloměr 45 a bílý kruh bude mít poloměr 35.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={105} y1={55} width={90} height={90} fill="red" stroke="transparent" />
            <Oval x1={115} y1={65} width={70} height={70} fill="white" stroke="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_oval(200 - 45, 100 - 45, 200 + 45, 100 + 45, fill='red')</code><br/><code>canvas.create_oval(200 - 35, 100 - 35, 200 + 35, 100 + 35, fill='white')</code><br/><code>canvas.create_text(200, 95, text='PRŮJEZD', font='arial 10 bold')</code><br/><code>canvas.create_text(200, 105, text='ZAKÁZÁN', font='arial 10 bold')</code></p>}>
          <p>10. Uprav předchozí program tak, aby nakreslil dopravní značku <em>Průjezd zakázán</em> (viz obrázek níže). Tato značka se od značky <em>Zákaz vjezdu</em> liší jen nápisem uvnitř bílého kruhu.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={105} y1={55} width={90} height={90} fill="red" stroke="transparent" />
            <Oval x1={115} y1={65} width={70} height={70} fill="white" stroke="transparent" />
            <Text x={150} y={93} text="PRŮJEZD" fontFamily="sans-serif" fontSize={11} />
            <Text x={150} y={107} text="ZAKÁZÁN" fontFamily="sans-serif" fontSize={11} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11*" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(256):</code><br/><code>    sloupec = random.randint(1, 18)</code><br/><code>    radek = random.randint(1, 12)</code><br/><code>    x = sloupec * 20</code><br/><code>    y = radek * 20</code><br/><code>    sirka = random.randint(1, 20)</code><br/><code>    vyska = random.randint(1, 20)</code><br/><code>    canvas.create_oval(x - sirka / 2, y - vyska / 2, x + sirka / 2, y + vyska / 2)</code></p>}>
          <p>11* Mimozemšťané nám poslali následující zprávu:</p>
          <CanvasPreview width={380} height={260} bgColor="#f0f0f0">
            {Array.from({ length: 200 }).map((_, i) => {
              const r = Math.floor(Math.random() * 12) + 1;
              const c = Math.floor(Math.random() * 18) + 1;
              const w = Math.floor(Math.random() * 20) + 1;
              const h = Math.floor(Math.random() * 20) + 1;
              return (
                <Oval key={i} x1={c * 20 - w / 2} y1={r * 20 - h / 2} width={w} height={h} />
              );
            })}
          </CanvasPreview>
          <p className="mt-4">Zřejmě očekávají, že jim odpovíme podobně vypadající zprávou. Napiš program <code>ufo_zprava.py</code>, který takovou (byť náhodnou) zprávu vygeneruje.</p>
          <p className="mt-2">Zjistili jsme, že zpráva se skládá z 256 malých elips. Elipsy jsou kreslené do mřížky, která má 18 sloupců a 12 řádků. Každé políčko mřížky má rozměry 20x20. Elipsu nakreslíš tak, že:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>vygeneruješ náhodná čísla pro pořadové číslo řádku a pořadové číslo sloupce, vynásobíš je 20 a to budou souřadnice středu elipsy,</li>
            <li>vygeneruješ náhodná čísla od 1 do 20 pro šířku a výšku malé elipsy,</li>
            <li>když znáš střed a velikost elipsy, tak ji nakreslíš.</li>
          </ul>
          <p className="mt-2">Toto zopakuješ 256krát.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonEllipsesChapter;
