'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProcessCertificatesChapter from '@/components/specializovana/operacni-systemy-2/bezpecnost/ProcessCertificatesChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function ProcessCertificatesPage() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Správa procesů a digitální certifikáty" 
      category="specializovana"
      parent={{ title: 'Bezpečnost 1', path: '/specializovana/operacni-systemy-2/bezpecnost' }}
    >
      <ProcessCertificatesChapter onBack={() => router.push('/specializovana/operacni-systemy-2/bezpecnost')} />
    </CategoryLayout>
  );
}
