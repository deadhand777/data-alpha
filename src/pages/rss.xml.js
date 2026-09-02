import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/publication-catalog';

export async function GET(context) {
  const posts = await getPublishedPosts();

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
