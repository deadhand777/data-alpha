#!/usr/bin/env node
// Reports which blog posts still need to be cross-posted to Medium via the
// import tool (https://medium.com/p/import), and whether already-imported
// posts still carry a canonical link back to this site.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = 'https://deadhand777.github.io/data-alpha';
const MEDIUM_USER = 'chrisschulz133';
const MEDIUM_PROFILE = `https://medium.com/@${MEDIUM_USER}`;
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

/** Extracts the canonical URL from a rendered HTML page, if it declares one. */
export function extractCanonical(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/rel=["']?canonical["']?/i.test(tag)) continue;
    return tag.match(/href=["']([^"']+)["']/i)?.[1];
  }
  return undefined;
}

async function checkCanonical(post) {
  let response;
  try {
    response = await fetch(post.mediumUrl, { redirect: 'follow' });
  } catch (error) {
    return { status: 'unknown', detail: error.message };
  }

  if (!response.ok) {
    return { status: 'unknown', detail: `HTTP ${response.status}` };
  }

  const canonical = extractCanonical(await response.text());
  if (!canonical) return { status: 'missing', detail: 'no canonical link' };
  if (canonical.replace(/\/$/, '') !== post.siteUrl.replace(/\/$/, '')) {
    return { status: 'mismatch', detail: canonical };
  }
  return { status: 'ok', detail: canonical };
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

  console.log(`\nOn Medium (${published.length}) — canonical check`);
  const checks = await Promise.all(published.map(checkCanonical));
  let failures = 0;
  published.forEach((post, index) => {
    const { status, detail } = checks[index];
    if (status !== 'ok') failures += 1;
    console.log(`  [${status.toUpperCase()}] ${post.slug}\n    ${post.mediumUrl}\n    ${detail}`);
    if (!belongsToAuthor(post.mediumUrl)) {
      console.log(`    note: not under ${MEDIUM_PROFILE} — publication URL, or wrong account?`);
    }
  });

  console.log('');
  process.exitCode = failures > 0 ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
