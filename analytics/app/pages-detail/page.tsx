'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileText, Search, AlertCircle, ArrowUpDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DateRangePicker from '@/components/DateRangePicker';
import TopPagesTable from '@/components/TopPagesTable';
import PageviewsLineChart from '@/components/PageviewsLineChart';
import { getTopPages, getPageviewsOverTime, type TopPage, type TimeSeriesPoint } from '@/lib/cloudflare';
import { getDefaultDateRange, formatNumber, truncatePath, formatLoadTime } from '@/lib/utils';

export default function PagesDetailPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<TopPage[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const loadData = useCallback(async (selectedDays: number) => {
    setLoading(true);
    setError(null);
    const range = getDefaultDateRange(selectedDays);
    try {
      const [pagesData, tsData] = await Promise.all([
        getTopPages(range, 100),
        getPageviewsOverTime(range),
      ]);
      setPages(pagesData);
      setTimeSeries(tsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(days);
  }, [days, loadData]);

  const filteredPages = pages.filter(p =>
    p.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalViews = pages.reduce((sum, p) => sum + p.pageviews, 0);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Stránky</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              — {pages.length} stránek nalezeno
            </span>
          </div>
          <DateRangePicker activeDays={days} onChange={setDays} />
        </header>

        <div className="page-content">
          {error && (
            <div className="error-box" style={{ marginBottom: '1.5rem' }}>
              <strong>
                <AlertCircle size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                Chyba při načítání dat
              </strong>
              {error}
            </div>
          )}

          {/* Summary + Chart */}
          <div className="dashboard-grid-main" style={{ marginBottom: '1.5rem' }}>
            <div className="card">
              <div className="card-title">
                <FileText size={14} />
                Trend zobrazení — všechny stránky
              </div>
              <PageviewsLineChart data={timeSeries} loading={loading} />
            </div>

            {/* Summary stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ flex: 1 }}>
                <div className="stat-label">Celková zobrazení</div>
                <div className="stat-value">{formatNumber(totalViews)}</div>
                <div className="stat-sub">za posledních {days} dní</div>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <div className="stat-label">Počet stránek</div>
                <div className="stat-value">{pages.length}</div>
                <div className="stat-sub">aktivních stránek v portálu</div>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <div className="stat-label">Průměrné zobrazení / stránku</div>
                <div className="stat-value">
                  {pages.length > 0 ? formatNumber(Math.round(totalViews / pages.length)) : '—'}
                </div>
                <div className="stat-sub">průměr přes všechny stránky</div>
              </div>
            </div>
          </div>

          {/* Full Pages Table */}
          <div className="card">
            <div
              className="card-title"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowUpDown size={14} />
                Všechny stránky ({filteredPages.length})
              </span>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search
                  size={14}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Hledat stránku..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.75rem 0.4rem 2rem',
                    outline: 'none',
                    width: '220px',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '36px', borderRadius: '6px' }} />
                ))}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 0 }}>#</th>
                      <th>URL cesta</th>
                      <th style={{ width: 160 }}></th>
                      <th>Zobrazení</th>
                      <th>Podíl</th>
                      <th>Průměrné načítání</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPages.map((page, i) => {
                      const pct = totalViews > 0 ? Math.round((page.pageviews / totalViews) * 100) : 0;
                      const barPct = filteredPages[0] ? Math.round((page.pageviews / filteredPages[0].pageviews) * 100) : 0;
                      return (
                        <tr
                          key={`${page.path}-${i}`}
                          onClick={() => setSelectedPage(selectedPage === page.path ? null : page.path)}
                          style={{
                            cursor: 'pointer',
                            background: selectedPage === page.path ? 'var(--accent-sky-dim)' : undefined,
                          }}
                        >
                          <td className="td-rank">{i + 1}</td>
                          <td className="td-path" title={page.path}>
                            {truncatePath(page.path, 60)}
                          </td>
                          <td className="td-bar-cell">
                            <div className="progress-bar-bg">
                              <div className="progress-bar-fill" style={{ width: `${barPct}%` }} />
                            </div>
                          </td>
                          <td className="td-count">{formatNumber(page.pageviews)}</td>
                          <td style={{ color: 'var(--text-secondary)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                            {pct}%
                          </td>
                          <td style={{ color: 'var(--text-secondary)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                            {page.avgLoadTime ? formatLoadTime(page.avgLoadTime) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredPages.length === 0 && !loading && (
                  <div className="loading-container">
                    <span style={{ fontSize: '2rem' }}>🔍</span>
                    <span>Žádná stránka neodpovídá hledání &ldquo;{searchQuery}&rdquo;</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
