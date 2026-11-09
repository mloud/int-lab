'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Clock, ShieldCheck, HardDrive, LogOut, AlertTriangle, MonitorPlay, Zap, Settings } from 'lucide-react';
import { UefiTab } from './BootData';

interface UefiSimulatorProps {
  onSuccessBoot: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export const UefiSimulator: React.FC<UefiSimulatorProps> = ({ onSuccessBoot, onRestart, onBack }) => {
  const [activeTab, setActiveTab] = useState<UefiTab>('main');
  const [tpmEnabled, setTpmEnabled] = useState(false);
  const [secureBootEnabled, setSecureBootEnabled] = useState(false);
  const [bootPriority1, setBootPriority1] = useState('usb');

  const [xmpEnabled, setXmpEnabled] = useState('disabled');
  const [virtualization, setVirtualization] = useState('disabled');
  const [fastBoot, setFastBoot] = useState('enabled');
  const [rgbLighting, setRgbLighting] = useState('aura');
  const [errorMsg, setErrorMsg] = useState('');

  const [cpuTemp, setCpuTemp] = useState(38);
  const [fanRpm, setFanRpm] = useState(1250);
  const [time, setTime] = useState('');

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
    const errors = [];
    if (!tpmEnabled) errors.push('Missing TPM 2.0.');
    if (!secureBootEnabled) errors.push('Secure Boot violation.');
    if (bootPriority1 !== 'nvme') errors.push('Reboot and Select proper Boot device or Insert Boot Media in selected Boot device and press a key.');

    if (errors.length > 0) {
      setErrorMsg('Boot Failure! Přečti si pozorně zadání, systém nemá podmínky pro spuštění Windows 11. Chyba(y): ' + errors.join(' '));
    } else {
      setErrorMsg('');
      onSuccessBoot();
    }
  };

  return (
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
              Save &amp; Exit <LogOut className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>

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
              <h2 className="text-3xl font-black mb-2">Save &amp; Reset</h2>
              <p className="text-slate-400 mb-8 max-w-md text-center">Uloží veškeré změny v konfiguraci, provede restart stroje a pokusí se najít a spustit operační systém podle Boot Priority.</p>
              
              <button 
                onClick={handleSaveAndExit}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-105"
              >
                Save Changes &amp; Reboot
              </button>
              <button onClick={onRestart} className="mt-8 text-slate-500 hover:text-slate-300 text-sm underline">Provést tvrdý restart PC</button>
              <button onClick={onBack} className="mt-4 text-slate-600 hover:text-slate-400 text-xs">Ukončit simulátor</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

