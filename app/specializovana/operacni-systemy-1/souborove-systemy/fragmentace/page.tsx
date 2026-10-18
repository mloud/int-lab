'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/specializovana/operacni-systemy-1/souborove-systemy/pokrocile');
  }, [router]);
  return null;
}
