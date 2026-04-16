import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
  thumbnail?: string;
}

export function PostCard({
  title,
  date,
  slug,
  tags = [],
  thumbnail,
}: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="group block py-[15px]">
      <div className="flex h-[100px] items-center justify-between gap-4 sm:gap-8">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-base font-bold text-foreground group-hover:underline group-hover:underline-offset-4 sm:text-xl">
            {title}
          </h2>
          <time className="text-sm text-muted">{date.slice(0, 10)}</time>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-[10px]">
              {tags.map((tag) => (
                <span key={tag} className="text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="hidden shrink-0 sm:block">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              width={160}
              height={112}
              className="rounded object-cover"
            />
          ) : (
            <div className="flex h-[100px] w-[160px] items-center justify-center rounded bg-card px-3">
              <span className="line-clamp-3 text-center text-sm font-bold text-foreground">
                {title}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
