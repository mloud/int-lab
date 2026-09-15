import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cpu, Activity, Clock, ShieldCheck, HardDrive, LogOut, CheckCircle2, AlertTriangle, MonitorPlay, Zap, Settings, Database, MemoryStick, LayoutTemplate } from 'lucide-react';

interface OsBootChapterProps {
  onBack: () => void;
}

type UefiTab = 'main' | 'advanced' | 'tweaker' | 'security' | 'boot' | 'exit';
type Phase = 0 | 1 | 'post' | 2;

const BOOT_SEQUENCE_TASKS = [
  { id: 'step-1', text: 'Zapnutí PC (Základní deska)', detail: 'Do desky jde proud, probouzí se hardware a předává řízení čipu s firmwarem.' },
  { id: 'step-2', text: 'UEFI Firmware', detail: 'Načtení základního kódu z čipu na základní desce (moderní náhrada BIOSu).' },
  { id: 'step-3', text: 'POST test', detail: 'Power-On Self-Test: Rychlá hardwarová kontrola (zkouší se RAM, detekují se disky).' },
  { id: 'step-4', text: 'Čtení GPT tabulky', detail: 'UEFI prohledává systémový disk a jeho tabulku GPT, aby našlo malý skrytý EFI oddíl.' },
  { id: 'step-5', text: 'Spuštění Boot Manageru', detail: 'UEFI najde a spustí správce spouštění (např. Windows Boot Manager nebo GRUB) z EFI oddílu.' },
  { id: 'step-6', text: 'Načtení Jádra OS', detail: 'Boot Manager předává řízení do rukou hlavního jádra operačního systému (Kernelu). Systém nabíhá.' },
];

