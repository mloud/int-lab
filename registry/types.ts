import React from 'react';

/**
 * Hlavní doména / oborová oblast
 */
export type SubjectDomain = 
  | 'informatika-obecna'          // Všeobecná informatika (ZŠ)
  | 'informatika-specializovana'; // Specializované IT (SŠ)

/**
 * Tématická kategorie výukového materiálu
 */
export type LessonCategory =
  | 'kodovani-a-sifry'       // Kódy, Šifrování, Bezpečnost
  | 'grafika-a-multimedia'   // RGB barvy, Vektory, Sloupcové grafy
  | 'reprezentace-dat'       // Binární soustava, Jednotky informací
  | 'hardware-a-pocitace'    // Stavba PC, Komponenty, Architektura HW
  | 'operacni-systemy'       // Principy OS, Správa procesů, Paměť, Souborové systémy, Zálohování
  | 'komprese-dat'           // Ztrátová a bezeztrátová komprese, JPEG, Huffman, RLE
  | 'algoritmy-a-modely'     // Grafy, Hledání cesty, Paralelní procesy, Modely
  | 'programovani-python'    // Python od základů po pokročilé struktury
  | 'programovani-scratch'   // Scratch vizuální bloky a 3D herní enginy
  | 'budoucnost-technologii' // IoT, AI, Průmysl 4.0, VR/AR
  | 'kancelarske-aplikace';  // Word, Excel, Tabulky

/**
 * Typ školy
 */
export type SchoolType = 'zs' | 'ss';

/**
 * Cílová úroveň / vzdělávací stupeň
 */
export type TargetAudience = 
  | 'zs-1-stupen'    // 1.–5. třída
  | 'zs-2-stupen'    // 6.–9. třída (prima–kvarta)
  | 'ss-vseobecna'   // Gymnázia / Lycea (všeobecný přehled)
  | 'ss-odborna';    // Odborné IT obory (SOŠ IT)

/**
 * Obtížnost lekce
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/**
 * Typ materiálu
 */
export type LessonContentType = 
  | 'interactive-chapter' // Výkladová kapitola s interaktivními prvky a úkoly
  | 'simulation'          // Samostatná interaktivní simulace / laboratoř
  | 'game'                // Edukační minihra / puzzle
  | 'worksheet'           // Pracovní list / test
  | 'project';            // Dlouhodobější projekt (např. Raycaster)

/**
 * Typ testu / zkoušení
 */
export type WorksheetTabType = 'worksheet' | 'quiz' | 'test' | 'exam';

/**
 * Školní hierarchie umístění lekce:
 * Škola ➔ Obor ➔ Ročník ➔ Předmět ➔ Tématický blok ➔ Kapitola ➔ [Podkapitola] ➔ Lekce
 */
export interface EducationalPath {
  /** Typ školy: Základní (zs) nebo Střední (ss) */
  schoolType: SchoolType;

  /** Oficiální název školy (např. 'Základní škola', 'Střední škola') */
  schoolName: string;

  /** Název oboru / vzdělávacího programu (např. 'Základní vzdělávání', 'Informační technologie') */
  trackName: string;

  /** Číslo ročníku (6, 7, 8, 9 pro ZŠ; 1, 2, 3, 4 pro SŠ) */
  grade: number;

  /** Popisek ročníku pro zobrazení (např. '6. Třída' nebo '2. Ročník') */
  gradeLabel: string;

  /** Název vyučovacího předmětu (např. 'Informatika', 'Operační systémy 1', 'Programování a vývoj her 1') */
  subject: string;

  /** Název uceleného tématického bloku (např. 'Kódy kolem nás', 'Souborové systémy a disky') */
  thematicBlock: string;

  /** Název nadřazené kapitoly */
  chapter: string;

  /** Volitelná podkapitola */
  subchapter?: string;

  /** Název konkrétní lekce v hierarchii */
  lesson: string;
}

/**
 * Konfigurace horních záložek uvnitř lekce dle standardu portálu:
 * Teorie | Simulace | Pracovní list / Kvíz / Zkoušení
 */
export interface LessonTabsConfig {
  /** Obsahuje záložku pro teoretický výklad? */
  hasTheory: boolean;

  /** Obsahuje záložku pro interaktivní simulaci / úlohu? */
  hasSimulation: boolean;

  /** Obsahuje záložku pro pracovní list / zkoušení / kvíz? */
  hasWorksheet: boolean;

  /** Typ zkoušení: pracovní list s exportem do Wordu, interaktivní kvíz nebo test na známky */
  worksheetType?: WorksheetTabType;
}

/**
 * Kompletní definice výukové jednotky v centrálním registru
 */
export interface LessonUnit {
  /** Unikátní identifikátor (např. 'py-podprogramy') */
  id: string;

  /** Název lekce pro zobrazení (např. 'Python: Podprogramy') */
  title: string;

  /** Zkrácený kód / hashtag (např. '#py8') */
  shortCode: string;

  /** Výstižný popis obsahu lekce (dle AGENTS.md pro zobrazení na kartě) */
  description: string;

  /** Nadřazená doména */
  domain: SubjectDomain;

  /** Tématická kategorie */
  category: LessonCategory;

  /** Typ obsahu (kapitola, simulace, hra, projekt) */
  contentType: LessonContentType;

  /** Výchozí / stávající routa v Next.js (pro přímou navigaci a zpětnou kompatibilitu) */
  defaultPath: string;

  /** Název Lucide ikony (např. 'Terminal', 'Cpu', 'FolderOpen', 'Binary') */
  iconName: string;

  /** Vyhledávací klíčová slova (pro fulltext / Fuse.js) */
  keywords: string[];

  /** Obtížnost */
  difficulty: DifficultyLevel;

  /** Doporučená cílová skupina */
  targetAudience: TargetAudience[];

  /** Doporučené ročníky (např. [6, 7] nebo [10, 11]) */
  recommendedGrades?: number[];

  /** Odhadovaný čas v minutách (např. 45 pro vyučovací hodinu) */
  estimatedMinutes?: number;

  /** Plná hierarchická cesta podle školního ŠVP */
  educationalPath: EducationalPath;

  /** Konfigurace záložek (Teorie | Simulace | Pracovní list) */
  tabs: LessonTabsConfig;

  /** Má lekce učitelský / metodický režim s PINem? */
  hasTeacherMode?: boolean;

  /** Lazy loader komponenty pro dynamické vykreslení bez zátěže bundlu */
  componentLoader?: () => Promise<{ default: React.ComponentType<any> }>;
}

// =========================================================================
// HIERARCHICKÝ STROM KURIKULA (Škola ➔ Obor ➔ Ročník ➔ Předmět ➔ Tématický blok ➔ Kapitola ➔ Lekce)
// =========================================================================

export interface CurriculumChapterNode {
  chapter: string;
  subchapter?: string;
  lessons: LessonUnit[];
}

export interface CurriculumThematicBlockNode {
  thematicBlock: string;
  chapters: CurriculumChapterNode[];
}

export interface CurriculumSubjectNode {
  subject: string;
  thematicBlocks: CurriculumThematicBlockNode[];
}

export interface CurriculumGradeNode {
  grade: number;
  gradeLabel: string;
  subjects: CurriculumSubjectNode[];
}

export interface CurriculumTrackNode {
  trackName: string;
  grades: CurriculumGradeNode[];
}

export interface CurriculumSchoolNode {
  schoolType: SchoolType;
  schoolName: string;
  tracks: CurriculumTrackNode[];
}
