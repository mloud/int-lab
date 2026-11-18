'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Cpu, 
  Clock, 
  Zap, 
  Info 
} from 'lucide-react';

export interface CpuSwitchingSimulatorProps {
  /**
   * 'quantum-only': Standardní vypršení časového kvanta (pro Multitasking)
   * 'with-io': Word narazí na I/O diskovou operaci a vzdá se CPU dříve (pro Stavy procesů)
   */
  mode?: 'quantum-only' | 'with-io';
  showStateDiagram?: boolean;
  showTimeline?: boolean;
  title?: string;
  subtitle?: string;
}

export default function CpuSwitchingSimulator({
  mode = 'quantum-only',
  showStateDiagram,
  showTimeline,
  title,
  subtitle,
}: CpuSwitchingSimulatorProps) {
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed] = useState<number>(2500);

  const isWithIo = mode === 'with-io';
  const showStates = showStateDiagram ?? isWithIo;
  const showTime = showTimeline ?? !isWithIo;
  const totalSteps = 9;

  // Automatické přehrávání
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, totalSteps]);

  const handleNext = () => {
    setIsPlaying(false);
    setStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setStep((prev) => (prev <= 1 ? totalSteps : prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(1);
  };

  interface StepInfo {
    activeEntity: 'CALC' | 'KERNEL' | 'WORD';
    pcValue: string;
    badgeTitle: string;
    badgeDesc: string;
    timelineTimeMs: number;
    timelineX: number;
    calcActiveInst: number;
    wordActiveInst: number;
    calcCompletedInsts: number[];
    wordCompletedInsts: number[];
    isInterrupt: boolean;
    interruptReason?: string;
  }

  // Geometrie osy X: 100 až 730
  const wordBlockEnd = isWithIo ? 420 : 510;
  const switch2End = isWithIo ? 470 : 560;

  const getStepInfo = (s: number): StepInfo => {
    switch (s) {
      case 1:
        return {
          activeEntity: 'CALC',
          pcValue: '5000',
          badgeTitle: 'Kalkulačka: Instrukce 1 (Start)',
          badgeDesc: 'CPU vykonává instrukci 5000. Začíná časové kvantum 20 ms.',
          timelineTimeMs: 0,
          timelineX: 100,
          calcActiveInst: 5000,
          wordActiveInst: 0,
          calcCompletedInsts: [],
          wordCompletedInsts: [],
          isInterrupt: false,
        };
      case 2:
        return {
          activeEntity: 'CALC',
          pcValue: '5004',
          badgeTitle: 'Kalkulačka: Instrukce 2',
          badgeDesc: 'Instrukce 5000 hotova. Čítač PC se posunul na 5004.',
          timelineTimeMs: 10,
          timelineX: 190,
          calcActiveInst: 5004,
          wordActiveInst: 0,
          calcCompletedInsts: [5000],
          wordCompletedInsts: [],
          isInterrupt: false,
        };
      case 3:
        return {
          activeEntity: 'CALC',
          pcValue: '5008',
          badgeTitle: 'Kalkulačka: Vypršel časovač (20 ms)',
          badgeDesc: 'Vypršel časovač kvanta! Řízení přebírá jádro OS.',
          timelineTimeMs: 20,
          timelineX: 280,
          calcActiveInst: 5008,
          wordActiveInst: 0,
          calcCompletedInsts: [5000, 5004],
          wordCompletedInsts: [],
          isInterrupt: true,
          interruptReason: '⏱️ Timer (20 ms)',
        };
      case 4:
        return {
          activeEntity: 'KERNEL',
          pcValue: '5012 ➔ 1000',
          badgeTitle: 'Jádro OS: Přepnutí kontextu',
          badgeDesc: 'Uložení PC = 5012 do PCB 1 ➔ Načtení PC = 1000 z PCB 2.',
          timelineTimeMs: 21.5,
          timelineX: 305,
          calcActiveInst: 0,
          wordActiveInst: 0,
          calcCompletedInsts: [5000, 5004, 5008],
          wordCompletedInsts: [],
          isInterrupt: false,
        };
      case 5:
        return {
          activeEntity: 'WORD',
          pcValue: '1000',
          badgeTitle: 'Word: Instrukce 1 (Start)',
          badgeDesc: 'Word běží na CPU: Provádí instrukci 1000.',
          timelineTimeMs: 23,
          timelineX: 335,
          calcActiveInst: 0,
          wordActiveInst: 1000,
          calcCompletedInsts: [5000, 5004, 5008],
          wordCompletedInsts: [],
          isInterrupt: false,
        };
      case 6:
        return {
          activeEntity: 'WORD',
          pcValue: '1004',
          badgeTitle: isWithIo 
            ? 'Word volá I/O: Čtení z disku!' 
            : 'Word: Instrukce 2',
          badgeDesc: isWithIo
            ? 'Čekání na disk: Word se dobrovolně vzdává CPU (BLOCKED).'
            : 'Instrukce 1000 hotova. Čítač PC se posunul na 1004.',
          timelineTimeMs: isWithIo ? 30 : 33,
          timelineX: isWithIo ? 415 : 420,
          calcActiveInst: 0,
          wordActiveInst: 1004,
          calcCompletedInsts: [5000, 5004, 5008],
          wordCompletedInsts: [1000],
          isInterrupt: isWithIo,
          interruptReason: isWithIo ? '💾 Čekání na I/O disk' : undefined,
        };
      case 7:
        if (isWithIo) {
          return {
            activeEntity: 'KERNEL',
            pcValue: '1008 ➔ 5012',
            badgeTitle: 'Jádro OS: Uspání Wordu do BLOCKED',
            badgeDesc: 'Word čeká na disk. Do CPU se vrací uložená Kalkulačka.',
            timelineTimeMs: 31.5,
            timelineX: 445,
            calcActiveInst: 0,
            wordActiveInst: 0,
            calcCompletedInsts: [5000, 5004, 5008],
            wordCompletedInsts: [1000, 1004],
            isInterrupt: false,
          };
        } else {
          return {
            activeEntity: 'WORD',
            pcValue: '1008',
            badgeTitle: 'Word: Vypršel časovač (20 ms)',
            badgeDesc: 'Vypršel časovač Wordu. Řízení přebírá jádro OS.',
            timelineTimeMs: 43,
            timelineX: 510,
            calcActiveInst: 0,
            wordActiveInst: 1008,
            calcCompletedInsts: [5000, 5004, 5008],
            wordCompletedInsts: [1000, 1004],
            isInterrupt: true,
            interruptReason: '⏱️ Timer (20 ms)',
          };
        }
      case 8:
        if (isWithIo) {
          return {
            activeEntity: 'CALC',
            pcValue: '5012',
            badgeTitle: 'Kalkulačka: Pokračování na CPU',
            badgeDesc: 'Kalkulačka navazuje od PC = 5012 přesně tam, kde skončila.',
            timelineTimeMs: 35,
            timelineX: 510,
            calcActiveInst: 5012,
            wordActiveInst: 0,
            calcCompletedInsts: [5000, 5004, 5008],
            wordCompletedInsts: [1000, 1004],
            isInterrupt: false,
          };
        } else {
          return {
            activeEntity: 'KERNEL',
            pcValue: '1012 ➔ 5012',
            badgeTitle: 'Jádro OS: Přepnutí kontextu',
            badgeDesc: 'Uložení Wordu do PCB 2 ➔ Obnova Kalkulačky z PCB 1.',
            timelineTimeMs: 44.5,
            timelineX: 535,
            calcActiveInst: 0,
            wordActiveInst: 0,
            calcCompletedInsts: [5000, 5004, 5008],
            wordCompletedInsts: [1000, 1004, 1008],
            isInterrupt: false,
          };
        }
      case 9:
      default:
        return {
          activeEntity: 'CALC',
          pcValue: '5012',
          badgeTitle: 'Kalkulačka: Instrukce 5012',
          badgeDesc: 'Kalkulačka plynule pokračuje ve výpočtu od adresy 5012.',
          timelineTimeMs: isWithIo ? 45 : 48,
          timelineX: isWithIo ? 570 : 600,
          calcActiveInst: 5012,
          wordActiveInst: 0,
          calcCompletedInsts: [5000, 5004, 5008],
          wordCompletedInsts: [1000, 1004, 1008],
          isInterrupt: false,
        };
    }
  };

  const current = getStepInfo(step);

  const calcState = (step <= 3 || (isWithIo && step >= 8) || (!isWithIo && step >= 8)) ? 'RUNNING' : 'READY';
  const wordState = isWithIo 
    ? ((step >= 6) ? 'BLOCKED' : (step === 5 ? 'RUNNING' : 'READY'))
    : (step >= 5 && step <= 7 ? 'RUNNING' : 'READY');

  return (
    <div className="w-full space-y-3 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* KOMPAKTNÍ ŘÍDICÍ A STAVOVÁ LIŠTA (PŘÍMO U RUKY)                             */}
      {/* ========================================================================= */}
      <div className={`p-3 sm:p-4 rounded-2xl border-2 transition-all shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 ${
        current.activeEntity === 'CALC'
          ? 'bg-emerald-50/90 border-emerald-300'
          : current.activeEntity === 'WORD'
          ? 'bg-blue-50/90 border-blue-300'
          : 'bg-amber-50/95 border-amber-300'
      }`}>
        
        {/* Vlevo: Krok, entita a popis děje */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-sm shrink-0 ${
            current.activeEntity === 'CALC' ? 'bg-emerald-600' :
            current.activeEntity === 'WORD' ? 'bg-blue-600' : 'bg-amber-600'
          }`}>
            {step}/{totalSteps}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                current.activeEntity === 'CALC' ? 'bg-emerald-200 text-emerald-900' :
                current.activeEntity === 'WORD' ? 'bg-blue-200 text-blue-900' : 'bg-amber-200 text-amber-900'
              }`}>
                {current.activeEntity === 'CALC' && 'Proces 1: Kalkulačka'}
                {current.activeEntity === 'WORD' && 'Proces 2: Word'}
                {current.activeEntity === 'KERNEL' && 'Jádro OS (Přepnutí)'}
              </span>

              {current.isInterrupt && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 animate-pulse">
                  <Zap className="w-3 h-3 text-rose-600" />
                  <span>{current.interruptReason}</span>
                </span>
              )}
            </div>

            <h4 className="font-black text-slate-900 text-xs sm:text-sm tracking-tight truncate mt-0.5">
              {current.badgeTitle}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 truncate max-w-xl">
              {current.badgeDesc}
            </p>
          </div>
        </div>

        {/* Vpravo: Stav registru PC + Akční tlačítka */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="font-mono text-xs font-black px-3 py-2 rounded-xl bg-white border border-slate-300 shadow-xs text-slate-800 flex items-center gap-1.5">
            <span className="text-slate-400 font-sans text-[10px]">PC:</span>
            <span className={
              current.activeEntity === 'CALC' ? 'text-emerald-700' :
              current.activeEntity === 'WORD' ? 'text-blue-700' : 'text-amber-700'
            }>
              {current.pcValue}
            </span>
          </div>

          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`p-2 rounded-xl border transition-all ${
              step === 1 
                ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
            }`}
            title="Předchozí krok"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            <span>{step === totalSteps ? 'Znovu ↻' : 'Další krok'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl text-white transition-all shadow-xs ${
              isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            title={isPlaying ? 'Pozastavit' : 'Automatický běh'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            title="Resetovat na krok 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* JEDINÝ BÍLÝ PANEL: SPOJENÉ SCHÉMA CPU/RAM A ČASOVÁ OSA                     */}
      {/* ========================================================================= */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
        
        {/* HORNÍ SVG: CPU A PAMĚTI RAM (Výška snížena na 245 px) */}
        <div className="w-full flex justify-center overflow-x-auto">
          <svg viewBox="0 0 760 245" className="w-full max-w-[760px] h-auto select-none font-sans">
            
            {/* VODIČE ZE SBĚRNICE DO RAM */}
            {/* Větev vlevo: Kalkulačka */}
            <path 
              d="M 270 34 L 147 34 L 147 72" 
              fill="none" 
              stroke={current.activeEntity === 'CALC' ? '#10b981' : '#cbd5e1'} 
              strokeWidth={current.activeEntity === 'CALC' ? '3.5' : '1.5'} 
              strokeDasharray={current.activeEntity === 'CALC' ? 'none' : '3 3'}
            />
            {current.activeEntity === 'CALC' && (
              <polygon points="142,67 147,75 152,67" fill="#10b981" />
            )}

            {/* Větev vpravo: Word */}
            <path 
              d="M 490 34 L 612 34 L 612 72" 
              fill="none" 
              stroke={current.activeEntity === 'WORD' ? '#2563eb' : '#cbd5e1'} 
              strokeWidth={current.activeEntity === 'WORD' ? '3.5' : '1.5'} 
              strokeDasharray={current.activeEntity === 'WORD' ? 'none' : '3 3'}
            />
            {current.activeEntity === 'WORD' && (
              <polygon points="607,67 612,75 617,67" fill="#2563eb" />
            )}

            {/* Větev dolů do jádra OS */}
            <path 
              d="M 380 58 L 380 72" 
              fill="none" 
              stroke={current.activeEntity === 'KERNEL' ? '#f59e0b' : '#cbd5e1'} 
              strokeWidth={current.activeEntity === 'KERNEL' ? '3.5' : '1.5'} 
              strokeDasharray={current.activeEntity === 'KERNEL' ? 'none' : '3 3'}
            />
            {current.activeEntity === 'KERNEL' && (
              <polygon points="375,67 380,75 385,67" fill="#f59e0b" />
            )}

            {/* ------------------------------------------------------------- */}
            {/* PROCESOR CPU (Štíhlý kompaktní blok)                           */}
            {/* ------------------------------------------------------------- */}
            <g>
              <rect 
                x="265" 
                y="6" 
                width="230" 
                height="52" 
                rx="12" 
                fill="#0f172a" 
                stroke={
                  current.activeEntity === 'CALC' ? '#10b981' :
                  current.activeEntity === 'WORD' ? '#3b82f6' : '#f59e0b'
                } 
                strokeWidth="2.5" 
              />
              
              <text x="380" y="20" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="900" letterSpacing="1">
                PROCESOR (CPU)
              </text>

              {/* Vnitřní čip registru PC */}
              <rect 
                x="280" 
                y="24" 
                width="200" 
                height="28" 
                rx="6" 
                fill={
                  current.activeEntity === 'CALC' ? '#065f46' :
                  current.activeEntity === 'WORD' ? '#1e40af' : '#78350f'
                }
                stroke={
                  current.activeEntity === 'CALC' ? '#34d399' :
                  current.activeEntity === 'WORD' ? '#60a5fa' : '#fbbf24'
                }
                strokeWidth="1.5"
              />

              <text x="380" y="42" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="900">
                PC = {current.pcValue}
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* PAMĚŤOVÝ BLOK VLEVO: PROCES 1 (KALKULAČKA, PID 205)            */}
            {/* ------------------------------------------------------------- */}
            <g>
              <rect 
                x="25" 
                y="74" 
                width="245" 
                height="164" 
                rx="12" 
                fill={current.activeEntity === 'CALC' ? '#ecfdf5' : '#f8fafc'} 
                stroke={current.activeEntity === 'CALC' ? '#10b981' : '#cbd5e1'} 
                strokeWidth={current.activeEntity === 'CALC' ? '2.5' : '1'} 
              />

              <rect 
                x="25" 
                y="74" 
                width="245" 
                height="28" 
                rx="10" 
                fill={current.activeEntity === 'CALC' ? '#059669' : '#64748b'} 
              />
              <text x="147.5" y="92" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                PROCES 1: Kalkulačka (PID 205)
              </text>

              {/* Instrukce 5000 */}
              <rect 
                x="31" 
                y="108" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.calcActiveInst === 5000 ? '#a7f3d0' : 'transparent'} 
              />
              <text 
                x="38" 
                y="124" 
                fill={current.calcActiveInst === 5000 ? '#065f46' : current.calcCompletedInsts.includes(5000) ? '#059669' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.calcActiveInst === 5000 ? '900' : 'bold'}
              >
                {current.calcActiveInst === 5000 ? '➔ 5000: Načti proměnné' : current.calcCompletedInsts.includes(5000) ? '✓ 5000: Načti proměnné' : '  5000: Načti proměnné'}
              </text>

              {/* Instrukce 5004 */}
              <rect 
                x="31" 
                y="134" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.calcActiveInst === 5004 ? '#a7f3d0' : 'transparent'} 
              />
              <text 
                x="38" 
                y="150" 
                fill={current.calcActiveInst === 5004 ? '#065f46' : current.calcCompletedInsts.includes(5004) ? '#059669' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.calcActiveInst === 5004 ? '900' : 'bold'}
              >
                {current.calcActiveInst === 5004 ? '➔ 5004: Násobení (MUL)' : current.calcCompletedInsts.includes(5004) ? '✓ 5004: Násobení (MUL)' : '  5004: Násobení (MUL)'}
              </text>

              {/* Instrukce 5008 */}
              <rect 
                x="31" 
                y="160" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.calcActiveInst === 5008 ? '#a7f3d0' : 'transparent'} 
              />
              <text 
                x="38" 
                y="176" 
                fill={current.calcActiveInst === 5008 ? '#065f46' : current.calcCompletedInsts.includes(5008) ? '#059669' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.calcActiveInst === 5008 ? '900' : 'bold'}
              >
                {current.calcActiveInst === 5008 ? '➔ 5008: Ulož výsledek' : current.calcCompletedInsts.includes(5008) ? '✓ 5008: Ulož výsledek' : '  5008: Ulož výsledek'}
              </text>

              {/* Instrukce 5012 */}
              <rect 
                x="31" 
                y="186" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.calcActiveInst === 5012 ? '#a7f3d0' : 'transparent'} 
              />
              <text 
                x="38" 
                y="202" 
                fill={current.calcActiveInst === 5012 ? '#065f46' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.calcActiveInst === 5012 ? '900' : 'bold'}
              >
                {current.calcActiveInst === 5012 ? '➔ 5012: Zobraz výsledek' : '  5012: Zobraz výsledek'}
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* JÁDRO OS UPROSTŘED (KERNEL A PCB TABULKY)                     */}
            {/* ------------------------------------------------------------- */}
            <g>
              <rect 
                x="285" 
                y="74" 
                width="190" 
                height="164" 
                rx="12" 
                fill={current.activeEntity === 'KERNEL' ? '#fffbeb' : '#f8fafc'} 
                stroke={current.activeEntity === 'KERNEL' ? '#f59e0b' : '#cbd5e1'} 
                strokeWidth={current.activeEntity === 'KERNEL' ? '2.5' : '1'} 
              />

              <rect 
                x="285" 
                y="74" 
                width="190" 
                height="28" 
                rx="10" 
                fill={current.activeEntity === 'KERNEL' ? '#d97706' : '#64748b'} 
              />
              <text x="380" y="92" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                JÁDRO OS (KERNEL)
              </text>

              {/* PCB 1: Kalkulačka */}
              <rect 
                x="293" 
                y="108" 
                width="174" 
                height="50" 
                rx="6" 
                fill={step === 4 || step >= 8 ? '#ecfdf5' : '#ffffff'} 
                stroke={step === 4 ? '#10b981' : '#cbd5e1'} 
                strokeWidth={step === 4 ? '2' : '1'} 
              />
              <text x="301" y="123" fill="#065f46" fontSize="9.5" fontWeight="bold">
                PCB 1: Kalkulačka (PID 205)
              </text>
              <text x="301" y="142" fill="#047857" fontSize="9.5" fontFamily="monospace">
                {step < 4 && 'Čeká v paměti RAM...'}
                {step >= 4 && '💾 Uloženo: PC = 5012'}
              </text>

              {/* PCB 2: Word */}
              <rect 
                x="293" 
                y="164" 
                width="174" 
                height="50" 
                rx="6" 
                fill={step >= 7 ? '#eff6ff' : '#ffffff'} 
                stroke={step === 7 || (step === 8 && !isWithIo) ? '#3b82f6' : '#cbd5e1'} 
                strokeWidth={step === 7 || (step === 8 && !isWithIo) ? '2' : '1'} 
              />
              <text x="301" y="179" fill="#1e40af" fontSize="9.5" fontWeight="bold">
                PCB 2: Word (PID 101)
              </text>
              <text x="301" y="198" fill="#2563eb" fontSize="9.5" fontFamily="monospace">
                {step < 4 && 'Uloženo: PC = 1000'}
                {(step === 4 || step === 5 || step === 6) && '⚡ Načteno do CPU'}
                {step >= 7 && (isWithIo ? '⏸️ Čeká na disk (BLOCKED)' : '💾 Uloženo: PC = 1012')}
              </text>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* PAMĚŤOVÝ BLOK VPRAVO: PROCES 2 (WORD, PID 101)                */}
            {/* ------------------------------------------------------------- */}
            <g>
              <rect 
                x="490" 
                y="74" 
                width="245" 
                height="164" 
                rx="12" 
                fill={current.activeEntity === 'WORD' ? '#eff6ff' : '#f8fafc'} 
                stroke={current.activeEntity === 'WORD' ? '#3b82f6' : '#cbd5e1'} 
                strokeWidth={current.activeEntity === 'WORD' ? '2.5' : '1'} 
              />

              <rect 
                x="490" 
                y="74" 
                width="245" 
                height="28" 
                rx="10" 
                fill={current.activeEntity === 'WORD' ? '#2563eb' : '#64748b'} 
              />
              <text x="612.5" y="92" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                PROCES 2: Word (PID 101)
              </text>

              {/* Instrukce 1000 */}
              <rect 
                x="496" 
                y="108" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.wordActiveInst === 1000 ? '#bfdbfe' : 'transparent'} 
              />
              <text 
                x="503" 
                y="124" 
                fill={current.wordActiveInst === 1000 ? '#1e40af' : current.wordCompletedInsts.includes(1000) ? '#2563eb' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.wordActiveInst === 1000 ? '900' : 'bold'}
              >
                {current.wordActiveInst === 1000 ? '➔ 1000: Načti formát' : current.wordCompletedInsts.includes(1000) ? '✓ 1000: Načti formát' : '  1000: Načti formát'}
              </text>

              {/* Instrukce 1004 */}
              <rect 
                x="496" 
                y="134" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.wordActiveInst === 1004 ? (isWithIo ? '#fecdd3' : '#bfdbfe') : 'transparent'} 
              />
              <text 
                x="503" 
                y="150" 
                fill={
                  current.wordActiveInst === 1004 
                    ? (isWithIo ? '#9f1239' : '#1e40af') 
                    : current.wordCompletedInsts.includes(1004) ? '#2563eb' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.wordActiveInst === 1004 ? '900' : 'bold'}
              >
                {isWithIo ? (
                  current.wordActiveInst === 1004 ? '➔ 1004: Zápis na disk (I/O)' : current.wordCompletedInsts.includes(1004) ? '✓ 1004: Zápis na disk (I/O)' : '  1004: Zápis na disk (I/O)'
                ) : (
                  current.wordActiveInst === 1004 ? '➔ 1004: Úprava písma' : current.wordCompletedInsts.includes(1004) ? '✓ 1004: Úprava písma' : '  1004: Úprava písma'
                )}
              </text>

              {/* Instrukce 1008 */}
              <rect 
                x="496" 
                y="160" 
                width="233" 
                height="24" 
                rx="5" 
                fill={current.wordActiveInst === 1008 ? '#bfdbfe' : 'transparent'} 
              />
              <text 
                x="503" 
                y="176" 
                fill={current.wordActiveInst === 1008 ? '#1e40af' : current.wordCompletedInsts.includes(1008) ? '#2563eb' : '#64748b'} 
                fontSize="10" 
                fontFamily="monospace"
                fontWeight={current.wordActiveInst === 1008 ? '900' : 'bold'}
              >
                {current.wordActiveInst === 1008 ? '➔ 1008: Kontrola textu' : current.wordCompletedInsts.includes(1008) ? '✓ 1008: Kontrola textu' : '  1008: Kontrola textu'}
              </text>

              {/* Instrukce 1012 */}
              <rect 
                x="496" 
                y="186" 
                width="233" 
                height="24" 
                rx="5" 
                fill="transparent" 
              />
              <text 
                x="503" 
                y="202" 
                fill="#94a3b8" 
                fontSize="10" 
                fontFamily="monospace"
              >
                {'  1012: Vykresli výsledek'}
              </text>
            </g>

          </svg>
        </div>

        {/* PROSTŘEDNÍ BLOK: STAVOVÝ DIAGRAM PROCESŮ (Více prostoru a 2D rozložení) */}
        {showStates && (
          <div className="pt-3 pb-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                <span>Stavový diagram procesů (Aktuální stav v tomto kroku)</span>
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                <span>🟢 Kalkulačka: <strong className={calcState === 'RUNNING' ? 'text-emerald-700 font-black' : 'text-blue-700 font-black'}>{calcState}</strong></span>
                <span>🔵 Word: <strong className={wordState === 'RUNNING' ? 'text-emerald-700 font-black' : wordState === 'BLOCKED' ? 'text-amber-700 font-black' : 'text-blue-700 font-black'}>{wordState}</strong></span>
              </div>
            </div>

            <div className="w-full flex justify-center overflow-x-auto">
              <svg viewBox="0 0 760 170" className="w-full max-w-[760px] h-auto select-none font-sans">
                <defs>
                  <marker id="arrow-st-slate" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
                  </marker>
                  <marker id="arrow-st-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker id="arrow-st-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrow-st-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* 1. Uzel: NEW */}
                <rect x="15" y="20" width="100" height="56" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="65" y="44" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="900">NEW</text>
                <text x="65" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontWeight="bold">Nový proces</text>

                {/* Šipka NEW -> READY */}
                <path d="M 115 48 L 155 48" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-st-slate)" />
                <text x="135" y="41" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="bold">Zavedení</text>

                {/* 2. Uzel: READY */}
                <rect 
                  x="160" 
                  y="14" 
                  width="180" 
                  height="70" 
                  rx="14" 
                  fill={calcState === 'READY' || wordState === 'READY' ? '#eff6ff' : '#f8fafc'} 
                  stroke={calcState === 'READY' || wordState === 'READY' ? '#3b82f6' : '#cbd5e1'} 
                  strokeWidth={calcState === 'READY' || wordState === 'READY' ? '2.5' : '1.5'} 
                />
                <text x="250" y="32" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="900">PŘIPRAVEN (READY)</text>
                <text x="250" y="44" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="bold">Fronta čekajících na CPU:</text>
                
                {/* Odznaky procesů v READY */}
                <g>
                  {calcState === 'READY' && (
                    <rect x="168" y="50" width="76" height="22" rx="5" fill="#d1fae5" stroke="#10b981" strokeWidth="1.2" />
                  )}
                  {calcState === 'READY' && (
                    <text x="206" y="64" textAnchor="middle" fill="#065f46" fontSize="8.5" fontWeight="bold">Kalkulačka (205)</text>
                  )}
                  {wordState === 'READY' && (
                    <rect x={calcState === 'READY' ? '252' : '205'} y="50" width="76" height="22" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
                  )}
                  {wordState === 'READY' && (
                    <text x={calcState === 'READY' ? '290' : '243'} y="64" textAnchor="middle" fill="#1e40af" fontSize="8.5" fontWeight="bold">Word (101)</text>
                  )}
                  {calcState !== 'READY' && wordState !== 'READY' && (
                    <text x="250" y="62" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">Fronta je prázdná</text>
                  )}
                </g>

                {/* Šipka READY -> RUNNING (Přidělení CPU) */}
                <path 
                  d="M 340 38 L 415 38" 
                  fill="none" 
                  stroke={step === 1 || step === 4 || step === 7 ? '#10b981' : '#cbd5e1'} 
                  strokeWidth={step === 1 || step === 4 || step === 7 ? '3' : '1.5'} 
                  markerEnd={step === 1 || step === 4 || step === 7 ? 'url(#arrow-st-green)' : 'url(#arrow-st-slate)'} 
                />
                <text x="377" y="30" textAnchor="middle" fill={step === 1 || step === 4 || step === 7 ? '#059669' : '#64748b'} fontSize="8" fontWeight="bold">Přidělení CPU ➔</text>

                {/* Šipka RUNNING -> READY (Vypršel čas - Timer) */}
                <path 
                  d="M 415 60 L 340 60" 
                  fill="none" 
                  stroke={step === 3 ? '#3b82f6' : '#cbd5e1'} 
                  strokeWidth={step === 3 ? '3' : '1.5'} 
                  strokeDasharray="4 2"
                  markerEnd={step === 3 ? 'url(#arrow-st-blue)' : 'url(#arrow-st-slate)'} 
                />
                <text x="377" y="73" textAnchor="middle" fill={step === 3 ? '#2563eb' : '#94a3b8'} fontSize="8" fontWeight="bold">◂ Vypršel čas (Timer)</text>

                {/* 3. Uzel: RUNNING */}
                <rect 
                  x="420" 
                  y="14" 
                  width="180" 
                  height="70" 
                  rx="14" 
                  fill={calcState === 'RUNNING' || wordState === 'RUNNING' ? '#ecfdf5' : '#f8fafc'} 
                  stroke={calcState === 'RUNNING' || wordState === 'RUNNING' ? '#10b981' : '#cbd5e1'} 
                  strokeWidth={calcState === 'RUNNING' || wordState === 'RUNNING' ? '2.5' : '1.5'} 
                />
                <text x="510" y="32" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="900">BĚŽÍCÍ (RUNNING)</text>
                <text x="510" y="44" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">Právě počítá na jádře CPU:</text>
                
                {/* Kdo má CPU v RUNNING */}
                {calcState === 'RUNNING' && (
                  <g>
                    <rect x="435" y="50" width="150" height="22" rx="5" fill="#059669" />
                    <text x="510" y="64" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🟢 Kalkulačka (PID 205)</text>
                  </g>
                )}
                {wordState === 'RUNNING' && (
                  <g>
                    <rect x="435" y="50" width="150" height="22" rx="5" fill="#2563eb" />
                    <text x="510" y="64" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">🔵 Word (PID 101)</text>
                  </g>
                )}
                {calcState !== 'RUNNING' && wordState !== 'RUNNING' && (
                  <g>
                    <rect x="435" y="50" width="150" height="22" rx="5" fill="#d97706" />
                    <text x="510" y="64" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">⚙️ Jádro OS (Přepíná kontext)</text>
                  </g>
                )}

                {/* Šipka RUNNING -> BLOCKED (Žádost o I/O) */}
                <path 
                  d="M 510 84 L 510 115 L 475 115" 
                  fill="none" 
                  stroke={step === 6 ? '#f59e0b' : '#cbd5e1'} 
                  strokeWidth={step === 6 ? '3' : '1.5'} 
                  markerEnd={step === 6 ? 'url(#arrow-st-amber)' : 'url(#arrow-st-slate)'} 
                />
                <text x="525" y="103" textAnchor="start" fill={step === 6 ? '#d97706' : '#64748b'} fontSize="8" fontWeight="bold">Žádost o I/O (Disk) ▾</text>

                {/* 4. Uzel: BLOCKED (Dole uprostřed) */}
                <rect 
                  x="245" 
                  y="104" 
                  width="225" 
                  height="60" 
                  rx="14" 
                  fill={wordState === 'BLOCKED' ? '#fffbeb' : '#f8fafc'} 
                  stroke={wordState === 'BLOCKED' ? '#f59e0b' : '#cbd5e1'} 
                  strokeWidth={wordState === 'BLOCKED' ? '2.5' : '1.5'} 
                />
                <text x="357" y="124" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="900">BLOKOVANÝ (BLOCKED)</text>
                <text x="357" y="136" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="bold">Čeká na dokončení pomalé I/O operace:</text>
                
                {/* Kdo je v BLOCKED */}
                {wordState === 'BLOCKED' ? (
                  <g>
                    <rect x="260" y="142" width="195" height="18" rx="4" fill="#d97706" />
                    <text x="357" y="154" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold">🟡 Word (PID 101) – Čeká na načtení z disku</text>
                  </g>
                ) : (
                  <text x="357" y="154" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Žádný proces nečeká na I/O</text>
                )}

                {/* Šipka BLOCKED -> READY (I/O hotovo -> Zpět do Ready) */}
                <path 
                  d="M 245 125 L 210 125 L 210 88" 
                  fill="none" 
                  stroke={step === 9 ? '#3b82f6' : '#cbd5e1'} 
                  strokeWidth={step === 9 ? '3' : '1.5'} 
                  strokeDasharray="4 2"
                  markerEnd={step === 9 ? 'url(#arrow-st-blue)' : 'url(#arrow-st-slate)'} 
                />
                <text x="195" y="112" textAnchor="end" fill={step === 9 ? '#2563eb' : '#64748b'} fontSize="8" fontWeight="bold">▴ I/O hotovo (zpět do Ready)</text>

                {/* Šipka RUNNING -> TERMINATED */}
                <path d="M 600 48 L 640 48" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-st-slate)" />
                <text x="620" y="41" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="bold">Konec</text>

                {/* 5. Uzel: TERMINATED */}
                <rect x="645" y="20" width="100" height="56" rx="12" fill="#fff1f2" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="695" y="44" textAnchor="middle" fill="#9f1239" fontSize="10.5" fontWeight="900">EXIT</text>
                <text x="695" y="60" textAnchor="middle" fill="#f43f5e" fontSize="8.5" fontWeight="bold">Ukončený</text>
              </svg>
            </div>
          </div>
        )}

        {/* DOLNÍ SVG: ČASOVÝ PRŮBĚH NA CPU (Volitelné) */}
        {showTime && (
          <div className="pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Časový průběh na procesoru (CPU)</span>
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 font-bold text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>Kalkulačka</span>
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Jádro (Režie)</span>
                </span>
                <span className="flex items-center gap-1 font-bold text-blue-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Word</span>
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center overflow-x-auto">
              <svg viewBox="0 0 760 105" className="w-full max-w-[760px] h-auto select-none font-sans overflow-visible">
                <defs>
                  <marker
                    id="diag-arrow-sm"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a" />
                  </marker>
                </defs>

                {/* Popisky úloh vlevo */}
                <text x="88" y="24" textAnchor="end" className="text-[10px] font-black fill-emerald-800">Kalkulačka</text>
                <text x="88" y="50" textAnchor="end" className="text-[10px] font-black fill-amber-800">Jádro OS</text>
                <text x="88" y="76" textAnchor="end" className="text-[10px] font-black fill-blue-800">Word</text>

                {/* Svislá osa */}
                <line x1="95" y1="8" x2="95" y2="88" stroke="#0f172a" strokeWidth="2" />

                {/* Vodorovná osa času */}
                <line 
                  x1="95" 
                  y1="88" 
                  x2="745" 
                  y2="88" 
                  stroke="#0f172a" 
                  strokeWidth="2" 
                  markerEnd="url(#diag-arrow-sm)" 
                />

                {/* Popisky času na ose */}
                <text x="100" y="100" textAnchor="start" className="text-[10px] font-mono font-bold fill-slate-900">0 ms</text>
                <text x="280" y="100" textAnchor="middle" className="text-[10px] font-mono fill-slate-500">20 ms</text>
                <text x={wordBlockEnd} y="100" textAnchor="middle" className="text-[10px] font-mono fill-slate-500">
                  {isWithIo ? '30 ms' : '40 ms'}
                </text>
                <text x="440" y="100" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">
                  Čas na procesoru (CPU) ➔
                </text>

                {/* ŘÁDEK 1: KALKULAČKA */}
                <g>
                  <rect 
                    x="100" 
                    y="12" 
                    width="180" 
                    height="18" 
                    rx="3" 
                    fill="#059669" 
                    opacity={step <= 3 ? 1 : 0.4}
                  />
                  <text x="190" y="25" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    Kalkulačka
                  </text>

                  <rect 
                    x={switch2End} 
                    y="12" 
                    width={isWithIo ? 200 : 140} 
                    height="18" 
                    rx="3" 
                    fill="#059669" 
                    opacity={step >= 8 ? 1 : 0.3}
                  />
                  <text x={switch2End + (isWithIo ? 100 : 70)} y="25" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    Kalkulačka
                  </text>
                </g>

                {/* ŘÁDEK 2: JÁDRO OS (PŘEPNUTÍ) */}
                <g>
                  <rect 
                    x="280" 
                    y="38" 
                    width="50" 
                    height="18" 
                    rx="3" 
                    fill="#d97706" 
                    opacity={step === 4 ? 1 : 0.35}
                  />
                  <text x="305" y="51" textAnchor="middle" className="text-[9px] font-black fill-white">
                    OS
                  </text>

                  <rect 
                    x={wordBlockEnd} 
                    y="38" 
                    width="50" 
                    height="18" 
                    rx="3" 
                    fill="#d97706" 
                    opacity={(isWithIo && step === 7) || (!isWithIo && step === 8) ? 1 : 0.35}
                  />
                  <text x={wordBlockEnd + 25} y="51" textAnchor="middle" className="text-[9px] font-black fill-white">
                    OS
                  </text>
                </g>

                {/* ŘÁDEK 3: WORD */}
                <g>
                  <rect 
                    x="330" 
                    y="64" 
                    width={isWithIo ? 90 : 180} 
                    height="18" 
                    rx="3" 
                    fill={isWithIo ? '#e11d48' : '#2563eb'} 
                    opacity={(step >= 5 && step <= 7) ? 1 : 0.4}
                  />
                  <text x={330 + (isWithIo ? 45 : 90)} y="77" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    Word
                  </text>
                </g>

                {/* ČERVENÁ SVISLÁ RYSKA */}
                <g className="transition-all duration-300">
                  <line 
                    x1={current.timelineX} 
                    y1="6" 
                    x2={current.timelineX} 
                    y2="90" 
                    stroke="#dc2626" 
                    strokeWidth="2.5" 
                    strokeDasharray="3 2"
                  />
                  <polygon 
                    points={`${current.timelineX - 5},4 ${current.timelineX + 5},4 ${current.timelineX},10`} 
                    fill="#dc2626" 
                  />
                  <rect 
                    x={current.timelineX - 26} 
                    y="0" 
                    width="52" 
                    height="14" 
                    rx="3" 
                    fill="#dc2626" 
                  />
                  <text 
                    x={current.timelineX} 
                    y="10" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    fontSize="8.5" 
                    fontFamily="monospace" 
                    fontWeight="900"
                  >
                    t≈{current.timelineTimeMs}ms
                  </text>
                </g>

              </svg>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
              <span>💡</span>
              <span><strong>Červená ryska</strong> ukazuje současný čas na CPU – v každém okamžiku běží na procesoru vždy jen jeden program.</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
