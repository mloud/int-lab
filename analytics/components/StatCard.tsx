'use client';

import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color: 'sky' | 'indigo' | 'emerald' | 'amber';
  loading?: boolean;
}

export default function StatCard({ label, value, sub, icon: Icon, color, loading = false }: StatCardProps) {
  if (loading) {
    return (
      <div className={`stat-card ${color}`}>
        <div className="stat-label">{label}</div>
        <div className="skeleton" style={{ height: '2.5rem', width: '60%', marginTop: '0.5rem' }} />
        <div className="skeleton" style={{ height: '0.8rem', width: '80%', marginTop: '0.5rem' }} />
      </div>
    );
  }

  return (
    <div className={`stat-card ${color}`}>
      <div className={`stat-icon ${color}`}>
        <Icon size={16} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
