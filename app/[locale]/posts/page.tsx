import { posts } from '#site/content';
import { PostList } from '../../components/post-list';

interface PostsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params;

  const localePosts = posts.filter((post) => post.locale === locale);

  const sortedPosts = localePosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const TAG_ORDER = [
    'React',
    'JavaScript',
    '에디터',
    '브라우저',
    '알고리즘',
    '클라우드',
    'Docker',
    'Kubernetes',
    '인프라',
  ];
  const allTags = TAG_ORDER.filter((tag) =>
    localePosts.some((post) => post.tags.includes(tag)),
  );

  return (
    <div className="flex flex-col gap-5 pt-3 pb-16">
      <PostList posts={sortedPosts} allTags={allTags} />
    </div>
  );
}
