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

import hddImg from '@/public/images/os/hdd_internals.jpg';
import ssdImg from '@/public/images/os/ssd_internals.jpg';

function SpeedSimulation() {
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<'seq' | 'rand'>('seq');
  const [hddProgress, setHddProgress] = useState(0);
  const [ssdProgress, setSsdProgress] = useState(0);
  const [usbProgress, setUsbProgress] = useState(0);
  const [time, setTime] = useState(0);

  const [hddTime, setHddTime] = useState<number | null>(null);
  const [ssdTime, setSsdTime] = useState<number | null>(null);
  const [usbTime, setUsbTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime(t => t + 100);
        
        if (mode === 'seq') {
          // Zápis 5 GB v kuse (Sekvenční)
          setSsdProgress(p => Math.min(100, p + 20));   // SSD: velmi rychle
          setHddProgress(p => Math.min(100, p + 3));    // HDD: ujde to
          setUsbProgress(p => Math.min(100, p + 0.8));  // USB Flash: pomalé
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
    if (ssdProgress >= 100 && ssdTime === null) setSsdTime(time);
  }, [ssdProgress, ssdTime, time]);

  useEffect(() => {
    if (hddProgress >= 100 && hddTime === null) setHddTime(time);
  }, [hddProgress, hddTime, time]);

  useEffect(() => {
    if (usbProgress >= 100 && usbTime === null) setUsbTime(time);
  }, [usbProgress, usbTime, time]);

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
    setHddTime(null);
    setSsdTime(null);
    setUsbTime(null);
    setTime(0);
    setTimeout(() => setRunning(true), 100);
  };

  const renderBar = (name: string, progress: number, colorClass: string, Icon: React.ElementType, finalTime: number | null) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className={`font-bold text-base md:text-xl flex items-center gap-2 ${colorClass}`}>
          <Icon className="w-5 h-5"/> {name}
        </span>
        <span className={`font-bold text-base md:text-xl ${colorClass}`}>
          {progress >= 100 
            ? `Hotovo! (${finalTime !== null ? (finalTime / 1000).toFixed(1) : (time / 1000).toFixed(1)} s)` 
            : `${Math.floor(progress)} %`}
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
        
        {renderBar('NVMe SSD', ssdProgress, 'text-teal-700', Cpu, ssdTime)}
        {renderBar('Klasický HDD', hddProgress, 'text-indigo-700', HardDrive, hddTime)}
        {renderBar('USB Flash Disk', usbProgress, 'text-amber-700', Usb, usbTime)}
      </div>
    </div>
  );
}

