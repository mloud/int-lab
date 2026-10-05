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
  const [done, setLocalStorageDone] = useLocalStorage(`py9-task-${taskId}`, false);
  const doneBool = done === true;

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${doneBool ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-fuchsia-100 text-fuchsia-700 rounded-2xl flex items-center justify-center font-black text-xl">
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
      subtitle="Lekce 9"
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
          <p className="text-fuchsia-800/80 text-sm sm:text-base font-bold">
            První dvě úlohy slouží k opakování podprogramů:
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def cara():</code><br/><code>    print('+--+--+--+--+--+--+')</code><br/><br/><code>def hulky():</code><br/><code>    print('|  |  |  |  |  |  |')</code><br/><br/><code>cara()</code><br/><code>hulky()</code><br/><code>cara()</code><br/><code>hulky()</code><br/><code>cara()</code></p>}>
          <p>1. Nyní budeš vytvářet mřížku. Napiš program <code>mrizka.py</code>, ve kterém definuješ dva podprogramy s příkazy <code>print</code>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>podprogram <code>cara</code> zobrazí v jednom řádku 19 znaků <code>+--+--+--+--+--+--+</code></li>
            <li>podprogram <code>hulky</code> zobrazí střídavě hůlku a dvě mezery tak, aby znaků (včetně mezer) bylo 19.</li>
          </ul>
          <p className="mt-4">Na konci programu zavolej střídavě podprogramy <code>cara</code> a <code>hulky</code> tak, aby se zobrazilo:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre tracking-widest mt-2">
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>def cara():</code><br/><code>    print('+--+--+--+--+--+--+')</code><br/><br/><code>def hulky():</code><br/><code>    print('|  |  |  |  |  |  |')</code><br/><br/><code>def ctvereckovany_papir():</code><br/><code>    cara()</code><br/><code>    hulky()</code><br/><code>    cara()</code><br/><code>    hulky()</code><br/><code>    cara()</code><br/><code>    hulky()</code><br/><code>    cara()</code><br/><code>    hulky()</code><br/><code>    cara()</code><br/><br/><code>ctvereckovany_papir()</code></p>}>
          <p>2. Přidej do předchozího programu ještě jeden podprogram <code>ctvereckovany_papir</code>. Ten využije tvé podprogramy <code>cara</code> a <code>hulky</code> tak, že jejich voláním zobrazí čtvercovou síť jako na obrázku níže. Tento nový podprogram zavolej pro zobrazení sítě.</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre tracking-widest mt-2">
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+<br/>
|  |  |  |  |  |  |<br/>
+--+--+--+--+--+--+
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Cílem dalších úloh je naučit žáky pracovat s náhodnými čísly. V následující úloze žáky necháme experimentovat s generátorem náhodných čísel:<br/><br/>Slovo <code>random</code> znamená náhodný. Při vykonaní příkazu <code>random.randint(1, 6)</code> si počítač vymyslí nějaké číslo od 1 do 6. Je to podobné, jako by si počítač hodil hrací kostkou.</p>}>
          <p>3. Zadej do příkazového řádku tyto příkazy:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-fuchsia-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-fuchsia-500 mr-2 select-none">{">>>"}</span><span className="text-slate-300">import random</span></div>
            <div><span className="text-fuchsia-500 mr-2 select-none">{">>>"}</span><span className="text-slate-300 bg-yellow-500/20 px-1">random.randint(1, 6)</span></div>
          </div>
          <p>Počítač zobrazí nějaké číslo, například:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">5</div>
          <p>Nech vykonat příkaz <code>random.randint(1, 6)</code> několikrát. Diskutuj se svým spolužákem, jaká čísla počítač zobrazil tobě a jemu.</p>
          <PythonSnippet code={`>>> random.randint(1, 6)\n6\n>>> random.randint(1, 6)\n4\n>>> random.randint(1, 6)\n4`} />
          <p>Slovo <code>random</code> znamená <span className="text-blue-600">náhodný</span>. Při vykonaní příkazu <code>random.randint(1, 6)</code> si počítač vymyslí nějaké číslo od <code>1</code> do <code>6</code>. Je to podobné, jako by si počítač hodil hrací kostkou.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>V této úloze žáci pracují v interaktivním režimu. Pokud někteří z nich budou ze zvyku vytvářet nový program, upozorníme je na tento omyl. Úloha je řešena v interaktivním režimu proto, že činnost generátoru náhodných čísel se nejlépe projeví, když jej vyvoláme vícekrát. Od 4. úlohy však budou žáci opět vytvářet programy.<br/><br/>Zápis <code>import random</code> má podobný význam jako už známý zápis <code>import tkinter</code>. Našemu programu zpřístupní externí knihovnu nových příkazů (podprogramů). Knihovna <code>random</code> obsahuje několik užitečných příkazů, které generují náhodná čísla. My z nich prozatím využijeme jen příkaz <code>random.randint(od, do)</code>, který náhodně vybere hodnotu z daného intervalu celých čísel <code>&lt;od, do&gt;</code>.<br/><br/>Proměnná <code>n</code> je zde globální proměnnou.</p>}>
          <p>4. Náhodné číslo si můžeš zapamatovat – napiš program <code>kostka.py</code> s následujícím kódem a spusť jej (i vícekrát):</p>
          <PythonSnippet code={`import random\nn = random.randint(1, 6)\nprint('Na kostce padla', n)`} />
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Dále chceme zabalit házení kostkou do podprogramu, aby se hody kostkou daly jednoduše vícekrát zopakovat. Z pohledu žáka jsou v následující ukázce dva nové jevy: použití proměnné v podprogramu (tj. lokální proměnná <code>n</code>) a použití náhodných čísel v podprogramu.<br/><br/>Řešení bez použití cyklu (tj. copy-paste):<br/><code>import random</code><br/><br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(1, 6)</code><br/><code>    print('Na kostce padla', n)</code><br/><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><code>hod_kostkou()</code><br/><br/>Pojmy lokální a globální proměnná zatím není potřeba žáky učit. Plánujeme řešit jen takové úlohy, ve kterých by se neměly vyskytnout konflikty s proměnnými.<br/>Z pohledu Pythonu lokální proměnná existuje pouze při běhu podprogramu, tj. vznikne až po zavolání podprogramu. Po skončení běhu podprogramu tato proměnná dále neexistuje (automaticky se zruší).</p>}>
          <p>5. Uprav program <code>kostka.py</code> – vytvoř podprogram <code>hod_kostkou</code> a doplň kód programu tak, aby se simulovalo deset hodů za sebou:</p>
          <PythonSnippet code={`import random\n\ndef hod_kostkou():\n    n = random.randint(1, 6)\n    print('Na kostce padla', n)\n\nhod_kostkou()`} />
          <p>Měl by se zobrazit výpis podobný následujícímu:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Na kostce padla 5<br/>
