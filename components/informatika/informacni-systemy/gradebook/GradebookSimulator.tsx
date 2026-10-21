import React, { useState } from 'react';
import { Role, Student, Parent, Grade } from './GradebookTypes';
import { initialStudents, initialParents, teachers, admins } from './GradebookMockData';
import { BakalariLoginScreen } from './BakalariLoginScreen';
import { BakalariNavbar } from './BakalariNavbar';
import { StudentView } from './StudentView';
import { ParentView } from './ParentView';
import { TeacherView } from './TeacherView';
import { AdminView } from './AdminView';
import { UserManagementPanel } from './UserManagementPanel';
import { Calendar, RotateCcw, Info, Sparkles } from 'lucide-react';

interface ActiveSession {
  role: Role;
  user: any;
}

export const GradebookSimulator: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [parents, setParents] = useState<Parent[]>(initialParents);

  // Přihlášený uživatel (null = zobrazuje se čistá přihlašovací obrazovka)
  const [session, setSession] = useState<ActiveSession | null>(null);

  // Aktivní podzáložka v Bakalářích
  const [activeTab, setActiveTab] = useState<string>('grades');

  // Režim celé obrazovky
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleUpdateGrades = (studentId: string, newGrades: Grade[]) => {
    setStudents(prev => prev.map(s => (s.id === studentId ? { ...s, grades: newGrades } : s)));
    // Synchronizace, pokud je přihlášen žák
    if (session?.role === Role.STUDENT && session.user.id === studentId) {
      setSession(prev => (prev ? { ...prev, user: { ...prev.user, grades: newGrades } } : null));
    }
  };

  const handleResetData = () => {
    if (window.confirm('Opravdu si přejete obnovit data žákovské knížky do výchozího stavu?')) {
      setStudents(initialStudents);
      setParents(initialParents);
      if (session) {
        if (session.role === Role.STUDENT) {
          const freshStudent = initialStudents.find(s => s.id === session.user.id) || initialStudents[0];
          setSession({ role: Role.STUDENT, user: freshStudent });
        } else if (session.role === Role.PARENT) {
          const freshParent = initialParents.find(p => p.id === session.user.id) || initialParents[0];
          setSession({ role: Role.PARENT, user: freshParent });
        }
      }
    }
  };

  // Pokud není uživatel přihlášen, zobrazí se POUZE čisté okno přihlášení Bakalářů
  if (!session) {
    return (
      <div className="w-full">
        <BakalariLoginScreen
          students={students}
          parents={parents}
          teachers={teachers}
          admins={admins}
          onLogin={(role, user) => {
            setSession({ role, user });
            setActiveTab('grades');
          }}
        />
      </div>
    );
  }

  // Příprava jména pro lištu Bakalářů
  const getUserDisplayName = () => {
    if (session.role === Role.TEACHER) return `${session.user.title || ''} ${session.user.firstName} ${session.user.lastName}`.trim();
    if (session.role === Role.ADMIN) return `${session.user.title || ''} ${session.user.firstName} ${session.user.lastName} (Správce)`.trim();
    return `${session.user.firstName} ${session.user.lastName}`;
  };

  const getUserSubtitle = () => {
    if (session.role === Role.STUDENT) return `Třída ${session.user.classGroup || '7.A'}`;
    if (session.role === Role.PARENT) return 'Zákonný zástupce';
    if (session.role === Role.TEACHER) return 'Třídní učitel 7.A';
    return 'Vedení školy';
  };

  return (
    <div
      className={`w-full transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md p-2 sm:p-6 flex flex-col justify-center overflow-auto'
          : 'relative'
      }`}
    >
      <div className="bg-[#F4F6F9] rounded-2xl sm:rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden flex flex-col max-w-6xl mx-auto w-full min-h-[600px]">
        {/* Modrá hlavička Bakaláři s odhlášením a záložkami */}
        <BakalariNavbar
          role={session.role}
          userName={getUserDisplayName()}
          userSubtitle={getUserSubtitle()}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={() => setSession(null)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {/* Hlavní pracovní plocha aplikace Bakaláři */}
        <main className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* ZÁLOŽKA: KLASIFIKACE */}
            {activeTab === 'grades' && (
              <>
                {session.role === Role.STUDENT && <StudentView student={session.user} />}
                {session.role === Role.PARENT && <ParentView parent={session.user} allStudents={students} />}
                {session.role === Role.TEACHER && (
                  <TeacherView students={students} onUpdateGrades={handleUpdateGrades} />
                )}
                {session.role === Role.ADMIN && (
                  <AdminView
                    students={students}
                    parents={parents}
                    onUpdateGrades={handleUpdateGrades}
                    onUpdateStudents={setStudents}
                    onUpdateParents={setParents}
                  />
                )}
              </>
            )}

            {/* ZÁLOŽKA: SPRÁVA UŽIVATELŮ (pouze Admin) */}
            {activeTab === 'users' && session.role === Role.ADMIN && (
              <UserManagementPanel
                students={students}
                parents={parents}
                onUpdateStudents={setStudents}
                onUpdateParents={setParents}
              />
            )}

            {/* ZÁLOŽKA: UKÁZKOVÝ ROZVRH HODIN (pro dokonalý dojem z Bakalářů) */}
            {activeTab === 'timetable' && (
              <div className="space-y-4">
                <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B3A60]">
                    Stálý rozvrh hodin • Třída 7.A (Školní rok 2024/2025)
                  </span>
                  <span className="text-slate-500 font-medium">Bakaláři – modul Rozvrh</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-x-auto">
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                        <th className="py-2.5 px-3 w-16 text-left">Den</th>
                        <th className="py-2.5 px-3">1. (8:00 - 8:45)</th>
                        <th className="py-2.5 px-3">2. (8:55 - 9:40)</th>
                        <th className="py-2.5 px-3">3. (10:00 - 10:45)</th>
                        <th className="py-2.5 px-3">4. (10:55 - 11:40)</th>
                        <th className="py-2.5 px-3">5. (11:50 - 12:35)</th>
                        <th className="py-2.5 px-3">6. (12:45 - 13:30)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                      <tr>
                        <td className="py-3 px-3 font-bold text-left bg-slate-50 text-[#0B3A60]">Pondělí</td>
                        <td className="p-2"><span className="block p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold">Český jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-200 font-bold">Matematika</span></td>
                        <td className="p-2"><span className="block p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-bold">Anglický jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-purple-50 text-purple-800 rounded-lg border border-purple-200 font-bold">Dějepis</span></td>
                        <td className="p-2"><span className="block p-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 font-bold">Přírodopis</span></td>
                        <td className="p-2 text-slate-300">–</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-left bg-slate-50 text-[#0B3A60]">Úterý</td>
                        <td className="p-2"><span className="block p-2 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-200 font-bold">Matematika</span></td>
                        <td className="p-2"><span className="block p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold">Český jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-teal-50 text-teal-800 rounded-lg border border-teal-200 font-bold">Informatika</span></td>
                        <td className="p-2"><span className="block p-2 bg-rose-50 text-rose-800 rounded-lg border border-rose-200 font-bold">Fyzika</span></td>
                        <td className="p-2"><span className="block p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-bold">Anglický jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold">Tělesná výchova</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-left bg-slate-50 text-[#0B3A60]">Středa</td>
                        <td className="p-2"><span className="block p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold">Český jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-200 font-bold">Matematika</span></td>
                        <td className="p-2"><span className="block p-2 bg-orange-50 text-orange-800 rounded-lg border border-orange-200 font-bold">Zeměpis</span></td>
                        <td className="p-2"><span className="block p-2 bg-cyan-50 text-cyan-800 rounded-lg border border-cyan-200 font-bold">Chemie</span></td>
                        <td className="p-2"><span className="block p-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold">Výtvarná výchova</span></td>
                        <td className="p-2 text-slate-300">–</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-left bg-slate-50 text-[#0B3A60]">Čtvrtek</td>
                        <td className="p-2"><span className="block p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-bold">Anglický jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold">Český jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-200 font-bold">Matematika</span></td>
                        <td className="p-2"><span className="block p-2 bg-rose-50 text-rose-800 rounded-lg border border-rose-200 font-bold">Fyzika</span></td>
                        <td className="p-2"><span className="block p-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold">Tělesná výchova</span></td>
                        <td className="p-2 text-slate-300">–</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-left bg-slate-50 text-[#0B3A60]">Pátek</td>
                        <td className="p-2"><span className="block p-2 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-200 font-bold">Matematika</span></td>
                        <td className="p-2"><span className="block p-2 bg-teal-50 text-teal-800 rounded-lg border border-teal-200 font-bold">Informatika</span></td>
                        <td className="p-2"><span className="block p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold">Český jazyk</span></td>
                        <td className="p-2"><span className="block p-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 font-bold">Hudební výchova</span></td>
                        <td className="p-2"><span className="block p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-bold">Anglický jazyk</span></td>
                        <td className="p-2 text-slate-300">–</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Spodní systémová lišta Bakalářů */}
          <footer className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Připojeno k databázi Bakaláři (Škola: ZŠ IntLab)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetData}
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#0B3A60] font-semibold transition-colors"
                title="Vrátit cvičná data žáků a známek do výchozího stavu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Obnovit výchozí cvičná data</span>
              </button>

              <span className="text-slate-300">|</span>

              <button
                onClick={() => setSession(null)}
                className="text-[#0B3A60] hover:underline font-bold"
              >
                Změnit roli / Odhlásit
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default GradebookSimulator;
