import type { ChapterConfig, SubchapterConfig } from '../types';
import type { LessonUnit } from '../../types';

/**
 * Jedna podkapitola v „přehledovém“ stavu – zatím jen stručná teorie o tom, co se v ní bude učit.
 * Zdroj pravdy pro: kartu podkapitoly v kurikulu, přehledovou stránku (ChapterOutlinePage)
 * i záznam v registru lekcí. Jakmile podkapitola dostane plný obsah, stačí přepsat její page.tsx.
 */
export interface OutlineItem {
  /** Poslední část routy (např. 'terminal') */
  slug: string;
  /** Štítek na kartě (např. 'LX2') */
  tag: string;
  title: string;
  /** Jedna věta – popis na kartě podkapitoly */
  subtitle: string;
  /** Orientační časová dotace (např. '3 h') */
  hours?: string;
  /** 1–2 věty: o čem podkapitola je */
  intro: string;
  /** Co se žák naučí (3–5 bodů) */
  topics: string[];
  /** Simulace a praxe (v pořadí teorie → simulace → praxe) */
  practice: string[];
  /** Na co navazuje (předchozí kapitoly) */
  builds?: string;
  /** Přepsání pořadového čísla na kartě (např. 3 pro BZ3) */
  order?: number | string;
  /** Přepsání ikony skupiny */
  icon?: string;
}

/** Skupina podkapitol patřící do jedné kapitoly předmětu. */
export interface OutlineGroup {
  chapterId: string;
  chapterTitle: string;
  chapterDescription: string;
  chapterTag: string;
  chapterPath: string;
  subjectTitle: string;
  grade: number;
  gradeLabel: string;
  thematicBlock: string;
  icon: string;
  gradient: string;
  items: OutlineItem[];
}

export function outlinePath(group: OutlineGroup, item: OutlineItem): string {
  return `${group.chapterPath}/${item.slug}`;
}

/** Karty podkapitol pro DynamicSubchapterHub. */
export function outlineToSubchapters(group: OutlineGroup): SubchapterConfig[] {
  return group.items.map((item, idx) => ({
    id: `${group.chapterId}-${item.slug}`,
    title: item.title,
    description: item.subtitle,
    tag: item.tag,
    icon: item.icon ?? group.icon,
    gradient: group.gradient,
    route: outlinePath(group, item),
    orderNumber: item.order ?? idx + 1,
    actionLabel: 'Otevřít kapitolu',
  }));
}

/** Karta nové kapitoly (s podkapitolami) pro DynamicSubjectHub. */
export function outlineToChapter(group: OutlineGroup): ChapterConfig {
  return {
    id: group.chapterId,
    title: group.chapterTitle,
    description: group.chapterDescription,
    tag: group.chapterTag,
    icon: group.icon,
    gradient: group.gradient,
    route: group.chapterPath,
    hasSubchapters: true,
    subchapters: outlineToSubchapters(group),
  };
}

/** Záznamy do centrálního registru lekcí (vyhledávání, statistiky). */
export function outlineToLessons(groups: OutlineGroup[]): LessonUnit[] {
  return groups.flatMap((group) =>
    group.items.map((item): LessonUnit => ({
      id: `${group.chapterId}-${item.slug}`,
      title: item.title,
      shortCode: `#${item.tag.toLowerCase()}`,
      description: item.subtitle,
      domain: 'informatika-specializovana',
      category: 'operacni-systemy',
      contentType: 'interactive-chapter',
      defaultPath: outlinePath(group, item),
      iconName: item.icon ?? group.icon,
      keywords: [item.title.toLowerCase(), group.chapterTitle.toLowerCase(), ...item.topics.slice(0, 2).map((t) => t.toLowerCase())],
      difficulty: 'medium',
      targetAudience: ['ss-odborna'],
      recommendedGrades: [group.grade],
      estimatedMinutes: 45,
      educationalPath: {
        schoolType: 'ss',
        schoolName: 'Střední škola',
        trackName: 'Informační technologie',
        grade: group.grade,
        gradeLabel: group.gradeLabel,
        subject: group.subjectTitle,
        thematicBlock: group.thematicBlock,
        chapter: group.chapterTitle,
        subchapter: `${item.tag}. ${item.title}`,
        lesson: item.title,
      },
      tabs: { hasTheory: true, hasSimulation: false, hasWorksheet: false },
    }))
  );
}
