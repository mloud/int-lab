'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupSystemChapter from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupSystemChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Zálohování stavu systému" 
      category="specializovana"
      parent={{ title: 'Zálohování', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupSystemChapter onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
