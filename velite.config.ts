import rehypePrettyCode from 'rehype-pretty-code';
import { defineConfig, s } from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'dracula',
        },
      ],
    ],
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        slug: s.slug('posts'),
        tags: s.array(s.string()).default([]),
        thumbnail: s.string().optional(),
        body: s.mdx(),
      }),
    },
  },
});
