'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, HardDrive, FileSearch, Table2, FolderOpen, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FileDeletionGame({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0); // 0 = start, 1 = table cleared, 2 = ghost data visible
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDelete = () => {
    if (isPlaying || step > 0) return;
    setIsPlaying(true);
    setStep(1); // Mění se FAT tabulka
    
    setTimeout(() => {
      setStep(2); // Ghost data na disku
      setIsPlaying(false);
    }, 2000);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-4 sm:p-8 animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 mb-8 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm transition-all border-2 border-slate-100 uppercase tracking-wider text-xs"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do teorie
      </button>

      <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border-2 border-slate-100">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2">Mazání souborů</h2>
            <p className="text-slate-500 font-medium">Jak operační systém "maže" soubory z disku.</p>
          </div>
          
          <div className="flex gap-4">
            {step === 0 ? (
              <button
                onClick={handleDelete}
                disabled={isPlaying}
                className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" /> Smazat "tajne_hesla.doc"
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl shadow-sm transition-all active:scale-95 uppercase tracking-widest"
              >
                Začít znovu
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEVÝ PANEL: Tabulky */}
          <div className="space-y-6">
            
            {/* Adresář */}
            <div className={`p-5 rounded-2xl border-4 transition-all duration-500 ${step >= 1 ? 'border-rose-400 bg-rose-50 scale-[1.02]' : 'border-slate-200 bg-white'}`}>
              <h4 className="font-bold text-slate-800 uppercase text-xs mb-4 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-slate-500" /> Adresář složky
              </h4>
              <div className="bg-white border border-slate-100 rounded-lg p-3 text-sm">
                <div className="flex justify-between font-bold text-slate-400 border-b pb-2 mb-2">
                  <span>Soubor</span><span>Start</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1">
                  <span>dopis.txt</span><span className="font-mono">2</span>
                </div>
                <div className={`flex justify-between py-1 transition-all duration-500 ${step >= 1 ? 'text-rose-400 line-through' : 'text-rose-600 font-bold'}`}>
                  <span>tajne_hesla.doc</span>
                  <span className="font-mono">{step >= 1 ? 'Smazáno' : '5'}</span>
                </div>
              </div>
            </div>

            {/* FAT Tabulka */}
            <div className={`p-5 rounded-2xl border-4 transition-all duration-500 ${step >= 1 ? 'border-rose-400 bg-rose-50 scale-[1.02]' : 'border-slate-200 bg-white'}`}>
              <h4 className="font-bold text-slate-800 uppercase text-xs mb-4 flex items-center gap-2">
                <Table2 className="w-4 h-4 text-slate-500" /> FAT Tabulka
              </h4>
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
                  const isDopis = i === 2 || i === 3;
                  const isTajne = i === 5 || i === 8 || i === 9;
                  
                  let val = '0';
                  if (i === 2) val = '3';
                  if (i === 3) val = 'EOF';
                  if (i === 5) val = step >= 1 ? '0' : '8';
                  if (i === 8) val = step >= 1 ? '0' : '9';
                  if (i === 9) val = step >= 1 ? '0' : 'EOF';

                  let bg = 'bg-white border-slate-100 text-slate-400';
                  if (isDopis) bg = 'bg-sky-50 border-sky-200 text-sky-700 font-bold';
                  if (isTajne) {
                    if (step >= 1) {
                      bg = 'bg-rose-100 border-rose-300 text-rose-500 font-bold animate-pulse';
                    } else {
                      bg = 'bg-rose-50 border-rose-200 text-rose-700 font-bold';
                    }
                  }

                  return (
                    <div key={i} className={`py-1.5 rounded border ${bg} transition-colors duration-500`}>
                      [{i}] {val}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* PRAVÝ PANEL: Fyzický disk */}
          <div className="lg:col-span-2">
            <div className={`p-6 sm:p-8 rounded-2xl border-4 transition-all duration-1000 h-full flex flex-col ${step === 2 ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
              <h4 className="font-bold text-slate-800 uppercase text-sm mb-6 flex items-center justify-center gap-2 tracking-widest">
                <HardDrive className="w-5 h-5" /> Fyzické plotny disku
              </h4>
              
              <div className="grid grid-cols-4 gap-3 flex-1">
                {[...Array(12)].map((_, i) => {
                  const isDopis = i === 2 || i === 3;
                  const isTajne = i === 5 || i === 8 || i === 9;
                  
                  let clusterStyle = "bg-white border-slate-200";
                  let content = <div className="text-slate-300 text-xs font-bold mt-2">Volno</div>;
                  
                  if (isDopis) {
                    clusterStyle = "bg-sky-500 border-sky-600 shadow-md";
                    content = <div className="text-white text-xs font-black uppercase mt-2">Data<br/>(dopis)</div>;
                  } else if (isTajne) {
                    if (step === 2) {
                      // Ghost data
                      clusterStyle = "bg-white border-dashed border-2 border-rose-400 opacity-80 animate-in zoom-in duration-500";
                      content = (
                        <div className="flex flex-col items-center">
                          <div className="text-rose-400 text-[10px] font-black uppercase mt-1 leading-tight text-center">Původní<br/>Data</div>
                          <div className="text-rose-300 text-[8px]">(hesla)</div>
                        </div>
                      );
                    } else {
                      // Valid data
                      clusterStyle = "bg-rose-500 border-rose-600 shadow-md";
                      content = <div className="text-white text-xs font-black uppercase mt-2">Data<br/>(hesla)</div>;
                    }
                  }

                  return (
                    <div key={i} className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 ${clusterStyle}`}>
                      <div className={`absolute top-1.5 left-2 text-[10px] font-mono ${isTajne && step === 2 ? 'text-rose-300' : isDopis || (isTajne && step < 2) ? 'text-white/70' : 'text-slate-300'}`}>
                        #{i}
                      </div>
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Informační okno */}
              <div className="mt-8 h-32">
                {step === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm font-medium border-2 border-dashed border-slate-300 rounded-xl bg-white/50">
                    Stiskněte tlačítko "Smazat" a sledujte, co se stane.
                  </div>
                )}
                
                {step === 1 && (
                  <div className="h-full p-4 rounded-xl bg-rose-100 border border-rose-200 text-rose-800 animate-in slide-in-from-bottom-2 fade-in">
                    <h5 className="font-black uppercase text-xs mb-2">1. Vymazání ukazatelů</h5>
                    <p className="text-sm">OS vymazal záznam z Adresáře a přepsal hodnoty ve FAT tabulce na <span className="font-mono bg-rose-200 px-1 rounded">0</span> (Volno).</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="h-full p-4 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 animate-in slide-in-from-bottom-2 fade-in">
                    <h5 className="font-black uppercase text-xs mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> 2. Fyzická data zůstala!
                    </h5>
                    <p className="text-sm leading-relaxed">
                      Z pohledu systému jsou clustery 5, 8 a 9 prázdné. <strong>Fyzicky tam ale jedničky a nuly stále jsou.</strong> Dokud OS tyto clustery nepřeplácne novým souborem, lze tajná hesla snadno obnovit!
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
