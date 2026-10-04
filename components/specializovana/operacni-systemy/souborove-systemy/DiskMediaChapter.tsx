'use client';

import React, { useState, useEffect } from 'react';
import { Database, HardDrive, Cpu, Shield, Zap, Search, Clock, Activity, Rocket, RefreshCw, ClipboardList, PenTool } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  TermCard, 
  RevealQuestions, 
} from './FsShared';
import { useRouter } from 'next/navigation';
import { ArrowRight, Usb, Printer, CheckSquare, Square, Info } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';



function SpeedSimulation() {
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<'seq' | 'rand'>('seq');
  const [hddProgress, setHddProgress] = useState(0);
  const [ssdProgress, setSsdProgress] = useState(0);
  const [usbProgress, setUsbProgress] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime(t => t + 100);
        
        if (mode === 'seq') {
          // Zápis 5 GB v kuse (Sekvenční)
          setSsdProgress(p => Math.min(100, p + 20));   // SSD: velmi rychle (např. 2500 MB/s)
          setHddProgress(p => Math.min(100, p + 3));    // HDD: ujde to (např. 150 MB/s)
          setUsbProgress(p => Math.min(100, p + 0.8));  // USB Flash: pomalé (např. 30 MB/s)
        } else {
          // Čtení 10 000 malých souborů (Náhodný přístup)
          setSsdProgress(p => Math.min(100, p + 15));   // SSD: bleskové (nemá hlavičku)
          setUsbProgress(p => Math.min(100, p + 5));    // USB Flash: dobré (také nemá hlavičku)
          setHddProgress(p => Math.min(100, p + 0.4));  // HDD: tragédie (neustále přesouvá hlavičku)
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [running, mode]);

  useEffect(() => {
    if (hddProgress >= 100 && ssdProgress >= 100 && usbProgress >= 100) {
      setRunning(false);
    }
  }, [hddProgress, ssdProgress, usbProgress]);

  const resetAndRun = (newMode: 'seq' | 'rand') => {
    setMode(newMode);
    setRunning(false);
    setHddProgress(0);
    setSsdProgress(0);
    setUsbProgress(0);
    setTime(0);
    setTimeout(() => setRunning(true), 100);
  };

  const renderBar = (name: string, progress: number, colorClass: string, Icon: React.ElementType) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className={`font-bold text-base md:text-xl flex items-center gap-2 ${colorClass}`}>
          <Icon className="w-5 h-5"/> {name}
        </span>
        <span className={`font-bold text-base md:text-xl ${colorClass}`}>
          {progress >= 100 ? 'Hotovo!' : `${Math.floor(progress)} %`}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-6 md:h-8 overflow-hidden shadow-inner border border-slate-200">
        <div 
          className={`h-full transition-all duration-100 ease-linear ${colorClass.replace('text-', 'bg-').replace('-700', '-500')}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <Rocket className="w-8 h-8 text-purple-500" /> Porovnání rychlostí v praxi
      </h2>
      <p className="text-sm md:text-base text-slate-600 mb-8">
        Rychlost disku nezávisí jen na papírových parametrech, ale hlavně na tom, <strong>co s ním právě děláte</strong>. 
        HDD je relativně slušné při kopírování jednoho obřího souboru, ale naprosto selhává při čtení tisíců drobných souborů, 
        protože musí neustále mechanicky přesouvat čtecí hlavičku (hledání).
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <button 
          onClick={() => resetAndRun('seq')}
          className={`p-4 rounded-2xl border-4 text-left transition-all ${mode === 'seq' && running ? 'border-purple-500 bg-purple-50 shadow-md scale-105' : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50'}`}
        >
          <div className="font-black text-slate-800 uppercase mb-1 flex items-center gap-2">
            1. Zápis velkého souboru <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-sm text-slate-500">Kopírování 5 GB 4K videa v kuse (Sekvenční zápis).</div>
        </button>

        <button 
          onClick={() => resetAndRun('rand')}
          className={`p-4 rounded-2xl border-4 text-left transition-all ${mode === 'rand' && running ? 'border-purple-500 bg-purple-50 shadow-md scale-105' : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50'}`}
        >
          <div className="font-black text-slate-800 uppercase mb-1 flex items-center gap-2">
            2. Čtení malých souborů <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-sm text-slate-500">Otevírání 10 000 drobných souborů, např. při kompilaci kódu nebo startu Windows. (Náhodné čtení).</div>
        </button>
      </div>

      <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Čas simulace: {(time / 1000).toFixed(1)} s
          </span>
          {running && <Activity className="w-5 h-5 text-purple-500 animate-pulse" />}
        </div>
        
        {renderBar('NVMe SSD', ssdProgress, 'text-teal-700', Cpu)}
        {renderBar('USB Flash Disk', usbProgress, 'text-amber-700', Usb)}
        {renderBar('Klasický HDD', hddProgress, 'text-indigo-700', HardDrive)}
      </div>
    </div>
  );
}

export default function DiskMediaChapter({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  // Worksheet State
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
    let htmlContent = `
      <!DOCTYPE html>
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
          <div class="question">Jedná se o SSD, nebo o klasický HDD?</div>
          <div class="answer">${(answers['disk_type'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>2. Měření rychlosti (CrystalDiskMark)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['w1'] ? 'checked' : 'unchecked'}">[ ${checkedItems['w1'] ? 'X' : ' '} ]</span> Aplikace spuštěna a testy proběhly</div>
          <div class="question">A) Test SEQ1M (Velký soubor)</div>
          <div class="answer">Čtení: ${answers['seq_read'] || '___'} MB/s | Zápis: ${answers['seq_write'] || '___'} MB/s</div>
          <div class="question">B) Test RND4K (Malé soubory)</div>
          <div class="answer">Čtení: ${answers['rnd_read'] || '___'} MB/s | Zápis: ${answers['rnd_write'] || '___'} MB/s</div>
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
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Disky_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: Zap },
    { id: 'worksheet', label: 'Pracovní list', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={1}
      title="Paměťová"
      highlight="média"
      subtitle="Kde a jak jsou naše data uložena fyzicky."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TheoryCard icon={HardDrive} title="Pevný disk (HDD)" letter="A" tone="indigo">
              <p>
                Pevný disk (Hard Disk Drive) je tradiční typ úložiště, který využívá k zápisu dat 
                <strong> rotující magnetické plotny</strong> a mechanické čtecí hlavičky.
              </p>
              
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 mt-6 grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-indigo-400" />
                  <div>
                    <div className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Rychlost (Čtení/Zápis)</div>
                    <div className="text-2xl font-black text-indigo-700">~ 150 MB/s</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-indigo-400" />
                  <div>
                    <div className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Přístupová doba</div>
                    <div className="text-2xl font-black text-indigo-700">10 – 15 ms</div>
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-2 gap-6 mt-6">
                <TermCard term="Výhody" icon={Shield} tone="emerald">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Nízká cena za kapacitu</li>
                    <li>Vysoká životnost při archivaci</li>
                    <li>Velké kapacity (desítky TB)</li>
                  </ul>
                </TermCard>
                <TermCard term="Nevýhody" icon={Search} tone="rose">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Pomalá rychlost čtení/zápisu</li>
                    <li>Náchylnost na mechanické otřesy</li>
                    <li>Vyšší spotřeba a hlučnost</li>
                  </ul>
                </TermCard>
              </div>
            </TheoryCard>

            <TheoryCard icon={Cpu} title="SSD Disk" letter="B" tone="teal">
              <p>
                SSD (Solid State Drive) nepoužívá žádné pohyblivé části. Data se ukládají do 
                <strong> paměťových čipů</strong> (tzv. flash paměť), podobně jako v USB flash disku nebo mobilním telefonu.
              </p>

              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 mt-6 grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-teal-400" />
                  <div>
                    <div className="text-sm font-bold text-teal-900 uppercase tracking-wide">Rychlost (NVMe)</div>
                    <div className="text-2xl font-black text-teal-700">až 7 000 MB/s</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-teal-400" />
                  <div>
                    <div className="text-sm font-bold text-teal-900 uppercase tracking-wide">Přístupová doba</div>
                    <div className="text-2xl font-black text-teal-700">~ 0.1 ms</div>
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-2 gap-6 mt-6">
                <TermCard term="Výhody" icon={Shield} tone="emerald">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Extrémně rychlé čtení a zápis</li>
                    <li>Téměř nulová přístupová doba</li>
                    <li>Odolné proti mechanickým otřesům</li>
                    <li>Zcela bezhlučné a energeticky úsporné</li>
                  </ul>
                </TermCard>
                <TermCard term="Nevýhody" icon={Search} tone="rose">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Vyšší pořizovací cena za stejnou kapacitu</li>
                    <li>Omezený počet přepisů (opotřebení čipů)</li>
                    <li>Velmi obtížná obnova smazaných dat</li>
                  </ul>
                </TermCard>
              </div>

              <div className="mt-6">
                <Callout kind="tip" title="Kdy jaký disk použít?">
                  <p>
                    Dnes se SSD disky používají primárně pro operační systém a často spouštěné programy díky své extrémní rychlosti (jsou až 100x rychlejší v přístupové době!). 
                    HDD se hodí spíše jako obří archiv nebo datové úložiště pro fotky a videa.
                  </p>
                </Callout>
              </div>
            </TheoryCard>
          </div>

          <RevealQuestions 
            questions={[
              {
                q: "Jaký je hlavní rozdíl mezi HDD a SSD?",
                a: "HDD má mechanické pohyblivé části (rotující plotny a hlavičku) a data zapisuje magneticky, zatímco SSD nemá pohyblivé části a používá paměťové čipy (flash paměť)."
              },
              {
                q: "Proč je lepší mít na SSD nainstalovaný operační systém?",
                a: "SSD disky mají téměř nulovou přístupovou dobu (kolem 0.1 ms). Start operačního systému z SSD trvá sekundy, protože systém nemusí čekat, až se mechanická hlavička fyzicky přesune na správné místo na plotně."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SpeedSimulation />
        </div>
      )}
      {activeTab === 'worksheet' && (
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
                  1..1000 | ForEach-Object {'{'} "Tohle je testovací soubor" {'>'} "maly_soubor_$_.txt" {'}'}
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
      )}
    </FsChapterShell>
  );
}
