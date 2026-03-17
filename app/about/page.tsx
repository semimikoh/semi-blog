import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 px-2 pt-3 pb-16 sm:px-5">
      {/* Header */}
      <header>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">고세미</h1>
          <p className="text-sm text-muted">Frontend Engineer</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">semi8848@daum.net</p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="https://github.com/semimikoh"
                target="_blank"
                className="text-muted transition-opacity hover:opacity-60"
              >
                GitHub
              </Link>
              <Link
                href="https://velog.io/@semimi/posts"
                target="_blank"
                className="text-muted transition-opacity hover:opacity-60"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="flex flex-col gap-3 text-sm leading-relaxed"></section>

      {/* Skills */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Skills</h2>
        <p className="text-sm text-muted">
          React, TypeScript, React Router, TanStack Query, TanStack Table, React
          Hook Form, Zod, Jotai, MobX, Tailwind CSS, JSP/AngularJS
        </p>
      </section>

      {/* Work Experience */}
      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Work Experience</h2>

        {/* NHN */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold">NHN Injeinc</h3>
            <p className="text-sm text-muted">기술개발실 | 2025.03 ~ 재직중</p>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
            <h4 className="text-sm font-semibold">TicketLink 일본 서비스</h4>
            <p className="text-xs text-muted">
              React, TypeScript, TanStack Query, TanStack Table, React Hook
              Form, Jotai
            </p>
            <ul className="flex flex-col gap-1 text-sm"></ul>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
            <h4 className="text-sm font-semibold">
              TicketLink 글로벌 사이트 리뉴얼
            </h4>
            <p className="text-xs text-muted">
              React, TypeScript, JSP, AngularJS
            </p>
            <ul className="flex flex-col gap-1 text-sm"></ul>
          </div>
        </div>

        {/* TMAX */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold">TMAX GAIA</h3>
            <p className="text-sm text-muted">GA2-2-2 | 2023.09 ~ 2025.03</p>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
            <h4 className="text-sm font-semibold">GAIA Docs</h4>
            <p className="text-xs text-muted">
              React, TypeScript, MobX, Puppeteer, Cucumber
            </p>
            <p className="text-xs text-muted">
              Google Docs/Sheets/Slides와 유사한 웹 기반 오피스 제품
            </p>
            <ul className="flex flex-col gap-1 text-sm">
              <li>Word/PowerPoint/Excel 공통 텍스트 모듈 담당</li>
            </ul>
          </div>
        </div>

        {/* 재능교육 */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold">재능교육/재능e아카데미</h3>
            <p className="text-sm text-muted">
              수학 콘텐츠팀 | 2017.01 ~ 2022.08
            </p>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4">
            <h4 className="text-sm font-semibold">재능AI수학</h4>
            <p className="text-xs text-muted">JavaScript, Snap.svg</p>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                학년별 커리큘럼 기반 수학 콘텐츠 생성 함수 및 상호작용형 학습
                모듈 개발
              </li>
              <li>Snap.svg 기반 슬라이드 애니메이션/키워드 강조 구현</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Open Source</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <span className="font-semibold">Node.js</span>
            <span className="text-muted">
              {' '}
              — Buffer.byteLength Base64 benchmark 입력 처리 오류 수정
            </span>
          </li>
          <li>
            <span className="font-semibold">Mantine</span>
            <span className="text-muted">
              {' '}
              — Badge 컴포넌트 radius 적용 시 circle 렌더링 개선
            </span>
          </li>
          <li>
            <span className="font-semibold">Slate.js</span>
            <span className="text-muted">
              {' '}
              — slate-dom peer dependency 불일치 regression 오류 해결
            </span>
          </li>
        </ul>
      </section>

      {/* Education */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Education</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <p className="font-semibold">아주대학교 수학과</p>
            <p className="text-muted">2012.03 ~ 2016.08 (졸업)</p>
          </div>
          <div>
            <p className="font-semibold">대련 한국국제고등학교</p>
            <p className="text-muted">2009.03 ~ 2011.12 (중국 소재)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
