import React, { useState } from 'react';
import { ArrowLeft, Cpu, ShieldCheck, HardDrive, Monitor, Bug, AlertTriangle, RefreshCw, Layers, CheckCircle2, Server, Wifi, Gamepad2, LayoutDashboard } from 'lucide-react';

interface OsArchitectureChapterProps {
  onBack: () => void;
}

type Phase = 'theory' | 'builder' | 'crash-test' | 'communication';
type ArchitectureTarget = 'monolithic' | 'microkernel';

interface OsModule {
  id: string;
  name: string;
  icon: React.FC<any>;
  core: boolean; // Is it absolutely required in kernel? (e.g. scheduler, ipc)
  alwaysUser?: boolean; // Does it ALWAYS belong in User Space? (e.g. apps, games)
}

const MODULES: OsModule[] = [
  { id: 'sched', name: 'Plánovač a IPC', icon: Cpu, core: true },
  { id: 'mem', name: 'Základní správa paměti', icon: Server, core: true },
  { id: 'fs', name: 'Souborový systém', icon: HardDrive, core: false },
  { id: 'gpu', name: 'Ovladač grafiky', icon: Monitor, core: false },
  { id: 'net', name: 'Ovladač sítě', icon: Wifi, core: false },
  { id: 'app', name: 'Běžné Programy', icon: LayoutDashboard, core: false, alwaysUser: true },
  { id: 'game', name: 'Hry', icon: Gamepad2, core: false, alwaysUser: true },
];

