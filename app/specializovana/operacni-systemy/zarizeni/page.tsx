'use client';
import ChapterOutlinePage from '@/components/curriculum/ChapterOutlinePage';

export default function Page() {
  return (
    <ChapterOutlinePage 
      chapterId="os-devices" 
      slug="ovladace" 
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy' }} 
    />
  );
}
