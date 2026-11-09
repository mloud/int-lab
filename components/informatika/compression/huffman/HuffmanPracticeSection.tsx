"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const EXERCISES = [
  {
    id: 1,
    type: 'encode',
    word: 'KOKOS',
    question: 'Na zahřátí: Sestav strom pro slovo KOKOS. Zapiš sem výsledný binární kód.',
    hint: 'Mělo by ti vyjít velmi krátké kódování. Nezapomeň, že konkrétní nuly a jedničky závisí na tom, kam dáš levé/pravé větve.',
  },
  {
    id: 2,
    type: 'encode',
    word: 'KAMARADKA',
    question: 'Tady už bude strom hlubší! Sestav strom pro slovo KAMARADKA a napiš zakódovaný tvar.',
    hint: 'Znak A má největší frekvenci (4x), takže by měl být úplně nejvýše u kořene (mít nejkratší kód). Ostatní znaky propadnou mnohem hlouběji.',
  },
  {
    id: 3,
    type: 'size',
    word: 'MATEMATIKA',
    question: 'Pro slovo MATEMATIKA spočítej: Kolik bitů celkem zabere výsledný zakódovaný text?',
    hint: 'Tento strom už se hodně větví. Sečti délky kódů pro každé písmeno pronásobené jeho četností.',
  },
  {
    id: 4,
    type: 'savings',
    word: 'POPOCATEPETL',
    question: 'Sopka POPOCATEPETL má 12 znaků. Kolik bitů ušetříme použitím naší Huffmanovy komprese oproti klasickému ASCII (kde 1 znak = 8 bitů)?',
    hint: 'V ASCII zabere 96 bitů (12×8). Spočítej si celkovou délku Huffmanova kódu a odečti ji od 96.',
  },
  {
    id: 5,
    type: 'size',
    word: 'NEJNEOBHOSPODAROVAVATELNEJSI',
    question: 'Finální boss! Slovo NEJNEOBHOSPODAROVAVATELNEJSI má 28 znaků a plno unikátních písmen (frekvence 1). Jak velký bude výsledný zakódovaný text v bitech?',
    hint: 'Udělej si opravdu hodně místa na papíře. Máš tu spoustu znaků s četností 1, které vytvoří masivní, hluboký strom. Buď při spojování uzlů velmi pečlivý!',
  }
];

function getOptimalHuffmanLength(text: string): number {
  const counts: Record<string, number> = {};
  for (const char of text) {
    counts[char] = (counts[char] || 0) + 1;
  }
  const pq = Object.values(counts).sort((a, b) => a - b);
  if (pq.length === 0) return 0;
  if (pq.length === 1) return text.length; 
  
  let totalBits = 0;
  while (pq.length > 1) {
    pq.sort((a, b) => a - b);
    const a = pq.shift()!;
    const b = pq.shift()!;
    totalBits += a + b;
    pq.push(a + b);
  }
  return totalBits;
}


