import { useState } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table } from "../ui"
import getColumns from "./Columns"
import type { TableFilter, TableProps } from "./types.d"
import pxToRem from "../../utils/pxToRem"
import ResultsBody from "./ResultsBody"
import ResultsHead from "./ResultsHead"
import { BiLoaderCircle } from "react-icons/bi"
import transformToTableItem from "./utils/transformToTableItem"
import type { Results } from "../../types"

type ResultsProps = {
  data: Results
  isLoading: boolean
}

export default function Results({ data, isLoading }: ResultsProps) {
  return (
    <>
      {isLoading && (
        <div className="absolute z-30 flex left-1/2 top-1/2 -translate-1/2 p-1">
          <BiLoaderCircle className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      <BasicResults data={transformToTableItem(data)} isLoading={isLoading} />
    </>
  )
}

function BasicResults({ data, isLoading }: TableProps) {
  const [columnFilters, setColumnFilters] = useState<TableFilter[]>([])
  const table = useReactTable({
    data,
    columns: getColumns(Object.keys(data[0] || [])),
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  })

  const isInfoBarVisible =
    columnFilters.length > 0 || table.getState().sorting.length > 0
  const isEmpty = table.getRowModel().rows.length === 0

  return (
    <div className="flex flex-col px-6 py-4 grow overflow-auto print:overflow-visible">
      {!isEmpty && !isLoading && (
        <div className="sr-only" role="status">
          Results have been displayed
        </div>
      )}
      <Table cx={{ width: pxToRem(table.getTotalSize()) }}>
        <ResultsHead
          table={table}
          columnFilters={columnFilters}
          isInfoBarVisible={isInfoBarVisible}
          setColumnFilters={setColumnFilters}
        />
        <ResultsBody table={table} isInfoBarVisible={isInfoBarVisible} />
      </Table>
      {isEmpty && !isLoading && (
        <div
          role="status"
          className="flex items-center justify-center h-64 text-primary"
          style={{
            width: table.getTotalSize()
              ? pxToRem(table.getTotalSize())
              : "100%",
          }}
        >
          No results found
        </div>
      )}
    </div>
  )
}
