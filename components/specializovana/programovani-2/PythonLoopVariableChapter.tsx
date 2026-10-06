'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Variable, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopVariableChapterProps {
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
          <span className="text-red-400">{line}</span>
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
  const [done, setLocalStorageDone] = useLocalStorage(`py12-task-${taskId}`, false);
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

const PythonLoopVariableChapter: React.FC<PythonLoopVariableChapterProps> = ({ onBack }) => {
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
      title="Proměnná cyklu"
      subtitle="Lekce 12"
      icon={<Variable className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce 12', icon: Code }]}
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
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl mb-8">
          <p className="text-rose-800/80 text-sm sm:text-base font-bold">
            Cílem této lekce je naučit tě používat proměnnou cyklu. Nyní bude důležité porozumět, jak se proměnná mění a jak se dá použít v těle cyklu a ve výrazech.
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Kočka leze dírou')</code><br/><code>for i in range(2):</code><br/><code>    print('pes oknem')</code><br/><code>for i in range(2):</code><br/><code>    print('nebude-li pršet')</code><br/><code>    print('nezmoknem')</code><br/><br/>Někteří žáci patrně přijdou jen na použití jednoho <code>for</code> cyklu, ale možného použití druhého cyklu si nevšimnou. Takové žáky přivedeme na myšlenku, že se v říkance opakují ještě jiné verše, a tak je možné použít ještě jeden <code>for</code> cyklus.</p>}>
          <p>Tvůj mladší sourozenec našel následující říkanku:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
kočka leze dírou<br/>
pes oknem<br/>
pes oknem<br/>
nebude-li pršet<br/>
nezmoknem<br/>
nebude-li pršet<br/>
nezmoknem
          </div>
          <p className="mt-4">Vytvoř program <code>rikanka.py</code>, který ji vypíše pomocí příkazů <code>print</code>. Použij <code>for</code> cykly, aby bylo v programu co nejméně příkazů <code>print</code>.</p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Další úloha ilustruje použití proměnné <code>i</code> a novou, ale důležitou činnost <code>for</code> cyklu.</p>}>
          <p>Vytvoř program <code>rada_cisel.py</code> a pomocí následujícího kódu vypiš celá čísla od 0 do 9:</p>
          <PythonSnippet code={`for i in range(10):\n    print('číslo', i)`} />
          <p>Jestli jsi kód zapsal(a) správně, program po spuštění vypíše:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre h-48 overflow-y-auto">
číslo 0<br/>
číslo 1<br/>
číslo 2<br/>
číslo 3<br/>
číslo 4<br/>
číslo 5<br/>
číslo 6<br/>
číslo 7<br/>
číslo 8<br/>
číslo 9
          </div>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h4 className="font-bold text-slate-800 mb-4">Jak to funguje?</h4>
            <div className="font-mono bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm relative">
              <div className="mb-2">for <span className="text-rose-600 font-bold">i</span> in range(<span className="text-blue-600 font-bold">10</span>):</div>
              <div className="pl-8 text-slate-600 border-l-4 border-rose-200 ml-4 py-1">print('číslo', <span className="text-rose-600 font-bold">i</span>)</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• <code>i</code> je proměnná, do které příkaz <code>for</code> postupně přiřazuje celá čísla od <code>0</code> do <code>9</code></li>
              <li>• rozsah čísel je z intervalu <code>&lt;0, 10)</code> (tedy 0 až 9, bez 10)</li>
              <li>• pro každé číslo se vykoná tělo cyklu, a tak se vypíše hodnota proměnné <code>i</code></li>
            </ul>
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení pro 0, 1, ... 10:<br/><code>for i in range(11):</code><br/><code>    print('číslo', i)</code><br/><br/>Řešení pro 1, 2, ... 10:<br/><code>for i in range(10):</code><br/><code>    print('číslo', i + 1)</code><br/><br/>Řešení pro 2, 4, ... 20:<br/><code>for i in range(10):</code><br/><code>    print('číslo', (i + 1) * 2)</code><br/>nebo:<br/><code>for i in range(10):</code><br/><code>    print('číslo', i * 2 + 2)</code><br/><br/>Řešení pro 10, 20, ... 100:<br/><code>for i in range(10):</code><br/><code>    print('číslo', (i + 1) * 10)</code><br/>nebo:<br/><code>for i in range(10):</code><br/><code>    print('číslo', i * 10 + 10)</code><br/><br/>V této úloze se žáci poprvé setkávají s výpočty založenými na proměnné cyklu, což může některým žákům činit potíže. Je vhodné se žáky diskutovat o tom, jak by bylo možno řadu požadovaných čísel vytvořit na základě řady čísel 0 až 9.<br/>Tyto úlohy lze řešit alternativně jen pomocí vhodných parametrů příkazu range: <code>range(1, 11)</code>, <code>range(2, 21, 2)</code> atd. Nechceme však, aby úlohy žáci takto řešili, ani jim různé varianty příkazu range neprozrazujeme.</p>}>
          <p>Urči, co je potřeba v předchozím programu změnit, aby se vypsala čísla:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm font-mono text-slate-700">
            <li>a) 0, 1, ... 10 – tedy i číslo 10</li>
            <li>b) 1, 2, ... 10</li>
            <li>c) 2, 4, ... 20</li>
            <li>d) 10, 20, ... 100</li>
          </ul>
          <p className="mt-4">Program pokaždé vyzkoušej, abys ověřil, zda byla tvá domněnka správná.</p>
          <div className="bg-slate-100 p-3 rounded-lg text-sm text-slate-600 mt-4 font-mono text-center">
            Příkaz <code>for</code> čteme: „pro <code>i</code> v rozsahu(...) vykonej tělo cyklu“
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>for i in range(7):</code><br/><code>    print(i, 'na druhou je', i * i)</code></p>}>
          <p>Vytvoř program <code>druhe_mocniny.py</code>, který pomocí <code>for</code> cyklu vypíše čísla a jejich druhé mocniny:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
