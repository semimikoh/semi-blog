'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useLocale } from '../lib/i18n/context';

const navItems: { path: string; label: string; disabled?: boolean }[] = [
  { path: '', label: 'HOME' },
  { path: '/posts', label: 'POSTS' },
  { path: '/about', label: 'ABOUT' },
  { path: '/fe-lab', label: 'PLAYGROUND' },
  { path: '/project', label: 'PROJECT', disabled: true },
  // { path: '/guestbook', label: 'GUEST' },
];

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (
      saved === 'dark' ||
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
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
          const href = `/${locale}${item.path}`;
          const isActive =
            item.path === ''
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(`/${locale}${item.path}`);
          if (item.disabled) {
            return (
              <span
                key={item.path}
                className="cursor-not-allowed py-3 font-extrabold text-muted/15 line-through"
              >
                {item.label}
              </span>
            );
          }
          return (
            <Link
              key={item.path}
              href={href}
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
        aria-label="Toggle theme"
      >
        {dark ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}
