'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatNumber, CHART_COLOR_LIST } from '@/lib/utils';
import type { BrowserStat } from '@/lib/cloudflare';

interface BrowserBarChartProps {
  data: BrowserStat[];
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload as BrowserStat;
  return (
    <div className="custom-tooltip">
      <div className="label">{d.browser}</div>
      <div className="value">{formatNumber(d.pageviews)} zobrazení</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        {d.percentage}% podíl
      </div>
    </div>
  );
}

export default function BrowserBarChart({ data, loading = false }: BrowserBarChartProps) {
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

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ paddingLeft: 0 }}>#</th>
            <th>Prohlížeč</th>
            <th style={{ width: 140 }}></th>
            <th>Podíl</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.browser}>
              <td className="td-rank">{i + 1}</td>
              <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{row.browser}</td>
              <td className="td-bar-cell">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${row.percentage}%`,
                      background: CHART_COLOR_LIST[i % CHART_COLOR_LIST.length],
                    }}
                  />
                </div>
              </td>
              <td className="td-count">{row.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1.5rem' }}>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 60, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="browser"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="pageviews" radius={[0, 4, 4, 0]} maxBarSize={18}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLOR_LIST[i % CHART_COLOR_LIST.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
