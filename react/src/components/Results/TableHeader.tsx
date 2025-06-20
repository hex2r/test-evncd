import { MdSort } from "react-icons/md"
import TableFilters from "./TableFilters"
import {
  flexRender,
  type Header,
  type Table,
  type Column,
} from "@tanstack/react-table"
import type { TableFilter } from "./types"
import { useState, type Dispatch, type SetStateAction } from "react"
import clt from "../../utils/getClassList"

type TableHeader<T> = {
  column: Column<T, string>
  columnFilters: TableFilter[]
  setColumnFilters: Dispatch<SetStateAction<TableFilter[]>>
  getContext: () => {
    column: Column<T, string>
    header: Header<T, string>
    table: Table<T>
  }
}

export default function TableHeader<T>({
  column,
  columnFilters,
  setColumnFilters,
  getContext,
}: TableHeader<T>) {
  const [isEditable, setEditable] = useState(false)

  const buttonClassList = clt(
    "flex gap-2 items-center p-1 bg-none border-0 hover:cursor-pointer",
    column.getIsSorted() ? "text-active" : "text-secondary hover:text-white",
  )

  return (
    <div className="flex gap-2 items-center justify-between">
      <span>{flexRender(column.columnDef.header, getContext())}</span>
      <div className="flex gap-2 print:hidden">
        {column.getCanSort() && (
          <button
            className={buttonClassList}
            aria-pressed="mixed"
            aria-label={`Sort, ${column.columnDef.header}, currently is ${
              column.getIsSorted() || "unsorted"
            }`}
            onClick={column.getToggleSortingHandler()}
          >
            <MdSort className="text-xl" />
          </button>
        )}
        {column.getCanFilter() && (
          <TableFilters
            isEditable={isEditable}
            setEditable={setEditable}
            placeholder={`Filter ${column.id}`}
            filterId={column.id}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        )}
      </div>
    </div>
  )
}
