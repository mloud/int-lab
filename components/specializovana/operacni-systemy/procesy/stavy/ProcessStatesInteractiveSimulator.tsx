'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Clock,
  Info
} from 'lucide-react';

export type ProcessState = 'NEW' | 'READY' | 'RUNNING' | 'BLOCKED' | 'TERMINATED';

interface StepDef {
  step: number;
  timeMs: number;
  timelineX: number; // pozice červené rysky v grafu
  processState: ProcessState;
  activeEntity: 'KERNEL' | 'WORD' | 'CALC';
  title: string;
  badge: string;
  badgeTone: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'slate';
  description: string;
  activeTransition?: 'NEW_READY' | 'READY_RUN' | 'RUN_READY' | 'RUN_BLOCKED' | 'BLOCKED_READY' | 'RUN_EXIT';
}

const TIMELINE_STEPS: StepDef[] = [
  {
    step: 1,
    timeMs: 0,
    timelineX: 100,
    processState: 'NEW',
    activeEntity: 'KERNEL',
    title: '1. Krok: Stav NEW (Spuštění programu)',
    badge: 'NEW (Nový)',
    badgeTone: 'purple',
    description: 'Uživatel poklepal na ikonu programu Word. Jádro OS zakládá nový proces (PID 101), načítá kód z disku do RAM a alokuje struktury v systému.',
    activeTransition: 'NEW_READY',
  },
  {
    step: 2,
    timeMs: 0,
    timelineX: 100,
    processState: 'READY',
    activeEntity: 'KERNEL',
    title: '2. Krok: Stav READY (Zařazení do fronty čekajících)',
    badge: 'READY (Připraven)',
    badgeTone: 'blue',
    description: 'Kód je kompletně v paměti RAM. Word je 100% připraven k běhu a čeká ve frontě plánovače, až dostane přidělen procesor (CPU).',
    activeTransition: 'READY_RUN',
  },
  {
    step: 3,
    timeMs: 0,
    timelineX: 100,
    processState: 'RUNNING',
    activeEntity: 'WORD',
    title: '3. Krok: 1. slot – Word startuje na CPU (t = 0 ms)',
    badge: 'RUNNING (Běží)',
    badgeTone: 'emerald',
    description: 'Plánovač předal CPU Wordu. Registr PC ukazuje první instrukci a Word zahajuje své časové kvantum 20 ms. V diagramu je Word ve stavu RUNNING.',
  },
  {
    step: 4,
    timeMs: 10,
    timelineX: 190,
    processState: 'RUNNING',
    activeEntity: 'WORD',
    title: '4. Krok: 1. slot – Výpočet Wordu uvnitř kvanta (t = 10 ms)',
    badge: 'RUNNING (Běží)',
    badgeTone: 'emerald',
    description: 'Word plynule počítá instrukce na jádře CPU. Časovač ještě nevypršel (zbývá polovina kvanta), v diagramu zůstává pevně ve stavu RUNNING.',
  },
  {
    step: 5,
    timeMs: 20,
    timelineX: 280,
    processState: 'READY',
    activeEntity: 'KERNEL',
    title: '5. Krok: Konec 1. slotu Wordu – Vypršel časovač (Timer 20 ms)',
    badge: 'RUNNING ➔ READY',
    badgeTone: 'blue',
    description: 'Právě v čase 20 ms pípnul hardwarový časovač procesoru! Word neudělal žádnou chybu, ale vypršel mu přidělený čas. Jádro OS ho vrací zpět do fronty READY.',
    activeTransition: 'RUN_READY',
  },
  {
    step: 6,
    timeMs: 22,
    timelineX: 305,
    processState: 'READY',
    activeEntity: 'CALC',
    title: '6. Krok: Start 1. slotu Kalkulačky (t = 22 ms)',
    badge: 'READY (Word čeká)',
    badgeTone: 'blue',
    description: 'Jádro OS přepnulo procesor na jinou úlohu – začíná běžet Kalkulačka (přesně na začátku svého slotu). Word klidně čeká ve frontě READY.',
  },
  {
    step: 7,
    timeMs: 31,
    timelineX: 380,
    processState: 'READY',
    activeEntity: 'CALC',
    title: '7. Krok: Kalkulačka počítá uvnitř 1. slotu (t = 31 ms)',
    badge: 'READY (Word čeká)',
    badgeTone: 'blue',
    description: 'Kalkulačka využívá své časové kvantum a provádí výpočty. Word stále trpělivě čeká ve frontě READY.',
  },
  {
    step: 8,
    timeMs: 40,
    timelineX: 455,
    processState: 'READY',
    activeEntity: 'KERNEL',
    title: '8. Krok: Konec 1. slotu Kalkulačky (t = 40 ms) ➔ Plánovač volí Word',
    badge: 'READY ➔ RUNNING',
    badgeTone: 'blue',
    description: 'Kalkulačka došla na samotný konec svého slotu (40 ms). Časovač ji pozastaví, jádro OS provádí přepnutí kontextu zpět na připravený Word.',
    activeTransition: 'READY_RUN',
  },
  {
    step: 9,
    timeMs: 42,
    timelineX: 480,
    processState: 'RUNNING',
    activeEntity: 'WORD',
    title: '9. Krok: 2. slot – Word se vrací na začátek svého slotu (t = 42 ms)',
    badge: 'RUNNING (Běží)',
    badgeTone: 'emerald',
    description: 'Plánovač znovu předal procesor Wordu. Word startuje na samém začátku svého 2. slotu (t = 42 ms) a plynule navazuje na dřívější kód.',
  },
  {
    step: 10,
    timeMs: 47,
    timelineX: 522,
    processState: 'RUNNING',
    activeEntity: 'WORD',
    title: '10. Krok: 2. slot – Word aktivně počítá (t = 47 ms)',
    badge: 'RUNNING (Běží)',
    badgeTone: 'emerald',
    description: 'Word počítá několik dalších instrukcí na procesoru. Blíží se však k systémovému volání pro načtení souboru z disku.',
  },
  {
    step: 11,
    timeMs: 52,
    timelineX: 565,
    processState: 'BLOCKED',
    activeEntity: 'WORD',
    title: '11. Krok: Konec 2. slotu Wordu – Čekání na I/O operaci disku!',
    badge: 'RUNNING ➔ BLOCKED',
    badgeTone: 'amber',
    description: 'Word narazil na požadavek načíst dokument z disku. Místo čekání na pomalý disk se Word dobrovolně vzdává CPU! Zbytek slotu zůstává nevyužit a Word přechází do stavu BLOCKED.',
    activeTransition: 'RUN_BLOCKED',
  },
  {
    step: 12,
    timeMs: 55,
    timelineX: 590,
    processState: 'BLOCKED',
    activeEntity: 'CALC',
    title: '12. Krok: Start 2. slotu Kalkulačky na uvolněném CPU (t = 55 ms)',
    badge: 'BLOCKED (Čeká na disk)',
    badgeTone: 'amber',
    description: 'Word se vzdal procesoru a spí ve stavu BLOCKED. Plánovač ihned přidělil uvolněné CPU Kalkulačce, která startuje přesně na začátku svého 2. slotu.',
  },
  {
    step: 13,
    timeMs: 60,
    timelineX: 650,
    processState: 'BLOCKED',
    activeEntity: 'CALC',
    title: '13. Krok: Kalkulačka počítá, SSD disk paralelně vyhledává data',
    badge: 'BLOCKED (Čeká na disk)',
    badgeTone: 'amber',
    description: 'Zatímco SSD disk fyzicky čte soubor dokument.docx, CPU jede na plný výkon a počítá Kalkulačku. Žádný promarněný čas procesoru.',
    activeTransition: 'BLOCKED_READY',
  },
  {
    step: 14,
    timeMs: 65,
    timelineX: 710,
    processState: 'READY',
    activeEntity: 'KERNEL',
    title: '14. Krok: Disk dočetl! Přechod BLOCKED ➔ READY',
    badge: 'BLOCKED ➔ READY',
    badgeTone: 'blue',
    description: 'Řadič disku poslal procesoru hardwarové přerušení: Data jsou v RAM! KLÍČOVÝ PRINCIP: Word nesmí přímo na procesor, ale zařazuje se zpět do fronty READY.',
    activeTransition: 'BLOCKED_READY',
  },
];

