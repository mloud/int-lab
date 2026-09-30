'use client';

interface DateRangePickerProps {
  activeDays: number;
  onChange: (days: number) => void;
}

const OPTIONS = [
  { label: '7 dní', days: 7 },
  { label: '30 dní', days: 30 },
  { label: '90 dní', days: 90 },
];

export default function DateRangePicker({ activeDays, onChange }: DateRangePickerProps) {
  return (
    <div className="date-range-picker">
      {OPTIONS.map((opt) => (
        <button
          key={opt.days}
          className={`date-btn ${activeDays === opt.days ? 'active' : ''}`}
          onClick={() => onChange(opt.days)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
