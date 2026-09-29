import React from 'react';
import { QrCode, ScanFace, Printer } from 'lucide-react';

interface ARScannerCardProps {
  title: string;
  description: string;
  appUrl: string; // The URL to the AR application (e.g., https://your-domain.com/ar/demo1.html)
  markerImgSrc?: string; // Optional path to marker image, defaults to Hiro
  markerName?: string; // Name of the marker (e.g. "Hiro Marker")
}

const ARScannerCard: React.FC<ARScannerCardProps> = ({ 
  title, 
  description, 
  appUrl, 
  markerImgSrc = "https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png",
  markerName = "Hiro Marker"
}) => {
  // Generate QR code using an external API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(appUrl)}`;

  const handlePrint = () => {
    // A simple print approach for just the marker
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Tisk - ${markerName}</title>
            <style>
              body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
              img { max-width: 80%; max-height: 80%; border: 2px solid black; }
              h1 { margin-top: 2rem; font-size: 1.5rem; }
              p { margin-top: 1rem; color: #555; }
              @media print {
                @page { margin: 0; size: auto; }
                body { padding: 2cm; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <img src="${markerImgSrc}" alt="${markerName}" />
            <h1>${title} - ${markerName}</h1>
            <p>Položte tento papír na lavici a namiřte na něj fotoaparát.</p>
            <button class="no-print" onclick="window.print()" style="margin-top: 2rem; padding: 1rem 2rem; font-size: 1.2rem; cursor: pointer;">Vytisknout značku</button>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 sm:p-8 flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <ScanFace className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">{title}</h3>
          <p className="text-rose-100 font-medium mt-1">{description}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Krok 1: Aplikace (QR kód) */}
        <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xl mb-4">1</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">Spusťte aplikaci</h4>
          <p className="text-gray-500 mb-6 text-sm">Otevřete fotoaparát v mobilu a naskenujte tento QR kód. Potvrďte přístup ke kameře.</p>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeUrl} alt="QR Kód AR Aplikace" className="w-48 h-48 object-contain" />
          </div>
          
          <a href={appUrl} target="_blank" rel="noreferrer" className="mt-4 text-blue-500 font-bold hover:underline flex items-center gap-2">
            <QrCode className="w-4 h-4" /> Otevřít aplikaci ručně
          </a>
        </div>

        {/* Krok 2: Marker */}
        <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-black text-xl mb-4">2</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">Namiřte na značku</h4>
          <p className="text-gray-500 mb-6 text-sm">Jakmile se aplikace v mobilu zapne, namiřte fotoaparát na tuto značku na monitoru (nebo si ji vytiskněte).</p>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markerImgSrc} alt="AR Marker" className="w-48 h-48 object-contain mb-4 border-2 border-gray-800" />
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-bold mt-2"
            >
              <Printer className="w-4 h-4" /> Vytisknout na stůl
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ARScannerCard;
