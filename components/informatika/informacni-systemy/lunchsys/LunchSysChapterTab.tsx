'use client';
import React, { useState } from 'react';
import { LunchSysStep } from './LunchSysTypes';
import { LunchSysBrainstormStep } from './LunchSysBrainstormStep';
import { LunchSysSelectionStep } from './LunchSysSelectionStep';

export const LunchSysChapterTab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<LunchSysStep>(1);

  return (
    <div className="w-full">
      {currentStep === 1 ? (
        <LunchSysBrainstormStep onNextStep={() => setCurrentStep(2)} />
      ) : (
        <LunchSysSelectionStep onBackToBrainstorm={() => setCurrentStep(1)} />
      )}
    </div>
  );
};

export default LunchSysChapterTab;

