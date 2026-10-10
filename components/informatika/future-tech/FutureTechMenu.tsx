import React from 'react';
import { ArrowLeft, Sparkles, Network, Factory, Glasses } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface FutureTechMenuProps {
  onStartIoT: () => void;
  onStartIndustry40: () => void;
  onStartVR?: () => void;
  onBack: () => void;
}

const FutureTechMenu: React.FC<FutureTechMenuProps> = ({
  onStartIoT,
  onStartIndustry40,
  onStartVR,
  onBack
}) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden mb-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-yellow-200">
            <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Technologie <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">budoucnosti</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Trendy a inovace moderního IT světa
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="iot"
            title="IoT (Internet věcí)"
            description="Chytrá domácnost, senzory a propojená zařízení, která komunikují bez lidského zásahu."
            icon={Network}
            gradient="from-blue-500 to-cyan-500"
            onClick={onStartIoT}
          />
          <TechnicalCard
            tag="industry40"
            title="Průmysl 4.0"
            description="Inteligentní továrny, průmysloví roboti a digitalizace výroby nového věku."
            icon={Factory}
            gradient="from-orange-500 to-amber-600"
            onClick={onStartIndustry40}
          />
          {onStartVR && (
            <TechnicalCard
              tag="vr"
              title="Virtuální Realita"
              description="VR brýle, simulované 3D prostředí a digitální světy pro výuku i zábavu."
              icon={Glasses}
              gradient="from-purple-500 to-fuchsia-600"
              onClick={onStartVR}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FutureTechMenu;
