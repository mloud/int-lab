'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, BarChart3, AlertCircle, Activity, Search, TableProperties, LineChart, Lightbulb } from 'lucide-react';

export const BarChartsSimulatorTab: React.FC = () => {
  const [simData, setSimData] = useState([
    { id: 1, label: 'Pondělí', value: 30 },
    { id: 2, label: 'Úterý', value: 50 },
    { id: 3, label: 'Středa', value: 80 },
    { id: 4, label: 'Čtvrtek', value: 45 },
    { id: 5, label: 'Pátek', value: 90 }
  ]);

  const [xAxisLabel, setXAxisLabel] = useState('Dny v týdnu');
  const [yAxisLabel, setYAxisLabel] = useState('Počet (ks)');

  const updateSimData = (id: number, field: 'label' | 'value', newValue: string | number) => {
    setSimData(simData.map(item => 
      item.id === id ? { ...item, [field]: newValue } : item
    ));
  };

  const maxSimValue = Math.max(...simData.map(d => d.value), 100);
  const simSteps = [maxSimValue, Math.round(maxSimValue / 2), 0];

  // Data pro simulátor - Graf 2 (dvě řady, seskupené)
  const [simData2, setSimData2] = useState([
    { id: 1, label: 'Fotbal', val1: 30, val2: 5 },
    { id: 2, label: 'Florbal', val1: 25, val2: 10 },
    { id: 3, label: 'Keramika', val1: 5, val2: 25 },
    { id: 4, label: 'Programování', val1: 20, val2: 15 }
  ]);
  const [xAxisLabel2, setXAxisLabel2] = useState('Kroužek');
  const [yAxisLabel2_1, setYAxisLabel2_1] = useState('Chlapci');
  const [yAxisLabel2_2, setYAxisLabel2_2] = useState('Dívky');

  const updateSimData2 = (id: number, field: 'label' | 'val1' | 'val2', newValue: string | number) => {
    setSimData2(simData2.map(item => 
      item.id === id ? { ...item, [field]: newValue } : item
    ));
  };

  const maxSimValue2 = Math.max(...simData2.flatMap(d => [d.val1, d.val2]), 40);
  const simSteps2 = [maxSimValue2, Math.round(maxSimValue2 / 2), 0];

  // Data pro simulátor - Graf 3 (dvě řady, skládané)
  const [simData3, setSimData3] = useState([
    { id: 1, label: 'Fotbal', val1: 30, val2: 5 },
    { id: 2, label: 'Florbal', val1: 25, val2: 10 },
    { id: 3, label: 'Keramika', val1: 5, val2: 25 },
    { id: 4, label: 'Programování', val1: 20, val2: 15 }
  ]);
  const [xAxisLabel3, setXAxisLabel3] = useState('Kroužek');
  const [yAxisLabel3_1, setYAxisLabel3_1] = useState('Chlapci');
  const [yAxisLabel3_2, setYAxisLabel3_2] = useState('Dívky');

  const updateSimData3 = (id: number, field: 'label' | 'val1' | 'val2', newValue: string | number) => {
    setSimData3(simData3.map(item => 
      item.id === id ? { ...item, [field]: newValue } : item
    ));
  };

  const maxSimValue3 = Math.max(...simData3.map(d => d.val1 + d.val2), 40);
  const simSteps3 = [maxSimValue3, Math.round(maxSimValue3 / 2), 0];

  return (
        <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tabulka dat */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight border-b border-slate-100 pb-2">Tabulka dat</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Upravte hodnoty v tabulce a sledujte, jak graf okamžitě reaguje.
              </p>
              
              <div className="overflow-x-auto shadow-sm border border-slate-300">
                <table className="w-full border-collapse bg-white text-sm font-sans">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 w-10 text-center text-slate-500 select-none py-1.5 font-normal"></th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[120px]">A</th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[120px]">B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Řádek 1 - Hlavičky sloupců */}
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">1</td>
                      <td className="border border-slate-300 p-0 relative">
                        <input 
                          type="text" 
                          value={xAxisLabel} 
                          onChange={(e) => setXAxisLabel(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 relative font-bold text-slate-800 placeholder-slate-400 bg-transparent"
                          placeholder="Popisek osy X"
                        />
                      </td>
                      <td className="border border-slate-300 p-0 relative">
                        <input 
                          type="text" 
                          value={yAxisLabel} 
                          onChange={(e) => setYAxisLabel(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 relative font-bold text-slate-800 placeholder-slate-400 bg-transparent text-right"
                          placeholder="Popisek osy Y"
                        />
                      </td>
                    </tr>
                    
                    {/* Data z databáze */}
                    {simData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">{index + 2}</td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="text" 
                            value={row.label}
                            onChange={(e) => updateSimData(row.id, 'label', e.target.value)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 relative text-slate-700 bg-transparent"
                          />
                        </td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="number" 
                            min="0"
                            max="500"
                            value={row.value === 0 && row.label === '' ? '' : row.value}
                            onChange={(e) => updateSimData(row.id, 'value', parseInt(e.target.value) || 0)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-emerald-500 focus:z-10 relative text-slate-700 font-mono bg-transparent text-right"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dynamický graf */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
              <h2 className="text-xl font-black text-emerald-800 mb-6 uppercase tracking-tight text-center border-b border-emerald-50 pb-2">Živý graf</h2>
              
              <div className="bg-emerald-50/50 rounded-xl p-6 pt-10 pb-12 relative flex-1 min-h-[300px] flex border border-emerald-100 flex-col">
                <div className="flex flex-1">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-4">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -rotate-90 whitespace-nowrap">
                      {yAxisLabel || 'Hodnota'}
                    </span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 flex items-end justify-around gap-2 relative pl-6 pb-2">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-2 w-8 flex flex-col justify-between text-[10px] text-emerald-600/60 font-mono items-end pr-2 -translate-y-1.5">
                      {simSteps.map((step, i) => (
                        <span key={i}>{step}</span>
                      ))}
                    </div>
                    
                    {/* Sloupce */}
                    {simData.map((row) => {
                      const heightPercent = maxSimValue > 0 ? (row.value / maxSimValue) * 100 : 0;
                      return (
                        <div key={row.id} className="flex-1 max-w-[3rem] flex flex-col items-center group h-full justify-end z-10">
                          <div 
                            className="w-full bg-emerald-500 rounded-t-md shadow-sm relative transition-all duration-500 ease-out flex justify-center hover:bg-emerald-400"
                            style={{ height: `${heightPercent}%`, minHeight: heightPercent > 0 ? '4px' : '0' }}
                          >
                            <span className="absolute -top-6 text-xs font-black text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              {row.value}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 absolute -bottom-5 truncate w-full text-center">
                            {row.label}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Osa X - čára */}
                    <div className="absolute left-6 right-0 bottom-2 h-px bg-emerald-300"></div>
                  </div>
                </div>
                
                {/* Popisek osy X - dole uprostřed */}
                <div className="mt-8 text-center">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">
                    {xAxisLabel || 'Kategorie'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Dělící čára */}
          <hr className="border-t border-slate-200 my-16" />

          {/* Druhý simulátor - dvě řady (Skupinový graf) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tabulka dat 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight border-b border-slate-100 pb-2">Porovnání dvou skupin</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Zde máme pro každou kategorii dvě různé hodnoty (např. Chlapci a Dívky).
              </p>
              
              <div className="overflow-x-auto shadow-sm border border-slate-300">
                <table className="w-full border-collapse bg-white text-sm font-sans">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 w-10 text-center text-slate-500 select-none py-1.5 font-normal"></th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[100px]">A</th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[80px]">B</th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[80px]">C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">1</td>
                      <td className="border border-slate-300 p-0 relative">
                        <input 
                          type="text" 
                          value={xAxisLabel2} 
                          onChange={(e) => setXAxisLabel2(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative font-bold text-slate-800 placeholder-slate-400 bg-transparent"
                        />
                      </td>
                      <td className="border border-slate-300 p-0 relative bg-blue-50/50">
                        <input 
                          type="text" 
                          value={yAxisLabel2_1} 
                          onChange={(e) => setYAxisLabel2_1(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative font-bold text-blue-800 placeholder-blue-300 bg-transparent text-center"
                        />
                      </td>
                      <td className="border border-slate-300 p-0 relative bg-pink-50/50">
                        <input 
                          type="text" 
                          value={yAxisLabel2_2} 
                          onChange={(e) => setYAxisLabel2_2(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-pink-500 focus:z-10 relative font-bold text-pink-800 placeholder-pink-300 bg-transparent text-center"
                        />
                      </td>
                    </tr>
                    
                    {simData2.map((row, index) => (
                      <tr key={row.id}>
                        <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">{index + 2}</td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="text" 
                            value={row.label}
                            onChange={(e) => updateSimData2(row.id, 'label', e.target.value)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative text-slate-700 bg-transparent"
                          />
                        </td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="number" 
                            min="0"
                            value={row.val1 === 0 && row.label === '' ? '' : row.val1}
                            onChange={(e) => updateSimData2(row.id, 'val1', parseInt(e.target.value) || 0)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative text-blue-700 font-mono bg-transparent text-right"
                          />
                        </td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="number" 
                            min="0"
                            value={row.val2 === 0 && row.label === '' ? '' : row.val2}
                            onChange={(e) => updateSimData2(row.id, 'val2', parseInt(e.target.value) || 0)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-pink-500 focus:z-10 relative text-pink-700 font-mono bg-transparent text-right"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dynamický graf 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
              <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight text-center border-b border-slate-100 pb-2">Seskupený graf (2 řady)</h2>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    {yAxisLabel2_1 || 'Skupina 1'}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>
                    {yAxisLabel2_2 || 'Skupina 2'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 pt-10 pb-12 relative flex-1 min-h-[300px] flex border border-slate-200 flex-col">
                <div className="flex flex-1">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest -rotate-90 whitespace-nowrap">
                      Hodnota
                    </span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 flex items-end justify-around gap-4 relative pl-6 pb-2">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-2 w-8 flex flex-col justify-between text-[10px] text-slate-400 font-mono items-end pr-2 -translate-y-1.5">
                      {simSteps2.map((step, i) => (
                        <span key={i}>{step}</span>
                      ))}
                    </div>
                    
                    {/* Skupiny sloupců */}
                    {simData2.map((row) => {
                      const h1 = maxSimValue2 > 0 ? (row.val1 / maxSimValue2) * 100 : 0;
                      const h2 = maxSimValue2 > 0 ? (row.val2 / maxSimValue2) * 100 : 0;
                      return (
                        <div key={row.id} className="flex-1 max-w-[4rem] flex flex-col items-center group h-full justify-end z-10 relative">
                          <div className="flex items-end w-full gap-0.5 h-full relative">
                            {/* Sloupec 1 */}
                            <div 
                              className="flex-1 bg-blue-500 rounded-t-sm shadow-sm relative transition-all duration-500 ease-out hover:bg-blue-400 flex justify-center"
                              style={{ height: `${h1}%`, minHeight: h1 > 0 ? '4px' : '0' }}
                            >
                              <span className="absolute -top-5 text-[10px] font-black text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                {row.val1}
                              </span>
                            </div>
                            {/* Sloupec 2 */}
                            <div 
                              className="flex-1 bg-pink-400 rounded-t-sm shadow-sm relative transition-all duration-500 ease-out hover:bg-pink-300 flex justify-center"
                              style={{ height: `${h2}%`, minHeight: h2 > 0 ? '4px' : '0' }}
                            >
                              <span className="absolute -top-5 text-[10px] font-black text-pink-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                {row.val2}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 absolute -bottom-5 truncate w-full text-center">
                            {row.label}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Osa X - čára */}
                    <div className="absolute left-6 right-0 bottom-2 h-px bg-slate-300"></div>
                  </div>
                </div>
                
                {/* Popisek osy X - dole uprostřed */}
                <div className="mt-8 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    {xAxisLabel2 || 'Kategorie'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Dělící čára 3 */}
          <hr className="border-t border-slate-200 my-16" />

          {/* Třetí simulátor - dvě řady (Skládaný graf) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tabulka dat 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight border-b border-slate-100 pb-2">Skládaná data</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Data se sčítají, sloupce se skládají na sebe.
              </p>
              
              <div className="overflow-x-auto shadow-sm border border-slate-300">
                <table className="w-full border-collapse bg-white text-sm font-sans">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 w-10 text-center text-slate-500 select-none py-1.5 font-normal"></th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[100px]">A</th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[80px]">B</th>
                      <th className="border border-slate-300 text-center text-slate-600 select-none py-1.5 font-medium min-w-[80px]">C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">1</td>
                      <td className="border border-slate-300 p-0 relative">
                        <input 
                          type="text" 
                          value={xAxisLabel3} 
                          onChange={(e) => setXAxisLabel3(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative font-bold text-slate-800 placeholder-slate-400 bg-transparent"
                        />
                      </td>
                      <td className="border border-slate-300 p-0 relative bg-blue-50/50">
                        <input 
                          type="text" 
                          value={yAxisLabel3_1} 
                          onChange={(e) => setYAxisLabel3_1(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative font-bold text-blue-800 placeholder-blue-300 bg-transparent text-center"
                        />
                      </td>
                      <td className="border border-slate-300 p-0 relative bg-pink-50/50">
                        <input 
                          type="text" 
                          value={yAxisLabel3_2} 
                          onChange={(e) => setYAxisLabel3_2(e.target.value)} 
                          className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-pink-500 focus:z-10 relative font-bold text-pink-800 placeholder-pink-300 bg-transparent text-center"
                        />
                      </td>
                    </tr>
                    
                    {simData3.map((row, index) => (
                      <tr key={row.id}>
                        <td className="border border-slate-300 bg-slate-100 text-center text-slate-500 select-none py-1.5">{index + 2}</td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="text" 
                            value={row.label}
                            onChange={(e) => updateSimData3(row.id, 'label', e.target.value)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative text-slate-700 bg-transparent"
                          />
                        </td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="number" 
                            min="0"
                            value={row.val1 === 0 && row.label === '' ? '' : row.val1}
                            onChange={(e) => updateSimData3(row.id, 'val1', parseInt(e.target.value) || 0)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 relative text-blue-700 font-mono bg-transparent text-right"
                          />
                        </td>
                        <td className="border border-slate-300 p-0 relative">
                          <input 
                            type="number" 
                            min="0"
                            value={row.val2 === 0 && row.label === '' ? '' : row.val2}
                            onChange={(e) => updateSimData3(row.id, 'val2', parseInt(e.target.value) || 0)}
                            className="w-full h-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-pink-500 focus:z-10 relative text-pink-700 font-mono bg-transparent text-right"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dynamický graf 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
              <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight text-center border-b border-slate-100 pb-2">Skládaný graf (Celkem)</h2>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    {yAxisLabel3_1 || 'Skupina 1'}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>
                    {yAxisLabel3_2 || 'Skupina 2'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 pt-10 pb-12 relative flex-1 min-h-[300px] flex border border-slate-200 flex-col">
                <div className="flex flex-1">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest -rotate-90 whitespace-nowrap">
                      Celkem
                    </span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 flex items-end justify-around gap-4 relative pl-6 pb-2">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-2 w-8 flex flex-col justify-between text-[10px] text-slate-400 font-mono items-end pr-2 -translate-y-1.5">
                      {simSteps3.map((step, i) => (
                        <span key={i}>{step}</span>
                      ))}
                    </div>
                    
                    {/* Skládané sloupce */}
                    {simData3.map((row) => {
                      const total = row.val1 + row.val2;
                      const hTotal = maxSimValue3 > 0 ? (total / maxSimValue3) * 100 : 0;
                      
                      // Percentage of each segment inside the total column height
                      const p1 = total > 0 ? (row.val1 / total) * 100 : 0;
                      const p2 = total > 0 ? (row.val2 / total) * 100 : 0;

                      return (
                        <div key={row.id} className="flex-1 max-w-[3rem] flex flex-col items-center group h-full justify-end z-10 relative">
                          <div 
                            className="w-full flex flex-col-reverse shadow-sm relative transition-all duration-500 ease-out"
                            style={{ height: `${hTotal}%` }}
                          >
                            {/* Segment 1 */}
                            <div 
                              className="w-full bg-blue-500 relative hover:bg-blue-400 transition-colors"
                              style={{ height: `${p1}%` }}
                            >
                              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100">
                                {row.val1}
                              </span>
                            </div>
                            {/* Segment 2 */}
                            <div 
                              className="w-full bg-pink-400 rounded-t-sm relative hover:bg-pink-300 transition-colors"
                              style={{ height: `${p2}%` }}
                            >
                              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white/90 drop-shadow-md opacity-0 group-hover:opacity-100">
                                {row.val2}
                              </span>
                            </div>
                          </div>
                          
                          <span className="text-[10px] font-bold text-slate-600 absolute -bottom-5 truncate w-full text-center">
                            {row.label}
                          </span>
                          
                          {/* Zobrazení celkového součtu nad sloupcem */}
                          <span className="absolute -top-6 text-xs font-black text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Σ = {total}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Osa X - čára */}
                    <div className="absolute left-6 right-0 bottom-2 h-px bg-slate-300"></div>
                  </div>
                </div>
                
                {/* Popisek osy X - dole uprostřed */}
                <div className="mt-8 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    {xAxisLabel3 || 'Kategorie'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
  );
};
