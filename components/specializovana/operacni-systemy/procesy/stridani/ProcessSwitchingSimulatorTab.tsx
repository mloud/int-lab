'use client';

import React from 'react';
import CpuSwitchingSimulator from '../CpuSwitchingSimulator';

export default function ProcessSwitchingSimulatorTab() {
  return (
    <CpuSwitchingSimulator 
      mode="quantum-only"
      title="Interaktivní simulátor: Střídání úloh na CPU a časová osa"
      subtitle="Sledujte vykonávání instrukcí, posun registru PC v paměti a synchronizovaný časový diagram pod procesorem."
    />
  );
}
