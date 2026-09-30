'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Globe,
  Smartphone,
  ExternalLink,
  Activity,
  Link2,
} from 'lucide-react';

const navItems = [
  { label: 'Přehled', href: '/', icon: LayoutDashboard },
  { label: 'Stránky', href: '/pages-detail', icon: FileText },
  { label: 'Geografie', href: '/geography', icon: Globe },
  { label: 'Zařízení', href: '/devices', icon: Smartphone },
  { label: 'Referrery', href: '/referrers', icon: Link2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} style={{ color: 'var(--accent-sky)' }} />
          <h1>IntLab Analytics</h1>
        </div>
        <p>Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Přehledy</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}

        <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>
          Odkazy
        </div>
        <a
          href="https://dash.cloudflare.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <ExternalLink size={16} />
          Cloudflare Dashboard
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
        >
          <ExternalLink size={16} />
          GitHub Repozitář
        </a>
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
        }}
      >
        <div>IntLab Analytics v0.1</div>
        <div style={{ marginTop: '2px' }}>Data: Cloudflare Web Analytics</div>
      </div>
    </aside>
  );
}
