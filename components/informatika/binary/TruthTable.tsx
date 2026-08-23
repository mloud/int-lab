
import React, { useState } from 'react';
import { ArrowLeft, Table, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface TruthTableProps {
  onBack: () => void;
}

const TruthTable: React.FC<TruthTableProps> = ({ onBack }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean | null>>({
    'and-0-0': null, 'and-0-1': null, 'and-1-0': null, 'and-1-1': null,
    'or-0-0': null, 'or-0-1': null, 'or-1-0': null, 'or-1-1': null,
  });

  const toggleAnswer = (key: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [key]: prev[key] === null ? true : (prev[key] === true ? false : null)
    }));
  };

  const checkCorrect = (key: string, expected: boolean) => {
    if (userAnswers[key] === null) return 'none';
    return userAnswers[key] === expected ? 'correct' : 'wrong';
  };

  const andData = [
    { a: 0, b: 0, expected: false },
    { a: 0, b: 1, expected: false },
    { a: 1, b: 0, expected: false },
    { a: 1, b: 1, expected: true },
  ];

  const orData = [
    { a: 0, b: 0, expected: false },
    { a: 0, b: 1, expected: true },
    { a: 1, b: 0, expected: true },
    { a: 1, b: 1, expected: true },
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20 px-4">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Pravdivostní tabulka</h2>
        <div className="w-20"></div>
      </div>

      <div className="w-full bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-amber-100 rounded-2xl">
            <Table className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Podmínky vyznamenání</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Abych dostal vyznamenání, musí být splněny dvě podmínky: 
              <strong> 1) Žádná trojka</strong> a <strong>2) Průměr nejvýše 1,5</strong>. 
              Splnění podmínky označíme <strong>1</strong>, nesplnění <strong>0</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* AND Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight">Pravidlo: Obě podmínky (A)</h4>
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Přísné pravidlo</span>
            </div>
            
            <div className="overflow-hidden rounded-3xl border-4 border-gray-50 shadow-inner">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-2">Bez trojky</th>
                    <th className="py-4 px-2">Průměr ≤ 1,5</th>
                    <th className="py-4 px-2 bg-blue-50 text-blue-600">Vyznamenání?</th>
                  </tr>
                </thead>
                <tbody>
                  {andData.map((row) => {
                    const key = `and-${row.a}-${row.b}`;
                    const status = checkCorrect(key, row.expected);
                    return (
                      <tr key={key} className="border-t border-gray-50">
                        <td className="py-6 text-2xl font-black text-gray-400">{row.a}</td>
                        <td className="py-6 text-2xl font-black text-gray-400">{row.b}</td>
                        <td className="py-4 bg-blue-50/30">
                          <button 
                            onClick={() => toggleAnswer(key)}
                            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black transition-all shadow-sm ${
                              userAnswers[key] === null ? 'bg-white text-gray-200 border-2 border-dashed border-gray-200' :
                              status === 'correct' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                              status === 'wrong' ? 'bg-red-500 text-white shadow-red-200' : 'bg-gray-800 text-white'
                            }`}
                          >
                            {userAnswers[key] === null ? '?' : (userAnswers[key] ? '1' : '0')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* OR Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight">Pravidlo: Aspoň jedna (NEBO)</h4>
              <span className="px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Mírné pravidlo</span>
            </div>
            
            <div className="overflow-hidden rounded-3xl border-4 border-gray-50 shadow-inner">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="py-4 px-2">Bez trojky</th>
                    <th className="py-4 px-2">Průměr ≤ 1,5</th>
                    <th className="py-4 px-2 bg-amber-50 text-amber-600">Vyznamenání?</th>
                  </tr>
                </thead>
                <tbody>
                  {orData.map((row) => {
                    const key = `or-${row.a}-${row.b}`;
                    const status = checkCorrect(key, row.expected);
                    return (
                      <tr key={key} className="border-t border-gray-50">
                        <td className="py-6 text-2xl font-black text-gray-400">{row.a}</td>
                        <td className="py-6 text-2xl font-black text-gray-400">{row.b}</td>
                        <td className="py-4 bg-amber-50/30">
                          <button 
                            onClick={() => toggleAnswer(key)}
                            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black transition-all shadow-sm ${
                              userAnswers[key] === null ? 'bg-white text-gray-200 border-2 border-dashed border-gray-200' :
                              status === 'correct' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                              status === 'wrong' ? 'bg-red-500 text-white shadow-red-200' : 'bg-gray-800 text-white'
                            }`}
                          >
                            {userAnswers[key] === null ? '?' : (userAnswers[key] ? '1' : '0')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-8 bg-blue-50 rounded-[3rem] border border-blue-100 flex gap-6 items-start">
        <HelpCircle className="w-10 h-10 text-blue-500 shrink-0" />
        <div>
          <h4 className="text-lg font-black text-blue-900 uppercase tracking-tight mb-2">Jak na to?</h4>
          <p className="text-blue-800 font-medium leading-relaxed">
            Klikáním na otazníky v tabulce nastav <strong>1</strong> (pravda/ano) nebo <strong>0</strong> (nepravda/ne). 
            U pravidla <strong>A</strong> musí platit obě věci naráz. U pravidla <strong>NEBO</strong> stačí, když platí aspoň jedna z nich. 
            Pozor na poslední řádek u pravidla NEBO – pokud platí obě, platí i "aspoň jedna"!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TruthTable;
