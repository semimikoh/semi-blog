'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/posts', label: 'POSTS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/project', label: 'PROJECT' },
  { href: '/guestbook', label: 'GUESTBOOK' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mt-6 flex h-14 items-center justify-between border-b bg-background px-5">
      <Link href="/" className="text-xl font-extrabold tracking-tight">
        SEMIKOH
      </Link>
      <nav className="flex items-center space-x-6 text-lg font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-3 font-extrabold text-primary transition-colors hover:font-black ${
              pathname.startsWith(item.href)
                ? 'font-black underline underline-offset-4'
                : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
