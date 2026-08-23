import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, Trophy, RotateCcw, ShieldAlert, Timer, Keyboard } from 'lucide-react';

interface ShortcutNinjaGameProps {
  onBack: () => void;
}

interface Situation {
  id: string;
  text: string;
  correctShortcut: string;
}

const SITUATIONS: Situation[] = [
  { id: '1', text: 'Hraješ hru a najednou jde učitel! Rychle přepni do otevřeného Wordu s referátem!', correctShortcut: 'Alt + Tab' },
  { id: '2', text: 'Tento program úplně zamrzl, nejde s ním hýbat a nefunguje křížek. Jak ho natvrdo vypneš?', correctShortcut: 'Alt + F4' },
  { id: '3', text: 'Máš otevřeno 15 oken. Chceš si na celé obrazovce zobrazit přehledné náhledy úplně všech oken vedle sebe.', correctShortcut: 'Windows + Tab' },
  { id: '4', text: 'Chceš jen bleskově "prolistovat" do dalšího okna v pořadí, aniž by na tebe vyskočila vizuální nabídka uprostřed.', correctShortcut: 'Alt + Esc' },
  { id: '5', text: 'Píšeš seminárku, ale vyskočilo ti okno s aktualizací a nejde nakliknout. Chceš ho rychle zavřít z klávesnice.', correctShortcut: 'Alt + F4' },
  { id: '6', text: 'Při psaní programu potřebuješ neustále skákat tam a zpět mezi editorem a prohlížečem.', correctShortcut: 'Alt + Tab' },
];

const SHORTCUTS = ['Alt + Tab', 'Alt + Esc', 'Windows + Tab', 'Alt + F4'];
const TIME_LIMIT = 8; // 8 vteřin na reakci

