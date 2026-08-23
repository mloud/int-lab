import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AllocationGameProps {
  onBack: () => void;
}

type LevelId = 1 | 2 | 3;

interface FileAllocationState {
  id: number;
  status: 'occupied' | 'free' | 'selected' | 'incorrect';
  owner?: string;
}

const AllocationGame: React.FC<AllocationGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<LevelId>(1);
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // --- DISK SETUPS FOR EACH LEVEL ---

  // LEVEL 1: First Fit. File size 3. Gaps: [1-2] (size 2), [5-8] (size 4), [11-13] (size 3)
  // First Fit scans from 0. 2 is too small. 4 fits (5,6,7,8). So correct sectors are: 5, 6, 7.
  const level1Sectors = (): FileAllocationState[] => {
    const list: FileAllocationState[] = Array.from({ length: 16 }, (_, i) => ({ id: i, status: 'occupied', owner: 'Systém' }));
    // Gaps
    list[1] = { id: 1, status: 'free' };
    list[2] = { id: 2, status: 'free' };
    list[5] = { id: 5, status: 'free' };
    list[6] = { id: 6, status: 'free' };
    list[7] = { id: 7, status: 'free' };
    list[8] = { id: 8, status: 'free' };
    list[11] = { id: 11, status: 'free' };
    list[12] = { id: 12, status: 'free' };
    list[13] = { id: 13, status: 'free' };
    return list;
  };

  // LEVEL 2: Best Fit. File size 3. Gaps: [1-2] (size 2), [5-8] (size 4), [11-13] (size 3)
  // Best Fit selects the smallest gap that is large enough. Gap [11-13] has size 3, fits perfectly (leftover 0).
  // So correct sectors are: 11, 12, 13.
  const level2Sectors = () => level1Sectors(); // same grid setup, different strategy and targets

  // LEVEL 3: Worst Fit. File size 2. Gaps: [1-2] (size 2), [5-8] (size 4), [11-13] (size 3)
  // Worst Fit selects the largest gap. Gap [5-8] has size 4, largest.
  // So correct sectors are: 5, 6. (Worst Fit fills from the start of the gap)
  const level3Sectors = () => level1Sectors();

  const getLevelSetup = () => {
    switch (level) {
      case 1:
        return {
          strategy: 'First Fit',
          fileToSave: 'video.mp4',
          fileSize: 3,
          sectors: level1Sectors(),
          targets: [5, 6, 7],
          explanation: 'First Fit prochází disk od začátku (od sektoru 0) a vybere první mezeru, která je dostatečně velká. Mezera 1-2 (velikost 2) je malá, proto vybere mezeru 5-8 (velikost 4) a zapíše soubor od jejího začátku na sektory 5, 6 a 7.',
        };
      case 2:
        return {
          strategy: 'Best Fit',
          fileToSave: 'fotka.jpg',
          fileSize: 3,
          sectors: level2Sectors(),
          targets: [11, 12, 13],
          explanation: 'Best Fit projde všechny volné mezery a vybere tu, do které se soubor vejde a která zanechá nejmenší zbytkový volný prostor (ideálně nulový). V tomto případě vybere mezeru 11-13 o velikosti přesně 3 sektory (sektory 11, 12, 13).',
        };
      case 3:
        return {
          strategy: 'hudba.mp3',
          strategyName: 'Worst Fit',
          fileToSave: 'hudba.mp3',
          fileSize: 2,
          sectors: level3Sectors(),
          targets: [5, 6],
          explanation: 'Worst Fit vybere tu největší dostupnou volnou mezeru, aby po uložení souboru zbyla co největší souvislá mezera pro další soubory. Největší mezerou je 5-8 o velikosti 4 sektory, soubor se zapíše na sektory 5 a 6, čímž zbydou sektory 7 a 8 volné.',
        };
    }
  };

  const { strategy, fileToSave, fileSize, sectors: initialSectors, targets, explanation } = getLevelSetup();

  const resetLevel = () => {
    setSelectedSectors([]);
    setFeedback(null);
    setIsCompleted(false);
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as LevelId);
      setSelectedSectors([]);
      setFeedback(null);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
      setFeedback({
        type: 'success',
        text: 'Skvělá práce! Zvládl jsi alokační strategie First Fit, Best Fit i Worst Fit!',
      });
    }
  };

  const handleSectorClick = (sectorId: number) => {
    if (isCompleted) return;

    // Pokud už je vybrán, zrušit výběr
    if (selectedSectors.includes(sectorId)) {
      setSelectedSectors(selectedSectors.filter((id) => id !== sectorId));
      setFeedback(null);
      return;
    }

    // Pokud je sektor plný, nic nedělat
    const s = initialSectors.find((sec) => sec.id === sectorId);
    if (s && s.status === 'occupied') return;

    // Přidat do výběru
    const newSelected = [...selectedSectors, sectorId].sort((a, b) => a - b);
    
    // Pokud máme dostatek vybraných sektorů, zkontrolujeme výsledek
    if (newSelected.length === fileSize) {
      const isCorrect = newSelected.every((val, idx) => val === targets[idx]);
      
      if (isCorrect) {
        setFeedback({
          type: 'success',
          text: `Výborně! Správně jsi alokoval soubor ${fileToSave} na sektorech: ${newSelected.join(', ')}. ${explanation}`,
        });
        setIsCompleted(true);
      } else {
        setFeedback({
          type: 'error',
          text: `Chyba. Tyto sektory neodpovídají strategii ${level === 3 ? 'Worst Fit' : strategy}. Zkus to znovu a zkontroluj si pravidla strategie.`,
        });
        setSelectedSectors(newSelected);
      }
    } else if (newSelected.length > fileSize) {
      // Pokud vybere více než je velikost souboru, resetovat na ten poslední kliknutý
      setSelectedSectors([sectorId]);
      setFeedback(null);
    } else {
      setSelectedSectors(newSelected);
      setFeedback(null);
    }
  };

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-500 px-4">
      {/* Horní panel */}
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
            title="Nápověda k alokačním strategiím"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={resetLevel}
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
            className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 mb-6 text-emerald-900 text-sm overflow-hidden shadow-inner"
          >
            <h3 className="font-extrabold text-base mb-2 uppercase tracking-wide flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" /> Alokační strategie volného místa
            </h3>
            <p className="mb-2 leading-relaxed font-semibold">
              Když operační systém ukládá nový soubor, musí na disku najít dostatek volného místa v mezerách, které zbyly po jiných smazaných souborech. Využívá k tomu různé algoritmy:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><strong>First Fit (První volná):</strong> Prochází disk od začátku a soubor uloží do první mezeru, do které se celý vejde. Je to nejrychlejší strategie, ale může vést k fragmentaci na začátku disku.</li>
              <li><strong>Best Fit (Nejlepší volná):</strong> Hledá takovou mezeru, která velikostně nejlépe odpovídá souboru. Cílem je minimalizovat zbývající volné místo v mezeře. Nevýhodou je, že vytváří spoustu miniaturních, nepoužitelných volných mezer (externí fragmentace).</li>
              <li><strong>Worst Fit (Nejhorší volná):</strong> Vybere největší volnou mezeru na disku. Tím se zaručí, že po zapsání souboru zbude v mezeře co nejvíce souvislého místa pro další soubory.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[3.5rem] shadow-2xl border-4 border-white">
        {/* Indikátor levelu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 shadow-sm font-black text-xl">
            FF
          </div>
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Strategie alokace (Úroveň {level}/3)</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {level === 1 && 'First Fit (První vhodná)'}
              {level === 2 && 'Best Fit (Nejvhodnější)'}
              {level === 3 && 'Worst Fit (Nejméně vhodná)'}
            </h2>
          </div>
        </div>

        {/* Zadání */}
        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 mb-8 text-sm sm:text-base text-gray-700 font-medium">
          <p>
            Ulož nový soubor <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{fileToSave}</span> o velikosti <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg">{fileSize} sektorů</span> na disk.
          </p>
          <p className="mt-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            Zvolená metoda alokace: <span className="text-purple-600 font-black">{level === 3 ? 'Worst Fit' : strategy}</span>. Klikni na vybrané sektory na disku.
          </p>
        </div>

        {/* Mřížka a vyhodnocení */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Levý panel: Informace o mezerách (4 sloupce) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-4">Volné mezery na disku</h3>
              <div className="space-y-3 font-semibold text-sm">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-gray-500">Mezera A (sektory 1-2):</span>
                  <span className="font-black text-slate-700">velikost 2 sektory</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-gray-500">Mezera B (sektory 5-8):</span>
                  <span className="font-black text-slate-700">velikost 4 sektory</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-gray-500">Mezera C (sektory 11-13):</span>
                  <span className="font-black text-slate-700">velikost 3 sektory</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 text-xs font-semibold text-gray-500 leading-relaxed">
              <h4 className="font-black text-gray-700 uppercase tracking-wider mb-2">Jak postupovat:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Najdi mezeru, která odpovídá vybranému pravidlu ({level === 3 ? 'Worst Fit' : strategy}).</li>
                <li>Označ v této mezeře požadovaný počet sektorů ({fileSize}) od jejího začátku.</li>
                <li>Po označení všech {fileSize} sektorů se tvůj výběr automaticky vyhodnotí.</li>
              </ol>
            </div>
          </div>

          {/* Pravý panel: Disková mřížka (7 sloupců) */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm flex flex-col items-center w-full">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-6 w-full text-left">
                Stav sektorů na disku
              </h3>

              {/* 4x4 Grid */}
              <div className="grid grid-cols-4 gap-4 w-full max-w-[320px] aspect-square">
                {initialSectors.map((s) => {
                  const isSelected = selectedSectors.includes(s.id);
                  const isOccupied = s.status === 'occupied';
                  
                  let borderClass = 'border-gray-200 hover:border-emerald-300';
                  let bgClass = 'bg-white hover:bg-slate-50';
                  let textClass = 'text-gray-700';

                  if (isOccupied) {
                    borderClass = 'border-gray-100';
                    bgClass = 'bg-gray-100/50 cursor-not-allowed';
                    textClass = 'text-gray-400';
                  } else if (isSelected) {
                    borderClass = 'border-emerald-500 ring-4 ring-emerald-100';
                    bgClass = 'bg-emerald-500';
                    textClass = 'text-white';
                  }

                  return (
                    <button
                      key={s.id}
                      disabled={isOccupied || isCompleted}
                      onClick={() => handleSectorClick(s.id)}
                      className={`relative flex flex-col items-center justify-center border-4 rounded-3xl transition-all font-black text-lg shadow-md select-none ${borderClass} ${bgClass} ${textClass} ${
                        isOccupied || isCompleted ? 'cursor-default' : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      <span>{s.id}</span>
                      
                      {isOccupied && (
                        <span className="absolute bottom-1 text-[8px] uppercase tracking-widest text-gray-400 font-bold">
                          {s.owner}
                        </span>
                      )}
                      
                      {isSelected && (
                        <span className="absolute bottom-1 text-[8px] uppercase tracking-widest text-emerald-100 font-bold">
                          Vybráno
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legenda */}
              <div className="flex gap-4 flex-wrap mt-6 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-gray-100 border border-gray-200 rounded-md"></span>
                  <span>Obsazený sektor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-white border border-gray-200 rounded-md"></span>
                  <span>Volný sektor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-emerald-500 rounded-md"></span>
                  <span>Tvůj výběr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zpětná vazba a pokračování */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-8 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 shadow-lg ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-emerald-50'
                  : 'bg-red-50 border-red-200 text-red-900 shadow-red-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  feedback.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {feedback.type === 'success' ? <Trophy className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <p className="font-bold text-sm sm:text-base leading-relaxed">{feedback.text}</p>
              </div>

              {feedback.type === 'success' && (
                <button
                  onClick={nextLevel}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  {level < 3 ? 'Pokračovat' : 'Dokončit hru'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllocationGame;
