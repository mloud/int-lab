import React, { useState } from 'react';
import { Grade, Student } from './GradebookTypes';
import { EditableGradeTable } from './EditableGradeTable';
import { calculateWeightedAverage } from './GradeTable';
import { Users, UserCheck } from 'lucide-react';

interface TeacherViewProps {
  students: Student[];
  onUpdateGrades: (studentId: string, newGrades: Grade[]) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ students, onUpdateGrades }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  return (
    <div className="space-y-4">
      {/* Bakaláři učitelská lišta: výběr žáka z třídy 7.A */}
      <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#0B3A60]" />
          <span className="font-bold text-[#0B3A60]">Vyučující: Mgr. Karel Vomáčka</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Třída 7.A ({students.length} žáků)</span>
        </div>

        {/* Přepínač žáků ve třídě */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">Vybrat žáka:</span>
          {students.map(student => {
            const isSelected = student.id === activeStudent?.id;
            const { average } = calculateWeightedAverage(student.grades);
            return (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0B3A60] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{student.firstName} {student.lastName}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-200 text-slate-600'}`}>
                  {average || '–'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeStudent && (
        <EditableGradeTable student={activeStudent} onUpdateGrades={onUpdateGrades} />
      )}
    </div>
  );
};
