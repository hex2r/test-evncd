import type { ErrorInfo } from "react"

export default function logError(error: Error, info: ErrorInfo) {
  console.error("ErrorBoundary caught an error:", error, info)
}
