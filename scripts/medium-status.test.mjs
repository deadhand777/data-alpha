import { describe, expect, it } from 'vitest';

import {
  belongsToAuthor,
  checkPost,
  classifyPosts,
  parseFeed,
  parseFrontmatter,
  storyId
} from './medium-status.mjs';

const post = (fields) => `---\n${fields}\n---\n\nBody text.\n`;

describe('parseFrontmatter', () => {
  it('reads quoted and unquoted scalars', () => {
    const data = parseFrontmatter(post('title: "A Post"\ndraft: false'));
    expect(data).toEqual({ title: 'A Post', draft: 'false' });
  });

  it('ignores body content after the frontmatter block', () => {
    const source = post('title: First') + '---\ntitle: Not frontmatter\n---\n';
    expect(parseFrontmatter(source).title).toBe('First');
  });

  it('returns an empty object when there is no frontmatter', () => {
    expect(parseFrontmatter('Just a body.')).toEqual({});
  });
});

describe('classifyPosts', () => {
  const files = [
    { name: 'published.mdx', content: post('title: Published\ndraft: false') },
    { name: 'drafted.mdx', content: post('title: Drafted\ndraft: true') },
    {
      name: 'imported.mdx',
      content: post('title: Imported\ndraft: false\nmediumUrl: "https://medium.com/@me/imported-123"')
    }
  ];

  it('splits posts by whether they carry a mediumUrl', () => {
    const { pending, published } = classifyPosts(files);
    expect(pending.map((p) => p.slug)).toEqual(['published']);
    expect(published.map((p) => p.slug)).toEqual(['imported']);
  });

  it('skips drafts', () => {
    const { pending, published } = classifyPosts(files);
    expect([...pending, ...published].map((p) => p.slug)).not.toContain('drafted');
  });

  it('builds the live URL used for the Medium import tool', () => {
    const { pending } = classifyPosts(files);
    expect(pending[0].siteUrl).toBe('https://deadhand777.github.io/data-alpha/blog/published/');
  });
});

describe('storyId', () => {
  it('reads the same id from every URL shape Medium hands out', () => {
    expect(storyId('https://medium.com/@me/a-post-99bddf70afa0')).toBe('99bddf70afa0');
    expect(storyId('https://me.medium.com/a-post-99bddf70afa0')).toBe('99bddf70afa0');
    expect(storyId('https://medium.com/@me/a-post-99bddf70afa0?source=rss-abc------2')).toBe('99bddf70afa0');
  });

  it('returns undefined when the last segment is not a hex id', () => {
    expect(storyId('https://medium.com/@me/a-post')).toBeUndefined();
  });
});

const feedItem = (link, source) => `
  <item>
    <link>${link}</link>
    <pubDate>Sun, 06 Sep 2026 17:20:21 GMT</pubDate>
    <content:encoded><![CDATA[<p>Body.</p>${
      source ? `<p><em>Originally published at </em><a href="${source}"><em>${source}</em></a></p>` : ''
    }]]></content:encoded>
  </item>`;

const feed = (...items) => `<rss><channel>${items.join('')}</channel></rss>`;

describe('parseFeed', () => {
  it('reads the import source out of the story footer', () => {
    const entries = parseFeed(
      feed(feedItem('https://medium.com/@me/a-post-abc123?source=rss-x------2', 'https://example.com/blog/a-post/'))
    );
    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe('abc123');
    expect(entries[0].sourceUrl).toBe('https://example.com/blog/a-post/');
  });

  it('leaves the source undefined for a story with no footer', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/a-post-abc123')));
    expect(entries[0].sourceUrl).toBeUndefined();
  });

  it('returns nothing for an empty feed', () => {
    expect(parseFeed(feed())).toEqual([]);
  });
});

describe('checkPost', () => {
  const post = {
    slug: 'a-post',
    pubDate: '2026-09-06',
    siteUrl: 'https://example.com/blog/a-post/',
    mediumUrl: 'https://medium.com/@me/a-post-abc123'
  };

  it('passes when the story was imported from the site URL', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/a-post-abc123', 'https://example.com/blog/a-post/')));
    expect(checkPost(post, entries).status).toBe('ok');
  });

  it('ignores a trailing-slash difference', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/a-post-abc123', 'https://example.com/blog/a-post')));
    expect(checkPost(post, entries).status).toBe('ok');
  });

  it('reports a mismatch when a different URL was imported', () => {
    const source = 'https://github.com/me/repo/blob/main/a-post.mdx';
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/a-post-abc123', source)));
    const result = checkPost(post, entries);
    expect(result.status).toBe('mismatch');
    expect(result.detail).toContain(source);
  });

  it('reports a missing canonical when the story has no import source', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/a-post-abc123')));
    expect(checkPost(post, entries).status).toBe('missing');
  });

  it('reports a recent post absent from the feed', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/other-def456', 'https://example.com/blog/other/')));
    expect(checkPost(post, entries).status).toBe('absent');
  });

  it('does not fail a post older than everything the feed carries', () => {
    const entries = parseFeed(feed(feedItem('https://medium.com/@me/other-def456', 'https://example.com/blog/other/')));
    const older = { ...post, pubDate: '2024-01-01' };
    expect(checkPost(older, entries).status).toBe('unknown');
  });
});

describe('belongsToAuthor', () => {
  it('accepts both Medium URL shapes for the account', () => {
    expect(belongsToAuthor('https://medium.com/@chrisschulz133/a-post-abc123')).toBe(true);
    expect(belongsToAuthor('https://chrisschulz133.medium.com/a-post-abc123')).toBe(true);
  });

  it('rejects another account', () => {
    expect(belongsToAuthor('https://medium.com/@someoneelse/a-post-abc123')).toBe(false);
    expect(belongsToAuthor('https://someoneelse.medium.com/a-post-abc123')).toBe(false);
  });

  it('rejects a lookalike host', () => {
    expect(belongsToAuthor('https://medium.com.evil.test/@chrisschulz133/a-post')).toBe(false);
    expect(belongsToAuthor('https://fakemedium.com/@chrisschulz133/a-post')).toBe(false);
  });

  it('rejects publication URLs, which carry no username', () => {
    expect(belongsToAuthor('https://medium.com/some-publication/a-post-abc123')).toBe(false);
  });

  it('rejects malformed input', () => {
    expect(belongsToAuthor('not a url')).toBe(false);
  });
});
