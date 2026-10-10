'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Info, HelpCircle, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

interface ColorMixerProps {
  mode: 'RGB' | 'CMYK';
  onBack?: () => void;
  hideBack?: boolean;
}

// Helper to calculate closest Czech color name
function getCzechColorName(r: number, g: number, b: number): string {
  if (r === 0 && g === 0 && b === 0) return 'Černá (žádné světlo)';
  if (r === 255 && g === 255 && b === 255) return 'Bílá (plné světlo)';
  if (r === g && g === b) {
    if (r < 60) return 'Velmi tmavá šedá';
    if (r < 130) return 'Tmavě šedá';
    if (r < 195) return 'Střední šedá';
    return 'Světle šedá';
  }

  const palette = [
    { name: 'Čistá červená', r: 255, g: 0, b: 0 },
    { name: 'Tmavě červená / vínová', r: 139, g: 0, b: 0 },
    { name: 'Světle červená / lososová', r: 255, g: 102, b: 102 },
    { name: 'Čistá zelená', r: 0, g: 255, b: 0 },
    { name: 'Tmavě zelená', r: 0, g: 100, b: 0 },
    { name: 'Limetková zelená', r: 50, g: 205, b: 50 },
    { name: 'Čistá modrá', r: 0, g: 0, b: 255 },
    { name: 'Tmavě modrá / námořnická', r: 0, g: 0, b: 128 },
    { name: 'Světle modrá / blankytná', r: 135, g: 206, b: 235 },
    { name: 'Královská modrá', r: 65, g: 105, b: 225 },
    { name: 'Žlutá (R + G)', r: 255, g: 255, b: 0 },
    { name: 'Zlatožlutá', r: 255, g: 215, b: 0 },
    { name: 'Azurová / Cyan (G + B)', r: 0, g: 255, b: 255 },
    { name: 'Tyrkysová', r: 64, g: 224, b: 208 },
    { name: 'Purpurová / Magenta (R + B)', r: 255, g: 0, b: 255 },
    { name: 'Fialová', r: 128, g: 0, b: 128 },
    { name: 'Růžová', r: 255, g: 105, b: 180 },
    { name: 'Oranžová', r: 255, g: 128, b: 0 },
    { name: 'Hnědá', r: 139, g: 69, b: 19 },
    { name: 'Olivová', r: 128, g: 128, b: 0 },
  ];

  let closest = palette[0];
  let minDiff = Infinity;

  for (const c of palette) {
    const diff = Math.sqrt(
      0.3 * Math.pow(r - c.r, 2) +
      0.59 * Math.pow(g - c.g, 2) +
      0.11 * Math.pow(b - c.b, 2)
    );
    if (diff < minDiff) {
      minDiff = diff;
      closest = c;
    }
  }

  return closest.name;
}

function toHex(n: number) {
  const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16).toUpperCase();
  return hex.length === 1 ? '0' + hex : hex;
}

