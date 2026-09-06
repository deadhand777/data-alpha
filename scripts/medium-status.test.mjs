import { describe, expect, it } from 'vitest';

import {
  belongsToAuthor,
  classifyPosts,
  extractCanonical,
  parseFrontmatter
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

describe('extractCanonical', () => {
  it('finds the canonical href regardless of attribute order', () => {
    const html = '<link rel="stylesheet" href="/a.css"><link href="https://example.com/p/" rel="canonical">';
    expect(extractCanonical(html)).toBe('https://example.com/p/');
  });

  it('returns undefined when no canonical link is present', () => {
    expect(extractCanonical('<link rel="icon" href="/f.ico">')).toBeUndefined();
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
