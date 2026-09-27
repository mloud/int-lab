'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import ProgramovaniMenu from '@/components/specializovana/programovani/ProgramovaniMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="spec-prog">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <ProgramovaniMenu onBack={() => router.push('/specializovana')}
            onStartProjects={() => router.push('/specializovana/programovani/projekty')} />
    </div>
    </ChapterLayout>
  );
}
