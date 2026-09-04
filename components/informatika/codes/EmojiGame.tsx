import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';

interface EmojiGameProps {
  onBack: () => void;
}

interface EmojiDef {
  id: string;
  emoji: string;
  label: string;
}

const EMOJIS: EmojiDef[] = [
  { id: 'joy', emoji: '😀', label: 'Radost / Štěstí' },
  { id: 'sadness', emoji: '😢', label: 'Smutek / Pláč' },
  { id: 'anger', emoji: '😡', label: 'Vztek / Hněv' },
  { id: 'fear', emoji: '😨', label: 'Strach / Vyděšení' },
  { id: 'surprise', emoji: '😲', label: 'Překvapení / Úžas' },
  { id: 'laugh', emoji: '😂', label: 'Smích / Pobavení' },
  { id: 'love', emoji: '😍', label: 'Láska / Zamilovanost' },
  { id: 'sleep', emoji: '😴', label: 'Únava / Spánek' },
  { id: 'disgust', emoji: '🤢', label: 'Znechucení / Nevolnost' },
  { id: 'secret', emoji: '🤐', label: 'Mlčení / Tajemství' },
];

const EmojiGame: React.FC<EmojiGameProps> = ({ onBack }) => {
  const [shuffledLabels, setShuffledLabels] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedEmojiId, setSelectedEmojiId] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const labels = EMOJIS.map(e => e.label);
    setShuffledLabels(labels.sort(() => Math.random() - 0.5));
    setMatches({});
    setSelectedEmojiId(null);
    setSelectedLabel(null);
    setIsWon(false);
  };

  const checkWin = (newMatches: Record<string, string>) => {
    if (Object.keys(newMatches).length === EMOJIS.length) {
      let won = true;
      for (const emoji of EMOJIS) {
        if (newMatches[emoji.id] !== emoji.label) {
          won = false;
        }
      }
      setIsWon(won);
    }
  };

  const handleEmojiClick = (id: string) => {
    if (matches[id]) return;
    if (selectedLabel) {
      const newMatches = { ...matches, [id]: selectedLabel };
      setMatches(newMatches);
      setSelectedLabel(null);
      setSelectedEmojiId(null);
      checkWin(newMatches);
    } else {
      setSelectedEmojiId(id === selectedEmojiId ? null : id);
    }
  };

  const handleLabelClick = (label: string) => {
    if (Object.values(matches).includes(label)) return;
    if (selectedEmojiId) {
      const newMatches = { ...matches, [selectedEmojiId]: label };
      setMatches(newMatches);
      setSelectedLabel(null);
      setSelectedEmojiId(null);
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

  const getLabelForEmoji = (id: string) => matches[id] || null;

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
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-yellow-600 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-yellow-100 uppercase tracking-wider text-xs"
        >
          <RotateCcw className="w-4 h-4" /> Restart
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-[3rem] shadow-2xl border-4 border-white mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
            Smajlíci a emoce
          </h2>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-sm sm:text-base">
            Přiřaď správnou emoci ke každému smajlíkovi
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Smajlíci */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {EMOJIS.map((emoji) => {
              const matchedLabel = getLabelForEmoji(emoji.id);
              const isSelected = selectedEmojiId === emoji.id;
              const isCorrect = matchedLabel === emoji.label;
              const isWrong = matchedLabel && matchedLabel !== emoji.label;

              return (
                <div key={emoji.id} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleEmojiClick(emoji.id)}
                    disabled={!!matchedLabel}
                    className={`
                      relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl transition-all duration-300 text-4xl sm:text-5xl flex items-center justify-center select-none
                      ${matchedLabel ? 'bg-gray-50 border-gray-200 cursor-default opacity-50 grayscale' : 'bg-white shadow-lg hover:scale-110 active:scale-95 cursor-pointer'}
                      ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-4 border-yellow-100 shadow-yellow-200' : 'border-2 border-gray-100'}
                    `}
                  >
                    {emoji.emoji}
                  </button>
                  
                  {/* Slot for matched label */}
                  <div className="w-full h-[3.5rem]">
                    {matchedLabel && (
                      <button
                        onClick={() => removeMatch(emoji.id)}
                        className={`w-full h-full p-1 text-[10px] sm:text-xs font-bold text-center rounded-lg flex items-center justify-center transition-all animate-in zoom-in cursor-pointer hover:opacity-80 leading-tight
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

          {/* Labely */}
          <div className="lg:w-1/3 border-t-4 lg:border-t-0 lg:border-l-4 border-gray-100 pt-8 lg:pt-0 lg:pl-8 flex flex-wrap gap-2 content-start">
            {shuffledLabels.map((label, index) => {
              const isMatched = Object.values(matches).includes(label);
              const isSelected = selectedLabel === label;

              if (isMatched) return null;

              return (
                <button
                  key={index}
                  onClick={() => handleLabelClick(label)}
                  className={`
                    px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center uppercase tracking-wider
                    ${isSelected ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200 scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 shadow-sm'}
                  `}
                >
                  {label}
                </button>
              );
            })}
            
            {Object.values(matches).length === EMOJIS.length && !isWon && (
              <div className="w-full p-4 bg-red-50 rounded-2xl border-2 border-red-200 text-red-700 font-bold text-center mt-4">
                Něco není správně. Zkus to opravit kliknutím na chybné přiřazení!
              </div>
            )}
          </div>
        </div>

        {isWon && (
          <div className="mt-8 p-8 bg-green-50 rounded-[2rem] border-4 border-green-100 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl sm:text-3xl font-black text-green-800 uppercase tracking-tight mb-2">Výborně!</h3>
            <p className="text-green-600 font-bold uppercase tracking-wider">Všechny emoce jsi přiřadil správně.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiGame;
