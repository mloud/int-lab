'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CompressionAlgosMenu from '@/components/informatika/compression/CompressionAlgosMenu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout 
      title="Algoritmy" 
      category="informatika" 
      parent={{ title: 'Komprese dat', path: '/informatika/komprese' }}
    >
      <div className="w-full flex items-center justify-center">
        <CompressionAlgosMenu 
          onBack={() => router.push('/informatika/komprese')} 
          onStartHuffman={() => router.push('/informatika/komprese/algoritmy/huffman')} 
        />
      </div>
    </CategoryLayout>
  );
}
