export function formatProjectDate(pubDate: Date, style: 'short' | 'long' = 'short'): string {
  return pubDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style,
    day: 'numeric',
    timeZone: 'UTC'
  });
}
