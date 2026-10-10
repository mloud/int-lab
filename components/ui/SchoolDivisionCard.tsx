import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface SchoolDivisionCardProps {
  id?: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  watermarkIcon?: React.ComponentType<{ className?: string }>;
  colorScheme: 'blue' | 'purple' | 'rose' | 'amber' | 'emerald';
  actionLabel?: string;
  onClick: () => void;
  className?: string;
}

const colorStyles = {
  blue: {
    orb: 'from-blue-100 to-cyan-50',
    iconBox: 'bg-blue-50 border-blue-100 text-blue-600',
    iconGlow: 'bg-blue-200',
    watermark: 'text-blue-600',
    shadowHover: 'group-hover:shadow-[0_20px_60px_rgb(59,130,246,0.15)]',
    actionText: 'text-blue-600 group-hover:text-blue-500',
  },
  purple: {
    orb: 'from-purple-100 to-pink-50',
    iconBox: 'bg-purple-50 border-purple-100 text-purple-600',
    iconGlow: 'bg-purple-200',
    watermark: 'text-purple-600',
    shadowHover: 'group-hover:shadow-[0_20px_60px_rgb(168,85,247,0.15)]',
    actionText: 'text-purple-600 group-hover:text-purple-500',
  },
  rose: {
    orb: 'from-rose-100 to-pink-50',
    iconBox: 'bg-rose-50 border-rose-100 text-rose-600',
    iconGlow: 'bg-rose-200',
    watermark: 'text-rose-600',
    shadowHover: 'group-hover:shadow-[0_20px_60px_rgb(244,63,94,0.15)]',
    actionText: 'text-rose-600 group-hover:text-rose-500',
  },
  amber: {
    orb: 'from-amber-100 to-orange-50',
    iconBox: 'bg-amber-50 border-amber-100 text-amber-600',
    iconGlow: 'bg-amber-200',
    watermark: 'text-amber-600',
    shadowHover: 'group-hover:shadow-[0_20px_60px_rgb(245,158,11,0.15)]',
    actionText: 'text-amber-600 group-hover:text-amber-500',
  },
  emerald: {
    orb: 'from-emerald-100 to-teal-50',
    iconBox: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    iconGlow: 'bg-emerald-200',
    watermark: 'text-emerald-600',
    shadowHover: 'group-hover:shadow-[0_20px_60px_rgb(16,185,129,0.15)]',
    actionText: 'text-emerald-600 group-hover:text-emerald-500',
  },
};

export const SchoolDivisionCard: React.FC<SchoolDivisionCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  watermarkIcon: WatermarkIcon,
  colorScheme,
  actionLabel = 'Vstoupit do modulu',
  onClick,
  className = '',
}) => {
  const styles = colorStyles[colorScheme] || colorStyles.blue;
  const ActiveWatermark = WatermarkIcon || Icon;

  return (
    <motion.div
      id={id}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`group relative cursor-pointer outline-none w-full ${className}`}
    >
      {/* Podkladová záře při najetí */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles.orb} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Tělo hlavní karty rozdělovníku */}
      <div
        className={`relative h-full w-full bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[2.5rem] border border-white overflow-hidden flex flex-col transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${styles.shadowHover}`}
      >
        {/* Pozadí - obří průsvitný vodoznak ikony */}
        <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none transform group-hover:rotate-12 group-hover:scale-110">
          <ActiveWatermark className={`w-64 h-64 ${styles.watermark}`} />
        </div>

        {/* Kontejner ikony */}
        <div className="relative mb-8">
          <div
            className={`absolute inset-0 ${styles.iconGlow} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full`}
          />
          <div
            className={`relative w-20 h-20 border rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm ${styles.iconBox}`}
          >
            <Icon className="w-10 h-10" />
          </div>
        </div>

        {/* Hlavní název rozdělovníku */}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6 uppercase tracking-wide">
          {title}
        </h2>

        {/* Popis větve */}
        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 flex-1">
          {description}
        </p>

        {/* Spodní odkaz s šipkou */}
        <div
          className={`flex items-center gap-3 font-bold uppercase tracking-widest text-sm transition-colors mt-auto ${styles.actionText}`}
        >
          {actionLabel}{' '}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolDivisionCard;
