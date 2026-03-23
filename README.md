# semi-blog

개인 기술 블로그입니다.

## Tech Stack

- Next.js (App Router)
- MDX + Velite
- Tailwind CSS
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

## Project Structure

```
├── app/
│   ├── about/          # About 페이지
│   ├── components/     # 공통 컴포넌트
│   ├── guestbook/      # 방명록 페이지
│   ├── layout/         # Header, Footer
│   ├── posts/          # 포스트 목록 및 상세 페이지
│   ├── project/        # 프로젝트 페이지
│   ├── style/          # 글로벌 CSS, prose 스타일
│   └── page.tsx        # 홈페이지
├── content/
│   └── posts/          # MDX 포스트 파일
├── public/             # 정적 파일
└── velite.config.ts    # Velite 설정
```

## Posts

`content/posts/` 디렉토리에 MDX 파일을 추가하고 `pnpm velite`로 빌드합니다.
