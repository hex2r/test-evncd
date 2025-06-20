type Issue = {
  type: string
  severity: string
  component: string
  selector: string
}

export type Pagination = {
  currentPage: number
  limit: number
  total: number
  hasNext: boolean
  hasPrevious: boolean
}

export type Results = Record<string, Issue[]>

export type ResponseResults = {
  data: Results
  pagination: Pagination
}
