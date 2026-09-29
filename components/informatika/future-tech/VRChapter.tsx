import React, { useState } from 'react';
import { ArrowLeft, Glasses, MonitorSmartphone, Eye, Layers, Cuboid, ScanFace, Info, Play, Sparkles, ShieldAlert, Home, HeartPulse, Wrench, ShoppingCart } from 'lucide-react';
import VRSimulation from './VRSimulation';

interface VRChapterProps {
  onBack: () => void;
}

const VRChapter: React.FC<VRChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'usage' | 'simulation'>('theory');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      
      {/* HEADER */}
      <div className="w-full max-w-7xl bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 animate-in slide-in-from-top-4 relative z-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors border border-gray-200 w-full md:w-auto justify-center"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět na témata
        </button>
        
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
            <Glasses className="w-6 h-6" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black text-gray-800">Virtuální realita</h1>
            <p className="text-gray-500 font-medium text-sm">VR, AR a prostorové vnímání</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'theory' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Info className="w-5 h-5" /> Teorie
          </button>
          <button 
            onClick={() => setActiveTab('usage')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'usage' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Layers className="w-5 h-5" /> Využití
          </button>
          <button 
            onClick={() => setActiveTab('simulation')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'simulation' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Play className="w-5 h-5" /> Simulace
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl">
        {activeTab === 'theory' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            
            {/* HERO SECTION */}
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-[3rem] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                    Vstupte do jiné dimenze
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-100 font-medium mb-8 leading-relaxed">
                    Často slyšíme pojmy <strong>Virtuální realita (VR)</strong> a <strong>Rozšířená realita (AR)</strong>. I když obě technologie mění to, co vidíme a prožíváme, dělají to úplně odlišným způsobem a obelhávají náš mozek pomocí optických triků.
                  </p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                    <Glasses className="w-32 h-32 text-white opacity-90" />
                    <Sparkles className="w-16 h-16 text-purple-300 absolute top-4 right-4 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-fuchsia-400 animate-[spin_8s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROZDÍL VR A AR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* VR Blok */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner border border-purple-100">
                  <Glasses className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 uppercase mb-4">Virtuální realita (VR)</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  Uzavře vás do jiného světa. Speciální brýle (headset) vám zcela zakryjí výhled na skutečné okolí a nahradí ho 100% počítačově generovaným 3D obrazem. Nic reálného nevidíte.
                </p>
              </div>

              {/* AR Blok */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-24 h-24 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner border border-sky-100">
                  <MonitorSmartphone className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 uppercase mb-4">Rozšířená realita (AR)</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">
                  Vidíte skutečný svět, ale přes průhledné brýle nebo displej mobilu se do něj promítají digitální objekty. Klasickým příkladem je hledání pokémonů v parku.
                </p>
              </div>
            </div>

            {/* JAK FUNGUJE 3D VIDENI */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-fuchsia-100 rounded-2xl text-fuchsia-600">
                  <Eye className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 uppercase">Jak vnímáme hloubku?</h2>
              </div>
              
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 max-w-4xl">
                Zkuste si dát prst před obličej a střídavě zavírat pravé a levé oko. Prst zdánlivě "skáče". Proč? Protože každé oko je na hlavě jinde a vidí svět pod mírně jiným úhlem. Mozek tyto dva různé obrázky spojí a vytvoří z nich informaci o tom, jak jsou předměty daleko. Tomu se říká <strong>Binokulární vidění</strong>.
              </p>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center w-full">
                {/* Vektorová grafika pro IPD */}
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* Background grid */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                  </pattern>
                  <rect width="800" height="400" fill="url(#grid)" />
                  
                  {/* Target Object (Cube) */}
                  <g transform="translate(400, 100)">
                    <rect x="-30" y="-30" width="60" height="60" fill="#a855f7" rx="8" />
                    <rect x="-20" y="-20" width="40" height="40" fill="#d8b4fe" rx="4" />
                    <text x="0" y="5" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#581c87" textAnchor="middle" dominantBaseline="middle">OBJEKT</text>
                  </g>

                  {/* Left Eye View Paths */}
                  <path d="M 280 300 L 375 130" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,8" />
                  <path d="M 280 300 L 425 130" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,8" />
                  
                  {/* Right Eye View Paths */}
                  <path d="M 520 300 L 375 130" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,8" />
                  <path d="M 520 300 L 425 130" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,8" />

                  {/* Left Eye */}
                  <g transform="translate(280, 300)">
                    <ellipse cx="0" cy="0" rx="40" ry="25" fill="white" stroke="#64748b" strokeWidth="4" />
                    <circle cx="0" cy="0" r="15" fill="#ef4444" />
                    <circle cx="-5" cy="-5" r="4" fill="white" />
                    <text x="0" y="45" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#475569" textAnchor="middle">Levé oko</text>
                  </g>

                  {/* Right Eye */}
                  <g transform="translate(520, 300)">
                    <ellipse cx="0" cy="0" rx="40" ry="25" fill="white" stroke="#64748b" strokeWidth="4" />
                    <circle cx="0" cy="0" r="15" fill="#3b82f6" />
                    <circle cx="-5" cy="-5" r="4" fill="white" />
                    <text x="0" y="45" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#475569" textAnchor="middle">Pravé oko</text>
                  </g>

                  {/* IPD Line */}
                  <line x1="280" y1="360" x2="520" y2="360" stroke="#334155" strokeWidth="2" />
                  <line x1="280" y1="355" x2="280" y2="365" stroke="#334155" strokeWidth="2" />
                  <line x1="520" y1="355" x2="520" y2="365" stroke="#334155" strokeWidth="2" />
                  <text x="400" y="385" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#334155" textAnchor="middle">Vzdálenost očí (IPD ~ 63 mm)</text>
                </svg>
              </div>
            </div>

            {/* JAK TO PODVÁDÍ BRÝLE (VR) */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-indigo-100 rounded-2xl text-indigo-600">
                  <Cuboid className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 uppercase">Trik Virtuální reality</h2>
              </div>
              
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 max-w-4xl">
                Aby si náš mozek myslel, že je ve skutečném 3D prostoru, musí mu VR brýle ukázat <strong>dva různé obrazy</strong>. Obrazovka uvnitř brýlí je softwarově rozdělena na dvě poloviny. Mezi očima a obrazovkou jsou navíc <strong>čočky</strong>, které obraz zblízka zaostří a roztáhnou, aby vyplnil celé zorné pole.
              </p>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center w-full">
                 {/* Vektorová grafika pro VR Headset - Svetly motiv */}
                 <svg className="w-full max-w-4xl h-auto" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
                  {/* Phone / Screen inside headset */}
                  <rect x="150" y="50" width="500" height="150" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" rx="10" />
                  <line x1="400" y1="50" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="5,5" />
                  
                  {/* Left Screen Image (Red shifted) */}
                  <g transform="translate(200, 75)">
                    <rect x="0" y="0" width="150" height="100" fill="#e0e7ff" rx="5" />
                    <rect x="40" y="30" width="40" height="40" fill="#a855f7" rx="5" />
                    <text x="75" y="125" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#4338ca" textAnchor="middle">Obraz pro levé oko</text>
                  </g>
                  
                  {/* Right Screen Image (Blue shifted - slightly different angle) */}
                  <g transform="translate(450, 75)">
                    <rect x="0" y="0" width="150" height="100" fill="#e0e7ff" rx="5" />
                    <rect x="70" y="30" width="40" height="40" fill="#a855f7" rx="5" />
                    <text x="75" y="125" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#4338ca" textAnchor="middle">Obraz pro pravé oko</text>
                  </g>

                  {/* Lenses */}
                  <ellipse cx="275" cy="230" rx="60" ry="20" fill="#bae6fd" fillOpacity="0.5" stroke="#0ea5e9" strokeWidth="3" />
                  <ellipse cx="525" cy="230" rx="60" ry="20" fill="#bae6fd" fillOpacity="0.5" stroke="#0ea5e9" strokeWidth="3" />
                  
                  <text x="275" y="270" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#0284c7" textAnchor="middle">Čočka (Zaostřuje na blízko)</text>
                  <text x="525" y="270" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#0284c7" textAnchor="middle">Čočka (Zaostřuje na blízko)</text>

                  {/* Eyes */}
                  <g transform="translate(275, 310)">
                    <path d="M -30 0 Q 0 -20 30 0 Q 0 20 -30 0" fill="white" stroke="#64748b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="10" fill="#0f172a" />
                  </g>

                  <g transform="translate(525, 310)">
                    <path d="M -30 0 Q 0 -20 30 0 Q 0 20 -30 0" fill="white" stroke="#64748b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="10" fill="#0f172a" />
                  </g>

                  {/* View rays from screen through lens to eyes */}
                  <path d="M 275,175 L 275,230 L 275,300" stroke="#f472b6" strokeWidth="3" strokeDasharray="5,5" />
                  <path d="M 525,175 L 525,230 L 525,300" stroke="#f472b6" strokeWidth="3" strokeDasharray="5,5" />

                  {/* Connection from eyes to lenses to screen edges */}
                  <path d="M 275,310 L 215,230 L 200,175" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6"/>
                  <path d="M 275,310 L 335,230 L 350,175" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6"/>
                  
                  <path d="M 525,310 L 465,230 L 450,175" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6"/>
                  <path d="M 525,310 L 585,230 L 600,175" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6"/>
                </svg>
              </div>
            </div>

            {/* JAK FUNGUJE AR */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-sky-100 rounded-2xl text-sky-600">
                  <ScanFace className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 uppercase">Trik Rozšířené reality</h2>
              </div>
              
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 max-w-4xl">
                V <strong>Rozšířené realitě (AR)</strong> displej neslouží k tomu, aby zablokoval výhled na skutečný svět, ale naopak jej využívá jako pozadí. Pomocí kamery (na telefonu) nebo průhledných brýlí přístroj neustále mapuje prostor kolem vás a do tohoto obrazu pak chytře kreslí 3D hologramy (digitální prvky), jako by tam skutečně stály.
              </p>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center w-full">
                 {/* Nová Vektorová grafika pro AR - Realita vs AR Displej */}
                 <svg className="w-full max-w-4xl h-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Rozdělovací čára */}
                  <line x1="400" y1="20" x2="400" y2="380" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="10,10" />

                  {/* PANEL 1: Skutečný svět */}
                  <g transform="translate(0, 0)">
                    <text x="200" y="40" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#64748b" textAnchor="middle" letterSpacing="1">1. SKUTEČNÝ SVĚT</text>
                    <text x="200" y="65" fontFamily="sans-serif" fontSize="14" fill="#94a3b8" textAnchor="middle">To, co vidíte pouhým okem</text>

                    {/* Fyzický stůl a předměty */}
                    <g transform="translate(50, 120)">
                       {/* Stůl */}
                       <path d="M 20 180 L 280 180 L 320 250 L -20 250 Z" fill="#d97706" />
                       <path d="M -20 250 L 320 250 L 320 270 L -20 270 Z" fill="#b45309" />
                       
                       {/* Otevřená kniha / Sešit */}
                       <g transform="translate(150, 200)">
                         {/* Levá stránka */}
                         <path d="M 0 0 L -80 -20 L -60 30 L 0 40 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                         {/* Pravá stránka */}
                         <path d="M 0 0 L 80 -20 L 60 30 L 0 40 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                         {/* Linky levá */}
                         <line x1="-10" y1="10" x2="-65" y2="-5" stroke="#94a3b8" strokeWidth="2" />
                         <line x1="-10" y1="20" x2="-65" y2="5" stroke="#94a3b8" strokeWidth="2" />
                         {/* Linky pravá */}
                         <line x1="10" y1="10" x2="65" y2="-5" stroke="#94a3b8" strokeWidth="2" />
                         <line x1="10" y1="20" x2="65" y2="5" stroke="#94a3b8" strokeWidth="2" />
                         {/* Vazba */}
                         <path d="M 0 0 L 0 40" stroke="#cbd5e1" strokeWidth="4" />
                       </g>
                    </g>
                  </g>

                  {/* PANEL 2: Pohled přes AR displej */}
                  <g transform="translate(400, 0)">
                    <text x="200" y="40" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#0284c7" textAnchor="middle" letterSpacing="1">2. POHLED PŘES MOBIL (AR)</text>
                    <text x="200" y="65" fontFamily="sans-serif" fontSize="14" fill="#38bdf8" textAnchor="middle">Displej ukazuje realitu + digitální objekt</text>

                    {/* Mobilní telefon (Rámeček) */}
                    <g transform="translate(50, 100)">
                      <rect x="0" y="0" width="300" height="280" rx="20" fill="#0f172a" stroke="#cbd5e1" strokeWidth="8" />
                      {/* Notch kamery */}
                      <rect x="110" y="0" width="80" height="15" rx="5" fill="#cbd5e1" />
                      
                      {/* Obrazovka (Screen) */}
                      <g transform="translate(10, 20)">
                         {/* Oříznutí obsahu obrazovky */}
                         <clipPath id="screen-clip">
                           <rect x="0" y="0" width="280" height="250" rx="10" />
                         </clipPath>
                         
                         <g clipPath="url(#screen-clip)">
                           {/* Pozadí kamery (lehce namodralé, simulace displeje) */}
                           <rect x="0" y="0" width="280" height="250" fill="#f0f9ff" />
                           
                           {/* Fyzický stůl (stejný jako vlevo, ale zobrazený na displeji) */}
                           <g transform="translate(0, 20)">
                              <path d="M 20 180 L 280 180 L 320 250 L -20 250 Z" fill="#d97706" />
                              <path d="M -20 250 L 320 250 L 320 270 L -20 270 Z" fill="#b45309" />
                              <g transform="translate(150, 200)">
                                <path d="M 0 0 L -80 -20 L -60 30 L 0 40 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                                <path d="M 0 0 L 80 -20 L 60 30 L 0 40 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                                <path d="M 0 0 L 0 40" stroke="#cbd5e1" strokeWidth="4" />
                              </g>
                           </g>

                           {/* AR HOLOGRAM - Přidaný přes realitu */}
                           {/* Vykreslíme 3D planetu nebo krychli nad knihou */}
                           <g transform="translate(150, 140)">
                             {/* Stín pod objektem */}
                             <ellipse cx="0" cy="80" rx="40" ry="15" fill="rgba(0,0,0,0.3)" />
                             
                             {/* Zaměřovací mřížka AR (Tracking grid) */}
                             <ellipse cx="0" cy="80" rx="60" ry="25" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" />
                             
                             {/* Vznášející se AR Objekt (Digitální glóbus) */}
                             <circle cx="0" cy="20" r="40" fill="#38bdf8" fillOpacity="0.8" stroke="#0284c7" strokeWidth="3" />
                             {/* Rovníky/Poledníky simulující 3D */}
                             <ellipse cx="0" cy="20" rx="40" ry="15" fill="none" stroke="#e0f2fe" strokeWidth="2" />
                             <ellipse cx="0" cy="20" rx="15" ry="40" fill="none" stroke="#e0f2fe" strokeWidth="2" />
                             
                             {/* Popisek AR */}
                             <rect x="-30" y="-45" width="60" height="20" rx="5" fill="#0284c7" />
                             <text x="0" y="-31" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">AR Model</text>
                           </g>

                           {/* UI prvky kamery (AR overlay) */}
                           <circle cx="20" cy="20" r="6" fill="#ef4444" />
                           <text x="35" y="24" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#ef4444" letterSpacing="1">REC</text>
                           <path d="M 10 10 L 30 10 L 30 30" fill="none" stroke="#94a3b8" strokeWidth="2" />
                           <path d="M 270 10 L 250 10 L 250 30" fill="none" stroke="#94a3b8" strokeWidth="2" />
                           <path d="M 10 240 L 30 240 L 30 220" fill="none" stroke="#94a3b8" strokeWidth="2" />
                           <path d="M 270 240 L 250 240 L 250 220" fill="none" stroke="#94a3b8" strokeWidth="2" />
                         </g>
                      </g>
                    </g>
                  </g>
                 </svg>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'usage' && (
          <div className="flex flex-col gap-12 animate-in fade-in duration-500">
            
            {/* Úvodní karta */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
              <div className="p-6 bg-purple-100 rounded-3xl text-purple-600 flex-shrink-0">
                <Layers className="w-16 h-16" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 mb-4">Budoucnost je teď</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  Virtuální a rozšířená realita už dávno nejsou jen sci-fi nebo hračky pro gamery. Jsou to každodenní pracovní nástroje, které zachraňují životy, zrychlují stavbu měst a šetří miliardy v průmyslu.
                </p>
              </div>
            </div>

            {/* SEKCE VR */}
            <div>
              <div className="flex items-center gap-4 mb-8 pl-4">
                <div className="p-3 bg-fuchsia-100 rounded-2xl text-fuchsia-600">
                  <Glasses className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 uppercase tracking-wide">Využití Virtuální reality (VR)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* VR - Výcvik */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <ShieldAlert className="w-10 h-10 text-fuchsia-600 mb-6" />
                  <h4 className="text-2xl font-black text-gray-800 mb-3">Bezpěčný výcvik</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Piloti, hasiči nebo vojáci trénují nebezpečné situace (požár, havárie letadla) v naprostém bezpečí. Mozek reaguje na VR stresově podobně jako v realitě, takže si člověk vytvoří potřebné reflexy bez rizika zranění.
                  </p>
                </div>
                
                {/* VR - Architektura */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <Home className="w-10 h-10 text-purple-600 mb-6" />
                  <h4 className="text-2xl font-black text-gray-800 mb-3">Architektura a design</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Než se utratí stamiliony za stavbu mrakodrapu nebo nové nemocnice, konstruktéři se v ní projdou ve VR. Odhalí tak chyby (např. že se do dveří nevejde důležitý přístroj) dříve, než se vůbec začne stavět.
                  </p>
                </div>
              </div>
            </div>

            {/* SEKCE AR */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-8 pl-4">
                <div className="p-3 bg-sky-100 rounded-2xl text-sky-600">
                  <MonitorSmartphone className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 uppercase tracking-wide">Využití Rozšířené reality (AR)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AR - Zdravotnictví */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <HeartPulse className="w-10 h-10 text-sky-600 mb-6" />
                  <h4 className="text-2xl font-black text-gray-800 mb-3">Chirurgie 21. století</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Chirurg má nasazené průhledné AR brýle. Během operace se mu 3D rentgenový snímek promítá přesně "na kůži" pacienta, takže přesně vidí, co je uvnitř, aniž by musel odvracet zrak na monitor počítače.
                  </p>
                </div>
                
                {/* AR - Průmysl 4.0 */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <Wrench className="w-10 h-10 text-blue-600 mb-6" />
                  <h4 className="text-2xl font-black text-gray-800 mb-3">Údržba (Průmysl 4.0)</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Technik opravuje složitý robotický pás. Přes displej se mu na fyzické součástky promítají zelené šipky a texty, které mu krok za krokem ukazují, jaký šroubek má povolit.
                  </p>
                </div>
                
                {/* AR - Nakupování (Bonus) */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group md:col-span-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <ShoppingCart className="w-10 h-10 text-indigo-600 mb-6" />
                  <h4 className="text-2xl font-black text-gray-800 mb-3">Chytré nakupování z domova</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Chcete si koupit novou sedačku? Místo měření metrem namíříte kameru mobilu do rohu svého obýváku a 3D model sedačky v reálné velikosti se přes displej objeví přesně u vás doma. Hned tak vidíte, jestli se tam vejde a jestli ladí s kobercem.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500">
             <VRSimulation />
          </div>
        )}
      </div>
    </div>
  );
};

export default VRChapter;
