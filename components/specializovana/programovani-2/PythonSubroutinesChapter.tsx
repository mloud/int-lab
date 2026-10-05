'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Box, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonSubroutinesChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-amber-500 mr-2 select-none">{">>>"}</span>
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
  <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-amber-600" />
      <span className="font-bold text-amber-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-amber-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py8-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonSubroutinesChapter: React.FC<PythonSubroutinesChapterProps> = ({ onBack }) => {
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
      title="Podprogramy"
      subtitle="Vlastní příkazy a skládání kódu (iMyšlení Lekce 8)"
      icon={<Box className="w-8 h-8 text-amber-600" />}
      onBack={onBack}
      accentColor="amber"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-amber-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-amber-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-amber-900 text-lg mb-2">Instrukce</h2>
          <p className="text-amber-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Někdy potřebujeme vykonat stejnou věc v programu víckrát. Místo toho, abychom ten samý kód pořád dokola psali (nebo kopírovali), naučíme počítač úplně <strong>nový příkaz</strong>, pod který to všechno schováme. Říkáme tomu podprogram (nebo funkce). Každý program si vždy <strong>ulož a spusť</strong> (klávesa F5).
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Kostičková duha" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha na procvičení proměnných z minulé lekce. Žáci napíší 7 příkazů pro kreslení obdélníků, kde od proměnných <code>x, y</code> budou postupně odečítat hodnoty od 140 až do 20.</p>}>
          <p>Vytvoř program <code>duha.py</code>, který nakreslí kostičkovou duhu. Do proměnných <code>x</code>, <code>y</code> přiřaď souřadnice pravého dolního rohu kostičkové duhy a použij je při kreslení barevných čtverců. Nejmenší čtverec má rozměry 20x20 a každý další je o 20 pixelů větší.</p>
          <CanvasPreview width={300} height={200} className="border-b-4 border-black border-t-0 border-l-0 border-r-0 shadow-none bg-white">
            <Rect x1={150-140} y1={200-140} width={140} height={140} fill="red" />
            <Rect x1={150-120} y1={200-120} width={120} height={120} fill="orange" />
            <Rect x1={150-100} y1={200-100} width={100} height={100} fill="yellow" />
            <Rect x1={150-80} y1={200-80} width={80} height={80} fill="green" />
            <Rect x1={150-60} y1={200-60} width={60} height={60} fill="blue" />
            <Rect x1={150-40} y1={200-40} width={40} height={40} fill="purple" />
            <Rect x1={150-20} y1={200-20} width={20} height={20} fill="magenta" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="Tvůj první podprogram" taskId="2" showTeacher={teacherMode} teacherNote={<p>Žáci si zde musí dát pozor na syntaktická pravidla: slovo <code>def</code>, symboly <code>():</code> a především na to, že příkazy uvnitř musí být <strong>odsazené od kraje</strong> (např. o 4 mezery, což např. Thonny nebo IDLE udělá automaticky po stisku Enter za dvojtečkou).</p>}>
          <p>Doposud jsi mohl psát jen takové příkazy, které počítač znal (jako <code>print</code>). Teď ho naučíš nové, své vlastní příkazy – tzv. podprogramy. Postupuj následovně:</p>
          <p>Vytvoř nový program <code>vypis.py</code>, ve kterém bude napsaný jen následující kód (všimni si nového slova <code>def</code> a dvojtečky na konci řádku!):</p>
          <PythonSnippet code={`def vypis_text():\n    print('************')\n    print('** Python **')\n    print('************')`} />
          <p>Poté tento program <strong>ulož a spusť</strong>. Zdánlivě se vůbec nic nestane! To proto, že jsme počítač tento příkaz zatím jen <em>naučili</em>, ale neřekli jsme mu, ať ho provede.</p>
          <p>Klikni do terminálu pod programem a vyzkoušej svůj nový příkaz <strong>zavolat</strong> (nezapomeň na prázdné závorky!):</p>
          <PythonSnippet code={`>>> vypis_text()`} />
          <p>Co se stalo? Počítač by ti měl vytisknout vizitku se třemi řádky přesně tak, jak jsi ho to předtím naučil!</p>
        </TaskCard>

        <TaskCard number="3" title="Volání z programu" taskId="3" showTeacher={teacherMode} teacherNote={<p>V tomto programu se nejdříve definuje podprogram. Za ním následují příkazy (už bez odsazení!), které ho volají. Žáci by měli pochopit, že podprogram lze volat i vícekrát.</p>}>
          <p>Je dost nepraktické volat podprogram ručně z terminálu. My chceme, aby to počítač udělal sám.</p>
          <p>Přidej na konec svého programu <code>vypis.py</code> další příkazy (od řádku 6). <strong>Důležité: Tyto nové příkazy nesmí být odsazené mezerami od okraje! Tím počítači říkáš, že tvoje definice podprogramu už skončila.</strong></p>
          <PythonSnippet code={`def vypis_text():\n    print('************')\n    print('** Python **')\n    print('************')\n\nprint('Vítej!')\nvypis_text()\nprint()\nvypis_text()\nprint('to je konec')`} />
          <p>Když program spustíš, uvidíš v terminálu zobrazenou vizitku rovnou dvakrát pod sebou!</p>
        </TaskCard>

        <TaskCard number="4" title="Anglická konverzace" taskId="4" showTeacher={teacherMode} teacherNote={<p>Úloha procvičuje skládání klasického textu s voláním podprogramu. Zde už vidí tu reálnou úsporu času – nemusí psát třikrát pod sebou ty hvězdičkové rámečky, napíší jen jediné slovo <code>vypis_text()</code>.</p>}>
          <p>Změň předchozí program <code>vypis.py</code> tak, aby počítač vypsal následující text. Pokus se to udělat co nejchytřeji (hvězdičkovou vizitku "I am Python" uprav uvnitř definice tvého podprogramu a v těle programu ho prostě jen třikrát zavolej na správném místě!).</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Hello!<br/>
            *****************<br/>
            ** I am Python **<br/>
            *****************<br/>
            How are you?<br/>
            *****************<br/>
            ** I am Python **<br/>
            *****************<br/>
            I am fine.<br/>
            *****************<br/>
            ** I am Python **<br/>
            *****************<br/>
            The end
          </div>
        </TaskCard>

        <TaskCard number="5" title="Skákající koně a záhada chybové hlášky" taskId="5" showTeacher={teacherMode} teacherNote={<p>V další úloze si žáci uvědomí velmi důležité pravidlo: podprogram musí být definován <strong>vždy předtím</strong>, než je poprvé zavolán. Jinak počítač vyhodí <code>NameError</code>.</p>}>
          <p>Vytvoř nový program <code>pisen.py</code>, který bude obsahovat následující kód (úmyslně ho přesně takto opiš a spusť):</p>
          <PythonSnippet code={`refren()\nrefren()\nprint()\nprint('když já jím dám ovsa')\nprint('oni skáčou hopsa')\nprint()\nrefren()\nrefren()\n\ndef refren():\n    print('já mám koně vraný koně')\n    print('to jsou koně mí')`} />
          <p>Když program spustíš, Python vybuchne a vypíše chybové hlášení: <code>NameError: name 'refren' is not defined</code>.</p>
          <p className="text-amber-700 font-bold">Python ti tím oznamuje, že na 1. řádku zkoušíš volat příkaz, který ho ale učíš až na konci souboru. Počítač čte soubory odshora dolů! Přesuň definici <code>def refren()</code> úplně nahoru nad zbytek programu a oprav to!</p>
        </TaskCard>

        <TaskCard number="6" title="Vykreslovací vizitka" taskId="6" showTeacher={teacherMode} teacherNote={<p>Část žáků může mít problém se zápisem některých speciálních symbolů (jako uvozovky). Připomeňte jim zpětné lomítko <code>\</code> pro tzv. escape sekvenci. Například <code>print('| \" |')</code>, pokud používají stejné uvozovky venku i vevnitř.</p>}>
          <p>Představ si, že chceš v terminálu často kreslit ASCII vizitku. Vytvoř program <code>vizitka.py</code> a definuj v něm podprogram <code>vizitka()</code>, který vizitku vytiskne na obrazovku. Nakonec ve svém programu tento podprogram aspoň jednou zavolej, abys ověřil, že funguje!</p>
          <pre className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl overflow-x-auto leading-relaxed">{`+--------------------+
