
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RefreshCcw, ChevronRight, ChevronLeft, Search } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

interface PathLevel {
  id: number;
  title: string;
  startNode: string;
  endNode: string;
  nodes: Node[];
  edges: Edge[];
}

const LEVELS: PathLevel[] = [
  {
    id: 1,
    title: "Základní trasy",
    startNode: "A",
    endNode: "H",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 200, y: 50 },
      { id: "C", name: "Cleaní", x: 200, y: 250 },
      { id: "H", name: "Harrykov", x: 350, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "H" },
      { from: "C", to: "H" },
    ]
  },
  {
    id: 2,
    title: "Přes Dixice",
    startNode: "A",
    endNode: "H",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 150, y: 50 },
      { id: "C", name: "Cleaní", x: 150, y: 250 },
      { id: "D", name: "Dixice", x: 250, y: 150 },
      { id: "H", name: "Harrykov", x: 350, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "D" },
      { from: "D", to: "H" },
    ]
  },
  {
    id: 3,
    title: "Křížení cest",
    startNode: "A",
    endNode: "H",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 150, y: 50 },
      { id: "C", name: "Cleaní", x: 150, y: 250 },
      { id: "D", name: "Dixice", x: 250, y: 150 },
      { id: "H", name: "Harrykov", x: 350, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "D" },
      { from: "D", to: "H" },
    ]
  },
  {
    id: 4,
    title: "Složitější síť",
    startNode: "A",
    endNode: "H",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 150, y: 50 },
      { id: "C", name: "Cleaní", x: 150, y: 250 },
      { id: "D", name: "Dixice", x: 250, y: 150 },
      { id: "F", name: "Flekovice", x: 350, y: 150 },
      { id: "H", name: "Harrykov", x: 450, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "F" },
      { from: "C", to: "D" },
      { from: "D", to: "F" },
      { from: "F", to: "H" },
    ]
  },
  {
    id: 5,
    title: "Štěkavý kraj (PDF)",
    startNode: "A",
    endNode: "H",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 150, y: 80 },
      { id: "C", name: "Cleaní", x: 150, y: 220 },
      { id: "D", name: "Dixice", x: 250, y: 150 },
      { id: "E", name: "Ellanov", x: 250, y: 50 },
      { id: "F", name: "Flekovice", x: 350, y: 100 },
      { id: "G", name: "Gorov", x: 350, y: 200 },
      { id: "H", name: "Harrykov", x: 450, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "F" },
      { from: "C", to: "D" },
      { from: "C", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "G" },
      { from: "F", to: "G" },
      { from: "F", to: "H" },
      { from: "G", to: "H" },
    ]
  },
  {
    id: 6,
    title: "Křivolaké údolí",
    startNode: "A",
    endNode: "I",
    nodes: [
      { id: "A", name: "Alíkov", x: 50, y: 150 },
      { id: "B", name: "Bojarov", x: 120, y: 60 },
      { id: "C", name: "Cleaní", x: 120, y: 240 },
      { id: "D", name: "Dixice", x: 220, y: 150 },
      { id: "E", name: "Ellanov", x: 320, y: 60 },
      { id: "F", name: "Flekovice", x: 320, y: 240 },
      { id: "G", name: "Gorov", x: 400, y: 150 },
      { id: "H", name: "Hafov", x: 220, y: 260 },
      { id: "I", name: "Iglú", x: 480, y: 150 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "D" },
      { from: "C", to: "H" },
      { from: "D", to: "E" },
      { from: "D", to: "F" },
      { from: "H", to: "F" },
      { from: "E", to: "G" },
      { from: "F", to: "G" },
      { from: "G", to: "I" },
    ]
  }
];

interface PathFindingTaskProps {
  onBack: () => void;
}

