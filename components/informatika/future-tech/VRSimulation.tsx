import React, { useState, useRef, useEffect } from 'react';
import { Eye, MonitorSmartphone, MousePointer2, Cuboid, Brain } from 'lucide-react';

const VRSimulation: React.FC = () => {
  // --- VR STEREOSKOPICKÁ SIMULACE ---
  const [rotation, setRotation] = useState<number>(45);

  const renderCube = (color: string, offsetX: number, isSolid: boolean = false) => {
    if (isSolid) {
      return (
        <div 
          className="w-32 h-32 absolute top-1/2 left-1/2 -mt-16 -ml-16 transform-style-3d transition-transform duration-75"
          style={{
            transform: `perspective(600px) rotateX(-20deg) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 bg-purple-500/90 border-2 border-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.4)]" style={{ transform: 'translateZ(64px)' }}></div>
          <div className="absolute inset-0 bg-purple-800/90 border-2 border-purple-900" style={{ transform: 'translateZ(-64px)' }}></div>
          <div className="absolute inset-0 bg-purple-700/90 border-2 border-purple-800" style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}></div>
          <div className="absolute inset-0 bg-purple-600/90 border-2 border-purple-700" style={{ transform: 'rotateY(90deg) translateZ(64px)' }}></div>
          <div className="absolute inset-0 bg-purple-400/90 border-2 border-purple-500" style={{ transform: 'rotateX(90deg) translateZ(64px)' }}></div>
          <div className="absolute inset-0 bg-purple-900/90 border-2 border-purple-900" style={{ transform: 'rotateX(-90deg) translateZ(64px)' }}></div>
        </div>
      );
    }
    return (
      <div 
        className="w-32 h-32 absolute top-1/2 left-1/2 -mt-16 -ml-16 transform-style-3d transition-transform duration-75"
        style={{
          transform: `perspective(600px) rotateX(-20deg) rotateY(${rotation + offsetX}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'translateZ(64px)' }}></div>
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'translateZ(-64px)' }}></div>
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'rotateY(-90deg) translateZ(64px)' }}></div>
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'rotateY(90deg) translateZ(64px)' }}></div>
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'rotateX(90deg) translateZ(64px)' }}></div>
        <div className="absolute inset-0 border-4 bg-white/5" style={{ borderColor: color, transform: 'rotateX(-90deg) translateZ(64px)' }}></div>
      </div>
    );
  };

  // --- AR MAGIC WINDOW SIMULACE ---
  const arContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 400, y: 250 });
  const [containerSize, setContainerSize] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const updateSize = () => {
      if (arContainerRef.current) {
        const rect = arContainerRef.current.getBoundingClientRect();
        setContainerSize({ w: rect.width, h: rect.height });
      }
    };
    
    // Initial size
    updateSize();
    // Set initial mouse pos to center
    if (arContainerRef.current) {
       const rect = arContainerRef.current.getBoundingClientRect();
       setMousePos({ x: rect.width / 2, y: rect.height / 2 });
    }

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!arContainerRef.current) return;
    const rect = arContainerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      
      {/* VR SEKCE */}
      <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-fuchsia-100 rounded-2xl text-fuchsia-600">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800 uppercase">1. Skládání 3D obrazu (VR)</h2>
            <p className="text-gray-500 font-medium">Jak mozek tvoří hloubku ze dvou různých úhlů</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          Zkuste pohnout posuvníkem a otáčet kostkou. Levé a pravé oko vidí kostku pod mírně jiným úhlem (plochá "drátěná" kresba). Jakmile mozek tyto dva rozdílné ploché obrázky spojí, pochopí rozdíly a vytvoří z nich plně prostorový objekt s hloubkou.
        </p>

        {/* Ovládání */}
        <div className="max-w-xl mx-auto bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col items-center gap-4 mb-10 shadow-sm">
          <label className="font-bold text-purple-900 uppercase tracking-widest text-sm flex items-center gap-2">
            <Cuboid className="w-5 h-5" />
            Natočení objektu
          </label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={rotation} 
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Levé oko */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 flex flex-col items-center">
            <h3 className="font-bold text-red-500 mb-4 uppercase tracking-widest text-sm">Levé oko (Plochý obraz 1)</h3>
            <div className="w-full h-48 bg-white rounded-2xl border-2 border-slate-100 relative overflow-hidden shadow-inner flex items-center justify-center">
              {renderCube('#ef4444', 20)}
            </div>
          </div>
          
          {/* Pravé oko */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 flex flex-col items-center">
            <h3 className="font-bold text-blue-500 mb-4 uppercase tracking-widest text-sm">Pravé oko (Plochý obraz 2)</h3>
            <div className="w-full h-48 bg-white rounded-2xl border-2 border-slate-100 relative overflow-hidden shadow-inner flex items-center justify-center">
              {renderCube('#3b82f6', -20)}
            </div>
          </div>
        </div>

        {/* Mozek (Spojeno) */}
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-3xl p-8 flex flex-col items-center shadow-lg transform hover:scale-[1.02] transition-transform">
          <div className="bg-purple-600 text-white p-3 rounded-full mb-4 shadow-md">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="font-black text-purple-800 mb-2 uppercase text-xl">Mozek</h3>
          <p className="text-sm text-purple-600 text-center mb-6 font-medium max-w-lg">
            Spojí oba ploché obrázky a interpretuje rozdíly jako hloubku prostoru. Vznikne plnohodnotný 3D vjem.
          </p>
          <div className="w-full h-64 bg-white rounded-2xl border-2 border-purple-200 relative overflow-hidden shadow-inner flex items-center justify-center">
            {renderCube('', 0, true)}
          </div>
        </div>
      </div>

      {/* AR SEKCE */}
      <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-sky-100 rounded-2xl text-sky-600">
            <MonitorSmartphone className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800 uppercase">2. Rozšířená realita (AR Okno)</h2>
            <p className="text-gray-500 font-medium">Prolínání fyzického stolu a digitálního hologramu</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          Najeďte myší do obrázku níže a zkuste "hledat" mobilem objekt na stole v učebně. Zastínil jsem prostor mimo displej, abyste viděli, že fyzická učebna zůstává stále na stejném místě, ale AR displej nad stůl kreslí digitální rotující krystal přímo na stůl.
        </p>

        {/* AR Container */}
        <div 
          ref={arContainerRef}
          onMouseMove={handleMouseMove}
          className="w-full h-[500px] bg-slate-100 rounded-3xl relative overflow-hidden cursor-crosshair border-4 border-slate-300 shadow-inner group"
        >
          {/* 1. Fyzický svět (Učebna a stůl) - Vždy viditelný */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* Stěna */}
             <div className="absolute top-0 left-0 w-full h-[60%] bg-blue-50/50"></div>
             {/* Tabule */}
             <div className="absolute top-8 left-16 w-48 h-32 bg-emerald-800/80 border-8 border-slate-300 rounded shadow flex items-center justify-center">
                <span className="text-white/40 font-mono text-xl">x² + y² = z²</span>
             </div>
             {/* Stůl */}
             <div className="absolute bottom-0 left-0 w-full h-[40%] bg-amber-700 shadow-[inset_0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 left-[10%] w-[80%] h-full bg-amber-600 rounded-t-[4rem] shadow-2xl relative border-t-8 border-amber-500">
                   {/* Sešit na stole */}
                   <div className="absolute top-8 left-12 w-24 h-32 bg-white border border-slate-200 shadow-md rotate-[-10deg] rounded-sm flex flex-col justify-evenly px-2">
                     <div className="w-full h-px bg-blue-200"></div>
                     <div className="w-full h-px bg-blue-200"></div>
                     <div className="w-full h-px bg-blue-200"></div>
                   </div>
                   {/* Fixa */}
                   <div className="absolute top-20 left-40 w-16 h-2 bg-red-500 rotate-[35deg] rounded-full shadow-sm border border-red-600"></div>
                </div>
             </div>
          </div>

          {/* Nápověda */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity pointer-events-none z-10">
            <div className="bg-slate-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl animate-bounce">
              <MousePointer2 className="w-5 h-5" /> Hledejte mobilem hologram na stole
            </div>
          </div>
              
          {/* 2. Ztmavení okolí - Vše kromě výřezu mobilu bude tmavší */}
          <div className="absolute inset-0 bg-slate-900/60 transition-opacity pointer-events-none z-20 group-hover:bg-slate-900/70"></div>

          {/* 3. AR VRSTVA (Skutečný svět + Hologram) - Oříznuta přesně na velikost mobilu */}
          <div 
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              clipPath: `inset(${mousePos.y - 225}px ${containerSize.w - (mousePos.x + 144)}px ${containerSize.h - (mousePos.y + 225)}px ${mousePos.x - 144}px round 2.5rem)`
            }}
          >
             {/* Ostrý skutečný svět (světlá verze pod mobilem) */}
             <div className="absolute top-0 left-0 w-full h-[60%] bg-blue-50"></div>
             <div className="absolute top-8 left-16 w-48 h-32 bg-emerald-800 border-8 border-slate-300 rounded shadow flex items-center justify-center">
                <span className="text-white font-mono text-xl">x² + y² = z²</span>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-[40%] bg-amber-700 shadow-[inset_0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 left-[10%] w-[80%] h-full bg-amber-600 rounded-t-[4rem] shadow-2xl relative border-t-8 border-amber-500">
                   <div className="absolute top-8 left-12 w-24 h-32 bg-white border border-slate-200 shadow-md rotate-[-10deg] rounded-sm flex flex-col justify-evenly px-2">
                     <div className="w-full h-px bg-blue-200"></div><div className="w-full h-px bg-blue-200"></div><div className="w-full h-px bg-blue-200"></div>
                   </div>
                   <div className="absolute top-20 left-40 w-16 h-2 bg-red-500 rotate-[35deg] rounded-full shadow-sm border border-red-600"></div>
                </div>
             </div>

             {/* AR HOLOGRAM - Sedí přesně na stole a NENÍ posunutý do vzduchu */}
             <div className="absolute flex flex-col items-center pointer-events-auto"
                  style={{
                    top: '72%', // Na desce stolu (stůl je 60% až 100%)
                    left: '50%', // Přesně uprostřed stolu
                    transform: 'translate(-50%, -100%)' // Zvednuto tak, že spodek objektu sedí na zadaném Y (72%)
                  }}
             >
               {/* 3D Hologram objekt (Krychle) */}
               <div className="w-24 h-24 transform-style-3d animate-[spin_4s_linear_infinite] relative" style={{ transformStyle: 'preserve-3d' }}>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'translateZ(48px)' }}></div>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'translateZ(-48px)' }}></div>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}></div>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'rotateY(90deg) translateZ(48px)' }}></div>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'rotateX(90deg) translateZ(48px)' }}></div>
                 <div className="absolute inset-0 border-4 border-sky-400 bg-sky-400/40" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}></div>
                 
                 {/* Zvýrazněná AR stopa (placka) přesně pod objektem na zemi */}
                 <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-24 h-8 border-4 border-dashed border-sky-400 rounded-full bg-sky-400/20 shadow-[0_0_20px_rgba(56,189,248,0.5)]" style={{ transform: 'rotateX(75deg)' }}></div>
               </div>
             </div>
             
             {/* UI overlay mobilu (uvnitř clip-path vrstvy) */}
             <div className="absolute" style={{ top: mousePos.y - 209, left: mousePos.x + 70 }}>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-white tracking-widest uppercase drop-shadow-md">AR REC</span>
               </div>
             </div>
          </div>

          {/* 4. Rámeček mobilního telefonu */}
          <div 
            className="absolute w-72 h-[450px] border-[14px] border-slate-800 bg-transparent rounded-[2.5rem] overflow-hidden pointer-events-none z-40 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            style={{
              left: mousePos.x - 144, 
              top: mousePos.y - 225, 
            }}
          >
            {/* Ořez brady mobilu */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default VRSimulation;
