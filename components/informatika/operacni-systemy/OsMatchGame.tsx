import React, { useState } from 'react';
import { ArrowLeft, Monitor, Smartphone, Laptop, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface OsMatchGameProps {
  onBack: () => void;
}

type OsType = 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS';

interface DeviceScenario {
  id: number;
  description: string;
  correctOs: OsType;
  hint: string;
}

const SCENARIOS: DeviceScenario[] = [
  {
    id: 1,
    description: "Většina běžných stolních počítačů a notebooků funguje na mně. Prodávám se např. ve verzích Home a Professional.",
    correctOs: 'Windows',
    hint: "Nejrozšířenější systém na počítačích od firmy Microsoft."
  },
  {
    id: 2,
    description: "Běžím na většině chytrých telefonů a tabletů na světě (kromě těch od Applu). Stojí za mnou firma Google.",
    correctOs: 'Android',
    hint: "Nejpoužívanější mobilní operační systém s ikonou zeleného robota."
  },
  {
    id: 3,
    description: "Jsem operační systém v prémiových noteboocích (MacBook) a počítačích s nakousnutým jablkem v logu.",
    correctOs: 'macOS',
    hint: "Systém pro počítače od firmy Apple."
  },
  {
    id: 4,
    description: "Jsem úplně zdarma! Kdokoli si mě může stáhnout a dokonce mě upravovat. Mám ve znaku tučňáka.",
    correctOs: 'Linux',
    hint: "Open-source systém, jehož jádro vytvořil Linus Torvalds."
  },
  {
    id: 5,
    description: "Můžeš mě najít pouze v mobilních telefonech iPhone. Na žádný jiný telefon (např. od Samsungu) mě nenainstaluješ.",
    correctOs: 'iOS',
    hint: "Uzavřený systém firmy Apple pro jejich mobilní telefony."
  },
  {
    id: 6,
    description: "Jsem systém, který je často už předinstalovaný na počítačích značek Lenovo, HP, Dell nebo Asus.",
    correctOs: 'Windows',
    hint: "Téměř všechny běžné značky PC ho využívají jako svůj základ."
  },
  {
    id: 7,
    description: "Lidé, kteří mě vylepšují, to dělají zadarmo jako velká celosvětová komunita programátorů.",
    correctOs: 'Linux',
    hint: "Jeho síla je v komunitě. Není to jedna obří komerční firma."
  },
  {
    id: 8,
    description: "Uvnitř mého těla tluče jádro Linuxu, ale firma Google mě doplnila o krásnou grafiku, aby mě mohl používat každý na svém mobilu.",
    correctOs: 'Android',
    hint: "Android skutečně vychází z Linuxu!"
  },
  {
    id: 9,
    description: "Vyrábí mě firma, která zároveň vyrábí i hardware mých počítačů. Nemůžeš si mě jen tak nainstalovat na složený počítač z alzy.",
    correctOs: 'macOS',
    hint: "Apple si dělá obojí - železo i software (OS)."
  },
  {
    id: 10,
    description: "Jsem brácha systému iPadOS, který se dává do tabletů. Můj obchod s aplikacemi se jmenuje App Store.",
    correctOs: 'iOS',
    hint: "Opět mobilní systém od Applu."
  }
];

const WindowsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801"/></svg>
);
const AppleIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.04C13.31 2.04 14.61 1 14.61 1c0 1.53-1.12 2.87-2.61 2.87-1.31 0-2.61 1.04-2.61 1.04 0-1.53 1.12-2.87 2.61-2.87zM16.51 7.21c-2.02 0-3.32 1.25-3.32 1.25s-1.01-1.25-3.22-1.25c-2.3 0-4.67 1.87-4.67 5.41 0 4.15 3.32 8.78 6.49 8.78 1.44 0 2.21-.93 3.69-.93 1.49 0 2.12.93 3.69.93 3.07 0 5.47-5.09 5.47-5.09-3.26-1.56-3.12-5.36-1.06-6.66-1.39-1.92-3.88-2.44-5.07-2.44z"/></svg>
);
const AndroidIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0225 3.503C15.5492 8.2435 13.8538 7.85 12 7.85c-1.8538 0-3.5492.3935-5.1367 1.1006L4.8408 5.4475a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
);
const LinuxIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.016 1.706C10.024 1.706 7.6 2.454 7.6 6.808v1.737C6.012 8.924 4.545 10 4.545 10c-3.1 2.278-2.698 4.296-1.748 4.887 2.052 1.282 3.821-2.585 3.821-2.585-1.077 4.195 2.106 5.86 2.106 5.86-.337.892-1.921 1.488-3.037 1.488-1.572 0-.96 1.583-.96 1.583 0 .736 1.416.924 2.802.924 3.238 0 4.35-1.378 4.35-1.378s.794-.367 1.258-.367c.465 0 1.258.367 1.258.367s1.112 1.378 4.35 1.378c1.386 0 2.802-.188 2.802-.924 0 0 .612-1.583-.96-1.583-1.116 0-2.7-.596-3.037-1.488 0 0 3.183-1.665 2.106-5.86 0 0 1.769 3.867 3.821 2.585.95-.591 1.352-2.609-1.748-4.887 0 0-1.467-1.076-3.057-1.455V6.808c0-4.354-2.424-5.102-4.416-5.102h-.303z"/></svg>
);

