import React, { useState } from 'react';
import { Grade, Student } from './GradebookTypes';
import { availableSubjects } from './GradebookMockData';
import { getGradeBadgeStyle, calculateWeightedAverage } from './GradeTable';
import { PlusCircle, Trash2, BookOpen, Sparkles, ChevronDown } from 'lucide-react';

interface EditableGradeTableProps {
  student: Student;
  onUpdateGrades: (studentId: string, newGrades: Grade[]) => void;
}

export const EditableGradeTable: React.FC<EditableGradeTableProps> = ({ student, onUpdateGrades }) => {
  const [newSubject, setNewSubject] = useState(availableSubjects[0]);
  const [newGrade, setNewGrade] = useState(1);
  const [newWeight, setNewWeight] = useState(5);
  const [newTopic, setNewTopic] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const newGradeObject: Grade = {
      id: `g${Date.now()}`,
      subject: newSubject,
      grade: newGrade,
      weight: newWeight,
      date: new Date().toISOString().split('T')[0],
      topic: newTopic.trim() || undefined,
    };
    onUpdateGrades(student.id, [...student.grades, newGradeObject]);
    setNewTopic('');
    setShowAddForm(false);
  };

  const handleDeleteGrade = (gradeId: string) => {
    const updatedGrades = student.grades.filter(g => g.id !== gradeId);
    onUpdateGrades(student.id, updatedGrades);
  };

  const activeSubjects = Array.from(new Set(student.grades.map(g => g.subject))).sort();
  const { average: totalAverage, totalWeight: globalWeight } = calculateWeightedAverage(student.grades);

  return (
    <div className="space-y-4 font-sans">
      {/* Horní lišta žáka v učitelském pohledu */}
      <div className="bg-[#EBF3FA] border border-blue-200 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0B3A60]">
            Klasifikace žáka: {student.firstName} {student.lastName}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Třída {student.classGroup || '7.A'}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Celkový průměr: <strong className="text-[#0B3A60]">{totalAverage || '–'}</strong></span>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B3A60] hover:bg-[#082E4D] text-white rounded-lg font-bold text-xs shadow-xs transition-all active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Zavřít formulář' : 'Zadat novou známku'}</span>
        </button>
      </div>

      {/* Formulář pro zápis známky v Bakalářích */}
      {showAddForm && (
        <form
          onSubmit={handleAddGrade}
          className="p-4 bg-white rounded-2xl border-2 border-blue-400 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end animate-in fade-in duration-200"
        >
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Předmět</label>
            <select
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {availableSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Známka (1–5)</label>
            <select
              value={newGrade}
              onChange={e => setNewGrade(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={1}>1 – Výborný</option>
              <option value={2}>2 – Chvalitebný</option>
              <option value={3}>3 – Dobrý</option>
              <option value={4}>4 – Dostatečný</option>
              <option value={5}>5 – Nedostatečný</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Váha (důležitost)</label>
            <select
              value={newWeight}
              onChange={e => setNewWeight(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={10}>Váha 10 (čtvrtletní práce)</option>
              <option value={8}>Váha 8 (velký test)</option>
              <option value={5}>Váha 5 (běžná písemka / zkoušení)</option>
              <option value={3}>Váha 3 (pětiminutovka)</option>
              <option value={2}>Váha 2 (aktivita v hodině)</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Téma / Popis</label>
            <input
              type="text"
              value={newTopic}
              onChange={e => setNewTopic(e.target.value)}
              placeholder="např. Zlomky a desetinná čísla"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              Uložit známku
            </button>
          </div>
        </form>
      )}

      {/* Tabulka známek žáka s možností mazání */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-[#F0F4F8] border-b border-slate-300 flex items-center justify-between">
          <span className="font-black text-[#0B3A60] text-sm uppercase tracking-wide">
            Průběžné známky žáka
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Jako vyučující můžete známku smazat kliknutím na křížek
          </span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-300 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-4 w-44">Předmět</th>
              <th className="py-2.5 px-4">Zapsané známky (klikněte na křížek pro smazání)</th>
              <th className="py-2.5 px-4 text-center w-28">Průměr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {activeSubjects.length > 0 ? (
              activeSubjects.map(subject => {
                const subjectGrades = student.grades
                  .filter(g => g.subject === subject)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(a.date).getTime());
                const { average: subjectAverage } = calculateWeightedAverage(subjectGrades);

                return (
                  <tr key={subject} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800 align-middle">
                      {subject}
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-wrap items-center gap-2">
                        {subjectGrades.map(grade => (
                          <div
                            key={grade.id}
                            className={`relative inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm border group select-none ${getGradeBadgeStyle(
                              grade.grade
                            )}`}
                            title={`${grade.topic || 'Zkoušení'} (${new Date(grade.date).toLocaleDateString('cs-CZ')}, váha ${grade.weight})`}
                          >
                            <span>{grade.grade}</span>
                            <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold px-1 rounded-full shadow-xs leading-tight">
                              {grade.weight}
                            </span>
                            <button
                              onClick={() => handleDeleteGrade(grade.id)}
                              title="Smazat tuto známku"
                              className="absolute -bottom-1.5 -right-1.5 bg-rose-600 hover:bg-rose-700 text-white w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center font-black text-[#0B3A60] text-base align-middle bg-slate-50/50">
                      {subjectAverage || '–'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400">
                  Žák zatím nemá žádné zapsané známky.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
