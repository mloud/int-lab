'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, GitMerge, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonBranchingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-yellow-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-yellow-500 mr-2 select-none">{">>>"}</span>
            <span className="text-yellow-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-yellow-600" />
      <span className="font-bold text-yellow-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-yellow-900 leading-relaxed">
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
  const [done, setLocalStorageDone] = useLocalStorage(`py17-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonBranchingChapter: React.FC<PythonBranchingChapterProps> = ({ onBack }) => {
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
      title="Větvení a konstrukce"
      subtitle="Lekce 17"
      icon={<GitMerge className="w-8 h-8 text-yellow-600" />}
      onBack={onBack}
      accentColor="yellow"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-yellow-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-yellow-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>vek = 15</code><br/><code>if vek &lt; 18:</code><br/><code>    print('Ahoj')</code><br/><code>else:</code><br/><code>    print('Dobrý den')</code></p>}>
          <p>Kamarádku pozdravíš neformálně „Ahoj“, ale starší lidi pozdravíš formálněji, například „Dobrý den“. Napiš program <code>pozdravy_podle_veku.py</code>, ve kterém do proměnné <code>vek</code> přiřadíš věk člověka. Potom použij příkaz větvení na to, aby se program podle věku rozhodl, který z uvedených dvou pozdravů vypíše. Otestuj, jaké pozdravy se vypisují pro různé hodnoty proměnné <code>vek</code>.</p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>hodin = 7</code><br/><code>if hodin &lt; 10:</code><br/><code>    print('Vyděláš si', hodin * 80, 'korun.')</code><br/><code>else:</code><br/><code>    print('Vyděláš si', hodin * 100, 'korun.')</code></p>}>
          <p>Na brigádě ve stánku se zmrzlinou dostaneš mzdu podle následujícího pravidla:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>když budeš pracovat méně než 10 hodin, vyděláš si 80 korun za hodinu,</li>
            <li>jinak si vyděláš 100 korun za hodinu.</li>
          </ul>
          <p className="mt-4">Vytvoř nový program, ve kterém do proměnné <code>hodin</code> přiřaď počet hodin, které jsi odpracoval. Potom pomocí příkazu větvení vypiš, kolik si vyděláš. Program by měl vypsat:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Vyděláš si 560 korun.<br/>
              <span className="text-slate-500 font-sans">pro hodin = 7</span>
            </div>
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Vyděláš si 1200 korun.<br/>
              <span className="text-slate-500 font-sans">pro hodin = 12</span>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>hodin = 20</code><br/><code>if hodin &lt; 10:</code><br/><code>    mzda = hodin * 80</code><br/><code>else:</code><br/><code>    mzda = hodin * 100</code><br/><code>print('Vyděláš si', mzda, 'korun.')</code></p>}>
          <p>Předchozí úloha se dá řešit i takto:</p>
          <PythonSnippet code={`hodin = 20\nif ..............................:\n    mzda = ..............................\nelse:\n    mzda = ..............................\nprint('Vyděláš si', mzda, 'korun.')`} />
          <p className="mt-2">Doplň namísto vytečkovaných částí správné výrazy. Ověř, že program správně počítá mzdu pro různé hodnoty proměnné <code>hodin</code>.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>megabajty = 6</code><br/><code>if megabajty &lt; 10:</code><br/><code>    cena = megabajty * 2</code><br/><code>else:</code><br/><code>    cena = 20</code><br/><code>print('Zaplatíš', cena, 'korun.')</code></p>}>
          <p>Mobilní operátor Vegafon počítá platby za přenesená data podle následujících pravidel:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>když za den přeneseš méně než 10 megabajtů dat, zaplatíš za každý megabajt 2 koruny,</li>
            <li>jinak zaplatíš za celý den 20 korun.</li>
          </ul>
          <p className="mt-4">Napiš program <code>mobilni_data.py</code>, ve kterém do proměnné <code>megabajty</code> přiřadíš počet přenesených megabajtů dat za jeden den. Použij příkaz větvení na to, abys do proměnné <code>cena</code> přiřadil vyúčtovanou cenu. Nakonec tuto cenu vypiš. Výpis může vypadat například takto:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Zaplatíš 12 korun.<br/>
              <span className="text-slate-500 font-sans">pro megabajty = 6</span>
            </div>
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Zaplatíš 20 korun.<br/>
              <span className="text-slate-500 font-sans">pro megabajty = 20</span>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>megabajty = 20</code><br/><code>if megabajty &lt; 10:</code><br/><code>    cena = megabajty * 1</code><br/><code>else:</code><br/><code>    cena = 10 + (megabajty - 10) * 3</code><br/><code>print('Zaplatíš', cena, 'korun.')</code></p>}>
          <p>Mobilní operátor Zodrafon počítá platby za přenesená data podle odlišných pravidel:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>když za den přeneseš méně než 10 megabajtů, zaplatíš za každý megabajt 1 korunu,</li>
            <li>jinak zaplatíš 10 korun a k tomu za každý megabajt nad limit 10 megabajtů 3 koruny.</li>
          </ul>
          <p className="mt-4">Napiš program <code>mobilni_data2.py</code>, který počítá a vypisuje cenu podle těchto pravidel, a ověř, zda funguje správně. Program by měl například vypsat:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Zaplatíš 6 korun.<br/>
              <span className="text-slate-500 font-sans">pro megabajty = 6</span>
            </div>
            <div className="text-center font-mono text-sm bg-slate-50 p-2 rounded-lg">
              Zaplatíš 40 korun.<br/>
              <span className="text-slate-500 font-sans">pro megabajty = 20</span>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>cas = 4</code><br/><code>if cas &lt; 8:</code><br/><code>    canvas.create_oval(150, 50, 250, 150, fill='white')</code><br/><code>else:</code><br/><code>    canvas.create_oval(150, 50, 250, 150, fill='yellow')</code></p>}>
          <p>Vytvoř program <code>den_noc.py</code>, který podle zadaného času nakreslí do grafické plochy slunce nebo měsíc. Do proměnné <code>cas</code> přiřaď počet hodin. Použij příkaz větvení na to, aby se pro <code>cas &lt; 8</code> kreslil měsíc jako bílý kruh, jinak se kreslilo slunce jako žlutý kruh. Poloměr kruhu nechť je v obou případech 50 a střed kruhu má souřadnice <code>[200, 100]</code>. Program by měl například nakreslit:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="#f0f0f0">
                <Oval x1={50} y1={25} width={100} height={100} fill="white" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 4</div>
            </div>
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="#f0f0f0">
                <Oval x1={50} y1={25} width={100} height={100} fill="yellow" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 14</div>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>cas = 4</code><br/><code>if cas &lt; 8:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='navy')</code><br/><code>    canvas.create_oval(150, 50, 250, 150, fill='white')</code><br/><code>else:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='cyan')</code><br/><code>    canvas.create_oval(150, 50, 250, 150, fill='yellow')</code></p>}>
          <p>Do předchozího řešení doplň kreslení pozadí – měsíc se nakreslí na tmavomodré pozadí, slunce na světlemodré pozadí:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="navy">
                <Oval x1={50} y1={25} width={100} height={100} fill="white" stroke="transparent" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 4</div>
            </div>
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="cyan">
                <Oval x1={50} y1={25} width={100} height={100} fill="yellow" stroke="transparent" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 14</div>
            </div>
          </div>
          <p className="mt-4 font-bold text-slate-800">Návod, jak to udělat:</p>
          <p className="mt-2 text-sm text-slate-600">Stačí, když do každé větve přidáš příkaz na kreslení velkého obdélníku, který překryje celou grafickou plochu:</p>
          <PythonSnippet code={`if ..............................:\n    canvas.create_rectangle(.............................., fill='navy')\n    canvas.create_oval(.............................., fill='white')\nelse:\n    canvas.create_rectangle(.............................., fill='cyan')\n    canvas.create_oval(.............................., fill='yellow')`} />
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>cas = 14</code><br/><code>x = 200</code><br/><code>y = 150</code><br/><code>if cas &lt; 8:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='navy')</code><br/><code>    canvas.create_oval(x - 50, y - 50, x + 50, y + 50, fill='white')</code><br/><code>else:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='cyan')</code><br/><code>    canvas.create_oval(x - 50, y - 50, x + 50, y + 50, fill='yellow')</code><br/><code>canvas.create_rectangle(0, 180, 400, 300, fill='green')</code></p>}>
          <p>Uprav předchozí program tak, aby se nejdříve do proměnných <code>x</code>, <code>y</code> přiřadily souřadnice středu kruhu a ty se potom použily v příkazech <code>create_oval</code>. Kromě toho přidej na úplný konec programu i kreslení zeleného obdélníku, který bude představovat krajinu. Potom program pro <code>x = 200</code> a <code>y = 150</code> bude kreslit scény jako na následujících obrázcích:</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="navy">
                <Oval x1={50} y1={75} width={100} height={100} fill="white" stroke="transparent" />
                <Rect x1={0} y1={120} width={200} height={30} fill="green" stroke="transparent" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 4</div>
            </div>
            <div className="text-center">
              <CanvasPreview width={200} height={150} bgColor="cyan">
                <Oval x1={50} y1={75} width={100} height={100} fill="yellow" stroke="transparent" />
                <Rect x1={0} y1={120} width={200} height={30} fill="green" stroke="transparent" />
              </CanvasPreview>
              <div className="font-mono text-sm mt-2">pro cas = 14</div>
            </div>
          </div>
          <p className="mt-4">Horní okraj zeleného obdélníku umísti na y-ovou souřadnici 180.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>cas = random.randint(0, 16)</code><br/><code>x = random.randint(100, 300)</code><br/><code>y = random.randint(100, 200)</code><br/><code>if cas &lt; 8:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='navy')</code><br/><code>    canvas.create_oval(x - 50, y - 50, x + 50, y + 50, fill='white')</code><br/><code>else:</code><br/><code>    canvas.create_rectangle(0, 0, 400, 300, fill='cyan')</code><br/><code>    canvas.create_oval(x - 50, y - 50, x + 50, y + 50, fill='yellow')</code><br/><code>canvas.create_rectangle(0, 180, 400, 300, fill='green')</code></p>}>
          <p>Vylepši předchozí program tak, aby fungoval jako náhodný generátor krajinek – přiřaď na začátku do proměnných <code>x</code>, <code>y</code>, <code>cas</code> náhodná čísla:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li><code>x</code> z rozsahu 100, 300</li>
            <li><code>y</code> z rozsahu 100, 200</li>
            <li><code>cas</code> z rozsahu 0, 16</li>
          </ul>
          <p className="mt-4">Program několikrát spusť a sleduj, zda se krajinky vytváří dle tvého očekávání.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Oba programy (s dvěma cykly vs. jeden cyklus + if) vypisují to samé, jen druhý používá vnořené větvení.</p>}>
          <p>Následující program vypisuje denní harmonogram:</p>
          <PythonSnippet code={`for i in range(8):\n    print(i, 'ještě spím')\nfor i in range(6):\n    print(8 + i, 'jsem ve škole')`} />
          <p>Diskutuj se spolužákem, co konkrétně program vypíše. Poté program spusť v Pythonu a zkontroluj, zda byla Tvá domněnka správná.</p>
          <p className="mt-4">Předchozí program se dá zapsat i takto, jen pomocí jediného cyklu:</p>
          <PythonSnippet code={`for i in range(14):\n    if i < 8:\n        print(i, 'ještě spím')\n    else:\n        print(i, 'jsem ve škole')`} />
          <p>Tělo cyklu <code>for</code> obsahuje jeden vnořený příkaz větvení <code>if else</code>. Vyzkoušej, jak funguje tato verze.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>for i in range(10):</code><br/><code>    if i &lt; 5:</code><br/><code>        print('Mám', i * 10, 'korun, jsem chudý')</code><br/><code>    else:</code><br/><code>        print('Mám', i * 10, 'korun, jsem bohatý')</code></p>}>
          <p>Vytvoř nový program <code>chudy_bohaty.py</code>. V něm podobně jako v předchozí úloze použij cyklus s vnořeným větvením a vypiš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Mám 0 korun, jsem chudý<br/>
Mám 10 korun, jsem chudý<br/>
Mám 20 korun, jsem chudý<br/>
Mám 30 korun, jsem chudý<br/>
Mám 40 korun, jsem chudý<br/>
Mám 50 korun, jsem bohatý<br/>
Mám 60 korun, jsem bohatý<br/>
Mám 70 korun, jsem bohatý<br/>
Mám 80 korun, jsem bohatý<br/>
Mám 90 korun, jsem bohatý
          </div>
          <p className="mt-4 text-sm text-slate-600">Proměnná cyklu se mění od 0 do 9 a vypisuje se desetinásobek hodnoty této proměnné.</p>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>for n in range(11):</code><br/><code>    if n * n &lt; 5 * n:</code><br/><code>        print(n * n, 'je menší než', 5 * n)</code><br/><code>    else:</code><br/><code>        print(n * n, 'je větší nebo rovno', 5 * n)</code><br/><br/>Pro která n onen vztah platí? Odpověď: pro n = 1, 2, 3, 4.</p>}>
          <p>Víš, pro která čísla <code>n</code> platí, že <code>n²</code> je menší než <code>5 * n</code>? Napiš program <code>nasobky_peti.py</code>, který pro všechna čísla od 0 do 10 otestuje tento vztah a vypíše o tom patřičnou informaci, například:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
...<br/>
16 je menší než 20<br/>
25 je větší nebo rovno 25<br/>
36 je větší nebo rovno 30<br/>
...
          </div>
          <p className="mt-4 font-bold">Co tvůj program zjistil? Pro která n onen vztah platí?</p>
        </TaskCard>

        <TaskCard number="13" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 20</code><br/><code>for i in range(15):</code><br/><code>    if i &lt; 8:</code><br/><code>        canvas.create_oval(x, 100, x + 20, 120, fill='red')</code><br/><code>    else:</code><br/><code>        canvas.create_oval(x, 100, x + 20, 120, fill='blue')</code><br/><code>    x = x + 20</code></p>}>
          <p>Vytvoř nový program <code>koralky_na_niti.py</code>, ve kterém pomocí jediného cyklu s vnořeným větvením nakresli 15 korálků jako na obrázku níže. Prvních 8 korálků bude červených a zbylých 7 modrých.</p>
          <CanvasPreview width={360} height={100} bgColor="#f0f0f0">
            {Array.from({ length: 15 }).map((_, i) => (
              <Oval key={i} x1={i * 20 + 30} y1={40} width={20} height={20} fill={i < 8 ? "red" : "blue"} />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="14*" title="" taskId="14" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 20</code><br/><code>for i in range(15):</code><br/><code>    if i &lt; 8:</code><br/><code>        barva = random.choice(['red', 'yellow'])</code><br/><code>        canvas.create_oval(x, 100, x + 20, 120, fill=barva)</code><br/><code>    else:</code><br/><code>        barva = random.choice(['blue', 'green'])</code><br/><code>        canvas.create_oval(x, 100, x + 20, 120, fill=barva)</code><br/><code>    x = x + 20</code></p>}>
          <p>14* Uprav předchozí program tak, aby se prvních 8 korálků barvilo náhodně pomocí</p>
          <PythonSnippet code={`random.choice(['red', 'yellow'])`} />
          <p>a zbylých 7 pomocí</p>
          <PythonSnippet code={`random.choice(['blue', 'green'])`} />
          <p className="mt-4">Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={360} height={100} bgColor="#f0f0f0">
            {Array.from({ length: 15 }).map((_, i) => (
              <Oval 
                key={i} 
                x1={i * 20 + 30} 
                y1={40} 
                width={20} 
                height={20} 
                fill={i < 8 ? (Math.random() > 0.5 ? "red" : "yellow") : (Math.random() > 0.5 ? "blue" : "green")} 
              />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="15*" title="" taskId="15" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def koralek():</code><br/><code>    x = random.randint(10, 390)</code><br/><code>    y = random.randint(10, 290)</code><br/><code>    if x &lt; 200:</code><br/><code>        barva = random.choice(['red', 'yellow'])</code><br/><code>    else:</code><br/><code>        barva = random.choice(['blue', 'green'])</code><br/><code>    canvas.create_oval(x - 10, y - 10, x + 10, y + 10, fill=barva)</code><br/><br/><code>for i in range(100):</code><br/><code>    koralek()</code></p>}>
          <p>15* Vytvoř nový program <code>rozsypane_koralky.py</code> a v něm definuj podprogram <code>koralek</code>. V tomto podprogramu vygeneruj náhodné pozice <code>x</code>, <code>y</code> pro střed korálku. Program potom podle x-ové souřadnice nakreslí:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>červený nebo žlutý korálek, pokud je <code>x &lt; 200</code>;</li>
            <li>modrý nebo zelený korálek pro ostatní čísla.</li>
          </ul>
          <p className="mt-4">Využij kreslení korálků z předchozí úlohy.</p>
          <p>Když zavoláš podprogram <code>koralek</code> v cyklu stokrát, můžeš dostat například takovýto obrázek:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            {Array.from({ length: 100 }).map((_, i) => {
              const x = Math.floor(Math.random() * 280) + 10;
              const y = Math.floor(Math.random() * 180) + 10;
              const isLeft = x < 150;
              const fill = isLeft ? (Math.random() > 0.5 ? "red" : "yellow") : (Math.random() > 0.5 ? "blue" : "green");
              return (
                <Oval key={i} x1={x - 8} y1={y - 8} width={16} height={16} fill={fill} />
              );
            })}
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonBranchingChapter;
