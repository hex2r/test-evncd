import { use } from "react"
import FocusedElementContext from "./FocusedElementContext"
import type { FocusedElementContextProps } from "./types"

export default function useFocusedElementContext<SelectorOutput>(
  selector: (state: FocusedElementContextProps) => SelectorOutput
) {
  const context = use(FocusedElementContext)

  if (!context)
    throw new Error(
      "Following component should be used within FocusedElementContext"
    )

  return selector(context)
}
