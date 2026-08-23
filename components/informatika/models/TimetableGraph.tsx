
import React, { useState, useMemo } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RefreshCcw, ChevronRight, ChevronLeft, Train } from 'lucide-react';

interface TimetableEntry {
  station: string;
  arr: string;
  dep: string;
  km: number;
}

interface TimetableLevel {
  id: number;
  title: string;
  timetable: TimetableEntry[];
}

const LEVELS: TimetableLevel[] = [
  {
    id: 1,
    title: "Liberec - Vesec",
    timetable: [
      { station: "Liberec", arr: "10:35", dep: "10:35", km: 0 },
      { station: "Liberec-Rochlice", arr: "10:38", dep: "10:38", km: 2 },
      { station: "Vesec u Liberce", arr: "10:41", dep: "10:41", km: 4 },
    ]
  },
  {
    id: 2,
    title: "Praha - Kolín",
    timetable: [
      { station: "Praha hl.n.", arr: "08:15", dep: "08:15", km: 0 },
      { station: "Praha-Libeň", arr: "08:21", dep: "08:21", km: 6 },
      { station: "Český Brod", arr: "08:45", dep: "08:45", km: 34 },
      { station: "Kolín", arr: "09:05", dep: "09:05", km: 62 },
    ]
  },
  {
    id: 3,
    title: "Ostrava - Olomouc",
    timetable: [
      { station: "Ostrava hl.n.", arr: "12:10", dep: "12:10", km: 0 },
      { station: "Ostrava-Svinov", arr: "12:17", dep: "12:17", km: 7 },
      { station: "Studénka", arr: "12:32", dep: "12:32", km: 26 },
      { station: "Suchdol n.O.", arr: "12:44", dep: "12:44", km: 41 },
      { station: "Olomouc hl.n.", arr: "13:15", dep: "13:15", km: 86 },
    ]
  },
  {
    id: 4,
    title: "Plzeň - Budějovice",
    timetable: [
      { station: "Plzeň hl.n.", arr: "14:05", dep: "14:05", km: 0 },
      { station: "Starý Plzenec", arr: "14:15", dep: "14:15", km: 10 },
      { station: "Nezvěstice", arr: "14:24", dep: "14:24", km: 18 },
      { station: "Blovice", arr: "14:35", dep: "14:35", km: 28 },
      { station: "Nepomuk", arr: "14:50", dep: "14:50", km: 45 },
      { station: "Strakonice", arr: "15:25", dep: "15:25", km: 85 },
    ]
  },
  {
    id: 5,
    title: "Liberec - Jablonec",
    timetable: [
      { station: "Liberec", arr: "10:35", dep: "10:35", km: 0 },
      { station: "Liberec-Rochlice", arr: "10:38", dep: "10:38", km: 2 },
      { station: "Vesec u Liberce", arr: "10:41", dep: "10:41", km: 4 },
      { station: "Vratislavice n.N.", arr: "10:43", dep: "10:43", km: 5 },
      { station: "Proseč n.Nisou", arr: "10:46", dep: "10:46", km: 7 },
      { station: "Jablonec d.n.", arr: "10:51", dep: "10:51", km: 11 },
      { station: "Jablonec n.Nisou", arr: "10:55", dep: "10:55", km: 12 },
    ]
  }
];

interface TimetableGraphProps {
  onBack: () => void;
}

