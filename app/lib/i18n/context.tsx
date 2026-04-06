'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';
import type { Dictionary } from './dictionaries/ko';

const LocaleContext = createContext<Locale>('ko');
const DictionaryContext = createContext<Dictionary | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDictionary(): Dictionary {
  const dict = useContext(DictionaryContext);
  if (!dict) {
    throw new Error('useDictionary must be used within an I18nProvider');
  }
  return dict;
}
