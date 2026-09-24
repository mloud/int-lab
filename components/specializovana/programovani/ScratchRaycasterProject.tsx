import React, { useState } from 'react';
import { ArrowLeft, Flag, Map, Eye, MonitorPlay, Crosshair, Skull, CheckCircle2, Box, Layers, Target, Terminal, Info, Cloud } from 'lucide-react';

interface ScratchRaycasterProjectProps {
  onBack: () => void;
}

type TabId = 'intro' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5' | 'phase6' | 'milestones';

const ScratchRaycasterProject: React.FC<ScratchRaycasterProjectProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabId>('intro');
  const [showPhase1Tip, setShowPhase1Tip] = useState(false);
  const [showPhase2Tip, setShowPhase2Tip] = useState(false);
  const [showPhase4Tip, setShowPhase4Tip] = useState(false);
  const [showPhase5Tip, setShowPhase5Tip] = useState(false);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'intro', label: 'Úvod a cíl', icon: <Flag className="w-4 h-4" /> },
    { id: 'phase1', label: 'Fáze 1: 2D Svět', icon: <Map className="w-4 h-4" /> },
    { id: 'phase2', label: 'Fáze 2: První paprsek', icon: <Eye className="w-4 h-4" /> },
    { id: 'phase3', label: 'Fáze 3: Zorné pole', icon: <MonitorPlay className="w-4 h-4" /> },
    { id: 'phase4', label: 'Fáze 4: 3D Prostor', icon: <Crosshair className="w-4 h-4" /> },
    { id: 'phase5', label: 'Fáze 5: Stínování', icon: <Cloud className="w-4 h-4" /> },
    { id: 'phase6', label: 'Fáze 6', icon: <Terminal className="w-4 h-4" /> },
    { id: 'milestones', label: 'Milníky', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const INTRO_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička projektu */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Box className="w-10 h-10 text-teal-500" /> Tvorba 2.5D Raycasteru
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Wolfenstein Engine ve Scratchi</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
            <h3 className="font-bold text-teal-900 mb-2 uppercase tracking-widest text-sm">Hlavní didaktický cíl</h3>
            <p className="text-teal-800 leading-relaxed font-medium">
              Pochopení principu separace herní logiky od zobrazení (Model vs. View), aplikace analytické geometrie a goniometrie v praxi, algoritmizace a optimalizace výkonu.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2 uppercase tracking-widest text-sm">Optický trik (Co vlastně děláme?)</h3>
            <p className="text-indigo-800 leading-relaxed font-medium">
              Hra se odehrává <strong>pouze ve 2D půdorysu</strong>. Hráč funguje jako radar – střílí kolem sebe paprsky a měří dálku ke zdem. Poté přes celou obrazovku nakreslíme svislé čáry: <strong>čím blíž je zeď, tím delší čára</strong>. Náš mozek si z těchto různě vysokých sloupčíků vytvoří dokonalou iluzi 3D hloubky (tzv. 2.5D).
            </p>
          </div>
        </div>
      </div>

      {/* Vizuální srovnání 2D a 2.5D */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border-4 border-slate-800 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Box className="w-64 h-64 text-white" />
        </div>
        <h2 className="text-2xl font-black text-white mb-6 uppercase flex items-center gap-3 relative z-10">
          Od 2D mapy k 3D iluzi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          
          {/* 2D pohled */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col items-center">
            <h3 className="text-teal-400 font-bold mb-4 uppercase tracking-widest text-sm">Krok 1: 2D Svět (Model)</h3>
            <div className="w-full aspect-square bg-slate-900 rounded-xl border-2 border-slate-700 relative overflow-hidden p-2">
              {/* Obvodové stěny */}
              <div className="absolute inset-0 border-[12px] border-slate-600 rounded-lg"></div>
              
              {/* Vnitřní překážka (levá zeď) */}
              <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-slate-600 border-r-[4px] border-b-[4px] border-slate-500"></div>
              
              {/* Nepřítel (Sprite) */}
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center z-10 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] -translate-x-1/2 -translate-y-1/2">
                <Skull className="w-5 h-5 text-red-400" />
              </div>

              {/* Jednotlivé paprsky (vychází přesně ze středu a naráží do překážek) */}
              {/* Paprsek -30° (naráží do pravé hrany levé zdi) */}
              <div className="absolute top-[75%] left-[45%] w-[2px] h-[24%] bg-yellow-400/80 origin-bottom -rotate-[30deg] -translate-x-1/2 -translate-y-full z-10 shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                {/* Hit point */}
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Paprsek -15° (naráží do levé zdi dále vzadu) */}
              <div className="absolute top-[75%] left-[45%] w-[2px] h-[46%] bg-yellow-400/80 origin-bottom -rotate-[15deg] -translate-x-1/2 -translate-y-full z-10 shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Paprsek 0° (naráží do zadní obvodové stěny) */}
              <div className="absolute top-[75%] left-[45%] w-[2px] h-[75%] bg-yellow-400/80 origin-bottom rotate-0 -translate-x-1/2 -translate-y-full z-10 shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Paprsek 15° (naráží do zadní obvodové stěny) */}
              <div className="absolute top-[75%] left-[45%] w-[2px] h-[77%] bg-yellow-400/80 origin-bottom rotate-[15deg] -translate-x-1/2 -translate-y-full z-10 shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Paprsek 30° (naráží přímo do nepřítele) */}
              <div className="absolute top-[75%] left-[45%] w-[2px] h-[58%] bg-yellow-400/80 origin-bottom rotate-[30deg] -translate-x-1/2 -translate-y-full z-10 shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(248,113,113,1)]"></div>
              </div>

              {/* Hráč */}
              <div className="absolute top-[75%] left-[45%] w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,1)] z-20 -translate-x-1/2 -translate-y-1/2">
                {/* Směrovka hráče (dívá se nahoru) */}
                <div className="absolute -top-2 w-1.5 h-3 bg-teal-200 rounded-full"></div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4 text-center">Matematický výpočet paprsků na ploché mapě z pohledu shora.</p>
          </div>

          {/* 2.5D pohled */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col items-center">
            <h3 className="text-teal-400 font-bold mb-4 uppercase tracking-widest text-sm">Krok 2: 3D Zobrazení (View)</h3>
            <div className="w-full aspect-square bg-slate-900 rounded-xl border-2 border-slate-700 relative overflow-hidden flex flex-col">
              {/* Strop a podlaha */}
              <div className="w-full h-1/2 bg-slate-800"></div>
              <div className="w-full h-1/2 bg-slate-950"></div>
              
              {/* Stěny ze sloupců (Zleva doprava) */}
              <div className="absolute inset-0 flex items-center justify-center px-1">
                {/* Levá překážka - blízká = vysoká */}
                <div className="w-[10%] h-[75%] bg-slate-500 border-r border-slate-600/30"></div>
                <div className="w-[10%] h-[70%] bg-slate-500 border-r border-slate-600/30"></div>
                <div className="w-[10%] h-[60%] bg-slate-500 border-r border-slate-600/30"></div>
                <div className="w-[10%] h-[55%] bg-slate-500 border-r border-slate-600/30"></div>
                
                {/* Prostřední a pravá stěna (zadní obvodová zeď) - daleká = nízká */}
                <div className="w-[10%] h-[30%] bg-slate-600 border-r border-slate-700/30"></div>
                <div className="w-[10%] h-[29%] bg-slate-600 border-r border-slate-700/30"></div>
                <div className="w-[10%] h-[28%] bg-slate-600 border-r border-slate-700/30"></div>
                <div className="w-[10%] h-[28%] bg-slate-600 border-r border-slate-700/30"></div>
                <div className="w-[10%] h-[29%] bg-slate-600 border-r border-slate-700/30"></div>
                <div className="w-[10%] h-[30%] bg-slate-600"></div>
              </div>

              {/* Nepřítel (Billboard Sprite) */}
              <div className="absolute top-1/2 right-[25%] -translate-y-[45%] flex flex-col items-center z-10 drop-shadow-2xl hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-red-900/80 rounded-full flex items-center justify-center border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]">
                  <Skull className="w-7 h-7 text-red-200" />
                </div>
                {/* Stín pod nepřítelem */}
                <div className="w-8 h-2 bg-black/50 rounded-full mt-1 blur-sm"></div>
              </div>
              
              {/* HUD: Zaměřovač */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 z-20">
                <Crosshair className="w-6 h-6" />
              </div>

              {/* Zbraň (Sprite v popředí) */}
              <div className="absolute bottom-0 right-1/4 w-28 h-24 z-30">
                {/* Pažba */}
                <div className="absolute bottom-0 right-4 w-12 h-16 bg-slate-700 rounded-tl-2xl border-t-4 border-l-4 border-slate-500 shadow-lg"></div>
                {/* Hlaveň */}
                <div className="absolute bottom-12 right-2 w-16 h-8 bg-slate-600 rounded-l-lg border-t-2 border-l-2 border-slate-400">
                  {/* Otvor hlavně */}
                  <div className="absolute top-2 left-1 w-3 h-4 bg-black/80 rounded-sm"></div>
                </div>
                {/* Ruka/Rukavice (náznak) */}
                <div className="absolute bottom-0 right-[40px] w-12 h-10 bg-teal-800 rounded-tl-3xl shadow-inner"></div>
              </div>

            </div>
            <p className="text-slate-400 text-sm mt-4 text-center">Převedení vzdálenosti paprsků na výšku svislých čar na obrazovce.</p>
          </div>

        </div>
      </div>

      {/* Architektura projektu */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-500" /> Architektura projektu (Postavy)
        </h2>
        <p className="text-slate-600 font-medium mb-8">
          Abychom nepsali monolitický (vše v jednom) kód v jedné postavě, projekt striktně vyžaduje rozdělení rolí podle principu jedné odpovědnosti (Single Responsibility Principle).
        </p>

        <div className="relative border-4 border-slate-100 rounded-3xl p-6 bg-slate-50">
          
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg w-64 text-center border-b-4 border-indigo-800">
              <h3 className="font-black uppercase tracking-widest text-sm mb-1">Scéna</h3>
              <p className="text-xs opacity-80">Centrální herní smyčka</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 w-64 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-1 border-b-2 border-slate-100 pb-2">Level_1</h3>
              <p className="text-xs text-slate-500 mb-2">Model prostředí</p>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">Definuje fyzický prostor. Všechny stěny jsou nakresleny v jeho kostýmu. Trvale ukotven na souřadnicích [0,0].</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 w-64 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-1 border-b-2 border-slate-100 pb-2">Hrac</h3>
              <p className="text-xs text-slate-500 mb-2">Model stavu</p>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">Drží polohu [X, Y], úhel pohledu a stavové atributy (životy, munice). Kostým je drobný vycentrovaný kruh.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 w-64 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-1 border-b-2 border-slate-100 pb-2">Renderer</h3>
              <p className="text-xs text-slate-500 mb-2">View / Zobrazovací engine</p>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">Matematický výpočet paprsků z pohledu první osoby a vykreslování scény svislými čarami. Plní 1D Z-Buffer.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 w-64 flex flex-col relative">
              <h3 className="font-bold text-slate-800 mb-1 border-b-2 border-slate-100 pb-2">Nepritel / Pickupy</h3>
              <p className="text-xs text-slate-500 mb-2">3D Billboard entity</p>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">Reprezentace objektů v prostoru pomocí klonů. Škálování podle vzdálenosti a hloubkový test vůči Z-Bufferu.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 w-64 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-1 border-b-2 border-slate-100 pb-2">Zbran</h3>
              <p className="text-xs text-slate-500 mb-2">UI pohled</p>
              <p className="text-sm text-slate-700 leading-relaxed flex-1">Pohled na hlaveň v první osobě. Reaguje na střelbu, animuje zpětný ráz a pohupuje se v rytmu chůze.</p>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );

  const PHASE1_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Map className="w-10 h-10 text-teal-500" /> Fáze 1: 2D Model Světa
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Pohyb a kolize v Top-Down pohledu</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 1</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Základem každého 3D enginu tohoto typu je perfektně fungující 2D mapa (pohled shora). Dříve než začneme počítat složité 3D paprsky, musíme mít svět, po kterém se můžeme pohybovat a narážet do zdí.
            </p>
          </div>
          
          {/* Ilustrace Fáze 1 */}
          <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-center border-4 border-slate-800 relative overflow-hidden h-48">
            <div className="absolute inset-0 border-8 border-slate-700"></div>
            {/* Zeď */}
            <div className="absolute top-1/2 right-1/4 w-1/3 h-24 bg-slate-600 -translate-y-1/2 border-l-4 border-slate-500"></div>
            {/* Hráč */}
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,1)]">
              <div className="w-2 h-3 bg-teal-200 rounded-full translate-x-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Scéna a Level</h4>
              <p className="text-slate-600">Vytvoř postavu s názvem <strong>Level_1</strong>. Její kostým bude tvořit jednoduché bludiště z pohledu shora. Pro začátek stačí namalovat jeden velký černý obdélník jako překážku uprostřed plátna. Postavu trvale umísti do středu obrazovky na souřadnice X: 0, Y: 0.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Hráč</h4>
              <p className="text-slate-600">Vytvoř postavu s názvem <strong>Hrac</strong>. Namaluj jí kostým představující malou kuličku nebo tečku. <strong>Pozor:</strong> Je kriticky důležité, aby byl kostým vycentrovaný přesně na střed kreslícího plátna v editoru kostýmů!</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Tankové ovládání</h4>
              <p className="text-slate-600">Naprogramuj ovládání hráče pomocí šipek (nebo kláves WASD). Šipky doleva a doprava postavu <strong>otáčí</strong>. Šipky nahoru a dolů s ní hýbou <strong>vpřed a vzad</strong> ve směru, kam je zrovna natočená.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">4</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Detekce kolizí</h4>
              <p className="text-slate-600">Zajisti, aby hráč nemohl procházet zdmi (černými překážkami v postavě Level_1). Pokud hráč při pohybu narazí do zdi, nesmí přes ni projít.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase1Tip(!showPhase1Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Potřebuješ poradit s kolizemi?
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase1Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase1Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed">
              Nevíš jak vyřešit kolizi tak, aby se hráč při nárazu do zdi úplně "nezasekl"? Zkus přemýšlet takto: Co kdyby hráč nejprve udělal krok dopředu, a pokud zjistí, že se dotýká překážky, svůj krok okamžitě vrátí zpět (udělá krok dozadu)?
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const PHASE2_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Eye className="w-10 h-10 text-teal-500" /> Fáze 2: První paprsek
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Synchronizace a 2D Raycasting</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 2</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Nyní chceme od hráče "vystřelit" testovací paprsek, který zjistí vzdálenost k nejbližší zdi. Je ale kriticky důležité, aby k tomu došlo <strong>přesně v momentě</strong>, kdy se hráč pohne. Pokud by obě postavy běžely nezávisle, obraz by "blikal" a byl nesynchronizovaný.
            </p>
          </div>

          {/* Ilustrace Fáze 2 */}
          <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-center border-4 border-slate-800 relative overflow-hidden h-48">
            <div className="absolute inset-0 border-8 border-slate-700"></div>
            
            {/* Zeď */}
            <div className="absolute top-0 left-[70%] w-full h-full bg-slate-600 border-l-4 border-slate-500"></div>
            
            {/* Hráč */}
            <div className="absolute top-1/2 left-[40%] w-6 h-6 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,1)]">
               <div className="w-2 h-3 bg-teal-200 rounded-full translate-x-2"></div>
            </div>
            
            {/* Paprsek (laser) */}
            <div className="absolute top-1/2 left-[40%] w-[30%] h-[2px] bg-yellow-400 -translate-y-1/2 shadow-[0_0_8px_rgba(250,204,21,0.8)] z-10"></div>
            
            {/* Hit point */}
            <div className="absolute top-1/2 left-[70%] w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,1)] z-30"></div>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Předání štafety (Synchronizace)</h4>
              <p className="text-slate-600">V postavě <strong>Hráč</strong> uprav hlavní smyčku pohybu. Po tom, co hráč vyhodnotí klávesy a případně se pohne, musí <strong>vyslat zprávu</strong> (např. "vykresli") a na její dokončení <strong>počkat</strong>. Teprve pak může hráčův cyklus pokračovat dalším opakováním.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Senzor (Renderer)</h4>
              <p className="text-slate-600">Vytvoř novou postavu s názvem <strong>Renderer</strong> (náš paprsek). Bude to malá tečka jiné barvy. Tato postava nesmí začínat po kliknutí na vlaječku, ale spustí se až <strong>po obdržení zprávy "vykresli"</strong>.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Vystřelení paprsku</h4>
              <p className="text-slate-600">Když Renderer obdrží zprávu, okamžitě se přesune na pozici Hráče a natočí se stejným směrem jako on. Následně v cyklu neustále "krokuje" dopředu (např. po 2 krocích), dokud se nedotkne zdi (postavy Level_1).</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">4</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Vizuální laser (Pero)</h4>
              <p className="text-slate-600">Přidej si ve Scratchi z levého dolního rohu rozšíření <strong>Pero</strong>. Zařiď, aby Renderer na pozici hráče přiložil pero, a jakmile narazí do zdi, aby ho zase zvednul. Nezapomeň na začátku každého letu paprsku celou obrazovku <strong>smazat</strong>. Vznikne ti neustále se updatující "laserový zaměřovač"!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase2Tip(!showPhase2Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Potřebuješ poradit s rychlostí paprsku?
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase2Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase2Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed mb-4">
              Létá tvůj paprsek hrozně pomalu a ty vidíš na vlastní oči, jak se po kouscích plazí vpřed? Scratch totiž každý průchod cyklem na chviličku uspí, aby překreslil obrazovku (přidal nový framerate).
            </p>
            <p className="text-amber-800 font-medium leading-relaxed">
              <strong>Záchrana:</strong> V kategorii "Moje bloky" si vytvoř Vlastní blok (pojmenuj ho třeba "Vrhni paprsek"). Při jeho vytváření nezapomeň zaškrtnout to nejdůležitější políčko úplně dole: <strong>Spustit bez obnovy obrazovky</strong>! Všechen kód s opakováním krokování vlož do něj a bude to létat bleskurychle v jediném snímku.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const PHASE3_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <MonitorPlay className="w-10 h-10 text-teal-500" /> Fáze 3: Zorné pole
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Vějíř paprsků a ukládání dat</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 3</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Jeden paprsek nám k vidění světa nestačí. Nyní upravíme senzor tak, aby snímal celé zorné pole (Field of View). Vystřelí desítky paprsků do vějíře a délku každého z nich si bezpečně uloží do paměti (seznamu) připravené pro budoucí 3D vykreslení.
            </p>
          </div>

          {/* Ilustrace Fáze 3 */}
          <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-center border-4 border-slate-800 relative overflow-hidden h-48">
            <div className="absolute inset-0 border-8 border-slate-700"></div>
            
            {/* Zeď (stejná jako fáze 2, z-30 aby překryla paprsky) */}
            <div className="absolute top-0 left-[70%] w-full h-full bg-slate-600 border-l-4 border-slate-500 z-30"></div>
            
            {/* Hráč */}
            <div className="absolute top-1/2 left-[40%] w-6 h-6 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,1)]">
               <div className="w-2 h-3 bg-teal-200 rounded-full translate-x-2"></div>
            </div>
            
            {/* Vějíř paprsků (schovávají se pod zdí díky z-10 vs z-30) */}
            <div className="absolute top-1/2 left-[40%] w-[50%] h-[1.5px] bg-yellow-400 origin-left -rotate-[40deg] -translate-y-1/2 z-10 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
            <div className="absolute top-1/2 left-[40%] w-[40%] h-[1.5px] bg-yellow-400 origin-left -rotate-[20deg] -translate-y-1/2 z-10 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
            <div className="absolute top-1/2 left-[40%] w-[30%] h-[1.5px] bg-yellow-400 origin-left rotate-0 -translate-y-1/2 z-10 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
            <div className="absolute top-1/2 left-[40%] w-[40%] h-[1.5px] bg-yellow-400 origin-left rotate-[20deg] -translate-y-1/2 z-10 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
            <div className="absolute top-1/2 left-[40%] w-[50%] h-[1.5px] bg-yellow-400 origin-left rotate-[40deg] -translate-y-1/2 z-10 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
            
            {/* Z-Buffer UI simulace */}
            <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-600 rounded p-2 z-40 font-mono text-[10px] text-green-400 shadow-lg">
              <div className="text-white mb-1 border-b border-slate-700 pb-1">Vzdalenosti</div>
              <div>1: 45.2</div>
              <div>2: 38.1</div>
              <div>3: 30.0</div>
              <div>4: 38.1</div>
              <div>5: 45.2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Zorné pole (FOV)</h4>
              <p className="text-slate-600">Rozšiř kód Rendereru. Místo jednoho paprsku jich musí v cyklu vyslat spoustu těsně vedle sebe. Začni například na úhlu <strong>-30° od směru hráče</strong> a s každým dalším paprskem úhel o kousek zvyš, dokud se nedostaneš na <strong>+30°</strong>. Celkem bys měl vyslat třeba 60 nebo 100 paprsků. Ve 2D pohledu uvidíš "vějíř" nebo kužel světla.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Příprava Seznamu (Paměti)</h4>
              <p className="text-slate-600">Vytvoř ve Scratchi datový "Seznam" (List) a nazvi ho například <strong>ZBuffer</strong> nebo <strong>Vzdalenosti</strong>. Zcela zásadní věc: na úplném začátku každého snímku (když Renderer dostane zprávu) musíš tento seznam <strong>celý vymazat</strong>, ať se ti neplní starými daty!</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Ukládání dat</h4>
              <p className="text-slate-600">Vždy, když paprsek narazí do zdi a ty zjistíš jeho vzdálenost, přidej tuto naměřenou hodnotu jako novou položku do svého Seznamu. Pokud vystřelíš například 60 paprsků, musí mít seznam na konci cyklu přesně 60 položek.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PHASE4_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Crosshair className="w-10 h-10 text-teal-500" /> Fáze 4: 3D Prostor
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Vykreslení zdí a oprava obrazu</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 4</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Konečně využijeme data uložená v Seznamu. Přestaneme kreslit půdorys a vrhneme se na pohled z vlastních očí (3D). Každá hodnota vzdálenosti ze seznamu se stane jedním svislým sloupcem na obrazovce.
            </p>
          </div>
          
          {/* Ilustrace Fáze 4 (3D render) */}
          <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 relative overflow-hidden h-48 flex flex-col shadow-inner">
            {/* Strop a podlaha */}
            <div className="w-full h-1/2 bg-slate-800"></div>
            <div className="w-full h-1/2 bg-slate-950"></div>
            
            {/* 3D zdi ze sloupců (vycentrované na střed) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Levá překážka (zleva doprava) */}
              <div className="w-[5%] h-[85%] bg-slate-500 border-r border-slate-600/30"></div>
              <div className="w-[5%] h-[80%] bg-slate-500 border-r border-slate-600/30"></div>
              <div className="w-[5%] h-[75%] bg-slate-500 border-r border-slate-600/30"></div>
              <div className="w-[5%] h-[70%] bg-slate-500 border-r border-slate-600/30"></div>
              <div className="w-[5%] h-[65%] bg-slate-500 border-r border-slate-600/30"></div>
              <div className="w-[5%] h-[60%] bg-slate-500 border-r border-slate-600/30"></div>
              
              {/* Chodba dopředu (zadní zeď) */}
              <div className="w-[5%] h-[30%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[29%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[28%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[28%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[29%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[30%] bg-slate-600 border-r border-slate-700/30"></div>
              <div className="w-[5%] h-[32%] bg-slate-600 border-r border-slate-700/30"></div>

              {/* Pravá stěna */}
              <div className="w-[5%] h-[40%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[45%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[50%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[55%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[60%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[65%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[70%] bg-slate-500 border-l border-slate-600/30"></div>
              <div className="w-[5%] h-[75%] bg-slate-500"></div>
            </div>
            
            {/* HUD: Zaměřovač */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 z-20 mix-blend-screen">
              <Crosshair className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Skrytí 2D paprsků</h4>
              <p className="text-slate-600">Úplně odstraň příkazy pro kreslení (Přilož pero). Samotnou postavu Renderera pak pošli do neviditelna. <strong>Pozor:</strong> Nepoužívej blok "skrýt" (přestaly by fungovat kolize se zdí), místo toho použij blok <strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">nastav efekt [průhlednost v] na (100)</strong>.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Vykreslovací smyčka</h4>
              <p className="text-slate-600">Jakmile Renderer dokončí sběr dat a zaplní Seznam, použij cyklus pro průchod celým Seznamem. Každá položka v seznamu bude reprezentovat jeden svislý pruh pixelů na obrazovce.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Kreslení svislých čar (Sloupců)</h4>
              <p className="text-slate-600">Pro každou hodnotu nakresli na Scratch plátně svislou čáru. Její výška (délka) musí být závislá na vzdálenosti: čím větší vzdálenost, tím kratší čára. Vyzkoušej matematické dělení, např. <code>2000 / vzdálenost</code>. První sloupec nakresli úplně vlevo (X = -240) a s každým dalším se posouvej doprava.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase4Tip(!showPhase4Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Jsou rovné zdi podivně zakulacené?
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase4Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase4Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed mb-4">
              Když se v této fázi postavíš obličejem k rovné zdi, zjistíš, že působí jako bublina. Tomu se říká <strong>"Rybí oko" (Fish-eye efekt)</strong>. 
            </p>
            <p className="text-amber-800 font-medium leading-relaxed">
              <strong>Záchrana:</strong> Paprsky, které střílíš "do strany", musí logicky letět k rovné zdi mnohem déle než ten prostřední. Abychom vzdálenost matematicky vyrovnali, musíš dálku paprsku ze seznamu těsně před vykreslením <strong>vynásobit cosinusem (úhel paprsku - úhel hráče)</strong>.
              <br /><br />
              <span className="bg-amber-200 px-2 py-1 rounded text-amber-900 font-mono text-sm">Opravená vzdálenost = Vzdálenost ze seznamu * cos (úhel paprsku - úhel hráče)</span>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-6">
              {/* Fish eye bad */}
              <div className="flex-1 bg-amber-100/50 rounded-xl p-4 border border-amber-200 flex flex-col items-center">
                <h4 className="text-amber-900 font-bold text-xs uppercase mb-2">Bez opravy (Rybí oko)</h4>
                <div className="w-full aspect-video bg-slate-900 rounded border border-slate-700 flex flex-col justify-center px-4 relative overflow-hidden shadow-inner">
                   {/* Curved wall effect (simulated with large rounded div) */}
                   <div className="absolute top-1/2 left-1/2 w-[150%] h-32 bg-slate-600 rounded-[100%] -translate-x-1/2 -translate-y-1/2 shadow-xl"></div>
                   <div className="absolute top-1/2 left-1/2 w-[150%] h-32 bg-slate-500 rounded-[100%] -translate-x-1/2 -translate-y-1/2 translate-y-2 mix-blend-overlay"></div>
                </div>
              </div>
              {/* Fish eye fixed */}
              <div className="flex-1 bg-amber-100/50 rounded-xl p-4 border border-amber-200 flex flex-col items-center">
                <h4 className="text-amber-900 font-bold text-xs uppercase mb-2">S opravou (Cosinus)</h4>
                <div className="w-full aspect-video bg-slate-900 rounded border border-slate-700 flex flex-col justify-center px-4 shadow-inner relative">
                   <div className="absolute top-1/2 left-0 right-0 h-16 bg-slate-600 border-y border-slate-500 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const PHASE5_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Cloud className="w-10 h-10 text-teal-500" /> Fáze 5: Hloubka a Stínování
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Regulace jasu podle vzdálenosti (Mlha)</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 5</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Zatím jsou všechny zdi stejně jasné, takže prostor působí ploše a trochu zmateně. Abychom hře dodali 3D hloubku a ponurou atmosféru, přidáme efekt stínu nebo mlhy: čím dál od nás zeď je, tím musí být tmavší.
            </p>
          </div>
          
          {/* Ilustrace Fáze 5 (Fog render) */}
          <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 relative overflow-hidden h-48 flex flex-col shadow-inner">
            <div className="w-full h-1/2 bg-slate-900"></div>
            <div className="w-full h-1/2 bg-black"></div>
            
            {/* 3D zdi ze sloupců s gradientem jasu (zleva) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Blízká zeď = světlá */}
              <div className="w-[8%] h-[85%] bg-slate-400"></div>
              <div className="w-[8%] h-[80%] bg-slate-400"></div>
              <div className="w-[8%] h-[75%] bg-slate-400"></div>
              
              {/* Středně daleká = tmavší */}
              <div className="w-[8%] h-[50%] bg-slate-600"></div>
              <div className="w-[8%] h-[45%] bg-slate-600"></div>
              
              {/* Velmi daleká = téměř černá */}
              <div className="w-[8%] h-[30%] bg-slate-800"></div>
              <div className="w-[8%] h-[28%] bg-slate-800"></div>
              <div className="w-[8%] h-[28%] bg-slate-800"></div>
              <div className="w-[8%] h-[30%] bg-slate-800"></div>
              
              {/* Zpět blížící se */}
              <div className="w-[8%] h-[40%] bg-slate-700"></div>
              <div className="w-[8%] h-[45%] bg-slate-600"></div>
              <div className="w-[8%] h-[55%] bg-slate-500"></div>
              <div className="w-[8%] h-[60%] bg-slate-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Blok pro úpravu jasu</h4>
              <p className="text-slate-600">V Rozšíření Pero najdi příkaz <strong className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">nastav [jas v] pera na ( )</strong>. Tento blok vlož do svého vykreslovacího cyklu z Fáze 4, a to <strong>těsně před to, než přiložíš pero</strong>, abys nakreslil sloupec.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Matematika stínování</h4>
              <p className="text-slate-600">Jas nesmí být pevné číslo. Musí reagovat na hodnotu ze Seznamu vzdáleností! Čím větší číslo v seznamu (velká dálka), tím menší musí být jas (tma). Zkus do bloku s jasem vložit odečítání, například: <code>70 - (vzdálenost ze seznamu / 3)</code>. Můžeš experimentovat s čísly, dokud mlha nebude vypadat podle tvých představ!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase5Tip(!showPhase5Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Tip: Jak Scratch chápe "Jas"
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase5Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase5Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed">
              Ve Scratchi funguje "Jas pera" na stupnici od <strong>0 do 100</strong>. Hodnota 0 znamená absolutně černou barvu (tma/mlha), hodnota 100 znamená maximálně svítivou (často až bílou) barvu. Ideální je nastavit základní barvu pera na nějaký odstín šedé nebo cihlové a nechat matematiku jasu, aby se postarala o zbytek.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Zpět button */}
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na projekty
        </button>

        {/* Stepper / Horní lišta */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex overflow-x-auto custom-scrollbar sticky top-4 z-50">
          <div className="flex gap-2 min-w-max p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-wide
                  ${activeTab === tab.id 
                    ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-200' 
                    : 'text-slate-500 hover:bg-slate-50 border border-transparent'
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-20">
          {activeTab === 'intro' && INTRO_CONTENT}
          {activeTab === 'phase1' && PHASE1_CONTENT}
          {activeTab === 'phase2' && PHASE2_CONTENT}
          {activeTab === 'phase3' && PHASE3_CONTENT}
          {activeTab === 'phase4' && PHASE4_CONTENT}
          {activeTab === 'phase5' && PHASE5_CONTENT}
          {activeTab !== 'intro' && activeTab !== 'phase1' && activeTab !== 'phase2' && activeTab !== 'phase3' && activeTab !== 'phase4' && activeTab !== 'phase5' && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center animate-in fade-in duration-500">
              <Box className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">Obsah se připravuje</h2>
              <p className="text-slate-500 font-medium">Texty a úkoly pro tuto fázi ({tabs.find(t => t.id === activeTab)?.label}) budou brzy doplněny.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ScratchRaycasterProject;
