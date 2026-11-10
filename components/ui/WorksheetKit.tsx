'use client';
import React from 'react';
import { CheckCircle2, PencilLine } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  WorksheetSchema,
  WorksheetState,
  WorksheetTask,
  WorksheetQuestion,
  WorksheetStep,
  EMPTY_WORKSHEET_STATE,
  tableCellKey,
  exportWorksheetToWord,
} from '@/lib/wordExport';
import { renderInline } from '@/components/ui/ChapterKit';

export type { WorksheetSchema, WorksheetState, WorksheetTask, WorksheetQuestion, WorksheetStep };

/* ------------------------------------------------------------------
 * WorksheetKit – deklarativní pracovní list.
 * Z jednoho WorksheetSchema se vykreslí web (včetně automatického
 * ukládání) i Word dokument. Pracovní listy nemají PIN (Pravidlo 7).
 * ------------------------------------------------------------------ */

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-800 font-medium focus:border-indigo-600 focus:outline-none transition-colors shadow-xs bg-white text-sm';

const QuestionField: React.FC<{
  question: WorksheetQuestion;
  answers: Record<string, string>;
  onChange: (key: string, value: string) => void;
}> = ({ question, answers, onChange }) => {
  if (question.type === 'table') {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{renderInline(question.label)}</label>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-800 border-b border-slate-200">
              <tr>{question.columns.map(c => <th key={c} className="p-3 text-left font-black uppercase tracking-wider">{c}</th>)}</tr>
            </thead>
            <tbody>
              {question.rows.map((rowLabel, r) => (
                <tr key={rowLabel} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700">{renderInline(rowLabel)}</td>
                  {question.columns.slice(1).map((_, c) => {
                    const key = tableCellKey(question.id, r, c);
                    return (
                      <td key={key} className="p-2">
                        <input
                          type="text"
                          value={answers[key] || ''}
                          onChange={e => onChange(key, e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-indigo-600 focus:outline-none text-xs"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{renderInline(question.label)}</label>
      {question.description && (
        <p className="text-xs text-slate-500 leading-relaxed">{renderInline(question.description)}</p>
      )}
      {question.type === 'textarea' ? (
        <textarea
          value={answers[question.id] || ''}
          onChange={e => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className={`${inputClass} min-h-[90px] resize-none`}
        />
      ) : (
        <input
          type="text"
          value={answers[question.id] || ''}
          onChange={e => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className={inputClass}
        />
      )}
      {question.solution && (
        <details className="text-xs bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 cursor-pointer">
          <summary className="font-bold text-emerald-800">Zobrazit vzorový postup řešení</summary>
          <p className="mt-2 text-emerald-900 leading-relaxed">{renderInline(question.solution)}</p>
        </details>
      )}
    </div>
  );
};

const WorksheetTaskCard: React.FC<{
  task: WorksheetTask;
  state: WorksheetState;
  onAnswer: (key: string, value: string) => void;
  onToggle: (key: string) => void;
}> = ({ task, state, onAnswer, onToggle }) => {
  const steps = task.steps ?? [];
  const allDone = steps.length > 0 && steps.every(s => state.checked[s.id]);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-white border-2 space-y-6 transition-all shadow-sm ${
      task.bonus ? 'border-amber-300 bg-amber-50/20' : allDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
    }`}>
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <span className={`w-7 h-7 rounded-full ${task.bonus ? 'bg-amber-500' : 'bg-blue-600'} text-white flex items-center justify-center font-black text-xs shrink-0`}>
          {task.number}
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">{task.title}</h3>
          {task.subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{task.subtitle}</p>}
        </div>
      </div>

      {steps.length > 0 && (
        <div className="space-y-2.5 text-xs text-slate-700">
          {steps.map(step => {
            const checked = !!state.checked[step.id];
            return (
              <label
                key={step.id}
                onClick={() => onToggle(step.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  checked ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}} // obslouženo rodičovským labelem/kliknutím
                  className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                />
                <div className="flex-1 space-y-1">
                  <span className="font-bold block leading-relaxed">{renderInline(step.text)}</span>
                  {step.explanation && (
                    <span className="text-xs text-slate-500 block leading-relaxed">{renderInline(step.explanation)}</span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {(task.questions ?? []).length > 0 && (
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <PencilLine className="w-3.5 h-3.5 text-blue-600" /> Vstupní pole pro odpověď:
          </div>
          {(task.questions ?? []).map(q => (
            <QuestionField key={q.id} question={q} answers={state.answers} onChange={onAnswer} />
          ))}
        </div>
      )}
    </div>
  );
};

/** Celý pracovní list vykreslený z jednoho schématu. */
export const DeclarativeWorksheet: React.FC<{ schema: WorksheetSchema }> = ({ schema }) => {
  const [state, setState] = useLocalStorage<WorksheetState>(schema.storageKey, EMPTY_WORKSHEET_STATE);

  const setAnswer = (key: string, value: string) =>
    setState(prev => ({ ...prev, answers: { ...prev.answers, [key]: value } }));
  const toggleStep = (key: string) =>
    setState(prev => ({ ...prev, checked: { ...prev.checked, [key]: !prev.checked[key] } }));

  const handleClearAll = () => {
    if (confirm('Opravdu chcete smazat všechny vyplněné odpovědi v tomto pracovním listu?')) {
      setState(EMPTY_WORKSHEET_STATE);
    }
  };

  const allSteps = schema.tasks.flatMap(t => t.steps ?? []);
  const doneCount = allSteps.filter(s => state.checked[s.id]).length;

  return (
    <WorksheetLayout
      title={schema.title}
      studentName={state.studentName}
      onStudentNameChange={name => setState(prev => ({ ...prev, studentName: name }))}
      onDownload={() => exportWorksheetToWord(schema, state)}
      onClearAll={handleClearAll}
    >
      <div className="space-y-6">
        {schema.intro && (
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-xs">
            {renderInline(schema.intro)}
          </div>
        )}

        {allSteps.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Odpovědi a zaškrtnutí se automaticky ukládají do paměti vašeho prohlížeče</span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
              Splněno: {doneCount} / {allSteps.length} kroků
            </span>
          </div>
        )}

        {schema.tasks.map(task => (
          <WorksheetTaskCard key={task.id} task={task} state={state} onAnswer={setAnswer} onToggle={toggleStep} />
        ))}
      </div>
    </WorksheetLayout>
  );
};