Na kostce padla 3<br/>
Na kostce padla 4<br/>
Na kostce padla 1<br/>
Na kostce padla 3<br/>
Na kostce padla 2<br/>
Na kostce padla 1<br/>
Na kostce padla 1<br/>
Na kostce padla 1<br/>
Na kostce padla 3
          </div>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Následují úlohy, ve kterých se žáci lépe seznámí s generátorem náhodných čísel. Ve všech úlohách předpokládáme, že žáci upravené podprogramy zavolají vícekrát, aby je otestovali.<br/><br/>Řešení – upraví se pouze podprogram <code>hod_kostkou</code>:<br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(1, 20)</code><br/><code>    print('Na kostce padla', n)</code></p>}>
          <p>6. Uprav předchozí program tak, aby počítač simuloval jeden hod na dvacetistěnné kostce.</p>
        </TaskCard>

        <TaskCard number="7*" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení – upraví se pouze podprogram <code>hod_kostkou</code>:<br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(0, 1)</code><br/><code>    print('Na kostce padla', n)</code></p>}>
          <p>7* Máme hrací kostku, na níž jsou jen dvě hodnoty – na třech stěnách je číslo 0 a zbylých třech je číslo 1. Uprav předchozí program, aby simuloval hod takovou kostkou.</p>
        </TaskCard>

        <TaskCard number="8*" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení – upraví se pouze podprogram <code>hod_kostkou</code>:<br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(1, 6) * 2</code><br/><code>    print('Na kostce padla', n)</code><br/><br/>V této úloze se žáci poprvé setkávají s výpočty založenými na náhodně vygenerované hodnotě, což může některým žákům činit potíže. Pokud to bude potřeba, je vhodné se žáky individuálně diskutovat o tom, jak by bylo možno řadu požadovaných čísel (např. 2, 4, ... 12) vytvořit na základě řady čísel 1 až 6. Lze použít například následující postup:<br/>• V prvním kroku necháme žáka napsat na papír do sloupce čísla, která se mají vypsat (tj. 2, 4, ... 12) a vedle nich do druhého sloupce čísla, která jsme schopni generovat pomocí příkazu <code>random.randint</code> (tj. 1 až 6).<br/>• Ve druhém kroku se žáka zeptáme, zda čísla v jednotlivých řádcích nemají „něco společného“. Žák by měl objevit souvislost mezi čísly, tj. že číslo ve druhém sloupci se rovná dvojnásobku čísla v prvním sloupci.<br/>• Následně by měl žák úvahu zobecnit a odvodit potřebný vzorec <code>random.randint(1, 6) * 2</code>, který použije ve svém programu.</p>}>
          <p>8* Máme „sudou“ hrací kostku, která má na stěnách čísla 2, 4, 6, 8, 10, 12. Uprav předchozí program, aby simuloval hod takovou kostkou.</p>
        </TaskCard>

        <TaskCard number="9*" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení – upraví se pouze podprogram <code>hod_kostkou</code>:<br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(1, 6) * 2 - 1</code><br/><code>    print('Na kostce padla', n)</code></p>}>
          <p>9* Máme „lichou“ hrací kostku, která má na stěnách čísla 1, 3, 5, 7, 9, 11. Uprav předchozí program, aby simuloval hod takovou kostkou.</p>
        </TaskCard>

        <TaskCard number="10*" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení – upraví se pouze podprogram <code>hod_kostkou</code>:<br/><code>def hod_kostkou():</code><br/><code>    n = random.randint(1, 6) ** 2</code><br/><code>    print('Na kostce padla', n)</code><br/><br/>Pokud budou mít žáci s řešením problémy, je potřeba s nimi řešení diskutovat a učit je výrazy sestavovat podobně, jako jsme ukázali v 8. úloze.</p>}>
          <p>10* Máme exotickou hrací kostku, která má na stěnách čísla 1, 4, 9, 16, 25, 36. Uprav předchozí program, aby simuloval hod takovou kostkou.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Možné řešení:<br/><code>import random</code><br/><br/><code>def predpoved():</code><br/><code>    teplota = random.randint(-15, 35)</code><br/><code>    print('Dnes bude', teplota, 'stupňů.')</code><br/><br/><code>predpoved()</code><br/><br/>V 5. úloze této lekce jsme žákům ukázali uložení náhodně vygenerované hodnoty do proměnné, kterou jsme nazvali <code>n</code>. Zatímco ve všech předchozích úlohách bylo uložení vygenerované hodnoty do takto nazvané proměnné v pořádku, v této úloze je vhodnější nazvat proměnnou výstižněji, například <code>teplota</code>. Díky tomu bude na první pohled zřejmý význam této proměnné.</p>}>
          <p>11. Napiš program <code>predpoved.py</code> a v něm podprogram <code>predpoved</code>, který vypíše zprávu s předpovědí počasí na dnešní den. Zpráva může vypadat například takto:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Dnes bude 15 stupňů.
          </div>
          <p>Jako číselný údaj program zvolí náhodné celé číslo od -15 do 35.</p>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><br/><code>a = random.randint(0, 9)</code><br/><code>b = random.randint(0, 9)</code><br/><code>c = random.randint(0, 9)</code><br/><code>d = random.randint(0, 9)</code><br/><code>print('Tvůj nový PIN je', a, b, c, d)</code></p>}>
          <p>12. Vytvoř program <code>pin.py</code>, který vygeneruje náhodný PIN pro tvůj mobil. Do čtyř proměnných <code>a</code>, <code>b</code>, <code>c</code>, <code>d</code> přiřaď náhodná čísla od 0 po 9 a potom je jediným příkazem <code>print</code> vypiš. Výpis může vypadat například takto:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Tvůj nový PIN je 1 3 7 3
          </div>
        </TaskCard>

        <TaskCard number="13" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Možné řešení s použitím proměnných:<br/><code>import random</code><br/><br/><code>den = random.randint(1, 30)</code><br/><code>mesic = random.randint(1, 12)</code><br/><code>rok = random.randint(2018, 2099)</code><br/><code>print('Pokoj si uklidím', den, '.', mesic, '.', rok)</code><br/><br/>Možné řešení bez použití proměnných:<br/><code>import random</code><br/><br/><code>print('Pokoj si uklidím',</code><br/><code>      random.randint(1, 30), '.',</code><br/><code>      random.randint(1, 12), '.',</code><br/><code>      random.randint(2018, 2099))</code><br/><br/>Uvedené výpisy se některým žákům nemusí líbit, protože vypisované tečky ve vygenerovaném datu jsou od čísel oddělené mezerami. Pokročilejší formátování výstupů je náročnější téma a přesahuje možnosti tohoto kurzu. Žáky, vzhledem k jejich současným programátorským zkušenostem, však alternativní zápisy nedoporučujeme učit.</p>}>
          <p>13. Vytvoř nový program <code>datumy.py</code> – generátor náhodných datumů (pro jednoduchost nechť má každý měsíc 30 dní). Po spuštění program vypíše informaci s vygenerovaným náhodným datem, například:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Pokoj si uklidím 30 . 2 . 2025
          </div>
        </TaskCard>

        <TaskCard number="14" title="" taskId="14" showTeacher={teacherMode} teacherNote={<p>V následujících úlohách se kombinuje kreslení a náhodná čísla:<br/><br/>Pokud je náhodně vygenerovaná hodnota použita pouze jednou jako v předchozích úlohách, je možné ji použít, aniž by byla uložena do proměnné. Když však tuto hodnotu chceme použít opakovaně, je nutné ji uložit do proměnné. To je typicky případ generování náhodných souřadnic v úlohách zaměřených na kreslení. Pokud bychom například v této úloze neuložili souřadnice do proměnných <code>x</code> a <code>y</code>, ale tělo podprogramu <code>nahodny_ctverec</code> zapsali s násobným voláním <code>randint</code>, velmi pravděpodobně by se nakreslil obdélník (každá souřadnice by se generovala zvlášť).</p>}>
          <p>14. Vytvoř nový program <code>nahodny_ctverec.py</code>, ve kterém pomocí následujícího kódu nakreslíš náhodně umístěný čtverec:</p>
          <PythonSnippet code={`import tkinter\nimport random\n\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef nahodny_ctverec():\n    x = random.randint(10, 300)\n    y = random.randint(10, 200)\n    canvas.create_rectangle(x, y, x + 50, y + 50,\n                            fill='orange')\n\nnahodny_ctverec()`} />
        </TaskCard>

        <TaskCard number="15" title="" taskId="15" showTeacher={teacherMode} teacherNote={<p>Domníváme se, že je vhodnější, aby si žáci náhodně vygenerovanou hodnotu vždy ukládali do proměnné. Ačkoliv je tento přístup zdlouhavější, je univerzálnější a při vhodném pojmenování proměnných je kód též srozumitelnější.<br/><br/>Řešení – upraví se pouze volání podprogramu:<br/><code>nahodny_ctverec()</code><br/><code>nahodny_ctverec()</code><br/><code>nahodny_ctverec()</code><br/><code>nahodny_ctverec()</code><br/><code>nahodny_ctverec()</code></p>}>
          <p>15. Doplň do programu <code>nahodny_ctverec.py</code> příkazy tak, aby program nakreslil pět náhodných čtverců:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={60} y1={30} width={40} height={40} fill="orange" />
            <Rect x1={130} y1={40} width={40} height={40} fill="orange" />
            <Rect x1={180} y1={90} width={40} height={40} fill="orange" />
            <Rect x1={150} y1={120} width={40} height={40} fill="orange" />
            <Rect x1={50} y1={140} width={40} height={40} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="16" title="" taskId="16" showTeacher={teacherMode} teacherNote={<p>Řešení – upraví se pouze podprogram <code>nahodny_ctverec</code>:<br/><code>def nahodny_ctverec():</code><br/><code>    x = random.randint(10, 300)</code><br/><code>    y = random.randint(10, 200)</code><br/><code>    a = random.randint(10, 100)</code><br/><code>    canvas.create_rectangle(x, y, x + a, y + a, fill='orange')</code><br/><br/>Poznámka: Proměnné <code>x</code>, <code>y</code>, <code>a</code> jsou lokální proměnné. Proměnná <code>canvas</code> je globální proměnná.</p>}>
          <p>16. Uprav program <code>nahodny_ctverec.py</code> tak, aby se čtverce kreslily nejen na náhodných pozicích, ale také aby měl každý čtverec náhodnou velikost z intervalu od 10 do 100:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={150} y1={20} width={60} height={60} fill="orange" />
            <Rect x1={40} y1={100} width={35} height={35} fill="orange" />
            <Rect x1={220} y1={70} width={40} height={40} fill="orange" />
            <Rect x1={200} y1={90} width={25} height={25} fill="orange" />
            <Rect x1={180} y1={100} width={50} height={50} fill="orange" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="17" title="" taskId="17" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def nahodny_ctverec():</code><br/><code>    x = random.randint(10, 300)</code><br/><code>    y = random.randint(10, 200)</code><br/><code>    a = random.randint(10, 100)</code><br/><code>    canvas.create_rectangle(x, y, x + a, y + a, fill='orange')</code><br/><br/><code>def nahodny_obdelnik():</code><br/><code>    x = random.randint(10, 300)</code><br/><code>    y = random.randint(10, 200)</code><br/><code>    a = random.randint(10, 100)</code><br/><code>    b = random.randint(10, 100)</code><br/><code>    canvas.create_rectangle(x, y, x+a, y+b, fill='lime green')</code><br/><br/><code>nahodny_ctverec()</code><br/><code>nahodny_obdelnik()</code><br/><code>... (10 volání)</code><br/><br/>Podprogram <code>nahodny_obdelnik</code> zřejmě vznikne jako kopie podprogramu <code>nahodny_ctverec</code>, kterou žáci přejmenují a přidají do ní lokální proměnnou <code>b</code> pro výšku obdélníku. Barvu si mohou zvolit dle vlastního uvážení.</p>}>
          <p>17. Doplň do programu <code>nahodny_ctverec.py</code> nový podprogram <code>nahodny_obdelnik</code>. Ten vygeneruje náhodné souřadnice i rozměry obdélníku a nakreslí jej. Vlož příkazy, které střídavě nakreslí pět náhodných čtverců a pět obdélníků.</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={40} y1={20} width={20} height={60} fill="limegreen" />
            <Rect x1={120} y1={30} width={70} height={70} fill="orange" />
            <Rect x1={90} y1={80} width={60} height={40} fill="limegreen" />
            <Rect x1={250} y1={50} width={50} height={70} fill="limegreen" />
            <Rect x1={70} y1={130} width={45} height={45} fill="orange" />
            <Rect x1={150} y1={90} width={55} height={55} fill="orange" />
            <Rect x1={220} y1={140} width={20} height={50} fill="limegreen" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="18" title="" taskId="18" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = random.randint(50, 250)</code><br/><code>y = random.randint(50, 150)</code><br/><code>canvas.create_rectangle(10, 10, x, y, fill='darkgreen')</code><br/><code>canvas.create_rectangle(x, 10, 310, y, fill='yellow')</code><br/><code>canvas.create_rectangle(10, y, x, 210, fill='orange')</code><br/><code>canvas.create_rectangle(x, y, 310, 210, fill='navy')</code><br/><br/>Vnější vrcholy obdélníku je možné zvolit libovolně. V našem řešení má levý horní vrchol souřadnice [10, 10] a protože rozměry obdélníku mají být 300x200, protilehlý vrchol (pravý dolní) má souřadnice [310, 210]. Vnitřní náhodně zvolený bod jsme vygenerovali tak, aby byl od okrajů obdélníku vzdálen alespoň 50, tedy každá ze čtyř oblastí bude mít rozměry minimálně 50x50.</p>}>
          <p>18. Vytvoř nový program <code>sportovni_vlajka.py</code>, který bude kreslit sportovní vlajku vaší třídy. Vlajka bude tvořena čtyřmi barevnými obdélníky, které se vzájemně dotýkají v jediném bodě jako na obrázku níže:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={50} y1={30} width={150} height={100} fill="darkgreen" />
            <Rect x1={200} y1={30} width={50} height={100} fill="yellow" />
            <Rect x1={50} y1={130} width={150} height={40} fill="orange" />
            <Rect x1={200} y1={130} width={50} height={40} fill="navy" />
          </CanvasPreview>
          <p className="mt-4">Program si náhodně zvolí souřadnice <code>x</code>, <code>y</code>, které představují místo dotyku všech čtyř obdélníků. Vnější rozměry vlajky nechť jsou 300x200; barvy na vlajce si urči podle svého uvážení.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonRandomChapter;
