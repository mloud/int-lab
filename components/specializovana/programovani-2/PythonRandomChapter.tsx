'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Dices, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonRandomChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-fuchsia-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-fuchsia-500 mr-2 select-none">{">>>"}</span>
            <span className="text-fuchsia-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-fuchsia-50 border-l-4 border-fuchsia-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-fuchsia-600" />
      <span className="font-bold text-fuchsia-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-fuchsia-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py9-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-fuchsia-100 text-fuchsia-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonRandomChapter: React.FC<PythonRandomChapterProps> = ({ onBack }) => {
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
      title="Náhoda"
      subtitle="Generování náhodných čísel a tvarů (iMyšlení Lekce 9)"
      icon={<Dices className="w-8 h-8 text-fuchsia-600" />}
      onBack={onBack}
      accentColor="fuchsia"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-fuchsia-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-fuchsia-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-fuchsia-900 text-lg mb-2">Instrukce</h2>
          <p className="text-fuchsia-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Náš počítač doposud dělal jen to, co jsme mu úplně přesně přikázali. Nyní mu dovolíme trochu se "utrhnout ze řetězu" – naučíme ho házet kostkou, vybírat si náhodná čísla a kreslit tvary tam, kam si on sám vymyslí!
          </p>
        </div>

        <TaskCard number="1" title="Zahřívačka: Mřížka" taskId="1" showTeacher={teacherMode} teacherNote={<p>Opakování podprogramů (z lekce 8). Žáci si zadefinují dvě funkce a na střídačku je volají, čímž vznikne mřížka.</p>}>
          <p>Na zahřátí si ještě zopakujeme to nejdůležitější z minulé lekce – podprogramy (zkratka příkazů pod vlastní slovo).</p>
          <p>Napiš program <code>mrizka.py</code>, ve kterém nadefinuješ dva tvoje vlastní příkazy:</p>
          <ul className="list-disc pl-5">
            <li>podprogram <code>cara()</code> vytiskne tento řádek znaků: <br/><code>+--+--+--+--+--+--+</code></li>
            <li>podprogram <code>hulky()</code> vytiskne svislé oddělovače: <br/><code>|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;|</code></li>
          </ul>
          <p>Na konci programu na střídačku volej tvé nové podprogramy <code>cara()</code> a <code>hulky()</code> tak, aby se v terminálu objevila tato tabulka:</p>
          <pre className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl overflow-x-auto leading-none">{`+--+--+--+--+--+--+
|  |  |  |  |  |  |
+--+--+--+--+--+--+
|  |  |  |  |  |  |
+--+--+--+--+--+--+`}</pre>
        </TaskCard>

        <TaskCard number="2" title="Čtverečkovaný papír" taskId="2" showTeacher={teacherMode} teacherNote={<p>Žáci tvoří "nad-podprogram", který obaluje více volání jiných podprogramů, čímž se tvoří složitější dekompozice problému.</p>}>
          <p>Přidej do předchozího programu ještě jeden podprogram, který pojmenuj <code>ctvereckovany_papir()</code>. Ten bude fungovat jako nadřízený příkaz a využije tvé dva menší podprogramy tak, že je zavolá mockrát po sobě a tím vyrobí velký čtverečkovaný blok (na výšku by měl mít tři kostičky).</p>
          <p>Na úplném konci programu pak jedinkrát zavolej <code>ctvereckovany_papir()</code> a ujisti se, že se ti vytiskl celý blok!</p>
          <pre className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl overflow-x-auto leading-none">{`+--+--+--+--+--+--+
