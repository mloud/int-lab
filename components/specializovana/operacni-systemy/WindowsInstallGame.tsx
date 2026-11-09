"use client";

import React, { useState } from 'react';
import { ArrowLeft, Monitor, CheckCircle2, XCircle, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCheatCode } from '../../../hooks/useCheatCode';
import { Step } from './instalace/WindowsInstallShared';
import { WindowsInstallTheoryTab } from './instalace/WindowsInstallTheoryTab';
import { WindowsInstallSimPart1 } from './instalace/WindowsInstallSimPart1';
import { WindowsInstallSimPart2 } from './instalace/WindowsInstallSimPart2';
import { WindowsInstallSimPart3 } from './instalace/WindowsInstallSimPart3';

interface WindowsInstallGameProps {
  onBack: () => void;
}

export default function WindowsInstallGame({ onBack }: WindowsInstallGameProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulator'>('theory');
  const [currentStep, setCurrentStep] = useState<Step>('configurator');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string, nextStep?: Step } | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [simResetKey, setSimResetKey] = useState(0);

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

      <div className="w-full max-w-4xl mx-auto bg-white p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-6 sticky top-4 z-50">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" /> Teorie
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'simulator' ? 'bg-[#0078D7]/10 text-[#0078D7] shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Monitor className="w-5 h-5" /> Simulátor
        </button>
      </div>

      {activeTab === 'theory' && (
        <WindowsInstallTheoryTab onStartSimulator={() => setActiveTab('simulator')} />
      )}

      {activeTab === 'simulator' && (
        <div key={simResetKey} className="animate-in fade-in duration-500 w-full">
          <WindowsInstallSimPart1
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            showFeedback={showFeedback}
          />
          <WindowsInstallSimPart2
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            showFeedback={showFeedback}
          />
          <WindowsInstallSimPart3
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            showFeedback={showFeedback}
            terminalOpen={terminalOpen}
            setTerminalOpen={setTerminalOpen}
            onResetSimulator={() => setSimResetKey(k => k + 1)}
          />
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
      
      {/* End simulator wrapper */}
      </div>)}
    </div>
  );
}
