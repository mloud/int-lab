'use client';

import React, { useState, useEffect } from 'react';
import { Download, Trash2, CheckCircle2, Info, ClipboardList } from 'lucide-react';
import { ProcessSwitchingWorksheetAnswers, ProcessSwitchingCheckedItems } from './ProcessSwitchingTypes';
import { exportProcessSwitchingWord } from './worksheet/ProcessSwitchingWordExport';
import { ProcessSwitchingTasks } from './worksheet/ProcessSwitchingTasks';

const STORAGE_KEY = 'intlab_worksheet_process_switching';

export default function ProcessSwitchingLabTab() {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<ProcessSwitchingWorksheetAnswers>({});
  const [checkedItems, setCheckedItems] = useState<ProcessSwitchingCheckedItems>({});
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Načtení stavu z localStorage
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
      console.error('Chyba při načítání pracovního listu střídání procesů:', e);
    }
  }, []);

  // Automatické ukládání změn do localStorage
  useEffect(() => {
    try {
      const data = { studentName, answers, checkedItems };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveStatus('Uloženo');
      const timer = setTimeout(() => setSaveStatus(''), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Chyba při ukládání pracovního listu střídání procesů:', e);
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

  const handleExportWord = () => exportProcessSwitchingWord(studentName, answers, checkedItems);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Horní hlavička: Jméno studenta a akční tlačítka */}
      <div className="p-6 bg-slate-50/90 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Jméno a příjmení studenta
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
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
            <Trash2 className="w-4 h-4" />
            <span>Vymazat list</span>
          </button>
        </div>
      </div>

      {/* Informační lišta o protokolu */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 text-xs text-indigo-900 shadow-xs">
        <ClipboardList className="w-5 h-5 text-indigo-600 shrink-0" />
        <div className="flex-1">
          <span className="font-bold">Praktický list: CPU a přepnutí kontextu (perfmon.exe)</span>
          <span className="text-slate-600 text-xs ml-2">
            Vyplněné údaje se ukládají v prohlížeči. Po vyplnění můžete list exportovat do Wordu (.doc).
          </span>
        </div>
      </div>

      {/* Samotné úkoly */}
      <ProcessSwitchingTasks
        answers={answers}
        checkedItems={checkedItems}
        handleAnswerChange={handleAnswerChange}
        handleCheckChange={handleCheckChange}
      />
    </div>
  );
}
