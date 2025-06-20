import { useCallback, useState } from "react"
import BaseTreeNavigation from "./BaseTreeNavigation"
import type { TreeNavigationListItemProps, TreeToggleFunction } from "./types"
import TreeNavigationItem from "./TreeNavigationItem"

export default function TreeNavigationListItem({
  data: { children, ...itemProps },
  itemClassName,
}: TreeNavigationListItemProps) {
  const [isExpanded, setExpanded] = useState(true)
  const hasChildren = Boolean(children)

  const toggle: TreeToggleFunction = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded((previousState) => !previousState)
  }, [])

  return (
    <li role="none">
      <TreeNavigationItem
        data={itemProps}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        toggle={toggle}
        className={itemClassName}
      />
      {children && isExpanded && (
        <BaseTreeNavigation
          role="group"
          data={children}
          className="pl-8 shadow-[0_-1.025rem_0_#fff_inset,0.9375rem_0_0_#fff_inset,1rem_0_0_#ddd_inset]"
          itemClassName="before:block before:absolute before:w-[1rem] before:border-t-1 before:border-[#ddd] before:-left-[1.0625rem] before:pointer-events-none focus-visible:before:-left-[1.125rem] focus-visible:before:w-[0.875rem]"
        />
      )}
    </li>
  )
}
