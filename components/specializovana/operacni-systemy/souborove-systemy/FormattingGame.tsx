'use client';

import React, { useState } from 'react';
import { ArrowLeft, HardDrive, Eraser, Zap, Timer, CheckCircle2, Table2 } from 'lucide-react';

export default function FormattingGame({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0); // 0 = start, 1 = quick formatting, 2 = quick done, 3 = full formatting, 4 = full done
  const [progress, setProgress] = useState(0);
  
  const handleQuickFormat = () => {
    if (step !== 0) return;
    setStep(1);
    
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep(2), 200);
      }
    }, 100);
  };

  const handleFullFormat = () => {
    if (step !== 0 && step !== 2) {
      setStep(0);
      setProgress(0);
      setTimeout(() => {
        startFullFormat();
      }, 100);
      return;
    }
    startFullFormat();
  };

  const startFullFormat = () => {
    setStep(3);
    setProgress(0);
    
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep(4), 200);
      }
    }, 150);
  };

  const handleReset = () => {
    setStep(0);
    setProgress(0);
  };

  const getClusterContent = (i: number) => {
    const isData = (i >= 2 && i <= 4) || (i >= 8 && i <= 10) || i === 14;
    
    if (step === 3 || step === 4) {
      // Během Full Formatu nebo po něm se data fyzicky mažou (přepisují nulami)
      const isWiped = progress > (i / 15) * 100;
      if (isWiped) {
        return (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="text-slate-300 text-[10px] font-black uppercase mt-1">Prázdné</div>
            <div className="text-slate-200 text-[8px] font-mono">00000000</div>
          </div>
        );
      }
    }

    if (isData) {
      if (step === 2) {
        // Po rychlém formátu data zůstávají jako ghost data
        return (
          <div className="flex flex-col items-center">
            <div className="text-rose-400 text-[10px] font-black uppercase mt-1 leading-tight text-center opacity-70">Zbytková<br/>Data</div>
          </div>
        );
      }
      // Původní data
      return <div className="text-white text-xs font-black uppercase mt-2">Data</div>;
    }

    // Původní volno
    return <div className="text-slate-300 text-xs font-bold mt-2">Volno</div>;
  };

  const getClusterStyle = (i: number) => {
    const isData = (i >= 2 && i <= 4) || (i >= 8 && i <= 10) || i === 14;
    
    if (step === 3 || step === 4) {
      const isWiped = progress > (i / 15) * 100;
      if (isWiped) return "bg-slate-50 border-slate-200";
    }

    if (isData) {
      if (step === 2) return "bg-white border-dashed border-2 border-rose-300";
      return "bg-rose-500 border-rose-600 shadow-md";
    }
    
    return "bg-white border-slate-200";
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-4 sm:p-8 animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 mb-8 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm transition-all border-2 border-slate-100 uppercase tracking-wider text-xs"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do teorie
      </button>

      <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border-2 border-slate-100">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2">Formátování</h2>
            <p className="text-slate-500 font-medium">Rozdíl mezi rychlým a pomalým (úplným) formátováním disku.</p>
          </div>
          
          <div className="flex gap-3">
            {step === 0 || step === 2 || step === 4 ? (
              <>
                <button
                  onClick={handleQuickFormat}
                  disabled={step !== 0}
                  className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl shadow-sm transition-all text-sm ${step === 0 ? 'bg-sky-100 text-sky-700 hover:bg-sky-200' : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'}`}
                >
                  <Zap className="w-4 h-4" /> Rychlé
                </button>
                <button
                  onClick={handleFullFormat}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 text-sm"
                >
                  <Eraser className="w-4 h-4" /> Pomalé (Úplné)
                </button>
                {step !== 0 && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl shadow-sm transition-all active:scale-95 text-sm ml-4"
                  >
                    Reset
                  </button>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Progress Bar */}
        {(step === 1 || step === 3) && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
              <span>{step === 1 ? 'Rychlé formátování...' : 'Úplné formátování (přepisování nulami)...'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${step === 1 ? 'bg-sky-500' : 'bg-rose-500'}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEVÝ PANEL: FAT Tabulka */}
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border-4 transition-all duration-500 ${step > 0 ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}>
              <h4 className="font-bold text-slate-800 uppercase text-xs mb-4 flex items-center gap-2">
                <Table2 className="w-4 h-4 text-slate-500" /> FAT Tabulka (Katalog)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
                  const isData = (i >= 2 && i <= 4) || (i >= 8 && i <= 10) || i === 14;
                  let val = '0';
                  
                  if (step === 0 && isData) {
                    if (i === 4 || i === 10 || i === 14) val = 'EOF';
                    else val = (i + 1).toString();
                  }

                  let bg = 'bg-white border-slate-100 text-slate-400';
                  if (step === 0 && isData) bg = 'bg-rose-50 border-rose-200 text-rose-700 font-bold';
                  if (step > 0 && isData && step !== 3 && step !== 4) bg = 'bg-amber-100 border-amber-300 text-amber-700 font-bold';
                  if (step === 1 || step === 3) {
                    // Animace smazání FAT tabulky proběhne u obou ihned
                    bg = 'bg-white border-slate-100 text-slate-400'; 
                  }

                  return (
                    <div key={i} className={`py-1.5 rounded border transition-colors duration-300 ${bg}`}>
                      [{i}] {val}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zpráva */}
            <div className="h-40">
              {step === 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm">
                  Vyberte typ formátování. Obě metody <strong>okamžitě</strong> vymažou FAT tabulku.
                </div>
              )}
              {step === 2 && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm animate-in slide-in-from-bottom-2">
                  <h5 className="font-black uppercase text-xs mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Rychlé formátování
                  </h5>
                  Trvalo to pár sekund. Smazala se pouze FAT tabulka (ukazatele). Původní data na fyzickém disku však stále zůstávají a jdou obnovit, dokud nebudou přepsána.
                </div>
              )}
              {step === 4 && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-in slide-in-from-bottom-2">
                  <h5 className="font-black uppercase text-xs mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Úplné formátování
                  </h5>
                  Trvalo to mnohem déle. Kromě FAT tabulky systém prošel fyzicky celý povrch disku a přepsal všechny původní sektory nulami (tzv. Zero-fill). Data jsou definitivně zničena a nelze je obnovit.
                </div>
              )}
            </div>
          </div>

          {/* PRAVÝ PANEL: Fyzický disk */}
          <div className="lg:col-span-2">
            <div className={`p-6 sm:p-8 rounded-2xl border-4 transition-all duration-1000 h-full flex flex-col ${step === 4 ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
              <h4 className="font-bold text-slate-800 uppercase text-sm mb-6 flex items-center justify-center gap-2 tracking-widest">
                <HardDrive className="w-5 h-5" /> Fyzické plotny disku
              </h4>
              
              <div className="grid grid-cols-4 gap-3 flex-1">
                {[...Array(16)].map((_, i) => {
                  return (
                    <div key={i} className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center relative transition-all duration-300 ${getClusterStyle(i)}`}>
                      <div className={`absolute top-1.5 left-2 text-[10px] font-mono opacity-50`}>
                        #{i}
                      </div>
                      {getClusterContent(i)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
