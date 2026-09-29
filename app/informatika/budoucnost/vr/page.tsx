'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import VRChapter from '@/components/informatika/future-tech/VRChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="budoucnost">
      <VRChapter onBack={() => router.push('/informatika/budoucnost')} />
    </ChapterLayout>
  );
}
