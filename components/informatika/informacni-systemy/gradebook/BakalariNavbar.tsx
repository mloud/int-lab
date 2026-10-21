import React from 'react';
import { Role } from './GradebookTypes';
import { LogOut, Maximize2, Minimize2, User, BookOpen, Calendar, Users, Sliders } from 'lucide-react';

interface BakalariNavbarProps {
  role: Role;
  userName: string;
  userSubtitle?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const BakalariNavbar: React.FC<BakalariNavbarProps> = ({
  role,
  userName,
  userSubtitle = 'Třída 7.A',
  activeTab,
  onTabChange,
  onLogout,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="bg-[#0B3A60] text-white shadow-md select-none rounded-t-2xl sm:rounded-t-3xl border-b border-blue-950">
      {/* Horní hlavní lišta */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo Bakaláři */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-inner font-black text-white text-lg tracking-wider border border-blue-300/30">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-wider uppercase">BAKALÁŘI</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-800/80 text-[10px] font-bold uppercase tracking-widest text-blue-200">
                Webová aplikace
              </span>
            </div>
            <div className="text-[11px] text-blue-200/80 font-medium hidden md:block">
              Základní škola IntLab • Školní rok 2024/2025
            </div>
          </div>
        </div>

        {/* Profil a ovládání vpravo */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Informace o přihlášeném */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-blue-700/50">
            <div className="w-8 h-8 rounded-full bg-blue-800/90 text-blue-200 flex items-center justify-center border border-blue-400/30">
              <User className="w-4 h-4" />
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">{userName}</div>
              <div className="text-[10px] text-blue-300 font-medium">
                {role} • {userSubtitle}
              </div>
            </div>
          </div>

          {/* Celá obrazovka */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Ukončit celou obrazovku' : 'Zobrazit na celou obrazovku'}
            className="p-2 rounded-xl bg-blue-800/60 hover:bg-blue-700 text-blue-200 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Tlačítko odhlášení */}
          <button
            onClick={onLogout}
            title="Odhlásit se a změnit roli"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Odhlásit</span>
          </button>
        </div>
      </div>

      {/* Spodní lišta se záložkami Bakalářů */}
      <nav className="px-4 sm:px-6 bg-[#082E4D] flex items-center gap-1 overflow-x-auto text-xs font-semibold py-1">
        <button
          onClick={() => onTabChange('grades')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
            activeTab === 'grades' ? 'bg-[#0B3A60] text-white shadow-xs' : 'text-blue-200/70 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Průběžná klasifikace</span>
        </button>

        {role === Role.ADMIN && (
          <button
            onClick={() => onTabChange('users')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'users' ? 'bg-[#0B3A60] text-white shadow-xs' : 'text-blue-200/70 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Správa uživatelů a žáků</span>
          </button>
        )}

        <button
          onClick={() => onTabChange('timetable')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
            activeTab === 'timetable' ? 'bg-[#0B3A60] text-white shadow-xs' : 'text-blue-200/70 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Rozvrh hodin</span>
        </button>
      </nav>
    </header>
  );
};
