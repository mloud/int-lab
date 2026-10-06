import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, RefreshCw, Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput } from './ScratchBlocks';

interface ScratchVariablesLoopsChapterProps {
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
  const [completed, setCompleted] = useLocalStorage(`scratch_task_var_loops_${taskId}`, false);
  
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

const AvailableBlocks = ({ children, title = "Dostupné bloky:" }: { children: React.ReactNode, title?: string }) => (
  <div className="flex flex-wrap gap-2 my-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
    <span className="text-sm font-bold text-slate-500 mr-2">{title}</span>
    {children}
  </div>
);

// Pomocné komponenty pro grafiku mřížky
const Line = ({ x1, y1, x2, y2, color = "blue", strokeWidth = 1, dashed = false }: any) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return (
    <div 
      className="absolute origin-left"
      style={{
        left: x1, top: y1, width: length, height: strokeWidth,
        backgroundColor: dashed ? 'transparent' : color,
        borderTop: dashed ? `${strokeWidth}px dashed ${color}` : 'none',
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
};

const ScratchVariablesLoopsChapter: React.FC<ScratchVariablesLoopsChapterProps> = ({ onBack }) => {
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
      title="Proměnná v cyklu" 
      onBack={onBack}
      accentColor="border-amber-500"
      icon={<RefreshCw className="w-8 h-8 text-amber-500" />}
    >
      <div className="max-w-4xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-3xl mb-8">
          <p className="text-amber-900/80 text-sm sm:text-base leading-relaxed font-bold">
            Proměnnou lze měnit uvnitř cyklu. Díky tomu můžeme počítat hodnoty krok za krokem (tzv. inkrementovat), počítat průběžný součet nebo vytvářet složitější obrazce závislé na aktuální hodnotě.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#inkrementace</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#střádač</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">#faktoriál</span>
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
            title="Tisk řad a násobilka" 
            taskId="1" 
            showTeacher={teacherMode} 
            teacherNote={<p>V těchto cvičeních žáci vytvářejí tzv. "čítač" – proměnnou, kterou uvnitř cyklu zvyšují o 1 (nebo jiný krok). Ukazuje se zde i využití operátoru spojování pro výpis formátovaného textu "číslo × i = ...".</p>}
            saveAs="TiskCisel.sb3"
          >
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
              <h4 className="text-lg font-black text-slate-800 mb-4">Úkoly k procvičení:</h4>
              <ol className="list-decimal pl-5 space-y-3 text-slate-700 font-medium">
                <li>Tisk čísel od jedničky do desítky</li>
                <li>Postupný tisk sudých čísel od 1 do 10</li>
                <li>Postupný tisk lichých čísel od 1 do 10</li>
                <li>Součet čísel od 1 do 10 a tisk <strong>až na konci</strong> (tzv. střádač)</li>
                <li>Postupný tisk malé násobilky zadaného čísla:
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600 font-normal">
                    <li>číslo × 1 = ... (bublina na 1 sec)</li>
                    <li>číslo × 2 = ... (bublina na 1 sec)</li>
                  </ul>
                </li>
              </ol>
            </div>

            <AvailableBlocks title="Bloky k použití pro příklad 5:">
              <ScratchBlock category="sensing">otázka <ScratchInput type="text">Zadej číslo:</ScratchInput></ScratchBlock>
              <ScratchBlock category="sensing">odpověď</ScratchBlock>
              <ScratchBlock category="operators"><ScratchInput> </ScratchInput> * <ScratchInput> </ScratchInput></ScratchBlock>
              <span className="bg-orange-500 rounded-full px-2 text-white border border-orange-600">číslo</span>
              <ScratchBlock category="looks">bublina <ScratchInput type="text">Ahoj!</ScratchInput> po <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
            </AvailableBlocks>
          </TaskCard>

          <TaskCard 
            number="2" 
            title="Faktoriál" 
            taskId="2" 
            showTeacher={teacherMode} 
            teacherNote={<p>Klasický algoritmus na výpočet faktoriálu demonstruje hromadění výsledku v proměnné (střádač pro násobení). Musí být správně nastavena počáteční hodnota na 1, nikoliv na 0.</p>}
            saveAs="Faktorial.sb3"
          >
            <p>Vypočítejte faktoriál zadaného čísla. Faktoriál se spočte jako součin všech čísel od 1 do zadaného čísla.</p>
            <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-400 my-4 text-slate-700">
              <strong>Např.:</strong><br />
              faktoriál 5 = 1 × 2 × 3 × 4 × 5 = <strong className="text-xl">120</strong>
            </div>

            <AvailableBlocks>
              <ScratchBlock category="sensing">otázka <ScratchInput type="text">Zadej číslo pro výpočet faktoriálu:</ScratchInput></ScratchBlock>
              <ScratchBlock category="looks">bublina <ScratchInput type="text">Faktoriál z 5 je 120</ScratchInput></ScratchBlock>
            </AvailableBlocks>
          </TaskCard>

          <TaskCard 
            number="3" 
            title="Výpočet obecné mocniny" 
            taskId="3" 
            showTeacher={teacherMode} 
            teacherNote={<p>Výpočet mocniny funguje podobně jako faktoriál, ale násobíme stále stejným číslem (základem), a to tolikrát, kolik určuje exponent.</p>}
            saveAs="Mocnina.sb3"
          >
            <h4 className="text-xl font-bold text-slate-800 mb-2">Mocnina: x<sup>y</sup></h4>
            <p>Naprogramujte výpočet obecné mocniny. Scénář se uživatele zeptá na <strong>základ</strong> a následně na <strong>exponent</strong>. Ze vstupů spočítá mocninu a vypíše výsledek.</p>
            <p className="text-sm text-slate-600 mb-4">(např. pro základ = 2 a exponent = 3 je výsledek 8).</p>
            
            <AvailableBlocks>
              <ScratchBlock category="sensing">otázka <ScratchInput type="text">Zadej základ:</ScratchInput></ScratchBlock>
              <ScratchBlock category="sensing">otázka <ScratchInput type="text">Zadej exponent:</ScratchInput></ScratchBlock>
            </AvailableBlocks>
          </TaskCard>

          <TaskCard 
            number="4*" 
            title="Čtvercová mřížka" 
            taskId="4" 
            showTeacher={teacherMode} 
            teacherNote={<p>Tento úkol kombinuje vykreslování perem (z lekce 1) se vnořenými cykly a dynamickými výpočty polohy. Pro středování mřížky musí žáci spočítat offset jako <code>-(velikost_buňky * počet_buněk) / 2</code>.</p>}
            saveAs="Mrizka_1.sb3"
          >
            <p className="flex items-center gap-2 font-bold text-red-600 mb-2">
              <GraduationCap className="w-5 h-5" /> Komplexní úloha
            </p>
            <p>Napište scénář, který pomocí pera nakreslí čtvercovou mřížku. Scénář bude používat dvě proměnné pro svoji konfiguraci:</p>
            <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 font-medium text-slate-700">
              <li>velikost buňky</li>
              <li>počet buněk</li>
            </ul>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-4">Levý horní roh je na [0, 0]</h4>
                <p className="text-sm text-slate-600 mb-4">V první fázi nastavte začátek kreslení mřížky tak, že bod [0, 0] odpovídá levému hornímu rohu celé mřížky.</p>
                
                <div className="flex flex-col gap-1 w-fit bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <ScratchBlock category="custom">scénář pro <ScratchInput type="text">kresli mřížku</ScratchInput></ScratchBlock>
                  <div className="pl-4 flex flex-col gap-1">
                    <ScratchBlock category="pen">smaž</ScratchBlock>
                    <ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock>
                    <div className="flex justify-center my-2 text-slate-400">...</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
                <div className="flex w-full justify-between mb-4">
                  <div className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">rozměr buňky: 20</div>
                  <div className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">počet buněk: 5</div>
                </div>
                <div className="relative w-40 h-40 mt-4 border border-slate-300 bg-white">
                  {/* 5x5 Grid drawing */}
                  {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                      {/* Vertical lines */}
                      <div className="absolute top-0 bottom-0 border-l border-blue-600" style={{ left: `${(i / 5) * 100}%` }} />
                      {/* Horizontal lines */}
                      <div className="absolute left-0 right-0 border-t border-blue-600" style={{ top: `${(i / 5) * 100}%` }} />
                    </React.Fragment>
                  ))}
                  {/* Red cross representation at the bottom right */}
                  <div className="absolute text-red-500 font-bold -bottom-4 -right-2 text-xl">+</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-blue-900 mb-6 font-medium">
              <strong>Rozšiřující úkol:</strong> Poté scénář upravte tak, aby absolutní <strong>střed mřížky ležel přesně na [0, 0]</strong>. K tomu budete muset využít proměnné pro výpočet posunu začátku vykreslování.
            </div>

            <AvailableBlocks>
              <ScratchBlock category="pen">pero zapni</ScratchBlock>
              <ScratchBlock category="pen">pero vypni</ScratchBlock>
              <ScratchBlock category="motion">změň x o <ScratchInput>10</ScratchInput></ScratchBlock>
              <ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock>
            </AvailableBlocks>
          </TaskCard>
        </div>

      </div>
    </FsChapterShell>
  );
};

export default ScratchVariablesLoopsChapter;
