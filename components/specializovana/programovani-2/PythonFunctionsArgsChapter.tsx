'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Puzzle, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonFunctionsArgsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-emerald-500 mr-2 select-none">{">>>"}</span>
            <span className="text-emerald-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-emerald-600" />
      <span className="font-bold text-emerald-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-emerald-900 leading-relaxed">
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
  const [done, setLocalStorageDone] = useLocalStorage(`py19-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonFunctionsArgsChapter: React.FC<PythonFunctionsArgsChapterProps> = ({ onBack }) => {
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
      title="Podprogram s parametrem"
      subtitle="Lekce 19"
      icon={<Puzzle className="w-8 h-8 text-emerald-600" />}
      onBack={onBack}
      accentColor="emerald"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-emerald-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>cislo = 128</code><br/><code>if cislo &lt; 10:</code><br/><code>    print('Číslo', cislo, 'je jednociferné')</code><br/><code>else:</code><br/><code>    if cislo &lt; 100:</code><br/><code>        print('Číslo', cislo, 'je dvouciferné')</code><br/><code>    else:</code><br/><code>        print('Číslo', cislo, 'je trojciferné')</code></p>}>
          <p>Vytvoř nový program <code>cifry_cisla.py</code>, ve kterém přiřadíš do proměnné <code>cislo</code> číslo od 0 do 999. Použij větvení na to, aby program rozhodl a správně vypsal hlášení o tom, zda je číslo jedno-, dvou- nebo trojciferné. Například pro <code>cislo = 128</code> program vypíše:</p>
          <div className="font-mono text-sm bg-slate-50 p-4 rounded-lg mt-2">
            Číslo 128 je trojciferné.
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Cílem 2. a 3. úlohy je objevit koncept parametru: místo přiřazení nějaké hodnoty do proměnné <code>vek</code> uvnitř podprogramu vytvoříme podprogram, který má v hlavičce za názvem podprogramu v kulatých závorkách uvedený název proměnné.</p>}>
          <p>Vytvoř nový program <code>muj_vek.py</code>. Přepiš do něj následující kód a dokonči jednotlivé podprogramy, aby vypisovaly správný věk:</p>
          <PythonSnippet code={`def jemi10():\n    vek = 10\n    print('Je mi', vek, 'let')\n\ndef jemi20():\n    vek = ......\n    print('Je mi', vek, 'let')\n\ndef jemi30():\n    vek = 30\n    print(....................................)\n\njemi10()\njemi20()\njemi30()`} />
          <p className="mt-2">Udělej to tak, aby se všechny tři podprogramy navzájem co nejvíc podobaly.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Uvnitř podprogramu je parametr obyčejnou proměnnou, která má už na začátku podprogramu určenu svou počáteční hodnotu. Zvídavější žáci mohou vyzkoušet, že parametr se uvnitř podprogramu opravdu chová jako obyčejná proměnná.</p>}>
          <p>Předchozí řešení se dá zapsat pomocí jediného podprogramu:</p>
          <PythonSnippet code={`def jemi(vek):\n    print('Je mi', vek, 'let')\n\njemi(10)\njemi(20)\njemi(30)`} />
          <p className="mt-2">Vyzkoušej jej. Jak program funguje?</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>Slovo <code>vek</code> v závorce na prvním řádku je <strong>název parametru</strong>.</li>
            <li>Uvnitř <code>print</code> se parametr <strong>používá</strong> – parametr funguje jako normální proměnná.</li>
            <li>Čísla 10, 20 a 30 v závorkách dole jsou <strong>hodnoty</strong>, které se přiřadí do parametru <code>vek</code> při každém zavolání.</li>
          </ul>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def vypis(x):</code><br/><code>    print('Číslo', x)</code><br/><code>    print('Umocněné na druhou se rovná', x * x)</code><br/><br/><code>vypis(1)</code><br/><code>vypis(2)</code><br/><code>vypis(3)</code></p>}>
          <p>Vytvoř nový program <code>druha_mocnina_parametr.py</code>. Přepiš do něj následující kód a dokonči podprogram <code>vypis</code>, který používá parametr <code>x</code> na to, aby vypsal hodnotu parametru <code>x</code> a jeho druhou mocninu:</p>
          <PythonSnippet code={`def vypis(x):\n    print('Číslo', ...)\n    print('Umocněné na druhou se rovná', ............)\n\nvypis(1)\nvypis(2)\nvypis(3)`} />
          <p className="mt-2">Program by měl po spuštění vypsat:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Číslo 1<br/>
Umocněné na druhou se rovná 1<br/>
Číslo 2<br/>
Umocněné na druhou se rovná 4<br/>
Číslo 3<br/>
Umocněné na druhou se rovná 9
          </div>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def vypis(x):</code><br/><code>    print('Číslo', x)</code><br/><code>    print('Umocněné na druhou se rovná', x * x)</code><br/><code>    print('Převrácená hodnota se rovná', 1 / x)</code><br/><br/>Uvedené řešení není zcela univerzální – pokud žák zavolá podprogram vypis s hodnotou parametru rovnající se 0, dojde k dělení nulou a Python vypíše chybové hlášení.</p>}>
          <p>Doplň do předchozího podprogramu příkaz, kterým se vypíše i převrácená hodnota <code>x</code>. Připomeňme, že převrácená hodnota čísla <code>x</code> je rovna <code>1 / x</code>. Program by měl po spuštění vypsat:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Číslo 1<br/>
Umocněné na druhou se rovná 1<br/>
Převrácená hodnota se rovná 1.0<br/>
Číslo 2<br/>
Umocněné na druhou se rovná 4<br/>
Převrácená hodnota se rovná 0.5<br/>
Číslo 3<br/>
Umocněné na druhou se rovná 9<br/>
Převrácená hodnota se rovná 0.3333333333333333
          </div>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def kruh(r):</code><br/><code>    canvas.create_oval(200 - r, 150 - r, 200 + r, 150 + r)</code></p>}>
          <p>Vytvoř nový program <code>kruh_parametr.py</code>. Přepiš do něj následující kód a dokonči podprogram <code>kruh</code> tak, aby kreslil kruhy se středem 200, 150 a poloměrem <code>r</code>, který bude parametrem podprogramu:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef kruh(r):\n    canvas.create_oval(............, ............, ............, ............)\n\nkruh(10)\nkruh(100)\nkruh(50)`} />
          <p className="mt-2">Jestli jsi postupoval správně, program by měl nakreslit takovýto obrázek:</p>
          <CanvasPreview width={200} height={200} bgColor="#f0f0f0">
            <Oval x1={90} y1={90} width={20} height={20} />
            <Oval x1={50} y1={50} width={100} height={100} />
            <Oval x1={0} y1={0} width={200} height={200} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def nahodny_kruh(r):</code><br/><code>    x = random.randint(10, 350)</code><br/><code>    y = random.randint(10, 250)</code><br/><code>    canvas.create_oval(x - r, y - r, x + r, y + r, fill='red')</code></p>}>
          <p>Vytvoř nový program <code>nahodny_kruh_parametr.py</code> a v něm vytvoř podprogram <code>nahodny_kruh</code> s parametrem <code>r</code>, který nakreslí na náhodných souřadnicích červený kruh o poloměru <code>r</code>. Zavolej tento podprogram pro různé hodnoty parametru. Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200} bgColor="#f0f0f0">
            <Oval x1={200} y1={100} width={40} height={40} fill="red" stroke="transparent" />
            <Oval x1={100} y1={120} width={60} height={60} fill="red" stroke="transparent" />
            <Oval x1={50} y1={30} width={20} height={20} fill="red" stroke="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>V tomto případě je hodnotou parametru <code>r</code> hodnota proměnné <code>for</code> cyklu. Jestliže tento for cyklus nabývá postupně hodnot 0, 1, … 9, na náhodné pozice se nakreslí 10 červených kruhů. První z nich má poloměr 0, a proto se z něj nakreslí jen jedna malá tečka.</p>}>
          <p>Vyzkoušej, co předchozí program nakreslí, když zavoláš podprogram <code>nahodny_kruh</code> následujícím způsobem:</p>
          <PythonSnippet code={`for i in range(10):\n    nahodny_kruh(i)`} />
          <p className="mt-2">Diskutuj se svým spolužákem, jak program funguje.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Tabulka hodnot proměnné <code>i</code> a parametru <code>r</code>:<br/>i=0 -> r=5<br/>i=1 -> r=6<br/>i=2 -> r=7<br/>i=3 -> r=8<br/>i=4 -> r=9<br/>i=5 -> r=10<br/>i=6 -> r=11<br/>i=7 -> r=12<br/>i=8 -> r=13<br/>i=9 -> r=14</p>}>
          <p>Poloměr kruhu můžeme určit i takto:</p>
          <PythonSnippet code={`for i in range(10):\n    nahodny_kruh(i + 5)`} />
          <p className="mt-2">Spusť program, abys viděl, co udělá, a doplň logicky, jaké hodnoty dostává parametr <code>r</code>, když <code>i</code> roste od 0 do 9.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def obliba(cislo):</code><br/><code>    if cislo &lt; 7:</code><br/><code>        print('Mám rád číslo', cislo)</code><br/><code>    else:</code><br/><code>        print('Číslo', cislo, 'se mi nelíbí')</code></p>}>
          <p>Vytvoř nový program <code>oblibene_cislo.py</code> a v něm definuj podprogram <code>obliba</code> s parametrem <code>cislo</code>. Podprogram podle následujících pravidel vypíše, zda má číslo v oblibě:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>když je číslo menší než 7, vypíše <code>Mám rád číslo ...</code></li>
            <li>jinak vypíše <code>Číslo ... se mi nelíbí</code></li>
          </ul>
          <p className="mt-4">Program spusť, podprogram <code>cislo</code> zavolej z příkazového řádku a ověř, že vypíše:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
{">>>"} obliba(1)<br/>
Mám rád číslo 1<br/>
{">>>"} obliba(5)<br/>
Mám rád číslo 5<br/>
{">>>"} obliba(10)<br/>
Číslo 10 se mi nelíbí
          </div>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení – doplníme následující kód:<br/><code>for i in range(11):</code><br/><code>    obliba(i)</code></p>}>
          <p>Uprav předchozí program tak, aby pomocí cyklu zavolal podprogram <code>obliba</code> pro čísla od 0 do 10. Výsledek by měl vypadat následovně:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Mám rád číslo 0<br/>
