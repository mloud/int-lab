'use client';
import React from 'react';
import { Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'rose',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py3', id),
});


interface PythonProgramChapterProps {
  onBack: () => void;
}

const PythonProgramChapter: React.FC<PythonProgramChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Program"
      subtitle="Lekce 3"
      icon={<Code className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce 3', icon: Code }]}
    >
      <TeacherPinBar tone="rose" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl mb-8">
          <p className="text-rose-800/80 text-sm sm:text-base font-bold">
            První úloha slouží k zopakování poznatků z minulé lekce.
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Očekávané řešení:<br/><code>{">>>"} suma = 100</code><br/><code>{">>>"} kurz = 25.230</code><br/><code>{">>>"} dostanes = suma / kurz</code><br/><code>{">>>"} dostanes</code><br/><code>3.963535473642489</code></p>}>
          <p>Do proměnné <code>suma</code> přiřaď počet korun, které budeš měnit na eura. Do proměnné <code>kurz</code> přiřaď kurz eura (například 1 euro za 25.23 korun). Do proměnné <code>dostanes</code> přiřaď hodnotu výrazu, kterým se vypočítá, kolik eur dostaneš za měněnou sumu. Začni takto:</p>
          <PythonSnippet code={`>>> suma = 100\n>>> kurz = ...`} />
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Doposud se zadávaly příkazy samostatně do příkazového řádku v interaktivním režimu. To bylo výhodné, pokud žáci Python používali jako inteligentní kalkulačku, případně se seznamovali s konceptem proměnné a dělali drobné experimenty. V této lekci chceme naučit žáky sestavovat programy. Aby program dokázal zobrazovat výsledky, je potřeba žáky seznámit s příkazem <code>print</code>. Začínáme jednoduchými výpisy, stále v interaktivním režimu.</p>}>
          <p>Vyzkoušej nový příkaz. Co vykoná?</p>
          <PythonSnippet code={`>>> print('Ahoj, já jsem počítač')`} />
          <p className="text-sm italic text-slate-500 mt-2">toto jsou apostrofy – najdi je na klávesnici</p>
          <p className="mt-4">Příkaz <code>print</code> slouží na vypisování textů. Text, který se má vypsat, napíšeš mezi apostrofy.</p>
          <p>Zatím se ti může zdát vypisování textů pomocí příkazu <code>print</code> zbytečné – vždyť jen vypsal na nový řádek text, který jsi napsal mezi apostrofy. Jak ale uvidíš v dalších úlohách, bude tento příkaz velmi užitečný při vytváření programů.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>{">>>"} print('Moji kamarádi jsou Vašek a Jana.')</code><br/><code>Moji kamarádi jsou Vašek a Jana.</code></p>}>
          <p>Použij příkaz <code>print</code> a vypiš pomocí něho jména dvou svých kamarádů, například:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Moji kamarádi jsou Vašek a Jana.
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Žáci by měli přijít na následující poznatky:<br/>• Obyčejné výrazy v příkazu print se vyhodnotí a zobrazí se jejich hodnota:<br/><code>{">>>"} print(1 + 2 * 3)</code><br/><code>7</code><br/>• To, co je v apostrofech, počítač nevyhodnocuje, i kdyby to byl standardní výraz:<br/><code>{">>>"} print('1 + 2 * 3')</code><br/><code>1 + 2 * 3</code><br/>• V příkazu print nemusíme uvést, co chceme vypsat – pak se zobrazí prázdný řádek:<br/><code>{">>>"} print()</code></p>}>
          <p>Zjisti, co Python vypíše v případě následujících příkazů:</p>
          <PythonSnippet code={`>>> print(1 + 2 * 3)\n>>> print('1 + 2 * 3')\n>>> print()`} />
          <p>Vidíš, že <code>print</code> vypíše i hodnotu výrazu, která není mezi apostrofy.</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Žáci by si měli všimnout, že:<br/>• Výsledný text bude na jednom řádku, mezi vypisované texty se vloží mezera:<br/><code>{">>>"} print('Mám rád', 'kapustu')</code><br/><code>Mám rád kapustu</code><br/>• Můžeme kombinovat texty i hodnoty (a mezi vypisované části se též vloží mezera):<br/><code>{">>>"} print('Moje oblíbené číslo je', 42)</code><br/><code>Moje oblíbené číslo je 42</code><br/>• Když uvedeme výraz, ten se vyhodnotí a na obrazovku se vypíše výsledek:<br/><code>{">>>"} print('Do školy jsem šel', 2 * 10, 'minut')</code><br/><code>Do školy jsem šel 20 minut</code></p>}>
          <p>Příkaz <code>print</code> umí vypsat víc věcí – vyzkoušej následující příkazy. Co způsobí čárka v jednotlivých příkazech?</p>
          <PythonSnippet code={`>>> print('Mám rád', 'kapustu')\n>>> print('Moje oblíbené číslo je', 42)\n>>> print('Do školy jsem šel', 2 * 10, 'minut')`} />
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>{">>>"} print('Měřím', 180 / 2.5, 'palců')</code><br/><code>Měřím 72.0 palců</code></p>}>
          <p>V Anglii se délka neměří v centimetrech, ale v palcích. Jeden palec je přibližně 2.5 centimetru. Vypiš pomocí příkazu <code>print</code> svoji výšku v palcích podobně jako v následující ukázce:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Měřím 72.0 palců
          </div>
          <p>Výšku v palcích nepočítej na kalkulačce, ale vytvoř v příkazu <code>print</code> výraz, ve kterém uvedeš svou výšku v centimetrech a podle kterého Python výpočet provede.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Žáci by měli vidět následující chybová hlášení:<br/>• Chybějící apostrof – neukončený text:<br/><code>{">>>"} print('Ahoj)</code><br/><code>SyntaxError: EOL while scanning string literal</code><br/>• Chybějící oba apostrofy – Ahoj je chápáno jako proměnná, do které jsme ale nepřiřadili hodnotu:<br/><code>{">>>"} print(Ahoj)</code><br/><code>Traceback (most recent call last):</code><br/><code>  File "{'<pyshell#20>'}", line 1, in {'<module>'}</code><br/><code>    print(Ahoj)</code><br/><code>NameError: name 'Ahoj' is not defined</code><br/>• Chybějící závorky:<br/><code>{">>>"} print 'Ahoj'</code><br/><code>SyntaxError: Missing parentheses in call to 'print'</code><br/>• Chybějící čárka:<br/><code>{">>>"} print('Ahoj' 10)</code><br/><code>SyntaxError: invalid syntax</code></p>}>
          <p>Prozkoumej, co se stane, když zapomeneš napsat v příkazu:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
{">>>"} print('Ahoj) <span className="italic text-slate-500">... apostrof?</span><br/>
{">>>"} print(Ahoj) <span className="italic text-slate-500">... oba apostrofy?</span><br/>
{">>>"} print 'Ahoj' <span className="italic text-slate-500">... závorky?</span><br/>
{">>>"} print('Ahoj' 10) <span className="italic text-slate-500">... čárku?</span>
          </div>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Nyní se žáci seznámí s postupem, jak se vytváří nový program. V budoucnu budou tento postup často opakovat.</p>}>
          <p>Zatím jsi s Pythonem pracoval v interaktivním režimu. Za symboly <code>{">>>"}</code> jsi zapisoval jednotlivé příkazy, které se ihned vykonaly. Dále budeš vytvářet programy – nejdříve napíšeš všechny příkazy, až potom tento program spustíš.</p>
          <ul className="list-none pl-0 mt-4 space-y-4">
            <li>A. Z hlavní nabídky zvol <code>File ► New File</code>:</li>
            <li>B. Otevře se nové okno, ve kterém budeš zapisovat program:</li>
            <li>C. Do okna s programem napiš tyto příkazy:<br/>
              <PythonSnippet code={`print('Ahoj')\nprint('Pozdravuje tě Python')`} />
            </li>
            <li>D. Ulož program do souboru volbou z nabídky <code>File ► Save</code>:</li>
            <li>E. Najdi složku, do které chceš soubor uložit. Potom do políčka <code>File name</code> napiš název souboru, například <code>první.py</code> (příponu psát nemusíš), a klikni na tlačítko <code>Save</code>:</li>
            <li>F. Nyní program spusť volbou <code>Run ► Run Module</code>:</li>
            <li>G. V interaktivním okně uvidíš výsledek:</li>
          </ul>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Ahoj')</code><br/><code>print('Pozdravuje tě Python')</code><br/><code>print('Dnes je středa')</code></p>}>
          <p>Přepni se zpět do svého programu a přidej další příkaz <code>print</code>, kterým vypíšeš text „Dnes je středa“ (místo středy doplň aktuální den v týdnu). Program ulož a spusť jej.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Na topole nad jezerem')</code><br/><code>print('seděl vodník podvečerem:')</code><br/><code>print('Sviť, měsíčku, sviť,')</code><br/><code>print('ať mi šije niť.')</code><br/><br/>Úlohu lze řešit i za použití jediného příkazu <code>print</code>, jak uvádíme u obdobné úlohy v metodickém listu 12. lekce. Taková řešení jsou založena na technických fintách a nejsou příliš přehledná, a proto je žákům neprozrazujeme.</p>}>
          <p>Vytvoř program <code>basnicka.py</code>, který vypíše úryvek tvé oblíbené básničky nebo písničky. Jestli tě žádná nenapadá, můžeš vypsat tuto básničku:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Na topole nad jezerem<br/>
seděl vodník podvečerem:<br/>
Sviť, měsíčku, sviť,<br/>
ať mi šije niť.
          </div>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Možné řešení:<br/><code>print('+--------------------+')</code><br/><code>print('|        www         |')</code><br/><code>print('|  Petr   ( o o )    |')</code><br/><code>print('|  LEV     ( ~ )     |')</code><br/><code>print('|            "       |')</code><br/><code>print('|  Počítačový král   |')</code><br/><code>print('+--------------------+')</code></p>}>
          <p>Pomocí příkazu <code>print</code> se dají vypisovat veselé věci. Vytvoř nový program <code>vizitka.py</code>, který pomocí příkazu <code>print</code> vypíše tvoji vizitku, například takovouto:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
