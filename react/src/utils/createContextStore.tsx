import {
  type FC,
  type PropsWithChildren,
  use,
  useRef,
  useCallback,
  createContext,
  useSyncExternalStore,
} from "react"

type StoreAPI<Store> = {
  get: () => Store
  set: (value: Partial<Store>) => void
  subscribe: (callback: () => void) => () => void
}

export default function createContextStore<Store extends object>(
  initialState: Store = {} as Store,
  persist?: () => {
    get: (state: Store) => Store
    set: (value: Partial<Store>) => void
  }
) {
  const StoreContext = createContext<
    ReturnType<typeof useStoreData> | undefined
  >(undefined)

  function useStoreData(): StoreAPI<Store> {
    const store = useRef<Store>(initialState)
    const subscribers = useRef(new Set<() => void>())

    const get = useCallback(() => {
      return persist?.().get(store.current) || store.current
    }, [store])

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value }

      persist?.().set(value)

      subscribers.current.forEach((subscriber) => subscriber())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)

      return () => subscribers.current.delete(callback)
    }, [])

    return { get, set, subscribe }
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = use(StoreContext)

    if (!store) throw Error("Store not found")

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    )

    return [state, store.set]
  }

  const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  )

  return {
    StoreProvider,
    useStore,
  }
}
