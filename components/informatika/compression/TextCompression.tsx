
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Hash, FileText, Zap, Trophy, PlusCircle, AlertCircle, Sparkles, Lock } from 'lucide-react';

interface TextLevel {
  id: number;
  title: string;
  lines: string[];
}

const LEVELS: TextLevel[] = [
  {
    id: 1,
    title: "Modrý svět",
    lines: [
      "MODRÉ MOŘE, MODRÝ LES,",
      "MODRÉ NEBE, MODRÝ PES.",
      "MODRÉ MOŘE, MODRÝ LES,",
      "BĚŽÍ TUDY MODRÝ PES."
    ]
  },
  {
    id: 2,
    title: "Prší, prší",
    lines: [
      "PRŠÍ, PRŠÍ, JEN SE LEJE.",
      "KAM KONÍČKY POJEDEME?",
      "POJEDEME NA LUKA,",
      "AŽ KUKAČKA ZAKUKÁ.",
      "POJEDEME NA LUKA,",
      "AŽ KUKAČKA ZAKUKÁ."
    ]
  },
  {
    id: 3,
    title: "Pec nám spadla",
    lines: [
      "PEC NÁM SPADLA, PEC NÁM SPADLA,",
      "KDOŽE NÁM JI OPRAVÍ?",
      "STAREJ PECAŘ NENÍ DOMA,",
      "NEMÁ DOMA KLADIVO.",
      "STAREJ PECAŘ NENÍ DOMA,",
      "NEMÁ DOMA KLADIVO."
    ]
  },
  {
    id: 4,
    title: "Datová smršť",
    lines: [
      "DATA, DATA, VŠUDE DATA,",
      "ZAZIPUJ JE, BUDOU HBITÁ!",
      "DATA, DATA, VŠUDE DATA,",
      "PAK JE POŠLI, NEŽ JSI TÁTA.",
      "ZAZIPUJ JE, ZAZIPUJ,",
      "PAK JIM VOLNO ZARUČUJ."
    ]
  },
  {
    id: 5,
    title: "Robotí pochod",
    lines: [
      "ROBOT KRÁČÍ, ROBOT JDE,",
      "ROBOT PÍŠE, ROBOT VÍ.",
      "KDYŽ ON KRÁČÍ, TAK ON JDE,",
      "KDYŽ ON PÍŠE, TAK ON VÍ.",
      "ROBOT KRÁČÍ, ROBOT JDE,",
      "ROBOT PÍŠE, ROBOT VÍ."
    ]
  },
  {
    id: 6,
    title: "Binární tanec",
    lines: [
      "JEDNA, NULA, JEDNA, NULA,",
      "TO JE NAŠE STARÁ ŠKOLA.",
      "NULA, JEDNA, NULA, JEDNA,",
      "TO JE BITA, TO JE BEDNA.",
      "JEDNA, NULA, JEDNA, NULA,",
      "TO JE BITA, TO JE BEDNA."
    ]
  },
  {
    id: 7,
    title: "Kódovací kaskáda",
    lines: [
      "KÓD JE TADY, KÓD JE TAM,",
      "KÓD JE VŠUDE, KÓD JÁ MÁM.",
      "POKUD KÓD MÁM, KÓD JE TAM,",
      "POKUD KÓD MÁM, KÓD JE TADY.",
      "KÓD JE TADY, KÓD JE TAM,",
      "KÓD JE VŠUDE, KÓD JÁ MÁM."
    ]
  }
];

interface Token {
  id: string;
  text: string;
  cleanWord: string;
  isWord: boolean;
}

