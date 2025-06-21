import { useCallback, useMemo, useState, type PropsWithChildren } from "react"
import { AppContext, AppActionsContext } from "./AppContext"
import usePersistQueryURL from "../../hooks/usePersistQueryURL"
import { QUERY_PARAMS } from "../../config/constants"

export default function AppProvider({ children }: PropsWithChildren) {
  const { get, set } = usePersistQueryURL()
  const [query, setQuery] = useState(get(QUERY_PARAMS.QUERY) || "")
  const [domain] = useState("https://www.ynet.co.il")

  const onSelectQuery = useCallback(
    (query: string) => {
      setQuery(() => query)
      set(QUERY_PARAMS.QUERY, query)
    },
    [set],
  )

  const memorizedActions = useMemo(() => ({ onSelectQuery }), [onSelectQuery])

  return (
    <AppContext.Provider value={{ query, domain }}>
      <AppActionsContext.Provider value={memorizedActions}>
        {children}
      </AppActionsContext.Provider>
    </AppContext.Provider>
  )
}
