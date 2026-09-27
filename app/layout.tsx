import React from 'react';

export const metadata = {
  title: 'Interaktivní Lab',
  description: 'Aplikace Informatika',
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Quicksand', sans-serif;
            background: #f0f4f8;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
