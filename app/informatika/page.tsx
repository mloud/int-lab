'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/informatika/LandingPage';

import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Obecná Informatika" category="informatika">
            <LandingPage 
            onStartColors={() => router.push('/informatika/barvy')}
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
            onStartArApps={() => router.push('/informatika/ar')}
            onStartBarCharts={() => router.push('/informatika/grafy')}
            onBack={() => router.push('/')} />
    </CategoryLayout>
  );
}
