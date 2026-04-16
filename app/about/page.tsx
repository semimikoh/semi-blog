import Link from 'next/link';
import {
  CheckCircle2,
  CircleDot,
  XCircle,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { WorkExperience } from '../components/work-experience';
import { Skills } from '../components/skills';
import resumeData from '@/content/resume/data.json';
import skillsData from '@/content/resume/skills.json';

const STATUS_META = {
  merged: { Icon: CheckCircle2, className: 'text-emerald-500' },
  closed: { Icon: XCircle, className: 'text-rose-400' },
  open: { Icon: CircleDot, className: 'text-amber-500' },
} as const;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-foreground/15 pb-1.5 text-lg font-bold tracking-tight">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 pt-3 pb-16">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">고세미</h1>
          <p className="text-sm text-muted">Frontend Engineer</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Mail size={14} />
            semi8848@daum.net
          </span>
          <Link
            href="https://github.com/semimikoh"
            target="_blank"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <ExternalLink size={14} />
            GitHub
          </Link>
          <Link
            href="https://velog.io/@semimi/posts"
            target="_blank"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <ExternalLink size={14} />
            Blog
          </Link>
        </div>
      </header>

      {/* Work Experience */}
      <section>
        <SectionHeading>Work Experience</SectionHeading>
        <div className="flex flex-col gap-6">
          {resumeData.경력.map((exp) => (
            <WorkExperience key={exp.회사} {...exp} />
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section>
        <SectionHeading>Open Source</SectionHeading>
        <div className="flex flex-col gap-5">
          {skillsData.오픈소스.map((item) => (
            <div key={item.이름}>
              <h3 className="mb-2 text-sm font-bold">{item.이름}</h3>
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/75">
                {item.기여.map((c) => {
                  const status = (c as { 상태?: string }).상태 ?? 'open';
                  const meta =
                    STATUS_META[status as keyof typeof STATUS_META] ??
                    STATUS_META.open;
                  const { Icon, className } = meta;
                  const prNumber = c.링크?.split('/').pop();
                  return (
                    <li key={c.링크} className="flex gap-2">
                      <Icon
                        size={16}
                        className={`mt-[3px] shrink-0 ${className}`}
                      />
                      <span>
                        {c.설명}
                        {c.링크 && (
                          <Link
                            href={c.링크}
                            target="_blank"
                            className="ml-1 text-[13px] text-blue-500 transition-opacity hover:opacity-60"
                          >
                            (#{prNumber})
                          </Link>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeading>Skills</SectionHeading>
        <Skills 스킬={skillsData.스킬} />
      </section>

      {/* Education */}
      <section>
        <SectionHeading>Education</SectionHeading>
        <div className="flex flex-col gap-2 text-sm">
          {resumeData.학력.map((item) => (
            <div
              key={item.학교}
              className="flex items-baseline justify-between gap-4"
            >
              <p className="font-semibold">{item.학교}</p>
              <p className="text-muted">{item.기간}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
