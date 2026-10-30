'use client';
import React, { useState } from 'react';
import {
  PieChart,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Percent,
  Compass,
  Tag,
  Sliders,
  Disc,
  Sparkles,
} from 'lucide-react';
import { describePieSlice, polarToCartesian } from './pieChartTypes';

export const PieChartsTheoryTab: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);
  const [manipulated3D, setManipulated3D] = useState(true);

  // Ukázková data pro hero kartu: Úložiště v chytrém telefonu (128 GB celkem)
  const phoneStorage = [
    { label: 'Hry a aplikace', gb: 48, pct: 37.5, deg: 135, color: '#f59e0b' },
    { label: 'Videa a fotky', gb: 32, pct: 25.0, deg: 90, color: '#3b82f6' },
    { label: 'Systém Android', gb: 24, pct: 18.75, deg: 67.5, color: '#10b981' },
    { label: 'Volné místo', gb: 24, pct: 18.75, deg: 67.5, color: '#64748b' },
  ];

  // Výpočet úhlů pro hero graf
  let currentAngle = 0;
  const heroSlices = phoneStorage.map((item, idx) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + item.deg;
    const midAngle = startAngle + item.deg / 2;
    currentAngle = endAngle;
    return { ...item, idx, startAngle, endAngle, midAngle };
  });

  const activeSlice = hoveredIdx !== null ? heroSlices[hoveredIdx] : heroSlices[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Hlavní hero karta: Co je výsečový graf */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border-2 border-slate-200 shadow-xl flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b-2 border-slate-100 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
            <PieChart className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Vizualizace podílů z celku
            </span>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Výsečový graf (Pie Chart / Koláčový graf)
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
          Výsečový (lidově <strong>koláčový</strong>) graf slouží k jedinému jasnému účelu:{' '}
          <strong>ukázat, z jakých částí se skládá jeden celek (100 %)</strong>. Celý kruh představuje
          všech 100 % a každá barevná výseč („dílek koláče“) odpovídá podílu dané kategorie.
        </p>

        {/* Anatomie výsečového grafu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-amber-600 font-black text-sm uppercase tracking-wider">
              <Percent className="w-4 h-4" />
              1. Celek = 100 %
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Součet všech výsečí v grafu musí dát vždy dohromady <strong>přesně 100 %</strong>{' '}
              (celkovou kapacitu, rozpočet nebo počet hlasů).
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-blue-600 font-black text-sm uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              2. Velikost výseče
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Čím větší je podíl dané položky z celku, tím širší „dílek koláče“ v kruhu zabírá
              (např. polovina kruhu = <strong>50 %</strong>, čtvrtina = <strong>25 %</strong>).
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
              <Tag className="w-4 h-4" />
              3. Barvy a legenda
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Výsečový graf <strong>nemá osu X ani Y</strong>. Každá výseč musí mít odlišnou barvu a
              čitelný popisek s procenty nebo legendu.
            </p>
          </div>
        </div>

        {/* Interaktivní ukázka z reálného světa */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Příklad z reálného světa
              </span>
              <h3 className="text-xl font-black text-white">
                Obsazení 128 GB paměti v chytrém telefonu
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Najeďte myší nebo klikněte na výseč
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Koláč */}
            <div className="md:col-span-5 flex justify-center">
              <svg viewBox="0 0 240 240" className="w-56 h-56 overflow-visible">
                {heroSlices.map((s) => {
                  const isActive = activeSlice.idx === s.idx;
                  const offset = isActive ? 8 : 0;
                  const shift = polarToCartesian(0, 0, offset, s.midAngle);
                  const labelPos = polarToCartesian(120 + shift.x, 120 + shift.y, 58, s.midAngle);

                  return (
                    <g
                      key={s.idx}
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => setHoveredIdx(s.idx)}
                      onClick={() => setHoveredIdx(s.idx)}
                    >
                      <path
                        d={describePieSlice(120 + shift.x, 120 + shift.y, isActive ? 98 : 94, s.startAngle, s.endAngle)}
                        fill={s.color}
                        stroke="#0f172a"
                        strokeWidth="3"
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {Math.round(s.pct)} %
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legenda a detail vybrané výseče */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {heroSlices.map((s) => {
                  const isActive = activeSlice.idx === s.idx;
                  return (
                    <button
                      key={s.idx}
                      onMouseEnter={() => setHoveredIdx(s.idx)}
                      onClick={() => setHoveredIdx(s.idx)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-slate-800 border-amber-400 shadow-md scale-[1.02]'
                          : 'bg-slate-800/50 border-slate-700/80 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-md shrink-0"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-xs font-bold text-slate-200">{s.label}</span>
                      </div>
                      <span className="text-xs font-mono font-black text-amber-400">{s.gb} GB</span>
                    </button>
                  );
                })}
              </div>

              {/* Detail vybrané výseče */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    Vybraná kategorie:
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {activeSlice.label} –{' '}
                    <span className="text-amber-400 font-black">{activeSlice.gb} GB</span> z celkových 128 GB
                  </div>
                </div>
                <div className="bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-mono text-amber-300 shrink-0">
                  Podíl z celku: <strong>{Math.round(activeSlice.pct)} %</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 varianty výsečových grafů */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Disc className="w-7 h-7 text-amber-500" />
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            Varianty v praxi: Koláčový vs. Prstencový vs. Vysunutá výseč
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-8 max-w-3xl leading-relaxed">
          V tabulkových procesorech (Excel, Google Таbulky) i v mobilních aplikacích se setkáte se
          třemi variantami, které zobrazují stejná data, ale kladou důraz na jiný detail:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Klasický koláčový */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center">
            <svg viewBox="0 0 140 140" className="w-32 h-32 mb-4">
              <path d={describePieSlice(70, 70, 60, 0, 180)} fill="#3b82f6" stroke="#fff" strokeWidth="2" />
              <path d={describePieSlice(70, 70, 60, 180, 288)} fill="#10b981" stroke="#fff" strokeWidth="2" />
              <path d={describePieSlice(70, 70, 60, 288, 360)} fill="#f59e0b" stroke="#fff" strokeWidth="2" />
            </svg>
            <h4 className="text-base font-black text-slate-800 mb-1">1. Klasický výsečový (Pie)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plný kruh rozdělený od středu. Lidské oko na něm nejlépe pozná <strong>čtvrtiny (25 %), poloviny (50 %) a třetiny</strong>.
            </p>
          </div>

          {/* 2. Prstencový (Donut) */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center">
            <svg viewBox="0 0 140 140" className="w-32 h-32 mb-4">
              <path d={describePieSlice(70, 70, 60, 0, 180, 34)} fill="#3b82f6" stroke="#fff" strokeWidth="2" />
              <path d={describePieSlice(70, 70, 60, 180, 288, 34)} fill="#10b981" stroke="#fff" strokeWidth="2" />
              <path d={describePieSlice(70, 70, 60, 288, 360, 34)} fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <text x="70" y="68" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="900">
                128 GB
              </text>
              <text x="70" y="81" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">
                CELKEM
              </text>
            </svg>
            <h4 className="text-base font-black text-slate-800 mb-1">2. Prstencový (Donut)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Má vyříznutý střed, do kterého lze přehledně vepsat <strong>celkovou hodnotu (100 %)</strong>. Oblíbený v moderních aplikacích.
            </p>
          </div>

          {/* 3. Vysunutá výseč */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center">
            <svg viewBox="0 0 140 140" className="w-32 h-32 mb-4">
              <path d={describePieSlice(70, 70, 56, 0, 180)} fill="#94a3b8" stroke="#fff" strokeWidth="2" />
              <path d={describePieSlice(70, 70, 56, 180, 288)} fill="#cbd5e1" stroke="#fff" strokeWidth="2" />
              {/* Vysunutá třetí výseč (288° až 360°, střed 324°) */}
              {(() => {
                const off = polarToCartesian(0, 0, 9, 324);
                return (
                  <path
                    d={describePieSlice(70 + off.x, 70 + off.y, 58, 288, 360)}
                    fill="#f59e0b"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                );
              })()}
            </svg>
            <h4 className="text-base font-black text-slate-800 mb-1">3. Vysunutá výseč</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jedna klíčová výseč je povysunutá ven z kruhu, aby na ni <strong>okamžitě padla pozornost čtenáře</strong> v prezentaci.
            </p>
          </div>
        </div>
      </div>

      {/* Kdy použít vs. Kdy NIKDY nepoužít */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Správné použití */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-700 font-black text-xl">
            <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
            Kdy výsečový graf ZVOLIT
          </div>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Výsečový graf použijte pouze tehdy, když platí všechna tato pravidla:
          </p>
          <ul className="space-y-3 text-sm text-slate-700 font-medium flex-1">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span>
                <strong>Položky tvoří jeden celek (100 %):</strong> Např. výsledky hlasování ve třídě,
                složení rozpočtu, podíl prohlížečů na trhu.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span>
                <strong>Malý počet kategorií (ideálně 2 až 6):</strong> Každá výseč je dostatečně
                velká a čitelná na první pohled.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span>
                <strong>Chcete ukázat dominanci:</strong> Např. že jedna položka zabírá více než
                polovinu nebo třetinu celého trhu.
              </span>
            </li>
          </ul>
        </div>

        {/* Zákaz použití */}
        <div className="bg-white rounded-3xl p-8 border-2 border-rose-100 shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-rose-700 font-black text-xl">
            <XCircle className="w-7 h-7 text-rose-500 shrink-0" />
            Časté kardinální CHYBY
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            <strong>Kdy je výsečový graf špatnou volbou nebo dokonce nesmyslem:</strong>
          </p>

          <div className="space-y-3 mb-4">
            <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200">
              <div className="text-xs font-bold text-rose-900 mb-0.5">
                1. Příliš mnoho výsečí („Rozbitý talíř“)
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                Pokud máte 12 malých kategorií po 2–3 %, vzniknou nečitelné tenké čárky. Řešení:{' '}
                <strong>slučte malé položky do výseče „Ostatní“</strong> nebo použijte sloupcový graf.
              </p>
            </div>

            <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200">
              <div className="text-xs font-bold text-rose-900 mb-0.5">
                2. Součet nedává 100 % (Více odpovědí v anketě)
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                Když v anketě „Jaké hry hraješ?“ může každý žák zaškrtnout více možností (Minecraft 70 %,
                Fortnite 60 %, FIFA 50 %), součet je 180 % – z toho <strong>koláč udělat nelze!</strong>
              </p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-3 text-center text-xs font-bold text-slate-600 mt-auto">
            Pravidlo: Pro přesné porovnání podobně velkých čísel (např. 24 % vs. 26 %) je vždy lepší sloupcový graf.
          </div>
        </div>
      </div>

      {/* Detektor manipulace: Zkreslený 3D koláčový graf */}
      <div className="bg-amber-500/10 border-2 border-amber-400/50 rounded-3xl p-8 sm:p-10 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-700">
              Kritické myšlení pro 9. ročník
            </span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              Detektor manipulací: Zkreslený 3D koláčový graf
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-700 mb-6 leading-relaxed">
          V televizních prezentacích se oblibě těší <strong>nakloněné 3D koláčové grafy</strong>.
          Perspektiva však klame lidské oko: výseč natočená <strong>dole v popředí</strong> získá
          masivní 3D boční stěnu a opticky vypadá <strong>větší než výseč v pozadí</strong>, i když ve
          skutečnosti představuje menší číslo!
        </p>

        <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-sm">
            <div className="text-sm font-black text-slate-800">
              Pohled grafu:{' '}
              {manipulated3D
                ? '⚠️ Zkreslený 3D náklon (Oranžová 30 % vepředu vypadá masivnější než Modrá 36 % vzadu)'
                : '✅ Poctivý 2D pohled shora (Jasně vidíme, že Modrá 36 % je větší než Oranžová 30 %)'}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Přepněte si mezi 3D efektem a poctivým plochým 2D kruhem. Všimněte si, jak 3D hrana
              přidává oranžové výseči falešnou plochu.
            </p>
            <button
              onClick={() => setManipulated3D(!manipulated3D)}
              className={`mt-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
                manipulated3D
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              {manipulated3D ? 'Narovnat do poctivého 2D' : 'Zapnout klamavý 3D náklon'}
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex-1 w-full max-w-md flex flex-col items-center">
            <div className="text-[11px] font-bold text-slate-500 mb-3 flex justify-between w-full items-center">
              <span>Podíl prodejů značek A, B, C</span>
              <span className="font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-[10px] font-bold">
                Modrá (36 %) vs. Oranžová (30 %)
              </span>
            </div>

            {manipulated3D ? (
              /* 3D nakloněný koláč (eliptická projekce s přední stěnou) */
              <svg viewBox="0 0 300 175" className="w-full h-44">
                {/* 3D boční stěna přední oranžové výseče (126° až 234°) */}
                <path
                  d="M 65 92 L 65 118 A 105 48 0 0 0 235 118 L 235 92 Z"
                  fill="#b45309"
                />
                {/* Zadní modrá výseč (36 %: -65° až 65° nahoře vzadu) */}
                <g transform="translate(150, 78) scale(1, 0.46)">
                  <path d={describePieSlice(0, 0, 105, 295, 360)} fill="#2563eb" stroke="#fff" strokeWidth="2" />
                  <path d={describePieSlice(0, 0, 105, 0, 65)} fill="#2563eb" stroke="#fff" strokeWidth="2" />
                  {/* Šedá výseč C (34 %: 65° až 126° a 234° až 295°) */}
                  <path d={describePieSlice(0, 0, 105, 65, 126)} fill="#94a3b8" stroke="#fff" strokeWidth="2" />
                  <path d={describePieSlice(0, 0, 105, 234, 295)} fill="#94a3b8" stroke="#fff" strokeWidth="2" />
                  {/* Přední oranžová výseč (30 %: 126° až 234° dole v popředí) */}
                  <path d={describePieSlice(0, 0, 105, 126, 234)} fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                </g>
                <text x="150" y="52" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Značka B (36 %)
                </text>
                <text x="150" y="106" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">
                  Značka A (30 %)
                </text>
                <text x="150" y="158" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ⬆️ Masivní 3D okraj v popředí klame zrak!
                </text>
              </svg>
            ) : (
              /* Poctivý 2D koláč */
              <svg viewBox="0 0 300 175" className="w-full h-44">
                <g transform="translate(150, 86)">
                  {/* Modrá 36 % (0° až 129.6°) */}
                  <path d={describePieSlice(0, 0, 74, 0, 129.6)} fill="#2563eb" stroke="#fff" strokeWidth="2.5" />
                  {/* Oranžová 30 % (129.6° až 237.6°) */}
                  <path d={describePieSlice(0, 0, 74, 129.6, 237.6)} fill="#f59e0b" stroke="#fff" strokeWidth="2.5" />
                  {/* Šedá 34 % (237.6° až 360°) */}
                  <path d={describePieSlice(0, 0, 74, 237.6, 360)} fill="#94a3b8" stroke="#fff" strokeWidth="2.5" />
                </g>
                <text x="188" y="68" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">
                  36 %
                </text>
                <text x="148" y="130" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">
                  30 %
                </text>
                <text x="112" y="70" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  34 %
                </text>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

