'use client';
import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, XCircle, ArrowUpRight, Clock, Eye, Sliders } from 'lucide-react';

export const LineChartsTheoryTab: React.FC = () => {
  const [manipulatedScale, setManipulatedScale] = useState(false);

  // Data pro demonstraci manipulace měřítkem: Cena herní konzole v e-shopu
  // Reálná cena kolísá mezi 12 890 Kč a 13 190 Kč (výkyv jen 300 Kč, tedy ~2 %)
  const priceData = [
    { day: 'Pondělí', shortDay: 'Po', price: 13190 },
    { day: 'Úterý', shortDay: 'Út', price: 12990 },
    { day: 'Středa', shortDay: 'St', price: 13090 },
    { day: 'Čtvrtek', shortDay: 'Čt', price: 12890 },
    { day: 'Pátek', shortDay: 'Pá', price: 13150 }
  ];

  // SVG parametry
  const svgW = 460;
  const svgH = 190;
  const padL = 60;
  const padR = 25;
  const padT = 25;
  const padB = 35;

  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const yMin = manipulatedScale ? 12700 : 0;
  const yMax = manipulatedScale ? 13350 : 15000;

  const getX = (idx: number) => padL + (idx / (priceData.length - 1)) * chartW;
  const getY = (val: number) => padT + chartH - ((val - yMin) / (yMax - yMin)) * chartH;

  const pathD = priceData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.price)}`)
    .join(' ');

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Hlavní hero karta: Co je spojnicový graf */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border-2 border-slate-200 shadow-xl flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b-2 border-slate-100 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Vizualizace časových řad</span>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Spojnicový graf (Line Chart)
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
          Spojnicový graf je <strong>králem pro sledování vývoje v čase</strong>. Na rozdíl od sloupcového grafu, 
          který porovnává samostatné nezávislé kategorie, spojnicový graf spojuje naměřené body do souvislé křivky. 
          Díky tomu lidské oko okamžitě rozpozná <strong>trend</strong> – zda hodnota roste, klesá nebo kolísá.
        </p>

        {/* Anatomie spojnicového grafu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-blue-600 font-black text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              1. Osa X (Vodorovná)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Téměř vždy představuje <strong>časovou osu</strong> v chronologickém pořadí: hodiny, dny, měsíce či roky.
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-indigo-600 font-black text-sm uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              2. Osa Y (Svislá)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Měřená veličina s <strong>jasnou jednotkou</strong>: teplota (°C), počet diváků (ks), cena (Kč) či rychlost (km/h).
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
              <ArrowUpRight className="w-4 h-4" />
              3. Křivka & Body
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Body představují přesná měření, spojnice ukazuje směr vývoje mezi nimi (stoupání, pád, stagnaci).
            </p>
          </div>
        </div>

        {/* Ukázkový interaktivní náhled křivky */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Příklad z reálného světa</span>
              <h3 className="text-xl font-black text-white">Průběh venkovní teploty během dne</h3>
            </div>
            <div className="flex items-center gap-3 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              7 měření v intervalu 3 hodin
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-2">
            <svg viewBox="0 0 540 180" className="w-full min-w-[480px] h-44">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Mřížka */}
              <line x1="50" y1="30" x2="510" y2="30" stroke="#334155" strokeDasharray="4" />
              <line x1="50" y1="75" x2="510" y2="75" stroke="#334155" strokeDasharray="4" />
              <line x1="50" y1="120" x2="510" y2="120" stroke="#334155" strokeDasharray="4" />
              <line x1="50" y1="150" x2="510" y2="150" stroke="#475569" strokeWidth="1.5" />
              <line x1="50" y1="15" x2="50" y2="150" stroke="#475569" strokeWidth="1.5" />

              {/* Popisky osy Y */}
              <text x="40" y="34" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">25 °C</text>
              <text x="40" y="79" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">15 °C</text>
              <text x="40" y="124" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">5 °C</text>
              <text x="40" y="153" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0 °C</text>

              {/* Oblast pod křivkou */}
              <polygon
                points="50,150 50,126 126,110 203,80 280,48 356,60 433,96 510,122 510,150"
                fill="url(#lineGrad)"
              />

              {/* Samotná spojnice */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,126 126,110 203,80 280,48 356,60 433,96 510,122"
              />

              {/* Jednotlivé body měření */}
              {[
                { x: 50, y: 126, t: '06:00', v: '4 °C' },
                { x: 126, y: 110, t: '09:00', v: '8 °C' },
                { x: 203, y: 80, t: '12:00', v: '14 °C' },
                { x: 280, y: 48, t: '15:00', v: '21 °C' },
                { x: 356, y: 60, t: '18:00', v: '18 °C' },
                { x: 433, y: 96, t: '21:00', v: '11 °C' },
                { x: 510, y: 122, t: '00:00', v: '5 °C' }
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  <text x={p.x} y={p.y - 10} fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">{p.v}</text>
                  <text x={p.x} y="168" fill="#94a3b8" fontSize="10" textAnchor="middle">{p.t}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="text-right text-[11px] text-slate-400 mt-2">
            Jasný závěr: Teplota kulminovala v 15:00 a k večeru plynule klesala.
          </div>
        </div>
      </div>

      {/* Kdy použít vs. Kdy NIKDY nepoužít */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Správné použití */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-700 font-black text-xl">
            <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
            Kdy spojnicový graf ZVOLIT
          </div>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Spojnice má smysl tehdy, kdy hodnoty mezi body přirozeně existují a navazují na sebe v čase:
          </p>
          <ul className="space-y-3 text-sm text-slate-700 font-medium flex-1">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Meteorologie:</strong> Průběh teploty, tlaku, rychlosti větru.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Digitální svět:</strong> Návštěvnost webu po hodinách, počet diváků streamu.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Ekonomika & finance:</strong> Vývoj ceny akcie, kurzu eura či herní konzole.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Sport & zdraví:</strong> Záznam tepové frekvence běžce během tréninku.</span>
            </li>
          </ul>
        </div>

        {/* Zákaz použití */}
        <div className="bg-white rounded-3xl p-8 border-2 border-rose-100 shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-rose-700 font-black text-xl">
            <XCircle className="w-7 h-7 text-rose-500 shrink-0" />
            Častá kardinální CHYBA
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            <strong>Nikdy nepropojujte čarou nesouvisející kategorie!</strong> Pokud osa X není časová posloupnost, spojnice lže.
          </p>

          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 mb-4">
            <div className="text-xs font-bold text-rose-900 mb-1">Špatný příklad: Prodej ovoce</div>
            <p className="text-xs text-rose-700 leading-relaxed">
              Když spojíte čarou <em>Jablka ➔ Hrušky ➔ Banány</em>, křivka tvrdí, že mezi jablkem a hruškou existuje nějaký „mezistav“. To je nesmysl – pro kategorie použijte <strong>vždy sloupcový graf</strong>!
            </p>
          </div>

          <div className="bg-slate-100 rounded-xl p-3 text-center text-xs font-bold text-slate-600 mt-auto">
            Pravidlo: Pokud položky na ose X mohu libovolně přeházet a smysl se nezmění, spojnicový graf tam NEPATŘÍ.
          </div>
        </div>

      </div>

      {/* Porovnání více řad (Jediné a přesné křížení křivek) */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-lg">
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
          Porovnání více trendů (Křížení křivek)
        </h3>
        <p className="text-sm text-slate-600 mb-6 max-w-3xl leading-relaxed">
          Často chceme sledovat dva souběžné trendy. Vícenásobný spojnicový graf ukáže okamžik, 
          kdy jedna hodnota předstihla druhou (<strong>bod křížení</strong>) a směr vývoje se obrátil ve prospěch nového lídra.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center gap-2 font-black text-blue-800 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Bod křížení (Předstižení v čase)
              </div>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                Místo, kde se obě čáry přesně protnou. Znamená okamžik, kdy konkurent dosáhl stejného výsledku a od té chvíle začal vést.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="flex items-center gap-2 font-black text-purple-800 mb-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Jednoznačný trend (Rozevírání nůžek)
              </div>
              <p className="text-xs text-purple-900/80 leading-relaxed">
                Před středou vedl Kanál B (fialový). Od středy však Kanál A (modrý) prudce stoupá, zatímco Kanál B ztrácí dech.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-3 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-blue-500 rounded-full"></span> Kanál A (Hry)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-purple-500 rounded-full"></span> Kanál B (Tech)</span>
            </div>
            
            {/* Přesný SVG graf s jediným křížením ve Středu (x=160, y=55) */}
            <svg viewBox="0 0 320 130" className="w-full h-34">
              {/* Osa X */}
              <line x1="25" y1="100" x2="295" y2="100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="25" y1="20" x2="25" y2="100" stroke="#cbd5e1" strokeWidth="1" />

              {/* Jemné vodorovné linky */}
              <line x1="25" y1="40" x2="295" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="25" y1="70" x2="295" y2="70" stroke="#f1f5f9" strokeWidth="1" />

              {/* Kanál B (Fialová čárkovaná): Po (40,35) -> Út (100,45) -> St (160,55) -> Čt (220,65) -> Pá (280,75) */}
              <polyline 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="3" 
                strokeDasharray="4 2" 
                strokeLinecap="round"
                points="40,35 100,45 160,55 220,65 280,75" 
              />

              {/* Kanál A (Modrá plná): Po (40,85) -> Út (100,70) -> St (160,55) -> Čt (220,40) -> Pá (280,25) */}
              <polyline 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,85 100,70 160,55 220,40 280,25" 
              />

              {/* Body měření */}
              {[
                { x: 40, yA: 85, yB: 35, d: 'Po' },
                { x: 100, yA: 70, yB: 45, d: 'Út' },
                { x: 160, yA: 55, yB: 55, d: 'St' },
                { x: 220, yA: 40, yB: 65, d: 'Čt' },
                { x: 280, yA: 25, yB: 75, d: 'Pá' }
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.yA} r="3.5" fill="#3b82f6" />
                  <circle cx={pt.x} cy={pt.yB} r="3" fill="#a855f7" />
                  <text x={pt.x} y="116" fill={pt.d === 'St' ? '#1e293b' : '#94a3b8'} fontSize="10" fontWeight={pt.d === 'St' ? 'bold' : 'normal'} textAnchor="middle">
                    {pt.d}
                  </text>
                </g>
              ))}

              {/* Červený bod PŘESNĚ na průsečíku ve Středu (160, 55) */}
              <circle cx="160" cy="55" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
              <text x="160" y="32" fill="#ef4444" fontSize="10" fontWeight="900" textAnchor="middle">
                Bod křížení
              </text>
            </svg>
            <span className="text-[11px] text-slate-500 font-medium mt-1">Středa: Přesně v tento den Kanál A předběhl Kanál B</span>
          </div>
        </div>
      </div>

      {/* Detektor manipulace: Ustřižená osa Y (Trik e-shopů se slevami) */}
      <div className="bg-amber-500/10 border-2 border-amber-400/50 rounded-3xl p-8 sm:p-10 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-700">Kritické myšlení pro 9. ročník</span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              Detektor manipulací: Trik s ustřiženou osou Y (Cenové pasti)
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-700 mb-6 leading-relaxed">
          V e-shopech a reklamách se často setkáte s trikem s <strong>ustřiženou osou Y</strong>. 
          Pokud osa nezačíná na nule (0 Kč), ale je ustřižená těsně pod cenou zboží, nepatrný cenový rozdíl 300 Kč 
          (pouhá 2 % z celkové ceny 13 000 Kč) vypadá v grafu jako <strong>obrovský cenový propad a senzace</strong>!
        </p>

        {/* Interaktivní přepínač */}
        <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-sm">
            <div className="text-sm font-black text-slate-800">
              Stav osy Y: {manipulatedScale ? '⚠️ Zmanipulovaná (Osa od 12 700 Kč – opticky obří propad)' : '✅ Poctivá (Osa od 0 Kč – cena je téměř stejná)'}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vyzkoušejte si tlačítko níže: sledujte, jak se stejná cena herní konzole promění z klidné, téměř rovné linky na dramatické propasti falešné slevy.
            </p>
            <button
              onClick={() => setManipulatedScale(!manipulatedScale)}
              className={`mt-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
                manipulatedScale 
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              {manipulatedScale ? 'Vrátit poctivou osu (od 0 Kč)' : 'Ustřihnout osu Y (Trik e-shopu)'}
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex-1 w-full max-w-md">
            <div className="text-[11px] font-bold text-slate-500 mb-2 flex justify-between items-center">
              <span>Cena herní konzole během týdne</span>
              <span className="font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-[10px] font-bold">
                Rozdíl jen 300 Kč (2.3 %)
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-44">
              <line x1={padL} y1={padT} x2={svgW - padR} y2={padT} stroke="#e2e8f0" strokeDasharray="3" />
              <line x1={padL} y1={padT + chartH / 2} x2={svgW - padR} y2={padT + chartH / 2} stroke="#e2e8f0" strokeDasharray="3" />
              <line x1={padL} y1={padT + chartH} x2={svgW - padR} y2={padT + chartH} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Popisky Y */}
              <text x={padL - 8} y={padT + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                {yMax.toLocaleString('cs-CZ')} Kč
              </text>
              <text x={padL - 8} y={padT + chartH + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                {yMin.toLocaleString('cs-CZ')} Kč
              </text>

              {/* Spojnice */}
              <path
                d={pathD}
                fill="none"
                stroke={manipulatedScale ? '#dc2626' : '#2563eb'}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Body */}
              {priceData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={getX(i)}
                    cy={getY(d.price)}
                    r="5"
                    fill={manipulatedScale ? '#dc2626' : '#2563eb'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={getX(i)}
                    y={getY(d.price) - 8}
                    fill={manipulatedScale ? '#991b1b' : '#1e40af'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {d.price.toLocaleString('cs-CZ')}
                  </text>
                  <text
                    x={getX(i)}
                    y={padT + chartH + 16}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {d.shortDay}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};

