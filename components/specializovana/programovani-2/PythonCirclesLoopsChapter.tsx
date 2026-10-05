'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Target, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonCirclesLoopsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-cyan-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-cyan-500 mr-2 select-none">{">>>"}</span>
            <span className="text-cyan-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-cyan-600" />
      <span className="font-bold text-cyan-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-cyan-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 380, height = 266, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
  <div className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height, backgroundColor: bgColor }}>
    {children}
  </div>
);

const Oval = ({ x1, y1, width, height, fill = "transparent", stroke = "black" }: { x1: number, y1: number, width: number, height: number, fill?: string, stroke?: string }) => (
  <div 
    className="absolute rounded-[50%]" 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill, border: `1px solid ${stroke}` }} 
  />
);

const Text = ({ x, y, text, color = "black", align = "center", baseline = "middle", fontSize = 14, fontWeight = "normal" }: { x: number, y: number, text: string, color?: string, align?: "start"|"end"|"center", baseline?: "top"|"middle"|"bottom", fontSize?: number, fontWeight?: string }) => {
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
      style={{ left: x, top: y, color, transform, fontSize: `${fontSize}px`, fontWeight }}
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
  const [done, setLocalStorageDone] = useLocalStorage(`py15-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-cyan-100 text-cyan-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonCirclesLoopsChapter: React.FC<PythonCirclesLoopsChapterProps> = ({ onBack }) => {
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
      title="Kruhy a cykly"
      subtitle="Lekce 15"
      icon={<Target className="w-8 h-8 text-cyan-600" />}
      onBack={onBack}
      accentColor="cyan"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-cyan-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-cyan-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-cyan-100 text-cyan-700 border-cyan-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 200</code><br/><code>y = 100</code><br/><code>canvas.create_oval(x - 100, y - 50, x, y + 50)</code><br/><code>canvas.create_oval(x, y - 50, x + 100, y + 50)</code><br/><br/>V případě, že žák vyřeší úlohu bez použití proměnných x, y jen s konstantami, lze mu například říci: „změň program tak, aby se kružnice dotýkaly v bodě [243, 182]“. Místo jednoduché změny hodnot proměnných x a y bude muset žák přepočítat všechny potřebné souřadnice.</p>}>
          <p>1. Vytvoř program <code>dve_kruznice.py</code>, který nakreslí dvě kružnice jako na obrázku níže. Do proměnných <code>x</code>, <code>y</code> přiřaď souřadnice bodu, ve kterém se kružnice dotýkají (například v bodě <code>[200, 100]</code>). Kružnice budou umístěné vedle sebe a jejich poloměr bude 50. Při kreslení kružnic používej proměnné <code>x</code>, <code>y</code> tak, aby bylo možné změnou jejich hodnot obě kružnice přemístit.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={50} y1={50} width={100} height={100} />
            <Oval x1={150} y1={50} width={100} height={100} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 200</code><br/><code>y = 100</code><br/><code>r1 = 50</code><br/><code>r2 = 25</code><br/><code>canvas.create_oval(x - 2 * r1, y - r1, x, y + r1)</code><br/><code>canvas.create_oval(x, y - r2, x + 2 * r2, y + r2)</code></p>}>
          <p>2. Uprav předchozí program tak, že poloměry kružnic nejprve přiřadíš do proměnných <code>r1</code>, <code>r2</code>. Například pro <code>r1 = 50</code>, <code>r2 = 25</code> bude obrázek vypadat takto:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={50} y1={50} width={100} height={100} />
            <Oval x1={150} y1={75} width={50} height={50} />
          </CanvasPreview>
          <p className="mt-4 font-bold text-slate-800">Bude program fungovat správně i v případě, že hodnotu proměnné r1 zmenšíš o 10 a hodnotu proměnné r2 zvětšíš o 5? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení založené na postupném zvyšování hodnoty proměnné, která reprezentuje poloměr, v cyklu:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>r = 10</code><br/><code>for i in range(10):</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r)</code><br/><code>    r = r + 10</code><br/><br/>Řešení založené na odvození poloměru z proměnné cyklu:<br/><code>for i in range(10):</code><br/><code>    r = i * 10 + 10</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r)</code></p>}>
          <p>3. Napiš program <code>terc.py</code>, který pomocí cyklu a deseti soustředných kružnic nakreslí terč jako na obrázku níže. Nejmenší kružnice bude mít poloměr 10 a každá další bude mít poloměr o 10 větší než předchozí:</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 10 }).map((_, i) => {
              const r = (10 - i) * 10;
              return (
                <Oval key={i} x1={150 - r} y1={125 - r} width={r * 2} height={r * 2} />
              );
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(50):</code><br/><code>    r = i * 2 + 20</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r)</code><br/><br/>Námi uváděné hodnoty 50, 2, 20 mohou být v žákovských řešeních i jiné, přibližné. Je vhodné, aby žáci při řešení úlohy experimentovali.</p>}>
          <p>4. Vytvoř nový program <code>gramofon.py</code> a zkopíruj si do něj kód z programu <code>terc.py</code>. Uprav v programu <code>gramofon.py</code> některé číselné hodnoty tak, aby se nakreslila gramofonová deska:</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 40 }).map((_, i) => {
              const r = (40 - i) * 2 + 20;
              return (
                <Oval key={i} x1={150 - r} y1={125 - r} width={r * 2} height={r * 2} />
              );
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>r = 100</code><br/><code>for i in range(10):</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r, fill='white')</code><br/><code>    r = r - 10</code><br/><br/>Ani v této úloze nemusíme poloměr vypočítávat postupným snižováním hodnoty dané proměnné v cyklu, ale můžeme jej odvodit přímo z proměnné cyklu:<br/><code>r = 100 - 10 * i</code></p>}>
          <p>5. Vrať se k programu <code>terc.py</code> a uprav kreslení kruhů tak, aby byl každý z nich vyplněný bílou barvou (tj. s parametrem <code>fill='white'</code>). Výsledek by měl vypadat podobně jako na obrázku níže:</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 10 }).map((_, i) => {
              const r = (10 - i) * 10;
              return (
                <Oval key={i} x1={150 - r} y1={125 - r} width={r * 2} height={r * 2} fill="white" />
              );
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>r = 100</code><br/><code>for i in range(5):</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r, fill='white')</code><br/><code>    r = r - 10</code><br/><code>    canvas.create_oval(190 - r, 130 - r, 190 + r, 130 + r, fill='black')</code><br/><code>    r = r - 10</code></p>}>
          <p>6. Uprav kreslení terče tak, aby se střídaly černé a bílé oblasti jako na obrázku níže. V cyklu se kreslí vždy dva kruhy – větší bílý a menší černý.</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 5 }).map((_, i) => {
              const rw = (10 - i * 2) * 10;
              const rb = (9 - i * 2) * 10;
              return (
                <React.Fragment key={i}>
                  <Oval x1={150 - rw} y1={125 - rw} width={rw * 2} height={rw * 2} fill="white" />
                  <Oval x1={150 - rb} y1={125 - rb} width={rb * 2} height={rb * 2} fill="black" />
                </React.Fragment>
              );
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 50</code><br/><code>for i in range(15):</code><br/><code>    canvas.create_oval(x, 100, x + 20, 120, fill='gold')</code><br/><code>    x = x + 20</code><br/><br/>Úlohu lze řešit i na základě odvozování proměnné x od proměnné cyklu:<br/><code>for i in range(15):</code><br/><code>    x = 50 + i * 20</code><br/><code>    canvas.create_oval(x, 100, x + 20, 120, fill='gold')</code></p>}>
          <p>7. Napiš program <code>retizek.py</code>, který pomocí cyklu nakreslí řetízek z 15 zlatých kroužků:</p>
          <CanvasPreview width={360} height={100} bgColor="#f0f0f0">
            {Array.from({ length: 15 }).map((_, i) => (
              <Oval key={i} x1={i * 20 + 30} y1={40} width={20} height={20} fill="gold" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def mince():</code><br/><code>    x = random.randint(50, 340)</code><br/><code>    y = random.randint(50, 210)</code><br/><code>    h = random.randint(1, 5)</code><br/><code>    canvas.create_oval(x - 25, y - 25, x + 25, y + 25, fill='silver')</code><br/><code>    canvas.create_text(x, y, text=h, font='arial 30')</code><br/><br/><code>for i in range(10):</code><br/><code>    mince()</code></p>}>
          <p>8. Vytvoř nový program <code>mince.py</code> a v něm vytvoř podprogram <code>mince</code>. Podprogram bude generovat náhodnou pozici a náhodnou hodnotu mince od 1 do 5. Minci nakresli jako kruh s číslem (viz následující obrázek).</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={60} y1={30} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={80} y={50} text="1" fontSize={24} />
            
            <Oval x1={120} y1={40} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={140} y={60} text="5" fontSize={24} />
            
            <Oval x1={200} y1={60} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={220} y={80} text="3" fontSize={24} />
            
            <Oval x1={150} y1={90} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={170} y={110} text="1" fontSize={24} />
            
            <Oval x1={80} y1={90} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={100} y={110} text="5" fontSize={24} />
            
            <Oval x1={110} y1={120} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={130} y={140} text="2" fontSize={24} />
            
            <Oval x1={170} y1={140} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={190} y={160} text="5" fontSize={24} />
            
            <Oval x1={60} y1={150} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={80} y={170} text="4" fontSize={24} />
          </CanvasPreview>
          <p className="mt-4">Podprogram <code>mince</code> zavolej pomocí cyklu desetkrát.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>h = random.choice([1, 2, 5, 10, 20, 50])</code><br/>Zbytek beze změny.<br/><br/>Zápis <code>random.choice([1, 2, 5, 10, 20, 50])</code> náhodně zvolí jednu z možností, které jsou uvedeny v hranatých závorkách. Pokročilejším žákům můžeme prozradit, že kulaté závorky patří k příkazu <code>random.choice</code> a že hranaté závorky uvozují seznam prvků, ze kterých se náhodná hodnota vybírá.</p>}>
          <p>9. Uprav svůj program tak, aby se generovaly jen mince s hodnotami 1, 2, 5, 10, 20, 50.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={60} y1={40} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={80} y={60} text="10" fontSize={20} fontWeight="bold" />
            
            <Oval x1={100} y1={50} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={120} y={70} text="20" fontSize={20} fontWeight="bold" />
            
            <Oval x1={160} y1={60} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={180} y={80} text="1" fontSize={20} fontWeight="bold" />
            
            <Oval x1={230} y1={70} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={250} y={90} text="2" fontSize={20} fontWeight="bold" />
            
            <Oval x1={200} y1={100} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={220} y={120} text="10" fontSize={20} fontWeight="bold" />
            
            <Oval x1={120} y1={120} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={140} y={140} text="10" fontSize={20} fontWeight="bold" />
            
            <Oval x1={80} y1={140} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={100} y={160} text="50" fontSize={20} fontWeight="bold" />
            
            <Oval x1={180} y1={150} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={200} y={170} text="5" fontSize={20} fontWeight="bold" />
            
            <Oval x1={220} y1={130} width={40} height={40} fill="silver" stroke="gray" />
            <Text x={240} y={150} text="2" fontSize={20} fontWeight="bold" />
          </CanvasPreview>
          <p className="mt-4">Pro generování hodnot mincí použij místo <code>random.randint(1, 5)</code> zápis:</p>
          <PythonSnippet code={`random.choice([1, 2, 5, 10, 20, 50])`} />
          <p className="mt-2 text-sm text-slate-500">Zápis <code>random.choice</code> čteme jako: náhodný výběr z vyjmenovaných hodnot.</p>
        </TaskCard>

        <TaskCard number="10*" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>barva=random.choice(['silver', 'gold', 'white'])</code><br/><code>canvas.create_oval(x - 25, y - 25, x + 25, y + 25, fill=barva)</code></p>}>
          <p>10* Zápis <code>random.choice</code> můžeš použít i na výběr barvy. Uprav předchozí program tak, že do proměnné <code>barva</code> přiřadíš <code>random.choice(['silver', 'gold', 'white'])</code> a tuto proměnnou použiješ při kreslení oválu v parametru <code>fill=barva</code>.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení – pozdravy:<br/><code>import random</code><br/><code>for i in range(10):</code><br/><code>    print(random.choice(['Ahoj', 'Nazdar', 'Servus', 'Čau']))</code><br/><br/>Ostatní podúlohy se řeší obdobně.</p>}>
          <p>11. Vyzkoušej, jako funguje <code>random.choice</code> – každý z příkazů nech pomocí cyklu vykonat několikrát:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm font-mono text-slate-700">
            <li>a) <code>print(random.choice(['Ahoj', 'Nazdar', 'Servus', 'Čau']))</code></li>
            <li>b) <code>print(random.choice('POMERANČ'))</code></li>
            <li>c) <code>print(random.choice([1 / 2, 1 / 3, 1 / 4, 1 / 5]))</code></li>
          </ul>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Očekávané řešení:<br/><code>import random</code><br/><code>pocasi = random.choice(['pěkný', 'ošklivý', 'deštivý', 'slunečný'])</code><br/><code>print('Dnes je', pocasi, 'den')</code></p>}>
          <p>12. Napiš program <code>pocasi.py</code>, který zobrazuje zprávy ve tvaru:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Dnes je ... den
          </div>
          <p>Místo <code>...</code> se vypíše jedna z možností <code>'pěkný'</code>, <code>'ošklivý'</code>, <code>'deštivý'</code>, <code>'slunečný'</code>.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonCirclesLoopsChapter;
