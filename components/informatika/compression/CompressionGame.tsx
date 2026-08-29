
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RefreshCcw, Trophy, HelpCircle, ChevronRight, Minimize2, LayoutGrid } from 'lucide-react';

type Grid = number[][]; // 0 = bílá, 1 = černá

interface Level {
  name: string;
  sourceSize: number; // 10, 12, 14, 16, 18
  sourceData: Grid;
}

// Pomocná funkce pro vytvoření prázdné mřížky
const createEmptyGrid = (size: number): Grid => Array(size).fill(0).map(() => Array(size).fill(0));

const LEVELS: Level[] = [
  {
    name: "Úroveň 1: Písmeno A",
    sourceSize: 10,
    sourceData: [
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: "Úroveň 2: Srdce",
    sourceSize: 12,
    sourceData: [
      [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: "Úroveň 3: Veselá tvář",
    sourceSize: 14,
    sourceData: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: "Úroveň 4: Strom",
    sourceSize: 16,
    sourceData: [
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: "Úroveň 5: Mimozemšťan",
    sourceSize: 18,
    sourceData: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }
];

interface CompressionGameProps {
  onBack: () => void;
  onStartCustom: () => void;
}

const CompressionGame: React.FC<CompressionGameProps> = ({ onBack, onStartCustom }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [userGrid, setUserGrid] = useState<Grid>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'wrong' | 'correct'>('none');

  const level = LEVELS[currentLevelIdx];
  const compressedSize = level.sourceSize / 2;

  useEffect(() => {
    const emptyGrid = createEmptyGrid(compressedSize);
    setUserGrid(emptyGrid);
    setIsFinished(false);
    setFeedback('none');
  }, [currentLevelIdx, compressedSize]);

  const targetGrid = useMemo(() => {
    const target: Grid = createEmptyGrid(compressedSize);
    for (let r = 0; r < compressedSize; r++) {
      for (let c = 0; c < compressedSize; c++) {
        let blackCount = 0;
        for (let dr = 0; dr < 2; dr++) {
          for (let dc = 0; dc < 2; dc++) {
            if (level.sourceData[r * 2 + dr][c * 2 + dc] === 1) blackCount++;
          }
        }
        target[r][c] = blackCount >= 2 ? 1 : 0;
      }
    }
    return target;
  }, [level, compressedSize]);

  const handleCellClick = (r: number, c: number) => {
    if (isFinished) return;
    setFeedback('none');
    const newGrid = userGrid.map((row, ri) => 
      row.map((cell, ci) => ri === r && ci === c ? (cell === 0 ? 1 : 0) : cell)
    );
    setUserGrid(newGrid);
  };

  const checkAnswer = () => {
    let correct = true;
    for (let r = 0; r < compressedSize; r++) {
      for (let c = 0; c < compressedSize; c++) {
        if (userGrid[r][c] !== targetGrid[r][c]) {
          correct = false;
          break;
        }
      }
    }

    if (correct) {
      setFeedback('correct');
      if (currentLevelIdx < LEVELS.length - 1) {
        setIsFinished(true);
      } else {
        setShowWin(true);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1500);
    }
  };

  const nextLevel = () => {
    setCurrentLevelIdx(prev => prev + 1);
  };

  const selectLevel = (idx: number) => {
    setCurrentLevelIdx(idx);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      {/* Hlavní lišta úloh */}
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-emerald-600 transition-colors font-black uppercase text-xs tracking-widest shrink-0"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>

        <div className="flex flex-wrap justify-center gap-3">
          {LEVELS.map((l, idx) => (
            <button
              key={idx}
              onClick={() => selectLevel(idx)}
              className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                currentLevelIdx === idx 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105' 
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              Úroveň {idx + 1}
              <span className="block text-[8px] opacity-60 mt-1">{l.sourceSize}x{l.sourceSize}</span>
            </button>
          ))}
          
          <button
            onClick={onStartCustom}
            className="px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all bg-blue-50 text-blue-600 hover:bg-blue-100 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center"
          >
            Vlastní
            <span className="block text-[8px] opacity-60 mt-1">18x18</span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#cst</div></button>
        </div>

        <div className="text-right hidden md:block">
           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Postup</p>
           <p className="text-xl font-black text-gray-800 tracking-tighter">{currentLevelIdx + 1} / {LEVELS.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
        {/* Zdrojová mřížka */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
               <div className="w-3 h-6 bg-emerald-500 rounded-full"></div>
               Vstupní data ({level.sourceSize}x{level.sourceSize})
            </h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Originál</span>
          </div>

          <div 
            className="grid gap-px bg-gray-200 border-2 border-gray-200 rounded-2xl overflow-hidden shadow-inner w-full"
            style={{ 
              gridTemplateColumns: `repeat(${level.sourceSize}, 1fr)`,
              maxWidth: '450px',
              aspectRatio: '1/1'
            }}
          >
            {level.sourceData.map((row, r) => (
              row.map((cell, c) => (
                <div 
                  key={`${r}-${c}`}
                  className={`w-full h-full ${cell === 1 ? 'bg-gray-800' : 'bg-white'}`}
                  style={{
                    // Vizuální zvýraznění 2x2 bloků pomocí silnějších červených čar
                    borderRight: (c % 2 === 1 && c !== level.sourceSize - 1) ? '2px solid #ef4444' : (c !== level.sourceSize - 1 ? '1px solid #f1f5f9' : 'none'),
                    borderBottom: (r % 2 === 1 && r !== level.sourceSize - 1) ? '2px solid #ef4444' : (r !== level.sourceSize - 1 ? '1px solid #f1f5f9' : 'none')
                  }}
                ></div>
              ))
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-emerald-900 font-black uppercase tracking-tight mb-1">Jak na to?</p>
              <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                Každý čtverec ohraničený <strong>červenou linkou</strong> vlevo nahraď jedním pixelem vpravo. 
                Pokud jsou v tomto 2x2 bloku <strong>aspoň 2 černé pixely</strong>, vybarvi výsledný pixel vpravo černě.
              </p>
            </div>
          </div>
        </div>

        {/* Komprimovaná mřížka */}
        <div className={`bg-white p-8 rounded-[3rem] shadow-xl border-4 transition-all duration-300 flex flex-col items-center ${
          feedback === 'correct' ? 'border-emerald-500 ring-8 ring-emerald-50' : 
          feedback === 'wrong' ? 'border-red-400 ring-8 ring-red-50' : 'border-emerald-100'
        }`}>
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
               <div className="w-3 h-6 bg-emerald-500 rounded-full"></div>
               Komprimováno ({compressedSize}x{compressedSize})
            </h3>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Tvoje práce</span>
          </div>

          <div 
            className="grid gap-1.5 bg-emerald-50 border-4 border-emerald-50 rounded-3xl overflow-hidden shadow-lg w-full"
            style={{ 
              gridTemplateColumns: `repeat(${compressedSize}, 1fr)`,
              maxWidth: '450px',
              aspectRatio: '1/1'
            }}
          >
            {userGrid.map((row, r) => (
              row.map((cell, c) => (
                <button 
                  key={`comp-${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-full h-full transition-all duration-200 rounded-lg shadow-sm ${
                    cell === 1 ? 'bg-gray-800 scale-95' : 'bg-white hover:bg-emerald-100 hover:scale-105'
                  }`}
                ></button>
              ))
            ))}
          </div>
          
          <div className="mt-10 w-full flex flex-col gap-4">
             {isFinished ? (
               <button 
                 onClick={nextLevel}
                 className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[2rem] shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
               >
                 Pokračovat na další úroveň <ChevronRight className="w-5 h-5" />
               </button>
             ) : (
               <button 
                 onClick={checkAnswer}
                 disabled={feedback === 'wrong'}
                 className={`w-full py-6 font-black rounded-[2rem] shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${
                    feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-900 hover:bg-black text-white'
                 }`}
               >
                 {feedback === 'wrong' ? 'Zkus to znovu!' : (
                   <>
                     <Minimize2 className="w-5 h-5" />
                     Zkontrolovat kompresi
                   </>
                 )}
               </button>
             )}
             
             <div className="flex gap-4">
                <button 
                  onClick={() => setUserGrid(createEmptyGrid(compressedSize))}
                  className="flex-1 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-emerald-600 transition-colors flex items-center justify-center gap-2 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <RefreshCcw className="w-3 h-3" /> Vyčistit
                </button>
             </div>
          </div>
        </div>
      </div>

      {showWin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="w-28 h-28 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl rotate-12">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-3 uppercase tracking-tighter">Mistr grafiky!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              Skvělá práce! Dokázal jsi zmenšit datovou náročnost všech obrázků při zachování jejich tvaru.
            </p>
            <button 
              onClick={onBack}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[2rem] shadow-xl shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
            >
              Zpět do menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressionGame;
