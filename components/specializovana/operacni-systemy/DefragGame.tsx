import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, 
  HelpCircle, ArrowRight, ArrowUpDown, HardDrive, Play, Square, 
  Zap, Gauge, Timer, ChevronDown, ChevronUp, Disc, RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DefragGameProps {
  onBack: () => void;
}

// 16 sektorů rozdělených do 2 stop po 8 sektorech (úhly po 45°)
// Track 0 (vnější stopa): sektory 0..7
// Track 1 (vnitřní stopa): sektory 8..15
interface SectorInfo {
  id: number;
  track: 0 | 1; // 0 = vnější stopa, 1 = vnitřní stopa
  angleIndex: number; // 0..7 (úhel: angleIndex * 45 deg)
  file: string; // 'A', 'B', 'C', or 'FREE'
}

interface JumpMetric {
  fromSector: number;
  toSector: number;
  fromTrack: number;
  toTrack: number;
  seekTime: number; // ms za přejezd mezi stopami
  rotationalLatency: number; // ms za dotočení plotny
  totalTime: number; // seek + latency
}

interface FileDetail {
  fileKey: string;
  name: string;
  color: string;
  borderColor: string;
  sectors: SectorInfo[];
  jumps: JumpMetric[];
  fileSeekTime: number;
  fileLatencyTime: number;
  fileTotalTime: number;
  isContiguous: boolean;
}

