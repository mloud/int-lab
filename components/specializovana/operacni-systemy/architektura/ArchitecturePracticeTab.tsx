"use client";

import React, { useState } from 'react';
import { Cpu, ShieldCheck, HardDrive, Monitor, Bug, AlertTriangle, RefreshCw, Layers, CheckCircle2, Server, Wifi, Gamepad2, LayoutDashboard, ArrowDown, ArrowUp, ArrowRight, Shield } from 'lucide-react';
import { Phase, ArchitectureTarget, MODULES } from './OsArchitectureData';

export const ArchitecturePracticeTab = ({
  phase,
  setPhase
}: {
  phase: Phase;
  setPhase: (p: Phase) => void;
}) => {
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
  const [commState, setCommState] = useState<'idle' | 'syscall-request' | 'syscall-kernel' | 'syscall-driver' | 'syscall-done'>('idle');

  // Attack Simulation State
  const [attackState, setAttackState] = useState<'idle' | 'trying' | 'blocked'>('idle');
  const [attackTarget, setAttackTarget] = useState<'mem' | 'exec' | null>(null);


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
  const advanceCommStep = () => {
    if (commState === 'idle') setCommState('syscall-request');
    else if (commState === 'syscall-request') setCommState('syscall-kernel');
    else if (commState === 'syscall-kernel') setCommState('syscall-driver');
    else if (commState === 'syscall-driver') setCommState('syscall-done');
    else if (commState === 'syscall-done') setCommState('idle');
  };

  // --- ATTACK SIMULATION LOGIC ---
  const handleAttack = (target: 'mem' | 'exec') => {
    setAttackTarget(target);
    setAttackState('trying');
    setTimeout(() => setAttackState('blocked'), 1500);
  };
  const resetAttack = () => { setAttackState('idle'); setAttackTarget(null); };

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
          <div className="animate-in fade-in duration-500 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 mb-10 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <button onClick={() => setPhase('builder')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'builder' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>1. Skládačka</button>
              <button onClick={() => setPhase('crash-test')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'crash-test' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>2. Crash Test</button>
              <button onClick={() => setPhase('communication')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'communication' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>3. Paměť</button>
              <button onClick={() => { resetAttack(); setPhase('attack'); }} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'attack' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>🏴‍☠️ 4. Útok</button>
            </div>

            {phase === 'builder' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
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
                    <div className="p-2 bg-blue-200 rounded-full flex-shrink-0"><AlertTriangle className="w-5 h-5 text-blue-600" /></div>
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
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center w-full">
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
                          :( KERNEL PANIC<br />
                          <span className="text-sm font-sans mt-2 block">Systém byl zastaven, aby nedošlo k poškození dat. Ovladač způsobil pád celého jádra.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 h-48">
                        <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><HardDrive /></div>
                        <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Cpu /></div>
                        <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Monitor /></div>
                        <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Wifi /></div>
                      </div>
                    )}
                  </div>

                  {/* Microkernel crash state */}
                  <div className="p-8 rounded-3xl border-4 bg-blue-50 border-blue-200 relative overflow-hidden transition-all duration-500">
                    <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-800">Mikrojádro</h2>

                    <div className="grid grid-cols-2 gap-4 h-48 relative z-10">
                      <div className="bg-white rounded-xl flex items-center justify-center font-bold text-blue-500 shadow-sm border-2 border-blue-100"><HardDrive /></div>

                      {/* The crashed module */}
                      <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${crashState !== 'running' && crashedModule === 'gpu'
                        ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse'
                        : 'bg-white text-blue-500 border-2 border-blue-100'
                        }`}>
                        {crashState !== 'running' && crashedModule === 'gpu' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Monitor />}
                      </div>

                      <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${crashState !== 'running' && crashedModule === 'net'
                        ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse'
                        : 'bg-white text-blue-500 border-2 border-blue-100'
                        }`}>
                        {crashState !== 'running' && crashedModule === 'net' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Wifi />}
                      </div>

                      <div className="bg-blue-600 rounded-xl flex flex-col items-center justify-center font-bold text-white shadow-sm border-2 border-blue-800">
                        <Cpu className="mb-1" />
                        <span className="text-[10px] tracking-wider uppercase">Micro-Kernel</span>
                      </div>
                    </div>

                    {crashState !== 'running' && (
                      <div className="absolute inset-x-0 bottom-2 text-center z-20 animate-in fade-in slide-in-from-bottom-2">
                        {crashState === 'crashed-mono' ? (
                          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-400 shadow-sm inline-flex items-center gap-1 animate-pulse">
                            💥 MONOLIT: Celý systém zkolaboval. Nutný restart!
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-300 shadow-sm inline-flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 animate-spin" /> MIKROJÁDRO: Ovladač restartován za ~2.3s. OS funguje dál! ✓
                          </span>
                        )}
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
              <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Paměť a Komunikace</h1>
                  <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                    Aplikace mají zakázáno přistupovat do prostoru jádra. Jediná cesta je přes <strong>System Call</strong>.
                    Sleduj, jak se přepíná Ring CPU při každém kroku.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start max-w-5xl mx-auto">

                  {/* LEVÝ SLOUPEC: Prstencový Ring diagram */}
                  <div className="lg:w-56 flex-shrink-0 flex flex-col items-center">
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Režim CPU</div>
                    <div className="relative w-48 h-48">
                      {/* Ring 3 – vnější */}
                      <div className={`absolute inset-0 rounded-full border-4 flex items-start justify-center pt-1.5 transition-all duration-500 ${commState === 'syscall-kernel' || commState === 'syscall-driver'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-blue-100 border-blue-400 shadow-lg shadow-blue-100'
                        }`}>
                        <span className={`font-black text-xs transition-colors duration-500 ${commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-blue-200' : 'text-blue-800'
                          }`}>Ring 3</span>
                      </div>
                      {/* Ring 1, 2 – prázdné */}
                      <div className="absolute inset-7 rounded-full bg-slate-50 border-4 border-slate-200 flex items-start justify-center pt-2">
                        <span className="font-black text-slate-300 text-[9px] uppercase">1,2 prázd.</span>
                      </div>
                      {/* Ring 0 – vnitřní */}
                      <div className={`absolute inset-14 rounded-full flex items-center justify-center transition-all duration-500 ${commState === 'syscall-kernel' || commState === 'syscall-driver'
                        ? 'bg-red-500 border-4 border-red-700 shadow-lg shadow-red-200'
                        : 'bg-red-50 border-4 border-red-200'
                        }`}>
                        <div className="text-center">
                          <Cpu className={`w-5 h-5 mx-auto transition-colors duration-500 ${commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-white animate-pulse' : 'text-red-300'
                            }`} />
                          <span className={`font-black text-xs leading-none transition-colors duration-500 mt-1 block ${commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-white' : 'text-red-400'
                            }`}>Ring 0</span>
                        </div>
                      </div>
                    </div>
                    <div className={`mt-3 text-center px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all duration-500 w-full ${commState === 'syscall-kernel' || commState === 'syscall-driver'
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                      }`}>
                      {commState === 'syscall-kernel' || commState === 'syscall-driver'
                        ? '🔴 Ring 0 — Kernel Mode'
                        : '🔵 Ring 3 — User Mode'}
                    </div>
                  </div>

                  {/* PRAVÝ SLOUPEC: Krokování + RAM */}
                  <div className="flex-1 min-w-0 flex flex-col gap-4">
                    {/* Krokování */}
                    <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 shadow-sm">
                      <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 block">Co se děje?</span>
                      <p className="text-sm font-bold text-indigo-900 leading-relaxed min-h-[52px]">
                        {commState === 'idle' && "Hra narazila na checkpoint. Protože běží v Ring 3, nemůže sama ukládat na disk. Odešle System Call k jádru."}
                        {commState === 'syscall-request' && "Hra požádala o uložení. Systém hardwarově přepne CPU do Ring 0, aby OS mohl s diskem manipulovat."}
                        {commState === 'syscall-kernel' && "Jádro přijalo požadavek a zkontrolovalo oprávnění. Předá instrukce ovladači disku."}
                        {commState === 'syscall-driver' && "Ovladač data uložil na SSD. Jádro pošle zprávu o úspěchu zpět do Hra.exe a CPU se uzamkne do Ring 3."}
                        {commState === 'syscall-done' && "Proces kompletní! Celý průchod přes System Call trval jen mikrosekundy."}
                      </p>
                      <button
                        onClick={advanceCommStep}
                        className="mt-3 w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black border-b-4 border-indigo-800 rounded-xl transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest text-sm shadow-md"
                      >
                        {commState === 'idle' && "Krok 1: Poslat SysCall ↓"}
                        {commState === 'syscall-request' && "Krok 2: Přepnout do Ring 0 🔴"}
                        {commState === 'syscall-kernel' && "Krok 3: Vykonat přes Ovladač →"}
                        {commState === 'syscall-driver' && "Krok 4: Návrat do Ring 3 🔵"}
                        {commState === 'syscall-done' && "↺ Resetovat ukázku"}
                      </button>
                    </div>

                    {/* RAM diagram – kompaktní */}
                    <div className="bg-white rounded-2xl border-4 border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-200 text-slate-700 px-4 py-1.5 font-black tracking-widest uppercase text-xs text-center">
                        Rozložení v RAM
                      </div>
                      {/* User Space */}
                      <div className="bg-red-50/60 border-b-2 border-dashed border-red-200 px-4 py-3 relative">
                        <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">User Space — Ring 3</div>
                        <div className="flex gap-2 flex-wrap">
                          <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 relative transition-all ${commState === 'syscall-request' || commState === 'syscall-done' ? 'border-indigo-400 shadow-md' : 'border-red-200'
                            }`}>
                            <Gamepad2 className="w-3 h-3 text-red-500" /> Hra.exe
                            {commState === 'syscall-request' && <span className="text-indigo-500 text-base animate-bounce ml-1">↓</span>}
                            {commState === 'syscall-done' && <span className="text-green-500 text-base animate-bounce ml-1">↑</span>}
                          </div>
                          <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-50 flex items-center gap-1.5">
                            <LayoutDashboard className="w-3 h-3 text-slate-400" /> Prohlížeč
                          </div>
                        </div>
                      </div>
                      {/* Barrier */}
                      <div className={`h-5 flex items-center justify-center transition-colors duration-300 ${commState === 'syscall-request' ? 'bg-indigo-500' : 'bg-slate-400'
                        }`}>
                        <span className="text-white text-[9px] font-black uppercase tracking-widest">Hardwarová bariéra — MPU</span>
                      </div>
                      {/* Kernel Space */}
                      <div className="bg-slate-100 px-4 py-3">
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Kernel Space — Ring 0</div>
                        <div className="flex gap-2 flex-wrap">
                          <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'border-indigo-400 shadow-sm' : 'border-slate-200'
                            }`}>
                            <Cpu className={`w-3 h-3 ${commState === 'syscall-kernel' ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} /> Jádro OS
                            {commState === 'syscall-kernel' && <span className="text-[9px] text-indigo-500 font-mono">Ověřuji...</span>}
                          </div>
                          <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${commState === 'syscall-driver' ? 'border-green-400 shadow-sm' : 'border-slate-200'
                            }`}>
                            <HardDrive className={`w-3 h-3 ${commState === 'syscall-driver' ? 'text-green-500 animate-bounce' : 'text-slate-400'}`} /> Ovladač disku
                            {commState === 'syscall-driver' && <span className="text-[9px] text-green-600 font-mono">Zapisuji...</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {phase === 'attack' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">🏴‍☠️ Eskalace Privilegií</h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Jsi škodlivý program (Malware) běžící v <strong>Ring 3 (User Space)</strong>. Zkus se dostat
                    do chráněné paměti jádra nebo spustit zakázanou instrukci. Uvidíš, co ti v tom zabrání.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                  {/* Memory map – stejný vizuální styl jako RAM v sekci Komunikace */}
                  <div className="bg-white rounded-2xl border-4 border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-200 text-slate-700 px-4 py-1.5 font-black tracking-widest uppercase text-xs text-center">
                      Rozložení v RAM
                    </div>

                    {/* User Space */}
                    <div className={`border-b-2 border-dashed px-4 py-3 relative transition-all duration-300 ${attackState === 'trying' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50/60 border-red-200'
                      }`}>
                      <div className="flex justify-between text-xs font-mono text-red-400 mb-2 font-bold">
                        <span>Adresa: 11</span><span>Adresa: 100</span>
                      </div>
                      <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">User Space — Ring 3 (Ty jsi tady)</div>
                      <div className="flex gap-2 flex-wrap">
                        <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${attackState === 'trying' ? 'border-yellow-400 shadow-md animate-pulse' : 'border-red-200'
                          }`}>
                          <Bug className="w-3 h-3 text-red-500" /> malware.exe ← TY
                        </div>
                        <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-60 flex items-center gap-1.5">
                          <LayoutDashboard className="w-3 h-3 text-slate-400" /> notepad.exe
                        </div>
                        <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-60 flex items-center gap-1.5">
                          <Monitor className="w-3 h-3 text-slate-400" /> chrome.exe
                        </div>
                      </div>
                    </div>

                    {/* MPU Barrier */}
                    <div className={`h-5 flex items-center justify-center transition-all duration-500 ${attackState === 'trying' ? 'bg-yellow-400 animate-pulse' :
                      attackState === 'blocked' ? 'bg-red-500' : 'bg-slate-400'
                      }`}>
                      <span className="text-white text-[9px] font-black uppercase tracking-widest">
                        {attackState === 'trying' ? '⚡ Pokus o průnik...' :
                          attackState === 'blocked' ? '🛡️ MPU zablokovala přístup!' :
                            'Hardwarová bariéra — MPU'}
                      </span>
                    </div>

                    {/* Kernel Space */}
                    <div className={`bg-slate-100 px-4 py-3 transition-all duration-300 ${attackState === 'blocked' ? 'bg-green-50' : ''
                      }`}>
                      <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 font-bold">
                        <span>Adresa: 0</span><span>Adresa: 10</span>
                      </div>
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Kernel Space — Ring 0 (Zakázaná zóna)</div>
                      <div className="flex gap-2 flex-wrap">
                        <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-200 text-xs font-bold flex items-center gap-1.5">
                          <Cpu className="w-3 h-3 text-slate-400" /> Jádro OS
                        </div>
                        <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-200 text-xs font-bold flex items-center gap-1.5">
                          <HardDrive className="w-3 h-3 text-slate-400" /> Ovladač disku
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trying feedback */}
                  {attackState === 'trying' && (
                    <div className="text-center py-4 animate-in fade-in">
                      <div className="text-4xl mb-2 animate-bounce">⚡</div>
                      <div className="font-black text-yellow-700 uppercase tracking-widest">Probíhá pokus o průnik...</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">
                        {attackTarget === 'mem' ? 'malware.exe → zápis na adresu 5 (Kernel Space)' : 'malware.exe → execute(HLT) — instrukce jen pro Ring 0'}
                      </div>
                    </div>
                  )}

                  {/* Blocked feedback */}
                  {attackState === 'blocked' && (
                    <div className="bg-red-50 border-4 border-red-400 rounded-3xl p-6 animate-in zoom-in-95 duration-300">
                      <div className="font-mono text-xs text-red-800 bg-black/5 p-4 rounded-xl mb-4 leading-relaxed">
                        <div className="text-red-500 font-black text-sm mb-2">❌ SEGMENTATION FAULT / ACCESS VIOLATION</div>
                        <div>Process: malware.exe (Adresa 15–30) → Ring 3</div>
                        <div>Attempt: {attackTarget === 'mem' ? 'Zápis na adresu 5 (Kernel Space, Ring 0)' : 'Spuštění instrukce HLT — povolena jen v Ring 0'}</div>
                        <div className="text-red-400 mt-1">CPU: Ochranné porušení — Ring 3 nemůže přistoupit do Ring 0</div>
                        <div className="text-green-400 mt-1">→ Proces nuceně ukončen. Systém a ostatní aplikace v pořádku.</div>
                      </div>
                      <p className="text-sm font-medium text-red-700 leading-relaxed">
                        <strong>Procesor (CPU) sám, na čistě hardwarové úrovni,</strong> zachytil pokus o neoprávněný přístup
                        a okamžitě ukončil škodlivý proces. Ne antivirus. Ne Windows Defender. Samotný hardware.
                        Jádro OS a ostatní aplikace pokračují v běhu bez jakéhokoliv výpadku.
                      </p>
                    </div>
                  )}

                  {/* Attack buttons */}
                  {attackState === 'idle' && (
                    <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
                      <button
                        onClick={() => handleAttack('mem')}
                        className="bg-red-50 hover:bg-red-100 border-4 border-red-200 hover:border-red-400 p-6 rounded-3xl transition-all text-left active:scale-95 shadow-sm"
                      >
                        <div className="text-3xl mb-3">💾</div>
                        <div className="font-black text-red-800 uppercase tracking-widest text-sm mb-2">Útok na paměť jádra</div>
                        <div className="text-xs text-red-600 font-medium leading-relaxed">
                          Zkusím zapsat data na adresu 5 v Kernel Space (adresy 0–10), kde leží samotné jádro OS.
                        </div>
                      </button>
                      <button
                        onClick={() => handleAttack('exec')}
                        className="bg-orange-50 hover:bg-orange-100 border-4 border-orange-200 hover:border-orange-400 p-6 rounded-3xl transition-all text-left active:scale-95 shadow-sm"
                      >
                        <div className="text-3xl mb-3">⚡</div>
                        <div className="font-black text-orange-800 uppercase tracking-widest text-sm mb-2">Privilegovaná instrukce</div>
                        <div className="text-xs text-orange-600 font-medium leading-relaxed">
                          Zkusím spustit instrukci HLT (zastav procesor) — dostupná výhradně v Ring 0. Z Ring 3 je zakázána.
                        </div>
                      </button>
                    </div>
                  )}

                  {attackState === 'blocked' && (
                    <button onClick={resetAttack} className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black uppercase tracking-widest rounded-2xl transition-all border-b-4 border-slate-300">
                      Zkusit znovu
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Uzavření activeTab === 'practice' */}
          </div>
  );
};
