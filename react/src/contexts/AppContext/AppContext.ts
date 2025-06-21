import { createContext } from "react"

export type AppContextProps = {
  query: string
  domain: string
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

export type AppContextActionsProps = {
  onSelectQuery: (query: string) => void
}

export const AppActionsContext = createContext<
  AppContextActionsProps | undefined
>(undefined)
