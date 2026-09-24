import React, { useState } from 'react';
import { ArrowLeft, Clock, Monitor, Terminal, Smartphone, MonitorUp, Server, HardDrive, Cpu, ShieldCheck, BarChart3, Globe, SmartphoneNfc, Laptop } from 'lucide-react';

interface OsEvolutionChapterProps {
  onBack: () => void;
}

type EraId = 'pre-os' | 'unix' | 'ms-dos' | 'gui' | 'linux' | 'win95' | 'winxp' | 'modern' | 'win7' | 'chrome-os' | 'win11' | 'future';

interface EraData {
  id: EraId;
  year: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  visual: React.ReactNode;
}

const ERAS: EraData[] = [
  {
    id: 'pre-os',
    year: '1940s - 50s',
    title: 'Děrné štítky (Bez OS)',
    subtitle: 'Programátor = Operátor',
    icon: <HardDrive className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Představ si počítač velikosti tělocvičny. Neměl obrazovku ani klávesnici a <strong>neměl vůbec žádný operační systém</strong>. Programátor byl zároveň operátor.
        </p>
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
          <strong className="block text-slate-900 mb-1">Děrné štítky vs Von Neumann</strong>
          Zatímco dnešní počítače (Von Neumannova architektura) natahují programy i data elektronicky do paměti RAM a procesor je rovnou zpracovává, tehdy se programy musely fyzicky nakódovat vycvaknutím dírek do kusu tvrdého papíru (děrný štítek).
        </div>
        <p>
          Procesor přečetl štítek, vykonal přesně tu jednu operaci a zastavil se. Pokud jsi chtěl spustit jiný program, musel jsi přinést jinou krabici štítků. Až v 50. letech přišly "Dávkové systémy" (Batch processing) - první prapředek OS.
        </p>
      </div>
    ),
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5DCC5] p-6 rounded-2xl relative overflow-hidden border-4 border-[#C1B290]">
        <div className="absolute top-2 left-4 font-mono text-[#8C7A58] text-xs font-bold">IBM PUNCH CARD</div>
        <div className="flex gap-2 mt-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {[...Array(8)].map((_, j) => (
                <div key={j} className={`w-3 h-6 rounded-sm ${Math.random() > 0.7 ? 'bg-transparent border-2 border-[#C1B290]' : 'bg-[#C1B290]'}`}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'unix',
    year: '1969',
    title: 'UNIX',
    subtitle: 'Příkazová řádka a sálové PC',
    icon: <Terminal className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          V laboratořích Bell Labs vzniká <strong>UNIX</strong>. Toto je první skutečně moderní operační systém, který definoval pravidla hry, podle kterých hrajeme dodnes.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Multitasking a Time-sharing:</strong> Počítač dokáže "přepínat" mezi více programy tak rychle, že to vypadá, že běží současně.</li>
          <li><strong>Terminály:</strong> K jednomu obřímu sálovému počítači se mohlo pomocí "hloupé" obrazovky a klávesnice připojit více uživatelů naráz.</li>
          <li><strong>Práva:</strong> Vzniká koncept oddělení uživatelů a oprávnění k souborům.</li>
        </ul>
        <div className="bg-indigo-50 p-4 rounded-xl text-indigo-900 border border-indigo-200 text-sm">
          UNIX byl napsán v programovacím jazyce C. Z jeho rodokmenu vychází dnešní Linux i macOS.
        </div>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-[#1E1E1E] rounded-2xl p-4 font-mono text-green-400 text-sm border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
        <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 flex items-center px-3">
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
        </div>
        <div className="mt-6 flex-1 flex flex-col gap-1">
          <div>login: root</div>
          <div>password: *******</div>
          <div className="mt-2 text-slate-300">Welcome to UNIX System V.</div>
          <div className="mt-4 flex gap-2"><span>$</span><span className="animate-pulse">_</span></div>
        </div>
      </div>
    )
  },
  {
    id: 'ms-dos',
    year: '1981',
    title: 'MS-DOS',
    subtitle: 'Základ pro osobní počítače (PC)',
    icon: <Terminal className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          IBM uvádí na trh první Osobní počítač (IBM PC). Potřebovali pro něj systém, a tak se obrátili na tehdy malou firmu Microsoft. Ta koupila systém zvaný QDOS, trochu ho upravila a vznikl slavný <strong>MS-DOS</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Textové rozhraní:</strong> Vše se ovládalo čistě psaním příkazů (např. <code>dir</code> pro výpis složky).</li>
          <li><strong>Single-tasking:</strong> Oproti pokročilému UNIXu uměl DOS spustit vždy jen jeden program naráz. Až se program ukončil, systém se vrátil k příkazové řádce.</li>
        </ul>
        <div className="bg-slate-800 text-white p-4 rounded-xl text-sm">
          MS-DOS na dlouhá léta ovládl domácnosti a stal se neviditelným motorem pod prvními verzemi Windows.
        </div>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-black rounded-2xl p-4 font-mono text-slate-200 text-sm border-[12px] border-[#D1D1D1] shadow-2xl relative overflow-hidden flex flex-col">
        <div className="mt-2 flex-1 flex flex-col gap-1">
          <div>Starting MS-DOS...</div>
          <br/>
          <div>Microsoft(R) MS-DOS(R) Version 6.22</div>
          <div>(C)Copyright Microsoft Corp 1981-1994.</div>
          <br/>
          <div className="mt-4 flex gap-2"><span>C:\&gt;</span><span className="animate-pulse">_</span></div>
        </div>
      </div>
    )
  },
  {
    id: 'gui',
    year: '1984',
    title: 'Mac OS (Apple)',
    subtitle: 'Revoluce grafického rozhraní (GUI)',
    icon: <Monitor className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Do té doby ovládali počítače pouze inženýři psaním složitých textových příkazů. Apple přichází s revolučním počítačem <strong>Macintosh</strong>.
        </p>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
          <strong className="block text-orange-900 mb-1">Grafické uživatelské rozhraní (GUI)</strong>
          Najednou má operační systém "okna", ikony na ploše, koš a vše se ovládá malou krabičkou na stole – <strong>myší</strong>.
        </div>
        <p>
          Nápad na GUI a myš sice vznikl v laboratořích firmy Xerox, ale Apple a později Microsoft ho zpopularizovali a dostali k lidem domů.
        </p>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-[#E8E8E8] rounded-2xl border-4 border-[#C0C0C0] p-4 relative font-sans shadow-inner">
        <div className="absolute top-0 inset-x-0 h-6 bg-white border-b-2 border-black flex items-center px-2 text-[10px] font-bold gap-3">
          <span>File</span><span>Edit</span><span>View</span><span>Special</span>
        </div>
        <div className="mt-6 border-2 border-black bg-white w-3/4 h-3/4 mx-auto rounded-sm relative shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col">
          <div className="border-b-2 border-black flex justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]">
            <div className="bg-white px-2 font-bold text-xs uppercase my-0.5">System Disk</div>
          </div>
          <div className="p-4 flex gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-10 border-2 border-black relative bg-white flex items-center justify-center">
                 <div className="w-4 h-1 bg-black"></div>
                 <div className="absolute top-0 right-0 w-3 h-3 border-l-2 border-b-2 border-black bg-white"></div>
              </div>
              <span className="text-[10px] font-bold">ReadMe</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-8 border-2 border-black relative bg-white flex flex-col justify-between p-1">
                 <div className="w-full h-1 bg-black"></div>
                 <div className="w-full h-1 bg-black"></div>
              </div>
              <span className="text-[10px] font-bold">Folder</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'linux',
    year: '1991',
    title: 'Linux',
    subtitle: 'Open-source a nadvláda serverů',
    icon: <Server className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Student Linus Torvalds se rozhodl napsat vlastní jádro operačního systému (inspirované Unixem) jako svůj koníček. Zveřejnil ho zdarma a vyzval programátory po celém světě, aby se přidali.
        </p>
        <div className="bg-slate-800 text-white p-4 rounded-xl">
          <strong className="block text-green-400 mb-1">Dopad Linuxu:</strong>
          Zatímco Windows ovládly domácnosti, Linux naprosto <strong>ovládl internet a servery</strong>. Dnes pohání většinu webů na světě, chytré ledničky, routery, a dokonce i helikoptéru Ingenuity na Marsu.
        </div>
        <p>Z jádra Linuxu přímo vychází i nejpoužívanější operační systém dneška: <strong>Android</strong>.</p>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center border-4 border-slate-700 relative overflow-hidden">
         <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-24 bg-white rounded-t-[40px] rounded-b-[20px] flex flex-col items-center pt-4 relative shadow-2xl">
               <div className="w-14 h-16 bg-slate-900 rounded-t-[30px] rounded-b-[15px] flex justify-center pt-2">
                 <div className="flex gap-2">
                    <div className="w-3 h-4 bg-white rounded-full"></div>
                    <div className="w-3 h-4 bg-white rounded-full"></div>
                 </div>
               </div>
               <div className="absolute top-10 w-6 h-4 bg-yellow-400 rounded-full border border-orange-500"></div>
            </div>
            <div className="mt-4 font-mono text-green-400 font-bold tracking-widest text-xl">LINUX</div>
         </div>
      </div>
    )
  },
  {
    id: 'win95',
    year: '1995',
    title: 'Windows 95',
    subtitle: 'Skutečná revoluce Microsoftu',
    icon: <MonitorUp className="w-6 h-6 text-slate-800" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Po rozpačitém přijetí prvních verzí Windows (což byly jen grafické masky pro DOS) vydává Microsoft <strong>Windows 95</strong>. Šlo o obrovský komerční i technologický milník.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Tlačítko Start a Taskbar:</strong> Prvky, které používáme dodnes, se objevily právě zde.</li>
          <li><strong>Plug and Play:</strong> Systém poprvé dokázal sám rozpoznat, když jsi do něj zapojil nový hardware (např. tiskárnu) a pokusil se ji sám nastavit.</li>
        </ul>
        <div className="bg-blue-50 p-4 rounded-xl text-blue-900 border border-blue-200 text-sm">
          Lidé v obchodech dokonce stáli fronty na "půlnoční prodej" nového operačního systému.
        </div>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-teal-600 rounded-2xl relative overflow-hidden font-sans border-4 border-slate-400">
        {/* Win95 style window */}
        <div className="absolute top-8 left-12 right-6 bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col">
          <div className="bg-blue-800 text-white font-bold text-xs p-1 px-2 flex justify-between items-center">
            <span>C:\Windows</span>
            <div className="flex gap-1">
               <div className="bg-[#C0C0C0] w-4 h-4 border-t border-l border-white border-b border-r border-black flex items-center justify-center text-black font-bold text-[10px] pb-1">_</div>
               <div className="bg-[#C0C0C0] w-4 h-4 border-t border-l border-white border-b border-r border-black flex items-center justify-center text-black font-bold text-[10px]">X</div>
            </div>
          </div>
          <div className="p-4 bg-white m-1 h-20 border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white flex gap-4">
             <div className="w-8 h-8 bg-blue-100 border border-blue-300"></div>
             <div className="w-8 h-8 bg-yellow-100 border border-yellow-300"></div>
          </div>
        </div>
        {/* Taskbar */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-[#C0C0C0] border-t-2 border-white flex items-center px-1">
          <div className="bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 py-0.5 flex items-center gap-1 font-bold text-xs shadow-sm">
             <div className="w-4 h-4 bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 border border-black"></div>
             Start
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'winxp',
    year: '2001',
    title: 'Windows XP',
    subtitle: 'Stabilita a barevný design',
    icon: <MonitorUp className="w-6 h-6 text-blue-500" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Obrovský historický milník pro Microsoft. Do té doby byly Windows pro domácnosti stále částečně závislé na starém, nestabilním jádře DOSu (často padaly do tzv. Modré smrti).
        </p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <strong className="block text-blue-900 mb-1">Sloučení s jádrem NT</strong>
          Ve Windows XP Microsoft poprvé přinesl stabilní firemní jádro ("New Technology") i běžným uživatelům domů. Počítače rázem přestaly padat.
        </div>
        <p>
          Kromě stability se systém proslavil svým velmi barevným "Luna" designem, zeleným tlačítkem Start a fotkou zeleného kopce (Bliss) na ploše.
        </p>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-gradient-to-b from-[#1C7EE0] to-[#55B925] rounded-2xl relative overflow-hidden font-sans border-4 border-blue-800">
        <div className="absolute top-6 left-6 right-6 bg-[#ECE9D8] rounded-t-lg shadow-xl flex flex-col border border-[#004AD0]">
          <div className="bg-gradient-to-b from-[#0058E6] via-[#3A93FF] to-[#0058E6] text-white font-bold text-xs p-1.5 px-2 rounded-t-md flex justify-between items-center shadow-inner">
            <span className="drop-shadow-md tracking-wider">Tento počítač</span>
            <div className="flex gap-1">
               <div className="bg-[#E75B47] text-white w-5 h-5 flex items-center justify-center rounded-sm font-bold shadow-inner border border-white text-[10px]">X</div>
            </div>
          </div>
          <div className="bg-[#ECE9D8] px-2 py-1 text-[10px] flex gap-3 border-b border-white shadow-sm">
             <span>Soubor</span><span>Úpravy</span><span>Zobrazit</span>
          </div>
          <div className="p-4 bg-white h-24 flex gap-4">
             <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center shadow-sm">
                <HardDrive className="w-6 h-6 text-slate-500" />
             </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-b from-[#245EDC] to-[#123EAE] border-t border-[#468AEC] flex items-center px-0">
          <div className="bg-gradient-to-b from-[#4BA13E] to-[#2E7A23] rounded-r-full px-4 py-1 h-full flex items-center gap-2 font-bold text-white shadow-[2px_0_5px_rgba(0,0,0,0.5)] italic text-sm border-r border-[#6BC55D]">
             start
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'modern',
    year: '2007+',
    title: 'iOS a Android',
    subtitle: 'Kapesní éra a App Store',
    icon: <Smartphone className="w-6 h-6 text-pink-500" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>Představení prvního iPhonu (2007) od Applu a následně otevřeného Androidu (2008) od Googlu způsobilo zemětřesení.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Dotykové rozhraní:</strong> Úplný odklon od myši a klávesnice k přímému dotyku prstem. Žádná složitá okna k posouvání.</li>
          <li><strong>Ekonomika App Store:</strong> Systém začal fungovat jako bezpečný uzavřený obchod pro aplikace. Vyřešil se tím obrovský problém s instalací virů z internetu na starých PC.</li>
        </ul>
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-xl border border-pink-100 text-sm">
          <strong className="text-pink-900 block mb-1">Konec monopolu PC</strong>
          Pro obrovské množství lidí na planetě se chytrý telefon stal jejich jediným zařízením, čímž mobilní systémy (s Androidem v čele) překonaly v počtu uživatelů klasické Windows.
        </div>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl p-6 flex items-center justify-center border-4 border-indigo-300 relative overflow-hidden shadow-inner">
         <div className="w-28 h-48 bg-black rounded-[2rem] border-4 border-slate-800 p-2 shadow-2xl relative">
            <div className="w-full h-full bg-gradient-to-b from-blue-400 to-pink-500 rounded-[1.5rem] p-3 flex flex-col gap-3 relative overflow-hidden">
               <div className="flex justify-between items-center px-1 z-10">
                  <span className="text-[8px] text-white font-bold">14:20</span>
                  <div className="w-6 h-1 bg-black rounded-full"></div>
               </div>
               <div className="grid grid-cols-3 gap-2 mt-2 z-10">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-md shadow-sm border border-white/30"></div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'win7',
    year: '2009',
    title: 'Windows 7',
    subtitle: 'Skleněný a rychlý',
    icon: <MonitorUp className="w-6 h-6 text-sky-500" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Po těžkopádném a hodně kritizovaném systému Windows Vista přišel vyladěný a dodnes velmi oblíbený <strong>Windows 7</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Aero rozhraní:</strong> Průhledná okna s efektem mléčného skla, která využívala sílu grafické karty k vykreslování OS.</li>
          <li><strong>Nový hlavní panel (Superbar):</strong> Poprvé jsi mohl ikony běžících programů natrvalo "připnout" na panel (jako to dělal Mac). Byly to jen velké čtvercové ikony bez textu.</li>
        </ul>
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-sm">
          Windows 7 byl pro uživatele tak dobrý, že mnozí odmítali roky přejít na novější Windows 8 nebo 10.
        </div>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center rounded-2xl relative overflow-hidden font-sans border-4 border-slate-700">
        <div className="absolute top-6 left-8 right-8 rounded-lg shadow-2xl flex flex-col border border-white/40 bg-white/30 backdrop-blur-md">
          <div className="text-slate-900 font-bold text-xs p-2 rounded-t-lg flex justify-between items-center shadow-inner">
            <span className="drop-shadow-md">Počítač</span>
            <div className="flex gap-1">
               <div className="bg-red-500 text-white w-6 h-4 rounded-sm flex items-center justify-center font-bold text-[10px] shadow-sm border border-red-700 hover:bg-red-600">X</div>
            </div>
          </div>
          <div className="p-4 bg-white h-24 border-x border-b border-white rounded-b-lg">
             <div className="flex gap-4">
                <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-2 bg-slate-300 rounded-full"></div>
             </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-black/40 backdrop-blur-xl border-t border-white/20 flex items-center px-2 gap-2">
          <div className="w-10 h-10 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 rounded-full border border-white/50 shadow-lg -mt-1 flex items-center justify-center overflow-hidden">
             <div className="w-4 h-4 bg-white/20 rounded-full rotate-45"></div>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-md border border-white/20"></div>
          <div className="w-8 h-8 bg-blue-400/50 rounded-md border border-white/30 shadow-inner"></div>
        </div>
      </div>
    )
  },
  {
    id: 'chrome-os',
    year: '2011',
    title: 'Chrome OS',
    subtitle: 'OS jako prohlížeč',
    icon: <Globe className="w-6 h-6 text-orange-500" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Google představil revoluční myšlenku: <strong>Co když k běžné práci nic víc než webový prohlížeč nepotřebujeme?</strong>
        </p>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <strong className="block text-yellow-900 mb-1">Tenký klient (Thin Client)</strong>
          Chrome OS je pod kapotou linuxové jádro, které rovnou nastartuje do prohlížeče Google Chrome. Téměř všechna data se ukládají na internetu (v Cloudu) a aplikace běží jako webové stránky.
        </div>
        <p>
          Tento bezpečný a bleskově rychlý systém masivně ovládl americké školství (Chromebooky), protože administrátorům naprosto usnadnil správu zařízení.
        </p>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-slate-200 rounded-2xl relative overflow-hidden font-sans border-4 border-slate-300 shadow-inner">
         <div className="absolute inset-x-0 top-0 bg-slate-100 border-b border-slate-300 flex flex-col">
            <div className="flex gap-2 p-2 pb-0">
               <div className="bg-white rounded-t-lg px-4 py-1.5 text-xs font-bold text-slate-700 flex items-center gap-2 border border-slate-300 border-b-white relative z-10 w-40 truncate">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-red-500 flex items-center justify-center">
                     <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                  Google Search
               </div>
            </div>
            <div className="bg-white p-2 border-b border-slate-200 flex gap-2 items-center relative z-0">
               <div className="w-4 h-4 text-slate-400 rounded-full border-2 border-slate-400"></div>
               <div className="flex-1 bg-slate-100 rounded-full h-6 px-3 flex items-center text-[10px] text-slate-400 font-mono">
                  https://www.google.com
               </div>
            </div>
         </div>
         <div className="absolute inset-0 top-16 bg-white flex items-center justify-center flex-col gap-4">
            <div className="text-4xl font-black text-slate-200 tracking-tighter">Google</div>
            <div className="w-1/2 h-6 rounded-full border border-slate-200 shadow-inner bg-slate-50"></div>
         </div>
      </div>
    )
  },
  {
    id: 'win11',
    year: '2021+',
    title: 'Windows 11',
    subtitle: 'Moderní UI a bezpečnost',
    icon: <MonitorUp className="w-6 h-6 text-indigo-500" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>
          Nejnovější generace přinesla po letech velký "facelift" a přiblížila se vzhledem k moderním mobilním systémům a macOS.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Vycentrovaný Start:</strong> Poprvé v historii nejsou ikony na hlavním panelu přilepené vlevo, ale uprostřed. Okna už nemají ostré hrany, ale zaoblené rohy.</li>
          <li><strong>TPM 2.0 a bezpečnost:</strong> Kvůli šíření ransomwaru Windows 11 uměle odstřihly staré počítače tím, že vyžadují speciální šifrovací čip na základní desce (TPM 2.0).</li>
          <li><strong>Podpora Androidu:</strong> Možnost přímo spouštět mobilní aplikace.</li>
        </ul>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-200 via-sky-100 to-purple-200 rounded-2xl relative overflow-hidden font-sans border-4 border-slate-300 shadow-inner">
        <div className="absolute top-8 left-10 right-10 rounded-xl shadow-2xl flex flex-col bg-white border border-slate-200">
          <div className="p-2 flex justify-end gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
          </div>
          <div className="p-4 h-24 bg-slate-50 rounded-b-xl flex gap-3">
             <div className="w-1/3 bg-white rounded-md shadow-sm border border-slate-100 p-2 flex flex-col gap-2">
                <div className="w-full h-2 bg-indigo-100 rounded-full"></div>
                <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
             </div>
             <div className="w-2/3 bg-white rounded-md shadow-sm border border-slate-100 p-2"></div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-12 bg-white/80 backdrop-blur-2xl border border-white rounded-2xl flex items-center px-4 gap-3 shadow-lg">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center p-1 shadow-sm">
             <div className="grid grid-cols-2 gap-[2px] w-full h-full">
                <div className="bg-white rounded-[1px]"></div><div className="bg-white rounded-[1px]"></div>
                <div className="bg-white rounded-[1px]"></div><div className="bg-white rounded-[1px]"></div>
             </div>
          </div>
          <div className="w-8 h-8 bg-slate-100 rounded-md shadow-sm border border-slate-200"></div>
          <div className="w-8 h-8 bg-slate-100 rounded-md shadow-sm border border-slate-200"></div>
          <div className="w-8 h-8 bg-indigo-50 rounded-md shadow-sm border border-indigo-100"></div>
        </div>
      </div>
    )
  },
  {
    id: 'future',
    year: 'Současnost a Budoucnost',
    title: 'Kam směřujeme?',
    subtitle: 'AI, Cloud a neviditelný OS',
    icon: <Cpu className="w-6 h-6" />,
    content: (
      <div className="space-y-4 text-slate-700">
        <p>Za posledních 20 let přestaly být operační systémy jen "správcem hardwaru". Budoucnost se točí kolem tří hlavních pilířů:</p>
        <ul className="space-y-3 text-sm">
          <li className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex gap-3 items-start">
             <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">1</div>
             <div><strong>AI-Native OS:</strong> OS už jen pasivně nečeká. Pomocí strojového učení aktivně předvídá, co uživatel udělá, a alokuje podle toho výkon. Místo aplikací spouští a koordinuje autonomní AI agenty.</div>
          </li>
          <li className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex gap-3 items-start">
             <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">2</div>
             <div><strong>Cloud a Web OS:</strong> Fyzický hardware ztrácí na důležitosti. Operační systém budoucnosti je distribuovaný v cloudu. Přesouváme se do doby, kdy nám k práci stačí v podstatě jen webový prohlížeč.</div>
          </li>
          <li className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex gap-3 items-start">
             <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">3</div>
             <div><strong>Proaktivní bezpečnost (Zero-Trust):</strong> Počítače už nevěří ničemu a nikomu, ani uvnitř vlastní sítě. Každá akce se neustále ověřuje a AI systémy v reálném čase detekují hrozby, jako jsou viry a ransomware, než vůbec stihnou cokoliv napáchat.</div>
          </li>
        </ul>
      </div>
    ),
    visual: (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-black rounded-2xl p-6 flex flex-col items-center justify-center border-4 border-indigo-900 relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgNWgxMHYxMEg1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50"></div>
         
         <div className="relative z-10 w-32 h-32 rounded-full border border-indigo-500/50 shadow-[0_0_50px_rgba(79,70,229,0.5)] flex items-center justify-center animate-pulse">
            <div className="absolute inset-0 rounded-full border border-purple-500/30 scale-110 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-125"></div>
            
            <Cpu className="w-12 h-12 text-indigo-300 drop-shadow-[0_0_15px_rgba(165,180,252,1)]" />
         </div>
         
         <div className="relative z-10 mt-6 flex items-center gap-2 text-indigo-300 text-xs font-mono font-bold tracking-[0.2em]">
            <span>CLOUD</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span>A.I.</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span>SECURE</span>
         </div>
      </div>
    )
  }
];

