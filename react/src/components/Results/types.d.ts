export type TableFilter = {
  id: string
  value: string
}

export type TableItem = {
  url: string
  type: string
  severity: string
  component: string
  selector: string
}

export type TableProps = {
  data: TableItem[]
  isLoading: boolean
}
