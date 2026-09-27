'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import CodesMenu from '@/components/informatika/codes/CodesMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="kody">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <CodesMenu onBack={() => router.push('/informatika')}
            onStartLaundryGame={() => router.push('/informatika/kody/prani')}
            onStartEmojiGame={() => router.push('/informatika/kody/emoji')}
            onStartCountryCodesGame={() => router.push('/informatika/kody/staty')} />
    </div>
    </ChapterLayout>
  );
}
