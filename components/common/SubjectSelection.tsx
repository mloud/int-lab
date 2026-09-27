'use client';
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Binary, Cpu, Info, Code, ShieldCheck, Database } from 'lucide-react';
import TechStackSimulation from './TechStackSimulation';
import { motion, AnimatePresence } from 'framer-motion';

interface SubjectSelectionProps {
  onSelectInformatika: () => void;
  onSelectSpecializovana: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  onSelectInformatika,
  onSelectSpecializovana,
}) => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'info' | 'spec' | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0f] overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30">
      
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 w-full h-full">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ 
            x: hoveredCard === 'info' ? 100 : hoveredCard === 'spec' ? -100 : 0,
            y: [0, -20, 0],
            scale: hoveredCard === 'info' ? 1.2 : 1
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: hoveredCard === 'spec' ? -100 : hoveredCard === 'info' ? 100 : 0,
            y: [0, 30, 0],
            scale: hoveredCard === 'spec' ? 1.2 : 1
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
        />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl mb-8 shadow-2xl"
          >
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6 tracking-tighter">
            INTERAKTIVNÍ LAB
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 font-bold tracking-[0.4em] uppercase">
            Vyberte si svou cestu
          </p>
        </motion.div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          
          {/* Informatika Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onHoverStart={() => setHoveredCard('info')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={onSelectInformatika}
            className="group relative cursor-pointer outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-[#13131a]/80 backdrop-blur-xl p-10 sm:p-12 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
              
              {/* Background watermark icon */}
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none transform group-hover:rotate-12 group-hover:scale-110">
                <Code className="w-64 h-64 text-blue-400" />
              </div>
              
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-blue-400 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Binary className="w-10 h-10" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-wide">
                Obecná Informatika
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12 flex-1">
                Objevte základy digitálního světa. Od binární soustavy, přes barvy, kompresi a algoritmy až po fungování moderního internetu.
              </p>
              
              <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-sm group-hover:text-blue-300 transition-colors mt-auto">
                Vstoupit do modulu <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Specializovana Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onHoverStart={() => setHoveredCard('spec')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={onSelectSpecializovana}
            className="group relative cursor-pointer outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-[#13131a]/80 backdrop-blur-xl p-10 sm:p-12 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
              
              {/* Background watermark icon */}
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none transform group-hover:-rotate-12 group-hover:scale-110">
                <Database className="w-64 h-64 text-purple-400" />
              </div>
              
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 text-purple-400 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <Cpu className="w-10 h-10" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-wide">
                Specializovaná IT
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12 flex-1">
                Ponořte se do hloubky počítačových věd. Operační systémy, struktury na disku, simulátory paměti, vývoj her a architektura OS.
              </p>
              
              <div className="flex items-center gap-3 text-purple-400 font-bold uppercase tracking-widest text-sm group-hover:text-purple-300 transition-colors mt-auto">
                Vstoupit do modulu <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Footer Info Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-20 mt-12 mb-12 flex justify-center w-full"
      >
        <button
          onClick={() => setShowTechStack(true)}
          className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md rounded-full text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
        >
          <div className="p-1 bg-white/10 rounded-full group-hover:bg-indigo-500 transition-colors">
            <Info className="w-4 h-4" />
          </div>
          Jak tento web funguje?
        </button>
      </motion.div>

      <AnimatePresence>
        {showTechStack && (
          <TechStackSimulation onClose={() => setShowTechStack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectSelection;
