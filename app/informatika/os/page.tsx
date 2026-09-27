'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsMenu from '@/components/informatika/operacni-systemy/OsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OsMenu onBack={() => router.push('/informatika')}
            onStartMatchGame={() => router.push('/informatika/os/match')}
            onStartBootSequence={() => router.push('/informatika/os/boot')}
            onStartFileExtension={() => router.push('/informatika/os/pripony')}
            onStartRamManager={() => router.push('/informatika/os/ram')}
            onStartShortcutNinja={() => router.push('/informatika/os/zkratky')} />
    </div>
  );
}
