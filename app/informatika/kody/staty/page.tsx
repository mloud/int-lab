'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CountryCodesGame from '@/components/informatika/codes/CountryCodesGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CountryCodesGame onBack={() => router.push('/informatika/kody')} />
    </div>
  );
}