const TextCompression: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [dictionary, setDictionary] = useState<{ word: string; code: number }[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<string>>(new Set());
  const [assemblyState, setAssemblyState] = useState<{ [tokenId: string]: string | number }>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isFinalCorrect, setIsFinalCorrect] = useState(false);

  const level = LEVELS[levelIdx];

  const tokensMatrix: Token[][] = useMemo(() => {
    return level.lines.map((line, lIdx) => {
      const parts = line.split(/(\s+)/);
      return parts.map((part, pIdx) => {
        const isWord = /[A-ZČŠŽŘĎŤŇŮÚ]+/.test(part.toUpperCase());
        const cleanWord = part.trim().replace(/[,.?!]/g, '').toUpperCase();
        return { id: `${lIdx}-${pIdx}`, text: part, cleanWord, isWord };
      });
    });
  }, [level]);

  const allTokens = useMemo(() => tokensMatrix.flat(), [tokensMatrix]);
  const allWords = useMemo(() => allTokens.filter(t => t.isWord), [allTokens]);

  const targetDictionaryWords = useMemo(() => {
    const counts: { [word: string]: number } = {};
    allWords.forEach(w => { counts[w.cleanWord] = (counts[w.cleanWord] || 0) + 1; });
    const duplicates = Object.keys(counts).filter(w => counts[w] > 1);
    
    const wordsInOrder: string[] = [];
    allWords.forEach(w => {
      if (duplicates.includes(w.cleanWord) && !wordsInOrder.includes(w.cleanWord)) {
        wordsInOrder.push(w.cleanWord);
      }
    });
    return wordsInOrder;
  }, [allWords]);

  const isDictionaryComplete = dictionary.length === targetDictionaryWords.length;

  const nonEncodableWords = useMemo(() => {
    const dups = new Set(targetDictionaryWords);
    return Array.from(new Set(allWords.filter(w => !dups.has(w.cleanWord)).map(w => w.text)));
  }, [allWords, targetDictionaryWords]);

  useEffect(() => {
    setDictionary([]);
    setSelectedIndices(new Set());
    setAssemblyState({});
    setFeedback(null);
    setIsFinalCorrect(false);
  }, [levelIdx]);

  const stats = useMemo(() => {
    const originalLen = level.lines.reduce((acc, line) => acc + line.length, 0);
    if (originalLen === 0) return { originalLen: 0, totalCompressed: 0, ratio: 100 };
    
    let totalCompressed = 0;
    allTokens.forEach(t => {
      if (!t.isWord) {
        totalCompressed += t.text.length;
      } else {
        const val = assemblyState[t.id];
        if (typeof val === 'number') {
          totalCompressed += val.toString().length;
        } else if (typeof val === 'string') {
          totalCompressed += val.length;
        } else {
          totalCompressed += t.text.length;
        }
      }
    });
    
    const ratio = Math.round((totalCompressed / originalLen) * 100);
    return { originalLen, totalCompressed, ratio };
  }, [level, allTokens, assemblyState]);

  const handleWordClick = (token: Token) => {
    if (isFinalCorrect || !token.isWord || dictionary.some(d => d.word === token.cleanWord)) return;
    const newSelected = new Set(selectedIndices);
    if (newSelected.has(token.id)) newSelected.delete(token.id);
    else newSelected.add(token.id);
    setSelectedIndices(newSelected);
  };

  const addToDictionary = () => {
    if (selectedIndices.size === 0) return;
    const selectedTokens = allTokens.filter(t => selectedIndices.has(t.id));
    const word = selectedTokens[0].cleanWord;
    
    if (!selectedTokens.every(t => t.cleanWord === word)) {
      setFeedback({ type: 'error', message: 'Vyber výskyty pouze jednoho stejného slova!' });
      return;
    }

    const totalOccurrences = allWords.filter(t => t.cleanWord === word).length;
    if (selectedIndices.size !== totalOccurrences) {
      setFeedback({ type: 'error', message: `Slovo ${word} se v textu vyskytuje ${totalOccurrences}x, označ všechny!` });
      return;
    }

    if (totalOccurrences < 2) {
      setFeedback({ type: 'error', message: 'Slovo se neopakuje, nepatří do slovníku.' });
      return;
    }

    const nextTargetWord = targetDictionaryWords[dictionary.length];
    if (word !== nextTargetWord) {
      setFeedback({ type: 'error', message: `Postupuj podle pořadí! Další slovo k uložení je: ${nextTargetWord}` });
      return;
    }

    setDictionary(prev => [...prev, { word, code: prev.length + 1 }]);
    setSelectedIndices(new Set());
    setFeedback({ type: 'success', message: `Slovo ${word} uloženo jako kód #${dictionary.length + 1}.` });

    if (dictionary.length + 1 === targetDictionaryWords.length) {
      setFeedback({ type: 'success', message: 'Slovník je kompletní! Teď doplň zbytek textu vpravo.' });
    }
  };

  const onDragStart = (e: React.DragEvent, value: string | number) => {
    if (isFinalCorrect || !isDictionaryComplete) return;
    e.dataTransfer.setData("text/plain", value.toString());
  };

  const onDrop = (e: React.DragEvent, tokenId: string) => {
    e.preventDefault();
    if (!isDictionaryComplete) return;
    const data = e.dataTransfer.getData("text/plain");
    const value = !isNaN(Number(data)) && data.trim() !== "" ? Number(data) : data;
    setAssemblyState(prev => ({ ...prev, [tokenId]: value }));
  };

  const checkFinal = () => {
    let errors = 0;
    let missing = 0;
    allTokens.forEach(t => {
      if (!t.isWord) return;
      const userVal = assemblyState[t.id];
      if (userVal === undefined) { missing++; return; }
      const dictItem = dictionary.find(d => d.word === t.cleanWord);
      if (dictItem) {
        if (userVal !== dictItem.code) errors++;
      } else {
        if (userVal !== t.text) errors++;
      }
    });

    if (missing > 0) {
        setFeedback({ type: 'error', message: `Doplň všechna prázdná pole v pravém sloupci!` });
        return;
    }

    if (errors === 0) {
      setFeedback({ type: 'success', message: `Skvěle! Komprese hotova na ${stats.ratio}%.` });
      setIsFinalCorrect(true);
    } else {
      setFeedback({ type: 'error', message: `Máš tam ${errors} chyb. Zkontroluj hlavně kódy.` });
    }
  };

  return (
    <div className="w-full max-w-[1400px] flex flex-col gap-6 items-center animate-in fade-in duration-500 pb-10 px-4">
      {/* Header */}
      <div className="w-full bg-white p-5 rounded-[2rem] shadow-lg border border-gray-100 flex items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-blue-600 transition-colors font-black uppercase text-xs tracking-widest shrink-0">
          <ArrowLeft className="w-5 h-5 mr-2" /> Zpět
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {LEVELS.map((l, idx) => (
            <button key={l.id} onClick={() => setLevelIdx(idx)} className={`px-3 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${levelIdx === idx ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 text-blue-600'}`}>
                {l.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 shrink-0">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
            KOMPRESE
          </span>
        </div>
      </div>

      {feedback && (
        <div className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 animate-in slide-in-from-top duration-300 ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
          <span className="font-bold text-sm uppercase tracking-tight">{feedback.message}</span>
        </div>
      )}

      {/* Main Grid: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-full items-stretch">
        
        {/* COL 1: PŮVODNÍ TEXT */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-2 h-5 bg-blue-500 rounded-full"></div>
                1. Původní text
            </h3>
            <div className="flex-1 space-y-4 font-mono text-lg bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                {tokensMatrix.map((line, lIdx) => (
                    <div key={lIdx} className="flex flex-wrap items-center">
                        {line.map(t => {
                            if (!t.isWord) return <span key={t.id} className="whitespace-pre text-gray-800 font-bold">{t.text}</span>;
                            const isSelected = selectedIndices.has(t.id);
                            const isAlreadyInDict = dictionary.some(d => d.word === t.cleanWord);
                            return (
                                <button 
                                    key={t.id} 
                                    disabled={isAlreadyInDict || isFinalCorrect}
                                    onClick={() => handleWordClick(t)} 
                                    className={`px-1 rounded-lg transition-all font-black text-base ${
                                        isAlreadyInDict ? 'bg-emerald-100 text-emerald-700 opacity-60' : 
                                        isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : 
                                        'hover:bg-blue-100 text-black'
                                    }`}
                                >
                                    {t.text}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button 
                onClick={addToDictionary} 
                disabled={isFinalCorrect || selectedIndices.size === 0 || isDictionaryComplete}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-xs transition-all"
            >
                <PlusCircle className="w-5 h-5" /> Přidat do slovníku
            </button>
        </div>

        {/* COL 2: SLOVNÍK A PRVKY (PALETA) */}
        <div className="bg-indigo-900 p-6 rounded-[2.5rem] shadow-xl text-white flex flex-col gap-6">
            <h3 className="text-sm font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                <Hash className="w-5 h-5" />
                2. Slovník a prvky
            </h3>
            
            <div className="flex-1 space-y-6">
                {/* Dictionary Items */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Kódy ze slovníku</p>
                    {dictionary.length === 0 ? (
                        <div className="py-10 text-center text-indigo-400/50 font-bold border-2 border-dashed border-indigo-700 rounded-3xl text-[10px] uppercase">
                            Slovník je zatím prázdný
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2">
                            {dictionary.map(item => (
                                <div 
                                    key={item.code} 
                                    draggable={!isFinalCorrect && isDictionaryComplete}
                                    onDragStart={(e) => onDragStart(e, item.code)}
                                    className={`p-3 bg-indigo-800 rounded-2xl flex items-center gap-4 border border-indigo-700 shadow-sm transition-all ${isFinalCorrect || !isDictionaryComplete ? 'opacity-50' : 'cursor-grab hover:bg-indigo-700 active:scale-95'}`}
                                >
                                    <span className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-black">#{item.code}</span>
                                    <span className="text-xs font-black uppercase truncate">{item.word}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Unique Words - Visible only after dictionary is complete */}
                {isDictionaryComplete && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-500">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Unikátní slova</p>
                        <div className="flex flex-wrap gap-2">
                            {nonEncodableWords.map(word => (
                                <div 
                                    key={word} 
                                    draggable={!isFinalCorrect}
                                    onDragStart={(e) => onDragStart(e, word)}
                                    className={`px-4 py-3 bg-gray-800 rounded-xl text-[10px] font-black uppercase border border-gray-700 transition-all ${isFinalCorrect ? 'opacity-50' : 'cursor-grab hover:bg-gray-700 active:scale-95'}`}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-indigo-950/50 rounded-2xl border border-indigo-800">
                <p className="text-[9px] text-indigo-300 font-bold uppercase italic leading-relaxed">
                    {isDictionaryComplete ? "NÁPOVĚDA: Teď přetahuj kódy a slova do pravého sloupce." : "NÁPOVĚDA: Nejdřív vytvoř kompletní slovník klikáním na slova vlevo."}
                </p>
            </div>
        </div>

        {/* COL 3: KOMPRIMOVANÝ ZÁPIS */}
        <div className={`bg-white p-6 rounded-[2.5rem] shadow-xl border-4 transition-all flex flex-col ${isFinalCorrect ? 'border-emerald-500' : 'border-emerald-50'}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-5 bg-emerald-500 rounded-full"></div>
                    3. Komprimovaný zápis
                </h3>
                {isFinalCorrect && <span className="bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-black text-white">{stats.ratio}% VELIKOSTI</span>}
            </div>

            <div className="flex-1 space-y-4 font-mono text-sm mb-6 flex items-center justify-center">
                {!isDictionaryComplete ? (
                    <div className="text-center p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 flex flex-col items-center gap-4 w-full">
                        <Lock className="w-12 h-12 text-gray-200" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                            Pravý sloupec se odemkne<br/>po dokončení slovníku
                        </p>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col space-y-4 animate-in fade-in duration-700">
                        {isFinalCorrect ? (
                            <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 space-y-3 h-full">
                                {tokensMatrix.map((line, lIdx) => (
                                    <div key={lIdx} className="text-emerald-900 font-black tracking-tight leading-relaxed text-lg">
                                        {line.map(t => {
                                            if (!t.isWord) return <span key={t.id} className="whitespace-pre">{t.text}</span>;
                                            const val = assemblyState[t.id];
                                            return <span key={t.id} className={typeof val === 'number' ? 'text-blue-600' : ''}>{typeof val === 'number' ? `#${val}` : val}</span>;
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full bg-emerald-50/30 p-4 rounded-3xl border border-dashed border-emerald-100 space-y-4 overflow-y-auto">
                                {tokensMatrix.map((line, lIdx) => (
                                    <div key={lIdx} className="flex flex-wrap items-center gap-1 min-h-[40px]">
                                        {line.map(t => {
                                            if (!t.isWord) return <span key={t.id} className="whitespace-pre text-gray-400 font-bold">{t.text}</span>;
                                            const val = assemblyState[t.id];
                                            return (
                                                <div 
                                                    key={t.id} 
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => onDrop(e, t.id)}
                                                    className={`min-w-[45px] h-9 px-2 rounded-xl font-black transition-all border-2 text-[10px] flex items-center justify-center ${
                                                        val !== undefined ? 
                                                        'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 
                                                        'bg-emerald-50/80 border-emerald-300 text-emerald-600 border-dashed hover:border-emerald-500 hover:bg-emerald-100/50 cursor-pointer'
                                                    }`}
                                                >
                                                    {val !== undefined ? (typeof val === 'number' ? `#${val}` : val) : ''}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isDictionaryComplete && (
                <>
                    {isFinalCorrect ? (
                        <div className="space-y-4 animate-in zoom-in duration-500">
                            <div className="p-4 bg-emerald-600 rounded-2xl text-white text-center">
                                <Trophy className="w-6 h-6 mx-auto mb-2" />
                                <p className="font-black uppercase tracking-widest text-[10px]">Paráda! Ušetřeno {100 - stats.ratio}% místa.</p>
                            </div>
                            <button onClick={() => setLevelIdx((levelIdx + 1) % LEVELS.length)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-black transition-all">
                                Další básnička
                            </button>
                        </div>
                    ) : (
                        <button onClick={checkFinal} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm transition-all">
                            Ověřit správnost
                        </button>
                    )}
                </>
            )}
        </div>

      </div>
    </div>
  );
};

export default TextCompression;
