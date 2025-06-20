export default function filterTree(
  data: Record<string, number> | null | undefined,
  filter: string,
): Record<string, number> | null | undefined {
  if (!filter || !data) return data

  return Object.fromEntries(
    Object.entries(data).filter(([url]) =>
      new URL(url).pathname.toLowerCase().includes(filter.toLowerCase()),
    ),
  )
}
