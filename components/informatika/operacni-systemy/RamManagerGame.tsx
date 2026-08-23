import React, { useState, useEffect } from 'react';
import { ArrowLeft, Activity, Trophy, RotateCcw, AlertTriangle, ShieldAlert, Cpu, HardDrive, Wifi, Server, CheckCircle2, Play, Monitor } from 'lucide-react';

interface RamManagerGameProps {
  onBack: () => void;
}

interface GameProcess {
  id: string;
  pid: number;
  name: string;
  status: 'Běží' | 'Nereaguje' | 'Na pozadí';
  cpu: number;
  ram: number;
  net: number;
  isSystem: boolean;
  isTarget: boolean;
  baseCpu: number;
  baseRam: number;
  baseNet: number;
}

interface Mission {
  id: string;
  title: string;
  text: string;
  setup: (processes: GameProcess[]) => GameProcess[];
}

const MISSIONS: Mission[] = [
  {
    id: 'frozen',
    title: 'Zamrzlý program',
    text: 'Zadání z Helpdesku: "Uživateli úplně zamrzl MS Word. Najdi ho, zkontroluj jeho stav a natvrdo ho ukonči."',
    setup: (procs) => {
      const p = [...procs];
      const wordIdx = p.findIndex(x => x.name === 'MS Word');
      if (wordIdx > -1) {
        p[wordIdx] = { ...p[wordIdx], status: 'Nereaguje', baseCpu: 0, cpu: 0, isTarget: true };
      }
      return p;
    }
  },
  {
    id: 'memory_leak',
    title: 'Žrout paměti',
    text: 'Zadání z Helpdesku: "Systém hlásí nedostatek RAM. Jeden z programů zabírá extrémní množství paměti (přes 2000 MB). Zlikviduj ho."',
    setup: (procs) => {
      const p = [...procs];
      p.push({ id: 'chrome_leak', pid: 5042, name: 'Google Chrome (42 záložek)', status: 'Běží', baseCpu: 5, cpu: 5, baseRam: 2850, ram: 2850, baseNet: 2, net: 2, isSystem: false, isTarget: true });
      return p;
    }
  },
  {
    id: 'miner',
    title: 'Těžař kryptoměn',
    text: 'Zadání z Helpdesku: "Počítač hrozně hučí a topí, procesor (CPU) jede naplno. Vypadá to na skrytého těžaře kryptoměn. Najdi neznámý proces s maximální zátěží CPU a zastav ho."',
    setup: (procs) => {
      const p = [...procs];
      p.push({ id: 'miner', pid: 9942, name: 'miner_update32.exe', status: 'Na pozadí', baseCpu: 95, cpu: 95, baseRam: 450, ram: 450, baseNet: 15, net: 15, isSystem: false, isTarget: true });
      return p;
    }
  },
  {
    id: 'network',
    title: 'Pomalý internet',
    text: 'Zadání z Helpdesku: "Internet ve firmě je strašně pomalý. Zjisti, který program stahuje ohromné množství dat ze sítě (sloupec Síť v Mbps)."',
    setup: (procs) => {
      const p = [...procs];
      p.push({ id: 'steam', pid: 412, name: 'Steam (Aktualizace hry)', status: 'Běží', baseCpu: 12, cpu: 12, baseRam: 350, ram: 350, baseNet: 250, net: 250, isSystem: false, isTarget: true });
      return p;
    }
  },
  {
    id: 'malware',
    title: 'Trojský kůň',
    text: 'Zadání z Helpdesku: "Antivirus hlásí varování! Na pozadí běží podezřelý proces s podivným názvem a komunikuje se sítí. Najdi ho a zabij ho!"',
    setup: (procs) => {
      const p = [...procs];
      p.push({ id: 'malware', pid: 666, name: 'Free_Robux_Generator.exe', status: 'Na pozadí', baseCpu: 8, cpu: 8, baseRam: 120, ram: 120, baseNet: 45, net: 45, isSystem: false, isTarget: true });
      return p;
    }
  },
  {
    id: 'cpu_loop',
    title: 'Zacyklený ovladač',
    text: 'Zadání z Helpdesku: "Tiskárna přestala tisknout a její systémový proces se zacyklil. Najdi proces Tiskarna_Spooler, který bere nesmyslně moc CPU (přes 50 %), a ukonči ho."',
    setup: (procs) => {
      const p = [...procs];
      p.push({ id: 'spooler', pid: 1024, name: 'Tiskarna_Spooler', status: 'Běží', baseCpu: 55, cpu: 55, baseRam: 45, ram: 45, baseNet: 0, net: 0, isSystem: false, isTarget: true });
      return p;
    }
  }
];

