import React, { useState, useEffect } from 'react';
import { ArrowLeft, Layers, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

interface MemoryAllocatorGameProps {
  onBack: () => void;
}

type MemoryZone = 'stack' | 'heap' | 'data' | 'text';

interface MemoryItem {
  id: string;
  label: string;
  description: string;
  correctZone: MemoryZone;
  placedZone?: MemoryZone;
}

const INITIAL_QUEUE: MemoryItem[] = [
  { id: '1', label: 'skore = 0', description: 'Globální proměnná s výchozí hodnotou.', correctZone: 'data' },
  { id: '2', label: 'x = 10', description: 'Lokální proměnná uvnitř funkce.', correctZone: 'stack' },
  { id: '3', label: 'objekt = Hrac()', description: 'Dynamicky vytvořený objekt (instance třídy).', correctZone: 'heap' },
  { id: '4', label: 'if x > 5:', description: 'Strojová instrukce podmínky (Kód).', correctZone: 'text' },
  { id: '5', label: 'pole = vytvor_pole(100)', description: 'Globální pole dat.', correctZone: 'data' },
  { id: '6', label: 'Návratová adresa', description: 'Kam se má CPU vrátit po skončení funkce.', correctZone: 'stack' },
  { id: '7', label: 'alokuj_pamet(50)', description: 'Ruční vyžádání paměti pro běžící program.', correctZone: 'heap' },
  { id: '8', label: 'Sčítání x + y', description: 'Aritmetická strojová instrukce z kódu.', correctZone: 'text' },
];

const MemoryAllocatorGame: React.FC<MemoryAllocatorGameProps> = ({ onBack }) => {
  const [queue, setQueue] = useState<MemoryItem[]>(INITIAL_QUEUE);
  const [placedItems, setPlacedItems] = useState<MemoryItem[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' | null }>({ message: '', type: null });
  const [heapWarning, setHeapWarning] = useState(false);

  const currentItem = queue[0];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('itemId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zone: MemoryZone) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    
    if (currentItem && currentItem.id === itemId) {
      handlePlacement(currentItem, zone);
    }
  };

  const handlePlacement = (item: MemoryItem, zone: MemoryZone) => {
    const isCorrect = item.correctZone === zone;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({ message: `Správně! ${item.label} patří do ${zone.toUpperCase()}.`, type: 'success' });
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setFeedback({ message: `Chyba! ${item.label} nepatří do ${zone.toUpperCase()}. (Patří do ${item.correctZone.toUpperCase()})`, type: 'error' });
    }

    const placedItem = { ...item, placedZone: zone };
    setPlacedItems(prev => [...prev, placedItem]);
    setQueue(prev => prev.slice(1));

    // Simulate Heap getting full
    const heapItemsCount = placedItems.filter(i => i.placedZone === 'heap').length + (zone === 'heap' ? 1 : 0);
    if (heapItemsCount >= 3) {
      setHeapWarning(true);
    }
  };

  const handleGarbageCollect = () => {
    setPlacedItems(prev => prev.filter(item => item.placedZone !== 'heap'));
    setHeapWarning(false);
    setScore(prev => prev + 5);
    setFeedback({ message: 'Paměť z Haldy uvolněna! (+5 bodů)', type: 'success' });
  };

  const resetGame = () => {
    setQueue(INITIAL_QUEUE);
    setPlacedItems([]);
    setScore(0);
    setFeedback({ message: '', type: null });
    setHeapWarning(false);
  };

  const renderZone = (zone: MemoryZone, title: string, colorClass: string, bgClass: string, borderClass: string) => {
    const itemsInZone = placedItems.filter(i => i.placedZone === zone);
    
    return (
      <div 
        className={`flex-1 ${bgClass} ${borderClass} border-2 rounded-2xl p-4 flex flex-col items-center transition-all duration-300 relative ${zone === 'heap' && heapWarning ? 'animate-pulse border-red-500 bg-red-50' : ''}`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, zone)}
      >
        <h3 className={`font-black uppercase tracking-widest text-sm mb-4 ${colorClass}`}>{title}</h3>
        
        {zone === 'heap' && (
          <button 
            onClick={handleGarbageCollect}
            className={`absolute top-2 right-2 p-2 rounded-lg text-white shadow-md transition-all hover:scale-110 active:scale-95 ${heapWarning ? 'bg-red-500 animate-bounce' : 'bg-green-500'}`}
            title="Spustit Garbage Collector (Uvolnit paměť)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        <div className="w-full flex flex-col gap-2 flex-1 overflow-y-auto min-h-[100px]">
          {itemsInZone.length === 0 && <span className="text-gray-400 text-xs text-center mt-4 italic">Přetáhněte sem</span>}
          {itemsInZone.map(item => (
            <div key={item.id} className="bg-white border p-2 rounded shadow-sm text-xs font-bold text-center flex items-center justify-between">
               <span>{item.label}</span>
               {item.correctZone === zone ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center animate-in fade-in duration-500 pb-10">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">Třídička paměti</h2>
        <div className="bg-emerald-100 text-emerald-800 font-black px-4 py-2 rounded-xl text-lg min-w-[100px] text-center shadow-inner">
          Skóre: {score}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Queue & Feedback */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-emerald-100 flex flex-col items-center">
            <Layers className="w-10 h-10 text-emerald-400 mb-2" />
            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm mb-4">Fronta k zařazení</h3>
            
            {currentItem ? (
              <div 
                draggable
                onDragStart={(e) => handleDragStart(e, currentItem.id)}
                className="w-full bg-emerald-50 border-2 border-emerald-500 p-6 rounded-2xl cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="font-mono font-bold text-lg text-emerald-900 text-center mb-2">
                  {currentItem.label}
                </div>
                <div className="text-sm text-emerald-700 text-center">
                  {currentItem.description}
                </div>
                <div className="mt-4 text-xs text-center text-emerald-500 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  Přetáhni myší do paměti
                </div>
              </div>
            ) : (
              <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-2xl text-center">
                <p className="font-bold text-gray-500 mb-4">Vše zařazeno!</p>
                <button 
                  onClick={resetGame}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all uppercase text-sm tracking-wider"
                >
                  Hrát znovu
                </button>
              </div>
            )}
            
            <div className="mt-6 text-xs text-gray-400 font-medium w-full flex justify-between">
              <span>Zbývá: {queue.length}</span>
            </div>
          </div>

          {/* Feedback Box */}
          <div className={`p-4 rounded-2xl border-2 shadow-sm transition-all duration-300 min-h-[80px] flex items-center justify-center text-center font-medium ${feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : feedback.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-100 text-gray-400'}`}>
             {feedback.message || 'Zařaďte blok dat do správné sekce RAM.'}
          </div>
        </div>

        {/* Right Side: RAM Zones */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-3xl shadow-xl border-4 border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm mb-6 text-center">Fyzická RAM (Virtuální adresní prostor)</h3>
          
          <div className="flex-1 flex flex-col gap-4">
            
            {/* STACK */}
            {renderZone('stack', 'Zásobník (Stack)', 'text-orange-700', 'bg-orange-50/30', 'border-orange-200')}
            
            {/* HEAP */}
            {renderZone('heap', 'Halda (Heap)', 'text-green-700', 'bg-green-50/30', 'border-green-200')}
            
            {/* DATA */}
            {renderZone('data', 'Data / BSS', 'text-blue-700', 'bg-blue-50/30', 'border-blue-200')}
            
            {/* TEXT */}
            {renderZone('text', 'Text (Kód)', 'text-gray-700', 'bg-gray-50', 'border-gray-300')}

          </div>
        </div>

      </div>
    </div>
  );
};

export default MemoryAllocatorGame;
