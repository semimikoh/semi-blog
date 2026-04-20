# semi-blog

개인 기술 블로그 + 포트폴리오 사이트입니다.

## Tech Stack

- Next.js 16 (App Router)
- MDX + Velite
- Tailwind CSS v4
- pnpm

## Features

- **Posts** — MDX 기반 기술 블로그
- **Project** — CiviChat 등 프로젝트 상세 포트폴리오
- **Playground** — FE Lab (Linebreak 알고리즘, DOM Rotation 등 인터랙티브 데모)
- **About** — 소개 페이지

## Development

```bash
pnpm install
pnpm dev
```

## Project Structure

```
app/
  about/          # 소개 페이지
  guestbook/      # 방명록
  posts/          # 포스트 목록 및 상세
  project/        # 프로젝트 포트폴리오
  playground/     # FE Lab (인터랙티브 데모)
  components/     # 공통 컴포넌트
  layout/         # Header, Footer
  style/          # 글로벌 CSS, prose 스타일
content/
  posts/          # MDX 포스트 파일
  resume/         # 이력서 콘텐츠
```

## Posts

`content/posts/`에 MDX 파일 추가 후 `pnpm velite`로 빌드합니다.
