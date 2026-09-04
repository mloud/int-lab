import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';

interface LaundryGameProps {
  onBack: () => void;
}

interface SymbolDef {
  id: string;
  renderIcon: () => React.ReactNode;
  label: string;
}

const SYMBOLS: SymbolDef[] = [
  {
    id: 'wash30',
    label: 'prát (max.) na 30 °C',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 fill-none stroke-current stroke-[4] stroke-linejoin-round stroke-linecap-round text-gray-800">
        <path d="M15 30 L30 80 L70 80 L85 30" />
        <path d="M15 30 Q30 40 50 30 T85 30" />
        <text x="50" y="70" className="text-[28px] font-bold fill-current stroke-none" textAnchor="middle">30°</text>
      </svg>
    )
  },
  {
    id: 'iron150',
    label: 'žehlit na max. 150 °C',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 fill-none stroke-current stroke-[4] stroke-linejoin-round stroke-linecap-round text-gray-800">
        <path d="M20 70 L80 70 Q90 70 90 60 C90 35 60 40 40 40 L30 40 Q20 40 20 50 Z" />
        <path d="M30 40 Q25 25 40 25 L65 25" />
        <circle cx="45" cy="55" r="4" className="fill-current" />
        <circle cx="65" cy="55" r="4" className="fill-current" />
      </svg>
    )
  },
  {
    id: 'xl',
    label: 'extra velké',
    renderIcon: () => (
      <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center text-gray-800 font-black text-4xl sm:text-5xl">
        XL
      </div>
    )
  },
  {
    id: 'notumble',
    label: 'nesušit v bubnové sušičce',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 fill-none stroke-current stroke-[4] stroke-linejoin-round stroke-linecap-round text-gray-800">
        <rect x="20" y="20" width="60" height="60" />
        <circle cx="50" cy="50" r="22" />
        <path d="M15 15 L85 85" />
        <path d="M85 15 L15 85" />
      </svg>
    )
  },
  {
    id: 'bleach',
    label: 'může se bělit',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 fill-none stroke-current stroke-[4] stroke-linejoin-round stroke-linecap-round text-gray-800">
        <path d="M50 15 L85 80 L15 80 Z" />
      </svg>
    )
  },
  {
    id: 'handwash',
    label: 'prát jen ručně',
    renderIcon: () => (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 fill-none stroke-current stroke-[4] stroke-linejoin-round stroke-linecap-round text-gray-800">
        <path d="M15 30 L30 80 L70 80 L85 30" />
        <path d="M15 30 Q30 40 50 30 T85 30" />
        {/* Hand */}
        <path d="M35 55 L35 40 Q35 35 40 35 Q45 35 45 40 L45 55" />
        <path d="M45 55 L45 35 Q45 30 50 30 Q55 30 55 35 L55 55" />
        <path d="M55 55 L55 38 Q55 33 60 33 Q65 33 65 38 L65 55" />
        <path d="M65 55 L65 45 Q65 40 70 40 Q75 40 75 45 L75 60 C75 75 45 75 35 65 Z" />
      </svg>
    )
  }
];

