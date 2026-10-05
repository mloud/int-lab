'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Square, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonDrawingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-teal-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-teal-500 mr-2 select-none">{">>>"}</span>
            <span className="text-teal-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-teal-600" />
      <span className="font-bold text-teal-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-teal-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py5-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonDrawingChapter: React.FC<PythonDrawingChapterProps> = ({ onBack }) => {
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
      title="Kreslení"
      subtitle="Lekce 5"
      icon={<Square className="w-8 h-8 text-teal-600" />}
      onBack={onBack}
      accentColor="teal"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-teal-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-teal-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-teal-100 text-teal-700 border-teal-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-2xl mb-8">
          <p className="text-teal-800/80 text-sm sm:text-base font-bold">
            První i druhá úloha slouží k opakování práce s proměnnými a výpisy.
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>suma = 20</code><br/><code>kurz = 25.23</code><br/><code>dostanes = suma * kurz</code><br/><code>print('Za', suma, 'eur dostaneš', dostanes, 'korun při kurzu', kurz, 'korun za euro.')</code></p>}>
          <p>1. Už jsi směňoval koruny na eura. Teď vytvoř nový program <code>smena2.py</code>, který bude umět směnit eura na koruny. Použij proměnné <code>suma</code> a <code>kurz</code>, do kterých přiřadíš počáteční hodnoty – kolik eur chceš vyměnit a aktuální kurz (například 25.23 korun za 1 euro). Do proměnné <code>dostanes</code> přiřaď hodnotu výrazu, kterým se vypočítá, kolik korun dostaneš za svou sumu. Program vypíše výsledek například ve tvaru:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Za ... eur dostaneš ... korun při kurzu ... korun za euro.
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení – počítač vypíše:<br/><code>Za jízdu o délce 8 km s naším taxi zaplatíš 290 korun</code></p>}>
          <p>2. Následující program pracuje s proměnnými. Urči bez použití počítače, co program vypíše:</p>
          <PythonSnippet code={`km = 8\nc = 30\ns = km * c + 50\nprint('Za jízdu o délce', km, 'km s naším taxi zaplatíš', s, 'korun')`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>V části 3.A se inicializuje grafická plocha, do proměnné <code>canvas</code> se přiřazuje objekt grafické plochy. Toto žákům nevysvětlujeme (je to příliš brzo). Tyto příkazy je potřeba opsat z pracovního listu nebo je odtud zkopírovat. Když se žáci budou dožadovat vysvětlení významu těchto příkazů, stačí jim říci, že: „tyto příkazy slouží k tomu, aby se vytvořilo prázdné okno“. Žáky ze znalosti těchto příkazů nebudeme zkoušet.<br/><br/>Protože se slovo <code>canvas</code> bude v dalších zápisech často vyskytovat, můžeme se žáky diskutovat o jeho významu (např. „grafická plocha“, „malířské plátno“ apod.). Případně si při vysvětlovaní můžeme pomoci metaforou: „Windowsovské okno je rám, ve kterém se musí nacházet malířské plátno, abychom do něj mohli kreslit. Jsou ale i taková windowsovská okna, do kterých se kreslit nedá.“</p>}>
          <p>3. Doposud tvé programy počítaly a vypisovaly textové zprávy. Teď se naučíš vytvářet programy, které budou umět kreslit obrázky. Postupuj takto:</p>
          <ul className="list-none pl-0 mt-4 space-y-4">
            <li>A) Vytvoř nový program <code>platno.py</code> s následujícím obsahem:
              <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()`} />
            </li>
            <li>B) Program spusť – na obrazovce uvidíš nové okno:</li>
            <li>C) Zjisti, zda se dá okno posouvat, měnit jeho velikost. Nakonec toto nové okno zavři.</li>
          </ul>
          <p className="mt-4">Tvůj program vyrobil grafickou plochu <code>canvas</code>. Slovo <code>canvas</code> budeš používat i v dalších příkazech na kreslení.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>V této úloze jsou z pohledu žáka dvě nové věci:<br/>• Jak funguje souřadnicová soustava (je jiná, než znají z matematiky)<br/>• Jak funguje kreslení obdélníků (zadávají se souřadnice protilehlých vrcholů)</p>}>
          <p>4. Přidej do svého programu <code>platno.py</code> nový příkaz (je žlutě označený) a program opět spusť:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-teal-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">import tkinter</span></div>
            <div><span className="text-slate-300">canvas = tkinter.Canvas()</span></div>
            <div><span className="text-slate-300">canvas.pack()</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">canvas.create_rectangle(50, 70, 220, 150)</span></div>
          </div>
          <p>Uvidíš obdélník:</p>
          <CanvasPreview>
            <Rect x1={50} y1={70} width={170} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode}>
          <p>5. V závorkách příkazu <code>canvas.create_rectangle( , , , )</code> jsou 4 čísla. Zkus je v programu <code>platno.py</code> postupně měnit (změny oproti předchozímu zápisu jsou zvýrazněny žlutě). Program pokaždé spusť, abys viděl, co nakreslí:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-teal-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">a) canvas.create_rectangle(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">0</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">0</span><span className="text-slate-300">, 220, 150)</span></div>
            <div><span className="text-slate-300">b) canvas.create_rectangle(0, 0, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">)</span></div>
            <div><span className="text-slate-300">c) canvas.create_rectangle(0, 0, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">250</span><span className="text-slate-300">, 50)</span></div>
            <div><span className="text-slate-300">d) canvas.create_rectangle(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">20</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">10</span><span className="text-slate-300">, 250, 50)</span></div>
            <div><span className="text-slate-300">e) canvas.create_rectangle(20, 10, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">250</span><span className="text-slate-300">)</span></div>
          </div>
          <p>Víš, jak tato čísla fungují?</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>canvas.create_rectangle(50, 30, 300, 200)</code><br/><br/>V této lekci žáci nepracují jen se dvěma dříve používanými okny (textovým editorem s programem a interaktivní konzolí), ale seznamují se zde s dalším oknem obsahujícím grafickou plochu.</p>}>
          <p>6. Změň svůj program <code>platno.py</code> tak, aby nakreslil obdélník, který má souřadnice protilehlých vrcholů [50, 30] a [300, 200].</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení – stačí takovýto výpočet:<br/>Šířka: <code>300 - 50</code><br/>Výška: <code>200 - 30</code></p>}>
          <p>7. a) Spočítej bez použití počítače, jakou šířku a výšku má obdélník z předchozí úlohy.</p>
          <p>b*) Svou domněnku ověř za použití snímku obrazovky a libovolného grafického editoru.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>canvas.create_rectangle(200, 100, 200 + 60, 100 + 140)</code><br/>nebo:<br/><code>canvas.create_rectangle(200, 100, 260, 240)</code><br/><br/>Samozřejmě uznáme i řešení s volbou jiných protilehlých vrcholů.</p>}>
          <p>8. Vytvoř nový program <code>obdelnik.py</code> a nakresli obdélník, který má jeden vrchol na souřadnicích [200, 100], jeho šířka je 60 a výška 140.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode}>
          <p>9. Bez použití počítače urči a do sešitu nakresli, jak přibližně budou rozmístěné následující obdélníky. Jaká je výška a šířka každého z nich?</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\ncanvas.create_rectangle(50, 70, 220, 150)\ncanvas.create_rectangle(60, 80, 130, 140)\ncanvas.create_rectangle(160, 90, 230, 160)`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Možné řešení:<br/><code>canvas.create_rectangle(100, 50, 100 + 80, 50 + 80)</code><br/><code>canvas.create_rectangle(200, 50, 200 + 80, 50 + 80)</code><br/><br/>Když se budou žáci ptát, jakým příkazem se kreslí čtverec, je třeba s nimi diskutovat a přivést je na myšlenku, že mohou použit již známý příkaz.<br/><br/>Můžeme vidět, že v našem řešení píšeme na místech některých parametrů výrazy se součty (například 100 + 80). Nevadí nám ani řešení s nevypočítanými výrazy – z nich je lepší vidět, jak souřadnice vznikají a jsou z nich dobře čitelné i rozměry obdélníku.</p>}>
          <p>10. Vytvoř nový program <code>vedle_sebe.py</code>, který vedle sebe nakreslí dva čtverce se stranami délky 80 (pozici čtverců zvol podle uvážení):</p>
          <CanvasPreview width={300} height={150}>
            <Rect x1={50} y1={35} width={80} height={80} />
            <Rect x1={150} y1={35} width={80} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Úlohu lze řešit vícero způsoby:<br/>• Na nějaké pozici nakreslíme větší čtverec a menší do něj umístíme tak, aby mezi nimi byla mezera 25:<br/><code>canvas.create_rectangle(100, 50, 250, 200)</code><br/><code>canvas.create_rectangle(100 + 25, 50 + 25, 250 - 25, 200 - 25)</code><br/>• Na nějaké pozici nakreslíme menší čtverec a větší nakreslíme okolo něj tak, aby mezi nimi byla mezera 25:<br/><code>canvas.create_rectangle(150, 100, 250, 200)</code><br/><code>canvas.create_rectangle(150 - 25, 100 - 25, 250 + 25, 200 + 25)</code><br/>• Zvolíme si střed a dopočítáme souřadnice vrcholů:<br/><code>canvas.create_rectangle(200 - 50, 100 - 50, 200 + 50, 100 + 50)</code><br/><code>canvas.create_rectangle(200 - 75, 100 - 75, 200 + 75, 100 + 75)</code></p>}>
          <p>11. Vytvoř program <code>soustredne.py</code>, který nakreslí dva velké čtverce – jeden se stranou délky 100 a druhý 150. Čtverce budou mít společný střed jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={75} y1={25} width={150} height={150} />
            <Rect x1={100} y1={50} width={100} height={100} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Možná řešení:<br/>• Kreslíme od spodního největšího obdélníku. Postupujeme jako bychom obdélníky na sebe pokládali. Každý další obdélník má y-ové souřadnice vrcholů menší o 50, x-ová souřadnice levého vrcholu je zvětšená o 25 a x-ová souřadnice pravého vrcholu je zmenšená o 25:<br/><code>canvas.create_rectangle(100, 200, 100 + 150, 200 + 50)</code><br/><code>canvas.create_rectangle(100 + 25, 150, 100 + 150 - 25, 150 + 50)</code><br/><code>canvas.create_rectangle(100 + 50, 100, 100 + 150 - 50, 100 + 50)</code><br/>• Zvolíme x-ovou souřadnici středu celé stavby (například 200). Kreslíme od horního obdélníku a počítáme souřadnice protilehlých vrcholů:<br/><code>canvas.create_rectangle(200 - 25, 100, 200 + 25, 100 + 50)</code><br/><code>canvas.create_rectangle(200 - 50, 150, 200 + 50, 150 + 50)</code><br/><code>canvas.create_rectangle(200 - 75, 200, 200 + 75, 200 + 50)</code></p>}>
          <p>12. Vytvoř program <code>pyramida.py</code>, který ze tří obdélníků o rozměrech 150x50, 100x50 a 50x50 nakreslí následující pyramidu:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={125} y1={25} width={50} height={50} />
            <Rect x1={100} y1={75} width={100} height={50} />
            <Rect x1={75} y1={125} width={150} height={50} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="13*" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Nejprve nakreslíme velký středový čtverec a poté menší čtverce v následujícím pořadí: horní čtverec, dolní čtverec, levý čtverec, pravý čtverec<br/><code>canvas.create_rectangle(100, 100, 200, 200)</code><br/><code>canvas.create_rectangle(100, 100 - 50, 100 + 50, 100)</code><br/><code>canvas.create_rectangle(200 - 50, 200, 200, 200 + 50)</code><br/><code>canvas.create_rectangle(100 - 50, 200 - 50, 100, 200)</code><br/><code>canvas.create_rectangle(200, 100, 200 + 50, 100 + 50)</code></p>}>
          <p>13* Vytvoř program <code>ornament.py</code>, který z pěti čtverců nakreslí následující ornament. Rozměry čtverců zvol podle svého uvážení (všechny menší čtverce budou stejně velké):</p>
          <CanvasPreview width={300} height={250}>
            <Rect x1={100} y1={100} width={100} height={100} />
            <Rect x1={100} y1={50} width={50} height={50} />
            <Rect x1={150} y1={200} width={50} height={50} />
            <Rect x1={50} y1={150} width={50} height={50} />
            <Rect x1={200} y1={100} width={50} height={50} />
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonDrawingChapter;
