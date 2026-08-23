import React, { useState } from 'react';
import { ArrowLeft, Power, Cpu, HardDrive, MemoryStick, Monitor, RotateCcw, Trophy, XCircle, MonitorPlay, Zap } from 'lucide-react';

interface BootSequenceGameProps {
  onBack: () => void;
}

interface BootStep {
  id: string;
  label: string;
  icon: React.ElementType;
}

const CORRECT_SEQUENCE = ['power', 'bios', 'disk', 'ram', 'os'];

const ALL_STEPS: BootStep[] = [
  { id: 'ram', label: 'Zkopírování OS z disku do paměti (RAM)', icon: MemoryStick },
  { id: 'power', label: 'Zapnutí počítače (přivedení proudu)', icon: Power },
  { id: 'os', label: 'OS převezme řízení a zobrazí plochu', icon: Monitor },
  { id: 'bios', label: 'Základní deska zkontroluje hardware', icon: Cpu },
  { id: 'disk', label: 'Nalezení OS na pevném disku', icon: HardDrive },
];

const BootSequenceGame: React.FC<BootSequenceGameProps> = ({ onBack }) => {
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSteps = ALL_STEPS.filter(step => !selectedSequence.includes(step.id));
  const currentStep = selectedSequence.length > 0 ? selectedSequence[selectedSequence.length - 1] : null;
  const isPoweredOn = selectedSequence.includes('power');

  const handleSelect = (stepId: string) => {
    const nextExpectedId = CORRECT_SEQUENCE[selectedSequence.length];
    
    if (stepId === nextExpectedId) {
      const newSequence = [...selectedSequence, stepId];
      setSelectedSequence(newSequence);
      setErrorId(null);
      
      if (newSequence.length === CORRECT_SEQUENCE.length) {
        setTimeout(() => setIsSuccess(true), 1500); // Delší pauza na ukázání poslední animace
      }
    } else {
      setErrorId(stepId);
      setTimeout(() => setErrorId(null), 1000);
    }
  };

  const resetGame = () => {
    setSelectedSequence([]);
    setErrorId(null);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-7xl w-full flex flex-col items-center animate-in fade-in duration-500 px-4 pb-10">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
          Start Počítače
        </h2>
        <div className="w-24"></div> {/* spacer */}
      </div>

      {!isSuccess ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* L: Timeline & Controls */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-2xl border-4 border-slate-100 flex flex-col items-center">
            <h3 className="text-slate-500 font-black uppercase tracking-widest text-xs mb-6 text-center">
              Seřaď kroky od zapnutí počítače až po zobrazení plochy
            </h3>

            {/* Timeline */}
            <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 mb-8 min-h-[350px]">
              <div className="relative border-l-4 border-slate-200 ml-6 space-y-6 py-2">
                {CORRECT_SEQUENCE.map((correctId, index) => {
                  const isCompleted = index < selectedSequence.length;
                  const step = ALL_STEPS.find(s => s.id === selectedSequence[index]);
                  const isCurrent = step?.id === currentStep;
                  
                  return (
                    <div key={correctId} className="relative pl-8">
                      <div className={`absolute -left-[14px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 ${isCompleted ? 'bg-green-500 border-green-200' : 'bg-white border-slate-300'} z-10 transition-colors duration-500`}></div>
                      
                      <div className={`h-14 rounded-xl border-2 flex items-center px-4 transition-all duration-500
                        ${isCompleted ? (isCurrent ? 'bg-blue-50 border-blue-400 shadow-lg scale-105' : 'bg-white border-green-500 shadow-md') : 'border-dashed border-slate-300 bg-transparent'}`}
                      >
                        {isCompleted && step ? (
                          <div className="flex items-center gap-3 animate-in slide-in-from-left-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCurrent ? 'bg-blue-100' : 'bg-green-100'}`}>
                              <step.icon className={`w-5 h-5 ${isCurrent ? 'text-blue-600' : 'text-green-600'}`} />
                            </div>
                            <span className="font-bold text-slate-800 text-sm leading-tight">{step.label}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Krok {index + 1}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Options */}
            <div className="w-full">
              <h4 className="text-center font-bold text-slate-400 text-xs mb-4 uppercase tracking-widest">Dostupné kroky (kliknutím vyber):</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {availableSteps.map(step => (
                  <button
                    key={step.id}
                    onClick={() => handleSelect(step.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300 relative text-left
                      ${errorId === step.id ? 'bg-red-50 border-red-500 text-red-700 animate-shake' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md'}`}
                  >
                    <step.icon className={`w-5 h-5 shrink-0 ${errorId === step.id ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className="leading-tight">{step.label}</span>
                    {errorId === step.id && (
                      <XCircle className="absolute -top-2 -right-2 w-5 h-5 text-red-500 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* R: Hardware Visualization */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm text-center">
              Co se děje uvnitř?
            </h3>
            
            <div className="bg-slate-900/95 rounded-3xl p-6 shadow-2xl border-4 border-slate-800 flex flex-col gap-6 relative overflow-hidden h-full">
              
              {/* Zdroje a signály pozadí */}
              {!isPoweredOn && (
                 <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm pointer-events-none transition-all duration-1000">
                    <span className="text-white/30 font-black text-3xl uppercase tracking-widest flex flex-col items-center gap-4">
                       <Power className="w-16 h-16 opacity-50" />
                       Vypnuto (Bez proudu)
                    </span>
                 </div>
              )}

              {/* Monitor */}
              <div className="bg-gray-800 rounded-3xl p-3 border-8 border-gray-700 shadow-2xl relative aspect-[16/9] flex flex-col mb-4">
                <div className="flex-1 bg-black rounded-xl overflow-hidden relative border-2 border-black flex flex-col">
                  {currentStep === 'os' ? (
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-in fade-in zoom-in duration-1000 flex items-center justify-center">
                        <span className="bg-white/80 backdrop-blur text-blue-900 font-black px-6 py-2 rounded-xl text-2xl shadow-2xl">Windows</span>
                     </div>
                  ) : currentStep === 'bios' ? (
                     <div className="absolute inset-0 bg-black p-4 text-green-500 font-mono text-sm animate-in fade-in flex flex-col gap-1">
                        <p>American Megatrends Inc.</p>
                        <p>BIOS Date 08/20/26 19:22:15 Ver 08.00.15</p>
                        <p>CPU: Intel(R) Core(TM) i5 Processor</p>
                        <p className="animate-pulse">Checking NVRAM...</p>
                        <p>System Memory OK</p>
                     </div>
                  ) : currentStep === 'disk' ? (
                     <div className="absolute inset-0 bg-black p-4 text-green-500 font-mono text-sm flex flex-col gap-1">
                        <p>American Megatrends Inc.</p>
                        <p>System Memory OK</p>
                        <p>Detecting IDE drives ...</p>
                        <p className="text-white bg-blue-900/50 inline-block px-1 w-max animate-pulse">Booting from Hard Disk...</p>
                     </div>
                  ) : currentStep === 'ram' ? (
                     <div className="absolute inset-0 bg-black p-4 text-gray-300 font-mono text-sm flex flex-col gap-2 items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4">Načítání operačního systému...</p>
                     </div>
                  ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-gray-800">
                        <MonitorPlay className="w-12 h-12 opacity-20 mb-2" />
                        <span className="font-bold opacity-20 uppercase tracking-widest text-xs">Žádný signál</span>
                     </div>
                  )}
                </div>
                <div className="h-4 flex justify-center items-center mt-2">
                   <div className={`w-2 h-2 rounded-full ${isPoweredOn ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-gray-600'}`}></div>
                </div>
              </div>

              {/* Internal Hardware Row */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                 
                 {/* CPU */}
                 <div className="flex flex-col items-center gap-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> Procesor
                    </h4>
                    <div className={`relative w-full aspect-square bg-[#1b4332] rounded-lg border-2 border-[#081c15] flex items-center justify-center p-2 transition-all duration-300
                       ${currentStep === 'bios' ? 'shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-110 z-10 border-green-400' : ''}`}>
                      <div className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-md flex items-center justify-center relative overflow-hidden transition-all duration-300
                         ${currentStep === 'bios' ? 'bg-green-100 border-green-500' : 'border-gray-400'}`}>
                        {currentStep === 'bios' && <div className="absolute inset-0 bg-green-400/20 animate-pulse"></div>}
                        <span className={`font-black text-xl tracking-tighter relative z-10 ${currentStep === 'bios' ? 'text-green-800' : 'text-gray-700'}`}>CPU</span>
                      </div>
                    </div>
                 </div>

                 {/* HDD */}
                 <div className="flex flex-col items-center gap-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> Disk
                    </h4>
                    <div className={`relative w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl border-4 flex items-center justify-center transition-all duration-300
                       ${(currentStep === 'disk' || currentStep === 'ram') ? 'shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110 z-10 border-blue-400' : 'border-gray-600'}`}>
                      <div className={`w-3/4 h-3/4 rounded-full border-4 border-gray-500 bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center
                        ${(currentStep === 'disk' || currentStep === 'ram') ? 'animate-[spin_2s_linear_infinite]' : ''}`}>
                        <div className="w-1/2 h-1/2 rounded-full border border-gray-400/50"></div>
                      </div>
                      {(currentStep === 'disk' || currentStep === 'ram') && (
                         <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                 </div>

                 {/* RAM */}
                 <div className="flex flex-col items-center gap-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <MemoryStick className="w-3 h-3" /> RAM
                    </h4>
                    <div className={`relative w-full aspect-square bg-[#004b23] rounded-lg border-2 flex items-center justify-center transition-all duration-300 overflow-hidden
                       ${currentStep === 'ram' ? 'shadow-[0_0_30px_rgba(234,179,8,0.5)] scale-110 z-10 border-yellow-400' : 'border-[#002913]'}`}>
                       
                       <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-500/80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 3px)' }}></div>
                       
                       {currentStep === 'ram' ? (
                          <div className="w-full h-full p-2 flex flex-col gap-1 z-10">
                             <div className="h-1/3 bg-blue-500/90 rounded border border-blue-300 flex items-center justify-center animate-in slide-in-from-left-4 duration-500">
                                <span className="text-[8px] font-black text-white uppercase">OS Jádro</span>
                             </div>
                             <div className="h-1/3 bg-blue-500/90 rounded border border-blue-300 flex items-center justify-center animate-in slide-in-from-left-4 duration-700 delay-200">
                                <span className="text-[8px] font-black text-white uppercase">Ovladače</span>
                             </div>
                             <div className="h-1/3 bg-blue-500/90 rounded border border-blue-300 flex items-center justify-center animate-in slide-in-from-left-4 duration-1000 delay-500">
                                <span className="text-[8px] font-black text-white uppercase">Grafika</span>
                             </div>
                          </div>
                       ) : currentStep === 'os' ? (
                          <div className="w-full h-full p-2 flex flex-col gap-1 z-10">
                             <div className="h-full bg-blue-600/90 rounded border border-blue-400 flex items-center justify-center shadow-inner">
                                <span className="text-[10px] font-black text-white uppercase text-center leading-none">Windows<br/>Načten</span>
                             </div>
                          </div>
                       ) : (
                          <div className="w-full h-full flex items-center justify-center z-10">
                             <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Prázdná</span>
                          </div>
                       )}
                    </div>
                 </div>

              </div>
              
              {/* Data Flow Arrows */}
              {currentStep === 'ram' && (
                 <div className="absolute top-1/2 left-[50%] right-[16%] h-2 -translate-y-1/2 pointer-events-none flex items-center justify-center overflow-hidden z-20">
                    <div className="w-full border-t-4 border-dashed border-yellow-400 animate-[pulse_0.5s_linear_infinite]"></div>
                    <div className="absolute bg-yellow-400 text-yellow-900 text-[8px] font-black px-2 rounded-full py-0.5">KOPÍROVÁNÍ DAT</div>
                 </div>
              )}

            </div>
          </div>
          
        </div>
      ) : (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-emerald-400 flex flex-col items-center text-center animate-in zoom-in">
          <Trophy className="w-32 h-32 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-4">Počítač Nastartoval!</h2>
          
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl mb-8 font-bold border-2 border-emerald-200 max-w-2xl text-left">
            <p className="mb-4 text-center">Výborně! Přesně takto to funguje uvnitř pokaždé, když zmáčkneš tlačítko na bedně:</p>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li>Pustí se do něj <strong>proud</strong>.</li>
              <li><strong>Základní deska</strong> zkontroluje, jestli je v pořádku paměť, procesor a grafika.</li>
              <li>Podívá se na <strong>pevný disk</strong>, jestli tam leží nějaký Operační systém.</li>
              <li>Začne obrovskou rychlostí kopírovat samotný Systém z disku <strong>do operační paměti (RAM)</strong>.</li>
              <li>Jakmile je Systém v RAM, <strong>přebírá vládu</strong> nad celým počítačem a ukáže ti přihlašovací obrazovku.</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <button onClick={resetGame} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Zkusit znovu
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Zpět do menu <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootSequenceGame;
