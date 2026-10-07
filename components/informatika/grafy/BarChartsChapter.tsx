'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, BarChart3, AlertCircle, Activity, Search, TableProperties, LineChart, Lightbulb } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface BarChartsChapterProps {
  onBack: () => void;
}

const BarChartsChapter: React.FC<BarChartsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');

  // Dynamická data pro simulátor
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

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulator', label: 'Simulátor', icon: Activity },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  return (
    <FsChapterShell
      title="Sloupcové grafy"
      description="Naučte se pracovat s normálními a skládanými sloupcovými grafy."
      icon={BarChart3}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
      accentColor="border-emerald-500"
    >
      {activeTab === 'teorie' && (
        <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
          
          <div className="flex flex-col gap-16">
            
            {/* Obyčejný sloupcový graf */}
            <div className="bg-white rounded-[2rem] p-10 border-2 border-slate-200 shadow-lg flex flex-col">
              <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tight border-b-2 border-slate-100 pb-4">
                Sloupcový graf
              </h2>
              <ul className="text-xl text-slate-600 mb-10 space-y-3 flex-1 leading-relaxed">
                <li>• Slouží k <strong>porovnávání hodnot</strong>.</li>
                <li>• Výška sloupce = velikost hodnoty.</li>
                <li>• Ideální pro přehled mezi odlišnými položkami (např. měsíce).</li>
              </ul>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 pt-12 relative flex flex-col">
                <h3 className="text-center font-black text-slate-700 text-2xl absolute top-4 left-0 right-0">Prodeje jablek</h3>
                
                <div className="flex flex-1 mt-10">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-6">
                    <span className="text-base font-black text-slate-500 uppercase tracking-widest -rotate-90 whitespace-nowrap">Prodáno (kg)</span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 h-96 flex items-end justify-around gap-6 relative pl-10 pb-10">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-base text-slate-400 font-mono font-bold items-end pr-3">
                      <span>100</span><span>50</span><span>0</span>
                    </div>
                    {/* Sloupce s popisky na ose X */}
                    <div className="w-28 flex flex-col items-center gap-4 group h-full justify-end">
                      <div className="w-full bg-blue-500 rounded-t-lg h-[60%] shadow-md relative"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">60</span></div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Leden</span>
                    </div>
                    <div className="w-28 flex flex-col items-center gap-4 group h-full justify-end">
                      <div className="w-full bg-blue-500 rounded-t-lg h-[90%] shadow-md relative"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">90</span></div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Únor</span>
                    </div>
                    <div className="w-28 flex flex-col items-center gap-4 group h-full justify-end">
                      <div className="w-full bg-blue-500 rounded-t-lg h-[40%] shadow-md relative"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">40</span></div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Březen</span>
                    </div>
                    <div className="w-28 flex flex-col items-center gap-4 group h-full justify-end">
                      <div className="w-full bg-blue-500 rounded-t-lg h-[75%] shadow-md relative"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">75</span></div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Duben</span>
                    </div>
                    {/* Osa X - čára */}
                    <div className="absolute left-10 right-0 bottom-10 h-0.5 bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skládaný graf */}
            <div className="bg-white rounded-[2rem] p-10 border-2 border-slate-200 shadow-lg flex flex-col">
              <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tight border-b-2 border-slate-100 pb-4">
                Skládaný graf
              </h2>
              <ul className="text-xl text-slate-600 mb-10 space-y-3 flex-1 leading-relaxed">
                <li>• Ukazuje <strong>celkovou hodnotu</strong> a její <strong>složení</strong>.</li>
                <li>• Každý sloupec je rozdělen na segmenty.</li>
                <li>• Různá celková výška sloupců.</li>
              </ul>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 pt-12 relative flex flex-col">
                <h3 className="text-center font-black text-slate-700 text-2xl absolute top-4 left-0 right-0">Prodeje ovoce celkem</h3>
                
                <div className="flex justify-center mt-6 mb-6">
                  <div className="flex items-center gap-6 text-base font-black text-slate-600">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-md"></div> Jablka</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-500 rounded-md"></div> Hrušky</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-400 rounded-md"></div> Banány</div>
                  </div>
                </div>

                <div className="flex flex-1 mt-4">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-6">
                    <span className="text-base font-black text-slate-500 uppercase tracking-widest -rotate-90 whitespace-nowrap">Prodáno (kg)</span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 h-96 flex items-end justify-around gap-6 relative pl-10 pb-10">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-base text-slate-400 font-mono font-bold items-end pr-3">
                      <span>150</span><span>75</span><span>0</span>
                    </div>
                    {/* Sloupce */}
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-[60%]">
                        <div className="w-full h-[40%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">36 kg</span></div>
                        <div className="w-full h-[40%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">36 kg</span></div>
                        <div className="w-full h-[20%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 whitespace-nowrap drop-shadow-md">18 kg</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Leden</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-[90%]">
                        <div className="w-full h-[30%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">40 kg</span></div>
                        <div className="w-full h-[50%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">67 kg</span></div>
                        <div className="w-full h-[20%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 whitespace-nowrap drop-shadow-md">27 kg</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Únor</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-[40%]">
                        <div className="w-full h-[50%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">30 kg</span></div>
                        <div className="w-full h-[20%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">12 kg</span></div>
                        <div className="w-full h-[30%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 whitespace-nowrap drop-shadow-md">18 kg</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Březen</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-[75%]">
                        <div className="w-full h-[30%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">34 kg</span></div>
                        <div className="w-full h-[30%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white whitespace-nowrap drop-shadow-md">34 kg</span></div>
                        <div className="w-full h-[40%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 whitespace-nowrap drop-shadow-md">45 kg</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Duben</span>
                    </div>
                    {/* Osa X */}
                    <div className="absolute left-10 right-0 bottom-10 h-0.5 bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 100% Skládaný graf */}
            <div className="bg-white rounded-[2rem] p-10 border-2 border-slate-200 shadow-lg flex flex-col">
              <h2 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-tight border-b-2 border-slate-100 pb-4">
                100% Skládaný
              </h2>
              <ul className="text-xl text-slate-600 mb-10 space-y-3 flex-1 leading-relaxed">
                <li>• Všechny sloupce jsou <strong>stejně vysoké</strong> (100 %).</li>
                <li>• Neukazuje absolutní množství.</li>
                <li>• Zvýrazňuje <strong>procentuální podíl</strong>.</li>
              </ul>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 pt-12 relative flex flex-col">
                <h3 className="text-center font-black text-slate-700 text-2xl absolute top-4 left-0 right-0">Podíl druhů ovoce</h3>
                
                <div className="flex justify-center mt-6 mb-6">
                  <div className="flex items-center gap-6 text-base font-black text-slate-600">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-md"></div> Jablka</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-500 rounded-md"></div> Hrušky</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-400 rounded-md"></div> Banány</div>
                  </div>
                </div>

                <div className="flex flex-1 mt-4">
                  {/* Popisek osy Y */}
                  <div className="flex items-center mr-6">
                    <span className="text-base font-black text-slate-500 uppercase tracking-widest -rotate-90 whitespace-nowrap">Podíl (%)</span>
                  </div>
                  
                  {/* Samotný graf */}
                  <div className="flex-1 h-96 flex items-end justify-around gap-6 relative pl-10 pb-10">
                    {/* Hodnoty osy Y */}
                    <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-base text-slate-400 font-mono font-bold items-end pr-3">
                      <span>100</span><span>50</span><span>0</span>
                    </div>
                    {/* Sloupce */}
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-full">
                        <div className="w-full h-[40%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">40%</span></div>
                        <div className="w-full h-[40%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">40%</span></div>
                        <div className="w-full h-[20%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 drop-shadow-md">20%</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Leden</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-full">
                        <div className="w-full h-[30%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">30%</span></div>
                        <div className="w-full h-[50%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">50%</span></div>
                        <div className="w-full h-[20%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 drop-shadow-md">20%</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Únor</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-full">
                        <div className="w-full h-[50%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">50%</span></div>
                        <div className="w-full h-[20%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">20%</span></div>
                        <div className="w-full h-[30%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 drop-shadow-md">30%</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Březen</span>
                    </div>
                    <div className="w-28 h-full flex flex-col items-center justify-end">
                      <div className="w-full flex flex-col-reverse shadow-md h-full">
                        <div className="w-full h-[30%] bg-blue-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">30%</span></div>
                        <div className="w-full h-[30%] bg-purple-500 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white drop-shadow-md">30%</span></div>
                        <div className="w-full h-[40%] bg-emerald-400 rounded-t-lg relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-emerald-950 drop-shadow-md">40%</span></div>
                      </div>
                      <span className="text-base font-black text-slate-600 absolute bottom-2">Duben</span>
                    </div>
                    {/* Osa X */}
                    <div className="absolute left-10 right-0 bottom-10 h-0.5 bg-slate-300"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-6 text-sm font-bold text-slate-600 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Jablka</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-sm"></div> Hrušky</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-400 rounded-sm"></div> Banány</div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'simulator' && (
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
      )}

      {activeTab === 'list' && (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
          
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 border border-emerald-100 shadow-sm text-center mb-10">
            <h2 className="text-3xl font-black text-slate-800 mb-4 uppercase tracking-tight">Vlastní průzkum dat</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Zkuste si celým procesem projít na vlastní pěst. Vaším úkolem bude najít data, zpracovat je do tabulky a vizualizovat tak, aby z nich mohl kdokoliv rychle vyčíst to nejdůležitější.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            
            {/* Úkol 1 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Search className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                    <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 1</span>
                    Lovci dat (Sběr informací)
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                    <p>Vyhledejte na internetu aktuální statistiku k <strong>jednomu</strong> z následujících témat:</p>
                    <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
                      <li>5 nejodebíranějších YouTuberů v ČR (a jejich počet odběratelů).</li>
                      <li>5 nejhranějších PC/Konzolových her současnosti (počet aktivních hráčů).</li>
                      <li>5 nejlidnatějších států Evropy (počet obyvatel).</li>
                    </ul>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-xs font-medium"><strong>Tip:</strong> Ověřte si, že je váš zdroj důvěryhodný (např. oficiální statistiky nebo známé herní portály). Nezapomeňte si odkaz na zdroj uložit!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Úkol 2 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <TableProperties className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 2</span>
                    Tabulkový procesor (Zpracování)
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                    <p>Otevřete si <strong>MS Excel</strong> nebo <strong>Google Tabulky</strong> a vytvořte novou prázdnou tabulku.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Vytvořte si dva sloupce. První bude obsahovat kategorii (např. "Název hry") a druhý samotné hodnoty (např. "Počet hráčů v milionech").</li>
                      <li>Zapište data, která jste v prvním kroku našli.</li>
                      <li>Zvýrazněte hlavičku tabulky, aby byla přehledná.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Úkol 3 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                  <LineChart className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                    <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 3</span>
                    Vizualizace (Tvorba grafu)
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                    <p>Nyní z vaší tabulky vygenerujte <strong>Sloupcový graf</strong> přímo v programu.</p>
                    <p>Graf musí splňovat následující pravidla, aby byl profesionální:</p>
                    <ol className="list-decimal pl-5 space-y-2 font-medium text-slate-700">
                      <li>Musí mít výstižný <strong>nadpis</strong> (např. "Nejhranější hry roku 2024").</li>
                      <li>Musí mít <strong>pojmenované obě osy</strong> (Osa X i Osa Y).</li>
                      <li>Data musí být snadno čitelná (vhodné měřítko a velikost písma).</li>
                    </ol>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-4">
                      <p className="text-purple-800 text-xs font-medium"><strong>⭐ Bonus pro rychlíky:</strong> Zkuste změnit barvu sloupce, který představuje největší hodnotu (tzv. vítěze), na odlišnou barvu než mají ostatní sloupce. Tím na něj okamžitě upozorníte.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Úkol 4 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-sm relative overflow-hidden group hover:border-pink-300 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Lightbulb className="w-8 h-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                    <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 4</span>
                    Analýza (Závěry)
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                    <p>Samotný graf je k ničemu, pokud z něj neumíme vyvodit závěry. Podívejte se na svůj hotový graf a zamyslete se.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Napište pod graf <strong>dvě jasná zjištění</strong>, která z něj vyplývají.</li>
                      <li><em>Příklad:</em> "První místo má téměř dvakrát více hráčů než druhé místo." nebo "Rozdíly mezi 3., 4. a 5. místem jsou už velmi malé."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </FsChapterShell>
  );
};

export default BarChartsChapter;
