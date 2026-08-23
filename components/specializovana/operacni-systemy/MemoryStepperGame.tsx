import React, { useState } from 'react';
import { ArrowLeft, Cpu, Database, ChevronRight, SkipForward, RotateCcw, Settings2 } from 'lucide-react';

interface MemoryStepperGameProps {
  onBack: () => void;
}

interface CodeLine {
  line: number;
  text: string;
}

interface ProgramStep {
  lineIndex: number;
  pcOffset: number;
  explanation: string;
  stackChange?: { action: 'push' | 'pop' | 'update'; item: string; value?: string | number };
  heapChange?: { action: 'alloc' | 'free' | 'update'; idOffset: number; value: string };
  dataChange?: { action: 'set'; name: string; value: string };
}

interface ProgramDef {
  name: string;
  codeLines: CodeLine[];
  steps: ProgramStep[];
}

const PROG_NO_DYNAMIC: ProgramDef = {
  name: 'Základní funkce (volání a skok PC)',
  codeLines: [
    { line: 1, text: "def Nasobeni():" },
    { line: 2, text: "    x = 3" },
    { line: 3, text: "    y = 4" },
    { line: 4, text: "    vysledek = x * y" },
    { line: 5, text: "    return vysledek" },
    { line: 6, text: "" },
    { line: 7, text: "a = 5" },
    { line: 8, text: "b = 10" },
    { line: 9, text: "soucet = a + b" },
    { line: 10, text: "nasobek = Nasobeni()" },
    { line: 11, text: "konec()" }
  ],
  steps: [
    { lineIndex: 6, pcOffset: 7, explanation: "Inicializace globální proměnné 'a'. (Hlavní program)", dataChange: { action: 'set', name: 'a', value: '5' } },
    { lineIndex: 7, pcOffset: 8, explanation: "Inicializace globální proměnné 'b'.", dataChange: { action: 'set', name: 'b', value: '10' } },
    { lineIndex: 8, pcOffset: 9, explanation: "Sečtení čísel v hlavním programu.", dataChange: { action: 'set', name: 'soucet', value: '15' } },
    { lineIndex: 9, pcOffset: 10, explanation: "Příprava na volání funkce. Vytváří se nový rámec (Stack Frame).", stackChange: { action: 'push', item: 'Rámec: Nasobeni()', value: 'Návrat: řádek 10' } },
    { lineIndex: 0, pcOffset: 1, explanation: "PC SKÁČE DO FUNKCE! Procesor začíná číst instrukce funkce Nasobeni()." },
    { lineIndex: 1, pcOffset: 2, explanation: "Lokální proměnná 'x' uložena na zásobník.", stackChange: { action: 'update', item: 'x', value: '3' } },
    { lineIndex: 2, pcOffset: 3, explanation: "Lokální proměnná 'y' uložena na zásobník.", stackChange: { action: 'update', item: 'y', value: '4' } },
    { lineIndex: 3, pcOffset: 4, explanation: "Provedení násobení přes ALU. Výsledek uložen lokálně.", stackChange: { action: 'update', item: 'vysledek', value: '12' } },
    { lineIndex: 4, pcOffset: 5, explanation: "Konec funkce. Odstraňuje se celý dočasný rámec ze zásobníku.", stackChange: { action: 'pop', item: '' } },
    { lineIndex: 9, pcOffset: 10, explanation: "Návrat zpět do hlavního programu! Výsledek násobení se uloží.", dataChange: { action: 'set', name: 'nasobek', value: '12' } },
    { lineIndex: 10, pcOffset: 11, explanation: "Konec programu." }
  ]
};

