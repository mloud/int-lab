import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cpu, MemoryStick, HardDrive, MonitorPlay, Power, Fan, PlugZap, Radio, AlertTriangle, Monitor, Usb, Network, Speaker, Plug, Folder, Chrome, Loader2 } from 'lucide-react';

interface PcBuilderGameProps {
  onBack: () => void;
}

type ComponentId = 'cpu' | 'ram' | 'gpu' | 'hdd' | 'cooler' | 'psu' | 'soundcard' | 'cable_monitor' | 'cable_usb' | 'cable_lan' | 'cable_audio' | 'cable_power';

interface HardwareComponent {
  id: ComponentId;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const COMPONENTS_L1: HardwareComponent[] = [
  {
    id: 'cpu',
    name: 'Procesor',
    shortName: 'CPU Procesor',
    description: 'Mozek počítače. Neustále a extrémně rychle počítá miliardy instrukcí za vteřinu.',
    icon: <Cpu className="w-10 h-10" />,
    color: 'bg-blue-100 text-blue-700 border-blue-400'
  },
  {
    id: 'ram',
    name: 'Operační paměť',
    shortName: 'RAM Operační paměť',
    description: 'Rychlý prostor, kde má procesor zrovna otevřená data. Při výpadku proudu se smaže.',
    icon: <MemoryStick className="w-10 h-10" />,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-400'
  },
  {
    id: 'gpu',
    name: 'Grafická karta',
    shortName: 'GPU Grafická karta',
    description: 'Počítá a vykresluje obraz pro monitor. Zapojuje se do hlavního PCIe slotu.',
    icon: <MonitorPlay className="w-10 h-10" />,
    color: 'bg-purple-100 text-purple-700 border-purple-400'
  },
  {
    id: 'hdd',
    name: 'Pevný disk',
    shortName: 'HDD/SSD Pevný disk',
    description: 'Krabice pro trvalé uložení dat (Windows, programy). Data zůstanou i bez proudu.',
    icon: <HardDrive className="w-10 h-10" />,
    color: 'bg-amber-100 text-amber-700 border-amber-400'
  }
];

const COMPONENTS_L2: HardwareComponent[] = [
  {
    id: 'cooler',
    name: 'Chladič CPU',
    shortName: 'FAN',
    description: 'Procesor se při počítání obrovsky zahřívá. Chladič s větrákem odvádí teplo. Patří přímo na něj!',
    icon: <Fan className="w-10 h-10" />,
    color: 'bg-cyan-100 text-cyan-700 border-cyan-400'
  },
  {
    id: 'psu',
    name: 'Napájecí zdroj',
    shortName: 'PSU',
    description: 'Mění 230V ze zásuvky na bezpečné napětí pro počítač. Kabely od něj vedou do všech částí.',
    icon: <PlugZap className="w-10 h-10" />,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-400'
  },
  {
    id: 'soundcard',
    name: 'Zvuková karta',
    shortName: 'AUDIO',
    description: 'Doplňková karta pro lepší zvuk (často už bývá na desce). Patří do druhého PCIe slotu.',
    icon: <Radio className="w-10 h-10" />,
    color: 'bg-pink-100 text-pink-700 border-pink-400'
  }
];

const COMPONENTS_L3: HardwareComponent[] = [
  {
    id: 'cable_monitor',
    name: 'Kabel od Monitoru',
    shortName: 'HDMI/DP',
    description: 'Přenáší obraz. Musí se zapojit do výstupu tvé dedikované grafické karty!',
    icon: <Monitor className="w-10 h-10" />,
    color: 'bg-purple-100 text-purple-700 border-purple-400'
  },
  {
    id: 'cable_usb',
    name: 'Klávesnice a Myš',
    shortName: 'USB',
    description: 'Zapojují se do USB portů na zadním panelu základní desky.',
    icon: <Usb className="w-10 h-10" />,
    color: 'bg-blue-100 text-blue-700 border-blue-400'
  },
  {
    id: 'cable_lan',
    name: 'Internetový kabel',
    shortName: 'LAN / RJ-45',
    description: 'Kabel pro připojení do sítě. Zapojuje se do LAN portu na základní desce.',
    icon: <Network className="w-10 h-10" />,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-400'
  },
  {
    id: 'cable_audio',
    name: 'Reproduktory',
    shortName: 'Audio Jack',
    description: 'Zapojují se do zeleného konektoru (obvykle na zvukové kartě, pokud ji máme).',
    icon: <Speaker className="w-10 h-10" />,
    color: 'bg-pink-100 text-pink-700 border-pink-400'
  },
  {
    id: 'cable_power',
    name: 'Kabel do zásuvky',
    shortName: 'Napájení 230V',
    description: 'Spojuje napájecí zdroj (PSU) s elektrickou sítí ve zdi.',
    icon: <Plug className="w-10 h-10" />,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-400'
  }
];

const PcBuilderGame: React.FC<PcBuilderGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<1 | 2 | 3 | 4>(1);
  const [placed, setPlaced] = useState<Record<ComponentId, boolean>>({
    cpu: false, ram: false, gpu: false, hdd: false,
    cooler: false, psu: false, soundcard: false,
    cable_monitor: false, cable_usb: false, cable_lan: false, cable_audio: false, cable_power: false
  });
  
