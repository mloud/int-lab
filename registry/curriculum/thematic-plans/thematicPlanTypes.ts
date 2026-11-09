export interface ThematicSubtopic {
  id: string;
  title: string;
  hours: number;
  type: 'teorie' | 'laborator' | 'projekt' | 'test' | 'kombinovane';
  description: string;
  practice: string;
  route?: string;
}

export interface ThematicBlock {
  id: string;
  order: number;
  month: string;
  monthKey: 'zari' | 'rijen' | 'listopad' | 'prosinec' | 'leden' | 'unor' | 'brezen' | 'duben' | 'kveten' | 'cerven';
  weeks: string;
  title: string;
  hours: number;
  theoryHours: number;
  practiceHours: number;
  description: string;
  rvpCompetence: string;
  subtopics: ThematicSubtopic[];
}

export interface ThematicPlan {
  subjectId: 'ops1' | 'ops2' | 'ops3';
  subjectTitle: string;
  gradeLabel: string;
  grade: number;
  totalHours: number;
  weeksCount: number;
  weeklyHours: number;
  academicYear: string;
  fieldCode: string;
  fieldTitle: string;
  blocks: ThematicBlock[];
}

