"use client";

import React from 'react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchReporter
} from '../ScratchBlocks';

export const MessagesTask7 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 7 */}
      <TaskCard
        number="7"
        title="Analogové hodiny (Taktování zprávami)"
        taskId="msg-7"
        saveAs="AnalogoveHodiny.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              <strong>Princip řetězení zpráv:</strong> Vteřinová ručička funguje jako hardwarový časovač (oscilátor). Odpočítává vteřiny a po dokončení celého kola (60 s) pošle signál <code>ubehla minuta</code>. Minutová ručička na tento signál reaguje pootočením, počítá minuty a po 60 minutách vyšle signál <code>ubehla hodina</code>, který posune hodinovou ručičku.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs text-slate-800">
              {/* 1. VTEŘINOVÁ RUČIČKA */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">
                  1. Vteřinová ručička (Časovač):
                </div>
                <div><ScratchBlock category="events">po stisku klávesy <ScratchInput type="dropdown">mezerník</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vteriny</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="motion">nastav směr <ScratchInput>0</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj stále</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">vteriny</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                      <div><ScratchBlock category="motion">otoč se ↷ o <ScratchInput>6</ScratchInput> stupňů</ScratchBlock></div>
                      <ScratchCBlock
                        category="control"
                        topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">vteriny</ScratchReporter> &gt; <ScratchInput>59</ScratchInput></ScratchHexagon> tak</span>}
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vteriny</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                          <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">ubehla minuta</ScratchInput></ScratchBlock></div>
                        </div>
                      </ScratchCBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 2. MINUTOVÁ RUČIČKA */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">
                  2. Minutová ručička:
                </div>
                <div><ScratchBlock category="events">po stisku klávesy <ScratchInput type="dropdown">mezerník</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="motion">nastav směr <ScratchInput>0</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">minuty</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>

                <div className="pt-2 border-t border-amber-100">
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">ubehla minuta</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="motion">otoč se ↷ o <ScratchInput>6</ScratchInput> stupňů</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">změň <ScratchInput type="dropdown">minuty</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">minuty</ScratchReporter> &gt; <ScratchInput>59</ScratchInput></ScratchHexagon> tak</span>}
                    >
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">minuty</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                        <div><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">ubehla hodina</ScratchInput></ScratchBlock></div>
                      </div>
                    </ScratchCBlock>
                  </div>
                </div>
              </div>

              {/* 3. HODINOVÁ RUČIČKA */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">
                  3. Hodinová ručička:
                </div>
                <div><ScratchBlock category="events">po stisku klávesy <ScratchInput type="dropdown">mezerník</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="motion">nastav směr <ScratchInput>0</ScratchInput></ScratchBlock></div>

                <div className="pt-2 border-t border-amber-100">
                  <div className="text-slate-500 font-sans text-[10px] uppercase font-bold mb-1">Varianta A (Skok po celé hodině):</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">ubehla hodina</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="motion">otoč se ↷ o <ScratchInput>30</ScratchInput> stupňů</ScratchBlock></div>
                </div>

                <div className="pt-2 border-t border-amber-100 bg-amber-50/50 p-2 rounded-lg">
                  <div className="text-amber-900 font-sans text-[10px] uppercase font-black mb-1">Varianta B (Plynulý posun každou minutu):</div>
                  <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">ubehla minuta</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="motion">otoč se ↷ o <ScratchInput>0.5</ScratchInput> stupňů</ScratchBlock></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř model analogových hodin se 3 postavami: <strong>vteřinová ručička</strong>, <strong>minutová ručička</strong> a <strong>hodinová ručička</strong>.
        </p>

        {/* PŘÍPRAVA */}
        <div className="my-4 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
          <div className="font-black text-amber-900 uppercase text-xs tracking-wider">
            ⚙️ Příprava kostýmů:
          </div>
          <p className="leading-relaxed">
            V kostýmu každé postavy je třeba nakreslit ručičku <strong>ze středu (křížku) směrem doprava</strong>. Všechny postavy umísti na scéně do středu na <code>x: 0, y: 0</code>.
          </p>
        </div>

        {/* NÁHLED CIFERNÍKU */}
        <div className="my-5 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              <circle cx="100" cy="100" r="92" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
              <circle cx="100" cy="100" r="88" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              <text x="100" y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">12</text>
              <text x="172" y="106" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">3</text>
              <text x="100" y="178" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">6</text>
              <text x="28" y="106" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">9</text>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="100"
                  y1="14"
                  x2="100"
                  y2="22"
                  stroke="#475569"
                  strokeWidth="2.5"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
              <line x1="100" y1="100" x2="100" y2="52" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" transform="rotate(60 100 100)" />
              <line x1="100" y1="100" x2="100" y2="30" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" transform="rotate(72 100 100)" />
              <line x1="100" y1="112" x2="100" y2="24" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" transform="rotate(150 100 100)" />
              <circle cx="100" cy="100" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* ZADÁNÍ ÚKOLU */}
        <ol className="list-decimal pl-5 space-y-2.5 my-4 text-sm text-slate-800">
          <li>
            <strong>Start:</strong> Po stisku klávesy <strong>mezerník</strong> se všechny tři ručičky nastaví <strong>směrem nahoru</strong>.
          </li>
          <li>
            <strong>Chod hodin:</strong> Vteřinová ručička obíhá ciferník. Po dosažení celého kola (60 vteřin) pošle zprávu minutové ručičce a ta se pohne. Minutová ručička po celé hodině pošle zprávu hodinové ručičce a ta se pohne.
          </li>
          <li>
            <strong>Vylepšení:</strong> Až ti základní hodiny budou fungovat, uprav program tak, aby se hodinová ručička pohybovala <strong>plynule po každé minutě</strong>.
          </li>
        </ol>
      </TaskCard>
    </div>
  );
};
