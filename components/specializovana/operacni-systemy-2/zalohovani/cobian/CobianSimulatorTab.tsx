'use client';
import React, { useState } from 'react';
import { Save, BookOpen, FileText, CheckCircle2, Download, Box, Zap, Layers, Calculator, Activity, HardDrive, Clock } from 'lucide-react';

export const CobianSimulatorTab: React.FC = () => {
  // Stav simulátoru
  const [simDay, setSimDay] = useState(0);
  const [showRestore, setShowRestore] = useState(false);

  return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="bg-slate-900 p-6 sm:p-8 rounded-[2rem] text-white flex flex-col shadow-xl">
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-purple-400" /> Krokovací simulátor celého týdne
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
              Základní projekt má <strong>100 GB</strong>. Každý další den přibude <strong>5 GB</strong> nových dat. Pomocí tlačítek postupujte dny v týdnu a sledujte, jak se chovají jednotlivé typy záloh – co kopírují v daný den, kolik místa celkem polykají a jak těžká by byla obnova.
            </p>

            {/* Ovladač dnů (Kalendář) */}
            <div className="flex gap-2 w-full mb-6">
              {['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'].map((day, i) => (
                <button
                  key={day}
                  onClick={() => setSimDay(i)}
                  className={`flex-1 py-3 px-1 text-center rounded-xl font-bold transition-all text-xs sm:text-sm ${simDay === i ? 'bg-purple-600 text-white shadow-lg scale-105 z-10' : (simDay > i ? 'bg-purple-900/40 text-purple-200' : 'bg-slate-800 text-slate-500 hover:bg-slate-700')}`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="flex justify-end mb-8">
              <button
                onClick={() => setShowRestore(!showRestore)}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border-2 ${showRestore ? 'bg-rose-600 text-white border-rose-500 shadow-rose-900/50 shadow-lg animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
              >
                <Activity className="w-5 h-5" />
                {showRestore ? 'Skrýt simulátor obnovy' : 'Simulovat Havárii v tento den!'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Pomocná funkce pro vykreslení řádku */}
              {[
                { type: 'full', name: 'Plná', icon: Box, color: 'blue' },
                { type: 'inc', name: 'Inkrementální', icon: Zap, color: 'emerald' },
                { type: 'diff', name: 'Rozdílová', icon: Layers, color: 'amber' }
              ].map(cfg => {
                const Icon = cfg.icon;

                // Součty pro aktuální simDay
                let currentCumulative = 0;
                let currentSteps = 0;

                if (cfg.type === 'full') {
                  for (let j = 0; j <= simDay; j++) currentCumulative += (100 + (j * 5));
                  currentSteps = 1;
                } else if (cfg.type === 'inc') {
                  currentCumulative = 100 + (simDay * 5);
                  currentSteps = simDay + 1;
                } else if (cfg.type === 'diff') {
                  currentCumulative = 100 + (Array.from({ length: simDay }).reduce((acc: number, _, j) => acc + ((j + 1) * 5), 0) as number);
                  currentSteps = simDay === 0 ? 1 : 2;
                }

                return (
                  <div key={cfg.type} className={`bg-white rounded-3xl p-5 shadow-sm border-2 ${cfg.color === 'blue' ? 'border-blue-200' : (cfg.color === 'emerald' ? 'border-emerald-200' : 'border-amber-200')}`}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.color === 'blue' ? 'bg-blue-100 text-blue-600' : (cfg.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600')}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800">{cfg.name}</h3>
                      </div>

                      <div className="flex gap-4">
                        <div className={`px-4 py-2 rounded-xl ${cfg.color === 'blue' ? 'bg-blue-50 text-blue-900' : (cfg.color === 'emerald' ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900')}`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5 opacity-70">Zabráno na disku celkem</span>
                          <div className="text-xl font-black">{currentCumulative} GB</div>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-slate-50 text-slate-800 border border-slate-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5 opacity-70">Potřeba složek k obnově</span>
                          <div className="text-xl font-black">{currentSteps}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((dName, dIdx) => {
                        let cellSize = 0;
                        if (cfg.type === 'full') cellSize = 100 + (dIdx * 5);
                        else if (cfg.type === 'inc') cellSize = dIdx === 0 ? 100 : 5;
                        else if (cfg.type === 'diff') cellSize = dIdx === 0 ? 100 : (dIdx * 5);

                        const isPast = dIdx <= simDay;
                        return (
                          <div key={dIdx} className={`p-2 rounded-xl text-center border-2 transition-all ${isPast ? (dIdx === simDay ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-slate-50') : 'border-dashed border-slate-200 bg-slate-100/50 opacity-40'}`}>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isPast ? 'text-slate-500' : 'text-slate-400'}`}>{dName}</div>
                            {isPast ? (
                              <div className="text-sm font-black text-slate-800">{cellSize} <span className="text-[10px] font-normal">GB</span></div>
                            ) : (
                              <div className="text-sm font-black text-slate-300">-</div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {showRestore && (
                      <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Download className="w-4 h-4 text-rose-500" /> Krok za krokem: Průběh obnovy
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cfg.type === 'full' && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-bold text-xs">Krok 1:</span>
                              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg">Kopíruji složku ze dne: {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][simDay]} ({100 + (simDay * 5)} GB)</div>
                            </div>
                          )}

                          {cfg.type === 'inc' && (
                            <div className="flex flex-wrap items-center gap-2">
                              {Array.from({ length: simDay + 1 }).map((_, idx) => (
                                <React.Fragment key={idx}>
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-bold text-xs">Krok {idx + 1}:</span>
                                    <div className={`${idx === 0 ? 'bg-slate-800' : 'bg-slate-600'} text-white text-xs font-bold px-3 py-2 rounded-lg`}>
                                      {idx === 0 ? 'Kopíruji: Po (100 GB)' : `Přepisuji: ${['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][idx]} (5 GB)`}
                                    </div>
                                  </div>
                                  {idx < simDay && <span className="text-slate-300">→</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          )}

                          {cfg.type === 'diff' && (
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 font-bold text-xs">Krok 1:</span>
                                <div className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg">Kopíruji: Po (100 GB)</div>
                              </div>
                              {simDay > 0 && (
                                <>
                                  <span className="text-slate-300">→</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-bold text-xs">Krok 2:</span>
                                    <div className="bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-lg">Přepisuji ze dne: {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'][simDay]} ({simDay * 5} GB)</div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
  );
};
