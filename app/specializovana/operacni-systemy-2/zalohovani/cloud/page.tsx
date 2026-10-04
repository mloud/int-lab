'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupCloudChapter from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupCloudChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Synchronizace do cloudu" 
      category="specializovana"
      parent={{ title: 'Zálohování', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupCloudChapter onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
