import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Play, AlertTriangle, FileText, BookOpen, ImageIcon, Music, Film, HardDrive, Calculator } from 'lucide-react';

interface DataUnitsPracticeProps {
  onBack: () => void;
}

interface Question {
  id: string;
  text: string;
  answer: number;
  unit: string;
}

interface Mission {
  id: string;
  title: string;
  icon: React.ReactNode;
  context: string;
  questions: Question[];
}

const MISSIONS: Mission[] = [
  {
    id: 'mission_text',
    title: 'Stránka textu',
    icon: <FileText className="w-10 h-10 text-blue-500" />,
    context: 'Představ si stránku papíru, která má 30 řádků a na každém řádku je přesně 100 znaků (včetně mezer). V dnešní době se většinou 1 znak ukládá jako 2 B (Bajty). Vezmi si vedle papír nebo kalkulačku a pojďme to spočítat.',
    questions: [
      { id: 'q1', text: 'Kolik znaků je celkem na jedné stránce?', answer: 3000, unit: 'znaků' },
      { id: 'q2', text: 'Když jeden znak zabere 2 B, kolik Bajtů (B) zabere celá stránka?', answer: 6000, unit: 'B' },
      { id: 'q3', text: 'Kolik je to Kilobajtů (KB)?', answer: 6, unit: 'KB' }
    ]
  },
  {
    id: 'mission_book',
    title: 'Tlustá kniha',
    icon: <BookOpen className="w-10 h-10 text-amber-500" />,
    context: 'Nyní budeme z digitalizovat celou knihu. Kniha nemá žádné obrázky a má rovných 1 000 stránek. Z minulé úlohy už víme, že jedna taková stránka má přesně 6 KB dat.',
    questions: [
      { id: 'q1', text: 'Kolik Kilobajtů (KB) dat bude mít celá kniha?', answer: 6000, unit: 'KB' },
      { id: 'q2', text: 'Převeď tento výsledek. Kolik to je Megabajtů (MB)?', answer: 6, unit: 'MB' }
    ]
  },
  {
    id: 'mission_photo',
    title: 'Fotografie z mobilu',
    icon: <ImageIcon className="w-10 h-10 text-emerald-500" />,
    context: 'Máš mobil s dobrým fotoaparátem, který fotí v rozlišení 20 Mpix (tedy fotka se skládá z 20 milionů malinkých bodů - pixelů). Počítač potřebuje pro uložení barvy každého takového bodu přesně 3 Bajty (B).',
    questions: [
      { id: 'q1', text: 'Zapiš, kolik milionů Bajtů (MB) by taková fotka v paměti zabrala (bez jakékoli komprese)?', answer: 60, unit: 'MB' }
    ]
  },
  {
    id: 'mission_music',
    title: 'Hudební album',
    icon: <Music className="w-10 h-10 text-rose-500" />,
    context: 'Stahuješ si do telefonu hudbu na výlet. Jedna minuta písničky ve zkomprimovaném formátu MP3 zabere v paměti zhruba 2 MB dat. Celé hudební album od tvé oblíbené kapely trvá 45 minut.',
    questions: [
      { id: 'q1', text: 'Kolik Megabajtů (MB) místa na disku ti zabere celé toto album?', answer: 90, unit: 'MB' }
    ]
  },
  {
    id: 'mission_video',
    title: 'Seriál na večer',
    icon: <Film className="w-10 h-10 text-orange-500" />,
    context: 'Když koukáš na Netflixu na film v běžném HD rozlišení, přenese se po síti (nebo zabere na disku) asi 6 MB dat za každou půl minutu (30 sekund). Chceš se podívat na díl seriálu, který má přesně 60 minut.',
    questions: [
      { id: 'q1', text: 'Kolik Megabajtů (MB) dat se přenese za 1 celou minutu?', answer: 12, unit: 'MB' },
      { id: 'q2', text: 'Kolik Megabajtů (MB) pak zabere celý 60minutový seriál?', answer: 720, unit: 'MB' }
    ]
  },
  {
    id: 'mission_disk',
    title: 'Kapacita flash disku',
    icon: <HardDrive className="w-10 h-10 text-slate-500" />,
    context: 'Chceš nahrát kamarádovi nějaké nové počítačové hry. Každá instalace hry zabere přesně 15 000 MB místa. Vzal jsi si s sebou starší USB flash disk s celkovou kapacitou 64 GB.',
    questions: [
      { id: 'q1', text: 'Vypočítej, kolik celých (nezkrácených) her se ti na tento flash disk naráz vejde?', answer: 4, unit: 'her' }
    ]
  }
];

