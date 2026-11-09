'use client';

import React from 'react';
import { FileLaunchSimulator } from './simulators/FileLaunchSimulator';
import { AuthenticodeHashSimulator } from './simulators/AuthenticodeHashSimulator';
import { ProcessExplorerSimulator } from './simulators/ProcessExplorerSimulator';

export default function ProcessSimulatorsTab() {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      <FileLaunchSimulator />
      <AuthenticodeHashSimulator />
      <ProcessExplorerSimulator />
    </div>
  );
}
