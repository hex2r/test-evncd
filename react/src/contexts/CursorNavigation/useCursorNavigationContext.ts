import { use } from "react"
import CursorNavigationContext from "../CursorNavigation/CursorNavigationContext"
import type { CursorNavigationContextProps } from "./types"

export default function useCursorNavigationContext<SelectorOutput>(
  selector: (state: CursorNavigationContextProps) => SelectorOutput
) {
  const context = use(CursorNavigationContext)

  if (!context)
    throw new Error(
      "Following component should be used within CursorNavigationContext"
    )

  return selector(context)
}
