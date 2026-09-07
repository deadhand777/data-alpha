#!/usr/bin/env node
// Reports which blog posts still need to be cross-posted to Medium via the
// import tool (https://medium.com/p/import), and whether the copies already on
// Medium point back to this site.
//
// Medium answers server-side requests for story pages with HTTP 403 for every
// user agent, so this reads the account's RSS feed instead. The feed is public
// and unauthenticated. An imported story carries an "Originally published at
// <url>" footer naming the URL the import tool fetched, which is the same URL
// it wrote into rel="canonical". A story pasted into the editor by hand has no
// such footer and no canonical link.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = 'https://deadhand777.github.io/data-alpha';
const MEDIUM_USER = 'chrisschulz133';
const MEDIUM_PROFILE = `https://medium.com/@${MEDIUM_USER}`;
const MEDIUM_FEED = `https://medium.com/feed/@${MEDIUM_USER}`;
const BLOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'blog');

/** Parses top-level scalar keys out of the leading frontmatter block. */
export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!entry) continue;
    data[entry[1]] = entry[2].trim().replace(/^["'](.*)["']$/, '$1');
  }
  return data;
}

/** Splits published posts into those pending import and those already on Medium. */
export function classifyPosts(files) {
  const pending = [];
  const published = [];

  for (const file of files) {
    const data = parseFrontmatter(file.content);
    if (data.draft === 'true') continue;

    const slug = file.name.replace(/\.mdx$/, '');
    const post = {
      slug,
      title: data.title ?? slug,
      pubDate: data.pubDate,
      siteUrl: `${SITE}/blog/${slug}/`,
      mediumUrl: data.mediumUrl
    };

    (post.mediumUrl ? published : pending).push(post);
  }

  return { pending, published };
}

/**
 * Checks that a Medium URL sits under this account, in either of the two shapes
 * Medium hands out: medium.com/@user/... and user.medium.com/...
 * Publication URLs use neither, so they are reported separately rather than
 * treated as an error.
 */
export function belongsToAuthor(mediumUrl) {
  let url;
  try {
    url = new URL(mediumUrl);
  } catch {
    return false;
  }

  const user = MEDIUM_USER.toLowerCase();
  const host = url.hostname.toLowerCase();

  if (host === `${user}.medium.com`) return true;
  return host === 'medium.com' && url.pathname.toLowerCase().startsWith(`/@${user}/`);
}

/**
 * Extracts Medium's story id — the hex suffix of the last path segment. The id
 * is stable across the host and query-string variants Medium hands out, so two
 * URLs for the same story compare equal on it.
 */
export function storyId(url) {
  const path = url.split(/[?#]/)[0].replace(/\/$/, '');
  const id = path.slice(path.lastIndexOf('-') + 1).toLowerCase();
  return /^[0-9a-f]{6,}$/.test(id) ? id : undefined;
}

/** Parses the account feed into one entry per story. */
export function parseFeed(xml) {
  const entries = [];

  for (const item of xml.match(/<item\b[\s\S]*?<\/item>/g) ?? []) {
    const link = item.match(/<link>([^<]+)<\/link>/)?.[1];
    if (!link) continue;

    const content = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] ?? '';
    entries.push({
      link,
      id: storyId(link),
      pubDate: item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1],
      // Present only on imported stories; names the URL the import tool fetched.
      sourceUrl: content.match(/Originally published at[\s\S]{0,40}?<a[^>]+href="([^"]+)"/i)?.[1]
    });
  }

  return entries;
}

const sameUrl = (a, b) => a.replace(/\/$/, '') === b.replace(/\/$/, '');

// Frontmatter dates carry no time, so they parse to midnight. A post has to
// predate the feed window by more than a day before its absence is put down to
// the window rather than to a bad URL.
const DAY = 24 * 60 * 60 * 1000;

/**
 * Reports what the feed says about one recorded Medium URL. The feed carries
 * only the most recent stories, so a post older than every entry in it is
 * reported as unverifiable rather than missing.
 */
export function checkPost(post, entries) {
  const id = storyId(post.mediumUrl);
  const entry = entries.find((candidate) => candidate.id && candidate.id === id);

  if (!entry) {
    const oldest = entries
      .map((candidate) => Date.parse(candidate.pubDate ?? ''))
      .filter((time) => !Number.isNaN(time))
      .sort((a, b) => a - b)[0];
    const posted = Date.parse(post.pubDate ?? '');

    if (oldest !== undefined && !Number.isNaN(posted) && posted < oldest - DAY) {
      return { status: 'unknown', detail: `older than the ${entries.length} stories the feed carries` };
    }
    return { status: 'absent', detail: 'not in the account feed — wrong URL, or story deleted?' };
  }

  if (!entry.sourceUrl) {
    return { status: 'missing', detail: 'no import source — pasted by hand, so no canonical link' };
  }
  if (!sameUrl(entry.sourceUrl, post.siteUrl)) {
    return { status: 'mismatch', detail: `imported from ${entry.sourceUrl}` };
  }
  return { status: 'ok', detail: `imported from ${entry.sourceUrl}` };
}

async function fetchFeed() {
  const response = await fetch(MEDIUM_FEED, { redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseFeed(await response.text());
}

async function main() {
  const files = readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({ name, content: readFileSync(join(BLOG_DIR, name), 'utf8') }));

  const { pending, published } = classifyPosts(files);

  console.log(`\nMedium account: ${MEDIUM_PROFILE}`);
  console.log(`\nPending import (${pending.length}) — paste into https://medium.com/p/import`);
  for (const post of pending) {
    console.log(`  ${post.siteUrl}\n    ${post.title}`);
  }

  console.log(`\nOn Medium (${published.length}) — import source check`);
  if (published.length === 0) {
    console.log('');
    return;
  }

  let entries;
  try {
    entries = await fetchFeed();
  } catch (error) {
    console.log(`  feed unreachable (${error.message}) — cannot verify: ${MEDIUM_FEED}\n`);
    return;
  }

  let failures = 0;
  for (const post of published) {
    const { status, detail } = checkPost(post, entries);
    if (status !== 'ok' && status !== 'unknown') failures += 1;
    console.log(`  [${status.toUpperCase()}] ${post.slug}\n    ${post.mediumUrl}\n    ${detail}`);
    if (status === 'mismatch') {
      console.log(`    expected ${post.siteUrl}`);
    }
    if (!belongsToAuthor(post.mediumUrl)) {
      console.log(`    note: not under ${MEDIUM_PROFILE} — publication URL, or wrong account?`);
    }
  }

  console.log('');
  process.exitCode = failures > 0 ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