0 na druhou je 0<br/>
1 na druhou je 1<br/>
2 na druhou je 4<br/>
3 na druhou je 9<br/>
4 na druhou je 16<br/>
5 na druhou je 25<br/>
6 na druhou je 36
          </div>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>for i in range(10):</code><br/><code>    print('Na stromě bylo', i, 'vrabců, jeden přiletěl a už je tam', i + 1, 'vrabců')</code><br/><br/>Tato i následující úloha poskytuje prostor k diskuzi o české gramatice. Lze diskutovat, jak by bylo nutné programy upravit, aby generovaly gramaticky správné věty.</p>}>
          <p>Máme takovouto povídku:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre overflow-x-auto text-slate-600">
Na stromě bylo 0 vrabců, jeden přiletěl a už je tam 1 vrabců<br/>
Na stromě bylo 1 vrabců, jeden přiletěl a už je tam 2 vrabců<br/>
Na stromě bylo 2 vrabců, jeden přiletěl a už je tam 3 vrabců<br/>
...<br/>
Na stromě bylo 9 vrabců, jeden přiletěl a už je tam 10 vrabců
          </div>
          <p className="mt-4">Zapiš ji pomocí <code>for</code> cyklu do nového programu <code>povidka.py</code>.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>for i in range(10):</code><br/><code>    print('Na stromě bylo', 10 - i, 'vrabců, jeden odletěl a zůstalo tam', 9 - i, 'vrabců')</code><br/><br/>V této úloze se žáci poprvé setkávají s tím, že se v cyklu vypisované číslo snižuje. Někteří žáci se proto mohou snažit upravovat parametry příkazu range tak, aby se do proměnné i nepřiřazovala čísla od 0 do 9, ale například od 10 do 1. Tyto snahy však obvykle nevedou k požadovanému řešení.</p>}>
          <p>Vrabci z předchozí povídky odlétají – vymysli v programu <code>povidka.py</code> kód, který to bude pomocí <code>for</code> cyklu vyprávět:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre overflow-x-auto text-slate-600">
