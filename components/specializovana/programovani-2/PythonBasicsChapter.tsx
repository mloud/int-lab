'use client';
import React from 'react';
import { Terminal, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'indigo',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py1', id),
});


interface PythonBasicsChapterProps {
  onBack: () => void;
}

const PythonBasicsChapter: React.FC<PythonBasicsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Výpisy"
      subtitle="Lekce 1"
      icon={<Terminal className="w-8 h-8 text-indigo-600" />}
      onBack={onBack}
      accentColor="indigo"
      tabs={[{ id: 'lekce', label: 'Lekce 1', icon: Code }]}
    >
      <TeacherPinBar tone="indigo" state={teacher} />

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
