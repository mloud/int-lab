import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Key, HardDrive, ShieldAlert, WifiOff, Terminal, 
  CheckCircle2, XCircle, ChevronRight, User, AlertTriangle, ArrowRight, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCheatCode } from '../../../hooks/useCheatCode';

interface WindowsInstallGameProps {
  onBack: () => void;
}

type Step = 'configurator' | 'intro' | 'language' | 'key' | 'eula' | 'type' | 'disk' | 'network' | 'account' | 'privacy' | 'result';

const WindowWrapper = ({ children, isOOBE = false }: { children: React.ReactNode, isOOBE?: boolean }) => (
  <div className={`relative w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-300 min-h-[550px] flex flex-col ${isOOBE ? 'bg-gray-50' : 'bg-[#0078D7]'}`}>
    {/* Window Header */}
    {!isOOBE && (
      <div className="bg-[#0078D7] text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>Instalace systému Windows</span>
        <div className="flex gap-4">
          <span className="cursor-not-allowed text-white/70">_</span>
          <span className="cursor-not-allowed text-white/70">□</span>
          <span className="cursor-not-allowed text-white/70">✕</span>
        </div>
      </div>
    )}
    {/* Window Body */}
    <div className={`flex-1 p-8 flex flex-col ${!isOOBE ? 'bg-white m-1 rounded-sm' : ''}`}>
      {children}
    </div>
  </div>
);

const TaskBubble = ({ text }: { text: string }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-lg flex items-start gap-3"
    >
      <Monitor className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-yellow-800 text-sm uppercase tracking-wider mb-1">Úkol pro tebe</h4>
        <p className="text-gray-800 font-medium text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  </div>
);

