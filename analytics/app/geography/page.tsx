'use client';

import { useState, useEffect, useCallback } from 'react';
import { Globe, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DateRangePicker from '@/components/DateRangePicker';
import CountryBarChart from '@/components/CountryBarChart';
import { getCountryBreakdown, type CountryStat } from '@/lib/cloudflare';
import { getDefaultDateRange, formatNumber, countryCodeToFlag } from '@/lib/utils';

export default function GeographyPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<CountryStat[]>([]);

  const loadData = useCallback(async (selectedDays: number) => {
    setLoading(true);
    setError(null);
    const range = getDefaultDateRange(selectedDays);
    try {
      const data = await getCountryBreakdown(range);
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(days);
  }, [days, loadData]);

  const totalViews = countries.reduce((sum, c) => sum + c.pageviews, 0);
  const top3 = countries.slice(0, 3);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Geografie</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              — {countries.length} zemí
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

          {/* Top 3 countries highlight */}
          {!loading && top3.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              {top3.map((country, i) => (
                <div key={country.countryCode} className={`stat-card ${['sky', 'indigo', 'emerald'][i] as 'sky' | 'indigo' | 'emerald'}`}>
                  <div className="stat-label">
                    {['🥇 Nejlepší', '🥈 Druhá', '🥉 Třetí'][i]}
                  </div>
                  <div className="stat-value" style={{ fontSize: '1.4rem' }}>
                    {countryCodeToFlag(country.countryCode)} {country.country}
                  </div>
                  <div className="stat-sub">
                    {formatNumber(country.pageviews)} zobrazení
                    {' '}({totalViews > 0 ? Math.round((country.pageviews / totalViews) * 100) : 0}%)
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
              ))}
            </div>
          )}

          {/* Main country breakdown */}
          <div className="card">
            <div className="card-title">
              <Globe size={14} />
              Rozložení návštěvnosti podle zemí
            </div>
            <CountryBarChart data={countries} loading={loading} maxItems={20} />
          </div>

          {/* Full country table */}
          {!loading && countries.length > 20 && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div className="card-title">Všechny země ({countries.length})</div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 0 }}>#</th>
                    <th>Země</th>
                    <th>Zobrazení</th>
                    <th>Podíl</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country, i) => (
                    <tr key={country.countryCode}>
                      <td className="td-rank">{i + 1}</td>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {countryCodeToFlag(country.countryCode)} {country.country}
                      </td>
                      <td className="td-count" style={{ textAlign: 'right' }}>
                        {formatNumber(country.pageviews)}
                      </td>
                      <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                        {totalViews > 0 ? Math.round((country.pageviews / totalViews) * 100) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
