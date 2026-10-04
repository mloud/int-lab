'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupMenu from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupMenu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Zálohování" 
      category="specializovana"
      parent={{ title: 'Operační systémy 2', path: '/specializovana/operacni-systemy-2' }}
    >
      <BackupMenu 
            onBack={() => router.push('/specializovana/operacni-systemy-2')}
            onStartIntro={() => router.push('/specializovana/operacni-systemy-2/zalohovani/uvod')}
            onStartManual={() => router.push('/specializovana/operacni-systemy-2/zalohovani/manualni')}
            onStartCloud={() => router.push('/specializovana/operacni-systemy-2/zalohovani/cloud')}
            onStartSystem={() => router.push('/specializovana/operacni-systemy-2/zalohovani/system')}
            onStartCobian={() => router.push('/specializovana/operacni-systemy-2/zalohovani/cobian')}
      />
    </CategoryLayout>
  );
}
