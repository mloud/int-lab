
import React, { useState, useMemo } from 'react';
import { ArrowLeft, RefreshCcw, ShieldCheck, Trophy, Calculator, HelpCircle, CheckCircle2, XCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const CHAR_MAP: { [key: string]: number } = {
  ' ': 1, // Mezera je 1
  ',': 2, // Čárka je 2
  '.': 3, // Tečka je 3
  'A': 4, 'B': 5, 'C': 6, 'D': 7, 'E': 8, 'F': 9, 'G': 10,
  'H': 11, 'CH': 12, 'I': 13, 'J': 14, 'K': 15, 'L': 16, 'M': 17, 'N': 18, 'O': 19, 'P': 20,
  'Q': 21, 'R': 22, 'S': 23, 'T': 24, 'U': 25, 'V': 26, 'W': 27, 'X': 28, 'Y': 29, 'Z': 30,
  '9': 31, '8': 32, '7': 33, '6': 34, '5': 35, '4': 36, '3': 37, '2': 38, '1': 39, '0': 40
};

interface ChecksumTask {
  message: string;
  type: 'calculate' | 'verify';
  receivedChecksum?: number;
}

const TASKS: ChecksumTask[] = [
  // Fáze 1: Výpočet
  { message: "AHOJ", type: 'calculate' },
  { message: "DATA 123", type: 'calculate' },
  { message: "1. KONTROLA", type: 'calculate' },
  // Fáze 2: Ověření integrity
  { message: "AHOJ", type: 'verify', receivedChecksum: 48 }, // A(4)+H(11)+O(19)+J(14)=48 -> V pořádku
  { message: "SOS", type: 'verify', receivedChecksum: 60 },  // S(23)+O(19)+S(23)=65 -> Změněno
  { message: "321", type: 'verify', receivedChecksum: 114 }, // 3(37)+2(38)+1(39)=114 -> V pořádku
  { message: "DATA", type: 'verify', receivedChecksum: 39 }, // D(7)+A(4)+T(24)+A(4)=39 -> V pořádku
  { message: "KOD 1", type: 'verify', receivedChecksum: 81 }, // K(15)+O(19)+D(7)+SP(1)+1(39)=81 -> V pořádku
];

const ChecksumGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [taskIdx, setTaskIdx] = useState(0);
  const [userValue, setUserValue] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showWin, setShowWin] = useState(false);

  const currentTask = TASKS[taskIdx];
  
  // Rozklad zprávy na body pro vysvětlení
  const breakdown = useMemo(() => {
    const parts: { char: string; val: number }[] = [];
    const msg = currentTask.message.toUpperCase();
    let i = 0;
    while (i < msg.length) {
      if (msg[i] === 'C' && msg[i+1] === 'H') {
        parts.push({ char: 'CH', val: CHAR_MAP['CH'] });
        i += 2;
      } else {
        parts.push({ char: msg[i] === ' ' ? 'Mezera' : msg[i], val: CHAR_MAP[msg[i]] || 0 });
        i++;
      }
    }
    return parts;
  }, [currentTask]);

  const actualChecksum = useMemo(() => {
    return breakdown.reduce((acc, curr) => acc + curr.val, 0);
  }, [breakdown]);

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showExplanation) return;
    const val = parseInt(userValue);
    processAnswer(val === actualChecksum);
  };

  const handleVerifyDecision = (userSaysCorrect: boolean) => {
    if (showExplanation) return;
    const isActuallyCorrect = actualChecksum === currentTask.receivedChecksum;
    processAnswer(isActuallyCorrect === userSaysCorrect);
  };

  const processAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setFeedback('correct');
      setShowExplanation(true);
      setTimeout(() => {
        proceed();
      }, 2500);
    } else {
      setFeedback('wrong');
      setShowExplanation(true);
      setTimeout(() => {
        setFeedback('none');
        setShowExplanation(false);
      }, 4000);
    }
  };

  const proceed = () => {
    if (taskIdx < TASKS.length - 1) {
      setTaskIdx(prev => prev + 1);
      setUserValue('');
      setFeedback('none');
      setShowExplanation(false);
    } else {
      setShowWin(true);
    }
  };

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20 px-4">
      {/* Header */}
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-black uppercase text-xs tracking-widest shrink-0">
          <ArrowLeft className="w-5 h-5 mr-2" /> Zpět
        </button>
        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 shrink-0">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest">
            {currentTask.type === 'calculate' ? 'VÝPOČET SOUČTU' : 'OVĚŘENÍ INTEGRITY'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
        {/* Left Side: Table */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Kódovací tabulka</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden text-[10px] font-bold text-center">
              <tbody>
                <tr className="bg-gray-100 text-gray-400 uppercase tracking-tighter">
                  <td className="p-2 border border-gray-200">Mezera</td>
                  <td className="p-2 border border-gray-200">,</td>
                  <td className="p-2 border border-gray-200">.</td>
                  <td className="p-2 border border-gray-200">A</td>
                  <td className="p-2 border border-gray-200">B</td>
                  <td className="p-2 border border-gray-200">C</td>
                  <td className="p-2 border border-gray-200">D</td>
                  <td className="p-2 border border-gray-200">E</td>
                  <td className="p-2 border border-gray-200">F</td>
                  <td className="p-2 border border-gray-200">G</td>
                </tr>
                <tr className="bg-white">
                  {[1,2,3,4,5,6,7,8,9,10].map(v => <td key={v} className="p-2 border border-gray-200 text-amber-600 font-black">{v}</td>)}
                </tr>
                <tr className="bg-gray-100 text-gray-400">
                  <td className="p-2 border border-gray-200">H</td>
                  <td className="p-2 border border-gray-200">Ch</td>
                  <td className="p-2 border border-gray-200">I</td>
                  <td className="p-2 border border-gray-200">J</td>
                  <td className="p-2 border border-gray-200">K</td>
                  <td className="p-2 border border-gray-200">L</td>
                  <td className="p-2 border border-gray-200">M</td>
                  <td className="p-2 border border-gray-200">N</td>
                  <td className="p-2 border border-gray-200">O</td>
                  <td className="p-2 border border-gray-200">P</td>
                </tr>
                <tr className="bg-white">
                  {[11,12,13,14,15,16,17,18,19,20].map(v => <td key={v} className="p-2 border border-gray-200 text-amber-600 font-black">{v}</td>)}
                </tr>
                <tr className="bg-gray-100 text-gray-400">
                  <td className="p-2 border border-gray-200">Q</td>
                  <td className="p-2 border border-gray-200">R</td>
                  <td className="p-2 border border-gray-200">S</td>
                  <td className="p-2 border border-gray-200">T</td>
                  <td className="p-2 border border-gray-200">U</td>
                  <td className="p-2 border border-gray-200">V</td>
                  <td className="p-2 border border-gray-200">W</td>
                  <td className="p-2 border border-gray-200">X</td>
                  <td className="p-2 border border-gray-200">Y</td>
                  <td className="p-2 border border-gray-200">Z</td>
                </tr>
                <tr className="bg-white">
                  {[21,22,23,24,25,26,27,28,29,30].map(v => <td key={v} className="p-2 border border-gray-200 text-amber-600 font-black">{v}</td>)}
                </tr>
                <tr className="bg-gray-100 text-gray-400">
                  <td className="p-2 border border-gray-200">9</td>
                  <td className="p-2 border border-gray-200">8</td>
                  <td className="p-2 border border-gray-200">7</td>
                  <td className="p-2 border border-gray-200">6</td>
                  <td className="p-2 border border-gray-200">5</td>
                  <td className="p-2 border border-gray-200">4</td>
                  <td className="p-2 border border-gray-200">3</td>
                  <td className="p-2 border border-gray-200">2</td>
                  <td className="p-2 border border-gray-200">1</td>
                  <td className="p-2 border border-gray-200">0</td>
                </tr>
                <tr className="bg-white">
                  {[31,32,33,34,35,36,37,38,39,40].map(v => <td key={v} className="p-2 border border-gray-200 text-amber-600 font-black">{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 bg-amber-50/50 rounded-3xl border border-amber-100 flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-900 font-black uppercase tracking-tight mb-1">
                {currentTask.type === 'calculate' ? 'Jak počítat?' : 'Jak ověřovat?'}
              </p>
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                {currentTask.type === 'calculate' 
                  ? 'Najdi každý znak zprávy v tabulce, opiš jeho číslo a všechna čísla sečti dohromady.' 
                  : 'Spočítej skutečný součet zprávy a porovnej ho s přijatým součtem. Pokud nesouhlasí, data byla změněna!'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Game Area */}
        <div className={`bg-white p-10 rounded-[3rem] shadow-xl border-4 transition-all duration-300 flex flex-col items-center justify-center text-center relative ${
          feedback === 'correct' ? 'border-emerald-500 ring-8 ring-emerald-50' : 
          feedback === 'wrong' ? 'border-red-400 ring-8 ring-red-50' : 'border-amber-100'
        }`}>
          
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            {currentTask.type === 'calculate' ? 'Vypočítej součet zprávy:' : 'Byla tato data cestou změněna?'}
          </p>
          
          <div className="mb-10 w-full space-y-4">
            <div className="bg-gray-50 px-8 py-6 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Zpráva</p>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
                    {currentTask.message}
                </h1>
            </div>

            {currentTask.type === 'verify' && (
                <div className="bg-amber-50 px-8 py-4 rounded-3xl border-2 border-amber-200 animate-in zoom-in">
                    <p className="text-[10px] font-black text-amber-600 uppercase mb-1 tracking-widest">Přijatý součet</p>
                    <h2 className="text-3xl font-black text-amber-900">{currentTask.receivedChecksum}</h2>
                </div>
            )}
          </div>

          {/* Explanation Overlay when answered */}
          {showExplanation && (
            <div className="w-full mb-8 p-6 bg-white rounded-3xl border-2 border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
               <div className="flex items-center gap-3 mb-4 justify-center">
                  <Info className="w-5 h-5 text-blue-500" />
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Vysvětlení výpočtu</p>
               </div>
               
               <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {breakdown.map((b, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                       <span className="text-[10px] font-black text-gray-400 mb-1">{b.char}</span>
                       <span className="text-sm font-black text-blue-600">{b.val}</span>
                    </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-gray-100 flex justify-center items-baseline gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Součet zprávy:</span>
                  <span className="text-2xl font-black text-gray-900">{actualChecksum}</span>
                  {currentTask.type === 'verify' && (
                    <>
                      <span className="text-xl font-bold text-gray-300 mx-2">vs</span>
                      <span className="text-xs font-bold text-gray-400 uppercase">Přijato:</span>
                      <span className="text-2xl font-black text-amber-600">{currentTask.receivedChecksum}</span>
                    </>
                  )}
               </div>
               
               <div className="mt-4">
                  {currentTask.type === 'verify' && (
                    <p className={`text-xs font-black uppercase tracking-widest ${actualChecksum === currentTask.receivedChecksum ? 'text-emerald-600' : 'text-red-600'}`}>
                      {actualChecksum === currentTask.receivedChecksum ? 'Součty souhlasí -> DATA JSOU V POŘÁDKU' : 'Součty NESOUHLASÍ -> DATA BYLA ZMĚNĚNA'}
                    </p>
                  )}
               </div>
            </div>
          )}

          {!showExplanation && currentTask.type === 'calculate' ? (
            <form onSubmit={handleCalculateSubmit} className="w-full max-w-xs space-y-6">
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="Zadej součet..." 
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  className="w-full py-6 px-4 bg-amber-50 border-4 border-amber-100 rounded-[2rem] text-center text-3xl font-black text-amber-900 focus:border-amber-400 outline-none transition-all placeholder:text-amber-200 placeholder:text-xl"
                />
              </div>
              <button type="submit" className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-[2rem] shadow-xl transition-all uppercase tracking-widest">
                Ověřit výsledek
              </button>
            </form>
          ) : !showExplanation && (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleVerifyDecision(true)}
                  className="py-8 bg-emerald-50 hover:bg-emerald-100 border-4 border-emerald-200 text-emerald-700 font-black rounded-[2.5rem] transition-all flex flex-col items-center gap-2 group"
                >
                    <CheckCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="uppercase text-xs tracking-widest leading-none">V POŘÁDKU</span>
                </button>
                <button 
                  onClick={() => handleVerifyDecision(false)}
                  className="py-8 bg-red-50 hover:bg-red-100 border-4 border-red-200 text-red-700 font-black rounded-[2.5rem] transition-all flex flex-col items-center gap-2 group"
                >
                    <AlertTriangle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="uppercase text-xs tracking-widest leading-none">ZMĚNĚNO</span>
                </button>
            </div>
          )}

          {/* Feedback Icon Overlays */}
          {feedback === 'correct' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in duration-300">
               <CheckCircle2 className="w-40 h-40 text-emerald-500/20" />
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in zoom-in shake duration-300">
               <XCircle className="w-40 h-40 text-red-500/20" />
            </div>
          )}
        </div>
      </div>

      {showWin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="w-28 h-28 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl rotate-12">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-3 uppercase tracking-tighter">Detektiv dat!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              Skvělá práce! Dokážeš spočítat kontrolní součet a odhalit chyby v přenosu. Data jsou s tebou v bezpečí.
            </p>
            <button onClick={onBack} className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-[2rem] shadow-xl uppercase tracking-widest text-sm">
              Zpět do menu
            </button>
          </div>
        </div>
      )}

      <style>{`
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(0, 0, 0); }
          20%, 80% { transform: translate3d(-10px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(10px, 0, 0); }
          40%, 60% { transform: translate3d(-10px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default ChecksumGame;
