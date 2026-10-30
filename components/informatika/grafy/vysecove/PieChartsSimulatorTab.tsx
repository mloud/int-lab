'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, PieChart, Disc, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  PieSliceData,
  PIE_COLORS,
  DEFAULT_PIE_DATA,
  CROWDED_PIE_DATA,
  describePieSlice,
  polarToCartesian,
} from './pieChartTypes';

export const PieChartsSimulatorTab: React.FC = () => {
  // Simulátor 1: Hlavní interaktivní výsečový / prstencový graf
  const [slices, setSlices] = useState<PieSliceData[]>(DEFAULT_PIE_DATA);
  const [chartTitle, setChartTitle] = useState('Využití úložiště telefonu');
  const [unitLabel, setUnitLabel] = useState('GB');
  const [isDonut, setIsDonut] = useState(false);
  const [explodedId, setExplodedId] = useState<number | null>(1);

  // Simulátor 2: Seskupení malých položek do "Ostatní"
  const [crowdedData, setCrowdedData] = useState<PieSliceData[]>(CROWDED_PIE_DATA);
  const [groupThresholdPct, setGroupThresholdPct] = useState<number>(0);

  // Metody pro Simulátor 1
  const updateSlice = (id: number, field: 'label' | 'value', val: string | number) => {
    setSlices(
      slices.map((s) =>
        s.id === id
          ? { ...s, [field]: field === 'value' ? Math.max(0, Number(val) || 0) : String(val) }
          : s
      )
    );
  };

  const addSlice = () => {
    if (slices.length >= 8) return;
    const nextId = (slices[slices.length - 1]?.id || 0) + 1;
    const color = PIE_COLORS[slices.length % PIE_COLORS.length];
    setSlices([...slices, { id: nextId, label: `Kategorie ${slices.length + 1}`, value: 15, color }]);
  };

  const removeSlice = (id: number) => {
    if (slices.length <= 2) return;
    setSlices(slices.filter((s) => s.id !== id));
    if (explodedId === id) setExplodedId(null);
  };

  const applyPreset = (preset: 'storage' | 'poll' | 'budget') => {
    if (preset === 'storage') {
      setSlices(DEFAULT_PIE_DATA);
      setChartTitle('Využití úložiště telefonu');
      setUnitLabel('GB');
      setExplodedId(1);
    } else if (preset === 'poll') {
      setSlices([
        { id: 1, label: 'Špagety', value: 12, color: '#f59e0b' },
        { id: 2, label: 'Řízek s kaší', value: 9, color: '#3b82f6' },
        { id: 3, label: 'Ovocné knedlíky', value: 6, color: '#ec4899' },
        { id: 4, label: 'Rajská omáčka', value: 3, color: '#10b981' },
      ]);
      setChartTitle('Nejoblíbenější oběd ve školní jídelně');
      setUnitLabel('hlasů');
      setExplodedId(1);
    } else {
      setSlices([
        { id: 1, label: 'Hry a předplatné', value: 250, color: '#8b5cf6' },
        { id: 2, label: 'Svačiny a pití', value: 200, color: '#f59e0b' },
        { id: 3, label: 'Kino a zábava', value: 150, color: '#3b82f6' },
        { id: 4, label: 'Spoření do prasátka', value: 200, color: '#10b981' },
      ]);
      setChartTitle('Měsíční rozpočet kapesného');
      setUnitLabel('Kč');
      setExplodedId(4);
    }
  };

  // Výpočet součtu, procent a úhlů pro Simulátor 1
  const totalValue = slices.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
  let accAngle = 0;
  const computedSlices = slices.map((s) => {
    const val = Number(s.value) || 0;
    const pct = totalValue > 0 ? (val / totalValue) * 100 : 0;
    const deg = (pct / 100) * 360;
    const startAngle = accAngle;
    const endAngle = accAngle + deg;
    const midAngle = startAngle + deg / 2;
    accAngle = endAngle;
    return {
      ...s,
      pct,
      deg,
      startAngle,
      endAngle,
      midAngle,
    };
  });

  // Výpočet pro Simulátor 2 (Slučování do "Ostatní")
  const totalCrowded = crowdedData.reduce((acc, s) => acc + (Number(s.value) || 0), 0);
  const mainItems: PieSliceData[] = [];
  let othersSum = 0;
  let othersCount = 0;

  crowdedData.forEach((item) => {
    const pct = totalCrowded > 0 ? (item.value / totalCrowded) * 100 : 0;
    if (groupThresholdPct > 0 && pct < groupThresholdPct) {
      othersSum += item.value;
      othersCount += 1;
    } else {
      mainItems.push(item);
    }
  });

  const finalCrowdedSlices: PieSliceData[] =
    othersSum > 0
      ? [
          ...mainItems,
          {
            id: 999,
            label: `Ostatní (${othersCount} sportů)`,
            value: othersSum,
            color: '#64748b',
          },
        ]
      : mainItems;

  let accCrowdedAngle = 0;
  const computedCrowded = finalCrowdedSlices.map((s) => {
    const pct = totalCrowded > 0 ? (s.value / totalCrowded) * 100 : 0;
    const deg = (pct / 100) * 360;
    const startAngle = accCrowdedAngle;
    const endAngle = accCrowdedAngle + deg;
    const midAngle = startAngle + deg / 2;
    accCrowdedAngle = endAngle;
    return { ...s, pct, deg, startAngle, endAngle, midAngle };
  });

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* ========================================================
          SIMULÁTOR 1: ŽIVÝ VÝSEČOVÝ A PRSTENCOVÝ GRAF
      ======================================================== */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Simulátor 1
            </span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Živý výsečový a prstencový graf
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Měňte hodnoty v tabulce a sledujte, jak se okamžitě mění velikost jednotlivých výsečí.
            </p>
          </div>

          {/* Rychlé šablony */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-500 pl-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Šablony:
            </span>
            <button
              onClick={() => applyPreset('storage')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Úložiště (GB)
            </button>
            <button
              onClick={() => applyPreset('poll')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Anketa (hlasy)
            </button>
            <button
              onClick={() => applyPreset('budget')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Kapesné (Kč)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Levý sloupec: Editovatelná tabulka */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Vstupní tabulka dat
              </h3>
              <button
                onClick={addSlice}
                disabled={slices.length >= 8}
                className="text-xs px-3 py-1.5 rounded-xl font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Přidat výseč
              </button>
            </div>

            {/* Název grafu a jednotka */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Název grafu
                </label>
                <input
                  type="text"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-amber-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Jednotka
                </label>
                <input
                  type="text"
                  value={unitLabel}
                  onChange={(e) => setUnitLabel(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-amber-500 bg-slate-50 text-center"
                />
              </div>
            </div>

            {/* Hlavička tabulky */}
            <div className="grid grid-cols-12 gap-1.5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <div className="col-span-6">Kategorie</div>
              <div className="col-span-3 text-right">Hodnota ({unitLabel})</div>
              <div className="col-span-3 text-right pr-6">Podíl (%)</div>
            </div>

            {/* Řádky tabulky */}
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {computedSlices.map((s) => {
                const isExploded = explodedId === s.id;
                return (
                  <div
                    key={s.id}
                    className={`grid grid-cols-12 items-center gap-1.5 p-1.5 rounded-xl border transition-colors ${
                      isExploded
                        ? 'bg-amber-50/70 border-amber-300'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="col-span-6 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setExplodedId(isExploded ? null : s.id)}
                        title="Kliknutím vysunete/zasunete výseč"
                        className="w-3.5 h-3.5 rounded-md shrink-0 transition-transform hover:scale-125"
                        style={{ backgroundColor: s.color }}
                      />
                      <input
                        type="text"
                        value={s.label}
                        onChange={(e) => updateSlice(s.id, 'label', e.target.value)}
                        className="w-full text-xs font-semibold px-2 py-1 border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        min="0"
                        value={s.value}
                        onChange={(e) => updateSlice(s.id, 'value', e.target.value)}
                        className="w-full text-xs font-mono font-bold px-2 py-1 border border-slate-200 rounded-md bg-white text-right"
                      />
                    </div>
                    <div className="col-span-3 flex items-center justify-end gap-1.5">
                      <span className="text-xs font-mono font-black text-amber-700">
                        {Math.round(s.pct)} %
                      </span>
                      <button
                        onClick={() => removeSlice(s.id)}
                        disabled={slices.length <= 2}
                        className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-20 transition-colors"
                        title="Smazat výseč"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Součtový řádek (100 %) */}
            <div className="mt-4 pt-3 border-t-2 border-slate-200 grid grid-cols-12 items-center px-2 text-xs font-black text-slate-800">
              <div className="col-span-6 uppercase tracking-wider text-slate-500">
                Celkem:
              </div>
              <div className="col-span-3 text-right font-mono text-sm">
                {totalValue} {unitLabel}
              </div>
              <div className="col-span-3 text-right font-mono text-emerald-600 pr-6">
                {totalValue > 0 ? '100 %' : '0 %'}
              </div>
            </div>
          </div>

          {/* Pravý sloupec: Živý SVG koláčový / prstencový graf */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                {chartTitle || 'Živý výsečový graf'}
              </div>

              {/* Přepínač Koláč vs. Prstenec */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setIsDonut(false)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    !isDonut ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <PieChart className="w-3.5 h-3.5 text-amber-500" />
                  Koláčový
                </button>
                <button
                  onClick={() => setIsDonut(true)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isDonut ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Disc className="w-3.5 h-3.5 text-blue-500" />
                  Prstencový
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white my-1 shadow-inner flex flex-col items-center">
              <svg viewBox="0 0 280 240" className="w-64 h-56 overflow-visible">
                {totalValue > 0 ? (
                  computedSlices.map((s) => {
                    if (s.value <= 0) return null;
                    const isExploded = explodedId === s.id;
                    const offset = isExploded ? 10 : 0;
                    const shift = polarToCartesian(0, 0, offset, s.midAngle);
                    const cx = 140 + shift.x;
                    const cy = 120 + shift.y;
                    const outerR = 92;
                    const innerR = isDonut ? 48 : 0;
                    const labelR = isDonut ? 70 : 58;
                    const labelPos = polarToCartesian(cx, cy, labelR, s.midAngle);

                    return (
                      <g
                        key={s.id}
                        onClick={() => setExplodedId(isExploded ? null : s.id)}
                        className="cursor-pointer transition-all duration-300 hover:opacity-95"
                      >
                        <path
                          d={describePieSlice(cx, cy, outerR, s.startAngle, s.endAngle, innerR)}
                          fill={s.color}
                          stroke="#0f172a"
                          strokeWidth="2.5"
                        />
                        {s.pct >= 6 && (
                          <text
                            x={labelPos.x}
                            y={labelPos.y}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="900"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {Math.round(s.pct)}%
                          </text>
                        )}
                      </g>
                    );
                  })
                ) : (
                  <circle cx="140" cy="120" r="85" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                )}

                {/* Středový nápis u prstencového grafu */}
                {isDonut && (
                  <g>
                    <text
                      x="140"
                      y="116"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="15"
                      fontWeight="900"
                    >
                      {totalValue} {unitLabel}
                    </text>
                    <text
                      x="140"
                      y="132"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      CELKEM (100 %)
                    </text>
                  </g>
                )}
              </svg>

              {/* Legenda pod grafem */}
              <div className="flex flex-wrap justify-center gap-3 mt-3 pt-3 border-t border-slate-800 w-full">
                {computedSlices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setExplodedId(explodedId === s.id ? null : s.id)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      explodedId === s.id
                        ? 'bg-slate-800 border-amber-400 text-white font-bold'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span>{s.label}:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {s.value} {unitLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic text-center mt-2">
              Tip: Klikněte na libovolnou výseč v grafu – vysune se ven pro zvýraznění!
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-slate-200" />

      {/* ========================================================
          SIMULÁTOR 2: ČIŠTĚNÍ GRAFŮ – KATEGORIE "OSTATNÍ"
      ======================================================== */}
      <div>
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
            Simulátor 2
          </span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Jak zachránit nepřehledný graf (Seskupení do „Ostatní“)
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Ve školní anketě hlasovalo 100 žáků pro 9 různých sportů. Posledních 6 sportů má jen pár
            procent a v koláči tvoří nečitelné tenké čárky. Vyzkoušejte jejich sloučení!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Ovládací panel a seznam kategorií */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4">
              <label className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-indigo-600" />
                Práh pro sloučení malých položek:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 0, label: 'Neslučovat (9 výsečí)' },
                  { val: 5, label: 'Pod 5 % ➔ Ostatní' },
                  { val: 10, label: 'Pod 10 % ➔ Ostatní' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setGroupThresholdPct(opt.val)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      groupThresholdPct === opt.val
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Výsledné výseče v grafu ({computedCrowded.length}):
              </div>
              {computedCrowded.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs ${
                    item.id === 999
                      ? 'bg-slate-800 text-white border-slate-700 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono font-bold">{item.pct.toFixed(0)} %</span>
                </div>
              ))}
            </div>
          </div>

          {/* Porovnávací graf */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {computedCrowded.length <= 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Přehledný graf ({computedCrowded.length} čitelné výseče)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Nepřehledný „rozbitý talíř“ ({computedCrowded.length} výsečí)
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-around gap-6">
              <svg viewBox="0 0 220 220" className="w-52 h-52 shrink-0">
                {computedCrowded.map((s) => {
                  const labelPos = polarToCartesian(110, 110, 62, s.midAngle);
                  return (
                    <g key={s.id}>
                      <path
                        d={describePieSlice(110, 110, 95, s.startAngle, s.endAngle)}
                        fill={s.color}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      {s.pct >= 7 && (
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {Math.round(s.pct)}%
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="space-y-3 max-w-xs text-xs text-slate-300 leading-relaxed">
                {groupThresholdPct === 0 ? (
                  <>
                    <p className="font-bold text-rose-300">
                      Vidíte ty tenké proužky nahoře vlevo (1 %, 1 %, 2 %, 3 %)?
                    </p>
                    <p>
                      Do takto úzkých výsečí se nevejde žádný popisek a čtenář musí luštit devět
                      různých barev v legendě.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-emerald-300">
                      Skvělá práce! Drobné sporty byly sloučeny do šedé výseče „Ostatní“.
                    </p>
                    <p>
                      Čtenář okamžitě vidí hlavní trojici sportů (Fotbal, Florbal, Basketbal) i to,
                      že všechny menší sporty dohromady tvoří {othersSum} %.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

