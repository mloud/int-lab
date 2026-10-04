'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupManualChapter from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupManualChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Manuální zálohování" 
      category="specializovana"
      parent={{ title: 'Zálohování', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupManualChapter onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
