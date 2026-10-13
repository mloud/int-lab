'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

export const GlobalCodeCopy: React.FC = () => {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Delegovaný click listener na celém dokumentu
    const handleDocumentClick = (e: MouseEvent) => {
      // Pokud uživatel zrovna označuje text myší, nekopírujeme
      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length > 0) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      // Hledáme element <code> nebo <pre>
      const codeElement = target.closest('code, pre') as HTMLElement | null;
      if (!codeElement) return;

      // Ignorovat, pokud je element označen jako nezkopírovatelný
      if (codeElement.dataset.noCopy === 'true') return;

      let textToCopy = (codeElement.innerText || codeElement.textContent || '').trim();
      if (!textToCopy) return;

      // Zkopírování do schránky
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Vizuální zpětná vazba přímo na kliknutém elementu
        const originalTransition = codeElement.style.transition;
        codeElement.style.transition = 'all 0.2s ease';
        codeElement.classList.add('intlab-code-copied');

        setTimeout(() => {
          codeElement.classList.remove('intlab-code-copied');
          codeElement.style.transition = originalTransition;
        }, 800);

        // Zobrazení plovoucího toastu
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

        // Zkrácení dlouhých textů pro toast
        const displayText = textToCopy.length > 45 ? textToCopy.slice(0, 42) + '...' : textToCopy;
        setToast({ text: displayText, id: Date.now() });

        toastTimeoutRef.current = setTimeout(() => {
          setToast(null);
        }, 2200);
      }).catch(err => {
        console.warn('Nepodařilo se zkopírovat do schránky:', err);
      });
    };

    // Automatické doplnění nápovědy (title) k inline <code> elementům
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const codeEl = target.closest('code:not(pre code)') as HTMLElement | null;
      if (codeEl && !codeEl.hasAttribute('title') && !codeEl.dataset.noCopy) {
        codeEl.setAttribute('title', 'Kliknutím zkopírujete do schránky');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mouseover', handleMouseOver);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Globální styl pro vizuální afordanci kódu */}
      <style jsx global>{`
        /* Jemné zvýraznění klikatelnosti inline příkazů */
        code:not(pre code):not([data-no-copy="true"]) {
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          border-radius: 0.375rem;
          padding: 0.1rem 0.3rem;
        }

        code:not(pre code):not([data-no-copy="true"]):hover {
          background-color: rgba(224, 231, 255, 0.7) !important; /* jemná indigo/modrá */
          box-shadow: 0 0 0 1.5px rgba(99, 102, 241, 0.45);
        }

        /* Třída aplikovaná okamžitě po kliknutí a zkopírování */
        .intlab-code-copied {
          background-color: #d1fae5 !important; /* emerald-100 */
          color: #065f46 !important; /* emerald-800 */
          box-shadow: 0 0 0 2px #10b981 !important; /* emerald-500 */
        }
      `}</style>

      {/* Plovoucí toast notifikace o zkopírování */}
      {toast && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-2.5 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 text-xs font-semibold">
            <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Zkopírováno do schránky:</span>
            <span className="font-mono text-emerald-300 font-bold bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-700">
              {toast.text}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalCodeCopy;
