import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const links = [
  { href: 'https://civichat-kappa.vercel.app', label: 'Live Demo' },
  { href: 'https://github.com/semimikoh/civichat', label: 'GitHub' },
];

const overview = [
  { label: '형태', value: '개인 프로젝트' },
  {
    label: '역할',
    value: '기획, 데이터 파이프라인, 검색 로직, API, 프론트엔드 구현',
  },
  {
    label: '규모',
    value:
      '정부 서비스 10,919개 / 법령 687개 / 조문 31,066개 검색 대상화, 유닛 테스트 47개',
  },
  {
    label: '성능',
    value:
      'Lighthouse Performance 99, CLS 0, 텍스트 높이 측정 스크립팅 비용 85% 감소 (DOM 측정 대비)',
  },
  {
    label: '데이터',
    value: '공식 API와 공개 데이터만 사용, 민간 플랫폼 크롤링 의도적 배제',
  },
];

const highlights = [
  '스트리밍 응답의 로딩/요약/결과 3단계를 분리해 사용자가 응답 시작을 즉시 인지하도록 설계',
  '벡터 검색과 키워드 검색을 RRF로 결합하고 구조화 필터를 더해 검색 정확도 보완',
  'DOM 렌더 전 Canvas로 텍스트 너비를 측정하고 이분 탐색으로 줄바꿈 계산해 스크롤 안정화',
  '대화 히스토리에서 이전 조건을 누적하여 멀티턴 검색 지원',
  '법령 데이터 파이프라인: 687개 법령 마크다운 파싱 → 조문 분리 → 복지 서비스 법령 필드 매칭 99.5% (7,398건 중 7,359건)',
  '대화형 UI에 맞춘 접근성 설계 (aria-live로 스트리밍 상태 전달, Skip Link, 포커스 복원)',
];

const architecture = [
  '사용자 입력',
  '조건 추출',
  '벡터 + 키워드 하이브리드 검색',
  'LLM 요약 스트리밍',
  'Chat UI 렌더링',
];

interface Decision {
  title: string;
  description: string;
  links?: { href: string; label: string }[];
}

const decisions: Decision[] = [
  {
    title: '검색 로직을 React 밖으로 분리',
    description:
      '복지/법령 검색, 조건 추출, 요약 로직을 src/core에 격리해 CLI와 API Route가 같은 함수를 사용하도록 구성했습니다. UI 연결 전 터미널에서 검색 품질을 먼저 검증할 수 있고, 팀 환경에서도 프론트엔드와 백엔드/ML이 같은 core 함수를 기준으로 독립적으로 작업할 수 있는 구조입니다.',
  },
  {
    title: 'DOM 렌더 전 텍스트 너비와 메시지 높이 계산',
    description:
      'AI 요약은 길이가 매번 달라지고 타이프라이터로 점진 렌더링되기 때문에 DOM에 직접 넣은 뒤 높이를 재면 매번 reflow가 발생합니다. Canvas measureText로 DOM 밖에서 폭을 측정하고 이분 탐색으로 줄바꿈을 계산하는 방식으로 전환하여, 스트리밍 중 높이 측정의 스크립팅 비용을 85% 줄였습니다 (getBoundingClientRect 1,282ms -> Canvas 193ms).',
    links: [
      {
        href: '/posts/algorithm-frontend-optimization',
        label: '알고리즘으로 프론트엔드 최적화 하기',
      },
      {
        href: '/fe-lab?tab=linebreak',
        label: 'Linebreak Playground',
      },
    ],
  },
  {
    title: '벡터 검색과 키워드 검색을 함께 사용',
    description:
      '벡터 검색만으로는 지역명이나 법령명 같은 정확 매칭이 약했습니다. 반대로 키워드 검색만으로는 서술형 질문을 처리할 수 없었습니다. 두 결과를 RRF로 합산하고 구조화 조건 필터를 더해 양쪽의 약점을 보완했습니다.',
  },
  {
    title: '조건 추출은 LLM 호출 없이 시작',
    description:
      'LLM으로 모든 조건을 추출하면 정확도는 좋아질 수 있지만, 매 질문마다 API 호출 비용과 응답 지연이 발생합니다. 나이/성별/직업/지역처럼 패턴이 명확한 조건은 정규식으로 즉시 추출하고, 부족한 조건은 대화 흐름에서 추가로 묻도록 설계했습니다.',
  },
  {
    title: '응답 상태를 단계별로 분리',
    description:
      '스트리밍 UI는 체감 응답 속도를 높이지만, 콘텐츠가 점진적으로 늘어나면서 스크롤 위치가 흔들리기 쉽습니다. 로딩/요약 스트리밍/결과 카드 표시를 분리하고, 메시지 높이를 사전 계산해 스크롤 안정성과 UX를 함께 잡았습니다.',
  },
];

