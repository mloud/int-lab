'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Layers, MonitorPlay, List, Key } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions, 
  PracticeLink 
} from './FsShared';
import { useRouter } from 'next/navigation';

import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ClipboardList, CheckSquare, Square } from 'lucide-react';

export default function DiskPartitionChapter({ onBack, onOpenBoot }: { onBack: () => void, onOpenBoot?: () => void }) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  // Worksheet State
  const [studentName, setStudentName] = useLocalStorage<string>('partition_name', '');
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('partition_answers', {});
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('partition_checks', {});

  const handleAnswerChange = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));
  const toggleCheck = (id: string) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const downloadWorksheet = () => {
    const date = new Date().toLocaleDateString('cs-CZ');
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Pracovní list - Dělení disku</title>
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
        <h1>Pracovní list: Správa a dělení disků v praxi</h1>
        <p><strong>Jméno a příjmení:</strong> ${studentName || '........................................'}</p>
        <p><strong>Datum:</strong> ${date}</p>

        <h2>1. Vytvoření datového disku (D:)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['p1'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p1'] ? 'X' : ' '} ]</span> Zmenšen systémový disk (C:) o 3000 MB</div>
          <div class="step"><span class="${checkedItems['p2'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p2'] ? 'X' : ' '} ]</span> Vytvořen nový oddíl (D:) pro Filmy a Hry</div>
          <div class="question">Jaká je výsledná kapacita (v MB), kterou ukazuje Windows v Průzkumníku? A proč to není přesně 3000 MB?</div>
          <div class="answer">${(answers['capacity'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>2. Došlo místo (Změna velikosti)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['p3'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p3'] ? 'X' : ' '} ]</span> Oddíl D: úspěšně rozšířen o další prostor.</div>
          <div class="question">S jakými problémy byste se setkali ve Správě disků, kdyby nealokované (volné) místo leželo na disku fyzicky PŘED vaším oddílem D:? Lze jednoduše rozšiřovat "doleva"?</div>
          <div class="answer">${(answers['expand_issue'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>3. Záloha (Z:) a Neviditelný Trezor (T:)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['p4'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p4'] ? 'X' : ' '} ]</span> Vytvořen oddíl Z: (Zálohy) a oddíl T: (Trezor).</div>
          <div class="step"><span class="${checkedItems['p5'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p5'] ? 'X' : ' '} ]</span> Oddílu T: bylo odstraněno písmeno, aby byl skrytý.</div>
          <div class="question">Ztratili jsme odstraněním písmene T: data na tomto oddílu? Jak se nyní disk chová z pohledu běžného uživatele či malwaru v Průzkumníkovi?</div>
          <div class="answer">${(answers['hidden_behavior'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>4. Připojení disku do složky (Mount Point)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['p6'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p6'] ? 'X' : ' '} ]</span> Oddíl připojen do prázdné složky C:\\Tajne.</div>
          <div class="step"><span class="${checkedItems['p7'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p7'] ? 'X' : ' '} ]</span> Vytvořen testovací soubor přes složku.</div>
          <div class="question">Popište scénář z praxe: Kdy je reálně výhodné připojit celý nový fyzický disk jen jako složku "Hry" na disku C: místo toho, abych mu dal nové písmeno D:?</div>
          <div class="answer">${(answers['mount_usage'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>5. Závěrečný úklid (Návrat do původního stavu)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['p8'] ? 'checked' : 'unchecked'}">[ ${checkedItems['p8'] ? 'X' : ' '} ]</span> Všechny testovací oddíly smazány a C: vráceno do původní podoby.</div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Deleni_Disku_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Layers },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
    { id: 'worksheet', label: 'Pracovní list', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={2}
      title="Dělení"
      highlight="disku"
      subtitle="Proč jeden fyzický disk rozdělujeme na více částí."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <TheoryCard icon={LayoutDashboard} title="Oddíly (Partitions)" letter="A" tone="amber">
            <p>
              Zcela nový, neformátovaný pevný disk (z výroby) představuje jednu velkou, souvislou oblast paměti bez jakékoliv logické struktury. Abychom na něj mohli ukládat soubory nebo nainstalovat operační systém, musíme tuto surovou kapacitu (tzv. <em>nealokovaný prostor</em>) nejprve rozčlenit na samostatné logické celky. Těmto celkům se odborně říká <strong>oddíly (partitions)</strong>.
            </p>

            <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200 mt-6 mb-6">
              <div className="max-w-3xl mx-auto">
                <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Surové sektory disku rozdělené do oddílů</h4>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 mb-6">
                  {[...Array(24)].map((_, i) => {
                    // Oddíl C: (prvních 10 sektorů)
                    const isC = i < 10;
                    // Oddíl D: (dalších 8 sektorů)
                    const isD = i >= 10 && i < 18;
                    
                    let bgClass = 'bg-slate-800 border-slate-900'; // nealokovano (zbytek)
                    let textTop = 'text-slate-500';
                    let textBot = 'text-slate-400';

                    if (isC) {
                      bgClass = 'bg-purple-500 border-purple-600 shadow-lg shadow-purple-200 z-10';
                      textTop = 'text-purple-100';
                      textBot = 'text-white';
                    } else if (isD) {
                      bgClass = 'bg-blue-500 border-blue-600 shadow-lg shadow-blue-200 z-10';
                      textTop = 'text-blue-100';
                      textBot = 'text-white';
                    }

                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-transform hover:scale-110 relative ${bgClass}`}
                      >
                        <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                        <div className={`text-[10px] font-bold ${textTop}`}>Sektor</div>
                        <div className={`text-xs font-black mt-1 ${textBot}`}>4 KB</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Legenda k oddílům */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-purple-500"></div>
                    <span className="text-sm font-bold text-slate-700">Logický disk (C:)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <span className="text-sm font-bold text-slate-700">Logický disk (D:)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-slate-800"></div>
                    <span className="text-sm font-bold text-slate-700">Nealokováno (černé místo)</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 mt-6 text-center max-w-xl mx-auto">
                  Namísto toho, aby měl každý soubor přístup na libovolný sektor fyzického disku, operační systém spojí např. prvních 18 milionů sektorů do jedné "ohrádky" a tu pojmenuje <strong>C:</strong>. Z pohledu uživatele se to pak tváří jako samostatný pevný disk.
                </p>

              </div>
            </div>

            <div className="mt-6">
              <Callout kind="info" title="Logický vs. Fyzický disk">
                <p>
                  Můžete mít jeden fyzický disk zapojený v počítači, ale v operačním systému uvidíte disky dva
                  (např. C: a D:). Každý z nich je jen logickým <strong>oddílem</strong> na tomtéž fyzickém disku.
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={List} title="Proč dělíme disk?" letter="B" tone="sky">
            <ul className="list-disc list-inside space-y-4">
              <li><strong>Bezpečnost dat:</strong> Pokud se zhroutí operační systém (obvykle na oddílu C:), můžete jej přeinstalovat, aniž byste přišli o data na druhém oddílu (D:).</li>
              <li><strong>Organizace:</strong> Oddělení systémových souborů od osobních (fotky, videa, dokumenty).</li>
              <li><strong>Více operačních systémů:</strong> Můžete mít na jednom disku nainstalovaný Windows i Linux.</li>
            </ul>
          </TheoryCard>

          <TheoryCard icon={MonitorPlay} title="Vztah k Operačnímu systému" letter="C" tone="purple">
            <p>
              Operační systém s oddíly velmi úzce pracuje. Při běžné instalaci Windows si instalátor disk tajně rozdělí na více částí, než kolik jich vy vidíte jako písmenka (C:):
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">1. EFI System Partition</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Malý skrytý oddíl (cca 100 MB). Počítač do něj "sáhne" jako první po zapnutí. Obsahuje tzv. zavaděč (bootloader), který umí nastartovat samotný Windows.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">2. Oddíl pro obnovení</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Skrytý oddíl obsahující nouzové nástroje od výrobce nebo Microsoftu. Slouží k opravě systému v případě, že běžný Windows nelze spustit.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-purple-800 text-sm uppercase tracking-wide mb-2">3. Systémový oddíl (C:)</h4>
                <p className="text-xs text-purple-700 leading-relaxed">Hlavní oddíl, který jako jediný běžně vidíte. Jsou na něm nainstalované Windows, vaše programy a osobní soubory.</p>
              </div>
            </div>
            
            {/* Visual Schema: Disk Management */}
            <div className="mt-8 bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-slate-500" />
                <span className="font-bold text-slate-700 text-sm">Správa disků (Windows Disk Management)</span>
              </div>
              <div className="p-4 sm:p-6 overflow-x-auto">
                <div className="min-w-[600px] flex border-2 border-slate-300 shadow-sm rounded-md overflow-hidden">
                  
                  {/* Left panel: Disk info */}
                  <div className="w-32 sm:w-40 bg-slate-100 border-r-2 border-slate-300 p-3 flex flex-col justify-center shrink-0">
                    <span className="font-bold text-slate-800 text-sm">Disk 0</span>
                    <span className="text-xs text-slate-600">Základní</span>
                    <span className="text-xs text-slate-600">476,94 GB</span>
                    <span className="text-xs text-emerald-600 font-bold mt-1">Online</span>
                  </div>
                  
                  {/* Right panel: Partitions */}
                  <div className="flex-1 bg-white p-3 flex gap-2">
                    
                    {/* EFI */}
                    <div className="w-24 bg-white border-2 border-slate-400 flex flex-col relative shrink-0">
                      <div className="h-1.5 w-full bg-blue-500 absolute top-0 left-0"></div>
                      <div className="p-2 pt-4 flex flex-col h-full text-center items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-800">100 MB</span>
                        <span className="text-[10px] text-slate-600">V pořádku (O. p. EFI systému)</span>
                      </div>
                    </div>
                    
                    {/* System C: */}
                    <div className="flex-1 bg-white border-2 border-slate-400 flex flex-col relative min-w-[200px]">
                      <div className="h-1.5 w-full bg-blue-500 absolute top-0 left-0"></div>
                      <div className="p-2 pt-4 flex flex-col h-full items-center justify-center text-center">
                        <span className="text-xs font-bold text-slate-800">Windows (C:)</span>
                        <span className="text-[11px] text-slate-800 font-medium mt-1">476,33 GB NTFS</span>
                        <span className="text-[10px] text-slate-600 mt-1 px-2 leading-tight">V pořádku (Spouštění, Stránkovací soubor, Sledování stavu, Primární oddíl)</span>
                      </div>
                    </div>

                    {/* Recovery */}
                    <div className="w-28 bg-white border-2 border-slate-400 flex flex-col relative shrink-0">
                      <div className="h-1.5 w-full bg-blue-500 absolute top-0 left-0"></div>
                      <div className="p-2 pt-4 flex flex-col h-full text-center items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-800">522 MB</span>
                        <span className="text-[10px] text-slate-600">V pořádku (Oddíl pro obnovení)</span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-xs font-bold text-slate-600">
                   <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Primární oddíl</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Callout kind="warning" title="Smazání skrytých oddílů">
                <p>
                  Pokud byste ve specializovaném programu na správu disků tyto skryté oddíly (např. EFI) omylem smazali, <strong>váš počítač už operační systém nenastartuje</strong>, i když by všechna data na disku C: zůstala neporušená.
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <RevealQuestions 
            questions={[
              {
                q: "Mohu mít v počítači 1 fyzický disk, ale systém mi ukazuje disky C: a D:?",
                a: "Ano, přesně to je dělení disku. Jeden fyzický disk je rozdělen na dva logické oddíly (C: a D:)."
              },
              {
                q: "Co se stane s mými fotkami na disku D:, když zformátuji disk C: kvůli přeinstalaci Windows?",
                a: "Data na disku D: zůstanou nedotčena. Formátování ovlivní pouze ten oddíl, který právě formátujete (tedy C:)."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="HRA" 
            title="Start operačního systému (Boot)" 
            desc="Podívejte se, jak počítač hledá oddíl, ze kterého může spustit operační systém." 
            icon={Key} 
            tone="rose" 
            onClick={() => {
               if(onOpenBoot) onOpenBoot();
               else router.push('/specializovana/operacni-systemy/boot');
            }} 
          />
        </div>
      )}

      {activeTab === 'worksheet' && (
        <WorksheetLayout
          title="Dělení disku a oddíly"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={downloadWorksheet}
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">1. Datový disk (Filmy a Hry)</h2>
            <p className="text-slate-500 font-medium mb-6">Nechceme mít data namíchaná se systémem. Otevřete Správu disků (<strong>Win + X</strong>).</p>
            
            <div className="space-y-3 mb-6">
              <div onClick={() => toggleCheck('p1')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p1'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p1'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p1'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Klikl/a jsem pravým na svazek (C:), zvolil "Zmenšit svazek" a zadal hodnotu 3000 MB (cca 3 GB).</span>
              </div>
              <div onClick={() => toggleCheck('p2')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p2'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p2'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p2'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Na uvolněném černém místě jsem vytvořil/a nový svazek, přiřadil/a písmeno D: (Data) a naformátoval/a.</span>
              </div>
            </div>

            <div className="mb-12">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Jaká je přesná výsledná kapacita disku D: v Průzkumníku? A proč to nejsou přesně 3 GB?</label>
              <textarea 
                value={answers['capacity'] || ''}
                onChange={(e) => handleAnswerChange('capacity', e.target.value)}
                placeholder="Zkuste vysvětlit rozdíl mezi GB a GiB, nebo režii souborového systému..."
                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
              />
            </div>


            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">2. Došlo místo (Změna velikosti)</h2>
            <p className="text-slate-500 font-medium mb-6">Disk D: se plní. Potřebujeme z C: ukrojit další místo a přidat ho k D:.</p>

            <div className="space-y-3 mb-6">
              <div onClick={() => toggleCheck('p3')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p3'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p3'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p3'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Zmenšil/a jsem C: o další 2000 MB. Poté jsem klikl/a pravým na D: -> "Rozšířit svazek" a volné místo připojil/a.</span>
              </div>
            </div>

            <div className="mb-12">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Lze ve Správě disků oddíl rozšiřovat "doleva" (když nealokované místo leží fyzicky PŘED ním)?</label>
              <textarea 
                value={answers['expand_issue'] || ''}
                onChange={(e) => handleAnswerChange('expand_issue', e.target.value)}
                placeholder="Jak se Správa disků chová, pokud je volné místo před oddílem, který chceme rozšířit?..."
                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
              />
            </div>


            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">3. Záloha (Z:) a Neviditelný Trezor (T:)</h2>
            <p className="text-slate-500 font-medium mb-6">Vytvoříme další 2 oddíly, z nichž jeden před uživatelem a viry (částečně) skryjeme.</p>

            <div className="space-y-3 mb-6">
              <div onClick={() => toggleCheck('p4')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p4'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p4'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p4'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Zmenšil/a jsem C: ještě o 2000 MB a vytvořil/a z nich dva oddíly po 1000 MB: Záloha (Z:) a Trezor (T:).</span>
              </div>
            </div>

            <div className="mb-12">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Ztratili jsme odebráním písmene na oddílu T: nějaká data? Co se stane, když oddíl nemá přiřazené písmeno?</label>
              <textarea 
                value={answers['hidden_behavior'] || ''}
                onChange={(e) => handleAnswerChange('hidden_behavior', e.target.value)}
                placeholder="Jak se disk aktuálně chová?..."
                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
              />
            </div>


            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">4. Připojení disku do složky (Mount Point)</h2>
            <p className="text-slate-500 font-medium mb-6">Disku nemusíme nutně dávat písmeno (D:). Můžeme oddíl vzít a naroubovat ho do existující prázdné složky na jiném disku.</p>

            <div className="space-y-3 mb-6">
              <div onClick={() => toggleCheck('p6')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p6'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p6'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p6'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Vytvořil/a jsem na disku C: prázdnou složku "Tajne". Poté jsem skrytému oddílu ve Správě disků přidal/a cestu: "Připojit do následující prázdné složky..." a namířil ji na C:\Tajne.</span>
              </div>
              <div onClick={() => toggleCheck('p7')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p7'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p7'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p7'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Otevřel/a jsem na disku C: složku "Tajne", vytvořil/a uvnitř soubor, následně jsem oddílu přidal/a i písmeno T: a ověřil/a, že soubor vidím pod písmenem T: i pod C:\Tajne.</span>
              </div>
            </div>

            <div className="mb-12">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Popište scénář z praxe: Kdy je reálně výhodné připojit celý nový disk "jen" jako složku na existujícím disku (např. C:\Hry nebo C:\Zalohy) místo písmene?</label>
              <textarea 
                value={answers['mount_usage'] || ''}
                onChange={(e) => handleAnswerChange('mount_usage', e.target.value)}
                placeholder="Představte si např. situaci, kdy máte program, který umí číst jen z disku C: ..."
                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
              />
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase mt-8">5. Závěrečný úklid</h2>
            <p className="text-slate-500 font-medium mb-6">Pojďme po sobě uklidit, aby disk nezůstal trvale rozdělen.</p>
            
            <div className="space-y-3 mb-6">

              <div onClick={() => toggleCheck('p8')} className={`flex items-start gap-4 p-4 cursor-pointer rounded-xl border-2 transition-all ${checkedItems['p8'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                {checkedItems['p8'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                <span className={`font-medium flex-1 ${checkedItems['p8'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>Všechny nové svazky (D:, Z:, skrytý) jsem odstranil/a. C: jsem rozšířil/a do původní maximální kapacity.</span>
              </div>
            </div>

          </div>
        </WorksheetLayout>
      )}
    </FsChapterShell>
  );
}
