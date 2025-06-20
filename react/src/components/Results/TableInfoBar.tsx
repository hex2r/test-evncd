import { type Column } from "@tanstack/react-table"
import type { TableFilter } from "./types"

type TableInfoBar<T> = {
  column: Column<T, string>
  columnFilters: TableFilter[]
}

export default function TableInfoBar<T>({
  column,
  columnFilters,
}: TableInfoBar<T>) {
  const filter = columnFilters.find(({ id }) => id === column.id)

  const renderInfo = () => {
    const info = []

    if (column.getIsSorted()) {
      info.push(column.getIsSorted())
    }

    if (filter && filter?.value) {
      info.push(filter?.value)
    }

    return info.join(", ")
  }

  return (
    <div className="absolute top-1/1 left-0 w-full text-typography text-[0.75rem] pl-4 py-1 bg-secondary min-h-6.5 empty:opacity-25 whitespace-nowrap text-ellipsis overflow-hidden">
      {column.getIsSorted() || (filter && filter?.value) ? (
        <span aria-live="polite" aria-atomic>
          <span className="sr-only">{column.id},</span>
          {renderInfo()}
        </span>
      ) : null}
    </div>
  )
}
