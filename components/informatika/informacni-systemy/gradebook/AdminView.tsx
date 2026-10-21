import React, { useState } from 'react';
import { Grade, Parent, Student } from './GradebookTypes';
import { TeacherView } from './TeacherView';
import { UserManagementPanel } from './UserManagementPanel';
import { Sliders, Users, ShieldAlert } from 'lucide-react';

interface AdminViewProps {
  students: Student[];
  parents: Parent[];
  onUpdateGrades: (studentId: string, newGrades: Grade[]) => void;
  onUpdateStudents: (students: Student[]) => void;
  onUpdateParents: (parents: Parent[]) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  students,
  parents,
  onUpdateGrades,
  onUpdateStudents,
  onUpdateParents,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'grades' | 'users'>('users');

  return (
    <div className="space-y-4">
      {/* Bakaláři administrátorská lišta */}
      <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#0B3A60]" />
          <span className="font-bold text-[#0B3A60]">Správa systému Bakaláři: Mgr. Alena Ředitelová</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Plná přístupová práva (Správce)</span>
        </div>

        {/* Přepínač sekcí v administraci */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeAdminTab === 'users'
                ? 'bg-[#0B3A60] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Správa účtů a rodin</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('grades')}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeAdminTab === 'grades'
                ? 'bg-[#0B3A60] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Zápis a kontrola známek</span>
          </button>
        </div>
      </div>

      {activeAdminTab === 'users' && (
        <UserManagementPanel
          students={students}
          parents={parents}
          onUpdateStudents={onUpdateStudents}
          onUpdateParents={onUpdateParents}
        />
      )}

      {activeAdminTab === 'grades' && (
        <TeacherView students={students} onUpdateGrades={onUpdateGrades} />
      )}
    </div>
  );
};
