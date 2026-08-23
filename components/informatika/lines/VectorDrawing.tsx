
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, RefreshCcw, MousePointer2, MapPin, List, Trash2, PenTool } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Line {
  p1: Point;
  p2: Point;
}

interface VectorDrawingProps {
  onBack: () => void;
  mode?: 'points' | 'lines';
}

const VectorDrawing: React.FC<VectorDrawingProps> = ({ onBack, mode = 'points' }) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentP, setCurrentP] = useState<Point>({ x: 0, y: 0 });
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const isLinesMode = mode === 'lines';

  const gridSize = 10;
  const step = 1;

  // Helper to check if two points are identical
  const isSamePoint = (p1: Point | null, p2: Point) => {
    if (!p1) return false;
    return p1.x === p2.x && p1.y === p2.y;
  };

  // Add a point manually via the button
  const handleAddPoint = () => {
    const newPoint = { ...currentP };
    
    // Prevent adding the same point twice in a row
    const last = points.length > 0 ? points[points.length - 1] : null;
    if (isSamePoint(last, newPoint)) return;

    if (isLinesMode) {
      if (lastPoint) {
        setLines(prev => [...prev, { p1: lastPoint, p2: newPoint }]);
      }
      setLastPoint(newPoint);
    }
    setPoints(prev => [...prev, newPoint]);
  };

  // Handle grid click
  const handleGridClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    // Snap to nearest integer
    const snappedX = Math.round(Math.max(0, Math.min(gridSize, svgP.x)));
    const snappedY = Math.round(Math.max(0, Math.min(gridSize, gridSize - svgP.y)));

    const newPoint = { x: snappedX, y: snappedY };
    
    // Prevent adding the same point twice in a row
    const last = points.length > 0 ? points[points.length - 1] : null;
    if (isSamePoint(last, newPoint)) {
      // Just update current selection feedback but don't add to list
      setCurrentP(newPoint);
      return;
    }
    
    if (isLinesMode) {
      if (lastPoint) {
        setLines(prev => [...prev, { p1: lastPoint, p2: newPoint }]);
      }
      setLastPoint(newPoint);
    }
    
    setPoints(prev => [...prev, newPoint]);
    setCurrentP(newPoint);
  };

  // Clear all
  const clearAll = () => {
    setPoints([]);
    setLines([]);
    setLastPoint(null);
    setCurrentP({ x: 0, y: 0 });
  };

  // Remove single point/line segment
  const removePoint = (index: number) => {
    if (isLinesMode) {
      const newPoints = points.filter((_, i) => i !== index);
      setPoints(newPoints);
      // Rebuild lines from remaining points sequence
      const newLines: Line[] = [];
      for(let i = 0; i < newPoints.length - 1; i++) {
        newLines.push({ p1: newPoints[i], p2: newPoints[i+1] });
      }
      setLines(newLines);
      setLastPoint(newPoints.length > 0 ? newPoints[newPoints.length - 1] : null);
    } else {
      setPoints(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (axis: 'x' | 'y', value: string) => {
    const num = Math.min(gridSize, Math.max(0, parseInt(value) || 0));
    setCurrentP(prev => ({ ...prev, [axis]: num }));
  };

  const themeColor = isLinesMode ? 'purple' : 'indigo';
  const themeHex = isLinesMode ? '#9333ea' : '#4f46e5';

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start animate-in fade-in duration-500">
      {/* Grid Area */}
      <div className="flex-1 bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-indigo-600 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět
          </button>
          <div className="text-right">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
              {isLinesMode ? 'Kreslení úseček' : 'Kreslení bodů'}
            </h2>
            <div className={`text-[10px] font-bold text-${themeColor}-500 bg-${themeColor}-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mt-1`}>
              {isLinesMode ? `${lines.length} úseček` : `${points.length} bodů`}
            </div>
          </div>
        </div>

        <div className="relative aspect-square w-full border-4 border-gray-100 rounded-[2rem] bg-white overflow-hidden shadow-inner flex items-center justify-center p-6">
          <svg 
            ref={svgRef}
            viewBox="-1.2 -0.8 12.5 12.2" 
            className="w-full h-full cursor-crosshair select-none"
            preserveAspectRatio="xMidYMid meet"
            onClick={handleGridClick}
          >
            <defs>
              <pattern id="vectorGrid" width={step} height={step} patternUnits="userSpaceOnUse">
                <path d={`M ${step} 0 L 0 0 0 ${step}`} fill="none" stroke="#f1f5f9" strokeWidth="0.05"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width={gridSize} height={gridSize} fill="url(#vectorGrid)" pointerEvents="all" />
            
            {/* Axes */}
            <line x1="0" y1={gridSize} x2={gridSize} y2={gridSize} stroke="#94a3b8" strokeWidth="0.1" />
            <line x1="0" y1="0" x2="0" y2={gridSize} stroke="#94a3b8" strokeWidth="0.1" />

            {/* Grid labels */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
              <React.Fragment key={val}>
                <text 
                  x={val} 
                  y={gridSize + 0.7} 
                  fontSize="0.5" 
                  className="fill-gray-400 font-black pointer-events-none" 
                  textAnchor="middle"
                >
                  {val}
                </text>
                
                {val !== 0 && (
                  <text 
                    x="-0.7" 
                    y={gridSize - val} 
                    fontSize="0.5" 
                    className="fill-gray-400 font-black pointer-events-none" 
                    alignmentBaseline="middle" 
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                )}
              </React.Fragment>
            ))}

            {/* Drawn Lines */}
            {lines.map((line, idx) => (
              <line
                key={`line-${idx}`}
                x1={line.p1.x}
                y1={gridSize - line.p1.y}
                x2={line.p2.x}
                y2={gridSize - line.p2.y}
                stroke={themeHex}
                strokeWidth="0.12"
                strokeLinecap="round"
                className="animate-in fade-in duration-500"
              />
            ))}

            {/* Placed Points */}
            {points.map((pt, idx) => (
              <circle 
                key={idx}
                cx={pt.x} 
                cy={gridSize - pt.y} 
                r="0.2" 
                fill={themeHex} 
                className="animate-in zoom-in duration-300 hover:fill-red-500 transition-colors"
              />
            ))}

            {/* Current Selection Feedback */}
            <circle 
              cx={currentP.x} 
              cy={gridSize - currentP.y} 
              r="0.25" 
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.05"
              strokeDasharray="0.1,0.1"
              className="animate-pulse"
            />

            {/* Preview Line */}
            {isLinesMode && lastPoint && (
              <line 
                x1={lastPoint.x}
                y1={gridSize - lastPoint.y}
                x2={currentP.x}
                y2={gridSize - currentP.y}
                stroke="#ef4444"
                strokeWidth="0.05"
                strokeDasharray="0.1,0.1"
                opacity="0.5"
              />
            )}
          </svg>
        </div>

        <div className="mt-4 flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
          <MousePointer2 className="w-4 h-4 mr-2 text-indigo-500" />
          {isLinesMode ? 'Klikáním tvoříš lomenou čáru spojenou body.' : 'Klikni do mřížky pro přidání samostatného bodu.'}
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-6 h-full max-h-[800px]">
        {/* Coordinates Input */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center uppercase tracking-tight">
            <div className={`w-3 h-8 bg-${themeColor}-600 rounded-full mr-3`}></div>
            Souřadnice
          </h3>

          <div className="space-y-4">
            <div className={`bg-${themeColor}-50/50 p-5 rounded-3xl border-2 border-${themeColor}-100 shadow-sm`}>
              <p className={`text-xs font-black text-${themeColor}-700 uppercase tracking-widest mb-3 flex items-center`}>
                <MapPin className="w-4 h-4 mr-2" />
                Nový bod
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Osa X</label>
                  <input 
                    type="number" 
                    min="0" max="10" step="1"
                    value={currentP.x} 
                    onChange={(e) => handleInputChange('x', e.target.value)}
                    className={`w-full p-3 bg-white border-2 border-${themeColor}-100 rounded-2xl text-center font-bold text-${themeColor}-900 focus:border-${themeColor}-500 outline-none transition-all`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Osa Y</label>
                  <input 
                    type="number" 
                    min="0" max="10" step="1"
                    value={currentP.y} 
                    onChange={(e) => handleInputChange('y', e.target.value)}
                    className={`w-full p-3 bg-white border-2 border-${themeColor}-100 rounded-2xl text-center font-bold text-${themeColor}-900 focus:border-${themeColor}-500 outline-none transition-all`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddPoint}
              className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white font-black rounded-3xl shadow-lg shadow-${themeColor}-100 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm`}
            >
              {isLinesMode ? <PenTool className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isLinesMode ? 'Vložit bod čáry' : 'Vložit bod'}
            </button>
          </div>
        </div>

        {/* List of Points */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex-1 flex flex-col overflow-hidden">
          <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center uppercase tracking-tight shrink-0">
            <div className={`w-3 h-8 bg-${isLinesMode ? 'purple' : 'indigo'}-600 rounded-full mr-3`}></div>
            {isLinesMode ? 'Historie čáry' : 'Seznam bodů'}
          </h3>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {points.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-300 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                <List className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest italic">Prázdný list</p>
              </div>
            ) : (
              <div className="space-y-2">
                {points.map((pt, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-3 bg-${themeColor}-50/30 border border-${themeColor}-50 rounded-2xl group hover:bg-white hover:border-${themeColor}-200 hover:shadow-sm transition-all animate-in slide-in-from-right-4 duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 bg-${themeColor}-600 text-white text-[10px] font-black rounded-lg flex items-center justify-center`}>
                        {idx + 1}
                      </div>
                      <span className={`font-black text-${themeColor}-900 tracking-tight text-sm`}>
                        [{pt.x}, {pt.y}]
                      </span>
                    </div>
                    <button 
                      onClick={() => removePoint(idx)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clear All */}
        <button 
          onClick={clearAll}
          className="w-full py-4 flex items-center justify-center bg-white hover:bg-red-50 text-red-500 hover:text-red-600 font-black rounded-3xl transition-all shadow-sm border-2 border-red-50 hover:border-red-200 uppercase text-[10px] tracking-widest shrink-0"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Smazat vše
        </button>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f8fafc;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }
        `}</style>
      </div>
    </div>
  );
};

export default VectorDrawing;
