'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Eye,
  Users,
  Zap,
  Globe,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import DateRangePicker from '@/components/DateRangePicker';
import PageviewsLineChart from '@/components/PageviewsLineChart';
import TopPagesTable from '@/components/TopPagesTable';
import DevicePieChart from '@/components/DevicePieChart';
import BrowserBarChart from '@/components/BrowserBarChart';
import {
  getSummaryStats,
  getPageviewsOverTime,
  getTopPages,
  getDeviceBreakdown,
  getBrowserBreakdown,
  type SummaryStats,
  type TimeSeriesPoint,
  type TopPage,
  type DeviceStat,
  type BrowserStat,
} from '@/lib/cloudflare';
import { getDefaultDateRange, formatNumber, formatLoadTime } from '@/lib/utils';

export default function DashboardPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [devices, setDevices] = useState<DeviceStat[]>([]);
  const [browsers, setBrowsers] = useState<BrowserStat[]>([]);

  const loadData = useCallback(async (selectedDays: number) => {
    setLoading(true);
    setError(null);

    const range = getDefaultDateRange(selectedDays);

    try {
      const [summaryData, tsData, pagesData, devicesData, browsersData] = await Promise.all([
        getSummaryStats(range),
        getPageviewsOverTime(range),
        getTopPages(range, 10),
        getDeviceBreakdown(range),
        getBrowserBreakdown(range),
      ]);

      setSummary(summaryData);
      setTimeSeries(tsData);
      setTopPages(pagesData);
      setDevices(devicesData);
      setBrowsers(browsersData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Neznámá chyba';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(days);
  }, [days, loadData]);

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Přehled</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              — posledních {days} dní
            </span>
          </div>
          <DateRangePicker activeDays={days} onChange={handleDaysChange} />
        </header>

        {/* Content */}
        <div className="page-content">
          {/* Error state */}
          {error && (
            <div className="error-box" style={{ marginBottom: '1.5rem' }}>
              <strong>
                <AlertCircle size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                Chyba při načítání dat
              </strong>
              {error}
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', opacity: 0.8 }}>
                Zkontroluj, zda jsou správně nastaveny proměnné prostředí v souboru{' '}
                <code>.env.local</code> (viz <code>.env.example</code> pro instrukce).
              </div>
            </div>
          )}

          {/* Stat Cards */}
          <div className="stat-grid">
            <StatCard
              label="Celková zobrazení"
              value={summary ? formatNumber(summary.totalPageviews) : '—'}
              sub={`za posledních ${days} dní`}
              icon={Eye}
              color="sky"
              loading={loading}
            />
            <StatCard
              label="Odhadovaní návštěvníci"
              value={summary ? formatNumber(summary.uniqueVisitors) : '—'}
              sub="unikátních relací"
              icon={Users}
              color="indigo"
              loading={loading}
            />
            <StatCard
              label="Průměrné načítání"
              value={summary ? formatLoadTime(summary.avgLoadTimeMs) : '—'}
              sub="průměrná rychlost stránky"
              icon={Zap}
              color="emerald"
              loading={loading}
            />
            <StatCard
              label="Top země"
              value={summary?.topCountry ?? '—'}
              sub="nejvíce návštěv"
              icon={Globe}
              color="amber"
              loading={loading}
            />
          </div>

          {/* Main Grid: Chart + Top Pages Preview */}
          <div className="dashboard-grid-main">
            {/* Pageviews Chart */}
            <div className="card">
              <div className="card-title">
                <TrendingUp size={14} />
                Návštěvnost v čase
              </div>
              <PageviewsLineChart data={timeSeries} loading={loading} />
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: 24, height: 2, background: 'var(--accent-sky)', borderRadius: 1 }} />
                  Zobrazení stránek
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  <div style={{
                    width: 24, height: 2,
                    background: 'var(--accent-indigo)',
                    borderRadius: 1,
                    backgroundImage: 'repeating-linear-gradient(to right, var(--accent-indigo) 0, var(--accent-indigo) 4px, transparent 4px, transparent 8px)',
                  }} />
                  Odhadovaní návštěvníci
                </div>
              </div>
            </div>

            {/* Top Pages Preview */}
            <div className="card">
              <div className="card-title">
                <Eye size={14} />
                Top 10 stránek
              </div>
              <TopPagesTable data={topPages} loading={loading} maxItems={10} showLoadTime={false} />
            </div>
          </div>

          {/* Bottom Grid: Devices + Browsers */}
          <div className="dashboard-grid-bottom">
            <div className="card">
              <div className="card-title">
                <Users size={14} />
                Zařízení
              </div>
              <DevicePieChart data={devices} loading={loading} />
            </div>

            <div className="card">
              <div className="card-title">
                <Globe size={14} />
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
