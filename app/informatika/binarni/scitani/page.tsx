'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BinaryAddition from '@/components/informatika/binary/BinaryAddition';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <BinaryAddition onBack={() => router.push('/informatika/binarni')} />
    </div>
  );
}
