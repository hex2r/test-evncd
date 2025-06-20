import {
  createColumnHelper,
  type AccessorKeyColumnDef,
} from "@tanstack/react-table"
import { CopyToClipboard } from "../ui"
import type { TableItem } from "./types"

const columnHelper = createColumnHelper<TableItem>()

const urlColumn = columnHelper.accessor("url", {
  id: "url",
  header: "URL",
  enableColumnFilter: true,
  enableSorting: true,
  size: 200,
  minSize: 200,
  cell: (props) => (
    <a
      className="inline-flex text-[#044dff] decoration-underline break-all underline hover:text-[#457bff]"
      href={props.getValue()}
      target="_blank"
    >
      {props.getValue()}
    </a>
  ),
})

const severityColumn = columnHelper.accessor("severity", {
  id: "severity",
  header: "Severity",
  size: 170,
  minSize: 170,
  cell: (props) => props.getValue(),
})

const typeColumn = columnHelper.accessor("type", {
  id: "type",
  header: "Type",
  size: 160,
  minSize: 160,
  cell: (props) => props.getValue(),
})

const componentColumn = columnHelper.accessor("component", {
  id: "component",
  header: "Component",
  size: 190,
  minSize: 190,
  cell: (props) => (
    <CopyToClipboard data={props.getValue()}>
      {props.getValue()}
    </CopyToClipboard>
  ),
})

const selectorColumn = columnHelper.accessor("selector", {
  id: "selector",
  header: "Selector",
  size: 220,
  minSize: 220,
  cell: (props) => (
    <CopyToClipboard data={props.getValue()}>
      {props.getValue()}
    </CopyToClipboard>
  ),
})

const columns = [
  urlColumn,
  severityColumn,
  typeColumn,
  componentColumn,
  selectorColumn,
]

export default function getColumns(
  accessorKeys: string[]
): AccessorKeyColumnDef<TableItem, string>[] {
  return accessorKeys.reduce<AccessorKeyColumnDef<TableItem, string>[]>(
    (acc, currentKey) => {
      const column = columns.find(
        ({ accessorKey }) => currentKey === accessorKey
      )

      if (column) {
        return [...acc, column]
      }

      console.warn("Undefined AccessorKey", currentKey, "skipped")

      return acc
    },
    []
  )
}
