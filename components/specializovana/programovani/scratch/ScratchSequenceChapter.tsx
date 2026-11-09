'use client';
import React, { useState } from 'react';
import { Blocks, Code, Star, Save, GraduationCap } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { ScratchBlock, ScratchInput, ScratchCBlock } from './ScratchBlocks';
import {
  TeacherNote,
  CanvasPreview,
  TaskCard,
  Line,
  CirclePath,
  AvailableBlocks,
  TeacherPinToggle,
} from './ScratchShared';

interface ScratchSequenceChapterProps {
  onBack: () => void;
}

const ScratchSequenceChapter: React.FC<ScratchSequenceChapterProps> = ({ onBack }) => {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <FsChapterShell
      title="Algoritmus a sekvence příkazů"
      subtitle="Lekce 1"
      icon={<Blocks className="w-8 h-8 text-amber-600" />}
      onBack={onBack}
      accentColor="amber"
      tabs={[{ id: 'lekce', label: 'Lekce 1', icon: Code }]}
    >
      <TeacherPinToggle teacherMode={teacherMode} setTeacherMode={setTeacherMode} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl mb-8">
          <h2 className="text-xl font-black text-amber-800 mb-2">Pojem algoritmu</h2>
          <p className="text-amber-900/80 text-sm sm:text-base leading-relaxed mb-4">
            Předtím než začneme programovat, je nezbytné pochopit, co je to algoritmus. Algoritmus je přesný postup, jak vyřešit danou úlohu. Splňuje pět základních vlastností:
          </p>
          <ul className="list-none space-y-2 text-sm text-amber-900">
            <li><strong>1. Elementárnost</strong> - Skládá se z konečného počtu jednoduchých a srozumitelných kroků.</li>
            <li><strong>2. Determinovanost</strong> - V každé fázi výpočtu je přesně určeno, jaký má být další postup.</li>
            <li><strong>3. Konečnost</strong> - Každý krok se provede konečněkrát a celá činnost skončí v reálném čase.</li>
            <li><strong>4. Rezultativnost</strong> - Postup musí vést od libovolných (přípustných) vstupních dat k požadovanému výsledku.</li>
            <li><strong>5. Hromadnost</strong> - Postup je obecný, tedy aplikovatelný na celou množinu úloh stejného typu.</li>
          </ul>
        </div>

        <div className="bg-slate-50 rounded-r-3xl p-6 sm:p-8 border-l-4 border-slate-400 mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Příprava: Scénář pro Reset</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Než začnete s kreslením, je velmi důležité vytvořit si scénář pro <strong>Reset</strong>. Ten vám po spuštění vymaže předchozí čáry, vrátí kocoura doprostřed obrazovky a narovná ho. Tento scénář si opište do svého projektu, abyste ho mohli kdykoliv použít k vyčištění plochy.</p>
          
          <div className="flex flex-col items-start gap-1 p-6 bg-slate-50 rounded-2xl border border-slate-200 w-fit">
            <ScratchBlock category="custom">scénář pro <ScratchInput type="text">Reset</ScratchInput></ScratchBlock>
            <div className="pl-4 flex flex-col gap-1">
              <ScratchBlock category="pen">pero vypni</ScratchBlock>
              <ScratchBlock category="pen">smaž</ScratchBlock>
              <ScratchBlock category="motion">skoč na x: <ScratchInput>0</ScratchInput> y: <ScratchInput>0</ScratchInput></ScratchBlock>
              <ScratchBlock category="motion">nastav směr <ScratchInput>90</ScratchInput></ScratchBlock>
            </div>
          </div>
        </div>

        <TaskCard number="1" title="Kreslení geometrických útvarů" taskId="1" showTeacher={teacherMode} teacherNote={<p>Cílem je procvičit sekvenční vykonávání příkazů, používání rozšíření "Pero" (Pen) a cyklu "opakuj" (repeat). Ujistěte se, že žáci správně nastavují počáteční stav před kreslením (např. pomocí scénáře Reset).</p>}>
          <p>Ve Scratchi lze využít rozšíření <strong>Pero</strong> pro dynamické kreslení po scéně. Sestavte postupně scénáře (algoritmy), které pomocí pera nakreslí následující geometrické útvary.</p>
          <AvailableBlocks>
            <ScratchBlock category="motion">dopředu o <ScratchInput>10</ScratchInput> kroků</ScratchBlock>
            <ScratchBlock category="motion">otoč se ↻ o <ScratchInput>15</ScratchInput> stupňů</ScratchBlock>
            <ScratchCBlock category="control">opakuj <ScratchInput>10</ScratchInput> krát</ScratchCBlock>
            <ScratchBlock category="pen">pero zapni</ScratchBlock>
            <ScratchBlock category="pen">pero vypni</ScratchBlock>
          </AvailableBlocks>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Čtverec</h4>
              <div className="relative w-32 h-32">
                <Line x1={16} y1={116} x2={116} y2={116} />
                <Line x1={116} y1={116} x2={116} y2={16} />
                <Line x1={116} y1={16} x2={16} y2={16} />
                <Line x1={16} y1={16} x2={16} y2={116} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Trojúhelník</h4>
              <div className="relative w-32 h-32">
                <Line x1={16} y1={116} x2={116} y2={116} />
                <Line x1={116} y1={116} x2={66} y2={30} />
                <Line x1={66} y1={30} x2={16} y2={116} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Šestiúhelník</h4>
              <div className="relative w-32 h-32">
                <Line x1={36} y1={116} x2={96} y2={116} />
                <Line x1={96} y1={116} x2={126} y2={66} />
                <Line x1={126} y1={66} x2={96} y2={16} />
                <Line x1={96} y1={16} x2={36} y2={16} />
                <Line x1={36} y1={16} x2={6} y2={66} />
                <Line x1={6} y1={66} x2={36} y2={116} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Kružnice</h4>
              <div className="relative w-32 h-32">
                <CirclePath x={66} y={66} r={50} color="#2563eb" />
              </div>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-sm flex items-center gap-3">
            <Save className="w-5 h-5 text-blue-500" /> 
            <span>Projekt uložte jako: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">SekvencePrikazu.sb3</strong></span>
          </div>
        </TaskCard>

        <TaskCard number="2" title="Kříž a složená kresba" taskId="2" showTeacher={teacherMode} teacherNote={<p>U složitějších tvarů (např. kříž nebo přerušovaná čára) musí žáci vhodně ovládat bloky <ScratchBlock category="pen">pero zapni</ScratchBlock> a <ScratchBlock category="pen">pero vypni</ScratchBlock> pro vytvoření mezer. U kříže je nutné střídat otočení o 90 a -90 stupňů (případně využít 270), aby nakreslili vnější obvod.</p>}>
          <p>Pokračujte v kreslení pokročilejších geometrických tvarů. Sestavte scénář pro vykreslení pravidelného kříže (s rovnými rameny) a čtverce se zkosennými rohy.</p>
          <p>Kromě kreslení plných čar vytvořte také scénář pro kreslení přerušované (čárkované) čáry v pravém úhlu. Nezapomeňte u něj využít povel <ScratchBlock category="pen">pero vypni</ScratchBlock>.</p>
          <AvailableBlocks>
            <ScratchBlock category="motion">dopředu o <ScratchInput>10</ScratchInput> kroků</ScratchBlock>
            <ScratchBlock category="motion">otoč se ↻ o <ScratchInput>15</ScratchInput> stupňů</ScratchBlock>
            <ScratchBlock category="pen">pero zapni</ScratchBlock>
            <ScratchBlock category="pen">pero vypni</ScratchBlock>
          </AvailableBlocks>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Kříž</h4>
              <div className="relative w-32 h-32">
                <Line x1={46} y1={116} x2={86} y2={116} />
                <Line x1={86} y1={116} x2={86} y2={86} />
                <Line x1={86} y1={86} x2={116} y2={86} />
                <Line x1={116} y1={86} x2={116} y2={46} />
                <Line x1={116} y1={46} x2={86} y2={46} />
                <Line x1={86} y1={46} x2={86} y2={16} />
                <Line x1={86} y1={16} x2={46} y2={16} />
                <Line x1={46} y1={16} x2={46} y2={46} />
                <Line x1={46} y1={46} x2={16} y2={46} />
                <Line x1={16} y1={46} x2={16} y2={86} />
                <Line x1={16} y1={86} x2={46} y2={86} />
                <Line x1={46} y1={86} x2={46} y2={116} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4">Osmiúhelník</h4>
              <div className="relative w-32 h-32">
                <Line x1={36} y1={116} x2={96} y2={116} />
                <Line x1={96} y1={116} x2={116} y2={96} />
                <Line x1={116} y1={96} x2={116} y2={36} />
                <Line x1={116} y1={36} x2={96} y2={16} />
                <Line x1={96} y1={16} x2={36} y2={16} />
                <Line x1={36} y1={16} x2={16} y2={36} />
                <Line x1={16} y1={36} x2={16} y2={96} />
                <Line x1={16} y1={96} x2={36} y2={116} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4 text-center leading-tight">Čárkovaný<br/>čtverec</h4>
              <div className="relative w-32 h-32 mt-[-10px]">
                {/* Horní hrana - levá polovina */}
                <Line x1={16} y1={16} x2={66} y2={16} dashed={true} />
                {/* Pravá hrana - horní polovina */}
                <Line x1={116} y1={16} x2={116} y2={66} dashed={true} />
                {/* Spodní hrana - pravá polovina */}
                <Line x1={116} y1={116} x2={66} y2={116} dashed={true} />
                {/* Levá hrana - spodní polovina */}
                <Line x1={16} y1={116} x2={16} y2={66} dashed={true} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
              <h4 className="font-bold text-slate-700 mb-4 text-center leading-tight">Vertikální<br/>osmička</h4>
              <div className="relative w-32 h-32 mt-[-10px]">
                <CirclePath x={66} y={40} r={26} color="#2563eb" />
                <CirclePath x={66} y={92} r={26} color="#2563eb" />
              </div>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-sm flex items-center gap-3">
            <Save className="w-5 h-5 text-blue-500" /> 
            <span>Projekt uložte jako: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">SekvenceSlozitejsiTvary.sb3</strong></span>
          </div>
        </TaskCard>

        <TaskCard number="3*" title="Propojené kružnice" taskId="3" showTeacher={teacherMode} teacherNote={<p>Jedná se o pokročilejší úlohu vyžadující matematický vhled. Kružnici ve Scratchi obvykle kreslíme polygonální metodou: <ScratchCBlock category="control">opakuj <ScratchInput>360</ScratchInput> krát</ScratchCBlock> a uvnitř <ScratchBlock category="motion">dopředu o <ScratchInput>1</ScratchInput> kroků</ScratchBlock> a <ScratchBlock category="motion">otoč se ↻ o <ScratchInput>1</ScratchInput> stupňů</ScratchBlock>. Délka kroku ovlivní poloměr.<br/><br/>Pro úspěšné vykreslení dle zadání vypočítáme krok na základě obvodu: <code>O = 2 * pi * r</code>. Pokud cyklus proběhne 360krát, jeden krok by měl být <code>O / 360</code>. Upozorněte žáky, aby po nakreslení první kružnice otočili postavu, případně nastavili její směr rotace tak, aby se druhá kružnice vykreslila zrcadlově.</p>}>
          <p className="flex items-center gap-2 font-bold text-red-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Metodická úloha
          </p>
          <p>Sestavte scénář, který nakreslí těsně spojené dvě kružnice (tvořící tvar ležaté osmičky). Začněte kreslit na <strong>vrcholu první kružnice</strong> (viz červená tečka označující Start).</p>
          <AvailableBlocks>
            <ScratchBlock category="motion">dopředu o <ScratchInput>1</ScratchInput> kroků</ScratchBlock>
            <ScratchBlock category="motion">otoč se ↻ o <ScratchInput>1</ScratchInput> stupňů</ScratchBlock>
            <ScratchCBlock category="control">opakuj <ScratchInput>360</ScratchInput> krát</ScratchCBlock>
            <ScratchBlock category="pen">pero zapni</ScratchBlock>
            <ScratchBlock category="pen">pero vypni</ScratchBlock>
          </AvailableBlocks>
          
          <div className="bg-slate-50 p-4 rounded-xl mt-4 border-l-4 border-slate-400">
            <h4 className="font-bold text-slate-800 mb-2">Matematická nápověda</h4>
            <p className="text-sm text-slate-600 mb-2">Pro úspěšné vykreslení spojených kružnic budete potřebovat spočítat délku jejich obvodu:</p>
            <code className="text-lg font-mono font-bold text-blue-600 block my-2">O = 2 * π * r</code>
            <p className="text-sm text-slate-600">kde <code>r</code> je poloměr a <code>π</code> je přibližně 3.14. Nezapomeňte správně nastavit směr otáčení po dokončení první kružnice.</p>
          </div>

          <div className="mt-6 flex justify-center">
             <div className="relative w-[220px] h-[120px]">
                <CirclePath x={60} y={60} r={50} color="#2563eb" />
                <CirclePath x={160} y={60} r={50} color="#2563eb" />
                <div 
                  className="absolute w-3 h-3 bg-red-500 rounded-full" 
                  style={{ left: 60, top: 11.5, transform: 'translate(-50%, -50%)' }} 
                />
                <span 
                  className="absolute text-red-500 font-bold text-xs" 
                  style={{ left: 60, top: 0, transform: 'translate(-50%, -100%)' }}
                >
                  Start
                </span>
             </div>
          </div>
          <div className="mt-4 px-4 py-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-sm flex items-center gap-3">
            <Save className="w-5 h-5 text-blue-500" /> 
            <span>Projekt uložte jako: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">SekvenceKruznice.sb3</strong></span>
          </div>
        </TaskCard>

        <TaskCard number="4" title="Použití otisku (razítkování)" taskId="4" showTeacher={teacherMode} teacherNote={<p>Otiskávání (stamp) se liší od kreslení čar. Postava pouze zanechává svou aktuální texturu (kostým) na pozadí. Využití vnořených cyklů (jeden pro osu X, druhý pro osu Y po návratu na začátek) urychlí tvorbu pravoúhlých mřížek otisků.</p>}>
          <p>Rozšíření "Pero" obsahuje mimo samotného tažení čar i povel <ScratchBlock category="pen">otiskni se</ScratchBlock>. Tím postava (například sprite Hvězdičky) zanechá svou aktuální podobu na pozadí a vy můžete popojít jinam.</p>
          <p>Sestavte scénáře, které pomocí těchto bloků vykreslí dané formace:</p>
          <AvailableBlocks>
            <ScratchBlock category="pen">smaž</ScratchBlock>
            <ScratchBlock category="pen">otiskni se</ScratchBlock>
            <ScratchBlock category="motion">změň y o <ScratchInput>10</ScratchInput></ScratchBlock>
            <ScratchBlock category="motion">dopředu o <ScratchInput>40</ScratchInput> kroků</ScratchBlock>
            <ScratchBlock category="looks">ukaž se</ScratchBlock>
            <ScratchBlock category="looks">skryj se</ScratchBlock>
            <ScratchCBlock category="control">opakuj <ScratchInput>5</ScratchInput> krát</ScratchCBlock>
          </AvailableBlocks>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[160px]">
              <div className="flex justify-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[160px]">
              <div className="flex flex-col gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-center gap-1.5">
                    {[...Array(4)].map((_, j) => <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[160px]">
              <div className="flex flex-col items-start gap-1.5 w-fit mx-auto">
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[160px]">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
                <div className="flex gap-1.5"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div>
              </div>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 bg-blue-50/50 border border-blue-100 text-blue-800 rounded-xl text-sm flex items-center gap-3">
            <Save className="w-5 h-5 text-blue-500" /> 
            <span>Projekt uložte jako: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-blue-200">SekvenceTiskHvezdicek.sb3</strong></span>
          </div>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default ScratchSequenceChapter;
