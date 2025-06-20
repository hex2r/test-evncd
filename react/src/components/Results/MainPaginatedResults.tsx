import PaginatedResults from "./PaginatedResults"
import Results from "./Results"
import useQueryResults from "../Results/hooks/useQueryResults"

export default function MainPaginatedResults() {
  const { data, pagination, isLoading } = useQueryResults()

  return (
    <PaginatedResults pagination={pagination} isLoading={isLoading}>
      <Results data={data} isLoading={isLoading} />
    </PaginatedResults>
  )
}
