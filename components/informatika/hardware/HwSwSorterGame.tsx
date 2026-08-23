import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cpu, MonitorPlay, Mouse, HardDrive, FileText, Music, Code, ShieldAlert, Monitor, Keyboard, Speaker, Webcam, CheckCircle, XCircle, Play, RotateCcw } from 'lucide-react';

interface HwSwSorterGameProps {
  onBack: () => void;
}

type Level = 1 | 2 | 3; // 1 = HW vs SW, 2 = HW splitting, 3 = Victory

interface SortItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  categoryL1: 'HW' | 'SW';
  categoryL2?: 'IN' | 'OUT' | 'CORE';
  explanation: string;
}

const ITEMS: SortItem[] = [
  // HW
  { id: 'cpu', name: 'Procesor (CPU)', icon: <Cpu className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'CORE', explanation: 'Procesor je fyzický čip ze křemíku, vykonává výpočty.' },
  { id: 'ram', name: 'Operační paměť (RAM)', icon: <HardDrive className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'CORE', explanation: 'RAM je fyzická destička s čipy uvnitř počítače.' },
  { id: 'hdd', name: 'Pevný disk (SSD)', icon: <HardDrive className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'CORE', explanation: 'Pevný disk je fyzická "krabička", do které se ukládají data.' },
  { id: 'mouse', name: 'Myš', icon: <Mouse className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'IN', explanation: 'Myší fyzicky hýbeš po stole, posílá data DO počítače (Vstup).' },
  { id: 'keyboard', name: 'Klávesnice', icon: <Keyboard className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'IN', explanation: 'Do klávesnice fyzicky bušíš, posílá text DO počítače (Vstup).' },
  { id: 'monitor', name: 'Monitor', icon: <Monitor className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'OUT', explanation: 'Monitor je fyzický displej, ukazuje obraz VEN z počítače (Výstup).' },
  { id: 'speaker', name: 'Reproduktor', icon: <Speaker className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'OUT', explanation: 'Reproduktor fyzicky hraje zvuk VEN z počítače (Výstup).' },
  { id: 'webcam', name: 'Webkamera', icon: <Webcam className="w-16 h-16" />, categoryL1: 'HW', categoryL2: 'IN', explanation: 'Kamera fyzicky snímá tvůj obraz a posílá ho DO počítače (Vstup).' },
  // SW
  { id: 'win', name: 'Windows 11', icon: <Code className="w-16 h-16" />, categoryL1: 'SW', explanation: 'Operační systém je pouze obří sada programů. Nejde na něj sáhnout.' },
  { id: 'word', name: 'Microsoft Word', icon: <FileText className="w-16 h-16" />, categoryL1: 'SW', explanation: 'Word je program (aplikace), jsou to jen jedničky a nuly na disku.' },
  { id: 'mp3', name: 'MP3 písnička', icon: <Music className="w-16 h-16" />, categoryL1: 'SW', explanation: 'Písnička jsou jen datové soubory (hudební data), není to fyzický předmět.' },
  { id: 'photo', name: 'Fotografie z dovolené', icon: <MonitorPlay className="w-16 h-16" />, categoryL1: 'SW', explanation: 'Fotka uložená na disku jsou jen data. Nelze na ni sáhnout, dokud se nevytiskne.' },
  { id: 'game', name: 'Počítačová hra', icon: <Code className="w-16 h-16" />, categoryL1: 'SW', explanation: 'Hra je obrovský program složený z kódu, textur a zvuků. Je to software.' }
];