export default function ProcessStatesInteractiveSimulator() {
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed] = useState<number>(3000);

  const totalSteps = TIMELINE_STEPS.length;
  const current = TIMELINE_STEPS[step - 1];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, totalSteps]);

  const handlePrev = () => {
    setIsPlaying(false);
    setStep((prev) => (prev > 1 ? prev - 1 : totalSteps));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setStep((prev) => (prev < totalSteps ? prev + 1 : 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(1);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">

      {/* 1. ŘÍDICÍ A POPISOVÁ LIŠTA */}
      <div className={`p-4 rounded-2xl border-2 transition-all shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 ${current.processState === 'RUNNING'
        ? 'bg-emerald-50/90 border-emerald-300'
        : current.processState === 'READY'
          ? 'bg-blue-50/90 border-blue-300'
          : current.processState === 'BLOCKED'
            ? 'bg-amber-50/95 border-amber-300'
            : 'bg-purple-50/90 border-purple-300'
        }`}>

        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-sm shrink-0 ${current.processState === 'RUNNING' ? 'bg-emerald-600' :
            current.processState === 'READY' ? 'bg-blue-600' :
              current.processState === 'BLOCKED' ? 'bg-amber-600' : 'bg-purple-600'
            }`}>
            {step}/{totalSteps}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border ${current.processState === 'RUNNING' ? 'bg-emerald-200 text-emerald-950 border-emerald-400' :
                current.processState === 'READY' ? 'bg-blue-200 text-blue-950 border-blue-400' :
                  current.processState === 'BLOCKED' ? 'bg-amber-200 text-amber-950 border-amber-400' :
                    'bg-purple-200 text-purple-950 border-purple-400'
                }`}>
                {current.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-600">
                Čas na ose: <strong>t = {current.timeMs} ms</strong>
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 truncate mt-0.5">
              {current.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-xs"
            title="Předchozí krok"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-xs text-white ${isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pauza</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Přehrát</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-xs"
            title="Další krok"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition shadow-xs ml-1"
            title="Resetovat na začátek"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. DIDAKTICKÝ POPIS */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-0.5 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">
            Co se právě v tomto okamžiku děje:
          </span>
          <p className="text-slate-800 text-sm font-medium leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>

      {/* 3. HLAVNÍ GRAFICKÝ PANEL */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-6">

        {/* HORNÍ ČÁST: ČASOVÝ PRŮBĚH NA CPU */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>1. Časový průběh na procesoru (CPU)</span>
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-bold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Word</span>
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-800">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Jádro OS (Přepnutí)</span>
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                <span>Kalkulačka</span>
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center overflow-x-auto bg-slate-50/70 p-3 rounded-2xl border border-slate-200">
            <svg viewBox="0 0 760 120" className="w-full max-w-[760px] h-auto select-none font-sans overflow-visible">

              <defs>
                <marker id="timeline-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a" />
                </marker>
              </defs>

              <text x="88" y="26" textAnchor="end" className="text-[11px] font-black fill-emerald-800">Word</text>
              <text x="88" y="54" textAnchor="end" className="text-[11px] font-black fill-amber-800">Jádro OS</text>
              <text x="88" y="82" textAnchor="end" className="text-[11px] font-black fill-slate-700">Kalkulačka</text>

              <line x1="95" y1="8" x2="95" y2="98" stroke="#0f172a" strokeWidth="2" />
              <line x1="95" y1="98" x2="745" y2="98" stroke="#0f172a" strokeWidth="2" markerEnd="url(#timeline-arrow)" />

              <text x="420" y="112" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">
                Čas na procesoru (CPU) ➔
              </text>

              {/* 1. slot Wordu */}
              <rect
                x="100"
                y="12"
                width="180"
                height="22"
                rx="4"
                fill="#059669"
                opacity={step >= 3 && step <= 5 ? 1 : 0.4}
              />
              <text x="190" y="27" textAnchor="middle" className="text-[11px] font-black fill-white">
                Word
              </text>

              {/* 2. slot Wordu */}
              <rect
                x="480"
                y="12"
                width="85"
                height="22"
                rx="4"
                fill="#e11d48"
                opacity={step >= 9 ? 1 : 0.35}
              />
              <text x="522" y="27" textAnchor="middle" className="text-[11px] font-black fill-white">
                Word
              </text>

              {/* Vyšrafovaný zbytek 2. kvanta */}
              <rect
                x="565"
                y="12"
                width="80"
                height="22"
                rx="4"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeDasharray="3 2"
                opacity={0.6}
              />
              <text x="605" y="26" textAnchor="middle" className="text-[8.5px] font-bold fill-slate-500">
                Nevyužito (I/O)
              </text>

              {/* Přepnutí OS 1 */}
              <rect
                x="280"
                y="40"
                width="25"
                height="20"
                rx="3"
                fill="#d97706"
                opacity={step === 5 ? 1 : 0.35}
              />
              <text x="292" y="54" textAnchor="middle" className="text-[8px] font-black fill-white">
                OS
              </text>

              {/* Přepnutí OS 2 */}
              <rect
                x="455"
                y="40"
                width="25"
                height="20"
                rx="3"
                fill="#d97706"
                opacity={step === 8 || step === 9 ? 1 : 0.35}
              />
              <text x="467" y="54" textAnchor="middle" className="text-[8px] font-black fill-white">
                OS
              </text>

              {/* Přepnutí OS 3 */}
              <rect
                x="565"
                y="40"
                width="25"
                height="20"
                rx="3"
                fill="#d97706"
                opacity={step >= 11 ? 1 : 0.35}
              />
              <text x="577" y="54" textAnchor="middle" className="text-[8px] font-black fill-white">
                OS
              </text>

              {/* 1. slot Kalkulačky */}
              <rect
                x="305"
                y="68"
                width="150"
                height="20"
                rx="3"
                fill="#475569"
                opacity={step >= 6 && step <= 8 ? 1 : 0.35}
              />
              <text x="380" y="82" textAnchor="middle" className="text-[10.5px] font-bold fill-white">
                Kalkulačka
              </text>

              {/* 2. slot Kalkulačky */}
              <rect
                x="590"
                y="68"
                width="140"
                height="20"
                rx="3"
                fill="#475569"
                opacity={step >= 12 ? 1 : 0.35}
              />
              <text x="660" y="82" textAnchor="middle" className="text-[10.5px] font-bold fill-white">
                Kalkulačka
              </text>

              {/* Červená ryska */}
              <g className="transition-all duration-300">
                <line
                  x1={current.timelineX}
                  y1="6"
                  x2={current.timelineX}
                  y2="100"
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
                  t = {current.timeMs}ms
                </text>
              </g>

            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOLNÍ ČÁST: VYČIŠTĚNÝ, VZDUŠNÝ 2D STAVOVÝ DIAGRAM (PROSTÝ A PŘEHLEDNÝ)     */}
        {/* ========================================================================= */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
              <span>2. Stavový diagram: Kde se Word v tomto kroku nachází</span>
            </span>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-slate-500">Stav:</span>
              <span className={`px-2.5 py-0.5 rounded-md text-white font-mono uppercase ${current.processState === 'RUNNING' ? 'bg-emerald-600' :
                current.processState === 'READY' ? 'bg-blue-600' :
                  current.processState === 'BLOCKED' ? 'bg-amber-600' : 'bg-purple-600'
                }`}>
                {current.processState}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200">
            <svg viewBox="0 0 760 170" className="w-full max-w-[760px] h-auto select-none font-sans">

              <defs>
                <marker id="clean-arr-slate" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
                </marker>
                <marker id="clean-arr-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#9333ea" />
                </marker>
                <marker id="clean-arr-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                </marker>
                <marker id="clean-arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
                </marker>
                <marker id="clean-arr-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
                </marker>
              </defs>

              {/* ---------------- 1. Uzel: NEW ---------------- */}
              <g className="transition-all duration-300">
                <rect
                  x="20"
                  y="20"
                  width="100"
                  height="60"
                  rx="14"
                  fill={current.processState === 'NEW' ? '#f3e8ff' : '#f8fafc'}
                  stroke={current.processState === 'NEW' ? '#9333ea' : '#cbd5e1'}
                  strokeWidth={current.processState === 'NEW' ? '3' : '1.5'}
                />
                <text x="70" y="46" textAnchor="middle" fill={current.processState === 'NEW' ? '#6b21a8' : '#334155'} fontSize="13" fontWeight="900">
                  NEW
                </text>
                <text x="70" y="62" textAnchor="middle" fill={current.processState === 'NEW' ? '#9333ea' : '#94a3b8'} fontSize="9" fontWeight="bold">
                  {current.processState === 'NEW' ? '● Word' : 'Nový'}
                </text>
              </g>

              {/* Šipka NEW -> READY */}
              <path
                d="M 120 50 L 175 50"
                fill="none"
                stroke={current.activeTransition === 'NEW_READY' ? '#9333ea' : '#cbd5e1'}
                strokeWidth={current.activeTransition === 'NEW_READY' ? '3' : '1.5'}
                markerEnd={current.activeTransition === 'NEW_READY' ? 'url(#clean-arr-purple)' : 'url(#clean-arr-slate)'}
              />
              <text x="148" y="42" textAnchor="middle" fill={current.activeTransition === 'NEW_READY' ? '#9333ea' : '#64748b'} fontSize="8" fontWeight="bold">
                Zavedení
              </text>

              {/* ---------------- 2. Uzel: READY ---------------- */}
              <g className="transition-all duration-300">
                <rect
                  x="180"
                  y="15"
                  width="145"
                  height="70"
                  rx="14"
                  fill={current.processState === 'READY' ? '#eff6ff' : '#f8fafc'}
                  stroke={current.processState === 'READY' ? '#2563eb' : '#cbd5e1'}
                  strokeWidth={current.processState === 'READY' ? '3.5' : '1.5'}
                />
                <text x="252" y="43" textAnchor="middle" fill={current.processState === 'READY' ? '#1e40af' : '#334155'} fontSize="13" fontWeight="900">
                  READY
                </text>
                <text x="252" y="63" textAnchor="middle" fill={current.processState === 'READY' ? '#2563eb' : '#94a3b8'} fontSize="9.5" fontWeight="bold">
                  {current.processState === 'READY' ? '● Word (čeká na CPU)' : 'Připraven'}
                </text>
              </g>

              {/* Šipka READY -> RUNNING (Horní šipka doprava) */}
              <path
                d="M 325 38 L 415 38"
                fill="none"
                stroke={current.activeTransition === 'READY_RUN' ? '#10b981' : '#cbd5e1'}
                strokeWidth={current.activeTransition === 'READY_RUN' ? '3' : '1.5'}
                markerEnd={current.activeTransition === 'READY_RUN' ? 'url(#clean-arr-green)' : 'url(#clean-arr-slate)'}
              />
              <text x="370" y="30" textAnchor="middle" fill={current.activeTransition === 'READY_RUN' ? '#059669' : '#64748b'} fontSize="8" fontWeight="bold">
                Přidělení CPU ➔
              </text>

              {/* Šipka RUNNING -> READY (Dolní šipka doleva - vypršel časovač) */}
              <path
                d="M 415 62 L 325 62"
                fill="none"
                stroke={current.activeTransition === 'RUN_READY' ? '#2563eb' : '#cbd5e1'}
                strokeWidth={current.activeTransition === 'RUN_READY' ? '3' : '1.5'}
                strokeDasharray={current.activeTransition === 'RUN_READY' ? 'none' : '4 2'}
                markerEnd={current.activeTransition === 'RUN_READY' ? 'url(#clean-arr-blue)' : 'url(#clean-arr-slate)'}
              />
              <text x="370" y="74" textAnchor="middle" fill={current.activeTransition === 'RUN_READY' ? '#1e40af' : '#94a3b8'} fontSize="8" fontWeight="bold">
                ◂ Vypršel čas (Timer)
              </text>

              {/* ---------------- 3. Uzel: RUNNING ---------------- */}
              <g className="transition-all duration-300">
                <rect
                  x="420"
                  y="15"
                  width="145"
                  height="70"
                  rx="14"
                  fill={current.processState === 'RUNNING' ? '#ecfdf5' : '#f8fafc'}
                  stroke={current.processState === 'RUNNING' ? '#10b981' : '#cbd5e1'}
                  strokeWidth={current.processState === 'RUNNING' ? '3.5' : '1.5'}
                />
                <text x="492" y="43" textAnchor="middle" fill={current.processState === 'RUNNING' ? '#065f46' : '#334155'} fontSize="13" fontWeight="900">
                  RUNNING
                </text>
                <text x="492" y="63" textAnchor="middle" fill={current.processState === 'RUNNING' ? '#059669' : '#94a3b8'} fontSize="9.5" fontWeight="bold">
                  {current.processState === 'RUNNING' ? '● Word (BĚŽÍ)' : 'Běžící na CPU'}
                </text>
              </g>

              {/* Šipka RUNNING -> BLOCKED */}
              <path
                d="M 492 85 L 492 115 L 435 115"
                fill="none"
                stroke={current.activeTransition === 'RUN_BLOCKED' ? '#d97706' : '#cbd5e1'}
                strokeWidth={current.activeTransition === 'RUN_BLOCKED' ? '3' : '1.5'}
                markerEnd={current.activeTransition === 'RUN_BLOCKED' ? 'url(#clean-arr-amber)' : 'url(#clean-arr-slate)'}
              />
              <text x="502" y="104" textAnchor="start" fill={current.activeTransition === 'RUN_BLOCKED' ? '#d97706' : '#64748b'} fontSize="8" fontWeight="bold">
                Žádost o disk ▾
              </text>

              {/* ---------------- 4. Uzel: BLOCKED (Dole uprostřed) ---------------- */}
              <g className="transition-all duration-300">
                <rect
                  x="285"
                  y="105"
                  width="145"
                  height="55"
                  rx="14"
                  fill={current.processState === 'BLOCKED' ? '#fffbeb' : '#f8fafc'}
                  stroke={current.processState === 'BLOCKED' ? '#f59e0b' : '#cbd5e1'}
                  strokeWidth={current.processState === 'BLOCKED' ? '3.5' : '1.5'}
                />
                <text x="357" y="130" textAnchor="middle" fill={current.processState === 'BLOCKED' ? '#92400e' : '#334155'} fontSize="12.5" fontWeight="900">
                  BLOCKED
                </text>
                <text x="357" y="147" textAnchor="middle" fill={current.processState === 'BLOCKED' ? '#d97706' : '#94a3b8'} fontSize="9" fontWeight="bold">
                  {current.processState === 'BLOCKED' ? '● Word (čeká na disk)' : 'Čekající na I/O'}
                </text>
              </g>

              {/* Šipka BLOCKED -> READY */}
              <path
                d="M 285 125 L 245 125 L 245 85"
                fill="none"
                stroke={current.activeTransition === 'BLOCKED_READY' ? '#2563eb' : '#cbd5e1'}
                strokeWidth={current.activeTransition === 'BLOCKED_READY' ? '3' : '1.5'}
                markerEnd={current.activeTransition === 'BLOCKED_READY' ? 'url(#clean-arr-blue)' : 'url(#clean-arr-slate)'}
              />
              <text x="235" y="112" textAnchor="end" fill={current.activeTransition === 'BLOCKED_READY' ? '#2563eb' : '#64748b'} fontSize="8" fontWeight="bold">
                ▴ Disk dočetl
              </text>

              {/* Šipka RUNNING -> TERMINATED */}
              <path
                d="M 565 50 L 625 50"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                markerEnd="url(#clean-arr-slate)"
              />
              <text x="595" y="42" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">
                Konec
              </text>

              {/* ---------------- 5. Uzel: TERMINATED ---------------- */}
              <g className="transition-all duration-300">
                <rect
                  x="630"
                  y="20"
                  width="100"
                  height="60"
                  rx="14"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                <text x="680" y="46" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="900">
                  EXIT
                </text>
                <text x="680" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
                  Ukončený
                </text>
              </g>

            </svg>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-2">
            <span>💡</span>
            <span><strong>Klíčový rozdíl:</strong> V 1. slotu Word opustil CPU po <strong>vypršení časovače</strong> (RUNNING ➔ READY). Ve 2. slotu opustil CPU sám kvůli <strong>čtení z disku</strong> (RUNNING ➔ BLOCKED).</span>
          </div>
        </div>

      </div>

    </div>
  );
}
