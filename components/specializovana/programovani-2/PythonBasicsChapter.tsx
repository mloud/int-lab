'use client';
import React, { useState } from 'react';
import { Play, CheckCircle, Terminal, HelpCircle, GraduationCap, Unlock, Lock, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonBasicsChapterProps {
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
        ) : line.startsWith('SyntaxError') || line.startsWith('ZeroDivisionError') ? (
          <span className="text-rose-400">{line}</span>
        ) : (
          <span className="text-slate-300">{line}</span>
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
  const [done, setDone] = useLocalStorage(`py-task-${taskId}`, false);

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
      title="Základy Pythonu"
      subtitle="Výpisy a proměnné (iMyšlení Lekce 1)"
      icon={<Terminal className="w-8 h-8 text-indigo-600" />}
      onBack={onBack}
      accentColor="indigo"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Terminal }]}
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
              teacherMode ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
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
            Otevři si na počítači program <strong>IDLE</strong> nebo <strong>Thonny</strong> a dej si jej na jednu polovinu obrazovky. Na druhou polovinu si dej tento prohlížeč. Všechny úkoly budeme zatím psát přímo do interaktivní konzole (tam, kde vidíš <code>&gt;&gt;&gt;</code>).
          </p>
        </div>

        <TaskCard 
          number="1" 
          title="První krůčky" 
          taskId="1"
          showTeacher={teacherMode}
          teacherNote={<p>Nechme žáky nalézt a spustit programovací prostředí. Cílem je, aby si žáci zvykali na komunikaci s počítačem v interaktivním režimu.</p>}
        >
          <p>Najdi na počítači ikonu programu Python (IDLE) a spusť jej. Když se program spustí, uvidíš podobné okno, které čeká na tvé příkazy za značkou <code>&gt;&gt;&gt;</code>.</p>
        </TaskCard>

        <TaskCard 
          number="2" 
          title="Python jako kalkulačka" 
          taskId="2"
          showTeacher={teacherMode}
          teacherNote={<p>Zde je důležité, aby si žáci zvykli zapisovat příkazy a potvrzovat je klávesou Enter. Mezery okolo operátorů není potřeba psát, ale doporučujeme to – program se provzdušní.</p>}
        >
          <p>Zkus za symboly <code>&gt;&gt;&gt;</code> napsat následující matematický výraz a potvrď klávesou Enter. Co Python odpoví?</p>
          <PythonSnippet code=">>> 1 + 2 + 3" />
        </TaskCard>

        <TaskCard 
          number="3" 
          title="Složitější výpočty" 
          taskId="3"
          showTeacher={teacherMode}
          teacherNote={<p>Nedoporučujeme řešit tyto úlohy dopředu na tabuli. Zde už mohou žáci tvořit chybné zápisy, případně nemusí rychle porozumět, jak počítač výraz vyhodnotil. Cennější je, když toto chování objevují sami.</p>}
        >
          <p>Python dokáže fungovat jako pokročilá kalkulačka a respektuje závorky. Vyzkoušej, jaké budou výsledky následujících výrazů:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PythonSnippet code=">>> 42 - 17" />
            <PythonSnippet code=">>> 3 + 4 * 5" />
            <PythonSnippet code=">>> (3 + 4) * 5" />
            <PythonSnippet code=">>> 25 - (7 - 10)" />
            <PythonSnippet code=">>> 132 / 11" />
            <PythonSnippet code=">>> 1 + 2 * 3 / (5 - 1)" />
          </div>
        </TaskCard>

        <TaskCard 
          number="4" 
          title="Když uděláme chybu" 
          taskId="4"
          showTeacher={teacherMode}
          teacherNote={<p>Žáci by se měli naučit rozpoznávat situace, jak počítač reaguje na nesprávné výrazy. Častou chybou je chybějící operátor před závorkou (např. <code>3(4)</code> místo <code>3 * 4</code>).</p>}
        >
          <p>Pozor, zápisy musí být napsané zcela správně. Jinak uvidíš různá chybová hlášení, která ti většinou červeně řeknou, kde je problém. Co se stane, pokud zadáš tyto příkazy?</p>
          <PythonSnippet code={`>>> 22 + 7 *\n>>> 19 - (3 4)`} />
        </TaskCard>

        <TaskCard 
          number="5" 
          title="Dělení nulou" 
          taskId="5"
          showTeacher={teacherMode}
          teacherNote={
            <>
              <p>Při chybných výrazech počítač někdy vypíše několik řádků s chybou. Je nutné se učit rozpoznávat, co je v chybovém hlášení důležité (většinou to je úplně poslední řádek).</p>
              <ul className="list-disc pl-5 mt-2">
                <li><code>SyntaxError: invalid syntax</code> (něco jsi napsal nesprávně)</li>
                <li><code>ZeroDivisionError: division by zero</code> (snažíš se dělit nulou)</li>
              </ul>
            </>
          }
        >
          <p>Někdy se však i po naprosto správném zápise může objevit chybové hlášení. Zkus zadat následující příkaz. Proč si myslíš, že došlo k chybě?</p>
          <PythonSnippet code=">>> 10 / (6 - 2 * 3)" />
        </TaskCard>

        <TaskCard 
          number="6" 
          title="Petrův věk" 
          taskId="6"
          showTeacher={teacherMode}
          teacherNote={<p><strong>Očekávané řešení:</strong> <code>16 * 365 + 2 * 30</code><br/>V této úloze je vhodné žáky vést, aby ještě před sestavením výrazu v Pythonu přibližně odhadli výsledek (cca 5800). Díky tomu ihned zjistí, pokud napsali např. <code>16 * 365 * 2</code> (což je hloupost).</p>}
        >
          <p>Sestav a vypočítej slovní úlohu pomocí jednoho výrazu:<br/>Petrovi bylo přesně před dvěma měsíci 16 let. Využij Python jako kalkulačku a spočítej, kolik je mu nyní přibližně dní. Předpokládej, že rok má 365 dní a měsíc 30 dní.</p>
        </TaskCard>

        <TaskCard 
          number="7" 
          title="Liché počítání" 
          taskId="8"
          showTeacher={teacherMode}
          teacherNote={<p><strong>Možné řešení:</strong> <code>1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19</code> = 100.</p>}
        >
          <p>Vytvoř v Pythonu zápis, pomocí kterého vypočítáš součet <strong>všech lichých čísel od 1 do 19</strong> (včetně). Jaký bude výsledek?</p>
        </TaskCard>

        <TaskCard 
          number="8" 
          title="Obrovská čísla" 
          taskId="9"
          showTeacher={teacherMode}
          teacherNote={<p>Cílem této úlohy je ukázat, že na rozdíl od jiných jazyků (nebo běžných kalkulaček) Python bez problémů zvládá celočíselnou aritmetiku s obrovskými čísly. Nepřeteče.</p>}
        >
          <p>Která číslice se vyskytuje nejčastěji ve výsledku tohoto obřího výrazu?</p>
          <PythonSnippet code=">>> 123456789 * 111111111111111111111" />
        </TaskCard>
        
        <TaskCard 
          number="9" 
          title="Složité nákupy" 
          taskId="11"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Zde je cílem, aby žáci efektivně použili závorky. U třetího (c) bodu by měli najít způsob, jak obě ceny zkrátit.</p>
              <p><strong>první hra:</strong> 79</p>
              <p><strong>druhá hra:</strong> <code>79 * 2 + 5</code></p>
              <p><strong>třetí hra (a):</strong> <code>(79 * 2 + 5) * 3 + 17</code></p>
              <p><strong>všechny hry (b):</strong> <code>79 + 79 * 2 + 5 + (79 * 2 + 5) * 3 + 17</code></p>
            </div>
          }
        >
          <p>Jirka si koupil hru za 79 korun. Později si koupil druhou hru za <strong>dvojnásobek této ceny a ještě k tomu připlatil 5 korun</strong>. Nakonec si koupil třetí hru za <strong>trojnásobek ceny druhé hry a ještě k tomu připlatil 17 korun</strong>.</p>
          <p className="font-bold mt-2">Spočítej pomocí Pythonu:</p>
          <ul className="list-[lower-alpha] pl-5 space-y-1 mt-1 text-slate-600">
            <li>kolik Jirka zaplatil za třetí hru?</li>
            <li>kolik zaplatil za všechny tři hry dohromady?</li>
            <li className="text-indigo-600">*) vymysli co nejkratší zápis, kterým lze obě předchozí otázky vypočítat.</li>
          </ul>
        </TaskCard>

        <TaskCard 
          number="10*" 
          title="Umocňování a priority" 
          taskId="15"
          showTeacher={teacherMode}
          teacherNote={
            <p><strong>Očekávané zjištění:</strong> Operátor umocnění <code>**</code> má absolutně nejvyšší prioritu ze všech operátorů (má přednost před násobením i dělením). To znamená, že <code>2 ** 8 - 1</code> se spočítá jako (256 - 1) = 255. Nikoli 2 na sedmou.</p>
          }
        >
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <AlertTriangle className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Zjisti, jak se vyhodnocuje tento výraz:</p>
          <PythonSnippet code=">>> 2 ** 8 - 1" />
          <p>Znamená to, že se nejdřív vypočítá <code>2 ** 8</code> (a následně se odečte 1), nebo se nejdřív odečte <code>8 - 1</code> a umocní se dvojka na sedmou? Podle výsledku urči, zda má umocňování v Pythonu <strong>vyšší nebo nižší</strong> prioritu než odčítání.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonBasicsChapter;
