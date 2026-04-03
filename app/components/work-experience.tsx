'use client';

import Link from 'next/link';
import { useLocale } from '../lib/i18n/context';

interface 관련글 {
  href: string;
  제목: string;
}

interface 프로젝트 {
  이름: string;
  설명: string[];
  담당업무?: string[];
  관련글?: 관련글[];
}

export interface 경력Props {
  회사: string;
  팀: string;
  기간: string;
  프로젝트: 프로젝트[];
}

export function WorkExperience({ 회사, 팀, 기간, 프로젝트 }: 경력Props) {
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-bold">{회사}</h3>
        <p className="text-sm text-muted">
          {팀} | {기간}
        </p>
      </div>

      {프로젝트.map((project) => (
        <div
          key={project.이름}
          className="flex flex-col gap-2 border-l-2 border-foreground/20 pl-4"
        >
          <h4 className="text-sm font-semibold">{project.이름}</h4>
          {project.설명.map((desc, i) => (
            <p key={i} className="text-sm text-foreground/70">
              {desc}
            </p>
          ))}
          {project.담당업무 && project.담당업무.length > 0 && (
            <>
              <p className="mt-2 text-sm font-semibold">담당업무</p>
              <ul className="flex flex-col gap-1.5 text-sm text-foreground/70">
                {project.담당업무.map((duty, i) => (
                  <li key={i}>{duty}</li>
                ))}
              </ul>
            </>
          )}
          {project.관련글 && project.관련글.length > 0 && (
            <>
              <p className="mt-2 text-sm font-semibold">관련 글</p>
              <ul className="flex flex-col gap-1.5 text-sm">
                {project.관련글.map((post) => (
                  <li key={post.href}>
                    <Link
                      href={`/${locale}${post.href}`}
                      className="text-blue-500 underline underline-offset-4"
                    >
                      {post.제목}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
