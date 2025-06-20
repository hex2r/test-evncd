import { type Header, type Table as ReactTable } from "@tanstack/react-table"
import { Table } from "../ui"
import type { TableFilter, TableItem } from "./types"
import pxToRem from "../../utils/pxToRem"
import TableHeader from "./TableHeader"
import TableInfoBar from "./TableInfoBar"
import ResizeHandler from "./ResizeHandler"

type ResultsHeadProps = {
  table: ReactTable<TableItem>
  columnFilters: TableFilter[]
  setColumnFilters: React.Dispatch<React.SetStateAction<TableFilter[]>>
  isInfoBarVisible: boolean
}

export default function ResultsHead({
  table,
  columnFilters,
  setColumnFilters,
  isInfoBarVisible,
}: ResultsHeadProps) {
  return (
    <Table.Thead className="sticky -top-4 left-0 z-3">
      {table.getHeaderGroups().map(({ id, headers }) => (
        <Table.Tr key={id}>
          {(headers as Header<TableItem, string>[]).map((header) => (
            <Table.Th
              key={header.id}
              className="group px-4 py-1 h-10.5"
              cx={{ width: pxToRem(header.getSize()) }}
            >
              <TableHeader
                column={header.column}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                getContext={header.getContext}
              />
              {isInfoBarVisible && (
                <TableInfoBar
                  column={header.column}
                  columnFilters={columnFilters}
                />
              )}
              <ResizeHandler onMouseDown={header.getResizeHandler()} />
            </Table.Th>
          ))}
        </Table.Tr>
      ))}
    </Table.Thead>
  )
}
