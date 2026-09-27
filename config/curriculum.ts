import { 
  Palette, 
  Binary, 
  Globe, 
  PenTool, 
  Cpu, 
  Ruler, 
  QrCode, 
  FileArchive, 
  Share2, 
  Monitor, 
  Lock,
  Terminal,
  Server
} from 'lucide-react';
import React from 'react';

export interface Chapter {
  id: string;
  title: string;
  path: string;
  icon?: React.ElementType;
  description?: string;
  category: 'informatika' | 'specializovana';
  parent?: {
    title: string;
    path: string;
  };
}

export const CURRICULUM: Chapter[] = [
  // Obecná Informatika
  {
    id: 'barvy',
    title: 'Míchání barev (RGB)',
    path: '/informatika/barvy',
    icon: Palette,
    description: 'Jak počítače reprezentují a míchají barvy.',
    category: 'informatika'
  },
  {
    id: 'binarni',
    title: 'Binární soustava',
    path: '/informatika/binarni',
    icon: Binary,
    description: 'Nuly a jedničky: Základní jazyk počítačů.',
    category: 'informatika'
  },
  {
    id: 'budoucnost',
    title: 'Technologie budoucnosti',
    path: '/informatika/budoucnost',
    icon: Globe,
    category: 'informatika'
  },
  {
    id: 'cary',
    title: 'Vektorová grafika',
    path: '/informatika/cary',
    icon: PenTool,
    category: 'informatika'
  },
  {
    id: 'hardware',
    title: 'Hardware',
    path: '/informatika/hardware',
    icon: Cpu,
    category: 'informatika'
  },
  {
    id: 'jednotky',
    title: 'Jednotky informací',
    path: '/informatika/jednotky',
    icon: Ruler,
    category: 'informatika'
  },
  {
    id: 'kody',
    title: 'Kódování znaků',
    path: '/informatika/kody',
    icon: QrCode,
    category: 'informatika'
  },
  {
    id: 'komprese',
    title: 'Komprese dat',
    path: '/informatika/komprese',
    icon: FileArchive,
    category: 'informatika'
  },
  {
    id: 'modely',
    title: 'Modely a grafy',
    path: '/informatika/modely',
    icon: Share2,
    category: 'informatika'
  },
  {
    id: 'os',
    title: 'Operační systémy',
    path: '/informatika/os',
    icon: Monitor,
    category: 'informatika'
  },
  {
    id: 'sifry',
    title: 'Šifrování a bezpečnost',
    path: '/informatika/sifry',
    icon: Lock,
    category: 'informatika'
  },

  // Specializovaná IT - Operační Systémy
  {
    id: 'os-uvod',
    title: 'Úvod do OS',
    path: '/specializovana/operacni-systemy/uvod',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-arch',
    title: 'Architektura OS',
    path: '/specializovana/operacni-systemy/architektura',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-vyvoj',
    title: 'Vývoj OS',
    path: '/specializovana/operacni-systemy/vyvoj',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-boot',
    title: 'Bootování',
    path: '/specializovana/operacni-systemy/boot',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-fs',
    title: 'Souborové systémy',
    path: '/specializovana/operacni-systemy/souborove-systemy',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-install',
    title: 'Instalace',
    path: '/specializovana/operacni-systemy/instalace',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-proc',
    title: 'Procesy',
    path: '/specializovana/operacni-systemy/procesy',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-hw',
    title: 'Hardware a OS',
    path: '/specializovana/operacni-systemy/hardware',
    icon: Server,
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  
  // Specializovaná IT - Programování
  {
    id: 'spec-prog',
    title: 'Programování',
    path: '/specializovana/programovani',
    icon: Terminal,
    category: 'specializovana'
  }
];

export const getChapterById = (id: string) => {
  return CURRICULUM.find(c => c.id === id);
};

export const getNextChapter = (currentId: string) => {
  const currentIndex = CURRICULUM.findIndex(c => c.id === currentId);
  if (currentIndex === -1 || currentIndex === CURRICULUM.length - 1) return null;
  // Pokusit se najít další v rámci stejné kategorie
  const currentCategory = CURRICULUM[currentIndex].category;
  return CURRICULUM.slice(currentIndex + 1).find(c => c.category === currentCategory) || null;
};

export const getPrevChapter = (currentId: string) => {
  const currentIndex = CURRICULUM.findIndex(c => c.id === currentId);
  if (currentIndex <= 0) return null;
  const currentCategory = CURRICULUM[currentIndex].category;
  // Hledáme pozpátku
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (CURRICULUM[i].category === currentCategory) return CURRICULUM[i];
  }
  return null;
};
