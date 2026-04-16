'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';

const navItems: { href: string; label: string; disabled?: boolean }[] = [
  { href: '/', label: 'HOME' },
  { href: '/posts', label: 'POSTS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/fe-lab', label: 'PLAYGROUND' },
  { href: '/project', label: 'PROJECT' },
  // { href: '/guestbook', label: 'GUEST' },
];

export function Header() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 mt-6 flex h-14 items-center justify-between bg-background">
      <nav className="flex items-center space-x-3 text-sm font-medium tracking-[-0.075em] sm:space-x-4 sm:text-[18px]">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          if (item.disabled) {
            return (
              <span
                key={item.href}
                className="cursor-not-allowed py-3 font-extrabold text-muted/15 line-through"
              >
                {item.label}
              </span>
            );
          }
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
      <button
        onClick={toggleTheme}
        className="text-foreground/60 transition-colors hover:text-foreground"
        aria-label="테마 변경"
      >
        {dark ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}