const LaundryGame: React.FC<LaundryGameProps> = ({ onBack }) => {
  const [shuffledLabels, setShuffledLabels] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const labels = SYMBOLS.map(s => s.label);
    setShuffledLabels(labels.sort(() => Math.random() - 0.5));
    setMatches({});
    setSelectedSymbolId(null);
    setSelectedLabel(null);
    setIsWon(false);
  };

  const checkWin = (newMatches: Record<string, string>) => {
    if (Object.keys(newMatches).length === SYMBOLS.length) {
      let won = true;
      for (const symbol of SYMBOLS) {
        if (newMatches[symbol.id] !== symbol.label) {
          won = false;
        }
      }
      setIsWon(won);
    }
  };

  const handleSymbolClick = (id: string) => {
    if (matches[id]) return; // Already matched
    if (selectedLabel) {
      // Connect symbol to label
      const newMatches = { ...matches, [id]: selectedLabel };
      setMatches(newMatches);
      setSelectedLabel(null);
      setSelectedSymbolId(null);
      checkWin(newMatches);
    } else {
      setSelectedSymbolId(id === selectedSymbolId ? null : id);
    }
  };

  const handleLabelClick = (label: string) => {
    if (Object.values(matches).includes(label)) return; // Already matched
    if (selectedSymbolId) {
      // Connect label to symbol
      const newMatches = { ...matches, [selectedSymbolId]: label };
      setMatches(newMatches);
      setSelectedLabel(null);
      setSelectedSymbolId(null);
      checkWin(newMatches);
    } else {
      setSelectedLabel(label === selectedLabel ? null : label);
    }
  };

  const removeMatch = (id: string) => {
    const newMatches = { ...matches };
    delete newMatches[id];
    setMatches(newMatches);
    setIsWon(false);
  };

  const getLabelForSymbol = (id: string) => matches[id] || null;

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <button
          onClick={startNewGame}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-indigo-600 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-indigo-100 uppercase tracking-wider text-xs"
        >
          <RotateCcw className="w-4 h-4" /> Restart
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border-4 border-white mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
            Prací symboly
          </h2>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-sm sm:text-base">
            Přiřaď správný popisek ke každé ikoně
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Symbols column */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
            {SYMBOLS.map((symbol) => {
              const matchedLabel = getLabelForSymbol(symbol.id);
              const isSelected = selectedSymbolId === symbol.id;
              const isCorrect = matchedLabel === symbol.label;
              const isWrong = matchedLabel && matchedLabel !== symbol.label;

              return (
                <div key={symbol.id} className="flex flex-col items-center gap-4">
                  <button
                    onClick={() => handleSymbolClick(symbol.id)}
                    disabled={!!matchedLabel}
                    className={`
                      relative p-6 rounded-3xl transition-all duration-300
                      ${matchedLabel ? 'bg-gray-50 border-gray-200 cursor-default opacity-50' : 'bg-white shadow-xl hover:scale-105 active:scale-95 cursor-pointer'}
                      ${isSelected ? 'ring-4 ring-indigo-400 ring-offset-4 border-indigo-100 shadow-indigo-200' : 'border-2 border-gray-100'}
                    `}
                  >
                    {symbol.renderIcon()}
                  </button>
                  
                  {/* Slot for matched label */}
                  <div className="w-full h-16">
                    {matchedLabel && (
                      <button
                        onClick={() => removeMatch(symbol.id)}
                        className={`w-full h-full p-2 text-xs sm:text-sm font-bold text-center rounded-xl flex items-center justify-center transition-all animate-in zoom-in cursor-pointer hover:opacity-80
                          ${isCorrect ? 'bg-green-100 text-green-800 border-2 border-green-300' : ''}
                          ${isWrong ? 'bg-red-100 text-red-800 border-2 border-red-300' : ''}
                          ${!isCorrect && !isWrong ? 'bg-gray-100 text-gray-800 border-2 border-gray-300' : ''}
                        `}
                      >
                        {matchedLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Labels column */}
          <div className="lg:w-1/3 border-t-4 lg:border-t-0 lg:border-l-4 border-gray-100 pt-8 lg:pt-0 lg:pl-8 flex flex-col gap-3 justify-center">
            {shuffledLabels.map((label, index) => {
              const isMatched = Object.values(matches).includes(label);
              const isSelected = selectedLabel === label;

              if (isMatched) return null; // Hide matched labels from the list

              return (
                <button
                  key={index}
                  onClick={() => handleLabelClick(label)}
                  className={`
                    p-4 rounded-2xl text-sm sm:text-base font-bold transition-all text-left uppercase tracking-wider
                    ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 shadow-sm'}
                  `}
                >
                  {label}
                </button>
              );
            })}
            
            {Object.values(matches).length === SYMBOLS.length && !isWon && (
              <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-200 text-red-700 font-bold text-center mt-4">
                Něco není správně. Zkus to opravit kliknutím na chybné přiřazení!
              </div>
            )}
          </div>
        </div>

        {isWon && (
          <div className="mt-12 p-8 bg-green-50 rounded-[2rem] border-4 border-green-100 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
            <h3 className="text-3xl font-black text-green-800 uppercase tracking-tight mb-2">Výborně!</h3>
            <p className="text-green-600 font-bold uppercase tracking-wider">Všechny symboly jsi přiřadil správně.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaundryGame;
