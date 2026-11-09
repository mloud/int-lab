'use client';
import { createTaskKit, CanvasPreview, Rect, Text } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/hooks/useLocalStorage';

export function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const { TaskCard, TeacherNote, PythonSnippet } = createTaskKit({
  tone: 'rose',
  storageKeyFor: (id) => STORAGE_KEYS.pythonTask('py11', id),
  layout: 'footer',
});

export { TaskCard, TeacherNote, PythonSnippet, CanvasPreview, Rect, Text };
