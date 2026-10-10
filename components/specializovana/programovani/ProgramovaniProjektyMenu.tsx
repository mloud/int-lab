import React from 'react';
import { Gamepad2, Box } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface ProgramovaniProjektyMenuProps {
  onBack: () => void;
  onStartRaycaster: () => void;
}

const ProgramovaniProjektyMenu: React.FC<ProgramovaniProjektyMenuProps> = ({ onBack, onStartRaycaster }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Gamepad2 className="w-10 h-10 text-teal-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Projekty
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Tvoř vlastní hry a aplikace krok za krokem a nauč se tak logicky uvažovat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="ray"
            title="2.5D Raycaster ve Scratchi"
            description="Tvorba vlastního 'Wolfenstein 3D' enginu v prostředí Scratch."
            icon={Box}
            gradient="from-teal-600 to-emerald-600"
            actionLabel="Spustit projekt"
            onClick={onStartRaycaster}
            accentCorner={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramovaniProjektyMenu;