Mám rád číslo 1<br/>
...<br/>
Mám rád číslo 6<br/>
Číslo 7 se mi nelíbí<br/>
...<br/>
Číslo 10 se mi nelíbí
          </div>
        </TaskCard>

        <TaskCard number="12*" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def ctverec(a):</code><br/><code>    if a &gt; 0:</code><br/><code>        canvas.create_rectangle(10, 10, 10 + a, 10 + a)</code><br/><code>    else:</code><br/><code>        canvas.create_text(200, 150, text='Nedá se')</code></p>}>
          <p>12* Vytvoř nový program <code>ctverec_parametr.py</code> a v něm definuj podprogram <code>ctverec</code> s parametrem <code>a</code>, který udává délku strany čtverce. Podprogram by měl fungovat tak, že čtverec kreslí jen pro kladné hodnoty parametru <code>a</code>, ale pro záporné hodnoty vypíše zprávu „Nedá se“. Levý horní roh kresleného čtverce bude mít souřadnice [10, 10]. Zprávu vypiš přibližně do středu grafické plochy. Otestuj, že podprogram pracuje správně pro <code>ctverec(-50)</code> i <code>ctverec(100)</code>.</p>
        </TaskCard>

        <TaskCard number="13*" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Tento příklad ukazuje syntaxi `if` bez `else`. Žádná větev nesmí být prázdná, takže pokud odstraníme `else`, prostě to nevykoná nic a pokračuje dál.</p>}>
          <p>13* Uprav podprogram <code>ctverec</code> z předchozí úlohy tak, aby se pro záporné hodnoty parametru <code>a</code> nikde nic nevypsalo. Stačí, když smažeš větev <code>else:</code> i s příkazem pro výpis. Takovýto příkaz se nazývá <code>if</code> bez větve <code>else</code>:</p>
          <PythonSnippet code={`if podmínka:\n    příkaz\n    příkaz`} />
        </TaskCard>

        <TaskCard number="14" title="" taskId="14" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><code>cislo = random.randint(1, 5)</code><br/><br/><code>def zkus(n):</code><br/><code>    if n == cislo:</code><br/><code>        print('Hurá, uhádl jsi!')</code><br/><code>    else:</code><br/><code>        print('Ne, moje číslo je jiné...')</code><br/><br/><code>print('Myslím si číslo od 1 do 5. Zkus ho uhádnout...')</code></p>}>
          <p>Znáš hru Myslím si číslo, ve které je potřeba uhádnout neznámé číslo? Vytvoř takovou hru na počítači – počítač si vymyslí číslo od 1 do 5 a my ho musíme uhádnout. Vytvoř nový program <code>uhadni_cislo.py</code>, který bude fungovat následujícím způsobem:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>po spuštění programu počítač přiřadí do proměnné <code>cislo</code> náhodně vygenerované číslo,</li>
            <li>potom vypíše zprávu „Myslím si číslo od 1 do 5. Zkus ho uhádnout...“</li>
            <li>ve svém programu budeš mít definovaný podprogram <code>zkus</code> s parametrem <code>n</code>, který porovná <code>cislo</code> s hodnotou <code>n</code> a vypíše: buď „Hurá, uhádl jsi!“, nebo „Ne, moje číslo je jiné...“.</li>
          </ul>
          <p className="mt-4">Hra může probíhat následovně – spustíme program a v příkazovém řádku odpovídáme tím, že voláme podprogram <code>zkus</code>:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
