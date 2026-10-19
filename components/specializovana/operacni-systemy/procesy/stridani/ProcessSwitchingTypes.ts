export interface ProcessSwitchStep {
  step: number;
  title: string;
  description: string;
  activeProcess: 'p1' | 'os' | 'p2';
  pcValue: string;
  registers: {
    r1: string;
    r2: string;
  };
  p1Pcb: {
    state: string;
    savedPc: string;
  };
  p2Pcb: {
    state: string;
    savedPc: string;
  };
}