const PROG_DYNAMIC: ProgramDef = {
  name: 'Práce s dynamickou pamětí (Pole)',
  codeLines: [
    { line: 1, text: "def ZpracujData():" },
    { line: 2, text: "    pole = alokuj_pole(2)" },
    { line: 3, text: "    pole[0] = 5" },
    { line: 4, text: "    pole[1] = 6" },
    { line: 5, text: "    vys = pole[0] * pole[1]" },
    { line: 6, text: "    uvolni_pole(pole)" },
    { line: 7, text: "    return vys" },
    { line: 8, text: "" },
    { line: 9, text: "c = 20" },
    { line: 10, text: "d = 8" },
    { line: 11, text: "rozdil = c - d" },
    { line: 12, text: "vysledek = ZpracujData()" },
    { line: 13, text: "konec()" }
  ],
  steps: [
    { lineIndex: 8, pcOffset: 9, explanation: "Inicializace globální proměnné 'c'. (Hlavní program)", dataChange: { action: 'set', name: 'c', value: '20' } },
    { lineIndex: 9, pcOffset: 10, explanation: "Inicializace globální proměnné 'd'.", dataChange: { action: 'set', name: 'd', value: '8' } },
    { lineIndex: 10, pcOffset: 11, explanation: "Odečtení čísel v hlavním programu.", dataChange: { action: 'set', name: 'rozdil', value: '12' } },
    { lineIndex: 11, pcOffset: 12, explanation: "Volání funkce ZpracujData(). Vytváří se nový Stack Frame.", stackChange: { action: 'push', item: 'Rámec: ZpracujData()', value: 'Návrat: řádek 12' } },
    { lineIndex: 0, pcOffset: 1, explanation: "PC SKÁČE DO FUNKCE! Čtení deklarace funkce." },
    { lineIndex: 1, pcOffset: 2, explanation: "Alokuje se dynamické pole o 2 prvcích na Haldě. Zásobník drží pouze jeho paměťovou adresu.", heapChange: { action: 'alloc', idOffset: 512, value: 'pole = [?, ?]' }, stackChange: { action: 'update', item: 'pole', value: 512 } },
    { lineIndex: 2, pcOffset: 3, explanation: "Zápis čísla 5 do prvního indexu pole přímo v Haldě.", heapChange: { action: 'update', idOffset: 512, value: 'pole = [5, ?]' } },
    { lineIndex: 3, pcOffset: 4, explanation: "Zápis čísla 6 do druhého indexu pole na Haldě.", heapChange: { action: 'update', idOffset: 512, value: 'pole = [5, 6]' } },
    { lineIndex: 4, pcOffset: 5, explanation: "Přečtení hodnot z Haldy, jejich vynásobení a uložení lokální proměnné 'vys' na Zásobník.", stackChange: { action: 'update', item: 'vys', value: '30' } },
    { lineIndex: 5, pcOffset: 6, explanation: "Dealokace (uvolnění) pole z Haldy (aby nedošlo k memory leaku).", heapChange: { action: 'free', idOffset: 512, value: '' } },
    { lineIndex: 6, pcOffset: 7, explanation: "Konec funkce. Odstraňuji celý rámec ze zásobníku.", stackChange: { action: 'pop', item: '' } },
    { lineIndex: 11, pcOffset: 12, explanation: "Návrat do hlavního programu. Uložení vrácené hodnoty jako globální proměnné.", dataChange: { action: 'set', name: 'vysledek', value: '30' } },
    { lineIndex: 12, pcOffset: 13, explanation: "Konec programu." }
  ]
};

const PROGRAMS = [PROG_NO_DYNAMIC, PROG_DYNAMIC];