const OsArchitectureChapter: React.FC<OsArchitectureChapterProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('theory');

  // Builder State
  const [builderTarget, setBuilderTarget] = useState<ArchitectureTarget>('monolithic');
  const [activeSpace, setActiveSpace] = useState<'user' | 'kernel'>('kernel');
  const [userSpace, setUserSpace] = useState<string[]>([]);
  const [kernelSpace, setKernelSpace] = useState<string[]>([]);
  const [unassigned, setUnassigned] = useState<string[]>(MODULES.map(m => m.id));
  const [builderMessage, setBuilderMessage] = useState<string>('Přesuňte moduly do správných prostorů.');

  // Crash Test State
  const [crashState, setCrashState] = useState<'running' | 'crashed-mono' | 'recovering-micro'>('running');
  const [crashedModule, setCrashedModule] = useState<string | null>(null);

  // Communication State
  const [commState, setCommState] = useState<'idle' | 'direct-access' | 'syscall-start' | 'syscall-kernel' | 'syscall-done'>('idle');

  // --- BUILDER LOGIC ---
  const handleMoveModule = (moduleId: string, targetSpace: 'user' | 'kernel' | 'unassigned') => {
    setUserSpace(prev => prev.filter(id => id !== moduleId));
    setKernelSpace(prev => prev.filter(id => id !== moduleId));
    setUnassigned(prev => prev.filter(id => id !== moduleId));

    if (targetSpace === 'user') setUserSpace(prev => [...prev, moduleId]);
    if (targetSpace === 'kernel') setKernelSpace(prev => [...prev, moduleId]);
    if (targetSpace === 'unassigned') setUnassigned(prev => [...prev, moduleId]);
  };

  const checkBuilder = () => {
    if (unassigned.length > 0) {
      setBuilderMessage('Musíš umístit všechny moduly!');
      return;
    }

    if (builderTarget === 'monolithic') {
      const expectedKernel = MODULES.filter(m => !m.alwaysUser).map(m => m.id);
      const expectedUser = MODULES.filter(m => m.alwaysUser).map(m => m.id);

      const isKernelCorrect = expectedKernel.every(id => kernelSpace.includes(id)) && kernelSpace.length === expectedKernel.length;
      const isUserCorrect = expectedUser.every(id => userSpace.includes(id)) && userSpace.length === expectedUser.length;

      if (isKernelCorrect && isUserCorrect) {
        setBuilderMessage('Výborně! Postavil jsi monolitické jádro. Ovladače a služby běží uvnitř, zatímco programy v User Space.');
        setTimeout(() => {
          setBuilderTarget('microkernel');
          setUnassigned(MODULES.map(m => m.id));
          setUserSpace([]);
          setKernelSpace([]);
          setBuilderMessage('Nyní postav Mikrojádro! Ovladače musí ven, v Kernel Space zůstane jen to nejnutnější.');
        }, 4000);
      } else {
        setBuilderMessage('Chyba: V monolitickém jádře patří Ovladače a FS do Kernel Space, ale Hry a Aplikace musí zůstat v User Space!');
      }
    } else {
      // Mikrojádro
      const coreModules = MODULES.filter(m => m.core).map(m => m.id);
      const nonCoreModules = MODULES.filter(m => !m.core).map(m => m.id);

      const kernelHasOnlyCore = kernelSpace.every(id => coreModules.includes(id)) && kernelSpace.length === coreModules.length;
      const userHasNonCore = userSpace.every(id => nonCoreModules.includes(id)) && userSpace.length === nonCoreModules.length;

      if (kernelHasOnlyCore && userHasNonCore) {
        setBuilderMessage('Skvělé! Vytvořil jsi čisté mikrojádro. Ovladače a souborové systémy jsou bezpečně izolované v User Space.');
        setTimeout(() => {
          setPhase('crash-test');
        }, 4000);
      } else {
        setBuilderMessage('Chyba: Mikrojádro má v Kernel Space pouze plánovač a základní paměť. Zbytek musí být v User Space!');
      }
    }
  };

  // --- CRASH TEST LOGIC ---
  const injectBug = (moduleId: string) => {
    setCrashedModule(moduleId);
    setCrashState('crashed-mono');

    setTimeout(() => {
      setCrashState('recovering-micro');
      setTimeout(() => {
        setCrashState('running');
        setCrashedModule(null);
      }, 3000);
    }, 3000);
  };

  // --- COMMUNICATION LOGIC ---
  const triggerDirectAccess = () => {
    if (commState !== 'idle') return;
    setCommState('direct-access');
    setTimeout(() => {
      setCommState('idle');
    }, 4000);
  };

  const triggerSyscall = () => {
    if (commState !== 'idle') return;
    setCommState('syscall-start');
    setTimeout(() => {
      setCommState('syscall-kernel');
      setTimeout(() => {
        setCommState('syscall-done');
        setTimeout(() => {
          setCommState('idle');
        }, 3000);
      }, 2000);
    }, 1500);
  };

  // --- RENDER HELPERS ---
  const renderModule = (moduleId: string, onClickAction?: (id: string) => void) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return null;
    const Icon = mod.icon;
    return (
      <div 
        key={mod.id}
        onClick={() => onClickAction && onClickAction(mod.id)}
        className={`p-3 bg-white rounded-xl shadow-sm border-2 border-gray-100 flex items-center gap-3 ${onClickAction ? 'cursor-pointer hover:border-blue-400 hover:shadow-md transition-all' : ''}`}
      >
        <div className="p-2 bg-gray-100 rounded-lg"><Icon className="w-5 h-5 text-gray-700" /></div>
        <span className="font-bold text-sm text-gray-700">{mod.name}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl w-full min-h-screen p-4 flex flex-col items-center animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
        <div className="flex gap-2">
          <button onClick={() => setPhase('theory')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'theory' ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Teorie</button>
          <button onClick={() => setPhase('builder')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'builder' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Skládačka</button>
          <button onClick={() => setPhase('crash-test')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'crash-test' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Crash Test</button>
          <button onClick={() => setPhase('communication')} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'communication' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>Komunikace a Paměť</button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl w-full rounded-[3rem] shadow-2xl border-4 border-white p-8 sm:p-12 overflow-hidden relative min-h-[600px]">
        
        {phase === 'theory' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Architektura Jádra OS</h1>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Jádro (Kernel) je mozek operačního systému. Může být postaveno jako obří pevnost, kde všichni pracují společně (Monolit), nebo jako malé velitelství, které většinu práce deleguje ven (Mikrojádro).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Kernel Space Info */}
              <div className="bg-slate-100 p-6 rounded-3xl border-2 border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><Cpu className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><ShieldCheck className="text-slate-600"/> Kernel Space (Jádro)</h3>
                <ul className="text-sm text-slate-700 space-y-3 relative z-10">
                  <li><strong className="text-slate-900 block mb-1">Co to je:</strong> Chráněná část paměti, kde běží jádro OS a ovladače.</li>
                  <li><strong className="text-slate-900 block mb-1">Oprávnění:</strong> Má plný a neomezený přístup k hardwaru a všem paměťovým adresám.</li>
                  <li><strong className="text-red-600 block mb-1">Riziko:</strong> Chyba nebo pád v tomto prostoru obvykle znamená zkolabování celého systému (Modrá smrt / Kernel panic).</li>
                </ul>
              </div>

              {/* User Space Info */}
              <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><LayoutDashboard className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-blue-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><LayoutDashboard className="text-blue-600"/> User Space (Uživatel)</h3>
                <ul className="text-sm text-blue-800 space-y-3 relative z-10">
                  <li><strong className="text-blue-900 block mb-1">Co to je:</strong> Prostor, kde běží běžné uživatelské aplikace, hry nebo prohlížeče.</li>
                  <li><strong className="text-blue-900 block mb-1">Oprávnění:</strong> Omezená práva. Nemůže přistupovat přímo k hardwaru ani do paměti jiných aplikací.</li>
                  <li><strong className="text-blue-900 block mb-1">Komunikace (System Call):</strong> Když program potřebuje hardware (např. uložit soubor), musí požádat jádro pomocí tzv. Systémového volání.</li>
                  <li><strong className="text-green-600 block mb-1">Bezpečnost:</strong> Pokud spadne aplikace v User space, systém to ustojí a program lze jednoduše zavřít.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Monolithic */}
              <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-200">
                <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-slate-600" /> Monolitické Jádro
                </h2>
                <p className="text-sm text-slate-600 mb-6">Příklad: Linux, Windows, macOS</p>
                
                <div className="border-4 border-dashed border-red-300 rounded-2xl p-4 mb-4 bg-red-50/50">
                  <div className="text-center text-xs font-bold text-red-400 uppercase mb-2">User Space (Uživatelský prostor)</div>
                  <div className="flex justify-center gap-2">
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-bold text-gray-600">Aplikace</div>
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-bold text-gray-600">Hry</div>
                  </div>
                </div>

                <div className="border-4 border-slate-300 rounded-2xl p-6 bg-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-slate-300 px-3 py-1 rounded-bl-xl text-xs font-bold text-slate-700 uppercase">Kernel Space</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Cpu className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Plánovač</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><HardDrive className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Souborový systém</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Monitor className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Ovladač Grafiky</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Wifi className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Ovladač Sítě</span></div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200">
                  <strong className="text-green-600">Výhody:</strong> Extrémně rychlé, moduly spolu komunikují napřímo.<br/>
                  <strong className="text-red-600">Nevýhody:</strong> Pokud spadne jeden ovladač, spadne celý systém (Modrá smrt).
                </div>
              </div>

              {/* Microkernel */}
              <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200">
                <h2 className="text-2xl font-black text-blue-800 mb-2 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600" /> Mikrojádro
                </h2>
                <p className="text-sm text-blue-600 mb-6">Příklad: QNX (Auta), MINIX, seL4</p>
                
                <div className="border-4 border-dashed border-blue-300 rounded-2xl p-6 mb-4 bg-blue-100/50">
                  <div className="text-center text-xs font-bold text-blue-500 uppercase mb-2">User Space (Uživatelský prostor)</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><HardDrive className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Souborový systém</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><Monitor className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Ovladač Grafiky</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><Wifi className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Ovladač Sítě</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-gray-200"><span className="text-xs font-bold text-center">Běžné Aplikace</span></div>
                  </div>
                </div>

                <div className="border-4 border-blue-400 rounded-2xl p-4 bg-blue-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 px-3 py-1 rounded-bl-xl text-xs font-bold text-white uppercase">Kernel Space</div>
                  <div className="flex justify-center gap-3 mt-4">
                    <div className="px-4 py-2 bg-white rounded-xl shadow-sm flex items-center gap-2"><Cpu className="w-5 h-5 text-blue-600"/><span className="text-xs font-bold">Základní Plánovač</span></div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-blue-800 bg-white p-4 rounded-xl border border-blue-200">
                  <strong className="text-green-600">Výhody:</strong> Extrémně bezpečné. Pokud spadne ovladač, jen se restartuje bez pádu OS.<br/>
                  <strong className="text-orange-600">Nevýhody:</strong> Pomalejší, protože všechno musí posílat zprávy (IPC) k mikrojádru.
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => setPhase('builder')}
                className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Jdeme si to postavit!
              </button>
            </div>
          </div>
        )}

        {phase === 'builder' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Stavba OS: <span className={builderTarget === 'monolithic' ? 'text-slate-600' : 'text-blue-600'}>{builderTarget === 'monolithic' ? 'Monolitické Jádro' : 'Mikrojádro'}</span></h1>
              <p className="text-gray-600 font-medium bg-yellow-50 inline-block px-4 py-2 rounded-xl border border-yellow-200">
                💡 <strong>Tip:</strong> Nejprve kliknutím vyber aktivní zónu (červeně/modře orámovanou) a následně klikej na moduly pro jejich přesun. Moduly v zónách se kliknutím vrátí zpět.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Zdroje */}
              <div className="lg:w-1/3 bg-gray-50 rounded-3xl p-6 border-2 border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Nezařazené moduly</h3>
                <div className="flex flex-col gap-3 min-h-[200px]">
                  {unassigned.map(id => renderModule(id, (modId) => handleMoveModule(modId, activeSpace)))}
                  {unassigned.length === 0 && <div className="text-center text-gray-400 italic py-10">Vše umístěno</div>}
                </div>
              </div>

              {/* Cíle */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                <div 
                  onClick={() => setActiveSpace('user')}
                  className={`rounded-3xl p-6 border-4 cursor-pointer transition-all ${activeSpace === 'user' ? 'bg-red-50/80 border-red-400 shadow-md ring-4 ring-red-100' : 'bg-red-50/30 border-red-200 border-dashed hover:bg-red-50/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${activeSpace === 'user' ? 'text-red-600' : 'text-red-400'}`}>User Space (Uživatel) {activeSpace === 'user' && '(Aktivní)'}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-white/50 rounded-2xl">
                    {userSpace.map(id => renderModule(id, (modId) => handleMoveModule(modId, 'unassigned')))}
                    {userSpace.length === 0 && <div className="text-center text-red-300 italic w-full py-4">Zatím prázdné</div>}
                  </div>
                </div>

                <div 
                  onClick={() => setActiveSpace('kernel')}
                  className={`rounded-3xl p-6 border-4 cursor-pointer transition-all ${activeSpace === 'kernel' ? 'bg-slate-100 border-slate-400 shadow-md ring-4 ring-slate-200' : 'bg-slate-50 border-slate-200 border-dashed hover:bg-slate-100'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${activeSpace === 'kernel' ? 'text-slate-700' : 'text-slate-400'}`}>Kernel Space (Jádro) {activeSpace === 'kernel' && '(Aktivní)'}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-white/50 rounded-2xl">
                    {kernelSpace.map(id => renderModule(id, (modId) => handleMoveModule(modId, 'unassigned')))}
                    {kernelSpace.length === 0 && <div className="text-center text-slate-400 italic w-full py-4">Zatím prázdné</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-blue-800 font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-full flex-shrink-0"><AlertTriangle className="w-5 h-5 text-blue-600"/></div>
                <span>{builderMessage}</span>
              </div>
              <button 
                onClick={checkBuilder}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md uppercase tracking-widest transition-transform active:scale-95 whitespace-nowrap"
              >
                Zkontrolovat
              </button>
            </div>
          </div>
        )}

        {phase === 'crash-test' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Crash Test Simulátor</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Co se stane, když se v ovladači vyskytne fatální chyba (např. dělení nulou)? Vyberte modul a způsobněte chybu!
            </p>

            <div className="flex justify-center flex-wrap gap-4 mb-10">
              <button onClick={() => injectBug('net')} disabled={crashState !== 'running'} className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold border-2 border-red-300 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95">
                <Bug className="w-5 h-5" /> Zničit Síťový ovladač
              </button>
              <button onClick={() => injectBug('gpu')} disabled={crashState !== 'running'} className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold border-2 border-red-300 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95">
                <Bug className="w-5 h-5" /> Zničit Grafický ovladač
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monolithic crash state */}
              <div className={`p-8 rounded-3xl border-4 transition-all duration-500 ${crashState === 'crashed-mono' ? 'bg-blue-600 border-blue-800' : 'bg-slate-100 border-slate-300'}`}>
                <h2 className={`text-2xl font-black mb-6 uppercase tracking-widest ${crashState === 'crashed-mono' ? 'text-white' : 'text-slate-800'}`}>Monolit</h2>
                
                {crashState === 'crashed-mono' ? (
                  <div className="flex flex-col items-center justify-center h-48 animate-in zoom-in">
                    <AlertTriangle className="w-16 h-16 text-white mb-4 animate-bounce" />
                    <div className="text-white font-mono text-xl text-center">
                      :( KERNEL PANIC<br/>
                      <span className="text-sm font-sans mt-2 block">Systém byl zastaven, aby nedošlo k poškození dat. Ovladač způsobil pád celého jádra.</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 h-48">
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><HardDrive/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Cpu/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Monitor/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Wifi/></div>
                  </div>
                )}
              </div>

              {/* Microkernel crash state */}
              <div className="p-8 rounded-3xl border-4 bg-blue-50 border-blue-200 relative overflow-hidden transition-all duration-500">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-800">Mikrojádro</h2>
                
                <div className="grid grid-cols-2 gap-4 h-48 relative z-10">
                  <div className="bg-white rounded-xl flex items-center justify-center font-bold text-blue-500 shadow-sm border-2 border-blue-100"><HardDrive/></div>
                  
                  {/* The crashed module */}
                  <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                    crashState !== 'running' && crashedModule === 'gpu' 
                      ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse' 
                      : 'bg-white text-blue-500 border-2 border-blue-100'
                  }`}>
                    {crashState !== 'running' && crashedModule === 'gpu' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Monitor/>}
                  </div>
                  
                  <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                    crashState !== 'running' && crashedModule === 'net' 
                      ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse' 
                      : 'bg-white text-blue-500 border-2 border-blue-100'
                  }`}>
                    {crashState !== 'running' && crashedModule === 'net' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Wifi/>}
                  </div>

                  <div className="bg-blue-600 rounded-xl flex flex-col items-center justify-center font-bold text-white shadow-sm border-2 border-blue-800">
                    <Cpu className="mb-1"/>
                    <span className="text-[10px] tracking-wider uppercase">Micro-Kernel</span>
                  </div>
                </div>

                {crashState !== 'running' && (
                  <div className="absolute inset-x-0 bottom-2 text-center z-20 animate-in fade-in slide-in-from-bottom-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-300 shadow-sm inline-flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Ovladač spadl. OS jej restartuje...
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-center bg-green-50 p-6 rounded-3xl border-2 border-green-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left shadow-sm">
              <CheckCircle2 className="w-16 h-16 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-black text-green-800 text-xl mb-1 uppercase tracking-wider">Shrnutí</h3>
                <p className="text-sm text-green-700 font-medium leading-relaxed">
                  Zatímco u monolitického OS je chyba ovladače fatální a zastaví celý počítač (BSOD), mikrojádro izoluje služby do <strong>User Space</strong>. Když služba selže, jádro ji může jednoduše restartovat bez ovlivnění zbytku systému!
                </p>
              </div>
            </div>

          </div>
        )}

        {phase === 'communication' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Paměť a Komunikace</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Operační paměť (RAM) je přísně rozdělena. Aplikace mají zakázáno přistupovat do prostoru jádra, aby nemohly poškodit systém. Jediná cesta je přes <strong>System Call</strong> (Systémové volání).
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <button 
                onClick={triggerDirectAccess} 
                disabled={commState !== 'idle'} 
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold border-2 border-red-300 rounded-xl disabled:opacity-50 transition-all active:scale-95"
              >
                Sáhnout do hardwaru přímo
              </button>
              <button 
                onClick={triggerSyscall} 
                disabled={commState !== 'idle'} 
                className="px-6 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold border-2 border-indigo-300 rounded-xl disabled:opacity-50 transition-all active:scale-95"
              >
                Požádat přes System Call
              </button>
            </div>

            <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden text-left border-8 border-slate-700">
              
              {/* User Space Region */}
              <div className="bg-blue-50 border-4 border-blue-200 p-6 rounded-3xl mb-8 relative">
                <div className="absolute -top-3 left-6 bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  USER SPACE
                </div>
                <div className="flex justify-between text-xs font-mono text-blue-400 mb-4 font-bold">
                  <span>Adresa: 0</span>
                  <span>Adresa: 2 147 483 647</span>
                </div>

                <div className="flex gap-4">
                  <div className={`p-4 bg-white rounded-2xl shadow-sm border-2 w-48 relative z-10 transition-colors ${commState === 'direct-access' ? 'border-red-500' : 'border-blue-300'}`}>
                    <div className="flex items-center gap-2 font-bold text-blue-900 mb-2">
                      <LayoutDashboard className="w-5 h-5 text-blue-600" /> Hra.exe
                    </div>
                    
                    {commState === 'direct-access' && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-32 bg-red-500 origin-top animate-pulse z-0">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-xl">⚡</div>
                      </div>
                    )}
                    
                    {commState === 'syscall-start' && (
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce z-20">
                        SysCall!
                      </div>
                    )}

                    {commState === 'syscall-done' && (
                      <div className="absolute top-1/2 left-full translate-x-4 -translate-y-1/2 bg-green-100 text-green-700 border-2 border-green-300 text-xs font-bold px-3 py-1 rounded-xl whitespace-nowrap">
                        Data přijata ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* The Barrier */}
              <div className={`h-4 w-full rounded-full mb-8 relative transition-colors ${commState === 'direct-access' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-slate-600'}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-slate-400 text-[10px] font-black px-4 py-1 rounded-full border border-slate-700">
                  HARDWAROVÁ BARIÉRA (MPU)
                </div>
                {commState === 'direct-access' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-ping z-30">💥</div>
                )}
              </div>

              {/* Kernel Space Region */}
              <div className="bg-slate-900 border-4 border-slate-700 p-6 rounded-3xl relative">
                <div className="absolute -top-3 left-6 bg-slate-700 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  KERNEL SPACE
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-4 font-bold">
                  <span>Adresa: 2 147 483 648</span>
                  <span>Adresa: 4 294 967 295</span>
                </div>

                <div className="flex justify-center gap-12 relative">
                  {/* Jádro */}
                  <div className={`p-4 rounded-2xl shadow-sm border-2 w-48 text-center transition-all ${commState === 'syscall-kernel' ? 'bg-indigo-900 border-indigo-400' : 'bg-slate-800 border-slate-600'}`}>
                    <Cpu className={`w-8 h-8 mx-auto mb-2 ${commState === 'syscall-kernel' ? 'text-indigo-300 animate-pulse' : 'text-slate-500'}`} />
                    <div className="font-bold text-slate-300">Jádro OS</div>
                    {commState === 'syscall-kernel' && (
                      <div className="text-[10px] text-indigo-200 mt-2 font-mono">Prověřuji práva...<br/>Žádám ovladač...</div>
                    )}
                  </div>
                  
                  {/* Ovladač */}
                  <div className={`p-4 rounded-2xl shadow-sm border-2 w-48 text-center transition-all ${commState === 'syscall-kernel' ? 'bg-slate-700 border-slate-400' : 'bg-slate-800 border-slate-600'}`}>
                    <HardDrive className={`w-8 h-8 mx-auto mb-2 ${commState === 'syscall-kernel' ? 'text-slate-300' : 'text-slate-500'}`} />
                    <div className="font-bold text-slate-300">Ovladač Disku</div>
                    {commState === 'syscall-kernel' && (
                      <div className="text-[10px] text-green-400 mt-2 font-mono delay-500">Čtu data z disku...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informational Status Panel */}
              <div className="mt-8 min-h-[120px] flex items-center justify-center">
                {commState === 'idle' && (
                  <div className="text-slate-500 font-medium">Čekám na akci...</div>
                )}
                {commState === 'direct-access' && (
                  <div className="bg-red-600 text-white p-4 rounded-3xl text-center shadow-lg border-2 border-red-400 max-w-lg animate-in slide-in-from-bottom-2 fade-in">
                    <h3 className="font-black text-lg mb-1 flex items-center justify-center gap-2"><AlertTriangle className="w-5 h-5"/> Access Violation</h3>
                    <p className="text-xs font-medium">Aplikace se pokusila sáhnout do paměti jádra. Procesor (MPU bariéra) to detekoval a aplikaci okamžitě ukončil (Crash).</p>
                  </div>
                )}
                {commState === 'syscall-start' && (
                  <div className="bg-indigo-600 text-white p-4 rounded-3xl text-center shadow-lg border-2 border-indigo-400 animate-in slide-in-from-bottom-2 fade-in">
                    <div className="font-bold text-lg">1. Aplikace volá SysCall</div>
                  </div>
                )}
                {commState === 'syscall-kernel' && (
                  <div className="bg-indigo-800 text-white p-4 rounded-3xl text-center shadow-lg border-2 border-indigo-400 max-w-md animate-in slide-in-from-bottom-2 fade-in">
                    <div className="font-bold text-lg">2. Jádro přebírá kontrolu</div>
                    <p className="text-xs mt-1 text-indigo-200">Jádro v Kernel Space získává data z ovladače (vzájemná interní komunikace je zde plně povolena).</p>
                  </div>
                )}
                {commState === 'syscall-done' && (
                  <div className="bg-green-600 text-white p-4 rounded-3xl text-center shadow-lg border-2 border-green-400 max-w-lg animate-in slide-in-from-bottom-2 fade-in">
                    <h3 className="font-black text-lg mb-1 flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5"/> Úspěch</h3>
                    <p className="text-xs font-medium text-green-100">Jádro zapsalo výsledek zpět do bezpečné paměti (User Space) aplikace a předalo jí řízení.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OsArchitectureChapter;
