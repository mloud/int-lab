import React, { useState } from 'react';
import { 
  CheckCircle2, Bot, CloudCog, Server, Wrench, ShieldAlert, Cpu, Network, ArrowRight, Play, Award
} from 'lucide-react';

const STAGES = 3;

// STAGE 1: MATCHING TERMS
const MATCHING_ITEMS = [
  { id: 'cobot', desc: 'Kolaborativní robot, který bezpečně spolupracuje s lidmi.', icon: <Bot className="w-12 h-12 text-purple-500" /> },
  { id: 'iot', desc: 'Senzory a stroje, které komunikují přes internet v reálném čase.', icon: <Network className="w-12 h-12 text-blue-500" /> },
  { id: 'predictive', desc: 'AI předvídá poruchy dřív, než se stroj skutečně rozbije.', icon: <Wrench className="w-12 h-12 text-orange-500" /> },
  { id: 'twin', desc: 'Virtuální kopie celé továrny pro bezpečné testování změn.', icon: <Cpu className="w-12 h-12 text-cyan-500" /> }
];

const MATCHING_TERMS = [
  { id: 'twin', label: 'Digitální dvojče' },
  { id: 'cobot', label: 'Cobot' },
  { id: 'predictive', label: 'Prediktivní údržba' },
  { id: 'iot', label: 'Průmyslový IoT' }
];

// STAGE 2: SCENARIOS
const SCENARIOS = [
  {
    q: 'Během výroby začne lis mírně vibrovat. Lidé si toho nevšimnou, ale software okamžitě upozorní technika, že za 3 dny odejde ložisko. Jak se tato technologie nazývá?',
    options: ['Reaktivní oprava', 'Prediktivní údržba', 'Digitální dvojče'],
    correct: 1
  },
  {
    q: 'Firma chce přidat novou montážní linku, ale bojí se, že se tím zpomalí zbytek výroby. Kde si to může předem nanečisto vyzkoušet?',
    options: ['V Digitálním dvojčeti', 'Na chytrém regálu', 'V cloudu COMES'],
    correct: 0
  },
  {
    q: 'Kamerový systém zkontroluje kvalitu každého kusu na pásu. Pracuje bleskově a neunikne mu žádný škrábanec. Co linka využívá?',
    options: ['Chytrou logistiku', 'Strojové vidění (AI)', 'Robotickou ruku'],
    correct: 1
  },
  {
    q: 'Materiál na lince dochází. Samotný regál si zváží zbývající zásoby a zcela sám odešle dodavateli e-mail s novou objednávkou.',
    options: ['Průmyslový internet věcí (IIoT)', 'Prediktivní údržbu', 'Virtuální realitu'],
    correct: 0
  },
  {
    q: 'Továrna sbírá každou vteřinu miliony dat ze všech senzorů. Kde se všechna tato data ukládají a centrálně vyhodnocují?',
    options: ['V paměti jednoho robota', 'V Cloudovém úložišti', 'Na flash disku ředitele'],
    correct: 1
  },
  {
    q: 'Dělník a robot pracují bok po boku u jednoho stolu. Když se dělník nečekaně nakloní příliš blízko, robot okamžitě zastaví, aby ho nezranil.',
    options: ['Jedná se o klasického robota v kleci', 'Jde o softwarovou chybu', 'Jedná se o Kolaborativního robota (Cobota)'],
    correct: 2
  }
];

// STAGE 3: SEQUENCING
const SEQUENCE_STEPS = [
  { id: 1, text: 'Zákazník potvrdí objednávku přes cloud.' },
  { id: 2, text: 'IoT Sklad automaticky uvolní potřebný materiál.' },
  { id: 3, text: 'Cobot bezpečně smontuje produkt s pomocí člověka.' },
  { id: 4, text: 'AI kamera zkontroluje, zda není produkt zmetek.' }
];

