import React from 'react';
import { Grade } from './GradebookTypes';
import { BookOpen } from 'lucide-react';

interface GradeTableProps {
  grades: Grade[];
  title?: string;
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

export const calculateWeightedAverage = (
  grades: Grade[]
): { average: string | null; totalWeight: number } => {
  const totalProduct = grades.reduce((sum, item) => sum + item.grade * item.weight, 0);
  const totalWeight = grades.reduce((sum, item) => sum + item.weight, 0);
  const average = totalWeight > 0 ? (totalProduct / totalWeight).toFixed(2) : null;
  return { average, totalWeight };
};

export const GradeTable: React.FC<GradeTableProps> = ({
  grades,
  title = 'Průběžná klasifikace',
}) => {
  const subjects = Array.from(new Set(grades.map(g => g.subject))).sort();
  const { average: totalAverage } = calculateWeightedAverage(grades);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden font-sans">
      {/* Hlavička tabulky */}
      <div className="px-6 py-4 bg-[#F0F4F8] border-b-2 border-slate-300 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#0B3A60]" />
          <h3 className="font-black text-[#0B3A60] text-base uppercase tracking-wide">{title}</h3>
        </div>

        {totalAverage && (
          <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-2xl border-2 border-slate-300 shadow-xs">
            <span className="text-sm font-bold text-slate-600">Celkový průměr:</span>
            <span className="text-lg font-black text-[#0B3A60]">{totalAverage}</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/90 border-b-2 border-slate-300 text-sm font-black text-slate-700 uppercase tracking-wider">
              <th className="py-3.5 px-5 w-48">Předmět</th>
              <th className="py-3.5 px-5">Známky (číslo v rohu = váha známky)</th>
              <th className="py-3.5 px-5 text-center w-32">Průměr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-base">
            {subjects.length > 0 ? (
              subjects.map(subject => {
                const subjectGrades = grades
                  .filter(g => g.subject === subject)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                const { average: subjectAverage } = calculateWeightedAverage(subjectGrades);

                return (
                  <tr key={subject} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 font-black text-slate-900 align-middle">
                      {subject}
                    </td>

                    <td className="py-4 px-5 align-middle">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {subjectGrades.map(grade => (
                          <div
                            key={grade.id}
                            title={`${grade.topic || 'Zkoušení'} (${new Date(grade.date).toLocaleDateString('cs-CZ')}, váha ${grade.weight})`}
                            className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-base border-2 cursor-default select-none transition-transform hover:scale-110 shadow-xs ${getGradeBadgeStyle(
                              grade.grade
                            )}`}
                          >
                            <span>{grade.grade}</span>
                            <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-md leading-tight">
                              {grade.weight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-5 text-center font-black text-[#0B3A60] text-lg align-middle bg-slate-50/60">
                      {subjectAverage || '–'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400">
                  Žádné zapsané známky.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
