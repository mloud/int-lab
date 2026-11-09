"use client";

import React, { useState } from 'react';
import { ArrowLeft, Clock, BarChart3, CheckSquare } from 'lucide-react';
import { ERAS, EraId } from './vyvoj/OsEvolutionData';
import { MarketStatsView } from './vyvoj/MarketStatsView';
import { WorksheetTab } from './vyvoj/OsEvolutionWorksheetTab';

interface OsEvolutionChapterProps {
  onBack: () => void;
}

const OsEvolutionChapter: React.FC<OsEvolutionChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats' | 'worksheet'>('timeline');
  const [activeEra, setActiveEra] = useState<EraId>('pre-os');

  const currentEraData = ERAS.find(e => e.id === activeEra)!;

  return (
    <div className="max-w-6xl w-full mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8 px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na menu OS
        </button>
      </div>

      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Evoluce Operačních Systémů</h1>
        <p className="text-lg text-slate-500 max-w-3xl mx-auto font-medium">
          Od obrovských sálových počítačů a děrných štítků až po moderní chytré telefony v našich kapsách.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10 px-4">
        <div className="bg-slate-100 p-1.5 rounded-full flex gap-2 shadow-sm border border-slate-200">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
              ${activeTab === 'timeline' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:bg-slate-200 scale-95'}`}
          >
            <Clock className="w-4 h-4" /> Časová osa
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
              ${activeTab === 'stats' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:bg-slate-200 scale-95'}`}
          >
            <BarChart3 className="w-4 h-4" /> Statistiky trhu
          </button>
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
              ${activeTab === 'worksheet' ? 'bg-emerald-50 text-emerald-700 shadow-md scale-100' : 'text-slate-500 hover:bg-slate-200 scale-95'}`}
          >
            <CheckSquare className="w-4 h-4" /> Pracovní list
          </button>
        </div>
      </div>

      {activeTab === 'worksheet' ? (
        <WorksheetTab />
      ) : activeTab === 'stats' ? (
        <div className="px-4">
           <MarketStatsView />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 px-4">
          
          {/* Timeline (Left) */}
          <div className="lg:w-1/3 bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-100 h-[600px] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 sticky top-0 bg-white z-10 py-2 border-b border-slate-100">
              <Clock className="w-6 h-6 text-indigo-500" /> Historie krok za krokem
            </h2>
            
            <div className="relative border-l-4 border-indigo-100 ml-4 space-y-2 pb-4">
              {ERAS.map((era) => {
                const isActive = activeEra === era.id;
                return (
                  <div key={era.id} className="relative">
                    <button
                      onClick={() => setActiveEra(era.id)}
                      className={`w-full text-left pl-8 py-3 pr-4 rounded-xl transition-all duration-300 relative group
                        ${isActive ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      <div className={`absolute top-1/2 -translate-y-1/2 -left-[10px] w-4 h-4 rounded-full border-4 transition-all duration-300
                        ${isActive ? 'bg-indigo-600 border-indigo-200 w-5 h-5 -left-[12px]' : 'bg-white border-indigo-200 group-hover:border-indigo-400'}`} 
                      />
                      
                      <div className={`text-[10px] font-bold mb-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {era.year}
                      </div>
                      <div className={`font-black uppercase tracking-wider text-xs ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {era.title}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Panel (Right) */}
          <div className="lg:w-2/3 bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex flex-col ring-1 ring-slate-100 min-h-[600px]">
            
            <div className="bg-slate-50 p-6 md:p-8 border-b-2 border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
                {currentEraData.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-indigo-500 mb-1">{currentEraData.year}</div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter uppercase">{currentEraData.title}</h2>
                <h3 className="text-md md:text-lg text-slate-500 font-medium">{currentEraData.subtitle}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1 grid md:grid-cols-2 gap-8 items-center bg-white">
               <div className="order-2 md:order-1 text-sm leading-relaxed h-full overflow-y-auto pr-2 custom-scrollbar">
                 {currentEraData.content}
               </div>
               <div className="order-1 md:order-2 h-64 md:h-full min-h-[250px]">
                 {currentEraData.visual}
               </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default OsEvolutionChapter;

