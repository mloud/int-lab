"use client";

import React, { useState } from 'react';
import {
  Monitor, Key, HardDrive, ShieldAlert, WifiOff, Terminal,
  CheckCircle2, XCircle, ChevronRight, User, AlertTriangle, ArrowRight, RefreshCcw,
  BookOpen, ShieldCheck, Box, Globe, Settings, Cpu, Layers, Fingerprint, Server, PlayCircle, Activity
} from 'lucide-react';
import { Step, SimStepProps, WindowWrapper, TaskBubble } from './WindowsInstallShared';

export const WindowsInstallSimPart3: React.FC<SimStepProps & {
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  onResetSimulator: () => void;
}> = ({
  currentStep,
  setCurrentStep,
  showFeedback,
  terminalOpen,
  setTerminalOpen,
  onResetSimulator
}) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [privacyToggles, setPrivacyToggles] = useState({
    location: true,
    diagnostics: true,
    inking: true,
    ads: true
  });

  return (
    <>
      {currentStep === 'network' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Jsi ve školní učebně a NESMÍŠ počítač připojit k osobnímu Microsoft účtu. Tlačítko Přeskočit nebo 'Nemám internet' ale chybí. Jak vynutíš lokální účet offline?" />
          <div className="flex flex-col items-center flex-1 mt-16 px-10">
            <div className="mb-8 relative w-full h-48 flex justify-center items-center">
               <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg" alt="Win11" className="w-24 h-24 opacity-80 z-10" />
            </div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Připojte se k síti</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              K dokončení nastavení zařízení budete potřebovat připojení k internetu. Až se připojíte, získáte nejnovější aktualizace.
            </p>

            <div className="w-full max-w-md border border-gray-300 rounded-xl overflow-hidden mb-10">
              <div className="p-4 border-b flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <WifiOff className="w-6 h-6 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">Síť Eduroam</h4>
                  <p className="text-xs text-gray-500">Zabezpečeno</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <Monitor className="w-6 h-6 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">Ethernet 1</h4>
                  <p className="text-xs text-gray-500">Nepřipojeno</p>
                </div>
              </div>
            </div>

            <div className="mt-auto w-full flex justify-between">
              <button 
                onClick={() => setTerminalOpen(true)}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-semibold flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" /> Zmáčknout Shift+F10
              </button>
              <button 
                onClick={() => showFeedback('error', 'Chyba: Bez internetu tě Windows nepustí dál. Tlačítko Další je zamknuté. Musíš to obejít příkazem.')}
                className="px-8 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Další
              </button>
            </div>
          </div>

          {/* Vyskakovací terminál */}
          {terminalOpen && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg bg-black text-white p-2 shadow-2xl rounded-sm border border-gray-700 z-50">
              <div className="bg-white text-black px-2 py-1 flex justify-between text-xs mb-2">
                <span>C:\Windows\System32\cmd.exe</span>
                <span className="cursor-pointer" onClick={() => setTerminalOpen(false)}>X</span>
              </div>
              <div className="font-mono text-sm p-2 h-40">
                <p className="mb-2">Microsoft Windows [Version 10.0.22631.1]</p>
                <p className="mb-4">(c) Microsoft Corporation. Všechna práva vyhrazena.</p>
                <div className="flex">
                  <span className="mr-2">C:\Windows\System32&gt;</span>
                  <input 
                    type="text" 
                    autoFocus
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (terminalInput.trim().toLowerCase() === 'oobe\\bypassnro') {
                          showFeedback('success', 'Skvělé! Systém se nyní restartuje a povolí instalaci bez internetu (lokální účet).', 'account');
                        } else {
                          setTerminalInput('');
                          showFeedback('error', 'Chyba: Toto není správný příkaz. Zkus "oobe\\bypassnro".');
                        }
                      }
                    }}
                    className="bg-transparent outline-none flex-1 font-mono text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </WindowWrapper>
      )}

      {currentStep === 'account' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Vyber vhodné heslo pro místní administrátorský účet. Pamatuj, že ve školním prostředí někdy obětujeme bezpečnost pro jednotnost, ale jak by to mělo vypadat správně u reálného zákazníka?" />
          <div className="flex flex-col items-center flex-1 mt-16 px-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Vytvořte si heslo, které si snadno zapamatujete</h2>
            <p className="text-gray-600 mb-10 text-center max-w-md">
              Zadejte heslo pro účet "admin".
            </p>

            <div className="w-full max-w-sm space-y-6">
              <input 
                type="text" 
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                placeholder="Zadejte heslo" 
                className="w-full border-b-2 border-[#0078D7] p-2 text-xl bg-transparent outline-none focus:border-blue-700 transition-colors"
              />

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">Pravidla silného hesla:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    {accountPassword.length >= 8 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={accountPassword.length >= 8 ? 'text-gray-800' : 'text-gray-500'}>Minimálně 8 znaků</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/[A-Z]/.test(accountPassword) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={/[A-Z]/.test(accountPassword) ? 'text-gray-800' : 'text-gray-500'}>Alespoň jedno velké písmeno</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword) ? 'text-gray-800' : 'text-gray-500'}>Alespoň jeden speciální znak</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => {
                    if (accountPassword.length < 8) {
                      showFeedback('error', 'Chyba: Heslo musí mít alespoň 8 znaků.');
                    } else if (!/[A-Z]/.test(accountPassword)) {
                      showFeedback('error', 'Chyba: Heslo musí obsahovat alespoň jedno velké písmeno.');
                    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(accountPassword)) {
                      showFeedback('error', 'Chyba: Heslo musí obsahovat alespoň jeden speciální znak (např. ! ? @ #).');
                    } else {
                      showFeedback('success', 'Výborně! Toto je ukázkové silné heslo, které odolá běžným slovníkovým útokům.', 'privacy');
                    }
                  }}
                  className="px-8 py-2 bg-[#0078D7] hover:bg-blue-700 text-white font-semibold rounded"
                >
                  Další
                </button>
              </div>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'privacy' && (
        <WindowWrapper isOOBE>
          <TaskBubble text="Připravuješ PC pro firemního ředitele. Zabezpečení a soukromí firemních dat je priorita číslo 1. Pro případ ztráty nebo krádeže by ale firma ráda věděla, kde se notebook nachází." />
          <div className="flex flex-col items-center flex-1 mt-10 px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Zvolte nastavení ochrany soukromí pro toto zařízení</h2>
            
            <div className="w-full max-w-2xl grid grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Poloha</h4>
                  <p className="text-xs text-gray-500">Umožňuje aplikacím s povolením k používání polohy využívat data z Windows.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, location: !privacyToggles.location})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.location ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.location ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Diagnostická data</h4>
                  <p className="text-xs text-gray-500">Odesílat Microsoftu údaje o historii procházení webe a chybách.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, diagnostics: !privacyToggles.diagnostics})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.diagnostics ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.diagnostics ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Psaní rukou a na klávesnici</h4>
                  <p className="text-xs text-gray-500">Odesílat data o psaní pro vylepšení rozpoznávání slov.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, inking: !privacyToggles.inking})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.inking ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.inking ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Reklamní ID</h4>
                  <p className="text-xs text-gray-500">Povolit aplikacím používat reklamní ID pro personalizaci.</p>
                </div>
                <div 
                  onClick={() => setPrivacyToggles({...privacyToggles, ads: !privacyToggles.ads})}
                  className={`w-12 h-6 rounded-full flex items-center cursor-pointer px-1 transition-colors ${privacyToggles.ads ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacyToggles.ads ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

            </div>

            <div className="mt-auto w-full flex justify-end">
              <button 
                onClick={() => {
                  const isCorrect = privacyToggles.location && !privacyToggles.diagnostics && !privacyToggles.inking && !privacyToggles.ads;
                  if (isCorrect) {
                    showFeedback('success', 'Skvělé! Poloha zůstala zapnutá pro sledování ztraceného zařízení, ale veškerá telemetrie a reklamy jsou vypnuty.', 'result');
                  } else {
                    showFeedback('error', 'Chyba: Zkontroluj, zda jsi vypnul telemetrii, diagnostiku i reklamy, ale nechal ZAPNUTÉ sledování polohy (pro případ ztráty notebooku).');
                  }
                }}
                className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
              >
                Přijmout
              </button>
            </div>
          </div>
        </WindowWrapper>
      )}

      {currentStep === 'result' && (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-3xl mx-auto border-4 border-slate-50 mt-10">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Instalace dokončena!</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Úspěšně jsi prošel kompletním instalačním procesem Windows 11 jako skutečný IT profesionál. Nyní znáš klíčová zákoutí – od OEM klíčů, přes Bypass účtu až po ochranu soukromí.
          </p>
          <button
            onClick={() => {
              // Reset
              onResetSimulator();
              setTerminalOpen(false);
              setTerminalInput('');
              setPrivacyToggles({ location: true, diagnostics: true, inking: true, ads: true });
              setCurrentStep('intro');
            }}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 uppercase tracking-wider flex items-center gap-3 mx-auto"
          >
            <RefreshCcw className="w-5 h-5" /> Zkusit znovu
          </button>
        </div>
      )}
    </>
  );
};
