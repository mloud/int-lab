'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Cpu, Layers, CheckCircle2, Info } from 'lucide-react';

export default function ProcessSwitchingSimulatorTab() {
  const [switchStep, setSwitchStep] = useState<1 | 2 | 3>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Automatické přehrávání
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setSwitchStep((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNextStep = () => {
    setIsPlaying(false);
    setSwitchStep((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSwitchStep(1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hlavní interaktivní trenažér */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-sm space-y-6">
        
        {/* Horní lišta ovládání */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span>Interaktivní simulátor: Přepnutí kontextu na CPU</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sledujte, jak procesor ukládá registr PC do jádra OS a přepíná na druhý program.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                isPlaying 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pozastavit' : 'Automatický běh'}</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Další krok</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              title="Resetovat simulaci"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Informační stavový proužek */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-sm shadow-sm transition-colors ${
              switchStep === 1 ? 'bg-blue-600' : switchStep === 2 ? 'bg-amber-500' : 'bg-emerald-600'
            }`}>
              {switchStep}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                {switchStep === 1 && 'Krok 1: Procesor vykonává instrukce Wordu'}
                {switchStep === 2 && 'Krok 2: Vypršelo kvantum! Jádro OS ukládá stav PC1 a načítá PC2'}
                {switchStep === 3 && 'Krok 3: Procesor plynule pokračuje v instrukcích Kalkulačky'}
              </h4>
              <p className="text-xs text-slate-500">
                {switchStep === 1 && 'Registr PC v procesoru obsahuje adresu 1004 (ukazuje přímo do paměti Wordu).'}
                {switchStep === 2 && 'Do PCB Wordu se ukládá PC = 1004. Z PCB Kalkulačky se do CPU nahrává PC = 5020.'}
                {switchStep === 3 && 'Registr PC v procesoru nyní obsahuje adresu 5020 (ukazuje do paměti Kalkulačky).'}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs px-3.5 py-2 rounded-xl bg-slate-100 font-black text-slate-700 border border-slate-200">
            CPU Registr PC: {switchStep === 1 ? '1004' : switchStep === 2 ? '1004 ➔ 5020' : '5020'}
          </div>
        </div>

        {/* Grafické schéma propojení CPU a RAM v SVG */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex justify-center">
          <svg viewBox="0 0 700 330" className="w-full max-w-[650px] h-auto">
            
            {/* PROCESOR NAHOŘE UPROSTŘED */}
            <rect x="240" y="15" width="220" height="105" rx="16" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <text x="350" y="42" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900" letterSpacing="1">
              PROCESOR (CPU)
            </text>
            
            {/* Registr PC v procesoru */}
            <rect 
              x="260" 
              y="55" 
              width="180" 
              height="50" 
              rx="10" 
              fill={switchStep === 1 ? '#1d4ed8' : switchStep === 2 ? '#b45309' : '#15803d'} 
            />
            <text x="350" y="74" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              ČÍTAČ INSTRUKCÍ (REGISTR PC)
            </text>
            <text x="350" y="93" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="900">
              {switchStep === 1 ? 'PC = 1004' : switchStep === 2 ? 'PC = 5020' : 'PC = 5020'}
            </text>

            {/* VODIČE / ŠIPKY Z CPU DO PAMĚTI */}
            {/* Větev pro Proces 1 */}
            <path 
              d="M 260 80 L 150 80 L 150 160" 
              fill="none" 
              stroke={switchStep === 1 ? '#2563eb' : '#cbd5e1'} 
              strokeWidth={switchStep === 1 ? '4' : '2'} 
              strokeDasharray={switchStep === 1 ? 'none' : '4 4'}
            />
            {switchStep === 1 && (
              <polygon points="144,155 150,165 156,155" fill="#2563eb" />
            )}

            {/* Větev pro Proces 2 */}
            <path 
              d="M 440 80 L 550 80 L 550 160" 
              fill="none" 
              stroke={switchStep === 3 ? '#16a34a' : '#cbd5e1'} 
              strokeWidth={switchStep === 3 ? '4' : '2'} 
              strokeDasharray={switchStep === 3 ? 'none' : '4 4'}
            />
            {switchStep === 3 && (
              <polygon points="544,155 550,165 556,155" fill="#16a34a" />
            )}

            {/* JÁDRO OS UPROSTŘED (PCB ZÁZNAMY) */}
            <rect 
              x="265" 
              y="160" 
              width="170" 
              height="150" 
              rx="14" 
              fill={switchStep === 2 ? '#fef3c7' : '#f8fafc'} 
              stroke={switchStep === 2 ? '#f59e0b' : '#cbd5e1'} 
              strokeWidth={switchStep === 2 ? '3' : '1.5'} 
            />
            <rect x="265" y="160" width="170" height="26" rx="12" fill={switchStep === 2 ? '#d97706' : '#64748b'} />
            <text x="350" y="177" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              JÁDRO OS (KERNEL)
            </text>
            <text x="275" y="202" fill="#475569" fontSize="9" fontWeight="bold">Správa PCB tabulek:</text>
            
            {/* PCB Word */}
            <rect x="275" y="210" width="150" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
            <text x="283" y="225" fill="#1e40af" fontSize="9" fontWeight="bold">PCB 1: Word (PID 101)</text>
            <text x="283" y="240" fill="#2563eb" fontSize="9" fontFamily="monospace">
              {switchStep === 2 ? '💾 Uloženo: PC = 1004' : 'Uloženo: PC = 1004'}
            </text>

            {/* PCB Calc */}
            <rect x="275" y="255" width="150" height="38" rx="6" fill="#f0fdf4" stroke="#86efac" />
            <text x="283" y="270" fill="#166534" fontSize="9" fontWeight="bold">PCB 2: Calc (PID 205)</text>
            <text x="283" y="285" fill="#16a34a" fontSize="9" fontFamily="monospace">
              {switchStep === 2 ? '⚡ Načítá se: PC = 5020' : 'Uloženo: PC = 5020'}
            </text>

            {/* PAMĚŤOVÝ BLOK PROCESU 1 (DOLE VLEVO) */}
            <rect 
              x="45" 
              y="160" 
              width="210" 
              height="150" 
              rx="14" 
              fill={switchStep === 1 ? '#eff6ff' : '#f8fafc'} 
              stroke={switchStep === 1 ? '#2563eb' : '#94a3b8'} 
              strokeWidth={switchStep === 1 ? '3' : '2'} 
            />
            <rect x="45" y="160" width="210" height="28" rx="12" fill={switchStep === 1 ? '#2563eb' : '#64748b'} />
            <text x="150" y="178" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              PROCES 1 (PID 101: Word)
            </text>
            
            {/* Instrukce Wordu */}
            <text x="58" y="210" fill="#1e3a8a" fontSize="10" fontFamily="monospace">Adresa 1000: Načti text</text>
            <rect x="52" y="217" width="196" height="20" rx="4" fill={switchStep === 1 ? '#bfdbfe' : 'transparent'} />
            <text 
              x="58" 
              y="231" 
              fill={switchStep === 1 ? '#1e40af' : '#64748b'} 
              fontSize="11" 
              fontFamily="monospace" 
              fontWeight={switchStep === 1 ? 'bold' : 'normal'}
            >
              {switchStep === 1 ? '➔ 1004: Zformátuj odstavec' : '   1004: Zformátuj odstavec'}
            </text>
            <text x="58" y="252" fill="#1e3a8a" fontSize="10" fontFamily="monospace">Adresa 1008: Vykresli písmo</text>
            <text x="58" y="272" fill="#1e3a8a" fontSize="10" fontFamily="monospace">Adresa 1012: Zkontroluj gramatiku</text>
            <text x="58" y="295" fill="#64748b" fontSize="9" fontStyle="italic">Adresní prostor v RAM: 1000–4999</text>

            {/* PAMĚŤOVÝ BLOK PROCESU 2 (DOLE VPRAVO) */}
            <rect 
              x="445" 
              y="160" 
              width="210" 
              height="150" 
              rx="14" 
              fill={switchStep === 3 ? '#f0fdf4' : '#f8fafc'} 
              stroke={switchStep === 3 ? '#16a34a' : '#94a3b8'} 
              strokeWidth={switchStep === 3 ? '3' : '2'} 
            />
            <rect x="445" y="160" width="210" height="28" rx="12" fill={switchStep === 3 ? '#16a34a' : '#64748b'} />
            <text x="550" y="178" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              PROCES 2 (PID 205: Calc)
            </text>
            
            {/* Instrukce Kalkulačky */}
            <text x="458" y="210" fill="#14532d" fontSize="10" fontFamily="monospace">Adresa 5016: Načti vstup</text>
            <rect x="452" y="217" width="196" height="20" rx="4" fill={switchStep === 3 ? '#bbf7d0' : 'transparent'} />
            <text 
              x="458" 
              y="231" 
              fill={switchStep === 3 ? '#14532d' : '#64748b'} 
              fontSize="11" 
              fontFamily="monospace" 
              fontWeight={switchStep === 3 ? 'bold' : 'normal'}
            >
              {switchStep === 3 ? '➔ 5020: Sečti čísla (ADD)' : '   5020: Sečti čísla (ADD)'}
            </text>
            <text x="458" y="252" fill="#14532d" fontSize="10" fontFamily="monospace">Adresa 5024: Ulož výsledek</text>
            <text x="458" y="272" fill="#14532d" fontSize="10" fontFamily="monospace">Adresa 5028: Zobraz na displej</text>
            <text x="458" y="295" fill="#64748b" fontSize="9" fontStyle="italic">Adresní prostor v RAM: 5000–8999</text>

          </svg>
        </div>

        {/* Tlačítko dalšího kroku dole */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleNextStep}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/20 uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Pokračovat na další krok střídání ➔</span>
          </button>
        </div>

      </div>

      {/* Shrnutí pro studenty */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>Co si z této vizualizace zapamatovat:</span>
        </h4>
        <ul className="space-y-1.5 list-disc pl-5 leading-relaxed">
          <li>Procesor má v jednom okamžiku <strong>pouze jednu hodnotu v registru PC</strong>. Proto může reálně počítat vždy jen jeden program.</li>
          <li>Když časové kvantum vyprší, jádro OS uloží aktuální hodnotu registru PC do <strong>tabulky PCB v paměti kernelu</strong>.</li>
          <li>Když se proces po chvíli vrátí na řadu, z PCB se jeho původní adresa znovu nahraje do procesoru a program pokračuje, jako by se nic nestalo.</li>
        </ul>
      </div>

    </div>
  );
}
