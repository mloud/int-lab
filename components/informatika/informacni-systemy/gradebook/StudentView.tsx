import React from 'react';
import { Student } from './GradebookTypes';
import { GradeTable } from './GradeTable';
import { ShieldCheck, User } from 'lucide-react';

interface StudentViewProps {
  student: Student;
}

export const StudentView: React.FC<StudentViewProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      {/* Informační pruh o žákovi a třídě v Bakalářích */}
      <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-bold text-[#0B3A60]">
            Žák: {student.firstName} {student.lastName}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Třída: {student.classGroup || '7.A'}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Obor: Základní vzdělávání</span>
        </div>

        <div className="flex items-center gap-1.5 text-blue-900 font-semibold bg-white px-2.5 py-1 rounded-lg border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Role: Žák (pouze čtení vlastních známek)</span>
        </div>
      </div>

      <GradeTable grades={student.grades} studentName={`${student.firstName} ${student.lastName}`} />
    </div>
  );
};