  const [selectedComp, setSelectedComp] = useState<ComponentId | null>(null);
  const [infoText, setInfoText] = useState<string>('Úroveň 1: Vyber díl ze skladu a vlož ho na správné místo na desce.');
  
  // States
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isOverheating, setIsOverheating] = useState(false);
  const [isFullyWorking, setIsFullyWorking] = useState(false); // Game complete
  
  // Level 4 States
  const [bootState, setBootState] = useState<0 | 1 | 2 | 3>(0); // 0=Off, 1=BIOS, 2=OS Loading, 3=Desktop

  const l1Placed = placed.cpu && placed.ram && placed.gpu && placed.hdd;
  const l2Complete = placed.psu && placed.soundcard && placed.cooler;
  const l3Complete = placed.cable_monitor && placed.cable_usb && placed.cable_lan && placed.cable_audio && placed.cable_power;

  const currentComponents = level === 1 ? COMPONENTS_L1 : level === 2 ? COMPONENTS_L2 : level === 3 ? COMPONENTS_L3 : [];
  const ALL_COMPS = [...COMPONENTS_L1, ...COMPONENTS_L2, ...COMPONENTS_L3];

  const handleSelect = (id: ComponentId) => {
    if (placed[id] || isOverheating) return;
    if (level === 4) return;
    
    setSelectedComp(id);
    const comp = ALL_COMPS.find(c => c.id === id);
    if (comp) setInfoText(comp.description);
  };

  const handlePlace = (slotId: ComponentId | 'mb_hdmi') => {
    if (selectedComp === null) return;

    if (selectedComp === 'cable_monitor' && slotId === 'mb_hdmi') {
      setInfoText('CHYBA! Tohle je video výstup základní desky. My jsme si ale postavili počítač s výkonnou Grafickou kartou! Monitor musíš zapojit do ní dolů, jinak neuvidíš obraz.');
      setSelectedComp(null);
      return;
    }

    if (slotId === 'mb_hdmi') return;

    if (selectedComp === slotId) {
      setPlaced(prev => ({ ...prev, [slotId]: true }));
      setSelectedComp(null);
      setInfoText(`Výborně! ${ALL_COMPS.find(c => c.id === slotId)?.name} byl úspěšně zapojen.`);
    } else {
      setInfoText('Tohle není správný slot pro vybraný kabel či komponentu. Zkus jiný!');
    }
  };

  const handleDragStart = (e: React.DragEvent, id: ComponentId) => {
    if (placed[id] || isOverheating || level === 4) return;
    e.dataTransfer.setData('compId', id);
    handleSelect(id);
  };

  const handleDrop = (e: React.DragEvent, slotId: ComponentId | 'mb_hdmi') => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('compId') as ComponentId;
    setSelectedComp(draggedId);
    
    setTimeout(() => {
      handlePlace(slotId);
    }, 10);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const advanceLevel = () => {
    if (level === 1) {
      setLevel(2);
      setSelectedComp(null);
      setInfoText('Úroveň 2: Zapoj doplňkové karty, napájení a hlavně chlazení!');
    } else if (level === 2) {
      setLevel(3);
      setIsPoweredOn(false);
      setSelectedComp(null);
      setInfoText('Úroveň 3 (Zadní panel): Skříň je zavřená. Zapoj všechny kabely, aby počítač mohl fungovat.');
    } else if (level === 3) {
      setLevel(4);
      setSelectedComp(null);
      setInfoText('Úroveň 4 (První Spuštění): Počítač je kompletní. Stiskni hlavní zapínací tlačítko na bedně!');
    }
  };

  const handlePowerOn = () => {
    if (level === 2) {
      if (placed.psu) {
        if (!placed.cooler) {
          setIsOverheating(true);
          setInfoText('POZOR! Procesor nemá chladič! Začal se extrémně zahřívat a počítač se nouzově vypnul, aby neshořel.');
          setTimeout(() => {
            setIsOverheating(false);
            setInfoText('Bezpečnostní pojistka odpojila proud. Musíš na procesor nasadit chladič, než ho znovu zapneš!');
          }, 4000);
        } else if (!placed.soundcard) {
          setInfoText('Nelze zapnout: Ve skladu ti ještě leží nezapojená Zvuková karta!');
        } else {
          setIsPoweredOn(true);
          setInfoText('POČÍTAČ BĚŽÍ! Všechny komponenty spolu komunikují. Přejdeme k zapojení periferií.');
        }
      }
    }
  };

  const startBootSequence = () => {
    if (bootState !== 0) return;
    
    setInfoText('Startuji... Počítač se probouzí k životu!');
    
    // Phase 1: BIOS
    setTimeout(() => {
      setBootState(1);
    }, 500);

    // Phase 2: OS Loading
    setTimeout(() => {
      setBootState(2);
      setInfoText('BIOS otestoval HW. Nyní načítáme Operační Systém z disku (SSD)...');
    }, 3500);

    // Phase 3: Desktop
    setTimeout(() => {
      setBootState(3);
      setInfoText('Systém naběhl! Vítej na ploše svého nového počítače.');
    }, 7000);

    // Phase 4: Victory overlay
    setTimeout(() => {
      setIsFullyWorking(true);
    }, 9000);
  };

  const renderSlot = (id: ComponentId, label: string, className: string, activeClassName: string) => {
    const isPlaced = placed[id];
    const comp = ALL_COMPS.find(c => c.id === id);
    
    if (id === 'cooler' && !placed.cpu) return null; 

    return (
      <div 
        className={`relative flex items-center justify-center border-4 transition-all duration-300 ${className} ${isPlaced ? activeClassName + ' shadow-lg border-solid bg-white' : 'border-dashed border-gray-400 bg-black/10 hover:bg-black/20 cursor-pointer'} ${(isPoweredOn && isPlaced && id !== 'cooler') ? 'animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.8)]' : ''}`}
        onClick={() => handlePlace(id)}
        onDrop={(e) => handleDrop(e, id)}
        onDragOver={handleDragOver}
      >
        {!isPlaced && (
          <span className="text-gray-500 font-bold uppercase tracking-widest text-center opacity-50 px-2 text-[10px] sm:text-xs leading-tight">{label}</span>
        )}
        {isPlaced && comp && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${id === 'cooler' ? 'rounded-full' : 'rounded-sm'} ${comp.color.split(' ')[0]} ${isPoweredOn && id !== 'cooler' ? 'animate-pulse' : ''} ${id === 'cooler' && isPoweredOn ? 'animate-spin-slow' : ''}`}>
            {comp.icon}
            {id !== 'cooler' && <span className="text-[10px] font-black mt-1 uppercase text-center leading-none px-1">{comp.shortName}</span>}
          </div>
        )}
      </div>
    );
  };

  const renderEmptyPort = (id: string) => {
    if (id === 'cable_power') return (
      <div className="w-16 h-10 bg-black rounded-sm border-2 border-gray-600 flex justify-center items-center gap-1 shadow-inner">
         <div className="w-1.5 h-4 bg-gray-500 rounded-sm"></div>
         <div className="w-1.5 h-4 bg-gray-500 rounded-sm"></div>
         <div className="w-1.5 h-4 bg-gray-500 rounded-sm"></div>
      </div>
    );
    if (id === 'cable_usb') return (
      <div className="flex flex-col gap-1">
        <div className="w-8 h-3 bg-black border border-gray-500 rounded-sm shadow-inner flex items-end justify-center pb-0.5"><div className="w-4 h-1 bg-blue-500 rounded-sm"></div></div>
        <div className="w-8 h-3 bg-black border border-gray-500 rounded-sm shadow-inner flex items-end justify-center pb-0.5"><div className="w-4 h-1 bg-blue-500 rounded-sm"></div></div>
      </div>
    );
    if (id === 'cable_lan') return (
      <div className="w-10 h-10 bg-black border-2 border-gray-500 rounded-sm shadow-inner relative flex justify-center">
         <div className="absolute bottom-0 w-4 h-3 bg-gray-300 border-t border-gray-500"></div>
         <div className="absolute top-1 flex gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div><div className="w-1 h-1 rounded-full bg-amber-500"></div></div>
      </div>
    );
    if (id === 'cable_audio') return (
      <div className="w-10 h-10 bg-black rounded-full border-2 border-gray-600 shadow-inner flex items-center justify-center">
         <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-emerald-700 shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black"></div>
         </div>
      </div>
    );
    if (id === 'mb_hdmi' || id === 'cable_monitor') return (
      <div className="w-14 h-5 bg-black border-2 border-gray-500 shadow-inner flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}>
         <div className="w-10 h-1 bg-yellow-500 rounded-full opacity-50"></div>
      </div>
    );
    return <div className={`bg-black border-2 border-gray-600 shadow-inner w-10 h-10`}></div>;
  };

  const renderPort = (id: ComponentId | 'mb_hdmi', label: string, className: string, activeClassName: string) => {
    const isPlaced = id === 'mb_hdmi' ? false : placed[id];
    const comp = id !== 'mb_hdmi' ? ALL_COMPS.find(c => c.id === id) : null;
    const labelColor = id === 'cable_power' ? 'text-gray-200' : 'text-gray-700 drop-shadow-none';

    return (
      <div 
        className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${isPlaced ? activeClassName + ' bg-white shadow-lg border-2 border-gray-100 scale-105' : 'hover:bg-white/30 cursor-pointer border-2 border-transparent'} ${className}`}
        onClick={() => handlePlace(id)}
        onDrop={(e) => handleDrop(e, id)}
        onDragOver={handleDragOver}
      >
        <span className={`${labelColor} text-[10px] sm:text-xs font-bold uppercase mb-2 text-center leading-tight`}>{label}</span>
        
        <div className="flex items-center justify-center">
          {!isPlaced && renderEmptyPort(id)}
          
          {isPlaced && comp && (
            <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${comp.color.split(' ')[0]} border border-${comp.color.split(' ')[2]} shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-in zoom-in`}>
              {comp.icon}
              <span className="text-[10px] font-black mt-1 uppercase text-center leading-none px-1">{comp.shortName}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10">
      
      {isOverheating && (
        <div className="fixed inset-0 bg-red-600/40 z-50 flex items-center justify-center pointer-events-none animate-in fade-in flash-red">
           <AlertTriangle className="w-64 h-64 text-red-100 animate-pulse drop-shadow-2xl" />
        </div>
      )}

      {isFullyWorking && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-in fade-in">
           <div className="bg-white rounded-[3rem] p-12 max-w-2xl text-center shadow-2xl flex flex-col items-center">
              <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
                <MonitorPlay className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-5xl font-black text-emerald-600 uppercase tracking-widest mb-4">Mise splněna!</h2>
              <p className="text-xl font-bold text-gray-600 mb-8">
                Skvělá práce! Počítač je kompletně poskládaný uvnitř, správně propojený se světem zvenku a Operační Systém úspěšně naběhl! 
              </p>
              <button
                onClick={onBack}
                className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 text-lg uppercase"
              >
                Vrátit se do menu
              </button>
           </div>
        </div>
      )}

      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 text-sm uppercase tracking-wider z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-sky-900 uppercase tracking-tight">
          1. Stavba PC {level === 2 && '(Úroveň 2: Chlazení)'} {level === 3 && '(Úroveň 3: Kabely)'} {level === 4 && '(Úroveň 4: Boot)'}
        </h2>
        <div className="w-24"></div>
      </div>

      <div className={`w-full rounded-2xl shadow-md border-2 p-6 mb-8 text-center min-h-[100px] flex items-center justify-center transition-colors
        ${isOverheating || (selectedComp === 'cable_monitor' && infoText.includes('CHYBA')) ? 'bg-red-50 border-red-200' : isPoweredOn || bootState > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-sky-100'}`}
      >
        <p className={`text-lg font-bold transition-colors ${isOverheating || infoText.includes('CHYBA') ? 'text-red-700' : isPoweredOn || bootState > 0 ? 'text-emerald-700' : 'text-gray-700'}`}>
          {infoText}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* L: Main View (Motherboard / Back Panel / Front Panel + Monitor) */}
        <div className={`lg:col-span-8 ${level === 4 ? 'bg-gray-100' : 'bg-gray-900'} rounded-3xl shadow-2xl border-8 ${level === 4 ? 'border-gray-200' : 'border-gray-800'} p-6 sm:p-8 relative min-h-[500px] flex flex-col items-center overflow-hidden transition-colors duration-500`}>
          
          {level < 3 ? (
            // MOTHERBOARD VIEW (Level 1 & 2)
            <div className="absolute inset-4 sm:inset-8 bg-emerald-900/40 rounded-xl border-2 border-emerald-800/50 shadow-inner grid grid-cols-12 grid-rows-12 gap-2 p-4">
              
              <div className="col-span-12 row-span-1 flex justify-center items-start opacity-30">
                <span className="text-white font-mono font-black text-xl sm:text-2xl tracking-widest">MOTHERBOARD</span>
              </div>

              {level === 2 && (
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-32 h-24 sm:w-40 sm:h-32 bg-gray-800 border-4 border-gray-700 rounded-lg flex items-center justify-center z-10 shadow-2xl">
                  {renderSlot('psu', 'PSU', 'w-24 h-16 sm:w-32 sm:h-24 rounded-lg', 'border-yellow-500')}
                </div>
              )}

              <div className="col-start-4 col-span-4 row-start-3 row-span-4 flex items-center justify-center relative">
                {renderSlot('cpu', 'CPU', 'w-24 h-24 sm:w-32 sm:h-32 rounded-lg', 'border-blue-500')}
                
                {isOverheating && placed.cpu && !placed.cooler && (
                  <div className="absolute inset-0 bg-red-500/50 blur-xl rounded-full animate-pulse"></div>
                )}

                {level === 2 && placed.cpu && (
                  <div className="absolute inset-[-10px] z-20 flex items-center justify-center">
                    {renderSlot('cooler', 'Nasunout Chladič', 'w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-black/40 backdrop-blur-sm', 'border-cyan-500')}
                  </div>
                )}
              </div>

              <div className="col-start-9 col-span-3 row-start-3 row-span-5 flex flex-col justify-between p-2 bg-black/20 rounded-lg border-2 border-black/40">
                <div className="text-[10px] text-gray-500 font-bold text-center mb-1">RAM</div>
                {renderSlot('ram', 'RAM', 'w-full h-8 sm:h-10 rounded-sm mb-1', 'border-emerald-500')}
                <div className="w-full h-6 sm:h-8 rounded-sm border-2 border-dashed border-gray-600/50 bg-black/10"></div>
                <div className="w-full h-6 sm:h-8 rounded-sm border-2 border-dashed border-gray-600/50 bg-black/10 mt-1"></div>
              </div>

              <div className="col-start-2 col-span-8 row-start-8 row-span-2 flex items-center bg-black/20 rounded-lg p-2 border-2 border-black/40 mt-2">
                <div className="text-[10px] text-gray-500 font-bold mr-2 w-8 text-right hidden sm:block">PCIe1</div>
                {renderSlot('gpu', 'GPU', 'flex-1 h-12 sm:h-16 rounded-sm', 'border-purple-500')}
              </div>

              {level === 2 && (
                <div className="col-start-2 col-span-6 row-start-10 row-span-2 flex items-center bg-black/20 rounded-lg p-2 border-2 border-black/40 mt-1">
                  <div className="text-[10px] text-gray-500 font-bold mr-2 w-8 text-right hidden sm:block">PCIe2</div>
                  {renderSlot('soundcard', 'Audio Karta', 'flex-1 h-10 sm:h-12 rounded-sm', 'border-pink-500')}
                </div>
              )}

              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-28 h-36 bg-gray-800 border-4 border-gray-700 rounded-lg flex items-center justify-center shadow-xl">
                 {renderSlot('hdd', 'HDD/SSD', 'w-20 h-28 rounded-lg', 'border-amber-500')}
              </div>
              
              {placed.hdd && (
                 <svg className="absolute bottom-16 right-32 w-32 h-32 pointer-events-none z-10" style={{ overflow: 'visible' }}>
                    <path d="M0,0 Q-20,40 40,40" fill="none" stroke="#ef4444" strokeWidth="4" className={isPoweredOn ? "animate-pulse" : ""} />
                 </svg>
              )}

              {level === 2 && placed.psu && (
                <svg className="absolute top-8 left-8 w-[100%] h-[100%] pointer-events-none z-30" style={{ overflow: 'visible' }}>
                  <path d="M40,40 C100,40 100,150 250,150" fill="none" stroke="#fbbf24" strokeWidth="6" strokeDasharray="10 5" className={isPoweredOn ? "animate-pulse stroke-yellow-400" : "opacity-50"} />
                  <path d="M20,60 C40,200 100,280 150,280" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="5 5" className={isPoweredOn ? "animate-pulse stroke-yellow-400" : "opacity-50"} />
                </svg>
              )}
            </div>
          ) : level === 3 ? (
            // BACK PANEL VIEW (Level 3)
            <div className="absolute inset-4 sm:inset-8 bg-gray-800 rounded-xl border-4 border-gray-700 shadow-inner flex flex-col p-4 sm:p-6 justify-around">
               <div className="text-white font-mono font-black text-lg sm:text-xl tracking-widest text-center opacity-30">ZADNÍ PANEL POČÍTAČE</div>
               
               {/* PSU Area */}
               <div className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg p-3 flex justify-between items-center shadow-md">
                 <span className="text-gray-300 font-black uppercase tracking-widest text-sm sm:text-base">Zdroj (PSU)</span>
                 {renderPort('cable_power', 'Napájení 230V', 'w-32', 'bg-yellow-50 border-yellow-200')}
               </div>

               {/* Motherboard I/O Shield Area */}
               <div className="w-full bg-gray-300 border-2 border-gray-400 rounded-lg p-3 flex flex-wrap gap-2 sm:gap-4 items-center justify-around shadow-inner relative">
                 <div className="absolute -top-3 left-4 bg-gray-300 px-2 text-gray-600 font-black uppercase text-xs rounded-full border border-gray-400 shadow-sm">
                   Základní deska (I/O)
                 </div>
                 
                 {renderPort('cable_usb', 'USB', 'w-20', 'bg-blue-50 border-blue-200')}
                 {renderPort('cable_lan', 'LAN', 'w-20', 'bg-emerald-50 border-emerald-200')}
                 
                 {/* The Motherboard Trap Port */}
                 <div className="relative group">
                   {renderPort('mb_hdmi', 'Integ. GPU', 'w-28', '')}
                   {selectedComp === 'cable_monitor' && (
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-red-400 animate-bounce">
                       !!! Zde nezapojovat !!!
                     </div>
                   )}
                 </div>

                 {renderPort('cable_audio', 'Audio', 'w-20', 'bg-pink-50 border-pink-200')}
               </div>

               {/* GPU Bracket Area */}
               <div className="w-full bg-gray-400 border-2 border-gray-500 rounded-lg p-3 flex items-center justify-between gap-6 shadow-md relative mt-2">
                 <div className="absolute -top-3 left-4 bg-gray-400 px-2 text-gray-700 font-black uppercase text-xs rounded-full border border-gray-500 shadow-sm">
                   Grafická karta (PCIe)
                 </div>
                 <div className="text-gray-600 font-bold uppercase text-xs hidden sm:block">Výstupy GPU</div>
                 {renderPort('cable_monitor', 'GPU Monitor', 'w-32', 'bg-purple-50 border-purple-200')}
                 <div className="flex-1 border-b-4 border-dashed border-gray-500/30"></div>
               </div>

            </div>
          ) : (
            // FRONT DESK VIEW (Level 4)
            <div className="absolute inset-2 flex items-end justify-center p-4">
              <div className="w-full h-[90%] flex justify-center gap-8 items-end pb-8">
                
                {/* The Monitor */}
                <div className="w-2/3 max-w-[500px] h-full max-h-[350px] bg-black border-[12px] border-gray-800 rounded-2xl shadow-2xl relative flex flex-col justify-end">
                  {/* Screen surface */}
                  <div className={`absolute inset-0 border-4 border-black overflow-hidden flex flex-col transition-colors duration-700
                    ${bootState === 0 ? 'bg-gray-950' : ''}
                    ${bootState === 1 ? 'bg-black' : ''}
                    ${bootState === 2 ? 'bg-black' : ''}
                    ${bootState === 3 ? 'bg-gradient-to-br from-blue-600 to-sky-400' : ''}`}
                  >
                    {/* Screen glare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                    {bootState === 1 && (
                      <div className="p-4 text-white font-mono text-sm leading-relaxed animate-in fade-in">
                         <div className="text-lg font-black mb-4">American Megatrends</div>
                         <div>CPU: Detekován 3.5 GHz ... OK</div>
                         <div>RAM: 16 GB DDR4 ... OK</div>
                         <div>Klávesnice: Detekována na USB</div>
                         <div>Myš: Detekována na USB</div>
                         <div className="mt-4 animate-pulse">Bootování z pevného disku (SSD)...</div>
                      </div>
                    )}
                    
                    {bootState === 2 && (
                      <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-blue-500 mb-6 grid grid-cols-2 gap-1 p-1">
                          <div className="bg-white"></div><div className="bg-white"></div>
                          <div className="bg-white"></div><div className="bg-white"></div>
                        </div>
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}

                    {bootState === 3 && (
                      <div className="flex-1 p-4 grid grid-cols-4 gap-4 auto-rows-max animate-in fade-in duration-1000">
                        <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/20 p-2 rounded">
                          <Folder className="w-8 h-8 text-yellow-300 fill-yellow-200" />
                          <span className="text-white text-xs drop-shadow-md">Tento počítač</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/20 p-2 rounded">
                          <Chrome className="w-8 h-8 text-white" />
                          <span className="text-white text-xs drop-shadow-md">Internet</span>
                        </div>
                      </div>
                    )}

                  </div>
                  {/* Stand */}
                  <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-24 h-12 bg-gray-700 clip-trapezoid-bottom"></div>
                  <div className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 w-48 h-3 bg-gray-800 rounded-t-lg"></div>
                </div>

                {/* The PC Case (Front) */}
                <div className="w-48 h-[400px] bg-gray-900 border-x-4 border-t-4 border-gray-700 rounded-t-xl shadow-2xl relative flex flex-col items-center p-4">
                   <div className="w-full h-8 bg-gray-800 rounded mb-4 border border-gray-700 flex justify-between px-2 items-center">
                     <div className="w-3 h-1 bg-gray-600 rounded"></div>
                     <div className="w-3 h-1 bg-gray-600 rounded"></div>
                   </div>
                   
                   {/* Power Button */}
                   <button 
                     onClick={startBootSequence}
                     disabled={bootState > 0}
                     className={`w-16 h-16 rounded-full border-4 mt-auto mb-16 flex items-center justify-center transition-all duration-300
                       ${bootState > 0 
                         ? 'border-blue-500 bg-gray-800 shadow-[0_0_20px_rgba(59,130,246,0.8)] cursor-default scale-95' 
                         : 'border-gray-500 bg-gray-700 hover:border-gray-400 hover:bg-gray-600 active:scale-95 shadow-lg'}`}
                   >
                     <Power className={`w-8 h-8 ${bootState > 0 ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,1)]' : 'text-gray-400'}`} />
                   </button>
                   
                   {/* Case vents */}
                   <div className="w-full flex-1 border-t border-gray-700 mt-4 flex flex-col gap-2 pt-4 items-center">
                     <div className="w-24 h-2 bg-gray-950 rounded-full"></div>
                     <div className="w-24 h-2 bg-gray-950 rounded-full"></div>
                     <div className="w-24 h-2 bg-gray-950 rounded-full"></div>
                   </div>
                </div>

              </div>
            </div>
          )}

          {/* Overlays for transitions */}
          {l1Placed && level === 1 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-widest drop-shadow-lg text-center px-4">Základ hotov!</h3>
              <p className="text-gray-300 mb-8 font-bold text-center px-8">Ale chybí nám elektřina a procesor by bez chlazení shořel.</p>
              <button
                onClick={advanceLevel}
                className="flex items-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-full shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all hover:scale-110 active:scale-95 text-lg uppercase"
              >
                Pokračovat na Úroveň 2
              </button>
            </div>
          )}

          {isPoweredOn && level === 2 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-widest drop-shadow-lg text-center px-4">Počítač funguje!</h3>
              <p className="text-gray-300 mb-8 font-bold text-center px-8">Vnitřnosti jsou kompletní. Nyní zavřeme skříň a zapojíme periferie.</p>
              <button
                onClick={advanceLevel}
                className="flex items-center gap-3 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-110 active:scale-95 text-lg uppercase"
              >
                Jít zapojovat kabely (Úroveň 3)
              </button>
            </div>
          )}

          {level === 3 && l3Complete && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-in fade-in zoom-in">
              <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-widest drop-shadow-lg text-center px-4">Vše připraveno!</h3>
              <p className="text-gray-300 mb-8 font-bold text-center px-8 text-lg">Pojďme se podívat dopředu a zapnout ho.</p>
              <button
                onClick={advanceLevel}
                className="flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:scale-110 active:scale-95 text-xl uppercase"
              >
                FINÁLNÍ ZAPNUTÍ!
              </button>
            </div>
          )}

          {/* Power Button (Visible in Level 2 when PSU is placed) */}
          {level === 2 && placed.psu && !isPoweredOn && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
              <button
                onClick={handlePowerOn}
                className={`flex items-center gap-3 px-8 py-4 text-white font-black rounded-full transition-all hover:scale-110 active:scale-95 text-lg uppercase shadow-2xl
                  ${isOverheating ? 'bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)]' : 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]'}`}
              >
                <Power className="w-8 h-8" /> {isOverheating ? 'PŘEHŘÁTÍ!' : 'ZAPNOUT POČÍTAČ'}
              </button>
            </div>
          )}

        </div>

        {/* R: Component Warehouse */}
        <div className={`lg:col-span-4 flex flex-col gap-4 ${level === 4 ? 'opacity-30 pointer-events-none' : ''} transition-opacity duration-500`}>
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-4">
            <h3 className="font-bold text-gray-600 uppercase tracking-wider text-sm mb-4 text-center border-b-2 border-gray-100 pb-2">
              Sklad (Úroveň {level})
            </h3>
            
            <div className="flex flex-col gap-3">
              {currentComponents.length === 0 && level === 4 ? (
                <div className="text-center text-gray-400 font-bold py-8">Sklad je prázdný.<br/>Soustřeď se na zapnutí!</div>
              ) : (
                currentComponents.map(comp => {
                  const isPlaced = placed[comp.id];
                  const isSelected = selectedComp === comp.id;
                  
                  return (
                    <div 
                      key={comp.id}
                      draggable={!isPlaced && !isPoweredOn && !isOverheating && !isFullyWorking && level < 4}
                      onDragStart={(e) => handleDragStart(e, comp.id)}
                      onClick={() => handleSelect(comp.id)}
                      className={`
                        flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-200
                        ${isPlaced ? 'opacity-30 grayscale cursor-not-allowed bg-gray-50 border-gray-200' : 
                          isSelected ? `${comp.color} shadow-md scale-105` : 
                          `bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer shadow-sm`}
                      `}
                    >
                      <div className={`p-2 rounded-lg ${isPlaced ? 'bg-gray-200' : isSelected ? 'bg-white/50' : 'bg-gray-100'}`}>
                        {comp.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm uppercase">{comp.name}</h4>
                        {isPlaced ? (
                          <span className="text-xs font-bold text-emerald-600">Zapojeno</span>
                        ) : (
                          <span className="text-xs text-gray-500">{isSelected ? 'Vybráno' : 'Přetáhni / Klikni'}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes flash-red {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .flash-red {
          animation: flash-red 4s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .clip-trapezoid-bottom {
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default PcBuilderGame;
