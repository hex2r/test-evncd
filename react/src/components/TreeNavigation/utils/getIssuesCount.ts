export default function getIssuesCount(
  urlMatcher: string,
  data: Record<string, number>,
) {
  return Object.entries(data).reduce(
    (acc, [url, issues]) => (url.includes(urlMatcher) ? acc + issues : acc),
    0,
  )
}
