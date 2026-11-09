"use client";

import React, { useState } from 'react';
import {
  Monitor, Key, HardDrive, ShieldAlert, WifiOff, Terminal,
  CheckCircle2, XCircle, ChevronRight, User, AlertTriangle, ArrowRight, RefreshCcw,
  BookOpen, ShieldCheck, Box, Globe, Settings, Cpu, Layers, Fingerprint, Server, PlayCircle, Activity
} from 'lucide-react';
import { Step, Partition, SimStepProps, WindowWrapper, TaskBubble } from './WindowsInstallShared';

export const WindowsInstallSimPart2: React.FC<SimStepProps> = ({
  currentStep,
  setCurrentStep,
  showFeedback
}) => {
  const [partitions, setPartitions] = useState<Partition[]>([
    { id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: 1000000, freeMB: 1000000, type: 'Nepřiřazené místo' }
  ]);
  const [selectedPartitionId, setSelectedPartitionId] = useState<string>('unalloc');
  const [isCreatingPartition, setIsCreatingPartition] = useState(false);
  const [newPartitionSize, setNewPartitionSize] = useState('');
  const [currentEulaQuestion, setCurrentEulaQuestion] = useState(0);
  const [eulaQuestionAnswered, setEulaQuestionAnswered] = useState(false);
  const [currentEulaAnswer, setCurrentEulaAnswer] = useState('');

  return (
    <>
      {currentStep === 'key' && (
        <WindowWrapper>
          <TaskBubble text="Přeinstalováváš značkový notebook Dell, který měl Windows 11 Pro už z výroby. Kde vezmeš licenční klíč k aktivaci?" />
          <div className="flex flex-col items-center flex-1 mt-16">
            <Key className="w-16 h-16 text-[#0078D7] mb-6 opacity-80" />
            <h2 className="text-2xl font-light text-gray-800 mb-4">Aktivace systému Windows</h2>
            <p className="text-sm text-gray-600 mb-8 max-w-lg text-center">
              Pokud tuto instalaci provádíte poprvé, zadejte kód Product Key (25 znaků).
            </p>
            
            <div className="w-full max-w-lg flex flex-col items-center border border-blue-200 bg-blue-50/30 p-6">
              <input 
                type="text" 
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX" 
                className="w-full border border-gray-400 p-2 text-center text-lg tracking-widest font-mono mb-4"
              />
              <button 
                onClick={() => showFeedback('error', 'Chyba: Značkové notebooky (OEM) mají klíč zapsaný v základní desce (BIOSu). Nemusíš jej opisovat, načte se sám.')}
                className="px-8 py-1.5 bg-[#0078D7] hover:bg-blue-700 text-white text-sm"
              >
                Další (Aktivovat)
              </button>
            </div>

            <div className="mt-auto w-full flex justify-start pt-10">
              <button
                onClick={() => showFeedback('success', 'Skvělé! Systém zjistí, že máš OEM licenci v BIOSu a automaticky se po připojení k internetu aktivuje.', 'eula')}
                className="text-[#0078D7] hover:underline text-sm font-medium"
              >
                Nemám kód Product Key
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'eula' && (
        <WindowWrapper>
          <TaskBubble text="Před instalací musíš souhlasit s licenční smlouvou (EULA). Než to ale odklikneš, zákazník se ptá na 5 konkrétních věcí. Použij AI překladač, najdi ve smlouvě odpovědi (max 1-2 slova) a doplň je." />
          <div className="flex flex-col flex-1 mt-16 px-10">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Příslušná upozornění a licenční podmínky</h2>
            
            <div className="border border-gray-300 p-4 h-48 overflow-y-auto mb-6 bg-white text-sm font-serif text-gray-700 leading-relaxed shadow-inner">
              <p className="font-bold mb-2">MICROSOFT SOFTWARE LICENSE TERMS</p>
              <p className="mb-2"><strong>WINDOWS OPERATING SYSTEM</strong></p>
              <p className="mb-4">IF YOU LIVE IN (OR IF YOUR PRINCIPAL PLACE OF BUSINESS IS IN) THE UNITED STATES, PLEASE READ THE BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER IN SECTION 11. IT AFFECTS HOW DISPUTES ARE RESOLVED.</p>
              <p className="mb-2"><strong>1. Overview.</strong></p>
              <p className="mb-2">a. Applicability. This agreement applies to the Windows software that is preinstalled on your device, or acquired from a retailer and installed by you, the media on which you received the software (if any), any fonts, icons, images or sound files included with the software, and also any Microsoft updates, upgrades, supplements or services for the software, unless other terms come with them. If this software contains any related Microsoft programs, terms that come with those programs apply. The software is licensed, not sold.</p>
              <p className="mb-2"><strong>2. Installation and Use Rights.</strong></p>
              <p className="mb-2">a. License. The software is licensed, not sold. Under this agreement, we grant you the right to install and run one instance of the software on your device (the licensed device), for use by one person at a time, so long as you comply with all the terms of this agreement.</p>
              <p className="mb-2">b. Device. In this agreement, "device" means a hardware system (whether physical or virtual) with an internal storage device capable of running the software. A hardware partition or blade is considered to be a device.</p>
              <p className="mb-2">c. Restrictions. The manufacturer or installer and Microsoft reserve all rights (such as rights under intellectual property laws) not expressly granted in this agreement. For example, this license does not give you any right to, and you may not:
                (i) use or virtualize features of the software separately;
                (ii) publish, copy (other than the permitted backup copy), rent, lease, or lend the software;
                (iii) transfer the software (except as permitted by this agreement);
                (iv) work around any technical restrictions or limitations in the software;
                (v) use the software as server software, for commercial hosting, make the software available for simultaneous use by multiple users over a network, install the software on a server and allow users to access it remotely, or install the software on a device for use only by remote users;
              </p>
              <p className="mb-2"><strong>15. Governing Law.</strong></p>
              <p>The laws of the state or country where you live (or, if a business, where your principal place of business is located) govern all claims and disputes concerning the software, its price, or this agreement, including breach of contract claims and claims under state consumer protection laws, unfair competition laws, implied warranty laws, for unjust enrichment, and in tort, except that the FAA governs all provisions relating to arbitration. If you acquired the software in any other country, the laws of that country apply. This agreement describes certain legal rights. You may have other rights, including consumer rights, under the laws of your state or country. You may also have rights with respect to the party from whom you acquired the software. This agreement does not change those other rights if the laws of your state or country do not permit it to do so.</p>
              <p className="mt-4 text-xs italic text-gray-500">Note: For the purpose of this simulation, refer to Microsoft Corporation as the licensor and Washington as the governing law state if applicable.</p>
            </div>

            {(() => {
              const eulaData = [
                {
                  q: "Kdo je poskytovatelem licence?",
                  a: ["microsoft", "microsoft corporation"],
                  explanation: "Smlouvu uzavíráte s tvůrcem OS, nikoliv s výrobcem vašeho PC (např. Dell nebo HP)."
                },
                {
                  q: "Je software prodáván, nebo licencován?",
                  a: ["licence", "licencovan", "licencovano", "licensing", "licensed", "licencovani", "licencován", "licencováno"],
                  explanation: "Nekupujete si kód, ale pouze právo k jeho užívání. Software nevlastníte!"
                },
                {
                  q: "Na kolik zařízení mohu nainstalovat jednu licenci? (odpovězte číslicí)",
                  a: ["jedno", "1", "one", "jeden", "jedno zarizeni", "1 zarizeni"],
                  explanation: "Běžná licence (OEM/Retail) platí vždy jen pro 1 fyzické nebo virtuální zařízení."
                },
                {
                  q: "Lze software použít pro komerční hostingové služby?",
                  a: ["ne", "nelze", "no", "zakazano"],
                  explanation: "Nesmíte na tento počítač připojit více uživatelů na dálku a za peníze jim pronajímat výpočetní výkon nebo aplikace. K tomu slouží speciální Serverové verze Windows."
                },
                {
                  q: "Podle zákonů jakého státu v USA se primárně řeší spory?",
                  a: ["washington", "wa"],
                  explanation: "Globální IT služby se často řídí právem domovského státu gigantů (pokud lokální zákony nestanoví jinak)."
                }
              ];
              const current = eulaData[currentEulaQuestion];

              return (
                <div className="flex flex-col flex-1">
                  <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Otázka {currentEulaQuestion + 1} z 5</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">{currentEulaQuestion + 1}</span>
                      <label className="text-xl text-gray-900 font-semibold">{current.q}</label>
                    </div>
                    
                    {!eulaQuestionAnswered ? (
                      <div className="flex gap-4 items-center">
                        <input 
                          type="text"
                          value={currentEulaAnswer}
                          onChange={(e) => setCurrentEulaAnswer(e.target.value)}
                          placeholder="Napište 1-2 slova z textu..."
                          className="border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:border-[#0078D7] outline-none transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                              const normAns = normalize(currentEulaAnswer);
                              if (current.a.some(c => normalize(c) === normAns)) {
                                setEulaQuestionAnswered(true);
                                showFeedback('success', 'Správná odpověď!');
                              } else {
                                showFeedback('error', 'Odpověď není správná. Zkuste si text přeložit pomocí AI a najít přesnou odpověď.');
                              }
                            }
                          }}
                        />
                        <button 
                          onClick={() => {
                            const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                            const normAns = normalize(currentEulaAnswer);
                            if (current.a.some(c => normalize(c) === normAns)) {
                              setEulaQuestionAnswered(true);
                              showFeedback('success', 'Správná odpověď!');
                            } else {
                              showFeedback('error', 'Odpověď není správná. Zkuste si text přeložit pomocí AI a najít přesnou odpověď.');
                            }
                          }}
                          className="px-8 py-3 bg-[#0078D7] hover:bg-blue-700 text-white font-bold rounded transition-colors"
                        >
                          Ověřit
                        </button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-lg mb-2">
                          <CheckCircle2 className="w-6 h-6" /> Výborně!
                        </div>
                        <p className="text-emerald-900 text-base leading-relaxed"><strong>Vysvětlení:</strong> {current.explanation}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end gap-4">
                    {eulaQuestionAnswered && (
                      <button 
                        onClick={() => {
                          if (currentEulaQuestion < 4) {
                            setCurrentEulaQuestion(prev => prev + 1);
                            setEulaQuestionAnswered(false);
                            setCurrentEulaAnswer('');
                          } else {
                            setCurrentStep('type');
                          }
                        }}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold rounded-lg shadow-md flex items-center gap-2 transition-transform hover:scale-105"
                      >
                        {currentEulaQuestion < 4 ? 'Další otázka' : 'Rozumím smlouvě, pokračovat dál'} <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'type' && (
        <WindowWrapper>
          <TaskBubble text="Děláš čistou instalaci (Clean Install). Starý systém byl zavirovaný a pomalý." />
          <div className="flex flex-col items-center flex-1 mt-16">
            <h2 className="text-2xl font-light text-gray-800 mb-10 text-left w-full max-w-2xl">
              Jaký typ instalace požadujete?
            </h2>
            
            <div className="w-full max-w-2xl space-y-4">
              <button 
                onClick={() => showFeedback('error', 'Chyba: Upgrade by zachoval staré zavirované soubory. Potřebuješ čistý stůl.')}
                className="w-full flex items-start gap-4 p-4 border border-gray-300 hover:border-[#0078D7] hover:bg-blue-50 text-left"
              >
                <div className="w-8 h-8 flex-shrink-0 mt-1">
                  <ArrowRight className="w-8 h-8 text-[#0078D7]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#0078D7] mb-1">Upgrade: Instalovat systém Windows a zachovat soubory, nastavení a aplikace</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tato možnost je k dispozici pouze v případě, že je v počítači už spuštěná podporovaná verze systému Windows.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => showFeedback('success', 'Správně! Čistá instalace smaže stará data a nainstaluje čerstvý systém.', 'disk')}
                className="w-full flex items-start gap-4 p-4 border border-gray-300 hover:border-[#0078D7] hover:bg-blue-50 text-left"
              >
                <div className="w-8 h-8 flex-shrink-0 mt-1">
                  <ArrowRight className="w-8 h-8 text-[#0078D7]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#0078D7] mb-1">Vlastní: Jen nainstalovat Windows (pokročilé)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Soubory, nastavení a aplikace se nezachovají. Chcete-li provést změny v oddílech a jednotkách, spusťte počítač pomocí instalačního disku.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'disk' && (
        <WindowWrapper>
          <TaskBubble text="Zákazník požaduje disk rozdělit na 3 oddíly: Systém (200 GB), Data (500 GB) a Zálohy (Zbytek). 1 GB = 1000 MB. Vytvoř přesně takové oddíly." />
          <div className="flex flex-col flex-1 mt-16 px-10">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Kam chcete systém Windows nainstalovat?</h2>
            
            <div className="border border-gray-300 h-64 overflow-y-auto mb-4 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 font-normal border-b">Název</th>
                    <th className="p-2 font-normal border-b">Celková velikost</th>
                    <th className="p-2 font-normal border-b">Volné místo</th>
                    <th className="p-2 font-normal border-b">Typ</th>
                  </tr>
                </thead>
                <tbody>
                  {partitions.map(p => (
                    <tr 
                      key={p.id} 
                      onClick={() => { setSelectedPartitionId(p.id); setIsCreatingPartition(false); }}
                      className={`cursor-pointer ${selectedPartitionId === p.id ? 'bg-[#0078D7] text-white' : 'hover:bg-blue-50 text-gray-800'}`}
                    >
                      <td className="p-2 flex items-center gap-2">
                        <HardDrive className={`w-4 h-4 ${selectedPartitionId === p.id ? 'text-white' : 'text-[#0078D7]'}`} /> 
                        {p.name}
                      </td>
                      <td className="p-2">{(p.totalMB / 1000).toFixed(1)} GB</td>
                      <td className="p-2">{(p.freeMB / 1000).toFixed(1)} GB</td>
                      <td className="p-2">{p.type === 'Nepřiřazené místo' ? '' : p.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-6 mb-4 text-sm text-[#0078D7]">
              <button 
                onClick={() => {
                  setPartitions([{ id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: 1000000, freeMB: 1000000, type: 'Nepřiřazené místo' }]);
                  setSelectedPartitionId('unalloc');
                  setIsCreatingPartition(false);
                }}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" /> Reset
              </button>
              <button 
                onClick={() => {
                  const toDelete = partitions.find(p => p.id === selectedPartitionId);
                  if (!toDelete || toDelete.type === 'Nepřiřazené místo') return;
                  const newPartitions = partitions.filter(p => p.id !== selectedPartitionId);
                  let unalloc = newPartitions.find(p => p.id === 'unalloc');
                  if (unalloc) {
                    unalloc.totalMB += toDelete.totalMB;
                    unalloc.freeMB += toDelete.totalMB;
                  } else {
                    newPartitions.push({ id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: toDelete.totalMB, freeMB: toDelete.totalMB, type: 'Nepřiřazené místo' });
                  }
                  setPartitions([...newPartitions]);
                  setSelectedPartitionId('unalloc');
                  setIsCreatingPartition(false);
                }}
                disabled={!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type === 'Nepřiřazené místo'}
                className={`flex items-center gap-1 hover:underline ${(!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type === 'Nepřiřazené místo') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <XCircle className="w-4 h-4" /> Odstranit
              </button>
              <span className="flex items-center gap-1 opacity-50"><CheckCircle2 className="w-4 h-4" /> Formátovat</span>
              <button 
                onClick={() => {
                  const p = partitions.find(p => p.id === selectedPartitionId);
                  if (p && p.type === 'Nepřiřazené místo') {
                    setIsCreatingPartition(true);
                    setNewPartitionSize(p.totalMB.toString());
                  }
                }}
                disabled={!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type !== 'Nepřiřazené místo'}
                className={`flex items-center gap-1 hover:underline ${(!partitions.find(p => p.id === selectedPartitionId) || partitions.find(p => p.id === selectedPartitionId)?.type !== 'Nepřiřazené místo') ? 'opacity-50 cursor-not-allowed' : 'font-bold cursor-pointer text-gray-800'}`}
              >
                <Monitor className="w-4 h-4" /> Nový
              </button>
            </div>

            {isCreatingPartition && (
              <div className="bg-gray-50 p-4 border border-gray-300 flex items-center gap-4 mb-4 text-sm shadow-inner">
                <label>Velikost:</label>
                <input 
                  type="number" 
                  value={newPartitionSize} 
                  onChange={(e) => setNewPartitionSize(e.target.value)} 
                  className="border border-gray-400 p-1 w-32 text-right"
                />
                <span>MB</span>
                <button 
                  onClick={() => {
                    const size = parseInt(newPartitionSize);
                    const unalloc = partitions.find(p => p.id === 'unalloc');
                    if (!unalloc || isNaN(size) || size <= 0 || size > unalloc.totalMB) {
                      showFeedback('error', 'Neplatná velikost oddílu.');
                      return;
                    }

                    const newParts = partitions.filter(p => p.id !== 'unalloc');
                    let idCounter = newParts.length + 1;
                    const hasSystem = newParts.some(p => p.type === 'Systémový EFI');
                    
                    if (!hasSystem) {
                      showFeedback('error', 'Aby bylo zajištěno správné fungování (zavádění systému), Windows automaticky vytvoří 100MB EFI oddíl pro Boot Manager.');
                      newParts.push({ id: `part-${Math.random().toString(36).substring(7)}`, name: `Jednotka 0 Oddíl 1`, totalMB: 100, freeMB: 70, type: 'Systémový EFI' });
                      const primarySize = size - 100;
                      if (primarySize > 0) {
                         newParts.push({ id: `part-${Math.random().toString(36).substring(7)}`, name: `Jednotka 0 Oddíl 2`, totalMB: primarySize, freeMB: primarySize, type: 'Hlavní' });
                      }
                    } else {
                      newParts.push({ id: `part-${Math.random().toString(36).substring(7)}`, name: `Jednotka 0 Oddíl ${idCounter}`, totalMB: size, freeMB: size, type: 'Hlavní' });
                    }

                    const remaining = unalloc.totalMB - size;
                    if (remaining > 0) {
                      newParts.push({ id: 'unalloc', name: 'Jednotka 0 Nepřiřazené místo', totalMB: remaining, freeMB: remaining, type: 'Nepřiřazené místo' });
                    }

                    setPartitions(newParts);
                    setIsCreatingPartition(false);
                    setNewPartitionSize('');
                    setSelectedPartitionId(newParts[newParts.length - (remaining > 0 ? 2 : 1)].id);
                  }}
                  className="px-6 py-1.5 border border-gray-400 bg-gray-200 hover:bg-gray-300 ml-4 font-semibold"
                >
                  Použít
                </button>
                <button 
                  onClick={() => setIsCreatingPartition(false)}
                  className="px-6 py-1.5 border border-gray-400 hover:bg-gray-100"
                >
                  Zrušit
                </button>
              </div>
            )}

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">Windows nelze nainstalovat na tuto jednotku. (Zobrazit podrobnosti)</span>
              
              <button
                onClick={() => {
                  const primaries = partitions.filter(p => p.type === 'Hlavní');
                  if (primaries.length !== 3) {
                    showFeedback('error', 'Chyba: Zákazník chtěl rozdělit disk na 3 oddíly (nepočítaje malé systémové oddíly).');
                    return;
                  }
                  const p1Size = primaries[0].totalMB + 100;
                  if (p1Size !== 200000) {
                    showFeedback('error', 'Chyba: První oddíl (Systém) měl být 200 GB (200000 MB). Pokud ses spletl, odstraň oddíly a začni znovu.');
                    return;
                  }
                  if (primaries[1].totalMB !== 500000) {
                    showFeedback('error', 'Chyba: Druhý oddíl (Data) měl být 500 GB (500000 MB). Smaž jej a oprav.');
                    return;
                  }
                  showFeedback('success', 'Skvělé! Přesně jsi rozdělil disk na Systém, Data a Zálohy. Můžeme pokračovat.', 'network');
                }}
                className="px-8 py-1.5 bg-[#0078D7] hover:bg-blue-700 text-white text-sm"
              >
                Další
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}
    </>
  );
};
