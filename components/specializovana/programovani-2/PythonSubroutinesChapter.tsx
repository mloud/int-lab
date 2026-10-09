'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Box, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonSubroutinesChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-sky-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-sky-500 mr-2 select-none">{">>>"}</span>
            <span className="text-sky-300">{line.substring(3).trim()}</span>
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
  const [done, setLocalStorageDone] = useLocalStorage(`py8-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center font-black text-xl">
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
      subtitle="Lekce 8"
      icon={<Box className="w-8 h-8 text-sky-600" />}
      onBack={onBack}
      accentColor="sky"
      tabs={[{ id: 'lekce', label: 'Lekce 8', icon: Code }]}
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
          <p className="text-sky-800/80 text-sm sm:text-base font-bold">
            První úloha slouží k opakování použití proměnných při kreslení:
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 200</code><br/><code>y = 200</code><br/><code>canvas.create_rectangle(x - 140, y - 140, x, y, fill = 'red')</code><br/><code>canvas.create_rectangle(x - 120, y - 120, x, y, fill = 'orange')</code><br/><code>canvas.create_rectangle(x - 100, y - 100, x, y, fill = 'yellow')</code><br/><code>canvas.create_rectangle(x - 80, y - 80, x, y, fill = 'green')</code><br/><code>canvas.create_rectangle(x - 60, y - 60, x, y, fill = 'blue')</code><br/><code>canvas.create_rectangle(x - 40, y - 40, x, y, fill = 'purple')</code><br/><code>canvas.create_rectangle(x - 20, y - 20, x, y, fill = 'magenta')</code></p>}>
          <p>Vytvoř program <code>duha.py</code>, který nakreslí kostičkovou duhu. Do proměnných <code>x</code>, <code>y</code> přiřaď souřadnice pravého dolního rohu kostičkové duhy a použij je při kreslení barevných čtverců. Nejmenší čtverec má rozměry 20 x 20 a každý další je o 20 větší:</p>
          <CanvasPreview width={250} height={250}>
            <Rect x1={50} y1={50} width={140} height={140} fill="red" />
            <Rect x1={70} y1={70} width={120} height={120} fill="orange" />
            <Rect x1={90} y1={90} width={100} height={100} fill="yellow" />
            <Rect x1={110} y1={110} width={80} height={80} fill="green" />
            <Rect x1={130} y1={130} width={60} height={60} fill="blue" />
            <Rect x1={150} y1={150} width={40} height={40} fill="purple" />
            <Rect x1={170} y1={170} width={20} height={20} fill="magenta" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>V dalších úlohách chceme žáky naučit vytvářet a používat podprogramy, zatím bez parametrů a návratové hodnoty. Vyskytuje se zde několik nových principů: definování podprogramu, tělo podprogramu, volání podprogramu. Žáci si musí dát pozor na syntaktická pravidla: slovo <code>def</code>, symboly <code>()</code>, <code>:</code> a odsazení od kraje. Kromě toho je nezbytné mít na paměti, že nejdříve je nutno podprogram definovat a až potom je možné jej volat.<br/><br/>V části 2.B může žáky zmást, že se po spuštění programu zdánlivě nic nestane, jen se vypíše informace o restartu programu. Pokud by se někteří žáci dotazovali na správnost svého postupu, vysvětlíme jim, že postupovali správně, ale že se jimi zadané příkazy vykonají až po zavolání podprogramu v části 2.C.<br/><br/>Technická poznámka: Pokud si žáci navykli kopírovat ukázkové kódy z pracovních listů do svých programů pomocí schránky, měli by se od této chvíle naučit takto zkopírované kódy dodatečně kontrolovat. Je totiž pravděpodobné, že se při kopírování nezachová případné odsazení řádků od kraje, kvůli čemuž programy nebudou fungovat nebo budou fungovat chybně.</p>}>
          <p>Doposud jsi mohl psát jen takové příkazy, které počítač znal. Teď ho naučíš nové, své vlastní příkazy – tzv. podprogramy. Postupuj následovně:</p>
          <ul className="list-none pl-0 mt-4 space-y-4">
            <li>A) Vytvoř nový program <code>vypis.py</code>, ve kterém bude napsaný jen následující kód:
              <PythonSnippet code={`def vypis_text():\n    print('************')\n    print('** Python **')\n    print('************')`} />
              <p className="text-sm italic text-slate-500 mt-2">Příkazy nech odsazené od kraje (Python tam automaticky vložil 4 mezery)</p>
            </li>
            <li>B) Program spusť – jestli je všechno v pořádku, uvidíš v interaktivní konzoli jen zprávu o spuštění (RESTART).</li>
            <li>C) Do příkazového řádku napiš:
              <PythonSnippet code={`>>> vypis_text()`} />
            </li>
            <li>D) Jestli jsi postupoval správně, Python zobrazí text:
              <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm my-2 whitespace-pre">
************<br/>
** Python **<br/>
************
              </div>
            </li>
          </ul>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h4 className="font-bold text-slate-800 mb-4">Co se stalo?</h4>
            <div className="font-mono bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm relative">
              <div className="mb-2"><span className="text-sky-600 font-bold">def</span> <span className="text-purple-600">vypis_text</span><span className="text-rose-500 font-bold">():</span></div>
              <div className="pl-8 text-slate-600">print('************')</div>
              <div className="pl-8 text-slate-600">print('** Python **')</div>
              <div className="pl-8 text-slate-600">print('************')</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• slovem <code>def</code> začíná <strong>definice</strong> tvého nového příkazu – podprogramu</li>
              <li>• <code>vypis_text</code> je <strong>název</strong> podprogramu</li>
              <li>• prázdné závorky <code>()</code> a dvojtečka <code>:</code> jsou velmi důležité</li>
              <li>• odsazené příkazy tvoří <strong>tělo</strong> podprogramu</li>
            </ul>
            <p className="mt-4">Po spuštění programu se počítač naučil nový příkaz <code>vypis_text</code>. Počítač ho zatím nevykonal, jen se ho naučil. Skupinu příkazů <code>print</code> – tedy tělo podprogramu <code>vypis_text</code> – počítač vykoná až tehdy, když do příkazového řádku napíšeš:</p>
            <PythonSnippet code={`>>> vypis_text()`} />
            <p>Takovýto zápis se nazývá <strong>volání</strong> podprogramu. Prázdné závorky jsou velmi důležité.</p>
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>V tomto programu se nejdříve definoval podprogram <code>vypis_text</code>. Za ním následují příkazy <code>print</code> a příkazy pro volání podprogramu <code>vypis_text</code>. Python zobrazil svoji vizitku dvakrát, protože v programu jsou dvě volání podprogramu <code>vypis_text</code>.<br/><br/>Na základě této úlohy by žáci měli pochopit, že podprogram můžeme zavolat i vícekrát.</p>}>
          <p>Přidej do programu <code>vypis.py</code> další příkazy (jsou zvýrazněny žlutě) – pozor, tyto příkazy nesmí mít odsazení, protože už nepatří do podprogramu:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-sky-400 overflow-x-auto shadow-inner border border-slate-700 whitespace-pre">
            <div><span className="text-slate-300">def vypis_text():</span></div>
            <div><span className="text-slate-300">    print('************')</span></div>
            <div><span className="text-slate-300">    print('** Python **')</span></div>
            <div><span className="text-slate-300">    print('************')</span></div>
            <br />
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">print('Vítej!')</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">vypis_text()</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">print()</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">vypis_text()</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">print('to je konec')</span></div>
          </div>
          <p>Když program spustíš, uvidíš takovýto výsledek:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Vítej!<br/>
************<br/>
** Python **<br/>
************<br/>
<br/>
************<br/>
** Python **<br/>
************<br/>
to je konec
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def vypis_text():</code><br/><code>    print('*****************')</code><br/><code>    print('** I am Python **')</code><br/><code>    print('*****************')</code><br/><br/><code>print('Hello')</code><br/><code>vypis_text()</code><br/><code>print('How are you?')</code><br/><code>vypis_text()</code><br/><code>print('I am fine.')</code><br/><code>vypis_text()</code><br/><code>print('The end')</code><br/><br/>Pokud to uznáme za vhodné, můžeme žákům prozradit, že alternativně lze odsazení příkazů od kraje zajistit pomocí jednoho stisku klávesy <code>&lt;Tab&gt;</code>. Python na dané místo vloží čtyři mezery.</p>}>
          <p>Změň předchozí program tak, aby počítač vypsal:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre leading-relaxed">
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

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Žákům můžeme zdůraznit, že v Pythonu je zvykem všechny podprogramy zapisovat na začátku programu a až za nimi následuje samotná posloupnost příkazů, které mohou tyto podprogramy volat.<br/><br/>Řešení:<br/><code>def refren():</code><br/><code>    print('já mám koně vraný koně')</code><br/><code>    print('to jsou koně mí')</code><br/><br/><code>refren()</code><br/><code>refren()</code><br/><code>print()</code><br/><code>print('když já jím dám ovsa')</code><br/><code>print('oni skáčou hopsa')</code><br/><code>print()</code><br/><code>refren()</code><br/><code>refren()</code></p>}>
          <p>Vytvoř nový program <code>pisen.py</code>, který bude obsahovat následující kód:</p>
          <PythonSnippet code={`refren()\nrefren()\nprint()\nprint('když já jím dám ovsa')\nprint('oni skáčou hopsa')\nprint()\nrefren()\nrefren()\n\ndef refren():\n    print('já mám koně vraný koně')\n    print('to jsou koně mí')`} />
          <p>Když program spustíš, Python vypíše chybové hlášení:</p>
          <div className="font-mono bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 text-sm whitespace-pre">
Traceback (most recent call last):<br/>
  File "D:\projekty-python\pisen.py", line 1, in &lt;module&gt;<br/>
    refren()<br/>
NameError: name 'refren' is not defined
          </div>
          <p className="mt-4">Python ti tímto hlášením oznamuje, že na 1. řádku programu není možné volat podprogram <code>refren</code>, protože tento podprogram ještě nebyl definován.</p>
          <p>Uprav program <code>pisen.py</code> tak, aby se úryvek písně vypsal správně.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Část žáků může mít podobné problémy se zápisem některých symbolů jako v 11. úloze 3. lekce. Můžeme jim připomenout symbol zpětného lomítka (<code>\</code>), pomocí kterého lze do textu vložit apostrof (jako <code>\'</code>) nebo zpětné lomítko (jako <code>\\</code>).<br/><br/>Řešení:<br/><code>def vizitka():</code><br/><code>    print('+--------------------+')</code><br/><code>    print('|        www         |')</code><br/><code>    print('|  Petr   ( o o )    |')</code><br/><code>    print('|  LEV     ( ~ )     |')</code><br/><code>    print('|            "       |')</code><br/><code>    print('|  Počítačový král   |')</code><br/><code>    print('+--------------------+')</code><br/><br/><code>vizitka()</code></p>}>
          <p>Před několika týdny jsme vytvářeli program, který zobrazil tvoji vizitku, které byla podobná následující:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
+--------------------+<br/>
|        www         |<br/>
|  Petr   ( o o )    |<br/>
|  LEV     ( ~ )     |<br/>
|            "       |<br/>
|  Počítačový král   |<br/>
+--------------------+
          </div>
          <p className="mt-4">Vytvoř nový program <code>vizitka.py</code> a v něm definuj podprogram <code>vizitka</code>, který takovou vizitku zobrazí. Nakonec tento podprogram zavolej, abys ověřil(a), že funguje správně.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Tato úloha je zřejmou přípravou na cykly. Když se na ně budou žáci ptát, můžeme je ubezpečit, že za několik vyučovacích hodin se budou cykly učit i v tomto předmětu.<br/><br/>Řešení:<br/><code>def vizitka():</code><br/><code>    # ... (tělo z minulé úlohy) ...</code><br/><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code><br/><code>vizitka()</code></p>}>
          <p>Doplň do programu <code>vizitka.py</code> volání podprogramu <code>vizitka</code> tak, aby se pod sebe zobrazilo 10 tvých vizitek.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení – definování podprogramů:<br/><code>def trojuhelnik():</code><br/><code>    print('  *  ')</code><br/><code>    print(' *** ')</code><br/><code>    print('*****')</code><br/><br/><code>def obdelnik():</code><br/><code>    print('#####')</code><br/><code>    print('#   #')</code><br/><code>    print('#####')</code><br/><br/><code>def noha():</code><br/><code>    print('  |  ')</code><br/><code>    print('__|__')</code><br/><br/>Řešení – zobrazení stromečku:<br/><code>trojuhelnik()</code><br/><code>trojuhelnik()</code><br/><code>noha()</code><br/><br/>Řešení – zobrazení domečku na kuří nožce:<br/><code>trojuhelnik()</code><br/><code>obdelnik()</code><br/><code>noha()</code><br/><br/>Řešení – zobrazení činky:<br/><code>obdelnik()</code><br/><code>noha()</code><br/><code>obdelnik()</code></p>}>
          <p>Ve svém programu můžeš definovat i více podprogramů. Vytvoř nový program <code>obrazce.py</code> a definuj v něm tři podprogramy. Každý z nich zobrazí jeden z následujících obrázků:</p>
          <ul className="list-none pl-0 mt-4 space-y-4">
            <li>• podprogram <code>noha</code> nakreslí takovouto nohu (dole jsou dvě podtržítka vlevo i vpravo):
              <div className="font-mono bg-slate-50 p-2 rounded-xl text-sm whitespace-pre w-max mt-2">
&nbsp;&nbsp;|&nbsp;&nbsp;<br/>
__|__
              </div>
            </li>
            <li>• podprogram <code>obdelnik</code> nakreslí takovýto obdélník:
              <div className="font-mono bg-slate-50 p-2 rounded-xl text-sm whitespace-pre w-max mt-2">
#####<br/>
#&nbsp;&nbsp;&nbsp;#<br/>
#####
              </div>
            </li>
            <li>• podprogram <code>trojuhelnik</code> nakreslí takovýto trojúhelník:
              <div className="font-mono bg-slate-50 p-2 rounded-xl text-sm whitespace-pre w-max mt-2">
&nbsp;&nbsp;*&nbsp;&nbsp;<br/>
&nbsp;***&nbsp;<br/>
*****
              </div>
            </li>
          </ul>
          <p className="mt-6">Na konec programu vlož volání podprogramů, abys každý z nich otestoval. Potom zkus pomocí vytvořených podprogramů zobrazit následující obrázky:</p>
          <div className="flex flex-col sm:flex-row gap-8 items-end mt-4 font-mono bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm whitespace-pre text-blue-600">
            <div>
&nbsp;&nbsp;*<br/>
&nbsp;***<br/>
*****<br/>
&nbsp;&nbsp;*<br/>
&nbsp;***<br/>
*****<br/>
&nbsp;&nbsp;|<br/>
__|__
            </div>
            <div>
&nbsp;&nbsp;*<br/>
&nbsp;***<br/>
*****<br/>
#####<br/>
#&nbsp;&nbsp;&nbsp;#<br/>
#####<br/>
&nbsp;&nbsp;|<br/>
__|__
            </div>
            <div>
#####<br/>
#&nbsp;&nbsp;&nbsp;#<br/>
#####<br/>
&nbsp;&nbsp;|<br/>
__|__<br/>
#####<br/>
#&nbsp;&nbsp;&nbsp;#<br/>
#####
            </div>
            <div className="text-slate-500 italic flex-1 border-l-2 pl-4">
toto je noha:<br/>
&nbsp;&nbsp;|<br/>
__|__<br/>
<br/>
toto je obdélník:<br/>
#####<br/>
#&nbsp;&nbsp;&nbsp;#<br/>
#####<br/>
<br/>
toto je trojúhelník:<br/>
&nbsp;&nbsp;*<br/>
&nbsp;***<br/>
*****
            </div>
          </div>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>V této úloze tělo podprogramu obsahuje jediný příkaz – nakreslení obdélníku.<br/><br/>Proměnná <code>canvas</code> je zde tzv. globální proměnná. Globální proměnná existuje od svého vzniku (přiřazením mimo podprogram), v podprogramu se sice používá, avšak její hodnotu nelze v podprogramu měnit. Tyto informace však žákům vzhledem k jejich současným programátorským zkušenostem nebudeme prozrazovat.</p>}>
          <p>Teď budeš vytvářet podprogramy, které kreslí do grafického okna. Vytvoř nový program <code>kresba_podprogram.py</code> a vyzkoušej:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef kresli():\n    canvas.create_rectangle(10, 20, 30, 40, fill='red')\n\nkresli()`} />
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>V této úloze tělo podprogramu obsahuje posloupnost dvou příkazů. Při každém volání tohoto podprogramu se nakreslí nejprve první obdélník a přes něj druhý.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def kriz():</code><br/><code>    canvas.create_rectangle(150 - 90, 100 - 30, 150 + 90, 100 + 30, fill='red')</code><br/><code>    canvas.create_rectangle(150 - 30, 100 - 90, 150 + 30, 100 + 90, fill='red')</code><br/><br/><code>kriz()</code></p>}>
          <p>Vytvoř nový program <code>kriz.py</code> a v něm definuj podprogram <code>kriz</code>, který po zavolání nakreslí červený kříž:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={60} y1={70} width={180} height={60} fill="red" />
            <Rect x1={120} y1={10} width={60} height={180} fill="red" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11*" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Toto je ukázka jednoho z možných řešení. Žáci zřejmě navrhnou nakreslení jiných obdélníků, jehož výsledkem bude akceptovatelný robot.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def hlava():</code><br/><code>    canvas.create_rectangle(160, 40, 200, 100, fill='skyblue')</code><br/><code>    canvas.create_rectangle(150, 10, 210, 55, fill='steelblue')</code><br/><br/><code>def telo():</code><br/><code>    canvas.create_rectangle(140, 70, 220, 190, fill='royalblue')</code><br/><br/><code>def ruce():</code><br/><code>    canvas.create_rectangle(80, 90, 280, 110, fill='tomato')</code><br/><br/><code>def nohy():</code><br/><code>    canvas.create_rectangle(150, 160, 170, 250, fill='purple')</code><br/><code>    canvas.create_rectangle(190, 160, 210, 250, fill='purple')</code><br/><br/><code>hlava()</code><br/><code>ruce()</code><br/><code>nohy()</code><br/><code>telo()</code></p>}>
          <p>11* Vytvoř nový program <code>robot.py</code>, který bude schopen nakreslit robota. V programu budou čtyři podprogramy – <code>hlava</code>, <code>ruce</code>, <code>nohy</code>, <code>telo</code> – a každý z nich bude schopen nakreslit část robota. Když je zavoláš v následujícím pořadí:</p>
          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
hlava()<br/>
ruce()<br/>
nohy()<br/>
telo()
            </div>
            <div className="flex-1">
              <p className="mb-2">nakreslí se celý robot jako na obrázku vpravo:</p>
              <CanvasPreview width={300} height={300} className="!m-0">
                <Rect x1={130} y1={20} width={40} height={40} fill="steelblue" />
                <Rect x1={140} y1={60} width={20} height={20} fill="lightblue" />
                <Rect x1={70} y1={100} width={160} height={20} fill="tomato" />
                <Rect x1={120} y1={170} width={20} height={80} fill="purple" />
                <Rect x1={160} y1={170} width={20} height={80} fill="purple" />
                <Rect x1={110} y1={80} width={80} height={100} fill="royalblue" />
              </CanvasPreview>
            </div>
          </div>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonSubroutinesChapter;
