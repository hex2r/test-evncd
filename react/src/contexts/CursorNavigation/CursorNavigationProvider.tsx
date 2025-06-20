import { type PropsWithChildren, useMemo, useRef } from "react"
import CursorNavigationContext from "./CursorNavigationContext"
import useCursorKeysNavigation from "./useCursorKeysNavigation"
import FocusedElementContext from "./FocusedElementContext"

export default function CursorNavigationProvider({
  children,
}: PropsWithChildren) {
  const ref = useRef<HTMLElement>(null)
  const { parentRef, focusedElement, onNavigate } = useCursorKeysNavigation(ref)

  const memorizedProps = useMemo(
    () => ({
      parentRef,
      onNavigate,
    }),
    [parentRef, onNavigate]
  )

  return (
    <CursorNavigationContext.Provider value={memorizedProps}>
      <FocusedElementContext.Provider
        value={{
          focusedElement,
        }}
      >
        {children}
      </FocusedElementContext.Provider>
    </CursorNavigationContext.Provider>
  )
}
