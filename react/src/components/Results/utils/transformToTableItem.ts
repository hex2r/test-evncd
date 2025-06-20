import type { Results } from "../../../types"
import type { TableItem } from "../types"

export default function transformToTableItem(
  data: Results | undefined
): TableItem[] {
  if (!data) return []

  return Object.entries(data)
    .reduce<unknown[]>((acc, [url, issues]) => {
      return [
        ...acc,
        issues.flatMap((item) => ({
          url,
          ...item,
        })),
      ]
    }, [])
    .flat() as TableItem[]
}
