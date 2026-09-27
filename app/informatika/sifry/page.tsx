'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import EncryptionMenu from '@/components/informatika/encryption/EncryptionMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="sifry">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <EncryptionMenu onBack={() => router.push('/informatika')} />
    </div>
    </ChapterLayout>
  );
}
