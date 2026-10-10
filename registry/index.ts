export * from './types';
export * from './lessons';

import { LESSON_REGISTRY } from './lessons';
import { LessonUnit, LessonCategory, SubjectDomain, TargetAudience } from './types';

/**
 * Vyhledá výukovou jednotku podle jejího ID
 */
export function getLessonUnitById(id: string): LessonUnit | undefined {
  return LESSON_REGISTRY.find(unit => unit.id === id);
}

/**
 * Vyhledá výukovou jednotku podle zkráceného kódu (např. '#py8' nebo 'py8')
 */
export function getLessonUnitByShortCode(shortCode: string): LessonUnit | undefined {
  const normalized = shortCode.startsWith('#') ? shortCode : `#${shortCode}`;
  return LESSON_REGISTRY.find(
    unit => unit.shortCode.toLowerCase() === normalized.toLowerCase()
  );
}

/**
 * Vyhledá výukovou jednotku podle URL cesty
 */
export function getLessonUnitByPath(path: string): LessonUnit | undefined {
  const cleanPath = path.split('?')[0].split('#')[0];
  return LESSON_REGISTRY.find(unit => unit.defaultPath === cleanPath);
}

/**
 * Vrátí všechny jednotky patřící do konkrétní kategorie
 */
export function getLessonUnitsByCategory(category: LessonCategory): LessonUnit[] {
  return LESSON_REGISTRY.filter(unit => unit.category === category);
}

/**
 * Vrátí všechny jednotky patřící do konkrétní domény (obecná vs specializovaná)
 */
export function getLessonUnitsByDomain(domain: SubjectDomain): LessonUnit[] {
  return LESSON_REGISTRY.filter(unit => unit.domain === domain);
}

/**
 * Vrátí jednotky doporučené pro konkrétní ročník (např. 6 = 6. třída ZŠ)
 */
export function getLessonUnitsByGrade(grade: number): LessonUnit[] {
  return LESSON_REGISTRY.filter(
    unit => unit.recommendedGrades && unit.recommendedGrades.includes(grade)
  );
}

/**
 * Vrátí jednotky pro danou cílovou skupinu (např. 'zs-2-stupen', 'ss-odborna')
 */
export function getLessonUnitsByAudience(audience: TargetAudience): LessonUnit[] {
  return LESSON_REGISTRY.filter(unit => unit.targetAudience.includes(audience));
}

/**
 * Rychlé fulltext vyhledávání v registru (v názvu, popisu, klíčových slovech a kódech)
 */
export function searchLessonUnits(query: string): LessonUnit[] {
  if (!query || query.trim() === '') return LESSON_REGISTRY;
  const q = query.toLowerCase().trim();

  return LESSON_REGISTRY.filter(unit => {
    return (
      unit.title.toLowerCase().includes(q) ||
      unit.description.toLowerCase().includes(q) ||
      unit.shortCode.toLowerCase().includes(q) ||
      unit.keywords.some(k => k.toLowerCase().includes(q))
    );
  });
}

/**
 * Vrátí statistický přehled celého katalogu
 */
export function getLessonRegistryStats() {
  const totalUnits = LESSON_REGISTRY.length;
  const generalCount = LESSON_REGISTRY.filter(u => u.domain === 'informatika-obecna').length;
  const specializedCount = LESSON_REGISTRY.filter(u => u.domain === 'informatika-specializovana').length;

  const categories = LESSON_REGISTRY.reduce((acc, unit) => {
    acc[unit.category] = (acc[unit.category] || 0) + 1;
    return acc;
  }, {} as Record<LessonCategory, number>);

  return {
    totalUnits,
    generalCount,
    specializedCount,
    categories
  };
}

// =========================================================================
// HIERARCHICKÉ FUNKCE KURIKULA
// (Škola ➔ Obor ➔ Ročník ➔ Předmět ➔ Tématický blok ➔ Kapitola ➔ Lekce)
// =========================================================================

import { 
  CurriculumSchoolNode, 
  CurriculumTrackNode, 
  CurriculumGradeNode, 
  CurriculumSubjectNode, 
  CurriculumThematicBlockNode, 
  CurriculumChapterNode,
  SchoolType
} from './types';

/**
 * Sestaví kompletní hierarchický strom kurikula pro zadané jednotky (nebo celý LESSON_REGISTRY).
 */
export function buildCurriculumTree(units: LessonUnit[] = LESSON_REGISTRY): CurriculumSchoolNode[] {
  const schoolMap = new Map<SchoolType, CurriculumSchoolNode>();

  for (const unit of units) {
    const { schoolType, schoolName, trackName, grade, gradeLabel, subject, thematicBlock, chapter, subchapter } = unit.educationalPath;

    // 1. Škola
    if (!schoolMap.has(schoolType)) {
      schoolMap.set(schoolType, {
        schoolType,
        schoolName,
        tracks: []
      });
    }
    const schoolNode = schoolMap.get(schoolType)!;

    // 2. Obor
    let trackNode = schoolNode.tracks.find(t => t.trackName === trackName);
    if (!trackNode) {
      trackNode = { trackName, grades: [] };
      schoolNode.tracks.push(trackNode);
    }

    // 3. Ročník
    let gradeNode = trackNode.grades.find(g => g.grade === grade);
    if (!gradeNode) {
      gradeNode = { grade, gradeLabel, subjects: [] };
      trackNode.grades.push(gradeNode);
    }

    // 4. Předmět
    let subjectNode = gradeNode.subjects.find(s => s.subject === subject);
    if (!subjectNode) {
      subjectNode = { subject, thematicBlocks: [] };
      gradeNode.subjects.push(subjectNode);
    }

    // 5. Tématický blok
    let blockNode = subjectNode.thematicBlocks.find(b => b.thematicBlock === thematicBlock);
    if (!blockNode) {
      blockNode = { thematicBlock, chapters: [] };
      subjectNode.thematicBlocks.push(blockNode);
    }

    // 6. Kapitola (případně podkapitola)
    let chapterNode = blockNode.chapters.find(c => c.chapter === chapter && c.subchapter === subchapter);
    if (!chapterNode) {
      chapterNode = { chapter, subchapter, lessons: [] };
      blockNode.chapters.push(chapterNode);
    }

    // 7. Lekce
    chapterNode.lessons.push(unit);
  }

  // Seřazení ročníků vzestupně
  for (const school of schoolMap.values()) {
    for (const track of school.tracks) {
      track.grades.sort((a, b) => a.grade - b.grade);
    }
  }

  return Array.from(schoolMap.values());
}

/**
 * Vrátí hierarchii pro konkrétní školu (např. 'zs' nebo 'ss').
 */
export function getCurriculumBySchool(schoolType: SchoolType): CurriculumSchoolNode | undefined {
  const schools = buildCurriculumTree();
  return schools.find(s => s.schoolType === schoolType);
}

/**
 * Vrátí seznam všech unikátních vyučovacích předmětů (volitelně filtrováno dle školy).
 */
export function getCurriculumSubjects(schoolType?: SchoolType): string[] {
  const filtered = schoolType 
    ? LESSON_REGISTRY.filter(u => u.educationalPath.schoolType === schoolType)
    : LESSON_REGISTRY;
  
  return Array.from(new Set(filtered.map(u => u.educationalPath.subject)));
}

/**
 * Vrátí všechny lekce pro zadaný předmět.
 */
export function getLessonsBySubject(subject: string): LessonUnit[] {
  return LESSON_REGISTRY.filter(
    u => u.educationalPath.subject.toLowerCase() === subject.toLowerCase()
  );
}

