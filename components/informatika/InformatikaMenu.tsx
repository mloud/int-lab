import React from 'react';
import { useRouter } from 'next/navigation';
import { Binary, Sparkles, Network, HardDrive, Cpu } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface InformatikaMenuProps {
  onBack?: () => void;
}

export const InformatikaMenu: React.FC<InformatikaMenuProps> = ({ onBack }) => {
  const router = useRouter();

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-1000 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Dekorační prvky na pozadí */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-8">
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-200">
            <Binary className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Obecná
          </span>
          <br/> Informatika
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Základní témata a předměty podle ročníků
        </p>

        {/* Grid ročníků (2 sloupce na desktopu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto justify-items-center">
          {/* 6. TŘÍDA */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-3 h-7 rounded-full bg-blue-600"></span> 6. Třída
            </h2>
            <TechnicalCard
              tag="inf6"
              title="Informatika 6"
              description="Základy digitálního světa, kódování, šifrování dat, barvy v RGB, vektorová grafika a binární čísla."
              icon={Binary}
              gradient="from-blue-600 to-indigo-600"
              actionLabel="Otevřít předmět"
              onClick={() => router.push('/informatika/6')}
              accentCorner={false}
              variant="filled"
            />
          </div>

          {/* 7. TŘÍDA */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-3 h-7 rounded-full bg-teal-600"></span> 7. Třída
            </h2>
            <TechnicalCard
              tag="inf7"
              title="Informatika 7"
              description="Algoritmické myšlení, grafové modely, Eulerovské tahy, kolize v rozvrhu a plánování procesů."
              icon={Network}
              gradient="from-teal-600 to-emerald-600"
              actionLabel="Otevřít předmět"
              onClick={() => router.push('/informatika/7')}
              accentCorner={false}
              variant="filled"
            />
          </div>

          {/* 8. TŘÍDA */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-3 h-7 rounded-full bg-indigo-600"></span> 8. Třída
            </h2>
            <TechnicalCard
              tag="inf8"
              title="Informatika 8"
              description="Měření velikosti dat, jednotky KB až TB, paměťová média, výpočty kapacity a rychlosti stahování."
              icon={HardDrive}
              gradient="from-indigo-600 to-purple-600"
              actionLabel="Otevřít předmět"
              onClick={() => router.push('/informatika/8')}
              accentCorner={false}
              variant="filled"
            />
          </div>

          {/* 9. TŘÍDA */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-3 h-7 rounded-full bg-rose-600"></span> 9. Třída
            </h2>
            <TechnicalCard
              tag="inf9"
              title="Informatika 9"
              description="Hardware a architektura PC, operační systémy, pokročilá komprese dat, grafy a technologie budoucnosti."
              icon={Cpu}
              gradient="from-rose-600 to-pink-600"
              actionLabel="Otevřít předmět"
              onClick={() => router.push('/informatika/9')}
              accentCorner={false}
              variant="filled"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformatikaMenu;
