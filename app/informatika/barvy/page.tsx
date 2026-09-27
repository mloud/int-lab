'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/informatika/colors/SplashScreen';
import Menu from '@/components/informatika/colors/Menu';
import RGBDrawing from '@/components/informatika/colors/RGBDrawing';
import Quiz from '@/components/informatika/colors/Quiz';
import { Difficulty, Segment } from '@/types';
import { ROCKET_DATA, CAT_DATA, COMPUTER_DATA } from '@/constants';

type Screen = 'splash' | 'menu' | 'drawing' | 'quiz';

export default function ColorsPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedData, setSelectedData] = useState<Segment[]>([]);
  const [levelName, setLevelName] = useState<string>('');

  const handleStartLevel = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        setSelectedData(ROCKET_DATA);
        setLevelName('Raketa');
        break;
      case 'medium':
        setSelectedData(CAT_DATA);
        setLevelName('Kočka');
        break;
      case 'hard':
        setSelectedData(COMPUTER_DATA);
        setLevelName('Počítač');
        break;
    }
    setCurrentScreen('drawing');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onEnter={() => setCurrentScreen('menu')}
            onQuiz={() => setCurrentScreen('quiz')}
            onBack={() => router.push('/informatika')}
          />
        );
      case 'menu':
        return <Menu onStart={handleStartLevel} onBack={() => setCurrentScreen('splash')} />;
      case 'drawing':
        return (
          <RGBDrawing
            onBack={() => setCurrentScreen('menu')}
            initialSegments={selectedData}
            title={levelName}
          />
        );
      case 'quiz':
        return <Quiz onBack={() => setCurrentScreen('splash')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      {renderScreen()}
    </div>
  );
}
