'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Download, 
  Printer, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';
import { THEMATIC_PLANS, ThematicPlan, ThematicBlock } from '@/registry/curriculum/thematicPlans';

interface ThematicPlanViewProps {
  subjectId: 'ops1' | 'ops2' | 'ops3';
}

export default function ThematicPlanView({ subjectId }: ThematicPlanViewProps) {
  const router = useRouter();
  const plan: ThematicPlan | undefined = THEMATIC_PLANS[subjectId];

  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});

  if (!plan) {
    return (
      <div className="p-8 text-center text-slate-600">
        Tematický plán pro předmět nebyl nalezen.
      </div>
    );
  }

  // Toggle expand / collapse block
  const toggleBlock = (blockId: string) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [blockId]: !prev[blockId]
    }));
  };

  // Expand / collapse all
  const expandAll = () => {
    const all: Record<string, boolean> = {};
    plan.blocks.forEach(b => { all[b.id] = true; });
    setExpandedBlocks(all);
  };

  const collapseAll = () => {
    setExpandedBlocks({});
  };

  // Filter blocks
  const filteredBlocks = selectedMonth === 'all' 
    ? plan.blocks 
    : plan.blocks.filter(b => b.monthKey === selectedMonth || b.month.toLowerCase().includes(selectedMonth));

  // Totals
  const totalTheoryHours = plan.blocks.reduce((acc, b) => acc + b.theoryHours, 0);
  const totalPracticeHours = plan.blocks.reduce((acc, b) => acc + b.practiceHours, 0);

  // Export to Word (.doc HTML blob)
  const handleExportWord = () => {
    const title = `Tematický plán – ${plan.subjectTitle} (${plan.gradeLabel})`;
    
    let rowsHtml = '';
    plan.blocks.forEach((b) => {
      rowsHtml += `
        <tr style="background-color: #f1f5f9; font-weight: bold;">
          <td colspan="5" style="padding: 10px; border: 1pt solid #94a3b8; font-size: 11pt; color: #0f172a;">
            ${b.order}. ${b.title} (${b.month}, ${b.weeks}) — CELKEM: ${b.hours} h (Teorie: ${b.theoryHours} h, Cvičení: ${b.practiceHours} h)
          </td>
        </tr>
        <tr style="background-color: #e2e8f0; font-size: 9pt; color: #475569;">
          <th style="padding: 6px; border: 1pt solid #cbd5e1; width: 60px;">Měsíc</th>
          <th style="padding: 6px; border: 1pt solid #cbd5e1;">Téma a konkrétní učivo</th>
          <th style="padding: 6px; border: 1pt solid #cbd5e1; width: 70px;">Dotace</th>
          <th style="padding: 6px; border: 1pt solid #cbd5e1; width: 90px;">Forma</th>
          <th style="padding: 6px; border: 1pt solid #cbd5e1;">Praktická činnost a laboratorní cvičení</th>
        </tr>
      `;

      b.subtopics.forEach((sub, sIdx) => {
        const typeLabel = sub.type === 'teorie' ? 'Teorie' 
          : sub.type === 'laborator' ? 'Laboratoř' 
          : sub.type === 'test' ? 'Hodnocení / Test' 
          : sub.type === 'projekt' ? 'Projekt' : 'Kombinované';

        rowsHtml += `
          <tr>
            <td style="padding: 6px; border: 1pt solid #cbd5e1; font-size: 9pt; text-align: center; color: #64748b;">
              ${sIdx === 0 ? b.month : ''}
            </td>
            <td style="padding: 6px; border: 1pt solid #cbd5e1; font-size: 9.5pt;">
              <strong>${sub.title}</strong><br/>
              <span style="font-size: 8.5pt; color: #475569;">${sub.description}</span>
            </td>
            <td style="padding: 6px; border: 1pt solid #cbd5e1; font-size: 9.5pt; text-align: center; font-weight: bold; color: #1e293b;">
              ${sub.hours} h
            </td>
            <td style="padding: 6px; border: 1pt solid #cbd5e1; font-size: 8.5pt; text-align: center; color: #334155;">
              ${typeLabel}
            </td>
            <td style="padding: 6px; border: 1pt solid #cbd5e1; font-size: 8.5pt; color: #334155;">
              ${sub.practice}
            </td>
          </tr>
        `;
      });
    });

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <style>
          body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 10pt; line-height: 1.4; color: #1e293b; margin: 15mm; }
          h1 { color: #0f172a; font-size: 18pt; margin-bottom: 4px; text-transform: uppercase; }
          .meta { font-size: 10pt; color: #475569; margin-bottom: 16px; padding: 10px; background-color: #f8fafc; border-left: 4pt solid #3b82f6; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background-color: #f1f5f9; text-align: left; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="meta">
          <strong>Obor vzdělání:</strong> ${plan.fieldCode} ${plan.fieldTitle} | <strong>Ročník:</strong> ${plan.gradeLabel}<br/>
          <strong>Týdenní dotace:</strong> ${plan.weeklyHours} hodiny týdně | <strong>Celková dotace:</strong> ${plan.totalHours} vyučovacích hodin (${plan.weeksCount} výukových týdnů)<br/>
          <strong>Rozdělení výuky:</strong> Teorie cca ${totalTheoryHours} h (${Math.round((totalTheoryHours/plan.totalHours)*100)} %), Praktická a laboratorní cvičení ${totalPracticeHours} h (${Math.round((totalPracticeHours/plan.totalHours)*100)} %) | <strong>Školní rok:</strong> ${plan.academicYear}
        </div>
        <table>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tematicky_plan_${plan.subjectId.toUpperCase()}_${plan.academicYear.replace('/', '-')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  const monthsList = [
    { key: 'all', label: 'Celý školní rok (66 h)' },
    { key: 'zari', label: 'Září' },
    { key: 'rijen', label: 'Říjen' },
    { key: 'listopad', label: 'Listopad' },
    { key: 'prosinec', label: 'Prosinec' },
    { key: 'leden', label: 'Leden' },
    { key: 'unor', label: 'Únor' },
    { key: 'brezen', label: 'Březen' },
    { key: 'duben', label: 'Duben' },
    { key: 'kveten', label: 'Květen' },
    { key: 'cerven', label: 'Červen' },
  ];

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 animate-in fade-in duration-500">
      
      {/* Hlavní skleněný rámec IntLab */}
      <div className="bg-white/85 backdrop-blur-xl p-6 sm:p-12 rounded-[3rem] shadow-2xl border-4 border-white flex flex-col items-center relative overflow-hidden">
        
        {/* Horní navigační lišta */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          <button
            onClick={() => router.push(`/specializovana/operacni-systemy-${plan.grade}`)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na přehled {plan.subjectTitle}</span>
          </button>

          {/* Exportní akce */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Vytisknout tematický plán"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Tisk</span>
            </button>
            <button
              onClick={handleExportWord}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export do Wordu (.doc)</span>
            </button>
          </div>
        </div>

        {/* Hlavička tematického plánu */}
        <div className="text-center max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Školní vzdělávací program & RVP {plan.fieldCode}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-3">
            Tematický plán: {plan.subjectTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Časový a obsahový rozpis učiva pro <strong>{plan.gradeLabel}</strong> v oboru <strong>{plan.fieldTitle}</strong>. 
            Celková roční hodinová dotace činí <strong>{plan.totalHours} vyučovacích hodin</strong> rozvržených do 33 týdnů (2 hodiny týdně).
          </p>
        </div>

        {/* 4 Přehledové statistické karty */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
            <div className="text-[11px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Celková dotace</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{plan.totalHours} h</span>
              <span className="text-xs text-slate-500 block mt-0.5">{plan.weeksCount} týdnů × 2 h/týden</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col justify-between">
            <div className="text-[11px] font-mono font-bold uppercase text-blue-700 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Teorie</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-900">{totalTheoryHours} h</span>
              <span className="text-xs text-blue-700 block mt-0.5">cca {Math.round((totalTheoryHours / plan.totalHours) * 100)} % dotace</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col justify-between">
            <div className="text-[11px] font-mono font-bold uppercase text-emerald-700 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cvičení & Laboratoře</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-900">{totalPracticeHours} h</span>
              <span className="text-xs text-emerald-700 block mt-0.5">cca {Math.round((totalPracticeHours / plan.totalHours) * 100)} % dotace</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex flex-col justify-between">
            <div className="text-[11px] font-mono font-bold uppercase text-indigo-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tematické bloky</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black text-indigo-900">{plan.blocks.length} bloků</span>
              <span className="text-xs text-indigo-700 block mt-0.5">Září ➔ Červen</span>
            </div>
          </div>
        </div>

        {/* Filtrační lišta podle měsíců + ovládání rozbalení */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Měsíční pilulky */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
            {monthsList.map(m => (
              <button
                key={m.key}
                onClick={() => setSelectedMonth(m.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  selectedMonth === m.key
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Rozbalit / Sbalit vše */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={expandAll}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Rozbalit vše
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={collapseAll}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Sbalit vše
            </button>
          </div>
        </div>

        {/* Seznam bloků a jejich podtémat */}
        <div className="w-full space-y-6">
          {filteredBlocks.map((block) => {
            const isExpanded = expandedBlocks[block.id] !== false; // default expanded

            return (
              <div 
                key={block.id}
                className="w-full bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm overflow-hidden transition-all text-left"
              >
                {/* Hlavička bloku */}
                <div 
                  onClick={() => toggleBlock(block.id)}
                  className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors select-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      {block.order}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-mono font-bold">
                          {block.month} · {block.weeks}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold">
                          {block.hours} hodin
                        </span>
                        <span className="text-xs text-slate-400 hidden md:inline">
                          (Teorie {block.theoryHours} h / Cvičení {block.practiceHours} h)
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {block.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {block.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {block.subtopics.length} podtémat
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Rozbalený obsah: Tabulka podtémat */}
                {isExpanded && (
                  <div className="border-t border-slate-200 p-4 sm:p-6 space-y-4 bg-slate-50/40">
                    {/* RVP Očekávaný výstup */}
                    <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900">Očekávaný výstup RVP:</strong> {block.rvpCompetence}
                      </div>
                    </div>

                    {/* Responzivní tabulka podtémat */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                            <th className="py-3 px-4 w-12 text-center">#</th>
                            <th className="py-3 px-4 min-w-[220px]">Konkrétní téma / Lekce</th>
                            <th className="py-3 px-3 w-20 text-center">Dotace</th>
                            <th className="py-3 px-3 w-28 text-center">Typ</th>
                            <th className="py-3 px-4 min-w-[280px]">Praktická činnost a laboratoř žáka</th>
                            <th className="py-3 px-3 w-24 text-center">IntLab</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {block.subtopics.map((sub, sIdx) => {
                            const badgeStyle = 
                              sub.type === 'teorie' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              sub.type === 'laborator' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                              sub.type === 'test' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                              sub.type === 'projekt' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                              'bg-amber-100 text-amber-800 border-amber-200';

                            const badgeLabel = 
                              sub.type === 'teorie' ? 'Teorie' :
                              sub.type === 'laborator' ? 'Laboratoř' :
                              sub.type === 'test' ? 'Test / Práce' :
                              sub.type === 'projekt' ? 'Projekt' : 'Kombinované';

                            return (
                              <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-mono font-bold text-slate-400 text-center">
                                  {block.order}.{sIdx + 1}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-slate-900 text-sm">{sub.title}</div>
                                  <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{sub.description}</div>
                                </td>
                                <td className="py-3.5 px-3 text-center">
                                  <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                                    {sub.hours} h
                                  </span>
                                </td>
                                <td className="py-3.5 px-3 text-center">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
                                    {badgeLabel}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-slate-600 leading-relaxed text-xs">
                                  {sub.practice}
                                </td>
                                <td className="py-3.5 px-3 text-center">
                                  {sub.route ? (
                                    <button
                                      onClick={() => router.push(sub.route!)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-all cursor-pointer border border-indigo-200"
                                      title="Přejít na lekci"
                                    >
                                      <span>Otevřít</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  ) : (
                                    <span className="text-slate-300 font-mono text-xs">—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Spodní shrnutí a metodická poznámka */}
        <div className="w-full mt-10 p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 text-left space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Metodické poznámky k realizaci tematického plánu:</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hodinová dotace pro podtémata je orientační a vyučující ji může operativně přizpůsobit aktuálnímu tempu třídy a počtu laboratorních úloh. 
            Všechna témata plně respektují standard Rámcového vzdělávacího programu pro obor <strong>18-20-M/01 Informační technologie</strong> a kladou důraz 
            na praktickou práci v reálném systému (Windows 11 / Ubuntu Server ve VirtualBoxu) a interaktivních simulátorech portálu IntLab.
          </p>
        </div>

      </div>

    </div>
  );
}
