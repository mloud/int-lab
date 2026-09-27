'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgramovaniMenu from '@/components/specializovana/programovani/ProgramovaniMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ProgramovaniMenu onBack={() => router.push('/specializovana')}
            onStartProjects={() => router.push('/specializovana/programovani/projekty')} />
    </div>
  );
}
