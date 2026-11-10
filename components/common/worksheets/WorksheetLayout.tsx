import React from 'react';
import { Download, Trash2, CheckCircle2, Info } from 'lucide-react';

interface WorksheetLayoutProps {
  title: string;
  studentName: string;
  onStudentNameChange: (name: string) => void;
  onDownload: () => void;
  onClearAll?: () => void;
  saveStatus?: string;
  children: React.ReactNode;
}

export const WorksheetLayout: React.FC<WorksheetLayoutProps> = ({ 
  title, 
  studentName, 
  onStudentNameChange, 
  onDownload, 
  onClearAll,
  saveStatus,
  children 
}) => {
  const isNameEmpty = !studentName.trim();

  const handleDownloadClick = () => {
    if (isNameEmpty) {
      alert('Nejprve prosím vyplňte své jméno a příjmení v horní liště listu.');
      return;
    }
    onDownload();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 text-left">
      {/* Horní hlavička studenta a akce */}
      <div className="p-6 bg-slate-50/80 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Jméno a příjmení studenta
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => onStudentNameChange(e.target.value)}
            placeholder="Zadejte své jméno a příjmení..."
            className="w-full max-w-md px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-800 font-bold focus:border-indigo-600 focus:outline-none transition-colors shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {saveStatus && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saveStatus}
            </span>
          )}

          <button
            onClick={handleDownloadClick}
            className={`flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-xs text-white ${
              isNameEmpty ? 'bg-slate-400 hover:bg-slate-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            title="Stáhnout vyplněný protokol ve formátu Microsoft Word"
          >
            <Download className="w-4 h-4" />
            <span>Exportovat do Wordu (.doc)</span>
          </button>

          {onClearAll && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-colors text-xs cursor-pointer"
              title="Smazat všechny zadané odpovědi"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vymazat list</span>
            </button>
          )}
        </div>
      </div>

      {/* Informační lišta o uložení stavu */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 text-xs text-indigo-900 leading-relaxed shadow-xs">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Praktický laboratorní protokol: {title}</span>
          <p className="text-slate-600 text-xs mt-0.5">
            Veškerá zaškrtnutí a vyplněné odpovědi se <strong>automaticky ukládají do paměti vašeho prohlížeče</strong>.
            Po dokončení všech úkolů klikněte na tlačítko <strong>Exportovat do Wordu (.doc)</strong> a hotový soubor odevzdejte vyučujícímu.
          </p>
        </div>
      </div>

      {/* Specifický obsah kapitoly (úkoly) */}
      <div className="worksheet-content space-y-6">
        {children}
      </div>

      {/* Spodní tlačítko na stažení pro studenty na konci dokumentu */}
      <div className="mt-12 flex flex-col items-center border-t-2 border-slate-100 pt-8">
        <button
          onClick={handleDownloadClick}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-md text-white text-sm ${
            isNameEmpty ? 'bg-slate-400 hover:bg-slate-500' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 cursor-pointer'
          }`}
        >
          <Download className="w-5 h-5 flex-shrink-0" />
          <span>{isNameEmpty ? 'Nejprve vyplňte jméno v záhlaví' : 'Exportovat do Wordu (.doc)'}</span>
        </button>
      </div>
    </div>
  );
};
