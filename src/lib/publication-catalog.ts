import { getCollection, type CollectionEntry } from 'astro:content';

export type Publication = CollectionEntry<'blog'>;

export interface ArticleContext {
  series: Publication[];
  seriesIndex: number;
  nextInSeries?: Publication;
  related: Publication[];
}

export async function getPublishedPosts(): Promise<Publication[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getLatestPosts(limit: number): Promise<Publication[]> {
  const posts = await getPublishedPosts();
  return posts.slice(0, limit);
}

export async function getArticleContext(
  post: Publication,
  relatedLimit: number
): Promise<ArticleContext> {
  const allPosts = await getPublishedPosts();

  const series: Publication[] = [];
  let seriesIndex = -1;

  if (post.data.series) {
    const seriesPosts = allPosts.filter((p) => p.data.series === post.data.series);
    series.push(
      ...seriesPosts.sort((a, b) => {
        const aOrder = a.data.seriesOrder ?? 0;
        const bOrder = b.data.seriesOrder ?? 0;
        return aOrder - bOrder;
      })
    );
    seriesIndex = series.findIndex((p) => p.id === post.id);
  }

  const nextInSeries = seriesIndex >= 0 && seriesIndex < series.length - 1
    ? series[seriesIndex + 1]
    : undefined;

  const postTags = post.data.tags;
  const excludeIds = new Set([post.id]);
  if (nextInSeries) {
    excludeIds.add(nextInSeries.id);
  }

  // Use original array-filter/includes semantics to preserve duplicate-tag counting
  const relatedCandidates = allPosts
    .filter((p) => !excludeIds.has(p.id))
    .map((p) => {
      const sharedTags = p.data.tags.filter(tag => postTags.includes(tag)).length;
      return { post: p, sharedTags };
    })
    .filter((item) => item.sharedTags > 0)
    .sort((a, b) => {
      if (a.sharedTags !== b.sharedTags) {
        return b.sharedTags - a.sharedTags;
      }
      return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime();
    })
    .slice(0, relatedLimit)
    .map((item) => item.post);

  return {
    series,
    seriesIndex,
    nextInSeries,
    related: relatedCandidates
  };
}
