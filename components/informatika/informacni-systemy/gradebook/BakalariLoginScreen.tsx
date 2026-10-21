import React, { useState } from 'react';
import { Role, Student, Parent, TeacherUser, AdminUser } from './GradebookTypes';
import {
  GraduationCap,
  Users,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  ChevronRight,
  User,
} from 'lucide-react';

interface BakalariLoginScreenProps {
  students: Student[];
  parents: Parent[];
  teachers: TeacherUser[];
  admins: AdminUser[];
  onLogin: (role: Role, user: any) => void;
}

export const BakalariLoginScreen: React.FC<BakalariLoginScreenProps> = ({
  students,
  parents,
  teachers,
  admins,
  onLogin,
}) => {
  // Krok 1: Výběr role, Krok 2: Výběr konkrétního uživatele
  const [chosenRole, setChosenRole] = useState<Role | null>(null);

  const roles = [
    {
      role: Role.STUDENT,
      title: 'Žák',
      subtitle: 'Prohlížení vlastních známek a rozvrhu',
      icon: GraduationCap,
      color: 'bg-blue-600 text-white',
      borderHover: 'hover:border-blue-500 hover:shadow-lg',
      badge: 'Student',
    },
    {
      role: Role.PARENT,
      title: 'Zákonný zástupce',
      subtitle: 'Přehled prospěchu a docházky svých dětí',
      icon: Users,
      color: 'bg-emerald-600 text-white',
      borderHover: 'hover:border-emerald-500 hover:shadow-lg',
      badge: 'Rodič',
    },
    {
      role: Role.TEACHER,
      title: 'Vyučující (Učitel)',
      subtitle: 'Zápis a oprava známek žáků třídy',
      icon: UserCheck,
      color: 'bg-purple-600 text-white',
      borderHover: 'hover:border-purple-500 hover:shadow-lg',
      badge: 'Učitel',
    },
    {
      role: Role.ADMIN,
      title: 'Správce systému',
      subtitle: 'Kompletní administrace uživatelů a nastavení',
      icon: ShieldAlert,
      color: 'bg-amber-600 text-white',
      borderHover: 'hover:border-amber-500 hover:shadow-lg',
      badge: 'Administrátor',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 animate-in fade-in duration-300">
      {/* Bakaláři přihlašovací box */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modrá hlavička Bakalářů */}
        <div className="bg-[#0B3A60] text-white p-6 sm:p-8 text-center relative">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/20 mb-3">
            B
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
            Školní informační systém
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-white mt-1">
            BAKALÁŘI
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 font-medium">
            Základní škola IntLab • Přihlášení do aplikace
          </p>
        </div>

        {/* KROK 1: NEJPRVE POUZE VOLBA ROLE */}
        {!chosenRole && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
                Krok 1 / 2
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Vyberte svoji roli v systému
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zvolte způsob, jakým chcete do školního systému vstoupit:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    onClick={() => setChosenRole(item.role)}
                    className={`p-5 rounded-2xl border-2 border-slate-200 bg-white text-left transition-all ${item.borderHover} hover:scale-[1.02] active:scale-[0.98] group flex flex-col justify-between cursor-pointer`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${item.color} group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>Zvolit tuto roli</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* KROK 2: AŽ NYNÍ SE ZOBRAZÍ, KDO SE PŘIHLAŠUJE */}
        {chosenRole && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            {/* Tlačítko zpět a hlavička kroku 2 */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <button
                onClick={() => setChosenRole(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zpět na výběr role</span>
              </button>

              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Krok 2 / 2
                </span>
                <span className="text-xs font-black text-blue-900 uppercase">
                  Role: {chosenRole}
                </span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Kdo se přihlašuje?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Klikněte na účet pro okamžité přihlášení do aplikace:
              </p>
            </div>

            {/* SEZNAM ŽÁKŮ */}
            {chosenRole === Role.STUDENT && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {students.map(st => (
                    <button
                      key={st.id}
                      onClick={() => onLogin(Role.STUDENT, st)}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all text-left flex items-center justify-between group active:scale-[0.98] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {st.firstName[0]}{st.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-blue-900">
                            {st.firstName} {st.lastName}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            Třída {st.classGroup || '7.A'} • {st.grades.length} známek
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SEZNAM RODIČŮ */}
            {chosenRole === Role.PARENT && (
              <div className="space-y-3">
                <div className="space-y-2.5">
                  {parents.map(par => {
                    const childrenNames = par.childIds
                      .map(cid => {
                        const s = students.find(st => st.id === cid);
                        return s ? `${s.firstName} ${s.lastName}` : cid;
                      })
                      .join(', ');

                    return (
                      <button
                        key={par.id}
                        onClick={() => onLogin(Role.PARENT, par)}
                        className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-md transition-all text-left flex items-center justify-between group active:scale-[0.98] cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            {par.firstName[0]}{par.lastName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-900">
                              {par.firstName} {par.lastName}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              Děti v evidenci: <strong className="text-slate-700">{childrenNames}</strong>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* UČITEL */}
            {chosenRole === Role.TEACHER && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      Mgr. Karel Vomáčka
                    </h4>
                    <p className="text-xs text-purple-900 font-medium">
                      Třídní učitel 7.A • Oprávnění zápisu a editace známek
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onLogin(Role.TEACHER, teachers[0])}
                  className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Přihlásit se jako Mgr. Karel Vomáčka</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* SPRÁVCE SYSTÉMU */}
            {chosenRole === Role.ADMIN && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      Mgr. Alena Ředitelová
                    </h4>
                    <p className="text-xs text-amber-900 font-medium">
                      Vedení školy • Plná administrace účtů, žáků a rodin
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onLogin(Role.ADMIN, admins[0])}
                  className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Přihlásit se jako Mgr. Alena Ředitelová</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Didaktická patička */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            {chosenRole ? (
              <>Vybraná role <strong>{chosenRole}</strong> určí, co po přihlášení v systému uvidíš a co budeš moci dělat.</>
            ) : (
              <>Každá role má v informačním systému jiná oprávnění a přístup k jiným datům.</>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BakalariLoginScreen;
