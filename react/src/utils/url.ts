export function getCurrentObjectURL(): URL {
  return new URL(window.location.href)
}

/** @returns string URL href with changed or appended (in case of doesn't exists) passed down param */
export function setSearchParameter(param: string, value: string): string {
  const urlObj = getCurrentObjectURL()
  const searchParams = new URLSearchParams(urlObj.search)

  if (searchParams.has(param)) {
    searchParams.set(param, value)
  } else {
    searchParams.append(param, value)
  }

  return `${urlObj.origin}${urlObj.pathname}?${searchParams.toString()}`
}

/** @returns passed down param value as string or undefined */
export function getSearchParameter(param: string): string | null {
  const urlObj = getCurrentObjectURL()
  const searchParams = new URLSearchParams(urlObj.search)

  return searchParams.get(param)
}

/** @returns string URL href without passed down param */
export function deleteSearchParameter(param: string): string {
  const urlObj = getCurrentObjectURL()

  urlObj.searchParams.delete(param)

  return urlObj.href
}

export function setURLWithoutReload(url: string): void {
  window.history.pushState({}, "", url)
}

export const getAllUrlSearchParams = () => {
  return window.location.search.slice(1)
}
