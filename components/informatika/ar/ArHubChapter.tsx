'use client';

import React, { useState, useEffect } from 'react';
import ARScannerCard from './ARScannerCard';
import { Wifi } from 'lucide-react';

interface ArHubChapterProps {
  onBack: () => void;
}

const ArHubChapter: React.FC<ArHubChapterProps> = ({ onBack }) => {
  // Detekce prostředí pro správnou URL (dev vs live)
  const isDev = process.env.NODE_ENV === 'development';
  
  // State pro lokální IP
  const [customIp, setCustomIp] = useState('192.168.1.100');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomIp(window.location.hostname);
    }
  }, []);

  const devUrl = `http://${customIp}:3000/ar/core.html`;
  const liveUrl = "https://mloud.github.io/int-lab/ar/core.html";
  const finalAppUrl = isDev ? devUrl : liveUrl;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Hlavní menu AR hubu */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-4 border-white mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">Laboratoř Rozšířené Reality</h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-8 font-medium">
          Zde si můžete vyzkoušet probíranou látku z informatiky přímo ve vašem telefonu jako 3D hologram. 
          Nepotřebujete nic instalovat, stačí naskenovat QR kód.
        </p>

        {isDev && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-blue-800 font-bold">
              <Wifi className="w-5 h-5" />
              <span>Dev Mode: Nastavení lokální sítě</span>
            </div>
            <p className="text-sm text-blue-600 text-center">
              Zadejte IPv4 adresu vašeho PC, aby se k němu mobil z domovské sítě připojil.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500 text-sm">http://</span>
              <input 
                type="text" 
                value={customIp}
                onChange={(e) => setCustomIp(e.target.value)}
                className="px-3 py-2 border-2 border-blue-200 rounded-xl font-mono focus:outline-none focus:border-blue-500 text-center w-40"
                placeholder="192.168.x.x"
              />
              <span className="font-mono text-gray-500 text-sm">:3000</span>
            </div>
          </div>
        )}

        {/* 1. Ukázka - Datový tok nebo Glóbus */}
        <ARScannerCard 
          title="Tepající jádro a Datový tok"
          description="Fyzická ukázka toho, jak po sběrnici putují bity k výpočtu do jádra procesoru."
          appUrl={finalAppUrl}
        />
        
        {/* Placeholder pro další aplikace do budoucna */}
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center opacity-50">
          <p className="text-gray-500 font-bold uppercase tracking-widest">Další AR ukázky připravujeme</p>
        </div>

      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onBack}
          className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          Zpět na rozcestník
        </button>
      </div>
    </div>
  );
};

export default ArHubChapter;