=========== RESTART ===========<br/>
Myslím si číslo od 1 do 5. Zkus ho uhádnout...<br/>
{">>>"} zkus(3)<br/>
Ne, moje číslo je jiné...<br/>
{">>>"} zkus(2)<br/>
Ne, moje číslo je jiné...<br/>
{">>>"} zkus(5)<br/>
Hurá, uhádl jsi!
          </div>
        </TaskCard>

        <TaskCard number="15*" title="" taskId="15" showTeacher={teacherMode} teacherNote={<p>Řešení se zanořeným if-else:<br/><code>def zkus(n):</code><br/><code>    if n == cislo:</code><br/><code>        print('Hurá, uhádl jsi!')</code><br/><code>    else:</code><br/><code>        if n &lt; cislo:</code><br/><code>            print('Ne, moje číslo je větší...')</code><br/><code>        else:</code><br/><code>            print('Ne, moje číslo je menší...')</code></p>}>
          <p>15* Vylepši předchozí program tak, aby nám podprogram <code>zkus</code> poradil, zda je hádané číslo větší nebo menší, než jsme tipnuli:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
=========== RESTART ===========<br/>
Myslím si číslo od 1 do 5. Zkus ho uhádnout...<br/>
{">>>"} zkus(3)<br/>
Ne, moje číslo je menší...<br/>
{">>>"} zkus(1)<br/>
Ne, moje číslo je větší...<br/>
{">>>"} zkus(2)<br/>
Hurá, uhádl jsi!
          </div>
        </TaskCard>

        <TaskCard number="16" title="" taskId="16" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><code>a = random.randint(1, 10)</code><br/><code>b = random.randint(1, 10)</code><br/><br/><code>def over(soucet):</code><br/><code>    if soucet == a + b:</code><br/><code>        print('Správně')</code><br/><code>    else:</code><br/><code>        print('Nesprávně, mělo to být', a + b)</code><br/><code>print('Kolik je', a, '+', b, '?')</code></p>}>
          <p>Vytvoř nový program <code>kviz.py</code>, který bude fungovat jako jednoduchý kvíz na sčítání čísel. Počítač na začátku vygeneruje dvě náhodná čísla z rozsahu od 1 do 10, vypíše je a my musíme odpovědět tím, že z příkazového řádku zavoláme podprogram <code>over</code>. Počítač poté zkontroluje, zda byla naše odpověď správná, nebo ne:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
