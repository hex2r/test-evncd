import { useEffect } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { transformToTree, filterTreeData } from "../utils"
import useFilterTree from "./useFilterTree"
import { fetchTreeData } from "../../../api"

export default function useNavigationTree() {
  const { filter, onFilterChange } = useFilterTree()
  const {
    data: results,
    isError,
    error,
  } = useSuspenseQuery({
    queryKey: ["tree"],
    queryFn: ({ signal }) => fetchTreeData({ signal }),
  })

  useEffect(() => {
    if (isError) throw new Error(error.message)
  }, [isError, error])

  return {
    data: transformToTree(filterTreeData(results?.data, filter) || {}),
    filter,
    onFilterChange,
  }
}
