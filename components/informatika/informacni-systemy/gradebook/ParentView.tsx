import React, { useState } from 'react';
import { Parent, Student } from './GradebookTypes';
import { GradeTable } from './GradeTable';

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
      {/* Přepínač dětí */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-2xl border-2 border-slate-300 shadow-sm">
        <span className="text-sm font-black text-slate-600 uppercase tracking-wider px-2">
          Vyberte dítě:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-5 py-2.5 rounded-xl font-black text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer ${
                child.id === selectedChild?.id
                  ? 'bg-[#0B3A60] text-white shadow-md ring-2 ring-blue-300'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <span>👤</span>
              <span>{child.firstName} {child.lastName}</span>
              <span className={`text-xs px-2 py-0.5 rounded-md ${
                child.id === selectedChild?.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {child.classGroup}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedChild && <GradeTable grades={selectedChild.grades} />}
    </div>
  );
};
