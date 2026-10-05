'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Repeat, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-indigo-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-indigo-500 mr-2 select-none">{">>>"}</span>
            <span className="text-indigo-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-indigo-600" />
      <span className="font-bold text-indigo-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-indigo-900 leading-relaxed">
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
      className="absolute font-mono whitespace-pre" 
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
  const [done, setLocalStorageDone] = useLocalStorage(`py11-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonLoopsChapter: React.FC<PythonLoopsChapterProps> = ({ onBack }) => {
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
      subtitle="Lekce 11"
      icon={<Repeat className="w-8 h-8 text-indigo-600" />}
      onBack={onBack}
      accentColor="indigo"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-indigo-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-8">
          <p className="text-indigo-800/80 text-sm sm:text-base font-bold">
            Začínáme opakovacími úlohami a sledujeme jimi i další cíl – přípravu na výuku cyklů:
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def gps():</code><br/><code>    x = random.randint(20, 360)</code><br/><code>    y = random.randint(20, 240)</code><br/><code>    canvas.create_text(x, y, text='+')</code><br/><code>    canvas.create_text(x - 10, y + 10, text=x)</code><br/><code>    canvas.create_text(x + 10, y + 10, text=y)</code><br/><br/><code>gps()</code><br/><code>gps()</code><br/><code>gps()</code><br/><code>... (10 volání)</code></p>}>
          <p>1. Běháme po louce a zaznamenáváme si naši GPS pozici. Vytvoř nový program <code>gps.py</code> a v něm podprogram <code>gps</code>, který vygeneruje náhodné souřadnice <code>x</code>, <code>y</code> představující GPS pozici. Na tomto místě nakreslí značku <code>+</code> a pod ni vypíše danou pozici – čísla <code>x</code>, <code>y</code>. Po deseti zavoláních podprogramu <code>gps</code> můžeš dostat například takovýto výsledek:</p>
          <CanvasPreview width={380} height={200}>
            <Text x={60} y={40} text="+" />
            <Text x={50} y={50} text="38" fontSize={10} />
            <Text x={70} y={50} text="27" fontSize={10} />
            
            <Text x={110} y={80} text="+" />
            <Text x={100} y={90} text="83" fontSize={10} />
            <Text x={120} y={90} text="82" fontSize={10} />
            
            <Text x={90} y={95} text="+" />
            <Text x={80} y={105} text="57" fontSize={10} />
            <Text x={100} y={105} text="92" fontSize={10} />
            
            <Text x={200} y={90} text="+" />
            <Text x={190} y={100} text="177" fontSize={10} />
            <Text x={210} y={100} text="90" fontSize={10} />
            
            <Text x={190} y={130} text="+" />
            <Text x={180} y={140} text="154" fontSize={10} />
            <Text x={200} y={140} text="149" fontSize={10} />
            
            <Text x={290} y={110} text="+" />
            <Text x={280} y={120} text="268" fontSize={10} />
            <Text x={300} y={120} text="124" fontSize={10} />
            
            <Text x={290} y={135} text="+" />
            <Text x={280} y={145} text="266" fontSize={10} />
            <Text x={300} y={145} text="152" fontSize={10} />
            
            <Text x={340} y={140} text="+" />
            <Text x={330} y={150} text="331" fontSize={10} />
            <Text x={350} y={150} text="158" fontSize={10} />
            
            <Text x={250} y={155} text="+" />
            <Text x={240} y={165} text="231" fontSize={10} />
            <Text x={260} y={165} text="178" fontSize={10} />
            
            <Text x={310} y={170} text="+" />
            <Text x={300} y={180} text="283" fontSize={10} />
            <Text x={320} y={180} text="202" fontSize={10} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Těším se na prázdniny')</code><br/><code>print('Těším se na prázdniny')</code><br/><code>print('Těším se na prázdniny')</code><br/><code>print('Těším se na prázdniny')</code><br/><code>print('Těším se na prázdniny')</code></p>}>
          <p>2. Vytvoř program <code>tesim_se.py</code> bez grafické plochy, který pomocí příkazu <code>print</code> vypíše text <code>'Těším se na prázdniny'</code> pětkrát pod sebe.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Žáky necháme upravit a vyzkoušet následující řešení – minimalizujeme výklad, nepočítáme s tím, že budeme něco vysvětlovat.<br/><br/>Program vypíše:<br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code></p>}>
          <p>3. V obou předchozích programech jsi měl vícekrát nakopírované příkazy <code>gps()</code> nebo <code>print(...)</code>. Abys je nemusel opakovaně kopírovat, můžeš to zapsat jednodušeji. Kód programu <code>tesim_se.py</code> uprav stejně, jako je uvedeno níže:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-indigo-400 overflow-x-auto shadow-inner border border-slate-700 relative">
            <div><span className="text-slate-300">for i in range(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">5</span><span className="text-slate-300">):</span></div>
            <div><span className="text-slate-300">    print('Těším se na prázdniny')</span></div>
          </div>
          <p>Tento program spusť a urči, co program vykonal.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Žáky necháme experimentovat. Předpokládáme, že žáci velmi rychle odhalí, že číslo v závorkách u příkazu <code>range</code> označuje počet opakování od okraje odsazeného příkazu.<br/><br/>V Pythonu se doporučuje odsazovat vnořené příkazy od kraje přesně o 4 mezery, ačkoliv by program fungoval i s odsazením o libovolný počet mezer větší než 0. Pokud je vnořených příkazů více, musí být všechny tyto příkazy odsazeny od kraje o stejný počet mezer.</p>}>
          <p>4. Zkus místo čísla <span className="bg-yellow-200">5</span> dát číslo <code>10</code> a program znovu spusť. Experimentuj i s jinými čísly, například <code>1</code>, <code>100</code> a podobně. Urči, co je tímto číslem ovlivňováno.</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>V další úloze je demonstrováno, že tělo cyklu může obsahovat více příkazů.</p>}>
          <p>5. Uprav program stejně, jako je uvedeno níže, a spusť jej:</p>
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\n    print('=====================')`} />
          <p>Jestli jsi postupoval správně, po spuštění uvidíš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Těším se na prázdniny<br/>
