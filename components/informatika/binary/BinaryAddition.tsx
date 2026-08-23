
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, RefreshCcw, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

interface BinaryAdditionProps {
  onBack: () => void;
}

const BinaryAddition: React.FC<BinaryAdditionProps> = ({ onBack }) => {
  const [num1, setNum1] = useState('1011');
  const [num2, setNum2] = useState('0110');
  const [userResult, setUserResult] = useState(['', '', '', '', '']); // 5 bits for result
  const [carries, setCarries] = useState(['', '', '', '', '']); // 5 bits for carries
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const generateNew = () => {
    const n1 = Math.floor(Math.random() * 15).toString(2).padStart(4, '0');
    const n2 = Math.floor(Math.random() * 15).toString(2).padStart(4, '0');
    setNum1(n1);
    setNum2(n2);
    setUserResult(['', '', '', '', '']);
    setCarries(['', '', '', '', '']);
    setFeedback('none');
  };

  const checkResult = () => {
    const val1 = parseInt(num1, 2);
    const val2 = parseInt(num2, 2);
    const expectedSum = (val1 + val2).toString(2).padStart(5, '0');
    const userSum = userResult.join('');

    if (userSum === expectedSum) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 2000);
    }
  };

  const handleResultChange = (idx: number, val: string) => {
    if (val !== '0' && val !== '1' && val !== '') return;
    const newResult = [...userResult];
    newResult[idx] = val;
    setUserResult(newResult);
    setFeedback('none');
  };

  const handleCarryChange = (idx: number, val: string) => {
    if (val !== '0' && val !== '1' && val !== '') return;
    const newCarries = [...carries];
    newCarries[idx] = val;
    setCarries(newCarries);
    setFeedback('none');
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20 px-4">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Sčítání binárních čísel</h2>
        <div className="w-20"></div>
      </div>

      <div className="w-full bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
        <div className="flex flex-col items-end gap-2 mb-12 font-mono">
          {/* Carries row */}
          <div className="flex gap-4 mb-2">
            {carries.map((c, idx) => (
              <input
                key={`carry-${idx}`}
                type="text"
                value={c}
                onChange={(e) => handleCarryChange(idx, e.target.value)}
                placeholder="0"
                className="w-12 h-12 bg-amber-50 border-2 border-amber-100 rounded-xl text-center text-amber-600 font-black text-xl focus:outline-none focus:border-amber-400 placeholder:text-amber-200"
                maxLength={1}
              />
            ))}
          </div>

          {/* Number 1 row */}
          <div className="flex gap-4">
            <div className="w-12"></div> {/* Spacer for alignment */}
            {num1.split('').map((digit, idx) => (
              <div key={`n1-${idx}`} className="w-12 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl font-black text-gray-700">
                {digit}
              </div>
            ))}
          </div>

          {/* Number 2 row */}
          <div className="flex gap-4 relative">
            <Plus className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
            <div className="w-12"></div> {/* Spacer for alignment */}
            {num2.split('').map((digit, idx) => (
              <div key={`n2-${idx}`} className="w-12 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl font-black text-gray-700">
                {digit}
              </div>
            ))}
          </div>

          {/* Line */}
          <div className="w-full h-1.5 bg-gray-800 rounded-full my-4"></div>

          {/* Result row */}
          <div className="flex gap-4">
            {userResult.map((digit, idx) => (
              <input
                key={`res-${idx}`}
                type="text"
                value={digit}
                onChange={(e) => handleResultChange(idx, e.target.value)}
                className={`w-12 h-20 rounded-2xl text-center text-4xl font-black focus:outline-none transition-all ${
                  feedback === 'correct' ? 'bg-emerald-500 text-white border-none' :
                  feedback === 'wrong' ? 'bg-red-500 text-white border-none animate-shake' :
                  'bg-white border-4 border-gray-100 text-gray-800 focus:border-amber-400'
                }`}
                maxLength={1}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-md">
          <button 
            onClick={checkResult}
            className="flex-1 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-[2rem] shadow-xl transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
          >
            Zkontrolovat
          </button>
          <button 
            onClick={generateNew}
            className="p-5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-[2rem] transition-all"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>

        {feedback === 'correct' && (
          <div className="mt-8 flex items-center gap-3 text-emerald-600 animate-in zoom-in duration-300">
            <CheckCircle2 className="w-8 h-8" />
            <span className="text-xl font-black uppercase tracking-tight">Skvělá práce!</span>
          </div>
        )}
      </div>

      <div className="w-full p-8 bg-amber-50 rounded-[3rem] border border-amber-100 flex gap-6 items-start">
        <HelpCircle className="w-10 h-10 text-amber-500 shrink-0" />
        <div>
          <h4 className="text-lg font-black text-amber-900 uppercase tracking-tight mb-2">Jak sčítat binárně?</h4>
          <p className="text-amber-800 font-medium leading-relaxed mb-4">
            Sčítání probíhá stejně jako v desítkové soustavě, ale máme jen dvě číslice.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-amber-700">
            <li className="bg-white/50 p-2 rounded-lg">0 + 0 = 0</li>
            <li className="bg-white/50 p-2 rounded-lg">0 + 1 = 1</li>
            <li className="bg-white/50 p-2 rounded-lg">1 + 1 = 10 (píšu 0, přenáším 1)</li>
            <li className="bg-white/50 p-2 rounded-lg">1 + 1 + 1 = 11 (píšu 1, přenáším 1)</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BinaryAddition;
