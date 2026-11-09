'use client';
import React from 'react';
import { BookOpen, FileText, BarChart3, AlertCircle, Activity, Search, TableProperties, LineChart, Lightbulb } from 'lucide-react';

export const BarChartsWorksheetTab: React.FC = () => (
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
);
