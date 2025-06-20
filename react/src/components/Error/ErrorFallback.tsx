import { useErrorBoundary, type FallbackProps } from "react-error-boundary"
import { MdOutlineErrorOutline } from "react-icons/md"
import { RiResetLeftFill } from "react-icons/ri"

export default function ErrorFallback(props: FallbackProps) {
  const { resetBoundary } = useErrorBoundary()

  return (
    <div
      role="alert"
      className="flex place-items-center p-4 bg-warning-100 gap-3 text-white bg-[#db5b54]"
    >
      <MdOutlineErrorOutline className="self-start shrink-0 text-2xl" />
      <div
        className="flex flex-col grow gap-1"
        aria-live="assertive"
        aria-atomic="true"
      >
        <h3 className="font-semibold">Error</h3>
        <p>{props.error.message}</p>
      </div>
      <button
        title="Try again"
        className="p-1 self-end shrink-0 hover:cursor-pointer hover:-rotate-15"
        onClick={resetBoundary}
        aria-hidden
      >
        <span className="sr-only">Try again</span>
        <RiResetLeftFill />
      </button>
    </div>
  )
}
