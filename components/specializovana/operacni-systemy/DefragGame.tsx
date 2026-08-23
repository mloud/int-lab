import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, HelpCircle, ArrowRight, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DefragGameProps {
  onBack: () => void;
}

interface SectorInfo {
  id: number;
  file: string; // 'A', 'B', 'C', or 'FREE'
}

const DefragGame: React.FC<DefragGameProps> = ({ onBack }) => {
  const [sectors, setSectors] = useState<SectorInfo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [isDefragmented, setIsDefragmented] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  // Files data
  const files = {
    A: { name: 'foto.png', color: 'bg-emerald-500', textColor: 'text-emerald-600', size: 3 },
    B: { name: 'hudba.mp3', color: 'bg-sky-500', textColor: 'text-sky-600', size: 2 },
    C: { name: 'dokument.pdf', color: 'bg-orange-500', textColor: 'text-orange-600', size: 4 },
    FREE: { name: 'Volno', color: 'bg-white border-2 border-gray-100', textColor: 'text-gray-300', size: 7 },
  };

  // Initial fragmented state
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
  }, []);

  const resetGame = () => {
    const start = getInitialState();
    setSectors(start);
    setSelectedId(null);
    setMoves(0);
    setFeedback(null);
    setIsDefragmented(false);
    calculateSeekTime(start);
  };

  // Calculate seek time: sum of distances between consecutive file sectors
  const calculateSeekTime = (currentSectors: SectorInfo[]) => {
    let totalDist = 0;

    ['A', 'B', 'C'].forEach((fileName) => {
      // Find all sector indices for this file
      const indices: number[] = [];
      currentSectors.forEach((s, idx) => {
        if (s.file === fileName) indices.push(idx);
      });

      // Calculate distances between consecutive sectors
      let fileDist = 0;
      for (let i = 0; i < indices.length - 1; i++) {
        fileDist += Math.abs(indices[i + 1] - indices[i]);
      }
      totalDist += fileDist;
    });

    setSeekTime(totalDist);

    // If total distance is minimal (meaning all files are contiguous, e.g. distance = 1+1 = 2 for A, 1 for B, 1+1+1 = 3 for C. Ideal sum = 6)
    // Let's also check if files are actually contiguous.
    const isContiguous = checkContiguity(currentSectors);
    if (isContiguous) {
      setIsDefragmented(true);
      setFeedback({
        type: 'success',
        text: `Úžasné! Kompletně jsi defragmentoval disk v ${moves + 1} krocích. Seek time čtecí hlavy klesl na minimum!`,
      });
    }
  };

  const checkContiguity = (currentSectors: SectorInfo[]): boolean => {
    let contiguous = true;
    ['A', 'B', 'C'].forEach((fileName) => {
      const indices: number[] = [];
      currentSectors.forEach((s, idx) => {
        if (s.file === fileName) indices.push(idx);
      });

      // Check if indices are consecutive
      for (let i = 0; i < indices.length - 1; i++) {
        if (indices[i + 1] !== indices[i] + 1) {
          contiguous = false;
        }
      }
    });
    return contiguous;
  };

  const handleSectorClick = (id: number) => {
    if (isDefragmented) return;

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
      setMoves((prev) => prev + 1);
      calculateSeekTime(newSectors);
    }
  };

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-500 px-4">
      {/* Horní ovládací panel */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na rozcestník
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-3 bg-white hover:bg-gray-50 text-gray-600 rounded-2xl shadow-md border-2 border-gray-100 hover:scale-105 transition-transform"
            title="Nápověda k defragmentaci"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
          >
            <RefreshCcw className="w-4 h-4" /> Restartovat
          </button>
        </div>
      </div>

      {/* Nápověda */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 mb-6 text-amber-900 text-sm overflow-hidden shadow-inner"
          >
            <h3 className="font-extrabold text-base mb-2 uppercase tracking-wide flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" /> Co je to fragmentace a defragmentace disku?
            </h3>
            <p className="mb-2 leading-relaxed">
              Když na disk zapisujeme a mažeme soubory různých velikostí, vznikají v zaplnění disku mezery. Nové soubory se pak musí rozdělit a uložit do různých, nesouvislých volných mezer – dochází k <strong>fragmentaci</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><strong>Seek Time (Doba vystavení):</strong> Mechanická čtecí hlava HDD musí fyzicky přeskočit z jednoho sektoru na druhý. Pokud je soubor fragmentovaný, hlava neustále přejíždí sem a tam, což velmi zpomaluje čtení souboru.</li>
              <li><strong>Defragmentace:</strong> Proces, při kterém operační systém prohází sektory na disku tak, aby byly všechny části každého souboru uloženy v řadě za sebou (kontinuálně). Čtení pak proběhne na jeden plynulý zátah.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[3.5rem] shadow-2xl border-4 border-white">
        {/* Indikátor úkolu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 shadow-sm">
            <ArrowUpDown className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Údržba disku</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Defragmentace disku
            </h2>
          </div>
        </div>

        {/* Zadání */}
        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 mb-8 text-sm sm:text-base text-gray-700 font-medium">
          <p>
            Disk je silně fragmentovaný. Prohoď sektory tak, aby byly všechny části každého souboru **zapsány v jedné souvislé řadě za sebou**. 
          </p>
          <p className="mt-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            Klikni na jeden sektor a poté na druhý, čímž prohodíš jejich obsah. Sleduj, jak s klesající fragmentací klesá seek time čtecí hlavy!
          </p>
        </div>

        {/* Hlavní zobrazení hry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Levý panel: Seznam souborů a Seek Time (5 sloupců) */}
          <div className="md:col-span-5 space-y-6">
            {/* Seznam souborů */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-4">Fragmentované soubory</h3>
              <div className="space-y-3 font-semibold text-xs text-gray-700">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-lg bg-emerald-500"></span>
                    <span>foto.png</span>
                  </div>
                  <span className="text-gray-400">velikost 3 sektory</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-lg bg-sky-500"></span>
                    <span>hudba.mp3</span>
                  </div>
                  <span className="text-gray-400">velikost 2 sektory</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-lg bg-orange-500"></span>
                    <span>dokument.pdf</span>
                  </div>
                  <span className="text-gray-400">velikost 4 sektory</span>
                </div>
              </div>
            </div>

            {/* Seek time a info */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-black text-xs text-gray-400 uppercase tracking-widest">Seek Distance</span>
                <span className="text-3xl font-black text-slate-800">{seekTime} <span className="text-xs text-gray-400 uppercase tracking-wider">sektorů</span></span>
              </div>

              {/* Progress bar seek time (čím nižší, tím lepší) */}
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
                {/* target distance is 6. Initial distance is 29 */}
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    seekTime <= 6 ? 'bg-emerald-500' : seekTime < 15 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.max(5, Math.min(100, ((30 - seekTime) / 24) * 100))}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <span>Fragmentovaný (Špatný)</span>
                <span>Defragmentovaný (Ideální)</span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between text-xs font-bold text-gray-500">
                <span>Počet tahů:</span>
                <span className="text-slate-800 font-black">{moves}</span>
              </div>
            </div>
          </div>

          {/* Pravý panel: Grid sektorů (7 sloupců) */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm flex flex-col items-center w-full">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-6 w-full text-left">
                Diskové sektory
              </h3>

              {/* 4x4 Grid */}
              <div className="grid grid-cols-4 gap-4 w-full max-w-[320px] aspect-square">
                {sectors.map((s) => {
                  const isSelected = selectedId === s.id;
                  const isFree = s.file === 'FREE';
                  const fileData = files[s.file as keyof typeof files];

                  let borderClass = 'border-gray-200';
                  let bgClass = fileData.color;
                  let textClass = isFree ? 'text-gray-300 font-medium' : 'text-white font-black';

                  if (isSelected) {
                    borderClass = 'border-purple-600 ring-4 ring-purple-100 scale-105';
                  }

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSectorClick(s.id)}
                      className={`relative flex flex-col items-center justify-center border-4 rounded-3xl transition-all text-base shadow-md select-none aspect-square ${borderClass} ${bgClass} ${textClass} hover:scale-105 active:scale-95`}
                    >
                      <span className="text-xs absolute top-1 left-2 opacity-50">{s.id}</span>
                      
                      {!isFree && (
                        <span className="text-lg font-black">{s.file}</span>
                      )}
                      
                      {!isFree && (
                        <span className="text-[8px] uppercase tracking-widest opacity-80 absolute bottom-1 truncate max-w-[90%] font-bold">
                          {s.file === 'A' ? 'Foto' : s.file === 'B' ? 'Hudba' : 'Dokum.'}
                        </span>
                      )}

                      {isFree && (
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Volno</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Zpětná vazba a tlačítko pokračovat */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-900 shadow-lg shadow-emerald-50 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <Trophy className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm sm:text-base leading-relaxed">{feedback.text}</p>
              </div>

              <button
                onClick={onBack}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
              >
                Zpět na rozcestník
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DefragGame;
