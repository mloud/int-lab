'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatNumber, formatDeviceName, CHART_COLOR_LIST } from '@/lib/utils';
import type { DeviceStat } from '@/lib/cloudflare';

interface DevicePieChartProps {
  data: DeviceStat[];
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="label">{entry.name}</div>
      <div className="value">{formatNumber(entry.value)} zobrazení</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        {entry.payload.percentage}% podíl
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLegend({ payload }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 0.5rem' }}>
      {payload?.map((entry: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: entry.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>{entry.value}</span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-primary)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
            {entry.payload.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DevicePieChart({ data, loading = false }: DevicePieChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="skeleton" style={{ height: '220px', borderRadius: 'var(--radius-md)' }} />
    );
  }

  if (data.length === 0) {
    return (
      <div className="loading-container" style={{ height: '220px' }}>
        <span>Žádná data</span>
      </div>
    );
  }

  const chartData = data.map(d => ({
    ...d,
    name: formatDeviceName(d.device),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          cx="40%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="pageviews"
          strokeWidth={0}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={CHART_COLOR_LIST[index % CHART_COLOR_LIST.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
