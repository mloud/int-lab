import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Globe2, Trash2 } from 'lucide-react';

interface CountryCodesGameProps {
  onBack: () => void;
}

interface CountryData {
  id: string;
  name: string;
  domain: string;
  currency: string;
  plate: string;
}

const COUNTRIES: CountryData[] = [
  { id: 'cz', name: 'ČESKO', domain: '.cz', currency: 'CZK', plate: 'CZ' },
  { id: 'jp', name: 'JAPONSKO', domain: '.jp', currency: 'JPY', plate: 'J' },
  { id: 'at', name: 'RAKOUSKO', domain: '.at', currency: 'EUR', plate: 'A' },
  { id: 'sk', name: 'SLOVENSKO', domain: '.sk', currency: 'EUR', plate: 'SK' },
  { id: 'si', name: 'SLOVINSKO', domain: '.si', currency: 'EUR', plate: 'SLO' },
  { id: 'us', name: 'SPOJENÉ STÁTY AMERICKÉ', domain: '.edu, .gov', currency: 'USD', plate: 'USA' },
  { id: 'se', name: 'ŠVÉDSKO', domain: '.se', currency: 'SEK', plate: 'S' },
  { id: 'ch', name: 'ŠVÝCARSKO', domain: '.ch', currency: 'CHF', plate: 'CH' },
];

type ItemType = 'domain' | 'currency' | 'plate';

interface PlacedItem {
  value: string;
  originalId: string;
}

