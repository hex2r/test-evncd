import {
  type Dispatch,
  type SetStateAction,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useCallback,
} from "react"
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md"
import type { TableFilter } from "./types"
import { KEYS } from "../../config/constants"
import { Input } from "../ui"
import clt from "../../utils/getClassList"

const { ESCAPE, ENTER } = KEYS

type TableFilters = {
  placeholder?: string
  filterId: string
  columnFilters: TableFilter[]
  isEditable: boolean
  setEditable: Dispatch<SetStateAction<boolean>>
  setColumnFilters: Dispatch<SetStateAction<TableFilter[]>>
}

export default function TableFilters({
  isEditable,
  setEditable,
  placeholder = "Filter",
  filterId,
  columnFilters,
  setColumnFilters,
}: TableFilters) {
  const filterControlRef = useRef<HTMLButtonElement | null>(null)
  const value = columnFilters.find(({ id }) => id === filterId)?.value || ""
  const firstRender = useRef(true)

  const removeFilter = useCallback(
    (filterId: TableFilter["id"]) => {
      return setColumnFilters((state) => [
        ...state.filter(({ id }) => id !== filterId),
      ])
    },
    [setColumnFilters],
  )

  const handleFilterChange = useCallback(
    (filter: TableFilter) => {
      return filter.value.trim()
        ? setColumnFilters((state) => [
            ...state.filter(({ id }) => id !== filter.id),
            filter,
          ])
        : removeFilter(filter.id)
    },
    [removeFilter, setColumnFilters],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ESCAPE) {
        if (value) {
          e.stopPropagation()
          removeFilter(filterId)
          return
        }

        if (isEditable) {
          e.stopPropagation()
          setEditable(false)
        }
      }

      if (e.key === ENTER) {
        e.preventDefault()
        setEditable(false)
        return
      }
    },
    [filterId, isEditable, removeFilter, setEditable, value],
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (value) {
        e.stopPropagation()
        removeFilter(filterId)
        return
      }

      if (isEditable) {
        setEditable(false)
        firstRender.current = true
        return
      }

      setEditable(true)
      firstRender.current = false
    },
    [filterId, isEditable, removeFilter, setEditable, value],
  )

  useEffect(() => {
    if (firstRender.current) return

    if (!isEditable) {
      filterControlRef.current?.focus()
    }
  }, [isEditable, firstRender])

  const buttonClassList = clt(
    "flex gap-2 items-center p-1 bg-none border-0 hover:cursor-pointer",
    value ? "text-active" : "text-secondary hover:text-white",
  )

  return (
    <div className="flex gap-2 items-center">
      {!isEditable && (
        <button
          ref={filterControlRef}
          className={buttonClassList}
          aria-pressed={value ? "true" : "false"}
          onClick={handleClick}
        >
          {value ? (
            <MdFilterAltOff className="text-xl" />
          ) : (
            <MdFilterAlt className="text-xl" />
          )}
        </button>
      )}
      {isEditable && (
        <Input
          autoFocus
          type="search"
          name={`filter-table-${filterId}`}
          placeholder={placeholder}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-3"
          value={value}
          onKeyDown={handleKeyDown}
          onBlur={() => setEditable(false)}
          onChange={(e) =>
            handleFilterChange({ id: filterId, value: e.target.value })
          }
        />
      )}
    </div>
  )
}