const BOOT_COMPONENTS = [
  { id: 'comp-1', text: 'Základní deska', detail: '(Zdroj a obvody rozvádějící proud)', icon: LayoutTemplate, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'comp-2', text: 'Flash čip na desce', detail: '(Fyzický čip, kde je nahrán UEFI kód)', icon: MemoryStick, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'comp-3', text: 'RAM, CPU a zbytek HW', detail: '(Komponenty, které se během testu ověřují)', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'comp-4', text: 'Pevný disk (Fyzický)', detail: '(Obsahuje úplně na začátku GPT strukturu)', icon: HardDrive, color: 'text-slate-500', bg: 'bg-slate-50' },
  { id: 'comp-5', text: 'Skrytý EFI oddíl', detail: '(FAT32 oddíl a soubor bootmgfw.efi)', icon: ShieldCheck, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'comp-6', text: 'Systémový oddíl (C:)', detail: '(Samotný obří adresář Windows s Kernelem)', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const OsBootChapter: React.FC<OsBootChapterProps> = ({ onBack }) => {
  // 0 = Splash screen, 1 = UEFI, 'post' = POST sequence, 2 = Sequence Builder
  const [phase, setPhase] = useState<Phase>(0);
  
  // Phase 0: Splash screen
  const [splashTimer, setSplashTimer] = useState(5);
  const [missedUefi, setMissedUefi] = useState(false);

  // Phase 1: UEFI
  const [activeTab, setActiveTab] = useState<UefiTab>('main');
  const [tpmEnabled, setTpmEnabled] = useState(false);
  const [secureBootEnabled, setSecureBootEnabled] = useState(false);
  const [bootPriority1, setBootPriority1] = useState('usb'); // 'nvme' | 'usb' | 'network' | 'hdd'
  
  // Dummy UEFI settings for complexity
  const [xmpEnabled, setXmpEnabled] = useState('disabled');
  const [virtualization, setVirtualization] = useState('disabled');
  const [fastBoot, setFastBoot] = useState('enabled');
  const [rgbLighting, setRgbLighting] = useState('aura');

  const [errorMsg, setErrorMsg] = useState('');
  
  // Fake telemetry
  const [cpuTemp, setCpuTemp] = useState(38);
  const [fanRpm, setFanRpm] = useState(1250);
  const [time, setTime] = useState('');

  // Phase Post
  const [postLines, setPostLines] = useState<string[]>([]);

  // Phase 2a: Sequence Builder (Process)
  const [placedSteps, setPlacedSteps] = useState<(string | null)[]>(Array(6).fill(null));
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Phase 2b: Component Builder
  const [placedComponents, setPlacedComponents] = useState<(string | null)[]>(Array(6).fill(null));
  const [selectedComponentBlock, setSelectedComponentBlock] = useState<string | null>(null);

  // Keyboard listener for DEL / F2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 0 && !missedUefi) {
        if (e.key === 'Delete' || e.key === 'F2') {
          setPhase(1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, missedUefi]);

  // Splash countdown
  useEffect(() => {
    if (phase === 0 && !missedUefi) {
      if (splashTimer > 0) {
        const t = setTimeout(() => setSplashTimer(splashTimer - 1), 1000);
        return () => clearTimeout(t);
      } else {
        setMissedUefi(true);
      }
    }
  }, [phase, splashTimer, missedUefi]);

  // Telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString());
      setCpuTemp(35 + Math.floor(Math.random() * 6));
      setFanRpm(1200 + Math.floor(Math.random() * 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveAndExit = () => {
    let errors = [];
    if (!tpmEnabled) errors.push('Missing TPM 2.0.');
    if (!secureBootEnabled) errors.push('Secure Boot violation.');
    if (bootPriority1 !== 'nvme') errors.push('Reboot and Select proper Boot device or Insert Boot Media in selected Boot device and press a key.');

    if (errors.length > 0) {
      setErrorMsg('Boot Failure! Přečti si pozorně zadání, systém nemá podmínky pro spuštění Windows 11. Chyba(y): ' + errors.join(' '));
    } else {
      setErrorMsg('');
      setPhase('post');
      runPostSequence();
    }
  };

  const runPostSequence = () => {
    const sequence = [
      'American Megatrends Inc.',
      'ASUS EZ UEFI BIOS Revision 3402',
      'CPU: AMD Ryzen 5 7600X 6-Core Processor',
      'Speed: 4.70 GHz',
      'Memory Testing: 32768 MB OK',
      'Initializing USB Controllers .. Done.',
      'Verifying TPM 2.0 Module ... OK',
      'Secure Boot Status ... Enabled',
      'Detecting Storage Devices ...',
      'NVMe: Samsung 980 PRO 1TB ... OK',
      'Reading GPT Partition Table ... Found EFI System Partition',
      'Loading Windows Boot Manager (bootmgfw.efi) ...'
    ];

    let i = 0;
    setPostLines([]);
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setPostLines(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase(2), 2000);
      }
    }, 400);
  };

  const handleSlotClick = (index: number) => {
    if (selectedBlock !== null) {
      if (placedSteps[index] !== null) return;
      const newPlaced = [...placedSteps];
      newPlaced[index] = selectedBlock;
      setPlacedSteps(newPlaced);
      setSelectedBlock(null);
    } else {
      if (placedSteps[index] !== null) {
        const newPlaced = [...placedSteps];
        newPlaced[index] = null;
        setPlacedSteps(newPlaced);
      }
    }
  };

  const handleCompSlotClick = (index: number) => {
    if (selectedComponentBlock !== null) {
      if (placedComponents[index] !== null) return;
      const newPlaced = [...placedComponents];
      newPlaced[index] = selectedComponentBlock;
      setPlacedComponents(newPlaced);
      setSelectedComponentBlock(null);
    } else {
      if (placedComponents[index] !== null) {
        const newPlaced = [...placedComponents];
        newPlaced[index] = null;
        setPlacedComponents(newPlaced);
      }
    }
  };

  const availableBlocks = BOOT_SEQUENCE_TASKS.map(t => t.id).filter(id => !placedSteps.includes(id));
  const displayBlocks = [...availableBlocks].sort();

  const isSequenceCorrect = placedSteps.every((step, i) => step === BOOT_SEQUENCE_TASKS[i].id);
  const isSequenceFull = placedSteps.every(step => step !== null);

  const isPhase2bUnlocked = isSequenceFull && isSequenceCorrect;

  const availableCompBlocks = BOOT_COMPONENTS.map(t => t.id).filter(id => !placedComponents.includes(id));
  const displayCompBlocks = [...availableCompBlocks].sort();

  const isCompSequenceCorrect = placedComponents.every((comp, i) => comp === BOOT_COMPONENTS[i].id);
  const isCompSequenceFull = placedComponents.every(comp => comp !== null);

  const restartMachine = () => {
    setMissedUefi(false);
    setSplashTimer(5);
    setPhase(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
      
      {/* PHASE 0: Splash / Boot Menu */}
      {phase === 0 && (
        <div className="h-screen w-full flex flex-col relative justify-center items-center bg-black">
          <button onClick={onBack} className="absolute top-4 left-4 z-50 text-slate-500 hover:text-white px-4 py-2 border border-slate-800 rounded">Ukončit simulaci</button>
          
          {!missedUefi ? (
            <div className="text-center animate-in fade-in duration-1000">
              <div className="mb-12 font-black text-6xl tracking-widest text-blue-600 italic">ASUS</div>
              <div className="mt-20">
                <p className="font-mono text-xl text-slate-300">Press <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">DEL</span> or <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">F2</span> to enter UEFI BIOS setting</p>
                <div className="mt-6 flex justify-center items-center gap-4">
                  <button 
                    onClick={() => setPhase(1)} 
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-mono rounded-lg border border-slate-600 transition-colors"
                  >
                    Stisknout klávesu [DEL] ({splashTimer}s)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-left font-mono text-slate-300 self-start p-8 animate-in fade-in">
              <div className="mb-4">American Megatrends Inc.</div>
              <div className="mb-4 text-red-500 font-bold">Reboot and Select proper Boot device<br/>or Insert Boot Media in selected Boot device and press a key_</div>
              <p className="mt-8 text-sm text-slate-500">Nenastavil jsi BIOS včas nebo nejsou správně nastavené podmínky. Systém neví, co má dělat.</p>
              <button 
                onClick={restartMachine}
                className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded"
              >
                Tvrdý restart PC (Ctrl+Alt+Del)
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 1: UEFI */}
      {phase === 1 && (
        <div className="flex flex-col h-screen animate-in fade-in duration-500 bg-slate-900">
          <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/30">EZ</div>
              <div>
                <h1 className="text-xl font-bold tracking-widest text-slate-100">UEFI BIOS Utility</h1>
                <p className="text-xs text-slate-400">Advanced Mode</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2"><Clock className="text-blue-400 w-4 h-4" /> {time}</div>
              <div className="flex items-center gap-2"><Activity className="text-red-400 w-4 h-4" /> CPU {cpuTemp}°C</div>
              <div className="flex items-center gap-2"><Cpu className="text-emerald-400 w-4 h-4" /> {fanRpm} RPM</div>
              <div className="flex items-center gap-2"><Zap className="text-yellow-400 w-4 h-4" /> 1.25V</div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar menu */}
            <div className="w-64 bg-slate-800/80 border-r border-slate-700 p-4 flex flex-col gap-2 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)]">
              <button onClick={() => setActiveTab('main')} className={`p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'main' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                Information <MonitorPlay className="w-4 h-4 opacity-50" />
              </button>
              <button onClick={() => setActiveTab('tweaker')} className={`p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'tweaker' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                Ai Tweaker <Zap className="w-4 h-4 opacity-50" />
              </button>
              <button onClick={() => setActiveTab('advanced')} className={`p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'advanced' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                Advanced <Settings className="w-4 h-4 opacity-50" />
              </button>
              <button onClick={() => setActiveTab('security')} className={`p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                Security <ShieldCheck className="w-4 h-4 opacity-50" />
              </button>
              <button onClick={() => setActiveTab('boot')} className={`p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'boot' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                Boot <HardDrive className="w-4 h-4 opacity-50" />
              </button>
              <div className="mt-auto">
                <button onClick={() => setActiveTab('exit')} className={`w-full p-3 rounded-lg text-left font-bold transition-all flex justify-between items-center ${activeTab === 'exit' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                  Save & Exit <LogOut className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-slate-900 relative overflow-y-auto">
              {errorMsg && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-3 animate-in slide-in-from-top z-50">
                  <AlertTriangle />
                  {errorMsg}
                </div>
              )}

              {activeTab === 'main' && (
                <div className="animate-in fade-in">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">System Information</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4 text-slate-300">
                      <div className="flex justify-between border-b border-slate-800 pb-2"><span>BIOS Version:</span> <span className="font-mono">3402 x64</span></div>
                      <div className="flex justify-between border-b border-slate-800 pb-2"><span>Processor:</span> <span className="font-mono">AMD Ryzen 5 7600X</span></div>
                      <div className="flex justify-between border-b border-slate-800 pb-2"><span>Total Memory:</span> <span className="font-mono">32768 MB (DDR5 6000MHz)</span></div>
                      <div className="flex justify-between border-b border-slate-800 pb-2"><span>System Language:</span> <span className="font-mono">English</span></div>
                    </div>
                    <div className="bg-slate-800/80 p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/10">
                      <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2"><MonitorPlay className="w-5 h-5 text-yellow-400" /> Úkol: Nastartuj OS</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        Před tebou je čerstvě sestavený počítač s nainstalovaným systémem Windows na NVMe disku. Systém aktuálně nechce naběhnout. Tvá práce v UEFI:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                        <li>Windows 11 vyžaduje ke svému chodu <strong>určité bezpečnostní hardwarové funkce</strong>. Pokud nejsou obě zapnuté, nedovolí ti nastartovat.</li>
                        <li>Musíš UEFI sdělit, <strong>ze kterého disku má primárně bootovat</strong> (číst systém). Aktuálně se marně snaží číst data ze špatných portů.</li>
                      </ul>
                      <p className="mt-4 text-xs text-slate-500 italic">Tip: Ostatní pokročilá nastavení (Tweakery apod.) nechej být, nejsou pro start kritická.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tweaker' && (
                <div className="animate-in fade-in">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">Ai Tweaker (Overclocking)</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Ai Overclock Tuner</h3>
                        <p className="text-xs text-slate-400">Automatické taktování pamětí (D.O.C.P / XMP)</p>
                      </div>
                      <select 
                        value={xmpEnabled} 
                        onChange={(e) => setXmpEnabled(e.target.value)}
                        className="bg-slate-900 border border-slate-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                      >
                        <option value="disabled">Auto</option>
                        <option value="enabled">D.O.C.P I</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">CPU Core Ratio</h3>
                        <p className="text-xs text-slate-400">Násobič taktu procesoru</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-500">Auto</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="animate-in fade-in">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">Advanced Options</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">SVM Mode (Virtualization)</h3>
                        <p className="text-xs text-slate-400">Podpora pro běh virtuálních mašin.</p>
                      </div>
                      <select 
                        value={virtualization} 
                        onChange={(e) => setVirtualization(e.target.value)}
                        className="bg-slate-900 border border-slate-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                      >
                        <option value="disabled">Disabled</option>
                        <option value="enabled">Enabled</option>
                      </select>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Aura Lighting Control</h3>
                        <p className="text-xs text-slate-400">RGB podsvícení základní desky</p>
                      </div>
                      <select 
                        value={rgbLighting} 
                        onChange={(e) => setRgbLighting(e.target.value)}
                        className="bg-slate-900 border border-slate-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                      >
                        <option value="aura">All On</option>
                        <option value="stealth">Stealth Mode (Off)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="animate-in fade-in">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">Security Settings</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Administrator Password</h3>
                        <p className="text-xs text-slate-400">Heslo pro vstup do BIOSu</p>
                      </div>
                      <button className="bg-slate-900 border border-slate-600 text-slate-400 font-bold px-4 py-2 rounded-lg">Not Installed</button>
                    </div>

                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-blue-300">Trusted Computing (TPM 2.0)</h3>
                        <p className="text-xs text-slate-400">Hardwarový šifrovací modul (fTPM/dTPM)</p>
                      </div>
                      <select 
                        value={tpmEnabled ? 'enabled' : 'disabled'} 
                        onChange={(e) => setTpmEnabled(e.target.value === 'enabled')}
                        className="bg-slate-900 border border-blue-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="disabled">Disabled</option>
                        <option value="enabled">Enabled</option>
                      </select>
                    </div>

                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-blue-300">Secure Boot</h3>
                        <p className="text-xs text-slate-400">Ochrana proti načtení nepodepsaného bootloaderu</p>
                      </div>
                      <select 
                        value={secureBootEnabled ? 'enabled' : 'disabled'} 
                        onChange={(e) => setSecureBootEnabled(e.target.value === 'enabled')}
                        className="bg-slate-900 border border-blue-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="disabled">Disabled</option>
                        <option value="enabled">Enabled</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'boot' && (
                <div className="animate-in fade-in">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-2">Boot Configuration</h2>
                  <div className="space-y-6 max-w-xl">
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Fast Boot</h3>
                        <p className="text-xs text-slate-400">Přeskočí zdlouhavé kontroly HW při startu.</p>
                      </div>
                      <select 
                        value={fastBoot} 
                        onChange={(e) => setFastBoot(e.target.value)}
                        className="bg-slate-900 border border-slate-600 text-white font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-500"
                      >
                        <option value="disabled">Disabled</option>
                        <option value="enabled">Enabled</option>
                      </select>
                    </div>
                    
                    <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm pt-4">Boot Option Priorities</h3>

                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-blue-300">Boot Option #1</h3>
                        <p className="text-xs text-slate-400">Primární zařízení</p>
                      </div>
                      <select 
                        value={bootPriority1} 
                        onChange={(e) => setBootPriority1(e.target.value)}
                        className="bg-slate-900 border border-blue-600 text-blue-400 font-bold px-4 py-2 rounded-lg outline-none focus:border-blue-400 max-w-[280px]"
                      >
                        <option value="usb">UEFI: SanDisk USB Flash Drive</option>
                        <option value="network">PXE Network Boot (IPv4)</option>
                        <option value="nvme">Windows Boot Manager (NVMe Samsung)</option>
                        <option value="hdd">SATA3G_1: WDC WD10EZEX</option>
                      </select>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between opacity-50">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Boot Option #2</h3>
                      </div>
                      <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-500">Auto</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'exit' && (
                <div className="animate-in fade-in h-full flex flex-col items-center justify-center">
                  <MonitorPlay className="w-24 h-24 text-slate-600 mb-6" />
                  <h2 className="text-3xl font-black mb-2">Save & Reset</h2>
                  <p className="text-slate-400 mb-8 max-w-md text-center">Uloží veškeré změny v konfiguraci, provede restart stroje a pokusí se najít a spustit operační systém podle Boot Priority.</p>
                  
                  <button 
                    onClick={handleSaveAndExit}
                    className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-105"
                  >
                    Save Changes & Reboot
                  </button>
                  <button onClick={restartMachine} className="mt-8 text-slate-500 hover:text-slate-300 text-sm underline">Provést tvrdý restart PC</button>
                  <button onClick={onBack} className="mt-4 text-slate-600 hover:text-slate-400 text-xs">Ukončit simulátor</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PHASE POST */}
      {phase === 'post' && (
        <div className="h-screen w-full bg-black text-green-500 font-mono p-8 text-lg flex flex-col items-start overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
          {postLines.map((line, i) => (
            <div key={i} className="animate-in fade-in">{line}</div>
          ))}
          {postLines.length < 12 && (
            <div className="w-3 h-6 bg-green-500 animate-pulse mt-1"></div>
          )}
        </div>
      )}

      {/* PHASE 2 */}
      {phase === 2 && (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8 relative">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 uppercase tracking-wider text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Zpět do menu
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8 text-center animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 mb-4">Systém nastartoval! Jak k tomu došlo?</h1>
              <p className="text-slate-600 max-w-3xl mx-auto font-medium">
                Před naběhnutím samotných Windows proběhne spousta událostí na pozadí.
                <strong>1. krok:</strong> Seřaď logické děje chronologicky za sebou.
                {!isPhase2bUnlocked ? '' : ' 2. krok: Přiřaď k nim správnou HW/SW komponentu, která za ně zodpovídá.'}
              </p>
            </div>

            {/* Zóna úspěchu (Krok 1 - chybí seřadit) */}
            {isSequenceFull && !isSequenceCorrect && (
              <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-md mb-8 border border-red-200 animate-in slide-in-from-top flex items-center gap-4">
                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Něco je špatně.</h3>
                  <p className="text-sm">Logické kroky nejsou ve správném pořadí. Pamatuj: Deska -&gt; Firmware -&gt; Kontrola HW -&gt; Tabulka na disku -&gt; Spouštěč OS -&gt; Jádro OS. Kliknutím na umístěný blok ho vrátíš zpět.</p>
                </div>
              </div>
            )}
            
            {/* Zóna úspěchu (Krok 2 - finále) */}
            {isPhase2bUnlocked && isCompSequenceFull && isCompSequenceCorrect && (
              <div className="bg-green-600 text-white p-6 rounded-2xl shadow-xl mb-8 animate-in slide-in-from-top flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl">Naprosto dokonalé pochopení!</h3>
                  <p className="text-green-100 font-medium">Přesně takto funguje start moderního operačního systému. Už víš, co se děje softwarově, a přesně znáš i fyzické a datové komponenty, které to dělají.</p>
                </div>
              </div>
            )}
            {isPhase2bUnlocked && isCompSequenceFull && !isCompSequenceCorrect && (
              <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-md mb-8 border border-red-200 animate-in slide-in-from-top flex items-center gap-4">
                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Komponenty nejsou přiřazené správně.</h3>
                  <p className="text-sm">Některé komponenty nesedí ke svému logickému kroku. Kliknutím na komponentu (spodní slot) ji vrátíš zpět a zkus to znovu.</p>
                </div>
              </div>
            )}

            {/* FÁZE 2A a 2B Hrací pole */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 justify-center items-stretch relative">
              {placedSteps.map((placedId, index) => {
                const stepData = placedId ? BOOT_SEQUENCE_TASKS.find(t => t.id === placedId) : null;
                const isTargetCorrect = placedId === BOOT_SEQUENCE_TASKS[index].id;
                
                // Comp data for phase 2b
                const compPlacedId = placedComponents[index];
                const compData = compPlacedId ? BOOT_COMPONENTS.find(c => c.id === compPlacedId) : null;
                const isCompTargetCorrect = compPlacedId === BOOT_COMPONENTS[index].id;
                
                return (
                  <React.Fragment key={`slot-${index}`}>
                    <div className="flex flex-col gap-3 flex-1 min-w-[200px] relative">
                      
                      {/* Horní slot (Logické kroky) */}
                      <div 
                        onClick={() => !isPhase2bUnlocked && handleSlotClick(index)}
                        className={`h-[160px] rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all border-4 relative
                          ${!placedId && selectedBlock ? 'border-dashed border-indigo-400 bg-indigo-50 animate-pulse cursor-pointer' : ''}
                          ${!placedId && !selectedBlock ? 'border-dashed border-slate-300 bg-slate-100 hover:bg-slate-200 cursor-pointer' : ''}
                          ${placedId && !isPhase2bUnlocked ? 'border-solid border-slate-800 bg-slate-800 text-white shadow-lg cursor-pointer hover:bg-slate-700' : ''}
                          ${placedId && isPhase2bUnlocked ? 'border-solid border-slate-800 bg-slate-800 text-white opacity-80 cursor-default' : ''}
                          ${isSequenceFull && isTargetCorrect && !isPhase2bUnlocked ? '!border-green-500 !bg-green-700' : ''}
                          ${isSequenceFull && !isTargetCorrect && placedId ? '!border-red-500 !bg-red-700' : ''}
                        `}
                      >
                        <div className="absolute top-2 left-3 text-xs font-black opacity-30">Krok {index + 1}</div>
                        {!placedId && <span className="font-bold text-slate-400">Prázdné místo</span>}
                        {stepData && (
                          <>
                            <div className="font-black text-lg mb-2 mt-4">{stepData.text}</div>
                            <div className={`text-xs opacity-70 leading-tight ${isPhase2bUnlocked ? 'hidden xl:block' : ''}`}>
                              {stepData.detail}
                            </div>
                          </>
                        )}
                        {/* Zámeček když je fáze 2b aktivní */}
                        {isPhase2bUnlocked && <div className="absolute -bottom-2 right-2 text-green-400 bg-slate-800 rounded-full border border-green-500"><CheckCircle2 className="w-5 h-5"/></div>}
                      </div>

                      {/* Spodní slot (Komponenty - Fáze 2b) */}
                      {isPhase2bUnlocked && (
                        <div 
                          onClick={() => handleCompSlotClick(index)}
                          className={`h-[150px] rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all border-4 relative animate-in fade-in slide-in-from-top-4 duration-500 delay-${index * 100}
                            ${!compPlacedId && selectedComponentBlock ? 'border-dashed border-blue-400 bg-blue-50 animate-pulse cursor-pointer' : ''}
                            ${!compPlacedId && !selectedComponentBlock ? 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 cursor-pointer' : ''}
                            ${compPlacedId ? `border-solid border-blue-600 ${compData?.bg} shadow-md cursor-pointer hover:brightness-95` : ''}
                            ${isCompSequenceFull && isCompTargetCorrect ? '!border-green-500 !bg-green-50' : ''}
                            ${isCompSequenceFull && !isCompTargetCorrect && compPlacedId ? '!border-red-500 !bg-red-50' : ''}
                          `}
                        >
                          <div className="absolute top-2 left-3 text-xs font-black opacity-30 text-blue-800">Komponenta</div>
                          
                          {!compPlacedId && (
                            <div className="text-slate-400 flex flex-col items-center">
                              <LayoutTemplate className="w-8 h-8 opacity-20 mb-2" />
                              <span className="font-bold text-sm">Přiřaď HW/SW</span>
                            </div>
                          )}

                          {compData && (
                            <>
                              {compData.icon && <compData.icon className={`w-8 h-8 mb-2 ${isCompSequenceFull && isCompTargetCorrect ? 'text-green-600' : compData.color}`} />}
                              <div className="font-bold text-slate-800 mb-1 text-sm">{compData.text}</div>
                              <div className="text-[10px] text-slate-500 font-medium leading-tight">
                                {compData.detail}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Šipka mezi bloky */}
                    {index < 5 && (
                      <div className="hidden lg:flex flex-col justify-center text-slate-300">
                        <ArrowLeft className="w-8 h-8 rotate-180" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Zásobník (Fáze 2a) */}
            {!isSequenceFull && !isPhase2bUnlocked && (
              <div className="bg-slate-200 p-6 rounded-3xl border-2 border-slate-300 animate-in fade-in slide-in-from-bottom">
                <h3 className="font-black text-slate-500 uppercase tracking-widest text-sm mb-4 text-center">Vyber logický děj k umístění</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {displayBlocks.map(id => {
                    const stepData = BOOT_SEQUENCE_TASKS.find(t => t.id === id)!;
                    const isSelected = selectedBlock === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedBlock(isSelected ? null : id)}
                        className={`px-6 py-4 rounded-xl font-bold shadow-md transition-all border-2 w-full sm:w-auto text-sm
                          ${isSelected ? 'bg-indigo-600 text-white border-indigo-800 scale-105' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'}
                        `}
                      >
                        {stepData.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Zásobník (Fáze 2b) */}
            {isPhase2bUnlocked && !isCompSequenceFull && (
              <div className="bg-blue-100 p-6 rounded-3xl border-2 border-blue-200 shadow-inner animate-in fade-in slide-in-from-bottom">
                <h3 className="font-black text-blue-600 uppercase tracking-widest text-sm mb-4 text-center">Vyber HW/SW komponentu pro každý krok</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {displayCompBlocks.map(id => {
                    const compData = BOOT_COMPONENTS.find(c => c.id === id)!;
                    const isSelected = selectedComponentBlock === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedComponentBlock(isSelected ? null : id)}
                        className={`px-4 py-3 rounded-xl font-bold shadow-sm transition-all border-2 w-full sm:w-auto text-sm flex items-center gap-3
                          ${isSelected ? 'bg-blue-600 text-white border-blue-800 scale-105 shadow-lg' : 'bg-white text-slate-800 border-blue-200 hover:border-blue-400'}
                        `}
                      >
                        <compData.icon className={`w-5 h-5 ${isSelected ? 'text-white' : compData.color}`} />
                        <div className="text-left">
                          <div>{compData.text}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default OsBootChapter;
