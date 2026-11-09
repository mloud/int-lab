'use client';
import React from 'react';
import { CheckCircle2, CheckSquare, Square, PencilLine } from 'lucide-react';
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
  'w-full p-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 shadow-inner';

const QuestionField: React.FC<{
  question: WorksheetQuestion;
  answers: Record<string, string>;
  onChange: (key: string, value: string) => void;
}> = ({ question, answers, onChange }) => {
  if (question.type === 'table') {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">{renderInline(question.label)}</label>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-indigo-50 text-indigo-900">
              <tr>{question.columns.map(c => <th key={c} className="p-2.5 text-left font-bold">{c}</th>)}</tr>
            </thead>
            <tbody>
              {question.rows.map((rowLabel, r) => (
                <tr key={rowLabel} className="border-t border-slate-100">
                  <td className="p-2.5 font-medium text-slate-700">{renderInline(rowLabel)}</td>
                  {question.columns.slice(1).map((_, c) => {
                    const key = tableCellKey(question.id, r, c);
                    return (
                      <td key={key} className="p-1.5">
                        <input
                          type="text"
                          value={answers[key] || ''}
                          onChange={e => onChange(key, e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
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
        <p className="text-sm text-slate-600 leading-relaxed">{renderInline(question.description)}</p>
      )}
      {question.type === 'textarea' ? (
        <textarea
          value={answers[question.id] || ''}
          onChange={e => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className={`${inputClass} min-h-[85px] resize-none`}
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
    <div className={`p-6 sm:p-8 rounded-3xl border-2 space-y-5 transition-all ${
      task.bonus ? 'border-amber-200 bg-amber-50/30' : allDone ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200 bg-white'
    }`}>
      <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
        <span className={`w-9 h-9 rounded-xl ${task.bonus ? 'bg-amber-500' : 'bg-indigo-600'} text-white flex items-center justify-center font-black text-sm shrink-0`}>
          {task.number}
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">{task.title}</h3>
          {task.subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{task.subtitle}</p>}
        </div>
      </div>

      {steps.length > 0 && (
        <div className="space-y-2">
          {steps.map(step => {
            const checked = !!state.checked[step.id];
            return (
              <button
                key={step.id}
                onClick={() => onToggle(step.id)}
                className={`w-full flex items-start gap-3 text-left p-3 rounded-xl border transition-all ${
                  checked ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                {checked ? <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />}
                <div className="flex-1 space-y-1">
                  <span className="text-sm text-slate-700 leading-relaxed block">{renderInline(step.text)}</span>
                  {step.explanation && (
                    <span className="text-xs text-slate-500 leading-relaxed block">{renderInline(step.explanation)}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {(task.questions ?? []).length > 0 && (
        <div className="pt-4 border-t-2 border-slate-100 space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <PencilLine className="w-3.5 h-3.5 text-indigo-600" /> Vstupní pole pro odpověď:
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

  const allSteps = schema.tasks.flatMap(t => t.steps ?? []);
  const doneCount = allSteps.filter(s => state.checked[s.id]).length;

  return (
    <WorksheetLayout
      title={schema.title}
      studentName={state.studentName}
      onStudentNameChange={name => setState(prev => ({ ...prev, studentName: name }))}
      onDownload={() => exportWorksheetToWord(schema, state)}
    >
      <div className="space-y-8">
        {schema.intro && (
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 text-sm text-indigo-900 leading-relaxed">
            {renderInline(schema.intro)}
          </div>
        )}

        {allSteps.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Odpovědi a zaškrtnutí se automaticky ukládají v tomto prohlížeči
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
              Splněno kroků: {doneCount} / {allSteps.length}
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

