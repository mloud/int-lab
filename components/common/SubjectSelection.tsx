'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Info, Search, ScanFace, Clock, GraduationCap } from 'lucide-react';
import TechStackSimulation from './TechStackSimulation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';
import SchoolDivisionCard from '@/components/ui/SchoolDivisionCard';
import { useCurriculum } from '@/components/providers/CurriculumContext';
import { getCurriculumIcon } from '@/registry/curriculum';
import LandingFooter from './LandingFooter';

interface SubjectSelectionProps {
  onSelectInformatika?: () => void;
  onSelectSpecializovana?: () => void;
  onSelectArHub?: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  onSelectInformatika,
  onSelectSpecializovana,
  onSelectArHub,
}) => {
  const router = useRouter();
  const { school, availableSchools, switchSchool, divisions } = useCurriculum();
  const [showTechStack, setShowTechStack] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showVersion, setShowVersion] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'info' | 'spec' | null>(null);

  const lastBuild = process.env.NEXT_PUBLIC_LAST_BUILD || 'Lokální dev verze (nesestaveno)';

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
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-indigo-500/30">
      
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
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-12 pb-8 flex flex-col items-center flex-1 justify-center">
        
        {/* Global Actions Container */}
        <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
          
          <button 
            onClick={() => setShowVersion(true)}
            className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-full text-slate-500 hover:text-blue-600 transition-all"
            title="Informace o verzi"
          >
            <Clock className="w-5 h-5" />
          </button>

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
          className="mb-14 flex flex-col items-center text-center"
        >
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 mb-8"
          >
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
            INTERAKTIVNÍ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              LAB
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-500 font-bold tracking-[0.35em] uppercase">
            Mezioborový výukový portál
          </p>

          {/* Přepínač školy (ZŠ vs Kompletní škola) */}
          {availableSchools.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 inline-flex p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50"
            >
              {availableSchools.map((s) => {
                const isActive = s.id === school.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => switchSchool(s.id)}
                    className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
                    }`}
                  >
                    <GraduationCap className={`w-4 h-4 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                    <span>{s.shortName || s.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Selection Cards (dynamicky generované z konfigurace aktivní školy) */}
        <motion.div 
          layout
          className={`grid gap-8 w-full transition-all duration-300 ${
            divisions.length === 1 
              ? 'grid-cols-1 max-w-xl mx-auto' 
              : divisions.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {divisions.map((division) => {
              const DivisionIcon = getCurriculumIcon(division.icon);
              const Watermark = getCurriculumIcon(division.watermarkIcon || 'Code');
              const handleCardClick = () => {
                if (division.id === 'obecna-it' && onSelectInformatika) {
                  onSelectInformatika();
                } else if (division.id === 'specializovana-it' && onSelectSpecializovana) {
                  onSelectSpecializovana();
                } else {
                  router.push(division.route);
                }
              };

              return (
                <motion.div
                  key={division.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full"
                >
                  <SchoolDivisionCard
                    title={division.title}
                    description={division.description}
                    icon={DivisionIcon}
                    watermarkIcon={Watermark}
                    colorScheme={division.colorScheme}
                    onClick={handleCardClick}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* AR Hub Button v hlavním menu */}
        {onSelectArHub && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 w-full max-w-xl"
          >
            <button
              onClick={onSelectArHub}
              className="w-full group relative px-8 py-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black rounded-[2rem] shadow-xl shadow-rose-200/50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between overflow-hidden border-4 border-white"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-5 relative">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform shadow-inner">
                  <ScanFace className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xl sm:text-2xl uppercase tracking-widest text-white drop-shadow-sm">Laboratoř AR</span>
                  <span className="text-sm font-medium text-rose-100 uppercase tracking-wider">Rozšířená realita do mobilu</span>
                </div>
              </div>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform relative text-white" />
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Elegantní patička s chráněným kontaktem a informacemi */}
      <LandingFooter 
        onOpenTechStack={() => setShowTechStack(true)}
        onOpenVersion={() => setShowVersion(true)}
      />

      <AnimatePresence>
        {showTechStack && (
          <TechStackSimulation onClose={() => setShowTechStack(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVersion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
            onClick={() => setShowVersion(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Informace o verzi</h3>
              <p className="text-slate-500 text-sm mb-6">
                Tento portál je pravidelně aktualizován. Zde najdete přesný čas, kdy byla naposledy na server nahrána nová verze.
              </p>
              <div className="bg-slate-50 w-full p-4 rounded-xl border border-slate-100 mb-6 shadow-inner">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Poslední nasazení</span>
                <span className="font-mono text-blue-600 font-bold text-lg">{lastBuild}</span>
              </div>
              <button 
                onClick={() => setShowVersion(false)}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Zavřít okno
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default SubjectSelection;