const TimetableGraph: React.FC<TimetableGraphProps> = ({ onBack }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = LEVELS[levelIndex];
  
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const segments = useMemo(() => {
    const res = [];
    for (let i = 0; i < currentLevel.timetable.length - 1; i++) {
      const s1 = currentLevel.timetable[i];
      const s2 = currentLevel.timetable[i + 1];
      
      // Calculate time diff in minutes
      const t1 = s1.dep.split(':').map(Number);
      const t2 = s2.dep.split(':').map(Number);
      const min1 = t1[0] * 60 + t1[1];
      const min2 = t2[0] * 60 + t2[1];
      const duration = min2 - min1;
      
      const distance = s2.km - s1.km;
      
      res.push({
        id: i,
        from: s1.station,
        to: s2.station,
        duration,
        distance
      });
    }
    return res;
  }, [currentLevel]);

  const handleInputChange = (id: number, type: 'min' | 'km', value: string) => {
    setInputs(prev => ({
      ...prev,
      [`${id}-${type}`]: value
    }));
    setFeedback('none');
  };

  const checkAnswers = () => {
    let allCorrect = true;
    segments.forEach(seg => {
      const userMin = parseInt(inputs[`${seg.id}-min`] || '0');
      const userKm = parseInt(inputs[`${seg.id}-km`] || '0');
      
      if (userMin !== seg.duration || userKm !== seg.distance) {
        allCorrect = false;
      }
    });
    
    setFeedback(allCorrect ? 'correct' : 'wrong');
  };

  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      setInputs({});
      setFeedback('none');
    }
  };

  const prevLevel = () => {
    if (levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
      setInputs({});
      setFeedback('none');
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-purple-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Grafy: Jízdní řád</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={prevLevel}
            disabled={levelIndex === 0}
            className="p-2 hover:bg-purple-50 rounded-xl disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <span className="font-black text-purple-600 uppercase text-sm tracking-widest">Úroveň {levelIndex + 1} / {LEVELS.length}</span>
          <button 
            onClick={nextLevel}
            disabled={levelIndex === LEVELS.length - 1}
            className="p-2 hover:bg-purple-50 rounded-xl disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Timetable Table */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Train className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{currentLevel.title}</h3>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase text-[10px]">Stanice</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase text-[10px]">Čas</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase text-[10px]">Km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentLevel.timetable.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-700">{entry.station}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono">{entry.dep}</td>
                    <td className="px-4 py-3 font-bold text-purple-600">{entry.km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
            <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              Vypočítej <strong>dobu jízdy</strong> (v minutách) a <strong>vzdálenost</strong> (v km) mezi stanicemi a doplň je do grafu.
            </p>
          </div>
        </div>

        {/* Graph Workspace */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center overflow-hidden">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-12 w-full text-left">Model trasy (Ohodnocený graf)</h3>
          
          <div className="relative w-full flex flex-col items-start py-10 overflow-x-auto">
            <div className="flex items-center min-w-max px-10 mx-auto">
              {currentLevel.timetable.map((entry, idx) => (
                <React.Fragment key={idx}>
                  {/* Node */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-200 border-4 border-white z-10">
                      <span className="text-white font-black text-xl">{idx + 1}</span>
                    </div>
                    <div className="absolute -bottom-12 w-32 text-center">
                      <p className="text-[10px] font-black text-gray-500 uppercase leading-tight">{entry.station}</p>
                    </div>
                  </div>

                  {/* Edge */}
                  {idx < currentLevel.timetable.length - 1 && (
                    <div className="flex flex-col items-center px-4 relative">
                      <div className="w-32 h-1 bg-purple-200 rounded-full mb-4"></div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={inputs[`${idx}-min`] || ''}
                            onChange={(e) => handleInputChange(idx, 'min', e.target.value)}
                            className="w-12 h-8 bg-gray-50 border-2 border-gray-100 rounded-lg text-center text-xs font-black text-purple-600 focus:outline-none focus:border-purple-400"
                            placeholder="?"
                          />
                          <span className="text-[10px] font-black text-gray-400 uppercase">min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={inputs[`${idx}-km`] || ''}
                            onChange={(e) => handleInputChange(idx, 'km', e.target.value)}
                            className="w-12 h-8 bg-gray-50 border-2 border-gray-100 rounded-lg text-center text-xs font-black text-blue-600 focus:outline-none focus:border-blue-400"
                            placeholder="?"
                          />
                          <span className="text-[10px] font-black text-gray-400 uppercase">km</span>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
            {feedback === 'correct' ? (
              <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                <div className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                  Výborně! Graf je správně.
                </div>
                {levelIndex < LEVELS.length - 1 && (
                  <button 
                    onClick={nextLevel}
                    className="px-8 py-3 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all"
                  >
                    Další úroveň
                  </button>
                )}
              </div>
            ) : feedback === 'wrong' ? (
              <div className="flex flex-col items-center gap-4 animate-in shake duration-300">
                <div className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-red-100">
                  <XCircle className="w-6 h-6" />
                  Něco je špatně, zkus to znovu.
                </div>
                <button 
                  onClick={() => setFeedback('none')}
                  className="text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors"
                >
                  Zkusit opravit
                </button>
              </div>
            ) : (
              <button 
                onClick={checkAnswers}
                className="px-12 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all active:scale-95"
              >
                Ověřit model
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default TimetableGraph;
