import Link from 'next/link';

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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-bold">{회사}</h3>
          <p className="text-xs text-muted tabular-nums">{기간}</p>
        </div>
        <p className="text-sm text-muted">{팀}</p>
      </div>

      <div className="flex flex-col gap-4">
        {프로젝트.map((project) => (
          <div
            key={project.이름}
            className="flex flex-col gap-2 border-l-2 border-foreground/15 pl-4"
          >
            <h4 className="text-sm font-semibold">{project.이름}</h4>
            <ul className="flex flex-col gap-1 text-sm leading-relaxed text-foreground/75">
              {project.설명.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            {project.담당업무 && project.담당업무.length > 0 && (
              <div className="mt-1 flex flex-col gap-1">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  담당 업무
                </p>
                <ul className="flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-foreground/75 marker:text-foreground/30">
                  {project.담당업무.map((duty, i) => (
                    <li key={i}>{duty}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.관련글 && project.관련글.length > 0 && (
              <div className="mt-1 flex flex-col gap-1">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  관련 글
                </p>
                <ul className="flex flex-col gap-1 text-sm">
                  {project.관련글.map((post) => (
                    <li key={post.href}>
                      <Link
                        href={post.href}
                        className="text-blue-500 underline underline-offset-4 hover:opacity-70"
                      >
                        {post.제목}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
