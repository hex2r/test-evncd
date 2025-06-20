import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type KeyboardEvent,
  useCallback,
} from "react"
import { KEYS } from "../../config/constants"

const { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } = KEYS

// Todo: add possibility move to start/end using shortcuts with SHIFT + UP/DOWN KEYS

type HTMLElementWithClickListener = HTMLElement & {
  _cursorNavClickListener?: (this: HTMLElement, ev: MouseEvent) => void
}

export default function useCursorKeysNavigation(
  ref: RefObject<HTMLElement | null>
) {
  const navigatedItems = useRef<HTMLElementWithClickListener[]>([])
  const focusedElementId = useRef<number>(0)
  const [focusedElement, setFocusedElement] = useState<HTMLElement>()

  const onNavigate = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const firstElementIdx = 0
    const lastElementIdx = navigatedItems.current.length - 1
    const isFirstElement = focusedElementId.current === firstElementIdx
    const isLastElement = focusedElementId.current === lastElementIdx
    const isPressedPrevious = e.key === ARROW_UP || e.key === ARROW_LEFT
    const isPressedNext = e.key === ARROW_DOWN || e.key === ARROW_RIGHT

    if (isPressedPrevious) {
      if (isFirstElement) {
        focusedElementId.current = lastElementIdx
      } else {
        focusedElementId.current -= 1
      }
    } else if (isPressedNext) {
      if (isLastElement) {
        focusedElementId.current = firstElementIdx
      } else {
        focusedElementId.current += 1
      }
    }

    if (isPressedNext || isPressedPrevious) {
      e.stopPropagation()
      e.preventDefault()

      if (
        navigatedItems.current[focusedElementId.current] instanceof HTMLElement
      ) {
        navigatedItems.current[focusedElementId.current].focus()
        setFocusedElement(navigatedItems.current[focusedElementId.current])
      } else {
        console.error(
          "Error. Unable focus element by keyboard:",
          navigatedItems.current[focusedElementId.current]
        )
      }
    }
  }, [])

  const updateFocusedItemsList = useCallback(
    (ref: RefObject<HTMLElement | null>) => () => {
      if (ref.current instanceof HTMLElement) {
        navigatedItems.current = [
          ...ref.current.querySelectorAll<HTMLElement>("[tabindex]"),
        ]
        setFocusedElement(navigatedItems.current[focusedElementId.current])
      }
    },
    []
  )

  const onSelectFocusedElement = useCallback((element: HTMLElement) => {
    setFocusedElement(() => element)
    focusedElementId.current = navigatedItems.current.indexOf(element)
  }, [])

  useEffect(() => {
    const createListener = (item: HTMLElement) => {
      return function handleClick() {
        onSelectFocusedElement(item)
      }
    }

    const observer = new MutationObserver(() => {
      updateFocusedItemsList(ref)()
      subscribe()
    })

    observer.observe(ref.current as HTMLElement, {
      childList: true,
      subtree: true,
    })

    const subscribe = () => {
      navigatedItems.current.forEach((item) => {
        if (!item._cursorNavClickListener) {
          item._cursorNavClickListener = createListener(item)
          item.addEventListener("click", item._cursorNavClickListener)
        }
      })
    }

    const unsubscribe = () => {
      navigatedItems.current.forEach((item) => {
        if (item._cursorNavClickListener) {
          item.removeEventListener("click", item._cursorNavClickListener)
          delete item._cursorNavClickListener
        }
      })
    }

    updateFocusedItemsList(ref)()
    subscribe()

    return () => {
      observer.disconnect()
      unsubscribe()
    }
  }, [ref, onSelectFocusedElement, updateFocusedItemsList])

  return {
    parentRef: ref,
    focusedElement,
    onNavigate,
  }
}