const ShortcutNinjaGame: React.FC<ShortcutNinjaGameProps> = ({ onBack }) => {
  const [currentSituationIndex, setCurrentSituationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'finished'>('intro');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, clicked: string | null }>({ isCorrect: false, clicked: null });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Shuffle the situations on start
  const [shuffledSituations, setShuffledSituations] = useState<Situation[]>([]);

  useEffect(() => {
    if (gameState === 'intro') {
      setShuffledSituations([...SITUATIONS].sort(() => Math.random() - 0.5));
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 0.1) {
            handleAnswer(null); // Time out
            return 0;
          }
          return t - 0.1;
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setCurrentSituationIndex(0);
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setGameState('playing');
  };

  const handleAnswer = (shortcut: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const currentSit = shuffledSituations[currentSituationIndex];
    const isCorrect = shortcut === currentSit.correctShortcut;

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setFeedback({ isCorrect, clicked: shortcut });
    setGameState('feedback');

    setTimeout(() => {
      if (currentSituationIndex < shuffledSituations.length - 1) {
        setCurrentSituationIndex(i => i + 1);
        setTimeLeft(TIME_LIMIT);
        setGameState('playing');
      } else {
        setGameState('finished');
      }
    }, 2500);
  };

  const currentSituation = shuffledSituations[currentSituationIndex];

  return (
    <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in duration-500 px-4 pb-10">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
          Zkratkový Ninja
        </h2>
        {gameState !== 'intro' && (
           <div className="px-4 py-2 bg-slate-800 text-white font-black rounded-xl border border-slate-700 text-sm">
             Skóre: {score} / {SITUATIONS.length}
           </div>
        )}
      </div>

      {gameState === 'intro' && (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
             <Keyboard className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-4">Zkratkový Ninja</h1>
          <p className="text-slate-500 text-lg mb-8 max-w-xl">
            Myš je pomalá. Skutečný mistr operačního systému ovládá programy přímo z klávesnice! V této hře budeš muset bleskově reagovat na krizové situace.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 w-full max-w-xl">
            <h3 className="font-bold text-slate-700 mb-4">Zopakuj si arzenál zkratek:</h3>
            <ul className="space-y-3">
              <li><kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Alt</kbd> + <kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Tab</kbd> : Přepínání s nabídkou oken.</li>
              <li><kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Windows</kbd> + <kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Tab</kbd> : Zobrazí všechny náhledy vedle sebe.</li>
              <li><kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Alt</kbd> + <kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Esc</kbd> : Rychlé prolisování bez nabídky.</li>
              <li><kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">Alt</kbd> + <kbd className="bg-white border border-slate-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-slate-700">F4</kbd> : Natvrdo zavře aktuální program.</li>
            </ul>
          </div>
          <button onClick={startGame} className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 text-xl">
             <Zap className="w-6 h-6" /> Jsem Připraven
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'feedback') && currentSituation && (
        <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border-4 border-slate-100 flex flex-col items-center relative overflow-hidden">
          
          {/* Progress Bar (Time) */}
          <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
             <div 
               className={`h-full transition-all ease-linear ${timeLeft < 3 ? 'bg-red-500' : 'bg-blue-500'}`} 
               style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
             ></div>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-sm mb-6">
            <Timer className="w-5 h-5" /> Čas běží!
          </div>

          <div className="bg-slate-900 rounded-2xl p-10 w-full max-w-2xl text-center shadow-inner mb-10 relative">
             <p className="text-3xl font-black text-white leading-tight">
               "{currentSituation.text}"
             </p>

             {gameState === 'feedback' && (
               <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl backdrop-blur-md z-20 animate-in zoom-in
                 ${feedback.isCorrect ? 'bg-green-500/80 text-white' : 'bg-red-500/90 text-white'}`}
               >
                 <span className="text-6xl mb-4">{feedback.isCorrect ? '✅' : '❌'}</span>
                 <h3 className="text-3xl font-black uppercase tracking-widest">
                   {feedback.isCorrect ? 'Skvěle!' : (feedback.clicked === null ? 'Čas vypršel!' : 'Chyba!')}
                 </h3>
                 {!feedback.isCorrect && (
                   <p className="mt-4 font-bold text-lg">Správná zkratka: <span className="bg-black/30 px-3 py-1 rounded-md font-mono">{currentSituation.correctShortcut}</span></p>
                 )}
               </div>
             )}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {SHORTCUTS.map(sc => (
               <button
                 key={sc}
                 onClick={() => handleAnswer(sc)}
                 disabled={gameState !== 'playing'}
                 className="group py-6 px-4 bg-white border-4 border-slate-200 rounded-2xl text-xl font-mono font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
               >
                 {sc}
               </button>
            ))}
          </div>

        </div>
      )}

      {gameState === 'finished' && (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-emerald-400 flex flex-col items-center text-center animate-in zoom-in">
          <Trophy className="w-32 h-32 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-4">Trénink Dokončen!</h2>
          <p className="text-2xl font-bold text-slate-600 mb-8">
            Tvé skóre: <span className={score === SITUATIONS.length ? 'text-emerald-500' : 'text-amber-500'}>{score}</span> / {SITUATIONS.length}
          </p>
          
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl mb-8 font-bold border-2 border-emerald-200 max-w-2xl text-left">
            <p className="mb-4 text-center">Tady je shrnutí těch nejdůležitějších klávesových zkratek:</p>
            <ul className="space-y-3">
              <li><kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">Alt</kbd> + <kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">Tab</kbd> je tvůj nejlepší přítel pro rychlé přepínání programů.</li>
              <li><kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">Alt</kbd> + <kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">F4</kbd> okamžitě ukončí aktivní program (pozor na neuloženou práci!).</li>
              <li><kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">Windows</kbd> + <kbd className="bg-white border border-emerald-300 rounded shadow-sm px-2 py-1 font-mono text-sm mr-2 text-emerald-900">Tab</kbd> ti dá přehled, když se v oknech ztratíš.</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button onClick={startGame} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Trénovat znovu
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Zpět do menu <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortcutNinjaGame;
