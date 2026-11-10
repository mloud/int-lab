'use client';

import React from 'react';
import PersistenceExplorerSim from './simulators/PersistenceExplorerSim';

export default function PersistenceSimulatorsTab() {
  return (
    <div className="space-y-8">
      <PersistenceExplorerSim />
    </div>
  );
}
