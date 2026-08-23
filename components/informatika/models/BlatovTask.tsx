
import React, { useState, useMemo } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RefreshCcw, ChevronRight, ChevronLeft, Home, Construction } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  id: string;
  from: string;
  to: string;
}

interface BlatovLevel {
  id: number;
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

const LEVELS: BlatovLevel[] = [
  {
    id: 1,
    title: "První propojení",
    description: "Propoj 4 domy tak, aby byly všechny dostupné a použil jsi co nejméně cest.",
    nodes: [
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 300, y: 100 },
      { id: "C", x: 100, y: 250 },
      { id: "D", x: 300, y: 250 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "A", to: "C" },
      { id: "e3", from: "B", to: "D" },
      { id: "e4", from: "C", to: "D" },
      { id: "e5", from: "A", to: "D" },
    ]
  },
  {
    id: 2,
    title: "Pětice domů",
    description: "Propoj 5 domů minimálním počtem cest.",
    nodes: [
      { id: "A", x: 200, y: 50 },
      { id: "B", x: 350, y: 150 },
      { id: "C", x: 300, y: 280 },
      { id: "D", x: 100, y: 280 },
      { id: "E", x: 50, y: 150 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "E" },
      { id: "e5", from: "E", to: "A" },
      { id: "e6", from: "A", to: "C" },
      { id: "e7", from: "B", to: "E" },
    ]
  },
  {
    id: 3,
    title: "Mřížka 2x3",
    description: "Vytvoř kostru pro 6 domů v mřížce.",
    nodes: [
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 250, y: 100 },
      { id: "C", x: 400, y: 100 },
      { id: "D", x: 100, y: 250 },
      { id: "E", x: 250, y: 250 },
      { id: "F", x: 400, y: 250 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "D", to: "E" },
      { id: "e4", from: "E", to: "F" },
      { id: "e5", from: "A", to: "D" },
      { id: "e6", from: "B", to: "E" },
      { id: "e7", from: "C", to: "F" },
      { id: "e8", from: "B", to: "D" },
      { id: "e9", from: "C", to: "E" },
    ]
  },
  {
    id: 4,
    title: "Centrální uzel",
    description: "Propoj domy přes centrální náměstí.",
    nodes: [
      { id: "M", x: 250, y: 175 }, // Middle
      { id: "A", x: 100, y: 50 },
      { id: "B", x: 400, y: 50 },
      { id: "C", x: 450, y: 175 },
      { id: "D", x: 400, y: 300 },
      { id: "E", x: 100, y: 300 },
      { id: "F", x: 50, y: 175 },
    ],
    edges: [
      { id: "e1", from: "M", to: "A" },
      { id: "e2", from: "M", to: "B" },
      { id: "e3", from: "M", to: "C" },
      { id: "e4", from: "M", to: "D" },
      { id: "e5", from: "M", to: "E" },
      { id: "e6", from: "M", to: "F" },
      { id: "e7", from: "A", to: "B" },
      { id: "e8", from: "B", to: "C" },
      { id: "e9", from: "C", to: "D" },
      { id: "e10", from: "D", to: "E" },
      { id: "e11", from: "E", to: "F" },
      { id: "e12", from: "F", to: "A" },
    ]
  },
  {
    id: 5,
    title: "Blátov (PDF)",
    description: "Konečně Blátov! Propoj všech 9 domů minimálním počtem cest.",
    nodes: [
      { id: "A", x: 100, y: 80 }, { id: "B", x: 250, y: 80 }, { id: "C", x: 400, y: 80 },
      { id: "D", x: 100, y: 180 }, { id: "E", x: 250, y: 180 }, { id: "F", x: 400, y: 180 },
      { id: "G", x: 100, y: 280 }, { id: "H", x: 250, y: 280 }, { id: "I", x: 400, y: 280 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" }, { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "D", to: "E" }, { id: "e4", from: "E", to: "F" },
      { id: "e5", from: "G", to: "H" }, { id: "e6", from: "H", to: "I" },
      { id: "e7", from: "A", to: "D" }, { id: "e8", from: "D", to: "G" },
      { id: "e9", from: "B", to: "E" }, { id: "e10", from: "E", to: "H" },
      { id: "e11", from: "C", to: "F" }, { id: "e12", from: "F", to: "I" },
      { id: "e13", from: "B", to: "D" }, { id: "e14", from: "E", to: "C" },
      { id: "e15", from: "H", to: "F" }, { id: "e16", from: "E", to: "G" },
    ]
  },
  {
    id: 6,
    title: "Ztracená Lhota",
    description: "Nepravidelné uspořádání 7 domů. Najdi nejúspornější propojení.",
    nodes: [
      { id: "A", x: 80, y: 150 },
      { id: "B", x: 180, y: 60 },
      { id: "C", x: 220, y: 240 },
      { id: "D", x: 320, y: 100 },
      { id: "E", x: 350, y: 280 },
      { id: "F", x: 450, y: 180 },
      { id: "G", x: 250, y: 150 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "A", to: "C" },
      { id: "e3", from: "B", to: "G" },
      { id: "e4", from: "C", to: "G" },
      { id: "e5", from: "B", to: "D" },
      { id: "e6", from: "G", to: "D" },
      { id: "e7", from: "G", to: "E" },
      { id: "e8", from: "C", to: "E" },
      { id: "e9", from: "D", to: "F" },
      { id: "e10", from: "E", to: "F" },
      { id: "e11", from: "D", to: "E" },
    ]
  }
];

