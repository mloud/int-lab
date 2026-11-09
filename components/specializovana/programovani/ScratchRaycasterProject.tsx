"use client";

import React, { useState } from 'react';
import { ArrowLeft, Flag, Map, Eye, MonitorPlay, Crosshair, Skull, CheckCircle2, Cloud, Brain } from 'lucide-react';
import { RaycasterTabId, RaycasterIntroAndPhases1to3 } from './raycaster/RaycasterIntroAndPhases1to3';
import { RaycasterPhases4to7AndMilestones } from './raycaster/RaycasterPhases4to7AndMilestones';

interface ScratchRaycasterProjectProps {
  onBack: () => void;
}

const ScratchRaycasterProject: React.FC<ScratchRaycasterProjectProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<RaycasterTabId>('intro');

  const tabs: { id: RaycasterTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'intro', label: 'Úvod a cíl', icon: <Flag className="w-4 h-4" /> },
    { id: 'phase1', label: 'Fáze 1: 2D Svět', icon: <Map className="w-4 h-4" /> },
    { id: 'phase2', label: 'Fáze 2: První paprsek', icon: <Eye className="w-4 h-4" /> },
    { id: 'phase3', label: 'Fáze 3: Zorné pole', icon: <MonitorPlay className="w-4 h-4" /> },
    { id: 'phase4', label: 'Fáze 4: 3D Prostor', icon: <Crosshair className="w-4 h-4" /> },
    { id: 'phase5', label: 'Fáze 5: Stínování', icon: <Cloud className="w-4 h-4" /> },
    { id: 'phase6', label: 'Fáze 6: Nepřátelé', icon: <Skull className="w-4 h-4" /> },
    { id: 'phase7', label: 'Fáze 7: AI', icon: <Brain className="w-4 h-4" /> },
    { id: 'milestones', label: 'Milníky', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

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
          <RaycasterIntroAndPhases1to3 activeTab={activeTab} />
          <RaycasterPhases4to7AndMilestones activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ScratchRaycasterProject;
