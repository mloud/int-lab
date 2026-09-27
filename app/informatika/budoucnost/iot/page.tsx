'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import IoTChapter from '@/components/informatika/future-tech/IoTChapter';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <IoTChapter onBack={() => router.push('/informatika/budoucnost')} />
    </div>
  );
}
