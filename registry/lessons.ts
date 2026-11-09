import { LessonUnit } from './types';
import { ALL_OUTLINE_GROUPS, outlineToLessons } from './curriculum/outlines';
import { ZS_6_TO_8_LESSONS } from './lessons/zs6to8Lessons';
import { ZS_9_LESSONS } from './lessons/zs9Lessons';
import { OSS1_LESSONS } from './lessons/oss1Lessons';
import { OSS2_LESSONS } from './lessons/oss2Lessons';
import { PRG1_SCRATCH_LESSONS } from './lessons/prg1ScratchLessons';
import { PRG2_PYTHON_LESSONS } from './lessons/prg2PythonLessons';
import { ADVANCED_LESSONS } from './lessons/advancedLessons';

/** Přehledové podkapitoly OSS 2 a OSS 3 (zatím jen stručná teorie) – generováno z outline dat. */
const OUTLINE_LESSONS: LessonUnit[] = outlineToLessons(ALL_OUTLINE_GROUPS);

export const LESSON_REGISTRY: LessonUnit[] = [
  ...ZS_6_TO_8_LESSONS,
  ...ZS_9_LESSONS,
  ...OSS1_LESSONS,
  ...PRG2_PYTHON_LESSONS,
  ...OSS2_LESSONS,
  ...PRG1_SCRATCH_LESSONS,
  ...ADVANCED_LESSONS,
  ...OUTLINE_LESSONS,
];
