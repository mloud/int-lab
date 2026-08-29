import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';

interface ImageSizeGameProps {
  onBack: () => void;
}

type SizePhase = 'intro' | 'task1' | 'task2' | 'task3' | 'task4' | 'finished';

type TaskField = {
  id: string;
  label: string;
  target: number;
  unit: string;
};

const ImageSizeGame: React.FC<ImageSizeGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<SizePhase>('intro');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'none' | 'wrong' | 'correct'>('none');

  const configs = {
    intro: {
      title: 'Jak velký je obrázek v paměti?',
      description: 'Známe-li počet pixelů a barevnou hloubku (kolik bitů potřebujeme na jeden pixel), snadno spočítáme celkovou velikost obrázku. Pamatuj: 1 bajt (B) = 8 bitů (b). Neboj se použít kalkulačku!',
      type: 'read'
    },
    task1: {
      title: 'Úloha 1: Černobílý obrázek',
      description: 'Představ si malý černobílý obrázek (1 pixel = 1 bit). Zkus to nejprve spočítat v hlavě.',
      resolution: '8×8',
      depth: '1 bit na pixel',
      fields: [
        { id: 'bits', label: 'Velikost v bitech', target: 64, unit: 'b' },
        { id: 'bytes', label: 'Velikost v bajtech', target: 8, unit: 'B' }
      ] as TaskField[],
      type: 'calc'
    },
    task2: {
      title: 'Úloha 2: Barevná ikona',
      description: 'Nyní máme malou barevnou ikonu ve formátu RGB (každý pixel potřebuje 24 bitů = 3 bajty).',
      resolution: '10×10',
      depth: '24 bitů na pixel',
      fields: [
        { id: 'bits', label: 'Velikost v bitech', target: 2400, unit: 'b' },
        { id: 'bytes', label: 'Velikost v bajtech', target: 300, unit: 'B' }
      ] as TaskField[],
      type: 'calc'
    },
    task3: {
      title: 'Úloha 3: Fotka z mobilu (Full HD)',
      description: 'Teď přejdeme do reality. Fotografie na mobilu má často rozlišení 1920 × 1080 pixelů v barvách RGB (24 bitů). Vem si kalkulačku! (Výsledek v MB zaokrouhli na celé číslo).',
      resolution: '1920×1080',
      depth: '24 bitů na pixel',
      fields: [
        { id: 'pixels', label: 'Celkový počet pixelů', target: 2073600, unit: 'px' },
        { id: 'mb', label: 'Velikost', target: 6, unit: 'MB' } // 2073600 * 24 / 8 / 1000000 = 6.22 -> 6
      ] as TaskField[],
      type: 'calc'
    },
    task4: {
      title: 'Úloha 4: 4K filmové rozlišení',
      description: 'A co obrovský 4K obraz na televizi? Rozlišení je 3840 × 2160 pixelů (RGB, 24 bitů). Na to už určitě použij kalkulačku. Výsledek opět zaokrouhli na celé MB.',
      resolution: '3840×2160',
      depth: '24 bitů na pixel',
      fields: [
        { id: 'pixels', label: 'Celkový počet pixelů', target: 8294400, unit: 'px' },
        { id: 'mb', label: 'Velikost', target: 25, unit: 'MB' } // 8294400 * 24 / 8 / 1000000 = 24.88 -> 25
      ] as TaskField[],
      type: 'calc'
    }
  };

  // @ts-ignore
  const currentTask = phase !== 'finished' ? configs[phase] : null;

  const checkTask = () => {
    if (!currentTask || currentTask.type !== 'calc') return;
    
    let isCorrect = true;
    for (const field of currentTask.fields) {
      if (parseInt(inputs[field.id] || '0') !== field.target) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 2000);
    }
  };

  const nextPhase = () => {
    const phases: SizePhase[] = ['intro', 'task1', 'task2', 'task3', 'task4', 'finished'];
    const currIdx = phases.indexOf(phase);
    if (currIdx < phases.length - 1) {
      setPhase(phases[currIdx + 1]);
      setInputs({});
      setFeedback('none');
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
    setFeedback('none');
  };

  return (
    <div className="max-w-5xl w-full mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      {currentTask && (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-amber-50">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-black text-amber-600">3</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">{currentTask.title}</h2>
          </div>
          <p className="text-gray-600 mb-8 font-medium text-lg ml-16">{currentTask.description}</p>

          <div className="flex flex-col md:flex-row gap-12 items-stretch justify-center">
            
            {/* Vizuál úkolu */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-8 border-2 border-gray-100">
               {currentTask.type === 'read' ? (
                 <div className="text-center">
                    <Calculator className="w-24 h-24 text-amber-300 mx-auto mb-6" />
                    <p className="text-xl font-bold text-gray-700">Velikost v bitech = Šířka × Výška × Bitová hloubka</p>
                    <p className="text-gray-500 mt-4">Velikost v bajtech získáš vydělením osmi.</p>
                 </div>
               ) : (
                 <div className="text-center">
                   <div className="text-5xl md:text-6xl font-black text-amber-500 mb-4 tracking-tighter">{currentTask.resolution}</div>
                   <div className="text-2xl font-bold text-gray-700 mb-2">pixelů</div>
                   <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-xl text-sm uppercase tracking-widest mt-4">
                     {currentTask.depth}
                   </div>
                 </div>
               )}
            </div>

            {/* Input Form */}
            <div className="flex-1 flex flex-col justify-center w-full min-h-[320px]">
              {currentTask.type === 'read' ? (
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl w-full h-full flex items-center justify-center">
                  <p className="text-amber-400 font-mono text-2xl text-center leading-relaxed">
                    1 B = 8 b<br/>
                    1 kB = 1000 B<br/>
                    1 MB = 1000 kB
                  </p>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl shadow-lg w-full">
                  {currentTask.fields.map((field: TaskField) => (
                    <div key={field.id} className="mb-6">
                      <label className="block text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">{field.label}</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full bg-gray-50 text-gray-800 font-black text-2xl p-4 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-0 outline-none"
                          placeholder="0"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{field.unit}</span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8">
                    {feedback === 'correct' ? (
                      <div className="animate-in slide-in-from-bottom-4">
                        <div className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl mb-4 flex items-center justify-center gap-3 font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-6 h-6" /> Správně!
                        </div>
                        <button 
                          onClick={nextPhase}
                          className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                        >
                          Další úloha <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={checkTask}
                        className={`w-full py-5 font-black rounded-2xl shadow-lg transition-all uppercase tracking-widest flex justify-center items-center gap-2 ${
                          feedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-gray-900 hover:bg-black text-white'
                        }`}
                      >
                        {feedback === 'wrong' ? 'Někde je chyba v počtech!' : 'Zkontrolovat'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {currentTask.type === 'read' && (
                <div className="mt-8">
                  <button 
                    onClick={nextPhase}
                    className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 uppercase tracking-widest flex justify-center items-center gap-2"
                  >
                    Rozumím, jdeme počítat <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {phase === 'finished' && (
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl text-center border-4 border-amber-50 animate-in zoom-in">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-amber-500" />
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-4 uppercase tracking-tighter">Výpočty Dokončeny!</h2>
          <p className="text-xl text-gray-600 mb-10">
            Skvělá práce! Nyní už víš, že surové fotografie z mobilu mohou mít desítky megabajtů, a bez komprese by se nám brzy zaplnila paměť!
          </p>
          <button 
            onClick={onBack}
            className="px-10 py-5 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-widest flex mx-auto items-center gap-3"
          >
            Zpět do menu <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSizeGame;
