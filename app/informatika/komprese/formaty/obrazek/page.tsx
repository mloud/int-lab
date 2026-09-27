'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ImageCompressionGame from '@/components/informatika/compression/ImageCompressionGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ImageCompressionGame onBack={() => router.push('/informatika/komprese/formaty')} />
    </div>
  );
}
