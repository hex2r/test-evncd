import axios, { type AxiosResponse } from "axios"
import { ENDPOINT_DATA } from "../config/endpoints"
import { QUERY_PARAMS } from "../config/constants"
import { PAGINATION, REQUEST_TIMEOUT } from "../config"
import promiseWrapper from "../utils/promiseWrapper"
import type { ResponseResults } from "../types"

export type FetchResultsFn = (
  params: {
    query: string
    currentPage: number
    perPage: number
  },
  options?: {
    signal: AbortSignal
  },
) => Promise<ResponseResults | undefined>

export default async function fetchQueryResults(
  params: {
    query: string
    currentPage: number
    limit: number
  },
  options?: {
    signal: AbortSignal
  },
): Promise<ResponseResults | undefined> {
  const { data, error } = await promiseWrapper<AxiosResponse<ResponseResults>>(
    axios.get(
      `/api/${
        import.meta.env.VITE_API_VERSION
      }${ENDPOINT_DATA}/?${QUERY_PARAMS.QUERY}=${params.query}&${
        QUERY_PARAMS.PAGE
      }=${params.currentPage}&${QUERY_PARAMS.LIMIT}=${params.limit}`,
      {
        timeout: REQUEST_TIMEOUT,
        headers: { "Content-Type": "application/json" },
        signal: options?.signal,
      },
    ),
  )

  if (error) throw new Error(error.message)

  if (!data)
    return {
      data: {},
      pagination: {
        currentPage: PAGINATION.DEFAULT_PAGE,
        limit: PAGINATION.DEFAULT_LIMIT,
        total: 1,
        hasNext: false,
        hasPrevious: false,
      },
    }

  const {
    data: { pagination, data: results },
  } = data

  return { pagination, data: results }
}
