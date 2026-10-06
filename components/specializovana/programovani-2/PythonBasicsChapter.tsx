'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Terminal, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonBasicsChapterProps {
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
        ) : line.startsWith('SyntaxError') || line.startsWith('Traceback') || line.startsWith('File') || line.startsWith('NameError') || line.startsWith('ZeroDivisionError') ? (
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
  const [done, setDone] = useLocalStorage(`py1-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonBasicsChapter: React.FC<PythonBasicsChapterProps> = ({ onBack }) => {
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
      title="Výpisy"
      subtitle="Lekce 1"
      icon={<Terminal className="w-8 h-8 text-indigo-600" />}
      onBack={onBack}
      accentColor="indigo"
      tabs={[{ id: 'lekce', label: 'Lekce 1', icon: Code }]}
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
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode}>
          <p>Najdi na počítači ikonu programu Python a spusť jej.</p>
          <p>Když se program spustí, uvidíš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Python 3.6.4 (default, Jan  5 2018, 02:04:42)<br/>
[GCC 5.4.0 20160609] on linux<br/>
Type "copyright", "credits" or "license()" for more information.<br/>
{">>>"} |
          </div>
          <p className="text-sm italic text-slate-500">sem budeš zapisovat příkazy</p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode}>
          <p>Zkus za <code>{">>>"}</code> napsat matematický výraz <code>1 + 2 + 3</code> a potvrď klávesou Enter. Co Python odpoví?</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode}>
          <p>Python dokáže fungovat jako kalkulačka. Jaké budou výsledky následujících výrazů?</p>
          <PythonSnippet code={`>>> 123\n>>> 42 - 17\n>>> 3 + 4 * 5\n>>> (3 + 4) * 5\n>>> 25 - 7 - 10\n>>> 25 - (7 - 10)\n>>> 132 / 11\n>>> 1 / 2\n>>> 1 + 2 * 3 / (5 - 1)`} />
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode}>
          <p>Pozor, zápisy musí být napsané zcela správně. Jinak uvidíš různá chybová hlášení. Co se stane, pokud zadáš následující příkazy?</p>
          <PythonSnippet code={`>>> 22 + 7 *\n>>> 19 - (3 4)`} />
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode}>
          <p>Někdy se však i po správném zápise může objevit chybové hlášení. Co se stane, pokud zadáš <code>10 / (6 - 2 * 3)</code> ?</p>
          <p>Python se ti chybovými hlášeními snaží pomoci, abys chybu snadněji našel. Například:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><code>SyntaxError: invalid syntax</code> označuje, že jsi něco napsal nesprávně</li>
            <li><code>ZeroDivisionError: division by zero</code> oznamuje, že chceš dělit nulou</li>
          </ul>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode}>
          <p>Petrovi bylo přesně před dvěma měsíci 16 let. Využij Python jako kalkulačku a spočítej, kolik je mu nyní přibližně dní. Předpokládej, že rok má 365 dní a měsíc má 30 dní.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode}>
          <p>Pokračuj v předchozí úloze a pomocí Pythonu vypočítej:</p>
          <ul className="list-none pl-5 mt-2 space-y-1">
            <li>a) kolik je to hodin,</li>
            <li>b) kolik je to sekund.</li>
          </ul>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode}>
          <p>Použij znovu Python jako kalkulačku a vytvoř pro něj zápis, pomocí kterého vypočítá součet všech lichých čísel od 1 do 19. Jaký bude výsledek?</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode}>
          <p>Zjisti, která číslice se vyskytuje nejčastěji ve výsledku výrazu:</p>
          <PythonSnippet code={`123456789 * 111111111111111111111`} />
          <p>Nejčastější číslici snadno poznáš pohledem na výsledek spočítaného součinu.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode}>
          <p>Lenka sbírala květiny. První den jich natrhala 15, druhý den jich natrhala o 4 více než předcházející den a třetí den jich natrhala ještě o 1 více než v oba předcházející dny dohromady. Použij Python jako kalkulačku a vypočítej, kolik květin natrhala za všechny 3 dny dohromady.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode}>
          <p>Jirka si koupil hru za 79 korun. Později si koupil hru za dvojnásobek této ceny a ještě k tomu připlatil 5 korun. Nakonec si koupil hru za trojnásobek ceny druhé hry a ještě k tomu připlatil 17 korun. Použij Python jako kalkulačku a vypočítej:</p>
          <ul className="list-none pl-5 mt-2 space-y-1">
            <li>a) kolik Jirka zaplatil za třetí hru</li>
            <li>b) kolik Jirka zaplatil za všechny tři hry dohromady</li>
            <li>c*) vymysli co nejkratší zápis, kterým lze úkoly z a) a b) vypočítat</li>
          </ul>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode}>
          <p>Použij Python jako kalkulačku a vypočítej součet následujících čísel: jedna, jedna polovina, jedna třetina, jedna čtvrtina, ..., až jedna desetina.</p>
        </TaskCard>

        <TaskCard number="13" title="" taskId="13" showTeacher={teacherMode}>
          <p>Do sešitu si vytvoř tabulku, do níž zapiš všechny aritmetické operace, se kterými jsme se zatím v Pythonu seznámili.</p>
        </TaskCard>

        <TaskCard number="14*" title="" taskId="14" showTeacher={teacherMode}>
          <p>14* Výpočet <code>2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2</code> je umocnění 2 na 10. V Pythonu se toto zapisuje jako: <code>2 ** 10</code>. Tipni si, kolik číslic bude ve výsledku umocnění 2 na 30. Poté použij Python jako kalkulačku, vypočítej pomocí něho 2 umocněno na 30 a ručně spočítej počet číslic ve výsledku. Byl tvůj odhad správný?</p>
        </TaskCard>

        <TaskCard number="15*" title="" taskId="15" showTeacher={teacherMode}>
          <p>15* Zjisti, jak se počítá hodnota <code>2 ** 8 - 1</code>. Tedy zda se nejdříve vypočítá mocnina <code>2 ** 8</code>, od které se odečte 1, nebo se nejdříve vypočítá rozdíl <code>8 - 1</code> a touto hodnotou se potom umocní číslo 2. Zjisti, jak je to s operacemi násobení a umocňování – tedy jak se počítají výrazy <code>3 * 2 ** 5</code> a <code>2 ** 5 * 3</code>.</p>
        </TaskCard>

        <TaskCard number="16*" title="" taskId="16" showTeacher={teacherMode}>
          <p>16* Matematici vědí, že když sečtou několik za sebou jdoucích mocnin čísla 2 počínaje 2 na 0, dostanou jinou mocninu čísla 2 zmenšenou o 1. Zkontroluj, zda součet čísel <code>2 ** 0, 2 ** 1, 2 ** 2, … 2 ** 9</code> dává hodnotu <code>2 ** 10 - 1</code>.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonBasicsChapter;
