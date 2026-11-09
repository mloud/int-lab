'use client';

import React, { useState, useEffect } from 'react';
import { Phase } from './boot/BootData';
import { UefiSimulator } from './boot/UefiSimulator';
import { BootSequenceBuilder } from './boot/BootSequenceBuilder';

interface OsBootChapterProps {
  onBack: () => void;
}

const OsBootChapter: React.FC<OsBootChapterProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>(0);
  const [splashTimer, setSplashTimer] = useState(5);
  const [missedUefi, setMissedUefi] = useState(false);
  const [postLines, setPostLines] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 0 && !missedUefi) {
        if (e.key === 'Delete' || e.key === 'F2') {
          setPhase(1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, missedUefi]);

  useEffect(() => {
    if (phase === 0 && !missedUefi) {
      if (splashTimer > 0) {
        const t = setTimeout(() => setSplashTimer(splashTimer - 1), 1000);
        return () => clearTimeout(t);
      } else {
        setMissedUefi(true);
      }
    }
  }, [phase, splashTimer, missedUefi]);

  const runPostSequence = () => {
    const sequence = [
      'American Megatrends Inc.',
      'ASUS EZ UEFI BIOS Revision 3402',
      'CPU: AMD Ryzen 5 7600X 6-Core Processor',
      'Speed: 4.70 GHz',
      'Memory Testing: 32768 MB OK',
      'Initializing USB Controllers .. Done.',
      'Verifying TPM 2.0 Module ... OK',
      'Secure Boot Status ... Enabled',
      'Detecting Storage Devices ...',
      'NVMe: Samsung 980 PRO 1TB ... OK',
      'Reading GPT Partition Table ... Found EFI System Partition',
      'Loading Windows Boot Manager (bootmgfw.efi) ...',
    ];

    let i = 0;
    setPostLines([]);
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setPostLines(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase(2), 2000);
      }
    }, 400);
  };

  const restartMachine = () => {
    setMissedUefi(false);
    setSplashTimer(5);
    setPhase(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
      {phase === 0 && (
        <div className="h-screen w-full flex flex-col relative justify-center items-center bg-black">
          <button onClick={onBack} className="absolute top-4 left-4 z-50 text-slate-500 hover:text-white px-4 py-2 border border-slate-800 rounded">
            Ukončit simulaci
          </button>

          {!missedUefi ? (
            <div className="text-center animate-in fade-in duration-1000">
              <div className="mb-12 font-black text-6xl tracking-widest text-blue-600 italic">ASUS</div>
              <div className="mt-20">
                <p className="font-mono text-xl text-slate-300">
                  Press <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">DEL</span> or <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">F2</span> to enter UEFI BIOS setting
                </p>
                <div className="mt-6 flex justify-center items-center gap-4">
                  <button
                    onClick={() => setPhase(1)}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-mono rounded-lg border border-slate-600 transition-colors"
                  >
                    Stisknout klávesu [DEL] ({splashTimer}s)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-left font-mono text-slate-300 self-start p-8 animate-in fade-in">
              <div className="mb-4">American Megatrends Inc.</div>
              <div className="mb-4 text-red-500 font-bold">
                Reboot and Select proper Boot device<br />
                or Insert Boot Media in selected Boot device and press a key_
              </div>
              <p className="mt-8 text-sm text-slate-500">Nenastavil jsi BIOS včas nebo nejsou správně nastavené podmínky. Systém neví, co má dělat.</p>
              <button
                onClick={restartMachine}
                className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded"
              >
                Tvrdý restart PC (Ctrl+Alt+Del)
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 1 && (
        <UefiSimulator
          onSuccessBoot={() => {
            setPhase('post');
            runPostSequence();
          }}
          onRestart={restartMachine}
          onBack={onBack}
        />
      )}

      {phase === 'post' && (
        <div className="h-screen w-full bg-black text-green-500 font-mono p-8 text-lg flex flex-col items-start overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
          {postLines.map((line, i) => (
            <div key={i} className="animate-in fade-in">{line}</div>
          ))}
          {postLines.length < 12 && (
            <div className="w-3 h-6 bg-green-500 animate-pulse mt-1"></div>
          )}
        </div>
      )}

      {phase === 2 && <BootSequenceBuilder onBack={onBack} />}
    </div>
  );
};

export default OsBootChapter;
