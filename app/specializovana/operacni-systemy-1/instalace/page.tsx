'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';

const WindowsInstallGame = dynamic(
  () => import('@/components/specializovana/operacni-systemy/WindowsInstallGame'),
  { ssr: false }
);

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-install">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <WindowsInstallGame onBack={() => router.push('/specializovana/operacni-systemy-1')} />
    </div>
    </ChapterLayout>
  );
}
