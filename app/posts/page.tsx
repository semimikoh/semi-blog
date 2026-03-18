import { posts } from '#site/content';
import PostList from '../components/post-list';

export default function PostsPage() {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <div className="flex flex-col gap-5 pt-3 pb-16">
      <PostList posts={sortedPosts} allTags={allTags} />
    </div>
  );
}
