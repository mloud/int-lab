import React from 'react';
import { ScratchBlock, ScratchInput, ScratchCBlock, ScratchDefBlock, ScratchParam } from '../ScratchBlocks';
import { TaskCard, AvailableBlocks } from '../ScratchShared';

export const SubprogramGraphicsTasks: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
    <TaskCard 
      number="1" 
      title="Vytvoření nového bloku" 
      taskId="subprograms_1" 
      showTeacher={teacherMode} 
      teacherNote={<p>Ukažte žákům kategorii Moje bloky a tlačítko Vytvořit blok. V této úloze vytváříme blok bez parametrů. Žáci by měli pochopit rozdíl mezi &quot;definicí&quot; bloku (scénář pro) a &quot;voláním&quot; bloku (samotný růžový příkaz).</p>}
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
      taskId="subprograms_2" 
      showTeacher={teacherMode} 
      teacherNote={<p>Cílem je ukázat, že složitý problém (kresba domu) lze rozložit na menší (okno, střecha, zeď) a ty řešit samostatně. Hlavní program pak jen &quot;diriguje&quot; volání těchto dílčích bloků v potřebném pořadí.</p>}
      saveAs="KresleniDomu.sb3"
    >
      <p className="mb-4">
        Vytvořte scénář, který nakreslí domeček. Program rozložte logicky na dílčí bloky (podprogramy) a ty pak zavolejte v hlavním programu.
      </p>
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
          <h4 className="font-bold text-slate-700 mb-4 uppercase tracking-widest text-sm">Cílový obrázek</h4>
          <svg width="120" height="180" viewBox="0 0 120 180" className="stroke-indigo-600 stroke-[3] fill-none">
            <rect x="10" y="80" width="100" height="90" />
            <polygon points="10,80 60,10 110,80" />
            <rect x="30" y="110" width="20" height="20" />
            <rect x="70" y="110" width="20" height="20" />
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
      taskId="subprograms_3" 
      showTeacher={teacherMode} 
      teacherNote={<p>Zavedení pojmu <strong>parametr</strong>. Učitel ukáže, jak v dialogu &quot;Vytvořit blok&quot; přidat &quot;vstup - číslo nebo text&quot;. Žáci pak musí pochopit, že tento parametr se chová jako lokální proměnná (lze ho vytáhnout z definice a použít uvnitř). Výborný můstek k funkcím v Pythonu.</p>}
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
              <path d="M-10,100 L30,100 M10,80 L10,120" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="10" cy="100" r="3" fill="#64748b" />
              <rect x="10" y="20" width="80" height="80" fill="none" stroke="#ef4444" strokeWidth="3" />
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
      taskId="subprograms_4" 
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
      taskId="subprograms_5" 
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
              <path d="M10,60 L110,60 M60,10 L60,110" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
              <rect x="20" y="20" width="80" height="80" fill="none" stroke="#ef4444" strokeWidth="3" />
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
      taskId="subprograms_6" 
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
            <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                <path d="M-10,80 L30,80 M10,60 L10,100" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                <rect x="10" y="20" width="60" height="60" fill="none" stroke="#ef4444" strokeWidth="3" />
                <circle cx="10" cy="80" r="4" fill="#ef4444" />
                <text x="25" y="95" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
              </svg>
            </div>

            <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                <path d="M10,50 L90,50 M50,10 L50,90" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#ef4444" strokeWidth="3" />
                <circle cx="50" cy="50" r="4" fill="#ef4444" />
                <text x="65" y="65" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
              </svg>
            </div>

            <div className="relative aspect-square flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <svg width="120" height="120" viewBox="-10 -10 120 120" className="overflow-visible">
                <path d="M10,50 L90,50 M50,10 L50,90" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="3" />
                <circle cx="50" cy="50" r="4" fill="#ef4444" />
                <text x="65" y="65" textAnchor="middle" className="font-bold text-slate-800 text-lg">x,y</text>
              </svg>
            </div>

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
  </>
);