const BASE_PROCESSES: GameProcess[] = [
  { id: 'sys_win', pid: 4, name: 'Windows OS (System)', status: 'Na pozadí', baseCpu: 1, cpu: 1, baseRam: 800, ram: 800, baseNet: 0, net: 0, isSystem: true, isTarget: false },
  { id: 'sys_expl', pid: 1248, name: 'Průzkumník Windows', status: 'Běží', baseCpu: 0, cpu: 0, baseRam: 150, ram: 150, baseNet: 0, net: 0, isSystem: true, isTarget: false },
  { id: 'sys_def', pid: 3042, name: 'Windows Defender', status: 'Na pozadí', baseCpu: 2, cpu: 2, baseRam: 220, ram: 220, baseNet: 0.1, net: 0.1, isSystem: true, isTarget: false },
  { id: 'sys_audio', pid: 944, name: 'Audiodg.exe', status: 'Na pozadí', baseCpu: 0, cpu: 0, baseRam: 35, ram: 35, baseNet: 0, net: 0, isSystem: true, isTarget: false },
  { id: 'app_word', pid: 8552, name: 'MS Word', status: 'Běží', baseCpu: 1, cpu: 1, baseRam: 250, ram: 250, baseNet: 0, net: 0, isSystem: false, isTarget: false },
  { id: 'app_vlc', pid: 7120, name: 'VLC Media Player', status: 'Běží', baseCpu: 15, cpu: 15, baseRam: 180, ram: 180, baseNet: 0, net: 0, isSystem: false, isTarget: false },
  { id: 'app_spotify', pid: 4021, name: 'Spotify', status: 'Běží', baseCpu: 3, cpu: 3, baseRam: 300, ram: 300, baseNet: 5, net: 5, isSystem: false, isTarget: false },
  { id: 'app_discord', pid: 9012, name: 'Discord', status: 'Běží', baseCpu: 2, cpu: 2, baseRam: 400, ram: 400, baseNet: 1, net: 1, isSystem: false, isTarget: false },
  { id: 'app_chrome', pid: 3201, name: 'Google Chrome', status: 'Běží', baseCpu: 4, cpu: 4, baseRam: 850, ram: 850, baseNet: 3, net: 3, isSystem: false, isTarget: false }
];

