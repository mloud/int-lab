import React, { useState } from 'react';
import { Grade, Student } from './GradebookTypes';
import { EditableGradeTable } from './EditableGradeTable';
import { calculateWeightedAverage } from './GradeTable';

interface TeacherViewProps {
  students: Student[];
  onUpdateGrades: (studentId: string, newGrades: Grade[]) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ students, onUpdateGrades }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  return (
    <div className="space-y-4">
      {/* Kompaktní přepínač žáků ve třídě */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
          Žák:
        </span>
        {students.map(student => {
          const isSelected = student.id === activeStudent?.id;
          const { average } = calculateWeightedAverage(student.grades);
          return (
            <button
              key={student.id}
              onClick={() => setSelectedStudentId(student.id)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#0B3A60] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>
                {student.firstName} {student.lastName}
              </span>
              {average && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {average}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeStudent && (
        <EditableGradeTable student={activeStudent} onUpdateGrades={onUpdateGrades} />
      )}
    </div>
  );
};
