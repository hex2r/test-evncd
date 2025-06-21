import axios, { type AxiosResponse } from "axios"
import { ENDPOINT_TREE } from "../config/endpoints"
import type { ResponseTreeData } from "../components/TreeNavigation/types"
import { REQUEST_TIMEOUT } from "../config"
import promiseWrapper from "../utils/promiseWrapper"
import { QUERY_PARAMS } from "../config/constants"

export default async function fetchTreeData(
  domain: string,
  options?: {
    signal: AbortSignal
  },
): Promise<ResponseTreeData | null> {
  const { data, error } = await promiseWrapper<AxiosResponse<ResponseTreeData>>(
    axios.get(
      `/api/${import.meta.env.VITE_API_VERSION}${ENDPOINT_TREE}?${QUERY_PARAMS.QUERY}=${domain}`,
      {
        timeout: REQUEST_TIMEOUT,
        headers: { "Content-Type": "application/json" },
        signal: options?.signal,
      },
    ),
  )

  if (error) throw new Error(error.message)

  if (!data) return null

  const { data: treeData } = data

  return treeData
}
