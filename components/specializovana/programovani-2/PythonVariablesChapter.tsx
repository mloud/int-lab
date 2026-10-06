'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Terminal, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonVariablesChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-orange-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-orange-500 mr-2 select-none">{">>>"}</span>
            <span className="text-orange-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-orange-600" />
      <span className="font-bold text-orange-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-orange-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py2-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonVariablesChapter: React.FC<PythonVariablesChapterProps> = ({ onBack }) => {
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
      title="Proměnné"
      subtitle="Lekce 2"
      icon={<Terminal className="w-8 h-8 text-orange-600" />}
      onBack={onBack}
      accentColor="orange"
      tabs={[{ id: 'lekce', label: 'Lekce 2', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-orange-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-orange-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl mb-8">
          <p className="text-orange-800/80 text-sm sm:text-base font-bold">
            Cílem první úlohy je připomenout si zapisování výrazů v jazyce Python z minulé lekce:
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode}>
          <p>Spusť Python a nech jej vypočítat, čemu se rovná výraz <code>(123 + 456) * 789</code></p>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Proměnné mohou být náročným konceptem. Proto je cílem tohoto pracovního listu, aby se žáci postupně seznámili s jednoduchými proměnnými. Zatím do proměnných přiřazují jen čísla a ty potom používají v elementárních úlohách.<br/><br/>Proměnnou si můžeme představit jako krabičku, do níž lze vložit určitou hodnotu. My jsme pomocí zápisu <code>{">>>"} a = 100</code> zajistili, aby se vytvořila proměnná (krabička) s názvem a a vložila se do ní hodnota 100.</p>}>
          <p>V matematice je zvykem označovat hodnoty písmeny, například délka strany čtverce <code>a = 100</code>. To samé můžeš udělat i v Pythonu. Zkus napsat:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
            {">>>"} a = 100   <span className="italic text-slate-500">a potvrď klávesou Enter</span>
          </div>
          <p>Jestli se nic nevypsalo (ani žádná chyba), je to správně. Python si vytvořil proměnnou s názvem a a přitom si zapamatoval, že má hodnotu 100. Toto můžeme znázornit pomocí krabičky vpravo:</p>
          <div className="mt-4 flex flex-col items-center">
            <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">100</div>
            <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">a</div>
          </div>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode}>
          <p>Zkus nyní napsat jen:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
            {">>>"} a         <span className="italic text-slate-500">a potvrď klávesou Enter</span>
          </div>
          <p>Uvidíš, jakou hodnotu si Python pamatuje v proměnné <code>a</code>.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>I další úloha slouží ke sbírání prvních zkušeností s proměnnými. Žáci by měli zjistit, že: je možné používat více proměnných, proměnné mohou mít delší názvy, do proměnné lze přiřadit hodnota výrazu.</p>}>
          <p>Vyzkoušej vytvořit a nastavit i jiné proměnné:</p>
          <PythonSnippet code={`>>> vyska = 167\n>>> cena = 22 + 7`} />
          <p>Znázornit je můžeme následovně:</p>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">100</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">a</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">167</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">vyska</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">29</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">cena</div>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Proměnná funguje podobně jako paměť kalkulačky (tlačítko M) – do ní si lze uložit jednu hodnotu a tu později použít v dalších výpočtech. V Pythonu si můžeš vytvořit libovolný počet takovýchto „pamětí“.</p>}>
          <p>Zkontroluj, zda proměnné s názvy <code>vyska</code>, <code>cena</code> mají správné hodnoty.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode}>
          <p>Zkus napsat:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
            {">>>"} vek       <span className="italic text-slate-500">a potvrď klávesou Enter</span>
          </div>
          <p>Jestliže proměnná <code>vek</code> neexistuje, vypíše se několik řádků s chybovým hlášením – pro odhalení chyby je důležitý poslední řádek:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Traceback (most recent call last):<br/>
  File "{'<pyshell#0>'}", line 1, in {'<module>'}<br/>
    vek<br/>
