'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Brush, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonDrawingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-sky-500 mr-2 select-none">{">>>"}</span>
            <span className="text-emerald-300">{line.substring(3).trim()}</span>
          </>
        ) : line.startsWith('SyntaxError') || line.startsWith('Traceback') || line.startsWith('File') || line.startsWith('NameError') || line.startsWith('ModuleNotFoundError') || line.startsWith('AttributeError') || line.startsWith('TypeError') ? (
          <span className="text-rose-400">{line}</span>
        ) : (
          <span className="text-slate-300 whitespace-pre">{line}</span>
        )}
      </div>
    ))}
  </div>
);

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-sky-600" />
      <span className="font-bold text-sky-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-sky-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 300, height = 200, className = "" }: { children: React.ReactNode, width?: number, height?: number, className?: string }) => (
  <div className={`relative bg-white border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height }}>
    {/* Tkinter Window Top Bar Fake */}
    <div className="absolute top-0 left-0 right-0 h-6 bg-slate-200 border-b border-slate-300 flex items-center px-2 z-10">
      <div className="w-3 h-3 rounded-full bg-slate-400 mr-1"></div>
      <div className="w-3 h-3 rounded-full bg-slate-400 mr-1"></div>
      <div className="w-3 h-3 rounded-full bg-slate-400"></div>
    </div>
    {/* Canvas Content */}
    <div className="absolute top-6 left-0 right-0 bottom-0 bg-white">
      {children}
    </div>
  </div>
);

const Rect = ({ x1, y1, width, height }: { x1: number, y1: number, width: number, height: number }) => (
  <div className="absolute border border-black bg-transparent" style={{ left: x1, top: y1, width, height }} />
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
        <div className="shrink-0 w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center font-black text-xl">
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
      title="Kreslení v Tkinter"
      subtitle="Grafické plátno a obdélníky (iMyšlení Lekce 5)"
      icon={<Brush className="w-8 h-8 text-sky-600" />}
      onBack={onBack}
      accentColor="sky"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-sky-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-sky-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-sky-100 text-sky-700 border-sky-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-sky-900 text-lg mb-2">Instrukce</h2>
          <p className="text-sky-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dnes končíme s nudným textem a přesuneme se do světa <strong>Grafiky!</strong> Naučíme Python otevřít bílé plátno a nakreslit na něj tvé první tvary. Každý program si vždy <strong>ulož a spusť</strong> (klávesa F5). Budeme teď pracovat rovnou se třemi okny (kód, terminál a grafické okno)!
          </p>
        </div>

        <TaskCard number="1" title="Opakování z minula" taskId="1" showTeacher={teacherMode} teacherNote={<p>První úloha slouží k zopakování práce s proměnnými a výpisy.</p>}>
          <p>Už jsi směňoval koruny na eura. Teď vytvoř nový program <code>smena2.py</code>, který bude umět směnit eura na koruny.</p>
          <p>Použij proměnné <code>suma</code> a <code>kurz</code>, do kterých přiřadíš počáteční hodnoty – kolik eur chceš vyměnit a aktuální kurz (například 25.23 korun za 1 euro). Do proměnné <code>dostanes</code> přiřaď výpočet a všechno to vypiš příkazem <code>print</code>, například ve tvaru:</p>
          <PythonSnippet code={`Za ... eur dostaneš ... korun při kurzu ... korun za euro.`} />
        </TaskCard>

        <TaskCard number="2" title="Taxi" taskId="2" showTeacher={teacherMode} teacherNote={<p>Začátečníci často zapomínají na ukončovací závorku u příkazu print. V případně dlouhých zápisů Python funguje tak, že dokud není uzavřena, bere řádky pod tím jako součást prvního.</p>}>
          <p>Následující program pracuje s proměnnými. Urči <strong>bez použití počítače</strong>, co program vypíše:</p>
          <PythonSnippet code={`km = 8\nc = 30\ns = km * c + 50\nprint('Za jízdu o délce', km, 'km s naším taxi zaplatíš',\n      s, 'korun')`} />
          <p>Poté program přepiš do Pythonu a zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="3" title="Malířské plátno (Canvas)" taskId="3" showTeacher={teacherMode} teacherNote={<p>Zde se inicializuje grafická plocha. Toto žákům podrobně nevysvětlujeme. Stačí jim říci: "Tyto 3 řádky vytvoří prázdné okno".</p>}>
          <p>Doposud tvé programy počítaly a vypisovaly textové zprávy. Teď se naučíš vytvářet programy, které budou umět kreslit obrázky. Postupuj takto:</p>
          <ul className="list-decimal pl-5 space-y-1 mb-4">
            <li>Vytvoř nový program <code>platno.py</code> s následujícím obsahem:</li>
          </ul>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()`} />
          <ul className="list-decimal pl-5 space-y-1 mt-4">
            <li>Program ulož a spusť. Na obrazovce uvidíš nové okno!</li>
            <li>Zjisti, zda se dá okno posouvat nebo měnit jeho velikost. Nakonec okno zavři.</li>
          </ul>
          <p className="mt-4 text-sky-700">Tvůj program vyrobil grafickou plochu <strong>canvas</strong> (plátno). Slovo <code>canvas</code> budeš používat v dalších příkazech na kreslení.</p>
        </TaskCard>

        <TaskCard number="4" title="První obdélník" taskId="4" showTeacher={teacherMode} teacherNote={<p>V této úloze objevují žáci základy fungování <code>canvas.create_rectangle</code> a souřadnic.</p>}>
          <p>Přidej do svého programu <code>platno.py</code> nový příkaz a program opět spusť:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\ncanvas.create_rectangle(50, 70, 220, 150)`} />
          <p>Uvidíš obdélník:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={50} y1={70} width={170} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="Kouzlení se souřadnicemi" taskId="5" showTeacher={teacherMode} teacherNote={<p>Nejdřív je potřeba rozumět, jak funguje souřadnicová soustava v počítači. Žáci musí zjistit, že [0, 0] je v <strong>levém horním rohu</strong> a čím větší je osa Y, tím jde bod víc dolů (převrácená oproti matematice).</p>}>
          <p>V závorkách příkazu <code>canvas.create_rectangle( , , , )</code> jsou 4 čísla. Zkus je v programu <code>platno.py</code> postupně měnit. Program pokaždé spusť, abys viděl, co nakreslí:</p>
          <ul className="list-[lower-alpha] pl-5 space-y-2 mt-4 font-mono text-sm bg-slate-50 p-4 rounded-xl">
            <li>canvas.create_rectangle(<span className="bg-yellow-200">0</span>, <span className="bg-yellow-200">0</span>, 220, 150)</li>
            <li>canvas.create_rectangle(0, 0, <span className="bg-yellow-200">50</span>, <span className="bg-yellow-200">50</span>)</li>
            <li>canvas.create_rectangle(0, 0, <span className="bg-yellow-200">250</span>, 50)</li>
            <li>canvas.create_rectangle(<span className="bg-yellow-200">20</span>, <span className="bg-yellow-200">10</span>, 250, 50)</li>
            <li>canvas.create_rectangle(20, 10, <span className="bg-yellow-200">50</span>, <span className="bg-yellow-200">250</span>)</li>
          </ul>
          <p className="mt-4 font-bold text-sky-700">Víš, jak tato čísla fungují? Kde je bod [0,0]?</p>
        </TaskCard>

        <TaskCard number="6" title="Posun obdélníku" taskId="6" showTeacher={teacherMode} teacherNote={<p>Úloha testuje, zda pochopili souřadnice. Tento obdélník má vrcholy na stejných x,y jako je šířka plátna (pokud vědí). Nakreslí obdélník z levého horního kvadrantu někam doprostřed.</p>}>
          <p>Změň svůj program <code>platno.py</code> tak, aby nakreslil obdélník, který má souřadnice protilehlých vrcholů <code>[50, 30]</code> a <code>[300, 200]</code>.</p>
          <PythonSnippet code={`canvas.create_rectangle(50, 30, 300, 200)`} />
        </TaskCard>

        <TaskCard number="7" title="Šířka a výška bez počítače" taskId="7" showTeacher={teacherMode} teacherNote={<p>Šířka: 300 - 50 = 250. Výška: 200 - 30 = 170. ±1 pixel v grafických programech žákům tolerujeme a nezabíháme do technických podrobností s jedničkou u pixelů.</p>}>
          <p>a) Spočítej bez použití počítače, jakou šířku a výšku má obdélník z předchozí úlohy (číslo 6).</p>
          <p>b*) Svou domněnku ověř za použití sejmutí obrazovky (PrintScreen) a libovolného grafického editoru (např. Malování).</p>
        </TaskCard>

        <TaskCard number="8" title="Nový obdélník s výpočtem" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení buď <code>canvas.create_rectangle(200, 100, 200 + 60, 100 + 140)</code> nebo z hlavy <code>(200, 100, 260, 240)</code>. Obě varianty jsou správné.</p>}>
          <p>Vytvoř nový program <code>obdelnik.py</code> a nakresli obdélník, který má jeden vrchol na souřadnicích <code>[200, 100]</code>, jeho šířka je <strong>60</strong> a výška <strong>140</strong>.</p>
          <p className="text-sky-700 text-sm mt-2">Druhý vrchol (pravý dolní) si musíš logicky spočítat pomocí sčítání.</p>
        </TaskCard>

        <TaskCard number="9" title="Tři obdélníky" taskId="9" showTeacher={teacherMode} teacherNote={<p>Ať si to zkusí na papír, to je klíčové pro chápání souřadnicové osy jdoucí dolů.</p>}>
          <p>Bez použití počítače urči a do sešitu nakresli, jak přibližně budou rozmístěné následující obdélníky. Jaká je výška a šířka každého z nich?</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\ncanvas.create_rectangle(50, 70, 220, 150)\ncanvas.create_rectangle(60, 80, 130, 140)\ncanvas.create_rectangle(160, 90, 230, 160)`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="10" title="Dva čtverce" taskId="10" showTeacher={teacherMode} teacherNote={<p><code>canvas.create_rectangle(100, 50, 100 + 80, 50 + 80)</code>. Zde je žádoucí upozornit žáky, že i čtverec je vlastně obdélník, proto použijeme příkaz <code>create_rectangle</code>.</p>}>
          <p>Vytvoř nový program <code>vedle_sebe.py</code>, který vedle sebe nakreslí dva čtverce se stranami délky 80 (pozici čtverců zvol podle uvážení):</p>
          <CanvasPreview width={300} height={150}>
            <Rect x1={60} y1={35} width={80} height={80} />
            <Rect x1={160} y1={35} width={80} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11" title="Soustředné čtverce" taskId="11" showTeacher={teacherMode} teacherNote={<p>Úlohu lze řešit posunem o 25 (polovina rozdílu velikostí) dovnitř většího čtverce. Nebo zvolením společného středu a odečítáním a přičítáním od něj.</p>}>
          <p>Vytvoř program <code>soustredne.py</code>, který nakreslí dva velké čtverce – jeden se stranou délky 100 a druhý 150. Čtverce budou mít společný střed jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={250}>
            <Rect x1={75} y1={40} width={150} height={150} />
            <Rect x1={100} y1={65} width={100} height={100} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="12" title="Pyramida" taskId="12" showTeacher={teacherMode} teacherNote={<p>Žáci začnou od největšího zespodu: x-ová souřadnice levého rohu se vždy u dalšího obdélníku posune doprava (zvětší) o 25 a y-ová se posune nahoru (zmenší) o 50.</p>}>
          <p>Vytvoř program <code>pyramida.py</code>, který ze tří obdélníků o rozměrech <strong>150x50</strong>, <strong>100x50</strong> a <strong>50x50</strong> nakreslí následující pyramidu:</p>
          <CanvasPreview width={300} height={250}>
            <Rect x1={125} y1={50} width={50} height={50} />
            <Rect x1={100} y1={100} width={100} height={50} />
            <Rect x1={75} y1={150} width={150} height={50} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="13*" title="Ornament" taskId="13" showTeacher={teacherMode} teacherNote={<p>Způsobů je více. Jedna z cest: nakreslíme velký středový čtverec a poté na něj nabalíme 4 stejně velké menší čtverce ze všech stran.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Vytvoř program <code>ornament.py</code>, který z <strong>pěti</strong> čtverců nakreslí následující ornament. Rozměry čtverců zvol podle svého uvážení (všechny čtyři menší čtverce budou stejně velké):</p>
          <CanvasPreview width={300} height={300}>
            {/* Center */}
            <Rect x1={100} y1={100} width={100} height={100} />
            {/* Top */}
            <Rect x1={100} y1={50} width={50} height={50} />
            {/* Bottom */}
            <Rect x1={150} y1={200} width={50} height={50} />
            {/* Left */}
            <Rect x1={50} y1={150} width={50} height={50} />
            {/* Right */}
            <Rect x1={200} y1={100} width={50} height={50} />
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonDrawingChapter;
