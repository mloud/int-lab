/**
 * Univerzální Word (.doc) exportér pro pracovní listy.
 * Z jediného datového schématu (WorksheetSchema) generuje HTML dokument,
 * takže texty úloh nejsou nutné psát zvlášť pro web a pro Word.
 */

export interface WorksheetStep {
  id: string;
  /** Text kroku; podporuje `kód` a **tučné**. */
  text: string;
  /** Volitelné rozbalovací vysvětlení kroku pro studenta. */
  explanation?: string;
}

export type WorksheetQuestion =
  | { id: string; type: 'text' | 'textarea'; label: string; placeholder?: string; description?: string; solution?: string }
  | { id: string; type: 'table'; label: string; columns: string[]; rows: string[] };

export interface WorksheetTask {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  /** Rozšiřující úloha (hvězdička v číslování). */
  bonus?: boolean;
  steps?: WorksheetStep[];
  questions?: WorksheetQuestion[];
}

export interface WorksheetSchema {
  /** Nadpis listu (web i Word). */
  title: string;
  subject: string;
  /** Základ názvu souboru, např. 'Pracovni_list_FAT'. */
  fileName: string;
  /** Klíč v localStorage. */
  storageKey: string;
  /** Volitelný úvodní text / cíl hodiny. */
  intro?: string;
  tasks: WorksheetTask[];
}

export interface WorksheetState {
  studentName: string;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
}

export const EMPTY_WORKSHEET_STATE: WorksheetState = { studentName: '', answers: {}, checked: {} };

/** Klíč buňky tabulky v answers. */
export const tableCellKey = (questionId: string, row: number, col: number) => `${questionId}__${row}_${col}`;

export const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `kód` ➔ <code>, **text** ➔ <strong> (po escapování). */
const inlineToHtml = (text: string): string =>
  escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const multiline = (s: string): string => escapeHtml(s).replace(/\r?\n/g, '<br/>');

export const buildWorksheetHtml = (schema: WorksheetSchema, state: WorksheetState): string => {
  const date = new Date().toLocaleDateString('cs-CZ');

  const tasksHtml = schema.tasks.map(task => {
    const steps = (task.steps ?? []).map(step => {
      const done = state.checked[step.id];
      return `<div class="step"><span class="${done ? 'checked' : 'unchecked'}">[ ${done ? 'X' : ' '} ]</span> ${inlineToHtml(step.text)}</div>`;
    }).join('');

    const questions = (task.questions ?? []).map(q => {
      if (q.type === 'table') {
        const head = q.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
        const rows = q.rows.map((rowLabel, r) => {
          const cells = q.columns.slice(1).map((_, c) =>
            `<td>${multiline(state.answers[tableCellKey(q.id, r, c)] || '')}</td>`).join('');
          return `<tr><td>${inlineToHtml(rowLabel)}</td>${cells}</tr>`;
        }).join('');
        return `<div class="question">${inlineToHtml(q.label)}</div><table border="1"><tr>${head}</tr>${rows}</table>`;
      }
      return `<div class="question">${inlineToHtml(q.label)}</div><div class="answer">${multiline(state.answers[q.id] || '')}</div>`;
    }).join('');

    return `<h2>${escapeHtml(task.number)}. ${escapeHtml(task.title)}</h2><div class="task">${steps}${questions}</div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${escapeHtml(schema.title)}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; line-height: 1.5; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 25px; }
  h1 { color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; font-size: 20pt; }
  h2 { color: #334155; margin-top: 25px; font-size: 14pt; border-left: 4px solid #6366f1; padding-left: 10px; }
  .task { background-color: #f8fafc; padding: 14px; border: 1px solid #e2e8f0; margin-bottom: 18px; }
  .question { font-weight: bold; margin: 8px 0 4px; color: #0f172a; font-size: 11pt; }
  .answer { background-color: #ffffff; padding: 10px; border: 1px solid #cbd5e1; min-height: 45px; font-family: monospace; font-size: 10pt; color: #1e1b4b; }
  .step { margin-bottom: 8px; font-size: 10.5pt; }
  .checked { color: #16a34a; font-weight: bold; }
  .unchecked { color: #94a3b8; }
  .meta { font-size: 11pt; margin-bottom: 20px; color: #475569; }
  table { width: 100%; border-collapse: collapse; margin: 6px 0 10px; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; font-size: 10pt; }
  th { background-color: #e0e7ff; }
  code { font-family: Consolas, monospace; background: #f1f5f9; padding: 1px 4px; }
</style>
</head>
<body>
<h1>${escapeHtml(schema.title)}</h1>
<div class="meta">
  <p><strong>Jméno a příjmení studenta:</strong> ${escapeHtml(state.studentName) || '........................................'}<br/>
  <strong>Datum vypracování:</strong> ${date}<br/>
  <strong>Předmět:</strong> ${escapeHtml(schema.subject)}</p>
</div>
${tasksHtml}
</body>
</html>`;
};

/** Stáhne HTML jako .doc soubor (Word / Google Docs). */
export const downloadWordDoc = (html: string, fileName: string, studentName: string): void => {
  const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_${studentName ? studentName.trim().replace(/\s+/g, '_') : 'Student'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportWorksheetToWord = (schema: WorksheetSchema, state: WorksheetState): void =>
  downloadWordDoc(buildWorksheetHtml(schema, state), schema.fileName, state.studentName);

