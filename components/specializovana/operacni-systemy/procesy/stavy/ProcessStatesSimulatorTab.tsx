'use client';

import React from 'react';
import ProcessStatesInteractiveSimulator from './ProcessStatesInteractiveSimulator';

export default function ProcessStatesSimulatorTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <ProcessStatesInteractiveSimulator />
    </div>
  );
}
