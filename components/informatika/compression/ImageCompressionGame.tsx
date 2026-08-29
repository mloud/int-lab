import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RefreshCcw, ChevronRight, HelpCircle } from 'lucide-react';

interface ImageCompressionGameProps {
  onBack: () => void;
}

type Task0Phase = 'sandbox' | 'task1' | 'task2' | 'task3' | 'task4' | 'task5' | 'finished';

const ImageCompressionGame: React.FC<ImageCompressionGameProps> = ({ onBack }) => {
  // Task 0 State
  const [task0Phase, setTask0Phase] = useState<Task0Phase>('sandbox');
  const [grid, setGrid] = useState<number[]>([]);
  const [binaryInput, setBinaryInput] = useState<string>('');
  const [feedback, setFeedback] = useState<'none' | 'wrong' | 'correct'>('none');

  const createEmptyGrid = (size: number) => Array(size * size).fill(0);

  // Task 0 configurations
  const task0Configs = {
    sandbox: {
      title: 'Krok 1: Pískoviště (3x3 pixely)',
      description: 'Vyzkoušej si kreslení. Klikej na čtverečky a sleduj, jak se dole generuje binární kód. 0 = bílá, 1 = černá.',
      mode: 'draw' as const,
      gridSize: 3
    },
    task1: {
      title: 'Úloha 1: Nakresli čáru',
      description: 'Vybarvi pixely tak, aby odpovídaly zadanému kódu. (První řádek celý černý, zbytek bílý)',
      targetBinary: '11111' + '00000'.repeat(4),
      mode: 'draw' as const,
      gridSize: 5
    },
    task2: {
      title: 'Úloha 2: Šachovnice',
      description: 'Nakresli vzor podle binárního kódu. Vidíš ten opakující se rytmus?',
      targetBinary: '1010101010101010101010101',
      mode: 'draw' as const,
      gridSize: 5
    },
    task3: {
      title: 'Úloha 3: Zapiš kód smajlíka',
      description: 'Nyní to zkusíme naopak. Zapiš binární kód pro zobrazený obrázek.',
      targetGrid: [
        0,1,0,1,0,
        0,0,0,0,0,
        1,0,0,0,1,
        0,1,1,1,0,
        0,0,0,0,0
      ],
      mode: 'code' as const,
      gridSize: 5
    },
    task4: {
      title: 'Úloha 4: Písmeno X',
      description: 'Zapiš binární kód pro tento obrázek.',
      targetGrid: [
        1,0,0,0,1,
        0,1,0,1,0,
        0,0,1,0,0,
        0,1,0,1,0,
        1,0,0,0,1
      ],
      mode: 'code' as const,
      gridSize: 5
    },
    task5: {
      title: 'Úloha 5: Rámeček',
      description: 'Nakresli obrázek podle tohoto dlouhého kódu. Jde to i bez čtení každé nuly?',
      targetBinary: '1111110001100011000111111',
      mode: 'draw' as const,
      gridSize: 5
    }
  };

  const currentTask0 = task0Phase !== 'finished' ? task0Configs[task0Phase] : null;

  useEffect(() => {
    if (currentTask0) {
      setGrid(createEmptyGrid(currentTask0.gridSize));
    }
    setBinaryInput('');
    setFeedback('none');
  }, [task0Phase]);

  const togglePixel = (idx: number) => {
    if (currentTask0?.mode !== 'draw') return;
    setFeedback('none');
    const newGrid = [...grid];
    newGrid[idx] = newGrid[idx] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const getGridBinaryString = () => {
    return grid.join('');
  };

  const checkTask0 = () => {
    if (!currentTask0) return;
    
    let isCorrect = false;
    if (currentTask0.mode === 'draw') {
      isCorrect = getGridBinaryString() === (currentTask0.targetBinary || '');
    } else {
      const targetStr = currentTask0.targetGrid!.join('');
      // Odstraníme mezery z uživatelského vstupu pro kontrolu
      const cleanInput = binaryInput.replace(/\s/g, '');
      isCorrect = cleanInput === targetStr;
    }

    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 2000);
    }
  };

  const nextTask0Phase = () => {
    const phases: Task0Phase[] = ['sandbox', 'task1', 'task2', 'task3', 'task4', 'task5', 'finished'];
    const currIdx = phases.indexOf(task0Phase);
    if (currIdx < phases.length - 1) {
      setTask0Phase(phases[currIdx + 1]);
    }
  };

  const formatBinary = (binStr: string) => {
    if (task0Phase === 'sandbox') return binStr;
    // Rozdělit po 5 bitech (délka řádku) s mezerou
    return binStr.match(/.{1,5}/g)?.join(' ') || binStr;
  };

  return (
    <div className="max-w-5xl w-full mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      {currentTask0 && (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-blue-50">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-black text-blue-600">0</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">{currentTask0.title}</h2>
          </div>
          <p className="text-gray-600 mb-8 font-medium text-lg ml-16">{currentTask0.description}</p>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
            {/* Grid */}
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="grid gap-1 p-2 bg-gray-100 rounded-2xl border-4 border-gray-200 shadow-inner"
                style={{ gridTemplateColumns: `repeat(${currentTask0.gridSize}, 1fr)`, width: '320px', height: '320px' }}
              >
                {(currentTask0.mode === 'draw' ? grid : currentTask0.targetGrid!).map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => togglePixel(idx)}
                    disabled={currentTask0.mode !== 'draw' || feedback === 'correct'}
                    className={`w-full h-full rounded transition-colors ${
                      cell === 1 ? 'bg-gray-900' : 'bg-white shadow-sm'
                    } ${currentTask0.mode === 'draw' && feedback !== 'correct' ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-default'}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex gap-4 w-full max-w-[320px]">
                {currentTask0.mode === 'draw' && feedback !== 'correct' && (
                  <button 
                    onClick={() => setGrid(createEmptyGrid(currentTask0.gridSize))}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-all text-xs uppercase tracking-widest flex justify-center items-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" /> Vymazat
                  </button>
                )}
              </div>
            </div>

            {/* Zobrazení/Zadávání kódu */}
            <div className="flex-1 flex flex-col justify-center w-full min-h-[320px]">
              {currentTask0.mode === 'draw' ? (
                <div className="bg-slate-900 p-6 rounded-3xl shadow-xl w-full">
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Vygenerovaný Binární kód</p>
                  <div className="font-mono text-emerald-400 text-xl tracking-[0.2em] break-all leading-loose">
                    {formatBinary(getGridBinaryString())}
                  </div>
                  {task0Phase !== 'sandbox' && (
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Cílový kód pro splnění:</p>
                      <div className="font-mono text-white/50 text-sm tracking-[0.1em] break-all">
                         {formatBinary(currentTask0.targetBinary!)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Zadej binární kód (nuly a jedničky)</p>
                  <textarea
                    value={binaryInput}
                    onChange={(e) => {
                      setBinaryInput(e.target.value.replace(/[^01\s]/g, ''));
                      setFeedback('none');
                    }}
                    disabled={feedback === 'correct'}
                    className="w-full h-40 bg-slate-900 text-emerald-400 font-mono text-xl p-6 rounded-3xl shadow-xl focus:ring-4 focus:ring-blue-500/50 outline-none resize-none tracking-[0.2em]"
                    placeholder="Příklad: 00000000 11111111..."
                  />
                  <p className="text-xs text-gray-400 mt-2 font-medium">Můžeš používat mezery pro lepší čitelnost (např. po 8 bitech).</p>
                </div>
              )}

              {/* Tlačítka pro kontrolu / další krok */}
              <div className="mt-8">
                {task0Phase === 'sandbox' ? (
                  <button 
                    onClick={nextTask0Phase}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                  >
                    Rozumím, jdeme na úkoly <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <>
                    {feedback === 'correct' ? (
                      <div className="animate-in slide-in-from-bottom-4">
                        <div className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl mb-4 flex items-center justify-center gap-3 font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-6 h-6" /> Správně!
                        </div>
                        <button 
                          onClick={nextTask0Phase}
                          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                          Další úloha <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={checkTask0}
                        className={`w-full py-5 font-black rounded-2xl shadow-lg transition-all uppercase tracking-widest flex justify-center items-center gap-2 ${
                          feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-900 hover:bg-black text-white'
                        }`}
                      >
                        {feedback === 'wrong' ? 'Někde je chyba, zkus to opravit!' : 'Zkontrolovat'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {task0Phase === 'finished' && (
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl text-center border-4 border-emerald-50 animate-in zoom-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase tracking-tighter">Kódování obrazu Dokončeno!</h2>
          <p className="text-xl text-gray-600 mb-10">
            Výborně! Nyní už rozumíš, jak se obraz převádí na nuly a jedničky.
          </p>
          <button 
            onClick={onBack}
            className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-widest flex mx-auto items-center gap-3"
          >
            Zpět do menu <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
};

export default ImageCompressionGame;
