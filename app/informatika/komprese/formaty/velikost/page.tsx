'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ImageSizeGame from '@/components/informatika/compression/ImageSizeGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ImageSizeGame onBack={() => router.push('/informatika/komprese/formaty')} />
    </div>
  );
}
