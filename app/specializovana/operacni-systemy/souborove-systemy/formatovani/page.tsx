'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FormattingGame from '@/components/specializovana/operacni-systemy/souborove-systemy/FormattingGame';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-fat">
      <div className="w-full h-full pb-32">
        <FormattingGame
          onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy/alokace-fat')}
        />
      </div>
    </ChapterLayout>
  );
}
