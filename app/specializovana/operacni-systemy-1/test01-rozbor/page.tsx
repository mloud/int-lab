'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryLayout from '@/components/layout/CategoryLayout';
import TestReviewQuiz from '@/components/specializovana/operacni-systemy/test01-rozbor/TestReviewQuiz';

export default function TestReviewPage() {
  const router = useRouter();

  return (
    <CategoryLayout
      title="Procvičování na test 1"
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <TestReviewQuiz onBack={() => router.push('/specializovana/operacni-systemy-1')} />
    </CategoryLayout>
  );
}
