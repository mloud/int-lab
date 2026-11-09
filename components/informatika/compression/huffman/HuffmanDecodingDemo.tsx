"use client";

import React, { useState, useRef } from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';

const ENCODED_STR = "01001010111011001001010";
const TREE_NAV: Record<string, [string, string]> = {
  ROOT: ['A', 'DKBR'], DKBR: ['BR', 'DK'], DK: ['D', 'K'], BR: ['B', 'R'],
};
const LEAF_CHAR: Record<string, string> = { A:'A', B:'B', R:'R', D:'D', K:'K' };
const DEC_EDGE: Record<string, number> = {
  'ROOT-A':6,'ROOT-DKBR':7,'DKBR-BR':5,'DKBR-DK':4,'DK-D':0,'DK-K':1,'BR-B':2,'BR-R':3
};
const DEC_CODES: Record<string, string> = { A:'0', B:'100', R:'101', K:'111', D:'110' };


export const DecodingDemo: React.FC = () => {
  const [bitPos, setBitPos] = useState(0);
  const [curNode, setCurNode] = useState('ROOT');
  const [decoded, setDecoded] = useState<string[]>([]);
  const [path, setPath] = useState<string[]>(['ROOT']);
  const [flash, setFlash] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDone = bitPos >= ENCODED_STR.length;

  const advance = () => {
    if (isDone || flash !== null) return;
    const bit = parseInt(ENCODED_STR[bitPos]) as 0 | 1;
    const next = TREE_NAV[curNode]?.[bit];
    if (!next) return;
    
    if (LEAF_CHAR[next]) {
      const ch = LEAF_CHAR[next];
      setCurNode(next);
      setPath(prev => [...prev, next]);
      setFlash(ch);
      
      timeoutRef.current = setTimeout(() => {
        setDecoded(prev => [...prev, ch]);
        setCurNode('ROOT');
        setPath(['ROOT']);
        timeoutRef.current = setTimeout(() => setFlash(null), 300);
      }, 700);
    } else {
      setCurNode(next);
      setPath(prev => [...prev, next]);
    }
    setBitPos(p => p + 1);
  };

  const doReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setBitPos(0); setCurNode('ROOT'); setDecoded([]); setPath(['ROOT']); setFlash(null);
  };

  const pathNodes = new Set(path);
  const pathEdges = new Set<number>();
  for (let i = 0; i < path.length - 1; i++) {
    const key = `${path[i]}-${path[i+1]}`;
    if (DEC_EDGE[key] !== undefined) pathEdges.add(DEC_EDGE[key]);
  }

  // Uzly a hrany (stejné pozice jako v HuffmanDemo)
  const NODES: Record<string, { x:number, y:number, label:string, val:number, type:string }> = {
    A:    { x:150, y:350, label:'A',     val:5,  type:'leaf'  },
    B:    { x:300, y:350, label:'B',     val:2,  type:'leaf'  },
    R:    { x:450, y:350, label:'R',     val:2,  type:'leaf'  },
    D:    { x:600, y:350, label:'D',     val:1,  type:'leaf'  },
    K:    { x:750, y:350, label:'K',     val:1,  type:'leaf'  },
    DK:   { x:675, y:250, label:'DK',   val:2,  type:'inner' },
    BR:   { x:375, y:250, label:'BR',   val:4,  type:'inner' },
    DKBR: { x:525, y:150, label:'DKBR', val:6,  type:'inner' },
    ROOT: { x:337, y:50,  label:'ADKBR',val:11, type:'inner' },
  };
  const EDGES = [
    { from:NODES.D,    to:NODES.DK,   label:'0' }, // 0
    { from:NODES.K,    to:NODES.DK,   label:'1' }, // 1
    { from:NODES.B,    to:NODES.BR,   label:'0' }, // 2
    { from:NODES.R,    to:NODES.BR,   label:'1' }, // 3
    { from:NODES.DK,   to:NODES.DKBR, label:'0' }, // 4
    { from:NODES.BR,   to:NODES.DKBR, label:'1' }, // 5
    { from:NODES.A,    to:NODES.ROOT, label:'0' }, // 6
    { from:NODES.DKBR, to:NODES.ROOT, label:'1' }, // 7
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Horní panel */}
      <div className="flex justify-between items-center bg-purple-50 p-5 rounded-2xl border-2 border-purple-100">
        <div className="flex-1">
          <h3 className="font-black text-purple-900 text-lg uppercase tracking-tight mb-1">Ukázka dekódování ABRAKADABRA</h3>
          <p className="text-purple-700/80 font-medium text-sm m-0">
            {isDone ? '✓ Dekódování dokončeno! Dostali jsme zpět původní slovo.' :
              `Čtu bit č. ${bitPos+1}: `+
              <span className="font-mono font-black">'{ENCODED_STR[bitPos]}'</span>+
              ` → jdu ${ENCODED_STR[bitPos]==='0'?'vlevo (0)':'vpravo (1)'} ve stromě. Aktuální uzel: ${curNode}`
            }
          </p>
        </div>
        <div className="flex gap-3 ml-4">
          <button onClick={doReset} className="p-3 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl shadow-sm transition-colors" title="Začít znovu">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={advance} disabled={isDone || flash !== null}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider rounded-xl shadow-md transition-all text-sm">
            Další bit <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strom */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border-2 border-gray-100 p-4">
          {/* Bitový řetězec */}
          <div className="flex flex-wrap gap-0.5 justify-center mb-4 font-mono text-lg font-black">
            {ENCODED_STR.split('').map((b, i) => (
              <span key={i} className={`w-7 h-8 flex items-center justify-center rounded transition-all ${
                i < bitPos ? 'bg-emerald-100 text-emerald-600' :
                i === bitPos ? 'bg-purple-500 text-white scale-110 shadow-md' :
                'bg-gray-100 text-gray-400'
              }`}>{b}</span>
            ))}
          </div>
          {/* SVG strom */}
          <svg viewBox="0 20 900 380" className="w-full max-h-[340px]">
            {EDGES.map((edge, i) => {
              const hi = pathEdges.has(i);
              return (
                <g key={i}>
                  <line x1={edge.from.x} y1={edge.from.y} x2={edge.to.x} y2={edge.to.y}
                    stroke={hi ? '#9333ea' : '#d1d5db'} strokeWidth={hi ? 4 : 2} />
                  <text x={(edge.from.x+edge.to.x)/2+(edge.from.x<edge.to.x?-14:14)}
                    y={(edge.from.y+edge.to.y)/2}
                    textAnchor="middle" fontSize={14} fontWeight="900"
                    fill={hi ? '#7e22ce' : '#f97316'}>{edge.label}</text>
                </g>
              );
            })}
            {Object.entries(NODES).map(([id, node]) => {
              const isLeaf = node.type==='leaf';
              const r = isLeaf ? 30 : Math.max(30, node.label.length*10);
              const onPath = pathNodes.has(id);
              const isCurrent = id === curNode && id !== 'ROOT';
              const fill = isCurrent ? '#f3e8ff' : onPath ? '#ede9fe' : isLeaf ? '#dbeafe' : '#d1fae5';
              const stroke = isCurrent ? '#9333ea' : onPath ? '#a855f7' : isLeaf ? '#3b82f6' : '#10b981';
              const sw = (isCurrent || onPath) ? 3.5 : 2.5;
              return (
                <g key={id}>
                  {isCurrent && <ellipse cx={node.x} cy={node.y} rx={r+10} ry={32}
                    fill="none" stroke="#9333ea" strokeWidth={2} opacity={0.5}
                    style={{animation:'pulse 1s ease-in-out infinite'}} />}
                  <ellipse cx={node.x} cy={node.y} rx={r} ry={22} fill={fill} stroke={stroke} strokeWidth={sw} />
                  <text x={node.x} y={node.y+6} textAnchor="middle"
                    fontSize={isLeaf?20:node.label.length>3?12:15} fontWeight="bold" fill={onPath?'#581c87':'#1e293b'}>{node.label}</text>
                  <text x={node.x+r+3} y={node.y+22} textAnchor="start" fontSize={16} fontWeight="800" fill={onPath?'#7e22ce':'#475569'}>{node.val}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Pravý panel – slovník + dekódovaný text */}
        <div className="flex flex-col gap-4">
          {/* Slovník */}
          <div className="bg-white rounded-3xl shadow-md border-2 border-gray-100 p-5">
            <h4 className="font-black text-gray-700 uppercase tracking-tight text-sm mb-3 border-b border-gray-100 pb-2">Huffmanův slovník</h4>
            <div className="flex flex-col gap-2">
              {Object.entries(DEC_CODES).map(([ch, code]) => (
                <div key={ch} className={`flex items-center justify-between px-3 py-2 rounded-xl border-2 transition-all ${
                  path[path.length-1]===ch||curNode===ch?'border-purple-300 bg-purple-50':'border-gray-100 bg-gray-50'
                }`}>
                  <span className="font-black text-blue-600 text-lg">{ch}</span>
                  <span className="font-mono font-black text-emerald-600 bg-white px-2 py-0.5 rounded-lg border border-emerald-100">{code}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Dekódovaný text */}
          <div className="bg-white rounded-3xl shadow-md border-2 border-gray-100 p-5 flex-1">
            <h4 className="font-black text-gray-700 uppercase tracking-tight text-sm mb-3 border-b border-gray-100 pb-2">Dekódovaný text</h4>
            <div className="flex flex-wrap gap-2 min-h-[60px] items-center">
              {decoded.length === 0 && <span className="text-gray-300 font-bold text-sm">zatím prázdný...</span>}
              {decoded.map((ch, i) => (
                <span key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all ${
                  i === decoded.length-1 && flash ? 'bg-purple-200 text-purple-700 scale-125' : 'bg-blue-50 text-blue-700'
                }`}>{ch}</span>
              ))}
            </div>
            {isDone && (
              <div className="mt-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 text-center">
                <p className="font-black text-emerald-700 text-sm m-0">✓ {decoded.join('')} = původní slovo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
