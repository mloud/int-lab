'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, MousePointer2, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonMouseDrawingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-cyan-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-cyan-500 mr-2 select-none">{">>>"}</span>
            <span className="text-cyan-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-cyan-600" />
      <span className="font-bold text-cyan-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-cyan-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py20-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-cyan-100 text-cyan-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonMouseDrawingChapter: React.FC<PythonMouseDrawingChapterProps> = ({ onBack }) => {
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
      title="Kreslení myší"
      subtitle="Souběžné události, canvas.bind a interakce v reálném čase (iMyšlení Lekce 20)"
      icon={<MousePointer2 className="w-8 h-8 text-cyan-600" />}
      onBack={onBack}
      accentColor="cyan"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-cyan-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-cyan-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-cyan-100 text-cyan-700 border-cyan-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-cyan-900 text-lg mb-2">Instrukce</h2>
          <p className="text-cyan-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Není úžasné, jak se nám všechny ty lekce krásně složily dohromady? Dneska ale už nezůstaneme jen u toho, že program všechno bleskově namaluje a umře. Naučíme počítač čekat a REAGOVAT na tvé tažení myší! Staneš se vývojářem skutečného Malování!
          </p>
        </div>

        <TaskCard number="1" title="Sledování myši (Event Bind)" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úplně nový příkaz <code>canvas.bind</code> sváže událost myši se specifikovanou funkcí. Parametr události obsahuje i x a y. Důležité je si pamatovat, že název funkce se do bindu píše BEZ kulatých závorek! My jen předáváme zástupce.</p>}>
          <p>Nyní se naučíme počítači přikázat, ať čeká a "naslouchá", jestli někdo nekliká myší. Vytvoř program <code>mys.py</code>.</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ndef klik(mys):\n    print(mys.x, mys.y)\n\ncanvas.bind('<B1-Motion>', klik)`} />
          <p>Nový tajemný příkaz <code>canvas.bind</code> udělal to, že plátno od teď STÁLE tajně poslouchá událost <code>{'<B1-Motion>'}</code> (Tedy že jsi zrovna stiskl Levý klik a táhneš po plátně myší!). Kdykoliv to uděláš, tak plátno okamžitě zavolá tvou funkci <code>klik</code> a jako její parametr uvnitř závorky (<code>mys</code>) do ní pošle přesné informace o tvé myši!</p>
          <p className="font-bold text-cyan-700">Táhni uvnitř svého prázdného plátna a podívej se do konzole dole, jak ti to chrlí x a y souřadnice tvé ruky rychlostí kulometu!</p>
        </TaskCard>

        <TaskCard number="2" title="Malování hvězdiček" taskId="2" showTeacher={teacherMode} teacherNote={<p>Proměnění terminálového trasování na interaktivní kreslení v Canvasu.</p>}>
          <p>Když už tvůj program umí vyčíst informace o aktuální x,y poloze tvého táhnutí, proč to nenakreslit?</p>
          <p>Ve tvé funkci vyměň onen nudný <code>print()</code> za grafický <code>canvas.create_text()</code>, a nakresli text <code>"*"</code> přesně na ty dvě polohy, které ti pošle myš! Pokud přidáš i parametry <code>font='arial 50', fill='red'</code>, bude to luxusní rudý štětec na malování ohromných hvězd.</p>
        </TaskCard>

        <TaskCard number="3" title="Kreslení čáry z kruhů" taskId="3" showTeacher={teacherMode} teacherNote={<p>Místo textu kreslíme kružnice s poloměrem 5, čímž vznikne tlustá souvislá čára ve chvíli, kdy uživatel táhne.</p>}>
          <p>Pokud místo textu s hvězdičkou do funkce zapojíš svůj dobře známý <code>canvas.create_oval</code>, vznikne dokonalý "kulatý" štětec.</p>
          <p>Stačí opět od přijaté pozice myši (<code>mys.x</code>) vždy odečíst -5 a vzápětí k ní přičíst +5, aby ti vznikl pevný poloměr ohraničující čtverce, a máš plnohodnotný malovací štětec!</p>
          <p className="italic text-sm text-cyan-700 mt-2">Pokus: A teď změň těch tvých 5 pixelů na 30! Co vidíš?</p>
        </TaskCard>

        <TaskCard number="4" title="Dvoubarevný štětec z ifu" taskId="4" showTeacher={teacherMode} teacherNote={<p>Do události zapojíme větvení. Plátno se nám rozdělí na x &lt; 150.</p>}>
          <p>Co kdyby tvůj štětec nečekaně měnil barvu podle toho, na jaké polovině plátna se s myší zrovna pohybuješ?</p>
          <p>Obal svůj malovací příkaz vevnitř funkce <code>klik(mys)</code> do inteligentní podmínky <code>if / else</code>! Bude se to neustále pídit po tom, jestli je <code>mys.x {"<"} 150</code>. Pokud ano, tak ať štětec chrlí jen červené kruhy, ale jinak ty modré (přes <code>fill</code>).</p>
        </TaskCard>

        <TaskCard number="5" title="Smazání plátna" taskId="5" showTeacher={teacherMode} teacherNote={<p>Další novinka: událost ButtonPress-3 (pravý klik) a smazání všeho z Canvasu příkazem <code>canvas.delete('all')</code>.</p>}>
          <p>Už tě to počmárané plátno štve a chceš ho smazat? Přidej si ÚPLNĚ NOVOU událost!</p>
          <PythonSnippet code={`def smaz(mys):\n    canvas.delete('all')\n\ncanvas.bind('<ButtonPress-3>', smaz)`} />
          <p>Založil jsi druhou funkci na smazání plátna (přes <code>delete('all')</code>). A pod tím prvním slavným "bindem" dole ho nasloucháš i na <code>{'<ButtonPress-3>'}</code>, což je stisk pravého tlačítka na tvé myši! Stačí kdykoliv kliknout naprázdno do plátna pravým myšítkem, a to se dočista vyhladí jako po výbuchu!</p>
        </TaskCard>

        <TaskCard number="6" title="Paprsky štěstí" taskId="6" showTeacher={teacherMode} teacherNote={<p>Kreslení úsečky přes <code>create_line(x1,y1, x2,y2)</code>, přičemž první bod je kotva a druhý je myš.</p>}>
          <p>Odstraň podmínky, a vyměň malování štětcem oválů za úplně nový příkaz: Kreslení obyčejné čáry <code>canvas.create_line(x1, y1, x2, y2)</code>.</p>
          <p>Funguje to skvěle: Vždycky narýsuje úsečku od prvního bodu až po ten tvůj druhý zadaný.</p>
          <p>Když si napevno nastavíš ten PRVNÍ jako střed plátna (<code>150, 100</code>) a jako ten DRUHÝ zadáš <code>mys.x, mys.y</code>, bude se ti při tažení kursoru kreslit do té pozice od středu pořád dokola nová natažená rovná čára. Pokud budeš myší u tažení rovnou i kroužit, vznikne ti úžasné laserové paprskovité slunce vycházející ze středu!</p>
        </TaskCard>

        <TaskCard number="7*" title="Duplikovaný štětec 3D" taskId="7" showTeacher={teacherMode} teacherNote={<p>Experimenty s <code>for</code> cyklem uvnitř obsluhy události, nebo s více body naráz. Stačí nakreslit druhý element s drobným posunem a vznikne optická iluze tlusté housenky, co leze z myši.</p>}>
          <p className="flex items-center gap-2 font-bold text-cyan-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Vrať se zpět k tomu kulatému stětci s funkcí `create_oval`.</p>
          <p>Zkopíruj vnitřek toho příkazu tak, abys rovnou do svého <code>klik(mys)</code> udělal po sobě příkazy dva! První bude modrý kruh, ten druhý bude hned žlutý kruh... ALE... do jeho X a Y (hned za parametr myši v pluskách) si drze přičti <code>+ 15</code>.</p>
          <p>Tím jsi stvořil optický klam a 3D duplikátor! Od té chvíle bude s tvojí myší cestovat nejen ten původní štětec, ale vždy o 15 bodů dál úplně stejný jeho stín a věrný kamarád! Při tažení ti vznikne dvojitá obří vlnovka!</p>
        </TaskCard>

        <TaskCard number="8*" title="Sprej na zdi grafitti" taskId="8" showTeacher={teacherMode} teacherNote={<p>Do události pro tažení myši dají žáci gigantický cyklus (for i in range(50)), který vystřelí přes `create_text` 50 různých puntíků do zcela náhodných úhlů od myši (-30, 30). Mistrovské dílo a vyvrcholení učebnice!</p>}>
          <p className="flex items-center gap-2 font-bold text-cyan-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Jako absolutní Finále a tvůj závěrečný mistrovský kousek stvoříš simulaci skutečného spreje na zdi (Grafitti)!</p>
          <p>Pojmenuj to <code>sprej.py</code>. V oné tajemné funkci <code>klik(mys)</code> vymaž úplně vše. Napiš obří for cyklus s padesáti koly! V tom cyklu (čímž se rozehraje v jediném nepostřehnutelném kliknutí točivý ohňostroj kódů) vylosuj náhodný bod rozptylu od myši: <code>dx = randint(-30, 30)</code>.</p>
          <p>A pod tím vypal do obrazovky skrz <code>create_text</code> jeden bod spreje, na pozici <code>mys.x + dx</code>.</p>
          <p>Právě jsi ohnul svět, cykly a události ve svůj prospěch! Když teď v plátně stiskneš tlačítko, vyprskne kolem myši okamžitě šrapnel 50 teček. Pokud potáhneš po obrazovce s myší s tímto sprejem, vznikne mistrovské dílo.</p>
          <div className="mt-6 flex flex-col items-center p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
            <h3 className="font-black text-xl text-emerald-800 uppercase tracking-widest text-center mb-2">Gratulujeme!</h3>
            <p className="text-center text-sm font-medium text-emerald-700">Dostal jsi se až na samotný konec kurzu! Prošel jsi 20 lekcemi od obyčejných proměnných až po interaktivní události v plátně. Jsi plnohodnotný programátor!</p>
          </div>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonMouseDrawingChapter;
