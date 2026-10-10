import React from 'react';
import { ArrowLeft, Code, FolderOpen, Terminal } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

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

const Programovani2Menu: React.FC<Programovani2MenuProps> = ({
  onBack,
  onStartPythonBasics,
  onStartPythonVariables,
  onStartPythonProgram,
  onStartPythonOutputs,
  onStartPythonDrawing,
  onStartPythonColors,
  onStartPythonVariablesDrawing,
  onStartPythonSubroutines,
  onStartPythonRandom,
  onStartPythonText,
  onStartPythonLoop,
  onStartPythonLoopVar,
  onStartPythonExpressions,
  onStartPythonOvals,
  onStartPythonCirclesLoops,
  onStartPythonConditions,
  onStartPythonBranching,
  onStartPythonNestedBranching,
  onStartPythonFunctionsArgs,
  onStartPythonMouseDrawing
}) => {
  const lessons = [
    { tag: 'py1', title: 'Python Výpisy a výrazy', desc: 'Interaktivní konzole, matematické výpočty, priority operací a chybová hlášení.', icon: Terminal, gradient: 'from-amber-500 to-orange-500', action: onStartPythonBasics, n: 1 },
    { tag: 'py2', title: 'Python Proměnné', desc: 'Krabičky v paměti, operace a práce s proměnnými.', icon: FolderOpen, gradient: 'from-orange-500 to-amber-600', action: onStartPythonVariables, n: 2 },
    { tag: 'py3', title: 'První Program', desc: 'Příkaz print, psaní prvních skriptů, ukládání souborů a textové obrázky.', icon: Code, gradient: 'from-rose-500 to-pink-600', action: onStartPythonProgram, n: 3 },
    { tag: 'py4', title: 'Proměnné a výpisy', desc: 'Kombinování textu s proměnnými, matematické vzorce a formátování.', icon: Code, gradient: 'from-purple-500 to-indigo-600', action: onStartPythonOutputs, n: 4 },
    { tag: 'py5', title: 'Kreslení v Tkinter', desc: 'Grafické plátno, kreslení tvarů a souřadnicový systém počítače.', icon: FolderOpen, gradient: 'from-sky-500 to-blue-600', action: onStartPythonDrawing, n: 5 },
    { tag: 'py6', title: 'Barvy a Vlajky', desc: 'Vybarvování tvarů, kreslení státních vlajek a překrývání vrstev.', icon: FolderOpen, gradient: 'from-emerald-500 to-teal-600', action: onStartPythonColors, n: 6 },
    { tag: 'py7', title: 'Kreslení s proměnnými', desc: 'Matematika v souřadnicích, posouvání tvarů a hledání středů.', icon: Code, gradient: 'from-indigo-500 to-violet-600', action: onStartPythonVariablesDrawing, n: 7 },
    { tag: 'py8', title: 'Podprogramy', desc: 'Vlastní příkazy, skládání funkcí a kreslení složitých obrazců.', icon: Code, gradient: 'from-amber-500 to-yellow-600', action: onStartPythonSubroutines, n: 8 },
    { tag: 'py9', title: 'Náhoda', desc: 'Generování čísel, házení kostkou a náhodné generování obrazců.', icon: Code, gradient: 'from-fuchsia-500 to-pink-600', action: onStartPythonRandom, n: 9 },
    { tag: 'py10', title: 'Kreslení textu', desc: 'Vypisování slov na grafickou plochu a popisky obrazců.', icon: Code, gradient: 'from-cyan-500 to-teal-600', action: onStartPythonText, n: 10 },
    { tag: 'py11', title: 'Program s opakováním', desc: 'Základy for cyklu, opakování příkazů a kreslení tisíců tvarů.', icon: Code, gradient: 'from-rose-500 to-red-600', action: onStartPythonLoop, n: 11 },
    { tag: 'py12', title: 'Proměnná cyklu', desc: 'Využití čísla kroku \'i\' pro posouvání tvarů a pokročilou matematiku.', icon: Code, gradient: 'from-violet-500 to-purple-600', action: onStartPythonLoopVar, n: 12 },
    { tag: 'py13', title: 'Výrazy v cyklu', desc: 'Postupné přičítání hodnot k proměnné (x = x + 10) a akumulace sumy.', icon: Code, gradient: 'from-orange-500 to-amber-600', action: onStartPythonExpressions, n: 13 },
    { tag: 'py14', title: 'Elipsy a kruhy', desc: 'Kreslení oblin, kružnic, sněhuláků, stromů a dopravních značek.', icon: Code, gradient: 'from-teal-500 to-emerald-600', action: onStartPythonOvals, n: 14 },
    { tag: 'py15', title: 'Kruhy a cykly', desc: 'Náhodný výběr choice, protnutí elips a kreslení desky a mincí.', icon: Code, gradient: 'from-yellow-500 to-amber-600', action: onStartPythonCirclesLoops, n: 15 },
    { tag: 'py16', title: 'Větvení (if/else)', desc: 'Rozhodování počítače, podmínky a interaktivní chování programu.', icon: Code, gradient: 'from-red-500 to-rose-600', action: onStartPythonConditions, n: 16 },
    { tag: 'py17', title: 'Větvení a konstrukce', desc: 'Rozbočky uvnitř for cyklů pro střídání tvarů a animaci dne a noci.', icon: Code, gradient: 'from-indigo-500 to-blue-600', action: onStartPythonBranching, n: 17 },
    { tag: 'py18', title: 'Vnořené větvení', desc: 'Podmínky uvnitř podmínek, počítadla a operátory == a !=.', icon: Code, gradient: 'from-pink-500 to-rose-600', action: onStartPythonNestedBranching, n: 18 },
    { tag: 'py19', title: 'Parametry funkcí', desc: 'Tajemství v závorkách. Posílání argumentů a interaktivní kvízy.', icon: Code, gradient: 'from-emerald-500 to-teal-600', action: onStartPythonFunctionsArgs, n: 19 },
    { tag: 'py20', title: 'Kreslení myší', desc: 'Události z myši (motion, press), Canvas bind a efekt spreje!', icon: Code, gradient: 'from-cyan-500 to-blue-600', action: onStartPythonMouseDrawing, n: 20 },
  ];

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
          {lessons.map(lesson => (
            <TechnicalCard
              key={lesson.tag}
              tag={lesson.tag}
              title={lesson.title}
              description={lesson.desc}
              icon={lesson.icon}
              gradient={lesson.gradient}
              actionLabel={`Otevřít lekci ${lesson.n}`}
              onClick={lesson.action}
              accentCorner={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programovani2Menu;
