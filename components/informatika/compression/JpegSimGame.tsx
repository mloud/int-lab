import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, SlidersHorizontal, Download, Image as ImageIcon, Upload } from 'lucide-react';

interface JpegSimGameProps {
  onBack: () => void;
}

const JpegSimGame: React.FC<JpegSimGameProps> = ({ onBack }) => {
  const [quality, setQuality] = useState<number>(80);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [rawSize, setRawSize] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  // Načtení výchozího obrázku
  useEffect(() => {
    loadDefaultImage();
  }, []);

  const loadDefaultImage = () => {
    setLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    // Příroda s detaily (tráva, stromy), na kterých jsou krásně vidět JPEG artefakty
    img.src = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=100&w=800'; 
    
    img.onload = () => {
      sourceImageRef.current = img;
      setRawSize(img.width * img.height * 3); // Raw RGB velikost
      processImage(80);
      setLoading(false);
    };
    
    img.onerror = () => {
      // Fallback: vykreslíme procedurální obrázek, pokud by selhal CORS
      createProceduralImage();
    };
  };

  const createProceduralImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Obloha
    const grad = ctx.createLinearGradient(0, 0, 0, 600);
    grad.addColorStop(0, '#4facfe');
    grad.addColorStop(1, '#00f2fe');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);
    
    // Slunce
    ctx.fillStyle = '#ffde00';
    ctx.beginPath();
    ctx.arc(650, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    // Hory / text
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 80px sans-serif';
    ctx.fillText('Test komprese', 100, 300);
    
    // Mřížka pro artefakty
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 800; i += 20) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 600); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
    }

    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = () => {
      sourceImageRef.current = img;
      setRawSize(img.width * img.height * 3);
      processImage(80);
      setLoading(false);
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Pokud je fotka obrovská (z mobilu/foťáku), zmenšíme ji, jinak by canvas přetížil paměť
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * ratio;
          height = height * ratio;
          
          // Zmenšení přes dočasný canvas
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = width;
          tempCanvas.height = height;
          const tCtx = tempCanvas.getContext('2d');
          tCtx?.drawImage(img, 0, 0, width, height);
          
          const resizedImg = new Image();
          resizedImg.onload = () => {
            sourceImageRef.current = resizedImg;
            setRawSize(resizedImg.width * resizedImg.height * 3);
            processImage(quality);
            setLoading(false);
          };
          resizedImg.src = tempCanvas.toDataURL('image/jpeg', 1.0);
        } else {
          sourceImageRef.current = img;
          setRawSize(img.width * img.height * 3);
          processImage(quality);
          setLoading(false);
        }
      };
      img.onerror = () => {
        console.error("Nelze načíst obrázek.");
        alert("Obrázek se nepodařilo načíst (zkuste nahrát jiný formát nebo klasický JPEG/PNG).");
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    
    // Reset inputu, aby šel nahrát stejný soubor znovu
    e.target.value = '';
  };

  const processImage = (q: number) => {
    if (!sourceImageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = sourceImageRef.current.width;
    canvas.height = sourceImageRef.current.height;
    
    // Na některých prohlížečích JPEG encoder ignoruje transparentnost a dává černé pozadí, 
    // takže nejprve vyplníme bílou.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sourceImageRef.current, 0, 0);

    // SKUTEČNÁ JPEG KOMPRESE V PROHLÍŽEČI
    const dataUrl = canvas.toDataURL('image/jpeg', q / 100);
    setImageSrc(dataUrl);

    // Přibližný výpočet velikosti v bajtech z base64 řetězce
    const base64str = dataUrl.split(',')[1];
    if (base64str) {
      const sizeInBytes = Math.floor(base64str.length * 0.75);
      setCurrentSize(sizeInBytes);
    }
  };

  useEffect(() => {
    processImage(quality);
  }, [quality]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const rawSizeMB = rawSize / 1000000;
  const currentSizeMB = currentSize / 1000000;
  const savings = Math.max(0, Math.round((1 - currentSize / rawSize) * 100));

  return (
    <div className="max-w-6xl w-full mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>

        <div className="relative overflow-hidden inline-block">
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs w-full h-full">
            <Upload className="w-4 h-4" />
            Nahrát vlastní fotku
          </button>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
            onChange={handleFileUpload} 
            onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
          />
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-purple-50">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-black text-purple-600">4</span>
          </div>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Skutečná JPEG komprese</h2>
        </div>
        <div className="ml-16 mb-8 text-gray-600 font-medium text-lg space-y-3">
          <p>
            <strong>Jak to funguje?</strong> Lidské oko je velmi citlivé na jas, ale mnohem hůře vnímá jemné rozdíly v barvách a drobné detaily. JPEG komprese toho využívá: rozdělí obrázek na malé bloky (8×8 pixelů) a matematicky z nich odstraní detaily, kterých si mozek stejně nevšimne.
          </p>
          <p>
            Posuvníkem měníš agresivitu tohoto promazávání. Při nízké kvalitě už algoritmus odstraní tolik informací, že začneš jasně vidět původní 8×8 bloky ("čtverečkování") a rozmazané barvy. Odměnou je ale obrovská úspora místa!
          </p>
        </div>

        {/* Skrytý canvas pro rendering */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Obrazovka a posuvník */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-gray-100 p-4 rounded-3xl border-2 border-gray-200 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
              {loading ? (
                <div className="text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                  Načítám a komprimuji...
                </div>
              ) : (
                <img 
                  src={imageSrc} 
                  alt="Výsledek komprese"
                  className="w-full h-full object-contain rounded-2xl"
                  style={{ imageRendering: quality < 15 ? 'pixelated' : 'auto' }}
                />
              )}
              {quality < 15 && !loading && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-2 rounded-full font-black tracking-widest uppercase text-xs backdrop-blur-md shadow-lg pointer-events-none">
                  Viditelné ztráty dat
                </div>
              )}
            </div>

            <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-700 uppercase tracking-widest text-xs">JPEG Kvalita</span>
                </div>
                <span className="font-black text-purple-700 text-2xl">{quality} %</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={quality} 
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-purple-400 font-bold uppercase mt-2">
                <span>1 % (Nejnižší velikost, horší obraz)</span>
                <span>100 % (Zbytečně velké)</span>
              </div>
            </div>
          </div>

          {/* Statistika */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Download className="w-24 h-24 text-white" />
              </div>
              
              <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Informace o souboru</h3>
              
              <div className="mb-6 relative z-10">
                <span className="block text-slate-500 font-bold text-xs uppercase mb-1">Velikost výsledného JPEG</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-emerald-400">{currentSizeMB < 1 ? (currentSizeMB * 1000).toFixed(0) : currentSizeMB.toFixed(2)}</span>
                  <span className="text-2xl text-slate-400 font-bold">{currentSizeMB < 1 ? 'kB' : 'MB'}</span>
                </div>
              </div>

              <div className="mb-6 relative z-10">
                <span className="block text-slate-500 font-bold text-xs uppercase mb-1">Nekomprimováno (RAW Bitmapa)</span>
                <span className="text-xl font-medium text-slate-300">{rawSizeMB.toFixed(2)} MB</span>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-700 relative z-10">
                <span className="block text-slate-400 font-bold text-xs uppercase mb-2">Úspora oproti bitmapě</span>
                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden relative">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-300" 
                    style={{ width: `${savings}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mix-blend-difference">
                    {savings} %
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default JpegSimGame;