const PathFindingTask: React.FC<PathFindingTaskProps> = ({ onBack }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex];
  
  const [userInput, setUserInput] = useState('');
  const [foundPaths, setFoundPaths] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong' | 'duplicate'>('none');

  // Calculate all possible paths using DFS
  const allPaths = useMemo(() => {
    const adj: { [key: string]: string[] } = {};
    currentLevel.nodes.forEach(n => adj[n.id] = []);
    currentLevel.edges.forEach(e => {
      adj[e.from].push(e.to);
      adj[e.to].push(e.from); // Undirected
    });

    const paths: string[] = [];
    const find = (curr: string, target: string, visited: Set<string>, path: string) => {
      if (curr === target) {
        paths.push(path);
        return;
      }
      visited.add(curr);
      for (const neighbor of adj[curr]) {
        if (!visited.has(neighbor)) {
          find(neighbor, target, new Set(visited), path + neighbor);
        }
      }
    };

    find(currentLevel.startNode, currentLevel.endNode, new Set(), currentLevel.startNode);
    return paths.sort();
  }, [currentLevel]);

  const handleAddPath = () => {
    const path = userInput.toUpperCase().trim();
    if (!path) return;

    if (foundPaths.includes(path)) {
      setFeedback('duplicate');
      setTimeout(() => setFeedback('none'), 1500);
      return;
    }

    if (allPaths.includes(path)) {
      setFoundPaths(prev => [...prev, path].sort());
      setFeedback('correct');
      setUserInput('');
      setTimeout(() => setFeedback('none'), 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1500);
    }
  };

  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      setFoundPaths([]);
      setUserInput('');
      setFeedback('none');
    }
  };

  const prevLevel = () => {
    if (levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
      setFoundPaths([]);
      setUserInput('');
      setFeedback('none');
    }
  };

  const isFinished = foundPaths.length === allPaths.length;

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
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Hledání všech tras</h2>
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
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8 w-full text-left">Mapa Štěkavého kraje</h3>
          
          <div className="w-full aspect-[16/9] relative bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 500 300" className="w-full h-full p-10">
              {/* Edges */}
              {currentLevel.edges.map((edge, idx) => {
                const from = currentLevel.nodes.find(n => n.id === edge.from)!;
                const to = currentLevel.nodes.find(n => n.id === edge.to)!;
                return (
                  <line 
                    key={idx}
                    x1={from.x} y1={from.y}
                    x2={to.x} y2={to.y}
                    stroke="#e2e8f0"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}
              
              {/* Nodes */}
              {currentLevel.nodes.map((node) => (
                <g key={node.id} className="group cursor-default">
                  <circle 
                    cx={node.x} cy={node.y} r="20"
                    fill={node.id === currentLevel.startNode ? "#8b5cf6" : node.id === currentLevel.endNode ? "#ec4899" : "white"}
                    stroke={node.id === currentLevel.startNode ? "#7c3aed" : node.id === currentLevel.endNode ? "#db2777" : "#cbd5e1"}
                    strokeWidth="3"
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  <text 
                    x={node.x} y={node.y} 
                    textAnchor="middle" dy=".3em"
                    fill={node.id === currentLevel.startNode || node.id === currentLevel.endNode ? "white" : "#475569"}
                    className="text-[14px] font-black pointer-events-none"
                  >
                    {node.id}
                  </text>
                  <text 
                    x={node.x} y={node.y + 35} 
                    textAnchor="middle"
                    fill="#94a3b8"
                    className="text-[8px] font-black uppercase tracking-widest pointer-events-none"
                  >
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>

            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase">Start: {currentLevel.nodes.find(n => n.id === currentLevel.startNode)?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase">Cíl: {currentLevel.nodes.find(n => n.id === currentLevel.endNode)?.name}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Najdi všechny možné trasy z <strong>{currentLevel.nodes.find(n => n.id === currentLevel.startNode)?.name}</strong> do <strong>{currentLevel.nodes.find(n => n.id === currentLevel.endNode)?.name}</strong>. 
              Zapisuj je jako řetězec písmen (např. <strong>ABFH</strong>). Každým městem můžeš projet jen jednou.
            </p>
          </div>
        </div>

        {/* Input and List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-6 w-full text-left">Zadej trasu</h3>
            
            <div className="w-full flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPath()}
                  placeholder="Např. ABFH"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-xl font-black text-purple-600 focus:outline-none focus:border-purple-400 transition-all uppercase tracking-widest"
                  disabled={isFinished}
                />
                <button 
                  onClick={handleAddPath}
                  disabled={isFinished || !userInput}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-purple-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-700 transition-all disabled:opacity-30"
                >
                  Přidat
                </button>
              </div>

              <div className="h-10 flex items-center justify-center">
                {feedback === 'correct' && (
                  <div className="flex items-center gap-2 text-emerald-500 animate-in zoom-in">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Správná trasa!</span>
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="flex items-center gap-2 text-red-500 animate-in shake">
                    <XCircle className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Neplatná trasa</span>
                  </div>
                )}
                {feedback === 'duplicate' && (
                  <div className="flex items-center gap-2 text-amber-500 animate-in zoom-in">
                    <RefreshCcw className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tuto trasu už máš</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Nalezené trasy</h3>
              <div className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {foundPaths.length} / {allPaths.length}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2 min-h-[200px]">
              {foundPaths.map((path, idx) => (
                <div key={idx} className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group animate-in slide-in-from-right duration-300">
                  <span className="font-black text-gray-700 tracking-[0.3em]">{path}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              {foundPaths.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                  <Search className="w-10 h-10 text-gray-200 mb-4" />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Zatím jsi nenašel žádnou trasu</p>
                </div>
              )}
            </div>

            {isFinished && (
              <div className="mt-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center gap-4 animate-in zoom-in">
                <p className="text-xs text-emerald-800 font-black uppercase tracking-widest text-center">Našel jsi všechny trasy!</p>
                {levelIndex < LEVELS.length - 1 && (
                  <button 
                    onClick={nextLevel}
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all"
                  >
                    Další úroveň
                  </button>
                )}
              </div>
            )}
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

export default PathFindingTask;
