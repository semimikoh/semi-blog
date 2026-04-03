import { notFound } from 'next/navigation';
import { locales, type Locale } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/get-dictionary';
import { I18nProvider } from '../lib/i18n/context';
import { SetHtmlLang } from '../lib/i18n/set-lang';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <I18nProvider locale={locale as Locale} dictionary={dictionary}>
      <SetHtmlLang locale={locale} />
      <Header />
      <main className="mx-auto min-h-[60vh] w-full max-w-2xl flex-1 py-4">
        {children}
      </main>
      <Footer />
    </I18nProvider>
  );
}
