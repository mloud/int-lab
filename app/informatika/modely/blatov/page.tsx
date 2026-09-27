'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BlatovTask from '@/components/informatika/models/BlatovTask';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <BlatovTask onBack={() => router.push('/informatika/modely')} />
    </div>
  );
}
