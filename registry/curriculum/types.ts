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
  actionLabel?: string;
  variant?: 'default' | 'filled';
  isTest?: boolean;
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
