import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChkdskGameProps {
  onBack: () => void;
}

type LevelId = 1 | 2 | 3;

interface FileItem {
  name: string;
  startSector: number;
}

interface SectorState {
  id: number;
  fatVal: string | number;
  status: 'normal' | 'highlighted' | 'error';
}

const ChkdskGame: React.FC<ChkdskGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<LevelId>(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [fixOption, setFixOption] = useState<boolean>(false);

  // --- LEVEL 1: Lost Clusters ---
  const level1Files: FileItem[] = [
    { name: 'dopis.txt', startSector: 2 },
  ];
  const level1Sectors: SectorState[] = [
    { id: 0, fatVal: 'FREE', status: 'normal' },
    { id: 1, fatVal: 'FREE', status: 'normal' },
    { id: 2, fatVal: 5, status: 'normal' }, // dopis start
    { id: 3, fatVal: 'FREE', status: 'normal' },
    { id: 4, fatVal: 'FREE', status: 'normal' },
    { id: 5, fatVal: 'EOF', status: 'normal' }, // dopis end
    { id: 6, fatVal: 'FREE', status: 'normal' },
    { id: 7, fatVal: 'FREE', status: 'normal' },
    { id: 8, fatVal: 12, status: 'normal' }, // LOST START!
    { id: 9, fatVal: 'FREE', status: 'normal' },
    { id: 10, fatVal: 'FREE', status: 'normal' },
    { id: 11, fatVal: 'FREE', status: 'normal' },
    { id: 12, fatVal: 'EOF', status: 'normal' }, // lost end
    { id: 13, fatVal: 'FREE', status: 'normal' },
    { id: 14, fatVal: 'FREE', status: 'normal' },
    { id: 15, fatVal: 'FREE', status: 'normal' },
  ];

  // --- LEVEL 2: Loop ---
  const level2Files: FileItem[] = [
    { name: 'hra.exe', startSector: 3 },
  ];
  const level2Sectors: SectorState[] = [
    { id: 0, fatVal: 'FREE', status: 'normal' },
    { id: 1, fatVal: 'FREE', status: 'normal' },
    { id: 2, fatVal: 'FREE', status: 'normal' },
    { id: 3, fatVal: 7, status: 'normal' }, // hra start
    { id: 4, fatVal: 'FREE', status: 'normal' },
    { id: 5, fatVal: 'FREE', status: 'normal' },
    { id: 6, fatVal: 'FREE', status: 'normal' },
    { id: 7, fatVal: 11, status: 'normal' }, // hra
    { id: 8, fatVal: 'FREE', status: 'normal' },
    { id: 9, fatVal: 'FREE', status: 'normal' },
    { id: 10, fatVal: 'FREE', status: 'normal' },
    { id: 11, fatVal: 7, status: 'normal' }, // LOOP CAUSE! Points back to 7
    { id: 12, fatVal: 'FREE', status: 'normal' },
    { id: 13, fatVal: 'FREE', status: 'normal' },
    { id: 14, fatVal: 'FREE', status: 'normal' },
    { id: 15, fatVal: 'FREE', status: 'normal' },
  ];

  // --- LEVEL 3: Cross-linked Files ---
  const level3Files: FileItem[] = [
    { name: 'foto.jpg', startSector: 1 },
    { name: 'hudba.mp3', startSector: 4 },
  ];
  const level3Sectors: SectorState[] = [
    { id: 0, fatVal: 'FREE', status: 'normal' },
    { id: 1, fatVal: 6, status: 'normal' }, // foto start
    { id: 2, fatVal: 'FREE', status: 'normal' },
    { id: 3, fatVal: 'FREE', status: 'normal' },
    { id: 4, fatVal: 6, status: 'normal' }, // hudba start -> cross points to 6!
    { id: 5, fatVal: 'FREE', status: 'normal' },
    { id: 6, fatVal: 9, status: 'normal' }, // SHARED SECTOR (CROSS LINKED)!
    { id: 7, fatVal: 'FREE', status: 'normal' },
    { id: 8, fatVal: 'FREE', status: 'normal' },
    { id: 9, fatVal: 'EOF', status: 'normal' }, // shared end
    { id: 10, fatVal: 'FREE', status: 'normal' },
    { id: 11, fatVal: 'FREE', status: 'normal' },
    { id: 12, fatVal: 'FREE', status: 'normal' },
    { id: 13, fatVal: 'FREE', status: 'normal' },
    { id: 14, fatVal: 'FREE', status: 'normal' },
    { id: 15, fatVal: 'FREE', status: 'normal' },
  ];

  const getSetup = () => {
    switch (level) {
      case 1:
        return {
          title: 'Ztracené clustery (Lost Clusters)',
          taskDesc: 'V adresáři je pouze soubor dopis.txt. Ve FAT tabulce ale existuje zřetězený seznam sektorů, na které žádný soubor neodkazuje. Najdi a klikni na první (počáteční) sektor tohoto ztraceného řetězce.',
          sectors: level1Sectors,
          files: level1Files,
          correctId: 8,
        };
      case 2:
        return {
          title: 'Zacyklený soubor (FAT Loop)',
          taskDesc: 'Soubor hra.exe se při načítání zasekne v nekonečné smyčce. Najdi a klikni na sektor, který tuto chybu způsobuje (odkazuje zpět na sektor, který už byl jednou načten).',
          sectors: level2Sectors,
          files: level2Files,
          correctId: 11,
        };
      case 3:
        return {
          title: 'Překřížené soubory (Cross-linked Files)',
          taskDesc: 'Soubory foto.jpg a hudba.mp3 sdílejí stejné sektory kvůli chybě ve FAT. Najdi a klikni na první (společný) sektor, ve kterém se soubory protínají.',
          sectors: level3Sectors,
          files: level3Files,
          correctId: 6,
        };
    }
  };

  const { title, taskDesc, sectors, files, correctId } = getSetup();

  const resetLevel = () => {
    setFeedback(null);
    setIsCompleted(false);
    setFixOption(false);
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as LevelId);
      resetLevel();
    } else {
      setIsCompleted(true);
      setFeedback({
        type: 'success',
        text: 'Gratulujeme! Úspěšně jsi vyřešil všechny diagnostické chyby ve FAT tabulce jako správný IT administrátor!',
      });
    }
  };

  const handleSectorClick = (sectorId: number) => {
    if (isCompleted || fixOption) return;

    if (sectorId === correctId) {
      setFeedback({
        type: 'info',
        text: `Správně! Našel jsi vadný sektor ${correctId}. Nyní zvol, jak chceš chybu opravit.`,
      });
      setFixOption(true);
    } else {
      setFeedback({
        type: 'error',
        text: `Sektor ${sectorId} je v pořádku. Podívej se znovu pozorně na cesty souborů a FAT tabulku.`,
      });
    }
  };

  const handleFixAction = (actionType: string) => {
    if (level === 1) {
      setFeedback({
        type: 'success',
        text: actionType === 'delete' 
          ? 'Oprava úspěšná! Clustery 8 a 12 byly označeny jako FREE (volné) a jsou opět připravené k zápisu.'
          : 'Oprava úspěšná! Vytvořil jsi nový soubor FILE0000.CHK v adresáři a data jsi zachránil.',
      });
    } else if (level === 2) {
      setFeedback({
        type: 'success',
        text: 'Oprava úspěšná! Zapsal jsi do FAT[11] značku EOF. Soubor je nyní korektně ukončen a smyčka zmizela.',
      });
    } else if (level === 3) {
      setFeedback({
        type: 'success',
        text: 'Oprava úspěšná! Zkopíroval jsi sdílená data ze sektoru 6 a 9 na volný sektor (např. 13) a aktualizoval FAT pro hudba.mp3. Oba soubory mají nyní vlastní nezávislá data.',
      });
    }
    setIsCompleted(true);
    setFixOption(false);
  };

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-500 px-4">
      {/* Horní panel */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na rozcestník
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-3 bg-white hover:bg-gray-50 text-gray-600 rounded-2xl shadow-md border-2 border-gray-100 hover:scale-105 transition-transform"
            title="Nápověda k chybám FAT"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={resetLevel}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
          >
            <RefreshCcw className="w-4 h-4" /> Restartovat
          </button>
        </div>
      </div>

      {/* Nápověda */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 mb-6 text-purple-900 text-sm overflow-hidden shadow-inner"
          >
            <h3 className="font-extrabold text-base mb-2 uppercase tracking-wide flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600" /> Diagnostika chyb FAT
            </h3>
            <p className="mb-2 leading-relaxed">
              V reálném světě může dojít k poškození FAT tabulky (např. při náhlém výpadku napájení nebo odpojení flashky během zápisu). CHKDSK tyto chyby vyhledává:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><strong>Lost Clusters (Ztracené clustery):</strong> Ve FAT je zapsaná cesta sektoru, ale žádný soubor v adresáři na ni neukazuje. Místo je označené jako plné, ale nelze se k němu dostat. Oprava: Uvolnit sektory nebo z nich vytvořit soubory typu `.CHK` a zkusit zachránit data.</li>
              <li><strong>Loops (Smyčky):</strong> Soubor odkazuje na sektory, které se zacyklí (např. `3 ➔ 7 ➔ 11 ➔ 7 ➔ 11`). Čtení souboru pak nikdy neskončí. Oprava: Přerušit smyčku a zapsat do příslušného sektoru `EOF`.</li>
              <li><strong>Cross-linked Files (Překřížené soubory):</strong> Dva soubory sdílejí stejné sektory (např. `dopis.txt` i `foto.jpg` odkazují na sektor 6). Pokud jeden soubor přepíšeme, poškodíme ten druhý. Oprava: Zkopírovat data ze sdíleného sektoru na nový volný sektor a nasměrovat tam jeden ze souborů.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[3.5rem] shadow-2xl border-4 border-white">
        {/* Indikátor levelu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 shadow-sm">
            <Search className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Diagnostika FAT (Úroveň {level}/3)</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Zadání */}
        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 mb-8 text-sm sm:text-base text-gray-700 font-medium">
          {taskDesc}
        </div>

        {/* Rozhraní */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Adresář a FAT tabulka (5 sloupců) */}
          <div className="md:col-span-5 space-y-6">
            {/* Adresář */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-3">Adresář (Directory Table)</h3>
              <table className="w-full text-left text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="pb-2">Název</th>
                    <th className="pb-2 text-center">Start sector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {files.map((f, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-black text-purple-600">{f.name}</td>
                      <td className="py-2.5 text-center font-bold text-sm text-slate-800">{f.startSector}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FAT tabulka */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-3">Tabulka FAT</h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="font-bold text-gray-400 py-1">Sektor</div>
                <div className="font-bold text-gray-400 py-1">Další</div>
                <div className="font-bold text-gray-400 py-1">Sektor</div>
                <div className="font-bold text-gray-400 py-1">Další</div>
                
                {Array.from({ length: 8 }).map((_, i) => {
                  const leftSec = sectors[i];
                  const rightSec = sectors[i + 8];

                  return (
                    <React.Fragment key={i}>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl py-2 font-black text-gray-500">
                        {leftSec.id}
                      </div>
                      <div className={`border rounded-xl py-2 font-black ${
                        leftSec.fatVal === 'EOF' ? 'bg-gray-100 border-gray-200 text-gray-600' :
                        leftSec.fatVal === 'FREE' ? 'bg-slate-50 border-slate-100 text-slate-300' :
                        'bg-purple-50 border-purple-200 text-purple-700'
                      }`}>
                        {leftSec.fatVal}
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl py-2 font-black text-gray-500">
                        {rightSec.id}
                      </div>
                      <div className={`border rounded-xl py-2 font-black ${
                        rightSec.fatVal === 'EOF' ? 'bg-gray-100 border-gray-200 text-gray-600' :
                        rightSec.fatVal === 'FREE' ? 'bg-slate-50 border-slate-100 text-slate-300' :
                        'bg-purple-50 border-purple-200 text-purple-700'
                      }`}>
                        {rightSec.fatVal}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Disková mřížka (7 sloupců) */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm flex flex-col items-center w-full">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-6 w-full text-left">
                Stav diskových sektorů
              </h3>

              {/* 4x4 Grid */}
              <div className="grid grid-cols-4 gap-4 w-full max-w-[320px] aspect-square">
                {sectors.map((s) => {
                  const isFree = s.fatVal === 'FREE';
                  const isTarget = s.id === correctId;
                  
                  let borderClass = 'border-gray-200 hover:border-purple-300';
                  let bgClass = 'bg-white hover:bg-slate-50';
                  let textClass = 'text-gray-700 font-bold';

                  if (isFree) {
                    borderClass = 'border-gray-100';
                    bgClass = 'bg-gray-50/50';
                    textClass = 'text-gray-300';
                  } else if (isTarget && isCompleted) {
                    borderClass = 'border-emerald-500 ring-4 ring-emerald-100';
                    bgClass = 'bg-emerald-50';
                    textClass = 'text-emerald-700 font-black';
                  } else {
                    borderClass = 'border-purple-200';
                    bgClass = 'bg-purple-50/30';
                    textClass = 'text-purple-700 font-black';
                  }

                  return (
                    <button
                      key={s.id}
                      disabled={isCompleted || fixOption}
                      onClick={() => handleSectorClick(s.id)}
                      className={`relative flex flex-col items-center justify-center border-4 rounded-3xl transition-all text-lg shadow-md select-none aspect-square ${borderClass} ${bgClass} ${textClass} ${
                        isCompleted || fixOption ? 'cursor-default' : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      <span>{s.id}</span>
                      
                      {!isFree && (
                        <span className="absolute bottom-1 text-[8px] uppercase tracking-widest text-purple-400 font-bold">
                          Data
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Zpětná vazba a možnosti opravy */}
        <AnimatePresence>
          {fixOption && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-3xl bg-purple-50 border-2 border-purple-200 text-purple-900 shadow-lg shadow-purple-50 flex flex-col items-center text-center w-full"
            >
              <ShieldCheck className="w-12 h-12 text-purple-600 mb-3" />
              <h3 className="text-lg font-black uppercase tracking-wider mb-2">Chyba identifikována na sektoru {correctId}!</h3>
              <p className="text-sm font-medium mb-6 max-w-xl">
                Zvol administrativní krok pro opravu souborového systému:
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                {level === 1 && (
                  <>
                    <button
                      onClick={() => handleFixAction('delete')}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
                    >
                      Uvolnit sektory (Zapsat FREE)
                    </button>
                    <button
                      onClick={() => handleFixAction('recover')}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
                    >
                      Zachránit jako .CHK soubor
                    </button>
                  </>
                )}
                {level === 2 && (
                  <button
                    onClick={() => handleFixAction('eof')}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
                  >
                    Ukončit řetězec (Zapsat EOF na sektor 11)
                  </button>
                )}
                {level === 3 && (
                  <button
                    onClick={() => handleFixAction('copy')}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
                  >
                    Rozdělit sektory a zkopírovat sdílená data
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {feedback && !fixOption && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-8 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 shadow-lg ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-emerald-50'
                  : 'bg-red-50 border-red-200 text-red-900 shadow-red-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  feedback.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {feedback.type === 'success' ? <Trophy className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <p className="font-bold text-sm sm:text-base leading-relaxed">{feedback.text}</p>
              </div>

              {feedback.type === 'success' && (
                <button
                  onClick={nextLevel}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  {level < 3 ? 'Další chyba' : 'Dokončit diagnostiku'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChkdskGame;
