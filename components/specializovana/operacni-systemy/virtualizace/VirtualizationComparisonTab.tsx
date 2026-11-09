'use client';

import React from 'react';
import { Info } from 'lucide-react';

export const VirtualizationComparisonTab: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
      <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase">Srovnání architektury hypervizorů</h2>
      <p className="text-slate-600 font-medium max-w-3xl mx-auto mb-8">
        Hypervizory se dělí do dvou hlavních kategorií. <strong>Typ 2 (Hosted)</strong>, zástupcem je například VirtualBox, běží nad standardním operačním systémem. Je vhodný pro testování a vývoj. <strong>Typ 1 (Bare Metal)</strong> je určen pro produkční servery. Instaluje se přímo na fyzický hardware, čímž eliminuje režii hostitelského operačního systému a maximalizuje výkon virtuálních strojů.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative mt-8">
        {/* TYPE 2 (Desktop) */}
        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col items-center shadow-sm">
          <h3 className="text-xl font-black text-indigo-700 uppercase mb-2">Typ 2: Běžící nad OS</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Příklad: VirtualBox, VMware Workstation</p>
          
          <div className="w-full flex flex-col items-center gap-3 relative font-medium">
            <div className="flex gap-4 w-full justify-center">
              <div className="flex-1 max-w-[140px] p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center text-emerald-900 text-sm shadow-md">
                <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                Linux
              </div>
              <div className="flex-1 max-w-[140px] p-4 bg-sky-50 border-2 border-sky-400 rounded-xl text-center text-sky-900 text-sm shadow-md">
                <div className="text-2xl mb-1 drop-shadow-sm">🪟</div>
                Windows
              </div>
            </div>
            
            <div className="w-full max-w-sm p-4 bg-indigo-600 border-2 border-indigo-400 rounded-xl text-center text-white font-bold shadow-md">
              Hypervizor Typu 2
            </div>
            
            <div className="w-full max-w-sm p-4 bg-blue-100 border-2 border-blue-400 rounded-xl text-center text-blue-900 font-bold shadow-md">
              Hostitelský OS
            </div>
            
            <div className="w-full max-w-sm p-4 bg-slate-200 border-2 border-slate-300 rounded-xl text-center text-slate-700 font-bold shadow-md">
              Fyzický Hardware
            </div>
          </div>
        </div>

        {/* TYPE 1 (Bare Metal) */}
        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col items-center shadow-sm">
          <h3 className="text-xl font-black text-rose-700 uppercase mb-2">Typ 1: Bare Metal</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Příklad: VMware ESXi, Proxmox VE</p>
          
          <div className="w-full flex flex-col items-center gap-3 relative h-full justify-end font-medium">
            <div className="flex gap-3 w-full justify-center">
              <div className="flex-1 max-w-[110px] p-3 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center text-emerald-900 text-xs shadow-md">
                <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                <div className="font-black leading-tight">Linux VM</div>
                <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-emerald-200 pt-1">Webserver</div>
              </div>
              <div className="flex-1 max-w-[110px] p-3 bg-sky-50 border-2 border-sky-400 rounded-xl text-center text-sky-900 text-xs shadow-md">
                <div className="text-2xl mb-1 drop-shadow-sm">🪟</div>
                <div className="font-black leading-tight">Windows VM</div>
                <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-sky-200 pt-1">Databáze</div>
              </div>
              <div className="flex-1 max-w-[110px] p-3 bg-orange-50 border-2 border-orange-400 rounded-xl text-center text-orange-900 text-xs shadow-md">
                <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                <div className="font-black leading-tight">Linux VM</div>
                <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-orange-200 pt-1">Firewall</div>
              </div>
            </div>
            
            <div className="w-full max-w-sm p-4 bg-rose-600 border-2 border-rose-400 rounded-xl text-center text-white font-bold h-[100px] flex items-center justify-center flex-col shadow-md">
              Hypervizor Typu 1
              <span className="text-[10px] font-normal text-rose-100 uppercase tracking-widest mt-1">Běží přímo na hardwaru</span>
            </div>
            
            <div className="w-full max-w-sm p-4 bg-slate-200 border-2 border-slate-300 rounded-xl text-center text-slate-700 font-bold shadow-md">
              Fyzický Hardware
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 text-left flex gap-4">
        <Info className="w-8 h-8 text-blue-600 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Zásadní architektonický rozdíl</h4>
          <p className="text-sm text-blue-800">
            Diagram názorně ilustruje vrstvení technologií. U hypervizorů typu 2 musí veškerá komunikace s hardwarem procházet přes hostitelský operační systém, což způsobuje dodatečnou režii a snižuje celkový výkon. Z tohoto důvodu se v serverových prostředích standardně využívají hypervizory typu 1.
          </p>
        </div>
      </div>
    </div>
  </div>
);

