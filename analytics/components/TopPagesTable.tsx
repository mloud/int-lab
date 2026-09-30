'use client';

import { formatNumber, truncatePath, formatLoadTime } from '@/lib/utils';
import type { TopPage } from '@/lib/cloudflare';

interface TopPagesTableProps {
  data: TopPage[];
  loading?: boolean;
  maxItems?: number;
  showLoadTime?: boolean;
}

export default function TopPagesTable({
  data,
  loading = false,
  maxItems = 10,
  showLoadTime = true,
}: TopPagesTableProps) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: '38px', borderRadius: 'var(--radius-sm)' }} />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="loading-container" style={{ height: '200px' }}>
        <span style={{ fontSize: '2rem' }}>📄</span>
        <span>Žádná data o stránkách</span>
      </div>
    );
  }

  const rows = data.slice(0, maxItems);
  const maxViews = rows[0]?.pageviews ?? 1;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ paddingLeft: 0 }}>#</th>
            <th>Stránka</th>
            <th style={{ width: 140 }}></th>
            <th>Zobrazení</th>
            {showLoadTime && <th>Načítání</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((page, i) => {
            const pct = Math.round((page.pageviews / maxViews) * 100);
            return (
              <tr key={`${page.path}-${i}`}>
                <td className="td-rank">{i + 1}</td>
                <td className="td-path" title={page.path}>
                  {truncatePath(page.path)}
                </td>
                <td className="td-bar-cell">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </td>
                <td className="td-count">{formatNumber(page.pageviews)}</td>
                {showLoadTime && (
                  <td style={{ color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                    {page.avgLoadTime ? formatLoadTime(page.avgLoadTime) : '—'}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
