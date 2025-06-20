export default function TreeNavigationFallback() {
  return (
    <div className="flex gap-4 grow flex-col overflow-hidden bg-secondary">
      <div aria-live="polite" className="sr-only">
        Loading Tree
      </div>
      <div className="py-4 px-6 bg-white">
        <div className="h-[2.625rem] bg-secondary animate-pulse" />
      </div>
      <div className="py-4 px-6 flex grow bg-white">
        <div className="flex flex-col overflow-auto grow bg-secondary animate-pulse" />
      </div>
    </div>
  )
}
