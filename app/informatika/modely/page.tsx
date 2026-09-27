'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ModelsMenu from '@/components/informatika/models/ModelsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ModelsMenu onBack={() => router.push('/informatika')}
            onStartGraphs={() => router.push('/informatika/modely/graf-rozvrhu')}
            onStartPathFinding={() => router.push('/informatika/modely/hledani-cesty')}
            onStartBlatov={() => router.push('/informatika/modely/blatov')}
            onStartMST={() => router.push('/informatika/modely/kostra')}
            onStartParallel={() => router.push('/informatika/modely/paralelni-procesy')} />
    </div>
  );
}