NameError: name 'vek' is not defined <span className="italic text-slate-500">... proměnná vek neexistuje</span>
          </div>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Když není žákům jasné, jak se výraz vyhodnocuje, případně proč počítač zobrazuje daný výsledek, doporučujeme výraz napsat na tabuli a jeho vyhodnocení odkrokovat (například: „Počítač se podívá do proměnné vyska, dosadí její hodnotu do výrazu 190 - vyska. Bude počítat 190 - 167. Na obrazovce uvidíme výsledek 23“).</p>}>
          <p>Proměnné můžeš použít i v matematických zápisech a Python namísto názvu proměnné dosadí její hodnotu. Urči výsledek následujících příkazů:</p>
          <PythonSnippet code={`>>> 190 - vyska\n>>> 3 * cena + 10\n>>> cena + vyska`} />
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode}>
          <p>Proměnným můžeme změnit jejich obsah – vyzkoušej:</p>
          <PythonSnippet code={`>>> cena = 5 * 11`} />
          <p>Momentální stav paměti bychom mohli zakreslit takto – všimni si, že se změnila proměnná <code>cena</code>:</p>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">100</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">a</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">167</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">vyska</div>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="bg-slate-200 border-2 border-slate-400 w-24 h-8 flex items-center justify-center font-bold text-lg">55</div>
              <div className="bg-sky-400 border-2 border-sky-600 w-24 h-8 flex items-center justify-center font-bold text-yellow-300 text-lg">cena</div>
              <div className="absolute top-0 -translate-x-12 -translate-y-2 text-red-500 font-bold line-through">29</div>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode}>
          <p>Změň hodnotu proměnné <code>vyska</code> tak, aby v ní byla tvoje výška v centimetrech. Přesvědč se, že se tak stalo.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Následující úloha je důležitá, neboť je na ní zřejmé, že proměnné si nepamatují vztahy, ale hodnoty (tj. proměnná obsah si zapamatuje 10000, nikoliv vzorec a * a).</p>}>
          <p>Zkus i takovéto příkazy – co vykonají?</p>
          <PythonSnippet code={`>>> obsah = a * a\n>>> obsah\n>>> a = 1\n>>> obsah`} />
          <p>Znázorni obsah proměnných pomocí krabiček.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Předpokládaný postup řešení:<br/><code>{">>>"} zmrzlina = 25</code><br/><code>{">>>"} pocet = 7</code><br/><code>{">>>"} zaplatit = zmrzlina * pocet</code><br/><code>{">>>"} zaplatit</code><br/><code>175</code></p>}>
          <p>Přiřaď do proměnné <code>zmrzlina</code> cenu jedné zmrzliny (například 25 korun). Do proměnné <code>pocet</code> přiraď počet kamarádů, kterým chceš koupit po jedné zmrzlině. Za použití proměnných sestav přiřazovací příkaz, pomocí kterého se do třetí proměnné <code>zaplatit</code> přiřadí suma, kterou zaplatíš. Přesvědč se, že to počítač dobře vypočítal.</p>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Očekávané řešení:<br/><code>{">>>"} delka = 2500</code><br/><code>{">>>"} sirka = 1000</code><br/><code>{">>>"} hloubka = 180</code><br/><code>{">>>"} litry = delka * sirka * hloubka / 1000</code><br/><code>{">>>"} litry</code><br/><code>450000.0</code><br/><code>{">>>"} objem = litry / 1000</code><br/><code>{">>>"} objem</code><br/><code>450.0</code></p>}>
          <p>Přiřaď do proměnných <code>delka</code>, <code>sirka</code> a <code>hloubka</code> rozměry školního bazénu v centimetrech (například s hodnotami <code>delka = 2500</code>, <code>sirka = 1000</code>, <code>hloubka = 180</code>). Sestav přiřazovací příkaz:</p>
          <ul className="list-none pl-5 mt-2 space-y-1">
            <li>a) kterým se přiřadí do proměnné <code>litry</code>, kolik litrů vody je třeba na napuštění celého bazénu,</li>
            <li>b) kterým se do proměnné <code>objem</code> přiřadí, kolik je to kubických metrů vody.</li>
          </ul>
        </TaskCard>

        <TaskCard number="13" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>{">>>"} x = 5</code><br/><code>{">>>"} (((x + 1) * 2 + 1) * 2 + 1) * 2</code><br/><code>54</code></p>}>
          <p>Vytvoř příkazy odpovídající zadání:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm mb-4">
            <li>do proměnné <code>x</code> přiřaď nějakou hodnotu</li>
            <li>zobraz hodnotu následujícího výrazu: k hodnotě proměnné <code>x</code> připočítej 1, výsledek vynásob 2, opět k výsledku připočítej 1 a vynásob 2 a do třetice opět k výsledku připočítej 1 a vynásob 2.</li>
          </ul>
          <p>Například pro <code>x</code> rovno 5, bys měl(a) dostat výsledek 54.</p>
        </TaskCard>

        <TaskCard number="14" title="" taskId="14" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>{">>>"} faktorial10 = 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10</code><br/><code>{">>>"} faktorial10</code><br/><code>3628800</code></p>}>
          <p>V matematice se počítá faktoriál nějakého čísla <code>n</code> jako součin čísel od 1 do <code>n</code>. Například faktoriál čísla 4 spočítáme jako součin čísel <code>1 * 2 * 3 * 4</code>. Do proměnné <code>faktorial10</code> přiřaď hodnotu faktoriálu čísla 10 (součin čísel od 1 do 10). Hodnotu proměnné <code>faktorial10</code> poté zobraz.</p>
        </TaskCard>

        <TaskCard number="15" title="" taskId="15" showTeacher={teacherMode}>
          <p>Všimni si názvů proměnných v následujících příkazech a znázorni proměnné pomocí krabiček. Poté příkazy vyzkoušej:</p>
          <PythonSnippet code={`>>> strana_ctverce = 150\n>>> obvod_ctverce = 4 * strana_ctverce\n>>> obsah_ctverce = strana_ctverce * strana_ctverce`} />
        </TaskCard>

        <TaskCard number="16" title="" taskId="16" showTeacher={teacherMode} teacherNote={<p>Možné řešení:<br/><code>{">>>"} pi = 3.14</code><br/><code>{">>>"} polomer = 5</code><br/><code>{">>>"} obvod_kruhu = 2 * pi * polomer</code><br/><code>{">>>"} obsah_kruhu = pi * polomer * polomer</code><br/><code>{">>>"} obvod_kruhu</code><br/><code>31.400000000000002</code><br/><code>{">>>"} obsah_kruhu</code><br/><code>78.5</code><br/><br/>V jazyce Python se pro zápis desetinných čísel nepoužívá desetinná čárka, ale tečka.</p>}>
          <p>V matematice značíme obsah kruhu S a počítáme jej podle vzorce πr². Obvod kruhu značíme O a počítáme jej podle vzorce 2πr. Zkus (podobně jako v úloze 15) nazvat proměnné pro poloměr, obsah i obvod kruhu vhodnými delšími názvy a přiřaď do nich správné výrazy. Vytvoř si i proměnnou <code>pi</code> s hodnotou 3.14 .</p>
        </TaskCard>

        <TaskCard number="17" title="" taskId="17" showTeacher={teacherMode} teacherNote={<p>Pomůcky k diskuzi:<br/>kuk ... v pořádku<br/>Ahoj! ... nesprávný název, obsahuje vykřičník<br/>1.A ... nesprávný název, začíná číslicí a obsahuje tečku<br/>prvni_trida ... v pořádku<br/>cerno-bile ... nesprávný název (Python to pochopí jako rozdíl dvou proměnných)<br/>OK ... v pořádku<br/>o0o0o0o ... v pořádku, ale je špatně čitelný<br/>asdf ... v pořádku, ale nepoznáme význam<br/>věk ... v pořádku, ale diakritika se nedoporučuje<br/>počet osob ... nesprávný název, obsahuje mezeru<br/>trida(3) ... nesprávný název, obsahuje závorky</p>}>
          <p>Diskutuj se svým spolužákem, které z následujících výrazů mohou nebo nemohou být názvy proměnných. Poté své domněnky ověř – zkus vytvořit proměnné odpovídajících názvů a přiřadit do nich nějaké hodnoty:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
kuk<br/>
Ahoj!<br/>
1.A<br/>
prvni_trida<br/>
cerno-bile<br/>
OK<br/>
o0o0o0o<br/>
asdf<br/>
věk<br/>
počet osob<br/>
trida(3)
          </div>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonVariablesChapter;
