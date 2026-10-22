'use client';
import React, { useState } from 'react';
import { Save, BookOpen, FileText, CheckCircle2, Download, Box, Zap, Layers, Calculator, Activity, HardDrive, Clock } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BackupCobianChapterProps {
  onBack: () => void;
}

const BackupCobianChapter: React.FC<BackupCobianChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');
  const [studentName, setStudentName] = useLocalStorage('studentName', '');

  // Checkboxy pro úkoly
  const [task0, setTask0] = useLocalStorage('cobian-task0', false);
  const [task1, setTask1] = useLocalStorage('cobian-task1', false);
  const [task2, setTask2] = useLocalStorage('cobian-task2', false);
  const [task3, setTask3] = useLocalStorage('cobian-task3', false);
  const [task4, setTask4] = useLocalStorage('cobian-task4', false);
  const [task5, setTask5] = useLocalStorage('cobian-task5', false);
  const [task6, setTask6] = useLocalStorage('cobian-task6', false);

  // Stav simulátoru
  const [simDay, setSimDay] = useState(0);
  const [showRestore, setShowRestore] = useState(false);

  // Odpovědi pro Úkol 5 (Podniková síťová záloha s plánovačem)
  const [ansNetworkPath, setAnsNetworkPath] = useLocalStorage('cobian-ans-netpath', '');
  const [ansScheduleSetting, setAnsScheduleSetting] = useLocalStorage('cobian-ans-sched', '');
  const [ansDay1Log, setAnsDay1Log] = useLocalStorage('cobian-ans-day1', '');
  const [ansDay2Log, setAnsDay2Log] = useLocalStorage('cobian-ans-day2', '');
  const [ansDay3Log, setAnsDay3Log] = useLocalStorage('cobian-ans-day3', '');
  const [ansRestoreLog, setAnsRestoreLog] = useLocalStorage('cobian-ans-restore', '');

  // Odpovědi pro Úkol 6 (Závěrečné otázky)
  const [ansQ1, setAnsQ1] = useLocalStorage('cobian-ans-q1', '');
  const [ansQ2, setAnsQ2] = useLocalStorage('cobian-ans-q2', '');
  const [ansQ3, setAnsQ3] = useLocalStorage('cobian-ans-q3', '');
  const [ansArchiveBit, setAnsArchiveBit] = useLocalStorage('cobian-ans-archive-bit', '');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulace', label: 'Simulátor', icon: Calculator },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  const handleDownload = () => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Pracovní list: Zálohování s Cobian Reflector</title></head>
      <body style="font-family: Calibri, sans-serif;">
        <h1>Pracovní list: Zálohování v aplikaci Cobian Reflector</h1>
        <p><strong>Student:</strong> ${studentName}</p>
        <hr />
        
        <h2>Splněné experimenty</h2>
        <ul>
          <li><strong>Úkol 0 (Instalace jako Služba):</strong> ${task0 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 1 (Plná záloha - princip):</strong> ${task1 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 2 (Inkrementální záloha):</strong> ${task2 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 3 (Diferenciální záloha):</strong> ${task3 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 4 (Komplexní obnova projektu):</strong> ${task4 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 5 (Podniková síťová záloha s plánovačem):</strong> ${task5 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 7 (Archivní bit ve Windows):</strong> ${task6 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
        </ul>

        <h2>Úkol 5: Záznam automatizované síťové zálohy a obnovy projektu</h2>
        <p><strong>Cesta k síťovému disku:</strong><br/>${ansNetworkPath || 'Neuvedeno'}</p>
        <p><strong>Nastavení plánovače v Cobianu:</strong><br/>${ansScheduleSetting || 'Neuvedeno'}</p>
        <p><strong>Log z Dne 1 (Pondělí – Plná záloha s fsutil a pondělním zápisem):</strong><br/>${ansDay1Log || 'Neuvedeno'}</p>
        <p><strong>Log z Dne 2 (Úterý – Inkrementální záloha + úterní zápis):</strong><br/>${ansDay2Log || 'Neuvedeno'}</p>
        <p><strong>Log z Dne 3 (Středa – Inkrementální záloha + export_v1.mp4 a středeční zápis):</strong><br/>${ansDay3Log || 'Neuvedeno'}</p>
        <p><strong>Záznam z obnovy po smazání projektu (Restore):</strong><br/>${ansRestoreLog || 'Neuvedeno'}</p>

        <h2>Úkol 6: Shrnutí & Závěrečné otázky</h2>
        <p><strong>Otázka 1 (Proč by bylo špatné dělat každý den v 17:00 pouze Plnou zálohu na 1 TB disk?):</strong><br/>${ansQ1}</p>
        <p><strong>Otázka 2 (Který typ zálohy trvá nejkratší dobu při vytváření?):</strong><br/>${ansQ2}</p>
        <p><strong>Otázka 3 (Kde v prostředí Cobianu nastavím, aby se záloha ukládala na síťové úložiště NAS?):</strong><br/>${ansQ3}</p>

        <h2>Úkol 7: Archivní bit ve Windows</h2>
        <p><strong>Otázka: Co udělá přírůstková záloha s archivním bitem poté, co soubor úspěšně zkopíruje?</strong><br/>${ansArchiveBit || 'Neuvedeno'}</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Cobian_${studentName.replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <FsChapterShell
      chapterNumber={5}
      totalChapters={5}
      title="Cobian"
      highlight="Reflector"
      subtitle="Zálohovací legenda zdarma pro pokročilé plánování a pochopení typů záloh."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'teorie' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="bg-purple-50/50 p-6 sm:p-8 rounded-[2rem] border border-purple-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Představení: Cobian Reflector</h2>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-disc pl-4">
                <li><strong>Co to je:</strong> Legenda mezi zálohovacími nástroji zdarma, přímý nástupce Cobian Backup.</li>
                <li><strong>K čemu je vhodný:</strong> Automatické zálohování souborů a složek na lokální disk, flashku nebo síťový NAS. <em>Pozn.: Neukládá obraz celého Windows.</em></li>
                <li><strong>Hlavní výhody:</strong> Zcela ZDARMA i pro komerční použití, kompletně v češtině, extrémně lehký na systémové prostředky.</li>
                <li><strong>Kde ho stáhnout:</strong> Oficiální web <code>cobiansoft.com</code></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-2">Tajemství v pozadí: Atribut "Archivovat"</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">Jak zálohovací program pozná, který soubor je nový nebo se změnil od včerejška? Nečte celý jejich obsah. Windows ke každému souboru lepí skrytý štítek (bit) zvaný <strong>Archivovat (A)</strong>.</p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-4 space-y-1">
                <li>Když soubor vytvoříte nebo upravíte, Windows mu nastaví štítek <code>A</code>.</li>
                <li><strong>Plná a Inkrementální záloha</strong> štítky <code>A</code> po zkopírování <strong>vynulují</strong>.</li>
                <li><strong>Rozdílová záloha</strong> data zkopíruje, ale štítek <code>A</code> nechá nastavený. Další den se tedy stejný soubor zkopíruje znovu.</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-2">Proč Profi nástroj místo skriptu?</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">Obyčejné příkazy typu <code>xcopy</code> nebo <code>robocopy</code> selžou, pokud je dokument otevřený v aplikaci. Profi nástroj to řeší chytřeji:</p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-4 space-y-1">
                <li><strong>Běží jako Služba (Service):</strong> Nespouští se jako okénko uživatele, běží trvale na pozadí pod systémovým účtem. Zálohuje i o půlnoci, když je uživatel odhlášen.</li>
                <li><strong>Podpora VSS:</strong> Stejně jako Bod obnovení, i Cobian dokáže využít stínovou kopii (VSS). Umí tak bez problému zálohovat běžící databázi nebo rozečtený Word.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Opakování: Typy záloh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Plná (Full)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Vždy zkopíruje <strong>úplně všechny</strong> vybrané soubory znovu.</p>

              {/* Schema: Full */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">B</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">B</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">C</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Stále se kopíruje všechno znovu (i nezměněné A a B).</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Obnova je nejrychlejší (vše je v jedné složce).</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> Zabírá nejvíce místa a tvorba trvá nejdéle.</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Přírůstková (Incremental)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Zkopíruje jen soubory, které se změnily od <strong>POSLEDNÍ (jakékoliv) zálohy</strong>.</p>

              {/* Schema: Incremental */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Plná)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Jen změna)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Jen změna)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">K obnově středy potřebuji: Po + Út + St.</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Bleskově rychlá, extrémně šetří místo.</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> K obnově musím mít první plnou + VŠECHNY inkrementální kroky.</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Rozdílová (Differential)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Zkopíruje soubory, které se změnily od <strong>POSLEDNÍ PLNÉ zálohy</strong>.</p>

              {/* Schema: Differential */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Plná)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Změna od Po)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">C</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Vše od Po)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">K obnově středy potřebuji jen: Po + St.</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Obnova je snazší než u inkrementu (potřebuji jen plnou + tuto poslední).</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> Roste postupně na velikosti s každým dnem.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'simulace' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="bg-slate-900 p-6 sm:p-8 rounded-[2rem] text-white flex flex-col shadow-xl">
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-purple-400" /> Krokovací simulátor celého týdne
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
              Základní projekt má <strong>100 GB</strong>. Každý další den přibude <strong>5 GB</strong> nových dat. Pomocí tlačítek postupujte dny v týdnu a sledujte, jak se chovají jednotlivé typy záloh – co kopírují v daný den, kolik místa celkem polykají a jak těžká by byla obnova.
            </p>

            {/* Ovladač dnů (Kalendář) */}
            <div className="flex gap-2 w-full mb-6">
              {['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'].map((day, i) => (
                <button
                  key={day}
                  onClick={() => setSimDay(i)}
                  className={`flex-1 py-3 px-1 text-center rounded-xl font-bold transition-all text-xs sm:text-sm ${simDay === i ? 'bg-purple-600 text-white shadow-lg scale-105 z-10' : (simDay > i ? 'bg-purple-900/40 text-purple-200' : 'bg-slate-800 text-slate-500 hover:bg-slate-700')}`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="flex justify-end mb-8">
              <button
                onClick={() => setShowRestore(!showRestore)}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border-2 ${showRestore ? 'bg-rose-600 text-white border-rose-500 shadow-rose-900/50 shadow-lg animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
              >
                <Activity className="w-5 h-5" />
                {showRestore ? 'Skrýt simulátor obnovy' : 'Simulovat Havárii v tento den!'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Pomocná funkce pro vykreslení řádku */}
              {[
                { type: 'full', name: 'Plná', icon: Box, color: 'blue' },
                { type: 'inc', name: 'Inkrementální', icon: Zap, color: 'emerald' },
                { type: 'diff', name: 'Rozdílová', icon: Layers, color: 'amber' }
              ].map(cfg => {
                const Icon = cfg.icon;

                // Součty pro aktuální simDay
                let currentCumulative = 0;
                let currentSteps = 0;

                if (cfg.type === 'full') {
                  for (let j = 0; j <= simDay; j++) currentCumulative += (100 + (j * 5));
                  currentSteps = 1;
                } else if (cfg.type === 'inc') {
                  currentCumulative = 100 + (simDay * 5);
                  currentSteps = simDay + 1;
                } else if (cfg.type === 'diff') {
                  currentCumulative = 100 + (Array.from({ length: simDay }).reduce((acc: number, _, j) => acc + ((j + 1) * 5), 0) as number);
                  currentSteps = simDay === 0 ? 1 : 2;
                }

                return (
                  <div key={cfg.type} className={`bg-white rounded-3xl p-5 shadow-sm border-2 ${cfg.color === 'blue' ? 'border-blue-200' : (cfg.color === 'emerald' ? 'border-emerald-200' : 'border-amber-200')}`}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.color === 'blue' ? 'bg-blue-100 text-blue-600' : (cfg.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600')}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800">{cfg.name}</h3>
                      </div>

                      <div className="flex gap-4">
                        <div className={`px-4 py-2 rounded-xl ${cfg.color === 'blue' ? 'bg-blue-50 text-blue-900' : (cfg.color === 'emerald' ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900')}`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5 opacity-70">Zabráno na disku celkem</span>
                          <div className="text-xl font-black">{currentCumulative} GB</div>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-slate-50 text-slate-800 border border-slate-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5 opacity-70">Potřeba složek k obnově</span>
                          <div className="text-xl font-black">{currentSteps}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((dName, dIdx) => {
                        let cellSize = 0;
                        if (cfg.type === 'full') cellSize = 100 + (dIdx * 5);
                        else if (cfg.type === 'inc') cellSize = dIdx === 0 ? 100 : 5;
                        else if (cfg.type === 'diff') cellSize = dIdx === 0 ? 100 : (dIdx * 5);

                        const isPast = dIdx <= simDay;
                        return (
                          <div key={dIdx} className={`p-2 rounded-xl text-center border-2 transition-all ${isPast ? (dIdx === simDay ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-slate-50') : 'border-dashed border-slate-200 bg-slate-100/50 opacity-40'}`}>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isPast ? 'text-slate-500' : 'text-slate-400'}`}>{dName}</div>
                            {isPast ? (
                              <div className="text-sm font-black text-slate-800">{cellSize} <span className="text-[10px] font-normal">GB</span></div>
                            ) : (
                              <div className="text-sm font-black text-slate-300">-</div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {showRestore && (
                      <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Download className="w-4 h-4 text-rose-500" /> Krok za krokem: Průběh obnovy
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cfg.type === 'full' && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-bold text-xs">Krok 1:</span>
                              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg">Kopíruji složku ze dne: {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][simDay]} ({100 + (simDay * 5)} GB)</div>
                            </div>
                          )}

                          {cfg.type === 'inc' && (
                            <div className="flex flex-wrap items-center gap-2">
                              {Array.from({ length: simDay + 1 }).map((_, idx) => (
                                <React.Fragment key={idx}>
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-bold text-xs">Krok {idx + 1}:</span>
                                    <div className={`${idx === 0 ? 'bg-slate-800' : 'bg-slate-600'} text-white text-xs font-bold px-3 py-2 rounded-lg`}>
                                      {idx === 0 ? 'Kopíruji: Po (100 GB)' : `Přepisuji: ${['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][idx]} (5 GB)`}
                                    </div>
                                  </div>
                                  {idx < simDay && <span className="text-slate-300">→</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          )}

                          {cfg.type === 'diff' && (
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 font-bold text-xs">Krok 1:</span>
                                <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg">Kopíruji: Po (100 GB)</div>
                              </div>
                              {simDay > 0 && (
                                <>
                                  <span className="text-slate-300">→</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-bold text-xs">Krok 2:</span>
                                    <div className="bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg">Přepisuji ze dne: {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][simDay]} ({simDay * 5} GB)</div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <WorksheetLayout
          title="Cobian Reflector"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownload}
        >
          <div className="space-y-12">

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="font-bold text-purple-900 mb-2 text-lg">Cíl hodiny</h3>
              <p className="text-sm text-purple-800 leading-relaxed">Student rozumí principům typů záloh, dokáže nakonfigurovat úlohy a na vlastní oči ověřit rozdíl mezi Plnou, Inkrementální a Diferenciální zálohou.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Příprava prostředí</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">Vytvořte si na ploše složky pro experimenty:</p>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li><code>TEST_ZDROJ</code> (sem vložte 2 soubory, např. Dokument1.txt a Foto1.jpg).</li>
                <li>Hlavní složku <code>Zaloha</code>, a v ní vytvořte tři podsložky: <code>Plna</code>, <code>Inkrementalni</code> a <code>Diferencialni</code>.</li>
              </ul>
            </div>

            {/* Úkol 0 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">0</span>
                Úkol 0: Instalace a spuštění
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Nainstalujte Cobian Reflector z oficiálního webu.</li>
                <li><strong>Klíčový krok:</strong> V průvodci instalací zvolte typ instalace <strong>Jako službu (As a Service)</strong>. Tím zajistíte, že se bude zálohování spouštět samo nezávisle na odhlášeném uživateli.</li>
                <li>Zvolte spuštění služby pod účtem Local System. (Pro lokální disk to stačí. V praxi pro NAS by se zde zadával speciální účet sítě).</li>
                <li>Spusťte grafické uživatelské rozhraní Cobianu z nabídky Start.</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task0} onChange={e => setTask0(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                  <span className="font-bold text-slate-700">Program nainstalován a běží jako Služba ✅</span>
                </label>
              </div>
            </div>

            {/* Úkol 1 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">1</span>
                Úkol 1: Plná (Full) záloha (Ověření principu)
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Vytvořte v Cobianu úlohu <strong>1_Plna</strong>, zvolte typ Plná, jako zdroj <code>TEST_ZDROJ</code> a cíl <code>Zaloha\Plna</code>.</li>
                <li><strong>Pondělí:</strong> Vytvořte v <code>TEST_ZDROJ</code> soubor <em>dokument1.txt</em>. Spusťte zálohu.</li>
                <li><strong>Úterý:</strong> Přidejte <em>dokument2.txt</em>. Spusťte zálohu znovu.</li>
                <li><strong>Středa:</strong> Přidejte <em>dokument3.txt</em>. Spusťte zálohu potřetí.</li>
                <li>Ověřte v cílové složce <code>Zaloha\Plna</code>, že každá nově vytvořená složka (Pondělní, Úterní, Středeční) obsahuje <strong>všechny soubory</strong> platné v daný den (staré i nové).</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task1} onChange={e => setTask1(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                  <span className="font-bold text-slate-700">Ověřeno: Plná záloha vždy kopíruje vše ✅</span>
                </label>
              </div>
            </div>

            {/* Úkol 2 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">2</span>
                Úkol 2: Přírůstková (Incremental) záloha
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li><strong>Příprava:</strong> Smažte obsah <code>TEST_ZDROJ</code> i <code>Zaloha\Inkrementalni</code>. Začínáme od nuly.</li>
                <li>Vytvořte úlohu <strong>2_Inkrementalni</strong> (zdroj <code>TEST_ZDROJ</code>, cíl <code>Zaloha\Inkrementalni</code>).</li>
                <li><strong>Pondělí:</strong> Vytvořte <em>dokument1.txt</em>. Spusťte zálohu (první se provede jako Plná).</li>
                <li><strong>Úterý:</strong> Přidejte <em>dokument2.txt</em>. Spusťte zálohu.</li>
                <li><strong>Středa:</strong> Přidejte <em>dokument3.txt</em>. Spusťte zálohu.</li>
                <li>Ověřte výsledek: V nově vytvořených složkách pro Úterý a Středu by se měl nacházet <strong>vždy pouze jeden nový změněný soubor</strong>!</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task2} onChange={e => setTask2(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                  <span className="font-bold text-slate-700">Ověřeno: Inkrementální kopíruje jen změny od včerejška ✅</span>
                </label>
              </div>
            </div>

            {/* Úkol 3 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">3</span>
                Úkol 3: Rozdílová (Differential) záloha
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li><strong>Příprava:</strong> Smažte obsah <code>TEST_ZDROJ</code> i <code>Zaloha\Diferencialni</code>. Opět čistý stůl.</li>
                <li>Vytvořte úlohu <strong>3_Diferencialni</strong> typu Rozdílová (zdroj <code>TEST_ZDROJ</code>, cíl <code>Zaloha\Diferencialni</code>).</li>
                <li><strong>Pondělí:</strong> Vytvořte <em>dokument1.txt</em>. Spusťte zálohu.</li>
                <li><strong>Úterý:</strong> Přidejte <em>dokument2.txt</em>. Spusťte zálohu.</li>
                <li><strong>Středa:</strong> Přidejte <em>dokument3.txt</em>. Spusťte zálohu.</li>
                <li>Ověřte cíl: Poslední vytvořená složka (Středa) musí obsahovat <strong>dokument2.txt i dokument3.txt</strong> (tedy vše, co se změnilo od Pondělní plné zálohy).</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task3} onChange={e => setTask3(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                  <span className="font-bold text-slate-700">Ověřeno: Diferenciální kopíruje změny od první zálohy ✅</span>
                </label>
              </div>
            </div>

            {/* Úkol 4 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">4</span>
                Úkol 4: Komplexní projekt (Havárie a Záchrana)
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed mb-4">
                Simulujeme vývoj projektu napříč týdnem, který nakonec zničí havárie disku. Vaším úkolem je jej z Inkrementálních záloh <strong>zcela přesně a bezpečně obnovit</strong>!
              </p>

              <div className="pl-11 space-y-4">
                <div className="bg-white border-l-4 border-blue-400 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Den 1: (Plná)</h4>
                  <p className="text-sm text-slate-600">V čisté složce <code>Muj_Projekt</code> vytvořte velký 10MB soubor simulující film. Spusťte Příkazový řádek a zadejte:<br /><code>fsutil file createnew "C:\Cesta\K\Slozce\Muj_Projekt\film.mp4" 10485760</code><br />(Cestu nahraďte svou vlastní). Pak v Cobianu vytvořte úlohu typu <strong>Inkrementální</strong> s cílem <code>Zaloha\Projekt</code> a spusťte ji.</p>
                </div>

                <div className="bg-white border-l-4 border-emerald-400 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Den 2: (Inkrement)</h4>
                  <p className="text-sm text-slate-600">Do složky přidejte malý textový soubor <code>denik.txt</code> (s nějakým textem). Spusťte zálohu. Povšimněte si, jak bleskově se provedla a jak malá je cílová složka.</p>
                </div>

                <div className="bg-white border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Den 3: (Inkrement)</h4>
                  <p className="text-sm text-slate-600">Přidejte soubor <code>kniha.txt</code>. Spusťte zálohu.</p>
                </div>

                <div className="bg-white border-l-4 border-orange-400 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Den 4: (Změna - Inkrement)</h4>
                  <p className="text-sm text-slate-600">Otevřete <code>denik.txt</code>, připište do něj další řádku textu a uložte. Spusťte zálohu.</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-rose-800 text-sm mb-1">Den 5: Katastrofa!</h4>
                  <p className="text-sm text-rose-700">Smažte celou původní složku <code>Muj_Projekt</code>! Nyní musíte z cílových 4 složek složit svůj projekt stoprocentně zpět do původního stavu.</p>
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                    <input type="checkbox" checked={task4} onChange={e => setTask4(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                    <span className="font-bold text-slate-700">✅ Zvládl jsem to! Obnovil jsem celý projekt bez ztráty dat!</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Úkol 5 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Úkol 5: Podniková automatizace – Plánované zálohování na síťový disk a obnova po havárii
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed mb-4">
                V reálné firemní síti administrátor nespouští zálohování ručně. Vytvoří automatizovaný plánovač (Schedule), který v pravidelných intervalech sám odesílá data na centrální <strong>síťový disk (NAS / serverový sdílený disk)</strong>. Pomocí nástroje <code>fsutil</code> a postupného doplňování denních zápisů ze schůzek nasimulujeme vícedenní vývoj velkého firemního projektu a v praxi ověříme efektivitu síťového zálohování i následnou kompletní obnovu projektu po smazání.
              </p>

              <div className="pl-11 space-y-4">
                <div className="bg-white border-l-4 border-indigo-400 p-4 rounded-r-xl shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">A</span>
                    Příprava: Vytvoření úlohy s cílem na síťovém disku a nastavení plánovače
                  </h4>
                  <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
                    <li>Vytvořte na svém disku <code>C:</code> novou složku projektu: <code>C:\Firemni_Projekt</code>.</li>
                    <li>V Cobianu vytvořte novou úlohu <strong>5_Sitova_Automatizace</strong>.</li>
                    <li>Jako <strong>Zdroj (Source)</strong> zadejte <code>C:\Firemni_Projekt</code>.</li>
                    <li>
                      Jako <strong>Cíl (Destination)</strong> nastavte složku na vašem <strong>připojeném síťovém disku</strong> přesně ve tvaru:<br />
                      <strong className="text-indigo-700 font-mono text-xs bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">Z:\Zalohy_Projektu\Jmeno_Studenta</strong><br />
                      <span className="text-xs text-slate-500 italic">Místo textu „Jmeno_Studenta“ vytvořte podložku se svým jménem a příjmením (např. <code>Z:\Zalohy_Projektu\Jan_Novak</code>).</span>
                    </li>
                    <li>Typ zálohy nastavte na <strong>Přírůstková (Inkrementální)</strong>.</li>
                    <li>
                      <strong>Aktivace automatického plánovače (Záložka Plánovač / Schedule):</strong><br />
                      Ve firmě se zálohuje typicky v noci. Pro účely školního cvičení v záložce Plánovač nastavte typ <strong>Časovač (Timer)</strong> – např. opakovat každé <strong>2 až 3 minuty</strong> (případně zvolte <em>Denně</em> s časem za 2 minuty od aktuálního času).
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-l-4 border-blue-400 p-4 rounded-r-xl shadow-sm space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">B</span>
                    Den 1 (Pondělí): Výchozí stav projektu, velký soubor (fsutil) a pondělní zápis
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ve složce <code>C:\Firemni_Projekt</code> vytvořte:
                  </p>
                  <ol className="text-sm text-slate-600 leading-relaxed list-decimal pl-5 space-y-1">
                    <li>
                      Velký 20MB soubor představující surový videozáznam z kamery. Spusťte Příkazový řádek (cmd) a zadejte:<br />
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono font-bold block my-1 w-max">fsutil file createnew "C:\Firemni_Projekt\video_master.raw" 20971520</code>
                    </li>
                    <li>
                      Textový dokument <code>zapis_ze_schuzky.txt</code> a napište do něj první řádek:<br />
                      <code className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded text-xs font-mono block my-1 w-max">Pondělí: Zahájení projektu, nahrání surového videa a schválení rozpočtu.</code>
                    </li>
                  </ol>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Nechte plánovač v Cobianu automaticky odpočítat a provést první <strong>Plnou zálohu</strong> na síťový disk <code>Z:\Zalohy_Projektu\Jmeno_Studenta</code>. V okně Cobianu v záložce <em>Protokol (Log)</em> zkontrolujte záznam o přenosu na síťový disk (přeneslo se cca 20 MB).
                  </p>
                </div>

                <div className="bg-white border-l-4 border-emerald-400 p-4 rounded-r-xl shadow-sm space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">C</span>
                    Den 2 (Úterý): Průběžná práce v projektu – přidání úterního zápisu
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Na konci úterý proběhla další porada. Otevřete existující soubor <code>C:\Firemni_Projekt\zapis_ze_schuzky.txt</code> v Poznámkovém bloku a <strong>na nový řádek připište záznam za úterý</strong>:
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs font-mono text-emerald-950 space-y-0.5">
                    <div className="text-slate-400">Pondělí: Zahájení projektu, nahrání surového videa a schválení rozpočtu.</div>
                    <div className="font-bold text-emerald-800">Úterý: Schůzka s týmem, schválený hrubý střih videa a úprava barev.</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Soubor uložte (Ctrl + S). Počkejte na další automatický interval plánovače (Inkrementální záloha). Podívejte se do protokolu i na síťový disk: všimněte si, že se přenesl <strong>pouze tento drobný změněný textový soubor</strong> (pár KB) a síťová linka nebyla zbytečně zatížena 20MB videosouborem!
                  </p>
                </div>

                <div className="bg-white border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">D</span>
                    Den 3 (Středa): Středeční zápis a nový velký render/export videa (fsutil)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ve středu projekt finišuje. Proveďte dvě změny:
                  </p>
                  <ol className="text-sm text-slate-600 leading-relaxed list-decimal pl-5 space-y-1">
                    <li>
                      Otevřete <code>zapis_ze_schuzky.txt</code> a <strong>přidejte další řádek za středu</strong>:
                      <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-xs font-mono text-amber-950 space-y-0.5 my-1">
                        <div className="text-slate-400">Pondělí: Zahájení projektu, nahrání surového videa a schválení rozpočtu.</div>
                        <div className="text-slate-400">Úterý: Schůzka s týmem, schválený hrubý střih videa a úprava barev.</div>
                        <div className="font-bold text-amber-900">Středa: Finální render videa, kontrola zvuku a příprava na předání.</div>
                      </div>
                    </li>
                    <li>
                      Do složky projektu přidejte nový velký 10MB soubor simulující hotový export videa:<br />
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono font-bold block my-1 w-max">fsutil file createnew "C:\Firemni_Projekt\export_v1.mp4" 10485760</code>
                    </li>
                  </ol>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Plánovač provede další automatický inkrement na síťový disk, kam přenese pouze tento nový 10MB export a upravený soubor zápisu.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-rose-400 p-4 rounded-r-xl shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">E</span>
                    Havárie disku a kompletní obnova (Disaster Recovery): Smazání a obnova ze sítě
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Nyní otestujeme to nejdůležitější – zda dokážete projekt z inkrementálních síťových záloh bezpečně zachránit:
                  </p>
                  <ol className="text-sm text-slate-600 leading-relaxed list-decimal pl-5 space-y-1.5">
                    <li>
                      <strong>Simulace havárie:</strong> Přejděte na disk <code>C:</code> a celou složku <code>C:\Firemni_Projekt</code> <strong>kompletně smažte ze svého počítače</strong> (Shift + Delete). Představte si havárii disku nebo zašifrování ransomwarem!
                    </li>
                    <li>
                      <strong>Postupná obnova ze síťového disku (<code>Z:\Zalohy_Projektu\Jmeno_Studenta</code>):</strong><br />
                      Při přírůstkové záloze musíte data rekonstruovat ve správném pořadí:
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                        <li>Nejprve do nové složky <code>C:\Firemni_Projekt</code> zkopírujte obsah <strong>Plné zálohy z Pondělí</strong> (získáte 20MB video a pondělní stav zápisu).</li>
                        <li>Následně zkopírujte obsah <strong>Inkrementu z Úterý</strong> a potvrďte přepsání souborů (zápis se aktualizuje na stav po úterku).</li>
                        <li>Následně zkopírujte obsah <strong>Inkrementu ze Středy</strong> a potvrďte přepsání (získá se 10MB export a finální zápis).</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Kontrola integrity:</strong> Otevřete obnovený soubor <code>C:\Firemni_Projekt\zapis_ze_schuzky.txt</code>. Ověřte, že v něm jsou <strong>všechny 3 řádky (Pondělí, Úterý, Středa)</strong> a ve složce jsou oba videosoubory (20 MB + 10 MB)!
                    </li>
                  </ol>
                </div>

                <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-2xl space-y-3">
                  <h4 className="font-bold text-purple-950 text-sm">Zjištěná data a záznam automatizované zálohy & obnovy:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Cesta na síťovém disku (včetně vaší podsložky):</label>
                      <input
                        type="text"
                        value={ansNetworkPath}
                        placeholder="Z:\Zalohy_Projektu\Jmeno_Prijmeni"
                        onChange={e => setAnsNetworkPath(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nastavení plánovače v Cobianu (typ/čas):</label>
                      <input
                        type="text"
                        value={ansScheduleSetting}
                        placeholder="Časovač / opakovat každé 2 minuty"
                        onChange={e => setAnsScheduleSetting(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Objem přenesených dat z logu v Den 1 (Pondělí – Plná):</label>
                      <input
                        type="text"
                        value={ansDay1Log}
                        placeholder="např. 20,98 MB"
                        onChange={e => setAnsDay1Log(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Objem přenesených dat z logu v Den 2 (Úterý – Inkrement):</label>
                      <input
                        type="text"
                        value={ansDay2Log}
                        placeholder="např. 1,2 KB (pouze text)"
                        onChange={e => setAnsDay2Log(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Objem přenesených dat z logu v Den 3 (Středa – Inkrement):</label>
                      <input
                        type="text"
                        value={ansDay3Log}
                        placeholder="např. 10,49 MB (export + text)"
                        onChange={e => setAnsDay3Log(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Výsledek kontroly po obnově projektu po smazání:</label>
                      <input
                        type="text"
                        value={ansRestoreLog}
                        placeholder="např. Úspěšně obnoveno, soubor obsahuje 3 řádky Po+Út+St"
                        onChange={e => setAnsRestoreLog(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer bg-white p-3.5 rounded-xl border border-purple-200 hover:bg-purple-100/50 transition-colors w-max">
                      <input type="checkbox" checked={task5} onChange={e => setTask5(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                      <span className="font-bold text-purple-950 text-xs">✅ Automatická síťová záloha s plánovačem i následná obnova projektu po smazání byla úspěšně ověřena</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Úkol 6 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-fuchsia-100 text-fuchsia-700 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                Úkol 6: Shrnutí a závěrečné otázky
              </h3>

              <div className="pl-11 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Proč by bylo špatné dělat každý den v 17:00 pouze Plnou zálohu na 1 TB disk?</label>
                  <input
                    type="text"
                    value={ansQ1}
                    onChange={e => setAnsQ1(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Který typ zálohy trvá nejkratší dobu při vytváření?</label>
                  <input
                    type="text"
                    value={ansQ2}
                    onChange={e => setAnsQ2(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Kde v prostředí Cobianu nastavím, aby se záloha ukládala na síťové úložiště NAS?</label>
                  <input
                    type="text"
                    value={ansQ3}
                    onChange={e => setAnsQ3(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-fuchsia-500"
                  />
                </div>
              </div>
            </div>

            {/* Úkol 7 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                Úkol 7: Archivní bit ve Windows (Jak systém pozná změnu)
              </h3>

              <div className="pl-11 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Operační systém Windows u každého souboru eviduje tzv. <strong>Archivní atribut (bit)</strong>. Kdykoliv soubor vytvoříte nebo upravíte, systém jej automaticky označí jako <em>„připraven k archivaci“</em>. Zálohovací programy podle tohoto příznaku poznají, co mají zazálohovat.
                </p>

                {/* Pokus v GUI */}
                <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl shadow-xs space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">A</span>
                    Rychlý pokus v Průzkumníku Windows (GUI):
                  </h4>
                  <ol className="text-sm text-slate-600 leading-relaxed list-decimal pl-5 space-y-1.5">
                    <li>Na ploše vytvořte nový textový soubor (např. <code>pokus.txt</code>).</li>
                    <li>
                      Klikněte na něj pravým tlačítkem → <strong>Vlastnosti</strong> → záložka <em>Obecné</em> → tlačítko <strong>Upřesnit...</strong><br />
                      <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Volba „Soubor je připraven k archivaci“ je automaticky zaškrtnutá!
                      </span>
                    </li>
                    <li>Zaškrtnutí <strong>zrušte</strong> a potvrďte <em>OK</em> a <em>OK</em> (simulace proběhlé zálohy).</li>
                    <li>Soubor otevřete, připište do něj jedno slovo a uložte (<kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">Ctrl+S</kbd>).</li>
                    <li>Znovu otevřete <em>Vlastnosti → Upřesnit...</em> – Windows zaškrtávátko <strong>samy okamžitě vrátily zpět</strong>!</li>
                  </ol>
                </div>

                {/* Rozbalovací sekce pro CMD */}
                <details className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs group transition-all">
                  <summary className="font-bold text-slate-700 cursor-pointer flex items-center justify-between hover:text-purple-600">
                    <span>⌨️ Pro pokročilé: Jak totéž zkontrolovat v Příkazovém řádku (CMD)</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-slate-600">
                    <p>Otevřete Příkazový řádek ve složce a vyzkoušejte příkaz <code>attrib</code>:</p>
                    <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
                      <li><code>attrib pokus.txt</code> → zobrazí písmeno <strong>A</strong> (Archive bit je aktivní).</li>
                      <li><code>attrib -a pokus.txt</code> → vypne archivní bit (soubor je označen jako „zazálohován“).</li>
                      <li><code>attrib +a pokus.txt</code> → ručně zapne archivní bit.</li>
                    </ul>
                  </div>
                </details>

                {/* Otázka */}
                <div className="pt-2">
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Otázka: Co udělá přírůstková (inkrementální) záloha s tímto zaškrtávátkem poté, co soubor úspěšně zkopíruje?
                  </label>
                  <input
                    type="text"
                    value={ansArchiveBit}
                    onChange={e => setAnsArchiveBit(e.target.value)}
                    placeholder="Napište svou odpověď..."
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer bg-amber-50/70 p-4 rounded-xl border border-amber-200 hover:bg-amber-100/60 transition-colors w-max">
                    <input type="checkbox" checked={task6} onChange={e => setTask6(e.target.checked)} className="w-5 h-5 text-amber-600 rounded" />
                    <span className="font-bold text-amber-950 text-sm">✅ Ověřeno: Windows při každé změně souboru samy zapnou archivní bit</span>
                  </label>
                </div>
              </div>
            </div>

          </div>
        </WorksheetLayout>
      )}

    </FsChapterShell>
  );
};

export default BackupCobianChapter;
