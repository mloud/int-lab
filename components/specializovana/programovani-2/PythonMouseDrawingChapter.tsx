'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, MousePointer2, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonMouseDrawingChapterProps {
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
  const [done, setLocalStorageDone] = useLocalStorage(`py20-task-${taskId}`, false);
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

const PythonMouseDrawingChapter: React.FC<PythonMouseDrawingChapterProps> = ({ onBack }) => {
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
      title="Kreslení myší"
      subtitle="Lekce 20"
      icon={<MousePointer2 className="w-8 h-8 text-cyan-600" />}
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
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-2xl mb-8">
          <p className="text-cyan-800/80 text-sm sm:text-base font-bold">
            V této lekci se naučíme používat zábavný způsob kreslení do grafické plochy pomocí myši.
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>V úloze se objevila nová konstrukce <code>canvas.bind('&lt;B1-Motion&gt;', klik)</code>. Pomocí takového zápisu oznamujeme grafické ploše, aby <strong>sledovala</strong> tažení myší se stisknutým levým tlačítkem. Od této chvíle se při každém tažení myší automaticky zavolá podprogram <code>klik</code>. Podprogram musí mít jeden parametr – nazvali jsme jej <code>mys</code>. Ten obsahuje komplexní informace o události, z nichž využíváme <code>mys.x</code> a <code>mys.y</code>.</p>}>
          <p>Vytvoř nový program <code>mys.py</code> a přepiš do něj následující kód. Program poté spusť.</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef klik(mys):\n    print(mys.x, mys.y)\n\ncanvas.bind('<B1-Motion>', klik)`} />
          <p className="mt-2">Přibyl zde nový příkaz <code>canvas.bind</code>, díky němuž bude od této chvíle grafická plocha vědět, co má udělat, když nad ní stiskneme levé tlačítko myši a myší potom táhneme. V textovém okně se začnou vypisovat dvojice celých čísel. Víš, jaká jsou to čísla?</p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    canvas.create_text(mys.x, mys.y, text='*', font='arial 50', fill='red')</code><br/><br/>Místo vypisování hvězdičky '*' mohou žáci zkoušet vypisovat i jiné texty, například 'O', '/' nebo slovo 'PYTHON'.</p>}>
          <p>Zápis <code>mys.x</code> a <code>mys.y</code> v programu označuje x-ovou a y-ovou souřadnici místa v grafické ploše, kde jsi klikl(a). Namísto příkazu <code>print</code> v podprogramu <code>klik</code> použij příkaz <code>canvas.create_text</code>, pomocí něhož vykresli znak <code>'*'</code>.</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef klik(mys):\n    ......................................................................................\n\ncanvas.bind('<B1-Motion>', klik)`} />
          <p className="mt-2">Program nyní při tažení myší kreslí malé hvězdičky. Pomocí parametrů <code>font='...'</code> a <code>fill='...'</code> můžeš velikost těchto znaků zvětšit na 50 a změnit jejich barvu na červenou.</p>
          <p>Zkus takto nakreslit i něco zajímavějšího a výsledným obrázkem se pochlub spolužákovi.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    canvas.create_oval(mys.x-5, mys.y-5, mys.x+5, mys.y+5)</code><br/><br/>Velké modré kruhy nakreslíme pomocí následujícího kódu:<br/><code>def klik(mys):</code><br/><code>    canvas.create_oval(mys.x-30, mys.y-30, mys.x+30, mys.y+30, fill='blue')</code></p>}>
          <p>Pomocí příkazu <code>canvas.create_oval(x-5, y-5, x+5, y+5)</code> umíš nakreslit malý kruh se středem <code>[x, y]</code> a s poloměrem 5. V programu <code>mys.py</code> místo příkazu pro text vhodně použij příkaz pro kreslení malého kruhu. Nyní by se na místa, kudy jsi táhl(a) myší, měly kreslit kruhy.</p>
          <p className="mt-4 font-bold">Teď změň poloměr kreslených kruhů například na hodnotu 30. Jak se změní kreslené kruhy?</p>
          <p>Co je ještě nutné změnit, aby bylo možné vytvořit modrou souvislou stopu tvořenou plnými kruhy? Svou domněnku ověř přidáním parametru <code>fill='blue'</code>.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    if mys.x &lt; 150:</code><br/><code>        canvas.create_oval(mys.x-5, mys.y-5, mys.x+5, mys.y+5, fill='red')</code><br/><code>    else:</code><br/><code>        canvas.create_oval(mys.x-5, mys.y-5, mys.x+5, mys.y+5, fill='green')</code></p>}>
          <p>Podprogram <code>klik</code> se ještě předtím, než nakreslí barevný kroužek, může pomocí příkazu větvení rozhodnout, jestli bude kreslit červený nebo zelený kroužek. Uprav podprogram tak, aby se kroužky kreslily <strong>červeně</strong>, pokud je jejich x-ová souřadnice <strong>menší než 150</strong>; jinak se kreslily zeleně. Poloměr všech kroužků bude 5.</p>
          <p className="mt-2 text-sm text-slate-600">Pokud budeš myší přejíždět zleva doprava a zpět, barva se bude na určité čáře sama měnit!</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    canvas.create_oval(mys.x-5, mys.y-5, mys.x+5, mys.y+5, fill='blue')</code><br/><code>    canvas.create_oval(mys.x-5+15, mys.y-5, mys.x+5+15, mys.y+5, fill='yellow')</code></p>}>
          <p>Vytvoř nový program <code>dvojite.py</code> a zkopíruj do něj kód z programu mys.py. Uprav podprogram <code>klik</code> tak, aby kreslil všechny kroužky modře s poloměrem 5. Zajisti, aby se <strong>kromě</strong> modrého kroužku nakreslil i stejně velký žlutý kroužek. Jeho střed však bude o 15 posunutý vpravo (k x-ové souřadnici přičteš 15).</p>
          <p className="mt-2 text-sm text-slate-600">Při tažení myší by měl vzniknout zajímavý stínový efekt dvojité čáry.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Použili jsme tu nový příkaz <code>canvas.delete('all')</code>, pomocí kterého se z grafické plochy vymaže doposud vytvořená kresba.<br/>Číslice 3 v zápisu <code>'&lt;ButtonPress-3&gt;'</code> označuje pravé tlačítko myši. Kdyby se nahradila hodnotou 1, plocha by se smazala při každém kliknutí levým tlačítkem.</p>}>
          <p>Vytvoř si nový program <code>odstranit.py</code> a zkopíruj do něj kód z minulého programu. Přepiš následující žlutě označený kód:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef klik(mys):\n    ...\n\ndef smaz(mys):\n    canvas.delete('all')\n\ncanvas.bind('<B1-Motion>', klik)\ncanvas.bind('<ButtonPress-3>', smaz)`} />
          <p className="mt-2">Nyní by mělo vše fungovat stejně, ale program bude také reagovat na situaci, kdy do grafické plochy klikneš pravým tlačítkem myši. Zkus něco do plochy nakreslit a potom klikni do plochy pravým tlačítkem. Můžeš to opakovat i vícekrát. Diskutuj se spolužákem, co se po kliknutí pravým tlačítkem myši stalo.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Při tažení myší se kreslí úsečky z bodu [150, 100] do aktuální pozice myši. Proto mají všechny tyto úsečky společný jeden vrchol.<br/>Nakreslit srdce je snadné: barvu (fill u textu/ovalu, fill u line) lze samozřejmě nastavit, a když žáci přejíždějí myší, sami srdce postupně "vymalují" pomocí stovek čar.</p>}>
          <p>Nyní se naučíme používat nový grafický příkaz <code>canvas.create_line(x1, y1, x2, y2)</code>. Pomocí něho lze nakreslit jednoduchou čáru (úsečku) z bodu <code>[x1, y1]</code> do bodu <code>[x2, y2]</code>. Vytvoř nový program <code>paprsky.py</code> a zkopíruj do něj předchozí kód.</p>
          <p>Uprav podprogram klik takto:</p>
          <PythonSnippet code={`def klik(mys):\n    canvas.create_line(150, 100, mys.x, mys.y)`} />
          <p className="mt-2">Když program spustíš, budou všechny čáry vycházet z jednoho pevného středu <code>150, 100</code> až tam, kde máš zrovna myš.</p>
          <p className="font-bold text-cyan-800">Dokážeš nakreslit plné červené srdce? Barvu úsečky nastavíš přes <code>fill='red'</code> a myší "vybarvíš" tvar srdce!</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    canvas.create_line(mys.x, mys.y, mys.x, mys.y-50)</code></p>}>
          <p>Vytvoř nový program <code>spendliky.py</code> a zkopíruj do něj kód. Uprav kód tak, aby každá úsečka <strong>začínala na pozici myši</strong> <code>([mys.x, mys.y])</code> a končila v bodě posunutém o 50 směrem vzhůru (tedy y-ová souřadnice konce úsečky bude o 50 zmenšená).</p>
          <p className="mt-2 text-sm text-slate-600">Dostaneš tak svislé čárky, které budou vždy mířit nahoru z místa, kudy jsi táhl myší (efekt hřebenu).</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    canvas.create_line(mys.x, mys.y, mys.x, mys.y-50)</code><br/><code>    canvas.create_oval(mys.x-5, mys.y-5-50, mys.x+5, mys.y+5-50, fill='red')</code></p>}>
          <p>Uprav program <code>spendliky.py</code> tak, aby byl na horním konci každé svislé úsečky nakreslen ještě malý červený kroužek.</p>
          <p className="mt-2 text-sm text-slate-600">Tip: Kroužek se nakreslí tak, že z <code>mys.y</code> ubereš 50, čímž ho dostaneš na konec té čáry.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><code>def klik(mys):</code><br/><code>    barva = random.choice(['red', 'yellow', 'blue', 'green'])</code><br/><code>    canvas.create_rectangle(10, 10, mys.x, mys.y, fill=barva)</code></p>}>
          <p>Vytvoř nový program <code>mys_obdelniky.py</code>. Uprav podprogram <code>klik</code> tak, aby byl schopen nakreslit obdélník, jehož levý horní roh bude mít vždy souřadnice <code>[10, 10]</code> a pravý dolní roh bude na aktuální pozici myši <code>[mys.x, mys.y]</code>. Tento obdélník bude vybarvený náhodně zvolenou barvou.</p>
          <PythonSnippet code={`barva = random.choice(['red', 'yellow', 'blue', 'green'])`} />
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def klik(mys):</code><br/><code>    x = mys.x</code><br/><code>    y = mys.y</code><br/><code>    for i in range(10):</code><br/><code>        canvas.create_oval(x-5, y-5, x+5, y+5, fill='red')</code><br/><code>        x = x + 10</code></p>}>
          <p>Vrať se k programu <code>dvojite.py</code> a uprav v něm kód tak, aby byl schopen kreslit 10 červených kroužků. Tyto kroužky budou nakreslené těsně vedle sebe:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li>První kroužek bude na pozici myši</li>
            <li>Každý další bude mít svůj střed posunutý o 10 vpravo oproti předchozímu kroužku (tedy x-ovou souřadnici zvětši o 10)</li>
          </ul>
          <p className="mt-2 font-bold text-cyan-800">Vykreslení jednotlivých kroužků v podprogramu klik zajisti pomocí for cyklu.</p>
          <p className="mt-2 text-sm text-slate-600">Při tažení myší tak nakreslíš celou tlustou "stuhu" z 10 bodů naráz.</p>
        </TaskCard>

        <TaskCard number="12*" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><code>barva = 'blue'</code><br/><code>def klik(mys):</code><br/><code>    for i in range(50):</code><br/><code>        dx = random.randint(-30, 30)</code><br/><code>        dy = random.randint(-30, 30)</code><br/><code>        canvas.create_text(mys.x + dx, mys.y + dy, text='+', fill=barva)</code><br/><br/>Do terminálu můžeme psát přímo příkazy a změnit tak globální proměnnou <code>barva = 'yellow'</code>, myš začne kreslit žlutě.</p>}>
          <p>12* Vytvoř nový program <code>sprej.py</code>. Nyní budeš dělat efekt reálného spreje.</p>
          <p>Nejprve <strong>mimo</strong> podprogram (úplně dolů, ale před bind) zapiš kód <code>barva = 'blue'</code>. Dále budeš upravovat podprogram <code>klik</code>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-slate-600">
            <li>Nejprve se náhodně zvolí dvě čísla <code>dx</code> a <code>dy</code> z intervalu -30, 30 (pomocí <code>random.randint(-30, 30)</code>)</li>
            <li>Tato dvojice čísel vyjadřuje posunutí nakreslené tečky oproti pozici myši. Tečka bude na pozici <code>mys.x+dx, mys.y+dy</code></li>
            <li>Na tuto posunutou pozici nakresli znak <code>'+'</code> (přes create_text). Jako barvu použij proměnnou <code>barva</code>.</li>
            <li>Tento postup s náhodnými čísly zopakuj <strong>v cyklu 50krát</strong>. Tím při jednom "kliknutí" nakreslíš 50 částeček!</li>
          </ul>
          <p className="mt-4 font-bold text-cyan-800">Když budeš chtít za běhu změnit barvu spreje, stačí do příkazového řádku zapsat kód: <code>barva = 'yellow'</code>.</p>
          <p className="text-sm">Od tohoto okamžiku bude sprej na plátně prskat žlutou barvu.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonMouseDrawingChapter;
