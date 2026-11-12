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
      <div className="flex flex-wrap items-center gap-2.5 bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-sm">
        <span className="text-sm font-black text-slate-600 uppercase tracking-wider px-2">
          Vyberte žáka třídy 7.A:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {students.map(student => {
            const isSelected = student.id === activeStudent?.id;
            const { average } = calculateWeightedAverage(student.grades);
            return (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`px-4 py-2 rounded-xl font-black text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3A60] text-white shadow-md ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span>
                  {student.firstName} {student.lastName}
                </span>
                {average && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-mono font-bold ${
                      isSelected ? 'bg-blue-800 text-blue-100' : 'bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    {average}
                  </span>
                )}
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
