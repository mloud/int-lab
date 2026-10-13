'use client';
import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

export const GlobalTextZoom: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('intlab_text_zoom');
    if (saved) {
      const val = parseInt(saved, 10);
      if (!isNaN(val) && val >= 80 && val <= 160) {
        setZoom(val);
        document.documentElement.style.fontSize = `${val}%`;
      }
    }
  }, []);

  const applyZoom = (newZoom: number) => {
    const clamped = Math.max(90, Math.min(140, newZoom));
    setZoom(clamped);
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${clamped}%`;
    }
    localStorage.setItem('intlab_text_zoom', clamped.toString());
  };

  const zoomIn = () => applyZoom(zoom + 10);
  const zoomOut = () => applyZoom(zoom - 10);
  const resetZoom = () => applyZoom(100);

  if (!mounted) return null;

  return (
    <aside 
      className="fixed bottom-4 right-4 z-50 select-none animate-in fade-in duration-300"
      aria-label="Nastavení velikosti písma"
    >
      <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-slate-200/90 shadow-xl rounded-2xl p-1 gap-1 transition-all hover:border-purple-300 hover:shadow-2xl">
        <button
          onClick={zoomOut}
          disabled={zoom <= 90}
          title="Zmenšit písmo (A-)"
          className="p-2 hover:bg-slate-100 rounded-xl disabled:opacity-30 text-slate-600 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={resetZoom}
          title="Kliknutím obnovíte výchozí velikost (100 %)"
          className="px-2.5 py-1 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="text-[10px] text-slate-400 font-sans font-semibold uppercase hidden sm:inline">Písmo:</span>
          <span className={zoom !== 100 ? 'text-purple-600 font-black' : ''}>{zoom} %</span>
        </button>

        <button
          onClick={zoomIn}
          disabled={zoom >= 140}
          title="Zvětšit písmo (A+)"
          className="p-2 hover:bg-slate-100 rounded-xl disabled:opacity-30 text-slate-600 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default GlobalTextZoom;
