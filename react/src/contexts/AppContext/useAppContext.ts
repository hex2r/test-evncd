import { use } from "react"
import { AppActionsContext, AppContext } from "./AppContext"
import type { AppContextActionsProps, AppContextProps } from "./AppContext"

export function useAppContext<SelectorOutput>(
  selector: (state: AppContextProps) => SelectorOutput
) {
  const appContext = use(AppContext)

  if (!appContext) {
    throw Error("The following component should be used within AppContext")
  }

  return selector(appContext)
}

export function useAppActionsContext<SelectorOutput>(
  selector: (state: AppContextActionsProps) => SelectorOutput
) {
  const appActionsContext = use(AppActionsContext)

  if (!appActionsContext) {
    throw Error(
      "The following component should be used within AppActionsContext"
    )
  }

  return selector(appActionsContext)
}
