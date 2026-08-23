import React, { useState } from 'react';
import { ArrowLeft, Cpu, MemoryStick, Zap, RotateCcw, Database, Code, Info } from 'lucide-react';

interface CpuCycleGameProps {
  onBack: () => void;
}

type Phase = 'fetch' | 'decode' | 'execute' | 'halt';

interface CpuState {
  pc: number;
  ir: string;
  registers: { R1: number | null, R2: number | null, R3: number | null, R4: number | null, R5: number | null };
  ram: { [key: number]: number | string };
}

interface InstructionDef {
  code: string;
  decodeText: string;
  executeText: string;
  action: (state: CpuState) => CpuState;
}

const PROGRAM: InstructionDef[] = [
  {
    code: "LOAD R1, [100]",
    decodeText: "Rozluštěno: Načti hodnotu z paměťové adresy 100 a ulož ji do registru R1.",
    executeText: "Hodnota (8) byla přečtena z RAM a zapsána do R1.",
    action: (state) => ({ ...state, registers: { ...state.registers, R1: Number(state.ram[100]) } })
  },
  {
    code: "LOAD R2, [101]",
    decodeText: "Rozluštěno: Načti hodnotu z paměťové adresy 101 a ulož ji do registru R2.",
    executeText: "Hodnota (3) byla přečtena z RAM a zapsána do R2.",
    action: (state) => ({ ...state, registers: { ...state.registers, R2: Number(state.ram[101]) } })
  },
  {
    code: "ADD R3, R1, R2",
    decodeText: "Rozluštěno: Sečti hodnoty v registrech R1 a R2 pomocí ALU, výsledek ulož do R3.",
    executeText: "ALU provedlo součet (8 + 3 = 11). Výsledek je v R3.",
    action: (state) => ({ ...state, registers: { ...state.registers, R3: Number(state.registers.R1) + Number(state.registers.R2) } })
  },
  {
    code: "STORE R3, [102]",
    decodeText: "Rozluštěno: Zapiš hodnotu z registru R3 na paměťovou adresu 102 v RAM.",
    executeText: "Hodnota (11) byla bezpečně uložena do RAM.",
    action: (state) => ({ ...state, ram: { ...state.ram, 102: state.registers.R3! } })
  },
  {
    code: "MUL R4, R1, R2",
    decodeText: "Rozluštěno: Vynásob hodnoty v R1 a R2 pomocí ALU, výsledek ulož do R4.",
    executeText: "ALU provedlo násobení (8 * 3 = 24). Výsledek je v R4.",
    action: (state) => ({ ...state, registers: { ...state.registers, R4: Number(state.registers.R1) * Number(state.registers.R2) } })
  },
  {
    code: "STORE R4, [103]",
    decodeText: "Rozluštěno: Zapiš hodnotu z registru R4 na paměťovou adresu 103 v RAM.",
    executeText: "Hodnota (24) byla uložena do RAM.",
    action: (state) => ({ ...state, ram: { ...state.ram, 103: state.registers.R4! } })
  },
  {
    code: "SUB R5, R1, R2",
    decodeText: "Rozluštěno: Odečti hodnotu R2 od R1 pomocí ALU, výsledek ulož do R5.",
    executeText: "ALU provedlo odčítání (8 - 3 = 5). Výsledek je v R5.",
    action: (state) => ({ ...state, registers: { ...state.registers, R5: Number(state.registers.R1) - Number(state.registers.R2) } })
  },
  {
    code: "STORE R5, [104]",
    decodeText: "Rozluštěno: Zapiš hodnotu z registru R5 na paměťovou adresu 104 v RAM.",
    executeText: "Hodnota (5) byla uložena do RAM.",
    action: (state) => ({ ...state, ram: { ...state.ram, 104: state.registers.R5! } })
  },
  {
    code: "HALT",
    decodeText: "Rozluštěno: Ukonči program.",
    executeText: "Program úspěšně skončil.",
    action: (state) => state
  }
];

const INITIAL_STATE: CpuState = {
  pc: 0,
  ir: '---',
  registers: { R1: null, R2: null, R3: null, R4: null, R5: null },
  ram: {
    100: 8,
    101: 3,
    102: '?',
    103: '?',
    104: '?'
  }
};

