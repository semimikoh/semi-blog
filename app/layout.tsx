import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from './components/header';
import Footer from './components/footer';
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
      <body className="mx-auto min-h-screen max-w-[820px] px-6 antialiased">
        <Header />
        <main className="py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
