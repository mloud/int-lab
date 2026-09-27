import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, Lock, Info, Play, ShieldAlert, Key, MessageSquareX, EyeOff, Binary, KeyRound, CheckCircle2, ChevronRight, Hash, DivideSquare, Grid3X3 } from 'lucide-react';
import { ZlomkyCipher } from './ZlomkyCipher';
import { TranspositionCipher } from './TranspositionCipher';

interface EncryptionMenuProps {
  onBack: () => void;
}

type Tab = 'theory' | 'polish-cipher' | 'zlomky-cipher' | 'transposition-cipher';

const CIPHER_MAP: Record<string, { border: string, dot: string }> = {
  'A': { border: 'border-b-4 border-r-4', dot: 'left-2 sm:left-3' },
  'B': { border: 'border-b-4 border-r-4', dot: 'left-1/2 -translate-x-1/2' },
  'C': { border: 'border-b-4 border-r-4', dot: 'right-2 sm:right-3' },
  
  'D': { border: 'border-b-4 border-r-4 border-l-4', dot: 'left-2 sm:left-3' },
  'E': { border: 'border-b-4 border-r-4 border-l-4', dot: 'left-1/2 -translate-x-1/2' },
  'F': { border: 'border-b-4 border-r-4 border-l-4', dot: 'right-2 sm:right-3' },
  
  'G': { border: 'border-b-4 border-l-4', dot: 'left-2 sm:left-3' },
  'H': { border: 'border-b-4 border-l-4', dot: 'left-1/2 -translate-x-1/2' },
  'CH': { border: 'border-b-4 border-l-4', dot: 'right-2 sm:right-3' },
  
  'I': { border: 'border-b-4 border-r-4 border-t-4', dot: 'left-2 sm:left-3' },
  'J': { border: 'border-b-4 border-r-4 border-t-4', dot: 'left-1/2 -translate-x-1/2' },
  'K': { border: 'border-b-4 border-r-4 border-t-4', dot: 'right-2 sm:right-3' },
  
  'L': { border: 'border-4', dot: 'left-2 sm:left-3' },
  'M': { border: 'border-4', dot: 'left-1/2 -translate-x-1/2' },
  'N': { border: 'border-4', dot: 'right-2 sm:right-3' },
  
  'O': { border: 'border-b-4 border-l-4 border-t-4', dot: 'left-2 sm:left-3' },
  'P': { border: 'border-b-4 border-l-4 border-t-4', dot: 'left-1/2 -translate-x-1/2' },
  'Q': { border: 'border-b-4 border-l-4 border-t-4', dot: 'right-2 sm:right-3' },
  
  'R': { border: 'border-r-4 border-t-4', dot: 'left-2 sm:left-3' },
  'S': { border: 'border-r-4 border-t-4', dot: 'left-1/2 -translate-x-1/2' },
  'T': { border: 'border-r-4 border-t-4', dot: 'right-2 sm:right-3' },
  
  'U': { border: 'border-r-4 border-l-4 border-t-4', dot: 'left-2 sm:left-3' },
  'V': { border: 'border-r-4 border-l-4 border-t-4', dot: 'left-1/2 -translate-x-1/2' },
  'W': { border: 'border-r-4 border-l-4 border-t-4', dot: 'right-2 sm:right-3' },
  
  'X': { border: 'border-l-4 border-t-4', dot: 'left-2 sm:left-3' },
  'Y': { border: 'border-l-4 border-t-4', dot: 'left-1/2 -translate-x-1/2' },
  'Z': { border: 'border-l-4 border-t-4', dot: 'right-2 sm:right-3' },
};

const parseWord = (word: string) => {
  const result: string[] = [];
  let i = 0;
  while (i < word.length) {
    if (word[i] === 'C' && word[i+1] === 'H') {
      result.push('CH');
      i += 2;
    } else {
      result.push(word[i]);
      i += 1;
    }
  }
  return result;
};

