import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from './layout/header';
import Footer from './layout/footer';
import { Analytics } from '@vercel/analytics/next';
import './style/globals.css';

const pretendard = localFont({
  src: './style/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'semikoh',
  description: "semikoh's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 antialiased sm:px-2">
        <Header />
        <main className="mx-auto min-h-[60vh] w-full max-w-2xl flex-1 py-4">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
