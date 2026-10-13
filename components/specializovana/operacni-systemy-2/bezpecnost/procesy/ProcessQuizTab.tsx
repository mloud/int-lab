'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ProcessQuizTab() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  return (
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Ověřovací kvíz: Správa procesů a certifikáty</h2>
            <p className="text-sm text-slate-500 mb-6">Vyberte správné odpovědi a ověřte si své znalosti ze všech okruhů kapitoly.</p>

            {/* Otázka 1: Rodičovský proces svchost.exe */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                1. Kdo je legitimním rodičovským procesem (Parent Process) pro systémové instance svchost.exe?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'explorer.exe (Průzkumník plochy)' },
                  { id: 1, text: 'services.exe (Správce systémových služeb)' },
                  { id: 2, text: 'cmd.exe (Příkazový řádek)' },
                  { id: 3, text: 'WINWORD.EXE (Microsoft Word)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 1: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[1] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 2: Digitální podpis Authenticode */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                2. Co se stane s digitálním podpisem Authenticode, pokud útočník v programu změní jediný bajt?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Nic, digitální podpis platí dál, dokud nevyprší datum certifikátu.' },
                  { id: 1, text: 'Systém nově spočte SHA-256 hash, zjistí nesoulad s podpisem a označí integritu za porušenou.' },
                  { id: 2, text: 'Windows automaticky chybějící bajt opraví ze zálohy.' },
                  { id: 3, text: 'Podpis se automaticky přelicencuje na útočníka.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 2: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[2] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 3: Fialové zvýraznění v Process Exploreru */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                3. Co v nástroji Sysinternals Process Explorer indikuje fialová barva řádku (Packed Images)?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Proces je zkomprimován nebo zašifrován packerem (častá technika malwaru pro maskování kódu).' },
                  { id: 1, text: 'Proces běží v grafickém prostředí DirectX.' },
                  { id: 2, text: 'Proces právě využívá více než 90 % kapacity CPU.' },
                  { id: 3, text: 'Proces je systémová služba Windows běžící pod účtem SYSTEM.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 3: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[3] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 4: Příkaz pro SHA-256 hash v CMD */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                4. Jakým nativním příkazem v Příkazovém řádku (cmd.exe) spočítáme SHA-256 hash souboru bez PowerShellu?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'md5sum soubor.exe' },
                  { id: 1, text: 'certutil -hashfile soubor.exe SHA256' },
                  { id: 2, text: 'tasklist /HASH soubor.exe' },
                  { id: 3, text: 'format /SHA256 soubor.exe' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 4: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[4] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 5: Smart App Control */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                5. V čem spočívá hlavní výhoda funkce Smart App Control ve Windows 11 oproti klasickému antiviru?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Automaticky restartuje počítač každých 60 minut.' },
                  { id: 1, text: 'Blokuje neznámé a nepodepsané programy proaktivně ještě před zavedením instrukcí do paměti RAM.' },
                  { id: 2, text: 'Odpojuje počítač od elektrické sítě při přepětí.' },
                  { id: 3, text: 'Maže dočasné soubory v koši po každém vypnutí.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 5: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[5] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuizSubmitted(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all cursor-pointer shadow-md shadow-blue-600/20"
              >
                Vyhodnotit kvíz
              </button>

              {quizSubmitted && (
                <div className="font-bold text-sm text-slate-800">
                  Výsledek:{' '}
                  <span className="text-blue-600">
                    {[
                      quizAnswers[1] === 1,
                      quizAnswers[2] === 1,
                      quizAnswers[3] === 0,
                      quizAnswers[4] === 1,
                      quizAnswers[5] === 1
                    ].filter(Boolean).length}{' '}
                    / 5 správně
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
  );
}
