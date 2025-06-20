import type { FilterTreeNavigation } from "./types"
import { Input } from "../ui"

export default function FilterTree({
  filter,
  onFilterChange,
}: FilterTreeNavigation) {
  return (
    <Input
      name="filter-tree"
      type="search"
      placeholder="Filter Tree"
      value={filter}
      onChange={onFilterChange}
    />
  )
}
