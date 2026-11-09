import { LessonUnit } from '../types';

export const ADVANCED_LESSONS: LessonUnit[] = [
  // =========================================================================
  // =========================================================================
  {
    id: 'fs-adv',
    title: '99. Pokročilá témata',
    shortCode: '#fs-adv',
    description: 'Alokační strategie (First/Best Fit) a další komplexní principy z univerzitních osnov.',
    domain: 'informatika-specializovana',
    category: 'operacni-systemy',
    contentType: 'interactive-chapter',
    defaultPath: '/specializovana/operacni-systemy-1/souborove-systemy/pokrocile',
    iconName: 'Database',
    keywords: ['alokace', 'first-fit', 'best-fit', 'ntfs', 'ext4', 'pokročilé'],
    difficulty: 'hard',
    targetAudience: ['ss-odborna'],
    recommendedGrades: [1],
    estimatedMinutes: 45,
    educationalPath: {
      schoolType: 'ss',
      schoolName: 'Střední škola',
      trackName: 'Informační technologie',
      grade: 1,
      gradeLabel: '1. Ročník',
      subject: 'Operační systémy 1',
      thematicBlock: 'Souborové systémy a disky',
      chapter: 'Souborové systémy a disky',
      subchapter: '99. Pokročilá témata',
      lesson: 'Pokročilá témata souborových systémů'
    },
    tabs: {
      hasTheory: true,
      hasSimulation: true,
      hasWorksheet: true,
      worksheetType: 'worksheet'
    },
    componentLoader: () => import('@/components/specializovana/operacni-systemy/souborove-systemy/AdvancedTopicsChapter')
  },
  {
    id: 'modely-kostra',
    title: 'Minimální kostra grafu (Kabelová síť)',
    shortCode: '#mod-mst',
    description: 'Jak propojit všechny počítače v síti za použití co nejméně metrů kabelu.',
    domain: 'informatika-specializovana',
    category: 'algoritmy-a-modely',
    contentType: 'simulation',
    defaultPath: '/informatika/modely/kostra',
    iconName: 'Network',
    keywords: ['kostra', 'kruskal', 'síť', 'kabely', 'optimalizace'],
    difficulty: 'hard',
    targetAudience: ['ss-odborna'],
    recommendedGrades: [2],
    estimatedMinutes: 40,
    educationalPath: {
      schoolType: 'ss',
      schoolName: 'Střední škola',
      trackName: 'Informační technologie',
      grade: 2,
      gradeLabel: '2. Ročník',
      subject: 'Operační systémy 2',
      thematicBlock: 'Topologie a kabelové sítě',
      chapter: 'Topologie a kabelové sítě',
      lesson: 'Minimální kostra grafu (Kabelová síť)'
    },
    tabs: {
      hasTheory: true,
      hasSimulation: true,
      hasWorksheet: true,
      worksheetType: 'worksheet'
    },
    componentLoader: () => import('@/components/informatika/models/MSTTask')
  },
  {
    id: 'modely-paralelni-procesy',
    title: 'Paralelní procesy a kritická cesta',
    shortCode: '#mod-parallel',
    description: 'Plánování úkolů, které mohou běžet současně, a určení úzkého hrdla projektu.',
    domain: 'informatika-specializovana',
    category: 'algoritmy-a-modely',
    contentType: 'simulation',
    defaultPath: '/informatika/modely/paralelni-procesy',
    iconName: 'GitMerge',
    keywords: ['paralelismus', 'gantt', 'kritická cesta', 'plánování', 'procesy'],
    difficulty: 'hard',
    targetAudience: ['ss-odborna'],
    recommendedGrades: [1],
    estimatedMinutes: 40,
    educationalPath: {
      schoolType: 'ss',
      schoolName: 'Střední škola',
      trackName: 'Informační technologie',
      grade: 1,
      gradeLabel: '1. Ročník',
      subject: 'Operační systémy 1',
      thematicBlock: 'Běh programu (Procesy a paměť)',
      chapter: 'Běh programu (Procesy a paměť)',
      subchapter: 'Paralelní procesy a kritická cesta',
      lesson: 'Paralelní procesy a kritická cesta'
    },
    tabs: {
      hasTheory: true,
      hasSimulation: true,
      hasWorksheet: true,
      worksheetType: 'worksheet'
    },
    componentLoader: () => import('@/components/informatika/models/ParallelProcesses')
  },
  {
    id: 'komprese-huffman',
    title: 'Huffmanovo kódování',
    shortCode: '#comp-huff',
    description: 'Bezeztrátová komprese frekvenčním stromem: časté znaky mají kratší kód.',
    domain: 'informatika-specializovana',
    category: 'komprese-dat',
    contentType: 'simulation',
    defaultPath: '/informatika/komprese/algoritmy/huffman',
    iconName: 'GitBranch',
    keywords: ['huffman', 'strom', 'frekvence', 'bezeztrátová', 'kódování'],
    difficulty: 'hard',
    targetAudience: ['ss-odborna'],
    recommendedGrades: [2],
    estimatedMinutes: 45,
    educationalPath: {
      schoolType: 'ss',
      schoolName: 'Střední škola',
      trackName: 'Informační technologie',
      grade: 2,
      gradeLabel: '2. Ročník',
      subject: 'Operační systémy 2',
      thematicBlock: 'Bezeztrátová komprese dat',
      chapter: 'Bezeztrátová komprese dat',
      lesson: 'Huffmanovo kódování'
    },
    tabs: {
      hasTheory: true,
      hasSimulation: true,
      hasWorksheet: true,
      worksheetType: 'worksheet'
    },
    componentLoader: () => import('@/components/informatika/compression/HuffmanGame')
  },
];
