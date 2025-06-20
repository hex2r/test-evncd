import { useCallback, useEffect, useMemo, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAppContext } from "../../../contexts/AppContext"
import { fetchQueryResults } from "../../../api"
import { PAGINATION } from "../../../config"
import { QUERY_PARAMS } from "../../../config/constants"
import usePersistQueryURL from "../../../hooks/usePersistQueryURL"

export default function useQueryResults() {
  const { get, set } = usePersistQueryURL()
  const [currentPage, setCurrentPage] = useState(
    Number(get(QUERY_PARAMS.PAGE) || PAGINATION.DEFAULT_PAGE),
  )
  const [limit, setLimit] = useState(
    Number(get(QUERY_PARAMS.LIMIT) || PAGINATION.DEFAULT_LIMIT),
  )

  const query = useAppContext((state) => state.query)
  const {
    data: results,
    isFetching,
    isFetched,
    isPending,
  } = useQuery({
    queryKey: ["results", query, currentPage, limit],
    queryFn: ({ signal }) =>
      fetchQueryResults(
        {
          query,
          currentPage,
          limit,
        },
        { signal },
      ),
    placeholderData: keepPreviousData,
    enabled: !!query,
    throwOnError: true,
  })

  const { data, pagination } = results || { data: {}, pagination: {} }

  const onSelectPage = useCallback(
    (number: number) => {
      setCurrentPage(number)
      set(QUERY_PARAMS.PAGE, `${number}`)
    },
    [set],
  )

  const onSelectLimit = useCallback(
    (number: number) => {
      setLimit(number)
      set(QUERY_PARAMS.LIMIT, `${number}`)
      onSelectPage(PAGINATION.DEFAULT_PAGE)
    },
    [onSelectPage, set],
  )

  const memorizedPagination = useMemo(
    () => ({
      ...{
        currentPage: PAGINATION.DEFAULT_PAGE,
        limit: PAGINATION.DEFAULT_LIMIT,
        total: 1,
        hasNext: false,
        hasPrevious: false,
      },
      ...pagination,
      onSelectPage,
      onSelectLimit,
    }),
    [pagination, onSelectPage, onSelectLimit],
  )

  useEffect(() => {
    set(QUERY_PARAMS.PAGE, `${memorizedPagination.currentPage}`)
    set(QUERY_PARAMS.LIMIT, `${memorizedPagination.limit}`)
  }, [set, memorizedPagination])

  return {
    data,
    pagination: memorizedPagination,
    isLoading: (isFetching && !isFetched) || isPending,
  }
}
