'use client';
import React, { useState } from 'react';
import { Role } from './GradebookTypes';
import { GradebookTask } from './GradebookTasksTypes';
import {
  CheckCircle2,
  Sparkles,
  Target,
  Compass,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  HelpCircle,
  XCircle,
  Send,
} from 'lucide-react';

interface GradebookTasksPanelProps {
  tasks: GradebookTask[];
  activeTaskId: number;
  completedTaskIds: number[];
  onSelectTask: (taskId: number) => void;
  onCompleteTask: (taskId: number) => void;
  isTaskMode: boolean;
  onToggleTaskMode: (active: boolean) => void;
  onResetTasks: () => void;
}

export const GradebookTasksPanel: React.FC<GradebookTasksPanelProps> = ({
  tasks,
  activeTaskId,
  completedTaskIds,
  onSelectTask,
  onCompleteTask,
  isTaskMode,
  onToggleTaskMode,
  onResetTasks,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<{ taskId: number; isError: boolean; text: string } | null>(
    null
  );

  const currentTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];
  const isCurrentCompleted = completedTaskIds.includes(currentTask.id);
  const isAllCompleted = tasks.length > 0 && tasks.every((t) => completedTaskIds.includes(t.id));

  const currentInput = answers[currentTask.id] || '';

  const handleInputChange = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentTask.id]: val }));
    if (feedback && feedback.taskId === currentTask.id) {
      setFeedback(null);
    }
  };

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = currentInput.trim().toLowerCase();
    if (!cleanInput) return;

    const isCorrect = currentTask.acceptedAnswers.some((ans) => {
      const cleanAns = ans.trim().toLowerCase();
      return cleanInput === cleanAns || cleanInput.includes(cleanAns);
    });

    if (isCorrect) {
      onCompleteTask(currentTask.id);
      setFeedback({
        taskId: currentTask.id,
        isError: false,
        text: 'Výborně! Odpověď je správná.',
      });
    } else {
      setFeedback({
        taskId: currentTask.id,
        isError: true,
        text: 'To bohužel není správně. Zkus se v systému podívat pozorněji!',
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setFeedback(null);
    onResetTasks();
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden mb-6 font-sans">
      {/* HORNÍ LIŠTA: PŘEPÍNAČ REŽIMŮ (VOLNÝ vs. ÚKOLY) */}
      <div className="bg-slate-100/80 px-5 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Režim simulátoru:
          </span>
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => onToggleTaskMode(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                !isTaskMode
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Volná práce</span>
            </button>
            <button
              onClick={() => onToggleTaskMode(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                isTaskMode
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>
                Mise a úkoly ({completedTaskIds.length}/{tasks.length})
              </span>
            </button>
          </div>
        </div>

        {isTaskMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resetovat úkoly</span>
            </button>
          </div>
        )}
      </div>

      {/* OBSAH REŽIMU ÚKOLŮ */}
      {isTaskMode ? (
        <div className="p-5 sm:p-6 space-y-5">
          {/* Krokovací tlačítka 1..5 */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {tasks.map((t) => {
              const isActive = t.id === activeTaskId;
              const isDone = completedTaskIds.includes(t.id);

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTask(t.id);
                    setFeedback(null);
                  }}
                  className={`py-2.5 px-3 rounded-2xl border-2 text-left transition-all flex flex-col sm:flex-row sm:items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md ring-2 ring-indigo-200'
                      : isDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:border-emerald-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl text-sm font-black flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-white text-indigo-700'
                        : isDone
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isDone && !isActive ? '✓' : t.id}
                  </span>
                  <span className="text-sm font-black truncate hidden sm:inline">
                    {t.roleRequired}
                  </span>
                </button>
              );
            })}
          </div>

          {/* KARTA AKTUÁLNÍHO ÚKOLU */}
          <div className="bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/70 p-6 rounded-3xl border-2 border-indigo-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-100">
              <span className="text-sm font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3.5 py-1.5 rounded-xl">
                Cíl: {currentTask.title}
              </span>

              {isCurrentCompleted ? (
                <span className="text-sm font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-1.5 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Splněno!</span>
                </span>
              ) : (
                <span className="text-sm font-bold text-slate-600 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>
                    {currentTask.isActionTask
                      ? 'Čeká na provedení v systému'
                      : 'Čeká na splnění a vyplnění odpovědi'}
                  </span>
                </span>
              )}
            </div>

            {/* Zadání cíle mise */}
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                👉 {currentTask.goal}
              </div>
            </div>

            {/* AKČNÍ ÚKOL V SYSTÉMU (BEZ TEXTOVÉ ODPOVĚDI) NEBO INTERAKTIVNÍ FORMULÁŘ */}
            {currentTask.isActionTask ? (
              <div className="bg-emerald-50/80 border-2 border-emerald-200 p-5 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-sm sm:text-base font-bold text-slate-800">
                    {isCurrentCompleted ? (
                      <span className="text-emerald-800 font-black flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        Nový rodič s přiřazenými dětmi byl úspěšně vytvořen v databázi!
                      </span>
                    ) : (
                      <span className="text-slate-700 flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                        V sekci Správa uživatelů vytvořte rodiče se 2 dětmi dle zadání výše.
                      </span>
                    )}
                  </div>

                  {isCurrentCompleted && activeTaskId < tasks.length && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTask(activeTaskId + 1);
                        setFeedback(null);
                      }}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>Přejít na další úkol</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleCheckAnswer}
                className="bg-indigo-50/80 border-2 border-indigo-200 p-5 rounded-2xl space-y-4"
              >
                <div className="flex items-start gap-2.5 text-base sm:text-lg font-black text-indigo-950">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Otázka k vyřešení: {currentTask.question}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    disabled={isCurrentCompleted}
                    className="flex-1 px-5 py-3 text-base sm:text-lg bg-white border-2 border-indigo-300 rounded-2xl focus:border-indigo-600 focus:outline-hidden font-bold text-slate-900 disabled:bg-slate-100 disabled:text-slate-600"
                  />

                  {!isCurrentCompleted ? (
                    <button
                      type="submit"
                      disabled={!currentInput.trim()}
                      className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Ověřit odpověď</span>
                    </button>
                  ) : (
                    activeTaskId < tasks.length && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTask(activeTaskId + 1);
                          setFeedback(null);
                        }}
                        className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <span>Přejít na další úkol</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>

                {/* Zpětná vazba po ověření */}
                {feedback && feedback.taskId === currentTask.id && (
                  <div
                    className={`p-4 rounded-2xl text-base font-bold flex items-center gap-2.5 ${
                      feedback.isError
                        ? 'bg-rose-100 text-rose-900 border-2 border-rose-300'
                        : 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                    }`}
                  >
                    {feedback.isError ? (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    <span>{feedback.text}</span>
                  </div>
                )}
              </form>
            )}

            {/* Didaktická pointa po splnění */}
            {isCurrentCompleted && (
              <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-2.5 animate-in fade-in duration-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-emerald-900 mb-0.5">
                    Co jsme si tímto úkolem ověřili:
                  </strong>
                  <span>{currentTask.didacticPoint}</span>
                </div>
              </div>
            )}
          </div>

          {/* Všechny úkoly splněny */}
          {isAllCompleted && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-amber-300 shrink-0" />
                <div>
                  <h4 className="text-base font-black">Gratulujeme! Všechny úkoly jsou splněny!</h4>
                  <p className="text-xs text-emerald-100 font-medium">
                    Prošel jsi všemi rolemi v systému Bakaláři – jako žák, rodič, učitel i správce
                    školy – a úspěšně jsi vyřešil všechny kontrolní otázky.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* VOLNÝ PRŮZKUM - STRUČNÝ INFOBOX */
        <div className="p-4 px-6 text-xs text-slate-600 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-slate-500" />
            <span>
              <strong>Režim volné práce:</strong> Můžeš libovolně procházet a testovat systém pod
              jakýmkoliv účtem bez sledování úkolů.
            </span>
          </div>
          <button
            onClick={() => onToggleTaskMode(true)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer shrink-0"
          >
            Přepnout na mise a úkoly
          </button>
        </div>
      )}
    </div>
  );
};

export default GradebookTasksPanel;
