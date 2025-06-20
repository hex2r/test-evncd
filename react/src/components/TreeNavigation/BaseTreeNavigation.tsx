import TreeNavigationItem from "./TreeNavigationListItem"
import type { BaseTreeNavigationProps } from "./types"

export default function BaseTreeNavigation({
  role = "tree",
  className,
  data,
  itemClassName,
}: BaseTreeNavigationProps) {
  return (
    <ul role={role} className={className}>
      {Object.entries(data).map(([url, data]) => (
        <TreeNavigationItem
          itemClassName={itemClassName}
          key={url}
          data={{ ...data, url }}
        />
      ))}
    </ul>
  )
}
