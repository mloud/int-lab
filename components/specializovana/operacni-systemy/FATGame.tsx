import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, HelpCircle, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FATGameProps {
  onBack: () => void;
}

type LevelId = 1 | 2 | 3;

interface FileItem {
  name: string;
  startCluster: number;
  size: number;
  color: string; // Tailwind class for text/bg
  borderColor: string;
  bgColor: string;
  shadowColor: string;
}

interface ClusterState {
  id: number;
  fatVal: string | number; // EOF, BAD, FREE, or next cluster number
  isBad?: boolean;
}

const FATGame: React.FC<FATGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<LevelId>(1);
  const [clickedChain, setClickedChain] = useState<number[]>([]);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // --- DATA PRO LEVELY ---
  
  // LEVEL 1: Čtení z FAT (Student kliká na řetězec zprava.txt: 2 -> 3 -> EOF, přesně jako v teorii)
  const level1Files: FileItem[] = [
    { name: 'zprava.txt', startCluster: 2, size: 2, color: 'text-sky-600', borderColor: 'border-sky-500', bgColor: 'bg-sky-50', shadowColor: 'shadow-sky-100' },
    { name: 'dovolena.jpg', startCluster: 7, size: 4, color: 'text-amber-600', borderColor: 'border-amber-500', bgColor: 'bg-amber-50', shadowColor: 'shadow-amber-100' },
  ];
  const level1Clusters: ClusterState[] = [
    { id: 0, fatVal: 'FREE' },
    { id: 1, fatVal: 'FREE' },
    { id: 2, fatVal: 3 },     // zprava.txt začátek -> odkaz na cluster 3
    { id: 3, fatVal: 'EOF' }, // zprava.txt konec souboru
    { id: 4, fatVal: 'FREE' },
    { id: 5, fatVal: 'FREE' },
    { id: 6, fatVal: 'FREE' },
    { id: 7, fatVal: 8 },     // dovolena.jpg začátek -> 8
    { id: 8, fatVal: 14 },    // dovolena.jpg -> 14
    { id: 9, fatVal: 'FREE' },
    { id: 10, fatVal: 'FREE' },
    { id: 11, fatVal: 'FREE' },
    { id: 12, fatVal: 'FREE' },
    { id: 13, fatVal: 'FREE' },
    { id: 14, fatVal: 15 },   // dovolena.jpg -> 15
    { id: 15, fatVal: 'EOF' }, // dovolena.jpg konec souboru
  ];

  // LEVEL 2: Oprava FAT (Student doplňuje FAT[1] = 8 a FAT[8] = 12 pro hra.exe: 1 -> 8 -> 12)
  const level2Files: FileItem[] = [
    { name: 'hra.exe', startCluster: 1, size: 3, color: 'text-orange-600', borderColor: 'border-orange-500', bgColor: 'bg-orange-50', shadowColor: 'shadow-orange-100' },
    { name: 'data.dat', startCluster: 3, size: 2, color: 'text-slate-500', borderColor: 'border-slate-400', bgColor: 'bg-slate-50', shadowColor: 'shadow-slate-100' },
  ];
  const level2Clusters: ClusterState[] = [
    { id: 0, fatVal: 'FREE' },
    { id: 1, fatVal: '?' }, // hra start (odkaz na 8)
    { id: 2, fatVal: 'FREE' },
    { id: 3, fatVal: 7 },   // data start
    { id: 4, fatVal: 'FREE' },
    { id: 5, fatVal: 'FREE' },
    { id: 6, fatVal: 'FREE' },
    { id: 7, fatVal: 'EOF' }, // data end
    { id: 8, fatVal: '?' },  // hra (odkaz na 12)
    { id: 9, fatVal: 'FREE' },
    { id: 10, fatVal: 'FREE' },
    { id: 11, fatVal: 'FREE' },
    { id: 12, fatVal: 'EOF' }, // hra end
    { id: 13, fatVal: 'FREE' },
    { id: 14, fatVal: 'FREE' },
    { id: 15, fatVal: 'FREE' },
  ];

  // LEVEL 3: Fragmentace a vadné clustery (zprava.pdf: 3 -> 7 -> 12 -> 14)
  const level3Files: FileItem[] = [
    { name: 'zprava.pdf', startCluster: 3, size: 4, color: 'text-purple-600', borderColor: 'border-purple-500', bgColor: 'bg-purple-50', shadowColor: 'shadow-purple-100' },
  ];
  const level3Clusters: ClusterState[] = [
    { id: 0, fatVal: 'FREE' },
    { id: 1, fatVal: 'FREE' },
    { id: 2, fatVal: 'FREE' },
    { id: 3, fatVal: 7 }, // zprava start
    { id: 4, fatVal: 'BAD', isBad: true },
    { id: 5, fatVal: 'FREE' },
    { id: 6, fatVal: 'FREE' },
    { id: 7, fatVal: 12 }, // zprava
    { id: 8, fatVal: 'FREE' },
    { id: 9, fatVal: 'FREE' },
    { id: 10, fatVal: 'BAD', isBad: true },
    { id: 11, fatVal: 'FREE' },
    { id: 12, fatVal: 14 }, // zprava
    { id: 13, fatVal: 'FREE' },
    { id: 14, fatVal: 'EOF' }, // zprava end
    { id: 15, fatVal: 'FREE' },
  ];

  // Pomocné pro načtení aktuálního nastavení
  const getLevelData = () => {
    switch (level) {
      case 1:
        return { files: level1Files, clusters: level1Clusters, targetChain: [2, 3], targetFile: 'zprava.txt' };
      case 2:
        return { files: level2Files, clusters: level2Clusters, targetChain: [1, 8, 12], targetFile: 'hra.exe' };
      case 3:
        return { files: level3Files, clusters: level3Clusters, targetChain: [3, 7, 12, 14], targetFile: 'zprava.pdf' };
    }
  };

  const { files, clusters, targetChain, targetFile } = getLevelData();

  // --- LOGIKA HRY ---

  const resetLevel = () => {
    setClickedChain([]);
    setInputs({});
    setFeedback(null);
    setIsCompleted(false);
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as LevelId);
      setClickedChain([]);
      setInputs({});
      setFeedback(null);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
      setFeedback({
        type: 'success',
        text: 'Gratulujeme! Úspěšně jsi dokončil všechny úrovně souborového systému FAT!',
      });
    }
  };

  // Zpracování kliknutí na diskový cluster (Level 1 a Level 3)
  const handleClusterClick = (clusterId: number) => {
    if (level === 2 || isCompleted) return; // V levelu 2 se klikáním nehraje

    // Pokud už byl vybrán, resetovat kliknutí od tohoto bodu dále
    if (clickedChain.includes(clusterId)) {
      const idx = clickedChain.indexOf(clusterId);
      setClickedChain(clickedChain.slice(0, idx));
      setFeedback(null);
      return;
    }

    const nextExpectedIdx = clickedChain.length;
    const expectedCluster = targetChain[nextExpectedIdx];

    if (clusterId === expectedCluster) {
      const newChain = [...clickedChain, clusterId];
      setClickedChain(newChain);
      setFeedback(null);

      // Kontrola, zda jsme došli na konec řetězce
      if (newChain.length === targetChain.length) {
        setFeedback({
          type: 'success',
          text: `Skvěle! Našel jsi kompletní řetězec souboru ${targetFile} v clusterech: ${newChain.join(' ➔ ')}.`,
        });
        setIsCompleted(true);
      }
    } else {
      // Špatný cluster
      if (clickedChain.length === 0) {
        setFeedback({
          type: 'error',
          text: `Chyba. Podívej se do adresáře, kterým clusterem soubor ${targetFile} začíná.`,
        });
      } else {
        const lastCluster = clickedChain[clickedChain.length - 1];
        setFeedback({
          type: 'error',
          text: `Chyba. Cluster #${lastCluster} odkazuje ve FAT tabulce na cluster #${expectedCluster}, ne na #${clusterId}.`,
        });
      }
    }
  };

  // Zpracování změny vstupu (Level 2)
  const handleInputChange = (clusterId: number, value: string) => {
    setInputs({
      ...inputs,
      [clusterId]: value,
    });
  };

  // Kontrola vyplněné FAT tabulky (Level 2)
  const checkLevel2Answers = () => {
    const val1 = parseInt(inputs[1] || '');
    const val8 = parseInt(inputs[8] || '');

    if (val1 === 8 && val8 === 12) {
      setFeedback({
        type: 'success',
        text: 'Správně! Vyplnil jsi FAT tabulku tak, že soubor hra.exe je správně zřetězen z 1 ➔ 8 ➔ 12 a ukončen EOF.',
      });
      setIsCompleted(true);
    } else {
      setFeedback({
        type: 'error',
        text: 'Některé hodnoty ve FAT nejsou správné. Zkontroluj, aby první cluster (1) odkazoval na druhý (8) a ten na třetí (12).',
      });
    }
  };

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      {/* Horní ovládací panel */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu OS
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-3 bg-white hover:bg-gray-50 text-gray-600 rounded-2xl shadow-md border-2 border-gray-100 hover:scale-105 transition-transform"
            title="Nápověda k FAT"
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

      {/* Popisek a nápověda */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 mb-6 text-purple-900 text-sm overflow-hidden shadow-inner"
          >
            <h3 className="font-extrabold text-base mb-2 uppercase tracking-wide flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600" /> Jak funguje FAT tabulka?
            </h3>
            <p className="mb-2 leading-relaxed">
              Představ si disk rozdělený na řadu očíslovaných alokačních bloků (<strong>clusterů</strong>). Soubory bývají větší než jeden cluster (typicky 4 KB), a proto se dělí do více bloků. Tyto clustery nemusí na disku ležet vedle sebe (dochází k fragmentaci).
            </p>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li><strong>Adresář (Directory):</strong> Říká, jak se soubor jmenuje a na kterém <strong>počátečním clusteru</strong> začíná.</li>
              <li><strong>FAT Tabulka:</strong> Pro každý cluster si pamatuje číslo <strong>dalšího clusteru</strong>, kde soubor pokračuje.</li>
              <li><strong>EOF (End of File):</strong> Značka ve FAT tabulce, která říká: „Tady soubor končí, žádný další cluster už nenásleduje.“</li>
              <li><strong>BAD (Vadný cluster):</strong> Blok je poškozený (vadné sektory na disku), operační systém ho vyřadí a nesmí jej použít.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[3.5rem] shadow-2xl border-4 border-white">
        {/* Indikátor levelu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 shadow-sm">
            <HardDrive className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Úroveň {level} ze 3</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {level === 1 && 'Načítání souboru z disku'}
              {level === 2 && 'Zápis a propojení souboru'}
              {level === 3 && 'Fragmentace a vadné clustery'}
            </h2>
          </div>
        </div>

        {/* Zadání úkolu */}
        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 mb-8 text-sm sm:text-base text-gray-700 font-medium">
          {level === 1 && (
            <p>
              Najdi a postupně vyklikej všechny clustery souboru <span className="font-extrabold text-sky-600 uppercase bg-sky-50 px-2 py-0.5 rounded-lg">zprava.txt</span>. 
              Začni prvním clusterem uvedeným v adresáři a pak pokračuj podle odkazů ve FAT tabulce, dokud nenarazíš na značku <span className="font-extrabold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-lg">EOF</span>.
            </p>
          )}
          {level === 2 && (
            <p>
              Soubor <span className="font-extrabold text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded-lg">hra.exe</span> je fyzicky uložen v clusterech <strong>1, 8 a 12</strong> (v tomto pořadí). 
              Doplň do FAT tabulky správná čísla clusterů, aby byl soubor správně zřetězen a na konci ukončen.
            </p>
          )}
          {level === 3 && (
            <p>
              Označ clustery souboru <span className="font-extrabold text-purple-600 uppercase bg-purple-50 px-2 py-0.5 rounded-lg">zprava.pdf</span>, který začíná na clusteru <strong>3</strong>. 
              Postupuj podle FAT tabulky. Všimni si, že clustery 4 a 10 jsou označeny jako <span className="font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">BAD</span> (vadné) a OS se jim musel při ukládání vyhnout.
            </p>
          )}
        </div>

        {/* Hlavní rozhraní hry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEVÝ PANEL: Adresář a FAT tabulka (4 sloupce) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Adresář souborů */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-3">Adresář (Directory Table)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold">
                      <th className="pb-2">Název souboru</th>
                      <th className="pb-2 text-center">Počáteční cluster</th>
                      <th className="pb-2 text-center">Velikost (clusterů)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                    {files.map((f, idx) => (
                      <tr key={idx} className={f.name === targetFile ? 'bg-slate-50/50' : ''}>
                        <td className="py-2.5 flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${f.bgColor} ${f.borderColor} border-2`}></span>
                          <span className={`${f.color} font-black`}>{f.name}</span>
                        </td>
                        <td className="py-2.5 text-center font-black text-sm">{f.startCluster}</td>
                        <td className="py-2.5 text-center text-gray-500">{f.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAT tabulka */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-3">Tabulka FAT (Řetězení)</h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="font-bold text-gray-400 py-1">Cluster</div>
                <div className="font-bold text-gray-400 py-1">Další</div>
                <div className="font-bold text-gray-400 py-1">Cluster</div>
                <div className="font-bold text-gray-400 py-1">Další</div>
                
                {/* Rozdělení tabulky na 2 sloupce pro úsporu místa */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const leftClust = clusters[i];
                  const rightClust = clusters[i + 8];
                  
                  return (
                    <React.Fragment key={i}>
                      {/* Levá půlka */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl py-2 font-black text-gray-600">
                        {leftClust.id}
                      </div>
                      <div className={`border rounded-xl py-2 font-black flex items-center justify-center ${
                        leftClust.fatVal === 'EOF' ? 'bg-gray-100 border-gray-200 text-gray-600' :
                        leftClust.fatVal === 'BAD' ? 'bg-red-50 border-red-200 text-red-600' :
                        leftClust.fatVal === 'FREE' ? 'bg-slate-50 border-slate-100 text-slate-300' :
                        'bg-purple-50 border-purple-200 text-purple-700'
                      }`}>
                        {level === 2 && leftClust.id === 1 ? (
                          <input
                            type="text"
                            maxLength={2}
                            value={inputs[1] || ''}
                            onChange={(e) => handleInputChange(1, e.target.value)}
                            className="w-8 text-center bg-white border border-orange-300 text-orange-600 font-extrabold rounded-md py-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          leftClust.fatVal
                        )}
                      </div>

                      {/* Pravá půlka */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl py-2 font-black text-gray-600">
                        {rightClust.id}
                      </div>
                      <div className={`border rounded-xl py-2 font-black flex items-center justify-center ${
                        rightClust.fatVal === 'EOF' ? 'bg-gray-100 border-gray-200 text-gray-600' :
                        rightClust.fatVal === 'BAD' ? 'bg-red-50 border-red-200 text-red-600' :
                        rightClust.fatVal === 'FREE' ? 'bg-slate-50 border-slate-100 text-slate-300' :
                        'bg-purple-50 border-purple-200 text-purple-700'
                      }`}>
                        {level === 2 && rightClust.id === 8 ? (
                          <input
                            type="text"
                            maxLength={2}
                            value={inputs[8] || ''}
                            onChange={(e) => handleInputChange(8, e.target.value)}
                            className="w-8 text-center bg-white border border-orange-300 text-orange-600 font-extrabold rounded-md py-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          rightClust.fatVal
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              
              {level === 2 && (
                <button
                  onClick={checkLevel2Answers}
                  className="w-full mt-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-100 transition-all hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-wider"
                >
                  Zkontrolovat FAT tabulku
                </button>
              )}
            </div>
          </div>

          {/* PRAVÝ PANEL: Disková mřížka (7 sloupců) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm flex flex-col items-center">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-6 w-full text-left">
                Mřížka clusterů na disku
              </h3>

              {/* 4x4 Grid clusterů */}
              <div className="grid grid-cols-4 gap-4 w-full max-w-[400px] aspect-square">
                {clusters.map((c) => {
                  const isSelected = clickedChain.includes(c.id);
                  const selectOrder = clickedChain.indexOf(c.id);
                  const isTargetStart = c.id === targetChain[0];
                  
                  // Styl pro level 2 (vizualizace rozložení souboru)
                  const isL2Active = level === 2 && targetChain.includes(c.id);
                  
                  // Barva pozadí a ohraničení na základě stavu
                  let borderClass = 'border-gray-200 hover:border-purple-300';
                  let bgClass = 'bg-white hover:bg-slate-50';
                  let textClass = 'text-gray-700';

                  if (c.isBad) {
                    borderClass = 'border-red-300';
                    bgClass = 'bg-red-50 cursor-not-allowed';
                    textClass = 'text-red-400';
                  } else if (isSelected) {
                    borderClass = 'border-purple-500 ring-4 ring-purple-100';
                    bgClass = 'bg-purple-500';
                    textClass = 'text-white';
                  } else if (isTargetStart && level !== 2) {
                    borderClass = 'border-dashed border-purple-400 border-2';
                    bgClass = 'bg-purple-50/30';
                  } else if (isL2Active) {
                    borderClass = 'border-orange-500 ring-2 ring-orange-100';
                    bgClass = 'bg-orange-50';
                    textClass = 'text-orange-700 font-black';
                  }

                  return (
                    <button
                      key={c.id}
                      disabled={c.isBad || level === 2 || isCompleted}
                      onClick={() => handleClusterClick(c.id)}
                      className={`relative flex flex-col items-center justify-center border-4 rounded-3xl transition-all font-black text-lg sm:text-xl shadow-md select-none ${borderClass} ${bgClass} ${textClass} ${
                        level === 2 || c.isBad || isCompleted ? 'cursor-default' : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      {/* Číslo clusteru */}
                      <span>#{c.id}</span>
                      
                      {/* Indikátor vadného clusteru */}
                      {c.isBad && (
                        <span className="absolute inset-0 flex items-center justify-center bg-red-100/75 rounded-[1.2rem] text-red-600 font-extrabold text-xs tracking-wider uppercase">
                          <AlertTriangle className="w-5 h-5" />
                        </span>
                      )}

                      {/* Číslo v pořadí výběru */}
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-purple-600 border-2 border-purple-500 rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                          {selectOrder + 1}
                        </span>
                      )}

                      {/* Label pro level 2 */}
                      {isL2Active && (
                        <span className="absolute bottom-1 text-[10px] uppercase font-black tracking-widest text-orange-400">
                          {c.id === 1 ? 'Start' : c.id === 12 ? 'Konec' : 'Data'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legenda pod gridem */}
              <div className="flex gap-4 flex-wrap mt-8 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-white border-2 border-gray-200 rounded-md"></span>
                  <span>Volný cluster</span>
                </div>
                {level !== 2 ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-purple-500 rounded-md"></span>
                    <span>Vybraný cluster</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-orange-50 border-2 border-orange-500 rounded-md"></span>
                    <span>Clustery souboru</span>
                  </div>
                )}
                {level === 3 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 bg-red-50 border-2 border-red-300 rounded-md flex items-center justify-center text-[8px] text-red-500 font-black"><AlertTriangle className="w-3 h-3" /></span>
                    <span>Vadný (BAD) cluster</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sekce pro zpětnou vazbu a pokračování */}
        <AnimatePresence>
          {feedback && (
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
                <p className="font-bold text-sm sm:text-base">{feedback.text}</p>
              </div>

              {feedback.type === 'success' && (
                <button
                  onClick={nextLevel}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  {level < 3 ? 'Pokračovat do další úrovně' : 'Dokončit hru'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FATGame;
