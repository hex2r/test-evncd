import { Suspense, lazy } from "react"
import { Panel, PanelNegativeWrapper } from "../ui"
import { useAppContext } from "../../contexts/AppContext"
import ResultsSuspenseFallback from "../Results/ResultsSuspenseFallback"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorFallback, logError } from "../Error"
import { ErrorBoundary } from "react-error-boundary"

const MainPaginatedResults = lazy(() =>
  import("../Results").then(({ MainPaginatedResults }) => ({
    default: MainPaginatedResults,
  }))
)

const Welcome = lazy(() =>
  import("../Welcome").then(({ Welcome }) => ({
    default: Welcome,
  }))
)

export default function Main() {
  const query = useAppContext((state) => state.query)

  return (
    <Panel label={query || "Welcome"}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onError={logError}
            FallbackComponent={ErrorFallback}
            onReset={reset}
          >
            <PanelNegativeWrapper>
              <Suspense fallback={<ResultsSuspenseFallback />}>
                {query ? <MainPaginatedResults /> : <Welcome />}
              </Suspense>
            </PanelNegativeWrapper>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Panel>
  )
}
