import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, LightbulbOff, FileText, ImageIcon, Music, Film, HardDrive, Binary, Calculator } from 'lucide-react';

interface DataUnitsTheoryProps {
  onBack: () => void;
}

const DataUnitsTheory: React.FC<DataUnitsTheoryProps> = ({ onBack }) => {
  const [bitState, setBitState] = useState(0);
  const [byteState, setByteState] = useState([0, 1, 0, 0, 1, 1, 0, 1]);
  const [calcValue, setCalcValue] = useState<string>('1');
  const [calcUnit, setCalcUnit] = useState<string>('MB');

  const getAsciiChar = (bits: number[]) => {
    const dec = parseInt(bits.join(''), 2);
    if (dec >= 32 && dec <= 126) return String.fromCharCode(dec);
    return '?';
  };

  return (
    <div className="max-w-5xl w-full mx-auto animate-in fade-in duration-500 px-4 pb-12">
      <div className="flex justify-start mb-6 sticky top-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md hover:bg-fuchsia-50 text-gray-700 hover:text-fuchsia-700 font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na rozcestník
        </button>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <div className="bg-gradient-to-br from-fuchsia-600 to-purple-800 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Teorie: Z čeho se skládají data?</h1>
          <p className="text-xl md:text-2xl font-medium text-fuchsia-100 max-w-3xl leading-relaxed">
            Pojďme se podívat na to, v čem se vlastně měří informace. Od nejmenšího kousíčku až po obří disky.
          </p>
        </div>

        {/* Bit */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-slate-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-4xl font-black text-slate-800 mb-4 flex items-center gap-4">
              <span className="text-fuchsia-600 text-6xl">1 bit</span> (b)
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Úplně nejmenší kousek informace. Anglicky <strong>bit</strong> znamená <em>kousek</em>.<br/><br/>
              Může nabývat jen dvou stavů: <strong>0</strong> nebo <strong>1</strong> (vypnuto / zapnuto). Představ si ho jako malou žárovku.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 bg-slate-50 p-8 rounded-3xl border-2 border-slate-200">
            <button 
              onClick={() => setBitState(0)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all focus:outline-none ${bitState === 0 ? 'bg-slate-200 scale-110 shadow-inner' : 'hover:bg-slate-100 hover:scale-105'}`}
            >
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
                <LightbulbOff className="w-12 h-12 text-slate-600" />
              </div>
              <span className="text-3xl font-black text-slate-400">0</span>
            </button>
            <button 
              onClick={() => setBitState(1)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all focus:outline-none ${bitState === 1 ? 'bg-yellow-50 scale-110 shadow-md' : 'hover:bg-yellow-50/50 hover:scale-105'}`}
            >
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.6)]">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
              <span className="text-3xl font-black text-yellow-500">1</span>
            </button>
          </div>
        </div>

        {/* Byte */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-slate-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex gap-2 shrink-0 flex-wrap justify-center md:w-1/2">
            {byteState.map((val, i) => (
              <button 
                key={i}
                onClick={() => {
                  const newByte = [...byteState];
                  newByte[i] = val === 0 ? 1 : 0;
                  setByteState(newByte);
                }}
                className="flex flex-col items-center gap-2 hover:scale-110 transition-transform focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${val === 1 ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'bg-slate-800 shadow-inner'}`}>
                  {val === 1 ? <Lightbulb className="w-6 h-6 text-white" /> : <LightbulbOff className="w-6 h-6 text-slate-600" />}
                </div>
                <span className={`text-xl font-black transition-colors ${val === 1 ? 'text-yellow-500' : 'text-slate-400'}`}>{val}</span>
              </button>
            ))}
            <div className="w-full text-center mt-4 text-2xl font-black text-fuchsia-600 bg-fuchsia-50 py-3 rounded-2xl border-2 border-fuchsia-100">
              Desítkově: {parseInt(byteState.join(''), 2)} <br/>
              Znak: "{getAsciiChar(byteState)}"
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-black text-slate-800 mb-4 flex items-center gap-4">
              <span className="text-fuchsia-600 text-6xl">1 Byte</span> (B)
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Jeden Byte [bajt] je uměle vytvořená jednotka. Obsahuje přesně <strong>8 bitů</strong>.<br/><br/>
              Proč zrovna 8? Protože to zhruba stačí na zakódování <strong>jednoho znaku</strong> (písmene).
            </p>
            <div className="mt-6 inline-block bg-fuchsia-100 text-fuchsia-900 px-6 py-3 rounded-2xl font-bold text-lg border-2 border-fuchsia-200">
              Pamatuj: 1 znak textu = 1 Byte
            </div>
          </div>
        </div>

        {/* Násobky */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-slate-100">
          <h2 className="text-4xl font-black text-slate-800 mb-8 text-center">
            Násobné jednotky
          </h2>
          <p className="text-xl text-slate-600 font-medium text-center mb-10 max-w-3xl mx-auto">
            Stejně jako máme gramy a kilogramy, máme i Bajty a Kilobajty. Počítače používají tyto předpony (kilo, mega, giga, tera), kde každá znamená násobek tisíce (1 000).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-blue-700 mb-2">1 KB</h3>
              <p className="font-bold text-blue-900 mb-2">Kilobajt</p>
              <div className="bg-white rounded-xl py-2 px-3 font-mono text-sm text-blue-800 border border-blue-100 mb-4 shadow-inner">
                1 000 B
              </div>
              <p className="text-blue-700/80 font-medium text-sm">
                Krátký text, článek. Stránka textu zabere zhruba 3 až 6 KB.
              </p>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-black text-emerald-700 mb-2">1 MB</h3>
              <p className="font-bold text-emerald-900 mb-2">Megabajt</p>
              <div className="bg-white rounded-xl py-2 px-3 font-mono text-sm text-emerald-800 border border-emerald-100 mb-4 shadow-inner">
                1 000 KB
              </div>
              <p className="text-emerald-700/80 font-medium text-sm">
                Běžná fotka na mobilu (cca 6 MB) nebo písnička (cca 6 MB). Tlustá kniha bez obrázků.
              </p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Film className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-black text-orange-700 mb-2">1 GB</h3>
              <p className="font-bold text-orange-900 mb-2">Gigabajt</p>
              <div className="bg-white rounded-xl py-2 px-3 font-mono text-sm text-orange-800 border border-orange-100 mb-4 shadow-inner">
                1 000 MB
              </div>
              <p className="text-orange-700/80 font-medium text-sm">
                Film ve vysokém rozlišení. Kapacita lepších flash disků a operační paměti.
              </p>
            </div>

            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <HardDrive className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-3xl font-black text-rose-700 mb-2">1 TB</h3>
              <p className="font-bold text-rose-900 mb-2">Terabajt</p>
              <div className="bg-white rounded-xl py-2 px-3 font-mono text-sm text-rose-800 border border-rose-100 mb-4 shadow-inner">
                1 000 GB
              </div>
              <p className="text-rose-700/80 font-medium text-sm">
                Celková kapacita moderních pevných disků (SSD i HDD) v noteboocích a počítačích.
              </p>
            </div>

          </div>
        </div>

        {/* Kalkulačka */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-slate-100 mt-12">
          <h2 className="text-4xl font-black text-slate-800 mb-8 text-center flex items-center justify-center gap-4">
            <Calculator className="w-10 h-10 text-fuchsia-600" />
            Převodník jednotek
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <input 
              type="number" 
              value={calcValue} 
              onChange={e => setCalcValue(e.target.value)} 
              className="text-3xl font-black p-4 border-4 border-slate-200 rounded-2xl w-48 text-center focus:border-fuchsia-400 focus:outline-none"
            />
            <select 
              value={calcUnit} 
              onChange={e => setCalcUnit(e.target.value)}
              className="text-3xl font-black p-4 border-4 border-slate-200 rounded-2xl bg-white text-fuchsia-700 cursor-pointer focus:border-fuchsia-400 focus:outline-none"
            >
              <option value="b">b (bity)</option>
              <option value="B">B (Bajty)</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {['b', 'B', 'KB', 'MB', 'GB', 'TB'].map(unit => {
              if (unit === calcUnit) return null;
              
              let valInB = parseFloat(calcValue) || 0;
              if (calcUnit === 'b') valInB = valInB / 8;
              else if (calcUnit === 'KB') valInB = valInB * 1000;
              else if (calcUnit === 'MB') valInB = valInB * 1000000;
              else if (calcUnit === 'GB') valInB = valInB * 1000000000;
              else if (calcUnit === 'TB') valInB = valInB * 1000000000000;

              let finalVal = valInB;
              if (unit === 'b') finalVal = valInB * 8;
              else if (unit === 'KB') finalVal = valInB / 1000;
              else if (unit === 'MB') finalVal = valInB / 1000000;
              else if (unit === 'GB') finalVal = valInB / 1000000000;
              else if (unit === 'TB') finalVal = valInB / 1000000000000;

              // Format numbers specifically. Very large/small get exponential, others get formatting
              let displayVal = "";
              if (finalVal === 0) displayVal = "0";
              else if (finalVal < 0.0001 || finalVal > 1000000000000) displayVal = finalVal.toExponential(4);
              else displayVal = finalVal.toLocaleString('cs-CZ', { maximumFractionDigits: 6 });

              return (
                <div key={unit} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-center">
                  <span className="block text-slate-500 font-bold mb-1">{unit}</span>
                  <span className="block text-xl font-black text-slate-800 break-words">{displayVal}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUnitsTheory;
