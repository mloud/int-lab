import React, { useState } from 'react';
import { 
  ArrowLeft, HardDrive, Cpu, BookOpen, Monitor, Zap, Settings, 
  Database, Activity, Rocket, Speaker, Wifi, Smartphone, Gauge, Lightbulb, PlayCircle,
  Keyboard, MousePointer, Mic, Layers, Cpu as Chip
} from 'lucide-react';

interface OsHardwareChapterProps {
  onBack: () => void;
  onStartVonNeumann: () => void;
  onStartRamSimulator: () => void;
}

const OsHardwareChapter: React.FC<OsHardwareChapterProps> = ({ onBack, onStartVonNeumann, onStartRamSimulator }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulator'>('theory');

  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-1000 px-4 text-center flex flex-col items-center">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-6 sticky top-4 z-50">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" /> Teorie
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'simulator' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Monitor className="w-5 h-5" /> Simulátory
        </button>
      </div>

      {activeTab === 'theory' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl w-full space-y-8 pb-16 text-left">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
              Základy hardwaru <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">pro OS</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
              Hardware a software jsou jako tělo a duše počítače. Pojďme prozkoumat, z čeho se ten tajemný stroj skládá, než na něm spustíme Operační systém.
            </p>
          </div>

          {/* BLOK A */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-500" /> A. Hardware vs. Software
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden group">
                <HardDrive className="w-32 h-32 text-blue-200/50 absolute -bottom-6 -right-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-blue-900 text-xl mb-2 relative z-10 uppercase tracking-wide">Hardware (HW)</h3>
                <p className="text-blue-800 text-sm leading-relaxed relative z-10">
                  Doslova <strong>"tvrdé zboží"</strong>. Jsou to fyzické součástky, na které si můžeme sáhnout (procesor, paměti, disky). 
                  <em>„Zjednodušeně řečeno – je to to, do čeho bušíme pěstí, když nefunguje software.“</em>
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 relative overflow-hidden group">
                <Monitor className="w-32 h-32 text-purple-200/50 absolute -bottom-6 -right-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-purple-900 text-xl mb-2 relative z-10 uppercase tracking-wide">Software (SW)</h3>
                <p className="text-purple-800 text-sm leading-relaxed relative z-10">
                  Doslova <strong>"měkké zboží"</strong>. Jsou to programy a aplikace, které oživují hardware. Patří sem ale i data a dokumenty, které v nich vytvoříme. Bez SW je počítač jen hromada mrtvého kovu.
                </p>
              </div>
            </div>
          </div>

          {/* BLOK B */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-emerald-500" /> B. Svatá trojice (Výkon a Úložiště)
            </h2>
            <p className="text-slate-600 mb-8 text-sm">
              Navzdory nesmírné složitosti dnešních počítačů vychází jejich princip fungování pouze ze tří klíčových dílů.
            </p>
            
            <div className="space-y-6">
              {/* CPU */}
              <div className="flex gap-6 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Cpu className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg uppercase tracking-wide flex items-center gap-2">
                    Procesor (CPU) <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">MOZEK</span>
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">
                    Vykonává veškeré operace a výpočty (vykonává instrukce). Je čistě elektronický a nesmírně rychlý. Po vypnutí proudu vše okamžitě zapomene.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded-md border border-rose-100"><strong>Frekvence (GHz):</strong> Jak rychle pracuje (např. 3.5 GHz = 3.5 miliardy tiků za sekundu).</span>
                    <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded-md border border-rose-100"><strong>Jádra (Cores):</strong> Kolik úkolů zvládne dělat současně.</span>
                  </div>
                </div>
              </div>

              {/* RAM */}
              <div className="flex gap-6 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Activity className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg uppercase tracking-wide flex items-center gap-2">
                    Operační paměť (RAM) <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">PRACOVNÍ STŮL</span>
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">
                    Nachází se zde vše, co je <strong>právě otevřené a spuštěné</strong>. Je to čistě elektronický díl, takže po vypnutí PC se vymaže.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100"><strong>Kapacita (GB):</strong> Kolik programů a dat se sem naráz vejde (např. 16 GB).</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100"><strong>Frekvence (MHz):</strong> Jak rychle komunikuje s procesorem.</span>
                  </div>
                </div>
              </div>

              {/* Disk */}
              <div className="flex gap-6 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Database className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg uppercase tracking-wide flex items-center gap-2">
                    Pevný disk (HDD/SSD) <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">SKLAD</span>
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">
                    Sem se vše ukládá <strong>trvale</strong>. Na rozdíl od CPU a RAM nepotřebují ke svému uchování dat stálý proud.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100"><strong>Kapacita (GB/TB):</strong> Množství trvalých dat (fotky, hry, OS).</span>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100"><strong>Rychlost (MB/s):</strong> Jak rychle se spustí PC a načtou hry.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
              <h4 className="font-black text-amber-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> Pozor na mýty
              </h4>
              <p className="text-amber-900 text-sm leading-relaxed">
                Mnoho lidí (i novinářů) zaměňuje u chytrých telefonů operační paměť za disk. Pokud si koupíte telefon, který má "paměť 128 GB", jedná se o <strong>úložiště (flash disk)</strong> pro fotky a aplikace, <strong>nikoliv o operační paměť RAM</strong> (ta bývá nejčastěji 4 až 8 GB).
              </p>
            </div>
            
            <div className="mt-8 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-100 px-6 py-3 font-black text-slate-800 text-sm uppercase tracking-widest border-b border-slate-200 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-slate-500" /> Rychlosti a Kapacity (Srovnání z praxe)
              </div>
              <div className="p-6 bg-white overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Komponenta</th>
                      <th className="pb-3 pr-4">Běžná kapacita</th>
                      <th className="pb-3 pr-4">Rychlost přístupu k datům</th>
                      <th className="pb-3">Přirovnání</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-bold">Procesor (Cache)</td>
                      <td className="py-3 pr-4">Jednotky MB</td>
                      <td className="py-3 pr-4 font-mono text-rose-600">~ 1 nanosekunda</td>
                      <td className="py-3 text-xs italic">Něco, co držím přímo v ruce a pracuji s tím.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-bold">Operační paměť (RAM)</td>
                      <td className="py-3 pr-4">4 - 32 GB</td>
                      <td className="py-3 pr-4 font-mono text-emerald-600">~ 10 nanosekund</td>
                      <td className="py-3 text-xs italic">Něco ležící na mém pracovním stole, hned po ruce.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-bold">SSD Disk (Úložiště)</td>
                      <td className="py-3 pr-4">256 GB - 2 TB</td>
                      <td className="py-3 pr-4 font-mono text-indigo-600">~ 100 mikrosekund (pomalé)</td>
                      <td className="py-3 text-xs italic">Jdu pro to pěšky do skladu na chodbě.</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-bold">Pevný disk (HDD)</td>
                      <td className="py-3 pr-4">1 TB - 10 TB</td>
                      <td className="py-3 pr-4 font-mono text-slate-500">~ 10 milisekund (katastrofa)</td>
                      <td className="py-3 text-xs italic">Jedu autem do skladu ve vedlejším městě.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* BLOK C */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-indigo-500" /> C. Vnitřní komponenty a propojení
            </h2>
            
            <p className="text-slate-600 mb-8 text-sm leading-relaxed">
              Kromě "svaté trojice" potřebuje počítač vnitřní infrastrukturu, která zajistí napájení, propojení a start systému.
            </p>

            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" /> Základní deska (Motherboard)
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Extrémně rychlá datová dálnice (sběrnice). Všechny ostatní komponenty se zapojují přímo do ní. Z pohledu principu práce PC jde "jen" o pomocný propojovací díl, ale v praxi určuje, co všechno lze do PC připojit.
                </p>
                
                {/* Schéma základní desky */}
                <div className="bg-slate-800 p-6 rounded-xl border-4 border-slate-700 relative overflow-hidden shadow-inner mb-4">
                  <div className="text-center mb-6">
                    <h5 className="text-slate-200 font-bold uppercase tracking-widest text-xs">Zjednodušené schéma základní desky</h5>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {/* Zadní panel */}
                    <div className="col-span-1 border-r-2 border-slate-600 pr-4 flex flex-col gap-2 justify-center">
                      <div className="bg-slate-600 h-8 rounded text-[10px] text-white flex items-center justify-center font-bold">USB / LAN</div>
                      <div className="bg-slate-600 h-8 rounded text-[10px] text-white flex items-center justify-center font-bold">Audio</div>
                      <div className="bg-slate-600 h-8 rounded text-[10px] text-white flex items-center justify-center font-bold">Video Out</div>
                      <div className="text-slate-400 text-[10px] text-center mt-2 font-bold uppercase">Zadní I/O</div>
                    </div>
                    
                    {/* Střed (CPU + RAM) */}
                    <div className="col-span-2 flex flex-col gap-4">
                      <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <div className="w-16 h-16 bg-rose-500/20 border-2 border-rose-500 rounded flex flex-col items-center justify-center">
                          <Chip className="w-6 h-6 text-rose-400 mb-1" />
                          <span className="text-[9px] text-rose-300 font-bold uppercase text-center leading-none">CPU<br/>Socket</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-3 h-16 bg-emerald-500/20 border border-emerald-500 rounded-sm"></div>
                          <div className="w-3 h-16 bg-emerald-500/20 border border-emerald-500 rounded-sm"></div>
                          <div className="w-3 h-16 bg-emerald-500/20 border border-emerald-500 rounded-sm"></div>
                          <div className="w-3 h-16 bg-emerald-500/20 border border-emerald-500 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="text-emerald-400 text-[9px] text-right font-bold uppercase mt-[-10px] mr-2">RAM Sloty</div>
                      
                      {/* PCIe */}
                      <div className="mt-2 bg-indigo-500/20 border border-indigo-500 h-6 rounded flex items-center justify-center">
                        <span className="text-[10px] text-indigo-300 font-bold uppercase">PCIe Slot (Grafika)</span>
                      </div>
                      <div className="bg-slate-600 h-4 rounded flex items-center justify-center w-3/4">
                        <span className="text-[8px] text-slate-300 uppercase">PCIe Slot (Zvuk/Síť)</span>
                      </div>
                    </div>
                    
                    {/* Pravá strana (Konektory) */}
                    <div className="col-span-1 flex flex-col gap-3 justify-end items-end pl-2">
                      <div className="w-full bg-amber-500/20 border border-amber-500 h-10 rounded flex items-center justify-center text-center">
                         <span className="text-[10px] text-amber-300 font-bold uppercase leading-none">ATX Napájení<br/>(Od zdroje)</span>
                      </div>
                      <div className="flex gap-2 w-full justify-between">
                         <div className="bg-teal-500/20 border border-teal-500 w-full h-8 rounded flex items-center justify-center">
                           <span className="text-[9px] text-teal-300 font-bold">SATA</span>
                         </div>
                         <div className="bg-teal-500/20 border border-teal-500 w-full h-8 rounded flex items-center justify-center">
                           <span className="text-[9px] text-teal-300 font-bold">SATA</span>
                         </div>
                      </div>
                      <div className="text-teal-400 text-[9px] text-center w-full font-bold uppercase mt-[-5px]">Disky</div>
                      
                      <div className="w-full h-8 rounded bg-slate-600/50 border border-slate-500 mt-2 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-slate-200 font-bold uppercase">UEFI/BIOS</span>
                        <span className="text-[6px] text-slate-400">Firmware</span>
                      </div>
                      
                      <div className="w-6 h-6 rounded-full bg-slate-500/50 border border-slate-400 self-center mt-2 flex items-center justify-center">
                        <span className="text-[8px] text-slate-300">CMOS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                  <span><strong>Parametr:</strong> Formát (ATX, Mini-ITX) - určuje velikost.</span>
                  <span><strong>Parametr:</strong> Chipset a Socket - určuje kompatibilitu s procesory.</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> Napájecí zdroj (PSU)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Vezme střídavých 230 V ze zásuvky a převede je na bezpečné stejnosměrné napětí (12V, 5V, 3.3V) nezbytné pro elektroniku.
                  </p>
                  <div className="text-xs text-slate-500">
                    <span><strong>Parametr:</strong> Výkon ve Wattech (W) - určuje, jak silnou grafiku a procesor utáhne.</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-500" /> UEFI / BIOS čip
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Malý čip na základní desce s vlastním jednoduchým programem. Jeho úkolem je otestovat HW po zapnutí (POST) a probudit Operační systém z disku.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BLOK D */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Monitor className="w-8 h-8 text-teal-500" /> D. Vstupní a výstupní zařízení (Periferie)
            </h2>
            
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Aby počítač k něčemu byl, musí komunikovat s člověkem a se sítí. Dělíme je na vstupní (posílají data do PC) a výstupní (ukazují výsledky z PC).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Vstupní */}
              <div className="border-2 border-teal-100 bg-teal-50/30 p-6 rounded-2xl">
                <h3 className="font-bold text-teal-800 mb-4 uppercase tracking-wide border-b border-teal-200 pb-2">Vstupní zařízení</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Keyboard className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm text-teal-900">Klávesnice a Myš</strong>
                      <span className="text-xs text-teal-700">Základní nástroje pro povely. Připojení přes USB nebo bezdrát (Bluetooth).</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mic className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm text-teal-900">Mikrofon (Zvukový vstup)</strong>
                      <span className="text-xs text-teal-700">Digitalizuje lidský hlas.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Výstupní */}
              <div className="border-2 border-rose-100 bg-rose-50/30 p-6 rounded-2xl">
                <h3 className="font-bold text-rose-800 mb-4 uppercase tracking-wide border-b border-rose-200 pb-2">Výstupní zařízení</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Monitor className="w-5 h-5 text-rose-600 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm text-rose-900">Monitor a Grafická karta</strong>
                      <span className="text-xs text-rose-700 mt-1 block"><strong>Parametry:</strong> Rozlišení (např. 4K) určuje ostrost. VRAM grafiky určuje detail textur ve hrách.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Speaker className="w-5 h-5 text-rose-600 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-sm text-rose-900">Reproduktory a Zvuková karta</strong>
                      <span className="text-xs text-rose-700 mt-1 block">Převádí jedničky a nuly zpět na analogový zvuk.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-slate-100 p-4 rounded-xl flex gap-3 items-center">
              <Wifi className="w-6 h-6 text-slate-500 shrink-0" />
              <div>
                <strong className="block text-sm text-slate-800">Síťová karta (Vstup i Výstup)</strong>
                <span className="text-xs text-slate-600">Obousměrná komunikace (LAN/Wi-Fi). <strong>Parametr:</strong> Rychlost (např. 1 Gb/s) určuje rychlost stahování z internetu.</span>
              </div>
            </div>
          </div>

          {/* BLOK E */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800 text-slate-300 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 text-slate-800/50 w-48 h-48 rounded-full border-8 border-slate-800/80 pointer-events-none"></div>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 relative z-10">
              <Lightbulb className="w-8 h-8 text-yellow-500" /> E. Jak do toho zapadá Operační systém?
            </h2>
            <div className="space-y-4 text-sm relative z-10">
              <p>
                Pokud je hardware tělo a aplikační software duše (např. textový editor), proč potřebujeme Operační systém?
              </p>
              <div className="bg-slate-800/50 p-5 rounded-xl border-l-4 border-yellow-500">
                Na světě existují tisíce různých typů procesorů, grafických karet a disků od různých výrobců (Intel, AMD, Nvidia, Kingston...). Pokud by operační systém neexistoval, musel by každý programátor textového editoru sám napsat kód pro tisíce druhů disků, aby na ně dokázal uložit pouhý dokument.
              </div>
              <p>
                <strong>Operační systém (jeho jádro/Kernel a Ovladače)</strong> funguje jako tlumočník a štít. OS si povídá se všemi těmito HW díly a aplikacím nabízí <strong>jednotné příkazy</strong>. Díky tomu stačí aplikaci jen zavolat příkaz <em>"Ulož soubor"</em> a OS zařídí přesun bitů z RAM přes sběrnici základní desky až na konkrétní SSD disk.
              </p>
            </div>

            <div className="mt-8 text-center relative z-10">
              <button 
                onClick={() => setActiveTab('simulator')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-900/50 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
              >
                Přejít na simulátory <PlayCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'simulator' && (
        <div className="animate-in fade-in duration-500 w-full flex flex-col items-center">
          <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden w-full">
            <div className="w-32 h-32 bg-gradient-to-tr from-slate-600 to-gray-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 mb-10">
              <HardDrive className="w-16 h-16 text-white" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
              Interaktivní simulátory
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em]">
              Zkuste si zorganizovat architekturu na vlastní pěst
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              {/* Von Neumann */}
              <div className="bg-indigo-50 border-2 border-indigo-100 p-8 rounded-3xl flex flex-col items-center text-center justify-between min-h-[300px] shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all hover:-translate-y-1 relative group">
                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-indigo-50 transition-colors">#vng</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white font-black text-2xl">
                    CPU
                  </div>
                  <h3 className="font-black text-indigo-800 text-xl mb-3 uppercase tracking-wider">Von Neumannova architektura</h3>
                  <p className="text-sm text-indigo-900/80 mb-6 font-medium">Základní princip fungování počítačů. Vyzkoušej si, jak procesor, paměť a sběrnice spolupracují jako jeden tým.</p>
                </div>
                <button
                  onClick={onStartVonNeumann}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2"
                >
                  Spustit simulátor
                </button>
              </div>

              {/* Paměť RAM */}
              <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-3xl flex flex-col items-center text-center justify-between min-h-[300px] shadow-lg shadow-emerald-100/50 hover:shadow-emerald-200/50 transition-all hover:-translate-y-1 relative group">
                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-emerald-50 transition-colors">#rms</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white font-black text-2xl">
                    RAM
                  </div>
                  <h3 className="font-black text-emerald-800 text-xl mb-3 uppercase tracking-wider">Paměť RAM (Tři úrovně)</h3>
                  <p className="text-sm text-emerald-900/80 mb-6 font-medium">Od správy kapacity, přes rozložení kódových a datových segmentů až po skládání vlastního strojového kódu přímo v buňkách paměti.</p>
                </div>
                <button
                  onClick={onStartRamSimulator}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2"
                >
                  Otevřít kapitolu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OsHardwareChapter;
