export default function ResizeHandler({
  onMouseDown,
}: {
  onMouseDown: (event: unknown) => void
}) {
  return (
    <div
      className="absolute z-1 right-0 top-0 h-full w-0.75 cursor-col-resize bg-[#222] opacity-0 active:opacity-100 group-hover:opacity-100"
      onMouseDown={onMouseDown}
    />
  )
}
