import React from 'react';

export type ScratchCategory = 'motion' | 'looks' | 'events' | 'control' | 'pen' | 'operators' | 'variables' | 'custom' | 'sensing' | 'empty';

interface ScratchBlockProps {
  category: ScratchCategory;
  children: React.ReactNode;
}

const categoryColors: Record<ScratchCategory, string> = {
  motion: 'bg-[#4C97FF] border-[#3373CC]',
  looks: 'bg-[#9966FF] border-[#774DCB]',
  events: 'bg-[#FFBF00] border-[#CC9900]',
  control: 'bg-[#FFAB19] border-[#CF8B17]',
  pen: 'bg-[#0FBD8C] border-[#0B8E69]',
  operators: 'bg-[#59C059] border-[#389438]',
  variables: 'bg-[#FF8C1A] border-[#DB6E00]',
  custom: 'bg-[#FF6680] border-[#FF3355]',
  sensing: 'bg-[#5CB1D6] border-[#2E8EB8]',
  empty: 'bg-black/10 border-black/20'
};

export const ScratchBlock = ({ category, children }: ScratchBlockProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 m-0.5 rounded-md text-white font-bold text-sm border-b-2 shadow-sm leading-none whitespace-nowrap ${categoryColors[category]}`}>
      {children}
    </span>
  );
};

export const ScratchInput = ({ children, type = 'number' }: { children: React.ReactNode, type?: 'number' | 'text' | 'dropdown' | 'empty' }) => {
  let roundedClass = 'rounded-full'; // default pro čísla (kulatý)
  if (type === 'text') roundedClass = 'rounded'; // obdélník pro text
  if (type === 'dropdown') roundedClass = 'rounded-md pr-4 relative'; // rozbalovací šipka
  if (type === 'empty') roundedClass = 'rounded-full bg-white/20 shadow-none border-none';
  
  // Detekce prázdného místa (mezery) - pro zakulacené velké díry v operátorech
  const isEmptyHole = typeof children === 'string' && children.trim() === '';
  const paddingClass = isEmptyHole ? 'min-w-[32px] min-h-[32px] w-8 h-8' : 'min-w-[20px] px-2 py-0.5';
  const borderClass = type === 'empty' ? '' : 'border border-black/20';

  return (
    <span className={`inline-flex items-center bg-white text-slate-800 mx-1 ${roundedClass} text-sm font-mono font-bold ${paddingClass} justify-center shadow-inner ${borderClass}`}>
      {children}
      {type === 'dropdown' && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-slate-600"></span>
      )}
    </span>
  );
};

export const ScratchDefBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center pl-3 pr-2 py-2 m-0.5 bg-[#FF6680] text-white font-bold text-sm leading-none whitespace-nowrap shadow-sm" style={{ borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderBottom: '2px solid #FF3355' }}>
      <span className="mr-2">scénář pro</span>
      <div className="inline-flex items-center px-3 py-1 bg-[#FF4D6A] rounded-xl border border-[#FF3355]">
        {children}
      </div>
    </div>
  );
};

export const ScratchParam = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 mx-1 bg-[#FF6680] rounded-full text-xs text-white font-bold shadow-inner">
      {children}
    </span>
  );
};

export const ScratchCBlock = ({ category, children, topLabel }: ScratchBlockProps & { topLabel?: React.ReactNode }) => {
  const bgClass = categoryColors[category].split(' ')[0];
  const borderClass = categoryColors[category].split(' ')[1];

  return (
    <div className={`inline-flex flex-col m-1 text-white font-bold text-sm leading-none align-middle drop-shadow-sm`}>
      {/* Horní lišta */}
      <div className={`flex items-center px-2.5 py-1.5 rounded-t-lg rounded-br-lg ${bgClass}`}>
        {topLabel ? topLabel : children}
      </div>
      {/* Levá stěna a vnitřní prostor */}
      <div className="flex">
        <div className={`w-4 ${bgClass}`}></div>
        <div className="bg-transparent min-h-[1.5rem] p-1 flex-1">
          {topLabel ? children : <div className="h-4 w-16"></div>}
        </div>
      </div>
      {/* Spodní lišta */}
      <div className={`h-6 rounded-b-lg rounded-tr-lg border-b-2 flex items-center justify-end pr-2 ${bgClass} ${borderClass}`}>
        <svg className="w-3 h-3 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16v-4a4 4 0 0 0-4-4H5" />
          <path d="M9 4L5 8l4 4" />
        </svg>
      </div>
    </div>
  );
};

export const ScratchSpeechBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inline-flex flex-col items-start mb-2 ml-4">
      <div className="relative z-10 bg-white border-[3px] border-slate-300 rounded-[2.5rem] px-8 py-3 shadow-sm min-w-[120px] flex items-center justify-center">
        <span className="text-2xl text-slate-600 font-sans">{children}</span>
      </div>
      <svg className="absolute -bottom-[12px] left-8 w-8 h-5 z-0" viewBox="0 0 32 20" fill="none">
        <path d="M0 0 L12 20 L32 0" fill="white" stroke="#cbd5e1" strokeWidth="3" strokeLinejoin="round" />
        <rect x="0" y="-5" width="32" height="10" fill="white" />
      </svg>
    </div>
  );
};

export const ScratchHexagon = ({ category = 'operators', children, isSlot = false }: { category?: ScratchCategory, children?: React.ReactNode, isSlot?: boolean }) => {
  const mainBg = categoryColors[category].split(' ')[0];
  const mainBorder = categoryColors[category].split(' ')[1].replace('border-', 'bg-');
  
  const bgClass = isSlot ? mainBorder : mainBg;
  const borderClass = isSlot ? mainBorder : mainBorder;
  
  return (
    <div 
      className={`inline-flex ${borderClass} p-[1.5px] mx-1 drop-shadow-sm`} 
      style={{ clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)' }}
    >
      <span 
        className={`inline-flex items-center justify-center px-4 py-1.5 min-w-[32px] min-h-[36px] text-white font-bold text-lg leading-none whitespace-nowrap ${bgClass}`}
        style={{ clipPath: 'polygon(13px 0, calc(100% - 13px) 0, 100% 50%, calc(100% - 13px) 100%, 13px 100%, 0 50%)' }}
      >
        {children}
      </span>
    </div>
  );
};

export const ScratchCElseBlock = ({ category, children, elseChildren, topLabel = "když", midLabel = "jinak", bottomLabel = "tak", condition }: ScratchBlockProps & { topLabel?: React.ReactNode, midLabel?: React.ReactNode, bottomLabel?: React.ReactNode, elseChildren?: React.ReactNode, condition?: React.ReactNode }) => {
  const bgClass = categoryColors[category].split(' ')[0];
  const borderClass = categoryColors[category].split(' ')[1];

  return (
    <div className={`inline-flex flex-col m-1 text-white font-bold text-sm leading-none align-middle drop-shadow-sm`}>
      {/* Horní lišta */}
      <div className={`flex items-center px-2.5 py-1.5 rounded-t-lg rounded-br-lg ${bgClass}`}>
        <span className={condition || topLabel === 'když' ? "mr-1" : ""}>{topLabel}</span>
        {condition !== undefined ? condition : <ScratchHexagon isSlot category={category} />}
        <span className={condition || bottomLabel === 'tak' ? "ml-1" : ""}>{bottomLabel}</span>
      </div>
      {/* Vnitřek 1 */}
      <div className="flex">
        <div className={`w-4 ${bgClass}`}></div>
        <div className="bg-transparent min-h-[1.5rem] p-1 flex-1">{children}</div>
      </div>
      {/* Střední lišta */}
      <div className={`flex items-center px-2.5 py-1.5 rounded-r-lg ${bgClass}`}>
        {midLabel}
      </div>
      {/* Vnitřek 2 */}
      <div className="flex">
        <div className={`w-4 ${bgClass}`}></div>
        <div className="bg-transparent min-h-[1.5rem] p-1 flex-1">{elseChildren}</div>
      </div>
      {/* Spodní lišta */}
      <div className={`h-6 rounded-b-lg rounded-tr-lg border-b-2 flex items-center justify-end pr-2 ${bgClass} ${borderClass}`}>
        <svg className="w-3 h-3 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16v-4a4 4 0 0 0-4-4H5" />
          <path d="M9 4L5 8l4 4" />
        </svg>
      </div>
    </div>
  );
};
