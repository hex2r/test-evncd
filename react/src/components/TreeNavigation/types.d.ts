import type { KeyboardEvent, MouseEvent } from "react"

export type ResponseTreeData = {
  data: Record<string, number>
}

type TreeItem = {
  children?: Tree
  issuesCount?: number
  label: string
  origin?: string
  path: string
}

type PropsWithUrl = { url: string }

export type Tree = {
  [url: string]: TreeItem
}

export type FilterTreeNavigation = {
  filter: string
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type BaseTreeNavigationProps = {
  role?: "tree" | "group"
  data: Tree
  className?: string
  itemClassName?: string
}

export type TreeNavigationListItemProps = {
  data: PropsWithUrl & TreeItem
  itemClassName?: string
}

export type TreeToggleFunction = (
  e: MouseEvent<SVGElement> | KeyboardEvent<HTMLElement>,
) => void

export type OnSelectPage = (
  e: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>,
) => void

export type TreeNavigationItemProps = {
  data: PropsWithUrl & Omit<TreeItem, "children">
  isExpanded: boolean
  hasChildren: boolean
  className?: string
  toggle: TreeToggleFunction
}
