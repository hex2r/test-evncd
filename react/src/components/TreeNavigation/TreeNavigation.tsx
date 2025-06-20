import isEmpty from "lodash-es/isEmpty"
import BaseTreeNavigation from "./BaseTreeNavigation"
import FilterTree from "./FilterTree"
import useNavigationTree from "./hooks/useNavigationTree"
import { fetchTreeData } from "../../api"
import {
  CursorNavigationProvider,
  useCursorNavigationContext,
} from "../../contexts/CursorNavigation"

export default function AccessibleTreeNavigation() {
  return (
    <CursorNavigationProvider>
      <TreeNavigation />
    </CursorNavigationProvider>
  )
}

function TreeNavigation() {
  const { data, filter, onFilterChange } = useNavigationTree(fetchTreeData)
  const noData = isEmpty(data)
  const { parentRef, onNavigate } = useCursorNavigationContext(
    ({ parentRef, onNavigate }) => ({ parentRef, onNavigate })
  )

  return (
    <div className="flex grow flex-col overflow-hidden bg-secondary gap-4">
      <span className="sr-only" aria-live="polite">
        Tree Navigation has been displayed
      </span>
      <div className="px-6 py-4 bg-white">
        <FilterTree filter={filter} onFilterChange={onFilterChange} />
        {filter && !noData && (
          <span className="sr-only" aria-live="polite" key={filter}>
            Tree Navigation has been filtered
          </span>
        )}
      </div>
      <div className="flex flex-col overflow-auto grow bg-white">
        <nav
          ref={parentRef}
          aria-label="Tree"
          className="min-w-full px-6 py-4 mr-auto"
          onKeyDown={onNavigate}
        >
          {noData ? (
            <div
              role="status"
              className="flex items-center justify-center h-64 text-primary"
              aria-atomic="true"
            >
              <span className="sr-only">Tree Navigation,</span>No data found
            </div>
          ) : (
            <BaseTreeNavigation data={data} />
          )}
        </nav>
      </div>
    </div>
  )
}