|  |  |  |  |  |  |
+--+--+--+--+--+--+
|  |  |  |  |  |  |
+--+--+--+--+--+--+
|  |  |  |  |  |  |
+--+--+--+--+--+--+`}</pre>
        </TaskCard>

        <TaskCard number="3" title="Slovo RANDOM" taskId="3" showTeacher={teacherMode} teacherNote={<p>V této úloze žáci pracují v interaktivním režimu v terminálu. Generátor náhodných čísel <code>random.randint(od, do)</code> vybírá celá čísla včetně hraničních hodnot. Je to jako hod hrací kostkou.</p>}>
          <p>Zadej přímo dole <strong>do příkazového řádku</strong> (terminálu s <code>&gt;&gt;&gt;</code>) tyto dva příkazy. Tím druhým si jako by hodíš hrací kostkou s čísly 1 až 6:</p>
          <PythonSnippet code={`>>> import random\n>>> random.randint(1, 6)`} />
          <p>Počítač ti odpoví nějakým číslem, například <code>5</code>. A když příkaz s randint zopakuješ, odpoví ti možná <code>3</code> a pak <code>6</code>.</p>
          <p className="text-fuchsia-700">Slovo <strong>random</strong> znamená anglicky náhodný. Zkus to napsat vícekrát za sebou a porovnej svoje čísla s tím, jaká padají sousedovi.</p>
        </TaskCard>

        <TaskCard number="4" title="Kostka.py" taskId="4" showTeacher={teacherMode} teacherNote={<p>Od 4. úlohy už žáci opět vytvářejí soubory (programy), nikoliv jen řádky v terminálu. Důležité je ukázat jim proměnnou <code>n</code>, do které se náhodné číslo musí uložit, abychom ho mohli vytisknout v dalším příkazu!</p>}>
          <p>Založ nový soubor <code>kostka.py</code> a náhodné číslo z kostky si v něm zkus uložit do paměti (proměnné <code>n</code>), abys ho následně mohl zakomponovat do věty.</p>
          <p>Program spusť vícekrát za sebou (klávesou F5) a sleduj, jak se výsledek mění:</p>
          <PythonSnippet code={`import random\n\nn = random.randint(1, 6)\nprint('Na kostce padla', n)`} />
        </TaskCard>

        <TaskCard number="5" title="Hod podprogramem" taskId="5" showTeacher={teacherMode} teacherNote={<p>Chceme zabalit házení kostkou do podprogramu, aby se hody daly jednoduše vícekrát zopakovat. Očekávané řešení bez použití cyklu je 10x napsat volání podprogramu <code>hod_kostkou()</code> pod sebe (copy-paste).</p>}>
          <p>Uprav předchozí program <code>kostka.py</code> tak, že tvůj kód zabalíš do definice nového podprogramu s názvem <code>hod_kostkou()</code>. Poté ho desetkrát zavolej, abys rovnou nasimuloval sérii deseti hodů!</p>
          <PythonSnippet code={`import random\n\ndef hod_kostkou():\n    n = random.randint(1, 6)\n    print('Na kostce padla', n)\n\nhod_kostkou()\nhod_kostkou()\n...`} />
        </TaskCard>

        <TaskCard number="6" title="Dračí doupě" taskId="6" showTeacher={teacherMode} teacherNote={<p>Úprava pouhého jednoho čísla v parametrech randint: <code>n = random.randint(1, 20)</code></p>}>
          <p>Uprav svůj program tak, aby místo klasické šestistěnné kostky simuloval hod speciální dvacetistěnnou kostkou (jakou hrají hráči Dračího doupěte či D&D). Padat ti tedy bude cokoli od 1 do 20!</p>
        </TaskCard>

        <TaskCard number="7*" title="Kostka s nulou a jedničkou" taskId="7" showTeacher={teacherMode} teacherNote={<p>Rozsah <code>randint(0, 1)</code>.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Představ si podivnou kostku, která má na 3 svých stěnách číslo 0 a na zbylých třech stěnách má číslo 1 (takže šance na 0 i 1 je přesně poloviční, jako bys házel mincí!).</p>
          <p>Uprav podprogram, aby simuloval hody takovouto kostkou.</p>
        </TaskCard>

        <TaskCard number="8*" title="Jen sudá čísla" taskId="8" showTeacher={teacherMode} teacherNote={<p>Zde se žáci poprvé setkávají s matematickou operací provedenou <strong>nad vygenerovaným náhodným číslem</strong>! Řešení je vygenerovat normální číslo 1 až 6, a poté ho vynásobit dvěma: <code>n = random.randint(1, 6) * 2</code>. Takže místo 1 padne 2, místo 3 padne 6, atd.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Máme "sudou" hrací kostku, která má na svých šesti stěnách čísla 2, 4, 6, 8, 10 a 12. Uprav podprogram tak, aby simuloval tuto kostku.</p>
          <p className="text-fuchsia-700">Poradím ti: Nemůžeš použít čistý <code>randint(2, 12)</code>, protože z toho by ti vypadla třeba i sedmička (ta na kostce vůbec není). Musíš vymyslet, jak to udělat tak, že nejdříve hodíš normální kostkou (1 až 6) a to vylosované číslo poté nějakým matematickým vzorečkem upravíš!</p>
        </TaskCard>

        <TaskCard number="9*" title="A co lichá kostka?" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení vychází ze sudé: <code>n = random.randint(1, 6) * 2 - 1</code>. Když žák vymyslí sudou řadu, lichou prostě jen o jedničku sníží.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>A jak by se asi naprogramovala "lichá" hrací kostka, která má na šesti stěnách tato čísla: 1, 3, 5, 7, 9 a 11? Uprav svůj program, abys dostával vždy jen tato čísla.</p>
        </TaskCard>

        <TaskCard number="10*" title="Kostka z jiné galaxie" taskId="10" showTeacher={teacherMode} teacherNote={<p>Na stěnách má čísla 1, 4, 9, 16, 25, 36. Jsou to druhé mocniny (x na druhou). Tedy řešení je <code>n = random.randint(1, 6) ** 2</code>.</p>}>
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Máme exotickou hrací kostku, která na vás bafne tato zvláštní čísla: 1, 4, 9, 16, 25 nebo 36.</p>
          <p>Zamysli se, co mají tato čísla přesně společného se standardní kostkou 1, 2, 3, 4, 5, 6, a poté uprav program!</p>
        </TaskCard>

        <TaskCard number="11" title="Náhodná předpověď počasí" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení: <code>teplota = random.randint(-15, 35)</code>. Tady už je lepší proměnnou pojmenovat <code>teplota</code> a nikoliv <code>n</code>, aby měl kód smysl.</p>}>
          <p>Napiš program <code>predpoved.py</code> a v něm podprogram <code>predpoved()</code>, který vytiskne naprosto vymyšlenou a náhodnou předpověď počasí. Zpráva by měla vypadat nějak takto:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Dnes bude 15 stupňů.
          </div>
          <p>Číslo stupňů ať program náhodně losuje v intervalu od třeskutých mrazů -15 až po tropických 35 stupňů Celsia.</p>
        </TaskCard>

        <TaskCard number="12" title="Generátor PINu" taskId="12" showTeacher={teacherMode} teacherNote={<p>Cílem je použít více nezávislých generování. <code>a = random.randint(0, 9)</code> a pak b, c, d. Následně vypsat v jednom <code>print</code>.</p>}>
          <p>Vytvoř program <code>pin.py</code>, který ti vygeneruje čtyřmístný náhodný číselný PIN kód pro tvůj mobil.</p>
          <p>Do čtyř různých proměnných (např. <code>a</code>, <code>b</code>, <code>c</code>, <code>d</code>) přiřaď náhodná čísla od 0 po 9 a potom je jediným příkazem <code>print</code> vypiš. Třeba takto:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Tvůj nový PIN je 1 3 7 3
          </div>
        </TaskCard>

        <TaskCard number="13" title="Generátor budoucích dat" taskId="13" showTeacher={teacherMode} teacherNote={<p>Řešení: <code>den = random.randint(1, 30)</code>, měsíc 1-12, rok 2025-2099.</p>}>
          <p>Vytvoř program <code>datumy.py</code>, který ti vygeneruje náhodné datum tvých budoucích povinností (pro jednoduchost nechť má každý z 12 měsíců 30 dní a rok losuj třeba odteď po následujících 50 let). Zpráva by mohla znít takto:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Pokoj si uklidím 30 . 2 . 2025
          </div>
        </TaskCard>

        <TaskCard number="14" title="Náhodné místo na plátně" taskId="14" showTeacher={teacherMode} teacherNote={<p>Program by mohl fungovat i tehdy, kdyby se v parametrech použilo přímo generování. Ale aby kreslil bezpečně <strong>čtverec</strong>, musíme do `x` a `y` uložit hodnotu předem. Kdybychom tam napsali dvakrát po sobě randint do obou pozic, každý roh by to odsadilo o náhodné číslo jiným směrem a vznikl by z toho obdélník!</p>}>
          <p>Pojďme náhodu spojit s naší grafikou! Vytvoř program <code>nahodny_ctverec.py</code>, který vždycky nakreslí oranžový čtverec, jen ho pokaždé prskne na úplně jiné místo!</p>
          <PythonSnippet code={`import tkinter\nimport random\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef nahodny_ctverec():\n    x = random.randint(10, 300)\n    y = random.randint(10, 200)\n    canvas.create_rectangle(x, y, x + 50, y + 50, fill='orange')\n\nnahodny_ctverec()`} />
          <p>Spusť program třikrát po sobě, abys viděl, že se čtverec opravdu objevuje jinde a jinde.</p>
        </TaskCard>

        <TaskCard number="15" title="5 náhodných čtverců" taskId="15" showTeacher={teacherMode} teacherNote={<p>Pouze zavolají podprogram <code>nahodny_ctverec()</code> pod sebe pětkrát.</p>}>
          <p>Doplň do tvého souboru <code>nahodny_ctverec.py</code> příkazy tak, aby program po zapnutí nakreslil sám od sebe <strong>pět</strong> náhodných čtverců. Bude stačit pět těch stejných volání pod sebe!</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={40} y1={20} width={30} height={30} fill="orange" />
            <Rect x1={90} y1={30} width={30} height={30} fill="orange" />
            <Rect x1={150} y1={120} width={30} height={30} fill="orange" />
            <Rect x1={180} y1={90} width={30} height={30} fill="orange" />
            <Rect x1={50} y1={160} width={30} height={30} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="16" title="Náhodná velikost" taskId="16" showTeacher={teacherMode} teacherNote={<p>Mění se parametr pro velikost. Nová proměnná: <code>a = random.randint(10, 100)</code> a nakreslí se přes <code>x, y, x+a, y+a</code>.</p>}>
          <p>Uprav svůj podprogram <code>nahodny_ctverec()</code> tak, aby nejen vybral náhodné místo (x, y), ale aby si do třetí proměnné (např. <code>a</code>) vybral i <strong>náhodnou velikost</strong> v intervalu od 10 do 100! Tu pak musíš použít při kreslení.</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={120} y1={20} width={50} height={50} fill="orange" />
            <Rect x1={30} y1={150} width={25} height={25} fill="orange" />
            <Rect x1={180} y1={110} width={40} height={40} fill="orange" />
            <Rect x1={160} y1={140} width={30} height={30} fill="orange" />
            <Rect x1={200} y1={70} width={35} height={35} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="17" title="Invaze obdélníků" taskId="17" showTeacher={teacherMode} teacherNote={<p>Vznikne kopie původního podprogramu, jen tam navíc žáci dají ještě proměnnou <code>b</code> na náhodnou výšku, aby tvary byly natažené. Následně se programy střídavě 10x volají.</p>}>
          <p>Doplň do svého programu ještě druhý velký podprogram a pojmenuj ho <code>nahodny_obdelnik()</code>. Bude to velká kopírovačka z toho původního se čtvercem, akorát si v něm musíš z losování vytáhnout i novou náhodnou proměnnou pro jinou výšku. A barvu si dej třeba brčálově zelenou (<code>'limegreen'</code>).</p>
          <p>Na úplném konci souboru napiš celkem 10 volání – ať padá jeden oranžový čtverec a jeden zelený obdélník pořád dokola!</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={20} y1={20} width={15} height={40} fill="limegreen" />
            <Rect x1={60} y1={40} width={50} height={50} fill="orange" />
            <Rect x1={80} y1={20} width={40} height={70} fill="limegreen" />
            <Rect x1={40} y1={100} width={40} height={40} fill="orange" />
            <Rect x1={100} y1={90} width={60} height={60} fill="orange" />
            <Rect x1={150} y1={50} width={45} height={45} fill="orange" />
            <Rect x1={230} y1={70} width={40} height={50} fill="limegreen" />
            <Rect x1={70} y1={130} width={50} height={30} fill="limegreen" />
            <Rect x1={160} y1={110} width={30} height={30} fill="orange" />
            <Rect x1={200} y1={120} width={20} height={60} fill="limegreen" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="18" title="Sportovní vlajka" taskId="18" showTeacher={teacherMode} teacherNote={<p>Úloha demonstruje použití vygenerovaného náhodného středu k vytvoření 4 vzájemně přiléhajících geometrických oblastí. Úloha používá <code>[10, 10]</code> a <code>[310, 210]</code> (300x200 vnějšek). Bod dotyku je aspoň 50px od každé hrany, takže <code>random.randint(60, 260)</code>.</p>}>
          <p>Vytvoř nový program <code>sportovni_vlajka.py</code>, který bude na obrazovku kreslit vlajku tvořenou 4 barevnými obdélníky. Specialita je v tom, že se všechny tyto 4 obdélníky dotýkají v jenom společném vnitřním bodě (jako kříž, akorát posunutý!).</p>
          <p>Tento středový bod dotyku se <strong>při každém spuštění vybere náhodně</strong>, takže i ty 4 barevné pruhy se budou pokaždé jinak natahovat a zmenšovat!</p>
          <CanvasPreview width={300} height={200} className="border-4 border-slate-700 border-none bg-white">
            <Rect x1={10} y1={10} width={130} height={80} fill="darkgreen" />
            <Rect x1={140} y1={10} width={160} height={80} fill="yellow" />
            <Rect x1={10} y1={90} width={130} height={110} fill="orange" />
            <Rect x1={140} y1={90} width={160} height={110} fill="navy" />
          </CanvasPreview>
          <p>Levý horní okraj celé naší vlajky je v <code>[10, 10]</code> a má být velká 300x200 pixelů. Proto bod křížení <code>[x,y]</code> vybírej tak, aby nebyl úplně u hran (losuj třeba <code>x</code> od 50 do 250 a <code>y</code> od 50 do 150)!</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonRandomChapter;
