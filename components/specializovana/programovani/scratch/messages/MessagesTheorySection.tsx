"use client";

import React from 'react';
import { Radio, Bell, Users, Clock, Server } from 'lucide-react';
import { ScratchBlock, ScratchInput } from '../ScratchBlocks';

export const MessagesTheorySection = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-white mb-8 space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <Radio className="w-6 h-6 text-amber-600" />
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
          Co jsou to události a zprávy ve Scratchi?
        </h2>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">
        Doposud scénáře reagovaly na základní vstupy: kliknutí na zelenou vlajku, stisk klávesy nebo kliknutí na postavu. 
        <strong> Zprávy (Broadcast)</strong> posouvají programování na novou úroveň – umožňují <strong>jedné postavě poslat signál jiné postavě (nebo scéně)</strong> a vyvolat v ní okamžitou akci.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-4">
          <h4 className="font-black text-amber-900 text-sm uppercase mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            1. Signál (1:1)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Jedna postava (např. tlačítko) vyšle signál a druhá postava (např. kocour) na něj zareaguje.
          </p>
        </div>

        <div className="bg-orange-50/60 border-2 border-orange-200 rounded-2xl p-4">
          <h4 className="font-black text-orange-900 text-sm uppercase mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-600" />
            2. Rozhlas (1:N)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zprávu uslyší <strong>všechny postavy</strong> v projektu. Každá postava může mít pro stejnou zprávu připravenou jinou vlastní reakci.
          </p>
        </div>

        <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-4">
          <h4 className="font-black text-emerald-900 text-sm uppercase mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            3. Synchronizace (a čekej)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Odesílatel zprávu vyšle a <strong>počká</strong>, dokud příjemce svůj úkol úplně nedokončí. Teprve pak odesílatel pokračuje dál.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-3">
          Klíčové bloky (Kategorie Události – žlutá):
        </h4>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">zpráva1</ScratchInput></ScratchBlock>
          <ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">zpráva1</ScratchInput> a čekej</ScratchBlock>
          <ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zpráva1</ScratchInput></ScratchBlock>
        </div>
      </div>
    </div>
  );
};
