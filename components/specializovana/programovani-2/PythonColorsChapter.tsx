'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Palette, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonColorsChapterProps {
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
  const [done, setDone] = useLocalStorage(`py6-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonColorsChapter: React.FC<PythonColorsChapterProps> = ({ onBack }) => {
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
      title="Barvy a Vlajky"
      subtitle="Vybarvování obdélníků (iMyšlení Lekce 6)"
      icon={<Palette className="w-8 h-8 text-emerald-600" />}
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
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-emerald-900 text-lg mb-2">Instrukce</h2>
          <p className="text-emerald-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Plátno z minula už máme hezky osahané, ale zatím bylo vše jen černobílé a průhledné. Dnes mu dodáme život – budeme kreslit barevné čtverce a stavět skutečné vlajky! Každý program si vždy <strong>ulož a spusť</strong> (klávesa F5).
          </p>
        </div>

        <TaskCard 
          number="1" 
          title="Průzkum hranic" 
          taskId="1"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Očekávané řešení je například <code>canvas.create_rectangle(2, 2, 379, 265)</code>. Šířka plátna je obvykle kolem 380 bodů a výška kolem 266 bodů.</p>
              <p>Trvejte na tom, aby žáci měli viditelné <strong>všechny čtyři</strong> černé hrany (pokud zkusí <code>(0,0, 500,500)</code>, uvidí jen dvě čáry, zbytek zmizí mimo okno).</p>
            </div>
          }
        >
          <p>Doposud jsi kreslil tvary, ale možná ani nevíš, jak je grafické plátno celkově veliké. Vytvoř program <code>nejvetsi_obdelnik.py</code>, který nakreslí <strong>co největší</strong> obdélník tak, aby v okně byly krásně vidět <strong>všechny jeho 4 strany</strong>.</p>
          <p className="text-emerald-700 font-bold">Tip: Souřadnice zvol metodou pokus-omyl, dokud se netrefíš tak, aby okraje přesně lícovaly s velikostí plátna.</p>
          <CanvasPreview width={380} height={266} className="bg-gray-100">
             <Rect x1={2} y1={2} width={375} height={261} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="2" 
          title="První barva" 
          taskId="2"
          showTeacher={teacherMode}
          teacherNote={<p>V jazyce Python zápis <code>fill='...'</code> nazýváme pojmenovaným parametrem. Žákům to můžete ukázat jako <em>"magické slůvko fill (vyplnit)"</em>.</p>}
        >
          <p>Zatím jsi kreslil jednoduché průhledné obdélníky. Vytvoř nový program <code>vybarveny.py</code> a pomocí následujícího kódu nakresli vybarvený obdélník:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\ncanvas.create_rectangle(30, 30, 130, 130, fill='red')`} />
          <p>Všimni si nového slovíčka <code>fill</code>, které se píše na úplný konec závorky a k barvě potřebuje apostrofy!</p>
        </TaskCard>

        <TaskCard 
          number="3" 
          title="Barevné logo" 
          taskId="3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Žáci pravděpodobně nebudou schopni souřadnice určit zpaměti, budou si je muset nakreslit na papír. Diskutujte s nimi, co mají čtverce společného:</p>
              <ul className="list-disc pl-5">
                <li>Zelený s červeným mají společné <strong>y-ové souřadnice</strong> (jsou ve stejné výšce).</li>
                <li>Modrý s červeným mají společné <strong>x-ové souřadnice</strong> (leží pod sebou).</li>
                <li>Žlutý má X jako zelený a Y jako modrý.</li>
              </ul>
            </div>
          }
        >
          <p>Přidej do programu <code>vybarveny.py</code> další 3 příkazy na kreslení obdélníků, abys dostal obrázek podobný starému logu Windows.</p>
          <p className="text-emerald-700">Další barvy získáš, když místo slova <code>'red'</code> napíšeš <code>'green'</code> (zelená), <code>'blue'</code> (modrá) nebo <code>'yellow'</code> (žlutá).</p>
          <CanvasPreview width={300} height={300}>
            <Rect x1={50} y1={50} width={90} height={90} fill="red" />
            <Rect x1={150} y1={50} width={90} height={90} fill="green" />
            <Rect x1={50} y1={150} width={90} height={90} fill="blue" />
            <Rect x1={150} y1={150} width={90} height={90} fill="yellow" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="4" 
          title="Nizozemská vlajka" 
          taskId="4"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Zde dochází k překrývání, nebo prostě k malování tří pruhů nad sebe.</p>
              <p><code>canvas.create_rectangle(50, 50, 300, 100, fill='red')</code></p>
              <p><code>canvas.create_rectangle(50, 100, 300, 150, fill='white')</code></p>
              <p><code>canvas.create_rectangle(50, 150, 300, 200, fill='blue')</code></p>
              <p>Bílá se jmenuje <code>'white'</code>. Pokud někdo u prostředního pole vynechá parametr <code>fill='white'</code>, propálí se mu tam lehce šedá barva okna (Canvasu).</p>
            </div>
          }
        >
          <p>Vytvoř nový program <code>nizozemi.py</code>, který nakreslí přesně nizozemskou vlajku.</p>
          <p>Jaký anglický název by asi mohla mít bílá barva?</p>
          <CanvasPreview width={350} height={250}>
            <Rect x1={50} y1={50} width={250} height={50} fill="red" />
            <Rect x1={50} y1={100} width={250} height={50} fill="white" />
            <Rect x1={50} y1={150} width={250} height={50} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="5" 
          title="Irská vlajka" 
          taskId="5"
          showTeacher={teacherMode}
          teacherNote={<p>Změna z horizontálních pruhů na vertikální. <code>'green'</code>, <code>'white'</code> a <code>'orange'</code>.</p>}
        >
          <p>Vytvoř program <code>irsko.py</code>, který nakreslí irskou vlajku se svislými pruhy (zelený, bílý, oranžový). Oranžová barva se napíše jako <code>'orange'</code>:</p>
          <CanvasPreview width={350} height={250}>
            <Rect x1={50} y1={50} width={80} height={150} fill="green" />
            <Rect x1={130} y1={50} width={80} height={150} fill="white" />
            <Rect x1={210} y1={50} width={80} height={150} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="6" 
          title="Severský kříž" 
          taskId="6"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Obrázek se podobá vlajce Finska. Má to ale jeden malý háček – jak se vyhnout černé čáře uvnitř kříže?</p>
              <p>Nejjednodušší řešení: udělat velký bílý obdélník pro celou vlajku a přes něj nakreslit dva modré pruhy (jeden svislý, jeden vodorovný).</p>
            </div>
          }
        >
          <p>Vytvoř nový program <code>vlajka.py</code> a nakresli takovýto obrázek. Vlajce kterého státu se tento obrázek podobá?</p>
          <CanvasPreview width={350} height={250}>
            <Rect x1={50} y1={50} width={250} height={150} fill="white" />
            <Rect x1={130} y1={50} width={40} height={150} fill="blue" />
            <Rect x1={50} y1={105} width={250} height={40} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="7" 
          title="Barevný rámeček" 
          taskId="7"
          showTeacher={teacherMode}
          teacherNote={<p>Úzké obdélníky dokola – <code>canvas.create_rectangle(10, 10, 360, 20, fill='red')</code> atd.</p>}
        >
          <p>Vytvoř nový program <code>ramecek.py</code>, ve kterém ze čtyř velmi úzkých obdélníků nakreslíš takovýto rámeček (střídání červené a modré barvy):</p>
          <CanvasPreview width={380} height={280}>
            <Rect x1={10} y1={10} width={350} height={10} fill="red" />
            <Rect x1={10} y1={20} width={10} height={240} fill="blue" />
            <Rect x1={20} y1={250} width={350} height={10} fill="red" />
            <Rect x1={360} y1={10} width={10} height={240} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="8" 
          title="Kaskáda čtverců" 
          taskId="8"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Zde si žáci vyzkouší barvy navíc (např. <code>'magenta'</code>, <code>'violet'</code>, <code>'plum'</code>, <code>'pink'</code>).</p>
              <p>A hlavně si všimnou toho nejdůležitějšího principu počítačové grafiky – <strong>co se kreslí později, to se ukazuje nejvýše a překrývá věci pod sebou!</strong> Zkuste je nechat schválně prohodit pořadí příkazů.</p>
            </div>
          }
        >
          <p>Následující obrázek vznikl ze čtyř naprosto stejně velkých čtverců. Ten úplně první (spodní) má souřadnice levého horního vrcholu <code>[50, 50]</code>.</p>
          <p>Napiš program <code>pres_sebe.py</code>, který obrázek nakreslí – zvol si libovolné 4 netradiční barvy (v Pythonu fungují anglické názvy jako např. <code>'magenta'</code>, <code>'pink'</code>, <code>'orange'</code>, <code>'purple'</code>, <code>'gold'</code>...):</p>
          <CanvasPreview width={300} height={300}>
            <Rect x1={50} y1={50} width={100} height={100} fill="magenta" />
            <Rect x1={70} y1={70} width={100} height={100} fill="violet" />
            <Rect x1={90} y1={90} width={100} height={100} fill="plum" />
            <Rect x1={110} y1={110} width={100} height={100} fill="pink" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard 
          number="9*" 
          title="Norská vlajka bez chyb" 
          taskId="9"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Pokud žáci nakreslí pruhy přes sebe, uvidí nevzhledné černé obrysy protínající kříž! (Jako na chybném obrázku vlevo v metodice).</p>
              <p>Řešení spočívá ve správném vrstvení: 1x velký červený podklad, na něj 2x bílý kříž a na něj teprve 2x tenký tmavě modrý (<code>'navy'</code>) kříž!</p>
            </div>
          }
        >
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Vytvoř program <code>norsko.py</code>, ve kterém nakreslíš celou norskou vlajku jako na levém vzorovém obrázku. Udělej to tak, aby se (na rozdíl od pravého vzorového obrázku) v bílých částech nekřížily černé čáry:</p>
          <p className="text-emerald-700">Tmavě modrá barva se anglicky řekne <code>'navy'</code>.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col items-center">
              <span className="font-bold text-emerald-600 mb-2">SPRÁVNĚ (tvůj cíl)</span>
              <CanvasPreview width={350} height={250} className="my-0">
                <Rect x1={50} y1={50} width={250} height={150} fill="red" />
                <Rect x1={100} y1={50} width={60} height={150} fill="white" noBorder />
                <Rect x1={50} y1={100} width={250} height={60} fill="white" noBorder />
                
                <Rect x1={100} y1={50} width={60} height={50} fill="white" />
                <Rect x1={100} y1={160} width={60} height={40} fill="white" />
                <Rect x1={50} y1={100} width={50} height={60} fill="white" />
                <Rect x1={160} y1={100} width={140} height={60} fill="white" />
                
                <Rect x1={115} y1={50} width={30} height={150} fill="#000080" />
                <Rect x1={50} y1={115} width={250} height={30} fill="#000080" />
              </CanvasPreview>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-bold text-rose-600 mb-2">ŠPATNĚ (překrývající se čáry)</span>
              <CanvasPreview width={350} height={250} className="my-0">
                <Rect x1={50} y1={50} width={250} height={150} fill="red" />
                <Rect x1={100} y1={50} width={60} height={150} fill="white" />
                <Rect x1={50} y1={100} width={250} height={60} fill="white" />
                <Rect x1={115} y1={50} width={30} height={150} fill="#000080" />
                <Rect x1={50} y1={115} width={250} height={30} fill="#000080" />
              </CanvasPreview>
            </div>
          </div>
        </TaskCard>

        <TaskCard 
          number="10*" 
          title="Tři příkazy na 5 obdélníků" 
          taskId="10"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Měli by objevit, že dva oddělené červené čtverce lze nakreslit jako JEDEN velký červený obdélník, zelené jako JEDEN velký zelený, které přes sebe uděláme do kříže... a na to plácneme třetí žlutý doprostřed, který překryje křížení!</p>
              <p>Příkazy: červený ležatý obdélník, zelený stojatý obdélník, žlutý čtverec přes to uprostřed.</p>
            </div>
          }
        >
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Tento obrázek se dá nakreslit velmi dlouhým a pomalým způsobem (vykreslením 5 různých čtverců). Tvým úkolem je vytvořit <code>5_misto_3.py</code>, ve kterém upravíš následující kód tak, aby nakreslil stejný obrázek, ale aby program obsahoval jen <strong>3 příkazy</strong> pro kreslení obdélníků:</p>
          <PythonSnippet code={`canvas.create_rectangle(90, 90, 150, 150, fill='yellow')\ncanvas.create_rectangle(150, 90, 210, 150, fill='red')\ncanvas.create_rectangle(90, 150, 150, 210, fill='green')\ncanvas.create_rectangle(30, 90, 90, 150, fill='red')\ncanvas.create_rectangle(90, 30, 150, 90, fill='green')`} />
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonColorsChapter;
