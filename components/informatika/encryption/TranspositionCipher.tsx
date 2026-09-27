import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Hash, Grid3X3, Info, MessageSquareX } from 'lucide-react';

type TaskType = 'decrypt' | 'encrypt';

interface Task {
  id: number;
  type: TaskType;
  word: string;
}

const TASKS: Task[] = [
  { id: 1, type: 'decrypt', word: 'ALAN TURING' },
  { id: 2, type: 'encrypt', word: 'HESLO' },
  { id: 3, type: 'decrypt', word: 'INTERNET' },
  { id: 4, type: 'encrypt', word: 'POCITAC' },
  { id: 5, type: 'decrypt', word: 'TAJNY AGENT' },
  { id: 6, type: 'encrypt', word: 'BEZPECNOST' },
];

const encodeTransposition = (word: string, cols: number = 3) => {
  let result = '';
  const rows = Math.ceil(word.length / cols);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const idx = r * cols + c;
      if (idx < word.length) {
        result += word[idx];
      }
    }
  }
  return result;
};

// Pomocná komponenta pro vysvětlení principu
const PrincipleExplanation = () => {
  const exampleWord = "ALAN TURING";
  const cols = 3;
  const rows = Math.ceil(exampleWord.length / cols);
  
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-slate-300 text-center max-w-lg text-lg">
        Zpráva se zapisuje <strong>po řádcích</strong> zleva doprava, ale čte se (šifruje se) <strong>po sloupcích</strong> shora dolů.
      </p>
      
      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-900 p-6 rounded-2xl border-2 border-slate-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-slate-400 font-bold uppercase text-sm">Zápis (po řádcích)</span>
          <div className="grid grid-cols-3 gap-1 bg-slate-700 p-1 rounded-lg">
            {Array.from({ length: rows * cols }).map((_, i) => (
              <div key={`ex-cell-${i}`} className="w-10 h-10 bg-slate-800 flex items-center justify-center font-bold text-white text-xl border border-slate-600">
                {i < exampleWord.length ? exampleWord[i] : ''}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-emerald-400 font-black text-2xl hidden md:block">→</div>
        <div className="text-emerald-400 font-black text-2xl md:hidden">↓</div>
        
        <div className="flex flex-col items-center gap-2">
          <span className="text-slate-400 font-bold uppercase text-sm">Čtení (po sloupcích)</span>
          <div className="text-emerald-400 font-mono text-2xl font-black tracking-widest bg-emerald-900/30 p-4 rounded-xl border border-emerald-800">
            {encodeTransposition(exampleWord)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TranspositionCipher = () => {
  const [activeTaskId, setActiveTaskId] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [guessState, setGuessState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showKey, setShowKey] = useState(false);

  // Helper grid state (just a scratchpad for the student, doesn't affect logic)
  const [helperGrid, setHelperGrid] = useState<string[]>(Array(30).fill(''));

  const activeTask = TASKS.find(t => t.id === activeTaskId)!;
  const rows = Math.ceil(activeTask.word.length / 3);
  const totalCells = rows * 3;

  const handleNextTask = () => {
    if (activeTaskId < TASKS.length) {
      setActiveTaskId(prev => prev + 1);
      setShowSolution(false);
      setUserGuess('');
      setGuessState('idle');
      setHelperGrid(Array(30).fill(''));
    }
  };

  const checkGuess = () => {
    const expected = activeTask.type === 'decrypt' 
      ? activeTask.word 
      : encodeTransposition(activeTask.word);
      
    if (userGuess.trim().toUpperCase() === expected) {
      setGuessState('success');
      setShowSolution(true);
    } else {
      setGuessState('error');
    }
  };

  const updateHelperGrid = (idx: number, val: string) => {
    const newGrid = [...helperGrid];
    newGrid[idx] = val.toUpperCase().slice(0, 1);
    setHelperGrid(newGrid);
  };

  const currentEncoded = encodeTransposition(activeTask.word);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 w-full">
      <div className="flex justify-center gap-3">
        {TASKS.map(t => (
          <div 
            key={t.id} 
            className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm transition-all ${
              t.id === activeTaskId ? 'bg-indigo-600 text-white shadow-lg scale-110' :
              t.id < activeTaskId ? 'bg-indigo-200 text-indigo-700' :
              'bg-gray-100 text-gray-400'
            }`}
          >
            {t.id < activeTaskId ? <CheckCircle2 className="w-5 h-5" /> : t.id}
          </div>
        ))}
      </div>

      {showSolution ? (
        <div className="bg-indigo-50 p-12 rounded-[3rem] shadow-2xl border-4 border-indigo-400 flex flex-col items-center text-center animate-in zoom-in duration-500 max-w-5xl mx-auto w-full">
          <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl font-black text-indigo-800 mb-4">Správně! Je to {activeTask.word}.</h2>
          <p className="text-2xl text-indigo-700 font-medium max-w-2xl mb-8">
            {activeTask.type === 'decrypt' ? 'Dokázal jsi zprávu úspěšně dešifrovat.' : 'Dokázal jsi slovo úspěšně zašifrovat.'}
          </p>
          
          {activeTaskId < TASKS.length ? (
            <button 
              onClick={handleNextTask}
              className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 flex items-center gap-2 text-xl"
            >
              Další mise <ChevronRight className="w-6 h-6" />
            </button>
          ) : (
            <div className="px-8 py-4 bg-yellow-400 text-yellow-900 font-black rounded-2xl shadow-lg text-2xl flex items-center gap-2">
              Mise dokončena! 🎉
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-4 border-gray-100 flex flex-col gap-10">
          
          {/* ZÁHLAVÍ MISE */}
          <div className="text-center">
            <span className="bg-yellow-100 text-yellow-800 font-black px-4 py-1.5 rounded-lg text-sm tracking-wider uppercase mb-3 inline-block">
              Mise {activeTask.id}: {activeTask.type === 'decrypt' ? 'Dešifrování' : 'Šifrování'}
            </span>
            <h2 className="text-4xl font-black text-gray-800 mb-2">
              {activeTask.type === 'decrypt' ? 'Dešifruj tajnou zprávu' : 'Zašifruj tajné slovo'}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {activeTask.type === 'decrypt' 
                ? 'Podívej se na princip šifry níže a zkus vyluštit zašifrovanou zprávu.'
                : `Pomocí tabulkového principu zapiš šifru pro zadané slovo.`}
            </p>
          </div>

          {/* PRINCIP ŠIFRY (NAHOŘE) - SCHOVANÝ ZA TLAČÍTKEM */}
          {!showKey ? (
            <button 
              onClick={() => setShowKey(true)} 
              className="flex items-center gap-4 bg-slate-800 text-white px-8 py-4 rounded-[2rem] mx-auto shadow-xl hover:bg-slate-700 transition-all group w-full max-w-md justify-center"
            >
               <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Info className="w-6 h-6 text-white" />
               </div>
               <span className="font-black text-lg uppercase tracking-widest text-indigo-400">Zobrazit princip šifry</span>
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center bg-slate-800 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setShowKey(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-slate-700/50 hover:bg-slate-600 p-2 sm:p-3 rounded-full text-slate-300 hover:text-white transition-colors z-20"
              >
                <MessageSquareX className="w-6 h-6" />
              </button>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              
              <h3 className="font-black text-indigo-400 uppercase tracking-widest text-lg mb-8 text-center shrink-0 flex items-center justify-center gap-2 relative z-10">
                <Grid3X3 className="w-6 h-6" /> Princip šifry: Tabulka (Mřížka)
              </h3>
              
              <div className="relative z-10">
                <PrincipleExplanation />
              </div>
            </div>
          )}

          {/* VSTUPNÍ OBLAST (DOLE) */}
          <div className="flex-1 flex flex-col xl:flex-row gap-8 max-w-5xl mx-auto w-full">
            
            {/* OBLAST LUŠTĚNÍ */}
            <div className="flex-1 flex flex-col gap-8">
              {activeTask.type === 'decrypt' ? (
                <>
                  <div className="bg-indigo-100 p-4 sm:p-6 rounded-2xl border-4 border-indigo-200 text-center shadow-sm">
                    <span className="text-indigo-600 font-bold uppercase text-sm sm:text-base mb-2 block tracking-widest">Zašifrovaná zpráva:</span>
                    <div className="font-mono text-3xl sm:text-4xl font-black text-indigo-900 tracking-[0.2em] break-all">
                      {currentEncoded}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-200">
                    <label className="block font-bold text-gray-600 mb-3 text-center sm:text-left">Sem napiš původní dešifrované slovo:</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={userGuess}
                        onChange={(e) => {
                          setUserGuess(e.target.value.toUpperCase());
                          setGuessState('idle');
                        }}
                        placeholder="ZDE..."
                        className={`flex-1 px-6 py-4 rounded-xl border-4 text-center sm:text-left font-black text-2xl outline-none transition-all ${
                          guessState === 'error' ? 'border-red-400 bg-red-50 text-red-700' :
                          'border-gray-300 bg-white focus:border-indigo-500'
                        }`}
                      />
                      <button 
                        onClick={checkGuess}
                        className="px-8 py-4 bg-indigo-600 text-white text-xl font-black rounded-xl shadow-lg transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95"
                      >
                        Ověřit
                      </button>
                    </div>
                    {guessState === 'error' && (
                      <div className="text-red-500 font-bold text-center mt-3 animate-bounce">
                        To není ono, zkus to znovu!
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-indigo-100 p-4 sm:p-6 rounded-2xl border-4 border-indigo-200 text-center shadow-sm">
                    <span className="text-indigo-600 font-bold uppercase text-sm sm:text-base mb-2 block tracking-widest">Zpráva k zašifrování:</span>
                    <div className="font-mono text-4xl sm:text-5xl font-black text-indigo-900 tracking-[0.2em]">
                      {activeTask.word}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-200">
                    <label className="block font-bold text-gray-600 mb-3 text-center sm:text-left">
                      Zapiš zašifrovanou zprávu (čteno po sloupcích):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={userGuess}
                        onChange={(e) => {
                          setUserGuess(e.target.value.toUpperCase());
                          setGuessState('idle');
                        }}
                        placeholder="např. ANUN..."
                        className={`flex-1 px-6 py-4 rounded-xl border-4 text-center sm:text-left font-mono font-black text-2xl outline-none transition-all ${
                          guessState === 'error' ? 'border-red-400 bg-red-50 text-red-700' :
                          'border-gray-300 bg-white focus:border-indigo-500'
                        }`}
                      />
                      <button 
                        onClick={checkGuess}
                        disabled={userGuess.length === 0}
                        className="px-8 py-4 bg-indigo-600 text-white text-xl font-black rounded-xl shadow-lg transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 disabled:opacity-50"
                      >
                        Ověřit šifru
                      </button>
                    </div>

                    {guessState === 'error' && (
                      <div className="text-red-500 font-bold text-center animate-bounce">
                        V šifře je chyba! Zkus to znovu.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* POMOCNÁ MŘÍŽKA PRO ŽÁKY */}
            <div className="shrink-0 flex flex-col items-center bg-gray-50 border-2 border-gray-200 p-6 rounded-[2rem]">
               <h4 className="font-bold text-gray-700 mb-4 text-center uppercase tracking-wider text-sm flex items-center gap-2">
                 <Grid3X3 className="w-4 h-4 text-gray-400" /> Pomocná mřížka
               </h4>
               <p className="text-xs text-gray-500 mb-4 text-center max-w-[200px]">Sem si můžeš zkušebně psát písmena (nijak se to nekontroluje).</p>
               
               <div className="grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded-lg">
                 {helperGrid.slice(0, totalCells).map((val, idx) => (
                   <input
                     key={idx}
                     type="text"
                     maxLength={1}
                     value={val}
                     onChange={(e) => updateHelperGrid(idx, e.target.value)}
                     className="w-12 h-12 text-center font-bold text-xl uppercase rounded border-2 border-transparent focus:border-indigo-500 focus:outline-none focus:ring-0"
                   />
                 ))}
               </div>
               
               <button 
                 onClick={() => setHelperGrid(Array(30).fill(''))}
                 className="mt-6 text-sm text-gray-500 hover:text-indigo-600 font-bold transition-colors"
               >
                 Vymazat mřížku
               </button>
            </div>
            
          </div>
        </div>
      )}

      {/* ZVÍDAVÁ OTÁZKA (VŽDY DOLE) */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden max-w-5xl mx-auto w-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        
        <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><Hash className="w-6 h-6 text-indigo-400"/> Zvídavá otázka pro agenty</h3>
        <p className="text-xl text-slate-300 font-medium mb-8">
          Můžeme text pomocí této mřížky <strong>skutečně zašifrovat</strong>, aby ho někdo se znalostí tohoto principu nedokázal jednoduše dešifrovat?
        </p>

        {!showAnswer ? (
          <button 
            onClick={() => setShowAnswer(true)}
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
          >
            Zobrazit podstatu odpovědi
          </button>
        ) : (
          <div className="bg-slate-800 p-6 rounded-2xl border-2 border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <h4 className="font-bold text-indigo-400 mb-2 uppercase text-sm tracking-widest">Podstata odpovědi</h4>
            <p className="text-slate-200 leading-relaxed text-lg">
              Pokud někdo ví, že používáme 3 sloupce, zprávu si okamžitě přečte (princip je veřejný). Aby byla zpráva opravdu tajná, <strong>potřebovali bychom k ní heslo (tajný klíč)</strong>. 
              <br/><br/>
              Například velikost mřížky (počet sloupců) by se mohla měnit podle tajného hesla, nebo bychom podle hesla mohli <strong>sloupce přeházet</strong> (např. číst první 3. sloupec, pak 1. sloupec a pak 2. sloupec). Bez hesla by pak dešifrování bylo mnohem složitější!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