const challenges = [
  {
    title: '벡터 검색의 정확 매칭 한계와 하이브리드 검색 도입',
    description:
      '초기에는 벡터 검색만 사용해 "서울 청년 지원금"처럼 지역명과 대상이 명확한 질문에서도 관련 없는 결과가 상위에 노출됐습니다. 이후 키워드 검색(tsvector)을 추가하고 RRF로 순위를 결합해, 의미 기반 검색과 정확 매칭을 함께 반영하도록 개선했습니다.',
  },
  {
    title: '벡터 유사도와 연령 조건의 불일치 문제',
    description:
      '하이브리드 검색 도입 후에도, 벡터 유사도가 높으면 연령과 맞지 않는 서비스가 상위에 노출되는 문제가 남았습니다. "26살 지원금"을 검색하면 "노인 돌봄", "아동 수당" 같은 결과가 섞여 나왔습니다. 검색 결과에 연령 텍스트 필터를 추가해, 사용자 나이와 명백히 불일치하는 서비스를 후처리 단계에서 제외하도록 개선했습니다.',
  },
  {
    title: '스트리밍 중 가상 스크롤의 높이 추정 문제',
    description:
      'LLM 요약이 어절 단위로 점진 렌더링되면서 메시지 높이가 계속 변하는데, DOM에 넣고 getBoundingClientRect로 측정하면 매번 reflow가 발생했습니다. Canvas measureText로 DOM 밖에서 문자 폭을 측정하고 이분 탐색으로 줄바꿈을 계산하는 방식으로 전환해, 스크립팅 비용을 85% 줄이고 스크롤 안정성을 확보했습니다.',
  },
];

const a11y = [
  '메시지 목록에 role="log"과 aria-live="polite"를 적용해 스크린 리더가 새 응답을 자동으로 읽어줌',
  '로딩 상태에 role="status"와 aria-busy를 연동해 검색 진행/완료를 전달',
  'Skip Link로 헤더를 건너뛰고 검색 입력으로 바로 이동',
  'AI 응답 완료 후 입력창에 자동 포커스 복원',
  '외부 링크에 "(새 창)" aria-label을 명시해 이동 전 맥락 제공',
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold tracking-tight">{children}</h2>;
}

export default function ProjectPage() {
  return (
    <div className="flex flex-col gap-10 pt-3 pb-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-muted">Project</p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            CiviChat: 생성형 AI 검색 서비스
          </h1>
          <p className="text-base leading-relaxed text-foreground/75">
            자연어 질문을 RAG형 검색 흐름으로 연결하고, 스트리밍 응답과 검색
            결과를 대화형 UI로 렌더링한 프로젝트입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-card px-3 py-1.5 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              {link.label}
              <ExternalLink size={14} />
            </Link>
          ))}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Image
            src="/projects/civichat/benefit-search.gif"
            alt="CiviChat 복지 검색 데모"
            width={900}
            height={1390}
            unoptimized
            className="w-full rounded bg-card"
          />
          <Image
            src="/projects/civichat/legal-search.gif"
            alt="CiviChat 법령 검색 데모"
            width={900}
            height={1390}
            unoptimized
            className="w-full rounded bg-card"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Overview</SectionHeading>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
          {overview.map((item) => (
            <Fragment key={item.label}>
              <span className="font-semibold">{item.label}</span>
              <span className="text-foreground/75">{item.value}</span>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Problem</SectionHeading>
        <p className="text-sm leading-relaxed text-foreground/75">
          기존 정부 복지 사이트는 메뉴 탐색 중심이라 사용자가 원하는 혜택을
          빠르게 찾기 어렵습니다. CiviChat은 자연어 질문을 조건 추출, RAG 검색,
          LLM 요약 스트리밍, 결과 렌더링까지 하나의 대화 흐름으로 연결하고, 이
          과정에서 AI 응답 렌더링, 벡터 검색 인터페이스, 접근성, 성능 최적화를
          프론트엔드 관점에서 설계하기 위해 만들었습니다.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Highlights</SectionHeading>
        <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-foreground/75">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Architecture</SectionHeading>
        <div className="flex flex-wrap gap-2 text-sm">
          {architecture.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="rounded bg-card px-2.5 py-1 font-semibold">
                {item}
              </span>
              {index < architecture.length - 1 && (
                <span className="text-muted">-&gt;</span>
              )}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Technical Decisions</SectionHeading>
        <div className="flex flex-col gap-5">
          {decisions.map((decision) => (
            <article key={decision.title} className="flex flex-col gap-1.5">
              <h3 className="text-sm font-bold">{decision.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75">
                {decision.description}
                {decision.links && (
                  <>
                    {' '}
                    같은 원리를{' '}
                    <Link
                      href={decision.links[0].href}
                      className="font-semibold text-blue-500 transition-opacity hover:opacity-60"
                    >
                      블로그 글
                    </Link>
                    과{' '}
                    <Link
                      href={decision.links[1].href}
                      className="font-semibold text-blue-500 transition-opacity hover:opacity-60"
                    >
                      FE Lab playground
                    </Link>
                    로도 정리했습니다.
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Challenges</SectionHeading>
        <div className="flex flex-col gap-5">
          {challenges.map((challenge) => (
            <article key={challenge.title} className="flex flex-col gap-1.5">
              <h3 className="text-sm font-bold">{challenge.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75">
                {challenge.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Accessibility</SectionHeading>
        <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-foreground/75">
          {a11y.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Stack</SectionHeading>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
          <span className="font-semibold">Framework</span>
          <span className="text-foreground/75">
            Next.js 15 (App Router), TypeScript
          </span>
          <span className="font-semibold">UI</span>
          <span className="text-foreground/75">Mantine v7</span>
          <span className="font-semibold">Search</span>
          <span className="text-foreground/75">
            Supabase pgvector, OpenAI Embeddings, RRF
          </span>
          <span className="font-semibold">LLM</span>
          <span className="text-foreground/75">
            GPT-4o-mini (SSE Streaming)
          </span>
          <span className="font-semibold">Virtual Scroll</span>
          <span className="text-foreground/75">TanStack Virtual</span>
          <span className="font-semibold">Test</span>
          <span className="text-foreground/75">Vitest (47 tests)</span>
          <span className="font-semibold">Deploy</span>
          <span className="text-foreground/75">Vercel + Supabase Cloud</span>
        </div>
      </section>
    </div>
  );
}
