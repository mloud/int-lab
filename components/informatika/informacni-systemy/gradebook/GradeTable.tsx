import React from 'react';
import { Grade } from './GradebookTypes';
import { Award, BookOpen } from 'lucide-react';

interface GradeTableProps {
  grades: Grade[];
  title?: string;
  studentName?: string;
}

export const getGradeBadgeStyle = (grade: number) => {
  switch (grade) {
    case 1:
      return 'bg-emerald-600 text-white border-emerald-700 shadow-xs';
    case 2:
      return 'bg-teal-600 text-white border-teal-700 shadow-xs';
    case 3:
      return 'bg-amber-500 text-white border-amber-600 shadow-xs';
    case 4:
      return 'bg-orange-500 text-white border-orange-600 shadow-xs';
    case 5:
      return 'bg-rose-600 text-white border-rose-700 shadow-xs';
    default:
      return 'bg-slate-600 text-white border-slate-700';
  }
};

export const calculateWeightedAverage = (grades: Grade[]): { average: string | null; totalWeight: number } => {
  const totalProduct = grades.reduce((sum, item) => sum + item.grade * item.weight, 0);
  const totalWeight = grades.reduce((sum, item) => sum + item.weight, 0);
  const average = totalWeight > 0 ? (totalProduct / totalWeight).toFixed(2) : null;
  return { average, totalWeight };
};

export const GradeTable: React.FC<GradeTableProps> = ({ grades, title = 'Průběžná klasifikace', studentName }) => {
  const subjects = Array.from(new Set(grades.map(g => g.subject))).sort();
  const { average: totalAverage, totalWeight: globalWeight } = calculateWeightedAverage(grades);

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden font-sans">
      {/* Bakaláři styl lišty předmětů */}
      <div className="px-5 py-3 bg-[#F0F4F8] border-b border-slate-300 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#0B3A60]" />
          <div>
            <h3 className="font-black text-[#0B3A60] text-sm uppercase tracking-wide">{title}</h3>
            {studentName && <span className="text-xs text-slate-500 font-medium">Žák: {studentName}</span>}
          </div>
        </div>

        {totalAverage && (
          <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Celkový průměr:</span>
            <span className="text-lg font-black text-[#0B3A60]">{totalAverage}</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-300 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-2.5 px-4 w-44">Předmět</th>
              <th className="py-2.5 px-4">Průběžné známky (s váhou v indexu)</th>
              <th className="py-2.5 px-4 text-center w-28">Průměr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {subjects.length > 0 ? (
              subjects.map(subject => {
                const subjectGrades = grades
                  .filter(g => g.subject === subject)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                const { average: subjectAverage } = calculateWeightedAverage(subjectGrades);

                return (
                  <tr key={subject} className="hover:bg-slate-50/70 transition-colors">
                    {/* Název předmětu */}
                    <td className="py-3 px-4 font-bold text-slate-800 align-middle">
                      {subject}
                    </td>

                    {/* Známky v řadě jako v Bakalářích */}
                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-wrap items-center gap-2">
                        {subjectGrades.map(grade => (
                          <div
                            key={grade.id}
                            title={`${grade.topic || 'Zkoušení'} (${new Date(grade.date).toLocaleDateString('cs-CZ')}, váha ${grade.weight})`}
                            className={`relative inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm border cursor-default select-none group transition-transform hover:scale-110 ${getGradeBadgeStyle(
                              grade.grade
                            )}`}
                          >
                            <span>{grade.grade}</span>
                            <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold px-1 rounded-full shadow-xs leading-tight">
                              {grade.weight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Průměr předmětu */}
                    <td className="py-3 px-4 text-center font-black text-[#0B3A60] text-base align-middle bg-slate-50/50">
                      {subjectAverage || '–'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400">
                  Žádné zapsané známky v tomto období.
                </td>
              </tr>
            )}
          </tbody>

          {totalAverage && (
            <tfoot>
              <tr className="bg-[#EBF3FA] border-t-2 border-slate-300 font-bold text-slate-800">
                <td className="py-3 px-4 uppercase tracking-wider text-xs text-[#0B3A60]">
                  Celkový průměr:
                </td>
                <td className="py-3 px-4 text-xs text-slate-500 font-normal">
                  Celkem {grades.length} zapsaných známek (součet vah: {globalWeight})
                </td>
                <td className="py-3 px-4 text-center text-lg font-black text-[#0B3A60]">
                  {totalAverage}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
