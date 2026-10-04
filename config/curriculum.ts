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
  keywords?: string[];
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
        keywords: ['rgb', 'cmyk', 'pixely', 'barva', 'míchání'],
    category: 'informatika'
  },
  {
    id: 'binarni',
    title: 'Binární soustava',
    path: '/informatika/binarni',
    icon: Binary,
    description: 'Nuly a jedničky: Základní jazyk počítačů.',
        keywords: ['jedničky', 'nuly', 'číselné', 'soustavy', 'hexadecimální'],
    category: 'informatika'
  },
  {
    id: 'budoucnost',
    title: 'Technologie budoucnosti',
    path: '/informatika/budoucnost',
    icon: Globe,
        description: 'Umělá inteligence, kvantové počítače a sítě.',
    keywords: ['AI', 'umělá inteligence', 'kvantové', 'sítě', '5g', 'iot'],
    category: 'informatika'
  },
  {
    id: 'cary',
    title: 'Vektorová grafika',
    path: '/informatika/cary',
    icon: PenTool,
        description: 'Vektorové kreslení, křivky a rastr.',
    keywords: ['vektor', 'rastr', 'křivky', 'kreslení', 'bezier'],
    category: 'informatika'
  },
  {
    id: 'hardware',
    title: 'Hardware',
    path: '/informatika/hardware',
    icon: Cpu,
        description: 'Stavba počítače, procesor, paměti.',
    keywords: ['cpu', 'ram', 'procesor', 'disk', 'motherboard', 'deska'],
    category: 'informatika'
  },
  {
    id: 'jednotky',
    title: 'Jednotky informací',
    path: '/informatika/jednotky',
    icon: Ruler,
        description: 'Bity, byty a jak se měří data.',
    keywords: ['bit', 'byte', 'megabyte', 'gigabyte', 'data'],
    category: 'informatika'
  },
  {
    id: 'kody',
    title: 'Kódování znaků',
    path: '/informatika/kody',
    icon: QrCode,
        description: 'Znakové sady, ASCII a Unicode.',
    keywords: ['ascii', 'unicode', 'utf-8', 'znaky', 'text'],
    category: 'informatika'
  },
  {
    id: 'komprese',
    title: 'Komprese dat',
    path: '/informatika/komprese',
    icon: FileArchive,
        description: 'Jak zmenšit soubory (ZIP, RAR).',
    keywords: ['zip', 'rar', 'ztrátová', 'neztrátová', 'zmenšení', 'archiv'],
    category: 'informatika'
  },
  {
    id: 'modely',
    title: 'Modely a grafy',
    path: '/informatika/modely',
    icon: Share2,
        description: 'Teorie grafů a sítě.',
    keywords: ['uzly', 'hrany', 'síť', 'graf', 'model'],
    category: 'informatika'
  },
  {
    id: 'os',
    title: 'Operační systémy',
    path: '/informatika/os',
    icon: Monitor,
        description: 'Windows, Linux, macOS.',
    keywords: ['windows', 'linux', 'macos', 'android', 'ios'],
    category: 'informatika'
  },
  {
    id: 'sifry',
    title: 'Šifrování a bezpečnost',
    path: '/informatika/sifry',
    icon: Lock,
        description: 'Bezpečnost, asymetrická kryptografie.',
    keywords: ['hesla', 'kryptografie', 'bezpečnost', 'hacker', 'rsa'],
    category: 'informatika'
  },

  // Specializovaná IT - Operační Systémy
  {
    id: 'os-uvod',
    title: 'Úvod do OS',
    path: '/specializovana/operacni-systemy/uvod',
    icon: Server,
        description: 'Základní principy a rozdělení operačních systémů.',
    keywords: ['kernel', 'jádro', 'funkce os'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-arch',
    title: 'Architektura OS',
    path: '/specializovana/operacni-systemy/architektura',
    icon: Server,
        description: 'Monolitické vs mikro-jádro.',
    keywords: ['architektura', 'monolit', 'mikrojádro', 'ovladače'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-vyvoj',
    title: 'Vývoj OS',
    path: '/specializovana/operacni-systemy/vyvoj',
    icon: Server,
        description: 'Historie od sálových počítačů po mobily.',
    keywords: ['historie', 'vývoj', 'unix', 'dos'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-boot',
    title: 'Bootování',
    path: '/specializovana/operacni-systemy/boot',
    icon: Server,
        description: 'Jak startuje počítač (BIOS, UEFI).',
    keywords: ['boot', 'start', 'bios', 'uefi', 'zavaděč'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-fs',
    title: 'Souborový systém a disky',
    path: '/specializovana/operacni-systemy/souborove-systemy',
    icon: Server,
        description: 'Modul správy souborů: disky, oddíly, FAT, NTFS, ext4 a fragmentace.',
    keywords: ['soubory', 'disk', 'fat32', 'ntfs', 'ext4', 'formátování'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'fs-media',
    title: '1. Paměťová média',
    path: '/specializovana/operacni-systemy/souborove-systemy/media',
    icon: Server,
        description: 'HDD a SSD z pohledu OS: plotny, stopy, sektory, NAND stránky a bloky.',
    keywords: ['hdd', 'ssd', 'sektor', 'stopa', 'plotna', 'nand', 'trim', 'lba'],
    category: 'specializovana',
    parent: { title: 'Souborový systém a disky', path: '/specializovana/operacni-systemy/souborove-systemy' }
  },
  {
    id: 'fs-deleni',
    title: '2. Dělení disku',
    path: '/specializovana/operacni-systemy/souborove-systemy/deleni-disku',
    icon: Server,
        description: 'Oddíly, MBR vs. GPT, formátování a boot sektor.',
    keywords: ['oddíl', 'partition', 'mbr', 'gpt', 'formátování', 'svazek', 'boot sektor', 'efi'],
    category: 'specializovana',
    parent: { title: 'Souborový systém a disky', path: '/specializovana/operacni-systemy/souborove-systemy' }
  },
  {
    id: 'fs-fat',
    title: '3. Alokační jednotka a FAT',
    path: '/specializovana/operacni-systemy/souborove-systemy/alokace-fat',
    icon: Server,
        description: 'Cluster, FAT tabulka, mazání a obnova souborů, NTFS a ext4.',
    keywords: ['cluster', 'alokační jednotka', 'fat', 'fat32', 'exfat', 'ntfs', 'ext4', 'mazání', 'obnova'],
    category: 'specializovana',
    parent: { title: 'Souborový systém a disky', path: '/specializovana/operacni-systemy/souborove-systemy' }
  },
  {
    id: 'fs-frag',
    title: '4. Fragmentace a údržba',
    path: '/specializovana/operacni-systemy/souborove-systemy/fragmentace',
    icon: Server,
        description: 'Vznik fragmentace, defragmentace, TRIM, chkdsk a vadné sektory.',
    keywords: ['fragmentace', 'defragmentace', 'trim', 'chkdsk', 'fsck', 'vadný sektor'],
    category: 'specializovana',
    parent: { title: 'Souborový systém a disky', path: '/specializovana/operacni-systemy/souborove-systemy' }
  },
  {
    id: 'os-install',
    title: 'Instalace',
    path: '/specializovana/operacni-systemy/instalace',
    icon: Server,
        description: 'Instalátor OS.',
    keywords: ['instalace', 'setup', 'windows instalace'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-proc',
    title: 'Procesy',
    path: '/specializovana/operacni-systemy/procesy',
    icon: Server,
        description: 'Jak systém spravuje běžící programy.',
    keywords: ['procesy', 'vlákna', 'task manager', 'správce úloh'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  {
    id: 'os-hw',
    title: 'Hardware a OS',
    path: '/specializovana/operacni-systemy/hardware',
    icon: Server,
        description: 'Přerušení a komunikace s HW.',
    keywords: ['přerušení', 'irq', 'ovladače', 'hardware'],
    category: 'specializovana',
    parent: { title: 'Operační systémy', path: '/specializovana/operacni-systemy' }
  },
  
  // Specializovaná IT - Programování
  {
    id: 'spec-prog',
    title: 'Programování',
    path: '/specializovana/programovani',
    icon: Terminal,
        description: 'Základy vývoje aplikací a her.',
    keywords: ['programování', 'kód', 'vývoj', 'hra'],
    category: 'specializovana'
  },
  {
    id: 'prog-raycaster',
    title: 'Raycaster (3D v 2D)',
    path: '/specializovana/programovani/projekty/raycaster',
    icon: Terminal,
        description: 'Tvorba 3D enginu v 2D prostředí.',
    keywords: ['raycasting', '3d', '2d', 'engine', 'scratch', 'doom', 'wolfenstein'],
    category: 'specializovana',
    parent: {
      title: 'Projekty a vývoj her',
      path: '/specializovana/programovani/projekty'
    }
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


export const SEARCH_INDEX: Chapter[] = [
  ...CURRICULUM,
  {
    id: 'komprese-algoritmy',
    title: 'Kompresní algoritmy',
    path: '/informatika/komprese/algoritmy',
    description: 'Přehled algoritmů pro bezeztrátovou a ztrátovou kompresi.',
    keywords: ['algoritmus', 'komprese', 'huffman', 'rle'],
    category: 'informatika'
  },
  {
    id: 'komprese-huffman',
    title: 'Huffmanovo kódování',
    path: '/informatika/komprese/algoritmy/huffman',
    description: 'Nejznámější algoritmus pro bezeztrátovou kompresi pomocí stromu.',
    keywords: ['huffman', 'strom', 'kódování', 'četnost', 'znaky'],
    category: 'informatika'
  },
  {
    id: 'komprese-formaty',
    title: 'Formáty souborů',
    path: '/informatika/komprese/formaty',
    description: 'Jak počítače ukládají obrázky, text a hudbu.',
    keywords: ['formáty', 'soubory', 'jpeg', 'png', 'mp3'],
    category: 'informatika'
  },
  {
    id: 'komprese-jpeg',
    title: 'Komprese JPEG',
    path: '/informatika/komprese/formaty/jpeg',
    description: 'Jak funguje ztrátová komprese fotografií a obrázků.',
    keywords: ['jpeg', 'jpg', 'fotky', 'ztrátová', 'obrázek'],
    category: 'informatika'
  },
  {
    id: 'komprese-obrazek',
    title: 'Komprese obrázku',
    path: '/informatika/komprese/formaty/obrazek',
    description: 'Interaktivní ukázka zmenšování obrázku.',
    keywords: ['obrázek', 'komprese', 'ukázka', 'pixely'],
    category: 'informatika'
  },
  {
    id: 'komprese-rle',
    title: 'RLE (Run-Length Encoding)',
    path: '/informatika/komprese/formaty/rle',
    description: 'Jednoduchá komprese opakujících se znaků.',
    keywords: ['rle', 'opakování', 'znaky', 'bezeztrátová'],
    category: 'informatika'
  },
  {
    id: 'komprese-text-kroky',
    title: 'Kroky komprese textu',
    path: '/informatika/komprese/formaty/text-kroky',
    description: 'Jak probíhá komprese textového souboru krok za krokem.',
    keywords: ['text', 'kroky', 'postup', 'slovník'],
    category: 'informatika'
  },
  {
    id: 'komprese-velikost',
    title: 'Velikost souborů',
    path: '/informatika/komprese/formaty/velikost',
    description: 'Porovnání velikostí různých typů souborů a formátů.',
    keywords: ['velikost', 'bajty', 'kb', 'mb', 'porovnání'],
    category: 'informatika'
  },
  {
    id: 'komprese-hra',
    title: 'Kompresní hra',
    path: '/informatika/komprese/hra',
    description: 'Zkuste si kompresi v interaktivní hře.',
    keywords: ['hra', 'interaktivní', 'zábava', 'výzva'],
    category: 'informatika'
  },
  {
    id: 'komprese-kontrolni-soucet',
    title: 'Kontrolní součet',
    path: '/informatika/komprese/kontrolni-soucet',
    description: 'Jak ověřit, že se soubor při přenosu nebo kompresi nepoškodil.',
    keywords: ['hash', 'md5', 'crc', 'ověření', 'bezpečnost'],
    category: 'informatika'
  },
  {
    id: 'komprese-text',
    title: 'Komprese textu',
    path: '/informatika/komprese/text',
    description: 'Základy komprese textových dokumentů.',
    keywords: ['text', 'dokument', 'slova', 'slovníková'],
    category: 'informatika'
  }
];
