"use client";

import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { ArchitectureTarget, USE_CASES } from './OsArchitectureData';

export const ArchitectureUseCasesTab = () => {
  // Use Cases Minigame State
  const [useCaseIndex, setUseCaseIndex] = useState(0);
  const [useCaseFeedback, setUseCaseFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [useCaseSelected, setUseCaseSelected] = useState<ArchitectureTarget | null>(null);


  const handleUseCaseAnswer = (answer: ArchitectureTarget) => {
    setUseCaseSelected(answer);
    if (answer === USE_CASES[useCaseIndex].correct) {
      setUseCaseFeedback('correct');
    } else {
      setUseCaseFeedback('wrong');
    }
  };

  const nextUseCase = () => {
    setUseCaseFeedback('idle');
    setUseCaseSelected(null);
    setUseCaseIndex((prev) => (prev + 1) % USE_CASES.length);
  };

  return (
          <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Architekt v praxi</h1>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Jste hlavní systémový architekt. Ke každému zařízení určete, zda potřebuje spíše maximální výkon (Monolit) nebo absolutní bezpečnost a odolnost proti pádům ovladačů (Mikrojádro).
              </p>
            </div>

            <div className="bg-slate-50 border-4 border-slate-200 rounded-[3rem] p-8 w-full max-w-4xl relative overflow-hidden shadow-inner">
              <div className="absolute top-4 right-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                Zařízení {useCaseIndex + 1} z {USE_CASES.length}
              </div>

              <div className="flex flex-col items-center mt-6 mb-10">
                {React.createElement(USE_CASES[useCaseIndex].icon, { className: "w-24 h-24 text-indigo-600 mb-6 drop-shadow-md" })}
                <h2 className="text-4xl font-black text-slate-800 text-center uppercase tracking-tight">{USE_CASES[useCaseIndex].title}</h2>
              </div>

              {useCaseFeedback === 'idle' ? (
                <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
                  <button
                    onClick={() => handleUseCaseAnswer('monolithic')}
                    className="group bg-white p-6 rounded-3xl border-4 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all flex flex-col items-center gap-4 active:scale-95"
                  >
                    <Layers className="w-12 h-12 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <div className="text-xl font-black text-slate-700 uppercase tracking-widest">Monolitické Jádro</div>
                    <div className="text-sm text-slate-500 text-center font-bold">Max. Výkon • Vše na jednom místě</div>
                  </button>

                  <button
                    onClick={() => handleUseCaseAnswer('microkernel')}
                    className="group bg-white p-6 rounded-3xl border-4 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col items-center gap-4 active:scale-95"
                  >
                    <ShieldCheck className="w-12 h-12 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    <div className="text-xl font-black text-blue-700 uppercase tracking-widest">Mikrojádro</div>
                    <div className="text-sm text-blue-500 text-center font-bold">Max. Bezpečí • Oddělené moduly</div>
                  </button>
                </div>
              ) : (
                <div className={`p-8 rounded-3xl border-4 animate-in zoom-in-95 duration-300 ${useCaseFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <div className="flex items-start gap-6">
                    <div className="mt-1 flex-shrink-0">
                      {useCaseFeedback === 'correct' ? (
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-widest mb-2 ${useCaseFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                        {useCaseFeedback === 'correct' ? 'Správně!' : 'Chyba, zkusíme to jinak...'}
                      </h3>
                      <p className={`text-lg font-medium leading-relaxed mb-6 ${useCaseFeedback === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                        {USE_CASES[useCaseIndex].explanation}
                      </p>

                      <button
                        onClick={nextUseCase}
                        className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-md ${useCaseFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                      >
                        Další zařízení <ArrowRight className="inline-block w-5 h-5 ml-2 -mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  );
};
