/**
 * Centralizovaný registr a generátor klíčů pro localStorage v aplikaci IntLab.
 * Zabraňuje kolizím klíčů mezi předměty, kapitolami, pracovními listy a testy.
 */
export const STORAGE_KEYS = {
  /** Obecný klíč pro jméno studenta napříč pracovními listy */
  STUDENT_NAME: 'intlab:student:name',

  /** Stav splnění úkolu ve Scratchi (PRG 1) */
  scratchTask: (taskId: string) => `scratch-task-${taskId}-completed`,

  /** Stav splnění úkolu v Pythonu (PRG 2) */
  pythonTask: (lessonPrefix: string, taskId: string) => `${lessonPrefix}-task-${taskId}`,

  /** Stav pracovního listu podle předmětu, kapitoly a pole */
  worksheet: (subject: string, chapter: string, field: string) =>
    `intlab:${subject}:${chapter}:${field}`,

  /** Stav hodnoceného testu / písemky */
  test: (subject: string, testId: string, field: string) =>
    `intlab:test:${subject}:${testId}:${field}`,

  /** Stav opakovacího kvízu k tématu (TopicReviewQuiz) */
  quiz: (quizId: string) => `intlab:quiz:${quizId}`,
} as const;

