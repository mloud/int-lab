'use client';
import React, { useState } from 'react';
import { Terminal, CheckCircle, GraduationCap, Unlock, Lock, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonVariablesChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-orange-500 mr-2 select-none">{">>>"}</span>
            <span className="text-emerald-300">{line.substring(3).trim()}</span>
          </>
        ) : line.startsWith('Traceback') || line.startsWith('File') || line.startsWith('NameError') ? (
          <span className="text-rose-400">{line}</span>
        ) : (
          <span className="text-slate-300">{line}</span>
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
      title="Proměnné a paměť"
      subtitle="Paměťové krabičky a výpočty (iMyšlení Lekce 2)"
      icon={<Terminal className="w-8 h-8 text-orange-600" />}
      onBack={onBack}
      accentColor="orange"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Terminal }]}
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
          <h2 className="font-black text-orange-900 text-lg mb-2">Instrukce</h2>
          <p className="text-orange-800/80 text-sm sm:text-base">
            Otevři si na počítači program <strong>IDLE</strong> nebo <strong>Thonny</strong> na jedné polovině obrazovky. Dnes zjistíme, jak si počítač dokáže zapamatovat věci do pomyslných "krabiček", kterým budeme říkat <strong>Proměnné</strong>.
          </p>
        </div>

        <TaskCard 
          number="1" 
          title="Opakování z minula" 
          taskId="1"
          showTeacher={teacherMode}
          teacherNote={<p>Cílem první úlohy je připomenout si zapisování výrazů v jazyce Python z minulé lekce.</p>}
        >
          <p>Spusť Python a nech jej vypočítat, čemu se rovná výraz:</p>
          <PythonSnippet code=">>> (123 + 456) * 789" />
        </TaskCard>

        <TaskCard 
          number="2" 
          title="První proměnná" 
          taskId="2"
          showTeacher={teacherMode}
          teacherNote={<p>Proměnné mohou být náročným konceptem. Pokud si někteří žáci nebudou jisti, můžeme jim pomoci vysvětlením s krabičkou, do níž lze vložit hodnotu.</p>}
        >
          <p>V matematice je zvykem označovat hodnoty písmeny (například délka strany čtverce <code>a = 100</code>). To samé můžeš udělat i v Pythonu. Zkus napsat:</p>
          <PythonSnippet code=">>> a = 100" />
          <p>Jestli se nic nevypsalo (ani žádná chyba), je to správně. Python si vytvořil <strong>proměnnou s názvem <code>a</code></strong> a přitom si zapamatoval, že má hodnotu 100. Nyní zkus zjistit, co v ní je:</p>
          <PythonSnippet code=">>> a" />
          <p>Uvidíš, jakou hodnotu si Python pamatuje v proměnné <code>a</code>.</p>
        </TaskCard>

        <TaskCard 
          number="3" 
          title="Více krabiček" 
          taskId="4"
          showTeacher={teacherMode}
          teacherNote={<p>Úloha slouží ke zjištění, že je možné používat více proměnných, mohou mít delší názvy a do proměnné lze přiřadit rovnou hodnotu výrazu.</p>}
        >
          <p>Vyzkoušej vytvořit a nastavit i jiné proměnné. Zkus do proměnné přiřadit rovnou výpočet:</p>
          <PythonSnippet code={`>>> vyska = 167\n>>> cena = 22 + 7`} />
          <p>Zkontroluj, zda proměnné s názvy <code>vyska</code> a <code>cena</code> mají správné hodnoty (jen napiš jejich jméno a stiskni Enter).</p>
        </TaskCard>

        <TaskCard 
          number="4" 
          title="Chyba jména" 
          taskId="6"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-2">
              <p>Je vhodné si zvyknout i na chybová hlášení, která žáci uvidí, když použijí neexistující proměnnou, případně se zmýlí při psaní (překlep).</p>
              <p>Chyba začíná slovy <code>Traceback...</code> a na posledním řádku stojí <code>NameError: name 'vek' is not defined</code>.</p>
            </div>
          }
        >
          <p>Co se stane, když se pokusíš zjistit hodnotu proměnné, kterou jsi ještě nevytvořil?</p>
          <PythonSnippet code=">>> vek" />
          <p>Jestliže proměnná <code>vek</code> neexistuje, vypíše se několik řádků s chybovým hlášením. Pozorně si přečti poslední řádek. Co ti Python sděluje?</p>
        </TaskCard>

        <TaskCard 
          number="5" 
          title="Počítání s proměnnými" 
          taskId="7"
          showTeacher={teacherMode}
          teacherNote={<p>Když není žákům jasné, jak se výraz vyhodnocuje, odkrokujeme jej (např. Počítač se podívá do proměnné vyska, dosadí její hodnotu a počítá 190 - 167).</p>}
        >
          <p>Proměnné můžeš použít i v matematických zápisech a Python namísto názvu proměnné dosadí její hodnotu. Urči výsledek následujících příkazů (proměnné <code>vyska</code> a <code>cena</code> už máš z minula):</p>
          <PythonSnippet code={`>>> 190 - vyska\n>>> 3 * cena + 10\n>>> cena + vyska`} />
        </TaskCard>

        <TaskCard 
          number="6" 
          title="Změna paměti" 
          taskId="8"
          showTeacher={teacherMode}
          teacherNote={<p>Žáci si často myslí, že se proměnná nedá přepsat. Nyní zjistí, že proměnným můžeme změnit jejich obsah.</p>}
        >
          <p>Obsah proměnné (krabičky) můžeme kdykoliv přepsat novou hodnotou. Zkus toto:</p>
          <PythonSnippet code=">>> cena = 5 * 11" />
          <p>Poté si hodnotu zkontroluj (napiš <code>cena</code>). Teď změň hodnotu proměnné <code>vyska</code> tak, aby v ní byla tvoje výška v centimetrech. Přesvědč se, že se tak stalo.</p>
        </TaskCard>

        <TaskCard 
          number="7" 
          title="Pamatuje si výsledek nebo vzorec?" 
          taskId="10"
          showTeacher={teacherMode}
          teacherNote={<p>Tato úloha je extrémně důležitá! Někteří žáci (zkušení z Excelu) se mylně domnívají, že se hodnota <code>obsah</code> automaticky přepočítá, když se změní <code>a</code>. Musí zjistit, že proměnná si pamatuje pouze hodnotu (číslo), nikoliv vzorec!</p>}
        >
          <p>Toto je důležitý test. Co vykonají tyto příkazy?</p>
          <PythonSnippet code={`>>> a = 100\n>>> obsah = a * a\n>>> obsah\n>>> a = 1\n>>> obsah`} />
          <p>Proč byla hodnota <code>obsah</code> na konci stále 10000, i když jsme <code>a</code> změnili na 1? Co si vlastně proměnná zapamatuje?</p>
        </TaskCard>

        <TaskCard 
          number="8" 
          title="Složitější příklady" 
          taskId="11"
          showTeacher={teacherMode}
          teacherNote={<p>Přiřazovací příkaz se vykonává tak, že se nejprve vyhodnotí výraz na pravé straně a až potom se hodnota uloží do proměnné nalevo od <code>=</code>.</p>}
        >
          <p>Přiřaď do proměnné <code>zmrzlina</code> cenu jedné zmrzliny (například 25 korun). Do proměnné <code>pocet</code> přiřaď počet kamarádů, kterým chceš koupit po jedné zmrzlině.</p>
          <p>Za použití proměnných sestav přiřazovací příkaz, pomocí kterého se do třetí proměnné <code>zaplatit</code> přiřadí suma, kterou zaplatíš (tzn. zmrzlina krát počet).</p>
        </TaskCard>

        <TaskCard 
          number="9" 
          title="Pravidla pojmenování" 
          taskId="17"
          showTeacher={teacherMode}
          teacherNote={
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li><code>kuk</code>, <code>prvni_trida</code>, <code>OK</code> - v pořádku</li>
              <li><code>Ahoj!</code> - nesprávný, obsahuje vykřičník</li>
              <li><code>1.A</code> - nesprávný, začíná číslicí a má tečku</li>
              <li><code>cerno-bile</code> - nesprávný, Python to chápe jako odčítání dvou proměnných! Vhodný název je s podtržítkem <code>cerno_bile</code>.</li>
              <li><code>počet osob</code> - nesprávný (mezera).</li>
              <li><code>trida(3)</code> - nesprávný (závorky).</li>
            </ul>
          }
        >
          <p>Proměnným můžeš dát téměř libovolný název, ale existují pravidla. <strong>Nesmí začínat číslicí, nemohou obsahovat mezeru ani speciální znaky (plus, mínus, tečka atd.)</strong>. Podtržítko je dovoleno.</p>
          <p>Které z následujících názvů jsou podle tebe <strong>nesprávné</strong> (a proč)?</p>
          <ul className="list-disc pl-5 text-sm sm:text-base font-mono bg-slate-50 p-4 rounded-xl mt-2 grid grid-cols-2 gap-2">
            <li>kuk</li>
            <li>Ahoj!</li>
            <li>1.A</li>
            <li>prvni_trida</li>
            <li>cerno-bile</li>
            <li>OK</li>
            <li>věk</li>
            <li>počet osob</li>
          </ul>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonVariablesChapter;
