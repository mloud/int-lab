
import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, RefreshCcw, Play, Package, Truck, Droplets, CircleDot, Warehouse, Settings, Lock, Factory, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Place {
  id: string;
  label: string;
  x: number;
  y: number;
  tokens: number;
  icon?: React.ReactNode;
}

interface Transition {
  id: string;
  label: string;
  x: number;
  y: number;
  inputs: string[];
  outputs: string[];
  icon?: React.ReactNode;
  duration: number;
}

const INITIAL_PLACES: Place[] = [
  { id: 's0', label: 'Vstup', x: 100, y: 350, tokens: 1, icon: <Package className="w-5 h-5" /> },
  { id: 's1', label: 'Naplněná bedna', x: 300, y: 100, tokens: 0, icon: <Package className="w-5 h-5 text-blue-500" /> },
  { id: 's2', label: 'Linka 1 volná', x: 300, y: 350, tokens: 1, icon: <Settings className="w-5 h-5" /> },
  { id: 's3', label: 'Mezisklad', x: 600, y: 225, tokens: 0, icon: <Warehouse className="w-5 h-5 text-amber-600" /> },
  { id: 's4', label: 'Linka 2 volná', x: 900, y: 100, tokens: 1, icon: <Settings className="w-5 h-5" /> },
  { id: 's5', label: 'Naplněná bedna', x: 900, y: 350, tokens: 0, icon: <Package className="w-5 h-5 text-blue-500" /> },
  { id: 's6', label: 'Expedice', x: 1100, y: 100, tokens: 0, icon: <Truck className="w-5 h-5 text-emerald-600" /> },
];

const TRANSITIONS: Transition[] = [
  { id: 't1', label: 'Plnění', x: 200, y: 225, inputs: ['s0', 's2'], outputs: ['s1'], icon: <Droplets className="w-5 h-5" />, duration: 2000 },
  { id: 't2', label: 'Uskladnění', x: 450, y: 225, inputs: ['s1'], outputs: ['s0', 's2', 's3'], icon: <Truck className="w-5 h-5" />, duration: 1500 },
  { id: 't3', label: 'Podání', x: 750, y: 225, inputs: ['s3', 's4'], outputs: ['s5'], icon: <Truck className="w-5 h-5" />, duration: 1500 },
  { id: 't4', label: 'Zazátkování', x: 1000, y: 225, inputs: ['s5'], outputs: ['s4', 's6'], icon: <Lock className="w-5 h-5" />, duration: 2500 },
];

interface ParallelProcessesProps {
  onBack: () => void;
}

