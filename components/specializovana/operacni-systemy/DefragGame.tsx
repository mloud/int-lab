import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, 
  HelpCircle, ArrowRight, ArrowUpDown, HardDrive, Play, Square, 
  Zap, Gauge, Timer, ChevronDown, ChevronUp, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DefragGameProps {
  onBack: () => void;
}

interface SectorInfo {
  id: number;
  file: string; // 'A', 'B', 'C', or 'FREE'
}

interface FileJumpDetail {
  fileKey: string;
  name: string;
  color: string;
  sectors: number[];
  jumps: { from: number; to: number; distance: number }[];
  fileSeekTime: number; // in ms
  isContiguous: boolean;
}

const DefragGame: React.FC<DefragGameProps> = ({ onBack }) => {
  const [sectors, setSectors] = useState<SectorInfo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [totalSeekTime, setTotalSeekTime] = useState<number>(0);
  const [totalJumps, setTotalJumps] = useState<number>(0);
  const [fileDetails, setFileDetails] = useState<FileJumpDetail[]>([]);
  const [isDefragmented, setIsDefragmented] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showFormula, setShowFormula] = useState<boolean>(true);
  const [moves, setMoves] = useState<number>(0);

  // Animace čtení hlavičkou HDD
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentHeadSector, setCurrentHeadSector] = useState<number | null>(null);
  const [simulationStepText, setSimulationStepText] = useState<string>('');
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Files data
  const files = {
    A: { name: 'foto.png', color: 'bg-emerald-500', borderColor: 'border-emerald-600', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', size: 3 },
    B: { name: 'hudba.mp3', color: 'bg-sky-500', borderColor: 'border-sky-600', textColor: 'text-sky-700', bgLight: 'bg-sky-50', size: 2 },
    C: { name: 'dokument.pdf', color: 'bg-orange-500', borderColor: 'border-orange-600', textColor: 'text-orange-700', bgLight: 'bg-orange-50', size: 4 },
    FREE: { name: 'Volno', color: 'bg-slate-100 border-2 border-slate-200', borderColor: 'border-slate-300', textColor: 'text-slate-400', bgLight: 'bg-slate-50', size: 7 },
  };

  // Initial fragmented state on HDD tracks
  const getInitialState = (): SectorInfo[] => [
    { id: 0, file: 'FREE' },
    { id: 1, file: 'A' },    // foto
    { id: 2, file: 'C' },    // dokument
    { id: 3, file: 'FREE' },
    { id: 4, file: 'B' },    // hudba
    { id: 5, file: 'FREE' },
    { id: 6, file: 'A' },    // foto
    { id: 7, file: 'C' },    // dokument
    { id: 8, file: 'FREE' },
    { id: 9, file: 'C' },    // dokument
    { id: 10, file: 'B' },   // hudba
    { id: 11, file: 'FREE' },
    { id: 12, file: 'A' },   // foto
    { id: 13, file: 'FREE' },
    { id: 14, file: 'C' },   // dokument
    { id: 15, file: 'FREE' },
  ];

  // Initialize
  useEffect(() => {
    resetGame();
    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, []);

  const resetGame = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setIsSimulating(false);
    setCurrentHeadSector(null);
    setSimulationStepText('');

    const start = getInitialState();
    setSectors(start);
    setSelectedId(null);
    setMoves(0);
    setFeedback(null);
    setIsDefragmented(false);
    calculateSeekMetrics(start, 0);
  };

  // Transparentní výpočet Seek Time:
  // Fyzikální model HDD:
  // Čtení sousedního sektoru (vzdálenost 1 stopa): sekvenční čtení, hlava nemusí přejet = 0 ms zpoždění.
  // Čtení nesousedního sektoru (skok > 1): mechanická hlava musí přejet = základní vystavení hlavy 4 ms + 1 ms za každou přeskočenou stopu.
  const calculateSeekMetrics = (currentSectors: SectorInfo[], currentMoves: number) => {
    const details: FileJumpDetail[] = [];
    let totalSeek = 0;
    let jumpsCount = 0;
    let allFilesContiguous = true;

    (['A', 'B', 'C'] as const).forEach((fileKey) => {
      const fileConfig = files[fileKey];
      const indices: number[] = [];
      currentSectors.forEach((s, idx) => {
        if (s.file === fileKey) indices.push(idx);
      });

      const jumps: { from: number; to: number; distance: number }[] = [];
      let fileSeek = 0;
      let isContiguous = true;

      for (let i = 0; i < indices.length - 1; i++) {
        const from = indices[i];
        const to = indices[i + 1];
        const distance = Math.abs(to - from);

        if (distance > 1) {
          isContiguous = false;
          allFilesContiguous = false;
          // Mechanický skok hlavy HDD: základní přejezd 4 ms + 1 ms za stopu
          const jumpTime = 4 + distance;
          fileSeek += jumpTime;
          jumpsCount++;
          jumps.push({ from, to, distance });
        } else {
          // Souvislé bloky: hlava pokračuje sekvenčně, skok = 0 ms
          jumps.push({ from, to, distance: 1 });
        }
      }

      totalSeek += fileSeek;
      details.push({
        fileKey,
        name: fileConfig.name,
        color: fileConfig.color,
        sectors: indices,
        jumps,
        fileSeekTime: fileSeek,
        isContiguous,
      });
    });

    setFileDetails(details);
    setTotalSeekTime(totalSeek);
    setTotalJumps(jumpsCount);

    if (allFilesContiguous) {
      setIsDefragmented(true);
      setFeedback({
        type: 'success',
        text: `Skvělá práce! Kompletně jsi defragmentoval pevný disk v ${currentMoves} krocích. Čtecí hlava HDD nyní přečte všechny soubory na jeden plynulý zátah bez mechanických přeskoků (Seek Time = 0 ms)!`,
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

      // Swap sector contents
      const newSectors = [...sectors];
      const tempFile = newSectors[selectedId].file;
      newSectors[selectedId].file = newSectors[id].file;
      newSectors[id].file = tempFile;

      setSectors(newSectors);
      setSelectedId(null);
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      calculateSeekMetrics(newSectors, nextMoves);
    }
  };

  // Simulace fyzického pohybu čtecí hlavičky HDD
  const runHeadSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Sekvence čtení souborů A, B, C
    const readSequence: { sector: number; file: string; isJump: boolean }[] = [];
    (['A', 'B', 'C'] as const).forEach((fileKey) => {
      const fileSectors = sectors
        .map((s, idx) => ({ id: idx, file: s.file }))
        .filter((s) => s.file === fileKey)
        .map((s) => s.id);

      fileSectors.forEach((secId, i) => {
        const isJump = i > 0 && Math.abs(secId - fileSectors[i - 1]) > 1;
        readSequence.push({ sector: secId, file: files[fileKey].name, isJump });
      });
    });

    let step = 0;
    const executeStep = () => {
      if (step >= readSequence.length) {
        setIsSimulating(false);
        setCurrentHeadSector(null);
        setSimulationStepText('Simulace dokončena. Všechny soubory byly načteny.');
        return;
      }

      const item = readSequence[step];
      setCurrentHeadSector(item.sector);
      setSimulationStepText(
        item.isJump
          ? `⚠️ Mechanický skok hlavy na sektor #${item.sector} (${item.file}) — dochází ke zpoždění (Seek Time)!`
          : `✅ Sekvenční čtení sektoru #${item.sector} (${item.file}) — plynulé bez zpoždění.`
      );

      const delay = item.isJump ? 900 : 400;
      step++;
      simulationTimerRef.current = setTimeout(executeStep, delay);
    };

    executeStep();
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
            <RefreshCcw className="w-4 h-4" /> Restartovat disk
          </button>
        </div>
      </div>

      {/* Hlavní skleněná karta modulu */}
      <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border-4 border-white">
        
        {/* Hlavička: Pevný disk HDD vs SSD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm shrink-0">
              <HardDrive className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Mechanický pevný disk (HDD)
                </span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Fyzické stopy & sektory
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mt-1">
                Defragmentace HDD & Seek Time
              </h1>
            </div>
          </div>

          {/* Srovnání HDD vs SSD Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:px-4 flex items-center gap-3 text-xs font-medium text-slate-600 max-w-md">
            <Info className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <strong className="text-slate-800">Proč defragmentujeme HDD a NE SSD?</strong>
              <p className="text-[11px] leading-relaxed text-slate-500 mt-0.5">
                HDD má mechanické raménko a rotující plotny (přejezdy = zpoždění). SSD má nulový seek time a defragmentace by mu jen ničila paměťové buňky!
              </p>
            </div>
          </div>
        </div>

        {/* Instrukce k úkolu */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 text-amber-950 text-sm leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold">
              Úkol: Přeuspořádejte sektory na magnetické plotně tak, aby byl každý soubor uložen v jedné souvislé řadě za sebou.
            </p>
            <p className="text-xs text-amber-800/80 mt-1">
              Klikněte na libovolný sektor a poté na druhý sektor, čímž prohodíte jejich obsah. Sledujte, jak s každým sceleným blokem klesá mechanický Seek Time čtecí hlavy.
            </p>
          </div>
          <button
            onClick={runHeadSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {isSimulating ? 'Probíhá čtení...' : 'Otestovat čtení HDD'}
          </button>
        </div>

        {/* Stav simulace čtecí hlavy (pokud běží) */}
        {isSimulating && (
          <div className="mb-6 p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 flex items-center gap-3 animate-pulse">
            <Timer className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{simulationStepText}</span>
          </div>
        )}

        {/* Hlavní grid: Vizuál HDD + Výpočet Seek Time */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEVÝ PANEL (7 sloupců): Vizuál magnetické plotny a stopy HDD */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border-4 border-slate-800 relative overflow-hidden">
              
              {/* HDD hlavička v rámečku */}
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-black text-xs uppercase tracking-wider text-slate-300">
                    Magnetická stopa disku (Sektory #0 až #15)
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                  Rychlost: 7 200 RPM
                </span>
              </div>

              {/* Grid sektorů ve stylu fyzického HDD povrchu */}
              <div className="grid grid-cols-4 gap-3.5 sm:gap-4 max-w-lg mx-auto">
                {sectors.map((s) => {
                  const isSelected = selectedId === s.id;
                  const isHeadHere = currentHeadSector === s.id;
                  const isFree = s.file === 'FREE';
                  const fileData = files[s.file as keyof typeof files];

                  let sectorBg = isFree ? 'bg-slate-800/80 text-slate-500 border-slate-700/80' : `${fileData.color} text-white border-white/20`;
                  let ringEffect = '';

                  if (isSelected) {
                    ringEffect = 'ring-4 ring-amber-400 scale-105 z-10';
                  }

                  if (isHeadHere) {
                    ringEffect = 'ring-4 ring-rose-500 scale-110 z-20 shadow-2xl shadow-rose-500/50';
                  }

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSectorClick(s.id)}
                      disabled={isSimulating}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all aspect-square select-none shadow-md ${sectorBg} ${ringEffect} hover:scale-105 active:scale-95 disabled:cursor-not-allowed`}
                    >
                      {/* Číslo sektoru (stopy) */}
                      <span className="text-[10px] font-mono font-bold absolute top-1.5 left-2 opacity-60">
                        #{s.id}
                      </span>

                      {/* Ikona čtecí hlavy, pokud je na tomto sektoru */}
                      {isHeadHere && (
                        <span className="absolute -top-3.5 -right-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-white animate-bounce flex items-center gap-0.5">
                          HLAVA
                        </span>
                      )}

                      {/* Označení souboru */}
                      {!isFree ? (
                        <>
                          <span className="text-xl font-black">{s.file}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider opacity-90 truncate max-w-[90%] mt-0.5">
                            {s.file === 'A' ? 'Foto' : s.file === 'B' ? 'Hudba' : 'PDF'}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Volno
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Spodní lišta HDD šasi */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span> Kliknutím na 2 sektory je prohodíte
                </span>
                <span className="font-mono text-slate-300 font-bold">
                  Tahů: {moves}
                </span>
              </div>
            </div>

            {/* Legenda barev souborů */}
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

          {/* PRAVÝ PANEL (5 sloupců): Transparentní výpočet Seek Time */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Metrika Seek Time s tachometrem */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-black text-xs text-slate-400 uppercase tracking-widest block">
                    Mechanické zpoždění hlavy
                  </span>
                  <div className="text-4xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
                    {totalSeekTime} <span className="text-base text-slate-400 font-bold">ms</span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider ${
                  totalSeekTime === 0 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : totalSeekTime < 15 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {totalSeekTime === 0 ? 'Ideální (0 ms)' : `${totalJumps} mechanických skoků`}
                </div>
              </div>

              {/* Vizuální progress bar */}
              <div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      totalSeekTime === 0 
                        ? 'bg-emerald-500' 
                        : totalSeekTime < 15 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(6, Math.min(100, ((35 - totalSeekTime) / 35) * 100))}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">
                  <span>Fragmentovaný (Pomalé HDD)</span>
                  <span>Defragmentovaný (Rychlé)</span>
                </div>
              </div>
            </div>

            {/* DETAILNÍ VYSVĚTLENÍ: Jak se Seek Time počítá */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-indigo-600" />
                  Jak se přesně Seek Time počítá?
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
                    Čtecí hlava HDD čte data souboru blok po bloku:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-medium text-slate-700">
                    <li>
                      <strong>Sousední sektory (vzdálenost 1):</strong> Hlava pokračuje plynule bez přejíždění = <strong>0 ms</strong>.
                    </li>
                    <li>
                      <strong>Nesouvislé sektory (skok):</strong> Hlava musí přejet přes plotnu = <strong>základní mechanický skok (4 ms) + vzdálenost stop (1 ms/sektor)</strong>.
                    </li>
                  </ul>
                </div>
              )}

              {/* Živá tabulka skoků soubor po souboru */}
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
                        {f.isContiguous ? 'Souvislý (0 ms)' : `+${f.fileSeekTime} ms zpoždění`}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono">
                      Pozice sektorů: [{f.sectors.map((s) => `#${s}`).join(', ')}]
                    </div>

                    {/* Rozpis skoků */}
                    {!f.isContiguous && f.jumps.filter(j => j.distance > 1).length > 0 && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                        {f.jumps.filter(j => j.distance > 1).map((jump, idx) => (
                          <div key={idx} className="flex justify-between text-rose-600 font-medium">
                            <span>Skok z #{jump.from} na #{jump.to} ({jump.distance} stop):</span>
                            <span className="font-bold">+{4 + jump.distance} ms</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Součtový vzorec */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs flex justify-between items-center font-bold text-indigo-900">
                <span>Celkový součet Seek Time:</span>
                <span className="text-sm font-black font-mono">{totalSeekTime} ms</span>
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
                  onClick={runHeadSimulation}
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
