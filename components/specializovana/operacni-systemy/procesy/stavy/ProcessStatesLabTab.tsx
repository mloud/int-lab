'use client';

import React, { useState, useEffect } from 'react';
import { Download, Trash2, CheckCircle2, ClipboardList, Info } from 'lucide-react';
import { ProcessStatesWorksheetAnswers, ProcessStatesCheckedItems } from './ProcessStatesTypes';
import { exportProcessStatesWord } from './worksheet/ProcessStatesWordExport';
import { ProcessStatesTasks } from './worksheet/ProcessStatesTasks';

const STORAGE_KEY = 'intlab_worksheet_process_states';

export default function ProcessStatesLabTab() {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<ProcessStatesWorksheetAnswers>({});
  const [checkedItems, setCheckedItems] = useState<ProcessStatesCheckedItems>({});
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Načtení z localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.studentName) setStudentName(data.studentName);
        if (data.answers) setAnswers(data.answers);
        if (data.checkedItems) setCheckedItems(data.checkedItems);
      }
    } catch (e) {
      console.error('Chyba při načítání protokolu stavů procesů:', e);
    }
  }, []);

  // Automatické ukládání do localStorage
  useEffect(() => {
    try {
      const data = { studentName, answers, checkedItems };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveStatus('Uloženo');
      const timer = setTimeout(() => setSaveStatus(''), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Chyba při ukládání protokolu stavů procesů:', e);
    }
  }, [studentName, answers, checkedItems]);

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckChange = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearAll = () => {
    if (confirm('Opravdu chcete smazat všechny zadané odpovědi v tomto laboratorním protokolu?')) {
      setStudentName('');
      setAnswers({});
      setCheckedItems({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportWord = () => exportProcessStatesWord(studentName, answers, checkedItems);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Horní hlavička: Jméno studenta a akční tlačítka */}
      <div className="p-6 bg-slate-50/90 rounded-3xl border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Jméno a příjmení studenta
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Zadejte své jméno a příjmení..."
            className="w-full max-w-md px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-900 font-bold focus:border-indigo-600 focus:outline-none transition-colors shadow-xs text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {saveStatus && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saveStatus}
            </span>
          )}

          <button
            onClick={handleExportWord}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-xs"
            title="Stáhnout vyplněný protokol ve formátu Microsoft Word"
          >
            <Download className="w-4 h-4" />
            <span>Exportovat do Wordu (.doc)</span>
          </button>

          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-colors text-xs"
            title="Smazat všechny zadané odpovědi"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vymazat</span>
          </button>
        </div>
      </div>

      {/* Didaktický úvod protokolu */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <ClipboardList className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Laboratorní cvičení: Životní cyklus a stavy procesů ve Windows</p>
          <p className="text-blue-800 leading-relaxed">
            Vyzkoušejte si prakticky všech 5 úloh přímo ve svém operačním systému pomocí <strong>Správce úloh</strong>, <strong>Process Exploreru</strong> a příkazové řádky. 
            Odpovědi se průběžně ukládají v prohlížeči. Po dokončení si stáhněte protokol ve Wordu a odevzdejte jej vyučujícímu.
          </p>
        </div>
      </div>

      {/* Samotné úkoly */}
      <ProcessStatesTasks
        answers={answers}
        checkedItems={checkedItems}
        handleAnswerChange={handleAnswerChange}
        handleCheckChange={handleCheckChange}
      />

    </div>
  );
}
