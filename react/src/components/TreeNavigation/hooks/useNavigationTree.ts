import { useEffect } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { transformToTree, filterTreeData } from "../utils"
import useFilterTree from "./useFilterTree"
import { fetchTreeData } from "../../../api"
import { useAppContext } from "../../../contexts/AppContext"

export default function useNavigationTree() {
  const { domain, query } = useAppContext(({ domain, query }) => ({
    domain,
    query,
  }))
  const { filter, onFilterChange } = useFilterTree()

  const {
    data: results,
    isError,
    error,
  } = useSuspenseQuery({
    queryKey: ["tree", domain],
    queryFn: ({ signal }) => fetchTreeData(domain, { signal }),
  })

  useEffect(() => {
    if (isError) throw new Error(error.message)
  }, [isError, error])

  return {
    data: transformToTree(filterTreeData(results, filter) || {}, query),
    filter,
    onFilterChange,
  }
}
