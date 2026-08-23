
import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, RefreshCcw, MousePointer2, LayoutGrid, RotateCw, HelpCircle } from 'lucide-react';

type ShapeType = 'square' | 'triangle-roof';

interface PlacedShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  rotation: number; // 0, 1, 2, 3 (kroky po 90 stupních)
  color: string;
  label: string;
}

const INITIAL_SHAPES: PlacedShape[] = [
  { id: 'sq-1', type: 'square', x: 2, y: 4, rotation: 0, color: '#5D9CEC', label: 'Modrý čtverec' },
  { id: 'sq-2', type: 'square', x: 4, y: 4, rotation: 0, color: '#FFCE54', label: 'Žlutý čtverec' },
  { id: 'tr-roof-1', type: 'triangle-roof', x: 6, y: 4, rotation: 0, color: '#FC6E51', label: 'Červená střecha' },
  { id: 'tr-roof-2', type: 'triangle-roof', x: 8, y: 4, rotation: 0, color: '#A0D468', label: 'Zelená střecha' },
];

interface ShapePuzzleProps {
  onBack: () => void;
}

const ShapePuzzle: React.FC<ShapePuzzleProps> = ({ onBack }) => {
  const [shapes, setShapes] = useState<PlacedShape[]>(INITIAL_SHAPES);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const gridSize = 10;

  // Reference pro ukládání dat o tahu bez nutnosti re-renderu při každém micro-pohybu
  const dragRef = useRef({
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    hasMoved: false
  });

  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return {
      x: transformed.x,
      y: gridSize - transformed.y // Převod na matematické Y (0 dole)
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    // Zamezení probublávání a výchozího chování (scrollování)
    e.stopPropagation();
    
    const point = getSVGPoint(e.clientX, e.clientY);
    const shape = shapes.find(s => s.id === id);
    
    if (shape) {
      dragRef.current = {
        offsetX: point.x - shape.x,
        offsetY: point.y - shape.y,
        startX: e.clientX,
        startY: e.clientY,
        hasMoved: false
      };
      
      setDraggingId(id);
      setSelectedId(id);

      // Přesunout prvek na konec pole pro správný z-index (aby byl nahoře)
      setShapes(prev => {
        const others = prev.filter(s => s.id !== id);
        return [...others, shape];
      });

      // Aktivace Pointer Capture na celém SVG, aby nám dílek "neutekl"
      if (svgRef.current) {
        svgRef.current.setPointerCapture(e.pointerId);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId) return;

    // Detekce, zda se jedná o skutečný tah (tolerance 4px)
    if (!dragRef.current.hasMoved) {
      const dist = Math.hypot(e.clientX - dragRef.current.startX, e.clientY - dragRef.current.startY);
      if (dist > 4) {
        dragRef.current.hasMoved = true;
      }
    }

    if (dragRef.current.hasMoved) {
      const point = getSVGPoint(e.clientX, e.clientY);
      let newX = point.x - dragRef.current.offsetX;
      let newY = point.y - dragRef.current.offsetY;

      // MAGNET: Vždy zapnutý (přichytávání k 0.5 jednotkám)
      newX = Math.round(newX * 2) / 2;
      newY = Math.round(newY * 2) / 2;

      // Omezení pohybu uvnitř mřížky
      newX = Math.max(0.5, Math.min(gridSize - 0.5, newX));
      newY = Math.max(0.5, Math.min(gridSize - 0.5, newY));

      setShapes(prev => prev.map(s => 
        s.id === draggingId ? { ...s, x: newX, y: newY } : s
      ));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingId) return;

    // Pokud se s dílkem nepohnulo, rotujeme ho (kliknutí)
    if (!dragRef.current.hasMoved) {
      setShapes(prev => prev.map(s => 
        s.id === draggingId ? { ...s, rotation: (s.rotation + 1) % 4 } : s
      ));
    }
    
    // Uvolnění capture a ukončení tahu
    if (svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    setDraggingId(null);
  };

  const resetAll = () => {
    setShapes(INITIAL_SHAPES);
    setSelectedId(null);
    setDraggingId(null);
  };

  const getShapePath = (type: ShapeType) => {
    if (type === 'square') {
      return "M -0.5 -0.5 H 0.5 V 0.5 H -0.5 Z";
    }
    if (type === 'triangle-roof') {
      return "M -0.5 0.5 L 0.5 0.5 L 0 -0.5 Z";
    }
    return "";
  };

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start animate-in fade-in duration-500">
      <div className="flex-1 bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-orange-600 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět
          </button>
          <div className="text-right">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Geometrická laboratoř</h2>
            <div className="text-[10px] font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mt-2">
              Magnet aktivní
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 p-4 rounded-3xl mb-6 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
            <p className="text-sm font-black text-orange-900 uppercase tracking-tight leading-tight">
              Táhni dílek pro přesun • Klikni pro otočení
            </p>
          </div>
          <div className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-2xl border border-orange-50 shadow-sm">
            FIXNÍ MŘÍŽKA
          </div>
        </div>

        <div className="relative aspect-square w-full border-4 border-gray-100 rounded-[2.5rem] bg-white overflow-hidden shadow-inner flex items-center justify-center p-6 touch-none">
          <svg 
            ref={svgRef}
            viewBox="-0.5 -0.5 11 11" 
            className="w-full h-full select-none touch-none overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              <pattern id="puzzleGrid" width="1" height="1" patternUnits="userSpaceOnUse">
                <rect width="1" height="1" fill="none" stroke="#f1f5f9" strokeWidth="0.05"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width={gridSize} height={gridSize} fill="url(#puzzleGrid)" pointerEvents="none" />
            
            {shapes.map(shape => (
              <g 
                key={shape.id} 
                transform={`translate(${shape.x}, ${gridSize - shape.y}) rotate(${shape.rotation * 90})`}
                onPointerDown={(e) => handlePointerDown(e, shape.id)}
                className="cursor-grab active:cursor-grabbing transition-transform"
                style={{ touchAction: 'none' }}
              >
                <path 
                  d={getShapePath(shape.type)} 
                  fill={shape.color} 
                  stroke="rgba(0,0,0,0.1)" 
                  strokeWidth="0.04"
                  className={`drop-shadow-sm transition-all duration-200 ${draggingId === shape.id ? 'opacity-70 scale-105' : 'hover:opacity-90'}`}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <MousePointer2 className="w-4 h-4 mr-2 text-orange-500" />
            Přesun s offsetem
          </div>
          <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <RotateCw className="w-4 h-4 mr-2 text-orange-500" />
            Rotace o 90°
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-6">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col gap-8">
          <div className="bg-orange-50/50 p-6 rounded-[2.5rem] border-2 border-orange-100">
             <h3 className="text-base font-black text-orange-800 uppercase tracking-tight mb-6 flex items-center">
               <LayoutGrid className="w-5 h-5 mr-3 text-orange-600" />
               Úkoly k procvičení
             </h3>
             <ul className="space-y-4">
               {[
                 "Sestav dům",
                 "Sestav obdélník",
                 "Sestav rovnoběžník",
                 "Sestav lichoběžník"
               ].map((task, i) => (
                 <li key={i} className="flex items-center gap-4 text-base font-black text-gray-700 uppercase tracking-tight leading-snug">
                   <div className="w-8 h-8 rounded-xl bg-white border border-orange-200 flex items-center justify-center text-xs text-orange-500 font-black shrink-0 shadow-sm">
                     {i+1}
                   </div>
                   {task}
                 </li>
               ))}
             </ul>
          </div>

          <button 
            onClick={resetAll}
            className="w-full py-5 flex items-center justify-center bg-white hover:bg-orange-50 text-orange-600 font-black rounded-[2.5rem] transition-all shadow-md border-2 border-orange-100 uppercase text-xs tracking-widest"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Vrátit vše na start
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShapePuzzle;
