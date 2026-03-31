'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DemoRotation } from './components/demo-rotation';
import { DemoLineBreak } from './components/demo-line-break';
import { DemoNonogram } from './components/demo-nonogram';

const TABS = [
  {
    id: 'rotation',
    label: 'DOM 회전 역산',
    link: '/posts/math-for-development',
    desc: 'getBoundingClientRect는 회전된 요소의 외접 사각형만 반환합니다. 역산으로 회전된 실제 너비, 높이, 꼭짓점을 찾아줍니다.',
  },
  {
    id: 'linebreak',
    label: '탐색 최적화 O(n)→O(log n)',
    link: '/posts/math-for-development',
    desc: '텍스트 줄바꿈을 직접 해줘야 한다면 텍스트 너비를 알아야 합니다. 선형 탐색을 파라메트릭 바이너리 서치로 최적화했습니다.\n노란 삼각형을 드래그하여 너비를 조절해보세요.',
  },
  {
    id: 'nonogram',
    label: '네모네모 로직',
    link: '',
    desc: 'og-image.png를 30x30으로 다운스케일하여 만든 네모네모 로직 퍼즐입니다.\n클릭으로 채우고, 우클릭(또는 길게 누르기)으로 X 표시를 할 수 있습니다.',
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

function FeLabContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab') as TabId | null;
  const activeTab = TABS.some((t) => t.id === tabParam)
    ? tabParam!
    : 'rotation';

  const setActiveTab = (id: TabId) => {
    router.replace(`/fe-lab?tab=${id}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2 pt-3 pb-16">
      <div className="flex gap-2">
        {TABS.map((tab) => (
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
                href={tab.link}
                className="text-xs text-primary hover:underline"
              >
                관련글 보러가기!
              </Link>
            )}
          </div>
        ))}
      </div>

      <p className="whitespace-pre-line text-xs text-muted">
        {TABS.find((t) => t.id === activeTab)!.desc}
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
