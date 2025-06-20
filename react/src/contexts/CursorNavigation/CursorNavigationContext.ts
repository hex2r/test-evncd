import { createContext } from "react"
import type { CursorNavigationContextProps } from "./types"

const CursorNavigationContext =
  createContext<CursorNavigationContextProps | null>(null)

export default CursorNavigationContext
