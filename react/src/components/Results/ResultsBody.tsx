import { flexRender, type Table as ReactTable } from "@tanstack/react-table"
import { Table } from "../ui"
import type { TableItem } from "./types"
import pxToRem from "../../utils/pxToRem"

type ResultsBodyProps = {
  table: ReactTable<TableItem>
  isInfoBarVisible: boolean
}

export default function ResultsBody({
  table,
  isInfoBarVisible,
}: ResultsBodyProps) {
  return (
    <Table.Tbody>
      {table.getRowModel().rows.map((row, idx) => (
        <Table.Tr key={row.id}>
          {row.getVisibleCells().map(({ id, column, getContext }) => (
            <Table.Td
              key={id}
              className={`py-2 px-4 ${
                idx === 0 && isInfoBarVisible ? "pt-8" : "pt-2"
              }`}
              cx={{ width: pxToRem(column.getSize()) }}
            >
              {flexRender(column.columnDef.cell, getContext())}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </Table.Tbody>
  )
}
