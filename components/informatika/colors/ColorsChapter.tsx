import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Palette,
  BrainCircuit,
  FlaskConical,
  Sun,
  Printer,
  Sparkles,
  Layers,
  Monitor,
  Rocket,
  Cat
} from 'lucide-react';
import ColorMixer from './ColorMixer';
import RGBDrawing from './RGBDrawing';
import Quiz from './Quiz';
import { Difficulty, Segment } from '@/types';
import { ROCKET_DATA, CAT_DATA, COMPUTER_DATA } from '@/constants';

type Tab = 'theory' | 'mixer' | 'drawing' | 'quiz';

interface ColorsChapterProps {
  onBack: () => void;
  initialTab?: Tab;
}

const COLOR_CHEAT_SHEET = [
  { name: 'Černá', rgb: '0, 0, 0', hex: '#000000', note: 'Zhasnutá světla', textColor: 'text-white' },
  { name: 'Červená', rgb: '255, 0, 0', hex: '#ff0000', note: 'Jen červený kanál', textColor: 'text-white' },
  { name: 'Zelená', rgb: '0, 255, 0', hex: '#00ff00', note: 'Jen zelený kanál', textColor: 'text-slate-900' },
  { name: 'Modrá', rgb: '0, 0, 255', hex: '#0000ff', note: 'Jen modrý kanál', textColor: 'text-white' },
  { name: 'Žlutá', rgb: '255, 255, 0', hex: '#ffff00', note: 'Červená + Zelená', textColor: 'text-slate-900' },
  { name: 'Azurová', rgb: '0, 255, 255', hex: '#00ffff', note: 'Zelená + Modrá', textColor: 'text-slate-900' },
  { name: 'Purpurová', rgb: '255, 0, 255', hex: '#ff00ff', note: 'Červená + Modrá', textColor: 'text-white' },
  { name: 'Bílá', rgb: '255, 255, 255', hex: '#ffffff', note: 'Všechny kanály naplno', textColor: 'text-slate-900' },
];

