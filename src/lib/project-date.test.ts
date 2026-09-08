import { describe, expect, it } from 'vitest';
import { formatProjectDate } from './project-date';

describe('formatProjectDate', () => {
  const publicationDate = new Date('2026-08-02T00:00:00Z');

  it('formats the publication date with an abbreviated month by default', () => {
    expect(formatProjectDate(publicationDate)).toBe('Aug 2, 2026');
  });

  it('formats the publication date with a full month name in long style', () => {
    expect(formatProjectDate(publicationDate, 'long')).toBe('August 2, 2026');
  });
});