function PhysicalWriteSimulation() {
  const [running, setRunning] = useState(false);
  const [ssdWritten, setSsdWritten] = useState<number[]>([]);
  const [hddWritten, setHddWritten] = useState<number[]>([]);
  const [hddStatus, setHddStatus] = useState('V klidu');
  const [hddTrack, setHddTrack] = useState<number | null>(null);
  
  const TOTAL_BLOCKS = 16;
  const SECTORS = Array.from({ length: TOTAL_BLOCKS }).map((_, i) => {
    if (i < 10) return { id: i, track: 0, radius: 70, angle: (i * 360) / 10 };
    else return { id: i, track: 1, radius: 40, angle: ((i - 10) * 360) / 6 };
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      const generateOrder = () => {
        const arr = Array.from({ length: TOTAL_BLOCKS }, (_, i) => i);
        return arr.sort(() => Math.random() - 0.5);
      };

      const sOrder = generateOrder();
      const hOrder = generateOrder();

      setSsdWritten([]);
      setHddWritten([]);
      setHddStatus('Přesun hlavičky...');
      setHddTrack(null);

      let tick = 0;
      let curSsd: number[] = [];
      let curHdd: number[] = [];

      interval = setInterval(() => {
        tick++;
        
        if (tick % 2 === 0 && curSsd.length < TOTAL_BLOCKS) {
          curSsd = [...curSsd, sOrder[curSsd.length]];
          setSsdWritten(curSsd);
        }

        const cycle = tick % 16;
        if (curHdd.length < TOTAL_BLOCKS) {
          const nextSectorId = hOrder[curHdd.length];
          const nextTrack = nextSectorId < 10 ? 0 : 1;

          if (cycle < 10) {
            setHddStatus('Hledání stopy (posun hlavy)...');
            setHddTrack(nextTrack);
          } else if (cycle < 15) {
            setHddStatus('Čekání na natočení plotny...');
          } else {
            setHddStatus('Fyzické čtení sektoru!');
            curHdd = [...curHdd, nextSectorId];
            setHddWritten(curHdd);
          }
        } else if (curHdd.length >= TOTAL_BLOCKS) {
          setHddStatus('Hotovo!');
          setHddTrack(null);
        }

        if (curSsd.length >= TOTAL_BLOCKS && curHdd.length >= TOTAL_BLOCKS) {
          clearInterval(interval);
          setRunning(false);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 mt-8">
      <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <PenTool className="w-8 h-8 text-teal-500" /> Fyzický princip: Jak probíhá čtení fragmentovaného souboru?
      </h2>
      <p className="text-sm md:text-base text-slate-600 mb-8">
        Zatímco SSD čte data okamžitě z paměťových buněk pomocí elektrického proudu, mechanický pevný disk (HDD) musí neustále hýbat čtecí hlavičkou nad rotující magnetickou plotnou a čekat, až se správný sektor "dotočí" pod hlavičku. V praxi jsou navíc kousky jednoho souboru často uloženy na přeskáčku (fragmentace) v různých stopách (soustředných kruzích).
      </p>

      <div className="flex justify-center mb-8">
        <button 
          onClick={() => setRunning(true)}
          disabled={running}
          className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-white transition-all shadow-md ${running ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 hover:scale-105 active:scale-95'}`}
        >
          {running ? 'Čtení probíhá...' : 'Spustit simulaci čtení'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* SSD */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 flex flex-col items-center">
          <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-teal-600"/> SSD Disk (Paměťové čipy)</h3>
          <div className="bg-slate-800 p-4 rounded-xl border-4 border-slate-700 w-full max-w-[250px]">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div key={i} className={`h-8 rounded text-[10px] flex items-center justify-center font-mono font-bold transition-colors duration-100 ${ssdWritten.includes(i) ? 'bg-teal-500 text-white shadow-[0_0_10px_rgba(20,184,166,0.6)]' : 'bg-blue-900 text-blue-300 border border-blue-800'}`}>
                  #{i}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-sm font-bold text-teal-600 h-6">
            {ssdWritten.length === TOTAL_BLOCKS ? 'Hotovo!' : (running ? 'Elektrické čtení...' : 'V klidu')}
          </div>
        </div>

        {/* HDD */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 flex flex-col items-center relative overflow-hidden">
          <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><HardDrive className="w-5 h-5 text-indigo-600"/> HDD (Mechanická plotna)</h3>
          
          <div className="relative w-[200px] h-[200px] flex items-center justify-center mt-2">
            {/* Spinning Platter */}
            <div className={`absolute inset-0 rounded-full border-8 border-slate-300 bg-slate-200 shadow-inner transition-transform ${running && hddWritten.length < TOTAL_BLOCKS ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-400 rounded-full border-4 border-slate-300 z-0"></div>
              
              {/* Viditelné stopy (Tracks) */}
              <div className="absolute top-1/2 left-1/2 w-[140px] h-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 z-0"></div>
              <div className="absolute top-1/2 left-1/2 w-[80px] h-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 z-0"></div>

              {/* Sektory po obvodu stop (16 bloků celkem) */}
              {SECTORS.map((sector) => {
                const isWritten = hddWritten.includes(sector.id);
                return (
                  <div key={sector.id} className={`absolute w-6 h-5 rounded-sm border transition-colors duration-200 ${isWritten ? 'bg-teal-500 border-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)] z-10' : 'bg-blue-800 border-blue-900'}`} style={{
                    transform: `rotate(${sector.angle}deg) translateY(-${sector.radius}px)`,
                    top: 'calc(50% - 10px)',
                    left: 'calc(50% - 12px)'
                  }}></div>
                );
              })}
            </div>
            
            {/* Read/Write Head (Ramínko) */}
            <div className={`absolute bottom-2 right-2 w-8 h-8 z-20 transition-transform duration-200 ease-in-out`}
                 style={{ transform: `rotate(${running && hddTrack !== null ? (hddTrack === 0 ? 25 : 5) : 45}deg)` }}>
              {/* Závit/osa ramínka */}
              <div className="absolute inset-0 bg-slate-500 rounded-full border-2 border-slate-300 shadow-md"></div>
              
              {/* Rameno s hlavičkou směřující nad sektory */}
              <div className="absolute top-[14px] left-[16px] w-[65px] h-4 bg-slate-400 rounded-full origin-left shadow-md" style={{ transform: 'rotate(-135deg)' }}>
                 {/* Magnetická hlava na konci ramena */}
                 <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-5 h-6 bg-rose-500 rounded-sm shadow-sm border border-rose-600"></div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Přečteno sektorů:</span>
            <span className="text-indigo-600">{hddWritten.length} / {TOTAL_BLOCKS}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-500 h-full transition-all" style={{ width: `${(hddWritten.length/TOTAL_BLOCKS)*100}%` }}></div>
          </div>

          <div className={`mt-4 text-sm font-bold h-6 ${hddStatus === 'Hotovo!' ? 'text-indigo-600' : (hddStatus.includes('čtení') ? 'text-teal-500' : 'text-slate-500')}`}>
            {hddStatus}
          </div>
        </div>
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
              
              <div className="my-6 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-sm relative group">
                <img src={hddImg.src} alt="Vnitřní uspořádání mechanického pevného disku (HDD)" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm tracking-wide">Pohyblivé mechanické části (Rotující plotna a hlavička)</span>
                </div>
              </div>
              
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

              <div className="my-6 rounded-2xl overflow-hidden border-2 border-teal-100 shadow-sm relative group">
                <img src={ssdImg.src} alt="Vnitřní uspořádání paměťového SSD disku (NVMe)" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm tracking-wide">Žádné pohyblivé části (Paměťové čipy NAND a řadič)</span>
                </div>
              </div>

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

          <TheoryCard icon={HardDrive} title="Logické členění na sektory" letter="C" tone="slate">
            <div className="space-y-6">
              <p className="text-slate-600">
                Ať už máte klasický pevný disk nebo superrychlé SSD, operační systém k němu přistupuje naprosto stejně. Vnímá celý disk jako jednu obrovskou mřížku malých přihrádek. Každé takové přihrádce se říká <strong>Sektor</strong>.
              </p>

              {/* Jednoduché schéma */}
              <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200">
                <div className="max-w-2xl mx-auto">
                  <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Kapacita disku</h4>
                  
                  {/* Grid sektorů */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(24)].map((_, i) => {
                      // Soubor 1 zabírající sektory 10, 11, 12
                      const isFile1 = i >= 10 && i <= 12;
                      // Soubor 2 zabírající sektory 3 a 4
                      const isFile2 = i === 3 || i === 4;
                      
                      let bgClass = 'bg-white border-slate-200 text-slate-400';
                      let textTop = 'text-slate-300';
                      let textBot = 'text-slate-500';
                      
                      if (isFile1) {
                        bgClass = 'bg-purple-500 border-purple-600 shadow-lg shadow-purple-200 z-10';
                        textTop = 'text-purple-100';
                        textBot = 'text-white';
                      } else if (isFile2) {
                        bgClass = 'bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-200 z-10';
                        textTop = 'text-emerald-100';
                        textBot = 'text-white';
                      }

                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-transform hover:scale-110 relative ${bgClass}`}
                        >
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold ${textTop}`}>Sektor</div>
                          <div className={`text-xs font-black mt-1 ${textBot}`}>4 KB</div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legenda k souborům */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                      <div className="w-5 h-5 rounded bg-purple-500 shrink-0 mt-0.5"></div>
                      <div>
                        <div className="font-bold text-purple-900 text-sm">"tajnosti.txt" (12 KB)</div>
                        <div className="text-xs text-purple-700 mt-1 leading-relaxed">
                          Soubor má 12 KB. Zabere přesně <strong>3 sektory</strong> (10, 11 a 12).
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                      <div className="w-5 h-5 rounded bg-emerald-500 shrink-0 mt-0.5"></div>
                      <div>
                        <div className="font-bold text-emerald-900 text-sm">"fotka.jpg" (7 KB)</div>
                        <div className="text-xs text-emerald-700 mt-1 leading-relaxed">
                          Má 7 KB. I když se do druhého sektoru už celá nevejde, zabere <strong>2 sektory</strong> (3 a 4). Zbytek ve druhém sektoru propadne.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <ul className="list-disc list-inside space-y-4">
                <li>
                  <strong>Sektor je nejmenší dílek:</strong> I kdyby měl váš textový soubor pouhý jeden znak (1 bajt), disk pro něj vždy vyhradí a spotřebuje celý jeden sektor (4096 bajtů). Zbytek místa v sektoru zůstane prázdný.
                </li>
                <li>
                  <strong>Skládání větších souborů:</strong> Větší soubory se automaticky rozsekají na kousky a uloží do tolika sektorů, kolik je zrovna potřeba. Operační systém si pamatuje, které sektory ke kterému souboru patří.
                </li>
              </ul>

            </div>
          </TheoryCard>

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
          <PhysicalWriteSimulation />
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
