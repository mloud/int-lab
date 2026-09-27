import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Info, MessageSquareX } from 'lucide-react';

const ALPHABET = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'X', 'Y', 'Z'
];

type TaskType = 'decrypt' | 'encrypt';

interface Task {
  id: number;
  type: TaskType;
  word: string;
}

const TASKS: Task[] = [
  { id: 1, type: 'decrypt', word: 'PROGRAMATORKA' },
  { id: 2, type: 'encrypt', word: 'HESLO' },
  { id: 3, type: 'decrypt', word: 'AGENT' },
  { id: 4, type: 'encrypt', word: 'SIFRA' },
  { id: 5, type: 'decrypt', word: 'TAJNOST' },
  { id: 6, type: 'encrypt', word: 'POCITAC' },
];

const encodeWord = (word: string) => {
  return word.split('').map(char => {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) return '';
    const group = Math.floor(idx / 5) + 1;
    const pos = (idx % 5) + 1;
    return `${pos}${group}`;
  }).filter(Boolean).join('/');
};

const ZlomkyCipherDisplay = ({ word }: { word: string }) => {
  const encoded = encodeWord(word);
  return (
    <div className="bg-blue-50 p-6 sm:p-8 rounded-[2rem] border-4 border-blue-100 flex justify-center text-center shadow-inner font-mono text-2xl sm:text-4xl font-black text-blue-900 tracking-widest break-all">
      {encoded}
    </div>
  );
};

