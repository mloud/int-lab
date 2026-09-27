'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgramovaniProjektyMenu from '@/components/specializovana/programovani/ProgramovaniProjektyMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ProgramovaniProjektyMenu onBack={() => router.push('/specializovana/programovani')}
            onStartRaycaster={() => router.push('/specializovana/programovani/projekty/raycaster')} />
    </div>
  );
}
