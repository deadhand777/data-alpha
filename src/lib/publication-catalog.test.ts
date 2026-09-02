import type { CollectionEntry } from 'astro:content';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getCollection } = vi.hoisted(() => ({
  getCollection: vi.fn()
}));

vi.mock('astro:content', () => ({ getCollection }));

import {
  getArticleContext,
  getLatestPosts,
  getPublishedPosts,
  type Publication
} from './publication-catalog';

interface PostOptions {
  id: string;
  pubDate: string;
  draft?: boolean;
  tags?: string[];
  series?: string;
  seriesOrder?: number;
}

const makePost = ({
  id,
  pubDate,
  draft = false,
  tags = [],
  series,
  seriesOrder
}: PostOptions): Publication => ({
  id,
  collection: 'blog',
  body: '',
  data: {
    title: id,
    description: `Description for ${id}`,
    pubDate: new Date(`${pubDate}T00:00:00Z`),
    tags,
    draft,
    ...(series && { series }),
    ...(seriesOrder !== undefined && { seriesOrder })
  }
}) as unknown as CollectionEntry<'blog'>;

// Production returns distinct objects per call; fixtures must not reuse the same instance.
const clonePost = (post: Publication): Publication => ({
  ...post,
  data: { ...post.data }
});

describe('publication catalog', () => {
  let entries: Publication[];

  beforeEach(() => {
    entries = [];
    getCollection.mockReset();
    getCollection.mockImplementation(async (_collection, filter) =>
      filter ? entries.filter((entry) => filter(entry)) : entries
    );
  });

  it('enforces draft exclusion and returns publications in reverse chronology', async () => {
    entries = [
      makePost({ id: 'older', pubDate: '2026-01-01' }),
      makePost({ id: 'draft', pubDate: '2026-03-01', draft: true }),
      makePost({ id: 'newer', pubDate: '2026-02-01' })
    ];

    await expect(getPublishedPosts()).resolves.toEqual([
      expect.objectContaining({ id: 'newer' }),
      expect.objectContaining({ id: 'older' })
    ]);
  });

  it('limits latest posts without failing when the limit exceeds the catalog', async () => {
    entries = [
      makePost({ id: 'oldest', pubDate: '2026-01-01' }),
      makePost({ id: 'middle', pubDate: '2026-02-01' }),
      makePost({ id: 'newest', pubDate: '2026-03-01' })
    ];

    await expect(getLatestPosts(2)).resolves.toMatchObject([
      { id: 'newest' },
      { id: 'middle' }
    ]);
    await expect(getLatestPosts(10)).resolves.toHaveLength(3);
  });

  it('returns an empty series and no related posts when nothing matches', async () => {
    const currentEntry = makePost({ id: 'current', pubDate: '2026-02-01', tags: ['ai'] });
    entries = [
      currentEntry,
      makePost({ id: 'unrelated', pubDate: '2026-03-01', tags: ['finance'] })
    ];

    await expect(getArticleContext(clonePost(currentEntry), 2)).resolves.toEqual({
      series: [],
      seriesIndex: -1,
      nextInSeries: undefined,
      related: []
    });
  });

  it('orders a series and returns its next publication', async () => {
    const currentEntry = makePost({
      id: 'part-two',
      pubDate: '2026-02-01',
      series: 'Catalogs',
      seriesOrder: 2
    });
    entries = [
      currentEntry,
      makePost({ id: 'part-three', pubDate: '2026-03-01', series: 'Catalogs', seriesOrder: 3 }),
      makePost({ id: 'part-one', pubDate: '2026-01-01', series: 'Catalogs', seriesOrder: 1 })
    ];

    const context = await getArticleContext(clonePost(currentEntry), 2);

    expect(context.series.map(({ id }) => id)).toEqual(['part-one', 'part-two', 'part-three']);
    expect(context.seriesIndex).toBe(1);
    expect(context.nextInSeries?.id).toBe('part-three');
  });

  it('treats a missing seriesOrder as zero when sorting series entries', async () => {
    const noOrderEntry = makePost({ id: 'no-order', pubDate: '2026-01-01', series: 'Catalogs' });
    entries = [
      makePost({ id: 'negative-order', pubDate: '2026-03-01', series: 'Catalogs', seriesOrder: -1 }),
      noOrderEntry,
      makePost({ id: 'positive-order', pubDate: '2026-02-01', series: 'Catalogs', seriesOrder: 1 })
    ];

    const context = await getArticleContext(clonePost(noOrderEntry), 2);

    expect(context.series.map(({ id }) => id)).toEqual([
      'negative-order',
      'no-order',
      'positive-order'
    ]);
  });

  it('marks the last series item as terminal and leaves its shared-tag predecessor eligible for related', async () => {
    const previousEntry = makePost({
      id: 'part-one',
      pubDate: '2026-01-01',
      tags: ['ai'],
      series: 'Catalogs',
      seriesOrder: 1
    });
    const lastEntry = makePost({
      id: 'part-two',
      pubDate: '2026-02-01',
      tags: ['ai'],
      series: 'Catalogs',
      seriesOrder: 2
    });
    entries = [previousEntry, lastEntry];

    const context = await getArticleContext(clonePost(lastEntry), 2);

    expect(context.seriesIndex).toBe(context.series.length - 1);
    expect(context.nextInSeries).toBeUndefined();
    expect(context.related.map(({ id }) => id)).toEqual(['part-one']);
  });

  it('ranks related publications and excludes current and next-in-series entries by id, even when the current argument is a distinct object instance', async () => {
    const currentEntry = makePost({
      id: 'current',
      pubDate: '2026-04-01',
      tags: ['ai', 'data'],
      series: 'Catalogs',
      seriesOrder: 1
    });
    entries = [
      currentEntry,
      makePost({ id: 'next', pubDate: '2026-05-01', tags: ['ai', 'data'], series: 'Catalogs', seriesOrder: 2 }),
      makePost({ id: 'two-shared', pubDate: '2026-01-01', tags: ['ai', 'data'] }),
      makePost({ id: 'one-shared-newer', pubDate: '2026-03-01', tags: ['ai'] }),
      makePost({ id: 'one-shared-older', pubDate: '2026-02-01', tags: ['data'] }),
      makePost({ id: 'unrelated', pubDate: '2026-06-01', tags: ['finance'] }),
      makePost({ id: 'draft-match', pubDate: '2026-07-01', tags: ['ai', 'data'], draft: true })
    ];

    const context = await getArticleContext(clonePost(currentEntry), 3);

    expect(context.related.map(({ id }) => id)).toEqual([
      'two-shared',
      'one-shared-newer',
      'one-shared-older'
    ]);
  });

  it('applies the related publication limit', async () => {
    const currentEntry = makePost({ id: 'current', pubDate: '2026-03-01', tags: ['ai'] });
    entries = [
      currentEntry,
      makePost({ id: 'newer-match', pubDate: '2026-02-01', tags: ['ai'] }),
      makePost({ id: 'older-match', pubDate: '2026-01-01', tags: ['ai'] })
    ];

    const context = await getArticleContext(clonePost(currentEntry), 1);

    expect(context.related.map(({ id }) => id)).toEqual(['newer-match']);
  });

  it('preserves duplicate-tag counting: candidates with matching duplicates rank by count, not recency', async () => {
    const currentEntry = makePost({ id: 'current', pubDate: '2026-04-01', tags: ['ai'] });
    entries = [
      currentEntry,
      // Older candidate with duplicate matching tag should rank first (2 matches > 1 match)
      makePost({ id: 'duplicate-tag-older', pubDate: '2026-02-01', tags: ['ai', 'ai'] }),
      // Newer candidate with single match would rank first under Set semantics
      makePost({ id: 'single-tag-newer', pubDate: '2026-03-01', tags: ['ai'] })
    ];

    const context = await getArticleContext(clonePost(currentEntry), 2);

    // Duplicate-tag candidate must rank first despite being older (2 overlaps > 1 overlap)
    expect(context.related.map(({ id }) => id)).toEqual([
      'duplicate-tag-older',
      'single-tag-newer'
    ]);
  });

  it('propagates collection loading failures', async () => {
    getCollection.mockRejectedValueOnce(new Error('content load failed'));

    await expect(getPublishedPosts()).rejects.toThrow('content load failed');
  });
});