export const PracticeSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [checked, setChecked] = useState<Record<number,boolean|null>>({});
  const [showHint, setShowHint] = useState<Record<number,boolean>>({});
  const [openId, setOpenId] = useState<number | null>(1);

  const check = (id: number, type: string, word: string) => {
    const userAns = (answers[id] || '').trim().replace(/\s+/g, '');
    const optimal = getOptimalHuffmanLength(word);
    
    let isCorrect = false;
    
    if (type === 'encode') {
      if (/^[01]+$/.test(userAns) && userAns.length === optimal) {
        isCorrect = true;
      }
    } else if (type === 'size') {
      if (parseInt(userAns, 10) === optimal) {
        isCorrect = true;
      }
    } else if (type === 'savings') {
      const asciiLength = word.length * 8;
      if (parseInt(userAns, 10) === (asciiLength - optimal)) {
        isCorrect = true;
      }
    }
    
    setChecked(prev => ({ ...prev, [id]: isCorrect }));
  };

  const typeColor: Record<string,string> = {
    encode: 'bg-amber-50 border-amber-200 text-amber-700',
    size: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    savings: 'bg-blue-50 border-blue-200 text-blue-700',
  };
  const typeLabel: Record<string,string> = {
    encode: 'Vlastní kódování', size: 'Počet bitů', savings: 'Úspora',
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight">Zkoušení (papír a tužka)</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Nyní si vyzkoušíš kompresi v praxi. Připrav si papír a tužku! Ke každému zadanému slovu si 
        **sestav vlastní Huffmanův strom**. Nemusíš ho nikam obkreslovat – pro ověření nám stačí 
        jen zkontrolovat celkovou délku kódu (případně počet ušetřených bitů), protože to je při bezchybném 
        postupu vždy stejné, i když každý může postavit strom trochu jinak.
      </p>
      
      <div className="flex flex-col gap-4">
        {EXERCISES.map((ex) => {
          const result = checked[ex.id];
          const isOpen = openId === ex.id;
          
          return (
            <div key={ex.id} className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
              result === true ? 'border-emerald-300 shadow-sm' : 'border-gray-100 shadow-sm hover:border-gray-200'
            }`}>
              <button 
                onClick={() => setOpenId(isOpen ? null : ex.id)}
                className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${
                  isOpen ? 'bg-gray-50 border-b border-gray-100' : 'bg-white'
                }`}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-black border-2 border-gray-200">
                  {ex.id}
                </div>
                <div className="flex-shrink-0">
                  <span className={`text-xs font-black px-3 py-1 rounded-lg border-2 ${typeColor[ex.type]}`}>
                    {typeLabel[ex.type]}
                  </span>
                </div>
                <div className={`flex-1 font-bold text-base md:text-lg ${result === true ? 'text-emerald-800' : 'text-gray-800'}`}>
                  {ex.question}
                </div>
                {result === true && <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 ml-2" />}
                <div className="flex-shrink-0 ml-2">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-6 bg-white animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <input
                      type="text"
                      value={answers[ex.id] || ''}
                      onChange={e => {
                        setAnswers(prev => ({ ...prev, [ex.id]: e.target.value }));
                        setChecked(prev => ({ ...prev, [ex.id]: null }));
                      }}
                      onKeyDown={e => e.key==='Enter' && check(ex.id, ex.type, ex.word)}
                      placeholder={ex.type === 'encode' ? 'Zadej kód (např. 1010...)' : 'Zadej číslo...'}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-mono font-bold text-lg outline-none transition-all ${
                        result === true ? 'border-emerald-400 bg-emerald-50 text-emerald-700' :
                        result === false ? 'border-red-400 bg-red-50 text-red-700' :
                        'border-gray-200 focus:border-blue-400 bg-gray-50'
                      }`}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => check(ex.id, ex.type, ex.word)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all uppercase tracking-wide text-sm flex-1 sm:flex-none"
                      >
                        Ověřit
                      </button>
                      <button
                        onClick={() => setShowHint(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-xl transition-all text-sm"
                        title="Zobrazit nápovědu"
                      >
                        💡
                      </button>
                    </div>
                  </div>
                  
                  {result === true && (
                    <div className="mt-4 flex flex-col gap-1 text-emerald-700 bg-emerald-50 px-5 py-4 rounded-xl border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 font-black text-lg">
                        <CheckCircle className="w-5 h-5" /> Správně! Výborně!
                      </div>
                      {ex.type === 'encode' && (
                        <p className="text-sm font-medium mt-1">
                          Tento kód má optimální délku ({getOptimalHuffmanLength(ex.word)} bitů). Zkontroluj si ještě pro jistotu zpětně sám, zda jej dokážeš dekódovat zpět.
                        </p>
                      )}
                    </div>
                  )}
                  {result === false && (
                    <div className="mt-4 text-red-600 font-bold text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2">
                      <span>✗</span> Odpověď zatím není správná, zkus to znovu.
                    </div>
                  )}
                  {showHint[ex.id] && (
                    <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl text-amber-800 font-medium text-sm animate-in fade-in">
                      💡 {ex.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
