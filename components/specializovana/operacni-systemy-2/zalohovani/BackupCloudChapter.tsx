'use client';
import React, { useState } from 'react';
import { Cloud, BookOpen, FileText, Smartphone, HardDrive, History, UploadCloud, Monitor } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BackupCloudChapterProps {
  onBack: () => void;
}

const BackupCloudChapter: React.FC<BackupCloudChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');
  const [studentName, setStudentName] = useLocalStorage('studentName', '');

  // Checkboxy pro úkoly
  const [task1, setTask1] = useLocalStorage('cloud-task1', false);
  const [task2, setTask2] = useLocalStorage('cloud-task2', false);
  const [task3, setTask3] = useLocalStorage('cloud-task3', false);
  const [task4, setTask4] = useLocalStorage('cloud-task4', false);

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  const handleDownload = () => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Pracovní list: Cloudové zálohování (Google Drive)</title></head>
      <body style="font-family: Calibri, sans-serif;">
        <h1>Pracovní list: Cloudové zálohování a synchronizace v prostředí Google Drive</h1>
        <p><strong>Student:</strong> ${studentName}</p>
        <hr />
        
        <h2>Splněné úkoly</h2>
        <ul>
          <li><strong>Úkol 1 (Synchronizace lokální složky):</strong> ${task1 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 2 (Streamování souborů):</strong> ${task2 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 3 (Skenování přes mobil):</strong> ${task3 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 4 (Historie verzí):</strong> ${task4 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
        </ul>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Cloud_${studentName.replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <FsChapterShell
      chapterNumber={3}
      totalChapters={5}
      title="Synchronizace"
      highlight="do cloudu"
      subtitle="Používání Google Drive pro počítače, streamování vs. zrcadlení."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'teorie' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-sky-50/50 p-6 sm:p-8 rounded-[2rem] border border-sky-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-sky-100 rounded-2xl flex items-center justify-center">
              <Cloud className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Základní pojmy</h2>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-disc pl-4">
                <li><strong>Cloudové úložiště (Cloud Storage):</strong> Vzdálený diskový prostor na serverech (např. Google), přístupný přes web i aplikaci.</li>
                <li><strong>Synchronizace:</strong> Automatický proces obousměrného zrcadlení dat mezi počítačem a cloudem. Pokud něco smažete na disku, smaže se to i v cloudu a naopak.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Režimy správy místa (Streamování vs. Zrcadlení)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                <UploadCloud className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Streamování souborů</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Soubory jsou uložené <strong>jen v cloudu</strong>, na disku (virtuální G:\) se zobrazují jako virtuální. Stažení probíhá až při otevření. <strong>Nezabírá lokální místo</strong> na disku.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <HardDrive className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Dostupné offline</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vybrané streamované soubory a složky lze manuálně označit (Přístup offline) pro práci bez internetu. <strong>Zabírá místo pouze u vybraných položek.</strong>
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-blue-200 shadow-sm flex flex-col items-center text-center relative">
              <div className="absolute top-0 right-0 p-2"><Monitor className="w-4 h-4 text-blue-400" /></div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-blue-800 mb-2">Zrcadlení souborů</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Všechny soubory jsou trvale uloženy v cloudu i na lokálním disku počítače (klasická synchronizace). <strong>Zabírá plné místo na disku.</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <WorksheetLayout
          title="Cloud a Google Drive"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownload}
        >
          <div className="space-y-12">
            
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
              <h3 className="font-bold text-sky-900 mb-2 text-lg">Cíl a Prerekvizity</h3>
              <p className="text-sm text-sky-800 leading-relaxed mb-4">Osvojit si cloudové zálohování, nastavení režimů (Streamování/Zrcadlení), správu verzí a synchronizaci s mobilem.</p>
              <ul className="text-sm text-sky-800 leading-relaxed list-disc pl-4 space-y-1">
                <li>Nainstalovaná aplikace: Disk Google pro počítače.</li>
                <li>Přihlášení ke svému účtu Google.</li>
                <li>Výchozí nastavení: Zvolen režim Streamovat soubory.</li>
              </ul>
            </div>

            {/* Úkol 1 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-sm">1</span>
                Úkol 1: Synchronizace lokální složky
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Vytvořte lokální složku <code>C:\Skola\</code>. V Předvolbách aplikace Disk Google (Můj počítač) zvolte <strong>Přidat složku</strong> a vyberte ji. Zvolte režim Synchronizovat s Diskem.
              </p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Ve složce <code>C:\Skola\</code> vytvořte <code>Matika.txt</code>.</li>
                <li>Otevřete web Google Disku (Můj počítač), ověřte přítomnost souboru.</li>
                <li>Na webu soubor přejmenujte a zkontrolujte, že se přejmenoval i na lokálním disku.</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task1} onChange={e => setTask1(e.target.checked)} className="w-5 h-5 text-sky-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

            {/* Úkol 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-sm">2</span>
                Úkol 2: Streamování a kontrola virtuálního disku
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Vyzkoušejte si, jak se streamované soubory chovají. V Příkazovém řádku vytvořte 3 soubory:
              </p>
              <div className="pl-11 space-y-4">
                <div className="bg-slate-800 text-sky-400 p-4 rounded-xl font-mono text-xs leading-loose">
                  fsutil file createnew music.mp3 5242880<br/>
                  fsutil file createnew video.avi 10485760<br/>
                  fsutil file createnew obrazek.jpg 1048576
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Na webu Disku Google vytvořte složku <code>Streamovane soubory</code> a nahrajte tyto 3 soubory. Následně v počítači otevřete virtuální disk <code>G:\Můj disk\Streamovane soubory\</code> a vyhledejte je. Všimněte si, že mají ikonu obláčku (nezabírají místo).
                </p>
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task2} onChange={e => setTask2(e.target.checked)} className="w-5 h-5 text-sky-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

            {/* Úkol 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-sm">3</span>
                Úkol 3: Skenování mobilem a okamžitá dostupnost
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Otevřete aplikaci Disk Google na mobilu, klepněte na <strong>+</strong> a zvolte <strong>Skenovat</strong>. Naskenujte papírový dokument a uložte jako PDF. Přejděte k počítači (disk <code>G:</code>) a ověřte, že je soubor okamžitě dostupný bez posílání přes kabel či e-mail.
              </p>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task3} onChange={e => setTask3(e.target.checked)} className="w-5 h-5 text-sky-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

            {/* Úkol 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-sm">4</span>
                Úkol 4: Obnovení starší verze (Historie verzí)
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Při chybě můžeme soubor obnovit ze zálohy verze, kterou si Google ukládá sám.
              </p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Vytvořte Google Dokument <code>Projekt_dokumentace</code>, napište do něj: <em>Původní verze dokumentu v1 – Stabilní stav.</em></li>
                <li>Počkejte na uložení. Změňte text na: <em>Chybná úprava v2 – Tento text obsahuje chyby.</em></li>
                <li>V menu dejte <strong>Soubor -{'>'} Historie verzí -{'>'} Zobrazit historii verzí</strong>.</li>
                <li>Vyberte starší verzi z pravého panelu a obnovte ji.</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task4} onChange={e => setTask4(e.target.checked)} className="w-5 h-5 text-sky-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

          </div>
        </WorksheetLayout>
      )}

    </FsChapterShell>
  );
};

export default BackupCloudChapter;
