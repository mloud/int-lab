import React from 'react';

/**
 * Podkapitola (koncová lekce / přímá laboratorní úloha uvnitř složky kapitoly)
 */
export interface SubchapterConfig {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  gradient: string;
  route: string;
  actionLabel?: string;
  orderNumber?: number | string;
  isTest?: boolean;
}

export interface PracticeGameConfig {
  tag: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
  bg?: string;
  route: string;
}

/**
 * Kapitola (téma uvnitř předmětu).
 * Může být buď přímá lekce (hasSubchapters = false),
 * nebo složka obsahující podkapitoly (hasSubchapters = true + pole subchapters).
 */
export interface ChapterConfig {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  gradient: string;
  route: string;
  hasSubchapters?: boolean;
  subchapters?: SubchapterConfig[];
  practiceGames?: PracticeGameConfig[];
  actionLabel?: string;
  variant?: 'default' | 'filled';
  isTest?: boolean;
}

/**
 * Didaktický rozbor učiva předmětu (volitelná součást pro pedagogy i studenty)
 */
export interface SubjectCurriculumAnalysis {
  goal: string; // Hlavní cíl a vize předmětu
  targetProfile: string; // Co je výstupem (profil absolventa / dovednosti v praxi)
  expectedOutcomes: string[]; // Konkrétní vzdělávací výstupy
  steps: Array<{ // Didaktická gradace: jaké kroky a proč
    step: string;
    description: string;
    why: string; // Proč právě tento krok v tomto pořadí
  }>;
  hardwareRequirements?: string[]; // Hardwareové zázemí
  softwareStack?: string[]; // Vývojová prostředí a jazyky
}

/**
 * Předmět (reprezentovaný vyplněnou kartou variant="filled" v ročníku)
 */
export interface SubjectConfig {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  gradient: string;
  route: string;
  actionLabel?: string;
  chapters: ChapterConfig[];
  analysis?: SubjectCurriculumAnalysis;
}

/**
 * Ročník / Třída uvnitř vzdělávací divize
 */
export interface GradeConfig {
  grade: number;
  gradeLabel: string;
  pillColor: string; // např. 'bg-blue-600', 'bg-purple-600', 'bg-emerald-600'
  subjects: SubjectConfig[];
}

/**
 * Školní divize / Větev vzdělávání (velká karta SchoolDivisionCard na Homepage)
 */
export interface DivisionConfig {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  watermarkIcon?: string;
  colorScheme: 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';
  route: string;
  grades: GradeConfig[];
}

/**
 * Kompletní konfigurace školy / školního kurikula
 */
export interface SchoolConfig {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  divisions: DivisionConfig[];
}
