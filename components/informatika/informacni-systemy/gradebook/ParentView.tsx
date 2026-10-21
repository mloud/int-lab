import React, { useState } from 'react';
import { Parent, Student } from './GradebookTypes';
import { GradeTable } from './GradeTable';
import { Users, ShieldCheck } from 'lucide-react';

interface ParentViewProps {
  parent: Parent;
  allStudents: Student[];
}

export const ParentView: React.FC<ParentViewProps> = ({ parent, allStudents }) => {
  const children = allStudents.filter(s => parent.childIds.includes(s.id));
  const [selectedChildId, setSelectedChildId] = useState<string>(children[0]?.id || '');

  const selectedChild = children.find(c => c.id === selectedChildId) || children[0];

  return (
    <div className="space-y-4">
      {/* Bakaláři rodičovská lišta s přepínačem dětí */}
      <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0B3A60]">
            Zákonný zástupce: {parent.firstName} {parent.lastName}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Dětí v evidenci: {children.length}</span>
        </div>

        {/* Přepínač dětí */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">Vybrat dítě:</span>
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                child.id === selectedChild?.id
                  ? 'bg-[#0B3A60] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {child.firstName} {child.lastName} ({child.classGroup || '7.A'})
            </button>
          ))}
        </div>
      </div>

      {selectedChild && (
        <GradeTable
          grades={selectedChild.grades}
          title={`Klasifikace dítěte: ${selectedChild.firstName} ${selectedChild.lastName}`}
          studentName={`${selectedChild.firstName} ${selectedChild.lastName}`}
        />
      )}
    </div>
  );
};
