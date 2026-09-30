'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatDate, formatNumber } from '@/lib/utils';
import type { TimeSeriesPoint } from '@/lib/cloudflare';

interface PageviewsLineChartProps {
  data: TimeSeriesPoint[];
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{formatDate(label, 'd. MMMM yyyy')}</div>
      <div className="value">{formatNumber(payload[0].value)} zobrazení</div>
      {payload[1] && (
        <div style={{ color: 'var(--accent-indigo)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          ~{formatNumber(payload[1].value)} návštěvníků
        </div>
      )}
    </div>
  );
}

export default function PageviewsLineChart({ data, loading = false }: PageviewsLineChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="skeleton" style={{ height: '280px', borderRadius: 'var(--radius-md)' }} />
    );
  }

  if (data.length === 0) {
    return (
      <div className="loading-container" style={{ height: '280px' }}>
        <span style={{ fontSize: '2rem' }}>📭</span>
        <span>Žádná data pro vybrané období</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatDate(v)}
          tick={{ fill: '#475569', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: '#475569', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatNumber(v)}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="pageviews"
          stroke="#38bdf8"
          strokeWidth={2}
          fill="url(#colorPageviews)"
          dot={false}
          activeDot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }}
          name="Zobrazení"
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="#818cf8"
          strokeWidth={2}
          strokeDasharray="4 2"
          fill="url(#colorVisitors)"
          dot={false}
          activeDot={{ r: 4, fill: '#818cf8', strokeWidth: 0 }}
          name="Návštěvníci"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
