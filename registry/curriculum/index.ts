export * from './types';
export * from './iconRegistry';
export * from './schools/defaultSchool';

import { SchoolConfig, DivisionConfig, SubjectConfig, ChapterConfig, GradeConfig } from './types';
import { DEFAULT_SCHOOL } from './schools/defaultSchool';

// Aktuálně zvolená škola (do budoucna možnost přepínat z cookie/localstorage/env)
let currentSchool: SchoolConfig = DEFAULT_SCHOOL;

/**
 * Vrátí konfiguraci aktivní školy
 */
export function getActiveSchool(): SchoolConfig {
  return currentSchool;
}

/**
 * Nastaví aktivní školu
 */
export function setActiveSchool(school: SchoolConfig) {
  currentSchool = school;
}

/**
 * Vyhledá divizi podle jejího ID
 */
export function getDivisionById(divisionId: string, school: SchoolConfig = currentSchool): DivisionConfig | undefined {
  return school.divisions.find(d => d.id === divisionId);
}

/**
 * Vyhledá předmět podle jeho ID napříč všemi ročníky a divizemi
 */
export function getSubjectById(subjectId: string, school: SchoolConfig = currentSchool): { subject: SubjectConfig; division: DivisionConfig; grade: GradeConfig } | undefined {
  for (const division of school.divisions) {
    for (const grade of division.grades) {
      const subject = grade.subjects.find(s => s.id === subjectId);
      if (subject) {
        return { subject, division, grade };
      }
    }
  }
  return undefined;
}

/**
 * Vyhledá kapitolu podle jejího ID napříč všemi předměty
 */
export function getChapterById(chapterId: string, school: SchoolConfig = currentSchool): ChapterConfig | undefined {
  for (const division of school.divisions) {
    for (const grade of division.grades) {
      for (const subject of grade.subjects) {
        const chapter = subject.chapters.find(c => c.id === chapterId);
        if (chapter) return chapter;
      }
    }
  }
  return undefined;
}
