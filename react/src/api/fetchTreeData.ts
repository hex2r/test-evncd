import axios, { type AxiosResponse } from "axios"
import { ENDPOINT_TREE } from "../config/endpoints"
import type { ResponseTreeData } from "../components/TreeNavigation/types"
import { REQUEST_TIMEOUT } from "../config"
import promiseWrapper from "../utils/promiseWrapper"

export type FetchTreeFn = (options?: {
  signal: AbortSignal
}) => Promise<Record<string, number> | null>

export default async function fetchTreeData(options?: {
  signal: AbortSignal
}): Promise<ResponseTreeData | null> {
  const { data, error } = await promiseWrapper<AxiosResponse<ResponseTreeData>>(
    axios.get(`/api/${import.meta.env.VITE_API_VERSION}${ENDPOINT_TREE}`, {
      timeout: REQUEST_TIMEOUT,
      headers: { "Content-Type": "application/json" },
      signal: options?.signal,
    }),
  )

  if (error) throw new Error(error.message)

  if (!data) return null

  const { data: treeData } = data

  return treeData
}
