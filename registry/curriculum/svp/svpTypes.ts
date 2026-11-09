// =========================================================================
// ŠKOLNÍ VZDĚLÁVACÍ PROGRAM (ŠVP) PRO INSPIS – OPERAČNÍ SYSTÉMY (1.–3. ROČNÍK)
// Obor: 18-20-M/01 Informační technologie
// Celková dotace: 198 hodin (OSS 1: 66 h · OSS 2: 66 h · OSS 3: 66 h)
// Formát: Struktura Česká školní inspekce (InspIS ŠVP)
// =========================================================================

export interface SvpOutcomeBlock {
  id: string;
  topic: string;
  outcomes: string[];
  content: string[];
  crossThemes: string[];
  hours: number;
}

export interface SvpGradeData {
  gradeLabel: string;
  gradeCode: string;
  totalHours: number;
  blocks: SvpOutcomeBlock[];
}

export interface SvpSharedInfo {
  subjectName: string;
  fieldCode: string;
  fieldName: string;
  evaluation: string;
  keyCompetencies: {
    title: string;
    description: string;
  }[];
  crossCuttingThemes: {
    code: string;
    name: string;
    description: string;
  }[];
  interdisciplinaryRelations: string;
}

