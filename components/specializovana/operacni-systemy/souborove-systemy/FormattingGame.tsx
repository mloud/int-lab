'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, HardDrive, Eraser, Zap, Timer, CheckCircle2, Table2 } from 'lucide-react';

export default function FormattingGame({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0); // 0 = start, 1 = quick formatting, 2 = quick done, 3 = full formatting, 4 = full done
  const [progress, setProgress] = useState(0);
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  const [wipedCount, setWipedCount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);
  
  const handleQuickFormat = () => {
    if (step !== 0) return;
    clearTimer();
    setStep(1);
    setWipedCount(0);
    setActiveCluster(null);
    
    let p = 0;
    timerRef.current = setInterval(() => {
      p += 25;
      setProgress(p);
      if (p >= 100) {
        clearTimer();
        setTimeout(() => setStep(2), 200);
      }
    }, 150);
  };

  const handleFullFormat = () => {
    if (step !== 0 && step !== 2) {
      clearTimer();
      setStep(0);
      setProgress(0);
      setWipedCount(0);
      setActiveCluster(null);
      setTimeout(() => {
        startFullFormat();
      }, 100);
      return;
    }
    startFullFormat();
  };

  const startFullFormat = () => {
    clearTimer();
    setStep(3);
    setProgress(0);
    setWipedCount(0);
    setActiveCluster(0);
    
    let current = 0;
    // Zpomalená animace: 400 ms na cluster pro jasné a přehledné sledování zápisu nul do každého sektoru
    timerRef.current = setInterval(() => {
      current++;
      setWipedCount(current);
      setProgress(Math.round((current / 16) * 100));

      if (current < 16) {
        setActiveCluster(current);
      } else {
        clearTimer();
        setActiveCluster(null);
        setTimeout(() => setStep(4), 300);
      }
    }, 400);
  };

  const handleReset = () => {
    clearTimer();
    setStep(0);
    setProgress(0);
    setWipedCount(0);
    setActiveCluster(null);
  };

  const getClusterContent = (i: number) => {
    const isData = (i >= 2 && i <= 4) || (i >= 8 && i <= 10) || i === 14;
    const isWiped = wipedCount > i || step === 4;
    const isCurrentlyWriting = step === 3 && activeCluster === i;

    if (isCurrentlyWriting) {
      return (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <span className="text-amber-600 font-mono font-black text-2xl leading-none">0</span>
          <span className="text-amber-800 text-[9px] font-black uppercase tracking-wider mt-1 bg-amber-200/80 px-1.5 py-0.5 rounded shadow-sm">
            Zápis 0
          </span>
        </div>
      );
    }

    if (isWiped) {
      return (
        <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-300">
          <span className="text-emerald-700 font-mono font-black text-2xl leading-none">0</span>
          <span className="text-emerald-600 text-[8px] font-mono tracking-widest mt-0.5">00000000</span>
          <span className="text-slate-400 text-[8px] font-bold uppercase mt-0.5">Zero-fill</span>
        </div>
      );
    }

    if (isData) {
      if (step === 2) {
        // Po rychlém formátu data zůstávají jako zbytková (ghost) data
        return (
          <div className="flex flex-col items-center text-center">
            <div className="text-rose-500 text-[10px] font-black uppercase mt-1 leading-tight opacity-80">
              Zbytková<br/>Data
            </div>
            <div className="text-rose-400 text-[8px] font-mono mt-0.5 opacity-60">10110101</div>
          </div>
        );
      }
      // Původní data
      return (
        <div className="flex flex-col items-center">
          <div className="text-white text-xs font-black uppercase mt-1 tracking-wider">Data</div>
          <div className="text-rose-200 text-[8px] font-mono mt-0.5">11010010</div>
        </div>
      );
    }

    // Původní volno
    return (
      <div className="flex flex-col items-center">
        <div className="text-slate-400 text-xs font-bold mt-1">Volno</div>
        <div className="text-slate-300 text-[8px] font-mono mt-0.5">---</div>
      </div>
    );
  };

  const getClusterStyle = (i: number) => {
    const isData = (i >= 2 && i <= 4) || (i >= 8 && i <= 10) || i === 14;
    const isWiped = wipedCount > i || step === 4;
    const isCurrentlyWriting = step === 3 && activeCluster === i;

    if (isCurrentlyWriting) {
      return "bg-amber-50 border-amber-500 ring-4 ring-amber-200 scale-105 shadow-lg z-10";
    }

    if (isWiped) {
      return "bg-emerald-50/60 border-emerald-300 text-emerald-900 shadow-sm";
    }

    if (isData) {
      if (step === 2) return "bg-white border-dashed border-2 border-rose-300";
      return "bg-rose-500 border-rose-600 shadow-md text-white";
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
              <span>
                {step === 1 
                  ? 'Rychlé formátování (pouze výmaz FAT tabulky)...' 
                  : `Úplné formátování: Fyzický přepis sektorů nulami (Cluster #${activeCluster ?? 0} z 15)...`}
              </span>
              <span className="font-mono text-slate-700 font-black">{progress}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${step === 1 ? 'bg-sky-500' : 'bg-rose-500'}`} 
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
            <div className="min-h-36">
              {step === 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm leading-relaxed">
                  Vyberte typ formátování. Obě metody <strong>okamžitě</strong> vymažou FAT tabulku (katalog).
                </div>
              )}
              {step === 2 && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm animate-in slide-in-from-bottom-2 leading-relaxed">
                  <h5 className="font-black uppercase text-xs mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" /> Rychlé formátování
                  </h5>
                  Trvalo to pár sekund. Smazala se pouze FAT tabulka (ukazatele). Původní data na fyzickém disku však stále fyzicky zůstávají a jdou obnovit, dokud nebudou přepsána novými soubory.
                </div>
              )}
              {step === 4 && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-in slide-in-from-bottom-2 leading-relaxed">
                  <h5 className="font-black uppercase text-xs mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" /> Úplné formátování dokončeno
                  </h5>
                  Trvalo to znatelně déle. Systém prošel fyzicky celý povrch disku sektor po sektoru a do každého clusteru zapsal <strong>nuly (Zero-fill)</strong>. Původní data jsou definitivně zničena a nelze je obnovit.
                </div>
              )}
            </div>
          </div>

          {/* PRAVÝ PANEL: Fyzický disk */}
          <div className="lg:col-span-2">
            <div className={`p-6 sm:p-8 rounded-2xl border-4 transition-all duration-700 h-full flex flex-col ${step === 4 ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="font-bold text-slate-800 uppercase text-sm flex items-center gap-2 tracking-widest">
                  <HardDrive className="w-5 h-5 text-slate-600" /> Fyzické plotny disku
                </h4>
                {step === 3 && activeCluster !== null && (
                  <span className="text-xs font-black text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Zapisuji nulu do clusteru #{activeCluster}...
                  </span>
                )}
                {step === 4 && (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Všechny clustery vynulovány (Zero-fill)
                  </span>
                )}
              </div>
              
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

              {/* Informační lišta pod mřížkou */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span> Původní data
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-300 inline-block"></span> Vynulovaný sektor (0)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">16 clusterů × 4 KB</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