const MemoryStepperGame: React.FC<MemoryStepperGameProps> = ({ onBack }) => {
  const [selectedProgramIdx, setSelectedProgramIdx] = useState(0);
  const [addressFormat, setAddressFormat] = useState<'hex' | 'dec'>('dec');

  const [currentStep, setCurrentStep] = useState(0);
  const [dataSegment, setDataSegment] = useState<{ [key: string]: string }>({});
  const [heapSegment, setHeapSegment] = useState<{ idOffset: number, value: string }[]>([]);
  const [stackSegment, setStackSegment] = useState<{ name: string, value: string, isFrame: boolean }[]>([]);

  const program = PROGRAMS[selectedProgramIdx];

  const formatAddress = (offset: number) => {
    if (addressFormat === 'hex') {
      return `0x${offset.toString(16).padStart(4, '0').toUpperCase()}`;
    } else {
      return offset.toString();
    }
  };

  const handleNextStep = () => {
    if (currentStep >= program.steps.length) return;

    const step = program.steps[currentStep];

    if (step.dataChange) {
      setDataSegment(prev => ({ ...prev, [step.dataChange!.name]: step.dataChange!.value }));
    }

    if (step.heapChange) {
      if (step.heapChange.action === 'alloc') {
        setHeapSegment(prev => [...prev, { idOffset: step.heapChange!.idOffset, value: step.heapChange!.value }]);
      } else if (step.heapChange.action === 'free') {
        setHeapSegment(prev => prev.filter(item => item.idOffset !== step.heapChange!.idOffset));
      } else if (step.heapChange.action === 'update') {
        setHeapSegment(prev => prev.map(item => item.idOffset === step.heapChange!.idOffset ? { ...item, value: step.heapChange!.value } : item));
      }
    }

    if (step.stackChange) {
      let finalValue = '';
      if (step.stackChange.value !== undefined) {
        if (typeof step.stackChange.value === 'number') {
          finalValue = formatAddress(step.stackChange.value);
        } else {
          finalValue = step.stackChange.value;
        }
      }

      if (step.stackChange.action === 'push') {
        setStackSegment(prev => [...prev, { name: step.stackChange!.item, value: finalValue, isFrame: true }]);
      } else if (step.stackChange.action === 'update') {
        setStackSegment(prev => [...prev, { name: step.stackChange!.item, value: finalValue, isFrame: false }]);
      } else if (step.stackChange.action === 'pop') {
        setStackSegment(prev => {
          const newStack = [...prev];
          while (newStack.length > 0) {
            const popped = newStack.pop();
            if (popped?.isFrame) break;
          }
          return newStack;
        });
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setDataSegment({});
    setHeapSegment([]);
    setStackSegment([]);
  };

  const handleProgramChange = (idx: number) => {
    setSelectedProgramIdx(idx);
    setCurrentStep(0);
    setDataSegment({});
    setHeapSegment([]);
    setStackSegment([]);
  };

  const isFinished = currentStep >= program.steps.length;
  const currentHighlightIndex = isFinished ? -1 : program.steps[currentStep].lineIndex;

  return (
    <div className="max-w-7xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">CPU & RAM Krokovač</h2>
        <div className="w-24"></div>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-md border-2 border-indigo-50 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-gray-500 uppercase tracking-wider">Program:</span>
          <select 
            className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={selectedProgramIdx}
            onChange={(e) => handleProgramChange(Number(e.target.value))}
          >
            {PROGRAMS.map((p, idx) => (
              <option key={idx} value={idx}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <Settings2 className="w-5 h-5 text-gray-400" />
          <span className="font-bold text-sm text-gray-500 uppercase tracking-wider">Adresy v paměti:</span>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setAddressFormat('dec')}
              className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${addressFormat === 'dec' ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              DEC (1, 2, 3)
            </button>
            <button
              onClick={() => setAddressFormat('hex')}
              className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${addressFormat === 'hex' ? 'bg-white shadow text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              HEX (0x0001)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* L: Code */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-indigo-100 overflow-hidden flex flex-col h-full">
          <div className="bg-indigo-600 text-white p-4 font-bold uppercase tracking-wider flex items-center gap-2">
            <ChevronRight className="w-5 h-5" /> Pseudokód
          </div>
          <div className="p-6 font-mono text-sm leading-8 flex-1 bg-gray-50 relative">
            {program.codeLines.map((cLine, index) => {
              const isHighlighted = index === currentHighlightIndex;
              return (
                <div 
                  key={index} 
                  className={`px-3 py-1 my-1 rounded-lg transition-all duration-300 flex items-center gap-4 whitespace-pre ${isHighlighted ? 'bg-indigo-200 text-indigo-900 font-bold border-l-4 border-indigo-600 shadow-sm scale-105 ml-2' : 'text-gray-600'}`}
                >
                  <span className="text-xs opacity-50 w-4">{cLine.line}</span>
                  <span>{cLine.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* M: CPU */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-100 flex flex-col overflow-hidden h-full">
          <div className="bg-rose-600 text-white p-4 font-bold uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5" /> Procesor (CPU)
          </div>
          <div className="p-8 flex flex-col items-center flex-1 justify-center relative bg-white">
            <div className="w-48 h-48 bg-gray-100 rounded-[2rem] border-8 border-gray-300 shadow-inner flex flex-col items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105">
              <span className="text-gray-400 font-black text-xs uppercase tracking-widest mb-2">Instrukční ukazatel</span>
              <span className="text-gray-400 font-black text-xl uppercase tracking-widest mb-1">PC</span>
              <span className="text-3xl font-mono font-bold text-rose-600">
                {isFinished ? (addressFormat === 'hex' ? '0xFFFF' : '65535') : formatAddress(program.steps[currentStep].pcOffset)}
              </span>
            </div>
            
            <div className="mt-8 bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl w-full text-center min-h-[140px] flex items-center justify-center">
              <p className="text-gray-800 font-medium text-lg leading-relaxed">
                {isFinished ? "Program byl úspěšně dokončen." : program.steps[currentStep].explanation}
              </p>
            </div>

            <div className="mt-8 flex gap-4 w-full">
              {!isFinished ? (
                <button
                  onClick={handleNextStep}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-lg"
                >
                  <SkipForward className="w-6 h-6" /> Vykonat instrukci
                </button>
              ) : (
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-5 bg-gray-600 hover:bg-gray-700 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-lg"
                >
                  <RotateCcw className="w-6 h-6" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* R: RAM */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-emerald-100 flex flex-col overflow-hidden h-[700px]">
          <div className="bg-emerald-600 text-white p-4 font-bold uppercase tracking-wider flex items-center gap-2">
            <Database className="w-5 h-5" /> Paměť (RAM)
          </div>
          <div className="p-4 flex-1 flex flex-col gap-4 font-mono text-sm bg-gray-50 h-full overflow-hidden">
            
            {/* STACK */}
            <div className="flex-1 border-2 border-orange-200 bg-orange-50/50 rounded-2xl flex flex-col overflow-hidden shadow-sm h-1/3">
              <div className="bg-orange-200/50 px-3 py-2 font-bold text-orange-800 text-xs text-center border-b-2 border-orange-200 uppercase tracking-widest flex justify-between items-center">
                <span>Zásobník (Stack)</span>
                <span>↓</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto">
                {stackSegment.length === 0 && <div className="text-center text-orange-300 py-4 italic text-xs">Zásobník je prázdný</div>}
                {stackSegment.map((item, i) => (
                  <div key={i} className={`p-2 rounded-lg border-2 transition-all duration-500 animate-in fade-in slide-in-from-top-2 ${item.isFrame ? 'bg-orange-500 border-orange-600 text-white shadow-md mt-2' : 'bg-white border-orange-200 text-gray-700 flex justify-between items-center ml-4'}`}>
                    {item.isFrame ? (
                      <div className="flex flex-col w-full text-center">
                        <span className="font-bold text-sm">{item.name}</span>
                        {item.value && <span className="text-orange-200 text-xs mt-1">{item.value}</span>}
                      </div>
                    ) : (
                      <>
                        <span className="font-bold">{item.name}</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-bold">{item.value}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* HEAP */}
            <div className="flex-1 border-2 border-green-200 bg-green-50/50 rounded-2xl flex flex-col overflow-hidden shadow-sm h-1/4">
              <div className="bg-green-200/50 px-3 py-2 font-bold text-green-800 text-xs text-center border-b-2 border-green-200 uppercase tracking-widest flex justify-between items-center">
                <span>Halda (Heap)</span>
                <span>↑</span>
              </div>
              <div className="flex-1 p-2 flex flex-col justify-end gap-1 overflow-y-auto">
                {heapSegment.length === 0 && <div className="text-center text-green-300 py-4 italic text-xs">Halda je prázdná</div>}
                {heapSegment.map((item, i) => (
                  <div key={i} className="bg-white border-2 border-green-300 text-gray-700 p-2 rounded-lg flex justify-between items-center animate-in fade-in slide-in-from-bottom-2">
                    <span className="font-bold text-gray-400">{formatAddress(item.idOffset)}</span>
                    <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DATA */}
            <div className="border-2 border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col overflow-hidden shadow-sm min-h-[100px]">
              <div className="bg-blue-200/50 px-3 py-2 font-bold text-blue-800 text-xs text-center border-b-2 border-blue-200 uppercase tracking-widest">
                Data (BSS)
              </div>
              <div className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto">
                {Object.keys(dataSegment).length === 0 && <div className="text-center text-blue-300 py-2 italic text-xs">Žádná globální data</div>}
                {Object.entries(dataSegment).map(([key, val]) => (
                  <div key={key} className="bg-white border-2 border-blue-200 text-gray-700 p-2 rounded-lg flex justify-between items-center animate-in fade-in zoom-in">
                    <span className="font-bold">{key}</span>
                    <span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TEXT */}
            <div className="min-h-[40px] border-2 border-gray-300 bg-gray-200 rounded-xl flex items-center justify-center shadow-sm">
               <span className="font-bold text-gray-500 text-xs uppercase tracking-widest">Text (Kód) - Read Only</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MemoryStepperGame;
