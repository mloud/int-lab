import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RefreshCcw, ChevronRight, HelpCircle } from 'lucide-react';

interface RleCompressionGameProps {
  onBack: () => void;
}

type RlePhase = 'intro' | 'task1' | 'task2' | 'task3' | 'task4' | 'finished';

const RleCompressionGame: React.FC<RleCompressionGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<RlePhase>('intro');
  const [grid, setGrid] = useState<number[]>(Array(25).fill(0));
  const [rleInput, setRleInput] = useState<string>('');
  const [binaryInput, setBinaryInput] = useState<string>('');
  const [feedback, setFeedback] = useState<'none' | 'wrong' | 'correct'>('none');

  const configs = {
    intro: {
      title: 'Co je to RLE komprese?',
      description: 'Run-Length Encoding (RLE) je způsob, jak zkrátit zápis opakujících se hodnot. Místo abychom psali "00000", napíšeme jednoduše "5x0". Tím ušetříme spoustu místa!',
      mode: 'read',
      gridSize: 5
    },
    task1: {
      title: 'Úloha 1: Zapiš binárně i RLE',
      description: 'Nejprve zapiš obrázek (pruhy) klasicky binárně, a poté pomocí RLE komprese (ve formátu číslo x hodnota, např. 5x1 5x0...).',
      targetGrid: [
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1
      ],
      targetBinary: '1111100000111110000011111',
      targetRle: '5x15x05x15x05x1',
      mode: 'code_both',
      gridSize: 5
    },
    task2: {
      title: 'Úloha 2: Nakresli podle RLE',
      description: 'Nyní to zkusíme naopak. Zkus vybarvit mřížku podle tohoto RLE kódu: 5x0, 1x0 3x1 1x0, 1x0 3x1 1x0, 1x0 3x1 1x0, 5x0',
      targetGrid: [
        0, 0, 0, 0, 0,
        0, 1, 1, 1, 0,
        0, 1, 1, 1, 0,
        0, 1, 1, 1, 0,
        0, 0, 0, 0, 0
      ],
      mode: 'draw',
      gridSize: 5
    },
    task3: {
      title: 'Úloha 3: Srovnání s kompresí',
      description: 'Zapiš kód obrázku (čtverec s dírou) nejprve klasicky (v jedničkách a nulách) a poté pomocí RLE komprese.',
      targetGrid: [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1
      ],
      targetBinary: '1111110001100011000111111',
      targetRle: '6x13x02x13x02x13x06x1',
      mode: 'code_both',
      gridSize: 5
    },
    task4: {
      title: 'Úloha 4: Kde komprese (ne)pomáhá?',
      description: 'Zapiš binární i RLE kód pro tento obrázek (šachovnici). Vidíš, že RLE komprese zde kód nezkrátí, naopak ho prodlouží! RLE se hodí jen tam, kde jsou dlouhé plochy stejné barvy.',
      targetGrid: [
        1, 0, 1, 0, 1,
        0, 1, 0, 1, 0,
        1, 0, 1, 0, 1,
        0, 1, 0, 1, 0,
        1, 0, 1, 0, 1
      ],
      targetBinary: '1010101010101010101010101',
      targetRle: '1x11x01x11x01x11x01x11x01x11x01x11x01x11x01x11x01x11x01x11x01x11x01x11x01x1',
      mode: 'code_both',
      gridSize: 5
    }
  };

  const currentTask = phase !== 'finished' ? configs[phase] : null;

  useEffect(() => {
    if (currentTask) {
      setGrid(Array(currentTask.gridSize * currentTask.gridSize).fill(0));
    }
    setRleInput('');
    setBinaryInput('');
    setFeedback('none');
  }, [phase]);

  const togglePixel = (idx: number) => {
    if (currentTask?.mode !== 'draw') return;
    setFeedback('none');
    const newGrid = [...grid];
    newGrid[idx] = newGrid[idx] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const checkTask = () => {
    if (!currentTask) return;
    let isCorrect = false;

    if (currentTask.mode === 'draw') {
      isCorrect = grid.join('') === currentTask.targetGrid!.join('');
    } else if (currentTask.mode === 'code') {
      const normalizedInput = rleInput.replace(/[\s,]/g, '').toLowerCase();
      isCorrect = normalizedInput === currentTask.targetRle;
    } else if (currentTask.mode === 'code_both') {
      const normalizedRle = rleInput.replace(/[\s,]/g, '').toLowerCase();
      const normalizedBin = binaryInput.replace(/[\s,]/g, '');
      isCorrect = (normalizedRle === currentTask.targetRle) && (normalizedBin === currentTask.targetBinary);
    }

    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 2000);
    }
  };

  const nextPhase = () => {
    const phases: RlePhase[] = ['intro', 'task1', 'task2', 'task3', 'task4', 'finished'];
    const currIdx = phases.indexOf(phase);
    if (currIdx < phases.length - 1) {
      setPhase(phases[currIdx + 1]);
    }
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

      {currentTask && (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-emerald-50">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-black text-emerald-600">2</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">{currentTask.title}</h2>
          </div>
          <p className="text-gray-600 mb-8 font-medium text-lg ml-16">{currentTask.description}</p>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
            {currentTask.mode !== 'read' && (
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="grid gap-1 p-2 bg-gray-100 rounded-2xl border-4 border-gray-200 shadow-inner"
                  style={{ gridTemplateColumns: `repeat(${currentTask.gridSize}, 1fr)`, width: '320px', height: '320px' }}
                >
                  {(currentTask.mode === 'draw' ? grid : currentTask.targetGrid!).map((cell, idx) => (
                    <button
                      key={idx}
                      onClick={() => togglePixel(idx)}
                      disabled={currentTask.mode !== 'draw' || feedback === 'correct'}
                      className={`w-full h-full rounded transition-colors ${cell === 1 ? 'bg-gray-900' : 'bg-white shadow-sm'
                        } ${currentTask.mode === 'draw' && feedback !== 'correct' ? 'hover:bg-emerald-100 cursor-pointer' : 'cursor-default'}`}
                    />
                  ))}
                </div>
                {currentTask.mode === 'draw' && feedback !== 'correct' && (
                  <div className="mt-4 flex gap-4 w-full max-w-[320px]">
                    <button
                      onClick={() => setGrid(Array(25).fill(0))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-all text-xs uppercase tracking-widest flex justify-center items-center gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" /> Vymazat
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center w-full min-h-[320px]">
              {currentTask.mode === 'read' ? (
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl w-full text-center">
                  <div className="font-mono text-emerald-400 text-3xl tracking-widest mb-4">
                    00000 = 5x0
                  </div>
                  <p className="text-slate-300 text-lg">
                    Tento způsob se nazývá bezeztrátová komprese, protože se neztratí žádná informace, jen jsme ji chytřeji zapsali!
                  </p>
                </div>
              ) : currentTask.mode === 'code' ? (
                <div className="w-full">
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Zadej RLE kód</p>
                  <textarea
                    value={rleInput}
                    onChange={(e) => {
                      setRleInput(e.target.value);
                      setFeedback('none');
                    }}
                    disabled={feedback === 'correct'}
                    className="w-full h-40 bg-slate-900 text-emerald-400 font-mono text-xl p-6 rounded-3xl shadow-xl focus:ring-4 focus:ring-emerald-500/50 outline-none resize-none tracking-widest"
                    placeholder="Např.: 5x1 5x0..."
                  />
                </div>
              ) : currentTask.mode === 'code_both' ? (
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">1. Zadej binární kód (1 a 0)</p>
                    <textarea
                      value={binaryInput}
                      onChange={(e) => {
                        setBinaryInput(e.target.value.replace(/[^01\s]/g, ''));
                        setFeedback('none');
                      }}
                      disabled={feedback === 'correct'}
                      className="w-full h-28 bg-slate-900 text-blue-400 font-mono text-xl p-4 rounded-3xl shadow-xl focus:ring-4 focus:ring-emerald-500/50 outline-none resize-none tracking-[0.2em]"
                      placeholder="1111100000..."
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">2. Zadej RLE kód</p>
                    <textarea
                      value={rleInput}
                      onChange={(e) => {
                        setRleInput(e.target.value);
                        setFeedback('none');
                      }}
                      disabled={feedback === 'correct'}
                      className="w-full h-28 bg-slate-900 text-emerald-400 font-mono text-xl p-4 rounded-3xl shadow-xl focus:ring-4 focus:ring-emerald-500/50 outline-none resize-none tracking-widest"
                      placeholder="5x1 5x0..."
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl w-full flex flex-col justify-center items-center h-full">
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-4">Tvůj úkol:</p>
                  <p className="text-emerald-400 font-mono text-xl text-center leading-relaxed">
                    5x0<br />
                    1x0, 3x1, 1x0<br />
                    1x0, 3x1, 1x0<br />
                    1x0, 3x1, 1x0<br />
                    5x0
                  </p>
                </div>
              )}

              <div className="mt-8">
                {currentTask.mode === 'read' ? (
                  <button
                    onClick={nextPhase}
                    className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                  >
                    Rozumím, jdeme dál <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <>
                    {feedback === 'correct' ? (
                      <div className="animate-in slide-in-from-bottom-4">
                        <div className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl mb-4 flex items-center justify-center gap-3 font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-6 h-6" /> Výborně!
                        </div>
                        <button
                          onClick={nextPhase}
                          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                          Další úloha <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={checkTask}
                        className={`w-full py-5 font-black rounded-2xl shadow-lg transition-all uppercase tracking-widest flex justify-center items-center gap-2 ${feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-900 hover:bg-black text-white'
                          }`}
                      >
                        {feedback === 'wrong' ? 'Někde je chyba!' : 'Zkontrolovat'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'finished' && (
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl text-center border-4 border-emerald-50 animate-in zoom-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase tracking-tighter">RLE Komprese Dokončena!</h2>
          <p className="text-xl text-gray-600 mb-10">
            Skvělá práce. Už víš, jak funguje bezeztrátová RLE komprese.
          </p>
          <button
            onClick={onBack}
            className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-widest flex mx-auto items-center gap-3"
          >
            Zpět do menu <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RleCompressionGame;
