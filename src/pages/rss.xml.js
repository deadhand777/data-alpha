import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Data Alpha — Chris Schulz',
    description:
      'Writing on taking AI from experiment to production in regulated financial services: architecture, evaluation, governance, and the tradeoffs that transfer.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`
    })),
    customData: '<language>en-us</language>'
  });
}
