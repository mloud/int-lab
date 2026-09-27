'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import TruthTable from '@/components/informatika/binary/TruthTable';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <TruthTable onBack={() => router.push('/informatika/binarni')} />
    </div>
  );
}
