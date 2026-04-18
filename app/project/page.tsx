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
      '정부 서비스 10,919개 / 법령 687개 / 조문 31,066개 검색 대상화, 유닛/컴포넌트 테스트 71개 + 검색 품질 평가',
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

const highlights: React.ReactNode[] = [
  <>
    검색 결과 이벤트를 먼저 전송하고 LLM 요약을 이어서 스트리밍하는{' '}
    <strong className="font-semibold text-foreground/90">
      SSE 기반 대화 UI 구현
    </strong>
  </>,
  <>
    Supabase pgvector 기반 벡터 검색과 키워드 검색을{' '}
    <strong className="font-semibold text-foreground/90">RRF로 결합</strong>
    하고 조건/지역/키워드 기반으로 재정렬
  </>,
  <>
    지역 후보와 전국 후보를 함께 가져와 중앙부처/전국형 혜택 누락을 줄이는{' '}
    <strong className="font-semibold text-foreground/90">
      검색 recall 개선
    </strong>
  </>,
  <>
    정규식 기반 조건 추출을 설정 파일로 분리하고 취준생, 소상공인, 한부모,
    차상위 같은 표현까지{' '}
    <strong className="font-semibold text-foreground/90">구조화</strong>
  </>,
  <>
    Canvas 기반 메시지 높이 사전 계산으로 가상 스크롤 안정화{' '}
    <strong className="font-semibold text-foreground/90">
      (스크립팅 85% 감소)
    </strong>
  </>,
  <>
    aria-live, role=&quot;status&quot;, Skip Link, 포커스 복원으로 대화형 UI{' '}
    <strong className="font-semibold text-foreground/90">접근성 보완</strong>
  </>,
  <>
    검색 품질 평가, 데이터 갱신 파이프라인, Sentry 에러 수집을{' '}
    <strong className="font-semibold text-foreground/90">
      GitHub Actions와 운영 흐름에 연결
    </strong>
  </>,
];

const architecture = [
  {
    label: 'Client',
    title: 'Chat UI',
    description: '질문 입력, 대화 히스토리, 결과 카드 렌더링',
  },
  {
    label: 'API',
    title: 'Next.js Route Handler',
    description:
      '검색 결과 이벤트를 먼저 보내고 LLM 요약 청크를 SSE로 스트리밍',
  },
  {
    label: 'Core',
    title: 'core/search',
    description: 'React와 분리된 순수 TypeScript 검색/조건 추출 로직',
  },
  {
    label: 'Retrieval',
    title: 'Hybrid Retrieval + Rerank',
    description:
      'pgvector 벡터 검색, tsvector 키워드 검색, RRF 결합 후 조건/지역/키워드 기반 재정렬',
  },
  {
    label: 'LLM',
    title: 'OpenAI Summary',
    description: '검색 결과를 쉬운 문장으로 요약하고 스트리밍 응답 생성',
  },
  {
    label: 'Render',
    title: 'Streaming Renderer',
    description: '타이프라이터 요약, 결과 카드, 가상 스크롤 높이 추정',
  },
];

interface Decision {
  title: string;
  description: string;
  links?: { href: string; label: string }[];
}

const decisions: Decision[] = [
  {
    title: '검색 결과를 먼저 보내는 SSE 흐름',
    description:
      '초기에는 LLM 요약 스트리밍이 끝난 뒤 검색 결과 카드를 보여주는 구조라 체감 응답이 늦었습니다. 서버가 검색 결과 이벤트를 먼저 보내고, 이후 요약 청크를 스트리밍하도록 바꿔 사용자가 검색 성공과 후보 결과를 더 빨리 인지할 수 있게 했습니다.',
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
      '벡터 검색만으로는 지역명이나 법령명 같은 정확 매칭이 약했습니다. 반대로 키워드 검색만으로는 서술형 질문을 처리할 수 없었습니다. 두 결과를 RRF로 합산한 뒤 서비스명/본문 키워드, 시군구/광역시도/전국형 여부, 구직자/임산부/소상공인/한부모/저소득 조건을 점수화해 최종 순위를 재정렬했습니다.',
  },
  {
    title: '검색 로직을 React 밖으로 분리',
    description:
      '복지/법령 검색, 조건 추출, 요약 로직을 src/core에 격리해 CLI와 API Route가 같은 함수를 사용하도록 구성했습니다. UI 연결 전 터미널에서 검색 품질을 먼저 검증할 수 있고, 팀 환경에서도 프론트엔드와 백엔드/ML이 같은 core 함수를 기준으로 독립적으로 작업할 수 있는 구조입니다.',
  },
];

