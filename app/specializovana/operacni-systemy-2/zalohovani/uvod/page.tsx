'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupIntroChapter from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupIntroChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Úvod do zálohování" 
      category="specializovana"
      parent={{ title: 'Zálohování', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupIntroChapter onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