const DefragGame: React.FC<DefragGameProps> = ({ onBack }) => {
  const [sectors, setSectors] = useState<SectorInfo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [totalSeekTime, setTotalSeekTime] = useState<number>(0);
  const [totalLatencyTime, setTotalLatencyTime] = useState<number>(0);
  const [totalAccessTime, setTotalAccessTime] = useState<number>(0);
  const [fileDetails, setFileDetails] = useState<FileDetail[]>([]);
  const [isDefragmented, setIsDefragmented] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showFormula, setShowFormula] = useState<boolean>(true);
  const [moves, setMoves] = useState<number>(0);

  // Animace čtení a rotace HDD
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<0 | 1>(0); // pozice hlavičky (stopa 0 = vnější, 1 = vnitřní)
  const [activeAngleIndex, setActiveAngleIndex] = useState<number | null>(null);
  const [simPhase, setSimPhase] = useState<'idle' | 'seeking' | 'rotating' | 'reading'>('idle');
  const [simulationLog, setSimulationLog] = useState<string>('');
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Definice souborů
  const files = {
    A: { name: 'foto.png', color: 'bg-emerald-500', hex: '#10b981', borderColor: 'border-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', size: 3 },
    B: { name: 'hudba.mp3', color: 'bg-sky-500', hex: '#0ea5e9', borderColor: 'border-sky-500', textColor: 'text-sky-700', bgLight: 'bg-sky-50', size: 2 },
    C: { name: 'dokument.pdf', color: 'bg-orange-500', hex: '#f97316', borderColor: 'border-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50', size: 4 },
    FREE: { name: 'Volno', color: 'bg-slate-700/60', hex: '#334155', borderColor: 'border-slate-600', textColor: 'text-slate-400', bgLight: 'bg-slate-50', size: 7 },
  };

  // Výchozí silně fragmentovaný stav napříč oběma stopami
  // Track 0 (vnější, id 0..7): FREE, A, C, FREE, B, FREE, A, C
  // Track 1 (vnitřní, id 8..15): FREE, C, B, FREE, A, FREE, C, FREE
  const getInitialState = (): SectorInfo[] => [
    // Vnější stopa (Track 0)
    { id: 0, track: 0, angleIndex: 0, file: 'FREE' },
    { id: 1, track: 0, angleIndex: 1, file: 'A' },    // foto
    { id: 2, track: 0, angleIndex: 2, file: 'C' },    // dokument
    { id: 3, track: 0, angleIndex: 3, file: 'FREE' },
    { id: 4, track: 0, angleIndex: 4, file: 'B' },    // hudba
    { id: 5, track: 0, angleIndex: 5, file: 'FREE' },
    { id: 6, track: 0, angleIndex: 6, file: 'A' },    // foto
    { id: 7, track: 0, angleIndex: 7, file: 'C' },    // dokument

    // Vnitřní stopa (Track 1)
    { id: 8, track: 1, angleIndex: 0, file: 'FREE' },
    { id: 9, track: 1, angleIndex: 1, file: 'C' },    // dokument
    { id: 10, track: 1, angleIndex: 2, file: 'B' },   // hudba
    { id: 11, track: 1, angleIndex: 3, file: 'FREE' },
    { id: 12, track: 1, angleIndex: 4, file: 'A' },   // foto
    { id: 13, track: 1, angleIndex: 5, file: 'FREE' },
    { id: 14, track: 1, angleIndex: 6, file: 'C' },   // dokument
    { id: 15, track: 1, angleIndex: 7, file: 'FREE' },
  ];

  useEffect(() => {
    resetGame();
    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, []);

  const resetGame = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setIsSimulating(false);
    setActiveAngleIndex(null);
    setSimPhase('idle');
    setSimulationLog('');

    const start = getInitialState();
    setSectors(start);
    setSelectedId(null);
    setMoves(0);
    setFeedback(null);
    setIsDefragmented(false);
    calculateMetrics(start, 0);
  };

  // Reálné fyzikální výpočty HDD (7 200 RPM):
  // 1 otáčka disku = 60 / 7200 = 8.33 ms (zaokrouhlíme na 8.0 ms pro přehlednost žákům).
  // 8 sektorů na stopě = každý sektor odpovídá 1.0 ms rotace!
  //
  // 1) Seek Time (vystavení hlavičky mezi stopami):
  //    - Pokud hlava zůstává na stejné stopě: 0.0 ms.
  //    - Pokud hlava musí přejet mezi Track 0 a Track 1: 6.0 ms (mechanický přejezd raménka).
  //
  // 2) Rotational Latency (doba dotočení disku):
  //    - Pokud je další sektor přesně sousední na stejné stopě ((angle+1)%8): 0.0 ms (je zrovna pod hlavou).
  //    - Pokud je jinde: plotna se musí po směru otáčení dotočit.
  //      Počet pozic k dotočení: (toAngle - fromAngle + 8) % 8.
  //      Doba dotočení = počet pozic * 1.0 ms.
  //      (Pokud je to po změně stopy, hlava přeletí a čeká na cílový úhel).
  const calculateMetrics = (currentSectors: SectorInfo[], currentMoves: number) => {
    const details: FileDetail[] = [];
    let sumSeek = 0;
    let sumLatency = 0;
    let allContiguous = true;

    (['A', 'B', 'C'] as const).forEach((fileKey) => {
      const fileConfig = files[fileKey];
      const fileSectors = currentSectors.filter((s) => s.file === fileKey);

      const jumps: JumpMetric[] = [];
      let fileSeek = 0;
      let fileLatency = 0;
      let isFileContiguous = true;

      for (let i = 0; i < fileSectors.length - 1; i++) {
        const from = fileSectors[i];
        const to = fileSectors[i + 1];

        // 1. Seek time (změna stopy)
        let seek = 0;
        if (from.track !== to.track) {
          seek = 6.0; // 6 ms za přejezd mezi vnější a vnitřní stopou
          isFileContiguous = false;
          allContiguous = false;
        }

        // 2. Doba dotočení (rotace plotny)
        let latency = 0;
        // Pokud leží na stejné stopě a hned v sousedním úhlu (angle + 1), latency je 0
        if (from.track === to.track && to.angleIndex === (from.angleIndex + 1) % 8) {
          latency = 0;
        } else {
          // Musí se dotočit
          const stepsToRotate = (to.angleIndex - from.angleIndex + 8) % 8;
          // Pokud je to 0 (stejný úhel ale jiná stopa), po přejezdu stopy musí počkat celou otáčku nebo zlomek
          latency = stepsToRotate === 0 ? 8.0 : stepsToRotate * 1.0;
          isFileContiguous = false;
          allContiguous = false;
        }

        const total = seek + latency;
        fileSeek += seek;
        fileLatency += latency;
        jumps.push({
          fromSector: from.id,
          toSector: to.id,
          fromTrack: from.track,
          toTrack: to.track,
          seekTime: seek,
          rotationalLatency: latency,
          totalTime: total,
        });
      }

      sumSeek += fileSeek;
      sumLatency += fileLatency;
      details.push({
        fileKey,
        name: fileConfig.name,
        color: fileConfig.color,
        borderColor: fileConfig.borderColor,
        sectors: fileSectors,
        jumps,
        fileSeekTime: fileSeek,
        fileLatencyTime: fileLatency,
        fileTotalTime: fileSeek + fileLatency,
        isContiguous: isFileContiguous,
      });
    });

    const totalAccess = sumSeek + sumLatency;
    setFileDetails(details);
    setTotalSeekTime(sumSeek);
    setTotalLatencyTime(sumLatency);
    setTotalAccessTime(totalAccess);

    if (allContiguous) {
      setIsDefragmented(true);
      setFeedback({
        type: 'success',
        text: `Excelentní práce! Všechny soubory jsou nyní uloženy v souvislých blocích na stejné stopě. Čtecí hlava nemusí přejíždět mezi stopami (Seek Time = 0 ms) a plotna se nemusí zbytečně dotáčet (Doba dotočení = 0 ms)!`,
      });
    }
  };

  const handleSectorClick = (id: number) => {
    if (isDefragmented || isSimulating) return;

    if (selectedId === null) {
      setSelectedId(id);
    } else {
      if (selectedId === id) {
        setSelectedId(null);
        return;
      }

      // Prohození obsahu dvou sektorů
      const newSectors = sectors.map((s) => ({ ...s }));
      const s1 = newSectors.find((s) => s.id === selectedId);
      const s2 = newSectors.find((s) => s.id === id);

      if (s1 && s2) {
        const temp = s1.file;
        s1.file = s2.file;
        s2.file = temp;
      }

      setSectors(newSectors);
      setSelectedId(null);
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      calculateMetrics(newSectors, nextMoves);
    }
  };

  // Simulace rotace plotny a pohybu raménka
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const stepsQueue: {
      sectorId: number;
      track: 0 | 1;
      angleIndex: number;
      file: string;
      seek: number;
      latency: number;
    }[] = [];

    (['A', 'B', 'C'] as const).forEach((fileKey) => {
      const fSectors = sectors.filter((s) => s.file === fileKey);
      fSectors.forEach((s, idx) => {
        let seek = 0;
        let latency = 0;
        if (idx > 0) {
          const prev = fSectors[idx - 1];
          if (prev.track !== s.track) seek = 6.0;
          if (prev.track === s.track && s.angleIndex === (prev.angleIndex + 1) % 8) {
            latency = 0;
          } else {
            const steps = (s.angleIndex - prev.angleIndex + 8) % 8;
            latency = steps === 0 ? 8.0 : steps * 1.0;
          }
        }
        stepsQueue.push({
          sectorId: s.id,
          track: s.track,
          angleIndex: s.angleIndex,
          file: files[fileKey].name,
          seek,
          latency,
        });
      });
    });

    let currentStepIdx = 0;

    const runNextStep = () => {
      if (currentStepIdx >= stepsQueue.length) {
        setIsSimulating(false);
        setSimPhase('idle');
        setActiveAngleIndex(null);
        setSimulationLog('Čtení všech souborů dokončeno.');
        return;
      }

      const step = stepsQueue[currentStepIdx];
      setActiveTrack(step.track);

      // 1. Fáze: Seek Time (pokud je potřeba přejet stopu)
      if (step.seek > 0) {
        setSimPhase('seeking');
        setSimulationLog(`⚡ Přejezd raménka na Stopu ${step.track === 0 ? '0 (Vnější)' : '1 (Vnitřní)'}... (Seek Time +${step.seek} ms)`);
        
        simulationTimerRef.current = setTimeout(() => {
          // 2. Fáze: Rotace plotny k cílovému sektoru
          setSimPhase('rotating');
          setSimulationLog(`🔄 Čekání na dotočení sektoru pod čtecí hlavu... (Doba dotočení +${step.latency} ms)`);

          simulationTimerRef.current = setTimeout(() => {
            // 3. Fáze: Čtení
            setSimPhase('reading');
            setActiveAngleIndex(step.angleIndex);
            setSimulationLog(`📖 Čtení sektoru #${step.sectorId} (${step.file}).`);

            currentStepIdx++;
            simulationTimerRef.current = setTimeout(runNextStep, 500);
          }, 600);
        }, 700);
      } else if (step.latency > 0) {
        // Pouze rotace bez změny stopy
        setSimPhase('rotating');
        setSimulationLog(`🔄 Plotna se dotáčí k sektoru #${step.sectorId}... (Doba dotočení +${step.latency} ms)`);

        simulationTimerRef.current = setTimeout(() => {
          setSimPhase('reading');
          setActiveAngleIndex(step.angleIndex);
          setSimulationLog(`📖 Čtení sektoru #${step.sectorId} (${step.file}).`);

          currentStepIdx++;
          simulationTimerRef.current = setTimeout(runNextStep, 500);
        }, 600);
      } else {
        // Plynulé sekvenční čtení
        setSimPhase('reading');
        setActiveAngleIndex(step.angleIndex);
        setSimulationLog(`⚡ Bleskové sekvenční čtení sektoru #${step.sectorId} (${step.file}) bez čekání!`);

        currentStepIdx++;
        simulationTimerRef.current = setTimeout(runNextStep, 350);
      }
    };

    runNextStep();
  };

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4 py-6">
      {/* Horní navigační lišta */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 border-2 border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na rozcestník
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={resetGame}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 border-2 border-slate-200 uppercase tracking-wider text-xs disabled:opacity-50"
          >
            <RefreshCcw className="w-4 h-4" /> Resetovat disk
          </button>
        </div>
      </div>

      {/* Hlavní skleněná karta */}
      <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border-4 border-white">
        
        {/* Hlavička */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm shrink-0">
              <Disc className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Rotující magnetický disk (HDD)
                </span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  2 stopy × 8 sektorů
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mt-1">
                Fyzika HDD: Seek Time & Doba dotočení
              </h1>
            </div>
          </div>

          {/* Dvě složky zpoždění */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:px-4 flex items-center gap-3 text-xs font-medium text-slate-600 max-w-md">
            <Info className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <strong className="text-slate-800">Proč disk čeká 2×?</strong>
              <p className="text-[11px] leading-relaxed text-slate-500 mt-0.5">
                <strong>1. Seek Time:</strong> Doba přejezdu raménka mezi stopami.<br/>
                <strong>2. Doba dotočení (Rotational Latency):</strong> Čekání, než se sektor dotočí pod hlavu.
              </p>
            </div>
          </div>
        </div>

        {/* Instrukce k úkolu */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 text-amber-950 text-sm leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold">
              Úkol: Uspořádejte každý soubor do souvislých sektorů na stejné stopě.
            </p>
            <p className="text-xs text-amber-800/80 mt-1">
              Klikněte na dva sektory (přímo na plotně nebo v tabulce stop) pro jejich prohození. Sledujte, jak scelení souborů eliminuje přejezdy raménka i čekání na dotočení disku.
            </p>
          </div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {isSimulating ? 'Probíhá čtení...' : 'Spustit animaci čtení'}
          </button>
        </div>

        {/* Stav simulace */}
        {isSimulating && (
          <div className="mb-6 p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 flex items-center gap-3 animate-pulse">
            <Timer className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{simulationLog}</span>
          </div>
        )}

        {/* Hlavní zobrazení: Vizuální rotující plotna HDD + Kalkulačka */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEVÝ PANEL (7 sloupců): Interaktivní kruhová plotna HDD */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-800 relative flex flex-col items-center">
              
              {/* Horní indikátory HDD šasi */}
              <div className="w-full flex justify-between items-center mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                  <span className="font-bold uppercase text-[10px] tracking-wider text-slate-300">
                    Vřeteno: 7 200 RPM (1 otáčka = 8 ms)
                  </span>
                </div>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
                  Raménko: Stopa {activeTrack === 0 ? '0 (Vnější)' : '1 (Vnitřní)'}
                </span>
              </div>

              {/* Kruhová plotna HDD v SVG */}
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                
                {/* SVG plotna */}
                <svg viewBox="-190 -190 380 380" className="w-full h-full drop-shadow-2xl">
                  {/* Pozadí magnetické plotny */}
                  <defs>
                    <radialGradient id="platterGrad" cx="0%" cy="0%" r="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="50%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                    <radialGradient id="spindleGrad" cx="0%" cy="0%" r="100%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </radialGradient>
                  </defs>

                  {/* Vnější disk */}
                  <circle cx="0" cy="0" r="175" fill="url(#platterGrad)" stroke="#475569" strokeWidth="3" />
                  
                  {/* Vodící kružnice stop */}
                  <circle cx="0" cy="0" r="145" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <circle cx="0" cy="0" r="95" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

                  {/* Popisky stop */}
                  <text x="0" y="-155" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" opacity="0.8">
                    STOPA 0 (VNĚJŠÍ)
                  </text>
                  <text x="0" y="-105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" opacity="0.8">
                    STOPA 1 (VNITŘNÍ)
                  </text>

                  {/* Sektory Track 0 (vnější stopa, r = 135) */}
                  {sectors.filter((s) => s.track === 0).map((s) => {
                    const angleRad = (s.angleIndex * 45 - 90) * (Math.PI / 180);
                    const cx = 135 * Math.cos(angleRad);
                    const cy = 135 * Math.sin(angleRad);
                    const isSelected = selectedId === s.id;
                    const isReadActive = activeTrack === 0 && activeAngleIndex === s.angleIndex;
                    const fileConf = files[s.file as keyof typeof files];

                    return (
                      <g 
                        key={s.id} 
                        onClick={() => handleSectorClick(s.id)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r="18"
                          fill={fileConf.hex}
                          stroke={isSelected ? '#f59e0b' : isReadActive ? '#f43f5e' : '#ffffff'}
                          strokeWidth={isSelected ? '4' : isReadActive ? '4' : '1.5'}
                          opacity={s.file === 'FREE' ? 0.35 : 0.95}
                        />
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="900"
                          pointerEvents="none"
                        >
                          #{s.id}
                        </text>
                        <text
                          x={cx}
                          y={cy + 7}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="7"
                          fontWeight="bold"
                          opacity="0.8"
                          pointerEvents="none"
                        >
                          {s.file === 'FREE' ? 'V' : s.file}
                        </text>
                      </g>
                    );
                  })}

                  {/* Sektory Track 1 (vnitřní stopa, r = 85) */}
                  {sectors.filter((s) => s.track === 1).map((s) => {
                    const angleRad = (s.angleIndex * 45 - 90) * (Math.PI / 180);
                    const cx = 85 * Math.cos(angleRad);
                    const cy = 85 * Math.sin(angleRad);
                    const isSelected = selectedId === s.id;
                    const isReadActive = activeTrack === 1 && activeAngleIndex === s.angleIndex;
                    const fileConf = files[s.file as keyof typeof files];

                    return (
                      <g 
                        key={s.id} 
                        onClick={() => handleSectorClick(s.id)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r="15"
                          fill={fileConf.hex}
                          stroke={isSelected ? '#f59e0b' : isReadActive ? '#f43f5e' : '#ffffff'}
                          strokeWidth={isSelected ? '4' : isReadActive ? '4' : '1.5'}
                          opacity={s.file === 'FREE' ? 0.35 : 0.95}
                        />
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="8"
                          fontWeight="900"
                          pointerEvents="none"
                        >
                          #{s.id}
                        </text>
                        <text
                          x={cx}
                          y={cy + 6}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="6.5"
                          fontWeight="bold"
                          opacity="0.8"
                          pointerEvents="none"
                        >
                          {s.file === 'FREE' ? 'V' : s.file}
                        </text>
                      </g>
                    );
                  })}

                  {/* Středové vřeteno (Spindle motor) */}
                  <circle cx="0" cy="0" r="42" fill="url(#spindleGrad)" stroke="#1e293b" strokeWidth="2" />
                  <circle cx="0" cy="0" r="15" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" fill="#f8fafc" />

                  {/* Mechanické raménko čtecí hlavy (Actuator Arm) */}
                  {/* Čep raménka v levém horním rohu (-170, -170) */}
                  <g className="transition-all duration-500 ease-out">
                    <circle cx="-160" cy="-160" r="14" fill="#64748b" stroke="#334155" strokeWidth="3" />
                    <circle cx="-160" cy="-160" r="5" fill="#e2e8f0" />
                    
                    {/* Raménko mířící na Track 0 (r=135) nebo Track 1 (r=85) */}
                    {/* Úhel raménka se mírně natáčí podle activeTrack */}
                    {activeTrack === 0 ? (
                      // Raménko na Stopu 0 (vnější)
                      <path
                        d="M -160 -160 L -40 -125 L 0 -135"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    ) : (
                      // Raménko na Stopu 1 (vnitřní)
                      <path
                        d="M -160 -160 L -40 -80 L 0 -85"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Čtecí hlavička (hrot) */}
                    <circle
                      cx="0"
                      cy={activeTrack === 0 ? -135 : -85}
                      r="6"
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className={simPhase === 'reading' ? 'animate-ping' : ''}
                    />
                  </g>
                </svg>
              </div>

              {/* Přehledná tabulka sektorů rozdělených podle stop (snadné klikání) */}
              <div className="w-full mt-6 space-y-3">
                {/* Stopa 0 */}
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-mono font-bold text-slate-400 mb-2 flex items-center justify-between">
                    <span>Stopa 0 (Vnější stopy #0 až #7)</span>
                    <span className="text-slate-500">8 pozic po 45°</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1.5">
                    {sectors.filter((s) => s.track === 0).map((s) => {
                      const isSel = selectedId === s.id;
                      const fileConf = files[s.file as keyof typeof files];
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSectorClick(s.id)}
                          disabled={isSimulating}
                          className={`p-1.5 rounded-lg border text-center transition-all ${fileConf.color} ${
                            isSel ? 'ring-2 ring-amber-400 scale-105' : 'border-transparent'
                          } text-white font-black text-xs aspect-square flex flex-col items-center justify-center`}
                        >
                          <span className="text-[9px] opacity-70">#{s.id}</span>
                          <span>{s.file === 'FREE' ? '—' : s.file}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Stopa 1 */}
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-mono font-bold text-slate-400 mb-2 flex items-center justify-between">
                    <span>Stopa 1 (Vnitřní stopy #8 až #15)</span>
                    <span className="text-slate-500">8 pozic po 45°</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1.5">
                    {sectors.filter((s) => s.track === 1).map((s) => {
                      const isSel = selectedId === s.id;
                      const fileConf = files[s.file as keyof typeof files];
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSectorClick(s.id)}
                          disabled={isSimulating}
                          className={`p-1.5 rounded-lg border text-center transition-all ${fileConf.color} ${
                            isSel ? 'ring-2 ring-amber-400 scale-105' : 'border-transparent'
                          } text-white font-black text-xs aspect-square flex flex-col items-center justify-center`}
                        >
                          <span className="text-[9px] opacity-70">#{s.id}</span>
                          <span>{s.file === 'FREE' ? '—' : s.file}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Legenda barev */}
            <div className="grid grid-cols-3 gap-3">
              {(['A', 'B', 'C'] as const).map((key) => {
                const f = files[key];
                return (
                  <div key={key} className={`p-3 rounded-2xl border ${f.bgLight} border-slate-200 flex items-center gap-2.5`}>
                    <span className={`w-3.5 h-3.5 rounded-lg ${f.color} shrink-0`}></span>
                    <div className="truncate">
                      <div className="text-xs font-black text-slate-800 truncate">{f.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{f.size} sektory</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PRAVÝ PANEL (5 sloupců): Transparentní kalkulačka se 2 složkami zpoždění */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Celkový čas přístupu (Access Time) */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
              <div>
                <span className="font-black text-xs text-slate-400 uppercase tracking-widest block">
                  Celkový přístupový čas (Access Time)
                </span>
                <div className="text-4xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
                  {totalAccessTime.toFixed(1)} <span className="text-base text-slate-400 font-bold">ms</span>
                </div>
              </div>

              {/* Rozdělení na dvě složky */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                    1. Seek Time (Hlavička)
                  </span>
                  <span className="text-xl font-black text-rose-950 font-mono">
                    {totalSeekTime.toFixed(1)} ms
                  </span>
                  <span className="text-[10px] text-rose-600 block mt-0.5">Přejezdy mezi stopami</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                    2. Doba dotočení (Plotna)
                  </span>
                  <span className="text-xl font-black text-amber-950 font-mono">
                    {totalLatencyTime.toFixed(1)} ms
                  </span>
                  <span className="text-[10px] text-amber-600 block mt-0.5">Rotace k sektoru</span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      totalAccessTime === 0 
                        ? 'bg-emerald-500' 
                        : totalAccessTime < 25 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(5, Math.min(100, ((55 - totalAccessTime) / 55) * 100))}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">
                  <span>Fragmentovaný (Pomalý)</span>
                  <span>Defragmentovaný (Rychlý)</span>
                </div>
              </div>
            </div>

            {/* JAK SE ČAS POČÍTÁ: Fyzikální model */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-indigo-600" />
                  Výpočet zpoždění rotačního HDD
                </h3>
                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  {showFormula ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showFormula && (
                <div className="text-xs text-slate-600 leading-relaxed space-y-2 border-t border-slate-200 pt-3">
                  <p>
                    U mechanického HDD vznikají dvě nezávislá mechanická zpoždění:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-medium text-slate-700">
                    <li>
                      <strong>Seek Time (pohyb raménka):</strong> Pokud leží další sektor na jiné stopě, raménko musí přejet = <strong>6.0 ms</strong>. Pokud leží na stejné stopě = <strong>0 ms</strong>.
                    </li>
                    <li>
                      <strong>Doba dotočení (Rotational Latency):</strong> Pokud sektor neleží bezprostředně v dalším úhlu, musí hlava počkat, až se plotna dotočí (každý sektor = <strong>1.0 ms</strong>).
                    </li>
                  </ul>
                </div>
              )}

              {/* Živý rozpis po souborech */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Aktuální stav jednotlivých souborů:
                </span>

                {fileDetails.map((f) => (
                  <div key={f.fileKey} className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-black text-slate-800 flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${f.color}`}></span>
                        {f.name}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        f.isContiguous ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {f.isContiguous ? 'Plynulý (0 ms)' : `+${f.fileTotalTime.toFixed(1)} ms zpoždění`}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono">
                      Pozice: {f.sectors.map((s) => `[Stopa ${s.track}, #${s.id}]`).join(' ➔ ')}
                    </div>

                    {/* Rozpis jednotlivých skoků */}
                    {!f.isContiguous && f.jumps.length > 0 && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 space-y-1">
                        {f.jumps.map((jump, idx) => {
                          if (jump.seek === 0 && jump.rotationalLatency === 0) return null;
                          return (
                            <div key={idx} className="flex justify-between text-slate-600 font-medium">
                              <span>#{jump.fromSector} ➔ #{jump.toSector}:</span>
                              <span className="font-mono text-rose-600 font-bold">
                                {jump.seek > 0 ? `Seek ${jump.seek} ms` : ''} 
                                {jump.seek > 0 && jump.rotationalLatency > 0 ? ' + ' : ''}
                                {jump.rotationalLatency > 0 ? `Dotočení ${jump.rotationalLatency} ms` : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Vzorec celkem */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs flex justify-between items-center font-bold text-indigo-900">
                <span>Celkový čas čtení disku:</span>
                <span className="text-sm font-black font-mono">{totalAccessTime.toFixed(1)} ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zpětná vazba po úspěšné defragmentaci */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-emerald-900 text-base">Disk je kompletně defragmentován!</h4>
                  <p className="font-medium text-xs sm:text-sm text-emerald-800 leading-relaxed mt-0.5">{feedback.text}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={runSimulation}
                  className="px-5 py-3 bg-white border-2 border-emerald-300 text-emerald-800 font-bold rounded-2xl shadow-xs transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  Přehrát plynulé čtení
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  Zpět na rozcestník
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default DefragGame;
