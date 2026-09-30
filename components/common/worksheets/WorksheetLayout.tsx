import React from 'react';
import { CheckSquare, Download } from 'lucide-react';

interface WorksheetLayoutProps {
  title: string;
  studentName: string;
  onStudentNameChange: (name: string) => void;
  onDownload: () => void;
  children: React.ReactNode;
}

export const WorksheetLayout: React.FC<WorksheetLayoutProps> = ({ 
  title, 
  studentName, 
  onStudentNameChange, 
  onDownload, 
  children 
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-sm border-2 border-emerald-100">
        
        {/* Sjednocená hlavička listu */}
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-800 mb-4 uppercase flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-emerald-500 flex-shrink-0" /> {title}
        </h2>
        
        {/* Sjednocené pole pro jméno (Persistent přes nadřazený stav) */}
        <div className="bg-white border-2 border-slate-200 p-4 sm:p-6 rounded-2xl mb-8 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">👨‍🎓</div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Jméno a příjmení studenta</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => onStudentNameChange(e.target.value)}
              placeholder="Např. Jan Novák..." 
              className="w-full text-lg font-bold text-slate-800 placeholder:text-slate-300 border-none focus:ring-0 p-0"
            />
          </div>
        </div>

        {/* Specifický obsah kapitoly */}
        <div className="worksheet-content">
          {children}
        </div>

        {/* Sjednocené tlačítko na stažení */}
        <div className="mt-12 flex flex-col items-center border-t-2 border-slate-100 pt-10">
          <button
            onClick={onDownload}
            disabled={!studentName.trim()}
            className={`flex items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl text-white text-sm sm:text-base ${studentName.trim() ? 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95' : 'bg-slate-300 cursor-not-allowed'}`}
          >
            <Download className="w-6 h-6 flex-shrink-0" />
            <span className="text-center">
              {studentName.trim() ? 'Stáhnout dokument (Word/Google Docs)' : 'Nejprve vyplňte jméno nahoře'}
            </span>
          </button>
          {!studentName.trim() && (
            <p className="text-sm text-slate-500 mt-4 font-medium text-center">Pro stažení listu je nutné vyplnit jméno a příjmení v horní části dokumentu.</p>
          )}
        </div>

      </div>
    </div>
  );
};