interface BlatovTaskProps {
  onBack: () => void;
}

const BlatovTask: React.FC<BlatovTaskProps> = ({ onBack }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex];
  
  const [selectedEdges, setSelectedEdges] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleEdge = (edgeId: string) => {
    if (status !== 'idle') return;
    const next = new Set(selectedEdges);
    if (next.has(edgeId)) next.delete(edgeId);
    else next.add(edgeId);
    setSelectedEdges(next);
  };

  const checkSolution = () => {
    const edgeCount = selectedEdges.size;
    const requiredEdges = currentLevel.nodes.length - 1;

    if (edgeCount !== requiredEdges) {
      setStatus('wrong');
      setErrorMessage(edgeCount < requiredEdges ? "Použij více cest!" : "Použij méně cest!");
      return;
    }

    // Check connectivity using BFS
    const adj: { [key: string]: string[] } = {};
    currentLevel.nodes.forEach(n => adj[n.id] = []);
    
    currentLevel.edges.forEach(e => {
      if (selectedEdges.has(e.id)) {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from);
      }
    });

    const visited = new Set<string>();
    const queue = [currentLevel.nodes[0].id];
    visited.add(currentLevel.nodes[0].id);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const neighbor of adj[curr]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    if (visited.size === currentLevel.nodes.length) {
      setStatus('correct');
      setErrorMessage('');
    } else {
      setStatus('wrong');
      setErrorMessage("Některé domy nejsou propojené!");
    }
  };

  const resetLevel = () => {
    setSelectedEdges(new Set());
    setStatus('idle');
    setErrorMessage('');
  };

  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      resetLevel();
    }
  };

  const prevLevel = () => {
    if (levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
      resetLevel();
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-purple-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Blátov: Kostra grafu</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={prevLevel}
            disabled={levelIndex === 0}
            className="p-2 hover:bg-purple-50 rounded-xl disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <span className="font-black text-purple-600 uppercase text-sm tracking-widest">Úroveň {levelIndex + 1} / {LEVELS.length}</span>
          <button 
            onClick={nextLevel}
            disabled={levelIndex === LEVELS.length - 1}
            className="p-2 hover:bg-purple-50 rounded-xl disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Graph Visualization */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{currentLevel.title}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{currentLevel.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cesty</span>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-black ${selectedEdges.size === currentLevel.nodes.length - 1 ? 'text-emerald-500' : 'text-purple-600'}`}>
                  {selectedEdges.size}
                </span>
                <span className="text-gray-300 font-black">/</span>
                <span className="text-xl font-black text-gray-400">{currentLevel.nodes.length - 1}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full aspect-[16/9] relative bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-crosshair">
            <svg viewBox="0 0 500 350" className="w-full h-full p-10">
              {/* Edges (Clickable areas) */}
              {currentLevel.edges.map((edge) => {
                const from = currentLevel.nodes.find(n => n.id === edge.from)!;
                const to = currentLevel.nodes.find(n => n.id === edge.to)!;
                const isSelected = selectedEdges.has(edge.id);
                
                return (
                  <g key={edge.id} onClick={() => toggleEdge(edge.id)} className="cursor-pointer group">
                    {/* Invisible thick line for easier clicking */}
                    <line 
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke="transparent"
                      strokeWidth="20"
                    />
                    <line 
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke={isSelected ? "#10b981" : "#e2e8f0"}
                      strokeWidth={isSelected ? "6" : "4"}
                      strokeLinecap="round"
                      className="transition-all duration-300 group-hover:stroke-purple-200"
                    />
                    {isSelected && (
                      <circle 
                        cx={(from.x + to.x) / 2} cy={(from.y + to.y) / 2} r="4"
                        fill="#10b981"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
              
              {/* Nodes */}
              {currentLevel.nodes.map((node) => (
                <g key={node.id} className="pointer-events-none">
                  <circle 
                    cx={node.x} cy={node.y} r="18"
                    fill="white"
                    stroke="#cbd5e1"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  <Home className="w-5 h-5 text-gray-400" x={node.x - 10} y={node.y - 10} />
                  <text 
                    x={node.x} y={node.y + 32} 
                    textAnchor="middle"
                    fill="#94a3b8"
                    className="text-[10px] font-black uppercase tracking-widest"
                  >
                    {node.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-8 w-full p-6 bg-purple-50 rounded-2xl border border-purple-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-purple-500 shrink-0" />
            <p className="text-xs text-purple-800 font-medium leading-relaxed">
              Kliknutím na šedé čáry mezi domy postavíš cestu. Tvým úkolem je propojit <strong>všechny domy</strong> tak, aby se dalo dojít odkudkoliv kamkoliv, ale s použitím <strong>minimálního počtu cest</strong>.
            </p>
          </div>
        </div>

        {/* Controls and Feedback */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8 w-full text-left">Ovládání</h3>
            
            <div className="w-full flex flex-col gap-4">
              <button 
                onClick={checkSolution}
                disabled={status === 'correct'}
                className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-50"
              >
                Zkontrolovat
              </button>
              
              <button 
                onClick={resetLevel}
                className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Resetovat
              </button>
            </div>

            <div className="mt-8 w-full min-h-[120px] flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-gray-100">
              {status === 'idle' && (
                <div className="flex flex-col items-center gap-2 text-gray-300">
                  <Construction className="w-8 h-8 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Stavba probíhá...</span>
                </div>
              )}
              
              {status === 'correct' && (
                <div className="flex flex-col items-center gap-3 text-emerald-500 animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12" />
                  <span className="text-sm font-black uppercase tracking-widest">Skvělá práce!</span>
                  <p className="text-[10px] font-bold text-emerald-600/60 uppercase">Vytvořil jsi perfektní kostru grafu.</p>
                </div>
              )}

              {status === 'wrong' && (
                <div className="flex flex-col items-center gap-3 text-red-500 animate-in shake">
                  <XCircle className="w-12 h-12" />
                  <span className="text-sm font-black uppercase tracking-widest">Něco je špatně</span>
                  <p className="text-[10px] font-bold text-red-600/60 uppercase">{errorMessage}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-[10px] font-black uppercase tracking-widest underline underline-offset-4 hover:text-red-700"
                  >
                    Zkusit opravit
                  </button>
                </div>
              )}
            </div>
          </div>

          {status === 'correct' && levelIndex < LEVELS.length - 1 && (
            <button 
              onClick={nextLevel}
              className="w-full py-6 bg-emerald-500 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all animate-in slide-in-from-bottom duration-500 flex items-center justify-center gap-3"
            >
              Další úroveň
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-4">Věděli jste?</h3>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              V informatice se tomuto říká <strong>Kostra grafu</strong> (Spanning Tree). Je to takové propojení všech bodů, ve kterém nejsou žádné zbytečné okruhy (cykly). Pokud by cesty měly různé ceny, hledali bychom <strong>Minimální kostru grafu</strong>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default BlatovTask;
