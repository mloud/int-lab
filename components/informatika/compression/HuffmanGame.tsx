"use client";

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, PlayCircle, Edit3 } from 'lucide-react';
import { HuffmanDemo } from './huffman/HuffmanEncodingDemo';
import { DecodingDemo } from './huffman/HuffmanDecodingDemo';
import { PracticeSection } from './huffman/HuffmanPracticeSection';
import { HuffmanTheorySection } from './huffman/HuffmanTheorySection';

interface HuffmanGameProps {
  onBack: () => void;
}

type TabType = 'theory' | 'encoding' | 'decoding' | 'practice';

const HuffmanGame: React.FC<HuffmanGameProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('theory');

  return (
    <div className="max-w-6xl w-full mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex items-center mb-6 gap-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors font-bold uppercase tracking-widest text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zpět
        </button>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
          Huffmanovo kódování
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-2 rounded-2xl shadow-md flex gap-2 border border-gray-100">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Teorie
          </button>
          <button
            onClick={() => setActiveTab('encoding')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'encoding'
                ? 'bg-blue-100 text-blue-800 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <PlayCircle className="w-4 h-4" /> Ukázka kódování
          </button>
          <button
            onClick={() => setActiveTab('decoding')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'decoding'
                ? 'bg-purple-100 text-purple-800 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <PlayCircle className="w-4 h-4" /> Ukázka dekódování
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'bg-amber-100 text-amber-800 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Edit3 className="w-4 h-4" /> Zkoušení
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[600px]">
        {activeTab === 'theory' && <HuffmanTheorySection />}
        {activeTab === 'encoding' && <HuffmanDemo />}
        {activeTab === 'decoding' && <DecodingDemo />}
        {activeTab === 'practice' && <PracticeSection />}
      </div>
    </div>
  );
};

export default HuffmanGame;
