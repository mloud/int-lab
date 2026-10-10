import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Binary, 
  Lock, 
  Palette, 
  Shapes, 
  BoxSelect, 
  Network, 
  HardDrive, 
  Cpu, 
  Monitor, 
  Sparkles, 
  BarChart3, 
  ScanFace,
  ArrowLeft 
} from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

export type GradeNumber = 6 | 7 | 8 | 9;

interface GradeConfig {
  title: string;
  gradeLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  chapters: Array<{
    tag: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    route: string;
    accentCorner: boolean;
  }>;
}

const GRADE_CONFIGS: Record<GradeNumber, GradeConfig> = {
  6: {
    title: 'Informatika 6',
    gradeLabel: '6. Třída',
    description: 'Základy digitálního světa, kódování symbolů, šifrování dat, barvy v počítači, rastrová a vektorová grafika a binární čísla.',
    icon: Binary,
    gradient: 'from-blue-600 to-indigo-600',
    chapters: [
      {
        tag: 'cod',
        title: 'Kódy kolem nás',
        description: 'Piktogramy, prací symboly, digitální emoce (Emoji) a mezinárodní kódy států.',
        icon: Binary,
        gradient: 'from-rose-500 to-pink-500',
        route: '/informatika/kody',
        accentCorner: false,
      },
      {
        tag: 'enc',
        title: 'Šifrování dat',
        description: 'Principy kryptografie, Caesarova substituční šifra, mřížka a vlastní šifrování.',
        icon: Lock,
        gradient: 'from-emerald-500 to-teal-500',
        route: '/informatika/sifry',
        accentCorner: false,
      },
      {
        tag: 'rgb',
        title: 'Kódování barev',
        description: 'Aditivní skládání světel RGB na monitoru, míchací laboratoř a omalovánky.',
        icon: Palette,
        gradient: 'from-blue-500 to-indigo-500',
        route: '/informatika/barvy',
        accentCorner: false,
      },
      {
        tag: 'lin',
        title: 'Obrázek z čar',
        description: 'Vektorová geometrie, skládání tvarů, body a úsečky v souřadnicovém plátně.',
        icon: Shapes,
        gradient: 'from-indigo-500 to-purple-500',
        route: '/informatika/cary',
        accentCorner: true,
      },
      {
        tag: 'com',
        title: 'Komprese (jednoduše)',
        description: 'Základy zmenšování dat, slovníková metoda textu a slučování barevných pixelů.',
        icon: BoxSelect,
        gradient: 'from-teal-500 to-emerald-500',
        route: '/informatika/komprese',
        accentCorner: true,
      },
      {
        tag: 'bin',
        title: 'Binární čísla',
        description: 'Dvojková soustava hravě, převodník čísel, logická hradla a binární sčítání.',
        icon: Binary,
        gradient: 'from-amber-500 to-orange-500',
        route: '/informatika/binarni',
        accentCorner: true,
      },
    ],
  },
  7: {
    title: 'Informatika 7',
    gradeLabel: '7. Třída',
    description: 'Algoritmické a výpočetní myšlení, grafové úlohy, Eulerovské tahy a řešení síťových konfliktů.',
    icon: Network,
    gradient: 'from-teal-600 to-emerald-600',
    chapters: [
      {
        tag: 'mod',
        title: 'Modely a sítě',
        description: 'Pokročilé grafové algoritmy, minimální kostra grafu, Petriho sítě a plánování procesů.',
        icon: Network,
        gradient: 'from-purple-500 to-pink-500',
        route: '/informatika/modely',
        accentCorner: true,
      },
    ],
  },
  8: {
    title: 'Informatika 8',
    gradeLabel: '8. Třída',
    description: 'Měření velikosti a objemu dat, jednotky informace od bitů po terabajty a přenosové rychlosti.',
    icon: HardDrive,
    gradient: 'from-indigo-600 to-purple-600',
    chapters: [
      {
        tag: 'dum',
        title: 'Jednotky dat',
        description: 'Bity, bajty, předpony KB až TB, výpočty kapacity paměti a rychlosti stahování souborů.',
        icon: HardDrive,
        gradient: 'from-fuchsia-500 to-purple-600',
        route: '/informatika/jednotky',
        accentCorner: true,
      },
    ],
  },
  9: {
    title: 'Informatika 9',
    gradeLabel: '9. Třída',
    description: 'Hardware a architektura PC, operační systémy, pokročilá komprese dat, interpretace grafů a moderní technologie.',
    icon: Cpu,
    gradient: 'from-rose-600 to-pink-600',
    chapters: [
      {
        tag: 'hwm',
        title: 'Součásti počítače',
        description: 'Hardware komponenty, procesor, paměť RAM, sběrnice a konfigurátor sestavy.',
        icon: Cpu,
        gradient: 'from-sky-500 to-cyan-500',
        route: '/informatika/hardware',
        accentCorner: true,
      },
      {
        tag: 'osm',
        title: 'Operační systémy',
        description: 'Správa procesů a paměti, bootovací sekvence, přípony a klávesové zkratky v OS.',
        icon: Monitor,
        gradient: 'from-slate-600 to-gray-700',
        route: '/informatika/os',
        accentCorner: true,
      },
      {
        tag: 'ko2',
        title: 'Komprese (pokročilejší)',
        description: 'Barevná hloubka, RLE kódování, ztrátový JPEG a porovnání multimediálních formátů.',
        icon: BoxSelect,
        gradient: 'from-orange-500 to-red-500',
        route: '/informatika/komprese/formaty',
        accentCorner: true,
      },
      {
        tag: 'fut',
        title: 'Technologie budoucnosti',
        description: 'Internet věcí (IoT), automatizace Průmyslu 4.0 a virtuální realita (VR).',
        icon: Sparkles,
        gradient: 'from-yellow-500 to-amber-500',
        route: '/informatika/budoucnost',
        accentCorner: true,
      },
      {
        tag: 'gra',
        title: 'Sloupcové grafy',
        description: 'Čtení, vizualizace a interpretace datových řad pomocí sloupcových grafů.',
        icon: BarChart3,
        gradient: 'from-emerald-500 to-green-600',
        route: '/informatika/grafy',
        accentCorner: false,
      },
      {
        tag: 'ar',
        title: 'Laboratoř AR',
        description: 'Interaktivní rozšířená realita a 3D virtuální modely přímo ve vašem mobilním telefonu.',
        icon: ScanFace,
        gradient: 'from-rose-500 to-pink-500',
        route: '/informatika/ar',
        accentCorner: false,
      },
    ],
  },
};

interface GradeMenuProps {
  grade: GradeNumber;
}

export const GradeMenu: React.FC<GradeMenuProps> = ({ grade }) => {
  const router = useRouter();
  const config = GRADE_CONFIGS[grade];
  const Icon = config.icon;

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Tlačítko Zpět */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => router.push('/informatika')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na předměty</span>
          </button>
        </div>

        {/* Hlavní ikona */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 bg-gradient-to-tr ${config.gradient} rounded-[2rem] flex items-center justify-center shadow-xl`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Nadpis */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tighter leading-none uppercase">
          {config.title}
        </h1>

        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          {config.gradeLabel}
        </div>

        <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl font-medium leading-relaxed">
          {config.description}
        </p>

        {/* Grid kapitol */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {config.chapters.map((chapter) => (
            <TechnicalCard
              key={chapter.tag}
              tag={chapter.tag}
              title={chapter.title}
              description={chapter.description}
              icon={chapter.icon}
              gradient={chapter.gradient}
              onClick={() => router.push(chapter.route)}
              accentCorner={chapter.accentCorner}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeMenu;
