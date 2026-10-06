import React, { useState } from 'react';
import { Blocks, Lock, Unlock, CheckCircle, Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput, ScratchCBlock, ScratchDefBlock, ScratchParam, ScratchSpeechBubble } from './ScratchBlocks';

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
  const [completed, setCompleted] = useLocalStorage(`scratch_task_subprograms_${taskId}`, false);
  
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

interface ScratchSubprogramsChapterProps {
  onBack: () => void;
}

const ScratchSubprogramsChapter: React.FC<ScratchSubprogramsChapterProps> = ({ onBack }) => {
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
      title="Podprogramy (Vlastní bloky)" 
      onBack={onBack}
      accentColor="border-amber-500"
      icon={<Blocks className="w-8 h-8 text-amber-500" />}
    >
      <div className="max-w-4xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-3xl mb-8">
          <p className="text-amber-900/80 text-sm sm:text-base leading-relaxed font-bold">
            Podprogram je pojmenovaná sekvence příkazů. Je výhodný tam, kde se opakuje volání stejné posloupnosti příkazů, 
            nebo chceme-li si program zpřehlednit rozdělením na menší, smysluplné části. V této lekci se naučíme tvořit 
            vlastní bloky a používat v nich vstupní parametry.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#podprogram</span>
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#parametr</span>
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#grafická knihovna</span>
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
            title="Vytvoření nového bloku" 
            taskId="1" 
            showTeacher={teacherMode} 
            teacherNote={<p>Ukažte žákům kategorii Moje bloky a tlačítko Vytvořit blok. V této úloze vytváříme blok bez parametrů. Žáci by měli pochopit rozdíl mezi "definicí" bloku (scénář pro) a "voláním" bloku (samotný růžový příkaz).</p>}
          >
            <p className="mb-4">
              Vytvořte vlastní blok s názvem <strong>Kresli ctverec</strong>. Pomocí tohoto bloku vykreslete 10 čtverců na náhodné pozici na obrazovce.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">1. Definice (scénář pro)</h4>
                <div className="flex flex-col gap-1 items-start">
                  <ScratchBlock category="custom">scénář pro <ScratchInput type="text" className="bg-pink-100">Kresli ctverec</ScratchInput></ScratchBlock>
                  <div className="pl-4 flex flex-col gap-1 items-start">
                    <ScratchBlock category="pen">pero zapni</ScratchBlock>
                    <ScratchCBlock category="control">opakuj <ScratchInput>4</ScratchInput> krát</ScratchCBlock>
                    <div className="pl-4 flex flex-col gap-1 items-start">
                      <ScratchBlock category="motion">dopředu o <ScratchInput>20</ScratchInput> kroků</ScratchBlock>
                      <ScratchBlock category="motion">otoč se ↻ o <ScratchInput>90</ScratchInput> stupňů</ScratchBlock>
                    </div>
                    <ScratchBlock category="pen">pero vypni</ScratchBlock>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">2. Použití (volání)</h4>
                <div className="flex flex-col gap-1 items-start">
                  <ScratchCBlock category="control">opakuj <ScratchInput>10</ScratchInput> krát</ScratchCBlock>
                  <div className="pl-4 flex flex-col gap-1 items-start">
                    <ScratchBlock category="motion">skoč na náhodnou pozici</ScratchBlock>
                    <ScratchBlock category="custom">Kresli ctverec</ScratchBlock>
                  </div>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="2" 
            title="Skládání podprogramů (Domeček)" 
            taskId="2" 
            showTeacher={teacherMode} 
            teacherNote={<p>Cílem je ukázat, že složitý problém (kresba domu) lze rozložit na menší (okno, střecha, zeď) a ty řešit samostatně. Hlavní program pak jen "diriguje" volání těchto dílčích bloků v potřebném pořadí.</p>}
            saveAs="KresleniDomu.sb3"
          >
            <p className="mb-4">
              Vytvořte scénář, který nakreslí domeček. Program rozložte logicky na dílčí bloky (podprogramy) a ty pak zavolejte v hlavním programu.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
                <h4 className="font-bold text-slate-700 mb-4 uppercase tracking-widest text-sm">Cílový obrázek</h4>
                <svg width="120" height="180" viewBox="0 0 120 180" className="stroke-indigo-600 stroke-[3] fill-none">
                  {/* Zed */}
                  <rect x="10" y="80" width="100" height="90" />
                  {/* Strecha */}
                  <polygon points="10,80 60,10 110,80" />
                  {/* Okno spodni leve */}
                  <rect x="30" y="110" width="20" height="20" />
                  {/* Okno spodni prave */}
                  <rect x="70" y="110" width="20" height="20" />
                  {/* Okno ve strese */}
                  <rect x="50" y="45" width="20" height="20" />
                </svg>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">1. Dílčí bloky (podprogramy):</h4>
                  <div className="flex flex-wrap gap-2">
                    <ScratchBlock category="custom">Kresli okno</ScratchBlock>
                    <ScratchBlock category="custom">Kresli strechu</ScratchBlock>
                    <ScratchBlock category="custom">Kresli zed</ScratchBlock>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">2. Hlavní blok:</h4>
                  <div className="flex flex-wrap gap-2">
                    <ScratchBlock category="custom">Kresli dům</ScratchBlock>
                  </div>
                </div>
              </div>
            </div>

            <AvailableBlocks>
              <ScratchBlock category="pen">smaž</ScratchBlock>
              <ScratchBlock category="pen">pero zapni</ScratchBlock>
              <ScratchBlock category="pen">pero vypni</ScratchBlock>
              <ScratchBlock category="motion">změň x o <ScratchInput>10</ScratchInput></ScratchBlock>
              <ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock>
              <ScratchBlock category="motion">otoč se ↺ o <ScratchInput>15</ScratchInput> stupňů</ScratchBlock>
              <ScratchCBlock category="control">opakuj <ScratchInput>10</ScratchInput> krát</ScratchCBlock>
            </AvailableBlocks>
          </TaskCard>

          <TaskCard 
            number="3" 
            title="Podprogramy s parametrem (Velikost)" 
            taskId="3" 
            showTeacher={teacherMode} 
            teacherNote={<p>Zavedení pojmu <strong>parametr</strong>. Učitel ukáže, jak v dialogu "Vytvořit blok" přidat "vstup - číslo nebo text". Žáci pak musí pochopit, že tento parametr se chová jako lokální proměnná (lze ho vytáhnout z definice a použít uvnitř). Výborný můstek k funkcím v Pythonu.</p>}
            saveAs="GrafickaKnihovna.sb3"
          >
            <div className="flex flex-col gap-6 items-stretch">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col justify-center">
                <h4 className="text-xl font-black text-slate-800 mb-6">Postup rozšíření bloku:</h4>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-700">Velikost čtverce</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Vytvořte vlastní blok s parametry, který vykreslí čtverec o dané velikosti.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-between">
                <h4 className="text-lg font-black text-slate-800 mb-6">Ukázka vykreslení a blok</h4>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[160px] bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                  <svg width="120" height="120" viewBox="-20 -20 140 140" className="overflow-visible">
                    {/* Crosshair (origin) */}
                    <path d="M-10,100 L30,100 M10,80 L10,120" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                    <circle cx="10" cy="100" r="3" fill="#64748b" />
                    
                    {/* Square */}
                    <rect x="10" y="20" width="80" height="80" fill="none" stroke="#ef4444" strokeWidth="3" />
                    
                    {/* Label */}
                    <text x="50" y="130" textAnchor="middle" className="font-bold text-slate-800 text-lg">strana</text>
                  </svg>
                </div>
                
                <div className="w-full max-w-full overflow-x-auto pb-2 flex justify-center">
                  <ScratchDefBlock>
                    Kresli ctverec <ScratchParam>velikost</ScratchParam>
                  </ScratchDefBlock>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="4" 
            title="Více parametrů (Pozice, Barva, Velikost)" 
            taskId="4" 
            showTeacher={teacherMode} 
            teacherNote={<p>Úloha demonstruje, že blok může mít více parametrů najednou. Žáci přidávají další vstupy v editoru bloku. Důležité je upozornit na pořadí parametrů.</p>}
          >
            <p className="mb-4">
              Rozšiřte svůj blok <code>KresliCtverec</code> tak, aby zvládl vykreslit čtverec na zadané pozici (<code>x, y</code>), určenou barvou a velikostí.
            </p>
            
            <div className="flex flex-col gap-1 items-start bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <ScratchDefBlock>
                Kresli Ctverec 
                <ScratchParam>x</ScratchParam>
                <ScratchParam>y</ScratchParam>
                <ScratchParam>velikost</ScratchParam>
                <ScratchParam>barva</ScratchParam>
              </ScratchDefBlock>
              
              <div className="mt-4 flex flex-col gap-1 pl-4 border-l-2 border-slate-200">
                <ScratchBlock category="motion">skoč na x: <span className="bg-pink-400 text-white px-2 py-0.5 rounded-full text-xs mx-1">x</span> y: <span className="bg-pink-400 text-white px-2 py-0.5 rounded-full text-xs mx-1">y</span></ScratchBlock>
                <ScratchBlock category="pen">nastav barvu pera na <span className="bg-pink-400 text-white px-2 py-0.5 rounded-full text-xs mx-1">barva</span></ScratchBlock>
                <div className="text-slate-400 text-sm py-1">... a zbytek jako minule ...</div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="5*" 
            title="Čtverec umístěný na střed" 
            taskId="5" 
            showTeacher={teacherMode} 
            teacherNote={<p>Tento úkol kombinuje parametrické podprogramy s matematikou. Klasické kreslení čtverce začíná v rohu. Abychom začali ve středu, musíme přesunout pero z pozice <code>(x, y)</code> do levého horního rohu, tedy o <code>-velikost/2</code> v x i y, a až pak nakreslit čtverec.</p>}
          >
            <div className="flex flex-col gap-6 items-stretch">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col justify-center">
                <h4 className="text-xl font-black text-slate-800 mb-6">Zadání úkolu:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-slate-700">Nový vlastní blok</h5>
                    <p className="text-sm text-slate-600">Přidejte nový vlastní blok s názvem <strong>KresliCtverecStred</strong>.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700">Vstupní parametry</h5>
                    <p className="text-sm text-slate-600">Definujte parametry pro pozici <strong>x, y</strong>, velikost (<strong>strana</strong>) a <strong>barva</strong>.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700">Umístění na střed</h5>
                    <p className="text-sm text-slate-600">Čtverec nakreslete tak, aby se jeho <strong className="text-red-500">střed</strong> nacházel přesně na souřadnicích x, y.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-between">
                <h4 className="text-lg font-black text-slate-800 mb-6">Ukázka vykreslení a blok</h4>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[160px] bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
                    {/* Crosshair (center) */}
                    <path d="M10,60 L110,60 M60,10 L60,110" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                    
                    {/* Square centered */}
                    <rect x="20" y="20" width="80" height="80" fill="none" stroke="#ef4444" strokeWidth="3" />
                    
                    {/* Center point labeled x,y */}
                    <circle cx="60" cy="60" r="4" fill="#ef4444" />
                    <text x="75" y="75" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
                  </svg>
                </div>
                
                <div className="w-full max-w-full overflow-x-auto pb-2 flex justify-center">
                  <ScratchDefBlock>
                    Kresli Ctverec Stred
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>velikost</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="6" 
            title="Knihovna geometrických útvarů" 
            taskId="6" 
            showTeacher={teacherMode} 
            teacherNote={<p>Úkolem je vytvořit další dva bloky centrované na střed: trojúhelník a kružnici. U trojúhelníku (rovnostranného) je středem těžiště, ale postačí i zjednodušená konstrukce. Kružnice na střed se kreslí nejsnáze pomocí posunu od středu na obvod a kreslením malých úseček (např. 36-úhelník).</p>}
          >
            <p className="mb-6 text-slate-600">
              Vytvořte si celou knihovnu vlastních bloků pro kreslení základních geometrických útvarů. Všechny útvary nechť se vykreslují ze zadaného <strong>středu</strong> <code>x, y</code> (s výjimkou prvního, který kreslí od rohu).
            </p>
            
            <div className="flex flex-col 2xl:flex-row gap-12 items-center xl:items-start bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
              <div className="flex flex-col gap-6 w-full overflow-x-auto pb-4 2xl:pb-0">
                <div className="min-w-max flex flex-col gap-6">
                  <ScratchDefBlock>
                    Kresli Ctverec
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>velikost</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                  <ScratchDefBlock>
                    Kresli Ctverec Stred
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>velikost</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                  <ScratchDefBlock>
                    Kresli Trojúhelník Střed
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>velikost</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                  <ScratchDefBlock>
                    Kresli Kruznici Stred
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>polomer</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                </div>
              </div>

              <div className="flex flex-col gap-6 items-center justify-center w-full 2xl:w-auto shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-lg">
                  {/* Ctverec z rohu */}
                  <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                      <path d="M-10,80 L30,80 M10,60 L10,100" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                      <rect x="10" y="20" width="60" height="60" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="10" cy="80" r="4" fill="#ef4444" />
                      <text x="25" y="95" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
                    </svg>
                  </div>

                  {/* Ctverec na stred */}
                  <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                      <path d="M10,50 L90,50 M50,10 L50,90" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                      <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="50" cy="50" r="4" fill="#ef4444" />
                      <text x="65" y="65" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
                    </svg>
                  </div>

                  {/* Kruznice na stred */}
                  <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                      <path d="M10,50 L90,50 M50,10 L50,90" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="50" cy="50" r="4" fill="#ef4444" />
                      <text x="65" y="65" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
                    </svg>
                  </div>

                  {/* Trojuhelnik na stred */}
                  <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                      <path d="M10,80 L90,80 M50,20 L50,100" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                      <polygon points="15,80 50,20 85,80" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="50" cy="80" r="4" fill="#ef4444" />
                      <text x="65" y="95" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="7" 
            title="Vyplněný čtverec" 
            taskId="7" 
            showTeacher={teacherMode} 
            teacherNote={<p>Jak nakreslit vyplněný čtverec? Nejjednodušší způsob je nastavit tloušťku pera na požadovanou 'velikost' a nakreslit jedinou krátkou úsečku ve středu. Nebo kreslit čáry těsně vedle sebe v cyklu (šrafování).</p>}
          >
            <div className="flex flex-col gap-6 items-stretch">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col justify-center">
                <h4 className="text-xl font-black text-slate-800 mb-6">Zadání úkolu:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-blue-500 mb-1">1 Nový vlastní blok</h5>
                    <p className="text-sm text-slate-600">Vytvořte vlastní blok s parametry pro vykreslení plného čtverce.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-500 mb-1">2 Vstupní parametry</h5>
                    <p className="text-sm text-slate-600">Definujte parametry pro pozici <strong>x, y</strong>, velikost (<strong>strana</strong>) a <strong>barva</strong>.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-500 mb-1">3 Vyplněný čtverec</h5>
                    <p className="text-sm text-slate-600">Blok vykreslí vyplněný čtverec o dané velikosti a barvě na pozici x, y.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-between">
                <h4 className="text-lg font-black text-slate-800 mb-6">Ukázka vykreslení a blok</h4>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[160px] bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
                    {/* Solid green square */}
                    <rect x="20" y="20" width="80" height="80" fill="#00ff00" />
                  </svg>
                </div>
                
                <div className="w-full max-w-full overflow-x-auto pb-2 flex justify-center">
                  <ScratchDefBlock>
                    Kresli Vyplneni Ctverec Stred
                    <ScratchParam>x</ScratchParam>
                    <ScratchParam>y</ScratchParam>
                    <ScratchParam>velikost</ScratchParam>
                    <ScratchParam>barva</ScratchParam>
                  </ScratchDefBlock>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="8" 
            title="Kresba pomocí připravené knihovny" 
            taskId="8" 
            showTeacher={teacherMode} 
            teacherNote={<p>Zde se propojuje veškeré učivo. Žáci by měli pochopit, že hlavní program bude obsahovat už jen několik růžových bloků volání podprogramů s konkrétními čísly (souřadnicemi, velikostmi a barvami).</p>}
            saveAs="GrafickaKnihovna.sb3"
          >
            <p className="mb-6 text-lg text-slate-800 text-center font-bold">
              Nakresli tento obraz pomocí existujících bloků, které sis připravil. Barvy vol dle uvážení.
            </p>
            
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden">
                <svg width="200" height="280" viewBox="0 0 200 280" className="overflow-visible z-10">
                  {/* Střecha (Trojúhelník - obrys tyrkysový) */}
                  <polygon points="100,10 10,140 190,140" fill="none" stroke="#06b6d4" strokeWidth="3" />
                  
                  {/* Základna (Vyplněný čtverec - zelený) */}
                  <rect x="10" y="140" width="180" height="130" fill="#4ade80" />
                  
                  {/* Okno ve střeše (Kružnice - obrys oranžový) */}
                  <circle cx="100" cy="95" r="18" fill="none" stroke="#d97706" strokeWidth="3" />
                  
                  {/* Levé okno (Čtverec obrys - modrý) */}
                  <rect x="35" y="170" width="35" height="35" fill="none" stroke="#2563eb" strokeWidth="3" />
                  
                  {/* Pravé okno (Čtverec obrys - modrý) */}
                  <rect x="130" y="170" width="35" height="35" fill="none" stroke="#2563eb" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </TaskCard>

          <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-3xl p-6 sm:p-8 mb-8 mt-12">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Matematické výpočty v podprogramech</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Ve Scratchi neexistuje možnost, jak by vlastní růžový blok sám "vrátil" hodnotu a dal se vložit do zeleného operátoru (na rozdíl od funkcí v Pythonu). Proto v této sekci bude platit pravidlo: <strong className="text-slate-800">Každý váš matematický blok bude na svém konci obsahovat fialový blok Bublina (bublinový výpis) s vypočteným výsledkem.</strong>
            </p>
          </div>

          <TaskCard 
            number="9" 
            title="Aritmetický průměr 3 známek" 
            taskId="9" 
            showTeacher={teacherMode} 
            teacherNote={<p>Důležité je upozornit na prioritu operátorů – nejprve součet, pak dělení. Ve Scratchi to znamená vložit operátory sčítání do sebe a celé to pak vložit do levé části dělení.</p>}
            saveAs="MatematickaKnihovna.sb3"
          >
            <p className="mb-4">
              Vytvořte podprogram s názvem <strong>Aritmeticky Prumer</strong>. Bude mít tři číselné parametry (tři různé známky). 
              Jeho úkolem je sečíst tyto tři známky, vydělit je třemi a výsledek říct v bublině ve tvaru <code>Prumer je X</code>.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <ScratchDefBlock>
                Aritmeticky Prumer
                <ScratchParam>znamka1</ScratchParam>
                <ScratchParam>znamka2</ScratchParam>
                <ScratchParam>znamka3</ScratchParam>
              </ScratchDefBlock>
              
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (např. 1, 3, 5):</span>
                <ScratchSpeechBubble>Prumer je 3</ScratchSpeechBubble>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="10" 
            title="Převod teploty (Celsia na Fahrenheita)" 
            taskId="10" 
            showTeacher={teacherMode} 
            teacherNote={<p>Vzorec pro převod je: <code>F = C * 1.8 + 32</code>. Žáci skládají zelené operátory. Výsledný výpis se spojuje textem <code>°C je </code> a <code>°F</code>.</p>}
          >
            <p className="mb-4">
              Vytvořte blok <strong>Celsius Na Fahrenheit</strong>, který má jeden parametr (teplotu ve stupních Celsia). Vypočítejte odpovídající teplotu ve stupních Fahrenheita.
            </p>
            <p className="mb-4 text-sm text-slate-500 italic">Nápověda: Vzorec je F = (C * 1.8) + 32.</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <ScratchDefBlock>
                Celsius Na Fahrenheit
                <ScratchParam>teplota_celsius</ScratchParam>
              </ScratchDefBlock>
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (např. 10):</span>
                <ScratchSpeechBubble>10 °C je 50 °F</ScratchSpeechBubble>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="11" 
            title="Délka přepony (Pythagorova věta)" 
            taskId="11" 
            showTeacher={teacherMode} 
            teacherNote={<p>Úloha vyžaduje nalezení bloku "odmocnina z" ve složitějších operátorech (dole v zelené sekci). Vzorec je <code>c = sqrt(a*a + b*b)</code>.</p>}
          >
            <p className="mb-4">
              Vytvořte blok <strong>Delka Prepony</strong> se dvěma parametry (odvěsny pravoúhlého trojúhelníku <code>a</code>, <code>b</code>). 
              Pomocí Pythagorovy věty vypočítejte přeponu <code>c</code>.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div>
                  <ScratchDefBlock>
                    Delka Prepony
                    <ScratchParam>a</ScratchParam>
                    <ScratchParam>b</ScratchParam>
                  </ScratchDefBlock>
                  <div className="mt-4 text-sm text-slate-500 italic">
                    Nápověda: Budete potřebovat blok <span className="bg-green-500 text-white px-2 py-0.5 rounded-full">odmocnina z ▼ (9)</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (3, 4):</span>
                  <ScratchSpeechBubble>Prepona je 5</ScratchSpeechBubble>
                </div>
              </div>
            </div>
          </TaskCard>

          <TaskCard 
            number="12" 
            title="Formátování času (HH:MM)" 
            taskId="12" 
            showTeacher={teacherMode} 
            teacherNote={<p>Zde se využije modulo (zbytek po dělení) a zaokrouhlování dolů. Hodiny = zaokrouhlit dolů(minuty / 60). Zbylé minuty = zbytek po dělení(minuty / 60).</p>}
          >
            <p className="mb-4">
              Máme celkový počet minut. Úkolem je tyto minuty rozdělit na celé hodiny a zbylé minuty a vypsat je. Vytvořte blok <strong>Formatuj cas</strong> s jedním parametrem <code>minutCelkem</code>.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex flex-col xl:flex-row gap-8 justify-between">
                <div>
                  <ScratchDefBlock>
                    Formatuj cas
                    <ScratchParam>minutCelkem</ScratchParam>
                  </ScratchDefBlock>
                  
                  <div className="mt-6 flex flex-col gap-3">
                    <h4 className="font-bold text-slate-700 text-sm">Potřebné bloky:</h4>
                    <div className="flex flex-col gap-3 items-start mt-2">
                      <ScratchBlock category="operators">
                        <span className="flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded-md mr-1 cursor-pointer">
                          zaokr. dolů
                          <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                        </span>
                        <ScratchInput type="empty" />
                      </ScratchBlock>
                      <ScratchBlock category="operators">
                        zbytek <ScratchInput type="empty" /> děleno <ScratchInput type="empty" />
                      </ScratchBlock>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-2 mt-4 xl:mt-0 xl:self-center">
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (78 minut):</span>
                  <ScratchSpeechBubble>1H:18M</ScratchSpeechBubble>
                </div>
              </div>
            </div>
          </TaskCard>

        </div>
      </div>
    </FsChapterShell>
  );
};

export default ScratchSubprogramsChapter;
