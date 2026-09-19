import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, SlidersHorizontal, Download, Image as ImageIcon, Upload, Settings } from 'lucide-react';

interface JpegSimGameProps {
  onBack: () => void;
}

type CompFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'raw';

const formatLabels: Record<CompFormat, string> = {
  'image/jpeg': 'JPEG (Ztrátová)',
  'image/webp': 'WebP (Ztrátová/Bezeztrátová)',
  'image/png': 'PNG (Bezeztrátová)',
  'raw': 'RAW / BMP (Nekomprimováno)',
};

const JpegSimGame: React.FC<JpegSimGameProps> = ({ onBack }) => {
  const [imageSrc, setImageSrc] = useState<string>(''); // Vlastně nepoužíváme k zobrazení, jen jako ref
  const [rawSize, setRawSize] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Panel A
  const [formatA, setFormatA] = useState<CompFormat>('image/jpeg');
  const [qualityA, setQualityA] = useState<number>(80);
  const [resultSrcA, setResultSrcA] = useState<string>('');
  const [sizeA, setSizeA] = useState<number>(1);

  // Panel B
  const [formatB, setFormatB] = useState<CompFormat>('raw');
  const [qualityB, setQualityB] = useState<number>(80);
  const [resultSrcB, setResultSrcB] = useState<string>('');
  const [sizeB, setSizeB] = useState<number>(1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  // Načtení výchozího obrázku
  useEffect(() => {
    loadDefaultImage();
  }, []);

  const loadDefaultImage = () => {
    loadPhotoImage();
  };

  const loadPhotoImage = () => {
    setLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    // Příroda s detaily (tráva, stromy), na kterých jsou krásně vidět JPEG artefakty a PNG je obrovské
    img.src = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=100&w=800'; 
    
    img.onload = () => {
      sourceImageRef.current = img;
      setRawSize(img.width * img.height * 3); 
      setLoading(false);
    };
    
    img.onerror = () => {
      loadGraphicImage();
    };
  };

  const loadGraphicImage = () => {
    setLoading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Čistě bílé pozadí (velké jednobarevné plochy jsou pro PNG skvělé)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, 600);
    
    // Ostré hrany a plné barvy
    ctx.fillStyle = '#E11D48'; // Růžovočervená
    ctx.fillRect(100, 100, 300, 400);

    ctx.fillStyle = '#2563EB'; // Modrá
    ctx.beginPath();
    ctx.arc(550, 300, 150, 0, Math.PI * 2);
    ctx.fill();

    // Černý text
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 80px sans-serif';
    ctx.fillText('PNG vs JPEG', 130, 280);

    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = () => {
      sourceImageRef.current = img;
      setRawSize(img.width * img.height * 3);
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
        // Zmenšení pro prohlížeč (zabraňuje přetečení paměti)
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * ratio;
          height = height * ratio;
          
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = width;
          tempCanvas.height = height;
          const tCtx = tempCanvas.getContext('2d');
          tCtx?.drawImage(img, 0, 0, width, height);
          
          const resizedImg = new Image();
          resizedImg.onload = () => {
            sourceImageRef.current = resizedImg;
            setRawSize(resizedImg.width * resizedImg.height * 3);
            setLoading(false);
          };
          resizedImg.src = tempCanvas.toDataURL('image/jpeg', 1.0);
        } else {
          sourceImageRef.current = img;
          setRawSize(img.width * img.height * 3);
          setLoading(false);
        }
      };
      img.onerror = () => {
        alert("Obrázek se nepodařilo načíst (zkuste nahrát jiný formát nebo klasický JPEG/PNG).");
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Funkce pro generování jednoho panelu
  const processImagePanel = (
    format: CompFormat, 
    quality: number, 
    setResultSrc: React.Dispatch<React.SetStateAction<string>>, 
    setSize: React.Dispatch<React.SetStateAction<number>>
  ) => {
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

    let mimeType = format;
    if (format === 'raw') {
      mimeType = 'image/png'; // Prohlížeč nenativně nepodporuje BMP s kompresí, použijeme PNG k vykreslení
    }

    if (format === 'raw') {
      // Vynutíme RAW velikost
      setSize(sourceImageRef.current.width * sourceImageRef.current.height * 3);
      // I pro raw vygenerujeme vizuál přes toBlob (asynchronně)
      canvas.toBlob((blob) => {
        if (blob) setResultSrc(URL.createObjectURL(blob));
      }, mimeType);
    } else {
      // Použijeme toBlob pro přesnou velikost zkomprimovaných binárních dat
      canvas.toBlob((blob) => {
        if (blob) {
          setSize(blob.size);
          setResultSrc(URL.createObjectURL(blob));
        }
      }, mimeType, quality / 100);
    }
  };

  // Reakce na změnu nastavení pro Panel A
  useEffect(() => {
    if (!loading) {
      processImagePanel(formatA, qualityA, setResultSrcA, setSizeA);
    }
  }, [loading, formatA, qualityA, rawSize]);

  // Reakce na změnu nastavení pro Panel B
  useEffect(() => {
    if (!loading) {
      processImagePanel(formatB, qualityB, setResultSrcB, setSizeB);
    }
  }, [loading, formatB, qualityB, rawSize]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Společný stav pro Zoom a Pan
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setScale(s => Math.min(s + 1, 10));
  const handleZoomOut = () => {
    setScale(s => {
      const newScale = Math.max(s - 1, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const encodeBMP = (canvas: HTMLCanvasElement): Blob => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return new Blob();
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    
    const rowBytes = width * 3;
    const padding = (4 - (rowBytes % 4)) % 4;
    const paddedRowBytes = rowBytes + padding;
    const pixelArraySize = paddedRowBytes * height;
    
    const fileSize = 54 + pixelArraySize;
    const buffer = new ArrayBuffer(fileSize);
    const data = new DataView(buffer);
    
    data.setUint8(0, 0x42); // B
    data.setUint8(1, 0x4D); // M
    data.setUint32(2, fileSize, true);
    data.setUint32(6, 0, true);
    data.setUint32(10, 54, true);
    
    data.setUint32(14, 40, true);
    data.setUint32(18, width, true);
    data.setUint32(22, height, true);
    data.setUint16(26, 1, true);
    data.setUint16(28, 24, true);
    data.setUint32(30, 0, true);
    data.setUint32(34, pixelArraySize, true);
    data.setUint32(38, 2835, true);
    data.setUint32(42, 2835, true);
    data.setUint32(46, 0, true);
    data.setUint32(50, 0, true);
    
    const pixels = new Uint8Array(buffer, 54);
    let i = 0;
    
    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            const srcIdx = (y * width + x) * 4;
            pixels[i++] = imageData.data[srcIdx + 2]; // B
            pixels[i++] = imageData.data[srcIdx + 1]; // G
            pixels[i++] = imageData.data[srcIdx];     // R
        }
        for (let p = 0; p < padding; p++) {
            pixels[i++] = 0;
        }
    }
    
    return new Blob([buffer], { type: 'image/bmp' });
  };

  const handleDownload = (src: string, format: CompFormat) => {
    if (!src) return;
    
    if (format === 'raw' && canvasRef.current) {
      // V případě RAW vygenerujeme skutečný BMP místo PNG náhledu
      const blob = encodeBMP(canvasRef.current);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'puvodni_obrazek.bmp';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }

    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const filename = `komprimovany_${qualityA}q.${ext}`;
    
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderPanel = (
    label: string,
    format: CompFormat, 
    setFormat: React.Dispatch<React.SetStateAction<CompFormat>>,
    quality: number,
    setQuality: React.Dispatch<React.SetStateAction<number>>,
    resultSrc: string,
    size: number
  ) => {
    const sizeMB = size / 1000000;
    const savings = Math.max(0, Math.round((1 - size / rawSize) * 100));
    const showQualitySlider = format === 'image/jpeg' || format === 'image/webp';

    return (
      <div className="flex-1 flex flex-col gap-4 bg-white/50 p-4 rounded-3xl border-2 border-purple-100">
        <h3 className="font-bold text-gray-800 uppercase tracking-widest text-center text-sm">{label}</h3>
        
        {/* Ovládání */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Formát komprese</label>
            <select 
              value={format}
              onChange={(e) => setFormat(e.target.value as CompFormat)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold outline-none focus:border-purple-400"
            >
              {Object.entries(formatLabels).map(([val, text]) => (
                <option key={val} value={val}>{text}</option>
              ))}
            </select>
          </div>
          
          <div className={`flex flex-col gap-2 transition-opacity ${showQualitySlider ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kvalita</label>
              <span className="font-black text-purple-700 text-lg">{quality} %</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={quality} 
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>

        {/* Obrazovka */}
        <div 
          className="bg-gray-100 p-2 rounded-2xl border-2 border-gray-200 aspect-square flex items-center justify-center relative overflow-hidden group shadow-inner"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          {loading ? (
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
              Načítám...
            </div>
          ) : (
            <img 
              src={resultSrc} 
              alt="Výsledek komprese"
              className="w-full h-full object-cover rounded-xl transition-transform duration-75"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                imageRendering: (format === 'image/jpeg' && quality < 15) ? 'pixelated' : 'auto' 
              }}
              draggable={false}
            />
          )}
          {showQualitySlider && quality < 15 && !loading && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-3 py-1 rounded-full font-black tracking-widest uppercase text-[10px] backdrop-blur-md shadow-lg pointer-events-none z-10">
              Ztráty
            </div>
          )}
        </div>

        {/* Statistiky a Download */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Settings className="w-16 h-16 text-white" />
          </div>
          
          <div className="relative z-10">
            <span className="block text-slate-500 font-bold text-[10px] uppercase mb-1">Velikost souboru</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-emerald-400">{sizeMB < 1 ? (sizeMB * 1000).toFixed(0) : sizeMB.toFixed(2)}</span>
              <span className="text-lg text-slate-400 font-bold">{sizeMB < 1 ? 'kB' : 'MB'}</span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-1">
              <span className="block text-slate-400 font-bold text-[10px] uppercase">Úspora (vs RAW)</span>
              <span className="font-black text-emerald-400 text-sm">{savings} %</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden relative mb-4">
              <div 
                className="h-full bg-purple-500 transition-all duration-300" 
                style={{ width: `${savings}%` }}
              />
            </div>

            <button 
              onClick={() => handleDownload(resultSrc, format)}
              className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors uppercase tracking-widest text-xs flex justify-center items-center gap-2"
            >
              <Download className="w-4 h-4" /> Stáhnout soubor
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl w-full mx-auto animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex-wrap gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={loadPhotoImage}
            className="flex items-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
          >
            <ImageIcon className="w-4 h-4" /> Fotka (Pro JPEG)
          </button>
          
          <button 
            onClick={loadGraphicImage}
            className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs"
          >
            <ImageIcon className="w-4 h-4" /> Grafika/Logo (Pro PNG)
          </button>

          <div className="relative overflow-hidden inline-block ml-0 sm:ml-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold rounded-2xl transition-all uppercase tracking-wider text-xs w-full h-full">
              <Upload className="w-4 h-4" />
              Vlastní soubor
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
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border-4 border-purple-50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-xl font-black text-purple-600">4</span>
          </div>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Simulace komprese</h2>
        </div>
        <div className="ml-16 mb-8 text-gray-600 font-medium text-base space-y-2 max-w-4xl">
          <p>
            Zde můžeš porovnávat různé formáty obrázků a jejich kompresní algoritmy bok po boku. Zjistíš, jaký vliv má formát a úroveň kvality na vizuální výsledek i na velikost výsledného souboru.
          </p>
          <p className="text-sm">
            <strong>Tip:</strong> Zkus porovnat <strong>RAW / BMP</strong> s <strong>JPEG (kvalita 80%)</strong>. Uvidíš obrovský rozdíl ve velikosti souboru bez vizuální ztráty kvality!
          </p>
        </div>

        {/* Skrytý canvas pro rendering */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Nástroje (Zoom) */}
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={handleZoomOut} disabled={scale <= 1} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 disabled:opacity-50 transition-colors">
            Oddálit (-)
          </button>
          <div className="px-4 py-2 font-black text-gray-800 flex items-center bg-gray-50 rounded-lg border border-gray-200">
            Lupa: {scale}x
          </div>
          <button onClick={handleZoomIn} disabled={scale >= 10} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 disabled:opacity-50 transition-colors">
            Přiblížit (+)
          </button>
          {scale > 1 && (
            <button onClick={() => { setScale(1); setPosition({x:0, y:0}); }} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition-colors">
              Reset
            </button>
          )}
        </div>

        {/* Porovnávací layout */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {renderPanel("Obrázek A", formatA, setFormatA, qualityA, setQualityA, resultSrcA, sizeA)}
          
          <div className="hidden md:flex flex-col justify-center items-center">
             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold border-2 border-gray-200">
               VS
             </div>
          </div>

          {renderPanel("Obrázek B", formatB, setFormatB, qualityB, setQualityB, resultSrcB, sizeB)}
        </div>
      </div>
    </div>
  );
};

export default JpegSimGame;
