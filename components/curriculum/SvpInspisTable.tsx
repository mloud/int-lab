'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award, 
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  SvpGradeData, 
  SVP_SHARED_INFO, 
  SvpOutcomeBlock 
} from '@/registry/curriculum/svpData';

interface SvpInspisTableProps {
  title: string;
  gradeLabel: string;
  data: SvpGradeData;
}

export default function SvpInspisTable({
  title,
  gradeLabel,
  data
}: SvpInspisTableProps) {
  const [showShared, setShowShared] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Generování tabulkového textu pro InspIS / Word / Excel
  const generateInspisTableText = () => {
    let output = `ŠKOLNÍ VZDĚLÁVACÍ PROGRAM (ŠVP) – ${title.toUpperCase()}\n`;
    output += `Ročník: ${data.gradeLabel} · Obor: ${SVP_SHARED_INFO.fieldCode} ${SVP_SHARED_INFO.fieldName}\n`;
    output += `Celková hodinová dotace: ${data.totalHours} h\n`;
    output += `--------------------------------------------------------------------------------\n\n`;

    data.blocks.forEach((block) => {
      output += `CELKOVÉ TÉMA: ${block.topic.toUpperCase()} (${block.hours} h)\n`;
      if (block.crossThemes.length > 0) {
        output += `Průřezová témata: ${block.crossThemes.join(', ')}\n`;
      }
      output += `\n[VÝSLEDKY VZDĚLÁVÁNÍ - Žák:]\n`;
      block.outcomes.forEach((o) => {
        output += ` • ${o}\n`;
      });
      output += `\n[ROZPIS UČIVA:]\n`;
      block.content.forEach((c) => {
        output += ` • ${c}\n`;
      });
      output += `\n--------------------------------------------------------------------------------\n\n`;
    });

    return output;
  };

  // Generování kompletního textu pro InspIS včetně charakteristiky
  const generateFullSvpText = () => {
    let output = `ŠKOLNÍ VZDĚLÁVACÍ PROGRAM: ${SVP_SHARED_INFO.subjectName.toUpperCase()}\n`;
    output += `Obor vzdělání: ${SVP_SHARED_INFO.fieldCode} ${SVP_SHARED_INFO.fieldName}\n\n`;
    output += `1. PRAVIDLA PRO HODNOCENÍ VÝSLEDKŮ VZDĚLÁVÁNÍ ŽÁKŮ:\n`;
    output += `${SVP_SHARED_INFO.evaluation}\n\n`;
    output += `2. PŘÍNOS PŘEDMĚTU PRO ROZVOJ KLÍČOVÝCH KOMPETENCÍ:\n`;
    SVP_SHARED_INFO.keyCompetencies.forEach((k) => {
      output += ` • ${k.title}: ${k.description}\n`;
    });
    output += `\n3. PRŮŘEZOVÁ TÉMATA:\n`;
    SVP_SHARED_INFO.crossCuttingThemes.forEach((t) => {
      output += ` • ${t.code} (${t.name}): ${t.description}\n`;
    });
    output += `\n4. MEZIPŘEDMĚTOVÉ VZTAHY:\n`;
    output += `${SVP_SHARED_INFO.interdisciplinaryRelations}\n\n`;
    output += `================================================================================\n`;
    output += `ROČNÍKOVÁ UČEBNÍ OSNOVA: ${data.gradeLabel} (${data.totalHours} hodin)\n`;
    output += `================================================================================\n\n`;

    data.blocks.forEach((b) => {
      output += `${b.topic} (${b.hours} h)\n`;
      output += `Výsledky: ${b.outcomes.join('; ')}\n`;
      output += `Učivo: ${b.content.join('; ')}\n`;
      if (b.crossThemes.length > 0) {
        output += `PT: ${b.crossThemes.join(', ')}\n`;
      }
      output += `\n`;
    });

    return output;
  };

  return (
    <div className="w-full text-left">
      {/* Nástrojová lišta pro export a tisk */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Standard InspIS ŠVP / ČŠI
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 font-medium">
            3sloupcový formát pro ministerský systém
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(generateInspisTableText(), 'table')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Zkopírovat celou osnovu pro vložení do InspIS"
          >
            {copiedType === 'table' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Zkopírováno!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopírovat pro InspIS</span>
              </>
            )}
          </button>

          <button
            onClick={() => copyToClipboard(generateFullSvpText(), 'full')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Zkopírovat kompletní text ŠVP včetně hodnocení a kompetencí"
          >
            {copiedType === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Celé zkopírováno!</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Vše do schránky</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Vytisknout ŠVP"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Tisk</span>
          </button>
        </div>
      </div>

      {/* Rozbalovací společná část (Hodnocení žáků, Klíčové kompetence, Průřezová témata) */}
      <div className="mb-6 rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 overflow-hidden shadow-xs transition-all">
        <button
          onClick={() => setShowShared(!showShared)}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-indigo-50/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>Společná charakteristika předmětu v InspIS</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-semibold">
                  Společné pro 1.–3. ročník
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pravidla hodnocení žáků, klíčové kompetence a průřezová témata (ČDS, ČSP, ODS)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
            <span>{showShared ? 'Skrýt detail' : 'Zobrazit texty pro InspIS'}</span>
            {showShared ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showShared && (
          <div className="px-5 pb-6 pt-2 border-t border-indigo-100 text-xs sm:text-sm text-slate-700 space-y-5 animate-in fade-in duration-200">
            {/* 1. Hodnocení žáků */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  1. Pravidla pro hodnocení výsledků vzdělávání žáků
                </h4>
                <button
                  onClick={() => copyToClipboard(SVP_SHARED_INFO.evaluation, 'eval')}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedType === 'eval' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'eval' ? 'Zkopírováno' : 'Kopírovat'}</span>
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                {SVP_SHARED_INFO.evaluation}
              </p>
            </div>

            {/* 2. Klíčové kompetence */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  2. Přínos předmětu pro rozvoj klíčových kompetencí
                </h4>
                <button
                  onClick={() => {
                    const text = SVP_SHARED_INFO.keyCompetencies.map(k => `${k.title}:\n${k.description}`).join('\n\n');
                    copyToClipboard(text, 'comp');
                  }}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedType === 'comp' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'comp' ? 'Zkopírováno' : 'Kopírovat'}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {SVP_SHARED_INFO.keyCompetencies.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <strong className="text-slate-900 block mb-1 font-bold">{comp.title}</strong>
                    <span className="text-slate-600 leading-relaxed">{comp.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Průřezová témata */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  3. Průřezová témata (PT)
                </h4>
                <button
                  onClick={() => {
                    const text = SVP_SHARED_INFO.crossCuttingThemes.map(t => `${t.code} (${t.name}):\n${t.description}`).join('\n\n');
                    copyToClipboard(text, 'pt');
                  }}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedType === 'pt' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'pt' ? 'Zkopírováno' : 'Kopírovat'}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {SVP_SHARED_INFO.crossCuttingThemes.map((theme, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-[10px] inline-block mb-1">
                      {theme.code}
                    </span>
                    <strong className="text-slate-900 block font-bold mb-1">{theme.name}</strong>
                    <span className="text-slate-600 leading-relaxed text-[11px] block">{theme.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Mezipředmětové vztahy */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                4. Mezipředmětové vztahy
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {SVP_SHARED_INFO.interdisciplinaryRelations}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Oficiální 3sloupcová tabulka InspIS */}
      <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 shadow-xs">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900 text-white font-bold uppercase text-[11px] sm:text-xs tracking-wider">
              <th className="py-3 px-4 border-r border-slate-800 w-[42%] min-w-[280px]">
                Výsledky vzdělávání (Žák:)
              </th>
              <th className="py-3 px-4 border-r border-slate-800 w-[46%] min-w-[320px]">
                Rozpis učiva
              </th>
              <th className="py-3 px-3 border-r border-slate-800 w-[12%] text-center min-w-[80px]">
                Hodin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-200 bg-white text-slate-800">
            {data.blocks.map((block, idx) => {
              const isEven = idx % 2 === 0;
              const bgClass = isEven ? 'bg-white' : 'bg-slate-50/50';

              return (
                <tr 
                  key={block.id} 
                  className={`hover:bg-purple-50/30 transition-colors align-top ${bgClass}`}
                >
                  {/* Sloupec 1: Výsledky vzdělávání */}
                  <td className="py-4 px-4 border-r-2 border-slate-200">
                    <div className="font-black text-xs uppercase tracking-wider text-purple-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      <span>{block.topic}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      {block.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-0.5">•</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Sloupec 2: Rozpis učiva */}
                  <td className="py-4 px-4 border-r-2 border-slate-200">
                    <ul className="space-y-2 text-xs text-slate-800 leading-relaxed">
                      {block.content.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="text-slate-400 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Průřezová témata štítky */}
                    {block.crossThemes.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                          Průřezová témata:
                        </span>
                        {block.crossThemes.map((code, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Sloupec 3: Hodinová dotace */}
                  <td className="py-4 px-3 text-center font-mono font-black text-base text-purple-950 bg-slate-100/50">
                    {block.hours}&nbsp;h
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider">
              <td colSpan={2} className="py-3 px-4 text-right border-r border-slate-800">
                Celková hodinová dotace ročníku ({data.gradeLabel}):
              </td>
              <td className="py-3 px-3 text-center border-r border-slate-800 font-mono text-emerald-400 font-black text-base">
                {data.totalHours}&nbsp;h
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 text-right text-xs text-slate-400 italic">
        Struktura odpovídá modulu Učební osnovy vyučovacího předmětu v systému InspIS ŠVP (ČŠI).
      </div>
    </div>
  );
}
