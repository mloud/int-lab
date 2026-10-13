import Script from 'next/script';
import { CurriculumProvider } from '@/components/providers/CurriculumContext';
import GlobalTextZoom from '@/components/ui/GlobalTextZoom';
import GlobalScrollToTop from '@/components/ui/GlobalScrollToTop';
import GlobalCodeCopy from '@/components/ui/GlobalCodeCopy';

export const metadata = {
  title: 'IntLab | Interactive Learning Lab',
  description: 'Interaktivní mezioborová výuková laboratoř pro moderní školy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          /* Eliminace problikávání černých okrajů před načtením Tailwind CDN */
          *, ::before, ::after {
            box-sizing: border-box;
            border-style: solid;
            border-width: 0;
            border-color: transparent;
          }

          /* Okamžité načtení šířek okrajů */
          .border { border-width: 1px; }
          .border-2 { border-width: 2px; }
          .border-4 { border-width: 4px; }
          .border-b { border-bottom-width: 1px; }
          .border-b-2 { border-bottom-width: 2px; }
          .border-t { border-top-width: 1px; }

          /* Okamžité nastavení barev pro hlavní rámy, karty a skleněné prvky */
          .border-white { border-color: #ffffff !important; }
          .border-white\\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
          .border-white\\/30 { border-color: rgba(255, 255, 255, 0.3) !important; }
          .border-white\\/40 { border-color: rgba(255, 255, 255, 0.4) !important; }
          .border-white\\/80 { border-color: rgba(255, 255, 255, 0.8) !important; }
          .border-white\\/90 { border-color: rgba(255, 255, 255, 0.9) !important; }

          .border-slate-50 { border-color: #f8fafc !important; }
          .border-slate-100 { border-color: #f1f5f9 !important; }
          .border-slate-200 { border-color: #e2e8f0 !important; }
          .border-slate-200\\/60 { border-color: rgba(226, 232, 240, 0.6) !important; }
          .border-slate-200\\/80 { border-color: rgba(226, 232, 240, 0.8) !important; }
          .border-slate-300 { border-color: #cbd5e1 !important; }
          .border-rose-200 { border-color: #fecdd3 !important; }
          .border-rose-400 { border-color: #fb7185 !important; }
          .border-amber-500 { border-color: #f59e0b !important; }
          .border-indigo-200 { border-color: #c7d2fe !important; }
          .border-purple-200 { border-color: #e9d5ff !important; }
          .border-emerald-200 { border-color: #a7f3d0 !important; }
          .border-transparent { border-color: transparent !important; }

          body {
            font-family: 'Quicksand', sans-serif;
            background: #f0f4f8;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body>
        <CurriculumProvider>
          {children}
          <GlobalTextZoom />
          <GlobalScrollToTop />
          <GlobalCodeCopy />
        </CurriculumProvider>

        {/* Cloudflare Web Analytics - měření návštěvnosti bez cookies */}
        {process.env.NEXT_PUBLIC_CF_BEACON && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
