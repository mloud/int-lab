'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link2, AlertCircle, ExternalLink } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DateRangePicker from '@/components/DateRangePicker';
import { getReferrerBreakdown, type ReferrerStat } from '@/lib/cloudflare';
import { getDefaultDateRange, formatNumber } from '@/lib/utils';

function getReferrerLabel(host: string): { label: string; emoji: string } {
  if (!host || host === '') return { label: 'Přímá návštěva / záložka', emoji: '🔖' };
  if (host.includes('google')) return { label: host, emoji: '🔍' };
  if (host.includes('github')) return { label: host, emoji: '🐙' };
  if (host.includes('youtube')) return { label: host, emoji: '▶️' };
  if (host.includes('facebook') || host.includes('fb.')) return { label: host, emoji: '👥' };
  if (host.includes('twitter') || host.includes('x.com')) return { label: host, emoji: '🐦' };
  if (host.includes('reddit')) return { label: host, emoji: '🟠' };
  if (host.includes('bing')) return { label: host, emoji: '🔎' };
  return { label: host, emoji: '🌐' };
}

export default function ReferrersPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referrers, setReferrers] = useState<ReferrerStat[]>([]);

  const loadData = useCallback(async (selectedDays: number) => {
    setLoading(true);
    setError(null);
    const range = getDefaultDateRange(selectedDays);
    try {
      const data = await getReferrerBreakdown(range);
      setReferrers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(days);
  }, [days, loadData]);

  const totalViews = referrers.reduce((sum, r) => sum + r.pageviews, 0);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Referrery</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              — odkud přicházejí návštěvníci
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

          <div className="card">
            <div className="card-title">
              <Link2 size={14} />
              Zdroje návštěvnosti
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '44px', borderRadius: '8px' }} />
                ))}
              </div>
            ) : referrers.length === 0 ? (
              <div className="loading-container">
                <span style={{ fontSize: '2rem' }}>🔗</span>
                <span>Žádná data o zdrojích návštěv</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Cloudflare Web Analytics loguje referrery přicházejícím z externích zdrojů.
                </span>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 0 }}>#</th>
                    <th>Zdroj</th>
                    <th style={{ width: 160 }}></th>
                    <th>Návštěvy</th>
                    <th>Podíl</th>
                  </tr>
                </thead>
                <tbody>
                  {referrers.map((ref, i) => {
                    const { label, emoji } = getReferrerLabel(ref.referrer);
                    const pct = totalViews > 0 ? Math.round((ref.pageviews / totalViews) * 100) : 0;
                    const barPct = referrers[0] ? Math.round((ref.pageviews / referrers[0].pageviews) * 100) : 0;
                    return (
                      <tr key={`${ref.referrer}-${i}`}>
                        <td className="td-rank">{i + 1}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{emoji}</span>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{label}</span>
                            {ref.referrer && ref.referrer !== '' && (
                              <a
                                href={`https://${ref.referrer}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--text-muted)', display: 'flex' }}
                                onClick={e => e.stopPropagation()}
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="td-bar-cell">
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${barPct}%`,
                                background: 'var(--accent-indigo)',
                              }}
                            />
                          </div>
                        </td>
                        <td className="td-count">{formatNumber(ref.pageviews)}</td>
                        <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                          {pct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
