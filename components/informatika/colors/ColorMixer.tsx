
import React, { useState } from 'react';
import { ArrowLeft, Info, HelpCircle } from 'lucide-react';

interface ColorMixerProps {
  mode: 'RGB' | 'CMYK';
  onBack: () => void;
}

const ColorMixer: React.FC<ColorMixerProps> = ({ mode, onBack }) => {
  // States for RGB
  const [r, setR] = useState(255);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  // States for CMYK
  const [c, setC] = useState(100);
  const [m, setM] = useState(0);
  const [y, setY] = useState(0);
  const [k, setK] = useState(0);

  // Helper to convert CMYK to RGB for display (simplified)
  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return { r, g, b };
  };

  const isRGB = mode === 'RGB';

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch animate-in fade-in duration-500">
      {/* Left Side: Visualization */}
      <div className={`flex-1 p-8 rounded-[3rem] shadow-2xl border-4 border-white flex flex-col transition-colors duration-700 ${isRGB ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className={`flex items-center font-black uppercase text-xs tracking-widest transition-colors ${isRGB ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-indigo-600'}`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na výběr
          </button>
          <div className="text-right">
            <h2 className={`text-2xl font-black uppercase tracking-tighter ${isRGB ? 'text-white' : 'text-gray-800'}`}>
              {mode} Experiment
            </h2>
            <p className={`text-xs font-bold uppercase tracking-widest ${isRGB ? 'text-blue-400' : 'text-indigo-600'}`}>
              {isRGB ? 'Míchání světla' : 'Míchání pigmentu'}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative min-h-[400px]">
          <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto drop-shadow-2xl">
            {isRGB ? (
              <g style={{ mixBlendMode: 'screen' }}>
                <circle cx="200" cy="160" r="100" fill={`rgb(${r},0,0)`} />
                <circle cx="150" cy="245" r="100" fill={`rgb(0,${g},0)`} />
                <circle cx="250" cy="245" r="100" fill={`rgb(0,0,${b})`} />
              </g>
            ) : (
              <g style={{ mixBlendMode: 'multiply' }}>
                {/* For CMYK simulation in SVG, we use pure C, M, Y and then apply K as a dark filter or layer */}
                <circle cx="200" cy="160" r="100" fill={`rgb(0,${255*(1-m/100)*(1-k/100)},${255*(1-y/100)*(1-k/100)})`} style={{ mixBlendMode: 'multiply' }} />
                <circle cx="150" cy="245" r="100" fill={`rgb(${255*(1-c/100)*(1-k/100)},0,${255*(1-y/100)*(1-k/100)})`} style={{ mixBlendMode: 'multiply' }} />
                <circle cx="250" cy="245" r="100" fill={`rgb(${255*(1-c/100)*(1-k/100)},${255*(1-m/100)*(1-k/100)},0)`} style={{ mixBlendMode: 'multiply' }} />
                
                {/* Specific CMY circle rendering for better visualization */}
                <circle cx="200" cy="160" r="100" fill={`rgb(0, 255, 255)`} style={{ mixBlendMode: 'multiply', opacity: c/100 }} />
                <circle cx="150" cy="245" r="100" fill={`rgb(255, 0, 255)`} style={{ mixBlendMode: 'multiply', opacity: m/100 }} />
                <circle cx="250" cy="245" r="100" fill={`rgb(255, 255, 0)`} style={{ mixBlendMode: 'multiply', opacity: y/100 }} />
                
                {/* K layer (black) affects the whole composition */}
                {k > 0 && (
                  <rect x="0" y="0" width="400" height="400" fill={`rgba(0,0,0,${k/100})`} pointerEvents="none" className="rounded-full" />
                )}
              </g>
            )}
          </svg>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className={`p-4 rounded-2xl border-2 flex items-center ${isRGB ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-indigo-50 border-indigo-100 text-indigo-800'}`}>
              <Info className="w-5 h-5 mr-3" />
              <p className="text-xs font-bold leading-tight">
                {isRGB 
                  ? "Všimni si, že tam, kde se protnou všechny barvy, vzniká bílá." 
                  : "Všimni si, že překryv barev ubírá světlo a směřuje k černé."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Controls */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex-1">
          <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center uppercase tracking-tight">
            <div className={`w-3 h-8 rounded-full mr-3 ${isRGB ? 'bg-blue-600' : 'bg-pink-600'}`}></div>
            Nastavení intenzity
          </h3>

          <div className="space-y-8">
            {isRGB ? (
              <>
                <ControlSlider label="Red (R)" value={r} setValue={setR} color="red" max={255} />
                <ControlSlider label="Green (G)" value={g} setValue={setG} color="green" max={255} />
                <ControlSlider label="Blue (B)" value={b} setValue={setB} color="blue" max={255} />
              </>
            ) : (
              <>
                <ControlSlider label="Cyan (C)" value={c} setValue={setC} color="cyan" max={100} unit="%" />
                <ControlSlider label="Magenta (M)" value={m} setValue={setM} color="magenta" max={100} unit="%" />
                <ControlSlider label="Yellow (Y)" value={y} setValue={setY} color="yellow" max={100} unit="%" />
                <ControlSlider label="Black (K)" value={k} setValue={setK} color="black" max={100} unit="%" />
              </>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Výsledná barva</p>
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl shadow-inner border-4 border-white ring-1 ring-gray-100"
                style={{ 
                  backgroundColor: isRGB 
                    ? `rgb(${r},${g},${b})` 
                    : `rgb(${cmykToRgb(c,m,y,k).r}, ${cmykToRgb(c,m,y,k).g}, ${cmykToRgb(c,m,y,k).b})` 
                }}
              ></div>
              <div>
                <p className="font-black text-gray-800 text-lg">
                  {isRGB ? `RGB(${r}, ${g}, ${b})` : `CMYK(${c}%, ${m}%, ${y}%, ${k}%)`}
                </p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aktuální mix</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-[2.5rem] border border-blue-100">
           <div className="flex items-start gap-3">
             <HelpCircle className="w-5 h-5 text-indigo-500 mt-0.5" />
             <p className="text-xs text-indigo-900 font-medium leading-relaxed">
               <strong>Věděli jste?</strong> {isRGB ? "RGB se používá všude tam, kde zařízení samo vyzařuje světlo. Je to jako svítit baterkami přes barevná skla." : "CMYK simuluje nanášení vrstev inkoustu na papír. Každá vrstva 'sežere' část odraženého světla."}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

interface ControlSliderProps {
  label: string;
  value: number;
  setValue: (v: number) => void;
  color: string;
  max: number;
  unit?: string;
}

const ControlSlider: React.FC<ControlSliderProps> = ({ label, value, setValue, color, max, unit = "" }) => {
  const colorMap: Record<string, string> = {
    red: 'accent-red-600 bg-red-50 text-red-700 border-red-100',
    green: 'accent-green-600 bg-green-50 text-green-700 border-green-100',
    blue: 'accent-blue-600 bg-blue-50 text-blue-700 border-blue-100',
    cyan: 'accent-cyan-500 bg-cyan-50 text-cyan-700 border-cyan-100',
    magenta: 'accent-pink-600 bg-pink-50 text-pink-700 border-pink-100',
    yellow: 'accent-yellow-400 bg-yellow-50 text-yellow-700 border-yellow-100',
    black: 'accent-gray-800 bg-gray-50 text-gray-700 border-gray-100'
  };

  const classes = colorMap[color] || 'accent-blue-600 bg-blue-50 text-blue-700 border-blue-100';

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className={`text-xs font-black uppercase tracking-widest ${classes.split(' ')[2]}`}>
          {label}
        </label>
        <span className="font-black text-gray-400 text-sm">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={value} 
        onChange={(e) => setValue(parseInt(e.target.value))}
        className={`w-full h-2.5 rounded-full appearance-none cursor-pointer ${classes.split(' ')[0]} ${classes.split(' ')[1]}`}
      />
      <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-tighter">
        <span>0</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default ColorMixer;