const ColorMixer: React.FC<ColorMixerProps> = ({ mode, onBack, hideBack = false }) => {
  // RGB states (0 - 255)
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(0);

  // CMYK states (0 - 100%)
  const [c, setC] = useState(100);
  const [m, setM] = useState(0);
  const [y, setY] = useState(0);
  const [k, setK] = useState(0);

  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isRGB = mode === 'RGB';

  // Compute RGB equivalent for CMYK mode
  const cmykToRgb = (cVal: number, mVal: number, yVal: number, kVal: number) => {
    const rVal = Math.round(255 * (1 - cVal / 100) * (1 - kVal / 100));
    const gVal = Math.round(255 * (1 - mVal / 100) * (1 - kVal / 100));
    const bVal = Math.round(255 * (1 - yVal / 100) * (1 - kVal / 100));
    return { r: rVal, g: gVal, b: bVal };
  };

  const activeRgb = isRGB ? { r, g, b } : cmykToRgb(c, m, y, k);
  const hexCode = `#${toHex(activeRgb.r)}${toHex(activeRgb.g)}${toHex(activeRgb.b)}`;
  const colorName = getCzechColorName(activeRgb.r, activeRgb.g, activeRgb.b);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hardware-accelerated Canvas Rendering for guaranteed additive / subtractive mixing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 420;
    const height = 390;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    if (isRGB) {
      // 1. Dark projector / screen stage background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Subtle high-tech grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 20; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. TRUE ADDITIVE RGB MIXING (Lighter composite operator)
      // In physics of light: R + G = Yellow, R + B = Magenta, G + B = Cyan, R + G + B = White!
      ctx.globalCompositeOperation = 'lighter';

      const radius = 95;
      const topX = 210, topY = 150;
      const leftX = 155, leftY = 245;
      const rightX = 265, rightY = 245;

      // Red circle
      ctx.fillStyle = `rgb(${r}, 0, 0)`;
      ctx.beginPath();
      ctx.arc(topX, topY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Green circle
      ctx.fillStyle = `rgb(0, ${g}, 0)`;
      ctx.beginPath();
      ctx.arc(leftX, leftY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Blue circle
      ctx.fillStyle = `rgb(0, 0, ${b})`;
      ctx.beginPath();
      ctx.arc(rightX, rightY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Reset composite operation to draw borders and labels cleanly on top
      ctx.globalCompositeOperation = 'source-over';

      // Circle outlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1.5;
      [
        { x: topX, y: topY },
        { x: leftX, y: leftY },
        { x: rightX, y: rightY }
      ].forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Labels for primary spotlights
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';

      // Red spotlight badge
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.fillText(`ČERVENÁ (R: ${r})`, topX, 60);

      // Green spotlight badge
      ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
      ctx.fillText(`ZELENÁ (G: ${g})`, leftX - 45, 335);

      // Blue spotlight badge
      ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
      ctx.fillText(`MODRÁ (B: ${b})`, rightX + 45, 335);

    } else {
      // CMYK: White paper stage background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 1. SUBTRACTIVE PIGMENT MIXING (Multiply composite operator)
      ctx.globalCompositeOperation = 'multiply';

      const radius = 95;
      const topX = 210, topY = 150;
      const leftX = 155, leftY = 245;
      const rightX = 265, rightY = 245;

      // Cyan (absorbs Red)
      const cyanAbsorb = Math.round(255 * (1 - c / 100));
      ctx.fillStyle = `rgb(${cyanAbsorb}, 255, 255)`;
      ctx.beginPath();
      ctx.arc(topX, topY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Magenta (absorbs Green)
      const magAbsorb = Math.round(255 * (1 - m / 100));
      ctx.fillStyle = `rgb(255, ${magAbsorb}, 255)`;
      ctx.beginPath();
      ctx.arc(leftX, leftY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Yellow (absorbs Blue)
      const yelAbsorb = Math.round(255 * (1 - y / 100));
      ctx.fillStyle = `rgb(255, 255, ${yelAbsorb})`;
      ctx.beginPath();
      ctx.arc(rightX, rightY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Black (K) ink layer
      if (k > 0) {
        const kFactor = Math.round(255 * (1 - k / 100));
        ctx.fillStyle = `rgb(${kFactor}, ${kFactor}, ${kFactor})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Reset to source-over
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1.5;
      [
        { x: topX, y: topY },
        { x: leftX, y: leftY },
        { x: rightX, y: rightY }
      ].forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0891b2';
      ctx.fillText(`CYAN (C: ${c}%)`, topX, 60);
      ctx.fillStyle = '#db2777';
      ctx.fillText(`MAGENTA (M: ${m}%)`, leftX - 45, 335);
      ctx.fillStyle = '#ca8a04';
      ctx.fillText(`YELLOW (Y: ${y}%)`, rightX + 45, 335);
    }
  }, [r, g, b, c, m, y, k, isRGB]);

  // Quick preset loader
  const setPreset = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch animate-in fade-in duration-500">
      
      {/* LEVÁ ČÁST: VIZUALIZACE A PROJEKČNÍ PLÁTNO (Čistá bílá karta dle pravidel IntLabu) */}
      <div className="flex-1 bg-white p-8 rounded-[3rem] shadow-xl border-4 border-slate-100 flex flex-col justify-between">
        <div>
          {/* Horní hlavička s tlačítkem zpět a titulkem */}
          <div className={`flex items-center ${hideBack ? 'justify-end' : 'justify-between'} mb-6`}>
            {!hideBack && onBack && (
              <button 
                onClick={onBack}
                className="flex items-center font-black uppercase text-xs tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Zpět na výběr
              </button>
            )}
            <div className="text-right">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800">
                {mode} Laboratoř
              </h2>
              <p className={`text-xs font-bold uppercase tracking-widest ${isRGB ? 'text-blue-600' : 'text-pink-600'}`}>
                {isRGB ? 'Aditivní míchání světla (Displej)' : 'Subtraktivní míchání pigmentu (Tisk)'}
              </p>
            </div>
          </div>

          {/* Rámeček projekčního plátna / monitoru */}
          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center p-4 bg-slate-950">
            <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                {isRGB ? 'Interaktivní plátno světel' : 'Tiskové plátno (papír)'}
              </span>
            </div>

            <canvas 
              ref={canvasRef} 
              className="w-full max-w-[420px] h-auto aspect-[420/390] rounded-2xl block"
            />

            {/* Popisek průniků pro žáky */}
            <div className="mt-2 text-center">
              <p className="text-[11px] text-slate-300 font-medium">
                {isRGB ? (
                  <>
                    Překryv světel se sčítá: <span className="text-yellow-300 font-bold">R+G = Žlutá</span>, <span className="text-pink-300 font-bold">R+B = Purpurová</span>, <span className="text-cyan-300 font-bold">G+B = Azurová</span>, <span className="text-white font-bold">R+G+B = Bílá</span>
                  </>
                ) : (
                  <>
                    Překryv pigmentů ubírá světlo: <span className="text-blue-400 font-bold">C+M = Modrá</span>, <span className="text-green-400 font-bold">C+Y = Zelená</span>, <span className="text-red-400 font-bold">M+Y = Červená</span>, <span className="text-slate-200 font-bold">Všechny = Černá</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Spodní info karta */}
        <div className={`mt-6 p-4 rounded-2xl border-2 flex items-center gap-3 ${isRGB ? 'bg-blue-50/60 border-blue-100 text-blue-900' : 'bg-pink-50/60 border-pink-100 text-pink-900'}`}>
          <Info className="w-5 h-5 flex-shrink-0 text-blue-600" />
          <p className="text-xs font-semibold leading-relaxed">
            {isRGB 
              ? "Všimni si: Černá je výchozí stav (všechny diody zhasnuté). Přidáváním červené, zelené a modré se intenzita sčítá a uprostřed vzniká bílé světlo!" 
              : "Všimni si: Bílý papír odráží všechno světlo. Každá nanesená barva inkoustu část spektra pohltí (ubere), až nakonec zbude černá."}
          </p>
        </div>
      </div>

      {/* PRAVÁ ČÁST: OVLÁDACÍ PANELY A VELKÝ NÁHLED VÝSLEDNÉ BARVY */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        
        {/* HLAVNÍ BLOK: SLIDERY A PŘEDVOLBY */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center uppercase tracking-tight">
              <div className={`w-3 h-8 rounded-full mr-3 ${isRGB ? 'bg-blue-600' : 'bg-pink-600'}`}></div>
              Nastavení intenzity
            </h3>

            {/* SLIDERY */}
            <div className="space-y-6">
              {isRGB ? (
                <>
                  <RgbSlider label="Červená (Red)" value={r} setValue={setR} channel="r" />
                  <RgbSlider label="Zelená (Green)" value={g} setValue={setG} channel="g" />
                  <RgbSlider label="Modrá (Blue)" value={b} setValue={setB} channel="b" />
                </>
              ) : (
                <>
                  <CmykSlider label="Azurová (Cyan)" value={c} setValue={setC} colorClass="accent-cyan-500" />
                  <CmykSlider label="Purpurová (Magenta)" value={m} setValue={setM} colorClass="accent-pink-600" />
                  <CmykSlider label="Žlutá (Yellow)" value={y} setValue={setY} colorClass="accent-yellow-400" />
                  <CmykSlider label="Černá (Black / K)" value={k} setValue={setK} colorClass="accent-slate-900" />
                </>
              )}
            </div>

            {/* RYCHLÉ PŘEDVOLBY (VZORNÍK) - POUZE PRO RGB */}
            {isRGB && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Rychlé vzory barev
                  </span>
                  <button 
                    onClick={() => setPreset(0, 0, 0)}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <PresetBtn label="Červená" color="bg-red-500" onClick={() => setPreset(255, 0, 0)} />
                  <PresetBtn label="Zelená" color="bg-green-500" onClick={() => setPreset(0, 255, 0)} />
                  <PresetBtn label="Modrá" color="bg-blue-500" onClick={() => setPreset(0, 0, 255)} />
                  <PresetBtn label="Žlutá" color="bg-yellow-400" onClick={() => setPreset(255, 255, 0)} />
                  <PresetBtn label="Azurová" color="bg-cyan-400" onClick={() => setPreset(0, 255, 255)} />
                  <PresetBtn label="Magenta" color="bg-fuchsia-500" onClick={() => setPreset(255, 0, 255)} />
                  <PresetBtn label="Bílá" color="bg-white border border-slate-300" onClick={() => setPreset(255, 255, 255)} />
                  <PresetBtn label="Černá" color="bg-black" onClick={() => setPreset(0, 0, 0)} />
                </div>
              </div>
            )}
          </div>

          {/* VELKÝ A DETAILNÍ NÁHLED VÝSLEDNÉ BARVY */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Výsledná namíchaná barva
            </p>
            
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {/* Vzorek barvy */}
              <div 
                className="w-16 h-16 rounded-2xl shadow-md border-4 border-white flex-shrink-0 transition-colors duration-200 ring-1 ring-slate-200"
                style={{ backgroundColor: hexCode }}
              />
              
              {/* Detaily a kód */}
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-900 text-sm truncate">
                  {colorName}
                </p>
                <p className="font-mono text-xs font-bold text-slate-600 mt-0.5">
                  RGB({activeRgb.r}, {activeRgb.g}, {activeRgb.b})
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[11px] text-slate-400 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {hexCode}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Kopírovat HEX kód"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* POZNÁMKA O FUNGOVÁNÍ DISPLEJŮ */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-[2.5rem] border border-blue-100 shadow-sm">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-indigo-950 font-medium leading-relaxed">
              <strong>Jak funguje tvůj monitor?</strong> {isRGB 
                ? "Každý pixel na obrazovce se skládá ze tří miniaturních světýlek (červené, zelené a modré). Pokud rozsvítíš červené a zelené světýlko naráz, tvé oči a mozek je sloučí a uvidíš žlutou barvu!" 
                : "Tiskárna nanáší na bílý papír drobné kapičky inkoustu C, M, Y a K. Čím více inkoustu naneseme, tím méně světla se odrazí."}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

// Pomocná komponenta pro RGB slider s barevným podkladem
interface RgbSliderProps {
  label: string;
  value: number;
  setValue: (v: number) => void;
  channel: 'r' | 'g' | 'b';
}

const RgbSlider: React.FC<RgbSliderProps> = ({ label, value, setValue, channel }) => {
  const getGradient = () => {
    switch (channel) {
      case 'r': return 'accent-red-600 bg-red-100 text-red-600';
      case 'g': return 'accent-emerald-600 bg-emerald-100 text-emerald-600';
      case 'b': return 'accent-blue-600 bg-blue-100 text-blue-600';
    }
  };

  const getTrackColor = () => {
    switch (channel) {
      case 'r': return 'from-slate-900 to-red-600';
      case 'g': return 'from-slate-900 to-emerald-600';
      case 'b': return 'from-slate-900 to-blue-600';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className={`text-xs font-black uppercase tracking-wider ${getGradient().split(' ')[2]}`}>
          {label}
        </label>
        <span className="font-mono font-bold text-slate-700 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
          {value}
        </span>
      </div>

      <div className="relative flex items-center">
        <input 
          type="range" 
          min="0" 
          max="255" 
          value={value} 
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          className={`w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r ${getTrackColor()} ${getGradient().split(' ')[0]}`}
        />
      </div>

      <div className="flex justify-between text-[10px] font-bold text-slate-400">
        <span>0 (Zhasnuto)</span>
        <span>255 (Plný svit)</span>
      </div>
    </div>
  );
};

// Pomocná komponenta pro CMYK slider
interface CmykSliderProps {
  label: string;
  value: number;
  setValue: (v: number) => void;
  colorClass: string;
}

const CmykSlider: React.FC<CmykSliderProps> = ({ label, value, setValue, colorClass }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <span className="font-mono font-bold text-slate-700 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
          {value}%
        </span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        className={`w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-200 ${colorClass}`}
      />
      <div className="flex justify-between text-[10px] font-bold text-slate-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Pomocné tlačítko pro rychlé předvolby
interface PresetBtnProps {
  label: string;
  color: string;
  onClick: () => void;
}

const PresetBtn: React.FC<PresetBtnProps> = ({ label, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-1.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-center group"
  >
    <div className={`w-5 h-5 rounded-full shadow-sm ${color} group-hover:scale-110 transition-transform`} />
    <span className="text-[10px] font-bold text-slate-600 truncate w-full">{label}</span>
  </button>
);

export default ColorMixer;