=========== RESTART ===========<br/>
Kolik je 10 + 7 ?<br/>
{">>>"} over(5)<br/>
Nesprávně, mělo to být 17<br/>
{">>>"} <br/>
=========== RESTART ===========<br/>
Kolik je 4 + 9 ?<br/>
{">>>"} over(13)<br/>
Správně
          </div>
        </TaskCard>

        <TaskCard number="17*" title="" taskId="17" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def stesti(n):</code><br/><code>    pocet = 0</code><br/><code>    for i in range(n):</code><br/><code>        hod = random.randint(1, 6)</code><br/><code>        if hod == 6:</code><br/><code>            pocet = pocet + 1</code><br/><code>    print('Pravděpodobnost výhry při', n, 'hodech:', pocet / n)</code></p>}>
          <p>17* Je potřeba prozkoumat, jak často padne 6, když mnohokrát házíme hrací kostkou. Vytvoř nový program <code>stesti.py</code> a v něm podprogram <code>stesti</code> s parametrem <code>n</code>, který nasimuluje <code>n</code> hodů běžnou hrací kostkou. Podprogram n-krát vygeneruje náhodné číslo od 1 do 6, a když padne šestka, zvýší počítadlo o 1. Podprogram na závěr vypíše zprávu ve tvaru:</p>
          <div className="font-mono text-sm bg-slate-50 p-2 rounded-lg mt-2">
            Pravděpodobnost výhry při 10 hodech: 0.2
          </div>
          <p className="mt-4">Nech podprogram vypsat, jaké budou pravděpodobnosti výhry při 10, 100, 1000, 10000, 100000 hodech.</p>
        </TaskCard>

        <TaskCard number="18*" title="" taskId="18" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def rada(y):</code><br/><code>    x = 10</code><br/><code>    for i in range(20):</code><br/><code>        canvas.create_rectangle(x, y, x + 10, y + 10, fill='gray')</code><br/><code>        x = x + random.randint(12, 20)</code><br/><br/><code>for i in range(15):</code><br/><code>    rada(5 + i * 15)</code></p>}>
          <p>18* Dlaždič měl rovnoměrně poskládat dlažební kostky do jedné řady. Měl však dobrou náladu a mezi kostkami nechával náhodné mezery. Vytvoř nový program <code>dlazebni_kostky.py</code> a v něm podprogram <code>rada</code> s parametrem <code>y</code>, který nakreslí do grafické plochy vedle sebe 20 kostek. Kostky kresli jako šedé čtverečky velikosti 10 x 10. První kostka má x-ovou souřadnici levého horního rohu 10 a každá další ji má větší o náhodné číslo z rozsahu od 12 do 20. Y-ovou souřadnici levého horního rohu mají všechny kostky stejnou; tato souřadnice je dána parametrem <code>y</code>.</p>
          <p className="mt-4">Zavolej podprogram <code>rada</code> následujícím způsobem:</p>
          <PythonSnippet code={`for i in range(15):\n    rada(5 + i * 15)`} />
          <p className="mt-2">Jestli jsi postupoval(a) správně, výsledek by měl vypadat podobně jako na obrázku (kreslí se více řad nad sebe v různých mezerách).</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonFunctionsArgsChapter;
