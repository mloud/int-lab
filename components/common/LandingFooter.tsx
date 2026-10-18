'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ShieldCheck, Sparkles, Code2, ExternalLink, Info, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingFooterProps {
  onOpenTechStack?: () => void;
  onOpenVersion?: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onOpenTechStack,
  onOpenVersion,
}) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string>('');

  // Ochrana před webovými roboty / scrapers:
  // E-mailová adresa není obsažena v statickém HTML ani SSR kódu.
  // Sestavuje se až na straně klienta po načtení stránky.
  useEffect(() => {
    setMounted(true);
    // Base64 decode pro zamezení prostého vyhledávání řetězců roboty
    // 'Z21sb3Vk' = 'gmloud', 'Z21haWwuY29t' = 'gmail.com'
    const u = atob('Z21sb3Vk');
    const d = atob('Z21haWwuY29t');
    setEmailAddress(`${u}@${d}`);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!emailAddress) return;
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailTo = () => {
    if (!emailAddress) return;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent('IntLab — zpráva od návštěvníka')}`;
  };

  return (
    <footer className="w-full relative z-20 mt-16 pt-12 pb-14 border-t border-slate-200/70 bg-gradient-to-b from-transparent via-slate-100/50 to-slate-100/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-200/60">
          
          {/* Levý sloupec: Název projektu a poslání */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Int<span className="text-indigo-600">Lab</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Edu Portál
              </span>
            </div>
            
            <p className="text-sm font-semibold text-slate-700 mb-1">
              IntLab — Interaktivní vzdělávací portál pro výuku informatiky
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
              Moderní otevřená výuková platforma zaměřená na vizualizace, simulátory a praktické laboratorní úlohy pro žáky a studenty.
            </p>
          </div>

          {/* Pravý sloupec: Karta autora a chráněný kontakt */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Autor portálu
              </div>
              <div className="text-base font-black text-slate-800 tracking-tight">
                Michal Louda
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            {/* Ochrana e-mailu s dynamickým sestavením */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMailTo}
                title="Poslat e-mail autorovi"
                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-200/80 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition-all text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-lg bg-white shadow-xs border border-slate-200/60 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-[13px] tracking-tight">
                  {mounted && emailAddress ? (
                    emailAddress
                  ) : (
                    <span className="text-slate-400 italic font-sans text-xs">Načítám kontakt…</span>
                  )}
                </span>
                <span className="hidden xl:inline text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-500 pl-1">
                  Napsat
                </span>
              </button>

              {/* Tlačítko pro rychlé zkopírování e-mailu */}
              <button
                type="button"
                onClick={handleCopy}
                title="Zkopírovat adresu do schránky"
                className={`p-2 rounded-xl border transition-all ${
                  copied 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-500 hover:text-slate-800'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Spodní lišta: Odkazy, verze a copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span>© {new Date().getFullYear()} Michal Louda</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">Všechna práva vyhrazena</span>
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {onOpenTechStack && (
              <button
                onClick={onOpenTechStack}
                className="hover:text-indigo-600 font-medium transition-colors flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Jak tento web funguje?</span>
              </button>
            )}

            {onOpenVersion && (
              <button
                onClick={onOpenVersion}
                className="hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Informace o verzi</span>
              </button>
            )}

            <div className="flex items-center gap-1 text-slate-400 text-[11px]" title="Adresa je chráněna proti automatickým webovým scraperům">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chráněno proti spamu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
