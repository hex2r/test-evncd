export default function ResultsSuspenseFallback() {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <div aria-live="polite" className="sr-only">
        Getting Table Results
      </div>
      <div className="py-4 px-6 flex grow">
        <div className="flex flex-col overflow-auto grow bg-secondary animate-pulse" />
      </div>
    </div>
  )
}
