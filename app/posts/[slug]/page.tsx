import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/app/components/mdx-content';
import '@/app/style/prose.css';

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
    <article className="px-5 pt-7 pb-16">
      <header className="mb-10">
        <h1 className="text-2xl font-bold">{post.title}</h1>
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
      </header>
      <div className="prose">
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
