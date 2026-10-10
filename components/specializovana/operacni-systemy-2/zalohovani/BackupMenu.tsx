import React from 'react';
import { ArrowLeft, Save, BookOpen, Cloud } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface BackupMenuProps {
  onBack: () => void;
  onStartIntro: () => void;
  onStartManual: () => void;
  onStartCloud: () => void;
  onStartSystem: () => void;
  onStartCobian: () => void;
}

const BackupMenu: React.FC<BackupMenuProps> = ({
  onBack,
  onStartIntro,
  onStartManual,
  onStartCloud,
  onStartSystem,
  onStartCobian,
}) => {
  const chapters = [
    {
      n: 1, tag: 'z-uvod',
      title: 'Úvod',
      desc: 'Základní principy a důležitost zálohování dat v praxi.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-indigo-500',
      action: onStartIntro,
    },
    {
      n: 2, tag: 'z-man',
      title: 'Manuální zálohování',
      desc: 'Základní příkazy pro ruční zálohování (copy, xcopy, robocopy) a vytvoření dávkového skriptu s plánovačem úloh.',
      icon: Save,
      gradient: 'from-emerald-500 to-teal-500',
      action: onStartManual,
    },
    {
      n: 3, tag: 'z-cld',
      title: 'Synchronizace a cloud',
      desc: 'Principy cloudového zálohování, streamování vs. zrcadlení dat a používání Google Drive.',
      icon: Cloud,
      gradient: 'from-sky-500 to-blue-500',
      action: onStartCloud,
    },
    {
      n: 4, tag: 'z-sys',
      title: 'Stav systému',
      desc: 'Nástroje pro záchranu OS, Body obnovení a technologie Volume Shadow Copy (VSS).',
      icon: Save,
      gradient: 'from-amber-500 to-orange-500',
      action: onStartSystem,
    },
    {
      n: 5, tag: 'z-cobian',
      title: 'Cobian Reflector',
      desc: 'Praktické experimenty s plnou, inkrementální a diferenciální zálohou v profi nástroji zdarma.',
      icon: Save,
      gradient: 'from-purple-500 to-fuchsia-500',
      action: onStartCobian,
    },
  ];

  return (
    <div className="max-w-6xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět do menu OS 2
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-14 rounded-[4rem] shadow-2xl border-4 border-white">
        <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-xl shadow-purple-200">
          <Save className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-5 tracking-tighter uppercase leading-none">
          Zálohování <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">dat</span>
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          Jak a proč zálohovat svá data. Naučíme se rozdíly mezi typy záloh, seznámíme se s cloudem i lokálními disky.
        </p>

        <h2 className="text-left text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Podkapitoly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {chapters.map(ch => (
            <TechnicalCard
              key={ch.tag}
              id={`backup-chapter-${ch.n}`}
              tag={ch.tag}
              title={ch.title}
              description={ch.desc}
              icon={ch.icon}
              gradient={ch.gradient}
              actionLabel="Otevřít kapitolu"
              onClick={ch.action}
              accentCorner={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackupMenu;