|        www         |
|  Petr      ( o o ) |
|  LEV       (  ~  ) |
|             "      |
|  Počítačový král   |
+--------------------+`}</pre>
        </TaskCard>

        <TaskCard number="7" title="Vizitka 10x" taskId="7" showTeacher={teacherMode} teacherNote={<p>Úloha je zřejmou přípravou na cykly. Žáci uvidí, že musí 10x napsat stejné slovo pod sebe, což je sice úspornější než opisovat celou vizitku, ale stále otravné. Zeptejte se jich, zda by to nešlo ještě nějak zautomatizovat!</p>}>
          <p>Doplň do předchozího programu <code>vizitka.py</code> volání tvého podprogramu tolikrát, aby se pod sebou tvá vizitka vytiskla přesně <strong>desetkrát</strong>!</p>
          <p className="text-slate-500 italic mt-2">Není to trochu únavné, psát to pod sebe desetkrát? Brzy se naučíme něco, čemu se říká "cykly", abychom to počítači mohli říct jen jednou: "Udělej to desetkrát!"</p>
        </TaskCard>

        <TaskCard number="8" title="Stavební kostky: Stromeček a domeček" taskId="8" showTeacher={teacherMode} teacherNote={<p>Úkolem je nadefinovat tři stavební bloky a pak je na konci volat ve správném pořadí: např. stromeček je <code>trojuhelnik()</code> 2x a pak <code>noha()</code>. Domeček je <code>trojuhelnik()</code>, <code>obdelnik()</code> a <code>noha()</code>.</p>}>
          <p>Ve svém programu můžeš mít kolik podprogramů chceš! Vytvoř program <code>obrazce.py</code> a nauč počítač 3 malé podprogramy (každý vytiskne část obrázku):</p>
          <ul className="list-disc pl-5 space-y-4 mt-2 bg-slate-50 p-4 rounded-xl text-sm">
            <li>podprogram <strong>noha()</strong> nakreslí dvě podtržítka s čárkou:
              <pre className="font-mono mt-1 text-slate-800 font-bold leading-tight">{`  |
