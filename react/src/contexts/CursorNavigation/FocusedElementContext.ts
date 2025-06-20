import { createContext } from "react"
import type { FocusedElementContextProps } from "./types"

const FocusedElementContext = createContext<FocusedElementContextProps | null>(
  null
)

export default FocusedElementContext