Na stromě bylo 10 vrabců, jeden odletěl a zůstalo tam 9 vrabců<br/>
Na stromě bylo 9 vrabců, jeden odletěl a zůstalo tam 8 vrabců<br/>
...<br/>
Na stromě bylo 1 vrabců, jeden odletěl a zůstalo tam 0 vrabců
          </div>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení (souřadnice x, y jsou vygenerované tak, aby odpovídaly středu kartičky):<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(10):</code><br/><code>    x = random.randint(20, 340)</code><br/><code>    y = random.randint(30, 230)</code><br/><code>    canvas.create_rectangle(x - 20, y - 30, x + 20, y + 30, fill='deepskyblue')</code><br/><code>    canvas.create_text(x, y, text=i, font='arial 30')</code></p>}>
          <p>Máme kartičky s čísly od 0 do 9, které chceme náhodně rozložit po ploše. Vytvoř program <code>deset_karticek.py</code>, který pomocí cyklu postupně nakreslí deset takových kartiček na náhodných pozicích:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={150} y1={20} width={30} height={40} fill="deepskyblue" />
            <Text x={165} y={40} text="2" fontSize={24} />
            
            <Rect x1={100} y1={40} width={30} height={40} fill="deepskyblue" />
            <Text x={115} y={60} text="1" fontSize={24} />
            
            <Rect x1={140} y1={50} width={30} height={40} fill="deepskyblue" />
            <Text x={155} y={70} text="8" fontSize={24} />
            
            <Rect x1={50} y1={80} width={30} height={40} fill="deepskyblue" />
            <Text x={65} y={100} text="4" fontSize={24} />
            
            <Rect x1={85} y1={80} width={30} height={40} fill="deepskyblue" />
            <Text x={100} y={100} text="5" fontSize={24} />
            
            <Rect x1={200} y1={100} width={30} height={40} fill="deepskyblue" />
            <Text x={215} y={120} text="7" fontSize={24} />
            
            <Rect x1={40} y1={120} width={30} height={40} fill="deepskyblue" />
            <Text x={55} y={140} text="6" fontSize={24} />
            
            <Rect x1={70} y1={130} width={30} height={40} fill="deepskyblue" />
            <Text x={85} y={150} text="3" fontSize={24} />
            
            <Rect x1={160} y1={140} width={30} height={40} fill="deepskyblue" />
            <Text x={175} y={160} text="9" fontSize={24} />
            
            <Rect x1={165} y1={145} width={30} height={40} fill="deepskyblue" />
            <Text x={180} y={165} text="0" fontSize={24} />
          </CanvasPreview>
          <p className="mt-4">Když budeš chtít na kartičkách nakreslit velká čísla jako na obrázku výše, přidej do příkazu <code>create_text</code> žlutě zvýrazněný kód: <code>canvas.create_text(x, y, text=i, <span className="bg-yellow-200">font='arial 30'</span>)</code></p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>V úloze není číslo úmyslně umístěné ve středu kartičky. Záleží však na kreativitě žáků, jak budou kreslené bankovky nakonec vypadat.</p>}>
          <p>Na chodníku je rozhozených pět cizokrajných bankovek s hodnotami 10, 20, 30, 40 a 50. Napiš program <code>bankovky.py</code>, který takové bankovky nakreslí pomocí <code>for</code> cyklu:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Rect x1={100} y1={30} width={80} height={40} fill="yellowgreen" />
            <Text x={115} y={45} text="40" fontSize={20} align="center" />
            
            <Rect x1={80} y1={60} width={80} height={40} fill="yellowgreen" />
            <Text x={95} y={75} text="10" fontSize={20} align="center" />
            
            <Rect x1={60} y1={80} width={80} height={40} fill="yellowgreen" />
            <Text x={75} y={95} text="30" fontSize={20} align="center" />
            
            <Rect x1={50} y1={100} width={80} height={40} fill="yellowgreen" />
            <Text x={65} y={115} text="50" fontSize={20} align="center" />
            
            <Rect x1={150} y1={130} width={80} height={40} fill="yellowgreen" />
            <Text x={165} y={145} text="20" fontSize={20} align="center" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/>když se zobrazí 0: x = 0<br/>když se zobrazí 1: x = 50<br/>když se zobrazí 2: x = 100<br/>když se zobrazí 3: x = 150<br/>když se zobrazí 4: x = 200<br/>když se zobrazí 5: x = 250<br/>když se zobrazí 6: x = 300<br/>když se zobrazí 7: x = 350<br/><br/>Cílem úlohy je předvést, jak se proměnná cyklu používá při výpočtu souřadnic. Proto chceme, aby žáci program odkrokovali a viděli souvislost mezi proměnnou <code>i</code> a výpočtem souřadnic.</p>}>
          <p>Vytvoř nový program <code>kresleni_cisel.py</code> a přepiš do něj následující kód, který kreslí čísla na grafickou plochu:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nfor i in range(8):\n    x = i * 50\n    canvas.create_text(x, 100, text=i, font='arial 30')`} />
          <p>Vytvořený program spusť, abys viděl(a), co udělá, a vyplň následující tabulku:</p>
          <table className="w-full mt-4 border-collapse border border-slate-300 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 text-left font-normal"></th>
                <th className="border border-slate-300 p-2 font-bold">hodnota v proměnné <code>i</code></th>
                <th className="border border-slate-300 p-2 font-bold">hodnota v proměnné <code>x</code></th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 0</td><td className="border border-slate-300 p-2 text-center">0</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 1</td><td className="border border-slate-300 p-2 text-center">1</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 2</td><td className="border border-slate-300 p-2 text-center">2</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 3</td><td className="border border-slate-300 p-2 text-center">3</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 4</td><td className="border border-slate-300 p-2 text-center">4</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 5</td><td className="border border-slate-300 p-2 text-center">5</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 6</td><td className="border border-slate-300 p-2 text-center">6</td><td className="border border-slate-300 p-2"></td></tr>
              <tr><td className="border border-slate-300 p-2">když se zobrazí 7</td><td className="border border-slate-300 p-2 text-center">7</td><td className="border border-slate-300 p-2"></td></tr>
            </tbody>
          </table>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(8):</code><br/><code>    x = i * 50</code><br/><code>    y = i * 30</code><br/><code>    canvas.create_text(x, y, text=i, font='arial 30')</code></p>}>
          <p>Uprav předchozí program tak, aby se čísla kreslila přibližně na úhlopříčce grafické plochy podobně jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            {Array.from({ length: 8 }).map((_, i) => (
              <Text key={i} x={i * 38} y={i * 25} text={i.toString()} fontSize={24} />
            ))}
          </CanvasPreview>
          <p className="mt-4 font-bold">Jaký jsi vymyslel vzorec pro výpočet y-ové souřadnice?</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(8):</code><br/><code>    x = i * 50 + 15</code><br/><code>    y = i * 30 + 20</code><br/><code>    canvas.create_text(x, y, text=i, font='arial 30')</code></p>}>
          <p>V předchozím programu se číslo 0 kreslilo za roh grafické plochy, takže nebylo skoro vidět. Uprav výpočet souřadnic tak, aby byla vidět všechna čísla. Výsledek může vypadat jako na obrázku níže:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            {Array.from({ length: 8 }).map((_, i) => (
              <Text key={i} x={i * 38 + 15} y={i * 25 + 20} text={i.toString()} fontSize={24} />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(6):</code><br/><code>    x = i * 50 + 10</code><br/><code>    canvas.create_rectangle(x, 100, x + 20, 200, fill='red')</code><br/><br/>V takovýchto úlohách zaměřených na kreslení bývá pro žáky náročné odvodit vzorec pro výpočet souřadnic pomocí proměnné cyklu. Je vhodné naučit žáky načrtnout si průběh kreslení a souřadnice si odvodit: postupně přidáváme další pozice s konkrétními čísly, aby žáci viděli vztah mezi pořadovým číslem a souřadnicí.</p>}>
          <p>Víš, jak vypadá padající had z domina? Vytvoř program <code>domino.py</code>, který pomocí cyklu a obdélníku nakreslí zatím ještě stojící kostky domina:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            {Array.from({ length: 6 }).map((_, i) => (
              <Rect key={i} x1={i * 35 + 30} y1={80} width={15} height={80} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="13*" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>for i in range(10):</code><br/><code>    y = 200 - i * 20</code><br/><code>    d = 100 - i * 10</code><br/><code>    canvas.create_rectangle(190 - d, y, 190 + d, y + 20, fill='orange')</code><br/><br/>V našem řešení do proměnné <code>d</code> vypočítáváme polovinu délky <code>i</code>-tého obdélníku. Pokud se tímto cyklem kreslí obdélníky odzdola (od největšího po nejmenší), polovina délky nejdelšího z nich je 100, dalšího nad ním 90, dalšího 80, atd.<br/>Poslední úloha může být pro žáky obtížná, neboť se v cyklu počítá nejen pozice, ale také velikost obdélníku.</p>}>
          <p>13* Napiš program <code>velka_pyramida.py</code>, který pomocí cyklu a obdélníku nakreslí takovouto pyramidu:</p>
          <CanvasPreview width={300} height={250} bgColor="#f0f0f0">
            {Array.from({ length: 10 }).map((_, i) => {
              const y = 220 - i * 15;
              const d = 100 - i * 9;
              return (
                <Rect key={i} x1={150 - d} y1={y} width={d * 2} height={15} fill="orange" />
              );
            })}
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopVariableChapter;