+--------------------+<br/>
|        www         |<br/>
|  Petr   ( o o )    |<br/>
|  LEV     ( ~ )     |<br/>
|            "       |<br/>
|  Počítačový král   |<br/>
+--------------------+
          </div>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('%%%% % % %%%%% % % %%% % %')</code><br/><code>print('% % % % % % % % % %% %')</code><br/><code>print('%%%% %%% % %%%%% % % % % %')</code><br/><code>print('% % % % % % % % %%')</code><br/><code>print('% % % % % %%% % %')</code></p>}>
          <p>Vytvoř program <code>python.py</code>, který ze znaků <code>%</code> (procenta) vypíše zvětšený text PYTHON:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre tracking-[0.2em] leading-relaxed">
%%%% % % %%%%% % % %%% % %<br/>
%    % % %     % % % % % %%  %<br/>
%%%% %%% %     %%%%% % % %   %   %<br/>
%    %   % %     % % % % %%<br/>
%    %   % %     % %%% %   %
          </div>
        </TaskCard>

        <TaskCard number="13*" title="" taskId="13" showTeacher={teacherMode}>
          <p>13* Vytvoř program <code>prezdivka.py</code>, který ze znaků <code>#</code>, <code>$</code>, <code>€</code> nebo jiných vypíše tvoje jméno nebo přezdívku. Výška písmen bude nejméně pět řádků.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonProgramChapter;
