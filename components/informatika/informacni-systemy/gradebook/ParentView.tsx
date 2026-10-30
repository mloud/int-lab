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
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
          Dítě:
        </span>
        {children.map(child => (
          <button
            key={child.id}
            onClick={() => setSelectedChildId(child.id)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
              child.id === selectedChild?.id
                ? 'bg-[#0B3A60] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {child.firstName} {child.lastName}
          </button>
        ))}
      </div>

      {selectedChild && <GradeTable grades={selectedChild.grades} />}
    </div>
  );
};
