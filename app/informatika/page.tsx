'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/informatika/LandingPage';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <LandingPage onStartColors={() => router.push('/informatika/barvy')}
            onStartLines={() => router.push('/informatika/cary')}
            onStartCompression={() => router.push('/informatika/komprese')}
            onStartCompressionFormats={() => router.push('/informatika/komprese/formaty')}
            onStartCompressionAlgos={() => router.push('/informatika/komprese/algoritmy')}
            onStartBinary={() => router.push('/informatika/binarni')}
            onStartDataUnits={() => router.push('/informatika/jednotky')}
            onStartModels={() => router.push('/informatika/modely')}
            onStartHardware={() => router.push('/informatika/hardware')}
            onStartOs={() => router.push('/informatika/os')}
            onStartCodes={() => router.push('/informatika/kody')}
            onStartEncryption={() => router.push('/informatika/sifry')}
            onStartFutureTech={() => router.push('/informatika/budoucnost')}
            onBack={() => router.push('/')} />
    </div>
  );
}
