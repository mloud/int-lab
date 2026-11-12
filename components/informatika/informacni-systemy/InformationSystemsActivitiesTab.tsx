'use client';
import React from 'react';
import { Utensils, Network, Table, Lightbulb, Users } from 'lucide-react';
import { LunchSysChapterTab } from './lunchsys/LunchSysChapterTab';
import { LibraryDiagramBuilder } from './LibraryDiagramBuilder';
import { LibraryLoansTableTab } from './LibraryLoansTableTab';
import { SmartLightingProjectTab } from './SmartLightingProjectTab';
import { GradebookSimulator } from './gradebook/GradebookSimulator';

export type ActivityId = 'lunchsys' | 'knihovna' | 'vypujcky' | 'osvetleni' | 'simulator';

interface ActivityItem {
  id: ActivityId;
  order: number;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACTIVITIES: ActivityItem[] = [
  { id: 'lunchsys', order: 1, label: 'Karta strávníka', shortLabel: 'Karta', icon: Utensils },
  { id: 'knihovna', order: 2, label: 'Diagram knihovny', shortLabel: 'Diagram', icon: Network },
  { id: 'vypujcky', order: 3, label: 'Tabulka výpůjček', shortLabel: 'Výpůjčky', icon: Table },
  { id: 'osvetleni', order: 4, label: 'Výzva: Chytré osvětlení', shortLabel: 'Osvětlení', icon: Lightbulb },
  { id: 'simulator', order: 5, label: 'Žákovská knížka', shortLabel: 'Žákovská', icon: Users },
];

interface InformationSystemsActivitiesTabProps {
  activeActivity: ActivityId;
  onSelectActivity: (id: ActivityId) => void;
}

export const InformationSystemsActivitiesTab: React.FC<InformationSystemsActivitiesTabProps> = ({
  activeActivity,
  onSelectActivity,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Horní přepínač podaktivit */}
      <div className="bg-slate-100/90 backdrop-blur-xs p-1.5 rounded-2xl border border-slate-200 shadow-inner flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {ACTIVITIES.map((act) => {
          const Icon = act.icon;
          const isActive = activeActivity === act.id;

          return (
            <button
              key={act.id}
              onClick={() => onSelectActivity(act.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-900 shadow-sm border border-indigo-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {act.order}
              </span>
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">{act.label}</span>
              <span className="inline sm:hidden">{act.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Obsah zvolené aktivity */}
      <div className="w-full">
        {activeActivity === 'lunchsys' && <LunchSysChapterTab />}
        {activeActivity === 'knihovna' && <LibraryDiagramBuilder />}
        {activeActivity === 'vypujcky' && <LibraryLoansTableTab />}
        {activeActivity === 'osvetleni' && <SmartLightingProjectTab />}
        {activeActivity === 'simulator' && <GradebookSimulator />}
      </div>
    </div>
  );
};

export default InformationSystemsActivitiesTab;

