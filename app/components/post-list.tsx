'use client';

import { useState } from 'react';
import { PostCard } from './post-card';

interface Post {
  title: string;
  description?: string;
  date: string;
  slug: string;
  tags: string[];
  thumbnail?: string;
}

interface PostListProps {
  posts: Post[];
  allTags: string[];
}

export function PostList({ posts, allTags }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <div className="flex flex-wrap gap-[10px]">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-base ${
            selectedTag === null ? 'font-bold text-foreground' : 'text-muted'
          }`}
        >
          #All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-base ${
              selectedTag === tag ? 'font-bold text-foreground' : 'text-muted'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div>
        {filteredPosts.map((post) => (
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
    </>
  );
}
