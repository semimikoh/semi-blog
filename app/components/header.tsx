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
      <Link
        href="/"
        className={`hidden text-xl font-extrabold tracking-tight sm:block ${
          pathname === '/' ? 'text-accent' : 'text-foreground'
        }`}
      >
        SEMIKOH
      </Link>
      <nav className="flex items-center space-x-3 text-sm font-medium sm:space-x-6 sm:text-lg">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 font-extrabold transition-colors ${
                isActive ? 'text-accent italic' : 'text-foreground'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
