import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXContent } from '@/app/components/mdx-content';
import '@/app/style/prose.css';

const PLAYGROUND_LINKS: Record<string, { label: string; href: string }[]> = {
  'math-for-development': [
    { label: 'DOM 회전 역산', href: '/fe-lab?tab=rotation' },
  ],
  'algorithm-frontend-optimization': [
    { label: '탐색 최적화 O(n)→O(log n)', href: '/fe-lab?tab=linebreak' },
  ],
};

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="pt-7 pb-16">
      <header className="mb-10">
        <h1 className="text-xl font-bold sm:text-2xl">{post.title}</h1>
        <time className="mt-2 block text-sm text-muted">
          {post.date.slice(0, 10)}
        </time>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-[12px]">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-muted">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {PLAYGROUND_LINKS[post.slug] && (
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {PLAYGROUND_LINKS[post.slug].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary hover:underline"
              >
                관련 Playground 가기!
              </Link>
            ))}
          </div>
        )}
      </header>
      <div className="prose">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