const CpuCycleGame: React.FC<CpuCycleGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('fetch');
  const [cpuState, setCpuState] = useState<CpuState>(INITIAL_STATE);
  const [message, setMessage] = useState<string>('Připraven! Klikni na FETCH pro načtení první instrukce.');

  const handleFetch = () => {
    if (phase !== 'fetch') return;
    
    if (cpuState.pc >= PROGRAM.length) {
      setPhase('halt');
      setMessage('Program je již na konci (Mimo paměť).');
      return;
    }

    const inst = PROGRAM[cpuState.pc];
    setCpuState(prev => ({
      ...prev,
      ir: inst.code
    }));
    setPhase('decode');
    setMessage(`[FETCH] Instrukce načtena z adresy ${cpuState.pc} do Instruction Registeru (IR).`);
  };

  const handleDecode = () => {
    if (phase !== 'decode') return;
    const inst = PROGRAM[cpuState.pc];
    setMessage(`[DECODE] ${inst.decodeText}`);
    setPhase('execute');
  };

  const handleExecute = () => {
    if (phase !== 'execute') return;
    const inst = PROGRAM[cpuState.pc];
    
    // Perform action
    setCpuState(prev => {
      let newState = inst.action(prev);
      // Increment PC after execution
      newState.pc = newState.pc + 1;
      return newState;
    });

    setMessage(`[EXECUTE] ${inst.executeText}`);
    
    if (inst.code === 'HALT') {
      setPhase('halt');
    } else {
      setPhase('fetch');
    }
  };

  const resetGame = () => {
    setCpuState(INITIAL_STATE);
    setPhase('fetch');
    setMessage('Simulátor resetován. Klikni na FETCH pro start.');
  };

  return (
    <div className="max-w-7xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-rose-900 uppercase tracking-tight">Vnitřní cyklus CPU</h2>
        <div className="w-24"></div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* L: RAM & Source Code */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Source Code */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-100 overflow-hidden flex flex-col">
            <div className="bg-indigo-600 text-white px-3 py-2 font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
              <Code className="w-4 h-4" /> Zdrojový kód (Python)
            </div>
            <div className="p-3 font-mono text-xs leading-5 bg-indigo-50 text-indigo-900 border-b-2 border-indigo-100">
              a = 8<br/>
              b = 3<br/>
              soucet = a + b<br/>
              nasobek = a * b<br/>
              rozdil = a - b
            </div>
            <div className="bg-indigo-100 p-1 text-[10px] text-indigo-700 font-bold text-center">
              ↓ Překladač ↓
            </div>
          </div>

          {/* Program Code in RAM */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-gray-700 text-white px-3 py-2 font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
              <Database className="w-4 h-4" /> RAM (Sekce Kód)
            </div>
            <div className="p-2 font-mono text-xs flex-1 bg-gray-50 overflow-y-auto">
              {PROGRAM.map((inst, idx) => (
                <div key={idx} className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all ${idx === cpuState.pc ? 'bg-rose-100 text-rose-900 font-bold border-2 border-rose-400 shadow-sm scale-105' : 'text-gray-600 border-2 border-transparent'}`}>
                  <span className="text-gray-400 w-4">{idx}</span>
                  <span>{inst.code}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data in RAM */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 overflow-hidden flex flex-col">
            <div className="bg-emerald-600 text-white px-3 py-2 font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
              <Database className="w-4 h-4" /> RAM (Sekce Data)
            </div>
            <div className="p-3 font-mono text-xs flex-1 bg-gray-50 flex flex-col gap-2">
              {Object.entries(cpuState.ram).map(([addr, val]) => (
                <div key={addr} className="bg-white border border-emerald-200 p-2 rounded-lg flex justify-between items-center shadow-sm">
                  <span className="font-bold text-gray-500">Adresa {addr}</span>
                  <span className={`font-black px-2 py-0.5 rounded-md ${val === '?' ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-800'}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* R: CPU Core */}
        <div className="lg:col-span-9 bg-white rounded-3xl shadow-xl border-4 border-rose-100 flex flex-col overflow-hidden relative">
          <div className="bg-rose-600 text-white px-4 py-3 font-bold uppercase tracking-wider flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5" /> Jádro Procesoru (CPU)
            </div>
            <div className="text-xs opacity-80 flex items-center gap-2">
               <span>Průběh cyklu:</span>
               <span className={`px-2 py-1 rounded bg-white/20 ${phase === 'fetch' ? 'font-black ring-2 ring-white' : ''}`}>1. Fetch</span>
               <span className={`px-2 py-1 rounded bg-white/20 ${phase === 'decode' ? 'font-black ring-2 ring-white' : ''}`}>2. Decode</span>
               <span className={`px-2 py-1 rounded bg-white/20 ${phase === 'execute' ? 'font-black ring-2 ring-white' : ''}`}>3. Execute</span>
            </div>
          </div>
          
          <div className="p-6 flex flex-col gap-4 flex-1 bg-gray-50 justify-between">
            
            {/* Top row: CU and Registers */}
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Control Unit */}
              <div className="flex-1 bg-white border-2 border-rose-200 rounded-2xl p-4 shadow-sm flex flex-col">
                <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-3 text-center">Řídicí jednotka (CU)</h4>
                <div className="flex gap-4 h-full">
                  <div className="flex-[1] bg-gray-100 rounded-xl p-2 text-center border-2 border-gray-200 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Program Counter</div>
                    <div className="text-2xl font-mono font-black text-rose-600">{cpuState.pc}</div>
                  </div>
                  <div className="flex-[2] bg-gray-100 rounded-xl p-2 text-center border-2 border-gray-200 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Instruction Reg. (IR)</div>
                    <div className="text-lg font-mono font-bold text-indigo-700">{cpuState.ir}</div>
                  </div>
                </div>
              </div>

              {/* Data Registers */}
              <div className="flex-[1.5] bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm flex flex-col">
                <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-3 text-center">Datové Registry</h4>
                <div className="grid grid-cols-5 gap-2 h-full">
                  {Object.entries(cpuState.registers).map(([reg, val]) => (
                     <div key={reg} className={`rounded-xl p-2 text-center flex flex-col items-center justify-center transition-all ${val !== null ? 'bg-blue-100 border-2 border-blue-300' : 'bg-blue-50 border border-blue-100'}`}>
                       <span className="text-[10px] font-bold text-blue-400">{reg}</span>
                       <span className={`font-mono font-black text-lg ${val !== null ? 'text-blue-900' : 'text-blue-200'}`}>{val === null ? '-' : val}</span>
                     </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ALU (Arithmetic Logic Unit) */}
            <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 shadow-sm flex items-center gap-6">
              <div className="bg-amber-100 p-3 rounded-full border-2 border-amber-300">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h4 className="font-black text-amber-800 uppercase tracking-widest text-sm">ALU (Aritmeticko-logická jednotka)</h4>
                <p className="text-gray-500 text-xs mt-1">Provádí matematické operace (ADD, SUB, MUL). Data bere z registrů a výsledek ukládá zpět.</p>
              </div>
            </div>

            {/* Message Board (Moved down near buttons) */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 shadow-inner flex items-start gap-4">
              <Info className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-indigo-900 text-sm mb-1 uppercase tracking-wider">Aktuální dění v procesoru:</h4>
                <p className="text-indigo-800 font-medium text-lg leading-snug">
                  {message}
                </p>
              </div>
            </div>

            {/* Action Buttons (The Cycle) */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <button 
                onClick={handleFetch}
                disabled={phase !== 'fetch'}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-4 transition-all duration-300 ${phase === 'fetch' ? 'bg-emerald-50 border-emerald-400 hover:scale-105 active:scale-95 shadow-md cursor-pointer' : 'bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed'}`}
              >
                <MemoryStick className={`w-6 h-6 ${phase === 'fetch' ? 'text-emerald-500 animate-bounce' : 'text-gray-400'}`} />
                <h3 className={`font-black uppercase tracking-wider text-sm ${phase === 'fetch' ? 'text-emerald-800' : 'text-gray-400'}`}>1. FETCH</h3>
              </button>

              <button 
                onClick={handleDecode}
                disabled={phase !== 'decode'}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-4 transition-all duration-300 ${phase === 'decode' ? 'bg-blue-50 border-blue-400 hover:scale-105 active:scale-95 shadow-md cursor-pointer' : 'bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed'}`}
              >
                <Cpu className={`w-6 h-6 ${phase === 'decode' ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
                <h3 className={`font-black uppercase tracking-wider text-sm ${phase === 'decode' ? 'text-blue-800' : 'text-gray-400'}`}>2. DECODE</h3>
              </button>

              <button 
                onClick={handleExecute}
                disabled={phase !== 'execute'}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-4 transition-all duration-300 ${phase === 'execute' ? 'bg-amber-50 border-amber-400 hover:scale-105 active:scale-95 shadow-md cursor-pointer' : 'bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed'}`}
              >
                <Zap className={`w-6 h-6 ${phase === 'execute' ? 'text-amber-500 animate-pulse' : 'text-gray-400'}`} />
                <h3 className={`font-black uppercase tracking-wider text-sm ${phase === 'execute' ? 'text-amber-800' : 'text-gray-400'}`}>3. EXECUTE</h3>
              </button>
            </div>

            {phase === 'halt' && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in">
                <h2 className="text-5xl font-black text-rose-600 uppercase tracking-widest mb-4 shadow-white drop-shadow-md">HALT</h2>
                <p className="text-xl text-gray-700 font-bold mb-8 text-center max-w-md">Všechny instrukce byly úspěšně vykonány.<br/>CPU dokončilo svou práci.</p>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95 uppercase tracking-wider text-lg"
                >
                  <RotateCcw className="w-6 h-6" /> Začít znovu
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default CpuCycleGame;
