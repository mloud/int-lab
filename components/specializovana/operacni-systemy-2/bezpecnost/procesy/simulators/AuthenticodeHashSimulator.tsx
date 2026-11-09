'use client';
import React, { useState, useEffect } from 'react';
import {
  RotateCcw, CheckCircle2, XCircle, Fingerprint, ShieldAlert,
  ShieldCheck, FileCheck, Shield, FileCode, Sparkles
} from 'lucide-react';
import { ORIGINAL_AUTHENTICODE_TEXT } from '../processTypes';

export const AuthenticodeHashSimulator: React.FC = () => {
  const [editorText, setEditorText] = useState<string>(ORIGINAL_AUTHENTICODE_TEXT);
  const [originalHash, setOriginalHash] = useState<string>('');
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isComputingHash, setIsComputingHash] = useState<boolean>(false);

  // Inicializace výchozího hashe
  useEffect(() => {
    async function initOriginalHash() {
      const encoder = new TextEncoder();
      const data = encoder.encode(ORIGINAL_AUTHENTICODE_TEXT);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOriginalHash(hashHex);
    }
    initOriginalHash();
  }, []);

  // Živý výpočet SHA-256 hashe
  useEffect(() => {
    let cancelled = false;
    async function computeLiveHash() {
      setIsComputingHash(true);
      const encoder = new TextEncoder();
      const data = encoder.encode(editorText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      if (!cancelled) {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setCurrentHash(hashHex);
        setIsComputingHash(false);
      }
    }
    computeLiveHash();
    return () => {
      cancelled = true;
    };
  }, [editorText]);

  const isSignatureValid = originalHash !== '' && currentHash === originalHash;
  const textLineCount = editorText.split('\n').length;
  const textCharCount = editorText.length;
  const textByteSize = new TextEncoder().encode(editorText).length;

  return (
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                2. Simulátor: Co se stane, když útočník modifikuje podepsaný soubor?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Zkoušejte psát přímo do textového editoru. Systém okamžitě reaguje a ukazuje stav digitální pečeti.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                if (!editorText.includes('del /f /q')) {
                  setEditorText(prev => prev.replace('exit /b 0', 'del /f /q C:\\Windows\\data.txt\nexit /b 0'));
                }
              }}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-rose-200 shadow-xs"
              title="Vloží škodlivý příkaz před ukončení programu"
            >
              ☣️ Injektovat virus
            </button>
            <button
              type="button"
              onClick={() => setEditorText(ORIGINAL_AUTHENTICODE_TEXT)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Obnovit originál
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEVÝ SLOUPEC: OKNO TEXTOVÉHO EDITORU (POZNÁMKOVÝ BLOK) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col">
            
            {/* Lišta okna (Titlebar) */}
            <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 min-w-0">
                <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono text-xs font-bold text-slate-200 truncate">
                  aktualizace_systemu.bat – Poznámkový blok
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  isSignatureValid 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80' 
                    : 'bg-rose-950 text-rose-300 border border-rose-700/80 animate-pulse'
                }`}>
                  {isSignatureValid ? 'Podepsáno' : 'Pečeť rozbita!'}
                </span>
              </div>
              
              {/* Tlačítka okna */}
              <div className="flex items-center gap-2 shrink-0 pl-2">
                <button type="button" aria-label="Minimalizovat" className="w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
                <button type="button" aria-label="Maximalizovat" className="w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
                <button type="button" aria-label="Zavřít" className="w-3 h-3 rounded-full bg-rose-600/80 hover:bg-rose-500 transition-colors" />
              </div>
            </div>

            {/* Nabídka editoru (Menu bar) */}
            <div className="bg-slate-800/60 px-4 py-1 border-b border-slate-800 text-[11px] text-slate-400 flex items-center gap-4 select-none">
              <span className="hover:text-slate-200 cursor-default">Soubor</span>
              <span className="hover:text-slate-200 cursor-default">Úpravy</span>
              <span className="hover:text-slate-200 cursor-default">Formát</span>
              <span className="hover:text-slate-200 cursor-default">Zobrazit</span>
              <span className="hover:text-slate-200 cursor-default">Nápověda</span>
            </div>

            {/* Vlastní editovatelná plocha */}
            <div className="relative">
              <textarea
                value={editorText}
                onChange={(e) => setEditorText(e.target.value)}
                placeholder="Sem můžete psát libovolný text nebo kód programu..."
                spellCheck={false}
                className="w-full h-64 p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-indigo-600/50 block"
              />
            </div>

            {/* Živý otisk spočtený procesorem přímo pod souborem */}
            <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
                  Aktuální otisk obsahu souboru (počítá CPU):
                </span>
                <span className={`font-bold ${isSignatureValid ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                  {isSignatureValid ? '✓ Odpovídá pečeti' : '✕ ROZBITÝ OTISK (KÓD ZMĚNĚN)'}
                </span>
              </div>
              <div className={`p-2 rounded-lg border text-xs break-all transition-all ${
                isSignatureValid 
                  ? 'bg-slate-900 border-slate-700 text-slate-300' 
                  : 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold shadow-xs'
              }`}>
                {currentHash || 'Načítám otisk...'}
              </div>
            </div>

            {/* Stavový řádek okna */}
            <div className="bg-slate-900 px-4 py-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <span>Řádků: {textLineCount}</span>
                <span>Znaků: {textCharCount}</span>
                <span>Velikost: {textByteSize} B</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span>UTF-8</span>
                <span>Windows (CRLF)</span>
              </div>
            </div>

          </div>

          {/* PRAVÝ SLOUPEC: JEDINÁ PŘEHLEDNÁ KARTA DIGITÁLNÍ PEČETI (CERTIFIKÁT AUTORA) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Stav podpisu v systému */}
            {isSignatureValid ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    DIGITÁLNÍ PEČEŤ (CERTIFIKÁT)
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-black uppercase">
                    Platný podpis ✓
                  </span>
                </div>

                {/* Vizuální digitální pečeť s autorem a otiskem */}
                <div className="p-3 bg-white/95 rounded-xl border border-emerald-300 text-xs space-y-2.5 font-sans">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Autor a vydavatel pečeti:
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-emerald-900 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Microsoft Windows Publisher</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Otisk souboru v pečeti autora (SHA-256):
                    </span>
                    <div className="mt-1 font-mono text-[11px] bg-emerald-50/70 p-2 rounded-lg border border-emerald-200 text-emerald-800 break-all select-all font-bold">
                      {originalHash || 'Načítám...'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-900 font-bold flex items-center justify-between pt-0.5">
                  <span>Kontrola Windows:</span>
                  <span className="text-emerald-700 font-mono">NEPORUŠENO ✅ Spuštění OK</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <div className="flex items-center gap-2 font-black text-sm text-rose-900">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 animate-pulse" />
                    DIGITÁLNÍ PEČEŤ (CERTIFIKÁT)
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 text-[10px] font-black uppercase">
                    Pečeť rozbita ✕
                  </span>
                </div>

                {/* Vizuální digitální pečeť s autorem a neplatným otiskem */}
                <div className="p-3 bg-white/95 rounded-xl border border-rose-300 text-xs space-y-2.5 font-sans">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Původní autor pečeti:
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-rose-900 font-bold text-xs">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Microsoft Windows Publisher <span className="text-rose-600 font-normal">(Podpis neplatí!)</span></span>
                    </div>
                  </div>

                  <div className="border-t border-rose-100 pt-2">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Původní otisk uzamčený v pečeti:
                    </span>
                    <div className="mt-1 font-mono text-[11px] bg-rose-50/70 p-2 rounded-lg border border-rose-200 text-rose-800 break-all select-all font-bold line-through opacity-70">
                      {originalHash || 'Načítám...'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-rose-900 font-bold flex items-center justify-between pt-0.5">
                  <span>Kontrola Windows:</span>
                  <span className="text-rose-700 font-mono">ROZBITO ❌ ZABLOKOVÁNO</span>
                </div>
              </div>
            )}

            {/* Stručná didaktická pointa dole */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Proč útočník pečeť neobnoví?
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                K vytvoření platné pečeti Microsoftu je nutný tajný <strong>privátní klíč</strong>. Útočník může kód upravit, ale nedokáže k němu vytvořit pravou pečeť.
              </p>
            </div>

          </div>

        </div>
      </div>
  );
};
