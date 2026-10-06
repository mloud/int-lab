import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Calculator, Save, Star } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput, ScratchCBlock } from './ScratchBlocks';

interface ScratchVariablesChapterProps {
  onBack: () => void;
}

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <Unlock className="w-4 h-4 text-amber-600" />
      <span className="font-bold text-amber-800 text-sm uppercase tracking-wider">Metodika pro učitele</span>
    </div>
    <div className="text-amber-900/80 text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

const TaskCard = ({ number, title, children, showTeacher, teacherNote, taskId, saveAs }: any) => {
  const [completed, setCompleted] = useLocalStorage(`scratch_task_variables_${taskId}`, false);
  
  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${completed ? 'border-amber-200 bg-amber-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

          {saveAs && (
            <div className="mt-4 px-4 py-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-sm flex items-center gap-3">
              <Save className="w-5 h-5 text-blue-500" /> 
              <span>Projekt uložte jako: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">{saveAs}</strong></span>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setCompleted(!completed)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                completed 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${completed ? 'text-amber-600' : 'text-slate-400'}`} />
              {completed ? 'Splněno' : 'Označit jako splněné'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableBlocks = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-2 my-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
    <span className="text-sm font-bold text-slate-500 mr-2">Dostupné bloky:</span>
    {children}
  </div>
);

const ScratchVariablesChapter: React.FC<ScratchVariablesChapterProps> = ({ onBack }) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setTeacherMode(true);
      setPinMode(false);
      setPin('');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  return (
    <FsChapterShell 
      title="Základy – Proměnné a operátory" 
      onBack={onBack}
      accentColor="border-amber-500"
      icon={<Calculator className="w-8 h-8 text-amber-500" />}
    >
      <div className="max-w-4xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-3xl mb-8">
          <p className="text-amber-900/80 text-sm sm:text-base leading-relaxed font-bold">
            Proměnná si lze představit jako krabičku, do které můžeme uložit hodnotu (číslo, text) a později se k ní vrátit. Operátory nám pak umožňují s těmito hodnotami pracovat – sčítat je, porovnávat je nebo je spojovat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#proměnná</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#operátory</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#vstup-uživatele</span>
          </div>
        </div>
        
        {/* Přepínač metodiky */}
        <div className="flex justify-end mb-8">
          {!teacherMode && !pinMode && (
            <button 
              onClick={() => setPinMode(true)}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-600 transition-colors px-4 py-2 rounded-xl hover:bg-amber-50"
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Učitelský přístup</span>
            </button>
          )}
          
          {pinMode && (
            <form onSubmit={handlePinSubmit} className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN" 
                className={`w-24 px-3 py-1.5 rounded-lg border-2 outline-none text-center font-mono ${pinError ? 'border-red-400 bg-red-50' : 'border-amber-200 focus:border-amber-400'}`}
                autoFocus
              />
              <button type="submit" className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600">
                Odemknout
              </button>
              <button type="button" onClick={() => setPinMode(false)} className="px-3 py-1.5 text-slate-400 hover:text-slate-600 text-sm">
                Zrušit
              </button>
            </form>
          )}

          {teacherMode && (
            <div className="flex items-center gap-4 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 text-amber-700">
                <Unlock className="w-4 h-4" />
                <span className="text-sm font-bold">Metodika aktivní</span>
              </div>
              <button onClick={() => setTeacherMode(false)} className="text-xs text-amber-600 hover:text-amber-800 underline">
                Skrýt
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <TaskCard 
            number="1" 
            title="Náhodná velikost a pozice" 
            taskId="1" 
            showTeacher={teacherMode} 
            teacherNote={<p>Žáci si vyzkoušejí vkládat oválný blok operátoru přímo do vstupního pole jiného bloku. Ukažte jim, jak se vstupní políčko "rozsvítí", když nad něj operátor přetáhnou.</p>}
            saveAs="NahodnyCtverec.sb3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-black text-slate-800 mb-2">1. Úkol: Náhodná velikost</h4>
                <p className="text-sm text-slate-600">Vytvořte scénář, který pomocí pera nakreslí čtverec o náhodné velikosti.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-black text-slate-800 mb-2">2. Úkol: Náhodná pozice</h4>
                <p className="text-sm text-slate-600">Upravte scénář tak, aby nakreslil čtverec na náhodné pozici.</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-amber-800 mb-1">Nápověda k řešení</h4>
                <p className="text-sm text-amber-700">Pro generování náhodných hodnot (šířky i souřadnic) použijte tento zelený blok z kategorie Operátory:</p>
              </div>
              <ScratchBlock category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchBlock>
            </div>
          </TaskCard>

          <TaskCard 
            number="2" 
            title="Proměnlivý počet hvězdiček" 
            taskId="2" 
            showTeacher={teacherMode} 
            teacherNote={<p>V tomto úkolu musí žáci vytvořit vlastní proměnnou (např. <code>počet</code>). Tuto proměnnou následně vloží jako parametr do cyklu <ScratchCBlock category="control">opakuj <ScratchInput>10</ScratchInput> krát</ScratchCBlock>.</p>}
            saveAs="SekvenceTiskHvezdicekPromenna.sb3"
          >
            <p>Nyní využijeme proměnnou jako počítadlo. Vytvořte proměnnou (např. v kategorii Proměnné klikněte na "Vytvoř proměnnou"). Sestavte scénář tak, aby tisknul proměnlivý počet hvězdiček podle toho, jakou hodnotu proměnné nastavíte.</p>
            
            <AvailableBlocks>
              <ScratchBlock category="pen">smaž</ScratchBlock>
              <ScratchBlock category="pen">otiskni se</ScratchBlock>
              <ScratchBlock category="motion">dopředu o <ScratchInput>40</ScratchInput> kroků</ScratchBlock>
              <ScratchBlock category="looks">ukaž se</ScratchBlock>
              <ScratchBlock category="looks">skryj se</ScratchBlock>
              <ScratchCBlock category="control">opakuj <ScratchInput type="dropdown" className="bg-orange-500 text-white border-orange-600">proměnná</ScratchInput> krát</ScratchCBlock>
            </AvailableBlocks>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-center min-h-[120px]">
                <div className="flex gap-2">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-center min-h-[120px]">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-center min-h-[120px]">
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="3" 
            title="Tvary z hvězdiček pomocí proměnné" 
            taskId="3" 
            showTeacher={teacherMode} 
            teacherNote={<p>Zde se proměnná používá uvnitř cyklu a zároveň se v každém průběhu cyklu <strong>zvyšuje o 1</strong> (nebo jiný krok). Ukazujeme tím dynamickou změnu hodnoty proměnné za běhu programu. K tomu slouží blok <ScratchBlock category="variables">změň <ScratchInput type="dropdown">proměnná</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>.</p>}
            saveAs="SekvenceTiskHvezdicekPromenna.sb3"
          >
            <p>Nyní scénář zkomplikujeme. Proměnná nemusí mít stejnou hodnotu po celou dobu běhu programu – můžete ji průběžně měnit (například zvětšovat o 1 v každém řádku). Sestavte scénáře tak, aby tiskly tyto tvary s použitím proměnné.</p>
            
            <AvailableBlocks>
              <ScratchBlock category="pen">smaž</ScratchBlock>
              <ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock>
              <ScratchBlock category="pen">otiskni se</ScratchBlock>
              <ScratchBlock category="motion">dopředu o <ScratchInput>40</ScratchInput> kroků</ScratchBlock>
              <ScratchBlock category="looks">ukaž se</ScratchBlock>
              <ScratchBlock category="looks">skryj se</ScratchBlock>
              <ScratchCBlock category="control">opakuj <ScratchInput>5</ScratchInput> krát</ScratchCBlock>
              <ScratchBlock category="variables">změň <ScratchInput type="dropdown">počet</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
            </AvailableBlocks>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[200px]">
                <div className="flex flex-col items-start gap-2 w-fit mx-auto">
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                  <div className="flex gap-2"><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /><Star className="w-6 h-6 text-amber-400 fill-amber-400" /></div>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="4" 
            title="Operátory" 
            taskId="4" 
            showTeacher={teacherMode} 
            teacherNote={<p>Aritmetické operátory (zelené bloky) lze skládat do sebe. Upozorněte žáky, že při vkládání jednoho operátoru do druhého se ve Scratchi dodržují matematická pravidla přednosti operací pomocí struktury – blok, který obaluje ostatní, se vyhodnotí naposled.</p>}
          >
            <p>Aritmetické operátory jsou speciální zelené bloky, které umožňují provádět výpočty. Vyzkoušejte si tyto operátory a zkuste pochopit, jak se dají kombinovat skládáním do sebe (jako matematické závorky).</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col gap-4 items-start">
                <h4 className="font-bold text-slate-500 text-sm mb-2 uppercase tracking-wider">Základní</h4>
                <ScratchBlock category="operators"><ScratchInput>1</ScratchInput> + <ScratchInput>2</ScratchInput></ScratchBlock>
                <ScratchBlock category="operators"><ScratchInput>1</ScratchInput> + <span className="bg-green-500 rounded-full px-2 py-0.5 text-white inline-flex items-center shadow-inner border border-green-600"><ScratchInput>2</ScratchInput> + <ScratchInput>3</ScratchInput></span></ScratchBlock>
                <ScratchBlock category="operators"><ScratchInput>2</ScratchInput> + <span className="bg-green-500 rounded-full px-2 py-0.5 text-white inline-flex items-center shadow-inner border border-green-600"><ScratchInput>10</ScratchInput> / <ScratchInput>2</ScratchInput></span></ScratchBlock>
                <ScratchBlock category="operators"><span className="bg-green-500 rounded-full px-2 py-0.5 text-white inline-flex items-center shadow-inner border border-green-600"><ScratchInput>2</ScratchInput> + <ScratchInput>10</ScratchInput></span> / <ScratchInput>2</ScratchInput></ScratchBlock>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col gap-4 items-start">
                <h4 className="font-bold text-slate-500 text-sm mb-2 uppercase tracking-wider">S proměnnou</h4>
                <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">číslo</ScratchInput> na <ScratchInput>2</ScratchInput></ScratchBlock>
                <ScratchBlock category="operators"><span className="bg-orange-500 rounded-full px-2 text-white border border-orange-600">číslo</span> + <ScratchInput>2</ScratchInput></ScratchBlock>
                <ScratchBlock category="operators">
                  <ScratchInput type="dropdown" className="bg-green-600 text-white border-green-700">abs</ScratchInput> z <span className="bg-green-500 rounded-full px-2 py-0.5 text-white inline-flex items-center shadow-inner border border-green-600"><ScratchInput>-2</ScratchInput> * <span className="bg-orange-500 rounded-full px-1.5 text-white border border-orange-600 text-xs">číslo</span></span>
                </ScratchBlock>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col gap-4 items-start">
                <h4 className="font-bold text-slate-500 text-sm mb-2 uppercase tracking-wider">Matematické funkce</h4>
                <p className="text-sm text-slate-600 mb-2">Rozbalovací menu bloku matematických funkcí nabízí mnoho pokročilých operací:</p>
                <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
                  <li><code>abs</code> (absolutní hodnota)</li>
                  <li><code>zaokr. dolů / nahoru</code></li>
                  <li><code>odmocnina</code></li>
                  <li><code>sin, cos, tg</code></li>
                </ul>
              </div>
            </div>
          </TaskCard>
        </div>

      </div>
    </FsChapterShell>
  );
};

export default ScratchVariablesChapter;
