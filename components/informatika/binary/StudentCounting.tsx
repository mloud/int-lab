
import React, { useState } from 'react';
import { ArrowLeft, User, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface StudentCountingProps {
  onBack: () => void;
}

const StudentCounting: React.FC<StudentCountingProps> = ({ onBack }) => {
  const [students, setStudents] = useState([false, false, false, false]); // false = sitting, true = standing
  const [targetNumber, setTargetNumber] = useState(0);

  const toggleStudent = (index: number) => {
    const newStudents = [...students];
    newStudents[index] = !newStudents[index];
    setStudents(newStudents);
  };

  const currentNumber = students.reduce((acc, curr, idx) => {
    return acc + (curr ? Math.pow(2, 3 - idx) : 0);
  }, 0);

  const isCorrect = currentNumber === targetNumber;

  const nextTarget = () => {
    if (targetNumber < 15) setTargetNumber(targetNumber + 1);
  };

  const prevTarget = () => {
    if (targetNumber > 0) setTargetNumber(targetNumber - 1);
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Číslování žáků</h2>
        <div className="w-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-12">Skupina žáků (4 bity)</h3>
          
          <div className="flex justify-between w-full max-w-2xl mb-16">
            {students.map((standing, idx) => (
              <div key={idx} className="flex flex-col items-center gap-6">
                <div className="text-lg font-black text-gray-400 uppercase tracking-widest">{Math.pow(2, 3 - idx)}</div>
                <button 
                  onClick={() => toggleStudent(idx)}
                  className={`relative w-24 h-40 rounded-3xl transition-all duration-500 flex flex-col items-center justify-end pb-4 border-4 ${standing ? 'bg-amber-100 border-amber-400 shadow-xl shadow-amber-100 -translate-y-4' : 'bg-gray-50 border-gray-100'}`}
                >
                  <div className={`transition-all duration-500 ${standing ? 'mb-12' : 'mb-0'}`}>
                    <User className={`w-16 h-16 ${standing ? 'text-amber-600' : 'text-gray-300'}`} />
                  </div>
                  <p className={`font-black text-xs uppercase tracking-widest ${standing ? 'text-amber-700' : 'text-gray-400'}`}>
                    {standing ? 'Stojí' : 'Sedí'}
                  </p>
                  <div className={`absolute -bottom-10 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black ${standing ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {standing ? '1' : '0'}
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="w-full p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Aktuální binární kód</p>
              <p className="text-4xl font-black text-gray-800 tracking-[0.5em]">{students.map(s => s ? '1' : '0').join('')}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Desítková hodnota</p>
              <p className="text-5xl font-black text-amber-600">{currentNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8">Úkol</h3>
          
          <div className="w-full aspect-square bg-amber-50 rounded-[2.5rem] border-4 border-amber-100 flex flex-col items-center justify-center p-8 text-center mb-8">
            <p className="text-sm font-black text-amber-900 uppercase tracking-tight mb-4">Nastav žáky tak, aby reprezentovali číslo:</p>
            <div className="flex items-center gap-6 mb-6">
              <button 
                onClick={prevTarget}
                className="p-3 bg-white rounded-2xl shadow-sm hover:bg-amber-100 text-amber-600 transition-all active:scale-90 disabled:opacity-30"
                disabled={targetNumber === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-8xl font-black text-amber-600">{targetNumber}</span>
              <button 
                onClick={nextTarget}
                className="p-3 bg-white rounded-2xl shadow-sm hover:bg-amber-100 text-amber-600 transition-all active:scale-90 disabled:opacity-30"
                disabled={targetNumber === 15}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {isCorrect ? (
              <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs animate-bounce">
                Správně!
              </div>
            ) : (
              <div className="text-amber-800/50 font-black uppercase tracking-widest text-[10px]">
                Zkus to nastavit...
              </div>
            )}
          </div>

          <div className="w-full p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Každý žák představuje jeden <strong>bit</strong>. Stojící žák je <strong>1</strong>, sedící je <strong>0</strong>. 
              Hodnoty bitů zleva doprava jsou 8, 4, 2 a 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCounting;
