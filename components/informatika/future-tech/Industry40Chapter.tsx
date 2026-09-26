import React, { useState } from 'react';
import { ArrowLeft, Factory, Settings, Info, Play, Cpu, Bot, Network, Wrench, Server, Database, CloudCog } from 'lucide-react';
import SmartFactorySimulation from './SmartFactorySimulation';

interface Industry40ChapterProps {
  onBack: () => void;
}

const Industry40Chapter: React.FC<Industry40ChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulation'>('theory');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -40;
            }
          }
          @keyframes dataFlow {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
            80% { opacity: 1; transform: translateY(-80px) scale(1); }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
          }
          @keyframes slideRight {
            to {
              stroke-dashoffset: -40;
            }
          }
        `}
      </style>

      {/* HEADER */}
      <div className="w-full max-w-7xl bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 animate-in slide-in-from-top-4 relative z-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors border border-gray-200 w-full md:w-auto justify-center"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět na témata
        </button>
        
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
            <Factory className="w-6 h-6" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black text-gray-800">Průmysl 4.0</h1>
            <p className="text-gray-500 font-medium text-sm">Chytré továrny a automatizace</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'theory' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Info className="w-5 h-5" /> Teorie
          </button>
          <button 
            onClick={() => setActiveTab('simulation')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'simulation' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Play className="w-5 h-5" /> Kvíz
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl">
        {activeTab === 'theory' ? (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            
            {/* HERO SECTION */}
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-[3rem] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                    Vítejte ve 4. průmyslové revoluci
                  </h2>
                  <p className="text-lg sm:text-xl text-orange-100 font-medium mb-8 leading-relaxed">
                    Dříve stroje nahrazovaly lidské svaly. Dnes pomocí senzorů a umělé inteligence stroje začínají nahrazovat i "oči a mozek". Továrna budoucnosti (Smart Factory) je jeden obrovský propojený organismus.
                  </p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                    <Factory className="w-32 h-32 text-white opacity-80" />
                    <Settings className="w-16 h-16 text-orange-300 absolute top-4 right-4 animate-[spin_4s_linear_infinite]" />
                    <Settings className="w-10 h-10 text-orange-200 absolute bottom-12 right-12 animate-[spin_3s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-orange-400 animate-[spin_8s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 PILLARS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl border-t-4 border-t-blue-500 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Network className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">IIoT</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Průmyslový internet věcí. Stroje mají senzory a posílají data do cloudu v reálném čase. Stroj si sám objedná materiál, než mu dojde.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border-t-4 border-t-purple-500 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">Robotizace (Coboti)</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Kromě velkých robotů v klecích nastupují <strong>kolaborativní roboti (coboti)</strong>, kteří bezpečně pracují přímo po boku lidí jako asistenti.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border-t-4 border-t-cyan-500 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                  <Server className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">Digitální dvojče</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Kompletní virtuální 3D model továrny. Všechny změny a inovace se nejdříve otestují v počítači, než se vůbec na něco sáhne v reálu.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border-t-4 border-t-red-500 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <Wrench className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">Prediktivní údržba</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Stroj se neopravuje, až když se rozbije (a zastaví výrobu). Umělá inteligence podle vibrací a teploty pozná, že se díl pokazí za 3 dny.
                </p>
              </div>
            </div>

            {/* CONCRETE PRODUCTION LINE DIAGRAM */}
            <div className="bg-slate-900 rounded-[3rem] p-10 overflow-hidden relative shadow-2xl">
              <div className="text-center mb-10 relative z-10">
                <h2 className="text-3xl font-black text-white">Chytrá výrobní linka (Průmysl 4.0)</h2>
                <p className="text-slate-400 font-medium mt-2">Senzory, kamery a roboti komunikují s centrální inteligencí.</p>
              </div>
              
              <style>
                {`
                  @keyframes moveBelt {
                    from { transform: translateX(100%); }
                    to { transform: translateX(-100%); }
                  }
                  @keyframes dataUpload {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    20% { opacity: 1; transform: translateY(-20px) scale(1.1); }
                    80% { opacity: 1; transform: translateY(-100px) scale(0.9); }
                    100% { transform: translateY(-120px) scale(0); opacity: 0; }
                  }
                  @keyframes conveyorSpin {
                    100% { background-position: -40px 0; }
                  }
                  @keyframes scanLine {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(80px); }
                    100% { transform: translateY(0); }
                  }
                `}
              </style>
              
              <div className="relative h-[450px] w-full max-w-5xl mx-auto border-4 border-slate-700 bg-slate-800 rounded-3xl overflow-hidden shadow-inner">
                
                {/* CLOUD / AI BRAIN at the top */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-cyan-950/80 px-6 py-3 rounded-2xl border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] z-30 backdrop-blur-sm">
                  <CloudCog className="w-10 h-10 text-cyan-400 animate-pulse" />
                  <div className="text-left">
                    <div className="text-cyan-400 font-black leading-none">Centrální Cloud & AI</div>
                    <div className="text-cyan-200/50 text-[10px] font-mono mt-1">PŘÍJEM DAT V REÁLNÉM ČASE</div>
                  </div>
                </div>

                {/* --- CONVEYOR BELT --- */}
                <div className="absolute bottom-0 w-full h-32 flex flex-col z-10">
                  {/* The moving track */}
                  <div className="w-full h-16 bg-slate-700 border-t-8 border-slate-600 relative overflow-hidden flex items-center z-10">
                    <div 
                      className="w-[200%] h-4 opacity-50"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, #334155 0px, #334155 20px, #1e293b 20px, #1e293b 40px)',
                        animation: 'conveyorSpin 1s linear infinite'
                      }}
                    ></div>
                  </div>
                  <div className="w-full h-16 bg-slate-900 border-t-4 border-slate-800"></div>
                </div>

                {/* --- MOVING BOXES (Products) --- */}
                {/* We use an animation that moves a container from right to left */}
                <div className="absolute bottom-28 w-full flex items-center justify-around z-20" style={{ animation: 'moveBelt 10s linear infinite' }}>
                  
                  {/* Box 1 (Defective) */}
                  <div className="relative group">
                    <div className="w-20 h-20 bg-amber-600 rounded-xl border-4 border-amber-800 shadow-xl flex items-center justify-center relative">
                       <span className="text-amber-900 font-black opacity-50 font-mono text-2xl">01</span>
                       {/* Defect mark */}
                       <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Box 2 (Perfect) */}
                  <div className="relative -mr-96">
                    <div className="w-20 h-20 bg-amber-500 rounded-xl border-4 border-amber-700 shadow-xl flex items-center justify-center">
                       <span className="text-amber-800 font-black opacity-50 font-mono text-2xl">02</span>
                    </div>
                  </div>
                  
                  {/* Box 3 (Perfect) */}
                  <div className="relative -mr-96">
                    <div className="w-20 h-20 bg-amber-500 rounded-xl border-4 border-amber-700 shadow-xl flex items-center justify-center">
                       <span className="text-amber-800 font-black opacity-50 font-mono text-2xl">03</span>
                    </div>
                  </div>

                </div>

                {/* Second set of boxes to make it continuous */}
                <div className="absolute bottom-28 w-full flex items-center justify-around z-20 translate-x-[100%]" style={{ animation: 'moveBelt 10s linear infinite', animationDelay: '5s' }}>
                  <div className="w-20 h-20 bg-amber-500 rounded-xl border-4 border-amber-700 shadow-xl flex items-center justify-center">
                    <span className="text-amber-800 font-black opacity-50 font-mono text-2xl">04</span>
                  </div>
                  <div className="w-20 h-20 bg-blue-500 rounded-xl border-4 border-blue-700 shadow-xl flex items-center justify-center -mr-96">
                    <span className="text-blue-900 font-black opacity-50 font-mono text-2xl">05</span>
                  </div>
                </div>

                {/* --- ROBOT ARM 1 (Assembly) --- */}
                <div className="absolute top-20 left-[20%] flex flex-col items-center z-30">
                  {/* Base mounted to ceiling */}
                  <div className="w-16 h-8 bg-yellow-600 rounded-t-xl border-2 border-yellow-700"></div>
                  {/* Arm segments */}
                  <div className="w-8 h-32 bg-yellow-500 border-x-2 border-yellow-600 origin-top animate-[spin_3s_ease-in-out_infinite_alternate] flex flex-col items-center justify-end relative">
                     {/* Joint */}
                     <div className="w-12 h-12 rounded-full bg-slate-700 border-4 border-yellow-600 absolute -bottom-6 flex items-center justify-center">
                       <Settings className="w-6 h-6 text-slate-400 animate-spin" />
                     </div>
                     {/* Lower Arm */}
                     <div className="w-6 h-24 bg-yellow-400 absolute top-full origin-top -rotate-45 border-x-2 border-yellow-500 flex justify-center items-end">
                       {/* Claw */}
                       <div className="w-12 h-8 border-x-4 border-b-4 border-slate-400 rounded-b-xl absolute -bottom-8"></div>
                     </div>
                  </div>
                </div>

                {/* --- AI VISION CAMERA (Quality Control) --- */}
                <div className="absolute top-24 left-[50%] -translate-x-1/2 flex flex-col items-center z-30">
                  <div className="w-12 h-16 bg-slate-900 border-2 border-slate-600 rounded-xl relative flex items-end justify-center pb-2 shadow-2xl">
                    <div className="w-6 h-6 bg-black rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)] relative overflow-hidden">
                       <div className="w-full h-1 bg-cyan-300 absolute top-0" style={{ animation: 'scanLine 2s linear infinite' }}></div>
                    </div>
                  </div>
                  {/* Scanner Beam */}
                  <div className="w-32 h-48 bg-gradient-to-b from-cyan-500/30 to-transparent clip-path-beam"></div>
                  
                  {/* Animated Data Packets going UP */}
                  <div className="absolute top-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-cyan-300 font-mono text-xs font-bold px-2 py-1 bg-cyan-900/80 rounded border border-cyan-500/50" style={{ animation: 'dataUpload 2s infinite' }}>{"{ status: 'OK' }"}</div>
                    <div className="text-red-400 font-mono text-xs font-bold px-2 py-1 bg-red-900/80 rounded border border-red-500/50 mt-4" style={{ animation: 'dataUpload 3s infinite 1s' }}>{"{ ERROR: 'Defect' }"}</div>
                  </div>
                </div>

                {/* --- ROBOT ARM 2 (Sorting / Rejecting) --- */}
                <div className="absolute top-20 right-[20%] flex flex-col items-center z-30">
                  <div className="w-16 h-8 bg-orange-600 rounded-t-xl border-2 border-orange-700"></div>
                  <div className="w-8 h-24 bg-orange-500 border-x-2 border-orange-600 origin-top animate-[spin_2s_ease-in-out_infinite_alternate-reverse] flex flex-col items-center justify-end relative">
                     <div className="w-12 h-12 rounded-full bg-slate-700 border-4 border-orange-600 absolute -bottom-6"></div>
                     <div className="w-6 h-20 bg-orange-400 absolute top-full origin-top rotate-45 border-x-2 border-orange-500 flex justify-center items-end">
                       <div className="w-12 h-8 border-x-4 border-b-4 border-slate-400 rounded-b-xl absolute -bottom-8"></div>
                     </div>
                  </div>
                </div>

              </div>
              
              <style>{`
                .clip-path-beam {
                  clip-path: polygon(40% 0, 60% 0, 100% 100%, 0% 100%);
                }
              `}</style>
            </div>

          </div>
        ) : (
          <SmartFactorySimulation />
        )}
      </div>
    </div>
  );
};

export default Industry40Chapter;
