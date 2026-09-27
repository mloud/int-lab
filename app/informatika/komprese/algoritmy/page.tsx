'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CompressionAlgosMenu from '@/components/informatika/compression/CompressionAlgosMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CompressionAlgosMenu onBack={() => router.push('/informatika/komprese')} onStartHuffman={() => router.push('/informatika/komprese/algoritmy/huffman')} />
    </div>
  );
}
