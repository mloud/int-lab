"use client";

import React from 'react';

export const HuffmanTheorySection: React.FC = () => (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tight">Co je Huffmanovo kódování?</h2>
            <div className="prose prose-emerald prose-lg max-w-none text-gray-600">
              <p>
                <strong>Huffmanovo kódování</strong> je populární metoda pro <em>bezeztrátovou kompresi dat</em>.
                Základní myšlenkou je přidělovat znakům různé délky binárních kódů na základě toho, jak často se v textu vyskytují.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-6">
                <p className="font-bold text-emerald-900 mb-2 m-0">Zlaté pravidlo komprese:</p>
                <p className="m-0 text-emerald-800">
                  Znaky, které se objevují <strong>často</strong>, dostanou <strong>krátký kód</strong> (např. 1 nebo 2 bity). 
                  Znaky, které se objevují <strong>zřídka</strong>, dostanou <strong>dlouhý kód</strong>.
                </p>
              </div>
              <p>
                Díky tomu je celková délka zakódovaného textu výrazně menší, než kdyby každý znak měl stejně dlouhý kód (jako je tomu např. v kódování ASCII, kde má každý znak přesně 8 bitů).
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Jak to funguje?</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Spočítáme, jak často se každý znak vyskytuje (tzv. frekvenční analýza).</li>
                <li>Z těchto znaků začneme budovat strom zespodu (od listů). Vždy vezmeme dva uzly s nejmenší četností a spojíme je do nového uzlu, jehož četnost je součtem obou.</li>
                <li>Postupujeme tak dlouho, dokud nespojíme všechny uzly do jednoho kořene.</li>
                <li>Hrany stromu pak ohodnotíme nulami a jedničkami (např. vlevo 0, vpravo 1).</li>
                <li>Kód každého znaku je dán cestou od kořene k tomuto znaku.</li>
              </ol>
            </div>

            {/* Vizuální příklad */}
            <h3 className="text-xl font-black text-gray-800 mt-10 mb-6 uppercase tracking-tight border-t-2 border-gray-100 pt-8">Příklad: slovo ABRAKADABRA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start not-prose">
              
              {/* Vstup */}
              <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-sm">1</div>
                  <h4 className="font-black text-blue-900 uppercase tracking-tight">Vstup</h4>
                </div>
                <div className="font-mono font-black text-2xl text-center text-blue-700 tracking-widest mb-4 bg-white rounded-xl py-3 px-2">
                  ABRAKADABRA
                </div>
                <p className="text-xs font-bold text-blue-700 text-center uppercase tracking-wide">11 znaků, 88 bitů v ASCII</p>
                <div className="mt-3 grid grid-cols-5 gap-1">
                  {[['A','5'],['B','2'],['R','2'],['K','1'],['D','1']].map(([ch, cnt]) => (
                    <div key={ch} className="bg-white rounded-lg p-1 flex flex-col items-center border border-blue-200">
                      <span className="font-black text-blue-600 text-sm">{ch}</span>
                      <span className="font-bold text-gray-500 text-[10px]">{cnt}×</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strom */}
              <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-sm">2</div>
                  <h4 className="font-black text-emerald-900 uppercase tracking-tight">Huffmanův strom</h4>
                </div>
                {/* 
                  Správná struktura (shodná s demo záložkou):
                  Listy dole (zleva): A(5), B(2), R(2), D(1), K(1)
                  DK = D+K spojeni, val=2
                  BR = B+R spojeni, val=4
                  DKBR = DK+BR spojeni, val=6
                  ROOT = A+DKBR spojeni, val=11
                  Hrany: ROOT-left=A(0), ROOT-right=DKBR(1)
                         DKBR-left=BR(0), DKBR-right=DK(1)
                         BR-left=B(0), BR-right=R(1)
                         DK-left=D(0), DK-right=K(1)
                  Kódy: A=0, B=100, R=101, D=110, K=111
                */}
                <svg viewBox="0 0 230 175" className="w-full">
                  {/* Hrany – kresleny od rodiče k dítěti */}
                  {/* ROOT(84,20) -> A(37,155) */}
                  <line x1="84" y1="20" x2="37" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* ROOT(84,20) -> DKBR(155,60) */}
                  <line x1="84" y1="20" x2="155" y2="60" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DKBR(155,60) -> BR(105,105) */}
                  <line x1="155" y1="60" x2="105" y2="105" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DKBR(155,60) -> DK(200,105) */}
                  <line x1="155" y1="60" x2="200" y2="105" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* BR(105,105) -> B(80,155) */}
                  <line x1="105" y1="105" x2="80" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* BR(105,105) -> R(130,155) */}
                  <line x1="105" y1="105" x2="130" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DK(200,105) -> D(178,155) */}
                  <line x1="200" y1="105" x2="178" y2="155" stroke="#6b7280" strokeWidth="1.5"/>
                  {/* DK(200,105) -> K(218,155) */}
                  <line x1="200" y1="105" x2="218" y2="155" stroke="#6b7280" strokeWidth="1.5"/>

                  {/* Popisky hran 0/1 */}
                  <text x="52" y="82" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="125" y="34" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="118" y="78" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="182" y="78" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="84" y="135" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="123" y="135" fontSize="9" fill="#f97316" fontWeight="bold">1</text>
                  <text x="180" y="135" fontSize="9" fill="#f97316" fontWeight="bold">0</text>
                  <text x="212" y="135" fontSize="9" fill="#f97316" fontWeight="bold">1</text>

                  {/* Uzly: listy (modré), vnitřní (zelené) */}
                  {/* ROOT */}
                  <circle cx="84" cy="20" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="84" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">11</text>
                  {/* A – list vlevo */}
                  <circle cx="37" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="37" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">A</text>
                  <text x="50" y="166" fontSize="8" fontWeight="800" fill="#475569">5</text>
                  {/* DKBR */}
                  <circle cx="155" cy="60" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="155" y="65" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">6</text>
                  {/* BR */}
                  <circle cx="105" cy="105" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="105" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">4</text>
                  {/* DK */}
                  <circle cx="200" cy="105" r="13" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="200" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">2</text>
                  {/* B – list */}
                  <circle cx="80" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="80" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">B</text>
                  <text x="93" y="166" fontSize="8" fontWeight="800" fill="#475569">2</text>
                  {/* R – list */}
                  <circle cx="130" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="130" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">R</text>
                  <text x="143" y="166" fontSize="8" fontWeight="800" fill="#475569">2</text>
                  {/* D – list */}
                  <circle cx="178" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="178" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">D</text>
                  <text x="191" y="166" fontSize="8" fontWeight="800" fill="#475569">1</text>
                  {/* K – list */}
                  <circle cx="218" cy="155" r="13" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="218" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">K</text>
                  <text x="231" y="166" fontSize="8" fontWeight="800" fill="#475569">1</text>
                </svg>
                <p className="text-xs font-bold text-emerald-700 text-center uppercase tracking-wide mt-1">Levá hrana = 0, pravá hrana = 1</p>
              </div>

              {/* Výstup */}
              <div className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-sm">3</div>
                  <h4 className="font-black text-orange-900 uppercase tracking-tight">Výstup</h4>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { ch: 'A', code: '0',   cnt: 5 },
                    { ch: 'B', code: '100', cnt: 2 },
                    { ch: 'R', code: '101', cnt: 2 },
                    { ch: 'D', code: '110', cnt: 1 },
                    { ch: 'K', code: '111', cnt: 1 },
                  ].map(({ ch, code, cnt }) => (
                    <div key={ch} className="flex items-center justify-between bg-white rounded-lg px-3 py-1.5 border border-orange-200">
                      <span className="font-black text-orange-600 text-base w-5">{ch}</span>
                      <span className="text-gray-400 text-xs font-bold">{cnt}×</span>
                      <span className="font-mono font-black text-emerald-600">{code}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-3 border border-orange-200 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Výsledná velikost</p>
                  <p className="font-black text-orange-600 text-xl">23 bitů</p>
                  <p className="text-xs font-bold text-emerald-600">místo 88 bitů (−74 %)</p>
                </div>
              </div>
            </div>
          </div>
);