const SmartFactorySimulation: React.FC = () => {
  const [stage, setStage] = useState(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stage 1 State
  const [placedTerms, setPlacedTerms] = useState<Record<string, string | null>>({ cobot: null, iot: null, predictive: null, twin: null });
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  // Stage 2 State
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [scenarioWrong, setScenarioWrong] = useState<number | null>(null);

  // Stage 3 State
  const [sequence, setSequence] = useState([
    SEQUENCE_STEPS[2], SEQUENCE_STEPS[0], SEQUENCE_STEPS[3], SEQUENCE_STEPS[1]
  ]);
  const [selectedSeqIdx, setSelectedSeqIdx] = useState<number | null>(null);

  // Stage 1 Logic
  const handleSlotClick = (itemId: string) => {
    if (!selectedTerm) return;
    
    // Check correctness
    if (selectedTerm !== itemId) {
      setErrorMsg('Špatně! Tento pojem k této definici nepatří.');
      setTimeout(() => setErrorMsg(null), 2000);
      setSelectedTerm(null);
      return;
    }

    setPlacedTerms(prev => ({ ...prev, [itemId]: selectedTerm }));
    setSelectedTerm(null);
    setErrorMsg(null);
  };

  const isStage1Complete = Object.values(placedTerms).every(v => v !== null);

  // Stage 2 Logic
  const handleScenarioAnswer = (optIdx: number) => {
    if (optIdx === SCENARIOS[scenarioIdx].correct) {
      setScenarioWrong(null);
      if (scenarioIdx < SCENARIOS.length - 1) {
        setScenarioIdx(s => s + 1);
      } else {
        setStage(3);
      }
    } else {
      setScenarioWrong(optIdx);
      setTimeout(() => setScenarioWrong(null), 1500);
    }
  };

  // Stage 3 Logic
  const handleSeqClick = (idx: number) => {
    if (selectedSeqIdx === null) {
      setSelectedSeqIdx(idx);
    } else {
      const newSeq = [...sequence];
      const temp = newSeq[idx];
      newSeq[idx] = newSeq[selectedSeqIdx];
      newSeq[selectedSeqIdx] = temp;
      setSequence(newSeq);
      setSelectedSeqIdx(null);
    }
  };

  const isSeqCorrect = sequence.every((s, i) => s.id === i + 1);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto animate-in fade-in duration-500 gap-8 pb-12">
      
      {/* PROGRESS BAR */}
      <div className="w-full bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-500" style={{ width: `${(stage / 4) * 100}%` }}></div>
        {[1, 2, 3, 4].map(step => (
          <div key={step} className={`flex flex-col items-center gap-2 z-10 transition-all ${stage >= step ? 'opacity-100' : 'opacity-40 grayscale'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${stage === step ? 'bg-orange-500 text-white shadow-lg ring-4 ring-orange-200' : stage > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {stage > step ? <CheckCircle2 className="w-6 h-6" /> : step}
            </div>
            <span className="text-xs font-bold text-gray-600 hidden sm:block">
              {step === 1 ? 'Pojmy' : step === 2 ? 'Praxe' : step === 3 ? 'Proces' : 'Hotovo'}
            </span>
          </div>
        ))}
      </div>

      {/* STAGE 1: MATCHING */}
      {stage === 1 && (
        <div className="w-full flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-800 mb-2">Přiřazování pojmů</h2>
            <p className="text-gray-500 font-medium">Klikněte na pojem dole a poté na správnou prázdnou kartu, kam patří.</p>
          </div>
          
          {errorMsg && (
            <div className="mx-auto px-6 py-3 bg-red-100 text-red-700 rounded-xl font-bold flex items-center gap-2 animate-bounce shadow-sm">
              <ShieldAlert className="w-5 h-5" /> {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MATCHING_ITEMS.map(item => {
              const isPlaced = placedTerms[item.id] !== null;
              const placedLabel = isPlaced ? MATCHING_TERMS.find(t => t.id === placedTerms[item.id])?.label : '???';
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleSlotClick(item.id)}
                  className={`bg-white p-6 rounded-[2rem] border-4 flex flex-col items-center text-center gap-4 transition-all ${isPlaced ? 'border-green-400 bg-green-50' : selectedTerm ? 'border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50 cursor-pointer shadow-md' : 'border-gray-100 shadow-sm'}`}
                >
                  <div className={`p-4 rounded-full ${isPlaced ? 'bg-green-100' : 'bg-gray-50'}`}>
                    {item.icon}
                  </div>
                  <div className={`px-6 py-2 rounded-xl text-lg font-black transition-colors ${isPlaced ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                    {placedLabel}
                  </div>
                  <p className="text-gray-600 font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {!isStage1Complete && (
            <div className="bg-gray-800 p-6 rounded-[2rem] shadow-xl flex flex-wrap justify-center gap-4 sticky bottom-4 z-50 border-4 border-gray-700">
              {MATCHING_TERMS.map(term => {
                const isUsed = Object.values(placedTerms).includes(term.id);
                if (isUsed) return null;
                
                return (
                  <button
                    key={term.id}
                    onClick={() => setSelectedTerm(term.id)}
                    className={`px-6 py-3 rounded-xl font-black text-lg transition-all ${selectedTerm === term.id ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-110 -translate-y-2' : 'bg-white text-gray-800 hover:bg-orange-100 hover:text-orange-600 shadow-md'}`}
                  >
                    {term.label}
                  </button>
                );
              })}
            </div>
          )}

          {isStage1Complete && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setStage(2)}
                className="px-8 py-4 bg-green-500 text-white text-xl font-black rounded-2xl shadow-xl hover:bg-green-600 hover:scale-105 transition-all flex items-center gap-2"
              >
                Skvělé! Jdeme na další část <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: SCENARIOS */}
      {stage === 2 && (
        <div className="w-full flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500 max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-800 mb-2">Rozhodování v praxi</h2>
            <p className="text-gray-500 font-medium">Přečtěte si situaci z továrny a vyberte správné technologické řešení.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-8 sm:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <span className="inline-block px-4 py-1 bg-blue-500/30 text-blue-200 font-bold rounded-lg mb-6 border border-blue-400/30">
              Situace {scenarioIdx + 1} z {SCENARIOS.length}
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-10 relative z-10">
              {SCENARIOS[scenarioIdx].q}
            </h3>

            <div className="flex flex-col gap-4 relative z-10">
              {SCENARIOS[scenarioIdx].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScenarioAnswer(idx)}
                  className={`w-full text-left p-6 rounded-2xl font-bold text-lg transition-all border-4 ${scenarioWrong === idx ? 'bg-red-500/20 border-red-500 text-red-200 animate-shake' : 'bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/30'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: SEQUENCING */}
      {stage === 3 && (
        <div className="w-full flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500 max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-800 mb-2">Průběh chytré výroby</h2>
            <p className="text-gray-500 font-medium">Seřaďte kroky výroby Průmyslu 4.0 do správného pořadí od prvního po poslední.</p>
            <p className="text-orange-500 font-bold text-sm mt-2">Kliknutím na dva kroky je mezi sebou prohodíte.</p>
          </div>

          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-6 top-6 bottom-6 w-1 bg-gray-200 rounded-full z-0 hidden sm:block"></div>
            
            {sequence.map((step, idx) => (
              <div 
                key={step.id} 
                onClick={() => handleSeqClick(idx)}
                className={`relative z-10 flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[2rem] border-4 transition-all cursor-pointer shadow-sm ${selectedSeqIdx === idx ? 'bg-orange-50 border-orange-400 scale-[1.02]' : isSeqCorrect ? 'bg-green-50 border-green-400' : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-inner ${isSeqCorrect ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </div>
                <div className={`flex-1 text-lg font-bold ${isSeqCorrect ? 'text-green-800' : 'text-gray-700'}`}>
                  {step.text}
                </div>
              </div>
            ))}
          </div>

          {isSeqCorrect && (
            <div className="flex justify-center mt-8 animate-in zoom-in duration-500">
              <button 
                onClick={() => setStage(4)}
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl font-black rounded-3xl shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
              >
                <Play className="w-8 h-8" /> Vyhodnotit test
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 4: SUCCESS */}
      {stage === 4 && (
        <div className="w-full flex flex-col items-center justify-center gap-8 animate-in zoom-in duration-700 py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <Award className="w-48 h-48 text-orange-500 relative z-10 drop-shadow-2xl" />
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-gray-800">Gratulujeme!</h2>
            <p className="text-2xl text-gray-600 font-medium max-w-xl mx-auto leading-relaxed">
              Úspěšně jste absolvovali výcvik Průmyslu 4.0. Pojmy jako Cobot nebo Digitální dvojče pro vás už nejsou španělská vesnice!
            </p>
          </div>

          <button 
            onClick={() => {
              setStage(1);
              setPlacedTerms({ cobot: null, iot: null, predictive: null, twin: null });
              setScenarioIdx(0);
              setSequence([SEQUENCE_STEPS[2], SEQUENCE_STEPS[0], SEQUENCE_STEPS[3], SEQUENCE_STEPS[1]]);
            }}
            className="mt-8 px-8 py-4 bg-white text-orange-600 border-4 border-orange-200 text-xl font-black rounded-2xl shadow-sm hover:bg-orange-50 transition-colors"
          >
            Hrát znovu
          </button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SmartFactorySimulation;
