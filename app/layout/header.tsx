'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/posts', label: 'POSTS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/project', label: 'PROJECT' },
  // { href: '/guestbook', label: 'GUEST' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mt-6 flex h-14 items-center bg-background">
      <nav className="flex items-center space-x-3 text-sm font-medium tracking-[-0.075em] sm:space-x-4 sm:text-[18px]">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 font-extrabold transition-colors ${
                isActive ? 'text-accent' : 'text-foreground'
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
