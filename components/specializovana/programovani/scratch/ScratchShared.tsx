"use client";

import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { createTaskKit, CanvasPreview } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/hooks/useLocalStorage';

const { TaskCard: BaseTaskCard, TeacherNote } = createTaskKit({
  tone: 'amber',
  storageKeyFor: (id) => STORAGE_KEYS.scratchTask(id),
  layout: 'header',
});

export { TeacherNote, CanvasPreview };

export const TaskCard = ({
  number,
  title,
  children,
  teacherNote,
  showTeacher,
  taskId,
  saveAs,
  storagePrefix,
}: {
  number: string;
  title?: string;
  children: React.ReactNode;
  teacherNote?: React.ReactNode;
  showTeacher?: boolean;
  taskId: string;
  saveAs?: string;
  storagePrefix?: string;
}) => (
  <BaseTaskCard
    number={number}
    title={title}
    teacherNote={teacherNote}
    showTeacher={showTeacher}
    taskId={storagePrefix ? `${storagePrefix}_${taskId}` : taskId}
    saveAs={saveAs}
  >
    {children}
  </BaseTaskCard>
);

export const AvailableBlocks = ({
  children,
  title = "Dostupné bloky:",
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <div className="flex flex-wrap gap-2 my-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
    <span className="text-sm font-bold text-slate-500 mr-2">{title}</span>
    {children}
  </div>
);

export const Line = ({
  x1,
  y1,
  x2,
  y2,
  color = "blue",
  strokeWidth = 3,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
}) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return (
    <div
      className="absolute origin-left"
      style={{
        left: x1,
        top: y1,
        width: length,
        height: strokeWidth,
        backgroundColor: dashed ? 'transparent' : color,
        borderTop: dashed ? `${strokeWidth}px dashed ${color}` : 'none',
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
};

export const CirclePath = ({
  x,
  y,
  r,
  color = "blue",
  strokeWidth = 3,
}: {
  x: number;
  y: number;
  r: number;
  color?: string;
  strokeWidth?: number;
}) => (
  <div
    className="absolute rounded-full"
    style={{
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      border: `${strokeWidth}px solid ${color}`,
      backgroundColor: 'transparent',
    }}
  />
);

export const TeacherPinToggle = ({
  teacherMode,
  setTeacherMode,
}: {
  teacherMode: boolean;
  setTeacherMode: (val: boolean) => void;
}) => {
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState("");

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin === "OS2026") {
      setTeacherMode(true);
      setPinMode(false);
      setPin("");
    }
  };

  return (
    <div className="flex justify-end mb-6">
      {teacherMode ? (
        <button
          onClick={() => setTeacherMode(false)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-all"
        >
          <Unlock className="w-4 h-4" />
          Metodický režim aktivní (Skrýt řešení)
        </button>
      ) : pinMode ? (
        <form onSubmit={handlePinSubmit} className="flex gap-2">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-24 px-3 py-1 text-xs border-2 border-slate-300 rounded-xl outline-none focus:border-amber-500 font-mono"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 text-xs bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            OK
          </button>
        </form>
      ) : (
        <button
          onClick={() => setPinMode(true)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl transition-all"
        >
          <Lock className="w-4 h-4" />
          Učitelský režim (PIN)
        </button>
      )}
    </div>
  );
};
