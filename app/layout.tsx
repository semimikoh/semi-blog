import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from './lib/constants';
import './style/globals.css';

const pretendard = localFont({
  src: './style/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "colonni's blog",
  description: "colonni's blog",
  verification: {
    google: 'xFu4RFJQkXwDyrzjZIhD83gcq44nmkKgs3e-pX11neM',
  },
  openGraph: {
    title: "colonni's blog",
    description: "colonni's blog",
    siteName: "colonni's blog",
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "colonni's blog",
    description: "colonni's blog",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 antialiased sm:px-2">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
