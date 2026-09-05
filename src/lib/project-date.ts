export type ProjectDateStyle = 'short' | 'long';

export function formatProjectDate(
  pubDate: Date,
  period?: string,
  style: ProjectDateStyle = 'short'
): string {
  if (period) {
    return period;
  }

  return pubDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style,
    day: 'numeric',
    timeZone: 'UTC'
  });
}
