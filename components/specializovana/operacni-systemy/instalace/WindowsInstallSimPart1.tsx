"use client";

import React, { useState } from 'react';
import {
  Monitor, Key, HardDrive, ShieldAlert, WifiOff, Terminal,
  CheckCircle2, XCircle, ChevronRight, User, AlertTriangle, ArrowRight, RefreshCcw,
  BookOpen, ShieldCheck, Box, Globe, Settings, Cpu, Layers, Fingerprint, Server, PlayCircle, Activity
} from 'lucide-react';
import { Step, SimStepProps, WindowWrapper, TaskBubble } from './WindowsInstallShared';

export const WindowsInstallSimPart1: React.FC<SimStepProps> = ({
  currentStep,
  setCurrentStep,
  showFeedback
}) => {
  const [langAdded, setLangAdded] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedKbd1, setSelectedKbd1] = useState('de');
  const [selectedKbd2, setSelectedKbd2] = useState('');
  const [showKeyboardTester, setShowKeyboardTester] = useState(false);
  const [hardwareConfig, setHardwareConfig] = useState({
    ram: '',
    storage: '',
    cpu: '',
    monitor: ''
  });

  return (
    <>
      {currentStep === 'configurator' && (
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-5xl mx-auto border-4 border-slate-50">
          <div className="flex items-center gap-5 mb-8 border-b border-gray-100 pb-6 px-4 pt-24">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
              <HardDrive className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1">Příprava hardwaru</h1>
              <p className="text-gray-500 font-medium text-lg">Nakonfiguruj notebook, který bez problémů zvládne Windows 11.</p>
            </div>
          </div>
          
          <TaskBubble text="Najdi si minimální požadavky pro Windows 11. Notebook musí mít přesně DVOJNÁSOBEK minimální paměti RAM a úložiště typu SSD, jehož velikost je alespoň 10x větší než minimum pro Windows 11, ale nesmí přesáhnout 1000 GB. Procesor musí být výkonnější než absolutní minimum (musí mít ale podporu TPM 2.0). K tomu zákazník požaduje širokoúhlý (Ultrawide) 4K monitor (minimálně 30 palců). Zákazník má omezený rozpočet, proto vyber ze splňujících komponent ty NEJLEVNĚJŠÍ." />

          <div className="grid grid-cols-2 gap-8 mt-16 max-h-[60vh] overflow-y-auto px-4 pb-4">
            
            {/* RAM */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                Operační paměť (RAM)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ram1', label: '2 GB DDR4', price: 300 },
                  { id: 'ram2', label: '4 GB DDR4', price: 500 },
                  { id: 'ram3', label: '8 GB DDR4', price: 800 },
                  { id: 'ram4', label: '16 GB DDR4', price: 1500 },
                  { id: 'ram5', label: '32 GB DDR4', price: 2800 }
                ].map(ram => (
                  <button 
                    key={ram.id}
                    onClick={() => setHardwareConfig(prev => ({...prev, ram: ram.id}))}
                    className={`p-4 rounded-xl border-2 text-sm text-center font-semibold transition-all flex flex-col items-center gap-1 ${hardwareConfig.ram === ram.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md scale-[1.02]' : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50'}`}
                  >
                    <span>{ram.label}</span>
                    <span className={`text-xs ${hardwareConfig.ram === ram.id ? 'text-indigo-500' : 'text-gray-400'}`}>{ram.price} Kč</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Úložiště */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
                Úložiště
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'hdd500', label: '500 GB HDD', price: 800 },
                  { id: 'ssd500', label: '500 GB SSD', price: 1200 },
                  { id: 'hdd1000', label: '1000 GB HDD', price: 1100 },
                  { id: 'ssd1000', label: '1000 GB SSD', price: 2000 },
                  { id: 'ssd2000', label: '2000 GB SSD', price: 3800 }
                ].map(storage => (
                  <button 
                    key={storage.id}
                    onClick={() => setHardwareConfig(prev => ({...prev, storage: storage.id}))}
                    className={`p-4 rounded-xl border-2 text-sm text-center font-semibold transition-all flex flex-col items-center gap-1 ${hardwareConfig.storage === storage.id ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-md scale-[1.02]' : 'border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
                  >
                    <span>{storage.label}</span>
                    <span className={`text-xs ${hardwareConfig.storage === storage.id ? 'text-emerald-500' : 'text-gray-400'}`}>{storage.price} Kč</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Procesor */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-sm">3</span>
                Procesor (CPU)
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'cpu1', label: '1.0 GHz Dual-Core (bez TPM)', price: 1000 },
                  { id: 'cpu2', label: '1.0 GHz Dual-Core (s TPM 2.0)', price: 1500 },
                  { id: 'cpu3', label: '1.8 GHz Quad-Core (bez TPM)', price: 2000 },
                  { id: 'cpu4', label: '2.4 GHz Quad-Core (s TPM 2.0)', price: 3500 },
                  { id: 'cpu5', label: '3.5 GHz Octa-Core (bez TPM)', price: 4000 },
                  { id: 'cpu6', label: '3.6 GHz Octa-Core (s TPM 2.0)', price: 5500 }
                ].map(cpu => (
                  <button 
                    key={cpu.id}
                    onClick={() => setHardwareConfig(prev => ({...prev, cpu: cpu.id}))}
                    className={`p-4 rounded-xl border-2 text-sm text-left font-semibold transition-all flex justify-between items-center gap-2 ${hardwareConfig.cpu === cpu.id ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-md scale-[1.02]' : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:bg-rose-50/50'}`}
                  >
                    <span>{cpu.label}</span>
                    <span className={`text-xs whitespace-nowrap ${hardwareConfig.cpu === cpu.id ? 'text-rose-500' : 'text-gray-400'}`}>{cpu.price} Kč</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Monitor */}
            <div className="space-y-4">
              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm">4</span>
                Externí Monitor
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'mon1', label: '24" Full HD (1920x1080)', price: 2500 },
                  { id: 'mon2', label: '27" 4K Standard (16:9)', price: 6000 },
                  { id: 'mon3', label: '29" 4K Ultrawide (21:9)', price: 8000 },
                  { id: 'mon4', label: '34" 4K Ultrawide (21:9)', price: 12000 },
                  { id: 'mon5', label: '32" 2K Ultrawide (21:9)', price: 9000 },
                  { id: 'mon6', label: '38" 4K Ultrawide (21:9)', price: 18000 }
                ].map(mon => (
                  <button 
                    key={mon.id}
                    onClick={() => setHardwareConfig(prev => ({...prev, monitor: mon.id}))}
                    className={`p-4 rounded-xl border-2 text-sm text-left font-semibold transition-all flex justify-between items-center gap-2 ${hardwareConfig.monitor === mon.id ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-md scale-[1.02]' : 'border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50/50'}`}
                  >
                    <span>{mon.label}</span>
                    <span className={`text-xs whitespace-nowrap ${hardwareConfig.monitor === mon.id ? 'text-amber-500' : 'text-gray-400'}`}>{mon.price} Kč</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end px-4">
            <button 
              onClick={() => {
                if (!hardwareConfig.ram || !hardwareConfig.storage || !hardwareConfig.cpu || !hardwareConfig.monitor) {
                  showFeedback('error', 'Musíš vybrat všechny komponenty!');
                  return;
                }
                
                let errors = [];
                if (hardwareConfig.ram !== 'ram3') errors.push('RAM: Minimum pro Windows 11 je 4GB, zákazník požaduje přesně dvojnásobek (8 GB).');
                if (hardwareConfig.storage !== 'ssd1000') errors.push('Disk: Úložiště musí být typu SSD s kapacitou alespoň 10x větší než minimum pro Windows 11 (10 x 64 = 640 GB) a maximálně 1000 GB.');
                
                if (!['cpu4', 'cpu6'].includes(hardwareConfig.cpu)) {
                  if (['cpu1', 'cpu3', 'cpu5'].includes(hardwareConfig.cpu)) errors.push('CPU: Tento procesor nepodporuje bezpečnostní standard TPM 2.0, instalace by selhala.');
                  else errors.push('CPU: Procesor musí mít frekvenci vyšší než minimální 1.0 GHz.');
                }
                
                if (!['mon4', 'mon6'].includes(hardwareConfig.monitor)) {
                  errors.push('Monitor: Zákazník požaduje 4K širokoúhlý (Ultrawide) monitor s úhlopříčkou alespoň 30 palců.');
                }
                
                if (errors.length === 0) {
                  if (hardwareConfig.cpu === 'cpu6' || hardwareConfig.monitor === 'mon6') {
                    errors.push('Cena: Vybraný počítač sice splňuje požadavky, ale NENÍ nejlevnější možný! Zkuste najít levnější variantu procesoru nebo monitoru, která stále vyhovuje požadavkům.');
                  }
                }

                if (errors.length > 0) {
                  showFeedback('error', errors[0]);
                } else {
                  showFeedback('success', 'Skvěle! Komponenty odpovídají požadavkům a poradí si s Windows 11. Můžeme přejít k instalaci.', 'intro');
                }
              }}
              className="px-10 py-4 bg-[#0078D7] hover:bg-blue-700 text-white font-black text-lg rounded-2xl transition-all hover:scale-105 flex items-center gap-3 shadow-xl"
            >
              Zkontrolovat kompatibilitu <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'intro' && (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-3xl mx-auto border-4 border-slate-50">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Simulátor instalace Windows 11</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Vítej v interaktivním průvodci. Projdeme si přesné obrazovky instalačního procesu Windows. Na každé obrazovce dostaneš nahoře ve žluté bublině specifický úkol, který musíš splnit.
          </p>
          <button
            onClick={() => setCurrentStep('language')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-wider flex items-center gap-3 mx-auto"
          >
            Spustit instalátor <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {currentStep === 'language' && (
        <WindowWrapper>
          <TaskBubble text="Připravuješ PC pro českou firmu. Programátoři tu ale často používají anglické klávesové zkratky a píší kód, proto vyžadují české rozložení typu QWERTY a jako druhou klávesnici anglickou." />
          <div className="flex flex-col items-center justify-center flex-1 mt-16">
            <Monitor className="w-20 h-20 text-[#0078D7] mb-6 opacity-80" />
            <h2 className="text-2xl font-light text-gray-800 mb-8">Instalace systému Windows</h2>
            
            <div className="w-full max-w-md space-y-4">
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-right text-sm text-gray-600">Jazyk k instalaci:</label>
                <select 
                  value={selectedLang} 
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="border border-gray-300 p-1.5 text-sm w-full bg-white shadow-sm"
                >
                  <option value="cs">Čeština (Česká republika)</option>
                  <option value="en">Angličtina (Spojené státy)</option>
                  <option value="de">Němčina (Německo)</option>
                  <option value="fr">Francouzština (Francie)</option>
                </select>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-4">
                <label className="text-right text-sm text-gray-600">Formát času a měny:</label>
                <select className="border border-gray-300 p-1.5 text-sm w-full bg-gray-50" disabled>
                  <option>Čeština (Česká republika)</option>
                </select>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-start gap-4">
                <label className="text-right text-sm text-gray-600 mt-1.5">Klávesnice 1:</label>
                <select 
                  value={selectedKbd1} 
                  onChange={(e) => setSelectedKbd1(e.target.value)}
                  className="border border-gray-300 p-1.5 text-sm w-full bg-white shadow-sm"
                >
                  <option value="cs-qwertz">České (QWERTZ)</option>
                  <option value="cs-qwerty">České (QWERTY)</option>
                  <option value="en">Angličtina (Spojené státy)</option>
                  <option value="de">Němčina</option>
                </select>
              </div>
              
              {langAdded ? (
                <div className="grid grid-cols-[150px_1fr] items-start gap-4">
                  <label className="text-right text-sm text-gray-600 mt-1.5">Klávesnice 2:</label>
                  <select 
                    value={selectedKbd2} 
                    onChange={(e) => setSelectedKbd2(e.target.value)}
                    className="border border-gray-300 p-1.5 text-sm w-full bg-white shadow-sm border-blue-400"
                  >
                    <option value="" disabled>Vyberte klávesnici...</option>
                    <option value="cs-qwertz">České (QWERTZ)</option>
                    <option value="cs-qwerty">České (QWERTY)</option>
                    <option value="en">Angličtina (Spojené státy)</option>
                    <option value="de">Němčina</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-[150px_1fr] items-start gap-4">
                  <div></div>
                  <button 
                    onClick={() => setLangAdded(true)}
                    className="text-sm text-[#0078D7] hover:underline text-left"
                  >
                    + Přidat rozložení klávesnice
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 w-full flex justify-center">
              <button 
                onClick={() => setShowKeyboardTester(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 shadow-sm"
              >
                ⌨️ Otestovat chování klávesnice
              </button>
            </div>

            <div className="mt-12 w-full flex justify-end">
              <button
                onClick={() => {
                  if (selectedLang !== 'cs') {
                    showFeedback('error', 'Chyba: Zákazník je česká firma, jazyk prostředí by měl být Čeština.');
                  } else if (!langAdded || selectedKbd2 === '') {
                    showFeedback('error', 'Chyba: Nezapomeň přidat i druhou klávesnici (celkově potřebuješ CS QWERTY a EN).');
                  } else {
                    const kbds = [selectedKbd1, selectedKbd2];
                    if (kbds.includes('cs-qwerty') && kbds.includes('en')) {
                      showFeedback('success', 'Výborně! Programátoři budou nadšení z QWERTY rozložení.', 'key');
                    } else if (kbds.includes('cs-qwertz')) {
                      showFeedback('error', 'Chyba: QWERTZ rozložení má prohozené Z a Y, programátoři z toho šílí! Chtěli QWERTY.');
                    } else {
                      showFeedback('error', 'Chyba: Zkontroluj, že máš vybranou jednu českou QWERTY a jednu anglickou klávesnici.');
                    }
                  }
                }}
                className="px-8 py-1.5 bg-[#0078D7] hover:bg-blue-700 text-white text-sm"
              >
                Další
              </button>
            </div>
          </div>

          {showKeyboardTester && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[100] p-8">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
                <button onClick={() => setShowKeyboardTester(false)} className="absolute top-4 right-4 font-bold text-gray-500 hover:text-black">X</button>
                <h3 className="text-xl font-bold mb-4">⌨️ Tester klávesnic</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Zkuste stisknout klávesy <strong>Z</strong>, <strong>Y</strong> nebo čísla nad písmeny (<strong>1-9</strong>) na vaší fyzické klávesnici.
                  Sledujte, jak se chovají na různém rozložení. QWERTY verze se snaží držet anglický standard, QWERTZ vychází z německých psacích strojů.
                </p>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-gray-50 border rounded-xl p-4 text-center">
                    <h4 className="font-bold mb-2">Vaše aktuální testovací rozložení:</h4>
                    <select 
                      className="border p-2 rounded bg-white font-semibold w-full text-center"
                      onChange={(e) => {
                        const val = e.target.value;
                        const el = document.getElementById('kb-test-input') as HTMLInputElement;
                        if (el) {
                          el.dataset.layout = val;
                          el.focus();
                        }
                      }}
                      defaultValue="cs-qwertz"
                    >
                      <option value="cs-qwertz">České (QWERTZ)</option>
                      <option value="cs-qwerty">České (QWERTY)</option>
                      <option value="en">Angličtina (US)</option>
                      <option value="de">Němčina</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6 relative">
                  <input 
                    id="kb-test-input"
                    type="text" 
                    placeholder="Klikněte sem a mačkejte Z nebo Y..."
                    autoFocus
                    className="w-full text-center text-3xl font-mono border-4 border-blue-200 p-6 rounded-xl outline-none focus:border-blue-500 bg-blue-50/30"
                    data-layout="cs-qwertz"
                    onKeyDown={(e) => {
                      const layout = e.currentTarget.dataset.layout;
                      if (e.code === 'KeyZ' || e.code === 'KeyY') {
                        e.preventDefault();
                        const isLower = !e.shiftKey;
                        let char = '';
                        if (e.code === 'KeyZ') { // Physical Z key (bottom row left)
                          if (layout === 'cs-qwertz' || layout === 'de') char = isLower ? 'y' : 'Y';
                          else char = isLower ? 'z' : 'Z';
                        } else if (e.code === 'KeyY') { // Physical Y key (top row middle)
                          if (layout === 'cs-qwertz' || layout === 'de') char = isLower ? 'z' : 'Z';
                          else char = isLower ? 'y' : 'Y';
                        }
                        e.currentTarget.value = char;
                      } else if (e.code.startsWith('Digit')) {
                        e.preventDefault();
                        const digit = e.code.replace('Digit', '');
                        let char = digit;
                        if (!e.shiftKey && (layout === 'cs-qwertz' || layout === 'cs-qwerty')) {
                          const czNumbers: Record<string, string> = { '1': '+', '2': 'ě', '3': 'š', '4': 'č', '5': 'ř', '6': 'ž', '7': 'ý', '8': 'á', '9': 'í', '0': 'é' };
                          char = czNumbers[digit] || digit;
                        } else if (e.shiftKey && layout === 'en') {
                          const enShift: Record<string, string> = { '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')' };
                          char = enShift[digit] || digit;
                        }
                        e.currentTarget.value = char;
                      }
                    }}
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-bold text-gray-400">VÝSTUP NA OBRAZOVKU</span>
                </div>
              </div>
            </div>
          )}
        </WindowWrapper>
      )}
    </>
  );
};