const CountryCodesGame: React.FC<CountryCodesGameProps> = ({ onBack }) => {
  const [placedItems, setPlacedItems] = useState<Record<string, PlacedItem>>({});
  
  const [availableDomains, setAvailableDomains] = useState<{id: string, value: string}[]>([]);
  const [availableCurrencies, setAvailableCurrencies] = useState<{id: string, value: string}[]>([]);
  const [availablePlates, setAvailablePlates] = useState<{id: string, value: string}[]>([]);
  
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
    
    setAvailableDomains(shuffle(COUNTRIES.map((c, i) => ({ id: `d_${i}`, value: c.domain }))));
    setAvailableCurrencies(shuffle(COUNTRIES.map((c, i) => ({ id: `c_${i}`, value: c.currency }))));
    setAvailablePlates(shuffle(COUNTRIES.map((c, i) => ({ id: `p_${i}`, value: c.plate }))));
    
    setPlacedItems({});
    setIsWon(false);
  };

  const checkWin = (newPlaced: Record<string, PlacedItem>) => {
    let allCorrect = true;
    let placedCount = 0;
    
    for (const country of COUNTRIES) {
      const placedDomain = newPlaced[`${country.id}_domain`];
      const placedCurrency = newPlaced[`${country.id}_currency`];
      const placedPlate = newPlaced[`${country.id}_plate`];
      
      if (placedDomain) placedCount++;
      if (placedCurrency) placedCount++;
      if (placedPlate) placedCount++;

      if (placedDomain && placedDomain.value !== country.domain) allCorrect = false;
      if (placedCurrency && placedCurrency.value !== country.currency) allCorrect = false;
      if (placedPlate && placedPlate.value !== country.plate) allCorrect = false;
    }

    if (placedCount === COUNTRIES.length * 3 && allCorrect) {
      setIsWon(true);
    }
  };

  const handleDragStart = (e: React.DragEvent, type: ItemType, id: string, value: string) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('value', value);
    // Optional effect
    if (e.dataTransfer.setDragImage) {
      // Could set a drag image here if we wanted
    }
  };

  const handleDrop = (e: React.DragEvent, countryId: string, cellType: ItemType) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type') as ItemType;
    const id = e.dataTransfer.getData('id');
    const value = e.dataTransfer.getData('value');

    if (!type || !id || !value) return;
    if (type !== cellType) return; // Must place in correct column type

    const cellKey = `${countryId}_${cellType}`;
    const existingItem = placedItems[cellKey];

    const newPlaced = { ...placedItems };

    // Return existing item to pool if any
    if (existingItem) {
      if (cellType === 'domain') setAvailableDomains(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
      if (cellType === 'currency') setAvailableCurrencies(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
      if (cellType === 'plate') setAvailablePlates(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
    }

    // Remove new item from pool
    if (cellType === 'domain') setAvailableDomains(prev => prev.filter(i => i.id !== id));
    if (cellType === 'currency') setAvailableCurrencies(prev => prev.filter(i => i.id !== id));
    if (cellType === 'plate') setAvailablePlates(prev => prev.filter(i => i.id !== id));

    newPlaced[cellKey] = { value, originalId: id };
    setPlacedItems(newPlaced);
    checkWin(newPlaced);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleRemoveClick = (countryId: string, cellType: ItemType) => {
    const cellKey = `${countryId}_${cellType}`;
    const existingItem = placedItems[cellKey];

    if (!existingItem) return;

    const newPlaced = { ...placedItems };
    delete newPlaced[cellKey];
    
    // Return to pool
    if (cellType === 'domain') setAvailableDomains(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
    if (cellType === 'currency') setAvailableCurrencies(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
    if (cellType === 'plate') setAvailablePlates(prev => [...prev, { id: existingItem.originalId, value: existingItem.value }]);
    
    setPlacedItems(newPlaced);
  };

  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-2 py-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <button
          onClick={startNewGame}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-blue-100 uppercase tracking-wider text-xs"
        >
          <RotateCcw className="w-4 h-4" /> Restart
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-8 rounded-[2rem] shadow-2xl border-4 border-white mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase flex items-center justify-center gap-3">
            <Globe2 className="w-8 h-8 text-blue-500" />
            Státy a jejich kódy
          </h2>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Přetáhni (drag & drop) kód ze skupiny do správné buňky. Kliknutím na vyplněnou buňku kód odstraníš.
          </p>
        </div>

        {/* Pools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-gray-100">
          <div>
            <h3 className="text-center font-bold text-gray-700 mb-3 uppercase tracking-wider text-sm">Domény</h3>
            <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
              {availableDomains.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'domain', item.id, item.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-bold border-2 transition-all bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-100 cursor-grab active:cursor-grabbing hover:-translate-y-1 shadow-sm"
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-center font-bold text-gray-700 mb-3 uppercase tracking-wider text-sm">Měny</h3>
            <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
              {availableCurrencies.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'currency', item.id, item.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-bold border-2 transition-all bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 cursor-grab active:cursor-grabbing hover:-translate-y-1 shadow-sm"
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-center font-bold text-gray-700 mb-3 uppercase tracking-wider text-sm">SPZ</h3>
            <div className="flex flex-wrap justify-center gap-2 min-h-[40px]">
              {availablePlates.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'plate', item.id, item.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-bold border-2 transition-all bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400 hover:bg-purple-100 cursor-grab active:cursor-grabbing hover:-translate-y-1 shadow-sm"
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-200 text-gray-500 uppercase font-black tracking-wider text-sm">Stát</th>
                <th className="p-3 border-b-2 border-gray-200 text-blue-600 uppercase font-black tracking-wider text-sm text-center w-[25%]">Doména</th>
                <th className="p-3 border-b-2 border-gray-200 text-emerald-600 uppercase font-black tracking-wider text-sm text-center w-[25%]">Kód měny</th>
                <th className="p-3 border-b-2 border-gray-200 text-purple-600 uppercase font-black tracking-wider text-sm text-center w-[25%]">SPZ</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map(country => {
                const domainItem = placedItems[`${country.id}_domain`];
                const currencyItem = placedItems[`${country.id}_currency`];
                const plateItem = placedItems[`${country.id}_plate`];

                const isDomainCorrect = domainItem?.value === country.domain;
                const isDomainWrong = domainItem && domainItem.value !== country.domain;
                const isCurrencyCorrect = currencyItem?.value === country.currency;
                const isCurrencyWrong = currencyItem && currencyItem.value !== country.currency;
                const isPlateCorrect = plateItem?.value === country.plate;
                const isPlateWrong = plateItem && plateItem.value !== country.plate;

                return (
                  <tr key={country.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 border-b border-gray-100 font-bold text-gray-700">{country.name}</td>
                    
                    <td className="p-2 border-b border-gray-100 text-center">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, country.id, 'domain')}
                        onClick={() => handleRemoveClick(country.id, 'domain')}
                        className={`w-full h-[40px] rounded-lg flex items-center justify-center font-bold text-sm transition-all group ${
                          isDomainCorrect ? 'bg-green-100 text-green-800 border-2 border-green-400 cursor-pointer shadow-sm hover:border-red-300' :
                          isDomainWrong ? 'bg-red-100 text-red-800 border-2 border-red-400 cursor-pointer shadow-sm hover:border-red-300' : 
                          'border-2 border-dashed border-gray-200 bg-white/50'
                        }`}
                        title={domainItem ? "Kliknutím odstraníš" : "Přetáhni sem"}
                      >
                        {domainItem ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span className="group-hover:opacity-0 transition-opacity">{domainItem.value}</span>
                            <Trash2 className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                          </div>
                        ) : ''}
                      </div>
                    </td>

                    <td className="p-2 border-b border-gray-100 text-center">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, country.id, 'currency')}
                        onClick={() => handleRemoveClick(country.id, 'currency')}
                        className={`w-full h-[40px] rounded-lg flex items-center justify-center font-bold text-sm transition-all group ${
                          isCurrencyCorrect ? 'bg-green-100 text-green-800 border-2 border-green-400 cursor-pointer shadow-sm hover:border-red-300' :
                          isCurrencyWrong ? 'bg-red-100 text-red-800 border-2 border-red-400 cursor-pointer shadow-sm hover:border-red-300' : 
                          'border-2 border-dashed border-gray-200 bg-white/50'
                        }`}
                        title={currencyItem ? "Kliknutím odstraníš" : "Přetáhni sem"}
                      >
                        {currencyItem ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span className="group-hover:opacity-0 transition-opacity">{currencyItem.value}</span>
                            <Trash2 className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                          </div>
                        ) : ''}
                      </div>
                    </td>

                    <td className="p-2 border-b border-gray-100 text-center">
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, country.id, 'plate')}
                        onClick={() => handleRemoveClick(country.id, 'plate')}
                        className={`w-full h-[40px] rounded-lg flex items-center justify-center font-bold text-sm transition-all group ${
                          isPlateCorrect ? 'bg-green-100 text-green-800 border-2 border-green-400 cursor-pointer shadow-sm hover:border-red-300' :
                          isPlateWrong ? 'bg-red-100 text-red-800 border-2 border-red-400 cursor-pointer shadow-sm hover:border-red-300' : 
                          'border-2 border-dashed border-gray-200 bg-white/50'
                        }`}
                        title={plateItem ? "Kliknutím odstraníš" : "Přetáhni sem"}
                      >
                        {plateItem ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span className="group-hover:opacity-0 transition-opacity">{plateItem.value}</span>
                            <Trash2 className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                          </div>
                        ) : ''}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {Object.keys(placedItems).length === COUNTRIES.length * 3 && !isWon && (
          <div className="w-full p-4 bg-red-50 rounded-2xl border-2 border-red-200 text-red-700 font-bold text-center mt-6 animate-pulse">
            Něco není správně. Zkus chybná přiřazení vrátit kliknutím na buňku!
          </div>
        )}

        {isWon && (
          <div className="mt-8 p-8 bg-green-50 rounded-[2rem] border-4 border-green-100 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 shadow-xl">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl sm:text-3xl font-black text-green-800 uppercase tracking-tight mb-2">Výborně!</h3>
            <p className="text-green-600 font-bold uppercase tracking-wider">Všechny údaje států jsou správně zařazeny.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCodesGame;
