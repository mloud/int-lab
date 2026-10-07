'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsSummaryWorksheet from '@/components/specializovana/operacni-systemy/OsSummaryWorksheet';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  
  return (
    <CategoryLayout 
      title="Hodnocená práce OSS" 
      category="specializovana"
      parent={{ title: 'Operační systémy', path: '/specializovana/operacni-systemy' }}
    >
      <OsSummaryWorksheet onBack={() => router.push('/specializovana/operacni-systemy')} />
    </CategoryLayout>
  );
}
