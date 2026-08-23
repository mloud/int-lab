
import React, { useState, useMemo } from 'react';
import { ArrowLeft, RefreshCcw, CheckCircle2, HelpCircle, Save, Edit3, Minimize2 } from 'lucide-react';

type Grid = number[][];

interface CustomCompressionProps {
  onBack: () => void;
}

const createEmptyGrid = (size: number): Grid => Array(size).fill(0).map(() => Array(size).fill(0));

const CustomCompression: React.FC<CustomCompressionProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'drawing' | 'compressing'>('drawing');
  const [sourceGrid, setSourceGrid] = useState<Grid>(createEmptyGrid(18));
  const [userGrid, setUserGrid] = useState<Grid>(createEmptyGrid(9));
  const [feedback, setFeedback] = useState<'none' | 'wrong' | 'correct'>('none');
  const [showResult, setShowResult] = useState(false);

  const targetGrid = useMemo(() => {
    const target: Grid = createEmptyGrid(9);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        let blackCount = 0;
        for (let dr = 0; dr < 2; dr++) {
          for (let dc = 0; dc < 2; dc++) {
            if (sourceGrid[r * 2 + dr][c * 2 + dc] === 1) blackCount++;
          }
        }
        target[r][c] = blackCount >= 2 ? 1 : 0;
      }
    }
    return target;
  }, [sourceGrid]);

  const handleSourceClick = (r: number, c: number) => {
    if (mode !== 'drawing') return;
    const newGrid = sourceGrid.map((row, ri) => 
      row.map((cell, ci) => ri === r && ci === c ? (cell === 0 ? 1 : 0) : cell)
    );
    setSourceGrid(newGrid);
  };

  const handleUserClick = (r: number, c: number) => {
    if (mode !== 'compressing' || showResult) return;
    setFeedback('none');
    const newGrid = userGrid.map((row, ri) => 
      row.map((cell, ci) => ri === r && ci === c ? (cell === 0 ? 1 : 0) : cell)
    );
    setUserGrid(newGrid);
  };

  const checkAnswer = () => {
    let correct = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (userGrid[r][c] !== targetGrid[r][c]) {
          correct = false;
          break;
        }
      }
    }

    if (correct) {
      setFeedback('correct');
      setShowResult(true);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1500);
    }
  };

  const reset = () => {
    if (mode === 'drawing') {
      setSourceGrid(createEmptyGrid(18));
    } else {
      setUserGrid(createEmptyGrid(9));
      setShowResult(false);
      setFeedback('none');
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-emerald-600 transition-colors font-black uppercase text-xs tracking-widest shrink-0"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>

        <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-2">
          <button
            onClick={() => {
              setMode('drawing');
              setShowResult(false);
              setFeedback('none');
            }}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              mode === 'drawing' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Edit3 className="w-4 h-4" /> 1. Nakresli (18x18)
          </button>
          <button
            onClick={() => setMode('compressing')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              mode === 'compressing' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Minimize2 className="w-4 h-4" /> 2. Zkomprimuj (9x9)
          </button>
        </div>

        <div className="text-right hidden md:block">
           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Režim</p>
           <p className="text-xl font-black text-gray-800 tracking-tighter">
             {mode === 'drawing' ? 'Kreslení' : 'Komprese'}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
        {/* Levá strana: Zdroj (18x18) */}
        <div className={`bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center transition-opacity ${mode === 'compressing' ? 'opacity-80' : 'opacity-100'}`}>
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
               <div className="w-3 h-6 bg-emerald-500 rounded-full"></div>
               Vlastní obrázek (18x18)
            </h3>
          </div>

          <div 
            className="grid gap-px bg-gray-200 border-2 border-gray-200 rounded-2xl overflow-hidden shadow-inner w-full"
            style={{ 
              gridTemplateColumns: `repeat(18, 1fr)`,
              maxWidth: '450px',
              aspectRatio: '1/1'
            }}
          >
            {sourceGrid.map((row, r) => (
              row.map((cell, c) => (
                <button 
                  key={`src-${r}-${c}`}
                  onClick={() => handleSourceClick(r, c)}
                  disabled={mode !== 'drawing'}
                  className={`w-full h-full transition-colors ${cell === 1 ? 'bg-gray-800' : 'bg-white hover:bg-emerald-50'}`}
                  style={{
                    borderRight: (c % 2 === 1 && c !== 17) ? '2px solid #ef4444' : 'none',
                    borderBottom: (r % 2 === 1 && r !== 17) ? '2px solid #ef4444' : 'none'
                  }}
                ></button>
              ))
            ))}
          </div>

          {mode === 'drawing' && (
            <div className="mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-start gap-4 w-full">
              <HelpCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-blue-900 font-black uppercase tracking-tight mb-1">Krok 1: Kreslení</p>
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  Klikáním do mřížky nakresli libovolný obrázek. Červené linky ti pomohou vidět 2x2 bloky, které se budou slučovat.
                </p>
                <button 
                  onClick={() => setMode('compressing')}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  Hotovo, jít na kompresi <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pravá strana: Komprese (9x9) */}
        <div className={`bg-white p-8 rounded-[3rem] shadow-xl border-4 transition-all duration-300 flex flex-col items-center ${
          mode === 'drawing' ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'
        } ${
          feedback === 'correct' ? 'border-emerald-500 ring-8 ring-emerald-50' : 
          feedback === 'wrong' ? 'border-red-400 ring-8 ring-red-50' : 'border-emerald-100'
        }`}>
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
               <div className="w-3 h-6 bg-emerald-500 rounded-full"></div>
               Tvoje komprese (9x9)
            </h3>
          </div>

          <div 
            className="grid gap-1.5 bg-emerald-50 border-4 border-emerald-50 rounded-3xl overflow-hidden shadow-lg w-full"
            style={{ 
              gridTemplateColumns: `repeat(9, 1fr)`,
              maxWidth: '450px',
              aspectRatio: '1/1'
            }}
          >
            {userGrid.map((row, r) => (
              row.map((cell, c) => (
                <button 
                  key={`comp-${r}-${c}`}
                  onClick={() => handleUserClick(r, c)}
                  disabled={mode !== 'compressing' || showResult}
                  className={`w-full h-full transition-all duration-200 rounded-lg shadow-sm ${
                    cell === 1 ? 'bg-gray-800 scale-95' : 'bg-white hover:bg-emerald-100 hover:scale-105'
                  }`}
                ></button>
              ))
            ))}
          </div>

          <div className="mt-10 w-full flex flex-col gap-4">
             {showResult ? (
               <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 text-center animate-in zoom-in duration-300">
                 <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                   <CheckCircle2 className="w-8 h-8 text-white" />
                 </div>
                 <p className="text-emerald-900 font-black uppercase tracking-tight mb-1">Výborně!</p>
                 <p className="text-emerald-800 text-xs font-medium">Tvoje komprese je 100% správná.</p>
                 <button 
                   onClick={() => {
                     setMode('drawing');
                     setShowResult(false);
                     setFeedback('none');
                   }}
                   className="mt-4 w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all"
                 >
                   Zkusit jiný obrázek
                 </button>
               </div>
             ) : (
               <button 
                 onClick={checkAnswer}
                 disabled={mode !== 'compressing' || feedback === 'wrong'}
                 className={`w-full py-6 font-black rounded-[2rem] shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${
                    feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-900 hover:bg-black text-white'
                 }`}
               >
                 {feedback === 'wrong' ? 'Někde je chyba!' : (
                   <>
                     <Minimize2 className="w-5 h-5" />
                     Zkontrolovat výsledek
                   </>
                 )}
               </button>
             )}
             
             <button 
               onClick={reset}
               className="w-full py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-emerald-600 transition-colors flex items-center justify-center gap-2 bg-gray-50 rounded-2xl border border-gray-100"
             >
               <RefreshCcw className="w-3 h-3" /> Vyčistit mřížku
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCompression;
