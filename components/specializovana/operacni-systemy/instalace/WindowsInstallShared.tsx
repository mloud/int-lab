"use client";

import React from 'react';
import { Monitor } from 'lucide-react';
import { motion } from 'motion/react';

export type Step = 'configurator' | 'intro' | 'language' | 'key' | 'eula' | 'type' | 'disk' | 'network' | 'account' | 'privacy' | 'result';

export interface Partition {
  id: string;
  name: string;
  totalMB: number;
  freeMB: number;
  type: 'Systémový EFI' | 'Hlavní' | 'Nepřiřazené místo';
}

export interface SimStepProps {
  currentStep: Step;
  setCurrentStep: (s: Step) => void;
  showFeedback: (type: 'success' | 'error', text: string, nextStep?: Step) => void;
}

export const WindowWrapper = ({ children, isOOBE = false }: { children: React.ReactNode, isOOBE?: boolean }) => (
  <div className={`relative w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-300 min-h-[550px] flex flex-col ${isOOBE ? 'bg-gray-50' : 'bg-[#0078D7]'}`}>
    {/* Window Header */}
    {!isOOBE && (
      <div className="bg-[#0078D7] text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>Instalace systému Windows</span>
        <div className="flex gap-4">
          <span className="cursor-not-allowed text-white/70">_</span>
          <span className="cursor-not-allowed text-white/70">□</span>
          <span className="cursor-not-allowed text-white/70">✕</span>
        </div>
      </div>
    )}
    {/* Window Body */}
    <div className={`flex-1 p-8 flex flex-col ${!isOOBE ? 'bg-white m-1 rounded-sm' : ''}`}>
      {children}
    </div>
  </div>
);

export const TaskBubble = ({ text }: { text: string }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-lg flex items-start gap-3"
    >
      <Monitor className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-yellow-800 text-sm uppercase tracking-wider mb-1">Úkol pro tebe</h4>
        <p className="text-gray-800 font-medium text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  </div>
);