const challenges = [
  {
    title: '벡터 검색의 정확 매칭 한계와 하이브리드 검색 도입',
    description:
      '초기에는 벡터 검색만 사용해 "서울 청년 지원금"처럼 지역명과 대상이 명확한 질문에서도 관련 없는 결과가 상위에 노출됐습니다. 이후 키워드 검색(tsvector)을 추가하고 RRF로 순위를 결합한 뒤, 조건/지역/키워드 기반 재정렬을 더해 의미 기반 검색과 정확 매칭을 함께 반영하도록 개선했습니다.',
  },
  {
    title: '지역 필터로 인한 전국형 혜택 누락',
    description:
      '지역 필터를 강하게 적용하면 서울, 부산처럼 지역을 명시한 질문에서 중앙부처나 전국 공통 서비스가 후보에서 빠지는 문제가 있었습니다. 지역 필터 후보와 필터 없는 전국 후보를 함께 가져온 뒤 중복 제거와 지역 boost/penalty를 적용해 recall과 precision의 균형을 맞췄습니다.',
  },
  {
    title: '검색 품질 회귀를 숫자로 확인하기',
    description:
      '검색 로직은 정규식, 벡터 검색, 키워드 검색, 후처리 필터가 함께 얽혀 있어 작은 수정도 다른 질의의 품질을 떨어뜨릴 수 있었습니다. eval query set을 만들고 Vitest 기반 검색 품질 테스트로 승격해 main push에서 품질 기준을 확인하도록 구성했습니다.',
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
        <SectionHeading>Problem</SectionHeading>
        <p className="text-sm leading-relaxed text-foreground/75">
          기존 정부 복지 사이트는 메뉴 탐색 중심이라 사용자가 원하는 혜택을
          빠르게 찾기 어렵습니다. CiviChat은 자연어 질문을 조건 추출, RAG 검색,
          LLM 요약 스트리밍, 결과 렌더링까지 하나의 대화 흐름으로 연결하고, AI
          응답 렌더링, 벡터 검색 인터페이스, 접근성, 성능 최적화를 직접 설계하고
          구현했습니다.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Highlights</SectionHeading>
        <ul className="flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-foreground/75">
          {highlights.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading>Architecture</SectionHeading>
        <div className="flex flex-col text-sm">
          {architecture.map((step, i) => (
            <Fragment key={step.title}>
              <div className="grid grid-cols-[76px_1fr] gap-4">
                <span className="pt-0.5 text-xs font-semibold tracking-wide text-muted uppercase">
                  {step.label}
                </span>
                <div>
                  <h3 className="text-sm font-bold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground/75">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < architecture.length - 1 && (
                <div className="grid grid-cols-[76px_1fr] gap-4">
                  <span />
                  <span className="py-1 text-foreground/25">↓</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-foreground/75">
          비즈니스 로직은 src/core에 격리하여 React/Next.js에 의존하지 않는 순수
          TypeScript로 작성했습니다. CLI와 API Route가 같은 함수를 공유하며, 새
          기능은 CLI에서 먼저 검증한 후 UI에 연결합니다.
        </p>
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
                      플레이그라운드
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
        <SectionHeading>Accessibility & Performance</SectionHeading>
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
            Next.js 16 (App Router), React 19, TypeScript
          </span>
          <span className="font-semibold">UI</span>
          <span className="text-foreground/75">Mantine v9</span>
          <span className="font-semibold">Search</span>
          <span className="text-foreground/75">
            Supabase pgvector, tsvector, OpenAI Embeddings, RRF, custom rerank
          </span>
          <span className="font-semibold">LLM</span>
          <span className="text-foreground/75">
            GPT-4o-mini (SSE Streaming)
          </span>
          <span className="font-semibold">Virtual Scroll</span>
          <span className="text-foreground/75">TanStack Virtual</span>
          <span className="font-semibold">Ops</span>
          <span className="text-foreground/75">
            GitHub Actions, Sentry, Husky, lint-staged
          </span>
          <span className="font-semibold">Test</span>
          <span className="text-foreground/75">
            Vitest + React Testing Library (71 tests), search quality eval
          </span>
          <span className="font-semibold">Deploy</span>
          <span className="text-foreground/75">Vercel + Supabase Cloud</span>
        </div>
      </section>
    </div>
  );
}
