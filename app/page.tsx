import { posts } from '#site/content';
import { PostCard } from './components/post-card';
import { WalkingDog } from './components/walking-dog';

export default function Home() {
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-5 pt-3 pb-16">
      <WalkingDog />
      <h3 className="text-2xl font-bold text-accent">Recent Posts</h3>
      <div>
        {recentPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            tags={post.tags}
            thumbnail={post.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
