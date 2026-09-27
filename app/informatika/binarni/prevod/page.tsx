'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BinaryToDecimal from '@/components/informatika/binary/BinaryToDecimal';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <BinaryToDecimal onBack={() => router.push('/informatika/binarni')} />
    </div>
  );
}
