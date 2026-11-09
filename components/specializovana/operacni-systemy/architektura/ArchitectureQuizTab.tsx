"use client";

import React from 'react';
import TopicReviewQuiz from '@/components/ui/TopicReviewQuiz';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { ARCHITECTURE_REVIEW_QUESTIONS } from './OsArchitectureData';

export const ArchitectureQuizTab = () => (
  <TopicReviewQuiz
    storageKey={STORAGE_KEYS.quiz('oss1_architektura_review_v1')}
    title="Ověření znalostí: Architektura jádra OS"
    subtitle="Ochranné kruhy procesoru (Ring 0 / Ring 3), System Cally, Monolitické jádro vs. Mikrojádro"
    questions={ARCHITECTURE_REVIEW_QUESTIONS}
  />
);
