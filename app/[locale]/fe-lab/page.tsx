'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DemoRotation } from './components/demo-rotation';
import { DemoLineBreak } from './components/demo-line-break';
import { DemoNonogram } from './components/demo-nonogram';
import { useLocale, useDictionary } from '../../lib/i18n/context';

const TAB_IDS = ['rotation', 'linebreak', 'nonogram'] as const;
type TabId = (typeof TAB_IDS)[number];

const TAB_LINKS: Record<TabId, string> = {
  rotation: '/posts/math-for-development',
  linebreak: '/posts/math-for-development',
  nonogram: '',
};

function FeLabContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const dict = useDictionary();

  const tabParam = searchParams.get('tab') as TabId | null;
  const activeTab = TAB_IDS.includes(tabParam as TabId)
    ? (tabParam as TabId)
    : 'rotation';

  const setActiveTab = (id: TabId) => {
    router.replace(`/${locale}/fe-lab?tab=${id}`, { scroll: false });
  };

  const tabs = [
    {
      id: 'rotation' as TabId,
      label: dict.feLab.tabs.rotation,
      link: TAB_LINKS.rotation,
      desc: dict.feLab.descs.rotation,
    },
    {
      id: 'linebreak' as TabId,
      label: dict.feLab.tabs.linebreak,
      link: TAB_LINKS.linebreak,
      desc: dict.feLab.descs.linebreak,
    },
    {
      id: 'nonogram' as TabId,
      label: dict.feLab.tabs.nonogram,
      link: TAB_LINKS.nonogram,
      desc: dict.feLab.descs.nonogram,
    },
  ];

  return (
    <div className="flex flex-col gap-2 pt-3 pb-16">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="flex flex-col items-start">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-foreground/70 [background:linear-gradient(transparent_60%,var(--highlight)_60%)]'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
            {activeTab === tab.id && tab.link && (
              <Link
                href={`/${locale}${tab.link}`}
                className="text-xs text-primary hover:underline"
              >
                {dict.feLab.relatedPost}
              </Link>
            )}
          </div>
        ))}
      </div>

      <p className="whitespace-pre-line text-xs text-muted">
        {tabs.find((t) => t.id === activeTab)!.desc}
      </p>

      <div>
        {activeTab === 'rotation' && <DemoRotation />}
        {activeTab === 'linebreak' && <DemoLineBreak />}
        {activeTab === 'nonogram' && <DemoNonogram />}
      </div>
    </div>
  );
}

export default function FeLabPage() {
  return (
    <Suspense>
      <FeLabContent />
    </Suspense>
  );
}
