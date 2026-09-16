import React, { useState } from 'react';
import { ArrowLeft, HardDrive, Monitor, FileText, Chrome, Gamepad2, Image as ImageIcon, CheckCircle2, AlertTriangle, Zap, Cpu, Database, HelpCircle } from 'lucide-react';

interface RamSimulatorChapterProps {
  onBack: () => void;
}

// Data pro Fázi 1
const APPS = [
  { id: 'word', name: 'Textový editor', size: 1024, icon: FileText, color: 'bg-blue-500', hover: 'hover:bg-blue-600' },
  { id: 'chrome', name: 'Webový prohlížeč', size: 3072, icon: Chrome, color: 'bg-green-500', hover: 'hover:bg-green-600' },
  { id: 'photoshop', name: 'Grafický editor', size: 2048, icon: ImageIcon, color: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
  { id: 'game', name: 'Náročná 3D hra', size: 5120, icon: Gamepad2, color: 'bg-red-500', hover: 'hover:bg-red-600' },
];

const TOTAL_RAM = 8192; // 8192 MB (8 GB)

const OS_TASKS_DATA = [
  { id: 'inst-0', item: 'LOAD 10', targetAddr: 0, type: 'code', text: 'instrukci "LOAD 10"' },
  { id: 'inst-1', item: 'MUL 11', targetAddr: 1, type: 'code', text: 'instrukci "MUL 11"' },
  { id: 'inst-2', item: 'MUL 12', targetAddr: 2, type: 'code', text: 'instrukci "MUL 12"' },
  { id: 'inst-3', item: 'STORE 13', targetAddr: 3, type: 'code', text: 'instrukci "STORE 13"' },
  { id: 'inst-4', item: 'HALT', targetAddr: 4, type: 'code', text: 'instrukci "HALT"' },
  { id: 'data-10', item: '2', targetAddr: 10, type: 'data', text: 'data "2"' },
  { id: 'data-11', item: '3.14', targetAddr: 11, type: 'data', text: 'data "3.14"' },
  { id: 'data-12', item: '10', targetAddr: 12, type: 'data', text: 'data "10"' },
  { id: 'data-13', item: '?', targetAddr: 13, type: 'data', text: 'místo pro výsledek "?"' },
  { id: 'data-14', item: '99', targetAddr: 14, type: 'data', text: 'data "99"' },
];

const RamSimulatorChapter: React.FC<RamSimulatorChapterProps> = ({ onBack }) => {
  // Stav pro záložky
  const [activeTab, setActiveTab] = useState<'capacity' | 'anatomy' | 'load' | 'program'>('capacity');

  // Stav Fáze 1
  const [runningApps, setRunningApps] = useState<{ id: string, app: typeof APPS[0] }[]>([]);
  const [oomError, setOomError] = useState(false);

  const usedRam = runningApps.reduce((acc, curr) => acc + curr.app.size, 0);

  const handleLaunchApp = (app: typeof APPS[0]) => {
    setOomError(false);
    if (usedRam + app.size > TOTAL_RAM) {
      setOomError(true);
      setTimeout(() => setOomError(false), 3000);
      return;
    }
    setRunningApps([...runningApps, { id: Math.random().toString(), app }]);
  };

  const handleKillApp = (instanceId: string) => {
    setRunningApps(runningApps.filter(a => a.id !== instanceId));
    setOomError(false);
  };

  // Stav Fáze 3 (Zavedení OS programu)
  const [phase3Tasks, setPhase3Tasks] = React.useState([...OS_TASKS_DATA]);
  const [phase3CurrentTask, setPhase3CurrentTask] = React.useState(0);
  const [phase3Placed, setPhase3Placed] = React.useState<Record<number, string>>({});
  const [phase3SelectedId, setPhase3SelectedId] = React.useState<string | null>(null);
  const [phase3Error, setPhase3Error] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Zamíchat úkoly při prvním načtení
    setPhase3Tasks([...OS_TASKS_DATA].sort(() => Math.random() - 0.5));
  }, []);

  const handlePhase3CellClick = (addr: number) => {
    if (phase3CurrentTask >= phase3Tasks.length) return; // hotovo
    const task = phase3Tasks[phase3CurrentTask];
    
    if (!phase3SelectedId) {
      setPhase3Error('Nejprve vyber blok dole ze zásobníku (kliknutím na něj)!');
      setTimeout(() => setPhase3Error(null), 2500);
      return;
    }
    if (phase3SelectedId !== task.id) {
      setPhase3Error('Vybral jsi špatný blok. Přečti si pozorně zadání aktuálního úkolu!');
      setTimeout(() => setPhase3Error(null), 2500);
      return;
    }
    if (addr !== task.targetAddr) {
      setPhase3Error(`Špatná adresa! Máš to vložit na adresu ${task.targetAddr}, ne na ${addr}.`);
      setTimeout(() => setPhase3Error(null), 2500);
      return;
    }
    
    // Úspěch!
    setPhase3Placed(prev => ({ ...prev, [addr]: task.item }));
    setPhase3SelectedId(null);
    setPhase3CurrentTask(prev => prev + 1);
  };

  // Stav Fáze 4 (Vlastní programování)
  const [progInst, setProgInst] = useState(Array(4).fill({ op: '', arg: '' }));
  const [progData, setProgData] = useState([
    { addr: '8', val: '5' },
    { addr: '9', val: '7' },
    { addr: '10', val: '' }
  ]);
  const [simResult, setSimResult] = useState<'none' | 'success' | 'error'>('none');
  const [simMessage, setSimMessage] = useState('');

  const handleProgChange = (idx: number, field: 'op' | 'arg', value: string) => {
    const newProg = [...progInst];
    newProg[idx] = { ...newProg[idx], [field]: value };
    setProgInst(newProg);
    setSimResult('none');
  };

  const verifyProgram = () => {
    // Expected: LOAD 8, ADD 9, STORE 10, HALT
    const i1 = progInst[0];
    const i2 = progInst[1];
    const i3 = progInst[2];
    const i4 = progInst[3];

    if (i1.op === 'LOAD' && i1.arg === '8' &&
        i2.op === 'ADD' && i2.arg === '9' &&
        i3.op === 'STORE' && i3.arg === '10' &&
        i4.op === 'HALT') {
      setSimResult('success');
      setSimMessage('Skvělé! Zkonstruoval jsi platný strojový kód. Výsledek 12 se uložil na adresu 10.');
      
      // Update memory visually
      const newData = [...progData];
      const targetIdx = newData.findIndex(d => d.addr === '10');
      if (targetIdx !== -1) {
        newData[targetIdx].val = '12';
        setProgData(newData);
      }
    } else {
      setSimResult('error');
      setSimMessage('Něco chybí nebo je špatně adresováno. Zkontroluj správnost instrukcí a adres datových buněk.');
      
      // Reset if failed
      const newData = [...progData];
      const targetIdx = newData.findIndex(d => d.addr === '10');
      if (targetIdx !== -1) {
        newData[targetIdx].val = '';
        setProgData(newData);
      }
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-16 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all border-2 border-gray-100 uppercase text-xs">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
          <HardDrive className="w-8 h-8 text-emerald-600" /> Paměť RAM v praxi
        </h1>
        <div className="w-[120px]"></div>
      </div>

      <p className="text-lg text-slate-600 font-medium text-center max-w-3xl mx-auto mb-2">
        Tato kapitola vás provede čtyřmi úrovněmi pohledu na paměť RAM. Od kapacity v operačním systému, přes rozložení běžícího programu, až po hardwarové skládání instrukcí do buněk.
      </p>

      {/* Záložky navigace */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab('capacity')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-widest rounded-2xl transition-all border-2 flex items-center gap-2 ${
            activeTab === 'capacity' 
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/30 scale-105' 
              : 'bg-white text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200'
          }`}
        >
          <HardDrive className="w-5 h-5" /> Kapacita
        </button>
        
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-widest rounded-2xl transition-all border-2 flex items-center gap-2 ${
            activeTab === 'anatomy' 
              ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-105' 
              : 'bg-white text-indigo-700 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200'
          }`}
        >
          <Database className="w-5 h-5" /> Segmenty
        </button>

        <button
          onClick={() => setActiveTab('load')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-widest rounded-2xl transition-all border-2 flex items-center gap-2 ${
            activeTab === 'load' 
              ? 'bg-yellow-500 text-white border-yellow-600 shadow-lg shadow-yellow-500/30 scale-105' 
              : 'bg-white text-yellow-700 border-yellow-100 hover:bg-yellow-50 hover:border-yellow-200'
          }`}
        >
          <Monitor className="w-5 h-5" /> Zavádění
        </button>

        <button
          onClick={() => setActiveTab('program')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-widest rounded-2xl transition-all border-2 flex items-center gap-2 ${
            activeTab === 'program' 
              ? 'bg-orange-500 text-white border-orange-600 shadow-lg shadow-orange-500/30 scale-105' 
              : 'bg-white text-orange-700 border-orange-100 hover:bg-orange-50 hover:border-orange-200'
          }`}
        >
          <Cpu className="w-5 h-5" /> Kódování
        </button>
      </div>

      {/* Fáze 1: Kapacita */}
      {activeTab === 'capacity' && (
      <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase flex items-center gap-2">
          Kapacita a alokace RAM
        </h2>
        <p className="text-slate-600 mb-8 font-medium">Operační systém přiděluje běžícím programům bloky paměti. Pokud paměť dojde, musíš některý program ukončit. Klikni na ikony pro spuštění aplikací.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {APPS.map(app => (
            <button key={app.id} onClick={() => handleLaunchApp(app)} className={`p-4 rounded-2xl flex flex-col items-center gap-2 text-white shadow-md transition-transform hover:-translate-y-1 ${app.color} ${app.hover}`}>
              <app.icon className="w-8 h-8" />
              <span className="font-bold text-sm text-center">{app.name}</span>
              <span className="text-xs opacity-80 uppercase tracking-wider">{app.size} MB</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-sm">Fyzická RAM (8192 MB)</span>
            <span className={`font-black text-lg ${usedRam === TOTAL_RAM ? 'text-red-500' : 'text-emerald-600'}`}>{usedRam} / {TOTAL_RAM} MB obsazeno</span>
          </div>
          
          <div className="w-full h-16 bg-slate-200 rounded-2xl overflow-hidden flex shadow-inner relative border-4 border-slate-300">
            {runningApps.map((a) => (
              <div 
                key={a.id} 
                style={{ width: `${(a.app.size / TOTAL_RAM) * 100}%` }}
                className={`${a.app.color} border-r-2 border-white/20 flex items-center justify-center cursor-pointer group hover:opacity-90 transition-all`}
                onClick={() => handleKillApp(a.id)}
                title="Kliknutím ukončíš proces"
              >
                <div className="hidden group-hover:block font-bold text-white text-xs drop-shadow-md">UKONČIT</div>
              </div>
            ))}
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="flex-1 border-r border-slate-300/30 h-full pointer-events-none last:border-0 absolute" style={{left: `${(i/8)*100}%`, width: `${100/8}%`}}></div>
            ))}
          </div>

          {oomError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 font-bold rounded-xl flex items-center gap-2 animate-bounce border border-red-200">
              <AlertTriangle className="w-5 h-5" /> Nedostatek operační paměti (Out of Memory)! Ukonči některou z aplikací kliknutím do paměti.
            </div>
          )}
        </div>
      </section>
      )}

      {/* Fáze 2: Anatomie programu */}
      {activeTab === 'anatomy' && (
      <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase flex items-center gap-2">
          Anatomie běžícího programu
        </h2>
        <p className="text-slate-600 mb-8 font-medium">Když procesor alokuje blok paměti pro aplikaci (např. Textový editor), rozdělí ho do segmentů. Zde vidíš obsah izolovaného bloku paměti jedné aplikace.</p>

        <div className="flex flex-col gap-6 items-center w-full">
          {/* Main RAM bar simulation from Phase 1 */}
          <div className="w-full max-w-4xl opacity-50 relative mt-4">
             <div className="absolute -top-6 left-0 text-slate-400 font-bold text-xs uppercase tracking-widest">Fyzická RAM</div>
             <div className="w-full h-8 bg-slate-200 rounded-xl overflow-hidden flex shadow-inner relative border-4 border-slate-300">
                <div className="w-[10%] bg-slate-300 border-r-2 border-white/20"></div>
                <div className="w-[25%] bg-blue-500 border-r-2 border-white/20 relative">
                   {/* Arrow pointing down */}
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-blue-500 opacity-100 z-10"></div>
                </div>
                <div className="flex-1"></div>
             </div>
          </div>
          
          <h3 className="font-bold text-slate-700 uppercase mt-4 mb-2">Detail procesu: Program na součet (2048 MB)</h3>
          
          {/* Zoomed RAM bar */}
          <div className="w-full bg-slate-200 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-inner relative border-[6px] border-slate-300 min-h-[160px] pt-8 md:pt-0">
             {/* Instrukční segment */}
             <div className="flex-1 bg-sky-100 border-r-4 border-slate-300 p-6 hover:bg-sky-200 transition-colors cursor-default flex flex-col justify-center relative pt-12 md:pt-14">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-4 font-black text-sky-800 uppercase text-xs tracking-widest flex items-center gap-2 opacity-50 z-10"><Cpu className="w-4 h-4"/> Instrukční (Kódový) segment</div>
                <div className="font-mono text-sm text-sky-900 bg-white/50 p-3 rounded-xl border border-sky-200 shadow-sm leading-relaxed text-center md:text-left mt-2">
                   0: LOAD R1, 8<br/>
                   1: ADD R1, 9<br/>
                   2: STORE 10, R1
                </div>
             </div>
             {/* Datový segment */}
             <div className="flex-[0.6] bg-orange-100 p-6 hover:bg-orange-200 transition-colors cursor-default flex flex-col justify-center relative pt-12 md:pt-14">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-4 font-black text-orange-800 uppercase text-xs tracking-widest flex items-center gap-2 opacity-50 z-10"><Database className="w-4 h-4"/> Datový segment</div>
                <div className="font-mono text-sm text-orange-900 bg-white/50 p-3 rounded-xl border border-orange-200 shadow-sm leading-relaxed text-center md:text-left mt-2">
                   8: 5 (První číslo)<br/>
                   9: 7 (Druhé číslo)<br/>
                   10: 12 (Výsledek součtu)
                </div>
             </div>
          </div>
           
           <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-4">
              <h3 className="font-black text-slate-800 mb-4 uppercase text-sm border-b pb-2">Jak to funguje?</h3>
              <ul className="text-sm text-slate-600 space-y-3 font-medium">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></div> Von Neumannova architektura nerozlišuje hardwarově instrukce od dat - obojí leží ve stejné paměti jako sekvence nul a jedniček.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></div> Aby v tom nebyl zmatek, operační systém a překladač si blok v paměti logicky rozdělí na segmenty (Kód, Data).</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div> Procesor pak čte z Instrukčního segmentu a na základě příkazů si sahá do Datového segmentu pro čísla.</li>
              </ul>
           </div>
        </div>
      </section>
      )}

      {/* Fáze 3: Zavedení programu OS */}
      {activeTab === 'load' && (
      <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-slate-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase flex items-center gap-2">
          Zavedení programu (Práce OS)
        </h2>
        <p className="text-slate-600 mb-8 font-medium">Než může procesor něco počítat, musí operační systém z disku nahrát program do RAM na správné adresy. Tuto práci si teď zkusíš ty. Klikni na blok v zásobníku dole a pak ho umísti do správné buňky v paměti.</p>
        
        {/* Úkol box */}
        <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-yellow-900 font-bold shadow-md relative">
           <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 opacity-20 rounded-bl-full rounded-tr-xl pointer-events-none"></div>
           {phase3CurrentTask < phase3Tasks.length ? (
             <>
               <div className="flex items-center gap-3">
                 <div className="bg-yellow-400 text-yellow-900 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner flex-shrink-0">
                   {phase3CurrentTask + 1}
                 </div>
                 <p className="text-lg">
                   Úkol: Vlož {phase3Tasks[phase3CurrentTask].type === 'code' ? 'do kódového' : 'do datového'} segmentu 
                   <strong className="mx-2 text-xl bg-white px-2 py-0.5 rounded shadow-sm text-yellow-900">{phase3Tasks[phase3CurrentTask].text}</strong> 
                   na adresu <strong className="text-xl bg-white px-2 py-0.5 rounded shadow-sm text-yellow-900">{phase3Tasks[phase3CurrentTask].targetAddr}</strong>.
                 </p>
               </div>
             </>
           ) : (
             <div className="w-full flex flex-col gap-4 py-2 relative z-20">
                <div className="flex items-center gap-3 text-green-700 text-xl font-black">
                   <CheckCircle2 className="w-8 h-8" /> 
                   Výborně! OS úspěšně zavedl celý program do RAM.
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200">
                   <p className="text-yellow-900 font-bold mb-2">Dokážeš odhadnout, co přesně tento program spočítá, zaměř se na číslo 3.14...</p>
                   <div className="group relative inline-flex items-center justify-center">
                     <button className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded-lg font-bold transition-colors">
                       <HelpCircle className="w-4 h-4" /> Nápověda
                     </button>
                     <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 text-white text-sm p-3 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
                        Vzpomeň si na geometrii: Který vzorec obsahuje konstantu Pi (3.14)? 2 * π * r ...
                     </div>
                   </div>
                </div>
             </div>
           )}
        </div>
        
        {phase3Error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 font-bold rounded-xl flex items-center gap-2 animate-bounce border border-red-200 shadow-md">
            <AlertTriangle className="w-5 h-5" /> {phase3Error}
          </div>
        )}

        <div className="flex flex-col gap-8 w-full">
           {/* RAM Grid */}
           <div className="w-full bg-slate-200 rounded-3xl overflow-hidden flex flex-col xl:flex-row shadow-inner border-[6px] border-slate-300">
               {/* Instrukce 0-4 */}
               <div className="flex-[2] flex flex-col border-r-4 border-slate-300">
                  <div className="w-full text-center py-2 bg-sky-200/50 font-black text-sky-800 uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-2 border-b-2 border-slate-300/30">
                    <Cpu className="w-4 h-4"/> Kódový segment
                  </div>
                  <div className="flex flex-col md:flex-row w-full h-full">
                    {[0,1,2,3,4].map((addr) => (
                       <div 
                         key={addr} 
                         onClick={() => handlePhase3CellClick(addr)}
                         className={`flex-1 border-b-2 md:border-b-0 md:border-r-2 border-slate-300/30 p-2 lg:p-4 flex flex-col items-center gap-2 transition-colors min-h-[100px] justify-center cursor-pointer 
                           ${phase3Placed[addr] ? 'bg-sky-100' : 'bg-sky-50 hover:bg-white border-2 border-transparent hover:border-sky-400'}`}
                       >
                          <div className="font-mono text-[10px] text-sky-600 font-bold opacity-70 bg-white/80 px-2 py-0.5 rounded shadow-sm w-full text-center mb-1">Adr. {addr}</div>
                          {phase3Placed[addr] ? (
                            <div className="bg-white border-2 border-sky-400 font-bold font-mono text-sky-900 px-2 py-2 rounded-xl shadow-md w-full text-center animate-in zoom-in text-xs xl:text-sm">
                              {phase3Placed[addr]}
                            </div>
                          ) : (
                            <div className="w-full h-10 border-2 border-dashed border-sky-300 rounded-xl bg-white/30 flex items-center justify-center text-sky-400/50 text-[10px] uppercase font-bold">
                              Volné
                            </div>
                          )}
                       </div>
                    ))}
                  </div>
               </div>
               
               {/* Data 10-14 */}
               <div className="flex-[2] flex flex-col border-l-4 border-slate-300">
                  <div className="w-full text-center py-2 bg-orange-200/50 font-black text-orange-800 uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-2 border-b-2 border-slate-300/30">
                    <Database className="w-4 h-4"/> Datový segment
                  </div>
                  <div className="flex flex-col md:flex-row w-full h-full">
                    {[10,11,12,13,14].map((addr) => (
                       <div 
                         key={addr} 
                         onClick={() => handlePhase3CellClick(addr)}
                         className={`flex-1 border-b-2 md:border-b-0 md:border-r-2 border-slate-300/30 p-2 lg:p-4 flex flex-col items-center gap-2 transition-colors min-h-[100px] justify-center cursor-pointer 
                           ${phase3Placed[addr] ? 'bg-orange-100' : 'bg-orange-50 hover:bg-white border-2 border-transparent hover:border-orange-400'}`}
                       >
                          <div className="font-mono text-[10px] text-orange-600 font-bold opacity-70 bg-white/80 px-2 py-0.5 rounded shadow-sm w-full text-center mb-1">Adr. {addr}</div>
                          {phase3Placed[addr] ? (
                            <div className="bg-white border-2 border-orange-400 font-black font-mono text-orange-900 px-2 py-2 rounded-xl shadow-md w-full text-center animate-in zoom-in text-sm xl:text-lg">
                              {phase3Placed[addr]}
                            </div>
                          ) : (
                            <div className="w-full h-10 border-2 border-dashed border-orange-300 rounded-xl bg-white/30 flex items-center justify-center text-orange-400/50 text-[10px] uppercase font-bold">
                              Volné
                            </div>
                          )}
                       </div>
                    ))}
                  </div>
               </div>
           </div>

           {/* Pool bloků k umístění */}
           {phase3CurrentTask < phase3Tasks.length && (
             <div className="bg-slate-100 p-6 rounded-3xl border-4 border-slate-200 shadow-inner">
               <h3 className="text-center font-bold text-slate-500 uppercase tracking-widest text-xs mb-4">Zásobník programu (Klikni pro výběr)</h3>
               <div className="flex flex-wrap justify-center gap-3">
                 {OS_TASKS_DATA.filter(t => !Object.values(phase3Placed).includes(t.item)).map(item => (
                   <button
                     key={item.id}
                     onClick={() => {
                        setPhase3SelectedId(item.id);
                        setPhase3Error(null);
                     }}
                     className={`px-4 py-3 rounded-xl font-mono font-bold shadow-md transition-all border-2 active:scale-95 text-sm
                       ${item.type === 'code' ? 'bg-sky-50 text-sky-800' : 'bg-orange-50 text-orange-800'}
                       ${phase3SelectedId === item.id ? 'ring-4 ring-offset-2 ring-yellow-400 border-transparent scale-110' : 'border-slate-300 hover:border-slate-400 hover:-translate-y-1'}
                     `}
                   >
                     {item.item}
                   </button>
                 ))}
               </div>
             </div>
           )}
        </div>
      </section>
      )}

      {/* Fáze 4: Interaktivní Editor RAM */}
      {activeTab === 'program' && (
      <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-slate-100 relative overflow-hidden mb-16 animate-in fade-in slide-in-from-bottom-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase flex items-center gap-2">
          Naprogramuj paměť sám (Strojový kód)
        </h2>
        <p className="text-slate-600 mb-6 font-medium">
          Nyní jsi ty operačním systémem. Do Instrukčního segmentu musíš naskládat správné příkazy (instrukce) a <strong>zadat správné adresy</strong> datových buněk.
        </p>
        
        <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-xl mb-8 flex gap-3 text-orange-900 font-medium">
           <AlertTriangle className="w-6 h-6 flex-shrink-0 text-orange-500" />
           <p><strong>Zadání:</strong> Máš v datové části (od adresy 8) uložená dvě čísla (5 a 7). Tvým úkolem je sečíst je a výsledek zapsat na prázdnou adresu 10. Použij posloupnost: Načíst (LOAD) → Přičíst (ADD) → Uložit výsledek (STORE) → Ukončit (HALT).</p>
        </div>

        <div className="w-full bg-slate-200 rounded-3xl overflow-hidden flex flex-col xl:flex-row shadow-inner border-[6px] border-slate-300">
             {/* Instrukce 0-3 */}
             <div className="flex-[2] flex flex-col border-r-4 border-slate-300">
                <div className="w-full text-center py-2 bg-sky-200/50 font-black text-sky-800 uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-2 border-b-2 border-slate-300/30">
                  <Cpu className="w-4 h-4"/> Kódový segment
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                  {progInst.map((inst, idx) => (
                     <div key={idx} className="flex-1 bg-sky-50 border-b-2 md:border-b-0 md:border-r-2 border-slate-300/30 p-4 md:p-3 lg:p-4 flex flex-col items-center gap-2 hover:bg-sky-100 transition-colors">
                        <div className="font-mono text-xs text-sky-600 font-bold opacity-70 bg-white px-2 py-1 rounded shadow-sm w-full text-center">Adresa {idx}</div>
                        <div className="w-full flex flex-col gap-2 mt-2">
                           <select 
                             className="w-full text-xs lg:text-sm font-mono p-2 rounded-lg border-2 border-sky-200 outline-none focus:border-sky-500 bg-white shadow-sm"
                             value={inst.op}
                             onChange={(e) => handleProgChange(idx, 'op', e.target.value)}
                           >
                             <option value="">-- Vyber --</option>
                             <option value="LOAD">LOAD</option>
                             <option value="ADD">ADD</option>
                             <option value="STORE">STORE</option>
                             <option value="HALT">HALT</option>
                           </select>
                           <input 
                             type="text" 
                             className="w-full text-xs lg:text-sm font-mono p-2 rounded-lg border-2 border-sky-200 text-center uppercase outline-none focus:border-sky-500 disabled:opacity-50 disabled:bg-slate-50 bg-white shadow-sm" 
                             placeholder="Cílová adr." 
                             maxLength={2}
                             value={inst.arg}
                             onChange={(e) => handleProgChange(idx, 'arg', e.target.value)}
                             disabled={inst.op === 'HALT' || inst.op === ''}
                           />
                        </div>
                     </div>
                  ))}
                </div>
             </div>
             
             {/* Mezera */}
             <div className="w-full h-8 xl:h-auto xl:w-10 bg-slate-300 opacity-60 flex items-center justify-center shadow-inner">
                 <span className="text-slate-500 font-black tracking-widest leading-3 xl:rotate-90">...</span>
             </div>
             
             {/* Data 8-10 */}
             <div className="flex-[1.5] flex flex-col border-l-4 border-slate-300">
                <div className="w-full text-center py-2 bg-orange-200/50 font-black text-orange-800 uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-2 border-b-2 border-slate-300/30">
                  <Database className="w-4 h-4"/> Datový segment
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                  {progData.map(d => (
                     <div key={d.addr} className="flex-1 bg-orange-50 border-b-2 md:border-b-0 md:border-r-2 border-slate-300/30 p-4 flex flex-col items-center justify-center hover:bg-orange-100 transition-colors">
                        <div className="font-mono text-xs text-orange-600 font-bold opacity-70 bg-white px-2 py-1 rounded shadow-sm w-full text-center">Adresa {d.addr}</div>
                        <div className="font-mono text-xl lg:text-2xl font-black text-orange-900 bg-white/80 p-2 rounded-xl border border-orange-200 shadow-sm w-full text-center mt-4">
                           {d.val || '?'}
                        </div>
                     </div>
                  ))}
                </div>
             </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button 
            onClick={verifyProgram}
            className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-lg"
          >
             <Zap className="w-5 h-5 text-yellow-400" /> Spustit simulaci v CPU
          </button>
          
          {simResult === 'success' && (
            <div className="bg-green-100 text-green-800 font-bold p-4 rounded-xl flex items-center gap-3 border-2 border-green-200 animate-in zoom-in w-full max-w-2xl justify-center">
              <CheckCircle2 className="w-6 h-6" /> {simMessage}
            </div>
          )}
          {simResult === 'error' && (
            <div className="bg-red-100 text-red-800 font-bold p-4 rounded-xl flex items-center gap-3 border-2 border-red-200 animate-in zoom-in w-full max-w-2xl justify-center">
              <AlertTriangle className="w-6 h-6" /> {simMessage}
            </div>
          )}
        </div>
      </section>
      )}

    </div>
  );
};

export default RamSimulatorChapter;
