'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Ruler, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonVariablesDrawingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-indigo-500 mr-2 select-none">{">>>"}</span>
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

const CanvasPreview = ({ children, width = 300, height = 200, className = "" }: { children: React.ReactNode, width?: number, height?: number, className?: string }) => (
  <div className={`relative bg-slate-50 border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height }}>
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-inner">
      {children}
    </div>
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
  const [done, setDone] = useLocalStorage(`py7-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-xl">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">{title}</h3>
          <div className="text-slate-600 leading-relaxed text-sm sm:text-base space-y-4">
            {children}
          </div>

          {showTeacher && teacherNote && (
            <TeacherNote>{teacherNote}</TeacherNote>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setDone(!done)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                done 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
              {done ? 'Splněno' : 'Označit jako splněné'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PythonVariablesDrawingChapter: React.FC<PythonVariablesDrawingChapterProps> = ({ onBack }) => {
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
      title="Kreslení s proměnnými"
      subtitle="Geometrie a matematické výrazy v plátně (iMyšlení Lekce 7)"
      icon={<Ruler className="w-8 h-8 text-indigo-600" />}
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
          <h2 className="font-black text-indigo-900 text-lg mb-2">Instrukce</h2>
          <p className="text-indigo-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Nyní spojíme vše, co umíme, do jednoho celku. Místo toho, abychom zadávali souřadnice jako fixní čísla (tzv. "natvrdo"), uložíme si je do <strong>proměnných</strong> (např. <code>x</code> a <code>y</code>). Díky tomu budeme moci celý obrázek posouvat nebo zvětšovat změnou jednoho jediného čísla! Každý program si vždy <strong>ulož a spusť</strong> (klávesa F5).
          </p>
        </div>

        <TaskCard number="1" title="Opakování kreslení" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha slouží k zopakování předchozí lekce. <code>canvas.create_rectangle(50, 50, 150, 150, fill='red')</code> a druhý od <code>150, 150</code> do <code>250, 250</code>.</p>}>
          <p>Vytvoř nový program <code>dotykajici.py</code>, který nakreslí dva dotýkající se čtverce jako na obrázku. Oba mají délku strany <strong>100</strong>, přitom červený má levý horní roh v bodě <code>[50, 50]</code> a modrý má levý horní roh v bodě <code>[150, 150]</code>.</p>
          <CanvasPreview width={300} height={300}>
            <Rect x1={50} y1={50} width={100} height={100} fill="red" />
            <Rect x1={150} y1={150} width={100} height={100} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="Pozice v proměnných" taskId="2" showTeacher={teacherMode} teacherNote={<p>Chceme, aby se žáci naučili vyjadřovat souřadnice pomocí výrazů. Umožní to snadnou změnu pozice. Řešení: <code>canvas.create_rectangle(x, y, x + 100, y + 100, fill='yellow')</code></p>}>
          <p>Vytvoř nový program <code>pozice_promenne.py</code> a opiš do něj kód uvedený níže. V proměnných <code>x</code> a <code>y</code> jsou uložené souřadnice levého horního rohu čtverce. Dokonči chybějící kód v programu tak, abys pomocí těchto proměnných nakreslil žlutý čtverec se stranou délky 100:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\nx = 100\ny = 70\ncanvas.create_rectangle(x, y, x + ..., ..., fill='yellow')`} />
          <CanvasPreview width={300} height={250}>
            <Rect x1={100} y1={70} width={100} height={100} fill="yellow" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="Všechno v proměnných" taskId="3" showTeacher={teacherMode} teacherNote={<p>Úkolem je nahradit všechna čísla v <code>create_rectangle</code> proměnnými: <code>canvas.create_rectangle(x, y, x + sirka, y + vyska, fill='red')</code></p>}>
          <p>Vytvoř nový program <code>obdelnik_promenne.py</code>, který použije čtyři proměnné: <code>x</code>, <code>y</code>, <code>sirka</code>, <code>vyska</code>. Na jejich základě nakresli obdélník s levým horním rohem na souřadnicích x, y, danou šířkou a výškou. Barvu si zvol podle svého. Například když bude v programu:</p>
          <PythonSnippet code={`x = 100\ny = 70\nsirka = 200\nvyska = 50`} />
          <p>nakreslí se obdélník jako na obrázku:</p>
          <CanvasPreview width={350} height={200}>
            <Rect x1={100} y1={70} width={200} height={50} fill="red" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="Společný levý roh" taskId="4" showTeacher={teacherMode} teacherNote={<p>V této úloze je důležité vyžadovat důsledné dodržování zadání – vše pomocí proměnné <code>x, y</code>. Pořadí je od největšího (red) k nejmenšímu (navy).</p>}>
          <p>Vytvoř program <code>levy_roh.py</code>, který nakreslí následující čtverce:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={100} y1={50} width={100} height={100} fill="red" />
            <Rect x1={100} y1={50} width={70} height={70} fill="blue" />
            <Rect x1={100} y1={50} width={40} height={40} fill="navy" />
          </CanvasPreview>
          <p>Tyto čtverce mají společný levý horní roh, jehož souřadnice ulož v programu do proměnných <code>x</code>, <code>y</code> (např. x=100, y=50). Čtverce se postupně zmenšují tak, že červený má délku strany 100, modrý 70 a tmavomodrý (<code>'navy'</code>) 40.</p>
        </TaskCard>

        <TaskCard number="5" title="Obdélníky vedle sebe" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení: první je <code>x, y, x+a, y+b</code>. Druhý začíná na <code>x+a</code>, končí na <code>x+2*a</code>. Třetí začíná na <code>x+2*a</code>, končí na <code>x+3*a</code>.</p>}>
          <p>Vytvoř program <code>vedle_sebe.py</code>, který nakreslí tři vzájemně se dotýkající obdélníky. Použij barvy <code>'blue'</code>, <code>'lightblue'</code> a <code>'darkblue'</code>.</p>
          <CanvasPreview width={350} height={200}>
            <Rect x1={50} y1={70} width={80} height={100} fill="blue" />
            <Rect x1={130} y1={70} width={80} height={100} fill="lightblue" />
            <Rect x1={210} y1={70} width={80} height={100} fill="darkblue" />
          </CanvasPreview>
          <p>Souřadnice levého horního rohu <strong>prvního</strong> obdélníku si ulož do proměnných <code>x</code>, <code>y</code>. Všechny tři obdélníky mají stejnou šířku a výšku – tyto rozměry si ulož v proměnných <code>a</code>, <code>b</code>.</p>
          <p className="font-bold text-indigo-700">Zkouška: Bude program fungovat správně i v případě, že hodnotu proměnné <code>a</code> v kódu zvětšíš o 20 a proměnné <code>y</code> o 10? Tvary se musí plynule posunout a natáhnout, aniž by se rozpojily. Jestli ne, program oprav!</p>
        </TaskCard>

        <TaskCard number="6" title="Odvození od středu" taskId="6" showTeacher={teacherMode} teacherNote={<p>Doposud se používal vždy levý roh. Nyní je zadán střed. Žáci musí odvodit, že levý roh je <code>x - 50, y - 50</code> a pravý <code>x + 50, y + 50</code>. Vzorce odvoďte společně na tabuli.</p>}>
          <p>Teď budeš kreslit čtverec, jehož <strong>střed</strong> má souřadnice <code>[x, y]</code> a jehož strany mají délku 100. Souřadnice x, y jsou uloženy ve stejnojmenných proměnných. Abys mohl tento čtverec nakreslit, musíš vymyslet matematický vzorec pro jeho levý horní i pravý dolní roh (kolik musíš přičíst a odečíst od středu?):</p>
          
          <div className="relative w-[200px] h-[200px] mx-auto my-6 bg-white">
            <div className="absolute top-6 left-6 w-[150px] h-[150px] border-2 border-black" />
            <div className="absolute top-[81px] left-6 w-[150px] border-t border-dashed border-gray-400" />
            <div className="absolute left-[81px] top-6 h-[150px] border-l border-dashed border-gray-400" />
            <div className="absolute w-2 h-2 bg-black rounded-full top-[77px] left-[77px]" />
            <div className="absolute top-[88px] left-[88px] font-mono text-sm bg-white px-1">[x, y]</div>
            <div className="absolute top-0 left-0 font-mono text-sm bg-white px-1">[ ?, ? ]</div>
            <div className="absolute top-[160px] left-[160px] font-mono text-sm bg-white px-1">[ ?, ? ]</div>
            <div className="absolute top-[15px] left-[216px] font-mono text-sm">100</div>
          </div>

          <p>Do nového programu <code>stred_ctverce.py</code> napiš kód, který nakreslí zelený čtverec se středem v bodě <code>[x, y]</code> a stranou o délce 100.</p>
        </TaskCard>

        <TaskCard number="7" title="Soustředné čtverce" taskId="7" showTeacher={teacherMode} teacherNote={<p>Tři čtverce, všechny používají středovou logiku z předchozí úlohy. Červený `(x-50, y-50, x+50, y+50)`, modrý `(x-30, y-30...)`, bílý `(x-10, y-10...)`.</p>}>
          <p>Vytvoř program <code>tri_soustredne.py</code>, který nakreslí tři čtverce – všechny mají společný <strong>střed</strong> v bodě <code>[x, y]</code> a postupně se zmenšují (červený má délku stran 100, modrý 60 a bílý 20).</p>
          <CanvasPreview width={250} height={250}>
            <Rect x1={75} y1={75} width={100} height={100} fill="red" />
            <Rect x1={95} y1={95} width={60} height={60} fill="blue" />
            <Rect x1={115} y1={115} width={20} height={20} fill="white" />
          </CanvasPreview>
          <p className="font-bold text-indigo-700">Zkouška: Změň v kódu <code>x</code> o 17 a <code>y</code> o 29. Zůstaly čtverce v sobě vycentrované? Pokud se rozpadly, oprav program (nemáš ho dynamický)!</p>
        </TaskCard>

        <TaskCard number="8" title="Analýza bez počítače" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení: Všechny příkazy nakreslí čtverce, neboť u každého je x-ový rozdíl stejný jako y-ový rozdíl (strana je stejná).</p>}>
          <p>Bez toho, abys následující příkazy spouštěl na počítači, zjisti, <strong>které z nich nakreslí čtverce</strong> (předpokládej, že v proměnných <code>x</code> i <code>y</code> je číslo 100):</p>
          <ul className="list-[lower-alpha] pl-5 space-y-2 mt-4 font-mono text-sm bg-slate-50 p-4 rounded-xl">
            <li>canvas.create_rectangle(0, 0, 1, 1)</li>
            <li>canvas.create_rectangle(10, 20, 30, 40)</li>
            <li>canvas.create_rectangle(100, 150, 150, 100)</li>
            <li>canvas.create_rectangle(x, y - 50, x + 50, y)</li>
            <li>canvas.create_rectangle(100 - 20, 70 - 30, 100 + 30, 70 + 20)</li>
          </ul>
          <p className="text-indigo-700">Až budeš mít tip vymyšlený, ověř ho na počítači.</p>
        </TaskCard>

        <TaskCard number="9" title="Obdélník ze středu" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení: <code>canvas.create_rectangle(x - a/2, y - b/2, x + a/2, y + b/2, fill='orange')</code></p>}>
          <p>Zkus (podobně jako v úloze 6) vymyslet matematický vzorec pro kreslení <strong>obdélníku</strong>, jehož střed má souřadnice <code>[x, y]</code> a strany mají šířku a výšku z proměnných <code>a, b</code>. Napiš program <code>stred_obdelniku.py</code>, který takový (třeba oranžový) obdélník nakreslí.</p>
        </TaskCard>

        <TaskCard number="10" title="Mimozemšťan" taskId="10" showTeacher={teacherMode} teacherNote={<p>Toto je libovolná kreativní úloha, důležité ale je, aby vše bylo navázané na střed <code>x, y</code>. Když se `x` a `y` změní o +30 a +40, hlava se musí kompletně i s očima a pusou posunout beze změny proporcí.</p>}>
          <p>Napiš program <code>mimozemstan.py</code>, který pomocí barevných obdélníků nakreslí hlavu mimozemšťana. Na hlavě by měly být minimálně dvě stejné oči a jedna ústa. <strong>Souřadnice středu hlavy musí být uloženy v proměnných <code>x, y</code>.</strong></p>
          <CanvasPreview width={300} height={250}>
            <Rect x1={110} y1={50} width={80} height={120} fill="limegreen" />
            <Rect x1={120} y1={70} width={20} height={20} fill="white" />
            <Rect x1={160} y1={70} width={20} height={20} fill="white" />
            <Rect x1={125} y1={75} width={10} height={10} fill="black" />
            <Rect x1={165} y1={75} width={10} height={10} fill="black" />
            <Rect x1={130} y1={120} width={40} height={15} fill="darkgreen" />
          </CanvasPreview>
          <p className="font-bold text-indigo-700">Zkouška chytrosti: Bude tvůj mimozemšťan držet pohromadě, i když v kódu změníš <code>x</code> o 30 a <code>y</code> o 40? Jestli se mu oko posunulo mimo hlavu, nemáš to správně provázané proměnnou!</p>
        </TaskCard>

        <TaskCard number="11" title="Řada zmenšujících se čtverců" taskId="11" showTeacher={teacherMode} teacherNote={<p>Toto je těžší úloha. Všechny stojí na stejné podložce, takže jejich spodní hrana (y2) je stejná, nebo se kreslí odspodu: <code>x, y-100, x+100, y</code>. Druhý čtverec pak začne na <code>x+100</code>.</p>}>
          <p>Pět barevných čtverců leží těsně vedle sebe zleva doprava a pevně sedí na jedné podložce (dolní hraně). Velikosti jejich stran jsou postupně 100, 80, 60, 40, 20. Napiš program <code>rada_ctvercu.py</code>, jestliže souřadnice levého <strong>dolního</strong> rohu úplně prvního (největšího) čtverce jsou uloženy v proměnných <code>x, y</code>.</p>
          <CanvasPreview width={350} height={200} className="border-b-4 border-black border-t-0 border-l-0 border-r-0 shadow-none bg-white">
            <Rect x1={20} y1={100} width={100} height={100} fill="red" />
            <Rect x1={120} y1={120} width={80} height={80} fill="yellow" />
            <Rect x1={200} y1={140} width={60} height={60} fill="green" />
            <Rect x1={260} y1={160} width={40} height={40} fill="violet" />
            <Rect x1={300} y1={180} width={20} height={20} fill="blue" />
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonVariablesDrawingChapter;
