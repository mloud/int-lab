'use client';

import React, { useState, useEffect } from 'react';
import { Download, Trash2, CheckCircle2, Info } from 'lucide-react';
import { ProcessIntroWorksheetAnswers, ProcessIntroCheckedItems } from './ProcessIntroTypes';
import { exportProcessIntroWord } from './worksheet/ProcessIntroWordExport';
import { ProcessIntroTasks1to4 } from './worksheet/ProcessIntroTasks1to4';
import { ProcessIntroTasks5to6 } from './worksheet/ProcessIntroTasks5to6';
import { ProcessIntroTasks7to9 } from './worksheet/ProcessIntroTasks7to9';

const STORAGE_KEY = 'intlab_worksheet_process_intro';

export default function ProcessIntroWorksheetTab() {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<ProcessIntroWorksheetAnswers>({});
  const [checkedItems, setCheckedItems] = useState<ProcessIntroCheckedItems>({});
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
      console.error('Chyba při načítání pracovního listu:', e);
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
      console.error('Chyba při ukládání pracovního listu:', e);
    }
  }, [studentName, answers, checkedItems]);

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckChange = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearAll = () => {
    if (confirm('Opravdu chcete smazat všechny vyplněné odpovědi v tomto pracovním listu?')) {
      setStudentName('');
      setAnswers({});
      setCheckedItems({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };


  const handleExportWord = () => exportProcessIntroWord(studentName, answers, checkedItems);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      {/* Horní hlavička studenta a akce */}
      <div className="p-6 bg-slate-50/80 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
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

      {/* Informační lišta o uložení stavu */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 text-xs text-indigo-900 leading-relaxed shadow-xs">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Praktický laboratorní protokol k tématu Procesy a operační paměť</span>
          <p className="text-slate-600 text-xs mt-0.5">
            Veškerá zaškrtnutí a vyplněné odpovědi se <strong>automaticky ukládají do paměti vašeho prohlížeče</strong>.
            Po dokončení všech úkolů klikněte nahoře na tlačítko <strong>Exportovat do Wordu (.doc)</strong> a hotový soubor odevzdejte vyučujícímu.
          </p>
        </div>
      </div>

      <ProcessIntroTasks1to4
        answers={answers}
        checkedItems={checkedItems}
        handleAnswerChange={handleAnswerChange}
        handleCheckChange={handleCheckChange}
      />
      <ProcessIntroTasks5to6
        answers={answers}
        checkedItems={checkedItems}
        handleAnswerChange={handleAnswerChange}
        handleCheckChange={handleCheckChange}
      />
      <ProcessIntroTasks7to9
        answers={answers}
        checkedItems={checkedItems}
        handleAnswerChange={handleAnswerChange}
        handleCheckChange={handleCheckChange}
      />
    </div>
  );
}
