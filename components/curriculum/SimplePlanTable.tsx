'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Calendar, FileText } from 'lucide-react';
import { SvpGradeData } from '@/registry/curriculum/svpData';
import SvpInspisTable from './SvpInspisTable';

export interface PlanSubtopic {
  name: string;
  hours: number;
  note?: string;
}

export interface PlanTopic {
  month: string;
  topic: string;
  topicHours: number;
  subtopics: PlanSubtopic[];
}

interface SimplePlanTableProps {
  title: string;
  gradeLabel: string;
  backRoute: string;
  topics: PlanTopic[];
  svpData?: SvpGradeData;
}

export default function SimplePlanTable({
  title,
  gradeLabel,
  backRoute,
  topics,
  svpData,
}: SimplePlanTableProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'plan' | 'svp'>('plan');

  const totalHours = topics.reduce((acc, t) => acc + t.topicHours, 0);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Hlavní kontejner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-sm">
        
        {/* Horní lišta s tlačítky */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <button
            onClick={() => router.push(backRoute)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na předmět</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            title="Vytisknout aktuální zobrazení"
          >
            <Printer className="w-4 h-4" />
            <span>Tisk</span>
          </button>
        </div>

        {/* Hlavička */}
        <div className="mb-6 text-left">
          <span className="text-xs font-mono font-bold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {gradeLabel} · Školní rok 2026/2027
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-2 mb-1">
            {activeTab === 'plan' ? `Tematický plán: ${title}` : `Školní vzdělávací program: ${title}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Celková dotace: <strong>{totalHours} hodin</strong> (33 týdnů × 2 hodiny týdně) · Obor: <strong>18-20-M/01 Informační technologie</strong>
          </p>
        </div>

        {/* Přepínač záložek: Tematický plán vs. ŠVP pro InspIS */}
        {svpData && (
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-8 max-w-fit">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Měsíční plán výuky ({totalHours} h)</span>
            </button>

            <button
              onClick={() => setActiveTab('svp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'svp'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ŠVP pro InspIS ({svpData.totalHours} h)</span>
            </button>
          </div>
        )}

        {/* OBSAH ZÁLOŽKY: ŠVP PRO INSPIS */}
        {activeTab === 'svp' && svpData ? (
          <SvpInspisTable
            title={title}
            gradeLabel={gradeLabel}
            data={svpData}
          />
        ) : (
          /* OBSAH ZÁLOŽKY: MĚSÍČNÍ TEMATICKÝ PLÁN */
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 shadow-xs">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-800 text-white font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th className="py-3 px-3.5 border-r border-slate-700 w-24 text-center">Měsíc</th>
                  <th className="py-3 px-4 border-r border-slate-700 w-1/3 min-w-[220px]">Hlavní téma (celek)</th>
                  <th className="py-3 px-4 border-r border-slate-700 min-w-[260px]">Podtéma / Probrané učivo</th>
                  <th className="py-3 px-3 border-r border-slate-700 w-20 text-center">Hodin</th>
                  <th className="py-3 px-4 min-w-[180px]">Poznámka / Praktická činnost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                {topics.map((topic, tIdx) => {
                  const subCount = topic.subtopics.length;
                  const isEvenBlock = tIdx % 2 === 0;
                  const blockBg = isEvenBlock ? 'bg-white' : 'bg-slate-50/60';

                  return topic.subtopics.map((sub, sIdx) => {
                    const isFirst = sIdx === 0;

                    return (
                      <tr 
                        key={`${tIdx}-${sIdx}`} 
                        className={`hover:bg-indigo-50/40 transition-colors ${blockBg}`}
                      >
                        {/* Sloupec Měsíc (sloučený pro celý blok) */}
                        {isFirst && (
                          <td 
                            rowSpan={subCount} 
                            className="py-3.5 px-3 border-r-2 border-slate-300 font-bold text-center align-top text-slate-700 bg-slate-100/70"
                          >
                            <span className="font-mono text-xs uppercase block tracking-wider">
                              {topic.month}
                            </span>
                          </td>
                        )}

                        {/* Sloupec Hlavní téma (sloučený pro celý blok) */}
                        {isFirst && (
                          <td 
                            rowSpan={subCount} 
                            className="py-3.5 px-4 border-r-2 border-slate-300 align-top text-slate-900"
                          >
                            <div className="font-black text-sm text-slate-900">
                              {tIdx + 1}. {topic.topic}
                            </div>
                            <div className="mt-1.5 inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200">
                              Celkem: {topic.topicHours} h
                            </div>
                          </td>
                        )}

                        {/* Sloupec Podtéma */}
                        <td className="py-2.5 px-4 border-r border-slate-200 font-medium text-slate-800">
                          {sub.name}
                        </td>

                        {/* Sloupec Hodin podtématu */}
                        <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-center text-slate-900">
                          {sub.hours} h
                        </td>

                        {/* Sloupec Poznámka / Praxe */}
                        <td className="py-2.5 px-4 text-xs text-slate-500">
                          {sub.note || '—'}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                  <td colSpan={3} className="py-3 px-4 text-right border-r border-slate-800">
                    Celková roční hodinová dotace:
                  </td>
                  <td className="py-3 px-3 text-center border-r border-slate-800 font-mono text-emerald-400 font-black text-sm">
                    {totalHours} h
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-normal text-xs">
                    33 výukových týdnů × 2 h/týden
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