__|__`}</pre>
            </li>
            <li>podprogram <strong>obdelnik()</strong> nakreslí:
              <pre className="font-mono mt-1 text-slate-800 font-bold leading-tight">{`#####
#   #
#####`}</pre>
            </li>
            <li>podprogram <strong>trojuhelnik()</strong> nakreslí:
              <pre className="font-mono mt-1 text-slate-800 font-bold leading-tight">{`  *
 ***
*****`}</pre>
            </li>
          </ul>
          <p className="mt-4">Nyní pomocí těchto tří podprogramů poskládej a vytiskni tyto tři objekty (jen volej podprogramy za sebou ve správném pořadí)!</p>
          <div className="grid grid-cols-3 text-center bg-slate-100 py-4 mt-2 rounded-xl">
            <div className="flex flex-col items-center">
              <pre className="font-mono font-bold text-slate-800 leading-tight text-left">{`  *
 ***
*****
  *
 ***
*****
  |
__|__`}</pre>
              <span className="text-slate-500 mt-2 block text-xs">Stromeček</span>
            </div>
            <div className="flex flex-col items-center">
              <pre className="font-mono font-bold text-slate-800 leading-tight text-left">{`  *
 ***
*****
#####
#   #
#####
  |
__|__`}</pre>
              <span className="text-slate-500 mt-2 block text-xs">Domeček na kuří nožce</span>
            </div>
            <div className="flex flex-col items-center">
              <pre className="font-mono font-bold text-slate-800 leading-tight text-left">{`#####
#   #
#####
  |
__|__
#####
#   #
#####`}</pre>
              <span className="text-slate-500 mt-2 block text-xs">Činka</span>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="9" title="Kreslení obdélníku z podprogramu" taskId="9" showTeacher={teacherMode} teacherNote={<p>Doposud podprogramy fungovaly v terminálu, teď je žáci zkusí použít pro Canvas. Proměnná <code>canvas</code> funguje uvnitř podprogramu, protože je globální. To není nutné vysvětlovat, stačí, když zjistí, že to funguje.</p>}>
          <p>Doposud naše podprogramy jen psaly text. Pojďme vytvořit vlastní kreslící povely! Vytvoř program <code>kresba_podprogram.py</code> a vyzkoušej tento kód:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef kresli():\n    canvas.create_rectangle(10, 20, 30, 40, fill='red')\n\nkresli()`} />
          <p>Program ti po zavolání vlastního příkazu `kresli()` skutečně nakreslí do okna červený obdélník!</p>
        </TaskCard>

        <TaskCard number="10" title="Vlastní příkaz pro kříž" taskId="10" showTeacher={teacherMode} teacherNote={<p>V této úloze tělo podprogramu obsahuje posloupnost dvou příkazů <code>create_rectangle</code>, které se překříží, a vytvoří tak tvar plus.</p>}>
          <p>Vytvoř nový program <code>kriz.py</code> a uvnitř něj nadefinuj podprogram s názvem <code>kriz()</code>. Tento podprogram musí nakreslit dvěma červenými obdélníky přes sebe znaménko plus (kříž). Poté podprogram alespoň jednou v programu zavolej, ať uvidíš, jestli to funguje.</p>
          <CanvasPreview width={150} height={150}>
            <Rect x1={25} y1={55} width={100} height={40} fill="red" />
            <Rect x1={55} y1={25} width={40} height={100} fill="red" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11*" title="Stavíme Robota" taskId="11" showTeacher={teacherMode} teacherNote={<p>Krásná úloha na rozpad složitého problému na podproblémy (tzv. dekompozice). Pokud někdo nakreslí robota v jiných proporcích, nevadí. Zásadní je, aby se skládal z těchto čtyř definovaných dílů a volaly se přes podprogramy.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Vytvoř program <code>robot.py</code>, který bude umět nakreslit robota z obrázku. Tvé plátno by mělo obsahovat čtyři samostatné podprogramy: <code>hlava()</code>, <code>ruce()</code>, <code>nohy()</code> a <code>telo()</code>.</p>
          <p>Když na konec kódu napíšeš tato čtyři volání, měl by se ti robot celý krásně vykreslit:</p>
          <PythonSnippet code={`hlava()\nruce()\nnohy()\ntelo()`} />
          <CanvasPreview width={300} height={300}>
            <Rect x1={120} y1={50} width={60} height={50} fill="steelblue" />
            <Rect x1={130} y1={100} width={40} height={20} fill="lightblue" />
            
            <Rect x1={60} y1={140} width={180} height={20} fill="tomato" />
            <Rect x1={110} y1={120} width={80} height={100} fill="royalblue" />
            
            <Rect x1={120} y1={220} width={20} height={60} fill="purple" />
            <Rect x1={160} y1={220} width={20} height={60} fill="purple" />
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonSubroutinesChapter;
