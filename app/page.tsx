'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SubjectSelection from '@/components/common/SubjectSelection';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <SubjectSelection onSelectInformatika={() => router.push('/informatika')} onSelectSpecializovana={() => router.push('/specializovana')} />
    </div>
  );
}