const ColorsChapter: React.FC<ColorsChapterProps> = ({ onBack, initialTab = 'theory' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [mixerMode, setMixerMode] = useState<'RGB' | 'CMYK'>('RGB');
  const [drawingDifficulty, setDrawingDifficulty] = useState<Difficulty>('easy');

  const getDrawingData = (): { data: Segment[]; title: string } => {
    switch (drawingDifficulty) {
      case 'easy':
        return { data: ROCKET_DATA, title: 'Raketa (Snadná)' };
      case 'medium':
        return { data: CAT_DATA, title: 'Kočka (Střední)' };
      case 'hard':
        return { data: COMPUTER_DATA, title: 'Počítač (Těžká)' };
    }
  };

  const currentDrawing = getDrawingData();

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto animate-in fade-in duration-500 px-4 pb-12">
      {/* HEADER & TABS NAVIGATION */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do informatiky
        </button>

        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'theory'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="w-5 h-5" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('mixer')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'mixer'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FlaskConical className="w-5 h-5" /> Míchací laboratoř
          </button>
          <button
            onClick={() => setActiveTab('drawing')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'drawing'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="w-5 h-5" /> Malování podle RGB
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BrainCircuit className="w-5 h-5" /> Hádání barev (Kvíz)
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="w-full">
        {/* TAB 1: TEORIE */}
        {activeTab === 'theory' && (
          <div className="flex flex-col gap-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 w-full p-8 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left gap-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900 rounded-full blur-[60px] -translate-x-1/2 translate-y-1/2 opacity-60"></div>

              <div className="relative z-10 flex-1">
                <div className="inline-block px-4 py-1.5 bg-blue-500/80 rounded-full text-blue-100 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm border border-blue-400/50">
                  Základy informatiky • 6. třída
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                  Kódování <br />
                  <span className="text-blue-200">barev</span>
                </h1>
                <p className="text-lg text-blue-100 font-medium max-w-md leading-relaxed">
                  Jak monitor složený z milionů miniaturních světelných bodů dokáže zobrazit jakoukoli barvu z reálného světa?
                </p>
              </div>

              <div className="relative z-10 flex shrink-0">
                <div className="w-40 h-40 sm:w-56 sm:h-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] flex items-center justify-center shadow-2xl rotate-6 transform hover:rotate-12 transition-transform duration-500">
                  <Palette className="w-20 h-20 sm:w-28 sm:h-28 text-white drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* THREE KEY THEORY CARDS */}
            <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border-4 border-slate-100">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight mb-3">
                  Jak počítač skládá barvy?
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Zatímco malíř míchá tempery na paletě, obrazovka počítače míchá barevné paprsky světla.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50/60 rounded-3xl border-2 border-blue-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <Sun className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    1. RGB model (Světlo)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Skládá se ze tří barev: <strong>Red</strong> (červená), <strong>Green</strong> (zelená) a <strong>Blue</strong> (modrá).
                    Obrazovka začíná černá – rozsvícením všech tří světel naplno vzniká čistá bílá!
                  </p>
                </div>

                <div className="p-6 bg-indigo-50/60 rounded-3xl border-2 border-indigo-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    2. Hodnoty 0 až 255
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Každá složka má 1 bajt (8 bitů), tedy 256 úrovní jasu.
                    Kombinací 256 × 256 × 256 vzniká přes <strong>16,7 milionu různých barev</strong> (True Color).
                  </p>
                </div>

                <div className="p-6 bg-purple-50/60 rounded-3xl border-2 border-purple-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <Printer className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    3. Světlo vs. Tisk (CMYK)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Displeje míchají <strong>světlo (RGB)</strong>.
                    Tiskárny naopak míchají <strong>pigmenty (CMYK)</strong> na bílý papír – azurová, purpurová, žlutá a černá pohlcují odražené světlo.
                  </p>
                </div>
              </div>
            </div>

            {/* COLOR CHEAT SHEET */}
            <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border-4 border-slate-100">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight mb-3">
                  RGB Tahák základních barev
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Jaké hodnoty zadat, když chceš vytvořit základní barvy?
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {COLOR_CHEAT_SHEET.map((col) => (
                  <div
                    key={col.name}
                    className="p-4 rounded-2xl border-2 border-slate-100 flex flex-col items-center text-center shadow-sm"
                  >
                    <div
                      className="w-16 h-16 rounded-xl border border-slate-300 shadow-inner mb-3 flex items-center justify-center"
                      style={{ backgroundColor: col.hex }}
                    >
                      <span className={`text-[10px] font-black uppercase ${col.textColor}`}>
                        {col.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-700 mb-1">
                      RGB({col.rgb})
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{col.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MÍCHACÍ LABORATOŘ */}
        {activeTab === 'mixer' && (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-500">
            {/* SUB-TOGGLE: RGB VS CMYK */}
            <div className="flex bg-white p-1.5 rounded-2xl border-2 border-indigo-100 shadow-sm gap-2">
              <button
                onClick={() => setMixerMode('RGB')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  mixerMode === 'RGB'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sun className="w-4 h-4" /> RGB (Míchání světla • Displej)
              </button>
              <button
                onClick={() => setMixerMode('CMYK')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  mixerMode === 'CMYK'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Printer className="w-4 h-4" /> CMYK (Míchání pigmentu • Tisk)
              </button>
            </div>

            <ColorMixer mode={mixerMode} hideBack={true} />
          </div>
        )}

        {/* TAB 3: MALOVÁNÍ PODLE RGB */}
        {activeTab === 'drawing' && (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-500">
            {/* SUB-TOGGLE: OBTÍŽNOST / MOTIV */}
            <div className="flex bg-white p-1.5 rounded-2xl border-2 border-emerald-100 shadow-sm gap-2 flex-wrap justify-center">
              <button
                onClick={() => setDrawingDifficulty('easy')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  drawingDifficulty === 'easy'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Rocket className="w-4 h-4" /> Raketa (Snadná • 10 částí)
              </button>
              <button
                onClick={() => setDrawingDifficulty('medium')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  drawingDifficulty === 'medium'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cat className="w-4 h-4" /> Kočka (Střední • 15 částí)
              </button>
              <button
                onClick={() => setDrawingDifficulty('hard')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  drawingDifficulty === 'hard'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-4 h-4" /> Počítač (Těžká • 20 částí)
              </button>
            </div>

            <RGBDrawing
              initialSegments={currentDrawing.data}
              title={currentDrawing.title}
              hideBack={true}
            />
          </div>
        )}

        {/* TAB 4: KVÍZ */}
        {activeTab === 'quiz' && (
          <div className="w-full flex justify-center animate-in fade-in duration-500">
            <Quiz hideBack={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorsChapter;
