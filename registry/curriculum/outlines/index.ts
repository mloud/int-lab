import type { OutlineGroup, OutlineItem } from './outlineTypes';
import { OSS1_GROUPS } from './oss1Outlines';
import { OSS2_GROUPS } from './oss2Outlines';
import { OSS3_GROUPS } from './oss3Outlines';

export * from './outlineTypes';
export * from './oss1Outlines';
export * from './oss2Outlines';
export * from './oss3Outlines';

/** Všechny skupiny přehledových podkapitol (OSS 1 + OSS 2 + OSS 3). */
export const ALL_OUTLINE_GROUPS: OutlineGroup[] = [...OSS1_GROUPS, ...OSS2_GROUPS, ...OSS3_GROUPS];

/** Najde podkapitolu podle id kapitoly a slugu (použito přehledovými stránkami). */
export function getOutline(chapterId: string, slug: string): { group: OutlineGroup; item: OutlineItem } | undefined {
  const group = ALL_OUTLINE_GROUPS.find((g) => g.chapterId === chapterId);
  const item = group?.items.find((i) => i.slug === slug);
  return group && item ? { group, item } : undefined;
}
