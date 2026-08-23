
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, HelpCircle, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

interface BinaryToDecimalProps {
  onBack: () => void;
}

const BinaryToDecimal: React.FC<BinaryToDecimalProps> = ({ onBack }) => {
  const [students, setStudents] = useState([false, false, false, false]);
  const [userValue, setUserValue] = useState<string>('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const generateNew = () => {
    const randomVal = Math.floor(Math.random() * 16);
    const binary = randomVal.toString(2).padStart(4, '0').split('').map(b => b === '1');
    setStudents(binary);
    setUserValue('');
    setFeedback('none');
  };

  useEffect(() => {
    generateNew();
  }, []);

  const currentDecimal = students.reduce((acc, curr, idx) => {
    return acc + (curr ? Math.pow(2, 3 - idx) : 0);
  }, 0);

  const checkAnswer = () => {
    if (parseInt(userValue) === currentDecimal) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1500);
    }
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
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Převod z binární soustavy</h2>
        <div className="w-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-12">Jaké číslo vidíš?</h3>
          
          <div className="flex justify-between w-full max-w-2xl mb-16">
            {students.map((standing, idx) => (
              <div key={idx} className="flex flex-col items-center gap-6">
                <div className="text-lg font-black text-gray-400 uppercase tracking-widest">{Math.pow(2, 3 - idx)}</div>
                <div className={`relative w-24 h-40 rounded-3xl transition-all duration-500 flex flex-col items-center justify-end pb-4 border-4 ${standing ? 'bg-amber-100 border-amber-400 shadow-xl shadow-amber-100 -translate-y-4' : 'bg-gray-50 border-gray-100'}`}>
                  <div className={`transition-all duration-500 ${standing ? 'mb-12' : 'mb-0'}`}>
                    <User className={`w-16 h-16 ${standing ? 'text-amber-600' : 'text-gray-300'}`} />
                  </div>
                  <p className={`font-black text-xs uppercase tracking-widest ${standing ? 'text-amber-700' : 'text-gray-400'}`}>
                    {standing ? 'Stojí' : 'Sedí'}
                  </p>
                  <div className={`absolute -bottom-10 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black ${standing ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {standing ? '1' : '0'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Binární kód</p>
              <p className="text-4xl font-black text-gray-800 tracking-[0.5em]">{students.map(s => s ? '1' : '0').join('')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8">Tvoje odpověď</h3>
          
          <div className={`w-full aspect-square rounded-[2.5rem] border-4 flex flex-col items-center justify-center p-8 text-center mb-8 transition-all ${
            feedback === 'correct' ? 'bg-emerald-50 border-emerald-200' : 
            feedback === 'wrong' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-100'
          }`}>
            <p className="text-sm font-black text-gray-600 uppercase tracking-tight mb-4">Zapiš desítkovou hodnotu:</p>
            <input 
              type="number" 
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              className="w-32 py-4 bg-white rounded-2xl shadow-sm border-2 border-amber-200 text-center text-5xl font-black text-amber-600 focus:outline-none focus:border-amber-400 mb-6"
              placeholder="?"
            />
            
            {feedback === 'correct' ? (
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">Výborně!</span>
              </div>
            ) : feedback === 'wrong' ? (
              <div className="flex flex-col items-center gap-2">
                <XCircle className="w-8 h-8 text-red-500" />
                <span className="text-red-600 font-black uppercase tracking-widest text-xs">Zkus to znovu</span>
              </div>
            ) : (
              <button 
                onClick={checkAnswer}
                className="px-8 py-3 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-100 hover:bg-amber-700 transition-all"
              >
                Ověřit
              </button>
            )}
          </div>

          <div className="flex gap-4 w-full mb-6">
            <button 
              onClick={generateNew}
              className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Další číslo
            </button>
          </div>

          <div className="w-full p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Sečti hodnoty všech stojících žáků (těch, co mají pod sebou <strong>1</strong>). 
              Hodnoty jsou 8, 4, 2 a 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryToDecimal;
