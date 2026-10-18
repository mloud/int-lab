'use client';
import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, SlidersHorizontal, Sparkles } from 'lucide-react';
import { 
  LineDataPoint, 
  DualLineDataPoint, 
  DEFAULT_SINGLE_LINE_DATA, 
  DEFAULT_DUAL_LINE_DATA 
} from './lineChartTypes';

export const LineChartsSimulatorTab: React.FC = () => {
  // Simulator 1: Jedna řada
  const [singleData, setSingleData] = useState<LineDataPoint[]>(DEFAULT_SINGLE_LINE_DATA);
  const [xAxis1, setXAxis1] = useState('Čas měření');
  const [yAxis1, setYAxis1] = useState('Teplota (°C)');
  const [cropYAxis, setCropYAxis] = useState(false);

  // Simulator 2: Dvě řady
  const [dualData, setDualData] = useState<DualLineDataPoint[]>(DEFAULT_DUAL_LINE_DATA);
  const [xAxis2, setXAxis2] = useState('Den v týdnu');
  const [series1Name, setSeries1Name] = useState('Herní stream');
  const [series2Name, setSeries2Name] = useState('Hudební klip');

  // Metody pro řadu 1
  const updateSingle = (id: number, field: 'label' | 'value', val: string | number) => {
    setSingleData(singleData.map(d => d.id === id ? { ...d, [field]: val } : d));
  };

  const addSinglePoint = () => {
    if (singleData.length >= 10) return;
    const nextId = (singleData[singleData.length - 1]?.id || 0) + 1;
    setSingleData([...singleData, { id: nextId, label: `Bod ${nextId}`, value: 15 }]);
  };

  const removeSinglePoint = (id: number) => {
    if (singleData.length <= 3) return;
    setSingleData(singleData.filter(d => d.id !== id));
  };

  const applySinglePreset = (preset: 'temp' | 'crypto' | 'visitors') => {
    if (preset === 'temp') {
      setSingleData(DEFAULT_SINGLE_LINE_DATA);
      setXAxis1('Čas měření');
      setYAxis1('Teplota (°C)');
      setCropYAxis(false);
    } else if (preset === 'crypto') {
      setSingleData([
        { id: 1, label: 'Leden', value: 42 },
        { id: 2, label: 'Únor', value: 55 },
        { id: 3, label: 'Březen', value: 68 },
        { id: 4, label: 'Duben', value: 62 },
        { id: 5, label: 'Květen', value: 89 },
        { id: 6, label: 'Červen', value: 95 }
      ]);
      setXAxis1('Měsíc');
      setYAxis1('Cena (tis. USD)');
      setCropYAxis(false);
    } else {
      setSingleData([
        { id: 1, label: 'Po', value: 250 },
        { id: 2, label: 'Út', value: 310 },
        { id: 3, label: 'St', value: 290 },
        { id: 4, label: 'Čt', value: 340 },
        { id: 5, label: 'Pá', value: 450 },
        { id: 6, label: 'So', value: 680 },
        { id: 7, label: 'Ne', value: 590 }
      ]);
      setXAxis1('Den');
      setYAxis1('Zhlédnutí (tis.)');
      setCropYAxis(false);
    }
  };

  // Metody pro řadu 2
  const updateDual = (id: number, field: 'label' | 'val1' | 'val2', val: string | number) => {
    setDualData(dualData.map(d => d.id === id ? { ...d, [field]: val } : d));
  };

  const addDualPoint = () => {
    if (dualData.length >= 9) return;
    const nextId = (dualData[dualData.length - 1]?.id || 0) + 1;
    setDualData([...dualData, { id: nextId, label: `D${nextId}`, val1: 150, val2: 120 }]);
  };

  const removeDualPoint = (id: number) => {
    if (dualData.length <= 3) return;
    setDualData(dualData.filter(d => d.id !== id));
  };

  // SVG výpočty pro graf 1
  const svg1W = 540;
  const svg1H = 260;
  const padL = 50;
  const padR = 30;
  const padT = 30;
  const padB = 40;
  const chart1W = svg1W - padL - padR;
  const chart1H = svg1H - padT - padB;

  const rawVals1 = singleData.map(d => Number(d.value) || 0);
  const minVal1 = Math.min(...rawVals1);
  const maxVal1 = Math.max(...rawVals1, 10);

  const yMin1 = cropYAxis ? Math.max(0, Math.floor(minVal1 * 0.9)) : 0;
  const yMax1 = Math.ceil(maxVal1 * 1.15);
  const yRange1 = yMax1 - yMin1 || 1;

  const getX1 = (idx: number) => padL + (idx / Math.max(1, singleData.length - 1)) * chart1W;
  const getY1 = (val: number) => padT + chart1H - ((val - yMin1) / yRange1) * chart1H;

  const points1 = singleData.map((d, i) => `${getX1(i)},${getY1(Number(d.value) || 0)}`).join(' ');
  const areaPolygon1 = `${padL},${padT + chart1H} ` + points1 + ` ${getX1(singleData.length - 1)},${padT + chart1H}`;

  // SVG výpočty pro graf 2 (dvě řady)
  const allDualVals = dualData.flatMap(d => [Number(d.val1) || 0, Number(d.val2) || 0]);
  const maxDual = Math.max(...allDualVals, 20);
  const yMax2 = Math.ceil(maxDual * 1.2);

  const getX2 = (idx: number) => padL + (idx / Math.max(1, dualData.length - 1)) * chart1W;
  const getY2 = (val: number) => padT + chart1H - (val / yMax2) * chart1H;

  const pointsDual1 = dualData.map((d, i) => `${getX2(i)},${getY2(Number(d.val1) || 0)}`).join(' ');
  const pointsDual2 = dualData.map((d, i) => `${getX2(i)},${getY2(Number(d.val2) || 0)}`).join(' ');

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* ========================================================
          SIMULÁTOR 1: JEDNA ČASOVÁ ŘADA
      ======================================================== */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Simulátor 1</span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Živá časová řada (Jedna spojnice)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Upravujte čísla a popisky v tabulce vlevo a sledujte okamžité překreslení křivky vpravo.
            </p>
          </div>

          {/* Rychlé předvolby */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-500 pl-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Šablony:
            </span>
            <button
              onClick={() => applySinglePreset('temp')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Teplota
            </button>
            <button
              onClick={() => applySinglePreset('visitors')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Návštěvnost
            </button>
            <button
              onClick={() => applySinglePreset('crypto')}
              className="text-xs px-2.5 py-1 font-bold rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cena
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Levý sloupec: Editovatelná tabulka */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Vstupní tabulka dat
              </h3>
              <button
                onClick={addSinglePoint}
                disabled={singleData.length >= 10}
                className="text-xs px-3 py-1.5 rounded-xl font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Přidat bod
              </button>
            </div>

            {/* Popisky os */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Popis osy X</label>
                <input
                  type="text"
                  value={xAxis1}
                  onChange={(e) => setXAxis1(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-blue-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Popis osy Y</label>
                <input
                  type="text"
                  value={yAxis1}
                  onChange={(e) => setYAxis1(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-blue-500 bg-slate-50"
                />
              </div>
            </div>

            {/* Řádky tabulky */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {singleData.map((d, index) => (
                <div key={d.id} className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-slate-400 w-4 text-center">{index + 1}</span>
                  <input
                    type="text"
                    value={d.label}
                    onChange={(e) => updateSingle(d.id, 'label', e.target.value)}
                    placeholder="Čas / den"
                    className="flex-1 text-xs font-semibold px-2 py-1 border border-slate-200 rounded-md bg-white"
                  />
                  <input
                    type="number"
                    value={d.value}
                    onChange={(e) => updateSingle(d.id, 'value', Number(e.target.value))}
                    className="w-20 text-xs font-mono font-bold px-2 py-1 border border-slate-200 rounded-md bg-white text-right"
                  />
                  <button
                    onClick={() => removeSinglePoint(d.id)}
                    disabled={singleData.length <= 3}
                    className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-20 transition-colors"
                    title="Smazat bod"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Přepínač ořezu osy Y */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer bg-amber-50 p-3 rounded-xl border border-amber-200 hover:bg-amber-100/60 transition-colors">
                <input
                  type="checkbox"
                  checked={cropYAxis}
                  onChange={(e) => setCropYAxis(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-amber-900 block">Ustřihnout osu Y (Zoom na odchylky)</span>
                  <span className="text-[10px] text-amber-700">Měřítko nezačíná od 0, ale od {yMin1}</span>
                </div>
              </label>
            </div>
          </div>

          {/* Pravý sloupec: Živý SVG graf */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                Živý náhled grafu
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Počet bodů: {singleData.length}
              </span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-white my-2 shadow-inner">
              <svg viewBox={`0 0 ${svg1W} ${svg1H}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="simLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Vodorovné linky mřížky */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = padT + pct * chart1H;
                  const val = Math.round(yMax1 - pct * yRange1);
                  return (
                    <g key={i}>
                      <line x1={padL} y1={y} x2={svg1W - padR} y2={y} stroke="#334155" strokeDasharray="3" />
                      <text x={padL - 8} y={y + 3.5} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Osy */}
                <line x1={padL} y1={padT} x2={padL} y2={padT + chart1H} stroke="#475569" strokeWidth="1.5" />
                <line x1={padL} y1={padT + chart1H} x2={svg1W - padR} y2={padT + chart1H} stroke="#475569" strokeWidth="1.5" />

                {/* Plošný polygon pod křivkou */}
                <polygon points={areaPolygon1} fill="url(#simLineGrad)" />

                {/* Křivka */}
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points1}
                />

                {/* Body na křivce */}
                {singleData.map((d, i) => {
                  const x = getX1(i);
                  const y = getY1(Number(d.value) || 0);
                  return (
                    <g key={d.id} className="group">
                      <circle cx={x} cy={y} r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                      <text x={x} y={y - 10} fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {d.value}
                      </text>
                      <text x={x} y={padT + chart1H + 16} fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Popisky os */}
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 mt-2 px-2">
                <span>{yAxis1}</span>
                <span>{xAxis1}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic text-center mt-2">
              Tip: Zkuste změnit hodnotu kteréhokoliv bodu na dvojnásobek – sledujte, jak se osa Y automaticky přizpůsobí.
            </div>
          </div>

        </div>
      </div>

      <hr className="border-t border-slate-200" />

      {/* ========================================================
          SIMULÁTOR 2: POROVNÁNÍ DVOU TRENDŮ
      ======================================================== */}
      <div>
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Simulátor 2</span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Porovnání dvou křivek (Křížení trendů)
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Sledujte dvě nezávislé řady ve stejném čase. Bod, kde se modrá a fialová křivka protnou, značí změnu prvenství.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Levý sloupec: Editovatelná tabulka dvou řad */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Tabulka dvou řad
              </h3>
              <button
                onClick={addDualPoint}
                disabled={dualData.length >= 9}
                className="text-xs px-3 py-1.5 rounded-xl font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Přidat krok
              </button>
            </div>

            {/* Přejmenování řad */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-blue-600 flex items-center gap-1 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Řada 1 (Modrá)
                </label>
                <input
                  type="text"
                  value={series1Name}
                  onChange={(e) => setSeries1Name(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-blue-200 rounded-lg focus:outline-blue-500 bg-blue-50/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-purple-600 flex items-center gap-1 mb-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> Řada 2 (Fialová)
                </label>
                <input
                  type="text"
                  value={series2Name}
                  onChange={(e) => setSeries2Name(e.target.value)}
                  className="w-full text-xs font-bold px-2.5 py-1.5 border border-purple-200 rounded-lg focus:outline-purple-500 bg-purple-50/50"
                />
              </div>
            </div>

            {/* Řádky */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {dualData.map((d, index) => (
                <div key={d.id} className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-slate-400 w-4 text-center">{index + 1}</span>
                  <input
                    type="text"
                    value={d.label}
                    onChange={(e) => updateDual(d.id, 'label', e.target.value)}
                    className="w-16 text-xs font-semibold px-2 py-1 border border-slate-200 rounded-md bg-white"
                  />
                  <input
                    type="number"
                    value={d.val1}
                    onChange={(e) => updateDual(d.id, 'val1', Number(e.target.value))}
                    className="flex-1 text-xs font-mono font-bold px-2 py-1 border border-blue-200 rounded-md bg-white text-right text-blue-700"
                  />
                  <input
                    type="number"
                    value={d.val2}
                    onChange={(e) => updateDual(d.id, 'val2', Number(e.target.value))}
                    className="flex-1 text-xs font-mono font-bold px-2 py-1 border border-purple-200 rounded-md bg-white text-right text-purple-700"
                  />
                  <button
                    onClick={() => removeDualPoint(d.id)}
                    disabled={dualData.length <= 3}
                    className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>Osa X: <strong>{xAxis2}</strong></span>
              <button
                onClick={() => setDualData(DEFAULT_DUAL_LINE_DATA)}
                className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold"
              >
                <RotateCcw className="w-3 h-3" /> Obnovit výchozí
              </button>
            </div>
          </div>

          {/* Pravý sloupec: Živý duální graf */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              {/* Legenda */}
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-3 h-1 bg-blue-500 rounded-full"></span> {series1Name}
                </span>
                <span className="flex items-center gap-1.5 text-purple-700">
                  <span className="w-3 h-1 bg-purple-500 rounded-full"></span> {series2Name}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Max hodnota: {maxDual}
              </span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-white my-2 shadow-inner">
              <svg viewBox={`0 0 ${svg1W} ${svg1H}`} className="w-full h-auto">
                {/* Mřížka */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = padT + pct * chart1H;
                  const val = Math.round(yMax2 * (1 - pct));
                  return (
                    <g key={i}>
                      <line x1={padL} y1={y} x2={svg1W - padR} y2={y} stroke="#334155" strokeDasharray="3" />
                      <text x={padL - 8} y={y + 3.5} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Osy */}
                <line x1={padL} y1={padT} x2={padL} y2={padT + chart1H} stroke="#475569" strokeWidth="1.5" />
                <line x1={padL} y1={padT + chart1H} x2={svg1W - padR} y2={padT + chart1H} stroke="#475569" strokeWidth="1.5" />

                {/* Řada 1 (Modrá křivka) */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsDual1}
                />

                {/* Řada 2 (Fialová křivka) */}
                <polyline
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 2"
                  points={pointsDual2}
                />

                {/* Body obou řad */}
                {dualData.map((d, i) => {
                  const x = getX2(i);
                  const y1 = getY2(Number(d.val1) || 0);
                  const y2 = getY2(Number(d.val2) || 0);
                  return (
                    <g key={d.id}>
                      <circle cx={x} cy={y1} r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx={x} cy={y2} r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={x} y={padT + chart1H + 16} fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mt-2">
              <span>Sledujte, kdy fialová křivka předehnala modrou (bod křížení o víkendu).</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
