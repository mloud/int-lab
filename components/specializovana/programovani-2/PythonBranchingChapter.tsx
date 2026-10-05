'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, GitMerge, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonBranchingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-indigo-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-indigo-500 mr-2 select-none">{">>>"}</span>
            <span className="text-indigo-300">{line.substring(3).trim()}</span>
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

const CanvasPreview = ({ children, width = 300, height = 200, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
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

const Oval = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'} rounded-[50%]'`} 
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
  const [done, setDone] = useLocalStorage(`py17-task-${taskId}`, false);

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
      subtitle="Kombinace smyček a podmínek pro komplexní grafiku (iMyšlení Lekce 17)"
      icon={<GitMerge className="w-8 h-8 text-indigo-600" />}
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
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dnes obě tvé super-schopnosti (cykly a podmínky if/else) spojíme do jedné! Zjistíme, co se stane, když uvnitř jednoho velkého cyklu dáš podmínku, aby počítač část věcí kreslil modře, a jinou část červeně.
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Neformální pozdrav" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha pro zopakování úplných základů větvení z předchozí lekce. Pokud <code>vek &lt; 18</code> vypíše "Ahoj", jinak vypíše "Dobrý den".</p>}>
          <p>Kamarádku pozdravíš neformálně "Ahoj", ale starší lidi pozdravíš formálněji, například "Dobrý den". Napiš program <code>pozdravy_podle_veku.py</code>, ve kterém do proměnné <code>vek</code> přiřadíš věk člověka.</p>
          <p>Potom použij příkaz větvení (if a else) na to, aby se program sám rozhodl, který z uvedených dvou pozdravů vypíše na obrazovku. Otestuj ho pro čísla 15, 18 i 50.</p>
        </TaskCard>

        <TaskCard number="2" title="Výplata na brigádě" taskId="2" showTeacher={teacherMode} teacherNote={<p>Tady se do obou větví if/else přidává i matematický výpočet výdělku: <code>mzda = hodin * 80</code> vs <code>mzda = hodin * 100</code>.</p>}>
          <p>Na brigádě ve stánku se zmrzlinou dostaneš mzdu podle následujícího pravidla:</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>když budeš pracovat <strong>méně než 10 hodin</strong>, vyděláš si 80 korun za hodinu,</li>
            <li>jinak (tzn. od 10 a výše) dostaneš obrovský bonus a vyděláš si 100 korun za hodinu.</li>
          </ul>
          <p>Vytvoř program, ve kterém do proměnné <code>hodin</code> přiřadíš počet hodin. Potom pomocí větvení vypočti do nové proměnné <code>mzda</code> konečnou částku k vyplacení a na konci programu ji jedním printem vypiš. Program by měl vypsat:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Vyděláš si 560 korun.<br/>
            <span className="text-emerald-700">// (tohle platí pro hodin = 7)</span><br/><br/>
            Vyděláš si 1200 korun.<br/>
            <span className="text-emerald-700">// (tohle platí pro hodin = 12)</span>
          </div>
        </TaskCard>

        <TaskCard number="3" title="Mobilní operátor Vegafon" taskId="3" showTeacher={teacherMode} teacherNote={<p>Další varianta ifelse s výpočtem, zkušení žáci už ji zvládnou rychle. <code>if megabajty &lt; 10: cena = megabajty * 2 else: cena = 20</code>.</p>}>
          <p>Mobilní operátor Vegafon počítá platby za tvá přenesená mobilní data takto:</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Když za den přeneseš <strong>méně než 10 megabajtů dat</strong>, zaplatíš za každý tvůj megabajt 2 koruny.</li>
            <li>Jinak (od 10 nahoru) máš už paušál a zaplatíš za celý den pevných 20 korun nezávisle na datech.</li>
          </ul>
          <p>Napiš program <code>mobilni_data.py</code>, dej si data do proměnné a vypočítej svou cenu!</p>
        </TaskCard>

        <TaskCard number="4" title="Zrádný operátor Zodrafon" taskId="4" showTeacher={teacherMode} teacherNote={<p>Zde se podmínka v `else` stává záludnější, platí se základ 10 kč a k tomu data nad limit (přesah): <code>cena = 10 + (megabajty - 10) * 3</code>.</p>}>
          <p>Konkurenční operátor Zodrafon počítá platby takto záludně:</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Když přeneseš do 10 megabajtů dat, zaplatíš za každý megabajt 1 korunu.</li>
            <li>Jinak tě zkasíruje o 10 korun a k tomu za KAŽDÝ tvůj přečerpaný megabajt nad onen limit 10 megabajtů doplatíš těžké 3 koruny. (Tedy např. za 12 megabajtů platíš 10 kč základ + ty dva extra megabajty * 3 kč).</li>
          </ul>
          <p>Vytvoř program <code>mobilni_data2.py</code>. Pokud správně zkonstruuješ onu rovnici do svého <code>else</code>, měl by ti program pro zadaných 20 megabajtů vyhodit cenu 40 korun.</p>
        </TaskCard>

        <TaskCard number="5" title="Cyklus dne a noci" taskId="5" showTeacher={teacherMode} teacherNote={<p>Podmínka určující i obarvení grafiky (parametr fill). Zde se do <code>if</code> dá kreslení bílého kruhu a do <code>else</code> žlutého kruhu.</p>}>
          <p>Vytvoř nový grafický program <code>den_noc.py</code>, který podle zadaného času nakreslí slunce nebo měsíc.</p>
          <p>Do proměnné <code>cas</code> přiřaď libovolný počet hodin (0 až 23). Použij příkaz větvení na to, aby se pro čas menší než 8 nakreslil měsíc (bílý kruh uprostřed plátna), ale JINAK aby se nakreslilo slunce (stejný kruh, akorát bude celý žlutý).</p>
        </TaskCard>

        <TaskCard number="6" title="Vykreslení nebe" taskId="6" showTeacher={teacherMode} teacherNote={<p>Nyní už obě větve obsahují 2 příkazy pod sebou: <code>create_rectangle</code> (pozadí) a <code>create_oval</code> (nebeské těleso). Důležité je pohlídat stejné odsazení obou příkazů zleva uvnitř větví <code>if</code> a <code>else</code>!</p>}>
          <p>Do předchozího kódu doplň kreslení pozadí – ať visí náš měsíc na ohromném tmavomodrém obdélníku přes celé plátno, a žluté sluníčko zase na zářivě světlemodrém pozadí! Musíš do svých obou větví vložit po jednom novém příkazu takto (dbej na to odsazení!):</p>
          <PythonSnippet code={`if cas < 8:\n    canvas.create_rectangle(0, 0, 300, 200, fill='navy')\n    canvas.create_oval(... ten tvůj bílý kruh ...)\nelse:\n    canvas.create_rectangle(0, 0, 300, 200, fill='cyan')\n    canvas.create_oval(... ten tvůj žlutý kruh ...)`} />
        </TaskCard>

        <TaskCard number="7" title="Krajinka" taskId="7" showTeacher={teacherMode} teacherNote={<p>Žáci zjišťují, že pokud chtějí něco společného pro VŠECHNY scénáře nezávisle na podmínce (jako je třeba zelená louka, pohoří nebo tráva), nesmí to dávat do ifů, ale dát to prostě s nulovým odsazením až na samotný konec programu mimo struktury.</p>}>
          <p>K tvému střídajícímu se dni a noci přidej zelenou louku. Trávu představuje zelený obdélník, ležící třeba ve spodní čtvrtině obrazovky.</p>
          <p className="font-bold text-indigo-700">Trik:</p>
          <p>Tento zelený obdélník nemusíš složitě kopírovat do ifu pro noc i do ifu pro den, protože tráva je tam přece furt stejná bez ohledu na slunce! Úplně postačí ho nakreslit až na samotném konci programu zcela bez odsazení (aby se prostě automaticky nalepil přes všechno).</p>
          <CanvasPreview width={300} height={200} noBorder>
            <div className="absolute inset-0 bg-cyan-400"></div>
            <Oval x1={150-30} y1={90-30} width={60} height={60} fill="yellow" noBorder />
            <Rect x1={0} y1={150} width={300} height={50} fill="green" noBorder />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="Úkryt do cyklu" taskId="8" showTeacher={teacherMode} teacherNote={<p>Tady nastupuje opravdová magie (vnořené konstrukce). Všechny řádky s větvením musí být nyní OPUC ODSUNUTÉ DO PRAVA, aby byly součástí for cyklu. A kód, co už byl uvnitř if/else, se posouvá ještě dál!</p>}>
          <p>Přečti si následující program. Zkouší, co se stane, když se příkaz <code>if</code> a <code>else</code> ocitne <strong>vevnitř (v těle) jednoho velkého opakujícího se for cyklu</strong>!</p>
          <PythonSnippet code={`for i in range(14):\n    if i < 8:\n        print(i, 'ještě spím')\n    else:\n        print(i, 'už jsem ve škole')`} />
          <p>Díky tomu, že je if schovaný uvnitř cyklu a rovnou si ověřuje naši cyklující proměnnou <code>i</code>, se program prvních osm kol (od i=0 po i=7) rozhodne věci zaspat, a až nastane osmé kolo, neomylně začne psát, že je ve škole.</p>
          <p className="mt-2 text-indigo-700 font-bold">Pozor na propastné odsazování!</p>
          <p className="text-sm">Všimni si, že <code>if</code> a <code>else</code> jsou teď samotné odsazené o 4 mezery do prava, protože leží ve smyčce. A jejich vnitřní příkazy print musí být odsazené dokonce o 8 mezer!</p>
        </TaskCard>

        <TaskCard number="9" title="Chudý a bohatý" taskId="9" showTeacher={teacherMode} teacherNote={<p>Aplikace poznatku z předchozí úlohy. Cyklus <code>for i in range(10)</code>. Tělo je posunuté. Uvnitř <code>if i &lt; 5:</code> a do něj vnořený print "jsem chudý". Else a do něj vnořený "jsem bohatý".</p>}>
          <p>Vytvoř nový program <code>chudy_bohaty.py</code>. V něm podobně jako v předchozí úloze vytvoř smyčku s 10 opakováními. Dovnitř cyklu vlož podmínku, a zajisti si tak tenhle luxusní výpis:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl">
            Mám 0 korun, jsem chudý<br/>
            Mám 10 korun, jsem chudý<br/>
            ...<br/>
            Mám 40 korun, jsem chudý<br/>
            Mám 50 korun, jsem bohatý<br/>
            Mám 60 korun, jsem bohatý<br/>
            ...
          </div>
          <p className="text-sm mt-2 italic">Nápověda: Ten 10x nárůst peněz získáš v printu opět klasickým násobením <code>i * 10</code>.</p>
        </TaskCard>

        <TaskCard number="10" title="Náhrdelník" taskId="10" showTeacher={teacherMode} teacherNote={<p>Kombinace cyklu kreslícího řadu na x-ose a podmiňování barev podle <code>i</code>. `x = 50 + i * 20`, pokud `i &lt; 8` nakreslí red, jinak blue.</p>}>
          <p>Vytvoř nový program <code>koralky.py</code>. Tvoje <code>for</code> smyčka teď bude umět střídat grafiku!</p>
          <p>Pomocí jediného cyklu s vnořeným větvením nakresli řadu 15 korálků. Pomocí podmínky na <code>i</code> zařiď, aby prvních 8 z nich bylo vybarveno červeně, a zbytek modře.</p>
          <CanvasPreview width={300} height={100} className="border-none shadow-none bg-white">
            {Array.from({ length: 15 }).map((_, i) => (
              <Oval key={i} x1={15 + i * 18} y1={40} width={18} height={18} fill={i < 8 ? "red" : "blue"} />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11*" title="Rozsypané korálky" taskId="11" showTeacher={teacherMode} teacherNote={<p>Cyklus s náhodnou pozicí. Pokud vyjde X &lt; 200 nakreslí se červený kruh, jinak namodralý. Na obrazovce vznikne jasná dělící hranice mezi barvami podle toho, kam zrovna náhodně spadly.</p>}>
          <p className="flex items-center gap-2 font-bold text-indigo-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Dejme obrovské smyčce volnou ruku a nechme ji náhodně nakreslit 100 korálků rozházených po celé ploše.</p>
          <p>V každém kole se vylosuje nějaké náhodné <code>X</code> a <code>Y</code>. Tvoje podmínka pak ale ověří ono vylosované číslo <code>X</code>. Když si všimne, že onen náhodný korálek spadl nalevo (kdy <code>x {"<"} 150</code>), vybarví ho červeně. Ale jakékoliv kuličky, které zrovna náhodně "popadaly" do pravé poloviny plátna, vymaluje modře!</p>
          <p>Po spuštění programu objevíš úžasný efekt: kuličky jsou po stole sice náhodně rozházené, ale přesto bude barvami stůl jasně říznutý v půli a červené a modré týmy se spolu nesmíchají!</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonBranchingChapter;
