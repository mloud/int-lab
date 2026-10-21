'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupCapacityTestWorksheet from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupCapacityTestWorksheet';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout
      title="Test: Výpočet kapacity záloh"
      category="specializovana"
      parent={{ title: 'Zálohování dat', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupCapacityTestWorksheet onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
