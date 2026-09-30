'use client';

import { useState, useEffect, useCallback } from 'react';
import { Smartphone, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DateRangePicker from '@/components/DateRangePicker';
import DevicePieChart from '@/components/DevicePieChart';
import BrowserBarChart from '@/components/BrowserBarChart';
import { getDeviceBreakdown, getBrowserBreakdown, type DeviceStat, type BrowserStat } from '@/lib/cloudflare';
import { getDefaultDateRange, formatDeviceName, formatNumber } from '@/lib/utils';

export default function DevicesPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<DeviceStat[]>([]);
  const [browsers, setBrowsers] = useState<BrowserStat[]>([]);

  const loadData = useCallback(async (selectedDays: number) => {
    setLoading(true);
    setError(null);
    const range = getDefaultDateRange(selectedDays);
    try {
      const [devicesData, browsersData] = await Promise.all([
        getDeviceBreakdown(range),
        getBrowserBreakdown(range),
      ]);
      setDevices(devicesData);
      setBrowsers(browsersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(days);
  }, [days, loadData]);

  const totalViews = devices.reduce((sum, d) => sum + d.pageviews, 0);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Zařízení & Prohlížeče</span>
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

          {/* Device stat cards */}
          {!loading && devices.length > 0 && (
            <div className="stat-grid" style={{ marginBottom: '1.5rem' }}>
              {devices.map((device, i) => {
                const colors: Array<'sky' | 'indigo' | 'emerald' | 'amber'> = ['sky', 'indigo', 'emerald', 'amber'];
                const emojis = ['🖥️', '📱', '📟', '📺'];
                return (
                  <div key={device.device} className={`stat-card ${colors[i % colors.length]}`}>
                    <div className="stat-label">{formatDeviceName(device.device)}</div>
                    <div className="stat-value" style={{ fontSize: '1.6rem' }}>
                      {device.percentage}%
                    </div>
                    <div className="stat-sub">
                      {emojis[i] ?? '📊'} {formatNumber(device.pageviews)} zobrazení
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {loading && (
            <div className="stat-grid" style={{ marginBottom: '1.5rem' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '100px', borderRadius: 'var(--radius-lg)' }} />
              ))}
            </div>
          )}

          {/* Charts grid */}
          <div className="dashboard-grid-bottom">
            <div className="card">
              <div className="card-title">
                <Smartphone size={14} />
                Typy zařízení
              </div>
              <DevicePieChart data={devices} loading={loading} />

              {/* Device detail table */}
              {!loading && devices.length > 0 && (
                <table className="data-table" style={{ marginTop: '1.25rem' }}>
                  <thead>
                    <tr>
                      <th>Zařízení</th>
                      <th>Zobrazení</th>
                      <th>Podíl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((d) => (
                      <tr key={d.device}>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {formatDeviceName(d.device)}
                        </td>
                        <td className="td-count" style={{ textAlign: 'right' }}>{formatNumber(d.pageviews)}</td>
                        <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                          {totalViews > 0 ? Math.round((d.pageviews / totalViews) * 100) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="card">
              <div className="card-title">
                <Smartphone size={14} />
                Prohlížeče
              </div>
              <BrowserBarChart data={browsers} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
