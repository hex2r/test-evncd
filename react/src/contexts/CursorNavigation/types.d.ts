import type useCursorKeysNavigation from "./useCursorKeysNavigation"
export type CursorNavigationContextProps = Omit<
  ReturnType<typeof useCursorKeysNavigation>,
  "focusedElement"
>

export type FocusedElementContextProps = Pick<
  ReturnType<typeof useCursorKeysNavigation>,
  "focusedElement"
>
