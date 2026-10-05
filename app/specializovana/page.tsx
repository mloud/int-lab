'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SpecializovanaMenu from '@/components/specializovana/SpecializovanaMenu';

import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Specializovaná IT" category="specializovana">
      <SpecializovanaMenu 
            onBack={() => router.push('/')}
            onStartOperacniSystemy={() => router.push('/specializovana/operacni-systemy')}
            onStartOperacniSystemy2={() => router.push('/specializovana/operacni-systemy-2')}
            onStartProgramming={() => router.push('/specializovana/programovani')} 
            onStartProgramming2={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
