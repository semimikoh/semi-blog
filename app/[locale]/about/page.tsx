import Link from 'next/link';
import { WorkExperience } from '../../components/work-experience';
import { Skills } from '../../components/skills';
import resumeDataKo from '@/content/resume/data.json';
import skillsDataKo from '@/content/resume/skills.json';
import resumeDataEn from '@/content/resume/data.en.json';
import skillsDataEn from '@/content/resume/skills.en.json';
import { getDictionary } from '../../lib/i18n/get-dictionary';
import type { Locale } from '../../lib/i18n/config';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const resumeData = locale === 'en' ? resumeDataEn : resumeDataKo;
  const skillsData = locale === 'en' ? skillsDataEn : skillsDataKo;
  const t = dict.about;

  return (
    <div className="flex flex-col gap-6 pt-3 pb-16">
      {/* Header */}
      <header>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{t.name}</h1>
          <p className="text-sm text-muted">{t.role}</p>
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

      {/* Work Experience */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">{t.workExperience}</h2>
        {resumeData.경력.map((exp) => (
          <WorkExperience key={exp.회사} {...exp} />
        ))}
      </section>

      {/* Open Source */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t.openSource}</h2>
        <ul className="flex flex-col gap-3 text-sm">
          {skillsData.오픈소스.map((item) => (
            <li key={item.이름} className="flex items-baseline gap-3">
              <span className="w-[90px] shrink-0 font-semibold">
                {item.이름}
              </span>
              <div className="flex flex-col gap-0.5 text-foreground/70">
                {item.기여.map((c) => (
                  <span key={c.링크}>
                    {c.설명}
                    {c.링크 && (
                      <Link
                        href={c.링크}
                        target="_blank"
                        className="ml-1 text-[13px] text-blue-500 transition-opacity hover:opacity-60"
                      >
                        (#{c.링크.split('/').pop()})
                      </Link>
                    )}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t.skills}</h2>
        <Skills 스킬={skillsData.스킬} />
      </section>

      {/* Education */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t.education}</h2>
        <div className="flex flex-col gap-2 text-sm">
          {resumeData.학력.map((item) => (
            <div key={item.학교}>
              <p className="font-semibold">{item.학교}</p>
              <p className="text-muted">{item.기간}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
