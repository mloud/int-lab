'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Industry40Chapter from '@/components/informatika/future-tech/Industry40Chapter';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <Industry40Chapter onBack={() => router.push('/informatika/budoucnost')} />
    </div>
  );
}
