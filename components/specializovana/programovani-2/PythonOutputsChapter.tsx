'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Zap, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonOutputsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-purple-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-purple-500 mr-2 select-none">{">>>"}</span>
            <span className="text-purple-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-purple-600" />
      <span className="font-bold text-purple-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-purple-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py4-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonOutputsChapter: React.FC<PythonOutputsChapterProps> = ({ onBack }) => {
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
      subtitle="Lekce 4"
      icon={<Zap className="w-8 h-8 text-purple-600" />}
      onBack={onBack}
      accentColor="purple"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-purple-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-purple-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Dobrý den')</code><br/><code>print('Začíná programování')</code></p>}>
          <p>1. Vytvoř program <code>zaciname.py</code>, který tě po spuštění přivítá zprávou se dvěma řádky:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Dobrý den<br/>
Začíná programování
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print(1 * 1)</code><br/><code>print(11 * 11)</code><br/><code>...</code><br/><code>print(111111111 * 111111111)</code></p>}>
          <p>2. Doplň do předchozího programu příkazy <code>print</code> a vypiš pomocí nich pod sebou hodnoty výrazů: <code>1*1</code>, <code>11*11</code>, <code>111*111</code>, <code>1111*1111</code>, …, <code>111111111*111111111</code>.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode}>
          <p>3. I ve svém programu můžeš používat proměnné – vytvoř program <code>vek.py</code>, který bude obsahovat následující kód, a spusť jej:</p>
          <PythonSnippet code={`vek = 16\nprint('Je mi', vek, 'let')`} />
          <p>Když program spustíš, vypíše se:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Je mi 16 let
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Je chybou použít <code>print('Příští rok mi bude 17 let')</code>, protože číslo je „zadrátované“ natvrdo. Správně je:<br/><code>print('Příští rok mi bude', vek + 1, 'let')</code></p>}>
          <p>4. Přidej na konec programu <code>vek.py</code> další příkaz, pomocí kterého vypíšeš zprávu:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Příští rok mi bude 17 let
          </div>
          <p>Až budeš mít hotovo, program otestuj.</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode}>
          <p>5. Představ si, že program <code>vek.py</code> spustí tvůj otec. Vyzkoušej program za něj – dosaď do proměnné <code>vek</code> skutečný věk tvého otce. Zobrazí mu program <code>vek.py</code> správný výsledek i na druhém řádku svého výstupu? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>penize = 250</code><br/><code>platba = 180</code><br/><code>print('Mám', penize, 'korun')</code><br/><code>print('Platím', platba, 'korun')</code><br/><code>print('Zbyde mi', penize - platba, 'korun')</code></p>}>
          <p>6. Vytvoř program <code>penezenka.py</code>. Na začátku přiřaď do proměnně <code>penize</code>, kolik korun máš. Do proměnné <code>platba</code> přiřaď cenu nákupu. Použij proměnné a vypiš pomocí nich:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Mám ... korun<br/>
Platím ... korun<br/>
Zbyde mi ... korun
          </div>
          <p className="mt-4">V následujících úlohách se <strong>tučně zvýrazněné</strong> hodnoty mohou měnit. Ve výpisech nepiš konkrétní čísla, ale použij vytvořené proměnné.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>sirka = 50</code><br/><code>delka = 80</code><br/><code>pocet_kol = 7</code><br/><code>print('Šířka hřiště je', sirka, 'metrů, délka je', delka, 'metrů')</code><br/><code>print('Jedno kolo okolo hřiště je', 2 * (sirka + delka), 'metrů')</code><br/><code>print('Po', pocet_kol, 'kolech uběhneš', pocet_kol * 2 * (sirka + delka), 'metrů')</code></p>}>
          <p>7. Školní hřiště má šířku <strong>50</strong> metrů a délku <strong>80</strong> metrů. V rámci tělocviku budeš běhat po jeho obvodě. Vytvoř program <code>hriste.py</code>, který spočítá a vypíše, kolik metrů uběhneš po <strong>7</strong> kolech. Na začátku programu přiřaď do proměnné <code>sirka</code> hodnotu <strong>50</strong>, do proměnné <code>delka</code> hodnotu <strong>80</strong> a do proměnné <code>pocet_kol</code> hodnotu <strong>7</strong> a pomocí těchto proměnných vypiš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Šířka hřiště je 50 metrů, délka je 80 metrů<br/>
