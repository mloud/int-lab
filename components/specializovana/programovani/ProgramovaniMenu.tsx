import React from 'react';
import { Code, FolderOpen } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface ProgramovaniMenuProps {
  onBack: () => void;
  onStartProjects: () => void;
  onStartScratch: () => void;
}

const ProgramovaniMenu: React.FC<ProgramovaniMenuProps> = ({ onBack, onStartProjects, onStartScratch }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Code className="w-10 h-10 text-emerald-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Programování a vývoj her
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Vyber si oblast programování nebo si projdi jednotlivé projekty a nauč se vytvářet vlastní aplikace a hry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="scr"
            title="Scratch"
            description="Úvod do programování pomocí bloků pro úplné začátečníky. Podmínky, cykly a proměnné."
            icon={Code}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Otevřít Scratch"
            onClick={onStartScratch}
            accentCorner={true}
          />

          <TechnicalCard
            tag="prm"
            title="Projekty"
            description="Galerie výukových projektů, her a aplikací krok za krokem."
            icon={FolderOpen}
            gradient="from-emerald-500 to-teal-600"
            actionLabel="Zobrazit projekty"
            onClick={onStartProjects}
            accentCorner={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramovaniMenu;
