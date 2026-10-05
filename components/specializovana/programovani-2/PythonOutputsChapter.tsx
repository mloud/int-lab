'use client';
import React, { useState } from 'react';
import { Terminal, CheckCircle, GraduationCap, Unlock, Lock, Zap, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonOutputsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-purple-500 mr-2 select-none">{">>>"}</span>
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
      title="Proměnné a výpisy"
      subtitle="Kombinace textu a matematiky (iMyšlení Lekce 4)"
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
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-purple-900 text-lg mb-2">Instrukce</h2>
          <p className="text-purple-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dnes propojíme dvě věci, které už známe – <strong>Proměnné</strong> (paměťové krabičky) a <strong>Příkaz print</strong>. Budeme vytvářet inteligentní programy, které počítají a rovnou s námi i hezky mluví. Každý program si vždy <strong>ulož a spusť</strong> (klávesa F5).
          </p>
        </div>

        <TaskCard 
          number="1" 
          title="Opakování" 
          taskId="1"
          showTeacher={teacherMode}
          teacherNote={<p>Na úvodní úloze si žáci zopakují vytvoření nového programu, jeho uložení (jako zaciname.py), spuštění a příkaz print.</p>}
        >
          <p>Vytvoř program <code>zaciname.py</code>, který tě po spuštění přivítá zprávou se dvěma řádky:</p>
          <PythonSnippet code={`Dobrý den\nZačíná programování`} />
          <p>Poté program ulož a spusť. Zobrazila se zpráva dole v konzoli (Shellu)?</p>
        </TaskCard>

        <TaskCard 
          number="2" 
          title="Výpis pyramidy čísel" 
          taskId="2"
          showTeacher={teacherMode}
          teacherNote={<p>Stačí pod sebe napsat <code>print(1 * 1)</code>, <code>print(11 * 11)</code>, <code>print(111 * 111)</code>, atd. Cílem je ukázat, že print může vyhodnocovat libovolně velké matematické výrazy postupně za sebou a vypíše je pod sebe na nové řádky.</p>}
        >
          <p>Doplň do předchozího programu příkazy <code>print</code> a vypiš pomocí nich pod sebou hodnoty výrazů (musíš je nechat Python spočítat, nedávej je do apostrofů!):</p>
          <PythonSnippet code={`1*1\n11*11\n111*111\n1111*1111\n...\n111111111*111111111`} />
          <p>Co vznikne ve výpisu? Je to docela magické, že?</p>
        </TaskCard>

        <TaskCard 
          number="3" 
          title="Vkládání proměnných do vět" 
          taskId="3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Zde se kombinují proměnné, přiřazení a výpisy. Pokud žáci v další (čtvrté) úloze vytvoří řešení <code>print('Příští rok mi bude 17 let')</code>, <strong>neopravujte je!</strong> Zjistí to sami v páté úloze, kde se proměnná změní a program jim vyhodí nesmysl.</p>
            </div>
          }
        >
          <p>I ve svém programu (nejen v interaktivním režimu) můžeš používat proměnné. Vytvoř program <code>vek.py</code>, který bude obsahovat následující kód, ulož ho a spusť:</p>
          <PythonSnippet code={`vek = 16\nprint('Je mi', vek, 'let')`} />
          <p>Nyní na konec programu přidej další příkaz, pomocí kterého vypíšeš zprávu:</p>
          <PythonSnippet code={`Příští rok mi bude 17 let`} />
          <p className="font-bold text-purple-600">Důležité: Místo čísla 17 použij matematický výraz v kombinaci s proměnnou vek (tzn. <code>vek + 1</code>). Jinak by tvůj program nebyl chytrý!</p>
        </TaskCard>

        <TaskCard 
          number="4" 
          title="Zkouška chytrosti programu" 
          taskId="5"
          showTeacher={teacherMode}
          teacherNote={<p>Zde se projeví, zda žáci správně pochopili smysl proměnné. Pokud napsali předtím 17 "natvrdo", vyjde jim "Je mi 40 let, Příští rok mi bude 17 let". Dojde jim to a opraví kód na <code>vek + 1</code>.</p>}
        >
          <p>Představ si, že tvůj chytrý program spustí tvůj otec. Vyzkoušej program za něj – změň na prvním řádku hodnotu proměnné <code>vek</code> na skutečný věk tvého otce (např. na 40). Nic jiného neměň!</p>
          <p>Zobrazí mu program správný výsledek i na svém druhém řádku (kde počítá, kolik mu bude příští rok)? Jestliže ti program vypsal nějaký nesmysl, vrať se k Úloze 3 a oprav si to!</p>
        </TaskCard>

        <TaskCard 
          number="5" 
          title="Chytrá peněženka" 
          taskId="6"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Prozatím budeme používat některé proměnné jako "vstupní hodnoty" (konstanty) na začátku skriptu, abychom zatím nemuseli učit příkaz <code>input()</code> a přetypování.</p>
              <p>Očekávané řešení:</p>
              <code>penize = 100</code><br/>
              <code>platba = 20</code><br/>
              <code>print('Mám', penize, 'korun')</code><br/>
              <code>print('Zbyde mi', penize - platba, 'korun')</code>
            </div>
          }
        >
          <p>Vytvoř program <code>penezenka.py</code>. Na začátku přiřaď do proměnné <code>penize</code>, kolik korun máš. Do proměnné <code>platba</code> přiřaď cenu nákupu. Použij proměnné a vypiš pomocí nich přesně toto:</p>
          <PythonSnippet code={`Mám ... korun\nPlatím ... korun\nZbyde mi ... korun`} />
          <p className="text-purple-600">Místo teček se ve tvém výpisu musí objevit přesně ta čísla uložená v proměnných nebo výsledek odečítání!</p>
        </TaskCard>

        <TaskCard 
          number="6" 
          title="Běh okolo hřiště" 
          taskId="7"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Předpokládané řešení:</p>
              <p><code>sirka = 50</code><br/><code>delka = 80</code><br/><code>pocet_kol = 7</code></p>
              <p><code>print('Šířka hřiště je', sirka, 'metrů, délka je', delka, 'metrů')</code></p>
              <p>Elegantnější řešení může používat pomocnou proměnnou <code>jedno_kolo = 2 * (sirka + delka)</code>.</p>
              <p>Druhá část úlohy slouží pro ověření správnosti, stačí jen změnit vstupní proměnné. Upozorněte ty žáky, kteří napsali ve výpisu číslo 7, že to musí vyměnit za proměnnou <code>pocet_kol</code>.</p>
            </div>
          }
        >
          <p>Školní hřiště má šířku <strong>50</strong> metrů a délku <strong>80</strong> metrů. V rámci tělocviku budeš běhat po jeho obvodě.</p>
          <p>Vytvoř program <code>hriste.py</code>, který spočítá a vypíše, kolik metrů uběhneš po <strong>7</strong> kolech. Na začátku programu přiřaď všechny tučně zvýrazněné hodnoty do tří proměnných (třeba <code>sirka</code>, <code>delka</code> a <code>pocet_kol</code>) a pomocí těchto proměnných vypiš:</p>
          <PythonSnippet code={`Šířka hřiště je 50 metrů, délka je 80 metrů\nJedno kolo okolo hřiště je 260 metrů\nPo 7 kolech uběhneš 1820 metrů`} />
          <p className="font-bold mt-4">Druhá zkouška:</p>
          <p>Předpokládejme nyní, že hřiště má šířku 45 metrů a délku 70 metrů. Jen přepiš proměnné nahoře a znovu to spusť. Zobrazí program správné hodnoty na všech řádcích (230 metrů kolo a 1610 celkem)? Jestli ne, oprav program!</p>
        </TaskCard>

        <TaskCard 
          number="7*" 
          title="Záludná procenta" 
          taskId="9"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Tady žáci počítají slevu jako <code>sleva = 100 - (cena_po_sleve / puvodni_cena) * 100</code>.</p>
              <p>Důležité odhalení: Pokud přiřadí do <code>puvodni_cena = 250</code> a do <code>cena_po_sleve = 239</code>, program jim místo čistých <code>4.4</code> procent vyhodí divoké číslo <code>4.400000000000006</code>.</p>
              <p>O problému informujeme jen ty, co narazí. Jde o chybu reprezentace desetinných čísel ve dvojkové soustavě. Je to technický detail (tzv. "floating point math"). Python nezvládne číslo 4.4 vyjádřit ve dvojkové soustavě konečným počtem znaků, takže se to musí zaokrouhlit.</p>
            </div>
          }
        >
          <p className="flex items-center gap-2 font-bold text-amber-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol
          </p>
          <p>Napiš program <code>sleva.py</code>. Víš, že původní cena byla <strong>256</strong> korun a cena po slevě je <strong>214</strong> korun. Nech program vypočítat, kolik procent činí sleva, a pěkně to vypsat.</p>
          <p>Poté vyzkoušej program pro původní cenu <strong>250</strong> korun a zlevněnou na <strong>239</strong>. Jakou výši slevy program vypíše? Není na tom čísle něco divného?</p>
        </TaskCard>

        <TaskCard 
          number="8" 
          title="Diskuze a komentáře" 
          taskId="10"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Řešení spočívá v promyšleném použití operací <code>+</code> a <code>*</code>:</p>
              <p><code>pocet1 = 3</code><br/><code>pocet2 = 2</code><br/><code>pocet3 = 5</code></p>
              <p>Alena (pocet1) = 3</p>
              <p>Petr (pocet1 * pocet2) = 6</p>
              <p>Pavla ((pocet1 + pocet1 * pocet2) * pocet3) = 45</p>
              <p>V další úloze si ověří, zda to postavili chytře z proměnných (jen změní pocet1 na 4, a na konci musí vyjít 60 pro Pavlu).</p>
            </div>
          }
        >
          <p>Kamarádi Alena, Petr a Pavla diskutují na sociální síti. Alena napsala <strong>3</strong> příspěvky. Petr na každý z nich poslal <strong>2</strong> odpovědi. Pavla všechno komentuje a ke každému z příspěvků Aleny a Petra poslala <strong>5</strong> komentářů.</p>
          <p>Vytvoř program <code>diskuze.py</code> a definuj pro tučně zvýrazněná čísla proměnné (třeba <code>pocet1</code>, <code>pocet2</code>, <code>pocet3</code>). Z těchto proměnných nechej program spočítat a vypsat:</p>
          <PythonSnippet code={`Počet příspěvků od Aleny: 3\nPočet příspěvků od Petra: 6\nPočet příspěvků od Pavly: 45`} />
          <p className="font-bold mt-4">Zkouška správnosti:</p>
          <p>Kolik komentářů by celkem napsala Pavla, jestliže by Alena napsala <strong>4</strong> příspěvky? Uprav nahoře jednu proměnnou (ostatní zachovej). Tvůj program by ti měl vyhodit pro Pavlu výsledek 60. Vyhodil?</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonOutputsChapter;
