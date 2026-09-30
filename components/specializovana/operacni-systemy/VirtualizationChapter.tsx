import React, { useState, useEffect } from 'react';
import { ArrowLeft, Monitor, Server, Layers, Power, CheckSquare, Square, Zap, Info, ShieldAlert, Wifi, MousePointer2, Save, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface VirtualizationChapterProps {
  onBack: () => void;
}

const TheoryTab = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const getLayerStyle = (layerName: string) => {
    const isHovered = hoveredLayer === layerName;
    const isDimmed = hoveredLayer !== null && hoveredLayer !== layerName;
    return `transition-all duration-300 ${isDimmed ? 'opacity-50 scale-95' : 'opacity-100'} ${isHovered ? 'scale-105 shadow-xl ring-4 ring-indigo-200 z-50' : 'shadow-md z-10'}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-500" /> Úvod do virtualizace
        </h2>
        <p className="text-slate-600 font-medium leading-relaxed mb-4">
          Z minulých lekcí víme, že operační systém má plnou kontrolu nad hardwarem. Často je však žádoucí spustit více izolovaných operačních systémů (například Windows a Linux) na jednom fyzickém počítači současně. K tomu slouží technologie zvaná <strong>virtualizace</strong>.
        </p>
        
        <div className="bg-indigo-50 text-indigo-900 p-6 rounded-2xl font-bold italic border-l-4 border-indigo-400 mb-6 flex gap-4 items-start">
          <Monitor className="w-8 h-8 text-indigo-500 flex-shrink-0" />
          <p>
            Základním principem virtualizace je abstrakce hardwarových prostředků. Speciální vrstva softwaru (Hypervizor) předkládá hostovanému systému standardizovaný virtuální hardware.
          </p>
        </div>

        <p className="text-slate-600 font-medium leading-relaxed mb-6">
          Hostovaný operační systém nemá přímý přístup k fyzickému hardwaru. Využívá virtuální procesor, virtuální operační paměť a místo fyzického pevného disku zapisuje data do předpřipraveného souboru (např. VDI nebo VMDK) uloženého na hostitelském disku.
        </p>

        {/* GRAFIKA VIRTUALIZACE */}
        <div className="my-10 p-8 bg-slate-50 rounded-3xl relative overflow-hidden shadow-inner border-2 border-slate-200">
          <h3 className="text-center text-slate-500 font-bold tracking-widest uppercase mb-8 text-sm relative z-10">Architektura virtuálního prostředí (Typ 2)</h3>
          
          <div className="flex flex-col items-center gap-3 relative z-10 font-medium">
            
            {/* VMs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center relative ${getLayerStyle('vms')}`}
              onMouseEnter={() => setHoveredLayer('vms')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <div className="w-full max-w-xs bg-emerald-50 border-2 border-emerald-400 p-4 rounded-xl text-center shadow-sm">
                <div className="text-4xl mb-2 drop-shadow-sm">🐧</div>
                <h4 className="font-black text-emerald-700">Linux Mint</h4>
                <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest mt-1">Hostovaný OS</p>
              </div>
            </div>

            {/* Hypervisor */}
            <div 
              className={`w-full max-w-2xl bg-indigo-600 border-2 border-indigo-400 p-5 rounded-xl text-center relative ${getLayerStyle('hypervisor')}`}
              onMouseEnter={() => setHoveredLayer('hypervisor')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <h4 className="font-black text-white text-xl tracking-wider">HYPERVIZOR</h4>
              <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mt-1">Nástroj pro virtualizace (VirtualBox)</p>
            </div>

            {/* Host OS */}
            <div 
              className={`w-full max-w-2xl bg-blue-100 border-2 border-blue-400 p-4 rounded-xl text-center relative ${getLayerStyle('hostos')}`}
              onMouseEnter={() => setHoveredLayer('hostos')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <h4 className="font-bold text-blue-900">Hostitelský OS (Windows)</h4>
            </div>

            {/* Hardware */}
            <div 
              className={`w-full max-w-2xl bg-slate-200 border-2 border-slate-300 p-4 rounded-xl text-center flex flex-wrap justify-center gap-4 sm:gap-8 relative ${getLayerStyle('hardware')}`}
              onMouseEnter={() => setHoveredLayer('hardware')}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">CPU: Intel Core i7</span>
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">RAM: 16 GB</span>
              <span className="font-mono text-slate-700 text-xs font-bold bg-white px-3 py-1 rounded-md border border-slate-300 shadow-sm">DISK: 1 TB SSD</span>
            </div>
          </div>
          
          {/* Detail Panel */}
          <div className="mt-8 h-32 bg-white rounded-2xl border-2 border-indigo-100 p-6 flex items-center justify-center text-center transition-all duration-300 shadow-sm">
            {!hoveredLayer && (
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 text-indigo-400" /> Najeďte myší na jednotlivé vrstvy pro zobrazení detailů
              </p>
            )}
            {hoveredLayer === 'vms' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-emerald-700 mb-2">Hostované systémy (Guests)</h4>
                <p className="text-slate-600 text-sm">Zcela izolovaná virtuální prostředí. Myslí si, že běží na skutečném hardwaru, ale ve skutečnosti komunikují s hypervizorem.</p>
              </div>
            )}
            {hoveredLayer === 'hypervisor' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-indigo-700 mb-2">Hypervizor</h4>
                <p className="text-slate-600 text-sm">Klíčová mezivrstva. Překládá požadavky hostovaných systémů a přiděluje jim potřebný výkon (procesor, paměť) z hostitelského počítače.</p>
              </div>
            )}
            {hoveredLayer === 'hostos' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-blue-800 mb-2">Hostitelský OS (Host)</h4>
                <p className="text-slate-600 text-sm">Váš hlavní operační systém (např. Windows na školním PC). Řídí fyzický hardware a hypervizor v něm běží jako běžná aplikace.</p>
              </div>
            )}
            {hoveredLayer === 'hardware' && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <h4 className="font-bold text-slate-700 mb-2">Fyzický Hardware</h4>
                <p className="text-slate-600 text-sm">Skutečné součástky vašeho počítače. Jejich výkon je sdílen mezi hlavní operační systém a všechny spuštěné virtuální stroje.</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-2 border-b pb-2">Hostitelský OS (Host)</h3>
            <p className="text-sm text-slate-600">Primární operační systém, který je přímo nainstalován na hardwaru počítače (například instalace Windows na školním PC).</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 flex flex-col">
            <h3 className="font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-2">Hypervizor</h3>
            <p className="text-sm text-indigo-700">Nástroj zajišťující virtualizaci (např. VirtualBox nebo VMware). Přerozděluje výkon fyzického procesoru a paměti virtuálním strojům.</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col">
            <h3 className="font-bold text-emerald-800 mb-2 border-b border-emerald-200 pb-2">Hostovaný OS (Guest)</h3>
            <p className="text-sm text-emerald-700">Operační systém běžící ve virtuálním prostředí. K hardwaru nepřistupuje přímo, ale prostřednictvím hypervizoru.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WORKSHEET_STEPS = [
  { 
    id: 'w1', 
    text: 'Stáhněte a nainstalujte Oracle VM VirtualBox.', 
    explanation: 'VirtualBox je tzv. Hypervizor typu 2. Znamená to, že je to běžná aplikace běžící nad vaším stávajícím (hostitelským) operačním systémem, která dokáže emulovat hardware a spouštět další (hostované) systémy.' 
  },
  { 
    id: 'w2', 
    text: 'Stáhněte si instalační obraz (ISO) operačního systému ReactOS (má pouze kolem 150 MB a stáhne se za okamžik).', 
    explanation: 'ISO soubor je přesná digitální kopie optického disku (CD/DVD). Obsahuje všechny instalační soubory systému přesně v takové podobě, v jaké by byly vypáleny na fyzickém nosiči.' 
  },
  { 
    id: 'w3', 
    text: 'Ve VirtualBoxu vytvořte "Nový" virtuální stroj. Pojmenujte ho ve formátu "ReactOS - Příjmení" a jako Typ a Verzi vyberte "Windows XP" nebo "Windows 2003".', 
    explanation: 'Pojmenování stroje podle vašeho příjmení je klíčové pro pořádek na sdílených školních počítačích. Volba správného typu a verze pak říká VirtualBoxu, jaký fyzický hardware má emulovat (např. typ síťové karty nebo řadiče disku), aby s ním byl systém kompatibilní.' 
  },
  { 
    id: 'w4', 
    text: 'Vyhraďte virtuálnímu stroji 1 GB (1024 MB) RAM. Tento systém je extrémně nenáročný.', 
    explanation: 'Tato paměť se "odkrojí" z vaší fyzické paměti (RAM) a propůjčí se virtuálnímu stroji. Jakmile stroj vypnete, paměť se vašemu hlavnímu systému opět vrátí.' 
  },
  { 
    id: 'w5', 
    text: 'Vytvořte virtuální pevný disk (VDI) o velikosti pouhé 2 GB.', 
    explanation: 'VDI (Virtual Disk Image) je obrovský soubor ležící na vašem skutečném disku. Dynamická alokace znamená, že zpočátku zabere na vašem PC jen pár megabajtů a roste, až když do něj systém opravdu něco zapisuje.' 
  },
  { 
    id: 'w6', 
    text: 'V Nastavení -> Úložiště připojte stažený soubor ISO (ReactOS) do virtuální optické mechaniky.', 
    explanation: 'Stejně jako u starých počítačů musíte před instalací systému fyzicky vložit CD do mechaniky, i tady musíte virtuální CD (ISO obraz) vložit do emulované optické mechaniky.' 
  },
  { 
    id: 'w7', 
    text: 'Spusťte stroj. Projděte modrým textovým instalátorem (stačí potvrzovat Enterem pro zformátování disku a kopírování souborů).', 
    explanation: 'Zde vidíte skutečnou instalaci. Probíhá formátování (vytvoření souborového systému na virtuálním disku) a kopírování běhových souborů, aby mohl systém následně fungovat bez instalačního CD.' 
  },
  { 
    id: 'w8', 
    text: 'Po dokončení instalace vás systém vyzve k restartu. Nyní vás přivítá grafická plocha nainstalovaná za méně než minutu!', 
    explanation: 'Virtuální stroj se chová jako skutečné PC, takže po instalaci se musí restartovat a následně nabootuje svůj nově nahraný zavaděč z (virtuálního) pevného disku.' 
  },
  { 
    id: 'w9', 
    text: 'Úklid: Vypněte stroj. V levém menu VirtualBoxu na něj klikněte pravým tlačítkem, zvolte "Odstranit" a bezpodmínečně vyberte "Smazat všechny soubory".', 
    explanation: 'Na rozdíl od odinstalace skutečného OS stačí u virtualizace smazat jednu složku na disku (ve které se ukrývá VDI disk). Po systému nezbude v počítači ani stopa a uvolníte místo dalším studentům.' 
  },
];

const WORKSHEET_ADVANCED_STEPS = [
  { 
    id: 'a1', 
    text: 'Stáhněte si ISO obraz moderního operačního systému (např. Linux Mint XFCE).', 
    explanation: 'Na rozdíl od ReactOS je plnohodnotný moderní Linux mnohem větší (kolem 3 GB) a pro plynulý běh vyžaduje silnější virtuální hardware.' 
  },
  { 
    id: 'a2', 
    text: 'V průvodci vytvořením stroje přidělte systému minimálně 2 GB (2048 MB) RAM.', 
    explanation: 'Plnohodnotný moderní operační systém s grafickým uživatelským rozhraním potřebuje mnohem více operační paměti k tomu, aby se vyhnul tzv. "swapování" (odkládání dat na pomalý disk).' 
  },
  { 
    id: 'a2b', 
    text: 'Při tvorbě virtuálního pevného disku (VDI) zvolte velikost alespoň 25 GB.', 
    explanation: 'Zatímco ReactOS si vystačí s 2 GB, samotná instalace Linuxu Mint zabere na disku zhruba 15 GB. Pokud byste zvolili menší disk, instalátor by v polovině spadl kvůli nedostatku místa.' 
  },
  { 
    id: 'a3', 
    text: 'Stroj NEZAPÍNEJTE! Místo toho klikněte na žlutou ikonu "Nastavení" a přejděte do sekce "Systém -> Procesor". Zvyšte počet jader na 2 (nebo 4, pokud to váš PC dovolí).', 
    explanation: 'Více jader CPU umožní virtuálnímu systému zpracovávat více procesů najednou. Zelená zóna na posuvníku ukazuje bezpečný počet jader, který můžete stroji přidělit, aniž by to ohrozilo běh vašeho hlavního systému Windows.' 
  },
  { 
    id: 'a4', 
    text: 'V Nastavení přejděte do sekce "Obrazovka" a zvyšte Video paměť (VRAM) na 128 MB (nebo maximum, které posuvník dovolí).', 
    explanation: 'Video paměť se stará o vykreslování oken, animací a myši uvnitř virtuálního stroje. Bez dostatku VRAM bude pohyb oken "trhaný".' 
  },
  { 
    id: 'a5', 
    text: 'V sekci "Obrazovka" zaškrtněte možnost "Povolit 3D akceleraci".', 
    explanation: 'Tato funkce předá část vykreslování grafiky z virtuálního (pomalého) procesoru přímo vaší skutečné (fyzické) grafické kartě. To razantně zrychlí celou plochu virtuálního systému.' 
  },
  { 
    id: 'a6', 
    text: 'Připojte stažené ISO do mechaniky a systém spusťte. Otestujte, jak plynule systém běží díky vašemu pokročilému nastavení.', 
    explanation: 'Správné ladění virtuálního hardwaru je klíčovou schopností každého administrátora – hledáme rovnováhu mezi tím, aby měl virtuální stroj dostatek výkonu, ale aby zároveň nezpomalil náš hostitelský počítač.' 
  },
  { 
    id: 'a7', 
    text: 'Úklid: Systém vypněte, klikněte na něj ve VirtualBoxu pravým tlačítkem a trvale jej odstraňte (Smazat všechny soubory).', 
    explanation: 'Tento krok je u sdílených počítačů extrémně důležitý, jelikož Linuxový VDI disk může rychle narůst do desítek gigabajtů a brzy by na školních discích došlo místo.' 
  },
];

const SCENARIOS = [
  {
    id: 's1',
    title: 'Uzamčení ukazatele myši',
    icon: MousePointer2,
    problem: 'Kurzor myši je uzamčen uvnitř okna virtuálního stroje a nelze jej přesunout zpět do hostitelského systému (Windows).',
    solution: 'Stiskněte tzv. Host klávesu. U VirtualBoxu je to ve výchozím nastavení Pravý CTRL. Tím uvolníte kurzor myši a klávesnici pro potřeby hostitelského systému.'
  },
  {
    id: 's2',
    title: 'Absence síťového připojení',
    icon: Wifi,
    problem: 'Hostitelský počítač je připojen k síti, avšak virtuální systém hlásí absenci síťového připojení a neumožňuje prohlížení webu či instalaci aktualizací.',
    solution: 'Ověřte nastavení virtuálního stroje (ve vypnutém stavu) v sekci Nastavení -> Síť. Zkontrolujte, že je virtuální síťový adaptér povolen a nastaven na režim NAT. Pokud potřebujete, aby měl stroj vlastní IP adresu ve stejné fyzické síti, přepněte do režimu Síťový most (Bridged Adapter).'
  },
  {
    id: 's3',
    title: 'Omezená integrace systémů',
    icon: Layers,
    problem: 'Virtuální stroj běží v malém rozlišení, prostředí se zasekává a nelze používat sdílenou schránku či přenos souborů mezi hostitelským a hostovaným systémem.',
    solution: 'Řešením je instalace Přídavků pro hosta (Guest Additions). Za běhu virtuálního stroje vyberte v horním menu VirtualBoxu volbu Zařízení -> Vložit obraz CD Přídavků pro hosta. Uvnitř hostovaného OS instalaci dokončete. Poté v Nastavení -> Obecné -> Pokročilé povolte Obousměrnou sdílenou schránku.'
  }
];

const VirtualizationChapter: React.FC<VirtualizationChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulation' | 'worksheet'>('theory');

  // Worksheet State using useLocalStorage
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('virtualization_checks', {});
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('virtualization_answers', {});
  const [revealedScenarios, setRevealedScenarios] = useState<Record<string, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [studentName, setStudentName] = useLocalStorage<string>('virtualization_name', '');

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleStepExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const downloadWorksheet = () => {
    // Generate an HTML file that Google Docs can easily parse and import
    const date = new Date().toLocaleDateString('cs-CZ');
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Pracovní list - Virtualizace</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          h2 { color: #34495e; margin-top: 30px; }
          .task { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px; }
          .question { font-weight: bold; margin-bottom: 10px; }
          .answer { background-color: #fff; padding: 10px; border: 1px solid #ddd; min-height: 50px; }
          .step { margin-bottom: 10px; }
          .checked { color: #27ae60; font-weight: bold; }
          .unchecked { color: #7f8c8d; }
        </style>
      </head>
      <body>
        <h1>Pracovní list: Virtualizace</h1>
        <p><strong>Jméno a příjmení:</strong> ${studentName || '........................................'}</p>
        <p><strong>Datum:</strong> ${date}</p>

        <h2>1. Praktická instalace (Odškrtávací seznam)</h2>
    `;

    WORKSHEET_STEPS.forEach(step => {
      const isChecked = checkedItems[step.id];
      htmlContent += `
        <div class="step">
          <span class="${isChecked ? 'checked' : 'unchecked'}">[ ${isChecked ? 'X' : ' '} ]</span> ${step.text}
        </div>
      `;
    });

    htmlContent += `<h2>2. Pokročilá instalace (Ladění výkonu)</h2>`;

    WORKSHEET_ADVANCED_STEPS.forEach(step => {
      const isChecked = checkedItems[step.id];
      htmlContent += `
        <div class="step">
          <span class="${isChecked ? 'checked' : 'unchecked'}">[ ${isChecked ? 'X' : ' '} ]</span> ${step.text}
        </div>
      `;
    });

    htmlContent += `<h2>3. Řešení krizových scénářů</h2>`;

    SCENARIOS.forEach(sc => {
      const studentAnswer = answers[sc.id] || '';
      htmlContent += `
        <div class="task">
          <div class="question">Scénář: ${sc.title}</div>
          <p><em>Problém: ${sc.problem}</em></p>
          <div class="question">Vaše řešení:</div>
          <div class="answer">${studentAnswer.replace(/\n/g, '<br/>') || '<em>Bez odpovědi</em>'}</div>
        </div>
      `;
    });

    htmlContent += `
      </body>
      </html>
    `;

    // Create blob and trigger download
    // Using .html extension - when uploaded to Google Drive, it converts to Google Docs perfectly.
    // Alternatively, saving as .doc (Word) forces MS Word/Google Docs to open it and parse the HTML.
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Virtualizace_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr kapitol
        </button>

        <div className="bg-white p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-2 sticky top-4 z-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Info className="w-5 h-5" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'simulation' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Zap className="w-5 h-5" /> Typ 1 vs Typ 2
          </button>
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'worksheet' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <CheckSquare className="w-5 h-5" /> Pracovní list
          </button>
        </div>

        {activeTab === 'theory' && <TheoryTab />}

                        {activeTab === 'simulation' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
              <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase">Srovnání architektury hypervizorů</h2>
              <p className="text-slate-600 font-medium max-w-3xl mx-auto mb-8">
                Hypervizory se dělí do dvou hlavních kategorií. <strong>Typ 2 (Hosted)</strong>, zástupcem je například VirtualBox, běží nad standardním operačním systémem. Je vhodný pro testování a vývoj. <strong>Typ 1 (Bare Metal)</strong> je určen pro produkční servery. Instaluje se přímo na fyzický hardware, čímž eliminuje režii hostitelského operačního systému a maximalizuje výkon virtuálních strojů.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative mt-8">
                
                {/* TYPE 2 (Desktop) */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col items-center shadow-sm">
                  <h3 className="text-xl font-black text-indigo-700 uppercase mb-2">Typ 2: Běžící nad OS</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Příklad: VirtualBox, VMware Workstation</p>
                  
                  <div className="w-full flex flex-col items-center gap-3 relative font-medium">
                    {/* VMs */}
                    <div className="flex gap-4 w-full justify-center">
                      <div className="flex-1 max-w-[140px] p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center text-emerald-900 text-sm shadow-md">
                        <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                        Linux
                      </div>
                      <div className="flex-1 max-w-[140px] p-4 bg-sky-50 border-2 border-sky-400 rounded-xl text-center text-sky-900 text-sm shadow-md">
                         <div className="text-2xl mb-1 drop-shadow-sm">🪟</div>
                        Windows
                      </div>
                    </div>
                    
                    {/* Hypervisor */}
                    <div className="w-full max-w-sm p-4 bg-indigo-600 border-2 border-indigo-400 rounded-xl text-center text-white font-bold shadow-md">
                      Hypervizor Typu 2
                    </div>
                    
                    {/* Host OS */}
                    <div className="w-full max-w-sm p-4 bg-blue-100 border-2 border-blue-400 rounded-xl text-center text-blue-900 font-bold shadow-md">
                      Hostitelský OS
                    </div>
                    
                    {/* Hardware */}
                    <div className="w-full max-w-sm p-4 bg-slate-200 border-2 border-slate-300 rounded-xl text-center text-slate-700 font-bold shadow-md">
                      Fyzický Hardware
                    </div>
                  </div>
                </div>

                {/* TYPE 1 (Bare Metal) */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col items-center shadow-sm">
                  <h3 className="text-xl font-black text-rose-700 uppercase mb-2">Typ 1: Bare Metal</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Příklad: VMware ESXi, Proxmox VE</p>
                  
                  <div className="w-full flex flex-col items-center gap-3 relative h-full justify-end font-medium">
                    {/* VMs */}
                    <div className="flex gap-3 w-full justify-center">
                      <div className="flex-1 max-w-[110px] p-3 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center text-emerald-900 text-xs shadow-md">
                        <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                        <div className="font-black leading-tight">Linux VM</div>
                        <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-emerald-200 pt-1">Webserver</div>
                      </div>
                      <div className="flex-1 max-w-[110px] p-3 bg-sky-50 border-2 border-sky-400 rounded-xl text-center text-sky-900 text-xs shadow-md">
                         <div className="text-2xl mb-1 drop-shadow-sm">🪟</div>
                        <div className="font-black leading-tight">Windows VM</div>
                        <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-sky-200 pt-1">Databáze</div>
                      </div>
                      <div className="flex-1 max-w-[110px] p-3 bg-orange-50 border-2 border-orange-400 rounded-xl text-center text-orange-900 text-xs shadow-md">
                         <div className="text-2xl mb-1 drop-shadow-sm">🐧</div>
                        <div className="font-black leading-tight">Linux VM</div>
                        <div className="text-[10px] font-medium opacity-75 leading-tight mt-1 border-t border-orange-200 pt-1">Firewall</div>
                      </div>
                    </div>
                    
                    {/* Hypervisor */}
                    <div className="w-full max-w-sm p-4 bg-rose-600 border-2 border-rose-400 rounded-xl text-center text-white font-bold h-[100px] flex items-center justify-center flex-col shadow-md">
                      Hypervizor Typu 1
                      <span className="text-[10px] font-normal text-rose-100 uppercase tracking-widest mt-1">Běží přímo na hardwaru</span>
                    </div>
                    
                    {/* Hardware */}
                    <div className="w-full max-w-sm p-4 bg-slate-200 border-2 border-slate-300 rounded-xl text-center text-slate-700 font-bold shadow-md">
                      Fyzický Hardware
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 text-left flex gap-4">
                <Info className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Zásadní architektonický rozdíl</h4>
                  <p className="text-sm text-blue-800">
                    Diagram názorně ilustruje vrstvení technologií. U hypervizorů typu 2 musí veškerá komunikace s hardwarem procházet přes hostitelský operační systém, což způsobuje dodatečnou režii a snižuje celkový výkon. Z tohoto důvodu se v serverových prostředích standardně využívají hypervizory typu 1.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'worksheet' && (
          <WorksheetLayout
            title="Virtualizace"
            studentName={studentName}
            onStudentNameChange={setStudentName}
            onDownload={downloadWorksheet}
          >

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">1. Nasazení virtuálního stroje</h2>
              <p className="text-slate-500 font-medium mb-8">Následující postup vás provede kompletním procesem nasazení virtuálního počítače pomocí nástroje Oracle VM VirtualBox. Odškrtněte si každý úspěšně dokončený krok.</p>

              <div className="space-y-3 mb-12">
                {WORKSHEET_STEPS.map(step => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col rounded-xl border-2 transition-all ${checkedItems[step.id] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                  >
                    {/* Zobrazení kroku a checkboxu */}
                    <div 
                      onClick={() => toggleCheck(step.id)}
                      className="flex items-start gap-4 p-4 cursor-pointer"
                    >
                      {checkedItems[step.id] ? (
                        <CheckSquare className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`font-medium flex-1 ${checkedItems[step.id] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                        {step.text}
                      </span>
                      {step.explanation && (
                        <button 
                          onClick={(e) => toggleStepExpand(step.id, e)}
                          className="p-1 rounded-md hover:bg-slate-200/50 text-slate-500 transition-colors"
                        >
                          {expandedSteps[step.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                    
                    {/* Rozbalovací vysvětlení */}
                    {expandedSteps[step.id] && step.explanation && (
                      <div className="px-14 pb-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="p-4 bg-white/60 rounded-xl border border-slate-200/50 shadow-sm">
                          <h4 className="text-xs font-bold text-indigo-700 uppercase mb-1 flex items-center gap-2"><Info className="w-4 h-4"/> Detailní vysvětlení</h4>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed">{step.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">2. Pokročilá instalace (Ladění výkonu)</h2>
              <p className="text-slate-500 font-medium mb-8">Nyní si vyzkoušíme instalaci moderního operačního systému, který vyžaduje manuální konfiguraci přidělených prostředků pro plynulý běh.</p>

              <div className="space-y-3 mb-12">
                {WORKSHEET_ADVANCED_STEPS.map(step => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col rounded-xl border-2 transition-all ${checkedItems[step.id] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                  >
                    <div 
                      onClick={() => toggleCheck(step.id)}
                      className="flex items-start gap-4 p-4 cursor-pointer"
                    >
                      {checkedItems[step.id] ? (
                        <CheckSquare className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`font-medium flex-1 ${checkedItems[step.id] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                        {step.text}
                      </span>
                      {step.explanation && (
                        <button 
                          onClick={(e) => toggleStepExpand(step.id, e)}
                          className="p-1 rounded-md hover:bg-slate-200/50 text-slate-500 transition-colors"
                        >
                          {expandedSteps[step.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                    
                    {expandedSteps[step.id] && step.explanation && (
                      <div className="px-14 pb-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="p-4 bg-white/60 rounded-xl border border-slate-200/50 shadow-sm">
                          <h4 className="text-xs font-bold text-indigo-700 uppercase mb-1 flex items-center gap-2"><Info className="w-4 h-4"/> Detailní vysvětlení</h4>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed">{step.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-rose-500" /> 3. Krizové scénáře (Řešení problémů)
              </h2>
              <p className="text-slate-500 font-medium mb-8">Při provozu virtualizovaných systémů můžete narazit na specifické problémy. Zkuste identifikovat příčinu a napište vlastní řešení do pole níže. Poté si můžete ověřit správný postup.</p>

              <div className="grid grid-cols-1 gap-8">
                {SCENARIOS.map(sc => {
                  const Icon = sc.icon;
                  const isRevealed = revealedScenarios[sc.id];
                  return (
                    <div key={sc.id} className="w-full p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row gap-6">
                      
                      {/* Zadání a řešení */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-500 border border-slate-200">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-black text-slate-800 text-lg">{sc.title}</h3>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                          <strong>Problém k vyřešení:</strong> {sc.problem}
                        </p>

                        {!isRevealed ? (
                          <button 
                            onClick={() => setRevealedScenarios(prev => ({ ...prev, [sc.id]: true }))}
                            className="self-start text-xs font-bold text-sky-600 bg-sky-50 px-4 py-2 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors uppercase tracking-widest mt-auto"
                          >
                            Zobrazit vzorové řešení (nápovědu)
                          </button>
                        ) : (
                          <div className="mt-auto p-4 bg-sky-50 rounded-xl border border-sky-200">
                             <h4 className="font-black text-sky-800 text-xs uppercase mb-1">Správný postup:</h4>
                             <p className="text-sm text-sky-900 font-medium">{sc.solution}</p>
                          </div>
                        )}
                      </div>

                      {/* Odpověď studenta */}
                      <div className="flex-1 flex flex-col">
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Moje řešení</label>
                        <textarea 
                          value={answers[sc.id] || ''}
                          onChange={(e) => handleAnswerChange(sc.id, e.target.value)}
                          placeholder="Jak byste tento problém vyřešili?"
                          className="w-full flex-1 min-h-[150px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
                        />
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </WorksheetLayout>
        )}

      </div>
    </div>
  );
};

export default VirtualizationChapter;