const CipherDisplay = ({ word, color = 'emerald' }: { word: string, color?: string }) => {
  const chars = parseWord(word);
  
  return (
    <div className={`bg-${color}-50 p-6 sm:p-8 rounded-[2rem] border-4 border-${color}-100 flex justify-center gap-2 sm:gap-4 flex-wrap shadow-inner`}>
      {chars.map((char, idx) => {
        const conf = CIPHER_MAP[char] || { border: '', dot: '' };
        return (
          <div key={idx} className={`relative w-10 h-10 sm:w-14 sm:h-14 ${conf.border} border-${color}-900`}>
            {conf.dot && (
              <div className={`absolute top-1/2 -translate-y-1/2 ${conf.dot} w-2 h-2 sm:w-3 sm:h-3 bg-${color}-600 rounded-full`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

type TaskType = 'decrypt' | 'encrypt';

interface Task {
  id: number;
  type: TaskType;
  word: string;
}

const TASKS: Task[] = [
  { id: 1, type: 'decrypt', word: 'POLSKO' },
  { id: 2, type: 'encrypt', word: 'PES' },
  { id: 3, type: 'decrypt', word: 'HESLO' },
  { id: 4, type: 'encrypt', word: 'TAJNE' },
  { id: 5, type: 'decrypt', word: 'SKOLA' },
  { id: 6, type: 'encrypt', word: 'AGENT' },
];

const EncryptionMenu: React.FC<EncryptionMenuProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('theory');
  const [activeTaskId, setActiveTaskId] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [builderChars, setBuilderChars] = useState<string[]>([]);
  const [symbolBank, setSymbolBank] = useState<string[]>([]);
  const [guessState, setGuessState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showKey, setShowKey] = useState(false);

  const activeTask = TASKS.find(t => t.id === activeTaskId)!;

  // Initialize symbol bank on task change
  React.useEffect(() => {
    if (activeTask.type === 'encrypt' && activeTab === 'polish-cipher') {
      const chars = parseWord(activeTask.word);
      const bank = [...chars];
      const allChars = Object.keys(CIPHER_MAP);
      while (bank.length < 9) {
        const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
        // Avoid adding the exact same random char multiple times if possible
        if (!bank.includes(randomChar) || chars.includes(randomChar)) {
          bank.push(randomChar);
        }
      }
      // Shuffle
      setSymbolBank(bank.sort(() => Math.random() - 0.5));
    }
  }, [activeTaskId, activeTab, activeTask]);

  const handleNextTask = () => {
    if (activeTaskId < TASKS.length) {
      setActiveTaskId(prev => prev + 1);
      setShowSolution(false);
      setUserGuess('');
      setBuilderChars([]);
      setGuessState('idle');
      setShowKey(false);
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
    const word = builderChars.join('');
    if (word === activeTask.word) {
      setGuessState('success');
      setShowSolution(true);
    } else {
      setGuessState('error');
    }
  };

  const addBuilderChar = (char: string) => {
    if (builderChars.length < parseWord(activeTask.word).length) {
      setBuilderChars(prev => [...prev, char]);
      setGuessState('idle');
    }
  };

  const removeBuilderChar = () => {
    setBuilderChars(prev => prev.slice(0, -1));
    setGuessState('idle');
  };

  // Helper for rendering static grid cell
  const renderCell = (chars: string[], isRight: boolean = false, isBottom: boolean = false) => {
    return (
      <div className={`p-1 sm:p-2 ${!isBottom ? 'border-b-[4px]' : ''} ${!isRight ? 'border-r-[4px]' : ''} border-slate-500 flex items-center justify-center gap-1 sm:gap-3`}>
        {chars.map(c => (
          <span key={c} className="font-mono text-xl sm:text-3xl font-bold text-white cursor-default px-2">
            {c}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto animate-in fade-in duration-500 px-4 pb-12">
      
      {/* HEADER & TABS */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět
        </button>

        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'theory' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Info className="w-5 h-5" /> Teorie
          </button>
          <button 
            onClick={() => setActiveTab('polish-cipher')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'polish-cipher' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <KeyRound className="w-5 h-5" /> Polský kříž
          </button>
          <button 
            onClick={() => setActiveTab('zlomky-cipher')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'zlomky-cipher' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <DivideSquare className="w-5 h-5" /> Šifra Zlomky
          </button>
          <button 
            onClick={() => setActiveTab('transposition-cipher')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'transposition-cipher' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Grid3X3 className="w-5 h-5" /> Mřížka
          </button>
        </div>
      </div>

      <div className="w-full">
        {activeTab === 'theory' ? (
          <div className="flex flex-col gap-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
            
            {/* HERO SECTION */}
            <div className="bg-emerald-600 w-full p-8 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left gap-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full blur-[60px] -translate-x-1/2 translate-y-1/2 opacity-60"></div>
              
              <div className="relative z-10 flex-1">
                <div className="inline-block px-4 py-1.5 bg-emerald-500 rounded-full text-emerald-100 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-emerald-400/50">
                  Agentí výcvik
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  Proč tajíme <br/><span className="text-emerald-200">svá data?</span>
                </h1>
                <p className="text-xl text-emerald-50 font-medium max-w-md leading-relaxed">
                  Představ si, že posíláš po třídě tajný vzkaz. Co když ho chytí učitelka? Na internetu to funguje úplně stejně!
                </p>
              </div>

              <div className="relative z-10 flex shrink-0">
                <div className="w-40 h-40 sm:w-56 sm:h-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] flex items-center justify-center shadow-2xl rotate-6 transform hover:rotate-12 transition-transform duration-500">
                  <Lock className="w-20 h-20 sm:w-28 sm:h-28 text-white drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* KEY CONCEPT: THE JOURNEY OF DATA */}
            <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-xl border-4 border-emerald-50">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-8 text-center uppercase tracking-widest">
                Cesta tvé zprávy
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 relative w-full mt-4">
                
                {/* 1. Odesílatel */}
                <div className="flex flex-col items-center text-center bg-slate-50 p-6 rounded-3xl z-10 w-full md:w-1/4 border-2 border-slate-100 shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                    <span className="font-black text-2xl">Ahoj!</span>
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg">Tvoje zpráva</h3>
                </div>

                {/* Šipka: Šifrování */}
                <div className="flex flex-col items-center text-emerald-500 py-2 md:py-0">
                  <span className="font-black text-xs sm:text-sm uppercase tracking-widest mb-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Šifrování</span>
                  <ArrowRight className="w-8 h-8 hidden md:block stroke-[3]" />
                  <ArrowDown className="w-8 h-8 md:hidden stroke-[3]" />
                </div>

                {/* 2. Internet / Zašifrováno */}
                <div className="flex flex-col items-center text-center bg-emerald-50 p-6 rounded-3xl z-10 w-full md:w-1/4 border-2 border-emerald-200 shadow-md transform md:-translate-y-2">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-4 -rotate-3 shadow-lg">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-black text-emerald-700 mb-1 uppercase text-sm sm:text-base">Zašifrovaná zpráva na internetu</h3>
                  <p className="text-emerald-600 font-mono font-bold text-lg tracking-widest">xH8#kL</p>
                </div>

                {/* Šipka: Dešifrování */}
                <div className="flex flex-col items-center text-blue-500 py-2 md:py-0">
                  <span className="font-black text-xs sm:text-sm uppercase tracking-widest mb-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Dešifrování</span>
                  <ArrowRight className="w-8 h-8 hidden md:block stroke-[3]" />
                  <ArrowDown className="w-8 h-8 md:hidden stroke-[3]" />
                </div>

                {/* 3. Příjemce */}
                <div className="flex flex-col items-center text-center bg-slate-50 p-6 rounded-3xl z-10 w-full md:w-1/4 border-2 border-slate-100 shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                    <Key className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg mb-1">Příjemce</h3>
                  <p className="text-xs text-slate-500 font-medium">Má tajný klíč k přečtení.</p>
                </div>
              </div>
            </div>

            {/* CODE VS CIPHER COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* CODE CARD */}
              <div className="bg-slate-50 p-8 sm:p-10 rounded-[3rem] shadow-lg border-4 border-slate-200 flex flex-col items-center text-center group hover:bg-white hover:border-blue-300 transition-colors">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Binary className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">KÓD</h3>
                <span className="bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-lg text-sm mb-6 uppercase tracking-wider">
                  Pro stroje (veřejný)
                </span>
                <p className="text-slate-600 font-medium mb-6 text-lg">
                  Kód nic netají! Jen překládá informaci, aby jí stroje lépe rozuměly (např. čárový kód v obchodě).
                </p>
              </div>

              {/* CIPHER CARD */}
              <div className="bg-emerald-50 p-8 sm:p-10 rounded-[3rem] shadow-lg border-4 border-emerald-300 flex flex-col items-center text-center relative overflow-hidden group hover:bg-emerald-100 transition-colors">
                <div className="absolute top-0 right-0 bg-red-500 text-white font-black text-sm px-6 py-2 rounded-bl-3xl shadow-md transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                  PŘÍSNĚ TAJNÉ
                </div>
                <div className="w-24 h-24 bg-emerald-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-12 h-12 text-emerald-700" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">ŠIFRA</h3>
                <span className="bg-emerald-200 text-emerald-800 font-bold px-4 py-1.5 rounded-lg text-sm mb-6 uppercase tracking-wider shadow-sm">
                  Pro tajné agenty
                </span>
                <p className="text-slate-700 font-medium mb-6 text-lg">
                  Šifra slouží ke skrytí informací před lidmi. Kdo nemá tajný klíč, uvidí jen zamotané nesmysly.
                </p>
              </div>

            </div>

          </div>
        ) : activeTab === 'polish-cipher' ? (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500 w-full">
            
            {/* PROGRESS INDICATOR */}
            <div className="flex justify-center gap-3">
              {TASKS.map(t => (
                <div 
                  key={t.id} 
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm transition-all ${
                    t.id === activeTaskId ? 'bg-emerald-600 text-white shadow-lg scale-110' :
                    t.id < activeTaskId ? 'bg-emerald-200 text-emerald-700' :
                    'bg-gray-100 text-gray-400'
                  }`}
                >
                  {t.id < activeTaskId ? <CheckCircle2 className="w-5 h-5" /> : t.id}
                </div>
              ))}
            </div>

            {showSolution ? (
              <div className="bg-green-50 p-12 rounded-[3rem] shadow-2xl border-4 border-green-400 flex flex-col items-center text-center animate-in zoom-in duration-500 max-w-5xl mx-auto w-full">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-5xl font-black text-green-800 mb-4">Správně! Je to {activeTask.word}.</h2>
                <p className="text-2xl text-green-700 font-medium max-w-2xl mb-8">
                  {activeTask.type === 'decrypt' ? 'Dokázal jsi zprávu úspěšně dešifrovat.' : 'Dokázal jsi slovo úspěšně zašifrovat.'} Jsi pravý agent!
                </p>
                
                {activeTaskId < TASKS.length ? (
                  <button 
                    onClick={handleNextTask}
                    className="px-8 py-4 bg-green-600 text-white font-black rounded-2xl shadow-lg hover:bg-green-700 transition-all hover:scale-105 flex items-center gap-2 text-xl"
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
                      ? 'Podívej se na šifrovací klíč níže a zkus vyluštit, co znamenají ty divné znaky dole.'
                      : `Pomocí šifrovacího klíče sestav tajnou podobu slova "${activeTask.word}".`}
                  </p>
                </div>

                {/* ŠIFROVACÍ KLÍČ (NAHOŘE) - VŽDY VIDITELNÝ */}
                <div className="flex flex-col items-center justify-center bg-slate-800 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden max-w-2xl mx-auto w-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                  
                  <h3 className="font-black text-emerald-400 uppercase tracking-widest text-lg mb-8 relative z-10">
                    Šifrovací klíč
                  </h3>
                  
                  <div className="grid grid-cols-3 text-center relative z-10 bg-slate-800 rounded-xl mb-6">
                    {renderCell(['A', 'B', 'C'])}
                    {renderCell(['D', 'E', 'F'])}
                    {renderCell(['G', 'H', 'CH'], true)}
                    
                    {renderCell(['I', 'J', 'K'])}
                    {renderCell(['L', 'M', 'N'])}
                    {renderCell(['O', 'P', 'Q'], true)}
                    
                    {renderCell(['R', 'S', 'T'], false, true)}
                    {renderCell(['U', 'V', 'W'], false, true)}
                    {renderCell(['X', 'Y', 'Z'], true, true)}
                  </div>

                  {/* NÁPOVĚDA / PRINCIP - SCHOVANÁ ZA TLAČÍTKEM */}
                  {!showKey ? (
                    <button 
                      onClick={() => setShowKey(true)} 
                      className="flex items-center gap-3 bg-slate-700 text-white px-6 py-3 rounded-2xl mx-auto shadow-lg hover:bg-slate-600 transition-all group relative z-10"
                    >
                       <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Info className="w-5 h-5 text-white" />
                       </div>
                       <span className="font-bold text-sm uppercase tracking-widest text-emerald-300">Zobrazit nápovědu</span>
                    </button>
                  ) : (
                    <div className="mt-4 text-sm sm:text-base text-slate-300 max-w-[400px] text-center bg-slate-700/80 p-6 rounded-2xl border border-slate-600 relative z-10 animate-in fade-in slide-in-from-top-4 duration-300">
                      <button 
                        onClick={() => setShowKey(false)}
                        className="absolute top-2 right-2 bg-slate-600/50 hover:bg-slate-500 p-1.5 rounded-full text-slate-300 hover:text-white transition-colors"
                      >
                        <MessageSquareX className="w-4 h-4" />
                      </button>
                      <span className="block mb-2 font-bold text-white uppercase text-xs tracking-widest text-emerald-400">Jak to funguje:</span>
                      <span className="block mb-2">Tvar rámečku ukazuje buňku.</span>
                      <strong className="text-white">Pozice tečky (vlevo, střed, vpravo)</strong> určuje 1., 2. nebo 3. písmeno.
                    </div>
                  )}
                </div>

                {/* VSTUPNÍ OBLAST (DOLE) */}
                <div className="flex-1 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                  {activeTask.type === 'decrypt' ? (
                    <>
                      {/* VIZUÁL ZPRÁVY PRO DEŠIFROVÁNÍ */}
                      <CipherDisplay word={activeTask.word} />

                      {/* INPUT */}
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
                            placeholder="ZDE..."
                            className={`flex-1 px-6 py-4 rounded-xl border-4 text-center sm:text-left font-black text-2xl outline-none transition-all ${
                              guessState === 'error' ? 'border-red-400 bg-red-50 text-red-700' :
                              'border-gray-300 bg-white focus:border-emerald-500'
                            }`}
                          />
                          <button 
                            onClick={checkDecryptGuess}
                            className="px-8 py-4 bg-emerald-600 text-white text-xl font-black rounded-xl shadow-lg transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
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
                      {/* MANUÁLNÍ ŠIFROVÁNÍ (BUILDER S BANKOU) */}
                      <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-200">
                        <div className="bg-emerald-100 p-4 sm:p-6 rounded-2xl border-4 border-emerald-200 text-center mb-8 shadow-sm">
                          <span className="text-emerald-700 font-bold uppercase text-sm sm:text-base mb-2 block tracking-widest">Slovo k zašifrování:</span>
                          <div className="font-mono text-4xl sm:text-5xl font-black text-emerald-900 tracking-[0.2em]">
                            {activeTask.word}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                          {/* Sestavená šifra zobrazení */}
                          <div className="min-h-[100px] bg-white rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-4 gap-2 flex-wrap">
                            {builderChars.length === 0 ? (
                              <span className="text-gray-400 font-bold">Zatím prázdné... vyber znaky z banky níže.</span>
                            ) : (
                              <>
                                {builderChars.map((char, idx) => {
                                  const conf = CIPHER_MAP[char] || { border: '', dot: '' };
                                  return (
                                    <div key={idx} className={`relative w-12 h-12 sm:w-16 sm:h-16 ${conf.border} border-emerald-900 animate-in zoom-in duration-200`}>
                                      {conf.dot && (
                                        <div className={`absolute top-1/2 -translate-y-1/2 ${conf.dot} w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-600 rounded-full`}></div>
                                      )}
                                    </div>
                                  );
                                })}
                              </>
                            )}
                          </div>

                          {/* BANKA SYMBOLŮ */}
                          <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-100 flex flex-wrap justify-center gap-3">
                            {symbolBank.map((char, idx) => {
                              const conf = CIPHER_MAP[char] || { border: '', dot: '' };
                              return (
                                <button
                                  key={`bank-${idx}`}
                                  onClick={() => addBuilderChar(char)}
                                  className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group shadow-sm"
                                >
                                  <div className={`relative w-8 h-8 sm:w-10 sm:h-10 ${conf.border} border-emerald-900 group-hover:border-emerald-600 transition-colors`}>
                                    {conf.dot && (
                                      <div className={`absolute top-1/2 -translate-y-1/2 ${conf.dot} w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-600 rounded-full`}></div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={removeBuilderChar}
                              disabled={builderChars.length === 0}
                              className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 disabled:opacity-50 transition-all"
                            >
                              Smazat poslední
                            </button>
                            <button 
                              onClick={checkEncryptGuess}
                              disabled={builderChars.length !== parseWord(activeTask.word).length}
                              className="flex-1 px-8 py-3 bg-emerald-600 text-white font-black rounded-xl shadow-lg transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
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

            {/* ZVÍDAVÁ OTÁZKA (VŽDY DOLE) */}
            <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden max-w-5xl mx-auto w-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><Hash className="w-6 h-6 text-emerald-400"/> Zvídavá otázka pro agenty</h3>
              <p className="text-xl text-slate-300 font-medium mb-8">
                Jaká je hlavní <strong>nevýhoda</strong> této šifry (Polského kříže) při přenášení zprávy v dnešní době?
              </p>

              {!showAnswer ? (
                <button 
                  onClick={() => setShowAnswer(true)}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
                >
                  Zobrazit podstatu odpovědi
                </button>
              ) : (
                <div className="bg-slate-800 p-6 rounded-2xl border-2 border-slate-700 animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="font-bold text-emerald-400 mb-2 uppercase text-sm tracking-widest">Podstata odpovědi</h4>
                  <p className="text-slate-200 leading-relaxed text-lg">
                    Zpráva musí být <strong>napsaná rukou nebo nakreslená obrázky</strong>, takové znaky se nedají jednoduše napsat na běžné klávesnici (zakódovat např. do e-mailu nebo SMS bez posílání fotky). 
                    <br/><br/>
                    Druhou nevýhodou je, že pokud někdo tento "šifrovací kříž" zná (je veřejně známý a pořád stejný), zprávu si okamžitě dešifruje – <strong>chybí jí tajný unikátní klíč (heslo)</strong>. Skutečné šifrování by i se znalostí "metody" vyžadovalo osobní heslo.
                  </p>
                </div>
              )}
            </div>

          </div>
        ) : activeTab === 'zlomky-cipher' ? (
          <ZlomkyCipher />
        ) : activeTab === 'transposition-cipher' ? (
          <TranspositionCipher />
        ) : null}
      </div>
    </div>
  );
};

export default EncryptionMenu;