const shuffleArray = <T,>(array: T[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const HwSwSorterGame: React.FC<HwSwSorterGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<Level>(1);
  const [queue, setQueue] = useState<SortItem[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDir, setAnimationDir] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  useEffect(() => {
    startLevel(1);
  }, []);

  const startLevel = (l: Level) => {
    setLevel(l);
    setFeedback(null);
    if (l === 1) {
      setQueue(shuffleArray(ITEMS));
      setScore(0);
      setMistakes(0);
    } else if (l === 2) {
      // Only HW for level 2
      setQueue(shuffleArray(ITEMS.filter(i => i.categoryL1 === 'HW')));
    }
  };

  const handleSort = (category: string) => {
    if (queue.length === 0 || isAnimating) return;
    
    const currentItem = queue[0];
    let isCorrect = false;

    if (level === 1) {
      isCorrect = currentItem.categoryL1 === category;
    } else if (level === 2) {
      isCorrect = currentItem.categoryL2 === category;
    }

    if (isCorrect) {
      // Correct!
      setScore(s => s + 10);
      setFeedback({ text: 'Správně!', isError: false });
      
      // Setup fly away animation
      if (category === 'HW' || category === 'IN') setAnimationDir('left');
      else if (category === 'SW' || category === 'OUT') setAnimationDir('right');
      else setAnimationDir('down'); // CORE
      
      setIsAnimating(true);
      
      setTimeout(() => {
        setQueue(q => q.slice(1));
        setAnimationDir(null);
        setIsAnimating(false);
        setFeedback(null);
        
        // Check if queue empty -> next level
        if (queue.length <= 1) {
          if (level === 1) startLevel(2);
          else if (level === 2) startLevel(3);
        }
      }, 400);

    } else {
      // Wrong!
      setMistakes(m => m + 1);
      setScore(s => Math.max(0, s - 5));
      setFeedback({ text: `Chyba! ${currentItem.explanation}`, isError: true });
      
      // Shake animation
      setAnimationDir('up'); // re-using state for shake trigger
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDir(null);
      }, 500);
    }
  };

  const currentItem = queue[0];

  return (
    <div className="max-w-5xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10 px-4">
      
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-teal-900 uppercase tracking-tight">3. HW vs SW Třídička</h2>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-gray-500">Chyby: <span className="text-red-500">{mistakes}</span></span>
          <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-xl font-black shadow-inner">Skóre: {score}</span>
        </div>
      </div>

      {level === 3 ? (
        // VICTORY SCREEN
        <div className="w-full bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-teal-100 flex flex-col items-center text-center animate-in zoom-in mt-10">
          <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <CheckCircle className="w-20 h-20 text-teal-500" />
          </div>
          <h2 className="text-5xl font-black text-teal-800 uppercase tracking-widest mb-4">Mise splněna!</h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mb-12">
            Dokonale jsi roztřídil veškerý Hardware i Software a navíc jsi pochopil rozdíl mezi vstupními, výstupními a výkonnými díly počítače. 
          </p>
          <div className="flex gap-6">
            <div className="bg-gray-50 border-2 border-gray-200 px-8 py-4 rounded-2xl flex flex-col items-center">
               <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Finální skóre</span>
               <span className="text-4xl font-black text-gray-800">{score}</span>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 px-8 py-4 rounded-2xl flex flex-col items-center">
               <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Počet chyb</span>
               <span className={`text-4xl font-black ${mistakes === 0 ? 'text-emerald-500' : 'text-red-500'}`}>{mistakes}</span>
            </div>
          </div>
          <button
            onClick={() => startLevel(1)}
            className="mt-12 flex items-center gap-3 px-10 py-5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-full shadow-[0_0_30px_rgba(13,148,136,0.4)] transition-all hover:scale-105 active:scale-95 text-xl uppercase tracking-wider"
          >
            <RotateCcw className="w-6 h-6" /> Hrát znovu
          </button>
        </div>

      ) : (
        // GAME SCREEN
        <div className="w-full max-w-3xl flex flex-col items-center">
          
          {/* Level Header */}
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black text-gray-800 uppercase tracking-widest mb-2">
              Kolo {level}: {level === 1 ? 'Hardware vs Software' : 'Dělení Hardware'}
            </h3>
            <p className="text-gray-500 font-bold">
              {level === 1 ? 'Je tento pojem tvrdé zboží (HW), nebo nehmotný program/data (SW)?' : 'Kam patří tento kus hardware? Dává povely dovnitř, ven, nebo počítač pohání?'}
            </p>
          </div>

          {/* Feedback area */}
          <div className={`h-16 w-full flex items-center justify-center mb-4 transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'}`}>
            {feedback && (
              <div className={`px-6 py-3 rounded-full flex items-center gap-3 font-bold shadow-md ${feedback.isError ? 'bg-red-100 text-red-800 border-2 border-red-200' : 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200'}`}>
                {feedback.isError ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                {feedback.text}
              </div>
            )}
          </div>

          {/* Current Card */}
          <div className="relative w-full h-[300px] flex items-center justify-center perspective-1000 mb-12">
            {currentItem && (
              <div 
                className={`
                  w-64 h-64 bg-white rounded-3xl shadow-2xl border-4 border-gray-100 flex flex-col items-center justify-center gap-4 transition-all duration-300 transform
                  ${animationDir === 'left' ? '-translate-x-96 rotate-[-30deg] opacity-0' : ''}
                  ${animationDir === 'right' ? 'translate-x-96 rotate-[30deg] opacity-0' : ''}
                  ${animationDir === 'down' ? 'translate-y-96 scale-50 opacity-0' : ''}
                  ${animationDir === 'up' ? 'animate-shake border-red-400 bg-red-50' : 'hover:scale-105'}
                `}
              >
                <div className={`p-4 rounded-2xl ${animationDir === 'up' ? 'bg-red-100 text-red-500' : 'bg-teal-50 text-teal-600'}`}>
                   {currentItem.icon}
                </div>
                <h4 className="text-xl font-black text-gray-800 text-center px-4 leading-tight">
                  {currentItem.name}
                </h4>
              </div>
            )}
            
            {/* Cards behind stack effect */}
            {queue.length > 1 && !isAnimating && (
              <div className="absolute w-64 h-64 bg-white rounded-3xl shadow-lg border-2 border-gray-100 -z-10 translate-y-4 translate-x-4 opacity-50"></div>
            )}
            {queue.length > 2 && !isAnimating && (
              <div className="absolute w-64 h-64 bg-white rounded-3xl shadow-md border-2 border-gray-100 -z-20 translate-y-8 translate-x-8 opacity-20"></div>
            )}
          </div>

          {/* Action Buttons */}
          {level === 1 ? (
            <div className="flex gap-6 w-full justify-center">
              <button
                onClick={() => handleSort('HW')}
                className="flex-1 max-w-[250px] flex flex-col items-center justify-center gap-3 py-6 bg-white border-4 border-blue-200 hover:border-blue-500 hover:bg-blue-50 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                <Cpu className="w-10 h-10 text-blue-500 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <h3 className="font-black text-2xl text-blue-800 uppercase tracking-widest">Hardware</h3>
                  <span className="text-blue-500 font-bold text-sm">(Hmotné díly)</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSort('SW')}
                className="flex-1 max-w-[250px] flex flex-col items-center justify-center gap-3 py-6 bg-white border-4 border-purple-200 hover:border-purple-500 hover:bg-purple-50 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                <Code className="w-10 h-10 text-purple-500 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <h3 className="font-black text-2xl text-purple-800 uppercase tracking-widest">Software</h3>
                  <span className="text-purple-500 font-bold text-sm">(Programy a Data)</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={() => handleSort('IN')}
                className="flex-1 max-w-[200px] flex flex-col items-center justify-center gap-2 py-5 bg-white border-4 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                <Keyboard className="w-8 h-8 text-emerald-500 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <h3 className="font-black text-xl text-emerald-800 uppercase tracking-wider">Vstupní</h3>
                  <span className="text-emerald-500 font-bold text-xs">Příkazy dovnitř</span>
                </div>
              </button>

              <button
                onClick={() => handleSort('CORE')}
                className="flex-1 max-w-[200px] flex flex-col items-center justify-center gap-2 py-5 bg-white border-4 border-amber-200 hover:border-amber-500 hover:bg-amber-50 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                <Cpu className="w-8 h-8 text-amber-500 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <h3 className="font-black text-xl text-amber-800 uppercase tracking-wider">Srdce PC</h3>
                  <span className="text-amber-500 font-bold text-xs">Výkon a paměti</span>
                </div>
              </button>
              
              <button
                onClick={() => handleSort('OUT')}
                className="flex-1 max-w-[200px] flex flex-col items-center justify-center gap-2 py-5 bg-white border-4 border-rose-200 hover:border-rose-500 hover:bg-rose-50 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 group"
              >
                <Monitor className="w-8 h-8 text-rose-500 group-hover:scale-125 transition-transform" />
                <div className="text-center">
                  <h3 className="font-black text-xl text-rose-800 uppercase tracking-wider">Výstupní</h3>
                  <span className="text-rose-500 font-bold text-xs">Výsledky ven</span>
                </div>
              </button>
            </div>
          )}

          <div className="mt-12 text-gray-400 font-bold uppercase tracking-widest text-sm flex gap-2 items-center">
            Karet ve frontě: <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{queue.length}</span>
          </div>

        </div>
      )}

      {/* Global styles for shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          50% { transform: translateX(10px) rotate(5deg); }
          75% { transform: translateX(-10px) rotate(-5deg); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default HwSwSorterGame;
