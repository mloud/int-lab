import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ScanLine,
  Smile,
  Globe2,
  Shirt,
  MessageCircle
} from 'lucide-react';
import LaundryGame from './LaundryGame';
import EmojiGame from './EmojiGame';
import CountryCodesGame from './CountryCodesGame';

type Tab = 'theory' | 'laundry' | 'emoji' | 'country-codes';

interface CodesMenuProps {
  onBack: () => void;
  initialTab?: Tab;
}

const CodesMenu: React.FC<CodesMenuProps> = ({ onBack, initialTab = 'theory' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

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
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="w-5 h-5" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('laundry')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'laundry'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ScanLine className="w-5 h-5" /> Prací symboly
          </button>
          <button
            onClick={() => setActiveTab('emoji')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'emoji'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Smile className="w-5 h-5" /> Smajlíci
          </button>
          <button
            onClick={() => setActiveTab('country-codes')}
            className={`flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'country-codes'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Globe2 className="w-5 h-5" /> Kódy států
          </button>
        </div>
      </div>

      {/* CONTENT PER ACTIVE TAB */}
      <div className="w-full">
        {activeTab === 'theory' && (
          <div className="flex flex-col gap-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
            {/* HERO SECTION */}
            <div className="bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-600 w-full p-8 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left gap-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900 rounded-full blur-[60px] -translate-x-1/2 translate-y-1/2 opacity-60"></div>

              <div className="relative z-10 flex-1">
                <div className="inline-block px-4 py-1.5 bg-indigo-500/80 rounded-full text-indigo-100 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm border border-indigo-400/50">
                  Základy informatiky • 6. třída
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                  Kódy kolem <br />
                  <span className="text-purple-200">nás</span>
                </h1>
                <p className="text-lg text-indigo-100 font-medium max-w-md leading-relaxed">
                  Svět je plný zkratek, piktogramů a symbolů. Kdybychom měli vše vypisovat celými slovy, cedulky na oblečení by sahaly až na zem!
                </p>
              </div>

              <div className="relative z-10 flex shrink-0">
                <div className="w-40 h-40 sm:w-56 sm:h-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] flex items-center justify-center shadow-2xl rotate-6 transform hover:rotate-12 transition-transform duration-500">
                  <ScanLine className="w-20 h-20 sm:w-28 sm:h-28 text-white drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* KEY PRINCIPLES OF CODES */}
            <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border-4 border-slate-100">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight mb-3">
                  Proč používáme kódy a symboly?
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Kódování je způsob, jak převést myšlenku nebo informaci do zkrácené, přehledné a jednoznačné podoby.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50/60 rounded-3xl border-2 border-indigo-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <Shirt className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    1. Úspora místa
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Na miniaturní cedulku trička nebo displej chytrých hodinek se vejde jen pár piktogramů, které předají kompletní instrukce.
                  </p>
                </div>

                <div className="p-6 bg-purple-50/60 rounded-3xl border-2 border-purple-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <Globe2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    2. Mezinárodní jazyk
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Symbolu přeškrtnuté žehličky nebo červenému křížku rozumí Čech, Japonec i Brazilec bez nutnosti umět cizí jazyky.
                  </p>
                </div>

                <div className="p-6 bg-amber-50/60 rounded-3xl border-2 border-amber-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">
                    3. Rychlost a emoce
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    V chatovací aplikaci nahradí jeden smajlík celé věty a okamžitě dodá zprávě správný přátelský tón, který v textu chybí.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAUNDRY */}
        {activeTab === 'laundry' && (
          <div className="w-full animate-in fade-in duration-500">
            <LaundryGame onBack={() => setActiveTab('theory')} hideBack={true} />
          </div>
        )}

        {/* TAB 3: EMOJI */}
        {activeTab === 'emoji' && (
          <div className="w-full animate-in fade-in duration-500">
            <EmojiGame onBack={() => setActiveTab('theory')} hideBack={true} />
          </div>
        )}

        {/* TAB 4: COUNTRY CODES */}
        {activeTab === 'country-codes' && (
          <div className="w-full animate-in fade-in duration-500">
            <CountryCodesGame onBack={() => setActiveTab('theory')} hideBack={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodesMenu;
