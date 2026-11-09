import React from 'react';
import { BarChart3, Globe, SmartphoneNfc, Laptop } from 'lucide-react';

export const MarketStatsView: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-500" /> Aktuální rozložení trhu
        </h2>
        <p className="text-slate-500 text-sm mt-2">Díky neustálému vývoji se trh proměnil. Zde jsou podíly zařízení připojených k internetu.</p>
        <div className="inline-block mt-3 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-200 shadow-sm">
          Data vycházejí z celosvětových průměrů pro rok 2024
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Mobilní trh */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <SmartphoneNfc className="w-5 h-5 text-pink-500" /> Mobilní trh (Smartphony)
          </h3>
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-green-600">Android (Google)</span>
                   <span>~ 71 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[71%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-600">iOS (Apple)</span>
                   <span>~ 28 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-slate-400 to-slate-600 w-[28%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-400">Ostatní</span>
                   <span>~ 1 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-400 w-[1%]"></div>
                </div>
             </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 text-center">Apple iOS vládne zejména v USA, zbytek světa dominuje Android.</p>
        </div>

        {/* Desktopový trh */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Laptop className="w-5 h-5 text-blue-500" /> Desktopový trh (Počítače)
          </h3>
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-blue-600">Windows (Microsoft)</span>
                   <span>~ 68 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[68%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-purple-600">Linux & Ostatní</span>
                   <span>~ 15 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-400 w-[15%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-600">macOS (Apple)</span>
                   <span>~ 14 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-slate-400 to-slate-600 w-[14%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-orange-500">Chrome OS</span>
                   <span>~ 3 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-400 w-[3%]"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Globální trh */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
         <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-4 justify-center">
            <Globe className="w-5 h-5" /> Celkový podíl OS (všechna zařízení)
         </h3>
         <p className="text-center text-sm text-indigo-700 mb-6">Mobily dnes jednoznačně vládnou internetu, a proto Android poráží na hlavu i legendární Windows.</p>
         
         {/* Composite Progress Bar */}
         <div className="h-8 md:h-12 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
            <div className="bg-green-500 flex items-center justify-center text-white text-[10px] md:text-sm font-bold hover:brightness-110 transition-all cursor-crosshair" style={{ width: '43%' }}>
               Android 43%
            </div>
            <div className="bg-blue-500 flex items-center justify-center text-white text-[10px] md:text-sm font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '27%' }}>
               Win 27%
            </div>
            <div className="bg-slate-700 flex items-center justify-center text-white text-[10px] md:text-sm font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '18%' }}>
               iOS 18%
            </div>
            <div className="bg-slate-400 flex items-center justify-center text-white text-[10px] font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '12%' }}>
               Zbytek 12%
            </div>
         </div>
      </div>

    </div>
  );
};
