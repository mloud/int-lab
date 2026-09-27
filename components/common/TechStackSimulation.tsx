import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Github, 
  Globe, 
  Smartphone, 
  Server, 
  Zap,
  ArrowRight,
  Database,
  Box,
  Layers,
  MonitorPlay,
  X,
  Info,
  FileCode2
} from 'lucide-react';

interface TechStackSimulationProps {
  onClose: () => void;
}

const TechStackSimulation: React.FC<TechStackSimulationProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [selectedTech, setSelectedTech] = useState<{name: string, desc: string} | null>(null);

  useEffect(() => {
    // Auto-scroll logic
    if (step >= 0 && step < 4) {
      const el = document.getElementById(`step-${step}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [step]);

  const steps = [
    {
      title: "1. Vývoj (Vývojářský počítač)",
      desc: "Učitel / vývojář píše kód v moderních frameworcích. React zajišťuje logiku a interaktivitu, Tailwind CSS řeší krásný design a Next.js to celé spojuje do funkční struktury.",
      icon: <Terminal className="w-8 h-8" />
    },
    {
      title: "2. Build & Export (Kompilace)",
      desc: "Next.js si projde všechny vytvořené interaktivní hodiny a \"rozpeče\" (vygeneruje) z nich rychlé a bezpečné statické soubory (HTML, CSS, JS). Nejsou zde žádné pomalé databáze.",
      icon: <Box className="w-8 h-8" />
    },
    {
      title: "3. Nasazení (GitHub Pages)",
      desc: "Tyto předpřipravené, super-rychlé statické soubory se nahrají na bezplatný server GitHub Pages. Server nemusí nic složitě počítat, jen odesílá data žákům.",
      icon: <Github className="w-8 h-8" />
    },
    {
      title: "4. Žák v prohlížeči (Client-side)",
      desc: "Žák otevře stránku. Prohlížeč okamžitě stáhne lehké HTML. Poté nastoupí React (tzv. Hydration) a oživí všechny šifry, simulátory a hry, které běží přímo v prohlížeči bez čekání na server!",
      icon: <MonitorPlay className="w-8 h-8" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest">Architektura Projektu</h2>
              <p className="text-slate-400 text-sm">Jak funguje IntLab pod pokličkou</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Interactive Canvas */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-8">
          
          {/* Controls */}
          <div className="absolute top-6 right-6 z-30 flex gap-2">
            {step < 4 && (
              <button
                onClick={() => setStep(s => s + 1)}
                className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                Další krok <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {step >= 4 && (
              <button
                onClick={() => setStep(0)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Reset
              </button>
            )}
          </div>

          {/* Timeline indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-200'}`}
              />
            ))}
          </div>

          {/* Canvas Area (Horizontal Layout) */}
          <div 
            id="simulation-canvas"
            className="w-full h-full relative mt-8 flex flex-row items-center overflow-x-auto pb-8 pt-4 px-12 gap-4 hide-scrollbar snap-x"
            style={{ scrollBehavior: 'smooth' }}
          >
            
            {/* 1. Vývojář */}
            <div id="step-0" className={`transition-all duration-1000 ${step >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} relative z-10 w-64 flex-shrink-0 snap-center`}>
              <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Code2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Zdrojový kód</h3>
                  <div className="flex gap-1 justify-center mt-2">
                    <button onClick={() => setSelectedTech({name: 'React', desc: 'Knihovna pro tvorbu uživatelského rozhraní. Zajišťuje interaktivitu, správu stavu a komponentový přístup.'})} className="text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded font-bold transition-colors cursor-pointer">React</button>
                    <button onClick={() => setSelectedTech({name: 'Tailwind CSS', desc: 'Nástroj pro rychlé a moderní stylování. Umožňuje tvořit responzivní a atraktivní design přímo v kódu bez nutnosti externích CSS souborů.'})} className="text-[10px] bg-sky-100 hover:bg-sky-200 text-sky-700 px-2 py-1 rounded font-bold transition-colors cursor-pointer">Tailwind</button>
                  </div>
                  <div className="mt-1">
                    <button onClick={() => setSelectedTech({name: 'Next.js', desc: 'Moderní framework nad Reactem, který umí celou aplikaci poskládat a vygenerovat do statických HTML/CSS/JS souborů pro extrémní rychlost.'})} className="text-[10px] bg-black hover:bg-slate-800 text-white px-2 py-1 rounded font-bold transition-colors cursor-pointer">Next.js</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Šipka 1 -> 2 */}
            <div className={`w-16 md:w-32 h-1 bg-slate-200 transition-all duration-1000 relative ${step >= 1 ? 'opacity-100' : 'opacity-0'} flex-shrink-0`}>
              <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ${step >= 1 ? 'w-full' : 'w-0'}`} />
              {step === 1 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 bg-slate-50 px-2 py-1 rounded shadow-sm border border-blue-100">Build</div>}
            </div>

            {/* 2. Statické soubory */}
            <div id="step-1" className={`transition-all duration-1000 delay-300 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} relative z-10 w-64 flex-shrink-0 snap-center`}>
              <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <FileCode2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Statický Export</h3>
                  <p className="text-xs text-slate-500 mt-1">.html, .css, .js</p>
                </div>
              </div>
            </div>

            {/* Šipka 2 -> 3 */}
            <div className={`w-16 md:w-32 h-1 bg-slate-200 transition-all duration-1000 relative ${step >= 2 ? 'opacity-100' : 'opacity-0'} flex-shrink-0`}>
              <div className={`absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ${step >= 2 ? 'w-full' : 'w-0'}`} />
              {step === 2 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600 bg-slate-50 px-2 py-1 rounded shadow-sm border border-emerald-100">Deploy</div>}
            </div>

            {/* 3. GitHub Pages */}
            <div id="step-2" className={`transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} relative z-10 w-64 flex-shrink-0 snap-center`}>
              <div className="bg-slate-800 p-4 rounded-2xl shadow-xl border-2 border-slate-700 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-white">
                  <Github className="w-8 h-8" />
                </div>
                <div>
                  <h3 
                    onClick={() => setSelectedTech({name: 'GitHub Pages', desc: 'Bezplatný server pro hostování statických webů. Slouží jako rychlý distribuční bod (CDN), odkud se stránka bleskově stáhne k žákovi.'})} 
                    className="font-bold text-white cursor-pointer hover:text-blue-400 transition-colors underline decoration-dotted"
                  >
                    GitHub Pages
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Hosting zdarma</p>
                </div>
              </div>
            </div>

            {/* Šipka 3 -> 4 */}
            <div className={`w-16 md:w-32 h-1 bg-slate-200 transition-all duration-1000 relative ${step >= 3 ? 'opacity-100' : 'opacity-0'} flex-shrink-0`}>
              <div className={`absolute top-0 left-0 h-full bg-orange-500 transition-all duration-1000 ${step >= 3 ? 'w-full' : 'w-0'}`} />
              {step === 3 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-orange-600 bg-slate-50 px-2 py-1 rounded shadow-sm border border-orange-100 whitespace-nowrap">Stažení klienta</div>}
            </div>

            {/* 4. Žák */}
            <div id="step-3" className={`transition-all duration-1000 delay-300 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} relative z-10 w-64 flex-shrink-0 snap-center`}>
              <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-200 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 relative overflow-hidden">
                  <Smartphone className="w-8 h-8 relative z-10" />
                  {step >= 3 && <div className="absolute inset-0 bg-orange-200 animate-pulse opacity-50" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Prohlížeč žáka</h3>
                  <p className="text-[10px] text-slate-500 mt-1">React běží u žáka (SPA)</p>
                  {step === 4 && (
                    <div className="mt-2 flex items-center justify-center gap-1 text-orange-600 text-xs font-bold animate-bounce">
                      <Zap className="w-3 h-3" /> Interaktivní!
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Text Description Box */}
        <div className="bg-white border-t border-slate-100 p-8 min-h-[180px]">
          <div className="max-w-4xl mx-auto">
            {step < 4 ? (
              <div className="flex gap-6 items-start animate-in slide-in-from-right-4 fade-in">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  {steps[step].icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-2">{steps[step].title}</h3>
                  <p className="text-slate-600 leading-relaxed">{steps[step].desc}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full animate-in zoom-in fade-in">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-2">Simulace dokončena</h3>
                <p className="text-slate-600">Takto funguje moderní webová aplikace bez závislosti na backendovém serveru.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Modal for Tech Stack */}
        {selectedTech && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-800">{selectedTech.name}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{selectedTech.desc}</p>
              <button 
                onClick={() => setSelectedTech(null)}
                className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl transition-colors"
              >
                Rozumím
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TechStackSimulation;
