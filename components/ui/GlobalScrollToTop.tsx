'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const GlobalScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Zobrazit tlačítko po odscrollování o 280 px
      setIsVisible(scrollY > 280);

      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setProgress(pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // Obvod kruhu pro SVG progress ring (r = 16 => 2 * PI * 16 ≈ 100.5)
  const circumference = 100.5;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <aside
      className="fixed bottom-16 right-4 z-50 select-none animate-in fade-in slide-in-from-bottom-2 duration-300"
      aria-label="Přejít nahoru"
    >
      <button
        onClick={scrollToTop}
        title={`Zpět nahoru (${Math.round(progress)} % proscrollováno)`}
        className="relative group w-11 h-11 bg-white/95 backdrop-blur-md border-2 border-slate-200/90 shadow-xl hover:shadow-2xl rounded-2xl flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95 cursor-pointer hover:-translate-y-0.5"
      >
        {/* Kruhový indikátor procent scrollování */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 pointer-events-none" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-slate-100"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-blue-500 transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Ikona šipky nahoru s jemnou hover animací */}
        <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />

        {/* Tooltip při najetí myší */}
        <span className="absolute right-12 px-2 py-1 bg-slate-900/90 text-white text-[11px] font-bold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Nahoru
        </span>
      </button>
    </aside>
  );
};

export default GlobalScrollToTop;
