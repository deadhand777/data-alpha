import { describe, expect, it } from 'vitest';

import { formatProjectDate } from './project-date';

describe('project date formatting', () => {
  const publicationDate = new Date('2026-08-02T00:00:00Z');

  it('prefers an explicit project period over the sorting date', () => {
    expect(formatProjectDate(publicationDate, '2023–Present')).toBe('2023–Present');
  });

  it('preserves the UTC calendar date when no period is provided', () => {
    const originalTimeZone = process.env.TZ;
    process.env.TZ = 'America/Los_Angeles';

    try {
      expect(formatProjectDate(publicationDate)).toBe('Aug 2, 2026');
    } finally {
      if (originalTimeZone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTimeZone;
      }
    }
  });

  it('supports long date formatting for project detail pages', () => {
    expect(formatProjectDate(publicationDate, undefined, 'long')).toBe('August 2, 2026');
  });
});
