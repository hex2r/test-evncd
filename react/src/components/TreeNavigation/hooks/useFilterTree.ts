import { type ChangeEvent, useCallback, useState } from "react"

export default function useFilterTree() {
  const [filter, setFilter] = useState<string>("")

  const onFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(() => e.target.value)
  }, [])

  return {
    filter,
    onFilterChange,
  }
}
