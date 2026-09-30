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
import { formatNumber, countryCodeToFlag, CHART_COLOR_LIST } from '@/lib/utils';
import type { CountryStat } from '@/lib/cloudflare';

interface CountryBarChartProps {
  data: CountryStat[];
  loading?: boolean;
  maxItems?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload as CountryStat;
  return (
    <div className="custom-tooltip">
      <div className="label">
        {countryCodeToFlag(d.countryCode)} {d.country}
      </div>
      <div className="value">{formatNumber(d.pageviews)} zobrazení</div>
    </div>
  );
}

export default function CountryBarChart({ data, loading = false, maxItems = 10 }: CountryBarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-md)' }} />
    );
  }

  if (data.length === 0) {
    return (
      <div className="loading-container" style={{ height: '300px' }}>
        <span style={{ fontSize: '2rem' }}>🌍</span>
        <span>Žádná geografická data</span>
      </div>
    );
  }

  const chartData = data.slice(0, maxItems);
  const max = chartData[0]?.pageviews ?? 1;

  return (
    <div>
      {/* Table view for better readability */}
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ paddingLeft: 0 }}>#</th>
            <th>Země</th>
            <th style={{ width: 160 }}></th>
            <th>Zobrazení</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((row, i) => {
            const pct = Math.round((row.pageviews / max) * 100);
            return (
              <tr key={row.countryCode}>
                <td className="td-rank">{i + 1}</td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  <span style={{ marginRight: '0.4rem' }}>{countryCodeToFlag(row.countryCode)}</span>
                  {row.country}
                </td>
                <td className="td-bar-cell">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: CHART_COLOR_LIST[i % CHART_COLOR_LIST.length],
                      }}
                    />
                  </div>
                </td>
                <td className="td-count">{formatNumber(row.pageviews)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bar chart below the table */}
      <div style={{ marginTop: '1.5rem' }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 30 }}>
            <XAxis
              dataKey="country"
              tick={{ fill: '#475569', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              angle={-35}
              textAnchor="end"
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatNumber(v)}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="pageviews" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={CHART_COLOR_LIST[i % CHART_COLOR_LIST.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
