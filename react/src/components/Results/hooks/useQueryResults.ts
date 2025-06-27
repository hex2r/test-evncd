import { useCallback, useEffect, useMemo, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAppContext } from "../../../contexts/AppContext"
import { fetchQueryResults } from "../../../api"
import { PAGINATION } from "../../../config"
import { QUERY_PARAMS } from "../../../config/constants"
import usePersistQueryURL from "../../../hooks/usePersistQueryURL"

const { DEFAULT_PAGE, DEFAULT_LIMIT } = PAGINATION
const { PAGE, LIMIT } = QUERY_PARAMS

const defaultPagination = {
  currentPage: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  total: 1,
  hasNext: false,
  hasPrevious: false,
}

export default function usePersistedPaginatedResults() {
  const { get, set, remove } = usePersistQueryURL()
  const { data, pagination, isLoading } = usePaginatedQueryResults({
    defaultPage: Number(get(PAGE) || DEFAULT_PAGE),
    defaultLimit: Number(get(LIMIT) || DEFAULT_LIMIT),
  })

  const onSelectPage = useCallback((number: number) => {
    if (pagination.currentPage !== DEFAULT_PAGE) set(PAGE, `${number}`)
    else remove(PAGE)

    pagination.onSelectPage(number)
  }, [])

  const onSelectLimit = useCallback((number: number) => {
    if (pagination.limit !== DEFAULT_LIMIT) set(LIMIT, `${number}`)
    else remove(LIMIT)

    pagination.onSelectLimit(number)
  }, [])

  const syncQueryParams = useCallback(() => {
    if (pagination.currentPage !== DEFAULT_PAGE)
      set(PAGE, `${pagination.currentPage}`)
    else remove(PAGE)

    if (pagination.limit !== DEFAULT_LIMIT) set(LIMIT, `${pagination.limit}`)
    else remove(LIMIT)
  }, [pagination])

  useEffect(syncQueryParams, [syncQueryParams])

  return {
    data,
    isLoading,
    pagination: {
      ...pagination,
      onSelectPage,
      onSelectLimit,
    },
  }
}

export function usePaginatedQueryResults({
  defaultPage = DEFAULT_PAGE,
  defaultLimit = DEFAULT_LIMIT,
}: {
  defaultPage?: number
  defaultLimit?: number
}) {
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [limit, setLimit] = useState(defaultLimit)
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

  const { data, pagination } = results || {
    data: {},
    pagination: {},
  }

  const memorizedPagination = useMemo(
    () => ({
      ...defaultPagination,
      ...pagination,
    }),
    [pagination],
  )

  return {
    data,
    pagination: {
      ...memorizedPagination,
      onSelectPage: setCurrentPage,
      onSelectLimit: setLimit,
    },
    isLoading: (isFetching && !isFetched) || isPending,
  }
}
