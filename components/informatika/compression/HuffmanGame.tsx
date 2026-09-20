import React, { useState } from 'react';
import { ArrowLeft, BookOpen, PlayCircle, Edit3, ChevronRight, RefreshCw } from 'lucide-react';

const HuffmanDemo = () => {
  const [step, setStep] = useState(0);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [highlightedChar, setHighlightedChar] = useState<string | null>(null);

  const nextStep = () => {
    const newStep = Math.min(step + 1, 8);
    setStep(newStep);
    // V kroku 8 chceme v slovníku vidět všechny znaky z předchozího kroku
    if (newStep === 8) {
      setRevealedChars(['A', 'D', 'K', 'B', 'R']);
    } else {
      setRevealedChars([]);
    }
    setHighlightedChar(null);
  };
  const reset = () => {
    setStep(0);
    setRevealedChars([]);
    setHighlightedChar(null);
  };

  // Cesty od kořene k listům (indexy hran)
  // Hrany: 0=D->DK, 1=K->DK, 2=B->BR, 3=R->BR, 4=DK->DKBR, 5=BR->DKBR, 6=A->ROOT, 7=DKBR->ROOT
  const CHAR_PATHS: Record<string, { edgeIndices: number[], nodeIds: string[], code: string, count: number }> = {
    'A': { edgeIndices: [6],       nodeIds: ['ROOT', 'A'],               code: '0',   count: 5 },
    'D': { edgeIndices: [7, 4, 0], nodeIds: ['ROOT', 'DKBR', 'DK', 'D'], code: '100', count: 1 },
    'K': { edgeIndices: [7, 4, 1], nodeIds: ['ROOT', 'DKBR', 'DK', 'K'], code: '101', count: 1 },
    'B': { edgeIndices: [7, 5, 2], nodeIds: ['ROOT', 'DKBR', 'BR', 'B'], code: '110', count: 2 },
    'R': { edgeIndices: [7, 5, 3], nodeIds: ['ROOT', 'DKBR', 'BR', 'R'], code: '111', count: 2 },
  };

  const handleLeafClick = (char: string) => {
    if (step !== 7) return;
    setHighlightedChar(char);
    if (!revealedChars.includes(char)) {
      setRevealedChars(prev => [...prev, char]);
    }
  };

  // Souřadnice uzlů – appearsAtStep říká, ve kterém kroku se uzel poprvé objeví
  const nodes: Record<string, any> = {
    A:    { x: 150, y: 350, label: 'A',     val: 5,  type: 'leaf',  visible: step >= 1, appearsAtStep: 1 },
    B:    { x: 300, y: 350, label: 'B',     val: 2,  type: 'leaf',  visible: step >= 1, appearsAtStep: 1 },
    R:    { x: 450, y: 350, label: 'R',     val: 2,  type: 'leaf',  visible: step >= 1, appearsAtStep: 1 },
    D:    { x: 600, y: 350, label: 'D',     val: 1,  type: 'leaf',  visible: step >= 1, appearsAtStep: 1 },
    K:    { x: 750, y: 350, label: 'K',     val: 1,  type: 'leaf',  visible: step >= 1, appearsAtStep: 1 },
    DK:   { x: 675, y: 250, label: 'DK',   val: 2,  type: 'inner', visible: step >= 2, appearsAtStep: 2 },
    BR:   { x: 375, y: 250, label: 'BR',   val: 4,  type: 'inner', visible: step >= 3, appearsAtStep: 3 },
    DKBR: { x: 525, y: 150, label: 'DKBR', val: 6,  type: 'inner', visible: step >= 4, appearsAtStep: 4 },
    ROOT: { x: 337, y: 50,  label: 'ADKBR',val: 11, type: 'inner', visible: step >= 5, appearsAtStep: 5 },
  };

  // animOrder: 0 = levá hrana (animuje první), 1 = pravá hrana (animuje druhá)
  // leafOrder: pořadí listu v kroku 1 (pro staggered animaci)
  const edges = [
    { from: nodes.D,    to: nodes.DK,   label: '0', visible: step >= 2, appearsAtStep: 2, animOrder: 0 },  // 0
    { from: nodes.K,    to: nodes.DK,   label: '1', visible: step >= 2, appearsAtStep: 2, animOrder: 1 },  // 1
    { from: nodes.B,    to: nodes.BR,   label: '0', visible: step >= 3, appearsAtStep: 3, animOrder: 0 },  // 2
    { from: nodes.R,    to: nodes.BR,   label: '1', visible: step >= 3, appearsAtStep: 3, animOrder: 1 },  // 3
    { from: nodes.DK,   to: nodes.DKBR, label: '0', visible: step >= 4, appearsAtStep: 4, animOrder: 0 },  // 4
    { from: nodes.BR,   to: nodes.DKBR, label: '1', visible: step >= 4, appearsAtStep: 4, animOrder: 1 },  // 5
    { from: nodes.A,    to: nodes.ROOT, label: '0', visible: step >= 5, appearsAtStep: 5, animOrder: 0 },  // 6
    { from: nodes.DKBR, to: nodes.ROOT, label: '1', visible: step >= 5, appearsAtStep: 5, animOrder: 1 },  // 7
  ];

  const highlightedEdges = highlightedChar ? new Set(CHAR_PATHS[highlightedChar]?.edgeIndices) : new Set<number>();
  const highlightedNodes = highlightedChar ? new Set(CHAR_PATHS[highlightedChar]?.nodeIds) : new Set<string>();

  const renderNode = (node: any, id: string) => {
    if (!node.visible) return null;
    const isLeaf = node.type === 'leaf';
    const labelFontSize = node.label.length > 3 ? 9 : node.label.length > 2 ? 11 : 15;
    const r = isLeaf ? 22 : Math.max(22, node.label.length * 8);
    const isOnPath = highlightedNodes.has(id);
    const isClickable = step === 7 && isLeaf;
    const alreadyRevealed = revealedChars.includes(node.label);
    const isNew = step === node.appearsAtStep;

    // Stagger pro listy v kroku 1 (A=0, B=1, R=2, D=3, K=4)
    const leafOrder: Record<string, number> = { A: 0, B: 1, R: 2, D: 3, K: 4 };
    const nodeDelay = isNew && isLeaf ? `${leafOrder[node.label] * 80}ms` : '0ms';

    let fill = isLeaf ? '#dbeafe' : '#d1fae5';
    let stroke = isLeaf ? '#3b82f6' : '#10b981';
    let strokeWidth = 2.5;

    if (isOnPath) { fill = '#fef3c7'; stroke = '#f59e0b'; strokeWidth = 3.5; }
    if (isClickable && alreadyRevealed && !isOnPath) { fill = '#d1fae5'; stroke = '#10b981'; }

    return (
      <g
        key={id}
        onClick={() => isClickable ? handleLeafClick(node.label) : undefined}
        style={{ cursor: isClickable ? 'pointer' : 'default' }}
      >
        {/* Pulzující halo pro nekliknuté listy v kroku 7 */}
        {isClickable && !alreadyRevealed && (
          <ellipse cx={node.x} cy={node.y} rx={r + 8} ry={30}
            fill="none" stroke="#3b82f6" strokeWidth={1.5} opacity={0.4}
            style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
          />
        )}
        {/* Uzel s bounce animací při prvním zobrazení */}
        <ellipse cx={node.x} cy={node.y} rx={r} ry={22} fill={fill} stroke={stroke} strokeWidth={strokeWidth}
          style={isNew ? {
            transformOrigin: `${node.x}px ${node.y}px`,
            transformBox: 'fill-box',
            animation: `nodeAppear 0.45s ease-out ${nodeDelay} both`
          } : {}}
        />
        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={labelFontSize} fontWeight="bold" fill={isOnPath ? '#92400e' : '#1e293b'}
          style={isNew ? {
            transformOrigin: `${node.x}px ${node.y + 5}px`,
            transformBox: 'fill-box',
            animation: `nodeAppear 0.45s ease-out ${nodeDelay} both`
          } : {}}
        >
          {node.label}
        </text>
        <text x={node.x + r + 2} y={node.y + 20} textAnchor="start" fontSize={13} fontWeight="800" fill={isOnPath ? '#b45309' : '#475569'}
          style={isNew ? {
            transformOrigin: `${node.x + r + 2}px ${node.y + 20}px`,
            transformBox: 'fill-box',
            animation: `nodeAppear 0.45s ease-out ${nodeDelay} both`
          } : {}}
        >
          {node.val}
        </text>
      </g>
    );
  };

  const descriptions = [
    "Slovo ABRAKADABRA má 11 znaků. Nejdříve spočítáme, kolikrát se který znak vyskytuje (frekvenční analýza).",
    "Seřadíme znaky podle četnosti. Vytvoříme z nich samostatné uzly stromu.",
    "Najdeme dva uzly s nejmenší četností (D:1 a K:1) a spojíme je do nového uzlu se součtem četností (2).",
    "Opět najdeme dva volné uzly s nejmenší četností. Nyní jsou to B:2 a R:2. Spojíme je do uzlu s hodnotou 4.",
    "Pokračujeme ve spojování. Spojíme nově vytvořený uzel (2) s uzlem (4), vznikne uzel (6).",
    "Nakonec spojíme uzel A (5) s uzlem (6). Vznikne kořen stromu s hodnotou 11. Strom je hotový!",
    "Nyní ohodnotíme hrany stromu. Levé hrany dostanou číslici 0, pravé hrany číslici 1.",
    revealedChars.length < 5
      ? `Klikni na list ve stromě, aby ses dozvěděl jeho kód. Odhaleno: ${revealedChars.length}/5 znaků.`
      : "Výborně! Slovník je kompletní. Každý znak má svůj unikátní binární kód.",
    "Nyní zakódujeme celé slovo. Místo 8 bitů pro každý znak (celkem 88 bitů) jsme použili jen 23 bitů!"
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @keyframes nodeAppear {
          0%   { transform: scale(0);    opacity: 0; }
          80%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes edgeFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
      <div className="flex justify-between items-center bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
        <div className="flex-1">
          <h3 className="font-black text-blue-900 text-xl uppercase tracking-tight mb-2">Krok {step}: {
            ['Frekvence', 'Uzly', 'První spojení', 'Druhé spojení', 'Třetí spojení', 'Kořen stromu', 'Ohodnocení hran', 'Vytvoření slovníku', 'Zakódování slova'][step]
          }</h3>
          <p className="text-blue-800/80 font-medium m-0">{descriptions[step]}</p>
        </div>
        <div className="flex gap-4 ml-6">
          <button onClick={reset} className="p-3 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl shadow-sm transition-colors" title="Začít znovu">
            <RefreshCw className="w-6 h-6" />
          </button>
          <button
            onClick={nextStep}
            disabled={step >= 8 || (step === 7 && revealedChars.length < 5)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
            title={step === 7 && revealedChars.length < 5 ? 'Nejdříve odhal všechny znaky kliknutím na listy stromu' : ''}
          >
            {step >= 8 ? 'Konec' : 'Další krok'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border-2 border-gray-100 p-6 flex flex-col items-center min-h-[450px]">
          {step === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
              <h1 className="text-5xl md:text-7xl font-black text-gray-800 tracking-widest mb-12 drop-shadow-sm font-mono">
                {Array.from("ABRAKADABRA").map((char, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredChar(char)}
                    onMouseLeave={() => setHoveredChar(null)}
                    className={`inline-block transition-all duration-200 cursor-default mx-1 ${
                      hoveredChar === char
                        ? '-translate-y-3 text-blue-600 drop-shadow-lg scale-110'
                        : 'hover:-translate-y-2'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { char: 'A', count: 5 }, { char: 'B', count: 2 }, { char: 'R', count: 2 },
                  { char: 'K', count: 1 }, { char: 'D', count: 1 }
                ].map(item => (
                  <div
                    key={item.char}
                    onMouseEnter={() => setHoveredChar(item.char)}
                    onMouseLeave={() => setHoveredChar(null)}
                    className={`rounded-2xl p-4 flex flex-col items-center border-2 transition-all duration-200 cursor-default ${
                      hoveredChar === item.char
                        ? 'bg-blue-50 border-blue-400 -translate-y-2 shadow-lg shadow-blue-100'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className={`text-3xl font-black mb-2 transition-colors duration-200 ${hoveredChar === item.char ? 'text-blue-600' : 'text-blue-400'}`}>{item.char}</span>
                    <span className={`font-black text-lg transition-colors duration-200 ${hoveredChar === item.char ? 'text-blue-700' : 'text-gray-400'}`}>{item.count}×</span>
                  </div>
                ))}
              </div>
            </div>
          ) : step === 8 ? (
            <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500 p-4">
               <h3 className="text-xl font-bold text-gray-600 mb-6 uppercase tracking-wider">Výsledek komprese</h3>
               <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl">
                 {Array.from("ABRAKADABRA").map((char, i) => {
                   const code = char === 'A' ? '0' : char === 'B' ? '110' : char === 'R' ? '111' : char === 'K' ? '101' : '100';
                   return (
                     <div key={i} className="flex flex-col items-center group">
                       <span className="text-xl font-black text-gray-800 bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center mb-1 group-hover:bg-blue-100 transition-colors">{char}</span>
                       <span className="font-mono text-emerald-600 font-bold">{code}</span>
                     </div>
                   );
                 })}
               </div>
               <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 w-full max-w-md text-center">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-600 font-bold">Původní velikost:</span>
                   <span className="font-mono font-black text-gray-800 text-lg">88 bitů</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-emerald-700 font-bold">Nová velikost:</span>
                   <span className="font-mono font-black text-emerald-600 text-2xl">23 bitů</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(23/88)*100}%` }}></div>
                 </div>
                 <p className="text-sm font-bold text-emerald-800 mt-3 text-right">Ušetřeno 74% místa!</p>
               </div>
            </div>
          ) : (
            <svg viewBox="0 0 850 420" className="w-full h-full max-h-[420px]">
              {/* Edges */}
              {edges.map((edge, i) => {
                if (!edge.visible) return null;
                const isHighlighted = highlightedEdges.has(i);
                const isNew = step === edge.appearsAtStep;
                // Levá hrana fade po 0.45s, pravá po 0.90s
                const edgeDelay = isNew ? `${0.45 + edge.animOrder * 0.45}s` : '0s';
                return (
                  <g key={`edge-${i}`}>
                    <line
                      x1={edge.from.x} y1={edge.from.y}
                      x2={edge.to.x} y2={edge.to.y}
                      stroke={isHighlighted ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={isHighlighted ? 4 : 2}
                      style={isNew ? {
                        opacity: 0,
                        animation: `edgeFade 0.35s ease-out ${edgeDelay} forwards`,
                      } : {}}
                    />
                    {step >= 6 && (
                      <text
                        x={(edge.from.x + edge.to.x) / 2 + (edge.from.x < edge.to.x ? -14 : 14)}
                        y={(edge.from.y + edge.to.y) / 2}
                        textAnchor="middle"
                        fontSize={isHighlighted ? 18 : 14}
                        fontWeight="900"
                        fill={isHighlighted ? '#d97706' : '#f97316'}
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
              {/* Nodes */}
              {Object.entries(nodes).map(([id, node]) => renderNode(node, id))}
              {/* Hint text in step 7 */}
              {step === 7 && revealedChars.length < 5 && (
                <text x="425" y="410" textAnchor="middle" fontSize="13" fill="#6b7280" fontWeight="600">
                  ↑ Klikni na písmeno (modrý uzel) pro odhalení jeho kódu
                </text>
              )}
            </svg>
          )}
        </div>

        {/* Dictionary Panel */}
        <div className="bg-white rounded-3xl shadow-md border-2 border-gray-100 p-6 flex flex-col">
          <h3 className="font-black text-gray-800 uppercase tracking-tight mb-4 text-center border-b-2 border-gray-100 pb-4">Huffmanův slovník</h3>

          <div className="flex-1 flex flex-col gap-3">
            {Object.entries(CHAR_PATHS).map(([char, info]) => {
              const isRevealed = revealedChars.includes(char);
              const isActive = highlightedChar === char;
              const showSlot = step >= 7;
              return (
                <div
                  key={char}
                  onClick={() => step === 7 ? handleLeafClick(char) : undefined}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-500 cursor-pointer
                    ${!showSlot ? 'opacity-0 translate-x-8 border-transparent' : ''}
                    ${showSlot && !isRevealed ? 'border-gray-100 bg-gray-50 opacity-80' : ''}
                    ${isRevealed && !isActive ? 'border-emerald-200 bg-emerald-50' : ''}
                    ${isActive ? 'border-amber-400 bg-amber-50 scale-105 shadow-md shadow-amber-100' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-lg shadow-sm flex items-center justify-center font-black text-xl transition-colors
                      ${isActive ? 'bg-amber-100 text-amber-700' : isRevealed ? 'bg-white text-blue-600' : 'bg-white text-gray-300'}`}>
                      {char}
                    </span>
                    <span className="text-gray-400 text-xs font-bold">{info.count}×</span>
                  </div>
                  {isRevealed ? (
                    <span className={`font-mono font-black text-lg tracking-widest px-3 py-1 rounded-md border transition-colors
                      ${isActive ? 'text-amber-700 bg-amber-100 border-amber-200' : 'text-emerald-600 bg-emerald-50 border-emerald-100'}`}>
                      {info.code}
                    </span>
                  ) : showSlot ? (
                    <span className="text-gray-300 font-bold text-sm">klikni na {char}</span>
                  ) : (
                    <span className="text-gray-300 font-bold">???</span>
                  )}
                </div>
              );
            })}
          </div>

          {step < 7 && (
            <div className="mt-4 text-center text-sm font-bold text-gray-400 bg-gray-50 p-4 rounded-xl border border-gray-100">
              Slovník se zpřístupní v kroku 7.
            </div>
          )}
          {step === 7 && revealedChars.length === 5 && (
            <div className="mt-4 text-center text-sm font-bold text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              ✓ Slovník je kompletní! Pokračuj dalším krokem.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


interface HuffmanGameProps {
  onBack: () => void;
}

type TabType = 'theory' | 'demo' | 'practice';

const HuffmanGame: React.FC<HuffmanGameProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  return (
    <div className="max-w-6xl w-full mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex items-center mb-6 gap-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zpět
        </button>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
          Huffmanovo kódování
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-2 rounded-2xl shadow-md flex gap-2 border border-gray-100">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'theory' 
                ? 'bg-emerald-100 text-emerald-800 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'demo' 
                ? 'bg-blue-100 text-blue-800 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <PlayCircle className="w-4 h-4" /> Ukázka
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'practice' 
                ? 'bg-purple-100 text-purple-800 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="w-4 h-4" /> Zkoušení
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[600px]">
        {activeTab === 'theory' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tight">Co je Huffmanovo kódování?</h2>
            <div className="prose prose-emerald prose-lg max-w-none text-gray-600">
              <p>
                <strong>Huffmanovo kódování</strong> je populární metoda pro <em>bezeztrátovou kompresi dat</em>.
                Základní myšlenkou je přidělovat znakům různé délky binárních kódů na základě toho, jak často se v textu vyskytují.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-6">
                <p className="font-bold text-emerald-900 mb-2 m-0">Zlaté pravidlo komprese:</p>
                <p className="m-0 text-emerald-800">
                  Znaky, které se objevují <strong>často</strong>, dostanou <strong>krátký kód</strong> (např. 1 nebo 2 bity). 
                  Znaky, které se objevují <strong>zřídka</strong>, dostanou <strong>dlouhý kód</strong>.
                </p>
              </div>
              <p>
                Díky tomu je celková délka zakódovaného textu výrazně menší, než kdyby každý znak měl stejně dlouhý kód (jako je tomu např. v kódování ASCII, kde má každý znak přesně 8 bitů).
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Jak to funguje?</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Spočítáme, jak často se každý znak vyskytuje (tzv. frekvenční analýza).</li>
                <li>Z těchto znaků začneme budovat strom zespodu (od listů). Vždy vezmeme dva uzly s nejmenší četností a spojíme je do nového uzlu, jehož četnost je součtem obou.</li>
                <li>Postupujeme tak dlouho, dokud nespojíme všechny uzly do jednoho kořene.</li>
                <li>Hrany stromu pak ohodnotíme nulami a jedničkami (např. vlevo 0, vpravo 1).</li>
                <li>Kód každého znaku je dán cestou od kořene k tomuto znaku.</li>
              </ol>
            </div>

            {/* Vizuální příklad */}
            <h3 className="text-xl font-black text-gray-800 mt-10 mb-6 uppercase tracking-tight border-t-2 border-gray-100 pt-8">Příklad: slovo ABRAKADABRA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start not-prose">
              
              {/* Vstup */}
              <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-sm">1</div>
                  <h4 className="font-black text-blue-900 uppercase tracking-tight">Vstup</h4>
                </div>
                <div className="font-mono font-black text-2xl text-center text-blue-700 tracking-widest mb-4 bg-white rounded-xl py-3 px-2">
                  ABRAKADABRA
                </div>
                <p className="text-xs font-bold text-blue-700 text-center uppercase tracking-wide">11 znaků, 88 bitů v ASCII</p>
                <div className="mt-3 grid grid-cols-5 gap-1">
                  {[['A','5'],['B','2'],['R','2'],['K','1'],['D','1']].map(([ch, cnt]) => (
                    <div key={ch} className="bg-white rounded-lg p-1 flex flex-col items-center border border-blue-200">
                      <span className="font-black text-blue-600 text-sm">{ch}</span>
                      <span className="font-bold text-gray-500 text-[10px]">{cnt}×</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strom */}
              <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-sm">2</div>
                  <h4 className="font-black text-emerald-900 uppercase tracking-tight">Huffmanův strom</h4>
                </div>
                {/* 
                  Správná struktura (shodná s demo záložkou):
                  Listy dole (zleva): A(5), B(2), R(2), D(1), K(1)
                  DK = D+K spojeni, val=2
                  BR = B+R spojeni, val=4
                  DKBR = DK+BR spojeni, val=6
                  ROOT = A+DKBR spojeni, val=11
                  Hrany: ROOT-left=A(0), ROOT-right=DKBR(1)
                         DKBR-left=BR(0), DKBR-right=DK(1)
                         BR-left=B(0), BR-right=R(1)
                         DK-left=D(0), DK-right=K(1)
                  Kódy: A=0, B=100, R=101, D=110, K=111
                */}
                <svg viewBox="0 0 230 175" className="w-full">
                  {/* Hrany – kresleny od rodiče k dítěti */}
                  {/* ROOT(84,20) -> A(37,155) */}
                  <line x1="84" y1="20" x2="37" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* ROOT(84,20) -> DKBR(155,60) */}
                  <line x1="84" y1="20" x2="155" y2="60" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DKBR(155,60) -> BR(105,105) */}
                  <line x1="155" y1="60" x2="105" y2="105" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DKBR(155,60) -> DK(200,105) */}
                  <line x1="155" y1="60" x2="200" y2="105" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* BR(105,105) -> B(80,155) */}
                  <line x1="105" y1="105" x2="80" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* BR(105,105) -> R(130,155) */}
                  <line x1="105" y1="105" x2="130" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DK(200,105) -> D(178,155) */}
                  <line x1="200" y1="105" x2="178" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DK(200,105) -> K(218,155) */}
                  <line x1="200" y1="105" x2="218" y2="155" stroke="#6b7280" strokeWidth="1.5"/>

                  {/* Popisky hran 0/1 */}
                  <text x="52" y="82" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="125" y="34" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="118" y="78" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="182" y="78" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="84" y="135" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="123" y="135" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="180" y="135" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="212" y="135" fontSize="9" fill="#f97316" fontWeight="bold">1</text>

                  {/* Uzly: listy (modré), vnitřní (zelené) */}
                  {/* ROOT */}
                  <circle cx="84" cy="20" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="84" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">11</text>
                  {/* A – list vlevo */}
                  <circle cx="37" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="37" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">A</text>
                  <text x="50" y="166" fontSize="8" fontWeight="800" fill="#475569">5</text>
                  {/* DKBR */}
                  <circle cx="155" cy="60" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="155" y="65" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">6</text>
                  {/* BR */}
                  <circle cx="105" cy="105" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="105" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">4</text>
                  {/* DK */}
                  <circle cx="200" cy="105" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="200" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">2</text>
                  {/* B – list */}
                  <circle cx="80" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="80" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">B</text>
                  <text x="93" y="166" fontSize="8" fontWeight="800" fill="#475569">2</text>
                  {/* R – list */}
                  <circle cx="130" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="130" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">R</text>
                  <text x="143" y="166" fontSize="8" fontWeight="800" fill="#475569">2</text>
                  {/* D – list */}
                  <circle cx="178" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="178" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">D</text>
                  <text x="191" y="166" fontSize="8" fontWeight="800" fill="#475569">1</text>
                  {/* K – list */}
                  <circle cx="218" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="218" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">K</text>
                  <text x="231" y="166" fontSize="8" fontWeight="800" fill="#475569">1</text>
                </svg>
                <p className="text-xs font-bold text-emerald-700 text-center uppercase tracking-wide mt-1">Levá hrana = 0, pravá hrana = 1</p>
              </div>

              {/* Výstup */}
              <div className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-sm">3</div>
                  <h4 className="font-black text-orange-900 uppercase tracking-tight">Výstup</h4>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { ch: 'A', code: '0',   cnt: 5 },
                    { ch: 'B', code: '100', cnt: 2 },
                    { ch: 'R', code: '101', cnt: 2 },
                    { ch: 'D', code: '110', cnt: 1 },
                    { ch: 'K', code: '111', cnt: 1 },
                  ].map(({ ch, code, cnt }) => (
                    <div key={ch} className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 border border-orange-200">
                      <span className="font-black text-orange-600 text-base w-5">{ch}</span>
                      <span className="text-gray-400 text-xs font-bold">{cnt}×</span>
                      <span className="font-mono font-black text-emerald-600">{code}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-3 border border-orange-200 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Výsledná velikost</p>
                  <p className="font-black text-orange-600 text-xl">23 bitů</p>
                  <p className="text-xs font-bold text-emerald-600">místo 88 bitů (−74 %)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demo' && (
          <HuffmanDemo />
        )}

        {activeTab === 'practice' && (
          <div className="w-full h-full flex flex-col items-center justify-center animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
              <Edit3 className="w-12 h-12 text-purple-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight text-center">Prostor pro zkoušení</h2>
            <p className="text-gray-500 text-center max-w-md">
              Tato část zatím není implementována. V budoucnu si zde budete moci vyzkoušet kódování na vlastních slovech.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HuffmanGame;
