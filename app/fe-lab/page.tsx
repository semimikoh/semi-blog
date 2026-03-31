'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DemoRotation } from './components/demo-rotation';
import { DemoLineBreak } from './components/demo-line-break';

const TABS = [
  {
    id: 'rotation',
    label: 'DOM 회전 역산',
    link: '/posts/math-for-development',
  },
  // { id: 'linebreak', label: '탐색 최적화 O(n)→O(log n)', link: '/posts/math-for-development' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function FeLabPage() {
  const [activeTab, setActiveTab] = useState<TabId>('rotation');

  return (
    <div className="flex flex-col gap-2 pt-3 pb-16">
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-foreground/70 [background:linear-gradient(transparent_60%,var(--highlight)_60%)]'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Link
        href={TABS.find((t) => t.id === activeTab)!.link}
        className="-mt-2 text-sm text-primary hover:underline"
      >
        관련글 보러 가기
      </Link>

      <div>
        {activeTab === 'rotation' && <DemoRotation />}
        {/* {activeTab === 'linebreak' && <DemoLineBreak />} */}
      </div>
    </div>
  );
}