=====================<br/>
Těším se na prázdniny<br/>
=====================<br/>
Těším se na prázdniny<br/>
=====================<br/>
Těším se na prázdniny<br/>
=====================<br/>
Těším se na prázdniny<br/>
=====================
          </div>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h4 className="font-bold text-slate-800 mb-4">Jak program funguje?</h4>
            <div className="font-mono bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm relative">
              <div className="mb-2"><span className="text-indigo-600 font-bold">for</span> i in range(<span className="text-blue-600 font-bold">5</span>):</div>
              <div className="pl-8 text-slate-600 border-l-4 border-indigo-200 ml-4 py-1">print('Těším se na prázdniny')</div>
              <div className="pl-8 text-slate-600 border-l-4 border-indigo-200 ml-4 py-1">print('=====================')</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• slovem <code>for</code> začíná příkaz <strong>cyklu</strong></li>
              <li>• číslo v <code>range</code> znamená <strong>počet opakování</strong></li>
              <li>• odsazené řádky tvoří <strong>tělo cyklu</strong> – tyto příkazy se vykonají 5-krát</li>
            </ul>
          </div>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Je žádoucí, aby si žáci na základě experimentování uvědomili, jak se program vykoná a jak se bude chovat, když některý příkaz nebude odsazený od kraje.<br/><br/>Program vypíše:<br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>Těším se na prázdniny</code><br/><code>=====================</code><br/><br/>Tělo cyklu (posloupnost od kraje odsazených řádků) končí na prvním neodsazeném řádku. Všechny řádky těla cyklu musí být odsazené o stejný počet mezer. Do těla cyklu můžeme vložit i prázdné řádky – ty se budou ignorovat.<br/>Tělo cyklu musí obsahovat aspoň jeden neprázdný řádek, nesmí tedy být prázdné.</p>}>
          <p>6. Je důležité odsadit od kraje příkazy, které tvoří tělo cyklu. Vyzkoušej, co vypíše takto upravený program:</p>
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\nprint('=====================')`} />
          <p>Diskutuj se svým spolužákem, jaký je rozdíl v zápisu kódu programu z úlohy 6 oproti úloze 5. Potom určete, jak se tento rozdíl projevil po spuštění programu.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Doposud jsme cyklus používali jen při vypisování textu, nyní začneme používat cyklus v kombinaci s grafikou.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def gps():</code><br/><code>    x = random.randint(20, 360)</code><br/><code>    y = random.randint(20, 240)</code><br/><code>    canvas.create_text(x, y, text='+')</code><br/><code>    canvas.create_text(x - 10, y + 10, text=x)</code><br/><code>    canvas.create_text(x + 10, y + 10, text=y)</code><br/><br/><code>for i in range(10):</code><br/><code>    gps()</code></p>}>
          <p>7. Otevři program <code>gps.py</code>, vytvořený v 1. úloze, a opakované volání podprogramu <code>gps()</code> zapiš pomocí <code>for</code> cyklu. Jestli jsi postupoval(a) správně, mělo by se po spuštění programu na obrazovce zobrazit opět deset GPS pozic.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def cerveny_ctverec():</code><br/><code>    x = random.randint(10, 360)</code><br/><code>    y = random.randint(10, 250)</code><br/><code>    canvas.create_rectangle(x, y, x + 10, y + 10, fill='red')</code><br/><br/><code>for i in range(2000):</code><br/><code>    cerveny_ctverec()</code></p>}>
          <p>8. Vytvoř nový program <code>opakovany_ctverec.py</code> a v něm podprogram <code>cerveny_ctverec()</code>. Ten nakreslí na grafickou plochu na náhodné souřadnice červený čtverec se stranou délky 10. Použij <code>for</code> cyklus na to, abys nakreslil 2000 červených čtverců. Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 400 }).map((_, i) => (
              <Rect 
                key={i} 
                x1={Math.random() * 280 + 10} 
                y1={Math.random() * 180 + 10} 
                width={10} 
                height={10} 
                fill="red" 
              />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def cerveny_ctverec():</code><br/><code>    x = random.randint(10, 360)</code><br/><code>    y = random.randint(10, 250)</code><br/><code>    canvas.create_rectangle(x, y, x + 10, y + 10, fill='red')</code><br/><br/><code>def modry_ctverec():</code><br/><code>    x = random.randint(10, 360)</code><br/><code>    y = random.randint(10, 250)</code><br/><code>    canvas.create_rectangle(x, y, x + 10, y + 10, fill='blue')</code><br/><br/><code>for i in range(2000):</code><br/><code>    cerveny_ctverec()</code><br/><code>    modry_ctverec()</code></p>}>
          <p>9. Doplň do programu <code>opakovany_ctverec.py</code> podprogram <code>modry_ctverec()</code>. Tento podprogram bude kreslit na náhodné souřadnice modrý čtverec se stranou délky 10. Zajisti, aby tělo cyklu obsahovalo volání podprogramu <code>cerveny_ctverec()</code> i podprogramu <code>modry_ctverec()</code>. Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 400 }).map((_, i) => (
              <React.Fragment key={i}>
                <Rect 
                  x1={Math.random() * 280 + 10} 
                  y1={Math.random() * 180 + 10} 
                  width={10} 
                  height={10} 
                  fill="red" 
                />
                <Rect 
                  x1={Math.random() * 280 + 10} 
                  y1={Math.random() * 180 + 10} 
                  width={10} 
                  height={10} 
                  fill="blue" 
                />
              </React.Fragment>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Program nejdříve nakreslí červené čtverce. Potom nakreslí modré. Proto uvidíme jen málo červených ploch, a mnoho modrých.</p>}>
          <p>10. Uprav kód programu podle následujícího vzoru tak, aby v něm byly dva cykly za sebou.</p>
          <PythonSnippet code={`for i in range(2000):\n    cerveny_ctverec()\nfor i in range(2000):\n    modry_ctverec()`} />
          <p>Zobrazil se stejný obrázek jako předtím? Pokud ne, diskutuj se svým spolužákem, proč je obrázek jiný.</p>
          <div className="opacity-50 mt-4 pointer-events-none">
            <CanvasPreview width={300} height={200}>
              {Array.from({ length: 400 }).map((_, i) => (
                <Rect key={`r-${i}`} x1={Math.random() * 280 + 10} y1={Math.random() * 180 + 10} width={10} height={10} fill="red" />
              ))}
              {Array.from({ length: 400 }).map((_, i) => (
                <Rect key={`b-${i}`} x1={Math.random() * 280 + 10} y1={Math.random() * 180 + 10} width={10} height={10} fill="blue" />
              ))}
            </CanvasPreview>
          </div>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def hvezdicka():</code><br/><code>    x = random.randint(10, 360)</code><br/><code>    y = random.randint(10, 250)</code><br/><code>    a = random.randint(2, 4)</code><br/><code>    canvas.create_rectangle(x, y, x + a, y + a, fill='yellow')</code><br/><br/><code>canvas.create_rectangle(0, 0, 380, 270, fill='navy')</code><br/><code>for i in range(1000):</code><br/><code>    hvezdicka()</code><br/><br/>O vykonávání příkazů a jejich pořadí je potřeba se žáky diskutovat. Lze je například navést, aby vyměnili pořadí cyklu a kreslení modrého obdélníku, a ptát se, proč uvidí jen modrou plochu.</p>}>
          <p>11. Vytvoř nový program <code>obloha.py</code>, který pomocí grafických příkazů nakreslí hvězdnou oblohu:</p>
          <CanvasPreview width={300} height={200} bgColor="navy">
            {Array.from({ length: 200 }).map((_, i) => (
              <Rect 
                key={i} 
                x1={Math.random() * 290} 
                y1={Math.random() * 190} 
                width={2} 
                height={2} 
                fill="yellow" 
                noBorder
              />
            ))}
          </CanvasPreview>
          <h4 className="font-bold text-slate-800 mt-6 mb-2">Návod:</h4>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
            <li>Napiš podprogram <code>hvezdicka</code>, který nakreslí na náhodnou pozici malý žlutý čtvereček. Velikost jeho strany bude náhodné číslo z rozsahu od 2 do 4.</li>
            <li>Tmavomodrou oblohu nakresli jako velký obdélník s barvou <code>'navy'</code>.</li>
            <li>Potom zavolej tisíckrát podprogram <code>hvezdicka</code>.</li>
          </ul>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Program vypíše (pravděpodobně s jinými čísly) následující:<br/><code>bylo vylosováno číslo 52</code><br/><code>bylo vylosováno číslo 26</code><br/><code>bylo vylosováno číslo 72</code><br/><code>bylo vylosováno číslo 80</code><br/><code>bylo vylosováno číslo 48</code><br/><br/>Žáků se následně můžeme zeptat, co program vykonává. Nechceme však, aby žáci program jen přečetli: „for i in range(5), do n přiřaď ...“.</p>}>
          <p>12. Je dán následující program:</p>
          <PythonSnippet code={`import random\n\nfor i in range(5):\n    n = random.randint(1, 100)\n    print('bylo vylosováno číslo', n)`} />
          <p>Diskutuj se svým spolužákem, co program vykoná. Potom na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="13" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><br/><code>for i in range(5):</code><br/><code>    a = random.randint(1, 6)</code><br/><code>    b = random.randint(1, 6)</code><br/><code>    print('Na první kostce padlo číslo', a)</code><br/><code>    print('Na druhé kostce padlo číslo', b)</code><br/><code>    print('Součet obou čísel je', a + b)</code><br/><code>    print()</code></p>}>
          <p>13. Napiš program <code>dve_kostky.py</code>, který simuluje hody dvěma kostkami. Zapiš pomocí <code>for</code> cyklu pět hodů, kdy se v těle cyklu do dvou proměnných přiřadí dvě náhodná čísla, ta se vypíšou a vypíše se i jejich součet. Výpis může vypadat například takto:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Na první kostce padlo číslo 4<br/>
Na druhé kostce padlo číslo 3<br/>
Součet obou čísel je 7<br/>
<br/>
Na první kostce padlo číslo 2<br/>
Na druhé kostce padlo číslo 4<br/>
Součet obou čísel je 6<br/>
...
          </div>
        </TaskCard>

        <TaskCard number="14" title="" taskId="14" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(5):</code><br/><code>    x = random.randint(60, 330)</code><br/><code>    y = random.randint(60, 210)</code><br/><code>    canvas.create_rectangle(x - 50, y - 50, x + 50, y + 50, fill='white')</code><br/><code>    canvas.create_text(x, y, text=random.randint(1, 6), font='arial 50')</code></p>}>
          <p>14. Napiš program <code>kostky_s_cisly.py</code>, který pomocí grafických příkazů nakreslí na náhodných místech pět hracích kostek. Kostku nakresli jako čtverec, do kterého je vepsané náhodně vygenerované číslo. Použij <code>for</code> cyklus, ve kterém budou všechna přiřazení i kreslení.</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={150} y1={50} width={60} height={60} fill="white" />
            <Text x={180} y={80} text="5" fontSize={30} />
            <Rect x1={120} y1={30} width={60} height={60} fill="white" />
            <Text x={150} y={60} text="6" fontSize={30} />
            <Rect x1={70} y1={20} width={60} height={60} fill="white" />
            <Text x={100} y={50} text="3" fontSize={30} />
            <Rect x1={100} y1={70} width={60} height={60} fill="white" />
            <Text x={130} y={100} text="2" fontSize={30} />
            <Rect x1={30} y1={80} width={60} height={60} fill="white" />
            <Text x={60} y={110} text="6" fontSize={30} />
          </CanvasPreview>
          <p className="mt-4">Kdybys chtěl nakreslit kostku s velkými čísly jako na obrázku výše, přidej do příkazu <code>create_text</code> žlutě zvýrazněný kód:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-indigo-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">canvas.create_text(x, y, text=random.randint(1, 6), </span><span className="text-yellow-300 bg-yellow-500/20 px-1">font='arial 50'</span><span className="text-slate-300">)</span></div>
          </div>
        </TaskCard>

        <TaskCard number="15*" title="" taskId="15" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(250):</code><br/><code>    x = random.randint(1, 21) * 10</code><br/><code>    y = random.randint(1, 21) * 10</code><br/><code>    canvas.create_rectangle(x, y, x + 10, y + 10, fill='black')</code><br/><br/>V poslední úloze může být náročné vymyslet vzorec pro generování souřadnic, aby čtverečky ležely v mřížce.</p>}>
          <p>15* Vytvoř nový program <code>qr_kod.py</code>, který bude představovat generátor náhodného QR kódu a který bude schopen generovat podobný QR kód jako na obrázku níže:</p>
          <CanvasPreview width={250} height={250}>
            {Array.from({ length: 150 }).map((_, i) => (
              <Rect 
                key={i} 
                x1={Math.floor(Math.random() * 21) * 10 + 20} 
                y1={Math.floor(Math.random() * 21) * 10 + 20} 
                width={10} 
                height={10} 
                fill="black" 
              />
            ))}
          </CanvasPreview>
          <p>Obrázek se skládá z velkého počtu černých čtverečků. Každý má délku strany 10 a je nakreslený v jednom náhodně vybraném políčku mřížky, která obsahuje 21 x 21 políček.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopsChapter;
