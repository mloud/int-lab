'use client';
import React from 'react';
import { BookOpen, FileText, BarChart3, AlertCircle, Activity, Search, TableProperties, LineChart, Lightbulb } from 'lucide-react';

export const BarChartsTheoryTab: React.FC = () => (
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
);
