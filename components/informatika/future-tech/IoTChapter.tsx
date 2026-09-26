import React, { useState } from 'react';
import { ArrowLeft, Home, Building2, Globe2, Cpu, Wifi, BookOpen, Joystick, Thermometer, Lightbulb, Smartphone, Car, Trash2, TrafficCone, Plane, Ship, Factory, Cloud } from 'lucide-react';
import SmartHomeSimulation from './SmartHomeSimulation';

interface IoTChapterProps {
  onBack: () => void;
}

type Tab = 'theory' | 'practice';

const IoTChapter: React.FC<IoTChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('theory');

  return (
    <div className="max-w-6xl w-full mx-auto p-4 sm:p-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 border-2 border-gray-100"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět
        </button>
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
          <Wifi className="w-8 h-8 text-blue-500" />
          Internet věcí (IoT)
        </h1>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border-2 border-gray-100 w-fit">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'theory'
              ? 'bg-blue-100 text-blue-700 shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-5 h-5" /> Teorie
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'practice'
              ? 'bg-blue-100 text-blue-700 shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Joystick className="w-5 h-5" /> Simulace
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === 'theory' && (
        <div className="space-y-12 pb-12 animate-in slide-in-from-bottom-4 duration-500">
          {/* Úvod */}
          <section className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border-4 border-blue-50 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-4">
              <Cpu className="w-10 h-10 text-blue-500" />
              Co je to vlastně IoT?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Základem Internetu věcí (IoT) jsou malé <strong>senzory a čipy</strong>. 
              Představte si je jako smysly počítače – umí měřit teplotu, detekovat pohyb, 
              světlo nebo polohu. Když tyto senzory <strong>připojíme k internetu</strong>, 
              mohou si mezi sebou povídat a předávat informace bez toho, aby jim člověk musel pomáhat.
            </p>
          </section>

          {/* Škála IoT */}
          <div className="space-y-16 relative mt-16">
            
            {/* Spojovací čára na pozadí mezi sekcemi */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 -z-10 transform -translate-x-1/2"></div>

            {/* 1. Domácnost */}
            <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-2 border-gray-50 flex flex-col lg:flex-row gap-8 items-center relative">
              <div className="flex-1 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-800">Chytrá domácnost</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Začíná to u vás doma. Termostat zjistí, že je zima, a pošle přes Wi-Fi zprávu topení. Žaluzie se samy zatáhnou proti slunci a lednice vám na mobil napíše, že dochází mléko. Všechny tyto senzory tvoří jednu síť.
                </p>
              </div>
              <div className="flex-1 w-full min-h-[300px] relative bg-blue-50/30 rounded-3xl border-2 border-blue-100 p-4 overflow-hidden mt-8 lg:mt-0">
                {/* Cloud & Data lines */}
                <svg className="absolute inset-0 w-full h-full text-blue-200/50" preserveAspectRatio="none" viewBox="0 0 200 150">
                  <path d="M 20 70 L 100 20 L 180 70 L 180 130 L 20 130 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                  <line x1="20" y1="70" x2="180" y2="70" stroke="currentColor" strokeWidth="2" />
                  <line x1="100" y1="20" x2="100" y2="130" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Flow lines to cloud (50%, 10%) */}
                  <g stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" className="animate-data-flow" opacity="0.6">
                    <line x1="20%" y1="35%" x2="50%" y2="10%" />
                    <line x1="80%" y1="35%" x2="50%" y2="10%" />
                    <line x1="30%" y1="75%" x2="50%" y2="10%" />
                    <line x1="70%" y1="75%" x2="50%" y2="10%" />
                  </g>
                </svg>

                {/* Cloud Hub */}
                <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10">
                  <div className="bg-white p-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] text-blue-500 border-2 border-blue-200 mb-1">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black text-blue-600 bg-white/90 px-2 py-1 rounded shadow-sm whitespace-nowrap">Cloud Server</span>
                </div>
                
                {/* Labels */}
                <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-yellow-500 border border-yellow-100 mb-1 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Chytré světlo</span>
                </div>

                <div className="absolute top-[35%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-rose-500 border border-rose-100 mb-1 group-hover:scale-110 transition-transform">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Wi-Fi Router</span>
                </div>

                <div className="absolute top-[75%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-blue-500 border border-blue-100 mb-1 group-hover:scale-110 transition-transform">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Termostat</span>
                </div>

                <div className="absolute top-[75%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-slate-600 border border-slate-100 mb-1 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Chytrý zámek</span>
                </div>
              </div>
            </div>

            {/* 2. Město */}
            <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-2 border-gray-50 flex flex-col lg:flex-row-reverse gap-8 items-center relative">
              <div className="flex-1 space-y-4">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-800">Chytré město</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Na úrovni města spolu komunikují ulice a budovy. Popelnice sama nahlásí popelářům, že je plná. Semafory upravují zelenou v reálném čase podle hustoty provozu a lampy svítí naplno, jen když někdo prochází.
                </p>
              </div>
              <div className="flex-1 w-full min-h-[300px] relative bg-indigo-50/30 rounded-3xl border-2 border-indigo-100 p-4 overflow-hidden mt-8 lg:mt-0">
                {/* City Diagram - POHLED SHORA (Křižovatka) */}
                <svg className="absolute inset-0 w-full h-full text-indigo-300/60" preserveAspectRatio="none" viewBox="0 0 200 150">
                  {/* Budovy / Bloky (4 rohy) */}
                  <rect x="5" y="5" width="75" height="50" fill="currentColor" opacity="0.3" rx="4" />
                  <rect x="120" y="5" width="75" height="50" fill="currentColor" opacity="0.3" rx="4" />
                  <rect x="5" y="95" width="75" height="50" fill="currentColor" opacity="0.3" rx="4" />
                  <rect x="120" y="95" width="75" height="50" fill="currentColor" opacity="0.3" rx="4" />
                  
                  {/* Přerušované čáry uprostřed silnice */}
                  <line x1="0" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="120" y1="75" x2="200" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="100" y1="0" x2="100" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="100" y1="95" x2="100" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  
                  {/* Přechody pro chodce (zebra) */}
                  <g stroke="currentColor" strokeWidth="2">
                    <line x1="75" y1="58" x2="75" y2="92" strokeDasharray="2 2" strokeWidth="4" />
                    <line x1="125" y1="58" x2="125" y2="92" strokeDasharray="2 2" strokeWidth="4" />
                    <line x1="83" y1="50" x2="117" y2="50" strokeDasharray="2 2" strokeWidth="4" />
                    <line x1="83" y1="100" x2="117" y2="100" strokeDasharray="2 2" strokeWidth="4" />
                  </g>

                  {/* Flow lines to cloud (50%, 10%) */}
                  <g stroke="#6366f1" strokeWidth="2" strokeDasharray="6 6" className="animate-data-flow" opacity="0.6">
                    <line x1="25%" y1="25%" x2="50%" y2="10%" />
                    <line x1="75%" y1="25%" x2="50%" y2="10%" />
                    <line x1="70%" y1="70%" x2="50%" y2="10%" />
                    <line x1="35%" y1="75%" x2="50%" y2="10%" />
                  </g>
                </svg>

                {/* Cloud Hub */}
                <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10">
                  <div className="bg-white p-3 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] text-indigo-500 border-2 border-indigo-200 mb-1">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black text-indigo-600 bg-white/90 px-2 py-1 rounded shadow-sm whitespace-nowrap">Cloud City</span>
                </div>

                {/* Labels */}
                <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-indigo-500 border border-indigo-100 mb-1 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Chytrá lampa</span>
                </div>

                <div className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-green-600 border border-green-100 mb-1 group-hover:scale-110 transition-transform">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Popelnice</span>
                </div>

                <div className="absolute top-[70%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-red-500 border border-red-100 mb-1 group-hover:scale-110 transition-transform">
                    <TrafficCone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Chytrý semafor</span>
                </div>
                
                <div className="absolute top-[75%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-blue-600 border border-blue-100 mb-1 group-hover:scale-110 transition-transform">
                    <Car className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Sledování dopravy</span>
                </div>
              </div>
            </div>

            {/* 3. Svět */}
            <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-2 border-gray-50 flex flex-col lg:flex-row gap-8 items-center relative">
              <div className="flex-1 space-y-4">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-800">Propojený svět</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  V globálním měřítku se propojují letadla, lodě i chytré továrny (Průmysl 4.0). Dodavatelské řetězce si samy hlídají zásoby přes kontinenty a logistika funguje jako obrovská nervová síť planety.
                </p>
              </div>
              <div className="flex-1 w-full min-h-[300px] relative bg-purple-50/30 rounded-3xl border-2 border-purple-100 p-4 overflow-hidden mt-8 lg:mt-0">
                {/* World Diagram */}
                <svg className="absolute inset-0 w-full h-full text-purple-200/50" preserveAspectRatio="none" viewBox="0 0 200 150">
                  <circle cx="100" cy="85" r="50" fill="none" stroke="currentColor" strokeWidth="4" />
                  <ellipse cx="100" cy="85" rx="20" ry="50" fill="none" stroke="currentColor" strokeWidth="2" />
                  <ellipse cx="100" cy="85" rx="50" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />

                  {/* Flow lines to cloud (50%, 10%) */}
                  <g stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" className="animate-data-flow" opacity="0.6">
                    <line x1="20%" y1="25%" x2="50%" y2="10%" />
                    <line x1="30%" y1="75%" x2="50%" y2="10%" />
                    <line x1="80%" y1="40%" x2="50%" y2="10%" />
                  </g>
                </svg>

                {/* Cloud Hub */}
                <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10">
                  <div className="bg-white p-3 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] text-purple-500 border-2 border-purple-200 mb-1">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black text-purple-600 bg-white/90 px-2 py-1 rounded shadow-sm whitespace-nowrap">Global Cloud</span>
                </div>

                {/* Labels */}
                <div className="absolute top-[25%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-sky-500 border border-sky-100 mb-1 group-hover:scale-110 transition-transform">
                    <Plane className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">GPS Sledování</span>
                </div>

                <div className="absolute top-[75%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-cyan-600 border border-cyan-100 mb-1 group-hover:scale-110 transition-transform">
                    <Ship className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Lodní kontejnery</span>
                </div>

                <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="bg-white p-2 rounded-full shadow-lg text-orange-500 border border-orange-100 mb-1 group-hover:scale-110 transition-transform">
                    <Factory className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm border border-gray-100 whitespace-nowrap">Továrna 4.0</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="pt-8">
           <SmartHomeSimulation />
        </div>
      )}

      <style>{`
        @keyframes dataFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-data-flow {
          animation: dataFlow 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default IoTChapter;
