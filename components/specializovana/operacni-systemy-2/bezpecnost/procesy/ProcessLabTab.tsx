'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { ProcessProtocolState } from './processTypes';
import { ProcessLabTasks1to5 } from './lab/ProcessLabTasks1to5';
import { ProcessLabTasks6to9 } from './lab/ProcessLabTasks6to9';
import { ProcessLabTasks10to13 } from './lab/ProcessLabTasks10to13';

interface ProcessLabTabProps {
  studentName: string;
  setStudentName: (name: string) => void;
  checkedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  protocol: ProcessProtocolState;
  setProtocol: (protocol: ProcessProtocolState) => void;
  copyProtocolToClipboard: () => void;
  copiedSuccess: boolean;
  handleDownloadWord: () => void;
}

export default function ProcessLabTab({
  studentName,
  setStudentName,
  checkedTasks,
  toggleTask,
  protocol,
  setProtocol,
  copyProtocolToClipboard,
  copiedSuccess,
  handleDownloadWord
}: ProcessLabTabProps) {
  const completedCount = Object.values(checkedTasks).filter(Boolean).length;

  return (
    <WorksheetLayout
      title="Praktický list: Správa procesů a digitální certifikáty v OS"
      studentName={studentName}
      onStudentNameChange={setStudentName}
      onDownload={handleDownloadWord}
    >
      <div className="space-y-8">

        {/* Auto-save & Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Automatické ukládání aktivní – všechny odpovědi a zaškrtnutí se ukládají do paměti prohlížeče</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
              Splněno: {completedCount} / 13
            </span>
          </div>
        </div>

        <ProcessLabTasks1to5
          checkedTasks={checkedTasks}
          toggleTask={toggleTask}
          protocol={protocol}
          setProtocol={setProtocol}
        />
        <ProcessLabTasks6to9
          checkedTasks={checkedTasks}
          toggleTask={toggleTask}
          protocol={protocol}
          setProtocol={setProtocol}
        />
        <ProcessLabTasks10to13
          checkedTasks={checkedTasks}
          toggleTask={toggleTask}
          protocol={protocol}
          setProtocol={setProtocol}
        />
      </div>
    </WorksheetLayout>
  );
}
