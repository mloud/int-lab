
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Info, RefreshCcw, Trophy } from 'lucide-react';
import { Segment, RGB } from '../../../types';

interface RGBDrawingProps {
  onBack: () => void;
  initialSegments: Segment[];
  title: string;
}

const RGBDrawing: React.FC<RGBDrawingProps> = ({ onBack, initialSegments, title }) => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputRGB, setInputRGB] = useState<RGB>({ r: 255, g: 255, b: 255 });
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    setSegments(initialSegments.map(s => ({ ...s, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false })));
    setSelectedId(null);
    setShowWin(false);
  }, [initialSegments]);

  const selectedSegment = selectedId !== null ? segments.find(s => s.id === selectedId) : null;

  useEffect(() => {
    const allCorrect = segments.every(s => s.isCorrect);
    if (allCorrect && segments.length > 0) setShowWin(true);
  }, [segments]);

  const handleSegmentClick = (id: number) => {
    const segment = segments.find(s => s.id === id);
    if (!segment) return;
    setSelectedId(id);
    setInputRGB(segment.currentRGB);
  };

  const handleInputChange = (channel: keyof RGB, value: string) => {
    const num = Math.min(255, Math.max(0, parseInt(value) || 0));
    const newRGB = { ...inputRGB, [channel]: num };
    setInputRGB(newRGB);

    if (selectedId !== null) {
      setSegments(prev => prev.map(s => {
        if (s.id === selectedId) {
          const isCorrect = 
            newRGB.r === s.targetRGB.r && 
            newRGB.g === s.targetRGB.g && 
            newRGB.b === s.targetRGB.b;
          return { ...s, currentRGB: newRGB, isCorrect };
        }
        return s;
      }));
    }
  };

  const resetGame = () => {
    setSegments(initialSegments.map(s => ({...s, currentRGB: {r: 255, g: 255, b: 255}, isCorrect: false})));
    setSelectedId(null);
    setShowWin(false);
  };

  const correctCount = segments.filter(s => s.isCorrect).length;

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start animate-in fade-in duration-500">
      <div className="flex-1 bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět
          </button>
          <div className="flex flex-col items-end">
             <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">{title}</h2>
             <div className="flex items-center space-x-2 text-blue-700 font-bold bg-blue-50 px-4 py-1.5 rounded-full mt-1">
                <span className="text-xs">Pokrok: {correctCount} / {segments.length}</span>
                <div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${(correctCount / segments.length) * 100}%` }}
                  ></div>
                </div>
              </div>
          </div>
        </div>

        <div className="relative aspect-square w-full border-2 border-gray-100 rounded-[2rem] bg-[#fdfdfd] overflow-hidden cursor-crosshair shadow-inner">
          <svg 
            viewBox="0 0 400 400" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="drawingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#drawingGrid)" />

            {/* Rendering Paths First to stay in the background */}
            {segments.map((segment) => (
              <path
                key={`path-${segment.id}`}
                d={segment.path}
                fill={segment.isCorrect ? `rgb(${segment.targetRGB.r}, ${segment.targetRGB.g}, ${segment.targetRGB.b})` : '#ffffff'}
                stroke={selectedId === segment.id ? '#3b82f6' : '#e2e8f0'}
                strokeWidth={selectedId === segment.id ? 4 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => handleSegmentClick(segment.id)}
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
              />
            ))}

            {/* Rendering Labels Last to ensure they are always in front */}
            {segments.map((segment) => (
              !segment.isCorrect && (
                <text
                  key={`text-${segment.id}`}
                  x={segment.labelPosition.x}
                  y={segment.labelPosition.y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="select-none font-bold fill-gray-900 pointer-events-none"
                  style={{ 
                    fontSize: '8px', 
                    paintOrder: 'stroke', 
                    stroke: 'white', 
                    strokeWidth: '3px',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round'
                  }}
                >
                  {segment.targetRGB.r},{segment.targetRGB.g},{segment.targetRGB.b}
                </text>
              )
            ))}
          </svg>
        </div>

        <div className="mt-4 flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
          <Info className="w-4 h-4 mr-2 text-blue-500" />
          Klikni na část obrázku a nastav správné RGB hodnoty.
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100">
          <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center uppercase tracking-tighter">
            <div className="w-3 h-6 bg-blue-600 rounded-full mr-3"></div>
            RGB panel
          </h2>

          {selectedSegment ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <p className="text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">Aktuální barva</p>
                <div 
                  className="w-full h-24 rounded-3xl shadow-inner border-4 border-white ring-4 ring-gray-50 transition-colors duration-200"
                  style={{ backgroundColor: `rgb(${inputRGB.r}, ${inputRGB.g}, ${inputRGB.b})` }}
                ></div>
                <div className="mt-4 text-sm font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                  {inputRGB.r}, {inputRGB.g}, {inputRGB.b}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-red-700 uppercase tracking-widest flex justify-between">
                    <span>Červená (R)</span>
                    <span className="text-gray-400">{inputRGB.r}</span>
                  </label>
                  <input 
                    type="range" min="0" max="255" 
                    value={inputRGB.r} 
                    onChange={(e) => handleInputChange('r', e.target.value)}
                    className="w-full h-2 bg-red-100 rounded-full appearance-none cursor-pointer accent-red-600"
                  />
                  <input 
                    type="number" min="0" max="255" 
                    value={inputRGB.r} 
                    onChange={(e) => handleInputChange('r', e.target.value)}
                    className="w-full p-2 bg-red-50 border-2 border-red-100 rounded-xl text-center font-bold text-red-900 focus:border-red-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-green-700 uppercase tracking-widest flex justify-between">
                    <span>Zelená (G)</span>
                    <span className="text-gray-400">{inputRGB.g}</span>
                  </label>
                  <input 
                    type="range" min="0" max="255" 
                    value={inputRGB.g} 
                    onChange={(e) => handleInputChange('g', e.target.value)}
                    className="w-full h-2 bg-green-100 rounded-full appearance-none cursor-pointer accent-green-600"
                  />
                  <input 
                    type="number" min="0" max="255" 
                    value={inputRGB.g} 
                    onChange={(e) => handleInputChange('g', e.target.value)}
                    className="w-full p-2 bg-green-50 border-2 border-green-100 rounded-xl text-center font-bold text-green-900 focus:border-green-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-blue-700 uppercase tracking-widest flex justify-between">
                    <span>Modrá (B)</span>
                    <span className="text-gray-400">{inputRGB.b}</span>
                  </label>
                  <input 
                    type="range" min="0" max="255" 
                    value={inputRGB.b} 
                    onChange={(e) => handleInputChange('b', e.target.value)}
                    className="w-full h-2 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <input 
                    type="number" min="0" max="255" 
                    value={inputRGB.b} 
                    onChange={(e) => handleInputChange('b', e.target.value)}
                    className="w-full p-2 bg-blue-50 border-2 border-blue-100 rounded-xl text-center font-bold text-blue-900 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {selectedSegment.isCorrect && (
                <div className="bg-green-100 border-2 border-green-200 p-4 rounded-3xl flex items-center text-green-800 animate-in bounce-in duration-300">
                  <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                  <span className="text-sm font-black uppercase tracking-tighter">SPRÁVNĚ!</span>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
              <p className="mb-2 italic font-bold text-sm uppercase">Vyber část obrázku</p>
            </div>
          )}
        </div>

        <button 
          onClick={resetGame}
          className="w-full py-4 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 font-black rounded-[2rem] transition-all shadow-sm border-2 border-gray-100 uppercase text-xs tracking-widest"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Začít znovu
        </button>
      </div>

      {showWin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="w-28 h-28 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl rotate-12">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-3 uppercase tracking-tighter">Mise splněna!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              Odhalili jste: <span className="text-blue-600 font-black">{title.toUpperCase()}</span>. <br/>
              Vaše znalost RGB je na profesionální úrovni!
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={onBack}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] shadow-xl shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
              >
                Vybrat další úroveň
              </button>
              <button 
                onClick={resetGame}
                className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-[2rem] transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Opakovat úroveň
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGBDrawing;