Jedno kolo okolo hřiště je 260 metrů<br/>
Po 7 kolech uběhneš 1820 metrů
          </div>
          <p className="mt-4">Předpokládejme nyní, že školní hřiště má šířku <strong>45</strong> metrů a délku <strong>70</strong> metrů. Přiřaď tedy do proměnné <code>sirka</code> hodnotu <strong>45</strong> a do proměnné <code>delka</code> hodnotu <strong>70</strong>. Zobrazí program správné hodnoty na druhém a na třetím řádku svého výstupu? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>puvodni_cena = 199</code><br/><code>sleva = 20</code><br/><code>cena_po_sleve = puvodni_cena * (1 - sleva / 100)</code><br/><code>print('Cena alba je', puvodni_cena, 'korun')</code><br/><code>print('Sleva činí', sleva, 'procent')</code><br/><code>print('Zaplatíš', cena_po_sleve, 'korun')</code><br/><br/>Pro původní cenu 399 a slevu 30 % program vypíše zaplatíš 279.3 korun.</p>}>
          <p>8. Internetový obchod s hudbou nabízí <strong>20</strong>% slevu. Chceš si koupit album, jehož původní cena byla <strong>199</strong> korun. Napiš program <code>sleva.py</code>, který vypočítá, kolik zaplatíš. V programu použij proměnné <code>puvodni_cena</code>, <code>sleva</code>, <code>cena_po_sleve</code> a pomocí nich proveď výpočty a vypiš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Cena alba je 199 korun<br/>
Sleva činí 20 procent<br/>
Zaplatíš 159.2 korun
          </div>
          <p className="mt-4">Jakou výslednou cenu program vypíše pro album, jehož původní cena byla <strong>399</strong> korun, jestliže sleva činí <strong>30</strong> %?</p>
        </TaskCard>

        <TaskCard number="9*" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>puvodni_cena = 256</code><br/><code>cena_po_sleve = 214</code><br/><code>sleva = (1 - cena_po_sleve / puvodni_cena) * 100</code><br/><code>print('Cena alba je', puvodni_cena, 'korun')</code><br/><code>print('Sleva činí', sleva, 'procent')</code><br/><code>print('Zaplatíš', cena_po_sleve, 'korun')</code><br/><br/>Pro původní cenu 250 a cenu po slevě 230 vypíše slevu 8 procent.</p>}>
          <p>9* Uprav program <code>sleva.py</code> tak, aby byl schopen spočítat výši slevy, jestliže původní cena alba byla <strong>256</strong> korun a cena alba po slevě je <strong>214</strong> korun.</p>
          <p>Jakou výši slevy program vypíše pro album, jehož původní cena byla <strong>250</strong> korun a cena po slevě je <strong>230</strong> korun?</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>pocet1 = 3</code><br/><code>pocet2 = 2</code><br/><code>pocet3 = 5</code><br/><code>print('Počet příspěvků od Aleny:', pocet1)</code><br/><code>print('Počet příspěvků od Petra:', pocet1 * pocet2)</code><br/><code>print('Počet příspěvků od Pavly:', pocet1 * pocet3 + pocet1 * pocet2 * pocet3)</code></p>}>
          <p>10. Kamarádi Alena, Petr a Pavla diskutují na sociální síti. Alena napsala <strong>3</strong> příspěvky. Petr na každý z nich poslal <strong>2</strong> odpovědi. Pavla všechno komentuje a ke každému z příspěvků Aleny a Petra poslala <strong>5</strong> komentářů. Napiš program <code>diskuze.py</code>, který tuto diskuzi zhodnotí:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Počet příspěvků od Aleny: 3<br/>
Počet příspěvků od Petra: 6<br/>
Počet příspěvků od Pavly: 45
          </div>
          <p className="mt-4">Program vytvoř tak, aby se na začátku do proměnných <code>pocet1</code>, <code>pocet2</code> a <code>pocet3</code> přiřadil počet příspěvků Aleny, počet odpovědí na každý z nich od Petra a počet komentářů na každý z příspěvků od Pavly.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Pro 4 příspěvky Aleny (<code>pocet1 = 4</code>) vypíše program 60 pro Pavlu.</p>}>
          <p>11. Kolik komentářů by podle tvého programu musela napsat Pavla, jestliže by Alena napsala <strong>4</strong> příspěvky? Počet odpovědí Petra a Pavly a způsob výpočtu se nemění.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonOutputsChapter;
