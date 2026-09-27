'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ChecksumGame from '@/components/informatika/compression/ChecksumGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ChecksumGame onBack={() => router.push('/informatika/komprese')} />
    </div>
  );
}
