
import React, { useState, useMemo } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RefreshCcw, ChevronRight, ChevronLeft, Home, Construction, Coins } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  id: string;
  from: string;
  to: string;
  weight: number;
}

interface MSTLevel {
  id: number;
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

const LEVELS: MSTLevel[] = [
  {
    id: 1,
    title: "Cesta k sousedům",
    description: "Propoj 4 domy s nejmenším počtem dlaždic.",
    nodes: [
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 300, y: 100 },
      { id: "C", x: 100, y: 250 },
      { id: "D", x: 300, y: 250 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B", weight: 5 },
      { id: "e2", from: "A", to: "C", weight: 3 },
      { id: "e3", from: "B", to: "D", weight: 4 },
      { id: "e4", from: "C", to: "D", weight: 6 },
      { id: "e5", from: "B", to: "C", weight: 2 },
    ]
  },
  {
    id: 2,
    title: "Parkové cesty",
    description: "Navrhni nejlevnější síť cest pro 5 domů.",
    nodes: [
      { id: "A", x: 200, y: 50 },
      { id: "B", x: 350, y: 150 },
      { id: "C", x: 300, y: 280 },
      { id: "D", x: 100, y: 280 },
      { id: "E", x: 50, y: 150 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B", weight: 10 },
      { id: "e2", from: "B", to: "C", weight: 8 },
      { id: "e3", from: "C", to: "D", weight: 5 },
      { id: "e4", from: "D", to: "E", weight: 7 },
      { id: "e5", from: "E", to: "A", weight: 9 },
      { id: "e6", from: "A", to: "C", weight: 12 },
      { id: "e7", from: "B", to: "E", weight: 6 },
      { id: "e8", from: "M", to: "A", weight: 4 }, // Wait, M is not in nodes, fixing...
    ]
  },
  {
    id: 3,
    title: "Horská vesnice",
    description: "Propoj 6 domů v náročném terénu.",
    nodes: [
      { id: "A", x: 100, y: 100 }, { id: "B", x: 250, y: 80 }, { id: "C", x: 400, y: 100 },
      { id: "D", x: 100, y: 250 }, { id: "E", x: 250, y: 270 }, { id: "F", x: 400, y: 250 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B", weight: 4 }, { id: "e2", from: "B", to: "C", weight: 5 },
      { id: "e3", from: "D", to: "E", weight: 3 }, { id: "e4", from: "E", to: "F", weight: 4 },
      { id: "e5", from: "A", to: "D", weight: 8 }, { id: "e6", from: "B", to: "E", weight: 2 },
      { id: "e7", from: "C", to: "F", weight: 7 }, { id: "e8", from: "A", to: "E", weight: 6 },
    ]
  },
  {
    id: 4,
    title: "Centrální rozvod",
    description: "Najdi nejlevnější propojení pro 7 domů.",
    nodes: [
      { id: "M", x: 250, y: 175 },
      { id: "A", x: 100, y: 50 }, { id: "B", x: 400, y: 50 },
      { id: "C", x: 450, y: 175 }, { id: "D", x: 400, y: 300 },
      { id: "E", x: 100, y: 300 }, { id: "F", x: 50, y: 175 },
    ],
    edges: [
      { id: "e1", from: "M", to: "A", weight: 7 }, { id: "e2", from: "M", to: "B", weight: 6 },
      { id: "e3", from: "M", to: "C", weight: 5 }, { id: "e4", from: "M", to: "D", weight: 8 },
      { id: "e5", from: "M", to: "E", weight: 9 }, { id: "e6", from: "M", to: "F", weight: 4 },
      { id: "e7", from: "A", to: "B", weight: 10 }, { id: "e8", from: "B", to: "C", weight: 4 },
      { id: "e9", from: "C", to: "D", weight: 11 }, { id: "e10", from: "D", to: "E", weight: 3 },
      { id: "e11", from: "E", to: "F", weight: 12 }, { id: "e12", from: "F", to: "A", weight: 5 },
    ]
  },
  {
    id: 5,
    title: "Velkoměsto",
    description: "Složitá síť 9 domů. Najdi absolutně nejlevnější kostru.",
    nodes: [
      { id: "A", x: 100, y: 80 }, { id: "B", x: 250, y: 80 }, { id: "C", x: 400, y: 80 },
      { id: "D", x: 100, y: 180 }, { id: "E", x: 250, y: 180 }, { id: "F", x: 400, y: 180 },
      { id: "G", x: 100, y: 280 }, { id: "H", x: 250, y: 280 }, { id: "I", x: 400, y: 280 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B", weight: 3 }, { id: "e2", from: "B", to: "C", weight: 10 },
      { id: "e3", from: "D", to: "E", weight: 2 }, { id: "e4", from: "E", to: "F", weight: 4 },
      { id: "e5", from: "G", to: "H", weight: 5 }, { id: "e6", from: "H", to: "I", weight: 1 },
      { id: "e7", from: "A", to: "D", weight: 6 }, { id: "e8", from: "D", to: "G", weight: 4 },
      { id: "e9", from: "B", to: "E", weight: 8 }, { id: "e10", from: "E", to: "H", weight: 7 },
      { id: "e11", from: "C", to: "F", weight: 3 }, { id: "e12", from: "F", to: "I", weight: 9 },
      { id: "e13", from: "B", to: "D", weight: 5 }, { id: "e14", from: "E", to: "C", weight: 6 },
      { id: "e15", from: "H", to: "F", weight: 2 }, { id: "e16", from: "E", to: "G", weight: 11 },
    ]
  }
];

// Fix for Level 2 edge e8
LEVELS[1].edges = LEVELS[1].edges.filter(e => e.id !== 'e8');

interface MSTTaskProps {
  onBack: () => void;
}

const MSTTask: React.FC<MSTTaskProps> = ({ onBack }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex];
  
  const [selectedEdges, setSelectedEdges] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'not-mst'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate actual MST weight using Kruskal's
  const mstWeight = useMemo(() => {
    const sortedEdges = [...currentLevel.edges].sort((a, b) => a.weight - b.weight);
    const parent: { [key: string]: string } = {};
    currentLevel.nodes.forEach(n => parent[n.id] = n.id);

    const find = (i: string): string => {
      if (parent[i] === i) return i;
      return find(parent[i]);
    };

    const union = (i: string, j: string) => {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) parent[rootI] = rootJ;
    };

    let totalWeight = 0;
    let edgesCount = 0;
    for (const edge of sortedEdges) {
      if (find(edge.from) !== find(edge.to)) {
        union(edge.from, edge.to);
        totalWeight += edge.weight;
        edgesCount++;
      }
    }
    return totalWeight;
  }, [currentLevel]);

  const currentWeight = useMemo(() => {
    let total = 0;
    currentLevel.edges.forEach(e => {
      if (selectedEdges.has(e.id)) total += e.weight;
    });
    return total;
  }, [selectedEdges, currentLevel]);

  const toggleEdge = (edgeId: string) => {
    if (status === 'correct') return;
    const next = new Set(selectedEdges);
    if (next.has(edgeId)) next.delete(edgeId);
    else next.add(edgeId);
    setSelectedEdges(next);
    setStatus('idle');
  };

  const checkSolution = () => {
    const edgeCount = selectedEdges.size;
    const requiredEdges = currentLevel.nodes.length - 1;

    if (edgeCount !== requiredEdges) {
      setStatus('wrong');
      setErrorMessage(edgeCount < requiredEdges ? "Použij více cest!" : "Použij méně cest!");
      return;
    }

    // Check connectivity
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

    if (visited.size !== currentLevel.nodes.length) {
      setStatus('wrong');
      setErrorMessage("Některé domy nejsou propojené!");
      return;
    }

    if (currentWeight > mstWeight) {
      setStatus('not-mst');
      setErrorMessage(`Propojil jsi vše, ale cena je ${currentWeight}. Lze to udělat levněji (za ${mstWeight})!`);
    } else {
      setStatus('correct');
      setErrorMessage('');
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
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Minimální kostra grafu</h2>
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
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{currentLevel.title}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{currentLevel.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Celková cena</span>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className={`text-xl font-black ${status === 'correct' ? 'text-emerald-500' : 'text-purple-600'}`}>
                  {currentWeight}
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full aspect-[16/9] relative bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-crosshair">
            <svg viewBox="0 0 500 350" className="w-full h-full p-10">
              {currentLevel.edges.map((edge) => {
                const from = currentLevel.nodes.find(n => n.id === edge.from)!;
                const to = currentLevel.nodes.find(n => n.id === edge.to)!;
                const isSelected = selectedEdges.has(edge.id);
                
                return (
                  <g key={edge.id} onClick={() => toggleEdge(edge.id)} className="cursor-pointer group">
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
                    <rect 
                      x={(from.x + to.x) / 2 - 12} 
                      y={(from.y + to.y) / 2 - 12} 
                      width="24" height="24" 
                      rx="6"
                      fill="white"
                      stroke={isSelected ? "#10b981" : "#cbd5e1"}
                      strokeWidth="2"
                    />
                    <text 
                      x={(from.x + to.x) / 2} 
                      y={(from.y + to.y) / 2} 
                      textAnchor="middle" dy=".35em"
                      className="text-[10px] font-black fill-gray-600"
                    >
                      {edge.weight}
                    </text>
                  </g>
                );
              })}
              
              {currentLevel.nodes.map((node) => (
                <g key={node.id} className="pointer-events-none">
                  <circle 
                    cx={node.x} cy={node.y} r="18"
                    fill="white"
                    stroke="#cbd5e1"
                    strokeWidth="3"
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

          <div className="mt-8 w-full p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              Čísla na cestách představují <strong>cenu</strong> (např. počet dlaždic). Propoj všechny domy tak, aby celková cena byla <strong>co nejnižší</strong>.
            </p>
          </div>
        </div>

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
                  <span className="text-[10px] font-black uppercase tracking-widest">Hledání nejlevnější cesty...</span>
                </div>
              )}
              
              {status === 'correct' && (
                <div className="flex flex-col items-center gap-3 text-emerald-500 animate-in zoom-in">
                  <CheckCircle2 className="w-12 h-12" />
                  <span className="text-sm font-black uppercase tracking-widest">Perfektní!</span>
                  <p className="text-[10px] font-bold text-emerald-600/60 uppercase">Našel jsi skutečně minimální kostru.</p>
                </div>
              )}

              {(status === 'wrong' || status === 'not-mst') && (
                <div className="flex flex-col items-center gap-3 text-red-500 animate-in shake">
                  <XCircle className="w-12 h-12" />
                  <span className="text-sm font-black uppercase tracking-widest">Zkus to znovu</span>
                  <p className="text-[10px] font-bold text-red-600/60 uppercase">{errorMessage}</p>
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
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-4">Algoritmus</h3>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              Pro hledání minimální kostry se často používá <strong>Kruskalův algoritmus</strong> (postupně vybíráš nejlevnější hrany, které nevytvoří kruh) nebo <strong>Primův algoritmus</strong> (postupně rozšiřuješ propojenou část o nejlevnější sousední hranu).
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

export default MSTTask;
