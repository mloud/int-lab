'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Lock, Unlock, Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Tone, toneClasses } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

/* ------------------------------------------------------------------
 * TaskKit – jediná stavebnice pro úkoly (Scratch, Python, OS, Robotika).
 * Nahrazuje lokální kopie TaskCard / TeacherNote / PIN / CodeSnippet.
 * ------------------------------------------------------------------ */

export const DEFAULT_TEACHER_PINS = ['1234', 'OS2026'];

/* ------------------------ Učitelský režim ------------------------ */

/** Hook držící stav učitelského režimu a PIN formuláře. */
export const useTeacherMode = (pins: string[] = DEFAULT_TEACHER_PINS) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState('');

  const submitPin = () => {
    if (pins.includes(pin)) {
      setTeacherMode(true);
      setPinOpen(false);
    } else {
      alert('Nesprávný PIN');
      setPinOpen(false);
    }
    setPin('');
  };

  const toggle = () => {
    if (teacherMode) setTeacherMode(false);
    else { setPinOpen(true); setPin(''); }
  };

  return { teacherMode, pinOpen, pin, setPin, submitPin, toggle, setPinOpen };
};

export type TeacherModeState = ReturnType<typeof useTeacherMode>;

/** Univerzální přepínač učitelského režimu s PINem. */
export const TeacherPinBar: React.FC<{ tone?: Tone; state: TeacherModeState }> = ({ tone = 'amber', state }) => {
  const { teacherMode, pinOpen, pin, setPin, submitPin, toggle } = state;
  const t = toneClasses[tone];

  return (
    <div className="flex justify-end mb-6">
      {pinOpen ? (
        <div className={`flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 ${t.border}`}>
          <input
            type="password"
            placeholder="Zadej PIN"
            className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono text-sm"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submitPin()}
            autoFocus
          />
          <button onClick={submitPin} className={`${t.solid} text-white px-3 py-1 rounded-lg font-bold text-xs uppercase`}>OK</button>
        </div>
      ) : (
        <button
          onClick={toggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border-2 uppercase tracking-wider ${
            teacherMode ? `${t.bg} ${t.strong} ${t.border}` : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
          }`}
        >
          {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
        </button>
      )}
    </div>
  );
};

/** Metodická poznámka / vzorové řešení pro učitele. */
export const TeacherNote: React.FC<{ children: React.ReactNode; tone?: Tone }> = ({ children, tone = 'amber' }) => {
  const t = toneClasses[tone];
  return (
    <div className={`mt-4 ${t.bg} border-l-4 ${t.border} p-4 rounded-r-2xl shadow-sm animate-in fade-in zoom-in-95`}>
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className={`w-5 h-5 ${t.icon}`} />
        <span className={`font-bold ${t.strong} uppercase tracking-widest text-xs`}>Metodika pro učitele</span>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
};

/* ----------------------------- TaskCard ----------------------------- */

export interface TaskCardProps {
  number: string;
  title?: string;
  /** Klíč pro uložení stavu „splněno“ (viz STORAGE_KEYS). */
  storageKey: string;
  tone?: Tone;
  saveAs?: string;
  teacherNote?: React.ReactNode;
  showTeacher?: boolean;
  /**
   * 'header' – tlačítko „Hotovo“ v hlavičce (Scratch, OS).
   * 'footer' – číslo vlevo, tlačítko „Splněno“ dole vpravo (Python).
   */
  layout?: 'header' | 'footer';
  children: React.ReactNode;
}

/** Univerzální karta úkolu s trvalým stavem „Hotovo“. */
export const TaskCard: React.FC<TaskCardProps> = ({
  number, title, storageKey, tone = 'amber', saveAs, teacherNote, showTeacher = false, layout = 'header', children,
}) => {
  const [done, setDone] = useLocalStorage(storageKey, false);
  const t = toneClasses[tone];

  if (layout === 'footer') {
    return (
      <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
        <div className="flex gap-4 items-start">
          <div className={`shrink-0 w-12 h-12 ${t.badge} ${t.strong} rounded-2xl flex items-center justify-center font-black text-xl shadow-sm`}>
            {number}
          </div>
          <div className="flex-1 min-w-0">
            {title && <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">{title}</h3>}
            <div className="text-slate-600 leading-relaxed text-sm sm:text-base space-y-4">{children}</div>

            {showTeacher && teacherNote && <TeacherNote tone={tone}>{teacherNote}</TeacherNote>}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDone(!done)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wide uppercase active:scale-95 ${
                  done ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
                {done ? 'Splněno' : 'Označit jako splněné'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 transition-all duration-300 ${done ? `${t.border} ${t.doneBg}` : 'border-white'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${t.badge} rounded-2xl flex items-center justify-center ${t.strong} font-black text-xl shrink-0`}>{number}</div>
          <div>
            {title && <h3 className="text-xl font-black text-slate-800">{title}</h3>}
            {saveAs && (
              <div className={`flex items-center gap-1.5 text-xs font-bold ${t.strong} mt-1 uppercase tracking-wider`}>
                <Save className="w-3.5 h-3.5" /> Uložit jako: {saveAs}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setDone(!done)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors text-sm ${
            done ? `${t.bg} ${t.strong} hover:brightness-95` : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
          }`}
        >
          <CheckCircle className={`w-5 h-5 ${done ? 'opacity-100' : 'opacity-50'}`} />
          {done ? 'Hotovo' : 'Označit za hotové'}
        </button>
      </div>

      <div className="text-sm text-slate-600 leading-relaxed space-y-4">{children}</div>

      {showTeacher && teacherNote && <TeacherNote tone={tone}>{teacherNote}</TeacherNote>}
    </div>
  );
};

/* ---------------------------- CodeSnippet ---------------------------- */

const PROMPTS = ['>>>', '$', 'C:\\>', 'PS>'];
const ERROR_PREFIXES = ['SyntaxError', 'IndentationError', 'Traceback', 'File', 'NameError', 'TypeError', 'ValueError', 'ZeroDivisionError'];

/** Jednotný terminálový blok kódu: zvýrazněný prompt a chybové hlášky Pythonu. */
export const CodeSnippet: React.FC<{ code: string; tone?: Tone }> = ({ code, tone = 'rose' }) => {
  const t = toneClasses[tone];
  return (
    <div className={`bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base ${t.code400} overflow-x-auto shadow-inner border border-slate-700`}>
      {code.split('\n').map((line, i) => {
        const prompt = PROMPTS.find(p => line.startsWith(p));
        return (
          <div key={i} className="flex">
            {prompt ? (
              <>
                <span className={`${t.code500} mr-2 select-none`}>{prompt}</span>
                <span className={`${t.code300} whitespace-pre`}>{line.substring(prompt.length).trim()}</span>
              </>
            ) : ERROR_PREFIXES.some(p => line.startsWith(p)) ? (
              <span className="text-rose-400">{line}</span>
            ) : (
              <span className="text-slate-300 whitespace-pre">{line}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------ Továrna ------------------------------ */

export interface BoundTaskCardProps {
  number: string;
  title?: string;
  taskId: string;
  saveAs?: string;
  teacherNote?: React.ReactNode;
  showTeacher?: boolean;
  children: React.ReactNode;
}

/**
 * Naváže TaskCard, TeacherNote a CodeSnippet na akcentní barvu kapitoly a klíč úložiště.
 * Používá se na úrovni modulu kapitoly, takže použití v JSX zůstává `<TaskCard taskId="3" …>`.
 */
export const createTaskKit = (opts: {
  tone: Tone;
  storageKeyFor: (taskId: string) => string;
  layout?: 'header' | 'footer';
}) => {
  const { tone, storageKeyFor, layout = 'header' } = opts;

  const BoundTaskCard: React.FC<BoundTaskCardProps> = ({ taskId, ...rest }) => (
    <TaskCard {...rest} tone={tone} layout={layout} storageKey={storageKeyFor(taskId)} />
  );
  const BoundTeacherNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TeacherNote tone={tone}>{children}</TeacherNote>
  );
  const BoundSnippet: React.FC<{ code: string }> = ({ code }) => <CodeSnippet code={code} tone={tone} />;

  return { TaskCard: BoundTaskCard, TeacherNote: BoundTeacherNote, PythonSnippet: BoundSnippet };
};

/* ------------------------------ Plátno ------------------------------ */

export const CanvasPreview: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
  bgColor?: string;
}> = ({ children, width = 380, height = 266, className = '', bgColor = 'white' }) => (
  <div
    className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`}
    style={{ width, height, backgroundColor: bgColor }}
  >
    {children}
  </div>
);

/** Obdélník na plátně (nadmnožina všech dřívějších lokálních variant). */
export const Rect: React.FC<{
  x1: number; y1: number; width: number; height: number;
  fill?: string; stroke?: string; strokeWidth?: number; noBorder?: boolean; className?: string;
}> = ({ x1, y1, width, height, fill = 'transparent', stroke = 'black', strokeWidth = 1, noBorder = false, className = '' }) => (
  <div
    className={`absolute ${className}`}
    style={{
      left: x1, top: y1, width, height, backgroundColor: fill,
      border: noBorder || strokeWidth <= 0 ? 'none' : `${strokeWidth}px solid ${stroke}`,
    }}
  />
);

/** Text na plátně (nadmnožina všech dřívějších lokálních variant). */
export const Text: React.FC<{
  x: number; y: number; text: string | number;
  color?: string; align?: 'start' | 'end' | 'center'; baseline?: 'top' | 'middle' | 'bottom';
  fontSize?: number; fontFamily?: string; fontWeight?: string | number;
}> = ({ x, y, text, color = 'black', align = 'center', baseline = 'middle', fontSize = 14, fontFamily, fontWeight = 'normal' }) => {
  const tx = align === 'start' ? '0' : align === 'end' ? '-100%' : '-50%';
  const ty = baseline === 'top' ? '0' : baseline === 'bottom' ? '-100%' : '-50%';
  return (
    <div
      className={`absolute whitespace-pre select-none ${fontFamily ? '' : 'font-sans'}`}
      style={{ left: x, top: y, color, transform: `translate(${tx}, ${ty})`, fontSize: `${fontSize}px`, fontFamily, fontWeight }}
    >
      {text}
    </div>
  );
};

/* ------------------------ DeclarativeTaskList ------------------------ */

export interface TaskDefinition {
  id: string;
  number: string;
  title?: string;
  saveAs?: string;
  assignment: React.ReactNode;
  teacherNote?: React.ReactNode;
}

/** Vykreslí celý seznam úkolů z dat (kontejner `flex flex-col gap-8` dle Pravidla 6). */
export const DeclarativeTaskList: React.FC<{
  tasks: TaskDefinition[];
  teacherMode: boolean;
  tone?: Tone;
  storageKeyFor: (taskId: string) => string;
}> = ({ tasks, teacherMode, tone = 'amber', storageKeyFor }) => (
  <div className="flex flex-col gap-8">
    {tasks.map(task => (
      <TaskCard
        key={task.id}
        number={task.number}
        title={task.title}
        saveAs={task.saveAs}
        tone={tone}
        storageKey={storageKeyFor(task.id)}
        showTeacher={teacherMode}
        teacherNote={task.teacherNote}
      >
        {task.assignment}
      </TaskCard>
    ))}
  </div>
);
