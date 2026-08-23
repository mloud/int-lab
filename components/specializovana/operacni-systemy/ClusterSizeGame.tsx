import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, Info, Trophy, Check, AlertTriangle, HelpCircle, HardDrive, CircleDot, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClusterSizeGameProps {
  onBack: () => void;
}

interface FileData {
  name: string;
  sizeBytes: number;
  color: string;
  bgColor: string;
}

const ClusterSizeGame: React.FC<ClusterSizeGameProps> = ({ onBack }) => {
  const [clusterSize, setClusterSize] = useState<number>(4096); // Default 4 KB
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const files: FileData[] = [
    { name: 'dopis.txt', sizeBytes: 150, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
    { name: 'web.html', sizeBytes: 1300, color: 'bg-sky-500', bgColor: 'bg-sky-50' },
    { name: 'hymna.mp3', sizeBytes: 11000, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
  ];

  const clusterOptions = [512, 1024, 2048, 4096, 8192]; // in Bytes

  // Calculate stats for current cluster size
  const getFileStats = (f: FileData) => {
    const clustersAllocated = Math.ceil(f.sizeBytes / clusterSize);
    const physicalSize = clustersAllocated * clusterSize;
    const slackSpace = physicalSize - f.sizeBytes;
    const wastePercent = (slackSpace / physicalSize) * 100;

    return {
      clustersAllocated,
      physicalSize,
      slackSpace,
      wastePercent,
    };
  };

  // Aggregated stats
  const totalRealSize = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const totalPhysicalSize = files.reduce((acc, f) => acc + getFileStats(f).physicalSize, 0);
  const totalSlackSpace = totalPhysicalSize - totalRealSize;
  const totalWastePercent = (totalSlackSpace / totalPhysicalSize) * 100;

  // --- QUESTIONS ---
  const handleAnswerSubmit = () => {
    if (currentQuestion === 1) {
      // Q1: Cluster size 2 KB (2048 B). How many clusters for web.html (1300 B)? -> 1 cluster
      if (userAnswer.trim() === '1') {
        setFeedback({
          type: 'success',
          text: 'Správně! 1300 bajtů se vejde do jednoho 2 KB clusteru (2048 bajtů), takže se obsadí 1 cluster.',
        });
        setIsCompleted(true);
      } else {
        setFeedback({
          type: 'error',
          text: 'Nesprávně. Porovnej velikost souboru (1300 B) a velikost jednoho clusteru (2048 B).',
        });
      }
    } else if (currentQuestion === 2) {
      // Q2: Cluster size 8 KB (8192 B). What is slack space for dopis.txt (150 B)? -> 8042 B
      if (userAnswer.trim() === '8042') {
        setFeedback({
          type: 'success',
          text: 'Skvěle! Jeden cluster má 8192 B. Odečteme velikost souboru (150 B) a zbyde nevyužitých 8042 B (slack space).',
        });
        setIsCompleted(true);
      } else {
        setFeedback({
          type: 'error',
          text: 'Nesprávně. Vzorec je: Fyzické místo clusteru (8192 B) - Velikost souboru (150 B).',
        });
      }
    } else if (currentQuestion === 3) {
      // Q3: Small cluster size is better for many tiny files? -> Yes/A
      const ans = userAnswer.trim().toUpperCase();
      if (ans === 'ANO' || ans === 'A') {
        setFeedback({
          type: 'success',
          text: 'Správně! Menší velikost clusteru výrazně snižuje plýtvání místem (slack space) u malých souborů.',
        });
        setIsCompleted(true);
      } else {
        setFeedback({
          type: 'error',
          text: 'Nesprávně. Zkus si na kalkulátoru nastavit 512 B a pak 8192 B a sleduj, kdy je procento plýtvání (Slack Space) u dopis.txt menší.',
        });
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
      setFeedback({
        type: 'success',
        text: 'Výborně! Dokončil jsi všechny otázky k vnitřní fragmentaci a slack space!',
      });
    }
  };

  const resetGame = () => {
    setClusterSize(4096);
    setCurrentQuestion(1);
    setUserAnswer('');
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
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
            title="Nápověda ke slack space"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={resetGame}
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
            className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 mb-6 text-rose-900 text-sm overflow-hidden shadow-inner"
          >
            <h3 className="font-extrabold text-base mb-2 uppercase tracking-wide flex items-center gap-2">
              <Info className="w-5 h-5 text-rose-600" /> Vnitřní fragmentace a Slack Space
            </h3>
            <p className="mb-2 leading-relaxed">
              Operační systém neumí zapisovat data na disk po jednotlivých bajtech. Místo toho používá větší bloky sektorů zvané **clustery** (nebo alokační bloky).
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed font-semibold">
              <li>Cluster je nejmenší jednotka místa, kterou může soubor na disku obsadit. I když má soubor jen 1 bajt, spotřebuje celý jeden cluster.</li>
              <li><strong>Vnitřní fragmentace (Slack Space):</strong> Nevyužité místo na konci posledního clusteru souboru. Toto místo je pro OS „ztracené“, protože žádný jiný soubor se do stejného clusteru už připsat nesmí.</li>
              <li><strong>Velký vs. malý cluster:</strong> 
                <br />➔ *Malé clustery* znamenají méně vyplýtvaného místa, ale FAT tabulka musí být obrovská (více položek).
                <br />➔ *Velké clustery* znamenají rychlejší čtení velkých souborů, ale dochází k obrovskému plýtvání u mnoha malých souborů.
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[3.5rem] shadow-2xl border-4 border-white">
        {/* Indikátor levelu */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-700 shadow-sm">
            <Calculator className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Slack Space vizualizátor</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight font-black">
              Velikost clusteru a vnitřní fragmentace
            </h2>
          </div>
        </div>

        {/* Nastavení clusteru */}
        <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-1">Velikost clusteru na disku</h3>
            <p className="text-xs text-gray-400 font-semibold uppercase">Kliknutím změň konfiguraci souborového systému FAT</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {clusterOptions.map((size) => (
              <button
                key={size}
                onClick={() => setClusterSize(size)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider border-2 transition-all ${
                  clusterSize === size
                    ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100 scale-105'
                    : 'bg-white border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
              >
                {size >= 1024 ? `${size / 1024} KB` : `${size} B`}
              </button>
            ))}
          </div>
        </div>

        {/* Hlavní rozhraní */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Levý panel: Interaktivní kvíz (5 sloupců) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Otázka {currentQuestion} ze 3</span>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-wider mt-1 mb-4">Otázka pro IT administrátory</h3>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm font-semibold text-gray-700 mb-6 leading-relaxed">
                {currentQuestion === 1 && (
                  <p>
                    Zvol v kalkulátoru velikost clusteru na **2 KB** (2048 B). Kolik clusterů celkem obsadí soubor <span className="font-extrabold text-sky-600">web.html</span> (velikost 1300 B)?
                  </p>
                )}
                {currentQuestion === 2 && (
                  <p>
                    Změň velikost clusteru na **8 KB** (8192 B). Kolik **bajtů** místa se vyplýtvá jako slack space u malého souboru <span className="font-extrabold text-emerald-600">dopis.txt</span> (velikost 150 B)?
                  </p>
                )}
                {currentQuestion === 3 && (
                  <p>
                    Je pro ukládání velkého množství drobných konfiguračních souborů výhodnější **malá velikost clusteru** (např. 512 B) z hlediska efektivity využití disku? (Odpověz: **ANO** / **NE**)
                  </p>
                )}
              </div>

              {/* Vstup pro odpověď */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Napiš odpověď..."
                  disabled={isCompleted && currentQuestion === 3}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-2xl font-bold text-sm text-slate-800"
                />
                <button
                  onClick={handleAnswerSubmit}
                  disabled={isCompleted && currentQuestion === 3}
                  className="px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                >
                  Odeslat
                </button>
              </div>

              {/* Zpětná vazba k otázce */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-4 rounded-2xl border text-xs font-semibold ${
                      feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <p className="flex items-center gap-1.5">
                      {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      {feedback.text}
                    </p>
                    {feedback.type === 'success' && (
                      <button
                        onClick={nextQuestion}
                        className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider"
                      >
                        {currentQuestion < 3 ? 'Další otázka' : 'Zavřít'}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fyzické statistiky disku */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-4">Statistika využití disku</h3>
              
              <div className="space-y-3 text-xs font-semibold text-gray-600">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span>Reálná velikost souborů:</span>
                  <span className="font-bold text-slate-800">{totalRealSize} B</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span>Fyzicky obsazené místo:</span>
                  <span className="font-black text-slate-800">{totalPhysicalSize} B</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2 text-rose-600">
                  <span>Celkový Slack Space (Ztráta):</span>
                  <span className="font-black">{totalSlackSpace} B</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Procento vyplýtvaného místa:</span>
                  <span className={`font-black text-sm ${totalWastePercent > 50 ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`}>
                    {totalWastePercent.toFixed(1)} %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pravý panel: Vizualizátor clusterů (7 sloupců) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-wider mb-6">
                Vizuální znázornění clusterů na disku
              </h3>

              <div className="space-y-6">
                {files.map((f, idx) => {
                  const stats = getFileStats(f);
                  
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800 uppercase tracking-wide">{f.name} <span className="text-gray-400 font-semibold">({f.sizeBytes} B)</span></span>
                        <span className="text-gray-500">Zabráno: {stats.clustersAllocated} {stats.clustersAllocated === 1 ? 'cluster' : stats.clustersAllocated < 5 ? 'clustery' : 'clusterů'}</span>
                      </div>

                      {/* Cluster row visualizer */}
                      <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: stats.clustersAllocated }).map((_, cIdx) => {
                          // Calculate allocation inside this specific cluster
                          const isLastCluster = cIdx === stats.clustersAllocated - 1;
                          let fillPercent = 100;
                          
                          if (isLastCluster) {
                            const remainingBytes = f.sizeBytes % clusterSize;
                            fillPercent = remainingBytes === 0 ? 100 : (remainingBytes / clusterSize) * 100;
                          }

                          return (
                            <div
                              key={cIdx}
                              className="relative w-full sm:w-[120px] h-12 bg-rose-500/10 border-2 border-dashed border-rose-300 rounded-xl overflow-hidden shadow-inner flex flex-col justify-center px-3"
                              title={`Cluster ${cIdx + 1}: Využito ${fillPercent.toFixed(1)}%, Nevyužito ${(100 - fillPercent).toFixed(1)}%`}
                            >
                              {/* Filled part bar */}
                              <div
                                className={`absolute top-0 left-0 h-full ${f.color} opacity-30`}
                                style={{ width: `${fillPercent}%` }}
                              ></div>
                              
                              {/* Overlay info */}
                              <div className="relative flex justify-between items-center text-[10px] font-black text-slate-700">
                                <span>Blok #{cIdx}</span>
                                <span className={fillPercent < 100 ? 'text-rose-600' : 'text-emerald-700'}>
                                  {fillPercent < 100 ? 'Slack' : 'OK'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legenda vizualizátoru */}
              <div className="flex gap-4 flex-wrap mt-8 text-xs font-semibold text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-emerald-500/30 border border-emerald-400 rounded-md"></span>
                  <span>Užitečná data (Využité místo)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-rose-500/10 border border-dashed border-rose-300 rounded-md"></span>
                  <span>Slack Space (Vnitřní fragmentace / Vyplýtvané místo)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterSizeGame;
