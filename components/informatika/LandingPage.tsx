import React from 'react';
import { 
  Sparkles, 
  Binary, 
  Shapes, 
  BoxSelect, 
  HardDrive, 
  Monitor, 
  Lock, 
  ScanFace, 
  BarChart3, 
  Palette, 
  Cpu, 
  Network 
} from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface LandingPageProps {
  onStartColors: () => void;
  onStartLines: () => void;
  onStartCompression: () => void;
  onStartCompressionFormats: () => void;
  onStartCompressionAlgos: () => void;
  onStartBinary: () => void;
  onStartDataUnits: () => void;
  onStartModels: () => void;
  onStartHardware: () => void;
  onStartOs: () => void;
  onStartCodes: () => void;
  onStartEncryption: () => void;
  onStartFutureTech: () => void;
  onStartArApps: () => void;
  onStartBarCharts: () => void;
  onBack: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartColors, 
  onStartLines, 
  onStartCompression, 
  onStartCompressionFormats, 
  onStartCompressionAlgos, 
  onStartBinary, 
  onStartDataUnits, 
  onStartModels, 
  onStartHardware, 
  onStartOs, 
  onStartCodes, 
  onStartEncryption, 
  onStartFutureTech, 
  onStartArApps, 
  onStartBarCharts 
}) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-4">
      
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Dekorační prvky na pozadí */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-8">
          <div className="w-28 h-28 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200">
            <Binary className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Obecná informatika
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Interaktivní úlohy a laboratorní simulace
        </p>

        {/* 6. TŘÍDA */}
        <div className="w-full mb-14">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-blue-600"></span> 6. Třída
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="cod"
              title="Kódy kolem nás"
              description="Piktogramy, prací symboly, digitální emoce (Emoji) a mezinárodní kódy států."
              icon={Binary}
              gradient="from-rose-500 to-pink-500"
              onClick={onStartCodes}
              accentCorner={false}
            />
            <TechnicalCard
              tag="enc"
              title="Šifrování dat"
              description="Principy kryptografie, Caesarova substituční šifra, mřížka a vlastní šifrování."
              icon={Lock}
              gradient="from-emerald-500 to-teal-500"
              onClick={onStartEncryption}
              accentCorner={false}
            />
            <TechnicalCard
              tag="rgb"
              title="Kódování barev"
              description="Aditivní skládání světel RGB na monitoru, míchací laboratoř a omalovánky."
              icon={Palette}
              gradient="from-blue-500 to-indigo-500"
              onClick={onStartColors}
              accentCorner={false}
            />
            <TechnicalCard
              tag="lin"
              title="Obrázek z čar"
              description="Vektorová geometrie, skládání tvarů, body a úsečky v souřadnicovém plátně."
              icon={Shapes}
              gradient="from-indigo-500 to-purple-500"
              onClick={onStartLines}
              accentCorner={true}
            />
            <TechnicalCard
              tag="com"
              title="Komprese (jednoduše)"
              description="Základy zmenšování dat, slovníková metoda textu a slučování barevných pixelů."
              icon={BoxSelect}
              gradient="from-teal-500 to-emerald-500"
              onClick={onStartCompression}
              accentCorner={true}
            />
            <TechnicalCard
              tag="bin"
              title="Binární čísla"
              description="Dvojková soustava hravě, převodník čísel, logická hradla a binární sčítání."
              icon={Binary}
              gradient="from-amber-500 to-orange-500"
              onClick={onStartBinary}
              accentCorner={true}
            />
            <TechnicalCard
              tag="mod"
              title="Modely"
              description="Grafové úlohy, jízdní řády, Eulerovské tahy a hledání nejkratších cest v síti."
              icon={Network}
              gradient="from-purple-500 to-pink-500"
              onClick={onStartModels}
              accentCorner={true}
            />
          </div>
        </div>

        {/* 7. TŘÍDA */}
        <div className="w-full mb-14">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-purple-600"></span> 7. Třída
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="mod"
              title="Modely a sítě"
              description="Pokročilé grafové algoritmy, minimální kostra, Petriho sítě a plánování procesů."
              icon={Network}
              gradient="from-purple-500 to-pink-500"
              onClick={onStartModels}
              accentCorner={true}
            />
          </div>
        </div>

        {/* 8. TŘÍDA */}
        <div className="w-full mb-14">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-fuchsia-600"></span> 8. Třída
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="dum"
              title="Jednotky dat"
              description="Bity, bajty, předpony KB až TB, výpočty kapacity paměti a rychlosti stahování."
              icon={HardDrive}
              gradient="from-fuchsia-500 to-purple-600"
              onClick={onStartDataUnits}
              accentCorner={true}
            />
          </div>
        </div>

        {/* 9. TŘÍDA */}
        <div className="w-full mb-14">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-sky-600"></span> 9. Třída
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="hwm"
              title="Součásti počítače"
              description="Hardware komponenty, procesor, paměť RAM, sběrnice a konfigurátor sestavy."
              icon={Cpu}
              gradient="from-sky-500 to-cyan-500"
              onClick={onStartHardware}
              accentCorner={true}
            />
            <TechnicalCard
              tag="osm"
              title="Operační systémy"
              description="Správa procesů a paměti, bootovací sekvence, přípony a klávesové zkratky."
              icon={Monitor}
              gradient="from-slate-600 to-gray-700"
              onClick={onStartOs}
              accentCorner={true}
            />
            <TechnicalCard
              tag="ko2"
              title="Komprese (pokročilejší)"
              description="Barevná hloubka, RLE kódování, ztrátový JPEG a porovnání multimediálních formátů."
              icon={BoxSelect}
              gradient="from-orange-500 to-red-500"
              onClick={onStartCompressionFormats}
              accentCorner={true}
            />
            <TechnicalCard
              tag="fut"
              title="Technologie budoucnosti"
              description="Internet věcí (IoT), automatizace Průmyslu 4.0 a virtuální realita (VR)."
              icon={Sparkles}
              gradient="from-yellow-500 to-amber-500"
              onClick={onStartFutureTech}
              accentCorner={true}
            />
            <TechnicalCard
              tag="gra"
              title="Sloupcové grafy"
              description="Čtení, vizualizace a interpretace datových řad pomocí sloupcových grafů."
              icon={BarChart3}
              gradient="from-emerald-500 to-green-600"
              onClick={onStartBarCharts}
              accentCorner={false}
            />
          </div>
        </div>

        {/* STŘEDNÍ ŠKOLA */}
        <div className="w-full mb-14">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-emerald-600"></span> Střední škola
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="cpa"
              title="Komprese algoritmy"
              description="Matematické a stromové algoritmy kódování dat, Huffmanův optimální strom."
              icon={BoxSelect}
              gradient="from-emerald-600 to-teal-600"
              onClick={onStartCompressionAlgos}
              accentCorner={true}
            />
          </div>
        </div>

        {/* AR APLIKACE */}
        <div className="w-full">
          <h2 className="text-2xl font-black text-rose-600 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-rose-100 flex items-center gap-3">
            <ScanFace className="w-6 h-6 text-rose-500" /> AR Aplikace
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <TechnicalCard
              tag="ar"
              title="Laboratoř AR"
              description="Interaktivní rozšířená realita a 3D virtuální modely přímo ve vašem mobilním telefonu."
              icon={ScanFace}
              gradient="from-rose-500 to-pink-500"
              actionLabel="Otevřít AR Laboratoř"
              onClick={onStartArApps}
              accentCorner={false}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
