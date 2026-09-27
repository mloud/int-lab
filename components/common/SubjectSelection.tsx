'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Binary, Cpu, Info, Code, Database, Search } from 'lucide-react';
import TechStackSimulation from './TechStackSimulation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

interface SubjectSelectionProps {
  onSelectInformatika: () => void;
  onSelectSpecializovana: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  onSelectInformatika,
  onSelectSpecializovana,
}) => {
  const [showTechStack, setShowTechStack] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'info' | 'spec' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30">
      
      {/* Background Animated Gradients & Textures */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle animated grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Soft Pastel Orbs */}
        <motion.div 
          animate={{ 
            x: hoveredCard === 'info' ? 50 : hoveredCard === 'spec' ? -50 : 0,
            y: [0, -15, 0],
            scale: hoveredCard === 'info' ? 1.1 : 1
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: hoveredCard === 'spec' ? -50 : hoveredCard === 'info' ? 50 : 0,
            y: [0, 20, 0],
            scale: hoveredCard === 'spec' ? 1.1 : 1
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-300/30 rounded-full blur-[100px] pointer-events-none"
        />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Global Search Action */}
        <div className="absolute top-8 right-8 z-50">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-800 transition-all font-bold text-xs uppercase tracking-wider"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Hledat</span>
            <span className="hidden sm:inline font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-400 text-[10px]">Ctrl+K</span>
          </button>
        </div>

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
            className="inline-flex items-center justify-center p-4 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 mb-8"
          >
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 mb-6 tracking-tighter">
            INTERAKTIVNÍ LAB
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 font-bold tracking-[0.4em] uppercase">
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[2.5rem] border border-white overflow-hidden flex flex-col transition-all duration-500 group-hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(59,130,246,0.15)]">
              
              {/* Background watermark icon */}
              <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none transform group-hover:rotate-12 group-hover:scale-110">
                <Code className="w-64 h-64 text-blue-600" />
              </div>
              
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-200 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                <div className="relative w-20 h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                  <Binary className="w-10 h-10" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6 uppercase tracking-wide">
                Obecná Informatika
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 flex-1">
                Objevte základy digitálního světa. Od binární soustavy, přes barvy, kompresi a algoritmy až po fungování moderního internetu.
              </p>
              
              <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-sm group-hover:text-blue-500 transition-colors mt-auto">
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
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[2.5rem] border border-white overflow-hidden flex flex-col transition-all duration-500 group-hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(168,85,247,0.15)]">
              
              {/* Background watermark icon */}
              <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none transform group-hover:-rotate-12 group-hover:scale-110">
                <Database className="w-64 h-64 text-purple-600" />
              </div>
              
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-purple-200 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                <div className="relative w-20 h-20 bg-purple-50 border border-purple-100 text-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-sm">
                  <Cpu className="w-10 h-10" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6 uppercase tracking-wide">
                Specializovaná IT
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 flex-1">
                Ponořte se do hloubky počítačových věd. Operační systémy, struktury na disku, simulátory paměti, vývoj her a architektura OS.
              </p>
              
              <div className="flex items-center gap-3 text-purple-600 font-bold uppercase tracking-widest text-sm group-hover:text-purple-500 transition-colors mt-auto">
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
          className="group flex items-center gap-3 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md rounded-full text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-widest transition-all"
        >
          <div className="p-1 bg-slate-100 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
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
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default SubjectSelection;
