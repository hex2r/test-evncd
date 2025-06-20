import { useCallback } from "react"
import {
  deleteSearchParameter,
  getSearchParameter,
  setSearchParameter,
  setURLWithoutReload,
} from "../utils/url"

export default function usePersistQueryURL() {
  const get = useCallback((key: string) => getSearchParameter(key), [])
  const set = useCallback((key: string, value: string) => {
    setURLWithoutReload(setSearchParameter(key, value))
  }, [])
  const remove = useCallback((key: string) => {
    setURLWithoutReload(deleteSearchParameter(key))
  }, [])

  return {
    get,
    set,
    remove,
  }
}
