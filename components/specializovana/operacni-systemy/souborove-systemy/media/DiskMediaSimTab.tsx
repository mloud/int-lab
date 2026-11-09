'use client';

import React, { useState, useEffect } from 'react';
import { HardDrive, Cpu, Activity, Rocket, PenTool, ArrowRight, Usb } from 'lucide-react';

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
          setSsdProgress(p => Math.min(100, p + 20));
          setHddProgress(p => Math.min(100, p + 3));
          setUsbProgress(p => Math.min(100, p + 0.8));
        } else {
          setSsdProgress(p => Math.min(100, p + 15));
          setUsbProgress(p => Math.min(100, p + 5));
          setHddProgress(p => Math.min(100, p + 0.4));
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

  const renderBar = (name: string, progress: number, colorClass: string, barColor: string, Icon: React.ElementType, finalTime: number | null) => (
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
          className={`h-full transition-all duration-100 ease-linear ${barColor}`} 
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
        
        {renderBar('NVMe SSD', ssdProgress, 'text-teal-700', 'bg-teal-500', Cpu, ssdTime)}
        {renderBar('Klasický HDD', hddProgress, 'text-indigo-700', 'bg-indigo-500', HardDrive, hddTime)}
        {renderBar('USB Flash Disk', usbProgress, 'text-amber-700', 'bg-amber-500', Usb, usbTime)}
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
        Zatímco SSD čte data okamžitě z paměťových buněk pomocí elektrického proudu, mechanický pevný disk (HDD) musí neustále hýbat čtecí hlavičkou nad rotující magnetickou plotnou a čekat, až se správný sektor &quot;dotočí&quot; pod hlavičku. V praxi jsou navíc kousky jednoho souboru často uloženy na přeskáčku (fragmentace) v různých stopách (soustředných kruzích).
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

        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 flex flex-col items-center relative overflow-hidden">
          <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><HardDrive className="w-5 h-5 text-indigo-600"/> HDD (Mechanická plotna)</h3>
          
          <div className="relative w-[200px] h-[200px] flex items-center justify-center mt-2">
            <div className={`absolute inset-0 rounded-full border-8 border-slate-300 bg-slate-200 shadow-inner transition-transform ${running && hddWritten.length < TOTAL_BLOCKS ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-400 rounded-full border-4 border-slate-300 z-0"></div>
              <div className="absolute top-1/2 left-1/2 w-[140px] h-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 z-0"></div>
              <div className="absolute top-1/2 left-1/2 w-[80px] h-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 z-0"></div>

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
            
            <div className="absolute bottom-2 right-2 w-8 h-8 z-20 transition-transform duration-200 ease-in-out"
                 style={{ transform: `rotate(${running && hddTrack !== null ? (hddTrack === 0 ? 25 : 5) : 45}deg)` }}>
              <div className="absolute inset-0 bg-slate-500 rounded-full border-2 border-slate-300 shadow-md"></div>
              <div className="absolute top-[14px] left-[16px] w-[65px] h-4 bg-slate-400 rounded-full origin-left shadow-md" style={{ transform: 'rotate(-135deg)' }}>
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

export const DiskMediaSimTab: React.FC = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SpeedSimulation />
    <PhysicalWriteSimulation />
  </div>
);