export default function WindowsInstallGame({ onBack }: WindowsInstallGameProps) {
  const [currentStep, setCurrentStep] = useState<Step>('configurator');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string, nextStep?: Step } | null>(null);

  // State pro konkrétní kroky
  const [langAdded, setLangAdded] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedKbd1, setSelectedKbd1] = useState('de');
  const [selectedKbd2, setSelectedKbd2] = useState('');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [showKeyboardTester, setShowKeyboardTester] = useState(false);

  // State pro disky
  interface Partition {
    id: string;
    name: string;
    totalMB: number;
    freeMB: number;
    type: 'Systémový EFI' | 'Hlavní' | 'Nepřiřazené místo';
  }
  const [partitions, setPartitions] = useState<Partition[]>([
    { id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: 1000000, freeMB: 1000000, type: 'Nepřiřazené místo' }
  ]);
  const [selectedPartitionId, setSelectedPartitionId] = useState<string>('unalloc');
  const [isCreatingPartition, setIsCreatingPartition] = useState(false);
  const [newPartitionSize, setNewPartitionSize] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [currentEulaQuestion, setCurrentEulaQuestion] = useState(0);
  const [eulaQuestionAnswered, setEulaQuestionAnswered] = useState(false);
  const [currentEulaAnswer, setCurrentEulaAnswer] = useState('');
  
  const [hardwareConfig, setHardwareConfig] = useState({
    ram: '',
    storage: '',
    cpu: '',
    monitor: ''
  });

  const [privacyToggles, setPrivacyToggles] = useState({
    location: true,
    diagnostics: true,
    inking: true,
    ads: true
  });

  // God Mode (iddqd cheat)
  const { isActive: showCheatMenu, setIsActive: setShowCheatMenu } = useCheatCode('iddqd');

  const showFeedback = (type: 'success' | 'error', text: string, nextStep?: Step) => {
    setFeedback({ type, text, nextStep });
    if (type === 'error') {
      setTimeout(() => setFeedback(null), 4000);
    }
  };



  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
      </div>

      {/* Global Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-3 border-2 ${
              feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              <span className="font-bold">{feedback.text}</span>
            </div>
            {feedback.type === 'success' && feedback.nextStep && (
              <button 
                onClick={() => {
                  setCurrentStep(feedback.nextStep!);
                  setFeedback(null);
                  setTerminalOpen(false);
                }}
                className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                Pokračovat <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEPS */}
      
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

      {currentStep === 'key' && (
        <WindowWrapper>
          <TaskBubble text="Přeinstalováváš značkový notebook Dell, který měl Windows 11 Pro už z výroby. Kde vezmeš licenční klíč k aktivaci?" />
          <div className="flex flex-col items-center flex-1 mt-16">
            <Key className="w-16 h-16 text-[#0078D7] mb-6 opacity-80" />
            <h2 className="text-2xl font-light text-gray-800 mb-4">Aktivace systému Windows</h2>
            <p className="text-sm text-gray-600 mb-8 max-w-lg text-center">
              Pokud tuto instalaci provádíte poprvé, zadejte kód Product Key (25 znaků).
            </p>
            
            <div className="w-full max-w-lg flex flex-col items-center border border-blue-200 bg-blue-50/30 p-6">
              <input 
                type="text" 
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX" 
                className="w-full border border-gray-400 p-2 text-center text-lg tracking-widest font-mono mb-4"
              />
              <button 
                onClick={() => showFeedback('error', 'Chyba: Značkové notebooky (OEM) mají klíč zapsaný v základní desce (BIOSu). Nemusíš jej opisovat, načte se sám.')}
                className="px-8 py-1.5 bg-[#0078D7] hover:bg-blue-700 text-white text-sm"
              >
                Další (Aktivovat)
              </button>
            </div>

            <div className="mt-auto w-full flex justify-start pt-10">
              <button
                onClick={() => showFeedback('success', 'Skvělé! Systém zjistí, že máš OEM licenci v BIOSu a automaticky se po připojení k internetu aktivuje.', 'eula')}
                className="text-[#0078D7] hover:underline text-sm font-medium"
              >
                Nemám kód Product Key
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'eula' && (
        <WindowWrapper>
          <TaskBubble text="Před instalací musíš souhlasit s licenční smlouvou (EULA). Než to ale odklikneš, zákazník se ptá na 5 konkrétních věcí. Použij AI překladač, najdi ve smlouvě odpovědi (max 1-2 slova) a doplň je." />
          <div className="flex flex-col flex-1 mt-16 px-10">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Příslušná upozornění a licenční podmínky</h2>
            
            <div className="border border-gray-300 p-4 h-48 overflow-y-auto mb-6 bg-white text-sm font-serif text-gray-700 leading-relaxed shadow-inner">
              <p className="font-bold mb-2">MICROSOFT SOFTWARE LICENSE TERMS</p>
              <p className="mb-2"><strong>WINDOWS OPERATING SYSTEM</strong></p>
              <p className="mb-4">IF YOU LIVE IN (OR IF YOUR PRINCIPAL PLACE OF BUSINESS IS IN) THE UNITED STATES, PLEASE READ THE BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER IN SECTION 11. IT AFFECTS HOW DISPUTES ARE RESOLVED.</p>
              <p className="mb-2"><strong>1. Overview.</strong></p>
              <p className="mb-2">a. Applicability. This agreement applies to the Windows software that is preinstalled on your device, or acquired from a retailer and installed by you, the media on which you received the software (if any), any fonts, icons, images or sound files included with the software, and also any Microsoft updates, upgrades, supplements or services for the software, unless other terms come with them. If this software contains any related Microsoft programs, terms that come with those programs apply. The software is licensed, not sold.</p>
              <p className="mb-2"><strong>2. Installation and Use Rights.</strong></p>
              <p className="mb-2">a. License. The software is licensed, not sold. Under this agreement, we grant you the right to install and run one instance of the software on your device (the licensed device), for use by one person at a time, so long as you comply with all the terms of this agreement.</p>
              <p className="mb-2">b. Device. In this agreement, "device" means a hardware system (whether physical or virtual) with an internal storage device capable of running the software. A hardware partition or blade is considered to be a device.</p>
              <p className="mb-2">c. Restrictions. The manufacturer or installer and Microsoft reserve all rights (such as rights under intellectual property laws) not expressly granted in this agreement. For example, this license does not give you any right to, and you may not:
                (i) use or virtualize features of the software separately;
                (ii) publish, copy (other than the permitted backup copy), rent, lease, or lend the software;
                (iii) transfer the software (except as permitted by this agreement);
                (iv) work around any technical restrictions or limitations in the software;
                (v) use the software as server software, for commercial hosting, make the software available for simultaneous use by multiple users over a network, install the software on a server and allow users to access it remotely, or install the software on a device for use only by remote users;
              </p>
              <p className="mb-2"><strong>15. Governing Law.</strong></p>
              <p>The laws of the state or country where you live (or, if a business, where your principal place of business is located) govern all claims and disputes concerning the software, its price, or this agreement, including breach of contract claims and claims under state consumer protection laws, unfair competition laws, implied warranty laws, for unjust enrichment, and in tort, except that the FAA governs all provisions relating to arbitration. If you acquired the software in any other country, the laws of that country apply. This agreement describes certain legal rights. You may have other rights, including consumer rights, under the laws of your state or country. You may also have rights with respect to the party from whom you acquired the software. This agreement does not change those other rights if the laws of your state or country do not permit it to do so.</p>
              <p className="mt-4 text-xs italic text-gray-500">Note: For the purpose of this simulation, refer to Microsoft Corporation as the licensor and Washington as the governing law state if applicable.</p>
            </div>

            {(() => {
              const eulaData = [
                {
                  q: "Kdo je poskytovatelem licence?",
                  a: ["microsoft", "microsoft corporation"],
                  explanation: "Smlouvu uzavíráte s tvůrcem OS, nikoliv s výrobcem vašeho PC (např. Dell nebo HP)."
                },
                {
                  q: "Je software prodáván, nebo licencován?",
                  a: ["licence", "licencovan", "licencovano", "licensing", "licensed", "licencovani", "licencován", "licencováno"],
                  explanation: "Nekupujete si kód, ale pouze právo k jeho užívání. Software nevlastníte!"
                },
                {
                  q: "Na kolik zařízení mohu nainstalovat jednu licenci? (odpovězte číslicí)",
                  a: ["jedno", "1", "one", "jeden", "jedno zarizeni", "1 zarizeni"],
                  explanation: "Běžná licence (OEM/Retail) platí vždy jen pro 1 fyzické nebo virtuální zařízení."
                },
                {
                  q: "Lze software použít pro komerční hostingové služby?",
                  a: ["ne", "nelze", "no", "zakazano"],
                  explanation: "Nesmíte na tento počítač připojit více uživatelů na dálku a za peníze jim pronajímat výpočetní výkon nebo aplikace. K tomu slouží speciální Serverové verze Windows."
                },
                {
                  q: "Podle zákonů jakého státu v USA se primárně řeší spory?",
                  a: ["washington", "wa"],
                  explanation: "Globální IT služby se často řídí právem domovského státu gigantů (pokud lokální zákony nestanoví jinak)."
                }
              ];
              const current = eulaData[currentEulaQuestion];

              return (
                <div className="flex flex-col flex-1">
                  <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Otázka {currentEulaQuestion + 1} z 5</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">{currentEulaQuestion + 1}</span>
                      <label className="text-xl text-gray-900 font-semibold">{current.q}</label>
                    </div>
                    
                    {!eulaQuestionAnswered ? (
                      <div className="flex gap-4 items-center">
                        <input 
                          type="text"
                          value={currentEulaAnswer}
                          onChange={(e) => setCurrentEulaAnswer(e.target.value)}
                          placeholder="Napište 1-2 slova z textu..."
                          className="border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:border-[#0078D7] outline-none transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                              const normAns = normalize(currentEulaAnswer);
                              if (current.a.some(c => normalize(c) === normAns)) {
                                setEulaQuestionAnswered(true);
                                showFeedback('success', 'Správná odpověď!');
                              } else {
                                showFeedback('error', 'Odpověď není správná. Zkuste si text přeložit pomocí AI a najít přesnou odpověď.');
                              }
                            }
                          }}
                        />
                        <button 
                          onClick={() => {
                            const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                            const normAns = normalize(currentEulaAnswer);
                            if (current.a.some(c => normalize(c) === normAns)) {
                              setEulaQuestionAnswered(true);
                              showFeedback('success', 'Správná odpověď!');
                            } else {
                              showFeedback('error', 'Odpověď není správná. Zkuste si text přeložit pomocí AI a najít přesnou odpověď.');
                            }
                          }}
                          className="px-8 py-3 bg-[#0078D7] hover:bg-blue-700 text-white font-bold rounded transition-colors"
                        >
                          Ověřit
                        </button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-lg mb-2">
                          <CheckCircle2 className="w-6 h-6" /> Výborně!
                        </div>
                        <p className="text-emerald-900 text-base leading-relaxed"><strong>Vysvětlení:</strong> {current.explanation}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end gap-4">
                    {eulaQuestionAnswered && (
                      <button 
                        onClick={() => {
                          if (currentEulaQuestion < 4) {
                            setCurrentEulaQuestion(prev => prev + 1);
                            setEulaQuestionAnswered(false);
                            setCurrentEulaAnswer('');
                          } else {
                            setCurrentStep('type');
                          }
                        }}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold rounded-lg shadow-md flex items-center gap-2 transition-transform hover:scale-105"
                      >
                        {currentEulaQuestion < 4 ? 'Další otázka' : 'Rozumím smlouvě, pokračovat dál'} <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'type' && (
        <WindowWrapper>
          <TaskBubble text="Děláš čistou instalaci (Clean Install). Starý systém byl zavirovaný a pomalý." />
          <div className="flex flex-col items-center flex-1 mt-16">
            <h2 className="text-2xl font-light text-gray-800 mb-10 text-left w-full max-w-2xl">
              Jaký typ instalace požadujete?
            </h2>
            
            <div className="w-full max-w-2xl space-y-4">
              <button 
                onClick={() => showFeedback('error', 'Chyba: Upgrade by zachoval staré zavirované soubory. Potřebuješ čistý stůl.')}
                className="w-full flex items-start gap-4 p-4 border border-gray-300 hover:border-[#0078D7] hover:bg-blue-50 text-left"
              >
                <div className="w-8 h-8 flex-shrink-0 mt-1">
                  <ArrowRight className="w-8 h-8 text-[#0078D7]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#0078D7] mb-1">Upgrade: Instalovat systém Windows a zachovat soubory, nastavení a aplikace</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tato možnost je k dispozici pouze v případě, že je v počítači už spuštěná podporovaná verze systému Windows.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => showFeedback('success', 'Správně! Čistá instalace smaže stará data a nainstaluje čerstvý systém.', 'disk')}
                className="w-full flex items-start gap-4 p-4 border border-gray-300 hover:border-[#0078D7] hover:bg-blue-50 text-left"
              >
                <div className="w-8 h-8 flex-shrink-0 mt-1">
                  <ArrowRight className="w-8 h-8 text-[#0078D7]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#0078D7] mb-1">Vlastní: Jen nainstalovat Windows (pokročilé)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Soubory, nastavení a aplikace se nezachovají. Chcete-li provést změny v oddílech a jednotkách, spusťte počítač pomocí instalačního disku.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'disk' && (
        <WindowWrapper>
          <TaskBubble text="Zákazník požaduje disk rozdělit na 3 oddíly: Systém (200 GB), Data (500 GB) a Zálohy (Zbytek). 1 GB = 1000 MB. Vytvoř přesně takové oddíly." />
          <div className="flex flex-col flex-1 mt-16 px-10">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Kam chcete systém Windows nainstalovat?</h2>
            
            <div className="border border-gray-300 h-64 overflow-y-auto mb-4 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 font-normal border-b">Název</th>
                    <th className="p-2 font-normal border-b">Celková velikost</th>
                    <th className="p-2 font-normal border-b">Volné místo</th>
                    <th className="p-2 font-normal border-b">Typ</th>
                  </tr>
                </thead>
                <tbody>
                  {partitions.map(p => (
                    <tr 
                      key={p.id} 
                      onClick={() => { setSelectedPartitionId(p.id); setIsCreatingPartition(false); }}
                      className={`cursor-pointer ${selectedPartitionId === p.id ? 'bg-[#0078D7] text-white' : 'hover:bg-blue-50 text-gray-800'}`}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <HardDrive className={`w-4 h-4 ${selectedPartitionId === p.id ? 'text-white' : 'text-[#0078D7]'}`} /> 
                        {p.name}
                      </td>
                      <td className="p-2">{(p.totalMB / 1000).toFixed(1)} GB</td>
                      <td className="p-2">{(p.freeMB / 1000).toFixed(1)} GB</td>
                      <td className="p-2">{p.type === 'Nepřiřazené místo' ? '' : p.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-6 mb-4 text-sm text-[#0078D7]">
              <span className="flex items-center gap-1 opacity-50"><RefreshCcw className="w-4 h-4" /> Aktualizovat</span>
              <button 
                onClick={() => {
                  const toDelete = partitions.find(p => p.id === selectedPartitionId);
                  if (!toDelete || toDelete.type === 'Nepřiřazené místo') return;
                  const newPartitions = partitions.filter(p => p.id !== selectedPartitionId);
                  let unalloc = newPartitions.find(p => p.id === 'unalloc');
                  if (unalloc) {
                    unalloc.totalMB += toDelete.totalMB;
                    unalloc.freeMB += toDelete.totalMB;
                  } else {
                    newPartitions.push({ id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: toDelete.totalMB, freeMB: toDelete.totalMB, type: 'Nepřiřazené místo' });
                  }
                  setPartitions([...newPartitions]);
                  setSelectedPartitionId('unalloc');
                  setIsCreatingPartition(false);
                }}
                disabled={!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type === 'Nepřiřazené místo'}
                className={`flex items-center gap-1 hover:underline ${(!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type === 'Nepřiřazené místo') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <XCircle className="w-4 h-4" /> Odstranit
              </button>
              <span className="flex items-center gap-1 opacity-50"><CheckCircle2 className="w-4 h-4" /> Formátovat</span>
              <button 
                onClick={() => {
                  const p = partitions.find(p => p.id === selectedPartitionId);
                  if (p && p.type === 'Nepřiřazené místo') {
                    setIsCreatingPartition(true);
                    setNewPartitionSize(p.totalMB.toString());
                  }
                }}
                disabled={!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type !== 'Nepřiřazené místo'}
                className={`flex items-center gap-1 hover:underline ${(!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type !== 'Nepřiřazené místo') ? 'opacity-50 cursor-not-allowed' : 'font-bold cursor-pointer text-gray-800'}`}
              >
                <Monitor className="w-4 h-4" /> Nový
              </button>
            </div>

            {isCreatingPartition && (
              <div className="bg-gray-50 p-4 border border-gray-300 flex items-center gap-4 mb-4 text-sm shadow-inner">
                <label>Velikost:</label>
                <input 
                  type="number" 
                  value={newPartitionSize} 
                  onChange={(e) => setNewPartitionSize(e.target.value)} 
                  className="border border-gray-400 p-1 w-32 text-right"
                />
                <span>MB</span>
                <button 
                  onClick={() => {
                    const size = parseInt(newPartitionSize);
                    const unalloc = partitions.find(p => p.id === 'unalloc');
                    if (!unalloc || isNaN(size) || size <= 0 || size > unalloc.totalMB) {
                      showFeedback('error', 'Neplatná velikost oddílu.');
                      return;
                    }

                    const newParts = partitions.filter(p => p.id !== 'unalloc');
                    let idCounter = newParts.length + 1;
                    const hasSystem = newParts.some(p => p.type === 'Systémový EFI');
                    
                    if (!hasSystem) {
                      showFeedback('error', 'Aby bylo zajištěno správné fungování (zavádění systému), Windows automaticky vytvoří 100MB EFI oddíl pro Boot Manager.');
                      newParts.push({ id: `part-${idCounter++}`, name: `Jednotka 0 Oddíl 1`, totalMB: 100, freeMB: 70, type: 'Systémový EFI' });
                      const primarySize = size - 100;
                      if (primarySize > 0) {
                         newParts.push({ id: `part-${idCounter++}`, name: `Jednotka 0 Oddíl 2`, totalMB: primarySize, freeMB: primarySize, type: 'Hlavní' });
                      }
                    } else {
                      newParts.push({ id: `part-${idCounter++}`, name: `Jednotka 0 Oddíl ${idCounter}`, totalMB: size, freeMB: size, type: 'Hlavní' });
                    }

                    const remaining = unalloc.totalMB - size;
                    if (remaining > 0) {
                      newParts.push({ id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: remaining, freeMB: remaining, type: 'Nepřiřazené místo' });
                    }

                    setPartitions(newParts);
                    setIsCreatingPartition(false);
                    setNewPartitionSize('');
                    setSelectedPartitionId(newParts[newParts.length - (remaining > 0 ? 2 : 1)].id);
                  }}
                  className="px-6 py-1.5 border border-gray-400 bg-gray-200 hover:bg-gray-300 ml-4 font-semibold"
                >
                  Použít
                </button>
                <button 
                  onClick={() => setIsCreatingPartition(false)}
                  className="px-6 py-1.5 border border-gray-400 hover:bg-gray-100"
                >
                  Zrušit
                </button>
              </div>
            )}

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">Windows nelze nainstalovat na tuto jednotku. (Zobrazit podrobnosti)</span>
              
              <button
                onClick={() => {
                  const primaries = partitions.filter(p => p.type === 'Hlavní');
                  if (primaries.length !== 3) {
                    showFeedback('error', 'Chyba: Zákazník chtěl rozdělit disk na 3 oddíly (nepočítaje malé systémové oddíly).');
                    return;
                  }
                  const p1Size = primaries[0].totalMB + 100;
                  if (p1Size !== 200000) {
                    showFeedback('error', 'Chyba: První oddíl (Systém) měl být 200 GB (200000 MB). Pokud ses spletl, odstraň oddíly a začni znovu.');
                    return;
                  }
                  if (primaries[1].totalMB !== 500000) {
                    showFeedback('error', 'Chyba: Druhý oddíl (Data) měl být 500 GB (500000 MB). Smaž jej a oprav.');
                    return;
                  }
                  showFeedback('success', 'Skvělé! Přesně jsi rozdělil disk na Systém, Data a Zálohy. Můžeme pokračovat.', 'network');
                }}
                className="px-8 py-1.5 bg-[#0078D7] hover:bg-blue-700 text-white text-sm"
              >
                Další
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'network' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Jsi ve školní učebně a NESMÍŠ počítač připojit k osobnímu Microsoft účtu. Tlačítko Přeskočit nebo 'Nemám internet' ale chybí. Jak vynutíš lokální účet offline?" />
          <div className="flex flex-col items-center flex-1 mt-16 px-10">
            <div className="mb-8 relative w-full h-48 flex justify-center items-center">
               <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg" alt="Win11" className="w-24 h-24 opacity-80 z-10" />
            </div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Připojte se k síti</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              K dokončení nastavení zařízení budete potřebovat připojení k internetu. Až se připojíte, získáte nejnovější aktualizace.
            </p>

            <div className="w-full max-w-md border border-gray-300 rounded-xl overflow-hidden mb-10">
              <div className="p-4 border-b flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <WifiOff className="w-6 h-6 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">Síť Eduroam</h4>
                  <p className="text-xs text-gray-500">Zabezpečeno</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <Monitor className="w-6 h-6 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">Ethernet 1</h4>
                  <p className="text-xs text-gray-500">Nepřipojeno</p>
                </div>
              </div>
            </div>

            <div className="mt-auto w-full flex justify-between">
              <button 
                onClick={() => setTerminalOpen(true)}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" /> Zmáčknout Shift+F10
              </button>
              <button 
                onClick={() => showFeedback('error', 'Chyba: Bez internetu tě Windows nepustí dál. Tlačítko Další je zamknuté. Musíš to obejít příkazem.')}
                className="px-8 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Další
              </button>
            </div>
          </div>

          {/* Vyskakovací terminál */}
          {terminalOpen && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg bg-black text-white p-2 shadow-2xl rounded-sm border border-gray-700 z-50">
              <div className="bg-white text-black px-2 py-1 flex justify-between text-xs mb-2">
                <span>C:\Windows\System32\cmd.exe</span>
                <span className="cursor-pointer" onClick={() => setTerminalOpen(false)}>X</span>
              </div>
              <div className="font-mono text-sm p-2 h-40">
                <p className="mb-2">Microsoft Windows [Version 10.0.22631.1]</p>
                <p className="mb-4">(c) Microsoft Corporation. Všechna práva vyhrazena.</p>
                <div className="flex">
                  <span className="mr-2">C:\Windows\System32&gt;</span>
                  <input 
                    type="text" 
                    autoFocus
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (terminalInput.trim().toLowerCase() === 'oobe\\bypassnro') {
                          showFeedback('success', 'Skvělé! Systém se nyní restartuje a povolí instalaci bez internetu (lokální účet).', 'account');
                        } else {
                          setTerminalInput('');
                          showFeedback('error', 'Chyba: Toto není správný příkaz. Zkus "oobe\\bypassnro".');
                        }
                      }
                    }}
                    className="bg-transparent outline-none flex-1 font-mono text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </WindowWrapper>
      )}

      {currentStep === 'account' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Vyber vhodné heslo pro místní administrátorský účet. Pamatuj, že ve školním prostředí někdy obětujeme bezpečnost pro jednotnost, ale jak by to mělo vypadat správně u reálného zákazníka?" />
          <div className="flex flex-col items-center flex-1 mt-16 px-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Vytvořte si heslo, které si snadno zapamatujete</h2>
            <p className="text-gray-600 mb-10 text-center max-w-md">
              Zadejte heslo pro účet "admin".
            </p>

            <div className="w-full max-w-sm space-y-6">
              <input 
                type="text" 
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                placeholder="Zadejte heslo" 
                className="w-full border-b-2 border-[#0078D7] p-2 text-xl bg-transparent outline-none focus:border-blue-700 transition-colors"
              />

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">Pravidla silného hesla:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    {accountPassword.length >= 8 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={accountPassword.length >= 8 ? 'text-gray-800' : 'text-gray-500'}>Minimálně 8 znaků</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/[A-Z]/.test(accountPassword) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={/[A-Z]/.test(accountPassword) ? 'text-gray-800' : 'text-gray-500'}>Alespoň jedno velké písmeno</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword) ? 'text-gray-800' : 'text-gray-500'}>Alespoň jeden speciální znak</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => {
                    if (accountPassword.length < 8) {
                      showFeedback('error', 'Chyba: Heslo musí mít alespoň 8 znaků.');
                    } else if (!/[A-Z]/.test(accountPassword)) {
                      showFeedback('error', 'Chyba: Heslo musí obsahovat alespoň jedno velké písmeno.');
                    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword)) {
                      showFeedback('error', 'Chyba: Heslo musí obsahovat alespoň jeden speciální znak (např. ! ? @ #).');
                    } else {
                      showFeedback('success', 'Výborně! Toto je ukázkové silné heslo, které odolá běžným slovníkovým útokům.', 'privacy');
                    }
                  }}
                  className="px-8 py-2 bg-[#0078D7] hover:bg-blue-700 text-white font-semibold rounded"
                >
                  Další
                </button>
              </div>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'privacy' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Připravuješ PC pro firemního ředitele. Zabezpečení a soukromí firemních dat je priorita číslo 1. Pro případ ztráty nebo krádeže by ale firma ráda věděla, kde se notebook nachází." />
          <div className="flex flex-col items-center flex-1 mt-10 px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Zvolte nastavení ochrany soukromí pro toto zařízení</h2>
            
            <div className="w-full max-w-2xl grid grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Poloha</h4>
                  <p className="text-xs text-gray-500">Umožňuje aplikacím s povolením k používání polohy využívat data z Windows.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, location: !privacyToggles.location})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.location ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.location ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Diagnostická data</h4>
                  <p className="text-xs text-gray-500">Odesílat Microsoftu údaje o historii procházení webe a chybách.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, diagnostics: !privacyToggles.diagnostics})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.diagnostics ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.diagnostics ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Psaní rukou a na klávesnici</h4>
                  <p className="text-xs text-gray-500">Odesílat data o psaní pro vylepšení rozpoznávání slov.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, inking: !privacyToggles.inking})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.inking ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.inking ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Reklamní ID</h4>
                  <p className="text-xs text-gray-500">Povolit aplikacím používat reklamní ID pro personalizaci.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, ads: !privacyToggles.ads})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.ads ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.ads ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

            </div>

            <div className="mt-auto w-full flex justify-end">
              <button 
                onClick={() => {
                  const isCorrect = privacyToggles.location && !privacyToggles.diagnostics && !privacyToggles.inking && !privacyToggles.ads;
                  if (isCorrect) {
                    showFeedback('success', 'Skvělé! Poloha zůstala zapnutá pro sledování ztraceného zařízení, ale veškerá telemetrie a reklamy jsou vypnuty.', 'result');
                  } else {
                    showFeedback('error', 'Chyba: Zkontroluj, zda jsi vypnul telemetrii, diagnostiku i reklamy, ale nechal ZAPNUTÉ sledování polohy (pro případ ztráty notebooku).');
                  }
                }}
                className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
              >
                Přijmout
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'result' && (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-3xl mx-auto border-4 border-slate-50 mt-10">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Instalace dokončena!</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Úspěšně jsi prošel kompletním instalačním procesem Windows 11 jako skutečný IT profesionál. Nyní znáš klíčová zákoutí – od OEM klíčů, přes Bypass účtu až po ochranu soukromí.
          </p>
          <button
            onClick={() => {
              // Reset
              setLangAdded(false);
              setTerminalOpen(false);
              setTerminalInput('');
              setPrivacyToggles({ location: true, diagnostics: true, inking: true, ads: true });
              setCurrentStep('intro');
            }}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-wider flex items-center gap-3 mx-auto"
          >
            <RefreshCcw className="w-5 h-5" /> Zkusit znovu
          </button>
        </div>
      )}

      {/* God Mode - Cheat Menu */}
      {showCheatMenu && (
        <div className="fixed top-20 right-10 bg-black/90 text-red-500 font-mono p-6 rounded-lg border-2 border-red-500 z-[999] shadow-[0_0_20px_rgba(255,0,0,0.5)]">
          <h3 className="text-xl font-bold mb-4 border-b border-red-500 pb-2 flex justify-between items-center">
            [ IDDQD - GOD MODE ]
            <button onClick={() => setShowCheatMenu(false)} className="text-sm text-gray-500 hover:text-red-400 ml-4">✕</button>
          </h3>
          <p className="text-sm mb-4 text-red-300">Skok na libovolnou kapitolu:</p>
          <div className="flex flex-col gap-2">
            {['configurator', 'intro', 'language', 'key', 'eula', 'type', 'disk', 'network', 'account', 'privacy', 'result'].map(s => (
              <button 
                key={s}
                onClick={() => {
                  setCurrentStep(s as Step);
                  setShowCheatMenu(false);
                  setFeedback(null);
                }}
                className={`text-left px-3 py-1 hover:bg-red-900/50 hover:text-white transition-colors ${currentStep === s ? 'bg-red-500 text-white font-bold' : ''}`}
              >
                &gt; {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
