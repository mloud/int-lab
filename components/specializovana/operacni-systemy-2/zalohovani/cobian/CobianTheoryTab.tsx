'use client';
import React from 'react';
import { Save, BookOpen, FileText, CheckCircle2, Download, Box, Zap, Layers, Calculator, Activity, HardDrive, Clock } from 'lucide-react';

export const CobianTheoryTab: React.FC = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="bg-purple-50/50 p-6 sm:p-8 rounded-[2rem] border border-purple-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Představení: Cobian Reflector</h2>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-disc pl-4">
                <li><strong>Co to je:</strong> Legenda mezi zálohovacími nástroji zdarma, přímý nástupce Cobian Backup.</li>
                <li><strong>K čemu je vhodný:</strong> Automatické zálohování souborů a složek na lokální disk, flashku nebo síťový NAS. <em>Pozn.: Neukládá obraz celého Windows.</em></li>
                <li><strong>Hlavní výhody:</strong> Zcela ZDARMA i pro komerční použití, kompletně v češtině, extrémně lehký na systémové prostředky.</li>
                <li><strong>Kde ho stáhnout:</strong> Oficiální web <code>cobiansoft.com</code></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-2">Tajemství v pozadí: Atribut "Archivovat"</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">Jak zálohovací program pozná, který soubor je nový nebo se změnil od včerejška? Nečte celý jejich obsah. Windows ke každému souboru lepí skrytý štítek (bit) zvaný <strong>Archivovat (A)</strong>.</p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-4 space-y-1">
                <li>Když soubor vytvoříte nebo upravíte, Windows mu nastaví štítek <code>A</code>.</li>
                <li><strong>Plná a Inkrementální záloha</strong> štítky <code>A</code> po zkopírování <strong>vynulují</strong>.</li>
                <li><strong>Rozdílová záloha</strong> data zkopíruje, ale štítek <code>A</code> nechá nastavený. Další den se tedy stejný soubor zkopíruje znovu.</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-2">Proč Profi nástroj místo skriptu?</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">Obyčejné příkazy typu <code>xcopy</code> nebo <code>robocopy</code> selžou, pokud je dokument otevřený v aplikaci. Profi nástroj to řeší chytřeji:</p>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-4 space-y-1">
                <li><strong>Běží jako Služba (Service):</strong> Nespouští se jako okénko uživatele, běží trvale na pozadí pod systémovým účtem. Zálohuje i o půlnoci, když je uživatel odhlášen.</li>
                <li><strong>Podpora VSS:</strong> Stejně jako Bod obnovení, i Cobian dokáže využít stínovou kopii (VSS). Umí tak bez problému zálohovat běžící databázi nebo rozečtený Word.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Opakování: Typy záloh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Plná (Full)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Vždy zkopíruje <strong>úplně všechny</strong> vybrané soubory znovu.</p>

              {/* Schema: Full */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">B</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">B</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">C</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Stále se kopíruje všechno znovu (i nezměněné A a B).</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Obnova je nejrychlejší (vše je v jedné složce).</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> Zabírá nejvíce místa a tvorba trvá nejdéle.</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Přírůstková (Incremental)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Zkopíruje jen soubory, které se změnily od <strong>POSLEDNÍ (jakékoliv) zálohy</strong>.</p>

              {/* Schema: Incremental */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Plná)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Jen změna)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Jen změna)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">K obnově středy potřebuji: Po + Út + St.</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Bleskově rychlá, extrémně šetří místo.</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> K obnově musím mít první plnou + VŠECHNY inkrementální kroky.</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Rozdílová (Differential)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Zkopíruje soubory, které se změnily od <strong>POSLEDNÍ PLNÉ zálohy</strong>.</p>

              {/* Schema: Differential */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Po:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">A</div>
                    <div className="w-6 h-6 bg-blue-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm">B</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Plná)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">Út:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">C</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Změna od Po)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 w-6">St:</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm opacity-50">C</div>
                    <div className="w-6 h-6 bg-emerald-500 rounded text-[9px] text-white flex items-center justify-center font-bold shadow-sm border-2 border-emerald-300">D</div>
                  </div>
                  <span className="text-[9px] text-slate-400 ml-auto">(Vše od Po)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">K obnově středy potřebuji jen: Po + St.</p>
              </div>

              <div className="mt-auto space-y-2">
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg"><strong>Výhoda:</strong> Obnova je snazší než u inkrementu (potřebuji jen plnou + tuto poslední).</p>
                <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg"><strong>Nevýhoda:</strong> Roste postupně na velikosti s každým dnem.</p>
              </div>
            </div>
          </div>
        </div>
);
