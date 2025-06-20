import { Suspense } from "react"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { TreeNavigation, TreeNavigationFallback } from "../TreeNavigation"
import { Panel, PanelNegativeWrapper } from "../ui"
import { logError, ErrorFallback } from "../Error"

export default function Sidebar() {
  return (
    <Panel label="Tree Navigation">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onError={logError}
            FallbackComponent={ErrorFallback}
            onReset={reset}
          >
            <PanelNegativeWrapper>
              <Suspense fallback={<TreeNavigationFallback />}>
                <TreeNavigation />
              </Suspense>
            </PanelNegativeWrapper>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Panel>
  )
}
