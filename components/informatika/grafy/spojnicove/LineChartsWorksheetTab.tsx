'use client';
import React from 'react';
import { Search, TableProperties, LineChart, Lightbulb, AlertCircle, CheckSquare } from 'lucide-react';

export const LineChartsWorksheetTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Hero hlavička */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-sm text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600">Badatelský úkol pro 9. ročník</span>
        <h2 className="text-3xl font-black text-slate-800 mt-1 mb-3 uppercase tracking-tight">
          Průzkum trendu a analýza v čase
        </h2>
        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Časová data vyprávějí příběh. Vaším cílem je vybrat si reálná data, chronologicky je uspořádat do tabulky, 
          vytvořit profesionální spojnicový graf a odhalit, jaké události v reálném světě stály za prudkými výkyvy.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Krok 1: Sběr dat */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 1</span>
                Lovci časových dat (Sběr informací)
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>Vyhledejte na internetu reálná data s <strong>časovou posloupností</strong> k jednomu z následujících témat (minimálně 6–10 časových bodů):</p>
                <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
                  <li><strong>Počasí:</strong> Průměrná denní teplota ve vašem regionu za posledních 10 dnů (např. z ČHMÚ nebo In-počasí).</li>
                  <li><strong>Kryptoměny & finance:</strong> Vývoj kurzu Bitcoinu, Eura či Zlata za posledních 6 měsíců.</li>
                  <li><strong>Gaming & internet:</strong> Vývoj počtu aktivních hráčů vaší oblíbené hry na platformě Steam (SteamDB) po měsících.</li>
                  <li><strong>Vlastní téma:</strong> Vývoj sledovanosti vybraného esport turnaje, zhlédnutí nového videoklipu den po dni apod.</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-blue-900 text-xs font-medium">
                    <strong>Pravidlo chronologie:</strong> Data musí být uspořádána přesně za sebou v čase (od nejstaršího po nejnovější), jinak by křivka nedávala smysl! Nezapomeňte si zkopírovat odkaz na zdroj.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Krok 2: Tabulkový procesor */}
        <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
              <TableProperties className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 2</span>
                Příprava tabulky (Excel / Google Tabulky)
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>Otevřete si <strong>MS Excel</strong> nebo <strong>Tabulky Google</strong> a připravte přehlednou tabulku pro spojnicový graf:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800 text-xs uppercase mb-1">Sloupec A: Časová osa (X)</div>
                    <p className="text-xs text-slate-600">Zapište datumy, dny v týdnu nebo hodiny (např. <em>1. října, 2. října...</em> nebo <em>Leden, Únor...</em>).</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800 text-xs uppercase mb-1">Sloupec B: Čistá čísla (Y)</div>
                    <p className="text-xs text-slate-600">
                      <strong>Důležité:</strong> Pište pouze čísla (např. <code>18.5</code>), nikoliv texty s jednotkou jako <code>18.5 °C</code>! Jednotku uveďte v záhlaví.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Krok 3: Tvorba grafu */}
        <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
              <LineChart className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 3</span>
                Vizualizace (Vložení spojnicového grafu)
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>Označte data a v menu zvolte <strong>Vložit ➔ Graf ➔ Spojnicový (se značkami / markery)</strong>.</p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800 text-xs uppercase mb-2">Kontrolní seznam profesionálního grafu:</div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                    <span><strong>1. Výstižný nadpis:</strong> Obsahuje téma i časové období (např. <em>Vývoj kurzu Bitcoinu: březen – srpen 2024</em>).</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                    <span><strong>2. Popis osy Y:</strong> Měřená veličina včetně jednotky v závorce (např. <em>Cena v USD</em> nebo <em>Teplota v °C</em>).</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                    <span><strong>3. Viditelné body:</strong> Na křivce jsou jasně vidět body měření (tzv. markery).</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                    <span><strong>4. Osa X:</strong> Popisky se vzájemně nepřekrývají a jsou čitelné.</span>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-900 font-medium">
                  ⭐ <strong>Tip pro experty:</strong> Zkuste do grafu vložit spojnici trendu (tzv. trendline / lineární regresi) v nastavení grafu – počítač vám spočítá, zda data dlouhodobě míří spíše nahoru, nebo dolů!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Krok 4: Analýza trendu */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-4">
                <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">Krok 4</span>
                Analýza trendu & Kritické zhodnocení
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                <p>Graf je hotový. Nyní pod něj do dokumentu nebo sešitu zapište odpovědi na <strong>3 detektivní otázky</strong>:</p>
                <ol className="list-decimal pl-5 space-y-2.5 font-medium text-slate-800 text-sm">
                  <li>
                    <strong>Kde je vrchol a dno?</strong> V jakém přesném datu/čase byla naměřena maximální hodnota a kdy naopak minimální?
                  </li>
                  <li>
                    <strong>Kdy nastal nejstrmější skok?</strong> Mezi kterými dvěma po sobě jdoucími body je sklon čáry nejprudší? Co mohlo tento skok způsobit? (např. <em>vydání nové herní aktualizace, přechod studené fronty, zpráva v médiích</em>).
                  </li>
                  <li>
                    <strong>Kritická kontrola osy Y:</strong> Začíná svislá osa Y vašeho grafu na nule, nebo je ustřižená? Pokud je ustřižená, vypadá graf dramatičtěji než ve skutečnosti?
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
