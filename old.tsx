
import React, { useState } from 'react';
import { ArrowLeft, ArrowDown, FileText, Binary, Type, FileArchive, Zap } from 'lucide-react';

const TextCompression: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [inputText, setInputText] = useState('AHOJ');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Bezpe─Źn├Ż vstup - max 30 znak┼», pouze p├şsmena a mezery
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z ]/g, '');
    if (val.length <= 30) {
      setInputText(val);
    }
  };

  const getAscii = (char: string) => char.charCodeAt(0);
  
  const getBinary = (char: string) => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  };

  const characters = inputText.split('');
  
  // LOGIKA KOMPRESE PRO KROK 4
  const words = inputText.split(' ').filter(w => w.length > 0);
  const dict: string[] = [];
  const compressedTokens: string[] = [];
  
  words.forEach(word => {
    const idx = dict.indexOf(word);
    if (idx !== -1) {
      compressedTokens.push(`#${idx + 1}`);
    } else {
      dict.push(word);
      compressedTokens.push(word);
    }
  });

  const compressedString = compressedTokens.join(' ');
  const originalSize = inputText.length;
  const compressedSize = compressedString.length;
  const isCompressed = compressedSize < originalSize;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 pb-10 px-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl border-4 border-blue-50 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-blue-600 transition-colors font-black uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Zp─Ťt
        </button>
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Jak se komprimuje text?</h1>
        </div>
      </div>

      {/* KROK 1: TEXT */}
      <div className={`bg-white p-8 rounded-[2.5rem] shadow-lg border-2 transition-all duration-500 ${step >= 1 ? 'border-blue-200 opacity-100' : 'opacity-50 pointer-events-none'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-black text-blue-600">1</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Vstupn├ş text</h2>
            <p className="text-sm font-bold text-gray-400">Napi┼í v─Ťtu s opakuj├şc├şmi se slovy (nap┼Ö. PETR JE PETR, max 30 p├şsmen bez diakritiky).</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={handleTextChange}
            placeholder="Napi┼í v─Ťtu..."
            className="w-full md:w-2/3 text-2xl md:text-4xl font-black text-center text-blue-900 bg-blue-50 border-4 border-blue-100 rounded-3xl p-6 outline-none focus:border-blue-400 uppercase tracking-widest shadow-inner transition-colors"
          />
          {step === 1 && (
            <button 
              onClick={() => { if(inputText.length > 0) setStep(2); }}
              disabled={inputText.length === 0}
              className="w-full md:w-1/3 py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-black rounded-3xl uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95"
            >
              P┼Öev├ęst na ─Ź├şsla
            </button>
          )}
        </div>
      </div>

      {step >= 2 && (
        <div className="flex justify-center -my-2 z-10 relative">
          <div className="w-10 h-10 bg-white border-2 border-indigo-200 rounded-full flex items-center justify-center shadow-md animate-in slide-in-from-top-4">
            <ArrowDown className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      )}

      {/* KROK 2: ASCII */}
      {step >= 2 && (
        <div className={`bg-white p-8 rounded-[2.5rem] shadow-lg border-2 transition-all duration-500 animate-in fade-in slide-in-from-top-10 ${step >= 2 ? 'border-indigo-200 opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <span className="text-xl font-black text-indigo-600">2</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">K├│dov├ín├ş znak┼» (ASCII)</h2>
                <p className="text-sm font-bold text-gray-400 max-w-xl">
                  Po─Ź├şta─Ź nerozum├ş p├şsmen┼»m. Ka┼żd├ę p├şsmeno proto mus├ş p┼Öev├ęst na ─Ź├şslo podle dohodnut├ę tabulky (tzv. ASCII tabulka).
                </p>
              </div>
            </div>
            {step === 2 && (
              <button 
                onClick={() => setStep(3)}
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 whitespace-nowrap"
              >
                P┼Öev├ęst do bin├írn├ş
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-indigo-50/50 p-4 md:p-6 rounded-[2rem] border border-indigo-100">
            {characters.map((char, i) => (
              <div key={i} className="flex flex-col items-center gap-1 md:gap-2 animate-in zoom-in" style={{ animationDelay: `${Math.min(i * 50, 1000)}ms` }}>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white border-2 border-indigo-200 rounded-xl flex items-center justify-center text-lg md:text-xl font-black text-indigo-900 shadow-sm">
                  {char === ' ' ? 'ÔÉú' : char}
                </div>
                <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-indigo-300" />
                <div className="w-10 h-8 md:w-14 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-md text-sm md:text-base">
                  {getAscii(char)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step >= 3 && (
        <div className="flex justify-center -my-2 z-10 relative">
          <div className="w-10 h-10 bg-white border-2 border-emerald-200 rounded-full flex items-center justify-center shadow-md animate-in slide-in-from-top-4">
            <ArrowDown className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      )}

      {/* KROK 3: BIN├üRN├Ź */}
      {step >= 3 && (
        <div className={`bg-white p-8 rounded-[2.5rem] shadow-lg border-2 transition-all duration-500 animate-in fade-in slide-in-from-top-10 ${step >= 3 ? 'border-emerald-200 opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-xl font-black text-emerald-600">3</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">P┼Öevod ─Ź├şsel do bin├írn├ş podoby</h2>
                <p className="text-sm font-bold text-gray-400 max-w-xl">
                  ─î├şsla (des├ştkov├í) se nyn├ş p┼Öevedou na "jedni─Źky a nuly" (bity). Ka┼żd├ę p├şsmeno zabere p┼Öesn─Ť 8 bit┼» (1 byte).
                </p>
              </div>
            </div>
            {step === 3 && (
              <button 
                onClick={() => setStep(4)}
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Jak to zkomprimovat?
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 bg-gray-900 p-4 md:p-6 rounded-[2rem] shadow-inner font-mono text-emerald-400 max-h-64 overflow-y-auto">
            {characters.map((char, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-4 animate-in slide-in-from-left" style={{ animationDelay: `${Math.min(i * 30, 1000)}ms` }}>
                <span className="text-gray-500 font-bold w-12 text-right">{char === ' ' ? 'mezera' : char} =</span>
                <span className="text-gray-400 w-8">{getAscii(char)}</span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <div className="flex gap-1">
                  {getBinary(char).split('').map((bit, bIdx) => (
                    <span key={bIdx} className={`w-5 h-6 md:w-6 md:h-8 flex items-center justify-center rounded-md font-black text-xs md:text-sm ${bit === '1' ? 'bg-emerald-900/80 text-emerald-400' : 'bg-gray-800 text-gray-600'}`}>
                      {bit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between sticky bottom-0 bg-gray-900/90 backdrop-blur-sm pb-2">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Celkov├í velikost textu:</span>
               <span className="px-3 py-1 bg-gray-800 rounded-lg text-white font-black text-sm">{characters.length} Byt┼» ({characters.length * 8} bit┼»)</span>
            </div>
          </div>
        </div>
      )}

      {step >= 4 && (
        <div className="flex justify-center -my-2 z-10 relative">
          <div className="w-10 h-10 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center shadow-md animate-in slide-in-from-top-4">
            <ArrowDown className="w-5 h-5 text-orange-400" />
          </div>
        </div>
      )}

      {/* KROK 4: ZIP KOMPRESE */}
      {step >= 4 && (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-[2.5rem] shadow-xl border-4 border-orange-200 animate-in fade-in slide-in-from-top-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shadow-sm">
              <FileArchive className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Princip ZIP komprese</h2>
              <p className="text-sm font-bold text-gray-500 max-w-2xl">
                ZIP v textu hled├í slova, kter├í se opakuj├ş. Nam├şsto jejich op─Ťtovn├ęho ukl├íd├ín├ş vlo┼ż├ş pouze odkaz na jejich prvn├ş v├Żskyt.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 mb-6">
            
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Nezkprimov├íno */}
              <div className="flex-1 w-full bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center relative flex flex-col justify-center">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">P┼»vodn├ş text</div>
                <div className="text-xl font-black text-gray-800 tracking-widest break-words leading-relaxed">
                  {inputText}
                </div>
                <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase">
                  Zabere <span className="text-gray-600 font-black">{originalSize} Byt┼»</span>
                </div>
              </div>

              <div className="flex items-center justify-center shrink-0">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>

              {/* Zkomprimov├íno */}
              <div className={`flex-1 w-full p-6 rounded-2xl border-4 text-center relative shadow-inner flex flex-col justify-center ${isCompressed ? 'bg-orange-100 border-orange-300' : 'bg-gray-100 border-gray-200'}`}>
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md ${isCompressed ? 'bg-orange-500' : 'bg-gray-500'}`}>
                  Vnit┼Öek ZIP souboru
                </div>
                
                <div className="text-lg font-black text-gray-800 leading-relaxed tracking-widest flex flex-wrap justify-center gap-2 mt-4 mb-4">
                  {compressedTokens.map((token, idx) => (
                    token.startsWith('#') ? (
                      <span key={idx} className="bg-orange-500 text-white px-2 py-1 rounded-md shadow-sm border border-orange-600">{token}</span>
                    ) : (
                      <span key={idx} className="bg-white px-2 py-1 rounded-md shadow-sm text-blue-800 border border-blue-200">{token}</span>
                    )
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t-2 border-black/5">
                  <div className={`text-[11px] font-black uppercase ${isCompressed ? 'text-orange-700' : 'text-gray-500'}`}>
                    V├Żsledek: <span className={`${isCompressed ? 'text-emerald-600' : 'text-gray-700'} text-sm`}>
                      {isCompressed ? `Zabere jen ${compressedSize} Byt┼»!` : `Velikost se nezm─Ťnila (${compressedSize} Byt┼»)`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-orange-100/50">
            <h4 className="text-sm font-black text-gray-800 uppercase mb-2">Shrnut├ş pro Z┼á:</h4>
            <p className="text-sm font-bold text-gray-600 leading-relaxed">
              Kdy┼ż zad├í┼í text <strong className="text-gray-800">bez opakuj├şc├şch se slov</strong>, ZIP nedok├í┼że nic u┼íet┼Öit a soubor bude stejn─Ť velk├Ż. 
              Pokud se ale n─Ťjak├ę slovo opakuje, ZIP ho ulo┼ż├ş jen poprv├ę a na dal┼í├ş m├şsta zap├ş┼íe malou zna─Źku (nap┼Ö. <strong className="text-orange-600">#1</strong>), kter├í po─Ź├şta─Źi ┼Öekne: <em>"Tady dopl┼ł to prvn├ş ulo┼żen├ę slovo"</em>. 
              D├şky tomu se soubor zmen┼í├ş!
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
             <button onClick={() => { setStep(1); setInputText(''); }} className="px-6 py-3 bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 font-black rounded-xl uppercase tracking-widest text-xs shadow-sm transition-all active:scale-95">
                Zkusit jin├ę slovo
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Pomocn├í komponenta pro ┼íipku v textu (jeliko┼ż Lucide ArrowRight tam nesed─Ťla)
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default TextCompression;
