import React from 'react';
import { ArrowLeft, Code, FolderOpen, Terminal } from 'lucide-react';

interface Programovani2MenuProps {
  onBack: () => void;
  onStartPythonBasics: () => void;
  onStartPythonVariables: () => void;
  onStartPythonProgram: () => void;
  onStartPythonOutputs: () => void;
  onStartPythonDrawing: () => void;
  onStartPythonColors: () => void;
  onStartPythonVariablesDrawing: () => void;
  onStartPythonSubroutines: () => void;
  onStartPythonRandom: () => void;
  onStartPythonText: () => void;
  onStartPythonLoop: () => void;
  onStartPythonLoopVar: () => void;
  onStartPythonExpressions: () => void;
  onStartPythonOvals: () => void;
  onStartPythonCirclesLoops: () => void;
  onStartPythonConditions: () => void;
  onStartPythonBranching: () => void;
  onStartPythonNestedBranching: () => void;
  onStartPythonFunctionsArgs: () => void;
  onStartPythonMouseDrawing: () => void;
}

const Programovani2Menu: React.FC<Programovani2MenuProps> = ({ onBack, onStartPythonBasics, onStartPythonVariables, onStartPythonProgram, onStartPythonOutputs, onStartPythonDrawing, onStartPythonColors, onStartPythonVariablesDrawing, onStartPythonSubroutines, onStartPythonRandom, onStartPythonText, onStartPythonLoop, onStartPythonLoopVar, onStartPythonExpressions, onStartPythonOvals, onStartPythonCirclesLoops, onStartPythonConditions, onStartPythonBranching, onStartPythonNestedBranching, onStartPythonFunctionsArgs, onStartPythonMouseDrawing }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center relative overflow-hidden">
        
        {/* Dekorační prvky na pozadí */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-200">
            <Code className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase relative z-10">
          Programování a vývoj her 2
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium relative z-10">
          Modul vycházející z výukových materiálů iMyšlení (projekt PRIM), © Jihočeská univerzita v Českých Budějovicích.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
          
          {/* Python základy */}
          <div className="relative group p-6 bg-amber-50/50 rounded-3xl border-2 border-amber-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-amber-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-amber-50 transition-colors">#py1</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-amber-700 mb-1 uppercase tracking-wider text-sm">Python Výpisy a výrazy</h3>
              <p className="text-xs text-gray-600">Interaktivní konzole, matematické výpočty, priority operací a chybová hlášení.</p>
            </div>
            <button
              onClick={onStartPythonBasics}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 1
            </button>
          </div>

          {/* Python proměnné */}
          <div className="relative group p-6 bg-orange-50/50 rounded-3xl border-2 border-orange-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-orange-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-orange-50 transition-colors">#py2</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-orange-700 mb-1 uppercase tracking-wider text-sm">Python Proměnné</h3>
              <p className="text-xs text-gray-600">Krabičky v paměti, operace a práce s proměnnými.</p>
            </div>
            <button
              onClick={onStartPythonVariables}
              className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 2
            </button>
          </div>

          {/* Python programy a výpisy */}
          <div className="relative group p-6 bg-rose-50/50 rounded-3xl border-2 border-rose-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-rose-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-rose-50 transition-colors">#py3</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-rose-700 mb-1 uppercase tracking-wider text-sm">První Program</h3>
              <p className="text-xs text-gray-600">Příkaz print, psaní prvních skriptů, ukládání souborů a textové obrázky.</p>
            </div>
            <button
              onClick={onStartPythonProgram}
              className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 3
            </button>
          </div>

          {/* Python Kombinace */}
          <div className="relative group p-6 bg-purple-50/50 rounded-3xl border-2 border-purple-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-purple-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-purple-50 transition-colors">#py4</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-purple-700 mb-1 uppercase tracking-wider text-sm">Proměnné a výpisy</h3>
              <p className="text-xs text-gray-600">Kombinování textu s proměnnými, matematické vzorce a formátování.</p>
            </div>
            <button
              onClick={onStartPythonOutputs}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 4
            </button>
          </div>

          {/* Python Kreslení */}
          <div className="relative group p-6 bg-sky-50/50 rounded-3xl border-2 border-sky-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-sky-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-sky-50 transition-colors">#py5</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-sky-700 mb-1 uppercase tracking-wider text-sm">Kreslení v Tkinter</h3>
              <p className="text-xs text-gray-600">Grafické plátno, kreslení tvarů a souřadnicový systém počítače.</p>
            </div>
            <button
              onClick={onStartPythonDrawing}
              className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 5
            </button>
          </div>

          {/* Python Barvy */}
          <div className="relative group p-6 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-emerald-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-emerald-50 transition-colors">#py6</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-emerald-700 mb-1 uppercase tracking-wider text-sm">Barvy a Vlajky</h3>
              <p className="text-xs text-gray-600">Vybarvování tvarů, kreslení státních vlajek a překrývání vrstev.</p>
            </div>
            <button
              onClick={onStartPythonColors}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 6
            </button>
          </div>

          {/* Python Kreslení s proměnnými */}
          <div className="relative group p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-indigo-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-indigo-50 transition-colors">#py7</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-indigo-700 mb-1 uppercase tracking-wider text-sm">Kreslení s proměnnými</h3>
              <p className="text-xs text-gray-600">Matematika v souřadnicích, posouvání tvarů a hledání středů.</p>
            </div>
            <button
              onClick={onStartPythonVariablesDrawing}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 7
            </button>
          </div>

          {/* Python Podprogramy */}
          <div className="relative group p-6 bg-amber-50/50 rounded-3xl border-2 border-amber-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-amber-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-amber-50 transition-colors">#py8</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-amber-700 mb-1 uppercase tracking-wider text-sm">Podprogramy</h3>
              <p className="text-xs text-gray-600">Vlastní příkazy, skládání funkcí a kreslení složitých obrazců.</p>
            </div>
            <button
              onClick={onStartPythonSubroutines}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 8
            </button>
          </div>

          {/* Python Náhoda */}
          <div className="relative group p-6 bg-fuchsia-50/50 rounded-3xl border-2 border-fuchsia-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-fuchsia-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-fuchsia-50 transition-colors">#py9</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-fuchsia-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-fuchsia-700 mb-1 uppercase tracking-wider text-sm">Náhoda</h3>
              <p className="text-xs text-gray-600">Generování čísel, házení kostkou a náhodné generování obrazců.</p>
            </div>
            <button
              onClick={onStartPythonRandom}
              className="mt-4 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 9
            </button>
          </div>

          {/* Python Kreslení textu */}
          <div className="relative group p-6 bg-cyan-50/50 rounded-3xl border-2 border-cyan-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-cyan-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-cyan-50 transition-colors">#py10</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-cyan-700 mb-1 uppercase tracking-wider text-sm">Kreslení textu</h3>
              <p className="text-xs text-gray-600">Vypisování slov na grafickou plochu a popisky obrazců.</p>
            </div>
            <button
              onClick={onStartPythonText}
              className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 10
            </button>
          </div>

          {/* Python Program s opakováním */}
          <div className="relative group p-6 bg-rose-50/50 rounded-3xl border-2 border-rose-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-rose-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-rose-50 transition-colors">#py11</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-rose-700 mb-1 uppercase tracking-wider text-sm">Program s opakováním</h3>
              <p className="text-xs text-gray-600">Základy for cyklu, opakování příkazů a kreslení tisíců tvarů.</p>
            </div>
            <button
              onClick={onStartPythonLoop}
              className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 11
            </button>
          </div>

          {/* Python Proměnná cyklu */}
          <div className="relative group p-6 bg-violet-50/50 rounded-3xl border-2 border-violet-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-violet-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-violet-50 transition-colors">#py12</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-violet-700 mb-1 uppercase tracking-wider text-sm">Proměnná cyklu</h3>
              <p className="text-xs text-gray-600">Využití čísla kroku 'i' pro posouvání tvarů a pokročilou matematiku.</p>
            </div>
            <button
              onClick={onStartPythonLoopVar}
              className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 12
            </button>
          </div>

          {/* Python Výrazy v cyklu */}
          <div className="relative group p-6 bg-orange-50/50 rounded-3xl border-2 border-orange-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-orange-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-orange-50 transition-colors">#py13</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-orange-700 mb-1 uppercase tracking-wider text-sm">Výrazy v cyklu</h3>
              <p className="text-xs text-gray-600">Postupné přičítání hodnot k proměnné (x = x + 10) a akumulace sumy.</p>
            </div>
            <button
              onClick={onStartPythonExpressions}
              className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 13
            </button>
          </div>

          {/* Python Elipsy a kruhy */}
          <div className="relative group p-6 bg-teal-50/50 rounded-3xl border-2 border-teal-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-teal-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-teal-50 transition-colors">#py14</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-teal-700 mb-1 uppercase tracking-wider text-sm">Elipsy a kruhy</h3>
              <p className="text-xs text-gray-600">Kreslení oblin, kružnic, sněhuláků, stromů a dopravních značek.</p>
            </div>
            <button
              onClick={onStartPythonOvals}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 14
            </button>
          </div>

          {/* Python Kruhy a cykly */}
          <div className="relative group p-6 bg-yellow-50/50 rounded-3xl border-2 border-yellow-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-yellow-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-yellow-50 transition-colors">#py15</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-yellow-700 mb-1 uppercase tracking-wider text-sm">Kruhy a cykly</h3>
              <p className="text-xs text-gray-600">Náhodný výběr `choice`, protnutí elips a kreslení desky a mincí.</p>
            </div>
            <button
              onClick={onStartPythonCirclesLoops}
              className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 15
            </button>
          </div>

          {/* Python Větvení (if/else) */}
          <div className="relative group p-6 bg-red-50/50 rounded-3xl border-2 border-red-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-red-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-red-50 transition-colors">#py16</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-red-700 mb-1 uppercase tracking-wider text-sm">Větvení (if/else)</h3>
              <p className="text-xs text-gray-600">Rozhodování počítače, podmínky a interaktivní chování programu.</p>
            </div>
            <button
              onClick={onStartPythonConditions}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 16
            </button>
          </div>

          {/* Python Větvení a konstrukce */}
          <div className="relative group p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-indigo-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-indigo-50 transition-colors">#py17</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-indigo-700 mb-1 uppercase tracking-wider text-sm">Větvení a konstrukce</h3>
              <p className="text-xs text-gray-600">Rozbočky uvnitř for cyklů pro střídání tvarů a animaci dne a noci.</p>
            </div>
            <button
              onClick={onStartPythonBranching}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 17
            </button>
          </div>

          {/* Python Vnořené větvení */}
          <div className="relative group p-6 bg-pink-50/50 rounded-3xl border-2 border-pink-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-pink-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-pink-50 transition-colors">#py18</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-pink-700 mb-1 uppercase tracking-wider text-sm">Vnořené větvení</h3>
              <p className="text-xs text-gray-600">Podmínky uvnitř podmínek, počítadla a operátory == a !=.</p>
            </div>
            <button
              onClick={onStartPythonNestedBranching}
              className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 18
            </button>
          </div>

          {/* Python Podprogram s parametrem */}
          <div className="relative group p-6 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-emerald-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-emerald-50 transition-colors">#py19</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-emerald-700 mb-1 uppercase tracking-wider text-sm">Parametry funkcí</h3>
              <p className="text-xs text-gray-600">Tajemství v závorkách. Posílání argumentů a interaktivní kvízy.</p>
            </div>
            <button
              onClick={onStartPythonFunctionsArgs}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 19
            </button>
          </div>

          {/* Python Kreslení myší */}
          <div className="relative group p-6 bg-cyan-50/50 rounded-3xl border-2 border-cyan-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-cyan-50 hover:shadow-xl transition-shadow">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-cyan-50 transition-colors">#py20</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-cyan-700 mb-1 uppercase tracking-wider text-sm">Kreslení myší</h3>
              <p className="text-xs text-gray-600">Události z myši (motion, press), Canvas bind a efekt spreje!</p>
            </div>
            <button
              onClick={onStartPythonMouseDrawing}
              className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full"
            >
              Otevřít lekci 20
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Programovani2Menu;
