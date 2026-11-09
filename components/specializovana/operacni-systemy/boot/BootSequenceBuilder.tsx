'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, LayoutTemplate } from 'lucide-react';
import { BOOT_SEQUENCE_TASKS, BOOT_COMPONENTS } from './BootData';

export const BootSequenceBuilder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [placedSteps, setPlacedSteps] = useState<(string | null)[]>(Array(6).fill(null));
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [placedComponents, setPlacedComponents] = useState<(string | null)[]>(Array(6).fill(null));
  const [selectedComponentBlock, setSelectedComponentBlock] = useState<string | null>(null);

  const handleSlotClick = (index: number) => {
    if (selectedBlock !== null) {
      if (placedSteps[index] !== null) return;
      const newPlaced = [...placedSteps];
      newPlaced[index] = selectedBlock;
      setPlacedSteps(newPlaced);
      setSelectedBlock(null);
    } else if (placedSteps[index] !== null) {
      const newPlaced = [...placedSteps];
      newPlaced[index] = null;
      setPlacedSteps(newPlaced);
    }
  };

  const handleCompSlotClick = (index: number) => {
    if (selectedComponentBlock !== null) {
      if (placedComponents[index] !== null) return;
      const newPlaced = [...placedComponents];
      newPlaced[index] = selectedComponentBlock;
      setPlacedComponents(newPlaced);
      setSelectedComponentBlock(null);
    } else if (placedComponents[index] !== null) {
      const newPlaced = [...placedComponents];
      newPlaced[index] = null;
      setPlacedComponents(newPlaced);
    }
  };

  const availableBlocks = BOOT_SEQUENCE_TASKS.map(t => t.id).filter(id => !placedSteps.includes(id));
  const displayBlocks = [...availableBlocks].sort();

  const isSequenceCorrect = placedSteps.every((step, i) => step === BOOT_SEQUENCE_TASKS[i].id);
  const isSequenceFull = placedSteps.every(step => step !== null);
  const isPhase2bUnlocked = isSequenceFull && isSequenceCorrect;

  const availableCompBlocks = BOOT_COMPONENTS.map(t => t.id).filter(id => !placedComponents.includes(id));
  const displayCompBlocks = [...availableCompBlocks].sort();

  const isCompSequenceCorrect = placedComponents.every((comp, i) => comp === BOOT_COMPONENTS[i].id);
  const isCompSequenceFull = placedComponents.every(comp => comp !== null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8 relative">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8 text-center animate-in fade-in duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">Systém nastartoval! Jak k tomu došlo?</h1>
          <p className="text-slate-600 max-w-3xl mx-auto font-medium">
            Před naběhnutím samotných Windows proběhne spousta událostí na pozadí.
            <strong> 1. krok:</strong> Seřaď logické děje chronologicky za sebou.
            {!isPhase2bUnlocked ? '' : ' 2. krok: Přiřaď k nim správnou HW/SW komponentu, která za ně zodpovídá.'}
          </p>
        </div>

        {isSequenceFull && !isSequenceCorrect && (
          <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-md mb-8 border border-red-200 animate-in slide-in-from-top flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Něco je špatně.</h3>
              <p className="text-sm">Logické kroky nejsou ve správném pořadí. Pamatuj: Deska -&gt; Firmware -&gt; Kontrola HW -&gt; Tabulka na disku -&gt; Spouštěč OS -&gt; Jádro OS. Kliknutím na umístěný blok ho vrátíš zpět.</p>
            </div>
          </div>
        )}
        
        {isPhase2bUnlocked && isCompSequenceFull && isCompSequenceCorrect && (
          <div className="bg-green-600 text-white p-6 rounded-2xl shadow-xl mb-8 animate-in slide-in-from-top flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 flex-shrink-0" />
            <div>
              <h3 className="font-black text-xl">Naprosto dokonalé pochopení!</h3>
              <p className="text-green-100 font-medium">Přesně takto funguje start moderního operačního systému. Už víš, co se děje softwarově, a přesně znáš i fyzické a datové komponenty, které to dělají.</p>
            </div>
          </div>
        )}
        {isPhase2bUnlocked && isCompSequenceFull && !isCompSequenceCorrect && (
          <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-md mb-8 border border-red-200 animate-in slide-in-from-top flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Komponenty nejsou přiřazené správně.</h3>
              <p className="text-sm">Některé komponenty nesedí ke svému logickému kroku. Kliknutím na komponentu (spodní slot) ji vrátíš zpět a zkus to znovu.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 justify-center items-stretch relative">
          {placedSteps.map((placedId, index) => {
            const stepData = placedId ? BOOT_SEQUENCE_TASKS.find(t => t.id === placedId) : null;
            const isTargetCorrect = placedId === BOOT_SEQUENCE_TASKS[index].id;
            const compPlacedId = placedComponents[index];
            const compData = compPlacedId ? BOOT_COMPONENTS.find(c => c.id === compPlacedId) : null;
            const isCompTargetCorrect = compPlacedId === BOOT_COMPONENTS[index].id;
            
            return (
              <React.Fragment key={`slot-${index}`}>
                <div className="flex flex-col gap-3 flex-1 min-w-[200px] relative">
                  <div 
                    onClick={() => !isPhase2bUnlocked && handleSlotClick(index)}
                    className={`h-[160px] rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all border-4 relative
                      ${!placedId && selectedBlock ? 'border-dashed border-indigo-400 bg-indigo-50 animate-pulse cursor-pointer' : ''}
                      ${!placedId && !selectedBlock ? 'border-dashed border-slate-300 bg-slate-100 hover:bg-slate-200 cursor-pointer' : ''}
                      ${placedId && !isPhase2bUnlocked ? 'border-solid border-slate-800 bg-slate-800 text-white shadow-lg cursor-pointer hover:bg-slate-700' : ''}
                      ${placedId && isPhase2bUnlocked ? 'border-solid border-slate-800 bg-slate-800 text-white opacity-80 cursor-default' : ''}
                      ${isSequenceFull && isTargetCorrect && !isPhase2bUnlocked ? '!border-green-500 !bg-green-700' : ''}
                      ${isSequenceFull && !isTargetCorrect && placedId ? '!border-red-500 !bg-red-700' : ''}
                    `}
                  >
                    <div className="absolute top-2 left-3 text-xs font-black opacity-30">Krok {index + 1}</div>
                    {!placedId && <span className="font-bold text-slate-400">Prázdné místo</span>}
                    {stepData && (
                      <>
                        <div className="font-black text-lg mb-2 mt-4">{stepData.text}</div>
                        <div className={`text-xs opacity-70 leading-tight ${isPhase2bUnlocked ? 'hidden xl:block' : ''}`}>
                          {stepData.detail}
                        </div>
                      </>
                    )}
                    {isPhase2bUnlocked && <div className="absolute -bottom-2 right-2 text-green-400 bg-slate-800 rounded-full border border-green-500"><CheckCircle2 className="w-5 h-5"/></div>}
                  </div>

                  {isPhase2bUnlocked && (
                    <div 
                      onClick={() => handleCompSlotClick(index)}
                      className={`h-[150px] rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all border-4 relative animate-in fade-in slide-in-from-top-4 duration-500
                        ${!compPlacedId && selectedComponentBlock ? 'border-dashed border-blue-400 bg-blue-50 animate-pulse cursor-pointer' : ''}
                        ${!compPlacedId && !selectedComponentBlock ? 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 cursor-pointer' : ''}
                        ${compPlacedId ? `border-solid border-blue-600 ${compData?.bg} shadow-md cursor-pointer hover:brightness-95` : ''}
                        ${isCompSequenceFull && isCompTargetCorrect ? '!border-green-500 !bg-green-50' : ''}
                        ${isCompSequenceFull && !isCompTargetCorrect && compPlacedId ? '!border-red-500 !bg-red-50' : ''}
                      `}
                    >
                      <div className="absolute top-2 left-3 text-xs font-black opacity-30 text-blue-800">Komponenta</div>
                      
                      {!compPlacedId && (
                        <div className="text-slate-400 flex flex-col items-center">
                          <LayoutTemplate className="w-8 h-8 opacity-20 mb-2" />
                          <span className="font-bold text-sm">Přiřaď HW/SW</span>
                        </div>
                      )}

                      {compData && (
                        <>
                          {compData.icon && <compData.icon className={`w-8 h-8 mb-2 ${isCompSequenceFull && isCompTargetCorrect ? 'text-green-600' : compData.color}`} />}
                          <div className="font-bold text-slate-800 mb-1 text-sm">{compData.text}</div>
                          <div className="text-[10px] text-slate-500 font-medium leading-tight">
                            {compData.detail}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {index < 5 && (
                  <div className="hidden lg:flex flex-col justify-center text-slate-300">
                    <ArrowLeft className="w-8 h-8 rotate-180" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {!isSequenceFull && !isPhase2bUnlocked && (
          <div className="bg-slate-200 p-6 rounded-3xl border-2 border-slate-300 animate-in fade-in slide-in-from-bottom">
            <h3 className="font-black text-slate-500 uppercase tracking-widest text-sm mb-4 text-center">Vyber logický děj k umístění</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {displayBlocks.map(id => {
                const stepData = BOOT_SEQUENCE_TASKS.find(t => t.id === id)!;
                const isSelected = selectedBlock === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedBlock(isSelected ? null : id)}
                    className={`px-6 py-4 rounded-xl font-bold shadow-md transition-all border-2 w-full sm:w-auto text-sm
                      ${isSelected ? 'bg-indigo-600 text-white border-indigo-800 scale-105' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'}
                    `}
                  >
                    {stepData.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isPhase2bUnlocked && !isCompSequenceFull && (
          <div className="bg-blue-100 p-6 rounded-3xl border-2 border-blue-200 shadow-inner animate-in fade-in slide-in-from-bottom">
            <h3 className="font-black text-blue-600 uppercase tracking-widest text-sm mb-4 text-center">Vyber HW/SW komponentu pro každý krok</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {displayCompBlocks.map(id => {
                const compData = BOOT_COMPONENTS.find(c => c.id === id)!;
                const isSelected = selectedComponentBlock === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedComponentBlock(isSelected ? null : id)}
                    className={`px-4 py-3 rounded-xl font-bold shadow-sm transition-all border-2 w-full sm:w-auto text-sm flex items-center gap-3
                      ${isSelected ? 'bg-blue-600 text-white border-blue-800 scale-105 shadow-lg' : 'bg-white text-slate-800 border-blue-200 hover:border-blue-400'}
                    `}
                  >
                    <compData.icon className={`w-5 h-5 ${isSelected ? 'text-white' : compData.color}`} />
                    <div className="text-left">
                      <div>{compData.text}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