const MarketStatsView: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-500" /> Aktuální rozložení trhu
        </h2>
        <p className="text-slate-500 text-sm mt-2">Díky neustálému vývoji se trh proměnil. Zde jsou podíly zařízení připojených k internetu.</p>
        <div className="inline-block mt-3 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-200 shadow-sm">
          Data vycházejí z celosvětových průměrů pro rok 2024
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Mobilní trh */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <SmartphoneNfc className="w-5 h-5 text-pink-500" /> Mobilní trh (Smartphony)
          </h3>
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-green-600">Android (Google)</span>
                   <span>~ 71 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[71%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-600">iOS (Apple)</span>
                   <span>~ 28 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-slate-400 to-slate-600 w-[28%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-400">Ostatní</span>
                   <span>~ 1 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-400 w-[1%]"></div>
                </div>
             </div>
          </div>
          <p className="text-xs text-slate-400 mt-6 text-center">Apple iOS vládne zejména v USA, zbytek světa dominuje Android.</p>
        </div>

        {/* Desktopový trh */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Laptop className="w-5 h-5 text-blue-500" /> Desktopový trh (Počítače)
          </h3>
          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-blue-600">Windows (Microsoft)</span>
                   <span>~ 68 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[68%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-purple-600">Linux & Ostatní</span>
                   <span>~ 15 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-400 w-[15%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-600">macOS (Apple)</span>
                   <span>~ 14 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-slate-400 to-slate-600 w-[14%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-orange-500">Chrome OS</span>
                   <span>~ 3 %</span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-400 w-[3%]"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Globální trh */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
         <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-4 justify-center">
            <Globe className="w-5 h-5" /> Celkový podíl OS (všechna zařízení)
         </h3>
         <p className="text-center text-sm text-indigo-700 mb-6">Mobily dnes jednoznačně vládnou internetu, a proto Android poráží na hlavu i legendární Windows.</p>
         
         {/* Composite Progress Bar */}
         <div className="h-8 md:h-12 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
            <div className="bg-green-500 flex items-center justify-center text-white text-[10px] md:text-sm font-bold hover:brightness-110 transition-all cursor-crosshair" style={{ width: '43%' }}>
               Android 43%
            </div>
            <div className="bg-blue-500 flex items-center justify-center text-white text-[10px] md:text-sm font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '27%' }}>
               Win 27%
            </div>
            <div className="bg-slate-700 flex items-center justify-center text-white text-[10px] md:text-sm font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '18%' }}>
               iOS 18%
            </div>
            <div className="bg-slate-400 flex items-center justify-center text-white text-[10px] font-bold border-l border-white/20 hover:brightness-110 transition-all cursor-crosshair" style={{ width: '12%' }}>
               Zbytek 12%
            </div>
         </div>
      </div>

    </div>
  );
};

const OsEvolutionChapter: React.FC<OsEvolutionChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats'>('timeline');
  const [activeEra, setActiveEra] = useState<EraId>('pre-os');

  const currentEraData = ERAS.find(e => e.id === activeEra)!;

  return (
    <div className="max-w-6xl w-full mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8 px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na menu OS
        </button>
      </div>

      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Evoluce Operačních Systémů</h1>
        <p className="text-lg text-slate-500 max-w-3xl mx-auto font-medium">
          Od obrovských sálových počítačů a děrných štítků až po moderní chytré telefony v našich kapsách.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10 px-4">
        <div className="bg-slate-100 p-1.5 rounded-full flex gap-2 shadow-sm border border-slate-200">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
              ${activeTab === 'timeline' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:bg-slate-200 scale-95'}`}
          >
            <Clock className="w-4 h-4" /> Časová osa
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
              ${activeTab === 'stats' ? 'bg-white text-indigo-600 shadow-md scale-100' : 'text-slate-500 hover:bg-slate-200 scale-95'}`}
          >
            <BarChart3 className="w-4 h-4" /> Statistiky trhu
          </button>
        </div>
      </div>

      {activeTab === 'stats' ? (
        <div className="px-4">
           <MarketStatsView />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 px-4">
          
          {/* Timeline (Left) */}
          <div className="lg:w-1/3 bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-100 h-[600px] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 sticky top-0 bg-white z-10 py-2 border-b border-slate-100">
              <Clock className="w-6 h-6 text-indigo-500" /> Historie krok za krokem
            </h2>
            
            <div className="relative border-l-4 border-indigo-100 ml-4 space-y-2 pb-4">
              {ERAS.map((era) => {
                const isActive = activeEra === era.id;
                return (
                  <div key={era.id} className="relative">
                    <button
                      onClick={() => setActiveEra(era.id)}
                      className={`w-full text-left pl-8 py-3 pr-4 rounded-xl transition-all duration-300 relative group
                        ${isActive ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      <div className={`absolute top-1/2 -translate-y-1/2 -left-[10px] w-4 h-4 rounded-full border-4 transition-all duration-300
                        ${isActive ? 'bg-indigo-600 border-indigo-200 w-5 h-5 -left-[12px]' : 'bg-white border-indigo-200 group-hover:border-indigo-400'}`} 
                      />
                      
                      <div className={`text-[10px] font-bold mb-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {era.year}
                      </div>
                      <div className={`font-black uppercase tracking-wider text-xs ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {era.title}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Panel (Right) */}
          <div className="lg:w-2/3 bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex flex-col ring-1 ring-slate-100 min-h-[600px]">
            
            <div className="bg-slate-50 p-6 md:p-8 border-b-2 border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
                {currentEraData.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-indigo-500 mb-1">{currentEraData.year}</div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter uppercase">{currentEraData.title}</h2>
                <h3 className="text-md md:text-lg text-slate-500 font-medium">{currentEraData.subtitle}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1 grid md:grid-cols-2 gap-8 items-center bg-white">
               <div className="order-2 md:order-1 text-sm leading-relaxed h-full overflow-y-auto pr-2 custom-scrollbar">
                 {currentEraData.content}
               </div>
               <div className="order-1 md:order-2 h-64 md:h-full min-h-[250px]">
                 {currentEraData.visual}
               </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default OsEvolutionChapter;