export const ZlomkyCipher = () => {
  const [activeTaskId, setActiveTaskId] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [builderChars, setBuilderChars] = useState<string[]>([]);
  const [guessState, setGuessState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showKey, setShowKey] = useState(false);

  const activeTask = TASKS.find(t => t.id === activeTaskId)!;

  const handleNextTask = () => {
    if (activeTaskId < TASKS.length) {
      setActiveTaskId(prev => prev + 1);
      setShowSolution(false);
      setUserGuess('');
      setBuilderChars([]);
      setGuessState('idle');
    }
  };

  const checkDecryptGuess = () => {
    if (userGuess.trim().toUpperCase() === activeTask.word) {
      setGuessState('success');
      setShowSolution(true);
    } else {
      setGuessState('error');
    }
  };

  const checkEncryptGuess = () => {
    // encodeWord outputs e.g. "32/51/44/13/53"
    const expected = encodeWord(activeTask.word);
    if (userGuess.trim() === expected) {
      setGuessState('success');
      setShowSolution(true);
    } else {
      setGuessState('error');
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 w-full">
      <div className="flex justify-center gap-3">
        {TASKS.map(t => (
          <div 
            key={t.id} 
            className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm transition-all ${
              t.id === activeTaskId ? 'bg-blue-600 text-white shadow-lg scale-110' :
              t.id < activeTaskId ? 'bg-blue-200 text-blue-700' :
              'bg-gray-100 text-gray-400'
            }`}
          >
            {t.id < activeTaskId ? <CheckCircle2 className="w-5 h-5" /> : t.id}
          </div>
        ))}
      </div>

      {showSolution ? (
        <div className="bg-blue-50 p-12 rounded-[3rem] shadow-2xl border-4 border-blue-400 flex flex-col items-center text-center animate-in zoom-in duration-500 max-w-5xl mx-auto w-full">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl font-black text-blue-800 mb-4">Správně! Je to {activeTask.word}.</h2>
          <p className="text-2xl text-blue-700 font-medium max-w-2xl mb-8">
            {activeTask.type === 'decrypt' ? 'Dokázal jsi zprávu úspěšně dešifrovat.' : 'Dokázal jsi slovo úspěšně zašifrovat.'}
          </p>
          
          {activeTaskId < TASKS.length ? (
            <button 
              onClick={handleNextTask}
              className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-2 text-xl"
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
            <p className="text-gray-500 text-lg">
              {activeTask.type === 'decrypt' 
                ? 'Podívej se na šifrovací klíč dole a zkus vyluštit, co znamenají tato čísla.'
                : `Pomocí tabulky zapiš šifru pro slovo "${activeTask.word}". Čísla odděluj lomítkem (/).`}
            </p>
          </div>

          {/* ŠIFROVACÍ KLÍČ (NAHOŘE) - VŽDY VIDITELNÝ */}
          <div className="flex flex-col items-center justify-center bg-slate-800 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-x-auto w-full max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-20"></div>
            
            <h3 className="font-black text-blue-400 uppercase tracking-widest text-lg mb-8 text-center shrink-0 flex items-center justify-center relative z-10">
              Šifrovací klíč Zlomky
            </h3>
            
            <div className="overflow-x-auto w-full pb-6">
              <div className="min-w-max flex flex-col border-4 border-slate-600 bg-slate-900 rounded-xl overflow-hidden mx-auto font-mono text-center relative z-10">
                
                {/* ROW 1: Letters */}
                <div className="flex border-b-[3px] border-slate-600">
                  {ALPHABET.map((char, i) => (
                    <div key={`char-${i}`} className={`w-8 h-12 flex items-center justify-center font-bold text-xl ${i % 5 === 4 && i !== 24 ? 'border-r-[3px] border-slate-600' : i !== 24 ? 'border-r border-slate-700' : ''}`}>
                      <span className="text-white">{char}</span>
                    </div>
                  ))}
                </div>

                {/* ROW 2: Position in group */}
                <div className="flex border-b-[3px] border-slate-600">
                  {ALPHABET.map((_, i) => (
                    <div key={`pos-${i}`} className={`w-8 h-10 flex items-center justify-center text-slate-400 font-medium ${i % 5 === 4 && i !== 24 ? 'border-r-[3px] border-slate-600' : i !== 24 ? 'border-r border-slate-700' : ''}`}>
                      {(i % 5) + 1}
                    </div>
                  ))}
                </div>

                {/* ROW 3: Group numbers */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((group, i) => (
                    <div key={`grp-${i}`} className={`w-40 h-10 flex items-center justify-center text-yellow-500 font-bold text-lg ${i !== 4 ? 'border-r-[3px] border-slate-600' : ''}`}>
                      {group}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* NÁPOVĚDA / PRINCIP - SCHOVANÁ ZA TLAČÍTKEM */}
            {!showKey ? (
              <button 
                onClick={() => setShowKey(true)} 
                className="flex items-center gap-3 bg-slate-700 text-white px-6 py-3 rounded-2xl mx-auto shadow-lg hover:bg-slate-600 transition-all group relative z-10"
              >
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Info className="w-5 h-5 text-white" />
                 </div>
                 <span className="font-bold text-sm uppercase tracking-widest text-blue-300">Zobrazit nápovědu</span>
              </button>
            ) : (
              <div className="mt-2 text-sm sm:text-base text-slate-300 max-w-[500px] text-center bg-slate-700/80 p-6 rounded-2xl border border-slate-600 relative z-10 animate-in fade-in slide-in-from-top-4 duration-300">
                <button 
                  onClick={() => setShowKey(false)}
                  className="absolute top-2 right-2 bg-slate-600/50 hover:bg-slate-500 p-1.5 rounded-full text-slate-300 hover:text-white transition-colors"
                >
                  <MessageSquareX className="w-4 h-4" />
                </button>
                <span className="block mb-2 font-bold text-white uppercase text-xs tracking-widest text-blue-400">Jak to funguje:</span>
                <span className="block mb-2">První číslo v kódu určuje pozici písmene (řádek 2), druhé číslo určuje skupinu (řádek 3).</span>
                <strong className="text-white">Příklad:</strong> H je 3. písmeno ve 2. skupině = <strong>32</strong>.
              </div>
            )}
          </div>

          {/* VSTUPNÍ OBLAST (DOLE) */}
          <div className="flex-1 flex flex-col gap-8 max-w-3xl mx-auto w-full">
            {activeTask.type === 'decrypt' ? (
              <>
                <ZlomkyCipherDisplay word={activeTask.word} />

                <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-200">
                  <label className="block font-bold text-gray-600 mb-3 text-center sm:text-left">Sem napiš vyluštěné slovo:</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      value={userGuess}
                      onChange={(e) => {
                        setUserGuess(e.target.value.toUpperCase());
                        setGuessState('idle');
                      }}
                      placeholder="např. TAJEMSTVI"
                      className={`flex-1 px-6 py-4 rounded-xl border-4 text-center sm:text-left font-black text-2xl outline-none transition-all ${
                        guessState === 'error' ? 'border-red-400 bg-red-50 text-red-700' :
                        'border-gray-300 bg-white focus:border-blue-500'
                      }`}
                    />
                    <button 
                      onClick={checkDecryptGuess}
                      className="px-8 py-4 bg-blue-600 text-white text-xl font-black rounded-xl shadow-lg transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
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
                <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-200">
                  <div className="bg-blue-100 p-4 sm:p-6 rounded-2xl border-4 border-blue-200 text-center mb-8 shadow-sm">
                    <span className="text-blue-600 font-bold uppercase text-sm sm:text-base mb-2 block tracking-widest">Slovo k zašifrování:</span>
                    <div className="font-mono text-4xl sm:text-5xl font-black text-blue-900 tracking-[0.2em]">
                      {activeTask.word}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <label className="block font-bold text-gray-500 text-center sm:text-left text-sm">Sem napiš zlomky oddělené lomítkem (např. 14/34/53):</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={userGuess}
                        onChange={(e) => {
                          setUserGuess(e.target.value.trim());
                          setGuessState('idle');
                        }}
                        placeholder="ZDE..."
                        className={`flex-1 px-6 py-4 rounded-xl border-4 text-center sm:text-left font-mono font-black text-2xl outline-none transition-all ${
                          guessState === 'error' ? 'border-red-400 bg-red-50 text-red-700' :
                          'border-gray-300 bg-white focus:border-blue-500'
                        }`}
                      />
                      <button 
                        onClick={checkEncryptGuess}
                        disabled={userGuess.length === 0}
                        className="px-8 py-4 bg-blue-600 text-white text-xl font-black rounded-xl shadow-lg transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50"
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
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