const DataUnitsPractice: React.FC<DataUnitsPracticeProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [missionIdx, setMissionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const startGame = () => {
    setGameState('playing');
    setMissionIdx(0);
    setQuestionIdx(0);
    setInputValue('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleNextMission = () => {
    if (missionIdx + 1 < MISSIONS.length) {
      setMissionIdx(missionIdx + 1);
      setQuestionIdx(0);
      setInputValue('');
      setSuccessMsg('');
    } else {
      setGameState('won');
    }
  };

  const handleNextQuestion = () => {
    const currentMission = MISSIONS[missionIdx];
    if (questionIdx + 1 < currentMission.questions.length) {
      setQuestionIdx(questionIdx + 1);
      setInputValue('');
      setSuccessMsg('');
    } else {
      setSuccessMsg('Mise splněna! Skvělá práce.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const num = parseInt(inputValue.trim(), 10);
    const currentMission = MISSIONS[missionIdx];
    const currentQuestion = currentMission.questions[questionIdx];

    if (isNaN(num)) {
      setErrorMsg('Musíš zadat číslo.');
      return;
    }

    if (num === currentQuestion.answer) {
      setErrorMsg('');
      handleNextQuestion();
    } else {
      setErrorMsg(`Chyba. ${num} není správný výsledek. Zkus to přepočítat.`);
    }
  };

  if (gameState === 'intro') {
    return (
      <div className="max-w-4xl w-full mx-auto animate-in fade-in duration-500 px-4">
        <div className="flex justify-start mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Zpět
          </button>
        </div>

        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-blue-50 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center shadow-inner">
              <Calculator className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">Praxe: Výpočty kapacity</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Vem si k ruce papír, tužku nebo kalkulačku. Budeš řešit reálné problémy s ukládáním dat. Zjistíš, kolik fotek, hudby a videa se vejde na různé disky a projdeš si převody od Bajtů až po Gigabajty.
          </p>
          <button
            onClick={startGame}
            className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 text-xl tracking-wider uppercase"
          >
            <Play className="w-6 h-6" /> Spustit mise
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="max-w-4xl w-full mx-auto animate-in zoom-in duration-500 px-4">
        <div className="bg-white p-16 rounded-[3rem] shadow-2xl border-4 border-emerald-50 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight uppercase">Skvělá práce!</h1>
          <p className="text-2xl text-gray-600 mb-10">
            Úspěšně jsi spočítal všechny kapacity. Jednotky dat už máš v malíku.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
          >
            Zpět do menu
          </button>
        </div>
      </div>
    );
  }

  const currentMission = MISSIONS[missionIdx];
  const isMissionComplete = successMsg.includes('Mise splněna');
  const currentQuestion = isMissionComplete ? currentMission.questions[currentMission.questions.length - 1] : currentMission.questions[questionIdx];

  return (
    <div className="max-w-4xl w-full mx-auto animate-in fade-in duration-300 px-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Odejít
        </button>
        
        <div className="flex gap-2">
          {MISSIONS.map((m, i) => (
            <div key={m.id} className={`w-3 h-3 rounded-full transition-colors ${i < missionIdx ? 'bg-emerald-500' : i === missionIdx ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-slate-100 flex flex-col md:flex-row">
        
        {/* Left Side: Context */}
        <div className="bg-slate-50 p-10 md:w-5/12 flex flex-col justify-center items-center text-center border-r-2 border-slate-100">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-md mb-6">
            {currentMission.icon}
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter">
            Mise {missionIdx + 1}
          </h2>
          <h3 className="text-xl font-bold text-blue-600 mb-6">{currentMission.title}</h3>
          
          <p className="text-slate-600 font-medium leading-relaxed">
            {currentMission.context}
          </p>
        </div>

        {/* Right Side: Questions */}
        <div className="p-10 md:w-7/12 flex flex-col justify-center">
          
          <div className="mb-6 flex gap-2">
            {currentMission.questions.map((q, i) => (
               <div key={q.id} className={`flex-1 h-2 rounded-full transition-colors ${i < questionIdx || isMissionComplete ? 'bg-emerald-400' : i === questionIdx ? 'bg-blue-400' : 'bg-gray-100'}`} />
            ))}
          </div>

          {!isMissionComplete ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Otázka {questionIdx + 1} z {currentMission.questions.length}</h4>
              <p className="text-2xl font-black text-gray-800 mb-8 leading-snug">
                {currentQuestion.text}
              </p>

              <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setErrorMsg('');
                  }}
                  autoFocus
                  className="w-full text-3xl font-black text-center border-4 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="Výsledek"
                />
                <span className="text-2xl font-bold text-gray-500 shrink-0">{currentQuestion.unit}</span>
              </form>

              {errorMsg && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 font-bold rounded-xl flex items-center gap-3 animate-in shake">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full mt-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-widest"
              >
                Ověřit výsledek
              </button>
            </div>
          ) : (
            <div className="animate-in zoom-in duration-300 text-center py-8">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                 <CheckCircle2 className="w-10 h-10 text-emerald-500" />
               </div>
               <h3 className="text-3xl font-black text-emerald-600 mb-2">{successMsg}</h3>
               <p className="text-gray-500 font-medium mb-8">Úspěšně jsi dokončil tuto misi.</p>
               
               <button
                  onClick={handleNextMission}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                >
                  Další mise <ArrowRight className="w-5 h-5" />
                </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DataUnitsPractice;
