import React, { useState, useEffect } from 'react';
import { ArrowLeft, HardDrive, MemoryStick, Cpu, Zap, FileText, X, Save, Power, MonitorPlay, Table, AlertOctagon, Trophy, Info } from 'lucide-react';

interface DataJourneyGameProps {
  onBack: () => void;
}

interface SavedFile {
  name: string;
  content: string;
  type: 'word' | 'excel';
}

interface OpenWindow {
  id: string;
  type: 'word' | 'excel';
  file: SavedFile | null;
  content: string;
  zIndex: number;
  isMinimized: boolean;
}

const OS_RAM = 1200;
const WORD_RAM = 450;
const EXCEL_RAM = 500;
const DOC_RAM = 50;

const DataJourneyGame: React.FC<DataJourneyGameProps> = ({ onBack }) => {
  // Mode selection
  const [gameMode, setGameMode] = useState<'sandbox' | 'mission'>('sandbox');

  // State
  const [isComputerOn, setIsComputerOn] = useState(true);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  
  // Modals
  const [saveDialogWindowId, setSaveDialogWindowId] = useState<string | null>(null);
  const [saveFileName, setSaveFileName] = useState('');
  
  // Hardware visual states
  const [isCpuActive, setIsCpuActive] = useState(false);
  const [isPowerOutage, setIsPowerOutage] = useState(false);
  const [isBsod, setIsBsod] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);

  const TOTAL_RAM = gameMode === 'mission' ? 2000 : 8192;

  const switchMode = (mode: 'sandbox' | 'mission') => {
    setGameMode(mode);
    setIsComputerOn(true);
    setOpenWindows([]);
    setSavedFiles([]);
    setIsBsod(false);
    setMissionComplete(false);
    setSaveDialogWindowId(null);
  };

  // RAM Calculation
  const getRamUsage = () => {
    let total = OS_RAM;
    let hasWord = false;
    let hasExcel = false;
    openWindows.forEach(w => {
       if (w.type === 'word') hasWord = true;
       if (w.type === 'excel') hasExcel = true;
       total += DOC_RAM;
    });
    if (hasWord) total += WORD_RAM;
    if (hasExcel) total += EXCEL_RAM;
    return total;
  };

  const ramUsage = getRamUsage();
  const ramPercent = Math.min(100, Math.round((ramUsage / TOTAL_RAM) * 100));

  // Check for BSOD (only heavily likely in mission mode)
  useEffect(() => {
    if (isComputerOn && ramUsage > TOTAL_RAM && !isBsod) {
      setIsBsod(true);
      setOpenWindows([]);
      setSaveDialogWindowId(null);
    }
  }, [ramUsage, TOTAL_RAM, isComputerOn, isBsod]);

  // Check for Mission Completion
  useEffect(() => {
    if (gameMode !== 'mission' || !isComputerOn || isBsod) return;
    
    const hasSmlouva = savedFiles.some(f => f.name.toLowerCase() === 'smlouva.txt');
    const hasCenik = savedFiles.some(f => f.name.toLowerCase() === 'cenik.xlsx');
    const allClosed = openWindows.length === 0;

    if (hasSmlouva && hasCenik && allClosed) {
      setMissionComplete(true);
    }
  }, [savedFiles, openWindows, isComputerOn, isBsod, gameMode]);

  const triggerCpu = () => {
    setIsCpuActive(true);
    setTimeout(() => setIsCpuActive(false), 300);
  };

  const activeWindow = openWindows.reduce((prev, current) => {
    if (current.isMinimized) return prev;
    if (!prev) return current;
    return prev.zIndex > current.zIndex ? prev : current;
  }, null as OpenWindow | null);

  const handlePowerButton = () => {
    if (isPowerOutage) return;
    if (isComputerOn) {
      setIsComputerOn(false);
      setOpenWindows([]);
      setSaveDialogWindowId(null);
      setIsBsod(false);
    } else {
      setIsComputerOn(true);
      setIsBsod(false);
      triggerCpu();
    }
  };

  const handleSimulateOutage = () => {
    setIsPowerOutage(true);
    setIsComputerOn(false);
    setOpenWindows([]);
    setSaveDialogWindowId(null);
    setIsBsod(false);
    setTimeout(() => setIsPowerOutage(false), 1500);
  };

  const focusWindow = (id: string) => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
  };

  const toggleMinimize = (id: string) => {
    setOpenWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (!w.isMinimized && activeWindow?.id === id) {
           return { ...w, isMinimized: true };
        } else {
           return { ...w, isMinimized: false, zIndex: topZIndex + 1 };
        }
      }
      return w;
    }));
    if (openWindows.find(w => w.id === id)?.isMinimized !== false) {
      setTopZIndex(topZIndex + 1);
    }
  };

  const openApp = (type: 'word' | 'excel', file?: SavedFile) => {
    if (!isComputerOn || isBsod) return;
    triggerCpu();
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    const newWindow: OpenWindow = {
      id: Date.now().toString() + Math.random(),
      type,
      file: file || null,
      content: file ? file.content : (type === 'excel' ? '["","","","","","","","",""]' : ''),
      zIndex: newZ,
      isMinimized: false
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerCpu();
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (saveDialogWindowId === id) setSaveDialogWindowId(null);
  };

  const handleContentChange = (id: string, newContent: string) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, content: newContent } : w));
    triggerCpu();
  };

  const getExcelCells = (content: string) => {
    try {
      const cells = JSON.parse(content);
      if (Array.isArray(cells)) return cells;
    } catch { }
    return Array(9).fill('');
  };

  const handleExcelCellChange = (id: string, content: string, index: number, value: string) => {
    const cells = getExcelCells(content);
    cells[index] = value;
    handleContentChange(id, JSON.stringify(cells));
  };

  const handleSaveClick = (window: OpenWindow) => {
    triggerCpu();
    if (window.file) {
      setSavedFiles(prev => prev.map(f => f.name === window.file!.name ? { ...f, content: window.content } : f));
    } else {
      setSaveFileName(window.type === 'word' ? (gameMode === 'mission' ? 'Smlouva.txt' : 'Referát.txt') : (gameMode === 'mission' ? 'Cenik.xlsx' : 'Tabulka.xlsx'));
      setSaveDialogWindowId(window.id);
    }
  };

  const confirmSave = () => {
    triggerCpu();
    const window = openWindows.find(w => w.id === saveDialogWindowId);
    if (!window) return;

    const finalName = saveFileName.trim() || (window.type === 'word' ? 'Nový dokument.txt' : 'Nová tabulka.xlsx');
    const newFileObj: SavedFile = { name: finalName, content: window.content, type: window.type };

    const exists = savedFiles.find(f => f.name === finalName);
    if (exists) {
      setSavedFiles(prev => prev.map(f => f.name === finalName ? newFileObj : f));
    } else {
      setSavedFiles(prev => [...prev, newFileObj]);
    }
    
    setOpenWindows(prev => prev.map(w => w.id === window.id ? { ...w, file: newFileObj } : w));
    setSaveDialogWindowId(null);
  };

  return (
    <div className="max-w-7xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10 px-4">
      
      {isPowerOutage && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center pointer-events-none">
           <Zap className="w-64 h-64 text-yellow-500 animate-pulse" />
        </div>
      )}

      {missionComplete && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-emerald-500 rounded-3xl p-8 max-w-lg w-full text-center text-white shadow-2xl border-4 border-emerald-400 animate-in zoom-in">
            <Trophy className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Mise splněna!</h2>
            <p className="text-lg font-bold text-emerald-100 mb-8">
              Pochopil jsi, jak funguje paměť! Úspěšně jsi vytvořil oba soubory na počítači s malou RAMkou tím, že jsi programy poctivě zavíral a uvolňoval tak paměť.
            </p>
            <button onClick={() => switchMode('sandbox')} className="px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black rounded-xl shadow-lg transition-transform hover:scale-105 uppercase tracking-wider">
              Návrat do Sandboxu
            </button>
          </div>
        </div>
      )}

      {/* Header with Mode Toggle */}
      <div className="w-full flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        
        {/* Mode Switcher */}
        <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner border border-gray-300">
          <button 
            onClick={() => switchMode('sandbox')}
            className={`px-6 py-2 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${gameMode === 'sandbox' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Sandbox (Výuka)
          </button>
          <button 
            onClick={() => switchMode('mission')}
            className={`px-6 py-2 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${gameMode === 'mission' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Mise: Málo Paměti
          </button>
        </div>

        <button onClick={handleSimulateOutage} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg transition-all border border-red-800 text-sm uppercase">
          <Zap className="w-4 h-4" /> Výpadek proudu
        </button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* L: User Interface */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="flex flex-col gap-2 ml-2">
            <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm flex items-center justify-between">
              <span>Obrazovka Uživatele</span>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-lg mr-2 border border-gray-200">
                Pohled do Software
              </span>
            </h3>

            {/* Hardware vs Software Legend */}
            <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 shadow-sm text-xs font-medium text-sky-800 flex gap-6 items-center mb-1">
              <div className="flex items-center gap-2 font-black text-sky-900 uppercase">
                <Info className="w-4 h-4" /> Co je co:
              </div>
              <div>
                <span className="font-black">Hardware:</span> Vpravo (Monitor, CPU, RAM, Disk)
              </div>
              <div>
                <span className="font-black">Software (Programy):</span> Word, Excel, OS Windows
              </div>
              <div>
                <span className="font-black">Software (Data):</span> Dokumenty a Tabulky
              </div>
            </div>
            
            {/* Mission Objectives */}
            {gameMode === 'mission' && (
              <div className="bg-amber-100 border-2 border-amber-300 rounded-xl px-4 py-2 shadow-sm">
                <h4 className="text-amber-900 font-black text-[10px] uppercase tracking-wider mb-1">Cíle mise (Zabraň přeplnění paměti - Kapacita jen 2000 MB!):</h4>
                <ul className="text-xs font-bold text-amber-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${savedFiles.some(f => f.name.toLowerCase() === 'smlouva.txt') ? 'bg-amber-500 border-amber-500' : 'border-amber-400'}`}></div>
                    Ulož soubor: Smlouva.txt (ve Wordu)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${savedFiles.some(f => f.name.toLowerCase() === 'cenik.xlsx') ? 'bg-amber-500 border-amber-500' : 'border-amber-400'}`}></div>
                    Ulož soubor: Cenik.xlsx (v Excelu)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border-2 ${openWindows.length === 0 ? 'bg-amber-500 border-amber-500' : 'border-amber-400'}`}></div>
                    Zavři křížkem všechny programy (Uvolni paměť)
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="bg-gray-900 rounded-3xl p-4 border-8 border-gray-800 shadow-2xl relative aspect-[4/3] flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full mt-2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full"></div>
            </div>

            <div className="flex-1 bg-sky-200 rounded-xl overflow-hidden relative border-4 border-black flex flex-col">
              {!isComputerOn ? (
                <div className="flex-1 bg-black flex flex-col items-center justify-center text-gray-800">
                  <MonitorPlay className="w-16 h-16 opacity-20 mb-4" />
                  <span className="font-bold opacity-20 uppercase tracking-widest">Žádný signál</span>
                </div>
              ) : isBsod ? (
                <div className="absolute inset-0 bg-[#0000AA] p-8 flex flex-col text-white font-mono z-[200]">
                  <span className="text-8xl mb-4">:(</span>
                  <h2 className="text-2xl font-bold mb-4">Váš počítač narazil na problém a musel být ukončen.</h2>
                  <p className="mb-4">Důvod zastavení systému:</p>
                  <p className="text-xl font-bold bg-white/20 p-2 inline-block">OUT_OF_MEMORY</p>
                  <p className="mt-8 text-sm opacity-80">Došlo k vyčerpání celé Operační paměti (RAM).<br/>Pokusili jste se spustit příliš mnoho programů naráz na počítači s kapacitou RAM {TOTAL_RAM} MB.</p>
                  <p className="mt-8 text-xs opacity-60">Stiskněte modré tlačítko napájení pod monitorem pro restart počítače.</p>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80"></div>
                  
                  <div className="flex-1 relative p-4 flex flex-col gap-4 items-start flex-wrap content-start">
                    <button onClick={() => openApp('word')} className="flex flex-col items-center gap-1 group w-20 z-10">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg shadow-md border-2 border-white flex items-center justify-center text-white font-serif font-bold text-2xl group-hover:bg-blue-500">W</div>
                      <span className="text-white text-[10px] font-bold drop-shadow-md text-center bg-black/30 px-2 rounded-md">Nový Word</span>
                    </button>
                    
                    <button onClick={() => openApp('excel')} className="flex flex-col items-center gap-1 group w-20 z-10">
                      <div className="w-12 h-12 bg-green-600 rounded-lg shadow-md border-2 border-white flex items-center justify-center text-white font-sans font-bold text-2xl group-hover:bg-green-500">X</div>
                      <span className="text-white text-[10px] font-bold drop-shadow-md text-center bg-black/30 px-2 rounded-md">Nový Excel</span>
                    </button>

                    {savedFiles.map((file, idx) => (
                      <button key={idx} onClick={() => openApp(file.type, file)} className="flex flex-col items-center gap-1 group w-20 z-10">
                        <div className="w-10 h-12 bg-white rounded-md shadow-md border border-gray-300 flex items-center justify-center relative overflow-hidden group-hover:scale-105">
                          <div className="absolute top-0 right-0 w-3 h-3 bg-gray-200 border-b border-l border-gray-300"></div>
                          {file.type === 'word' ? <FileText className="w-6 h-6 text-blue-600" /> : <Table className="w-6 h-6 text-green-600" />}
                        </div>
                        <span className="text-white text-[10px] font-bold drop-shadow-md text-center bg-black/30 px-2 rounded-md truncate max-w-full">{file.name}</span>
                      </button>
                    ))}

                    {openWindows.map((win, index) => {
                      if (win.isMinimized) return null;
                      const offset = index * 20;
                      return (
                        <div 
                          key={win.id}
                          onClick={() => focusWindow(win.id)}
                          style={{ zIndex: win.zIndex, top: `${10 + offset}px`, left: `${10 + offset}px`, right: `${10}px`, bottom: `${40}px` }}
                          className={`absolute bg-white rounded-lg shadow-2xl flex flex-col border border-gray-400 overflow-hidden animate-in zoom-in duration-200 
                            ${activeWindow?.id === win.id ? 'ring-2 ring-blue-400/50' : 'opacity-95'}`}
                        >
                          <div className={`border-b px-3 py-2 flex justify-between items-center ${win.type === 'word' ? 'bg-blue-100 border-blue-200' : 'bg-green-100 border-green-200'}`}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-sm text-[10px] text-white flex items-center justify-center font-bold ${win.type === 'word' ? 'bg-blue-600 font-serif' : 'bg-green-600 font-sans'}`}>
                                {win.type === 'word' ? 'W' : 'X'}
                              </div>
                              <span className="text-xs font-bold text-gray-800">
                                {win.file?.name || (win.type === 'word' ? 'Nový dokument' : 'Nová tabulka')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }} className="text-gray-600 hover:bg-black/10 px-2 py-0.5 rounded transition-colors font-bold text-sm leading-none">
                                _
                              </button>
                              <button onClick={(e) => closeWindow(win.id, e)} className="hover:bg-red-500 hover:text-white p-0.5 rounded transition-colors">
                                <X className="w-4 h-4 text-gray-600 hover:text-white" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-gray-50 border-b border-gray-200 p-1.5 flex gap-2">
                            <button onClick={() => handleSaveClick(win)} className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-[10px] font-bold text-gray-700 shadow-sm">
                              <Save className={`w-3 h-3 ${win.type === 'word' ? 'text-blue-600' : 'text-green-600'}`} /> Uložit
                            </button>
                            <button 
                              onClick={() => {
                                triggerCpu();
                                setSaveFileName(win.file ? `Kopie_${win.file.name}` : (win.type === 'word' ? (gameMode === 'mission' ? 'Smlouva.txt' : 'Referát.txt') : (gameMode === 'mission' ? 'Cenik.xlsx' : 'Tabulka.xlsx')));
                                setSaveDialogWindowId(win.id);
                              }}
                              className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-[10px] font-bold text-gray-700 shadow-sm"
                            >
                              Uložit jako...
                            </button>
                          </div>

                          {win.type === 'word' ? (
                            <textarea
                              value={win.content}
                              onChange={(e) => handleContentChange(win.id, e.target.value)}
                              placeholder="Text dokumentu..."
                              className="flex-1 w-full p-4 resize-none focus:outline-none text-sm text-gray-800"
                              spellCheck={false}
                            />
                          ) : (
                            <div className="flex-1 w-full p-4 bg-gray-50">
                              <div className="grid grid-cols-3 gap-0 border border-gray-300 bg-white shadow-sm">
                                {getExcelCells(win.content).map((cell, idx) => (
                                  <input 
                                    key={idx}
                                    type="text"
                                    value={cell}
                                    onChange={(e) => handleExcelCellChange(win.id, win.content, idx, e.target.value)}
                                    className="w-full h-8 border border-gray-200 px-2 text-xs focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    placeholder={idx === 0 ? "A1" : idx === 1 ? "B1" : idx === 2 ? "C1" : ""}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {saveDialogWindowId && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4 backdrop-blur-sm z-[9999]">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-300 w-full max-w-sm p-4 flex flex-col gap-4">
                          <h4 className="font-bold text-gray-800">Uložit soubor</h4>
                          <div>
                            <input 
                              type="text"
                              value={saveFileName}
                              onChange={(e) => { setSaveFileName(e.target.value); triggerCpu(); }}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => setSaveDialogWindowId(null)} className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded">Zrušit</button>
                            <button onClick={confirmSave} className="px-4 py-2 text-xs font-bold text-white rounded bg-blue-600 hover:bg-blue-700">Uložit na disk</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="h-10 bg-slate-800/90 backdrop-blur border-t border-slate-700 flex items-center px-2 gap-2 z-50">
                     <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">
                        <MonitorPlay className="w-4 h-4" />
                     </div>
                     {openWindows.map(win => (
                        <button 
                          key={win.id}
                          onClick={() => toggleMinimize(win.id)}
                          className={`flex items-center gap-2 px-2 py-1 max-w-[100px] rounded transition-colors border
                            ${activeWindow?.id === win.id && !win.isMinimized ? 'bg-slate-700 border-slate-500 text-white shadow-inner' : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-700/50'}`}
                        >
                          {win.type === 'word' ? <FileText className="w-4 h-4 text-blue-400 shrink-0" /> : <Table className="w-4 h-4 text-green-400 shrink-0" />}
                          <span className="text-[10px] font-bold truncate">{win.file?.name || 'Nový'}</span>
                        </button>
                     ))}
                  </div>
                </>
              )}
            </div>

            <div className="h-10 w-full flex justify-end items-center px-4">
               <button onClick={handlePowerButton} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isComputerOn ? 'text-blue-500 hover:bg-gray-800' : 'text-gray-500 hover:text-white'}`}>
                 <Power className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>

        {/* R: Hardware */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex justify-between items-end ml-2">
            <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm flex items-center justify-between">
              <span>Vnitřní Hardware Počítače</span>
            </h3>
            
            <div className={`rounded-xl px-4 py-2 border-2 ${ramPercent >= 100 ? 'bg-red-100 border-red-400 text-red-900 animate-pulse' : ramPercent > 80 ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-emerald-100 border-emerald-400 text-emerald-900'}`}>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider mb-1">
                 <span>Zaplnění RAM</span>
                 <span>{ramUsage} / {TOTAL_RAM} MB</span>
               </div>
               <div className="w-32 h-2 bg-black/10 rounded-full overflow-hidden">
                 <div className="h-full bg-current transition-all duration-500" style={{ width: `${Math.min(100, ramPercent)}%` }}></div>
               </div>
            </div>
          </div>
          
          <div className="bg-slate-900/90 rounded-3xl p-6 shadow-2xl border-4 border-slate-800 flex flex-col gap-8 flex-1 relative overflow-hidden backdrop-blur-sm">
            
            {/* CPU */}
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Procesor (CPU)
              </h4>
              <div className="flex justify-center">
                <div className={`relative w-32 h-32 bg-[#1b4332] rounded-lg border-2 border-[#081c15] shadow-2xl flex items-center justify-center p-2 transition-transform ${isCpuActive ? 'scale-105' : ''}`}>
                  <div className="absolute inset-0 border-4 border-dotted border-yellow-600/30 rounded-lg m-1"></div>
                  <div className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-md border border-gray-400 flex flex-col items-center justify-center shadow-inner transition-all duration-75 relative overflow-hidden
                    ${isCpuActive ? 'shadow-[0_0_30px_rgba(59,130,246,0.8)] border-blue-400' : ''}`}
                  >
                    {isCpuActive && <div className="absolute inset-0 bg-blue-400/20 animate-pulse"></div>}
                    <span className="text-gray-700 font-black text-2xl tracking-tighter relative z-10">CPU</span>
                    <span className="text-gray-500 text-[8px] font-mono mt-1 relative z-10">4.2 GHz</span>
                    <span className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full relative z-10 transition-colors ${isCpuActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      {isCpuActive ? 'Zpracovávám...' : 'Čekám'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RAM */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MemoryStick className="w-4 h-4" /> Operační Paměť (RAM)
                </h4>
                {isComputerOn && !isBsod ? (
                  <span className="text-[9px] bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">Pod proudem</span>
                ) : (
                  <span className="text-[9px] bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full border border-red-800">Bez proudu</span>
                )}
              </div>

              <div className={`relative w-full h-28 rounded-sm shadow-2xl transition-colors ${(isComputerOn && !isBsod) ? 'bg-[#004b23] border-[#002913]' : 'bg-[#1b2a22] border-[#0a120e]'} border-b-4`}>
                <div className="absolute bottom-[-4px] left-2 right-2 h-1 bg-yellow-500/80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 3px)' }}></div>
                <div className={`absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-sm ${(isComputerOn && !isBsod) ? 'bg-slate-900' : 'bg-slate-900'}`}></div>

                <div className="absolute inset-y-3 left-4 right-4 flex justify-between opacity-40 pointer-events-none">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="w-[10%] h-full bg-black rounded-sm border border-gray-800 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-gray-900/50"></div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 w-full h-full p-2 flex items-center gap-2 overflow-x-auto custom-scrollbar">
                  {(!isComputerOn || isBsod) ? (
                    <div className="w-full text-center text-slate-400/50 text-xs font-bold italic flex flex-col items-center justify-center">
                      <AlertOctagon className="w-6 h-6 mb-1 opacity-50" />
                      Paměť je smazaná.
                    </div>
                  ) : (
                    <>
                      <div className="h-full w-20 shrink-0 bg-emerald-500/90 backdrop-blur-sm rounded-lg border-2 border-emerald-400 p-2 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black text-emerald-950 uppercase">Windows</span>
                        <span className="text-[8px] text-emerald-900 font-mono mt-1">1200 MB</span>
                      </div>
                      
                      {openWindows.map(win => {
                         const isUnsaved = !win.file || !savedFiles.find(f => f.name === win.file!.name && f.content === win.content);
                         const isWord = win.type === 'word';
                         return (
                           <div key={win.id} className={`h-full min-w-[110px] flex-1 shrink-0 backdrop-blur-sm rounded-lg border-2 p-2 shadow-lg flex flex-col animate-in zoom-in
                             ${isUnsaved ? 'bg-amber-500/90 border-amber-300' : (isWord ? 'bg-blue-500/90 border-blue-300' : 'bg-green-500/90 border-green-300')}`}
                           >
                             <div className="flex justify-between items-center mb-1">
                                <span className={`text-[9px] font-black uppercase ${isUnsaved ? 'text-amber-950' : (isWord ? 'text-blue-950' : 'text-green-950')}`}>
                                  {isWord ? 'Word' : 'Excel'} ({isUnsaved ? 'Neuloženo' : 'Uloženo'})
                                </span>
                             </div>
                             <div className="flex-1 bg-black/40 rounded p-1 overflow-hidden flex flex-col">
                               <span className="text-[8px] text-white/50 mb-0.5">{win.file?.name || 'Bez názvu'} ({isWord ? '450' : '500'} MB)</span>
                               <span className="text-[8px] font-mono text-white whitespace-pre-wrap break-all leading-none">
                                 {win.content.length > 30 ? win.content.substring(0, 30) + '...' : (win.content || 'Prázdný blok')}
                               </span>
                             </div>
                           </div>
                         );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* HDD */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <HardDrive className="w-4 h-4" /> Pevný Disk (Úložiště)
                </h4>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">Pamatuje si i bez proudu</span>
              </div>
              
              <div className="relative w-full h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl border-4 border-gray-600 shadow-2xl p-4 flex gap-6 overflow-hidden">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full border-4 border-gray-500 bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center
                    ${isCpuActive && openWindows.length > 0 ? 'animate-[spin_4s_linear_infinite]' : ''}`}
                  >
                    <div className="w-24 h-24 rounded-full border border-gray-400/50"></div>
                    <div className="absolute w-16 h-16 rounded-full border border-gray-400/50"></div>
                    <div className="absolute w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-400 shadow-xl"></div>
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-20 h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full origin-bottom-right transition-transform duration-100 shadow-xl border border-gray-400
                    ${isCpuActive ? '-rotate-12' : '-rotate-45'}`}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-3 bg-red-500 rounded-sm shadow-md"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
                  <div className="w-full bg-slate-800/80 rounded border border-slate-600 p-2 text-[10px] font-black text-slate-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div> Systémové soubory
                  </div>
                  {savedFiles.map((f, idx) => (
                    <div key={idx} className="w-full bg-amber-900/40 rounded border border-amber-700/50 p-2 text-[10px] font-black text-amber-400 flex items-center gap-2 animate-in slide-in-from-right-4 shadow-sm">
                      {f.type === 'word' ? <FileText className="w-3 h-3 text-amber-500" /> : <Table className="w-3 h-3 text-green-500" />}
                      <div className="flex-1 truncate">{f.name}</div>
                      <div className="text-[8px] bg-black/50 px-1.5 py-0.5 rounded text-amber-200">{f.content.length} B</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DataJourneyGame;
