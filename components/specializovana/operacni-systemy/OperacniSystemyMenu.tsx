import React from 'react';
import { ArrowLeft, Cpu, ShieldCheck, HardDrive, Hourglass, MonitorUp, Clock, Layers } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface OperacniSystemyMenuProps {
  onBack: () => void;
  onStartOsIntro: () => void;
  onStartOsArchitecture: () => void;
  onStartOsEvolution: () => void;
  onStartOsBoot: () => void;
  onStartFileSystemsMenu: () => void;
  onStartWindowsInstall: () => void;
  onStartProcessMemory: () => void;
  onStartHardware: () => void;
  onStartVirtualization: () => void;
  onStartAssessment: () => void;
}

const OperacniSystemyMenu: React.FC<OperacniSystemyMenuProps> = ({ onBack, onStartOsIntro, onStartOsArchitecture, onStartOsEvolution, onStartOsBoot, onStartFileSystemsMenu, onStartWindowsInstall, onStartProcessMemory, onStartHardware, onStartVirtualization, onStartAssessment }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Cpu className="w-10 h-10 text-purple-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Operační systémy
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Vyberte si téma k procvičování. Začněte se souborovými systémy a zjistěte, jak se data fyzicky zapisují na disk!
        </p>

        {/* Topics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="win"
            title="Instalace OS"
            description="Simulátor instalace Windows 11 pro IT techniky."
            icon={MonitorUp}
            gradient="from-purple-600 to-indigo-600"
            actionLabel="Spustit simulátor"
            onClick={onStartWindowsInstall}
            accentCorner={false}
          />

          <TechnicalCard
            tag="osh"
            title="Základy hardwaru pro OS"
            description="Hardware z pohledu operačního systému a komunikace s komponentami."
            icon={Cpu}
            gradient="from-purple-600 to-indigo-600"
            onClick={onStartHardware}
            accentCorner={false}
          />

          <TechnicalCard
            tag="osi"
            title="Úvod do OS"
            description="Základní teorie, funkce, licence a typy operačních systémů s interaktivním kvízem."
            icon={Cpu}
            gradient="from-purple-600 to-indigo-600"
            onClick={onStartOsIntro}
            accentCorner={false}
          />

          <TechnicalCard
            tag="osa"
            title="Architektura OS"
            description="Jak funguje monolitické a mikrojádro. Hravý simulátor výpadků služeb."
            icon={ShieldCheck}
            gradient="from-purple-600 to-indigo-600"
            onClick={onStartOsArchitecture}
            accentCorner={false}
          />

          <TechnicalCard
            tag="TEST"
            title="Hodnocená práce"
            description="Hardware, úvod do OS a architektura OS. 45 minut, 50 bodů. Odemčení na heslo."
            icon={ShieldCheck}
            gradient="from-rose-500 to-red-600"
            actionLabel="Otevřít zadání"
            onClick={onStartAssessment}
            accentCorner={false}
          />

          <TechnicalCard
            tag="ose"
            title="Evoluce OS"
            description="Od sálových počítačů s děrnými štítky až po dnešní chytré telefony."
            icon={Clock}
            gradient="from-purple-600 to-indigo-600"
            actionLabel="Otevřít muzeum"
            onClick={onStartOsEvolution}
            accentCorner={false}
          />

          <TechnicalCard
            tag="osv"
            title="Virtualizace"
            description="Simulace Type 1 a 2 hypervizorů a praktický list pro VirtualBox."
            icon={Layers}
            gradient="from-purple-600 to-indigo-600"
            onClick={onStartVirtualization}
            accentCorner={false}
          />

          <TechnicalCard
            tag="fsm"
            title="Souborový systém a disky"
            description="Jak operační systém ukládá data a organizuje složky na disku. FAT, fragmentace a média."
            icon={HardDrive}
            gradient="from-purple-600 to-pink-600"
            actionLabel="Otevřít kapitolu"
            onClick={onStartFileSystemsMenu}
            accentCorner={true}
          />

          <TechnicalCard
            tag="osb"
            title="Start OS (Boot)"
            description="Simulátor UEFI a pochopení přesné sekvence bootování systému."
            icon={Cpu}
            gradient="from-purple-600 to-indigo-600"
            actionLabel="Spustit simulátor"
            onClick={onStartOsBoot}
            accentCorner={false}
          />

          <TechnicalCard
            tag="pmm"
            title="Běh programu"
            description="Prozkoumejte procesy v paměti RAM a cyklus procesoru."
            icon={Hourglass}
            gradient="from-indigo-600 to-purple-600"
            actionLabel="Zobrazit simulátory"
            onClick={onStartProcessMemory}
            accentCorner={true}
          />
        </div>
      </div>
    </div>
  );
};

export default OperacniSystemyMenu;