const ParallelProcesses: React.FC<ParallelProcessesProps> = ({ onBack }) => {
  const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTransitionId, setActiveTransitionId] = useState<string | null>(null);

  const isEnabled = (t: Transition) => {
    return t.inputs.every(inputId => {
      const place = places.find(p => p.id === inputId);
      return place && place.tokens > 0;
    });
  };

  const fireTransition = (t: Transition) => {
    if (!isEnabled(t) || activeTransitionId) return;

    setActiveTransitionId(t.id);
    
    // Step 1: Consume tokens
    setPlaces(prev => prev.map(p => {
      if (t.inputs.includes(p.id)) {
        return { ...p, tokens: p.tokens - 1 };
      }
      return p;
    }));

    // Step 2: Add tokens after a delay (animation simulation)
    setTimeout(() => {
      setPlaces(prev => prev.map(p => {
        if (t.outputs.includes(p.id)) {
          return { ...p, tokens: p.tokens + 1 };
        }
        return p;
      }));
      setHistory(prev => [...prev, t.label]);
      setActiveTransitionId(null);
    }, t.duration);
  };

  const reset = () => {
    setPlaces(INITIAL_PLACES);
    setHistory([]);
    setActiveTransitionId(null);
  };

  return (
    <div className="w-full max-w-7xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-purple-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Paralelní procesy: Petriho sítě</h2>
        <button 
          onClick={reset}
          className="p-2 hover:bg-purple-50 rounded-xl transition-colors text-purple-600"
          title="Resetovat simulaci"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Simulation Workspace */}
        <div className="lg:col-span-9 bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Model plnící linky</h3>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">Kliknutím na aktivní přechody (černé obdélníky) posouvej proces.</p>
            </div>
          </div>
          
          <div className="w-full aspect-[16/7] relative bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 1200 450" className="w-full h-full p-4">
              {/* Arcs */}
              {TRANSITIONS.map(t => (
                <React.Fragment key={`arcs-${t.id}`}>
                  {t.inputs.map(inputId => {
                    const p = places.find(p => p.id === inputId)!;
                    return (
                      <line 
                        key={`${p.id}-${t.id}`}
                        x1={p.x} y1={p.y} x2={t.x} y2={t.y}
                        stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)"
                      />
                    );
                  })}
                  {t.outputs.map(outputId => {
                    const p = places.find(p => p.id === outputId)!;
                    return (
                      <line 
                        key={`${t.id}-${p.id}`}
                        x1={t.x} y1={t.y} x2={p.x} y2={p.y}
                        stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)"
                      />
                    );
                  })}
                </React.Fragment>
              ))}

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                </marker>
              </defs>

              {/* Places */}
              {places.map(p => (
                <g key={p.id}>
                  <circle 
                    cx={p.x} cy={p.y} r="35"
                    fill="white" stroke="#94a3b8" strokeWidth="3"
                  />
                  {p.icon && (
                    <foreignObject x={p.x - 10} y={p.y - 10} width="20" height="20">
                      <div className="flex items-center justify-center text-gray-400">
                        {p.icon}
                      </div>
                    </foreignObject>
                  )}
                  <text 
                    x={p.x} y={p.y + 60} textAnchor="middle"
                    className="text-[12px] font-black fill-gray-500 uppercase tracking-tighter"
                  >
                    {p.label}
                  </text>
                  
                  {/* Tokens */}
                  <AnimatePresence>
                    {Array.from({ length: p.tokens }).map((_, i) => (
                      <motion.circle 
                        key={`${p.id}-token-${i}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        cx={p.x + (i % 2 === 0 ? -15 : 15) * (p.tokens > 1 ? 1 : 0)} 
                        cy={p.y + (i < 2 ? -15 : 15) * (p.tokens > 2 ? 1 : 0)} 
                        r="8"
                        fill="#8b5cf6"
                        className="shadow-sm"
                      />
                    ))}
                  </AnimatePresence>
                </g>
              ))}

              {/* Transitions */}
              {TRANSITIONS.map(t => {
                const active = isEnabled(t);
                const isProcessing = activeTransitionId === t.id;
                return (
                  <motion.g 
                    key={t.id} 
                    onClick={() => fireTransition(t)}
                    whileHover={active && !activeTransitionId ? { scale: 1.1 } : {}}
                    whileTap={active && !activeTransitionId ? { scale: 0.95 } : {}}
                    style={{ transformOrigin: `${t.x}px ${t.y}px` }}
                    className={`cursor-pointer transition-opacity duration-300 ${active && !activeTransitionId ? 'opacity-100' : 'opacity-40 grayscale'}`}
                  >
                    {/* Invisible larger click target */}
                    <rect 
                      x={t.x - 40} y={t.y - 50} width="80" height="100"
                      fill="transparent"
                    />
                    <rect 
                      x={t.x - 15} y={t.y - 40} width="30" height="80"
                      fill={active ? "#1e293b" : "#94a3b8"}
                      rx="6"
                    />
                    
                    {/* Progress indicator */}
                    {isProcessing && (
                      <motion.rect 
                        initial={{ height: 0 }}
                        animate={{ height: 80 }}
                        transition={{ duration: t.duration / 1000, ease: "linear" }}
                        x={t.x - 15} y={t.y - 40} width="30"
                        fill="#8b5cf6"
                        rx="6"
                        className="opacity-40"
                      />
                    )}

                    {t.icon && (
                      <foreignObject x={t.x - 10} y={t.y - 10} width="20" height="20">
                        <div className="flex items-center justify-center text-white">
                          {t.icon}
                        </div>
                      </foreignObject>
                    )}
                    <text 
                      x={t.x} y={t.y - 55} textAnchor="middle"
                      className={`text-[12px] font-black uppercase tracking-widest ${active ? 'fill-gray-800' : 'fill-gray-400'}`}
                    >
                      {t.label}
                    </text>
                    
                    {active && !isProcessing && (
                      <motion.circle 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        cx={t.x} cy={t.y + 25} r="4" fill="white"
                      />
                    )}

                    {isProcessing && (
                      <text 
                        x={t.x} y={t.y + 60} textAnchor="middle"
                        className="text-[10px] font-black fill-purple-600 animate-pulse"
                      >
                        PROBÍHÁ...
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="mt-8 w-full p-6 bg-purple-50 rounded-2xl border border-purple-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-purple-500 shrink-0" />
            <div className="text-xs text-purple-800 font-medium leading-relaxed">
              <p className="font-black uppercase mb-2">Jak to funguje?</p>
              <ul className="list-disc ml-4 space-y-1">
                <li><strong>Místa (kolečka)</strong> představují stavy nebo zdroje (např. bedna, volná linka).</li>
                <li><strong>Přechody (obdélníky)</strong> představují události nebo akce (např. plnění).</li>
                <li>Přechod se může aktivovat jen tehdy, když jsou ve všech jeho <strong>vstupních místech</strong> žetony.</li>
                <li>Při aktivaci přechod "spolkne" žetony ze vstupů a "vytvoří" nové ve výstupech.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info and History */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-6">Průběh</h3>
            <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 flex flex-col gap-3">
              {history.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-[10px] font-black text-purple-600">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{step}</span>
                </motion.div>
              ))}
              {history.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                  <Play className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Čekám na start...</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] shadow-xl text-white">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <CircleDot className="w-4 h-4" />
              Zadání
            </h3>
            <p className="text-[10px] font-medium leading-relaxed opacity-90 italic">
              "Představte si provoz na plnění a zátkování lahví. Jedna linka lahve naplní, vozík je převeze do meziskladu. Pokud je volno na druhé lince, jiný vozík je převeze k zazátkování."
            </p>
            <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Droplets className="w-4 h-4 text-blue-300" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Linka 1: Plnění</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-amber-300" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Vozík: Mezisklad</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-emerald-300" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Linka 2: Zátkování</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallelProcesses;