const RamManagerGame: React.FC<RamManagerGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [processes, setProcesses] = useState<GameProcess[]>([]);
  const [feedback, setFeedback] = useState<{ text: string, type: 'error' | 'success' | null }>({ text: '', type: null });

  // Fluctuation effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setProcesses(prev => prev.map(p => {
        if (p.status === 'Nereaguje') return p; // Zaseknuté se nehýbou
        // Drobná fluktuace hodnot
        const newCpu = Math.max(0, Math.min(100, p.baseCpu + (Math.random() * 4 - 2)));
        const newRam = Math.max(0, p.baseRam + (Math.random() * 10 - 5));
        const newNet = Math.max(0, p.baseNet + (Math.random() * 2 - 1));
        return { ...p, cpu: newCpu, ram: newRam, net: newNet };
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [gameState]);

  const loadMission = (idx: number) => {
    const mission = MISSIONS[idx];
    if (!mission) {
      setGameState('won');
      return;
    }
    // Deep copy and reset isTarget
    let freshProcesses = BASE_PROCESSES.map(p => ({ ...p, isTarget: false }));
    freshProcesses = mission.setup(freshProcesses);
    
    // Sort randomly just once per mission
    freshProcesses.sort(() => Math.random() - 0.5);

    setProcesses(freshProcesses);
    setCurrentMissionIdx(idx);
    setFeedback({ text: '', type: null });
  };

  const startGame = () => {
    setGameState('playing');
    loadMission(0);
  };

  const handleKill = (process: GameProcess) => {
    if (process.isTarget) {
      setFeedback({ text: 'Výborně! Správně jsi diagnostikoval problém a ukončil viníka.', type: 'success' });
      
      // Ukončíme proces vizuálně
      setProcesses(prev => prev.filter(p => p.id !== process.id));

      setTimeout(() => {
        loadMission(currentMissionIdx + 1);
      }, 2500);
    } else {
      if (process.isSystem) {
        setFeedback({ text: 'Kritická chyba! Ukončil jsi důležitý systémový proces Windows!', type: 'error' });
      } else {
        setFeedback({ text: 'Chyba! Tento proces za daný problém nemůže. Čti pozorněji zadání!', type: 'error' });
      }
      setTimeout(() => {
        setFeedback({ text: '', type: null });
      }, 3000);
    }
  };

  const resetGame = () => {
    setGameState('intro');
  };

  const currentMission = MISSIONS[currentMissionIdx];

  // Totals for the bottom bar
  const totalCpu = Math.min(100, processes.reduce((sum, p) => sum + p.cpu, 0));
  const totalRam = processes.reduce((sum, p) => sum + p.ram, 0);
  const totalNet = processes.reduce((sum, p) => sum + p.net, 0);

  return (
    <div className="max-w-6xl w-full flex flex-col items-center animate-in fade-in duration-500 px-4 pb-10">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
          Správce Úloh - Helpdesk
        </h2>
        {gameState === 'playing' ? (
           <div className="px-4 py-2 bg-blue-100 text-blue-800 font-black rounded-xl border border-blue-200 uppercase tracking-widest text-sm">
             Mise {currentMissionIdx + 1} z {MISSIONS.length}
           </div>
        ) : (
           <div className="w-24"></div>
        )}
      </div>

      {gameState === 'intro' ? (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-slate-100 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
             <Activity className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-4">Detektiv ve Správci úloh</h1>
          <p className="text-slate-500 text-lg mb-8 max-w-xl font-bold">
            Vítej na podpoře IT. Tvá zbraň? Tabulka <span className="text-blue-600">Správce úloh</span>.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 w-full max-w-xl">
            <h3 className="font-bold text-slate-700 mb-4 uppercase tracking-widest text-sm">Jak hrát:</h3>
            <ul className="space-y-3 font-medium text-slate-600">
              <li>📞 Přečteš si <strong>úkol z helpdesku</strong> (zamrzlý program, pomalý PC, vir...).</li>
              <li>📊 Budeš v reálném čase <strong>analyzovat běžící procesy</strong> (Sledovat CPU, RAM a Síť).</li>
              <li>🎯 Najdeš ten správný "zlobivý" proces a klikneš na <strong>Ukončit</strong>.</li>
              <li>⚠️ Dávej ale pozor! Pokud ukončíš důležitý proces systému Windows, uživatel ti nepoděkuje.</li>
              <li>🏆 Zvládni vyřešit všech 6 případů!</li>
            </ul>
          </div>
          <button onClick={startGame} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 text-xl">
             <Play className="w-6 h-6 fill-current" /> Jít do služby
          </button>
        </div>

      ) : gameState === 'playing' ? (
        <div className="w-full flex flex-col gap-4 h-[750px]">
          
          {/* Falešný Desktop */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center rounded-3xl border-8 border-slate-900 shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Desktop Area */}
            <div className="flex-1 relative flex flex-col items-center py-6 px-4 gap-4 overflow-hidden z-10">

              {/* Zadání Mise */}
              <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden flex gap-6 items-center border border-slate-700 shrink-0">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
                 
                 <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border-2 border-slate-700 shadow-inner">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 drop-shadow-md" />
                 </div>
                 <div>
                    <h3 className="text-blue-400 font-black uppercase tracking-widest text-xs mb-1">Mise {currentMissionIdx + 1}: {currentMission.title}</h3>
                    <p className="font-bold text-lg leading-snug">{currentMission.text}</p>
                 </div>
              </div>

              {/* Feedback banner */}
              {feedback.type && (
                <div className={`w-full max-w-5xl rounded-xl p-4 font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shrink-0 shadow-lg z-20 ${feedback.type === 'error' ? 'bg-red-100 text-red-900 border-2 border-red-400' : 'bg-green-100 text-green-900 border-2 border-green-400'}`}>
                  {feedback.type === 'error' ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  {feedback.text}
                </div>
              )}

              {/* Falešný Task Manager (Window) */}
              <div className="w-full max-w-5xl bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-400 flex flex-col overflow-hidden flex-1 min-h-0">
                 
                 {/* TM Header (Window Title Bar) */}
                 <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center bg-gradient-to-b from-white to-gray-50">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-gray-800 text-sm">Správce úloh</span>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                       <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                       <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    </div>
                 </div>

                 {/* Total Usage Bar */}
                 <div className="bg-gray-100 border-b border-gray-200 px-6 py-2 flex gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500 shrink-0">
                    <div className="flex items-center gap-2">
                       <Cpu className="w-4 h-4 text-blue-500" /> CPU: <span className={totalCpu > 80 ? 'text-red-600' : 'text-gray-800'}>{totalCpu.toFixed(0)} %</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <HardDrive className="w-4 h-4 text-emerald-500" /> Paměť: <span className={totalRam > 4000 ? 'text-red-600' : 'text-gray-800'}>{totalRam.toFixed(0)} MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Wifi className="w-4 h-4 text-purple-500" /> Síť: <span className="text-gray-800">{totalNet.toFixed(1)} Mbps</span>
                    </div>
                 </div>

                 {/* Table Wrapper (Scrollable) */}
                 <div className="flex-1 overflow-y-auto bg-white custom-scrollbar relative">
                    <table className="w-full text-sm text-left font-mono">
                      <thead className="text-xs text-gray-500 bg-gray-50 border-b-2 border-gray-200 sticky top-0 shadow-sm z-10">
                    <tr>
                      <th className="px-6 py-3 font-bold cursor-pointer hover:bg-gray-50">PID</th>
                      <th className="px-6 py-3 font-bold cursor-pointer hover:bg-gray-50">Jméno</th>
                      <th className="px-6 py-3 font-bold">Stav</th>
                      <th className="px-6 py-3 font-bold text-right cursor-pointer hover:bg-gray-50">CPU (%)</th>
                      <th className="px-6 py-3 font-bold text-right cursor-pointer hover:bg-gray-50">Paměť (MB)</th>
                      <th className="px-6 py-3 font-bold text-right cursor-pointer hover:bg-gray-50">Síť (Mbps)</th>
                      <th className="px-6 py-3 text-center">Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map(p => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-3 text-gray-400">{p.pid}</td>
                        <td className="px-6 py-3 font-bold text-gray-800 flex items-center gap-2">
                          {p.isSystem ? <Server className="w-4 h-4 text-slate-400" /> : <Activity className="w-4 h-4 text-blue-500" />}
                          {p.name}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                            ${p.status === 'Běží' ? 'bg-green-100 text-green-700' : p.status === 'Nereaguje' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}
                          `}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right font-bold text-gray-600">
                          {p.cpu.toFixed(1)}
                        </td>
                        <td className="px-6 py-3 text-right font-bold text-gray-600">
                          {p.ram.toFixed(0)}
                        </td>
                        <td className="px-6 py-3 text-right font-bold text-gray-600">
                          {p.net.toFixed(1)}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <button 
                            onClick={() => handleKill(p)}
                            disabled={feedback.type === 'success'}
                            className="text-xs bg-red-100 hover:bg-red-600 hover:text-white text-red-700 px-3 py-1.5 rounded font-bold transition-colors disabled:opacity-50"
                          >
                            Ukončit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
            </div>

            {/* Taskbar */}
            <div className="h-12 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 flex items-center px-4 justify-between z-40 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg opacity-80">
                    <Monitor className="w-5 h-5 text-white" />
                 </div>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded border border-slate-600 text-slate-300 text-xs font-bold shadow-inner border-b-2 border-b-blue-500">
                 <Activity className="w-3 h-3" />
                 Správce úloh
               </div>
            </div>
            
          </div>
        </div>

      ) : (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-emerald-400 flex flex-col items-center text-center animate-in zoom-in">
          <Trophy className="w-32 h-32 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-4">Výborná práce!</h2>
          
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl mb-8 font-bold border-2 border-emerald-200 max-w-2xl text-left">
            <p className="mb-4 text-center">Vyřešil jsi všechny krizové scénáře! Nyní víš, že Správce úloh slouží k diagnostice.</p>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li>Můžeš ukončit program, který zamrzl (Stav: Nereaguje).</li>
              <li>Můžeš odhalit programy, které zpomalují PC (zátěž CPU nebo RAM).</li>
              <li>Můžeš najít pochybné aktivity, které zatěžují síť (možné viry).</li>
              <li><strong>PID</strong> je unikátní číslo procesu (jako rodné číslo).</li>
            </ol>
          </div>
          
          <div className="flex gap-4">
            <button onClick={resetGame} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Zpět na úvod
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Zpět do menu <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RamManagerGame;
