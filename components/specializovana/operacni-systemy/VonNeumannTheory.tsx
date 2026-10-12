'use client';
import React, { useState } from 'react';
import {
  Cpu,
  MemoryStick,
  LogIn,
  LogOut,
  Settings,
  Calculator,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowRight
} from 'lucide-react';

type SelectedBlock = 'all' | 'memory' | 'cu' | 'alu' | 'input' | 'output';

export default function VonNeumannTheory() {
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock>('all');
  const [showFde, setShowFde] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* =========================================================================
          1. INTERAKTIVNÍ ARCHITEKTONICKÝ DIAGRAM (Vycentrovaný dle pravidla 2)
         ========================================================================= */}
      <section className="flex flex-col items-center">
        <div className="text-center mb-5 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Architektonické schéma
          </span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Schéma Von Neumannova počítače
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kliknutím na libovolný blok zobrazíte jeho význam. Všechny bloky jsou navzájem propojeny sběrnicí.
          </p>
        </div>

        {/* Vycentrovaný ohraničený rámec diagramu (max-w-3xl mx-auto) */}
        <div className="w-full max-w-3xl mx-auto bg-slate-50 border-4 border-slate-200 rounded-3xl p-5 sm:p-8 shadow-lg relative overflow-hidden">
          
          {/* Bloky v diagramu */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            
            {/* Horní blok: Paměť (RAM) */}
            <button
              type="button"
              onClick={() => setSelectedBlock(selectedBlock === 'memory' ? 'all' : 'memory')}
              className={`w-full max-w-md bg-blue-50 border-4 rounded-2xl p-3.5 shadow-md transition-all text-left flex flex-col items-center relative group ${
                selectedBlock === 'memory'
                  ? 'border-blue-600 ring-4 ring-blue-200 scale-105 bg-blue-100/90'
                  : 'border-blue-300 hover:border-blue-500 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 bg-white px-3 py-1 rounded-full shadow-sm border border-blue-200">
                <MemoryStick className="w-4 h-4 text-blue-600" />
                <span className="font-black text-blue-900 uppercase tracking-wider text-xs">Společná paměť RAM</span>
              </div>
              <div className="w-full grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/90 p-1.5 rounded-xl border border-blue-200">
                  <span className="font-bold text-blue-700 block text-[11px] uppercase">Program</span>
                  <span className="text-[10px] text-slate-500 font-mono">Instrukce (CO dělat)</span>
                </div>
                <div className="bg-white/90 p-1.5 rounded-xl border border-blue-200">
                  <span className="font-bold text-indigo-700 block text-[11px] uppercase">Data</span>
                  <span className="text-[10px] text-slate-500 font-mono">Čísla (S ČÍM počítat)</span>
                </div>
              </div>
            </button>

            {/* Vertikální propojení: Paměť <-> Procesor (zřetelné viditelné štítky) */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 py-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-blue-300 rounded-full shadow-sm text-[11px] font-black text-blue-700">
                <ArrowDown className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 animate-bounce" />
                <span>Čtení: Instrukce & Data</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-purple-300 rounded-full shadow-sm text-[11px] font-black text-purple-700">
                <ArrowUp className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                <span>Zápis: Výsledky</span>
              </div>
            </div>

            {/* Střední řada: Vstup -> CPU -> Výstup (vycentrováno a s dostatkem místa) */}
            <div className="w-full flex items-center justify-center gap-2 sm:gap-3 px-2">
              
              {/* Vstup (Input) */}
              <button
                type="button"
                onClick={() => setSelectedBlock(selectedBlock === 'input' ? 'all' : 'input')}
                className={`w-24 sm:w-28 bg-green-50 border-4 rounded-2xl p-2.5 shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[130px] flex-shrink-0 ${
                  selectedBlock === 'input'
                    ? 'border-green-600 ring-4 ring-green-200 scale-105 bg-green-100'
                    : 'border-green-300 hover:border-green-500 hover:shadow-lg'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-green-600 shadow-sm border border-green-200 mb-1.5">
                  <LogIn className="w-4 h-4" />
                </div>
                <span className="font-black text-green-900 uppercase text-xs">Vstup</span>
                <span className="text-[9px] text-green-700 font-medium mt-0.5">Klávesnice, disk</span>
              </button>

              {/* Spojnice Vstup -> CPU */}
              <div className="flex flex-col items-center justify-center px-1 flex-shrink-0">
                <span className="text-[10px] font-black uppercase text-green-800 bg-white border-2 border-green-300 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  Vstupní data
                </span>
                <div className="w-full flex items-center justify-center gap-0.5 text-green-600 font-bold mt-1">
                  <div className="h-0.5 w-6 sm:w-8 bg-green-400 rounded-full"></div>
                  <ArrowRight className="w-3.5 h-3.5 text-green-600 flex-shrink-0 -ml-1" />
                </div>
              </div>

              {/* Procesor (CPU) */}
              <div
                className={`w-52 sm:w-60 bg-slate-100 border-4 rounded-3xl p-3 shadow-md transition-all flex-shrink-0 ${
                  selectedBlock === 'cu' || selectedBlock === 'alu'
                    ? 'border-indigo-500 ring-4 ring-indigo-200'
                    : 'border-slate-300'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-2 bg-white px-2.5 py-1 rounded-xl shadow-sm border border-slate-200">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span className="font-black text-slate-800 uppercase tracking-wider text-xs">Procesor (CPU)</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {/* Řadič (CU) */}
                  <button
                    type="button"
                    onClick={() => setSelectedBlock(selectedBlock === 'cu' ? 'all' : 'cu')}
                    className={`p-1.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      selectedBlock === 'cu'
                        ? 'bg-indigo-100 border-indigo-600 ring-2 ring-indigo-300'
                        : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-600 mb-0.5" />
                    <span className="font-black text-indigo-950 text-[10px] leading-tight">Řadič (CU)</span>
                    <span className="text-[8px] text-slate-500">Řídí & čte kód</span>
                  </button>

                  {/* ALU */}
                  <button
                    type="button"
                    onClick={() => setSelectedBlock(selectedBlock === 'alu' ? 'all' : 'alu')}
                    className={`p-1.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      selectedBlock === 'alu'
                        ? 'bg-purple-100 border-purple-600 ring-2 ring-purple-300'
                        : 'bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5 text-purple-600 mb-0.5" />
                    <span className="font-black text-purple-950 text-[10px] leading-tight">ALU + Reg</span>
                    <span className="text-[8px] text-slate-500">Počítá operace</span>
                  </button>
                </div>
              </div>

              {/* Spojnice CPU -> Výstup */}
              <div className="flex flex-col items-center justify-center px-1 flex-shrink-0">
                <span className="text-[10px] font-black uppercase text-orange-800 bg-white border-2 border-orange-300 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  Výsledky
                </span>
                <div className="w-full flex items-center justify-center gap-0.5 text-orange-600 font-bold mt-1">
                  <div className="h-0.5 w-6 sm:w-8 bg-orange-400 rounded-full"></div>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 -ml-1" />
                </div>
              </div>

              {/* Výstup (Output) */}
              <button
                type="button"
                onClick={() => setSelectedBlock(selectedBlock === 'output' ? 'all' : 'output')}
                className={`w-24 sm:w-28 bg-orange-50 border-4 rounded-2xl p-2.5 shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[130px] flex-shrink-0 ${
                  selectedBlock === 'output'
                    ? 'border-orange-600 ring-4 ring-orange-200 scale-105 bg-orange-100'
                    : 'border-orange-300 hover:border-orange-500 hover:shadow-lg'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm border border-orange-200 mb-1.5">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-black text-orange-900 uppercase text-xs">Výstup</span>
                <span className="text-[9px] text-orange-700 font-medium mt-0.5">Monitor, disk</span>
              </button>
            </div>

            {/* Stručná zmínka o sběrnici pod schématem */}
            <div className="text-[11px] font-medium text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mt-2">
              🔗 Všechny bloky navzájem komunikují po <strong>systémové sběrnici</strong> (vodiče pro přenos dat a signálů).
            </div>

          </div>
        </div>

        {/* Dynamická karta detailu vybraného bloku */}
        <div className="w-full max-w-3xl mx-auto mt-3 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            {selectedBlock === 'all' && (
              <p>
                <strong>5 stavebních kamenů:</strong> Paměť (společná pro kód i data), Řadič, ALU, Vstupní a Výstupní jednotka. Spojuje je systémová sběrnice.
              </p>
            )}
            {selectedBlock === 'memory' && (
              <p>
                <strong>Paměť RAM:</strong> Drží jak instrukce programu (co má počítač dělat), tak data (čísla, se kterými počítá). Každá buňka má svou číselnou adresu.
              </p>
            )}
            {selectedBlock === 'cu' && (
              <p>
                <strong>Řadič (Control Unit):</strong> „Dirigent“ procesoru. Čte instrukce z paměti, zjišťuje, co znamenají, a řídí ostatní součásti počítače.
              </p>
            )}
            {selectedBlock === 'alu' && (
              <p>
                <strong>ALU & Registry:</strong> Počítá matematiku (sčítání, odčítání...) i logiku (rovnost, porovnání). Mezivýsledky si ukládá do vnitřních registrů procesoru.
              </p>
            )}
            {selectedBlock === 'input' && (
              <p>
                <strong>Vstup:</strong> Převádí pokyny zvenčí (stisk klávesy, klik myši, soubor z disku) do nul a jedniček pro počítač.
              </p>
            )}
            {selectedBlock === 'output' && (
              <p>
                <strong>Výstup:</strong> Převádí vypočítané bity na lidsky čitelnou podobu (obraz na monitoru, zvuk, tisk).
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HLAVNÍ PRINCIP: SPOLEČNÁ PAMĚŤ (STRUČNĚ & JASNĚ)
         ========================================================================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          V čem spočívala revoluce Johna von Neumanna (1945)?
        </h2>
        
        <p className="text-sm text-slate-600 leading-relaxed">
          Před rokem 1945 se počítače (jako ENIAC) musely pro každou novou úlohu <strong>přepojovat ručně kabely</strong>. 
          John von Neumann přišel s převratnou myšlenkou tzv. <strong>uloženého programu (Stored-program)</strong>:
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-2xl">
          <p className="text-xs text-indigo-950 leading-relaxed font-medium">
            <strong>Klíčový princip:</strong> Program (instrukce) i data (čísla) leží ve <strong>stejné operační paměti</strong>. 
            Díky tomu je počítač univerzální – stačí do paměti nahrát jiný program a okamžitě se z něj stane kalkulačka, textový editor nebo hra, aniž by se musel upravovat hardware.
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. 5 JEDNOTEK VE STRUČNÝCH KARTÁCH
         ========================================================================= */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          5 základních částí počítače
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">1. Paměť</span>
            <h3 className="font-black text-xs text-slate-800 mb-1">Operační paměť RAM</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">Ukládá program i data do očíslovaných buněk (adres).</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">2. Procesor</span>
            <h3 className="font-black text-xs text-slate-800 mb-1">Řadič (CU)</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">Čte instrukce z paměti a řídí práci všech součástí.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1">3. Procesor</span>
            <h3 className="font-black text-xs text-slate-800 mb-1">ALU a Registry</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">Provádí matematické a logické výpočty, drží mezivýsledky.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-1">4. Vstup</span>
            <h3 className="font-black text-xs text-slate-800 mb-1">Vstupní zařízení</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">Převádí data zvenčí (klávesnice, disk) do paměti.</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">5. Výstup</span>
            <h3 className="font-black text-xs text-slate-800 mb-1">Výstupní zařízení</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">Předává výsledky uživateli (monitor, tiskárna, zvuk).</p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. ROZBALOVACÍ ČÁST PRO ZÁJEMCE: FETCH - DECODE - EXECUTE
         ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFde(!showFde)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  Pro zájemce
                </span>
                <h3 className="text-base font-black text-slate-800">
                  Jak procesor vykonává program: Instrukční cyklus (FDE)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kroky Fetch, Decode, Execute a Writeback, které CPU opakuje miliardkrát za sekundu
              </p>
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
            {showFde ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showFde && (
          <div className="p-5 pt-1 border-t border-slate-100 space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2">1</span>
                <h4 className="font-black text-blue-950 text-xs uppercase">Fetch (Načtení)</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Řadič přečte adresu z čítače instrukcí a načte další instrukci z paměti RAM.
                </p>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-2">2</span>
                <h4 className="font-black text-indigo-950 text-xs uppercase">Decode (Dekódování)</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Řadič zjistí, co instrukce znamená (např. sečti dvě čísla nebo skoč jinam).
                </p>
              </div>

              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-2">3</span>
                <h4 className="font-black text-purple-950 text-xs uppercase">Execute (Vykonání)</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Příslušná jednotka (např. ALU) provede požadovaný výpočet či operaci.
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2">4</span>
                <h4 className="font-black text-emerald-950 text-xs uppercase">Writeback (Uložení)</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Výsledek se uloží do registru procesoru nebo se zapíše zpět do paměti RAM.
                </p>
              </div>

            </div>

            <p className="text-[11px] text-slate-500 font-medium italic">
              ⚡ U moderního 4GHz procesoru proběhne tento cyklus až 4 miliardkrát za sekundu na každém jádře!
            </p>
          </div>
        )}
      </section>

      {/* =========================================================================
          5. STRUČNÉ ZAJÍMAVOSTI (ÚZKÉ HRDLO & CACHE)
         ========================================================================= */}
      <section className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Von Neumannovo úzké hrdlo (Bottleneck):</strong> Protože program i data sdílejí stejnou sběrnici, procesor musí často čekat na paměť RAM. Moderní počítače to řeší superrychlými vyrovnávacími paměťmi <strong>Cache (L1, L2, L3)</strong> umístěnými přímo na čipu procesoru.
        </div>
      </section>

    </div>
  );
}
