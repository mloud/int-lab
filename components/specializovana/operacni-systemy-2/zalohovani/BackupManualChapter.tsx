'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, ArrowRight, Save, Terminal, CalendarClock } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BackupManualChapterProps {
  onBack: () => void;
}

const BackupManualChapter: React.FC<BackupManualChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');
  const [studentName, setStudentName] = useLocalStorage('studentName', '');

  // Pracovní list - stavy
  const [ansCopy, setAnsCopy] = useLocalStorage('backup-ans-copy', '');
  const [ansCopyOk, setAnsCopyOk] = useLocalStorage('backup-ans-copy-ok', '');
  const [ansXcopy, setAnsXcopy] = useLocalStorage('backup-ans-xcopy', '');
  const [ansRobocopy, setAnsRobocopy] = useLocalStorage('backup-ans-robocopy', '');
  const [ansRobocopyCode, setAnsRobocopyCode] = useLocalStorage('backup-ans-robocopy-code', '');
  const [ansFilter, setAnsFilter] = useLocalStorage('backup-ans-filter', '');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  const handleDownload = () => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Pracovní list: Manuální zálohování</title></head>
      <body style="font-family: Calibri, sans-serif;">
        <h1>Pracovní list: Manuální zálohování</h1>
        <p><strong>Student:</strong> ${studentName}</p>
        <hr />
        
        <h2>Úkol 2: Příkaz copy a jeho omezení</h2>
        <p><strong>Zadaný příkaz copy:</strong><br/>${ansCopy}</p>
        <p><strong>Podařilo se příkazu copy přenést i soubory v podsložkách?:</strong><br/>${ansCopyOk}</p>
        
        <h2>Úkol 3: Příkaz xcopy</h2>
        <p><strong>Zadaný příkaz xcopy:</strong><br/>${ansXcopy}</p>

        <h2>Úkol 4: Pokročilé zrcadlení pomocí robocopy</h2>
        <p><strong>Zadaný příkaz robocopy:</strong><br/>${ansRobocopyCode}</p>
        <p><strong>Co se stalo v cílové složce, funguje zrcadlení?:</strong><br/>${ansRobocopy}</p>

        <h2>Úkol 8: Inteligentní záloha s filtrem (Python projekt)</h2>
        <p><strong>Finální podoba příkazu (odfiltrování .tmp):</strong><br/>${ansFilter}</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Manualni_Zalohovani_${studentName.replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <FsChapterShell
      chapterNumber={2}
      totalChapters={5}
      title="Manuální"
      highlight="Zálohování"
      subtitle="Základní příkazy a automatizace pomocí dávkových skriptů a plánovače."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'teorie' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-[2rem] border border-emerald-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Terminal className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Příkazová řádka a skripty</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Administrátoři nepoužívají pro zálohování myš a zkopírovat/vložit. Využívají <strong>dávkové soubory (.bat)</strong>, které obsahují textové příkazy operačnímu systému. Tyto skripty je možné spouštět automaticky ve zvolený čas pomocí <strong>Plánovače úloh (Task Scheduler)</strong>.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Kopírovací příkazy ve Windows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-black text-slate-800 mb-2 font-mono">copy</h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 flex-1">
                Základní příkaz pro kopírování souborů. <strong>Omezení:</strong> Neumí sám o sobě kopírovat celé složky včetně podsložek.
              </p>
              <div className="mt-4 bg-slate-50 p-3 rounded-xl font-mono text-xs text-slate-700">
                copy zdroj\*.* cíl
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-black text-slate-800 mb-2 font-mono">xcopy</h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 flex-1">
                Rozšířený příkaz (eXtended copy), který umí kopírovat i podsložky (přepínač <code>/E</code>). Je pokročilejší, ale stále neumí odstranit soubory v cíli, pokud byly smazány ve zdroji.
              </p>
              <div className="mt-4 bg-slate-50 p-3 rounded-xl font-mono text-xs text-slate-700">
                xcopy zdroj cíl /E /Y
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-blue-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /></div>
              <h3 className="text-xl font-black text-blue-800 mb-2 font-mono">robocopy</h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 flex-1">
                Robustní kopírování. Nejpoužívanější nástroj v praxi. Umí přesně <strong>zrcadlit</strong> složky (přepínač <code>/MIR</code>) – tzn. smazané soubory ve zdroji smaže i v cíli.
              </p>
              <div className="mt-4 bg-blue-50 p-3 rounded-xl font-mono text-xs text-blue-800 border border-blue-100">
                robocopy zdroj cíl /MIR
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 p-6 sm:p-8 rounded-[2rem] border border-amber-100 flex flex-col md:flex-row gap-6 items-start mt-8">
            <div className="w-16 h-16 shrink-0 bg-amber-100 rounded-2xl flex items-center justify-center">
              <CalendarClock className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-900 mb-3">Automatizace (Plánovač úloh)</h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Napsat skript je jen polovina práce. Pomocí nástroje <strong>Task Scheduler</strong> (Plánovač úloh) můžeme Windows nařídit, aby se skript spouštěl sám – například každý den v 16:00, nebo po spuštění počítače. Dokonce mu můžeme předávat i parametry (např. den v týdnu pro udržení denních záloh v oddělených složkách).
              </p>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'list' && (
        <WorksheetLayout
          title="Manuální zálohování"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownload}
        >
          <div className="space-y-12">
            
            {/* Cíl a Prerekvizity */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Cíl cvičení</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">Seznámit se základními příkazy pro zálohování souborů. Vytvořit dávkový skript pro zálohování vybrané složky a zautomatizovat jeho spouštění pomocí Plánovače úloh.</p>
              
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Prerekvizity</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zkontrolujte, že se na síťovém disku nachází tyto složky: <code>Data_Projekt</code>, <code>Diplomka</code>, <code>Python_Projekt</code>.<br/>
                Složky překopírujte do své domovské složky.
              </p>
            </div>

            {/* Úkol 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm">1</span>
                Úkol 1: Ruční archivace do ZIP a obnovení
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-12 space-y-2">
                <li>Na disku <code>D:</code> vytvořte složku <code>D:\Zalohy</code></li>
                <li>Vytvořte ručně záložní archiv: Pravý klik na složku <code>Data_Projekt</code> → <strong>Komprimovat do souboru ZIP</strong> a uložte jej do <code>D:\Zalohy</code>.</li>
                <li>Smažte původní složku <code>Data_Projekt</code>.</li>
                <li>Obnovte složku ze zálohy a následně archiv z <code>D:\Zalohy</code> smažte.</li>
              </ul>
            </div>

            {/* Úkol 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm">2</span>
                Úkol 2: Příkaz copy a jeho omezení
              </h3>
              <p className="text-sm text-slate-600 pl-11">
                Otevřete Příkazovou řádku (cmd) a zkuste zkopírovat veškerý obsah složky <code>Data_Projekt</code> do složky <code>D:\Zalohy\Zaloha_Data_Projekt</code> pomocí příkazu <code>copy</code>.
              </p>
              <div className="pl-11 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zde napište celý příkaz copy, který jste použili:</label>
                  <input
                    type="text"
                    value={ansCopy}
                    onChange={e => setAnsCopy(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Podařilo se příkazu copy přenést i soubory nacházející se v podsložkách?</label>
                  <input
                    type="text"
                    value={ansCopyOk}
                    onChange={e => setAnsCopyOk(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500"
                  />
                </div>
                <p className="text-sm text-rose-600 bg-rose-50 p-3 rounded-xl inline-block mt-2 font-medium">Na konci úkolu smažte složku Zaloha_Data_Projekt!</p>
              </div>
            </div>

            {/* Úkol 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm">3</span>
                Úkol 3: Příkaz xcopy
              </h3>
              <p className="text-sm text-slate-600 pl-11">
                Použijte příkaz <code>xcopy</code> ke zkopírování složky s přepínači <code>/I /E /Y</code>.
              </p>
              <div className="pl-11 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zde napište celý příkaz xcopy, který jste použili:</label>
                  <input
                    type="text"
                    value={ansXcopy}
                    onChange={e => setAnsXcopy(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 font-mono"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <p className="text-sm text-blue-800 leading-relaxed font-medium">
                    Smažte soubor <code>file_1.txt</code> ze zdroje a znovu spusťte xcopy. Je v záloze tento soubor smazán? Zdůvodněte (v duchu), zda je xcopy vhodný k udržování dokonalé kopie složky. Následně obnovte file_1 z koše a smažte zálohu.
                  </p>
                </div>
              </div>
            </div>

            {/* Úkol 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm">4</span>
                Úkol 4: Pokročilé zrcadlení pomocí robocopy
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Vyhledejte k čemu se používá přepínač <code>/MIR</code> (zrcadlení). Proveďte zálohu a vyzkoušejte smazat soubor ve zdroji a spustit znovu.
              </p>
              <div className="pl-11 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zde napište celý příkaz robocopy, který jste použili:</label>
                  <input
                    type="text"
                    value={ansRobocopyCode}
                    onChange={e => setAnsRobocopyCode(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vymažte soubor file_1.txt a znovu spusťte robocopy. Co se stalo v cílové složce, funguje zrcadlení?</label>
                  <input
                    type="text"
                    value={ansRobocopy}
                    onChange={e => setAnsRobocopy(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Úkol 5-7 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm">5+</span>
                Úkol 5, 6 a 7: Tvorba dávkového skriptu (.bat) a Plánovač úloh
              </h3>
              <div className="pl-11 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vytvořte skript <code>zalohuj_projekt.bat</code> s obsahem:
                </p>
                <div className="bg-slate-800 text-emerald-400 p-4 rounded-xl font-mono text-sm leading-loose">
                  @echo off<br/>
                  rem ZDE DOPLNIT ROBOCOPY<br/>
                  echo.<br/>
                  echo Zaloha byla uspesne dokoncena!<br/>
                  pause
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  Následně pomocí nástroje <code>taskschd.msc</code> (Plánovač úloh) nastavte denní automatické spouštění (Úkol 6) a to samé s hodinovým intervalem aplikujte pro složku s vaší diplomkou (Úkol 7).
                </p>
              </div>
            </div>

            {/* Úkol 8 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">8</span>
                Úkol 8: Inteligentní záloha s filtrem (Python projekt)
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Do zálohy se <strong>nesmí zkopírovat</strong> žádný soubor s příponou <code>.tmp</code>. Vyhledejte přepínač pro vyloučení souborů (eXclude Files).
              </p>
              <div className="pl-11 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Napište finální podobu příkazu robocopy s filtrem:</label>
                  <input
                    type="text"
                    value={ansFilter}
                    onChange={e => setAnsFilter(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>
            
            {/* Úkol 9 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">9</span>
                Úkol 9: Denní zálohování s parametrem
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Vytvořte <code>python_denni_zaloha.bat</code>, který přijímá název dne (např. Pondeli) pomocí parametru <code>%1</code>. V plánovači pak vytvořte 5 úloh, kde do kolonky pro argumenty skriptu předáte název příslušného dne.
              </p>
            </div>

          </div>
        </WorksheetLayout>
      )}

    </FsChapterShell>
  );
};

export default BackupManualChapter;
