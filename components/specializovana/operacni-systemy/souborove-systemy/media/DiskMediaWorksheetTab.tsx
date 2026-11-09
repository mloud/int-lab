'use client';

import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadWordDoc } from '@/lib/wordExport';

export const DiskMediaWorksheetTab: React.FC = () => {
  const [studentName, setStudentName] = useLocalStorage<string>('diskmedia_name', '');
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('diskmedia_answers', {});
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('diskmedia_checks', {});

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadWorksheet = () => {
    const date = new Date().toLocaleDateString('cs-CZ');
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pracovní list - Rychlost disků</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 30px; }
    .task { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px; }
    .question { font-weight: bold; margin-bottom: 10px; }
    .answer { background-color: #fff; padding: 10px; border: 1px solid #ddd; min-height: 50px; }
    .step { margin-bottom: 10px; }
    .checked { color: #27ae60; font-weight: bold; }
    .unchecked { color: #7f8c8d; }
  </style>
</head>
<body>
  <h1>Pracovní list: Rychlost disků</h1>
  <p><strong>Jméno a příjmení:</strong> ${studentName || '........................................'}</p>
  <p><strong>Datum:</strong> ${date}</p>
  <h2>1. Zjištění typu disku v PC</h2>
  <div class="task">
    <div class="question">Přesný model disku:</div>
    <div class="answer">${(answers['disk_model'] || '').replace(/\n/g, '<br/>')}</div>
  </div>
  <div class="task">
    <div class="question">Jedná se o SSD, nebo o klasický HDD?</div>
    <div class="answer">${(answers['disk_type'] || '').replace(/\n/g, '<br/>')}</div>
  </div>
  <h2>2. Měření rychlosti (CrystalDiskMark)</h2>
  <div class="task">
    <div class="step"><span class="${checkedItems['w1'] ? 'checked' : 'unchecked'}">[ ${checkedItems['w1'] ? 'X' : ' '} ]</span> Aplikace spuštěna a testy proběhly</div>
    <div class="question">A) Test SEQ1M (Velký soubor)</div>
    <div class="answer">Čtení: ${answers['seq_read'] || '___'} MB/s | Zápis: ${answers['seq_write'] || '___'} MB/s</div>
    <br/>
    <div class="question">B) Test RND4K (Malé soubory)</div>
    <div class="answer">Čtení: ${answers['rnd_read'] || '___'} MB/s | Zápis: ${answers['rnd_write'] || '___'} MB/s</div>
  </div>
  <div class="task">
    <div class="question">Srovnání výsledků (Proč je výsledek B tak nízký?):</div>
    <div class="answer">${(answers['speed_compare'] || '').replace(/\n/g, '<br/>')}</div>
  </div>
  <h2>3. Pro zvídavé (CMD a PowerShell)</h2>
  <div class="task">
    <div class="step"><span class="${checkedItems['w2'] ? 'checked' : 'unchecked'}">[ ${checkedItems['w2'] ? 'X' : ' '} ]</span> Oba příkazy spuštěny (soubory vygenerovány)</div>
    <div class="question">Porovnání rychlosti kopírování velkého souboru (fsutil) vs malých souborů v grafu Windows:</div>
    <div class="answer">${(answers['ps_test'] || '').replace(/\n/g, '<br/>')}</div>
  </div>
</body>
</html>`;
    downloadWordDoc(htmlContent, 'Pracovni_list_Disky', studentName);
  };

  return (
    <WorksheetLayout
      title="Rychlost disků"
      studentName={studentName}
      onStudentNameChange={setStudentName}
      onDownload={downloadWorksheet}
    >
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">1. Zjištění typu disku v PC</h2>
        <p className="text-slate-500 font-medium mb-6">Stiskněte <strong>Ctrl + Shift + Esc</strong> (Správce úloh) ➔ záložka <strong>Výkon</strong> ➔ klikněte vlevo na <strong>Disk</strong>.</p>
        
        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Jaký přesný model disku je ve vašem počítači?</label>
            <input 
              type="text"
              value={answers['disk_model'] || ''}
              onChange={(e) => handleAnswerChange('disk_model', e.target.value)}
              placeholder="Např. NVMe WDC PC SN810..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 transition-all shadow-inner"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Jedná se o SSD, nebo o klasický HDD?</label>
            <input 
              type="text"
              value={answers['disk_type'] || ''}
              onChange={(e) => handleAnswerChange('disk_type', e.target.value)}
              placeholder="Napište typ..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 transition-all shadow-inner"
            />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">2. Měření rychlosti (CrystalDiskMark)</h2>
        <p className="text-slate-500 font-medium mb-6">Spusťte program <strong>CrystalDiskMark</strong>, nechte proběhnout test a opište výsledky.</p>
        
        <div 
          onClick={() => toggleCheck('w1')}
          className={`flex items-start gap-4 p-4 cursor-pointer mb-6 rounded-xl border-2 transition-all ${checkedItems['w1'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
        >
          {checkedItems['w1'] ? (
            <CheckSquare className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <Square className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
          )}
          <span className={`font-medium flex-1 ${checkedItems['w1'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
            Test úspěšně proběhl (Mám k dispozici obě tabulky s výsledky).
          </span>
        </div>

        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-700 mb-3 uppercase text-sm">A) Test SEQ1M (Velký soubor)</h3>
               <div className="space-y-3">
                 <input type="text" value={answers['seq_read'] || ''} onChange={(e) => handleAnswerChange('seq_read', e.target.value)} placeholder="Čtení (MB/s)" className="w-full p-3 rounded-lg border border-slate-300 font-bold" />
                 <input type="text" value={answers['seq_write'] || ''} onChange={(e) => handleAnswerChange('seq_write', e.target.value)} placeholder="Zápis (MB/s)" className="w-full p-3 rounded-lg border border-slate-300 font-bold" />
               </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
               <h3 className="font-bold text-slate-700 mb-3 uppercase text-sm">B) Test RND4K (Tisíce malých souborů)</h3>
               <div className="space-y-3">
                 <input type="text" value={answers['rnd_read'] || ''} onChange={(e) => handleAnswerChange('rnd_read', e.target.value)} placeholder="Čtení (MB/s)" className="w-full p-3 rounded-lg border border-slate-300 font-bold" />
                 <input type="text" value={answers['rnd_write'] || ''} onChange={(e) => handleAnswerChange('rnd_write', e.target.value)} placeholder="Zápis (MB/s)" className="w-full p-3 rounded-lg border border-slate-300 font-bold" />
               </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Porovnejte výsledky obou testů. Proč je výsledek u testu B u spousty disků mnohem nižší?</label>
            <textarea 
              value={answers['speed_compare'] || ''}
              onChange={(e) => handleAnswerChange('speed_compare', e.target.value)}
              placeholder="Zamyslete se zejména nad chováním klasických plotnových pevných disků (HDD)..."
              className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
            />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">3. Pro zvídavé (Příkazový řádek a PowerShell)</h2>
        <p className="text-slate-500 font-medium mb-6">Testování disků můžete provádět i bez stahování aplikací, pouze pomocí vestavěných nástrojů Windows.</p>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-700 mb-2">A) Vytvoření obřího souboru pro test sekvenčního čtení</h3>
            <p className="text-sm text-slate-500 mb-3">Otevřete Příkazový řádek (CMD) a zadejte příkaz, který okamžitě vytvoří umělý 1GB soubor (1 miliarda bajtů):</p>
            <div className="p-4 bg-slate-800 text-sky-400 font-mono text-sm rounded-xl shadow-inner border border-slate-700 overflow-x-auto select-all cursor-text">
              fsutil file createnew velky_soubor.tmp 1000000000
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-bold text-slate-700 mb-2">B) Vytvoření tisíců drobných souborů (PowerShell)</h3>
            <p className="text-sm text-slate-500 mb-3">Otevřete PowerShell a vygenerujte 1000 malých textových souborů vložením tohoto příkazu:</p>
            <div className="p-4 bg-slate-800 text-emerald-400 font-mono text-sm rounded-xl shadow-inner border border-slate-700 overflow-x-auto select-all cursor-text">
              1..1000 | ForEach-Object {'{'} &quot;Tohle je testovací soubor&quot; {'>'} &quot;maly_soubor_$_.txt&quot; {'}'}
            </div>
          </div>
        </div>

        <div 
          onClick={() => toggleCheck('w2')}
          className={`flex items-start gap-4 p-4 cursor-pointer mb-6 rounded-xl border-2 transition-all ${checkedItems['w2'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
        >
          {checkedItems['w2'] ? (
            <CheckSquare className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <Square className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
          )}
          <span className={`font-medium flex-1 ${checkedItems['w2'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
            Oba příkazy úspěšně vykonány (Soubory vygenerovány).
          </span>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Zkuste ve Windows obě varianty zkopírovat na jiné místo na disku. Co se děje s křivkou v okně kopírování?</label>
          <textarea 
            value={answers['ps_test'] || ''}
            onChange={(e) => handleAnswerChange('ps_test', e.target.value)}
            placeholder="Např. u jednoho velkého souboru křivka poletí stabilně nahoře, zatímco u tisíců malých..."
            className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
          />
        </div>
      </div>
    </WorksheetLayout>
  );
};
