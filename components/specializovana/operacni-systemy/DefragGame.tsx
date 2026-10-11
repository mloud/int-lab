'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCcw, HardDrive, Play, Square, 
  Zap, Disc, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Layers
} from 'lucide-react';

interface DefragGameProps {
  onBack: () => void;
}

// 16 sektorů rozdělených do 2 stop po 8 sektorech (45° kroky)
// Stopa 0 (vnější): r = 130
// Stopa 1 (vnitřní): r = 80
interface SectorItem {
  id: number;
  track: 0 | 1; // 0 = vnější, 1 = vnitřní
  angleIndex: number; // 0..7 (úhel: angleIndex * 45°)
  file: 'FILE' | 'FREE';
  order: number | null; // pořadí v souboru (1, 2, 3, 4)
}

export default function DefragGame({ onBack }: DefragGameProps) {
  // Režim: 'fragmented' (před defragmentací) nebo 'defragmented' (po defragmentaci)
  const [mode, setMode] = useState<'fragmented' | 'defragmented'>('fragmented');

  // Animace a rotace plotny
  const [platterAngle, setPlatterAngle] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeTrack, setActiveTrack] = useState<0 | 1>(0); // 0 = vnější, 1 = vnitřní stopa
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentReadingId, setCurrentReadingId] = useState<number | null>(null);
  const [readSectorIds, setReadSectorIds] = useState<number[]>([]);

  // Stavy mechaniky pro animaci
  const [mechPhase, setMechPhase] = useState<'idle' | 'seeking' | 'rotating' | 'reading' | 'done'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('Připraveno k demonstraci.');
  
  // Statistika akcí (žádné složité ms výpočty!)
  const [headJumpsCount, setHeadJumpsCount] = useState<number>(0);
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Definice sektorů ve FRAGMENTOVANÉM stavu
  // Soubor má 4 bloky (části 1, 2, 3, 4) rozházené napříč stopami:
  // Blok 1: Stopa 0, úhel 1 (#1)
  // Blok 2: Stopa 1, úhel 5 (#13) -> přeskok na stopu 1 + dotočení!
  // Blok 3: Stopa 0, úhel 2 (#2)  -> přeskok zpět na stopu 0 + dotočení!
  // Blok 4: Stopa 1, úhel 6 (#14) -> přeskok na stopu 1 + dotočení!
  const fragmentedSectors: SectorItem[] = [
    // Stopa 0 (vnější)
    { id: 0, track: 0, angleIndex: 0, file: 'FREE', order: null },
    { id: 1, track: 0, angleIndex: 1, file: 'FILE', order: 1 },
    { id: 2, track: 0, angleIndex: 2, file: 'FILE', order: 3 },
    { id: 3, track: 0, angleIndex: 3, file: 'FREE', order: null },
    { id: 4, track: 0, angleIndex: 4, file: 'FREE', order: null },
    { id: 5, track: 0, angleIndex: 5, file: 'FREE', order: null },
    { id: 6, track: 0, angleIndex: 6, file: 'FREE', order: null },
    { id: 7, track: 0, angleIndex: 7, file: 'FREE', order: null },
    // Stopa 1 (vnitřní)
    { id: 8, track: 1, angleIndex: 0, file: 'FREE', order: null },
    { id: 9, track: 1, angleIndex: 1, file: 'FREE', order: null },
    { id: 10, track: 1, angleIndex: 2, file: 'FREE', order: null },
    { id: 11, track: 1, angleIndex: 3, file: 'FREE', order: null },
    { id: 12, track: 1, angleIndex: 4, file: 'FREE', order: null },
    { id: 13, track: 1, angleIndex: 5, file: 'FILE', order: 2 },
    { id: 14, track: 1, angleIndex: 6, file: 'FILE', order: 4 },
    { id: 15, track: 1, angleIndex: 7, file: 'FREE', order: null },
  ];

  // Definice sektorů v DEFRAGMENTOVANÉM stavu
  // Všechny 4 bloky leží těsně za sebou na vnější stopě:
  // Blok 1 (#1), Blok 2 (#2), Blok 3 (#3), Blok 4 (#4) na Stopě 0
  const defragmentedSectors: SectorItem[] = [
    // Stopa 0 (vnější)
    { id: 0, track: 0, angleIndex: 0, file: 'FREE', order: null },
    { id: 1, track: 0, angleIndex: 1, file: 'FILE', order: 1 },
    { id: 2, track: 0, angleIndex: 2, file: 'FILE', order: 2 },
    { id: 3, track: 0, angleIndex: 3, file: 'FILE', order: 3 },
    { id: 4, track: 0, angleIndex: 4, file: 'FILE', order: 4 },
    { id: 5, track: 0, angleIndex: 5, file: 'FREE', order: null },
    { id: 6, track: 0, angleIndex: 6, file: 'FREE', order: null },
    { id: 7, track: 0, angleIndex: 7, file: 'FREE', order: null },
    // Stopa 1 (vnitřní) - celá volná
    { id: 8, track: 1, angleIndex: 0, file: 'FREE', order: null },
    { id: 9, track: 1, angleIndex: 1, file: 'FREE', order: null },
    { id: 10, track: 1, angleIndex: 2, file: 'FREE', order: null },
    { id: 11, track: 1, angleIndex: 3, file: 'FREE', order: null },
    { id: 12, track: 1, angleIndex: 4, file: 'FREE', order: null },
    { id: 13, track: 1, angleIndex: 5, file: 'FREE', order: null },
    { id: 14, track: 1, angleIndex: 6, file: 'FREE', order: null },
    { id: 15, track: 1, angleIndex: 7, file: 'FREE', order: null },
  ];

  const currentSectors = mode === 'fragmented' ? fragmentedSectors : defragmentedSectors;

  // Vyčištění časovače
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Reset při přepnutí režimu
  const handleSwitchMode = (newMode: 'fragmented' | 'defragmented') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setMode(newMode);
    setActiveTrack(0);
    setCurrentReadingId(null);
    setReadSectorIds([]);
    setMechPhase('idle');
    setHeadJumpsCount(0);
    setWaitingCount(0);
    setStatusMessage(
      newMode === 'fragmented'
        ? 'Režim: Fragmentovaný soubor (kousky jsou rozházené po různých stopách).'
        : 'Režim: Defragmentovaný soubor (všechny bloky jsou srovnané za sebou na jedné stopě).'
    );
  };

  // Spuštění simulace čtení
  const startReadingSimulation = () => {
    if (isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsPlaying(false);
      setMechPhase('idle');
      setCurrentReadingId(null);
      setStatusMessage('Simulace pozastavena.');
      return;
    }

    setIsPlaying(true);
    setReadSectorIds([]);
    setCurrentReadingId(null);
    setHeadJumpsCount(0);
    setWaitingCount(0);

    // Pořadí čtení souboru (bloky 1, 2, 3, 4)
    const fileBlocks = [...currentSectors]
      .filter((s) => s.file === 'FILE' && s.order !== null)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    let blockIndex = 0;
    let currentArmTrack: 0 | 1 = activeTrack;
    let currentAngle = platterAngle;
    let jumps = 0;
    let waits = 0;

    // Pomocná funkce pro výpočet rotace dopředu tak, aby zadaný sektor dorazil přesně na pozici 12 hodin (pod hlavu)
    const getAngleForSector = (angleIndex: number, fromAngle: number): number => {
      // Úhel cílového sektoru na pozici 12 hodin je - (angleIndex * 45) modulo 360
      const targetRemainder = ((- (angleIndex * 45) % 360) - 360) % 360; // vždy v rozsahu -359 až 0
      const currentRemainder = ((fromAngle % 360) - 360) % 360;
      
      let delta = targetRemainder - currentRemainder;
      if (delta >= 0) {
        delta -= 360; // vždy rotujeme plynule dopředu (ve stejném směru)
      }
      return fromAngle + delta;
    };

    const processNextBlock = () => {
      if (blockIndex >= fileBlocks.length) {
        setIsPlaying(false);
        setMechPhase('done');
        setCurrentReadingId(null);
        setStatusMessage(
          mode === 'fragmented'
            ? '❌ Dokončeno! Čtení bylo trhané a pomalé – hlava musela 3× mechanicky přeskočit a plotna se opakovaně dotáčela.'
            : '✅ Dokončeno! Bleskové plynulé čtení – žádné přeskakování hlavy, sektory 1, 2, 3, 4 byly načteny za sebou na jediné plynulé otočení!'
        );
        return;
      }

      const targetBlock = fileBlocks[blockIndex];
      const needsTrackChange = currentArmTrack !== targetBlock.track;

      if (mode === 'defragmented') {
        // === DEFRAGMENTOVANÝ REŽIM: PLYNULÉ SEKVENČNÍ ČTENÍ ===
        // Všechny bloky leží na Stopě 0. Hlava se nastaví jednou a plotna plynule rotuje.
        if (currentArmTrack !== 0) {
          currentArmTrack = 0;
          setActiveTrack(0);
        }

        // Plotna se plynule natočí k cílovému sektoru
        currentAngle = getAngleForSector(targetBlock.angleIndex, currentAngle);
        setPlatterAngle(currentAngle);
        setMechPhase('reading');
        setCurrentReadingId(targetBlock.id);
        setReadSectorIds((prev) => [...prev, targetBlock.id]);
        setStatusMessage(
          `⚡ Plynulé čtení: Sektor #${targetBlock.id} (Část ${targetBlock.order}/4) právě prochází pod hlavou!`
        );

        blockIndex++;
        // Plynulý rychlý krok pro navazující čtení
        timerRef.current = setTimeout(processNextBlock, 600);

      } else {
        // === FRAGMENTOVANÝ REŽIM: TRHANÉ ČTENÍ S PŘESKAKOVÁNÍM HLAVY ===
        if (needsTrackChange) {
          // 1. FÁZE: Přeskok raménka mezi stopami
          jumps++;
          setHeadJumpsCount(jumps);
          setMechPhase('seeking');
          currentArmTrack = targetBlock.track;
          setActiveTrack(currentArmTrack);
          setStatusMessage(
            `⚡ 1. PŘESKOK HLAVY (Seek): Raménko mechanicky přeskakuje na ${currentArmTrack === 0 ? 'Vnější stopu 0' : 'Vnitřní stopu 1'}!`
          );

          timerRef.current = setTimeout(() => {
            // 2. FÁZE: Čekání na dotočení sektoru pod hlavu
            waits++;
            setWaitingCount(waits);
            setMechPhase('rotating');
            setStatusMessage(
              `🔄 2. ČEKÁNÍ NA SEKTOR: Hlava čeká nad stopou, plotna se točí a hledá sektor #${targetBlock.id}...`
            );

            currentAngle = getAngleForSector(targetBlock.angleIndex, currentAngle);
            setPlatterAngle(currentAngle);

            timerRef.current = setTimeout(() => {
              // 3. FÁZE: Načtení dat
              setMechPhase('reading');
              setCurrentReadingId(targetBlock.id);
              setReadSectorIds((prev) => [...prev, targetBlock.id]);
              setStatusMessage(
                `📖 3. PŘEČTENÍ: Sektor #${targetBlock.id} (Část ${targetBlock.order}/4) byl načten!`
              );

              blockIndex++;
              timerRef.current = setTimeout(processNextBlock, 750);
            }, 750);
          }, 750);

        } else {
          // Hlava je na správné stopě, ale sektor není hned pod ní -> plotna se musí dotočit
          waits++;
          setWaitingCount(waits);
          setMechPhase('rotating');
          setStatusMessage(
            `🔄 Čekání na dotočení sektoru #${targetBlock.id} pod hlavu...`
          );

          currentAngle = getAngleForSector(targetBlock.angleIndex, currentAngle);
          setPlatterAngle(currentAngle);

          timerRef.current = setTimeout(() => {
            setMechPhase('reading');
            setCurrentReadingId(targetBlock.id);
            setReadSectorIds((prev) => [...prev, targetBlock.id]);
            setStatusMessage(
              `📖 Přečtení: Sektor #${targetBlock.id} (Část ${targetBlock.order}/4) načten!`
            );

            blockIndex++;
            timerRef.current = setTimeout(processNextBlock, 750);
          }, 750);
        }
      }
    };

    processNextBlock();
  };

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-500 px-4 py-6">
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
            onClick={() => handleSwitchMode(mode === 'fragmented' ? 'defragmented' : 'fragmented')}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-5 py-3 font-black rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 border-2 uppercase tracking-wider text-xs disabled:opacity-50 ${
              mode === 'fragmented' 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500' 
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
            }`}
          >
            {mode === 'fragmented' ? (
              <>
                <Sparkles className="w-4 h-4" /> Provést defragmentaci
              </>
            ) : (
              <>
                <RefreshCcw className="w-4 h-4" /> Vrátit do fragmentovaného stavu
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hlavní skleněný rámec */}
      <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border-4 border-white">
        
        {/* Hlavička */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Rotující pevný disk (HDD)
              </span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                2 stopy × 8 sektorů
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Fyzika defragmentace disku
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sledujte, co se reálně děje s mechanickým ramenem a rotující plotnou disku.
            </p>
          </div>

          {/* Přepínač režimu (Fragmentovaný vs Defragmentovaný) */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => handleSwitchMode('fragmented')}
              disabled={isPlaying}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                mode === 'fragmented'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              } disabled:opacity-50`}
            >
              <AlertTriangle className="w-4 h-4" /> 1. Fragmentovaný
            </button>
            <button
              onClick={() => handleSwitchMode('defragmented')}
              disabled={isPlaying}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                mode === 'defragmented'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              } disabled:opacity-50`}
            >
              <CheckCircle2 className="w-4 h-4" /> 2. Defragmentovaný
            </button>
          </div>
        </div>

        {/* Panel s akčním tlačítkem a zprávou */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`}>
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Aktuální činnost mechaniky:
              </div>
              <div className="text-sm font-bold text-slate-800">
                {statusMessage}
              </div>
            </div>
          </div>

          <button
            onClick={startReadingSimulation}
            className={`flex items-center gap-2 px-6 py-3.5 text-white font-black rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-white" /> Zastavit čtení
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Spustit čtení souboru
              </>
            )}
          </button>
        </div>

        {/* VIZUÁLNÍ GRAFICKÝ PLOTNOVÝ DISK & SROVNÁNÍ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEVÁ ČÁST: Rotující plotna a kmitající raménko (7 sloupců) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-800 flex flex-col items-center relative overflow-hidden">
            
            {/* Stavové indikátory */}
            <div className="w-full flex justify-between items-center mb-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="font-bold uppercase text-[11px] tracking-wider">
                  Vřeteno: 7 200 RPM
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded font-bold text-[11px] border ${
                activeTrack === 0 
                  ? 'bg-sky-950 text-sky-400 border-sky-800' 
                  : 'bg-purple-950 text-purple-400 border-purple-800'
              }`}>
                Raménko: Stopa {activeTrack === 0 ? '0 (Vnější)' : '1 (Vnitřní)'}
              </span>
            </div>

            {/* SVG Plotna s reálnou rotací a raménkem */}
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              <svg viewBox="-190 -190 380 380" className="w-full h-full drop-shadow-2xl">
                
                <defs>
                  <radialGradient id="platterGrad" cx="0%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="60%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                  <radialGradient id="spindleGrad" cx="0%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#475569" />
                  </radialGradient>
                </defs>

                {/* 1. SKUPINA KTERÁ SE REÁLNĚ FYZICKY TOČÍ (Plotna + Stopy + Sektory) */}
                <g 
                  style={{ 
                    transform: `rotate(${platterAngle}deg)`, 
                    transformOrigin: '0px 0px',
                    transition: isPlaying ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.4s ease-out'
                  }}
                >
                  {/* Fyzický magnetický disk */}
                  <circle cx="0" cy="0" r="175" fill="url(#platterGrad)" stroke="#475569" strokeWidth="3" />
                  
                  {/* Vodicí linie stop */}
                  <circle cx="0" cy="0" r="130" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
                  <circle cx="0" cy="0" r="80" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />

                  {/* Značky stop přímo na plotně */}
                  <text x="0" y="-148" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" opacity="0.7">
                    STOPA 0 (VNĚJŠÍ)
                  </text>
                  <text x="0" y="-98" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" opacity="0.7">
                    STOPA 1 (VNITŘNÍ)
                  </text>

                  {/* Sektory na Stopě 0 (Vnější, r = 130) */}
                  {currentSectors.filter((s) => s.track === 0).map((s) => {
                    const angleRad = (s.angleIndex * 45 - 90) * (Math.PI / 180);
                    const cx = 130 * Math.cos(angleRad);
                    const cy = 130 * Math.sin(angleRad);
                    const isTargetFile = s.file === 'FILE';
                    const isReadingNow = currentReadingId === s.id;
                    const isAlreadyRead = readSectorIds.includes(s.id);

                    return (
                      <g key={s.id}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="17"
                          fill={
                            isReadingNow 
                              ? '#f59e0b' 
                              : isAlreadyRead 
                                ? '#10b981' 
                                : isTargetFile 
                                  ? (mode === 'fragmented' ? '#ef4444' : '#0ea5e9')
                                  : '#334155'
                          }
                          stroke={isReadingNow ? '#ffffff' : isTargetFile ? '#ffffff' : '#475569'}
                          strokeWidth={isReadingNow ? '3' : isTargetFile ? '2' : '1'}
                          opacity={isTargetFile || isAlreadyRead ? 1 : 0.4}
                          className="transition-colors duration-300"
                        />
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="900"
                        >
                          #{s.id}
                        </text>
                        {isTargetFile && (
                          <text
                            x={cx}
                            y={cy + 7}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="7.5"
                            fontWeight="bold"
                            opacity="0.9"
                          >
                            Část {s.order}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Sektory na Stopě 1 (Vnitřní, r = 80) */}
                  {currentSectors.filter((s) => s.track === 1).map((s) => {
                    const angleRad = (s.angleIndex * 45 - 90) * (Math.PI / 180);
                    const cx = 80 * Math.cos(angleRad);
                    const cy = 80 * Math.sin(angleRad);
                    const isTargetFile = s.file === 'FILE';
                    const isReadingNow = currentReadingId === s.id;
                    const isAlreadyRead = readSectorIds.includes(s.id);

                    return (
                      <g key={s.id}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="14"
                          fill={
                            isReadingNow 
                              ? '#f59e0b' 
                              : isAlreadyRead 
                                ? '#10b981' 
                                : isTargetFile 
                                  ? (mode === 'fragmented' ? '#ef4444' : '#0ea5e9')
                                  : '#334155'
                          }
                          stroke={isReadingNow ? '#ffffff' : isTargetFile ? '#ffffff' : '#475569'}
                          strokeWidth={isReadingNow ? '3' : isTargetFile ? '2' : '1'}
                          opacity={isTargetFile || isAlreadyRead ? 1 : 0.4}
                          className="transition-colors duration-300"
                        />
                        <text
                          x={cx}
                          y={cy - 1}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="8"
                          fontWeight="900"
                        >
                          #{s.id}
                        </text>
                        {isTargetFile && (
                          <text
                            x={cx}
                            y={cy + 6}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="6.5"
                            fontWeight="bold"
                            opacity="0.9"
                          >
                            Část {s.order}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* 2. STATICKÝ STŘED DISKU (Spindle motor) */}
                <circle cx="0" cy="0" r="38" fill="url(#spindleGrad)" stroke="#1e293b" strokeWidth="2" />
                <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="0" cy="0" r="4" fill="#f8fafc" />

                {/* 3. MECHANICKÉ ČTECÍ RAMÉNKO (Actuator Arm) - PŘESKAKUJE MEZI STOPAMI */}
                {/* Čep v rohu (-150, -150) */}
                <g>
                  {/* Základna motoru raménka */}
                  <circle cx="-150" cy="-150" r="18" fill="#475569" stroke="#1e293b" strokeWidth="3" />
                  <circle cx="-150" cy="-150" r="7" fill="#cbd5e1" />

                  {/* Samotné raménko mířící k hornímu bodu hlavy */}
                  {/* Stopa 0: hrot na (0, -130). Stopa 1: hrot na (0, -80) */}
                  <path
                    d={
                      activeTrack === 0
                        ? "M -150 -150 L -45 -125 L 0 -130"
                        : "M -150 -150 L -45 -75 L 0 -80"
                    }
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Čtecí hlavička (hrot čidla) */}
                  <circle
                    cx="0"
                    cy={activeTrack === 0 ? -130 : -80}
                    r="7"
                    fill={mechPhase === 'reading' ? '#f59e0b' : '#ef4444'}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className={`transition-all duration-500 ${mechPhase === 'reading' ? 'animate-ping' : ''}`}
                  />
                  <circle
                    cx="0"
                    cy={activeTrack === 0 ? -130 : -80}
                    r="4"
                    fill="#ffffff"
                    className="transition-all duration-500"
                  />
                </g>
              </svg>
            </div>

            {/* Vysvětlující popisek pod plotnou */}
            <div className="w-full mt-4 p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              Čtecí hlava je umístěna <strong>nahoře (na pozici 12 hodin)</strong>. Plotna se otáčí, dokud požadovaný sektor nedorazí přímo pod její hrot.
            </div>
          </div>

          {/* PRAVÁ ČÁST: Srovnávací přehled a počítadla (5 sloupců) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Karta: Činnost mechaniky při čtení */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-5">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Disc className="w-5 h-5 text-indigo-600" />
                Mechanika při čtení souboru
              </h3>

              {/* Ukazatele akcí */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* 1. Přeskoky hlavy (Seek) */}
                <div className={`p-4 rounded-2xl border-2 transition-all ${
                  mode === 'fragmented' 
                    ? 'bg-rose-50 border-rose-200 text-rose-950' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1 opacity-80">
                    <Zap className="w-3.5 h-3.5" /> Přeskoky hlavy
                  </div>
                  <div className="text-3xl font-black">
                    {mode === 'fragmented' ? `${headJumpsCount}×` : '0×'}
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5">
                    {mode === 'fragmented' ? 'Přejezdy mezi stopami' : 'Hlava leží na jedné stopě'}
                  </div>
                </div>

                {/* 2. Čekání na dotočení (Rotace) */}
                <div className={`p-4 rounded-2xl border-2 transition-all ${
                  mode === 'fragmented' 
                    ? 'bg-amber-50 border-amber-200 text-amber-950' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1 opacity-80">
                    <RefreshCcw className="w-3.5 h-3.5" /> Čekání na sektor
                  </div>
                  <div className="text-3xl font-black">
                    {mode === 'fragmented' ? `${waitingCount}×` : '0×'}
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5">
                    {mode === 'fragmented' ? 'Opakované protáčení plotny' : 'Sektory navazují ihned za sebou'}
                  </div>
                </div>

              </div>

              {/* Stav načtených sektorů */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                  <span>Průběh čtení (Soubor: 4 bloky)</span>
                  <span className="font-mono text-indigo-600">{readSectorIds.length} / 4 načteno</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((order) => {
                    const block = currentSectors.find((s) => s.file === 'FILE' && s.order === order);
                    const isRead = block ? readSectorIds.includes(block.id) : false;
                    const isCurrent = block ? currentReadingId === block.id : false;

                    return (
                      <div
                        key={order}
                        className={`p-2 rounded-xl text-center border font-mono transition-all ${
                          isCurrent
                            ? 'bg-amber-400 text-amber-950 border-amber-500 font-black ring-2 ring-amber-300 scale-105'
                            : isRead
                              ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                              : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <div className="text-[9px] uppercase font-sans">Část {order}</div>
                        <div className="text-xs font-black">#{block?.id}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Karta: Hlavní ponaučení */}
            <div className={`p-5 rounded-3xl border-2 transition-all ${
              mode === 'fragmented' 
                ? 'bg-rose-50 border-rose-200 text-rose-900' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <h4 className="font-black text-sm uppercase tracking-wide flex items-center gap-2 mb-2">
                {mode === 'fragmented' ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Problém: Fragmentovaný disk
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Výsledek: Defragmentovaný disk
                  </>
                )}
              </h4>
              <p className="text-xs leading-relaxed">
                {mode === 'fragmented' ? (
                  <>
                    Kousky souboru jsou rozházené po různých stopách. Mechanické raménko musí neustále <strong>přeskakovat sem a tam</strong> a plotna se musí <strong>protáčet naprázdno</strong>, než sektor dorazí pod hlavu. Disk hlasitě „hrabe“ a čtení trvá dlouho.
                  </>
                ) : (
                  <>
                    Defragmentace srovnala všechny části souboru <strong>těsně za sebe na jedinou stopu</strong>. Raménko se nastaví jednou a jak se plotna plynule otáčí, přečte všechny sektory na jedno otočení bez čekání.
                  </>
                )}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