const OS_OPTIONS: { id: OsType, label: string, icon: any }[] = [
  { id: 'Windows', label: 'Windows', icon: WindowsIcon },
  { id: 'macOS', label: 'macOS', icon: AppleIcon },
  { id: 'Linux', label: 'Linux', icon: LinuxIcon },
  { id: 'Android', label: 'Android', icon: AndroidIcon },
  { id: 'iOS', label: 'Apple iOS', icon: AppleIcon }
];

const OsMatchGame: React.FC<OsMatchGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedOs, setSelectedOs] = useState<OsType | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const handleSelect = (osId: OsType) => {
    if (feedback !== 'idle' || gameFinished) return;
    
    setSelectedOs(osId);
    
    if (osId === currentScenario.correctOs) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIndex < SCENARIOS.length - 1) {
        setCurrentIndex(i => i + 1);
        setFeedback('idle');
        setSelectedOs(null);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback('idle');
    setSelectedOs(null);
    setGameFinished(false);
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in duration-500 px-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
          Kdo je Kdo? (Výběr OS)
        </h2>
        <div className="px-4 py-2 bg-slate-800 text-white font-black rounded-xl shadow-lg border border-slate-700 text-sm">
          Skóre: {score} / {SCENARIOS.length}
        </div>
      </div>

      {!gameFinished ? (
        <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border-4 border-slate-100 flex flex-col items-center relative overflow-hidden">
          
          <div className="w-full mb-8 flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Zákazník {currentIndex + 1} z {SCENARIOS.length}
            </span>
            <div className="flex gap-2">
              {SCENARIOS.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`w-3 h-3 rounded-full ${idx < currentIndex ? 'bg-green-500' : (idx === currentIndex ? 'bg-blue-500 animate-pulse' : 'bg-gray-200')}`} 
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 w-full max-w-2xl text-center shadow-inner mb-10 relative">
            {feedback === 'correct' && (
              <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center rounded-2xl backdrop-blur-sm z-10 animate-in zoom-in">
                <CheckCircle2 className="w-32 h-32 text-green-500 drop-shadow-lg" />
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center rounded-2xl backdrop-blur-sm z-10 animate-in zoom-in">
                <XCircle className="w-32 h-32 text-red-500 drop-shadow-lg" />
              </div>
            )}

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full shadow-lg flex items-center justify-center border-4 border-white mb-2">
                <span className="text-4xl">🤔</span>
              </div>
            </div>
            
            <p className="text-2xl font-black text-slate-800 mb-6 leading-tight">
              "{currentScenario.description}"
            </p>
            
            <div className="bg-blue-50 text-blue-800 text-sm font-bold px-4 py-2 rounded-xl inline-block border border-blue-200">
              💡 Nápověda: {currentScenario.hint}
            </div>
          </div>

          <div className="w-full max-w-3xl">
            <h3 className="text-center font-black text-slate-400 uppercase tracking-widest text-sm mb-6">
              Který systém mu nainstaluješ?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {OS_OPTIONS.map(os => {
                const isSelected = selectedOs === os.id;
                const isCorrect = os.id === currentScenario.correctOs;
                
                let buttonStyle = `bg-white border-2 border-gray-200 text-slate-700 hover:border-slate-400 hover:shadow-md`;
                
                if (feedback !== 'idle') {
                  if (isCorrect) buttonStyle = `bg-green-500 border-green-600 text-white shadow-lg shadow-green-500/50 scale-105 z-10`;
                  else if (isSelected) buttonStyle = `bg-red-500 border-red-600 text-white opacity-50`;
                  else buttonStyle = `bg-gray-100 border-gray-200 text-gray-400 opacity-50`;
                }

                return (
                  <button
                    key={os.id}
                    onClick={() => handleSelect(os.id)}
                    disabled={feedback !== 'idle'}
                    className={`flex flex-col items-center justify-center py-6 px-2 rounded-2xl font-black transition-all duration-300 gap-3 ${buttonStyle}`}
                  >
                    <os.icon className="w-10 h-10" />
                    <span className="text-sm md:text-base uppercase tracking-wider">{os.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-emerald-400 flex flex-col items-center text-center animate-in zoom-in">
          <Trophy className="w-32 h-32 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-4">Mise Dokončena!</h2>
          <p className="text-2xl font-bold text-slate-600 mb-8">
            Tvé skóre: <span className={score === SCENARIOS.length ? 'text-emerald-500' : 'text-amber-500'}>{score}</span> / {SCENARIOS.length}
          </p>
          
          {score === SCENARIOS.length ? (
            <div className="bg-emerald-100 text-emerald-800 p-6 rounded-2xl mb-8 font-bold border border-emerald-200 max-w-lg">
              Perfektní! Máš skvělý přehled v operačních systémech. Znáš rozdíly mezi počítači a mobily i mezi různými značkami.
            </div>
          ) : (
            <div className="bg-amber-100 text-amber-800 p-6 rounded-2xl mb-8 font-bold border border-amber-200 max-w-lg">
              Dobrá práce, ale některé systémy se ti ještě pletou. Zkus to znovu a všímej si rozdílů (např. mobily vs. počítače).
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={resetGame} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Zkusit znovu
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Zpět do menu <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OsMatchGame;
