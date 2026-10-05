'use client';
import React, { useState } from 'react';
import { Terminal, CheckCircle, GraduationCap, Unlock, Lock, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonProgramChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-rose-500 mr-2 select-none">{">>>"}</span>
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
  <div className="mt-4 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-rose-600" />
      <span className="font-bold text-rose-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-rose-900 leading-relaxed">
      {children}
    </div>
  </div>
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
  const [done, setDone] = useLocalStorage(`py3-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonProgramChapter: React.FC<PythonProgramChapterProps> = ({ onBack }) => {
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
      title="První program"
      subtitle="Výpisy do konzole a uložení kódu (iMyšlení Lekce 3)"
      icon={<Code className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-rose-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-rose-900 text-lg mb-2">Instrukce</h2>
          <p className="text-rose-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dosud jsme pracovali v "interaktivním režimu" jako s kalkulačkou. Dnes se ale konečně naučíme počítači něco vypsat zpět do okna pomocí příkazu <code>print</code>, a dokonce si poprvé <strong>uložíme celý soubor s programem</strong>.
          </p>
        </div>

        <TaskCard 
          number="1" 
          title="Náš nový příkaz" 
          taskId="2"
          showTeacher={teacherMode}
          teacherNote={<p>Příkaz <code>print</code> slouží k vypisování textů a hodnot. V materiálech budeme pro texty používat výhradně apostrofy, ačkoliv uvozovky fungují úplně stejně (nechceme žáky plést dvěma možnostmi). Také jim ukažte, že žluté značky ukázek v PDF jsou klávesy poblíž Enteru.</p>}
        >
          <p>Vyzkoušej náš nový příkaz. Co vykoná?</p>
          <PythonSnippet code={`>>> print('Ahoj, já jsem počítač')`} />
          <p>Tento příkaz slouží na vypisování textů. Všimni si <strong>apostrofů</strong> (to jsou takové ty horní čárky okolo textu, najdeš je na klávesnici vpravo nahoře). Říkají Pythonu: „Tohle je přesně ten text, který chci, abys vypsal, nepočítej v něm nic.“</p>
          <p>Teď zkus vypsat jména dvou svých kamarádů, například:</p>
          <PythonSnippet code={`>>> print('Moji kamarádi jsou Vašek a Jana.')`} />
        </TaskCard>

        <TaskCard 
          number="2" 
          title="Print počítá" 
          taskId="4"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Žáci by měli přijít na tyto poznatky:</p>
              <ul className="list-disc pl-5">
                <li>Obyčejné výrazy v print se vyhodnotí a zobrazí se výsledek (7).</li>
                <li>To, co je v apostrofech, počítač nevyhodnocuje, bere to jako pouhý text (<code>1 + 2 * 3</code>).</li>
                <li>Bez parametrů <code>print()</code> vytiskne jen prázdný řádek.</li>
              </ul>
            </div>
          }
        >
          <p>Zjisti, co přesně Python vypíše v případě následujících tří příkazů. Velmi se od sebe liší!</p>
          <PythonSnippet code={`>>> print(1 + 2 * 3)\n>>> print('1 + 2 * 3')\n>>> print()`} />
          <p>Vidíš ten rozdíl? Pokud výraz není mezi apostrofy, Python ho nejprve spočítá a vypíše výsledek.</p>
        </TaskCard>

        <TaskCard 
          number="3" 
          title="Více věcí najednou" 
          taskId="5"
          showTeacher={teacherMode}
          teacherNote={<p>Cílem je zjistit, že v příkazu <code>print</code> mohou uvést více textů a hodnot, které se postupně vypíší oddělené automatickou mezerou.</p>}
        >
          <p>Příkaz <code>print</code> umí vypsat víc věcí na jeden řádek. Jen je musíš oddělit čárkou. Co způsobí čárka v jednotlivých příkazech?</p>
          <PythonSnippet code={`>>> print('Mám rád', 'kapustu')\n>>> print('Moje oblíbené číslo je', 42)\n>>> print('Do školy jsem šel', 2 * 10, 'minut')`} />
        </TaskCard>

        <TaskCard 
          number="4" 
          title="Chybová hlášení" 
          taskId="7"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Další úlohy jsou zaměřené na chybové zprávy, aby se žáci postupně naučili, co znamenají.</p>
              <ul className="list-disc pl-5">
                <li>Chybějící apostrof vyvolá <code>SyntaxError: EOL while scanning string literal</code></li>
                <li>Při chybějících apostrofech je "Ahoj" bráno jako proměnná a vyvolá <code>NameError</code></li>
                <li>Chybějící závorky vyvolají <code>SyntaxError: Missing parentheses in call to 'print'</code></li>
              </ul>
            </div>
          }
        >
          <p>Prozkoumej chybová hlášení počítače, pokud se sekneš a něco nenapíšeš správně. Sleduj rudé chyby.</p>
          <PythonSnippet code={`>>> print('Ahoj)\n>>> print(Ahoj)\n>>> print 'Ahoj'\n>>> print('Ahoj' 10)`} />
        </TaskCard>

        <TaskCard 
          number="5" 
          title="Ukládáme náš první program!" 
          taskId="8"
          showTeacher={teacherMode}
          teacherNote={
            <p>Od tohoto okamžiku přecházíme z interaktivní konzole (IDLE Shell / Thonny Shell) do <strong>Editoru</strong>. Upozorněte žáky, že nyní píšou kód, který se nevykoná hned po stisku Enter. Vykoná se až ve chvíli, kdy kliknou na tlačítko "Run" (nebo dají F5). Je vhodné dohodnout se na vytvoření složky např. na ploše <code>Python/Lekce3</code> a učit je od začátku pořádek.</p>
          }
        >
          <p>Zatím jsi pracoval v interaktivním režimu. To je sice fajn kalkulačka, ale ty teď napíšeš <strong>skutečný program</strong>, který se rovnou celý uloží na disk a pak ho půjde spustit kdykoliv znovu.</p>
          <p>Postup pro Thonny / IDLE:</p>
          <ul className="list-decimal pl-5 space-y-1 mb-4">
            <li>V hlavní nabídce nahoře klikni na <code>File</code> a dej <code>New File</code>. Tím se ti otevře nové čisté okno pro skript.</li>
            <li>Napiš do něj tyto tři příkazy pod sebe:</li>
          </ul>
          <PythonSnippet code={`print('Ahoj')\nprint('Pozdravuje tě Python')\nprint('Dnes je středa')`} />
          <ul className="list-decimal pl-5 space-y-1 mt-4">
            <li>Ulož to! Dej <code>File</code> ➜ <code>Save</code> a najdi si složku (třeba na Ploše vytvoř složku <code>Python_Lekce3</code>). Soubor nazvi <code>prvni.py</code>.</li>
            <li>A teď ho spusť! Klikni nahoře na <code>Run</code> ➜ <code>Run Module</code> (nebo stiskni <strong>F5</strong>).</li>
          </ul>
          <p className="mt-4 font-bold text-rose-600">Sleduj konzoli (Shell) – objevily se všechny tři zprávy naráz?</p>
        </TaskCard>

        <TaskCard 
          number="6" 
          title="Básnička" 
          taskId="10"
          showTeacher={teacherMode}
          teacherNote={<p>Je na vás, zda žáky necháte vytvářet stále nový a nový soubor (<code>File - New File</code>), nebo přepisovat ten stávající (<code>Save As...</code>). Pro grafické aplikace v budoucnu bude lepší přepisovat a kopírovat existující kódy, ale pro malé úlohy se doporučuje nový soubor pro čistotu.</p>}
        >
          <p>Vytvoř zbrusu nový program <code>basnicka.py</code>, který vypíše úryvek tvé oblíbené básničky (nebo písničky). Každý verš nech vypsat na nový řádek pomocí příkazu <code>print</code>. Například:</p>
          <PythonSnippet code={`Na topole nad jezerem\nseděl vodník podvečerem:\nSviť, měsíčku, sviť,\nať mi šije niť.`} />
        </TaskCard>

        <TaskCard 
          number="7" 
          title="Textové umění (ASCII Art)" 
          taskId="11"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Při vykreslování složitějších tvarů (např. pomocí \ / |) může dojít ke zmatení speciálními znaky (např. lomítko nazpět je v Pythonu "escape" znak). Pokud do toho žák zabrousí, vysvětlete, že textové znaky jsou někdy složitější. V této úloze ale používáme běžné symboly, takže to bude bez problému.</p>
              <p>Řešení spočívá prostě v hromadě pod sebou naskládaných příkazů <code>print('+----')</code> atd.</p>
            </div>
          }
        >
          <p>Pomocí příkazu <code>print</code> se dají vypisovat i veselé věci. Vytvoř program <code>vizitka.py</code>, který vykreslí tvou vlastní vizitku. Musíš ty znaky do uvozovek hezky zarovnat pomocí mezer. Vypadat by to mělo nějak takto:</p>
          <PythonSnippet code={`+--------------------+\n| www                |\n| Petr     ( o o )   |\n| LEV      (  ~  )   |\n|             "      |\n| Počítačový král    |\n+--------------------+`} />
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonProgramChapter;
