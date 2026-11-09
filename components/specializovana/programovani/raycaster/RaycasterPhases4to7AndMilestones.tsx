"use client";

import React, { useState } from 'react';
import { Flag, Map, Eye, MonitorPlay, Crosshair, Skull, CheckCircle2, Box, Layers, Target, Terminal, Info, Cloud, Brain } from 'lucide-react';
import { RaycasterTabId } from './RaycasterIntroAndPhases1to3';

export const RaycasterPhases4to7AndMilestones = ({ activeTab }: { activeTab: RaycasterTabId }) => {
  const [showPhase4Tip, setShowPhase4Tip] = useState(false);
  const [showPhase5Tip, setShowPhase5Tip] = useState(false);
  const [showPhase6Tip, setShowPhase6Tip] = useState(false);
  const [showPhase7Tip, setShowPhase7Tip] = useState(false);

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

  const PHASE6_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Skull className="w-10 h-10 text-teal-500" /> Fáze 6: Nepřátelé
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Oddělení Logiky a Zobrazení</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 6</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Problém: Kdybychom použili jednu postavu nepřítele pro pohyb na mapě i pro 3D zobrazení, postava by se nemohla spolehnout na Scratch kolize (`dotýká se zdi?`), protože by neustále "poskakovala" na střed monitoru a měnila svou velikost podle vzdálenosti. Řešení: Založíme dvě postavy. Jedna je čistě mozek (Model), druhá je vzhled (View).
            </p>
          </div>
          
          {/* Ilustrace Fáze 6 */}
          <div className="col-span-1 md:col-span-2 grid md:grid-cols-2 gap-8 bg-slate-900 rounded-2xl p-8 border-4 border-slate-800 relative">
            
            {/* 2D pohled (Nepritel_Logika) */}
            <div className="flex flex-col items-center">
              <h4 className="text-teal-400 font-bold text-xs uppercase mb-4 tracking-widest text-center">1. Nepritel_Logika (2D Mapa)</h4>
              <div className="w-full aspect-square bg-slate-900 rounded-xl border-2 border-slate-700 relative overflow-hidden p-2 max-w-[200px]">
                {/* Obvodové stěny */}
                <div className="absolute inset-0 border-[12px] border-slate-600 rounded-lg"></div>
                
                {/* Nepřítel (Červená kulička / Sprite) */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center z-10 border border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.8)] -translate-x-1/2 -translate-y-1/2">
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-4 text-center">Tečka řešící kolize se zdmi na mapě.<br/>Poskytuje <code>MapX</code> a <code>MapY</code>.</p>
            </div>

            {/* 3D pohled (Nepritel_View) */}
            <div className="flex flex-col items-center">
              <h4 className="text-teal-400 font-bold text-xs uppercase mb-4 tracking-widest text-center">2. Nepritel_View (3D Obrazovka)</h4>
              <div className="w-full aspect-square bg-slate-900 rounded-xl border-2 border-slate-700 relative overflow-hidden flex flex-col max-w-[200px]">
                {/* Strop a podlaha */}
                <div className="w-full h-1/2 bg-slate-800"></div>
                <div className="w-full h-1/2 bg-slate-950"></div>
                
                {/* 3D Zdi z raycasteru */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[12%] h-[80%] bg-slate-500 border-r border-slate-600/30 shadow-[5px_0_15px_rgba(0,0,0,0.3)] z-20"></div>
                  <div className="w-[12%] h-[70%] bg-slate-500 border-r border-slate-600/30 z-20"></div>
                  <div className="w-[12%] h-[35%] bg-slate-600 border-r border-slate-700/30"></div>
                  <div className="w-[12%] h-[34%] bg-slate-600 border-r border-slate-700/30"></div>
                  <div className="w-[16%] h-[34%] bg-slate-600 border-r border-slate-700/30"></div>
                  <div className="w-[12%] h-[45%] bg-slate-500 border-l border-slate-600/30 z-10"></div>
                  <div className="w-[12%] h-[55%] bg-slate-500 border-l border-slate-600/30 z-10"></div>
                  <div className="w-[12%] h-[65%] bg-slate-500 z-10"></div>
                </div>
                
                {/* Nepřítel (Kartonový 2D Billboard Sprite stojící na podlaze) */}
                <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-[20%] flex flex-col items-center z-10 hover:scale-105 transition-transform">
                  <div className="w-12 h-14 bg-red-600 border-2 border-red-800 rounded-t-xl relative shadow-lg flex flex-col items-center z-10">
                    <div className="flex gap-2 mt-2">
                      <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full flex justify-center pt-0.5">
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                      </div>
                      <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full flex justify-center pt-0.5">
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                    <div className="absolute top-5 -left-2 w-3 h-5 bg-red-700 rounded-l-lg border-y-2 border-l-2 border-red-800"></div>
                    <div className="absolute top-5 -right-2 w-3 h-5 bg-red-700 rounded-r-lg border-y-2 border-r-2 border-red-800"></div>
                  </div>
                  <div className="flex gap-3 -mt-1 z-0">
                    <div className="w-3 h-3 bg-red-900 rounded-b-sm border-x-2 border-b-2 border-red-950"></div>
                    <div className="w-3 h-3 bg-red-900 rounded-b-sm border-x-2 border-b-2 border-red-950"></div>
                  </div>
                  <div className="w-12 h-2 bg-black/60 rounded-full mt-1 blur-sm"></div>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-4 text-center">Billboard zmenšující se podle vzdálenosti.<br/>Z-Buffer hlídá, zda není za zdí.</p>
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
              <h4 className="font-bold text-lg text-slate-800 mb-1">Mozek na mapě (Logika)</h4>
              <p className="text-slate-600">Vytvoř postavu <strong>Nepritel_Logika</strong>. Její kostým bude malá tečka (podobně jako Hráč). Naprogramuj jí jednoduchý pohyb po mapě, odrážení od zdí (kontrola přes `dotýká se barvy`). Nezapomeň tuto postavu <strong>skrýt</strong> (nebo nastavit průhlednost na 100), aby ji Hráč na mapě reálně neviděl hrát. Své souřadnice X a Y musí neustále ukládat do nových proměnných <code>Nepritel_MapX</code> a <code>Nepritel_MapY</code>.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Vzhled (View)</h4>
              <p className="text-slate-600">Vytvoř postavu <strong>Nepritel_View</strong> a nakresli jí/stáhni kostým nepřítele (např. monstrum zepředu). Tato postava se vůbec neřídí svým vlastním pohybem! V nekonečném cyklu si nejprve spočítá vzdálenost od Hráče (pomocí Pythagorovy věty s proměnnými <code>MapX/Y</code>) a podle toho nastaví svou <strong>velikost</strong>.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Umístění na monitoru</h4>
              <p className="text-slate-600">Kde se má nepřítel ukázat na obrazovce? Musíš spočítat úhel mezi Hráčem a Logikou nepřítele. Následně tento úhel odečti od úhlu, kam se Hráč aktuálně dívá. Výsledek tohoto rozdílu úhlů určuje X souřadnici nepřítele na Scratch plátně (bude to vyžadovat trochu násobení, aby se úhly převedly na pixely obrazovky).</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">4</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Schovávání za zdi (Z-Buffer)</h4>
              <p className="text-slate-600">Těsně před tím, než se postava na obrazovce ukáže, zkontroluj náš 1D Z-Buffer (Seznam <code>Vzdalenosti</code>). Zjisti, na jakém X se postava nachází, najdi odpovídající hodnotu v Seznamu a zkontroluj: <em>Je Nepřítel dál, než je na tomto místě zeď?</em> Pokud ano, <strong>skryj ho</strong>. Pokud ne, <strong>ukaž ho</strong>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase6Tip(!showPhase6Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Tip: Matematika úhlu
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase6Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase6Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed">
              Spočítat správný rozdíl úhlů tak, aby nepřítel nepřeskakoval, když hráč rotuje přes 360 stupňů zpět na 0, může být docela oříšek. Ve Scratchi je často nejjednodušší použít skrytou pomocnou postavu: <em>Natoč ji směrem k Logice nepřítele, přečti její směr, a tento směr odečti od směru hráče.</em> Nezapomeň pak hodnotu "znormalizovat" (aby vždy vyšla v rozmezí -180 až +180).
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const PHASE7_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hlavička fáze */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
          <Brain className="w-10 h-10 text-teal-500" /> Fáze 7: Umělá inteligence
        </h2>
        <p className="text-xl text-teal-600 font-bold mb-6">Pohyb, viditelnost a vyhýbání se překážkám</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
            <h3 className="font-bold text-blue-900 mb-2 uppercase tracking-widest text-sm">Cíl Fáze 7</h3>
            <p className="text-blue-800 leading-relaxed font-medium">
              Vdechneme nepříteli život! Z obyčejného statického terče se stane aktivní lovec. Aby ale hra byla zajímavá, nepřítel začne hráče pronásledovat až ve chvíli, kdy ho reálně "uvidí". A co víc – naučíme ho chytře obcházet překážky pomocí senzorů, aby se nezasekl v prvním rohu.
            </p>
          </div>
          
          {/* Ilustrace Fáze 7 */}
          <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-slate-800 relative h-48 overflow-hidden">
             {/* 2D mapa naznačující senzory */}
             <div className="absolute inset-0 opacity-20">
               {/* Naznačení gridu */}
               <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             </div>
             
             {/* Nepřítel */}
             <div className="w-8 h-8 bg-red-500 rounded-full z-10 flex items-center justify-center relative shadow-[0_0_15px_rgba(239,68,68,0.8)] translate-x-4">
                {/* 3 paprsky do stran */}
                <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-yellow-400/80 -translate-y-1/2 origin-left -rotate-45 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-red-400/80 -translate-y-1/2 origin-left"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-yellow-400/80 -translate-y-1/2 origin-left rotate-45 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
             </div>
             
             {/* Překážka vpředu */}
             <div className="absolute right-[20%] w-8 h-24 bg-slate-600 border-2 border-slate-500 z-10"></div>
             
             {/* Hráč v dálce */}
             <div className="absolute right-[5%] bottom-[20%] w-6 h-6 bg-teal-500 rounded-full z-10 shadow-[0_0_10px_rgba(20,184,166,0.8)]"></div>
             
             <p className="text-slate-400 font-bold text-xs uppercase absolute bottom-2 left-2 z-20 bg-slate-900/80 px-2 py-1 rounded">Skenování překážek</p>
          </div>
        </div>
      </div>

      {/* Zadání úkolů */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <Target className="w-8 h-8 text-rose-500" /> Tvé úkoly (Na 2D Mapě)
        </h3>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Stavy nepřítele (Paměť)</h4>
              <p className="text-slate-600">Umělá inteligence potřebuje paměť. Vytvoř pro nepřítele novou proměnnou (např. <code>AI_Stav</code>). Na začátku bude ve stavu <strong>"ČEKÁ"</strong>. Později ho budeme přepínat do stavů <strong>"PRONÁSLEDUJE"</strong> a <strong>"OBCHÁZÍ"</strong>. Zabráníš tak tomu, aby se každou vteřinu rozhodoval jinak a jen se třepetal na místě.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Zrak (Line of Sight)</h4>
              <p className="text-slate-600">Pokud nepřítel <strong>ČEKÁ</strong>, měl by se každou chvíli rozhlédnout. Zkus vymyslet mechanismus "neviditelného paprsku" – dočasně namiř na hráče a postupuj krok za krokem. Pokud narazíš na zeď dřív než na hráče, znamená to, že se hráč schovává. Pokud je cesta volná, přepni stav na <strong>"PRONÁSLEDUJE"</strong>! <em>(Nezapomeň, že tento sken by měl proběhnout bleskově bez obnovy obrazovky.)</em></p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Přímý útok a detekce zdi</h4>
              <p className="text-slate-600">Pokud nepřítel <strong>PRONÁSLEDUJE</strong>, natáčí se k hráči a jde kupředu. Před každým krokem si ale musí zkontrolovat, jestli nenarazí do zdi. Pokud je před ním volno, jde dál. Pokud je před ním překážka, musí přejít do stavu <strong>"OBCHÁZÍ"</strong>.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-500 font-black rounded-xl flex items-center justify-center shrink-0">4</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">Chytré obcházení (Oskenování okolí)</h4>
              <p className="text-slate-600">Když nepřítel narazí na zeď, potřebuje zjistit, kudy ji oběhnout. Využij princip <strong>skenování okolí</strong>! Zkus z místa nárazu zjistit (pomocí testovacích skoků, neviditelných paprsků nebo senzorů) situaci trochu doleva (např. pod úhlem 45°) a trochu doprava. Který směr je volný? Vyber ten lepší směr a vynuť, aby nepřítel chvíli pokračoval v tomto směru, i když ztratí přímý směr na hráče. Až zeď oběhne, může se vrátit k pronásledování.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip pro studenty */}
      <div className="bg-amber-50 rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <button 
          onClick={() => setShowPhase7Tip(!showPhase7Tip)}
          className="w-full flex items-center justify-between p-6 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-amber-800 uppercase tracking-wider">
              Tip: Nechcete skenovat paprsky? Zkuste "Tykadla"
            </h3>
          </div>
          <div className="text-amber-700 font-bold text-sm bg-amber-200/50 px-4 py-2 rounded-lg">
            {showPhase7Tip ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
          </div>
        </button>
        
        {showPhase7Tip && (
          <div className="p-6 pt-0 border-t border-amber-200/50 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-amber-800 font-medium leading-relaxed mb-4">
              Místo toho, abys programoval složité vysílání matematických paprsků do stran z jednoho bodu, můžeš využít samotný kostým pro <code>Nepritel_Logika</code> na 2D mapě! 
            </p>
            <p className="text-amber-800 font-medium leading-relaxed">
              Nakresli k "mozkové tečce" na mapě dvě malé různobarevné tečky (tykadla) mířící vlevo a vpravo dopředu. Pokud se např. <em>zelené tykadlo</em> dotýká zdi, nepřítel ví, že má zatáčet doprava, protože zleva je překážka. Pokud <em>modré tykadlo</em> narazí, zabočí doleva. Je to super jednoduchý trik, který používají autíčka sledující čáru!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const MILESTONES_CONTENT = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
          <CheckCircle2 className="w-10 h-10 text-teal-500" /> Milníky projektu
        </h2>
        <p className="text-lg text-slate-600 font-medium mb-8">
          Zkontroluj si, zda tvůj raycaster splňuje všechny základní požadavky. Pokud dokážeš odškrtnout všechny tyto body, úspěšně jsi naprogramoval svůj první 3D engine!
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Základní 2D pohyb</h4>
              <p className="text-slate-600 text-sm mt-1">Hráč se dokáže pohybovat po mapě stylem "tank" (otáčení + pohyb vpřed/vzad) a v žádném případě neprojde skrz nakreslenou zeď.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Synchronizace a Senzor</h4>
              <p className="text-slate-600 text-sm mt-1">Senzor paprsků nelétá náhodně, ale je pevně synchronizovaný. Spouští se výhradně na příkaz Hráče přes zprávu (broadcast).</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Plný 1D Z-Buffer</h4>
              <p className="text-slate-600 text-sm mt-1">Seznam vzdáleností se na začátku každého snímku promaže a na jeho konci obsahuje desítky položek se vzdálenostmi pro zorné pole (např. 60 položek).</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Bez Fish-eye defektu</h4>
              <p className="text-slate-600 text-sm mt-1">Když se postavím čelem k rovné zdi, je na obrazovce zeď skutečně rovná, nikoliv vypouklá jako bublina. Vzdálenosti jsou korigovány pomocí cosinusu.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Hloubkové stínování</h4>
              <p className="text-slate-600 text-sm mt-1">Zdi blízko jsou světlé, zdi v dálce mizí do tmy. Matematika jasu správně reaguje na uložené vzdálenosti.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex shrink-0"></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Oddělené postavy</h4>
              <p className="text-slate-600 text-sm mt-1">Hra dodržuje architekturu "Model vs. View". Nepřítel je rozdělený na mozek schovaný na mapě a vzhled na obrazovce.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2">
               <Flag className="w-16 h-16 text-amber-500/10" />
             </div>
             <div className="w-8 h-8 rounded-full border-2 border-amber-500 bg-white flex shrink-0 z-10 relative"></div>
             <div className="z-10 relative">
              <h4 className="font-bold text-amber-900 text-lg uppercase tracking-tight">Finální zkouška</h4>
              <p className="text-amber-800 text-sm mt-1">Nepřítel se na monitoru nejen správně zmenšuje a zvětšuje, ale pokud zaleze na mapě za roh, korektně zmizí, protože se porovná s údaji v Z-Bufferu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {activeTab === 'phase4' && PHASE4_CONTENT}
      {activeTab === 'phase5' && PHASE5_CONTENT}
      {activeTab === 'phase6' && PHASE6_CONTENT}
      {activeTab === 'phase7' && PHASE7_CONTENT}
      {activeTab === 'milestones' && MILESTONES_CONTENT}
    </>
  );
};
